"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  BadgeCheck,
  CalendarCheck,
  Check,
  CircleCheck,
  Clock,
  Eye,
  FileText,
  Flame,
  MousePointer2,
  Search,
  Trophy,
  UserPlus,
  Zap,
} from "lucide-react";

const STAGE_TICKS = 30;
const JOURNEY_TICKS = STAGE_TICKS * 5;
const CYCLE_TICKS = JOURNEY_TICKS + 30;

const stages = [
  { title: "Reach", tool: "Search ads" },
  { title: "Capture", tool: "Landing page" },
  { title: "Qualify", tool: "CRM" },
  { title: "Follow up", tool: "WhatsApp" },
  { title: "Close", tool: "E-sign" },
];

const funnel = [
  { label: "Reached", Icon: Eye, base: 48200 },
  { label: "Leads", Icon: UserPlus, base: 186 },
  { label: "Qualified", Icon: BadgeCheck, base: 64 },
  { label: "Meetings", Icon: CalendarCheck, base: 29 },
  { label: "Won", Icon: Trophy, base: 12 },
];

// When the featured lead crosses each funnel step: [stage, local progress].
const milestones: [number, number][] = [
  [0, 0.7],
  [1, 0.8],
  [2, 0.72],
  [3, 0.64],
  [4, 0.7],
];

const GAP = 12;
const colCenter = (pos: number) => `calc((100% - ${GAP * 4}px) * ${((pos + 0.5) / 5).toFixed(4)} + ${(pos * GAP).toFixed(2)}px)`;

const css = `
@keyframes mk-fade { from { opacity: 0; transform: translateY(6px) } to { opacity: 1; transform: none } }
@keyframes mk-pop { 0% { transform: scale(.88); opacity: 0 } 60% { transform: scale(1.04); opacity: 1 } 100% { transform: scale(1); opacity: 1 } }
@keyframes mk-blink { 50% { opacity: 0 } }
@keyframes mk-float { 0% { transform: translateY(4px); opacity: 0 } 25% { opacity: 1 } 100% { transform: translateY(-16px); opacity: 0 } }
@keyframes mk-ripple { from { transform: translate(-50%, -50%) scale(.3); opacity: .7 } to { transform: translate(-50%, -50%) scale(2.4); opacity: 0 } }
@keyframes mk-dots { 0%, 80%, 100% { transform: translateY(0); opacity: .35 } 40% { transform: translateY(-2px); opacity: 1 } }
@keyframes mk-stamp { 0% { transform: rotate(-9deg) scale(1.7); opacity: 0 } 55% { transform: rotate(-9deg) scale(.94); opacity: 1 } 100% { transform: rotate(-9deg) scale(1); opacity: 1 } }
@keyframes mk-confetti { 0% { transform: translate(0, 0) rotate(0); opacity: 1 } 100% { transform: translate(var(--dx), var(--dy)) rotate(var(--r)); opacity: 0 } }
@media (prefers-reduced-motion: reduce) {
  .mk-motion, .mk-motion * { animation: none !important; }
}
`;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const usd = (v: number) => `$${v.toLocaleString("en-US")}`;

export function MarketingCanvas() {
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
    const id = setInterval(() => setTick((t) => (t + 1) % CYCLE_TICKS), 100);
    return () => clearInterval(id);
  }, [visible]);

  return (
    <div
      ref={rootRef}
      className="service-demo relative w-full h-full bg-[#f8f9fa] text-black overflow-hidden flex flex-col select-none rounded-md border border-rule font-sans"
    >
      <style>{css}</style>
      <div className="absolute inset-0 bg-[radial-gradient(#0000000d_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
      <div className="absolute -top-24 -right-20 w-[420px] h-[420px] rounded-full bg-blue-200/40 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-24 w-[380px] h-[380px] rounded-full bg-emerald-100/50 blur-3xl pointer-events-none" />

      <div className="sv-body relative z-10 flex-1 flex flex-col min-h-0 p-6 @max-[520px]:p-3">
        <JourneyView tick={tick} />
      </div>
    </div>
  );
}

