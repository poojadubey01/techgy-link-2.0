type ContactOptions = {
  env?: NodeJS.ProcessEnv;
  fetch?: typeof globalThis.fetch;
};

/** Native Next.js contact handler. Preview mode never sends a message. */
export async function handleContact(
  request: Request,
  options: ContactOptions = {},
) {
  const env = options.env || process.env;
  const send = options.fetch || globalThis.fetch;
  const requestUrl = new URL(request.url);
  const origin = request.headers.get("origin");
  // Next may use a loopback URL internally. Host describes the browser-facing request.
  const publicHost = request.headers.get("host") || requestUrl.host;
  const publicProtocol = request.headers.get("x-forwarded-proto")?.split(",")[0].trim() || requestUrl.protocol.slice(0, -1);
  const publicOrigin = `${publicProtocol}://${publicHost}`;
  if (origin && origin !== publicOrigin) {
    return Response.json(
      { error: "Please send your enquiry from this website." },
      { status: 403 },
    );
  }
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return Response.json(
      { error: "Please submit the website form." },
      { status: 415 },
    );
  }
  if (Number(request.headers.get("content-length") || 0) > 16000) {
    return Response.json(
      { error: "Please shorten your message." },
      { status: 413 },
    );
  }
  let data: Record<string, unknown>;
  try {
    const raw = await request.text();
    if (Buffer.byteLength(raw, "utf8") > 16000)
      return Response.json(
        { error: "Please shorten your message." },
        { status: 413 },
      );
    data = JSON.parse(raw);
  } catch {
    return Response.json(
      { error: "Please check the form and try again." },
      { status: 400 },
    );
  }
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    return Response.json(
      { error: "Please check the form and try again." },
      { status: 400 },
    );
  }
  const str = (key: string, max: number) =>
    typeof data[key] === "string"
      ? (data[key] as string).trim().slice(0, max)
      : "";
  if (str("website", 200))
    return Response.json(
      { error: "Unable to send this enquiry." },
      { status: 400 },
    );
  const name = str("name", 100),
    email = str("email", 254),
    phone = str("phone", 40);
  const message = str("message", 3000),
    company = str("company", 150);
  if (!name || !email || !phone || !message || !/^\S+@\S+\.\S+$/.test(email)) {
    return Response.json(
      {
        error:
          "Please add your name, a valid email, phone number and project details.",
      },
      { status: 400 },
    );
  }
  const services = Array.isArray(data.services)
    ? data.services
        .filter((v): v is string => typeof v === "string")
        .slice(0, 15)
        .map((v) => v.slice(0, 100))
    : [];
  const mode =
    env.CONTACT_MODE ||
    (env.NODE_ENV === "production" ? "disabled" : "preview");
  if (mode === "preview") {
    return Response.json({ ok: true, preview: true });
  }
  if (mode !== "webhook" || !env.CONTACT_ENDPOINT) {
    return Response.json(
      {
        error:
          "Online enquiries are not connected yet. Please email or call us using the contact details below.",
      },
      { status: 503 },
    );
  }
  let target: URL;
  try {
    target = new URL(env.CONTACT_ENDPOINT);
    if (!["http:", "https:"].includes(target.protocol))
      throw Error("Invalid endpoint");
    const normalise = (hostname: string) =>
      hostname.toLowerCase().replace(/^www\./, "");
    const siteHosts = [requestUrl.hostname, new URL(publicOrigin).hostname];
    if (env.NEXT_PUBLIC_SITE_URL)
      siteHosts.push(new URL(env.NEXT_PUBLIC_SITE_URL).hostname);
    if (
      target.pathname.replace(/\/$/, "") === "/api/contact" &&
      siteHosts.some((host) => normalise(host) === normalise(target.hostname))
    ) {
      throw Error("The contact endpoint cannot point back to itself");
    }
  } catch {
    return Response.json(
      {
        error:
          "The enquiry service needs configuration. Please email or call us below.",
      },
      { status: 503 },
    );
  }
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (env.CONTACT_API_TOKEN)
    headers.Authorization = "Bearer " + env.CONTACT_API_TOKEN;
  try {
    const response = await send(target.toString(), {
      method: "POST",
      headers,
      redirect: "error",
      signal: AbortSignal.timeout(15000),
      body: JSON.stringify({
        name,
        email,
        phone,
        services,
        budget: str("budget", 100) || "Not specified",
        message:
          message +
          "\n\nCompany: " +
          company +
          "\nTiming: " +
          str("timing", 120) +
          "\nSource: " +
          str("source", 700),
      }),
    });
    if (
      !response.ok ||
      !response.headers.get("content-type")?.includes("application/json")
    )
      throw Error("Delivery unavailable");
    const reply = await response.json();
    const confirmed =
      reply &&
      !reply.error &&
      (reply.success === true ||
        reply.ok === true ||
        (typeof reply.message === "string" &&
          /^(email|message|enquiry|inquiry) (sent|submitted|received) successfully[.!]?$/i.test(
            reply.message,
          )));
    if (!confirmed) throw Error("Delivery not confirmed");
    return Response.json({ ok: true });
  } catch {
    return Response.json(
      {
        error:
          "We couldn’t send your enquiry. Your brief is still available below; please email or call us.",
      },
      { status: 502 },
    );
  }
}
