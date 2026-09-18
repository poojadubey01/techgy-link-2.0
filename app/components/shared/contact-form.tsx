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
  if (status === "preview")
    return (
      <div className="enquiry-success" role="status">
        <p className="eyebrow">Local preview</p>
        <h2>Your form is working.</h2>
        <p>
          Your brief passed validation. This is a preview: no enquiry was sent
          or stored.
        </p>
        <button
          className="button outline"
          style={{ marginTop: 25 }}
          onClick={() => setStatus("idle")}
        >
          Return to the form
        </button>
      </div>
    );
  if (status === "sent")
    return (
      <div className="enquiry-success" role="status">
        <p className="eyebrow">Thank you for your brief</p>
        <h2>
          Your next chapter
          <br />
          starts here.
        </h2>
        <p>
          Your brief has been submitted. We’ll use the details you shared to
          continue the conversation.
        </p>
        <a className="text-link" href="tel:+919100043542">
          Call +91 91000 43542 <ArrowUpRight size={18} />
        </a>
        <div style={{ marginTop: 25 }}>
          <button className="button outline" onClick={() => setStatus("idle")}>
            Start another enquiry
          </button>
        </div>
      </div>
    );
  return (
    <form className="contact-form" onSubmit={submit}>
      <div className="form-trap" aria-hidden="true">
        <label htmlFor={"website-" + campaign}>Website</label>
        <input
          name="website"
          id={"website-" + campaign}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <div className="form-row">
        <div className="form-field">
          <label htmlFor="name">Your name *</label>
          <input
            name="name"
            id="name"
            autoComplete="name"
            required
            maxLength={100}
            placeholder="Your full name"
          />
        </div>
        <div className="form-field">
          <label htmlFor="company">
            Company <span>Optional</span>
          </label>
          <input
            name="company"
            id="company"
            autoComplete="organization"
            maxLength={150}
            placeholder="Your organisation"
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-field">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            name="email"
            id="email"
            autoComplete="email"
            required
            maxLength={254}
            placeholder="you@company.com"
          />
        </div>
        <div className="form-field">
          <label htmlFor="phone">Phone *</label>
          <input
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
      <div className="form-field">
        <label id="service-label" htmlFor="service">
          What can we help with?
        </label>
        <select
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
      <div className="form-field">
        <label htmlFor="message">Tell us about the project *</label>
        <textarea
          name="message"
          id="message"
          required
          maxLength={3000}
          rows={4}
          placeholder="What would you like to build or improve? Tell us what exists today and what needs to change."
        />
      </div>
      <div className="form-row">
        <div className="form-field">
          <label htmlFor="timing">
            Expected timing <span>Optional</span>
          </label>
          <input
            id="timing"
            name="timing"
            maxLength={120}
            placeholder="For example, this quarter"
          />
        </div>
        <div className="form-field">
          <label htmlFor="budget">
            Budget range <span>Optional</span>
          </label>
          <input
            id="budget"
            name="budget"
            maxLength={100}
            placeholder="Amount and currency"
          />
        </div>
      </div>
      <button
        className="button blue"
        type="submit"
        disabled={status === "sending"}
      >
        {status === "sending" ? "Sending your brief…" : "Send project enquiry"}
        <ArrowUpRight size={19} />
      </button>
      <p className="form-note">
        We use these details to respond to your enquiry. Read our{" "}
        <a href="/privacy">privacy notice</a>.
      </p>
      {status === "error" && (
        <div className="contact-error" role="alert">
          <p>{error}</p>
          <p>Your brief is still here. You can send it directly:</p>
          <div>
            <a
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
            <a href="tel:+919100043542">Call the sales team</a>
          </div>
        </div>
      )}
    </form>
  );
}
