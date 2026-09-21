"use client";
import { useEffect, useState, type FormEvent } from "react";
import { ArrowUpRight } from "@/app/components/ui/icons";
import { services } from "@/data/catalogue";
export function ContactForm({ initialService = "", campaign = "" }) {
  const [service, setService] = useState(initialService);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [draft, setDraft] = useState("");
  const [source, setSource] = useState(campaign);
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
      setStatus(result.preview ? "preview" : "sent");
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
    "text-xs font-medium uppercase tracking-[0.105em] leading-[1.6] text-brand max-[767px]:text-[11px] max-[767px]:tracking-[0.085em]";
  const buttonOutlineClass =
    "inline-flex items-center justify-center gap-7 px-7 py-4 text-sm font-medium min-h-14 border border-rule bg-transparent rounded-full max-[767px]:text-[13px] max-[767px]:min-h-[51px] max-[767px]:py-[14px] max-[767px]:px-[18px] max-[767px]:gap-5";
  const textLinkClass =
    "inline-flex items-center gap-5 text-sm font-medium leading-[1.6] text-brand max-[767px]:text-[14px]";
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
  if (status === "sent")
    return (
      <div className="bg-paper p-[45px]" role="status">
        <p className={eyebrowClass}>Thank you for your brief</p>
        <h2 className="my-[25px] mx-0 text-[47px]">
          Your next chapter
          <br />
          starts here.
        </h2>
        <p className="mb-[25px]">
          Your brief has been submitted. We’ll use the details you shared to
          continue the conversation.
        </p>
        <a className={textLinkClass} href="tel:+919100043542">
          Call +91 91000 43542 <ArrowUpRight size={18} />
        </a>
        <div style={{ marginTop: 25 }}>
          <button className={buttonOutlineClass} onClick={() => setStatus("idle")}>
            Start another enquiry
          </button>
        </div>
      </div>
    );
  const labelClass = "block text-[13px] mb-[9px] text-[#000000]";
  const optionalClass = "text-[#000000] text-[12px] ml-1";
  const fieldClass = "mb-[25px] min-w-0 max-[1023px]:mb-[22px]";
  const rowClass = "grid grid-cols-[1fr_1fr] gap-5 max-[1023px]:grid-cols-[1fr]";
  const inputClass =
    "w-full min-h-[52px] bg-white border border-rule rounded-[2px] py-3 px-[13px] text-[16px] leading-normal text-[#000000] placeholder:text-[#000000] placeholder:text-[14px]";
  const buttonBlueClass =
    "inline-flex items-center justify-center gap-7 px-7 py-4 text-sm font-medium min-h-14 border border-transparent rounded-full bg-brand text-white hover:brightness-90 disabled:opacity-65 disabled:cursor-wait max-[767px]:text-[13px] max-[767px]:min-h-[51px] max-[767px]:py-[14px] max-[767px]:px-[18px] max-[767px]:gap-5";
  return (
    <form
      className="bg-paper border border-rule p-9 max-[1023px]:p-[25px] max-[370px]:py-[25px] max-[370px]:px-5"
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
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
      <div className={fieldClass}>
        <label className={labelClass} htmlFor="message">
          Tell us about the project *
        </label>
        <textarea
          className={inputClass + " min-h-[145px] resize-y"}
          name="message"
          id="message"
          required
          maxLength={3000}
          rows={4}
          placeholder="What would you like to build or improve? Tell us what exists today and what needs to change."
        />
      </div>
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
      <button className={buttonBlueClass} type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending your brief…" : "Send project enquiry"}
        <ArrowUpRight size={19} />
      </button>
      <p className="text-[13px] text-[#000000] mt-5">
        We use these details to respond to your enquiry. Read our{" "}
        <a className="underline" href="/privacy">
          privacy notice
        </a>
        .
      </p>
      {status === "error" && (
        <div
          className="mt-[25px] bg-paper border border-rule p-5 text-[14px]"
          role="alert"
        >
          <p>{error}</p>
          <p>Your brief is still here. You can send it directly:</p>
          <div className="flex gap-5 flex-wrap mt-3.5">
            <a
              className="underline text-[#000000]"
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
            <a className="underline text-[#000000]" href="tel:+919100043542">
              Call the sales team
            </a>
          </div>
        </div>
      )}
    </form>
  );
}
