"use client";
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowUpRight, Phone } from "@/app/components/ui/icons";
import { services } from "@/data/catalogue";
export function ContactForm({ initialService = "", campaign = "" }) {
  const router = useRouter();
  const [service, setService] = useState(initialService);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [draft, setDraft] = useState("");
  const [source, setSource] = useState(campaign);
  const [moreDetail, setMoreDetail] = useState(false);
  const [message, setMessage] = useState("");
  const MAX_WORDS = 500;
  const messageWords = message.trim() ? message.trim().split(/\s+/).length : 0;
  function handleMessageChange(e: ChangeEvent<HTMLTextAreaElement>) {
    const value = e.target.value;
    const words = value.trim() ? value.trim().split(/\s+/) : [];
    if (words.length <= MAX_WORDS) {
      setMessage(value);
    } else {
      setMessage(words.slice(0, MAX_WORDS).join(" "));
    }
  }
  useEffect(() => {
    const q = new URLSearchParams(location.search);
    if (!initialService) setService(q.get("service") || "");
    const parts = [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_content",
      "utm_term",
    ]
      .filter((k) => q.get(k))
      .map((k) => k + "=" + q.get(k));
    setSource([campaign, ...parts].filter(Boolean).join(" | ").slice(0, 700));
  }, [initialService, campaign]);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    const f = new FormData(form);
    setStatus("sending");
    setError("");
    const data = {
      name: String(f.get("name") || ""),
      email: String(f.get("email") || ""),
      phone: String(f.get("phone") || ""),
      company: String(f.get("company") || ""),
      message: String(f.get("message") || ""),
      services: [service || "Help me choose"],
      budget: String(f.get("budget") || "Not specified"),
      timing: String(f.get("timing") || "Not specified"),
      source,
      website: String(f.get("website") || ""),
    };
    const text = `Hello TechGy Link,\n\n${data.message}\n\nName: ${data.name}\nCompany: ${data.company}\nEmail: ${data.email}\nPhone: ${data.phone}\nInterest: ${data.services[0]}\nTiming: ${data.timing}\nBudget: ${data.budget}\nSource: ${data.source || "Website"}`;
    setDraft(text);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        signal: AbortSignal.timeout(20000),
      });
      const result = await res.json();
      if (!res.ok || result.ok !== true)
        throw new Error(
          result.error ||
            "Your enquiry could not be sent. Please use email or call us below.",
        );
      if (result.preview) setStatus("preview");
      else router.push("/thank-you/");
    } catch (e) {
      setStatus("error");
      setError(
        e instanceof Error
          ? e.message
          : "Please try again, or email your brief.",
      );
    }
  }
  const eyebrowClass =
    "eyebrow text-brand";
  const buttonOutlineClass =
    "cta-button inline-flex items-center justify-center font-medium border border-rule bg-transparent rounded-full";
  if (status === "preview")
    return (
      <div className="bg-paper p-[45px]" role="status">
        <p className={eyebrowClass}>Local preview</p>
        <h2 className="my-[25px] mx-0 text-[47px]">Your form is working.</h2>
        <p className="mb-[25px]">
          Your brief passed validation. This is a preview: no enquiry was sent
          or stored.
        </p>
        <button
          className={buttonOutlineClass}
          style={{ marginTop: 25 }}
          onClick={() => setStatus("idle")}
        >
          Return to the form
        </button>
      </div>
    );
  const labelClass = "block text-[13px] mb-[9px] max-[1023px]:mb-1.5 text-black";
  const optionalClass = "text-black text-[12px] ml-1";
  const fieldClass = "mb-[25px] min-w-0 max-[1023px]:mb-3.5";
  const rowClass = "grid grid-cols-[1fr_1fr] gap-x-5 max-[1023px]:grid-cols-[1fr]";
  const inputClass =
    "w-full min-h-[52px] max-[1023px]:min-h-11 bg-white border border-white rounded-[2px] py-3 max-[1023px]:py-2.5 px-[13px] text-[16px] leading-normal text-black placeholder:text-black/60 focus-visible:outline-brand placeholder:text-[14px]";
  const buttonBlueClass =
    "cta-button inline-flex items-center justify-center font-medium border border-transparent rounded-full bg-white text-brand hover:brightness-90 disabled:opacity-65 disabled:cursor-wait";
  return (
    <form
      className="bg-[#e2e8f0] text-black border border-brand p-9 [&_a:focus-visible]:outline-brand [&_button:focus-visible]:outline-brand max-[1023px]:p-[25px] max-[370px]:py-[25px] max-[370px]:px-5"
      onSubmit={submit}
    >
      <div
        className="absolute left-[-10000px] w-px h-px overflow-hidden"
        aria-hidden="true"
      >
        <label htmlFor={"website-" + campaign}>Website</label>
        <input
          name="website"
          id={"website-" + campaign}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <div className={rowClass}>
        <div className={fieldClass}>
          <label className={labelClass} htmlFor="name">
            Your name *
          </label>
          <input
            className={inputClass}
            name="name"
            id="name"
            autoComplete="name"
            required
            maxLength={100}
            placeholder="Your full name"
          />
        </div>
        <div className={fieldClass}>
          <label className={labelClass} htmlFor="phone">
            Phone *
          </label>
          <input
            className={inputClass}
            type="tel"
            name="phone"
            id="phone"
            autoComplete="tel"
            required
            maxLength={40}
            placeholder="Include country code"
          />
        </div>
      </div>
      <div className={rowClass}>
        <div className={fieldClass}>
          <label className={labelClass} htmlFor="email">
            Email *
          </label>
          <input
            className={inputClass}
            type="email"
            name="email"
            id="email"
            autoComplete="email"
            required
            maxLength={254}
            placeholder="you@company.com"
          />
        </div>
        <div className={fieldClass}>
          <label className={labelClass} htmlFor="company">
            Company <span className={optionalClass}>Optional</span>
          </label>
          <input
            className={inputClass}
            name="company"
            id="company"
            autoComplete="organization"
            maxLength={150}
            placeholder="Your organisation"
          />
        </div>
      </div>
      <div className={fieldClass}>
        <label className={labelClass} id="service-label" htmlFor="service">
          What can we help with?
        </label>
        <select
          className={inputClass}
          id="service"
          value={service || "Help me choose"}
          onChange={(e) => setService(e.target.value)}
        >
          {[
            "Help me choose",
            ...services.map((s) => s.name),
            ...(!services.some((s) => s.name === service) &&
            service &&
            service !== "Help me choose"
              ? [service]
              : []),
          ].map((s) => (
            <option key={s} value={s} className="bg-white text-black">
              {s}
            </option>
          ))}
        </select>
      </div>
      <div className={fieldClass}>
        <div className="flex items-baseline justify-between gap-2 mb-[9px] max-[1023px]:mb-1.5">
          <label className="text-[13px] text-black" htmlFor="message">
            Tell us about the project <span className={optionalClass}>Optional</span>
          </label>
          <span className="shrink-0 text-black/60 text-[11px]">
            {messageWords}/{MAX_WORDS} words
          </span>
        </div>
        <textarea
          className={inputClass + " min-h-[145px] max-[1023px]:min-h-[110px] resize-y"}
          name="message"
          id="message"
          value={message}
          onChange={handleMessageChange}
          maxLength={4000}
          rows={4}
          placeholder="What would you like to build or improve? Tell us what exists today and what needs to change."
        />
      </div>
      {moreDetail ? (
        <div className={rowClass}>
          <div className={fieldClass}>
            <label className={labelClass} htmlFor="timing">
              Expected timing <span className={optionalClass}>Optional</span>
            </label>
            <input
              className={inputClass}
              id="timing"
              name="timing"
              maxLength={120}
              placeholder="For example, this quarter"
            />
          </div>
          <div className={fieldClass}>
            <label className={labelClass} htmlFor="budget">
              Budget range <span className={optionalClass}>Optional</span>
            </label>
            <input
              className={inputClass}
              id="budget"
              name="budget"
              maxLength={100}
              placeholder="Amount and currency"
            />
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setMoreDetail(true)}
          className="mb-6 text-[13px] font-medium text-black underline underline-offset-2"
        >
          + Add timing and budget (optional)
        </button>
      )}
      <label className="flex items-start gap-3 mb-6 cursor-pointer text-[13px] leading-[1.6] text-black">
        <input
          type="checkbox"
          name="communicationConsent"
          required
          className="mt-0.5 h-4 w-4 shrink-0 accent-brand focus-visible:outline-brand"
        />
        <span>Yes, I&apos;m OK to receive further communication over the details shared here.</span>
      </label>
      <button className={buttonBlueClass} type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending your brief…" : "Submit"}
        <ArrowUpRight size={19} />
      </button>
      <p className="text-[13px] text-black mt-5">
        We use these details to respond to your enquiry. Read our{" "}
        <a className="underline" href="/privacy">
          privacy notice
        </a>
        .
      </p>
      {status === "error" && (
        <div
          className="mt-[25px] bg-white/10 border border-white/60 p-5 text-[14px]"
          role="alert"
        >
          <p>{error}</p>
          <p>Your brief is still here. You can send it directly:</p>
          <div className="flex gap-5 flex-wrap mt-3.5">
            <a
              className="underline text-black"
              href={
                "mailto:sales@techgylink.com?subject=" +
                encodeURIComponent(
                  "Project enquiry — " + (service || "TechGy Link"),
                ) +
                "&body=" +
                encodeURIComponent(draft)
              }
            >
              Open email draft
            </a>
            <a className="inline-flex items-center gap-2 underline text-black" href="tel:+919989858282">
              <Phone size={16} className="shrink-0" /> Call the sales team
            </a>
          </div>
        </div>
      )}
    </form>
  );
}