function JourneyView({ tick }: { tick: number }) {
  const journeyDone = tick >= JOURNEY_TICKS;
  const stage = Math.min(4, Math.floor(tick / STAGE_TICKS));
  const t = journeyDone ? 1 : (tick - stage * STAGE_TICKS) / STAGE_TICKS;
  const hit = milestones.map(([s, at]) => stage > s || (stage === s && t >= at));
  const [clicked, captured, qualified, met, won] = hit;

  const travel = stage < 4 && t > 0.86 ? easeInOut((t - 0.86) / 0.14) : 0;
  const pos = stage + travel;

  const values = funnel.map((f, i) => (i === 0 ? f.base + tick * 31 : f.base + (hit[i] ? 1 : 0)));
  const lifecycle = won ? "Customer" : met ? "Meeting booked" : qualified ? "SQL" : captured ? "Lead" : "Visitor";

  const event = journeyEvent(stage, t, journeyDone);

  return (
    <div className="flex-1 flex flex-col gap-3 min-h-0 animate-[mk-fade_.4s_ease-out]">
      {/* funnel strip */}
      <div className="relative rounded-xl border border-rule bg-white shadow-xs overflow-hidden">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
          <defs>
            <linearGradient id="mk-funnel-fill" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#0022ff" stopOpacity="0.07" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.12" />
            </linearGradient>
            <clipPath id="mk-funnel-clip">
              <path d="M0 6 L100 30 L100 70 L0 94 Z" />
            </clipPath>
          </defs>
          <path d="M0 6 L100 30 L100 70 L0 94 Z" fill="url(#mk-funnel-fill)" />
          <rect
            y="0"
            width="20"
            height="100"
            fill="#0022ff"
            opacity="0.09"
            clipPath="url(#mk-funnel-clip)"
            style={{ x: `${stage * 20}px`, transition: "x 500ms ease" } as CSSProperties}
          />
        </svg>
        <div className="relative grid grid-cols-5 gap-3">
          {funnel.map((f, i) => {
            const current = i === stage;
            const v = values[i];
            const conv = i < funnel.length - 1 ? (values[i + 1] / v) * 100 : 0;
            return (
              <div key={f.label} className="relative py-3 px-2 flex flex-col items-center text-center min-w-0 @max-[520px]:px-0">
                <span
                  className={`flex items-center gap-1 font-mono text-[9.5px] uppercase tracking-wider transition-colors @max-[520px]:text-[7.5px] @max-[520px]:tracking-normal ${
                    current ? "text-brand" : "text-black/45"
                  }`}
                >
                  <f.Icon className="h-3 w-3 @max-[520px]:hidden" />
                  {f.label}
                </span>
                <span className="relative mt-1 font-display text-[24px] leading-none tabular-nums tracking-[-0.02em] @max-[520px]:text-[17px]">
                  {i === 0 ? `${(v / 1000).toFixed(1)}k` : v}
                  {i > 0 && hit[i] && (
                    <span className="mk-motion absolute -right-5 -top-1 text-[11px] font-mono font-bold text-emerald-600 animate-[mk-float_1.2s_ease-out_forwards]">
                      +1
                    </span>
                  )}
                </span>
                {i < funnel.length - 1 && (
                  <span className="absolute top-1/2 -translate-y-1/2 z-10 -translate-x-1/2 rounded-full border border-rule bg-white px-1.5 py-0.5 font-mono text-[9px] text-black/55 shadow-xs @max-[640px]:hidden" style={{ left: `calc(100% + ${GAP / 2}px)` }}>
                    {conv < 1 ? conv.toFixed(1) : Math.round(conv)}%
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* track */}
      <div className="relative h-[30px] @max-[640px]:hidden">
        <div
          className="absolute top-1/2 -translate-y-1/2 h-[2px] bg-[repeating-linear-gradient(90deg,#cbd5e1_0_4px,transparent_4px_8px)]"
          style={{ left: colCenter(0), right: `calc((100% - ${GAP * 4}px) * 0.1)` }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 h-[2px] rounded-full bg-gradient-to-r from-brand/50 to-brand"
          style={{ left: colCenter(0), width: `calc((100% - ${GAP * 4}px) * ${(pos / 5).toFixed(4)} + ${(pos * GAP).toFixed(2)}px)` }}
        />
        {stages.map((s, i) => (
          <span
            key={s.title}
            className={`absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full border-2 transition-colors ${
              i <= pos ? "bg-brand border-brand" : "bg-white border-slate-300"
            }`}
            style={{ left: colCenter(i) }}
          />
        ))}
        <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 z-10" style={{ left: colCenter(pos) }}>
          <span className="mk-motion absolute inset-0 rounded-full bg-brand/30 animate-ping" />
          <span
            className={`relative flex items-center justify-center w-7 h-7 rounded-full text-[10px] font-bold text-white ring-4 ring-white shadow-[0_6px_16px_-4px_rgba(0,34,255,0.6)] transition-colors duration-500 ${
              captured ? "bg-brand" : "bg-slate-400"
            }`}
          >
            {captured ? "AR" : "?"}
          </span>
        </div>
      </div>

      {/* stage cards */}
      <div className="grid grid-cols-5 gap-3 @max-[640px]:grid-cols-1">
        {stages.map((s, i) => {
          const active = i === stage;
          const complete = i < stage || (journeyDone && i === 4);
          const localT = active ? t : complete ? 1 : 0;
          return (
            <div
              key={s.title}
              className={`relative h-[262px] rounded-xl border p-3 flex flex-col gap-2.5 transition-all duration-500 min-w-0 ${
                active
                  ? "bg-white border-brand/50 ring-1 ring-brand/20 shadow-[0_18px_36px_-18px_rgba(0,34,255,0.5)] -translate-y-1"
                  : complete
                    ? "bg-white border-emerald-200 shadow-xs @max-[640px]:hidden"
                    : "bg-white/60 border-dashed border-slate-300 @max-[640px]:hidden"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-1.5 min-w-0">
                  <span
                    className={`shrink-0 w-5 h-5 rounded-md flex items-center justify-center font-mono text-[9.5px] font-bold transition-colors ${
                      complete ? "bg-emerald-500 text-white" : active ? "bg-brand text-white" : "bg-slate-100 text-black/40"
                    }`}
                  >
                    {complete ? <Check className="h-3 w-3" strokeWidth={3} /> : `0${i + 1}`}
                  </span>
                  <span className={`text-[12.5px] font-medium truncate ${active || complete ? "text-black" : "text-black/40"}`}>
                    {s.title}
                  </span>
                </span>
                <span className="shrink-0 font-mono text-[9px] text-black/45 bg-[#f1f4f9] border border-rule rounded px-1.5 py-0.5">
                  {s.tool}
                </span>
              </div>
              <div className={`relative flex-1 min-h-0 transition-opacity duration-500 ${active || complete ? "" : "opacity-40"}`}>
                {i === 0 && <ReachScene t={localT} />}
                {i === 1 && <CaptureScene t={localT} />}
                {i === 2 && <QualifyScene t={localT} />}
                {i === 3 && <FollowUpScene t={localT} />}
                {i === 4 && <CloseScene t={localT} />}
              </div>
            </div>
          );
        })}
      </div>

      {/* lead record */}
      <div className="rounded-xl border border-rule bg-white px-4 py-3 shadow-xs flex flex-col gap-2.5">
        <div className="flex items-center gap-x-5 gap-y-2 flex-wrap">
          <div className="flex items-center gap-2.5 min-w-0">
            <span
              className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-[12px] font-bold text-white transition-colors duration-500 ${
                captured ? "bg-gradient-to-br from-[#4d66ff] to-brand" : "bg-slate-300"
              }`}
            >
              {captured ? "AR" : "?"}
            </span>
            <div className="min-w-0">
              <div key={captured ? "known" : "anon"} className="text-[13px] font-medium truncate animate-[mk-fade_.35s_ease-out]">
                {captured ? "Ananya Rao" : "Anonymous visitor"}
              </div>
              <div className="text-[10.5px] text-black/50 truncate">
                {captured ? "Head of Operations · Northwind Logistics" : "#V-4821 · from search"}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-x-5 gap-y-1 flex-wrap font-mono text-[10.5px]">
            <Field label="Source" value={clicked ? "Search ad" : "—"} />
            <Field label="Score" value={qualified ? "86 · Hot" : "—"} tone={qualified ? "text-orange-600" : undefined} />
            <Field label="Owner" value={hit[2] && (stage > 2 || t >= 0.84) ? "Rahul M." : "—"} />
            <Field label="Deal" value={stage === 4 ? usd(Math.round(48000 * easeOut(clamp01(t / 0.55)))) : "—"} tone={won ? "text-emerald-600" : undefined} />
          </div>
          <span
            key={lifecycle}
            className={`ml-auto shrink-0 rounded-full border px-2.5 py-1 font-mono text-[10px] font-semibold animate-[mk-pop_.4s_ease-out] ${
              won ? "bg-emerald-50 border-emerald-200 text-emerald-700" : "bg-blue-50 border-blue-200 text-brand"
            }`}
          >
            {lifecycle}
          </span>
        </div>
        <div className="flex items-center justify-between gap-3 border-t border-rule pt-2.5 text-[11.5px] text-black/70">
          <span key={event.text} className="flex items-center gap-2 min-w-0 animate-[mk-fade_.35s_ease-out]">
            {event.ok ? (
              <CircleCheck className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
            ) : (
              <Zap className="h-3.5 w-3.5 shrink-0 text-brand" />
            )}
            <span className="truncate">{event.text}</span>
          </span>
          <span className="font-mono text-brand font-medium shrink-0 @max-[520px]:hidden">Every touchpoint attributed</span>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, tone }: { label: string; value: string; tone?: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className="text-[9px] uppercase tracking-wider text-black/40">{label}</span>
      <span className={`tabular-nums font-medium ${value === "—" ? "text-black/25" : tone ?? "text-black/80"}`}>{value}</span>
    </span>
  );
}

function journeyEvent(stage: number, t: number, done: boolean) {
  if (done) return { ok: true, text: "Closed-won · $48,000 · attributed to the search campaign" };
  switch (stage) {
    case 0:
      if (t < 0.42) return { ok: false, text: "Buyer searching “office fit-out partner”" };
      if (t < 0.7) return { ok: false, text: "Your ad served · position 1 · relevant keyword match" };
      return { ok: true, text: "Ad clicked → landing page · $2.10 cost per click" };
    case 1:
      if (t < 0.8) return { ok: false, text: "Visitor on /consult · completing the enquiry form" };
      return { ok: true, text: "Enquiry captured → CRM in 0.4s · source tagged" };
    case 2:
      if (t < 0.72) return { ok: false, text: "Scoring against your ideal customer · budget, timeline, role" };
      if (t < 0.84) return { ok: true, text: "Scored 86 · flagged as a hot lead" };
      return { ok: true, text: "Routed to Rahul M. · 5-minute response target" };
    case 3:
      if (t < 0.64) return { ok: true, text: "WhatsApp follow-up sent within 4 minutes" };
      if (t < 0.84) return { ok: true, text: "Site visit booked · Thursday 11:00" };
      return { ok: true, text: "Proposal sent · opened 3 times" };
    default:
      if (t < 0.7) return { ok: false, text: "Negotiation · revised proposal accepted" };
      return { ok: true, text: "Closed-won · $48,000 · attributed to the search campaign" };
  }
}

function Caret() {
  return <span className="mk-motion inline-block w-px h-3 bg-brand ml-px align-middle animate-[mk-blink_1s_steps(1)_infinite]" />;
}

function ReachScene({ t }: { t: number }) {
  const q = "office fit-out partner";
  const typed = q.slice(0, Math.floor(clamp01(t / 0.38) * q.length));
  const showAd = t >= 0.42;
  const clicked = t >= 0.7;
  const cursorK = easeOut(clamp01((t - 0.5) / 0.2));
  return (
    <div className="h-full flex flex-col gap-2">
      <div className="flex items-center gap-1.5 h-7 rounded-full border border-rule bg-white px-2.5 text-[10.5px] text-black/80 shadow-xs">
        <Search className="h-3 w-3 text-black/40 shrink-0" />
        <span className="truncate">{typed}</span>
        {t > 0 && !showAd && <Caret />}
      </div>
      <div
        className={`relative rounded-lg border p-2 transition-all duration-300 ${showAd ? "opacity-100" : "opacity-0 translate-y-1"} ${
          clicked ? "border-brand/40 bg-blue-50/60 ring-2 ring-brand/15" : "border-rule bg-white"
        }`}
      >
        <div className="flex items-center gap-1 font-mono text-[8.5px] text-black/45">
          <span className="px-1 rounded bg-black/[0.06] text-black/65 font-semibold">Sponsored</span>
          yourbrand.com
        </div>
        <div className="mt-1 text-[11.5px] font-medium text-brand leading-tight">Office fit-outs, delivered on schedule</div>
        <div className="mt-0.5 text-[9.5px] text-black/50 leading-snug">Free consultation · 3D layout in 48h</div>
        {t >= 0.5 && (
          <span
            className="absolute right-6 bottom-3"
            style={{ transform: `translate(${(1 - cursorK) * 34}px, ${(1 - cursorK) * 26}px)` }}
          >
            {clicked && (
              <span className="mk-motion absolute left-0 top-0 w-5 h-5 rounded-full bg-brand/40 animate-[mk-ripple_.8s_ease-out_forwards]" />
            )}
            <MousePointer2 className="relative h-4 w-4 fill-black stroke-white" strokeWidth={1.5} />
          </span>
        )}
      </div>
      <div className="flex flex-col gap-1.5 px-1 pt-1">
        {[82, 64, 90, 52].map((w, i) => (
          <span key={i} className={`h-1.5 rounded-full ${i % 2 ? "bg-black/[0.06]" : "bg-black/10"}`} style={{ width: `${w}%` }} />
        ))}
      </div>
      <div className="mt-auto flex items-center justify-between gap-1 font-mono text-[8.5px] text-black/50">
        {([
          ["Search", "bg-blue-500"],
          ["Social", "bg-indigo-500"],
          ["LinkedIn", "bg-sky-600"],
        ] as const).map(([c, dot]) => (
          <span key={c} className="flex items-center gap-1 truncate">
            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dot}`} />
            {c}
          </span>
        ))}
      </div>
    </div>
  );
}

function CaptureScene({ t }: { t: number }) {
  const fields = [
    ["Name", "Ananya Rao"],
    ["Work email", "ananya@northwind.co"],
    ["Company", "Northwind Logistics"],
  ] as const;
  const submitted = t >= 0.8;
  return (
    <div className="h-full flex flex-col rounded-lg border border-rule bg-white overflow-hidden shadow-xs">
      <div className="flex items-center gap-1 px-2 h-5 bg-[#f1f4f9] border-b border-rule shrink-0">
        <span className="w-1.5 h-1.5 rounded-full bg-[#ff5f57]" />
        <span className="w-1.5 h-1.5 rounded-full bg-[#febc2e]" />
        <span className="w-1.5 h-1.5 rounded-full bg-[#28c840]" />
        <span className="ml-1 font-mono text-[8.5px] text-black/40 truncate">yourbrand.com/consult</span>
      </div>
      <div className="flex-1 p-2 flex flex-col gap-1.5 min-h-0">
        <div className="text-[11.5px] font-display font-medium leading-tight">Plan your new office</div>
        {fields.map(([label, value], i) => {
          const start = 0.06 + i * 0.23;
          const frac = clamp01((t - start) / 0.2);
          const focused = !submitted && t >= start && t < start + 0.23;
          return (
            <div key={label}>
              <div className="font-mono text-[8px] uppercase tracking-wider text-black/40">{label}</div>
              <div
                className={`h-5 rounded border px-1.5 flex items-center text-[10px] truncate transition-colors ${
                  focused ? "border-brand ring-2 ring-brand/10" : "border-rule"
                }`}
              >
                {value.slice(0, Math.floor(frac * value.length))}
                {focused && <Caret />}
              </div>
            </div>
          );
        })}
        <span
          className={`mt-auto h-6 rounded-md text-[10px] font-medium flex items-center justify-center gap-1 text-white transition-all duration-300 ${
            submitted ? "bg-emerald-500" : t >= 0.74 ? "bg-[#001bd1] scale-[0.97]" : "bg-brand"
          }`}
        >
          {submitted ? (
            <>
              <Check className="h-3 w-3" strokeWidth={3} /> Request sent
            </>
          ) : (
            "Book free consultation"
          )}
        </span>
      </div>
    </div>
  );
}

function QualifyScene({ t }: { t: number }) {
  const score = Math.round(86 * easeOut(clamp01(t / 0.65)));
  const R = 24;
  const C = 2 * Math.PI * R;
  const hot = t >= 0.72;
  const assigned = t >= 0.84;
  const signals = [
    ["Budget", "$40–60k"],
    ["Timeline", "< 3 months"],
    ["Role", "Decision maker"],
    ["Intent", "Pricing page 3×"],
  ];
  return (
    <div className="h-full flex flex-col gap-2">
      <div className="flex items-center gap-2.5">
        <div className="relative w-[58px] h-[58px] shrink-0">
          <svg viewBox="0 0 58 58" className="absolute inset-0 -rotate-90" aria-hidden>
            <circle cx="29" cy="29" r={R} fill="none" stroke="#eef1f8" strokeWidth="5" />
            <circle
              cx="29"
              cy="29"
              r={R}
              fill="none"
              stroke={score > 70 ? "#10b981" : "#0022ff"}
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray={C}
              strokeDashoffset={C * (1 - score / 100)}
              style={{ transition: "stroke-dashoffset 120ms linear, stroke 300ms" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-display text-[17px] leading-none tabular-nums">{score}</span>
            <span className="font-mono text-[7px] uppercase tracking-wider text-black/40">score</span>
          </div>
        </div>
        <div className="min-w-0 flex flex-col gap-1">
          <span
            className={`self-start flex items-center gap-1 rounded-full border px-2 py-0.5 text-[9.5px] font-semibold transition-colors duration-300 ${
              hot ? "bg-orange-50 border-orange-200 text-orange-600" : "bg-slate-50 border-rule text-black/35"
            }`}
          >
            <Flame className="h-3 w-3" />
            {hot ? "Hot lead" : "Scoring…"}
          </span>
          <span className="font-mono text-[8.5px] text-black/45 truncate">Fit 92 · Intent 81</span>
        </div>
      </div>
      <ul className="flex flex-col gap-1">
        {signals.map(([k, v], i) => {
          const on = t >= 0.12 + i * 0.14;
          return (
            <li key={k} className="flex items-center justify-between gap-2 text-[10px]">
              <span className="flex items-center gap-1.5 min-w-0">
                <span
                  className={`shrink-0 w-3.5 h-3.5 rounded-full flex items-center justify-center transition-colors duration-300 ${
                    on ? "bg-emerald-500 text-white" : "bg-slate-100 text-transparent"
                  }`}
                >
                  <Check className="h-2 w-2" strokeWidth={3.5} />
                </span>
                <span className="text-black/45">{k}</span>
              </span>
              <span className={`font-medium truncate transition-opacity duration-300 ${on ? "opacity-100" : "opacity-0"}`}>{v}</span>
            </li>
          );
        })}
      </ul>
      <div
        className={`mt-auto flex items-center gap-1.5 rounded-md border px-2 py-1.5 text-[10px] transition-all duration-300 ${
          assigned ? "border-brand/25 bg-blue-50/70 text-black/75" : "border-dashed border-rule text-black/35"
        }`}
      >
        <span
          className={`shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-[7px] font-bold text-white ${
            assigned ? "bg-indigo-500" : "bg-slate-300"
          }`}
        >
          RM
        </span>
        <span className="truncate">
          {assigned ? (
            <>
              Routed to <strong className="font-semibold">Rahul M.</strong> · Sales
            </>
          ) : (
            "Awaiting routing"
          )}
        </span>
      </div>
    </div>
  );
}

function FollowUpScene({ t }: { t: number }) {
  const msgs = [
    { me: true, at: 0.1, text: "Hi Ananya, thanks for your enquiry! Here's our fit-out portfolio.", file: true },
    { me: false, at: 0.4, text: "Looks great. Can we meet Thursday?" },
    { me: true, at: 0.64, text: "Booked · Thu 11:00 site visit ✓" },
  ];
  const typing = t > 0 ? msgs.find((m) => t >= m.at - 0.1 && t < m.at) : undefined;
  const chips = t >= 0.84;
  return (
    <div className="h-full flex flex-col gap-1.5">
      <div className="flex-1 min-h-0 flex flex-col rounded-lg overflow-hidden border border-rule bg-[#efeae2]">
        <div className="flex items-center gap-1.5 px-2 h-6 bg-emerald-600 text-white shrink-0">
          <span className="w-4 h-4 rounded-full bg-white/25 flex items-center justify-center text-[7px] font-bold">AR</span>
          <span className="text-[9.5px] font-medium">Ananya Rao</span>
          <span className="ml-auto text-[8px] text-white/75">{t > 0.4 ? "online" : "replied in 4 min"}</span>
        </div>
        <div className="flex-1 min-h-0 flex flex-col justify-end gap-1 p-1.5 overflow-hidden">
          {msgs
            .filter((m) => t >= m.at)
            .map((m) => (
              <div
                key={m.text}
                className={`max-w-[88%] rounded-lg px-2 py-1 text-[9.5px] leading-snug shadow-[0_1px_0_rgba(0,0,0,0.06)] animate-[mk-pop_.3s_ease-out] ${
                  m.me ? "self-end bg-[#d9fdd3] rounded-tr-sm" : "self-start bg-white rounded-tl-sm"
                }`}
              >
                {m.text}
                {m.file && (
                  <span className="mt-1 flex items-center gap-1 rounded bg-white/70 px-1.5 py-1 text-[8.5px] text-black/60">
                    <FileText className="h-3 w-3 text-red-500 shrink-0" /> Portfolio.pdf · 2.4 MB
                  </span>
                )}
              </div>
            ))}
          {typing && (
            <span
              className={`flex items-center gap-0.5 rounded-lg px-2 py-1.5 ${typing.me ? "self-end bg-[#d9fdd3]" : "self-start bg-white"}`}
            >
              {[0, 1, 2].map((d) => (
                <span
                  key={d}
                  className="mk-motion w-1 h-1 rounded-full bg-black/50 animate-[mk-dots_1s_ease-in-out_infinite]"
                  style={{ animationDelay: `${d * 0.15}s` }}
                />
              ))}
            </span>
          )}
        </div>
      </div>
      <div className={`flex items-center gap-1 transition-opacity duration-300 ${chips ? "opacity-100" : "opacity-0"}`}>
        <span className="flex items-center gap-1 rounded-full border border-blue-200 bg-blue-50 px-1.5 py-0.5 font-mono text-[8.5px] text-brand">
          <FileText className="h-2.5 w-2.5" /> Proposal sent
        </span>
        <span className="flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-1.5 py-0.5 font-mono text-[8.5px] text-emerald-700">
          <Eye className="h-2.5 w-2.5" /> Opened 3×
        </span>
      </div>
    </div>
  );
}

function CloseScene({ t }: { t: number }) {
  const value = Math.round(48000 * easeOut(clamp01(t / 0.55)));
  const prog = clamp01(t / 0.7);
  const won = t >= 0.7;
  const dealStages = ["Proposal", "Negotiation", "Won"];
  return (
    <div className="relative h-full flex flex-col gap-2">
      <div className="rounded-lg border border-rule bg-white p-2.5 shadow-xs">
        <div className="flex items-center justify-between gap-1">
          <span className="text-[10.5px] font-medium truncate">Northwind Logistics</span>
          <span className="font-mono text-[8px] text-black/40 shrink-0">DEAL-2291</span>
        </div>
        <div className="text-[9.5px] text-black/50">Office fit-out · 3 floors</div>
        <div
          className={`mt-1.5 font-display text-[24px] leading-none tabular-nums tracking-[-0.02em] transition-colors ${
            won ? "text-emerald-600" : "text-black"
          }`}
        >
          {usd(value)}
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex gap-1">
          {dealStages.map((s, i) => {
            const fill = clamp01(prog * 3 - i);
            return (
              <span key={s} className="flex-1 h-1.5 rounded-full bg-[#eef1f8] overflow-hidden">
                <span
                  className={`block h-full rounded-full ${i === 2 ? "bg-emerald-500" : "bg-brand"}`}
                  style={{ width: `${fill * 100}%` }}
                />
              </span>
            );
          })}
        </div>
        <div className="flex justify-between font-mono text-[8px] text-black/45">
          {dealStages.map((s) => (
            <span key={s}>{s}</span>
          ))}
        </div>
      </div>
      <ul className="flex flex-col gap-1 text-[9.5px] text-black/60">
        <li className="flex items-center gap-1.5">
          <Check className={`h-3 w-3 ${won ? "text-emerald-500" : "text-black/20"}`} strokeWidth={3} /> Signed via e-sign
        </li>
        <li className="flex items-center gap-1.5">
          <Clock className="h-3 w-3 text-black/35" /> 12 days from first click
        </li>
      </ul>
      {won && (
        <div className="absolute inset-x-0 bottom-1 flex items-center justify-center pointer-events-none">
          <span className="relative">
            {Array.from({ length: 16 }).map((_, i) => {
              const a = (i / 16) * Math.PI * 2;
              const d = 46 + (i % 3) * 16;
              return (
                <span
                  key={i}
                  className="mk-motion absolute left-1/2 top-1/2 w-1.5 h-2.5 rounded-[1px] animate-[mk-confetti_1.1s_cubic-bezier(.15,.8,.3,1)_forwards]"
                  style={
                    {
                      backgroundColor: ["#0022ff", "#10b981", "#f59e0b", "#ec4899", "#0ea5e9"][i % 5],
                      "--dx": `${Math.cos(a) * d}px`,
                      "--dy": `${Math.sin(a) * d - 10}px`,
                      "--r": `${(i % 2 ? 1 : -1) * (160 + i * 20)}deg`,
                    } as CSSProperties
                  }
                />
              );
            })}
            <span className="relative block animate-[mk-stamp_.5s_cubic-bezier(.2,.9,.3,1.25)_both] rounded-md border-2 border-emerald-500 bg-white/90 px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-600 shadow-[0_0_0_4px_rgba(16,185,129,0.12)]">
              Closed · Won
            </span>
          </span>
        </div>
      )}
    </div>
  );
}
