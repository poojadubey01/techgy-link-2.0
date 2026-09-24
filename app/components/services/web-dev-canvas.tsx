"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Bell,
  Check,
  CircleCheck,
  CodeXml,
  Lock,
  MessageSquareText,
  Rocket,
  RotateCw,
  Route,
  Target,
  X,
} from "lucide-react";

const steps = [
  {
    tab: "Message",
    title: "Clarify the message",
    desc: "Answer the visitor's first question before designing anything.",
    Icon: MessageSquareText,
    ticks: 50,
  },
  {
    tab: "Journey",
    title: "Design the journey",
    desc: "Lay out every section around the path to an enquiry.",
    Icon: Route,
    ticks: 50,
  },
  {
    tab: "Build",
    title: "Build and connect",
    desc: "A site your team can edit, wired into the tools you use.",
    Icon: CodeXml,
    ticks: 56,
  },
  {
    tab: "Launch",
    title: "Test and launch",
    desc: "Checked on every agreed device, then live with a named owner.",
    Icon: Rocket,
    ticks: 62,
  },
];
const starts = steps.map((_, i) => steps.slice(0, i).reduce((s, x) => s + x.ticks, 0));
const TOTAL = steps.reduce((s, x) => s + x.ticks, 0);

const HEADLINE = "Freight that arrives when you said it would.";
const CTA_BASE = "Get a quote";
const CTA_EXTRA = " in 2 hours";

const css = `
@keyframes wd-pop { 0% { transform: scale(.9); opacity: 0 } 60% { transform: scale(1.03); opacity: 1 } 100% { transform: scale(1); opacity: 1 } }
@keyframes wd-rise { from { opacity: 0; transform: translateY(10px) } to { opacity: 1; transform: none } }
@keyframes wd-fade { from { opacity: 0 } to { opacity: 1 } }
@keyframes wd-blink { 50% { opacity: 0 } }
@keyframes wd-flash { 0% { box-shadow: 0 0 0 0 rgba(0,34,255,.5) } 100% { box-shadow: 0 0 0 10px rgba(0,34,255,0) } }
@keyframes wd-slide { from { opacity: 0; transform: translateX(24px) } to { opacity: 1; transform: none } }
@media (prefers-reduced-motion: reduce) {
  .wd-motion, .wd-motion * { animation: none !important; transition: none !important; }
}
`;

