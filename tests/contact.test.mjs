import test from "node:test";
import assert from "node:assert/strict";
import { handleContact } from "../lib/contact.ts";

const payload = {
  name: "Local test",
  email: "test@example.invalid",
  phone: "+10000000000",
  company: "Test",
  message: "Local verification only",
  services: ["Mobile Application Development"],
  timing: "This quarter",
  source: "campaign/mobile | utm_source=test",
};
const request = (data = payload, origin = "http://localhost:3000") =>
  new Request("http://localhost:3000/api/contact/", {
    method: "POST",
    headers: { "Content-Type": "application/json", Origin: origin },
    body: JSON.stringify(data),
  });
const neverSend = async () => {
  throw Error("A network request was not expected");
};

test("preview validates the form and explicitly reports non-delivery", async () => {
  const res = await handleContact(request(), {
    env: { CONTACT_MODE: "preview" },
    fetch: neverSend,
  });
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { ok: true, preview: true });
});
test("invalid input, off-site origin and honeypot never reach a webhook", async () => {
  for (const [req, status] of [
    [request({ ...payload, email: "bad" }), 400],
    [request(payload, "https://elsewhere.invalid"), 403],
    [request({ ...payload, website: "bot" }), 400],
    [request(null), 400],
  ])
    assert.equal(
      (
        await handleContact(req, {
          env: {
            CONTACT_MODE: "webhook",
            CONTACT_ENDPOINT: "https://backend.example/contact",
          },
          fetch: neverSend,
        })
      ).status,
      status,
    );
});
test("production with no configuration reports an honest non-delivery state", async () => {
  const res = await handleContact(request(), {
    env: { NODE_ENV: "production" },
    fetch: neverSend,
  });
  assert.equal(res.status, 503);
});
test("self-referential domain configuration cannot recurse", async () => {
  const res = await handleContact(request(), {
    env: {
      CONTACT_MODE: "webhook",
      CONTACT_ENDPOINT: "https://www.techgylink.com/api/contact",
      NEXT_PUBLIC_SITE_URL: "https://techgylink.com",
    },
    fetch: neverSend,
  });
  assert.equal(res.status, 503);
});
test("a confirmed webhook receives service and campaign context", async () => {
  let captured;
  const res = await handleContact(request(), {
    env: {
      CONTACT_MODE: "webhook",
      CONTACT_ENDPOINT: "https://backend.example/contact",
      CONTACT_API_TOKEN: "test-token",
    },
    fetch: async (url, options) => {
      captured = { url, options };
      return Response.json({ success: true });
    },
  });
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { ok: true });
  assert.equal(captured.url, "https://backend.example/contact");
  assert.equal(captured.options.headers.Authorization, "Bearer test-token");
  assert.equal(captured.options.redirect, "error");
  const sent = JSON.parse(captured.options.body);
  assert.deepEqual(sent.services, payload.services);
  assert.match(sent.message, /utm_source=test/);
});
test("ambiguous or failed delivery cannot show a success confirmation", async () => {
  for (const reply of [
    () => Response.json({}),
    () => Response.json({ success: false }),
    () => new Response("Unavailable", { status: 500 }),
    () =>
      new Response("<html>Login</html>", {
        headers: { "Content-Type": "text/html" },
      }),
    () => {
      throw Error("offline");
    },
  ]) {
    const res = await handleContact(request(), {
      env: {
        CONTACT_MODE: "webhook",
        CONTACT_ENDPOINT: "https://backend.example/contact",
      },
      fetch: async () => reply(),
    });
    assert.equal(res.status, 502);
  }
});

test("native Next.js accepts the browser-facing host when its internal URL differs", async () => {
 const req = new Request("http://localhost:3000/api/contact/", {method:"POST",headers:{"Content-Type":"application/json",Origin:"http://127.0.0.1:3000",Host:"127.0.0.1:3000","x-forwarded-proto":"http"},body:JSON.stringify(payload)});
 const response=await handleContact(req,{env:{CONTACT_MODE:"preview"},fetch:neverSend});
 assert.equal(response.status,200);assert.deepEqual(await response.json(),{ok:true,preview:true});
});