export function WebDevCanvas() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const id = setInterval(() => setTick((t) => (t + 1) % TOTAL), 100);
    return () => clearInterval(id);
  }, [visible]);

  let step = 0;
  starts.forEach((s, i) => {
    if (tick >= s) step = i;
  });
  const t = (tick - starts[step]) / steps[step].ticks;

  const live = step === 3 && t >= 0.66;
  const address = [
    { host: "northwind.co", path: "/sitemap" },
    { host: "northwind.co", path: "/wireframes/home" },
    { host: "cms.northwind.co", path: "/pages/home" },
    { host: "northwind.co", path: "" },
  ][step];
  const status = [
    { text: "Planning", cls: "border-amber-200 bg-amber-50 text-amber-700", dot: "bg-amber-500" },
    { text: "Wireframe", cls: "border-rule bg-[#f1f4f9] text-black/60", dot: "bg-black/40" },
    { text: "Staging", cls: "border-blue-200 bg-blue-50 text-brand", dot: "bg-brand" },
    live
      ? { text: "Live", cls: "border-emerald-200 bg-emerald-50 text-emerald-700", dot: "bg-emerald-500 animate-pulse" }
      : { text: "Testing", cls: "border-amber-200 bg-amber-50 text-amber-700", dot: "bg-amber-500" },
  ][step];

  return (
    <div
      ref={rootRef}
      className="service-demo wd-motion relative w-full overflow-hidden rounded-md border border-rule bg-[#f8f9fa] text-black select-none"
    >
      <style>{css}</style>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#0000000d_1px,transparent_1px)] bg-[size:20px_20px]" />
      <div className="pointer-events-none absolute -top-24 -right-20 h-[420px] w-[420px] rounded-full bg-blue-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-24 h-[360px] w-[360px] rounded-full bg-blue-100/60 blur-3xl" />

      <div className="relative z-10 p-6 @max-[520px]:p-3">
        {/* browser */}
        <div className="overflow-hidden rounded-xl border border-rule bg-white shadow-[0_28px_60px_-30px_rgba(15,26,52,0.45)]">
          {/* tabs = process steps */}
          <div className="flex items-end gap-1 border-b border-rule bg-[#eef1f6] px-2 pt-2">
            <span className="mr-2 hidden items-center gap-1.5 self-center pb-1 pl-1 @min-[640px]:flex">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            </span>
            {steps.map((st, i) => {
              const on = i === step;
              const done = i < step;
              return (
                <button
                  key={st.tab}
                  type="button"
                  onClick={() => setTick(starts[i])}
                  className={`group relative flex min-w-0 items-center gap-2 rounded-t-lg px-3 py-2 text-left text-[12px] transition-colors @min-[900px]:max-w-[230px] ${
                    on ? "flex-1 bg-white text-black shadow-[0_-1px_0_#e2e8f0]" : "flex-1 text-black/50 hover:bg-white/60 hover:text-black/75 @max-[520px]:flex-none"
                  }`}
                >
                  <span
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md ${
                      done ? "bg-emerald-500 text-white" : on ? "bg-brand text-white" : "bg-black/[0.06] text-black/45"
                    }`}
                  >
                    {done ? <Check className="h-3 w-3" strokeWidth={3} /> : <st.Icon className="h-3 w-3" />}
                  </span>
                  <span className={`truncate font-medium ${on ? "" : "@max-[520px]:hidden"}`}>
                    <span className="@max-[640px]:hidden">{st.title}</span>
                    <span className="hidden @max-[640px]:inline">{st.tab}</span>
                  </span>
                  <X className="ml-auto h-3 w-3 shrink-0 text-black/25 @max-[900px]:hidden" />
                  {on && (
                    <span className="absolute inset-x-2 bottom-0 h-[2px] overflow-hidden rounded-full bg-brand/15">
                      <span className="block h-full bg-brand transition-[width] duration-100 ease-linear" style={{ width: `${t * 100}%` }} />
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* toolbar */}
          <div className="flex items-center gap-3 border-b border-rule px-3 py-2">
            <span className="flex items-center gap-2 text-black/30 @max-[520px]:hidden">
              <ArrowLeft className="h-4 w-4" />
              <ArrowRight className="h-4 w-4" />
              <RotateCw className="h-3.5 w-3.5" />
            </span>
            <div className="flex min-w-0 flex-1 items-center gap-2 rounded-full bg-[#f1f4f9] px-3 py-1.5 font-mono text-[11.5px]">
              <Lock className="h-3 w-3 shrink-0 text-emerald-600" />
              <span key={step} className="truncate animate-[wd-fade_.4s_ease-out]">
                <span className="text-black/80">{address.host}</span>
                <span className="text-brand">{address.path}</span>
              </span>
            </div>
            <span
              key={status.text}
              className={`flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider animate-[wd-pop_.35s_ease-out] ${status.cls}`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
              {status.text}
            </span>
          </div>

          {/* viewport */}
          <div key={step} className="relative h-[440px] overflow-hidden bg-[#fbfcfe] animate-[wd-fade_.45s_ease-out] @max-[760px]:h-[420px]">
            {step === 0 && <MessageScene t={t} />}
            {step === 1 && <JourneyScene t={t} />}
            {step === 2 && <BuildScene t={t} />}
            {step === 3 && <LaunchScene t={t} />}
          </div>
        </div>

        {/* caption */}
        <div key={step} className="mt-4 flex items-baseline gap-3 px-1 animate-[wd-rise_.4s_ease-out] @max-[520px]:flex-col @max-[520px]:gap-0.5">
          <span className="font-mono text-[11px] text-brand">0{step + 1}</span>
          <span className="text-[14px] font-medium">{steps[step].title}</span>
          <span className="text-[13px] text-black/55">{steps[step].desc}</span>
        </div>
      </div>
    </div>
  );
}

/* ── shared ───────────────────────────────────────────────────── */
function Panel({ title, right, children, className = "" }: { title: string; right?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <div className={`flex min-h-0 min-w-0 flex-col rounded-xl border border-rule bg-white p-4 shadow-xs ${className}`}>
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-black/45">{title}</span>
        {right}
      </div>
      {children}
    </div>
  );
}

function Tick({ on }: { on: boolean }) {
  return (
    <span
      className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
        on ? "bg-emerald-500 text-white" : "border border-rule bg-white text-transparent"
      }`}
    >
      <Check className="h-2.5 w-2.5" strokeWidth={3.5} />
    </span>
  );
}

function Logo({ small = false }: { small?: boolean }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className={`rounded-[4px] bg-brand ${small ? "h-2 w-2" : "h-4 w-4"}`} />
      {!small && <span className="text-[13px] font-semibold tracking-[-0.01em]">Northwind</span>}
    </span>
  );
}

/* ── 01 · message ─────────────────────────────────────────────── */
const sitemap = ["Services", "Industries", "About", "Contact"];
const drafts = [
  { text: "Logistics solutions for modern business", verdict: "Too generic", out: 0.52 },
  { text: "Your trusted freight partner", verdict: "Says nothing new", out: 0.6 },
  { text: HEADLINE, verdict: "Answers the question", out: -1 },
];

function MessageScene({ t }: { t: number }) {
  const chosen = t >= 0.68;
  const hierarchy = t >= 0.8;
  return (
    <div className="grid h-full grid-cols-[minmax(0,0.75fr)_minmax(0,1.5fr)] gap-5 p-6 @max-[760px]:grid-cols-1 @max-[760px]:p-4">
      <Panel title="Sitemap" className="@max-[760px]:hidden">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-[12.5px] font-medium text-brand">
            <Logo small /> Home
          </div>
          <div className="ml-4 border-l border-dashed border-black/15 pl-4">
            {sitemap.map((p, i) => (
              <div key={p} className="relative mt-2.5">
                <span className="absolute -left-4 top-1/2 h-px w-4 border-t border-dashed border-black/15" />
                {t >= 0.06 + i * 0.07 && (
                  <div className="flex items-center justify-between gap-2 rounded-lg border border-rule bg-white px-3 py-2 text-[12px] animate-[wd-pop_.35s_ease-out_both]">
                    <span>{p}</span>
                    {p === "Contact" && t >= 0.42 && (
                      <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-1.5 py-0.5 text-[9.5px] font-semibold text-emerald-700 animate-[wd-pop_.35s_ease-out_both]">
                        <Target className="h-2.5 w-2.5" /> Goal
                      </span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </Panel>

      <Panel title="Home page message">
        <div className={`flex items-center gap-2 rounded-lg bg-[#f1f4f9] px-3 py-2 text-[12px] text-black/65 transition-opacity duration-500 ${t >= 0.1 ? "opacity-100" : "opacity-0"}`}>
          <MessageSquareText className="h-3.5 w-3.5 shrink-0 text-black/40" />
          <span className="@max-[520px]:hidden">Visitor asks:</span>
          <span className="font-medium text-black">&ldquo;Will my freight arrive on time?&rdquo;</span>
        </div>
        <div className="mt-3 flex flex-col gap-2">
          {drafts.map((d, i) => {
            if (t < 0.2 + i * 0.08) return null;
            const struck = d.out > 0 && t >= d.out;
            const pick = d.out < 0 && chosen;
            return (
              <div
                key={d.text}
                className={`flex items-center justify-between gap-3 rounded-lg border px-3 py-2.5 transition-all duration-300 animate-[wd-rise_.35s_ease-out_both] ${
                  pick ? "border-brand/40 bg-blue-50/70 ring-2 ring-brand/10" : "border-rule bg-white"
                }`}
              >
                <span
                  className={`min-w-0 font-display text-[18px] leading-tight tracking-[-0.02em] transition-colors duration-300 @max-[520px]:text-[15px] ${
                    struck ? "text-black/30 line-through decoration-rose-400/70" : "text-black"
                  }`}
                >
                  {d.text}
                </span>
                {struck && (
                  <span className="shrink-0 rounded-full bg-rose-50 px-2 py-0.5 text-[10px] font-medium text-rose-600 animate-[wd-pop_.3s_ease-out_both] @max-[520px]:hidden">
                    {d.verdict}
                  </span>
                )}
                {pick && (
                  <span className="flex shrink-0 items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700 animate-[wd-pop_.3s_ease-out_both]">
                    <Check className="h-3 w-3" strokeWidth={3} />
                    <span className="@max-[520px]:hidden">{d.verdict}</span>
                  </span>
                )}
              </div>
            );
          })}
        </div>
        <div className={`mt-auto flex flex-wrap items-center gap-2 pt-4 text-[11px] transition-all duration-500 ${hierarchy ? "opacity-100" : "translate-y-2 opacity-0"}`}>
          {["Promise", "Proof · 98.6% on time", "Next step · Get a quote"].map((c, i) => (
            <span key={c} className="flex items-center gap-2">
              {i > 0 && <ArrowRight className="h-3 w-3 text-black/30" />}
              <span className={`rounded-full border px-2.5 py-1 font-medium ${i === 2 ? "border-brand/30 bg-blue-50 text-brand" : "border-rule bg-white text-black/70"}`}>
                <span className="mr-1 font-mono text-black/35">{i + 1}</span>
                {c}
              </span>
            </span>
          ))}
        </div>
      </Panel>
    </div>
  );
}

/* ── 02 · journey ─────────────────────────────────────────────── */
const journey = ["Reads the promise", "Sees the proof", "Chooses a service", "Requests a quote"];

function Pin({ n, show }: { n: number; show: boolean }) {
  if (!show) return null;
  return (
    <span className="absolute -left-2.5 -top-2.5 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-brand text-[10px] font-bold text-white shadow-[0_4px_10px_-2px_rgba(0,34,255,0.6)] animate-[wd-pop_.35s_ease-out_both]">
      {n}
    </span>
  );
}

function JourneyScene({ t }: { t: number }) {
  const grid = t >= 0.04;
  const sec = (k: number) => t >= 0.1 + k * 0.08;
  const pin = (k: number) => t >= 0.55 + k * 0.09;
  const block = "animate-[wd-rise_.4s_ease-out_both]";
  return (
    <div className="grid h-full grid-cols-[minmax(0,1.7fr)_minmax(0,0.8fr)] gap-5 p-6 @max-[760px]:grid-cols-1 @max-[760px]:p-4">
      <div className="relative flex min-h-0 flex-col gap-2.5 overflow-hidden rounded-xl border border-rule bg-white p-3">
        <div className={`pointer-events-none absolute inset-0 grid grid-cols-12 gap-2 px-3 transition-opacity duration-500 ${grid ? "opacity-100" : "opacity-0"}`}>
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} className="bg-rose-400/[0.07]" />
          ))}
        </div>
        {sec(0) && (
          <div className={`relative flex h-7 items-center justify-between rounded border border-dashed border-black/15 px-2.5 ${block}`}>
            <Logo small />
            <span className="flex gap-2">
              {[0, 1, 2].map((i) => (
                <span key={i} className="h-1.5 w-8 rounded bg-black/10" />
              ))}
            </span>
            <span className="h-4 w-14 rounded-full border border-black/25" />
          </div>
        )}
        {sec(1) && (
          <div className={`relative grid flex-[1.6] grid-cols-2 gap-3 rounded border border-dashed border-black/15 p-3 ${block}`}>
            <Pin n={1} show={pin(0)} />
            <div className="flex flex-col justify-center gap-2">
              <span className="font-display text-[17px] leading-[1.1] tracking-[-0.02em] text-black/80 @max-[520px]:text-[13px]">{HEADLINE}</span>
              <span className="h-1.5 w-4/5 rounded bg-black/10" />
              <span className="mt-1 flex h-5 w-20 items-center justify-center rounded-full border border-black/30 text-[9px] font-medium text-black/60">
                {CTA_BASE}
              </span>
            </div>
            <div className="relative rounded border border-black/15 bg-[linear-gradient(to_top_right,transparent_calc(50%-0.5px),rgba(0,0,0,0.12)_50%,transparent_calc(50%+0.5px)),linear-gradient(to_bottom_right,transparent_calc(50%-0.5px),rgba(0,0,0,0.12)_50%,transparent_calc(50%+0.5px))]" />
          </div>
        )}
        {sec(2) && (
          <div className={`relative flex h-9 items-center gap-3 rounded border border-dashed border-black/15 px-3 ${block}`}>
            <Pin n={2} show={pin(1)} />
            <span className="text-[10px] font-semibold text-black/60">98.6% on time</span>
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className="h-3 w-10 rounded bg-black/[0.07]" />
            ))}
          </div>
        )}
        {sec(3) && (
          <div className={`relative grid flex-1 grid-cols-3 gap-2 ${block}`}>
            <Pin n={3} show={pin(2)} />
            {["Road", "Sea", "Warehousing"].map((s) => (
              <div key={s} className="flex flex-col gap-1.5 rounded border border-dashed border-black/15 p-2">
                <span className="h-4 w-4 rounded-full border border-black/25" />
                <span className="text-[10px] font-medium text-black/60">{s}</span>
                <span className="h-1 w-4/5 rounded bg-black/10" />
              </div>
            ))}
          </div>
        )}
        {sec(4) && (
          <div className={`relative flex h-10 items-center justify-between rounded bg-black/[0.06] px-3 ${block}`}>
            <Pin n={4} show={pin(3)} />
            <span className="h-2 w-32 rounded bg-black/15" />
            <span className="flex h-5 items-center rounded-full bg-black/60 px-3 text-[9px] font-medium text-white">{CTA_BASE}</span>
          </div>
        )}
      </div>

      <Panel title="Visitor journey" className="@max-[760px]:hidden">
        <div className="flex flex-col gap-2.5">
          {journey.map((j, k) => {
            const on = pin(k);
            return (
              <div
                key={j}
                className={`flex items-center gap-2.5 rounded-lg border px-3 py-2.5 text-[12px] transition-all duration-300 ${
                  on ? (k === 3 ? "border-brand/40 bg-blue-50 text-brand" : "border-rule bg-white text-black") : "border-dashed border-rule text-black/30"
                }`}
              >
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                    on ? "bg-brand text-white" : "bg-black/[0.06] text-black/35"
                  }`}
                >
                  {k + 1}
                </span>
                <span className="font-medium">{j}</span>
                {k === 3 && on && <Target className="ml-auto h-3.5 w-3.5" />}
              </div>
            );
          })}
        </div>
        <p className={`mt-auto pt-4 text-[11.5px] leading-relaxed text-black/55 transition-opacity duration-500 ${t >= 0.92 ? "opacity-100" : "opacity-0"}`}>
          Every section earns its place by moving the visitor one step closer to asking for a quote.
        </p>
      </Panel>
    </div>
  );
}

/* ── 03 · build ───────────────────────────────────────────────── */
const integrations = [
  { label: "Quote form → CRM", at: 0.68 },
  { label: "Analytics & consent", at: 0.76 },
  { label: "Email alerts to Sales", at: 0.84 },
];

function BuildScene({ t }: { t: number }) {
  const typed = CTA_EXTRA.slice(0, Math.floor(clamp01((t - 0.14) / 0.24) * CTA_EXTRA.length));
  const typing = t >= 0.14 && t < 0.4;
  const cta = CTA_BASE + typed;
  const publishing = t >= 0.5 && t < 0.58;
  const published = t >= 0.58;
  return (
    <div className="grid h-full grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] gap-5 p-6 @max-[760px]:grid-cols-1 @max-[760px]:p-4">
      {/* live site */}
      <div className="flex min-h-0 min-w-0 flex-col overflow-hidden rounded-xl border border-rule bg-white shadow-xs">
        <div className="flex h-11 shrink-0 items-center justify-between border-b border-rule px-4">
          <Logo />
          <span className="flex items-center gap-4 text-[11px] text-black/55 @max-[640px]:hidden">
            <span>Services</span>
            <span>Industries</span>
            <span>About</span>
          </span>
          <span className="rounded-full bg-brand px-3 py-1 text-[10.5px] font-medium text-white">{CTA_BASE}</span>
        </div>
        <div className="grid flex-1 grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] items-center gap-5 p-5 @max-[640px]:grid-cols-1">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-brand">Freight &amp; logistics</span>
            <h4 className="mt-2 font-display text-[27px] leading-[1.03] tracking-[-0.035em] @max-[1000px]:text-[22px]">{HEADLINE}</h4>
            <p className="mt-2.5 text-[11.5px] leading-relaxed text-black/55">
              Road and sea freight across 40 routes, tracked from pickup to proof of delivery.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span
                key={cta === CTA_BASE + CTA_EXTRA ? "done" : "base"}
                className={`rounded-full bg-brand px-3.5 py-2 text-[11px] font-medium text-white ${
                  cta === CTA_BASE + CTA_EXTRA ? "animate-[wd-flash_.9s_ease-out]" : ""
                } ${typing ? "ring-2 ring-brand/30 ring-offset-2" : ""}`}
              >
                {cta}
              </span>
              <span className="rounded-full border border-rule px-3.5 py-2 text-[11px] font-medium text-black/70">Track a shipment</span>
            </div>
          </div>
          <div className="relative h-full min-h-[150px] overflow-hidden rounded-xl bg-[linear-gradient(135deg,#3552ff_0%,#0022ff_50%,#0f1a34_100%)] @max-[640px]:hidden">
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 200 160" preserveAspectRatio="none" aria-hidden="true">
              <path d="M20 130 C 60 120, 70 60, 110 70 S 160 30, 185 25" fill="none" stroke="white" strokeOpacity="0.55" strokeWidth="1.6" strokeDasharray="4 5" />
              <circle cx="20" cy="130" r="4" fill="white" />
              <circle cx="185" cy="25" r="5" fill="#34d399" stroke="white" strokeWidth="1.5" />
            </svg>
            <span className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-semibold text-navy shadow">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> 98.6% on time
            </span>
          </div>
        </div>
      </div>

      {/* CMS */}
      <Panel
        title="Edit · Home"
        className="@max-[760px]:hidden"
        right={
          <span
            className={`rounded-full border px-2 py-0.5 font-mono text-[9.5px] font-semibold uppercase ${
              published ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-amber-200 bg-amber-50 text-amber-700"
            }`}
          >
            {published ? "Published" : "Draft"}
          </span>
        }
      >
        <label className="text-[10.5px] font-medium text-black/50">Headline</label>
        <div className="mt-1 rounded-md border border-rule px-2.5 py-1.5 text-[11.5px] leading-snug text-black/80">{HEADLINE}</div>
        <label className="mt-3 text-[10.5px] font-medium text-black/50">Button label</label>
        <div
          className={`mt-1 flex items-center rounded-md border px-2.5 py-1.5 text-[11.5px] transition-colors ${
            typing ? "border-brand ring-2 ring-brand/10" : "border-rule"
          }`}
        >
          {cta}
          {typing && <span className="ml-px inline-block h-3.5 w-px bg-brand animate-[wd-blink_1s_steps(1)_infinite]" />}
        </div>
        <span
          className={`mt-3 flex h-8 items-center justify-center gap-1.5 rounded-md text-[11.5px] font-medium text-white transition-all duration-300 ${
            published ? "bg-emerald-500" : publishing ? "scale-[0.97] bg-[#001bd1]" : "bg-brand"
          }`}
        >
          {published ? (
            <>
              <Check className="h-3.5 w-3.5" strokeWidth={3} /> Published
            </>
          ) : (
            "Publish changes"
          )}
        </span>
        <div className="mt-4 flex flex-col gap-2 border-t border-rule pt-3">
          {integrations.map((it) => {
            const on = t >= it.at;
            return (
              <div key={it.label} className="flex items-center justify-between gap-2 text-[11.5px]">
                <span className={on ? "text-black/80" : "text-black/40"}>{it.label}</span>
                <span className={`flex h-4 w-7 items-center rounded-full p-0.5 transition-colors duration-300 ${on ? "bg-emerald-500" : "bg-black/15"}`}>
                  <span className={`h-3 w-3 rounded-full bg-white shadow transition-transform duration-300 ${on ? "translate-x-3" : ""}`} />
                </span>
              </div>
            );
          })}
        </div>
      </Panel>
    </div>
  );
}

/* ── 04 · launch ──────────────────────────────────────────────── */
const checks = [
  "Navigation & links",
  "Quote form & email alerts",
  "Accessibility · WCAG 2.2 AA",
  "Performance score 96",
  "Tested on 6 agreed devices",
];

function MiniSite({ layout }: { layout: "desktop" | "tablet" | "phone" }) {
  const stacked = layout !== "desktop";
  return (
    <div className="flex h-full flex-col bg-white">
      <div className="flex items-center justify-between border-b border-rule px-[6%] py-[4%]">
        <span className="h-1.5 w-1.5 rounded-[2px] bg-brand" />
        <span className="h-1.5 w-[22%] rounded-full bg-brand" />
      </div>
      <div className={`flex flex-1 gap-[6%] p-[7%] ${stacked ? "flex-col" : "items-center"}`}>
        <div className="flex flex-1 flex-col gap-[6px]">
          <span className="h-1.5 w-[92%] rounded bg-navy" />
          <span className="h-1.5 w-[70%] rounded bg-navy" />
          <span className="h-1 w-[80%] rounded bg-black/15" />
          <span className="mt-1 h-2 w-[40%] rounded-full bg-brand" />
        </div>
        <div className={`rounded-md bg-[linear-gradient(135deg,#3552ff,#0022ff_50%,#0f1a34)] ${stacked ? "h-[34%]" : "h-full flex-1"}`} />
      </div>
    </div>
  );
}

function LaunchScene({ t }: { t: number }) {
  const deviceOk = [t >= 0.24, t >= 0.34, t >= 0.44];
  const live = t >= 0.66;
  const enquiry = t >= 0.78;
  return (
    <div className="relative grid h-full grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] gap-5 p-6 @max-[760px]:grid-cols-1 @max-[760px]:p-4">
      <div className="flex min-h-0 items-end justify-center gap-[4%] pb-4 @max-[760px]:hidden">
        {(
          [
            ["desktop", "w-[58%]", "aspect-[16/10] rounded-lg border-[6px]"],
            ["tablet", "w-[22%]", "aspect-[3/4] rounded-[14px] border-[5px]"],
            ["phone", "w-[12%]", "aspect-[9/19] rounded-[14px] border-[4px]"],
          ] as const
        ).map(([layout, w, frame], i) => (
          <div key={layout} className={`relative flex flex-col items-center ${w}`}>
            <div className={`relative w-full overflow-hidden border-navy bg-navy shadow-[0_20px_40px_-20px_rgba(15,26,52,0.6)] ${frame}`}>
              <MiniSite layout={layout} />
            </div>
            {layout === "desktop" && <span className="h-5 w-[14%] bg-navy/80" />}
            {layout === "desktop" && <span className="h-1.5 w-[34%] rounded-full bg-navy/80" />}
            {deviceOk[i] && (
              <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-white shadow ring-2 ring-white animate-[wd-pop_.35s_ease-out_both]">
                <Check className="h-3.5 w-3.5" strokeWidth={3} />
              </span>
            )}
          </div>
        ))}
      </div>

      <Panel title="Launch checks">
        <div className="flex flex-col gap-2.5">
          {checks.map((c, k) => (
            <div key={c} className="flex items-center gap-2.5 text-[12px]">
              <Tick on={t >= 0.1 + k * 0.1} />
              <span className={t >= 0.1 + k * 0.1 ? "text-black/80" : "text-black/35"}>{c}</span>
            </div>
          ))}
        </div>
        <div
          className={`mt-auto flex items-center gap-2.5 rounded-lg border px-3 py-2.5 text-[12.5px] font-medium transition-all duration-500 ${
            live ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-dashed border-rule text-black/35"
          }`}
        >
          <span className={`h-2 w-2 shrink-0 rounded-full ${live ? "bg-emerald-500 animate-pulse" : "bg-black/20"}`} />
          {live ? "northwind.co is live" : "Waiting for sign-off"}
        </div>
      </Panel>

      {enquiry && (
        <div className="absolute left-6 top-6 w-[300px] max-w-[calc(100%-48px)] rounded-xl border border-rule bg-white p-3 shadow-[0_20px_40px_-16px_rgba(15,26,52,0.45)] animate-[wd-slide_.45s_ease-out_both] @max-[760px]:bottom-4 @max-[760px]:left-4 @max-[760px]:top-auto">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-50 text-brand">
              <Bell className="h-3.5 w-3.5" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="text-[12px] font-semibold">New quote request</div>
              <div className="truncate text-[10.5px] text-black/50">Kestrel Foods · weekly route, 12 pallets</div>
            </div>
            <span className="font-mono text-[9.5px] text-black/35">now</span>
          </div>
          <div className="mt-2.5 flex items-center justify-between border-t border-rule pt-2 text-[10.5px]">
            <span className="flex items-center gap-1.5 text-black/60">
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-indigo-500 text-[7px] font-bold text-white">SM</span>
              Assigned to <strong className="font-semibold text-black">Sam · Sales</strong>
            </span>
            <CircleCheck className="h-3.5 w-3.5 text-emerald-500" />
          </div>
        </div>
      )}
    </div>
  );
}

function clamp01(v: number) {
  return Math.min(1, Math.max(0, v));
}
