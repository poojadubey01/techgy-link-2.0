"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  Building2,
  ChartColumn,
  Check,
  FileText,
  Inbox,
  LayoutDashboard,
  Lightbulb,
  Play,
  Search,
  Settings,
  TriangleAlert,
} from "lucide-react";

/* Every frame is authored at a fixed design size and scaled as a whole. */
const F = 520;
const H = 360;
const GAP = 56;

const steps = [
  {
    title: "Understand people and rules",
    desc: "Roles, rules and pain points, gathered before any screen.",
    frame: "Discovery board",
    ticks: 48,
  },
  {
    title: "Map the journey",
    desc: "A flow everyone agrees on, with the stuck steps fixed.",
    frame: "Journey map",
    ticks: 48,
  },
  {
    title: "Prototype and review",
    desc: "Clickable wireframes, reviewed before build time is spent.",
    frame: "Wireframe · Approvals",
    ticks: 52,
  },
  {
    title: "Design and hand over",
    desc: "Every state designed, specced and ready for engineers.",
    frame: "UI · Approvals",
    ticks: 72,
  },
];
const starts = steps.map((_, i) => steps.slice(0, i).reduce((s, x) => s + x.ticks, 0));
const TOTAL = steps.reduce((s, x) => s + x.ticks, 0);

const css = `
@keyframes ux-ripple { from { transform: scale(.3); opacity: .7 } to { transform: scale(2.6); opacity: 0 } }
@keyframes ux-pop { 0% { transform: scale(.85); opacity: 0 } 60% { transform: scale(1.04); opacity: 1 } 100% { transform: scale(1); opacity: 1 } }
@keyframes ux-fade { from { opacity: 0; transform: translateY(4px) } to { opacity: 1; transform: none } }
@keyframes ux-shimmer { 0%, 100% { opacity: .55 } 50% { opacity: 1 } }
@media (prefers-reduced-motion: reduce) {
  .ux-motion, .ux-motion * { animation: none !important; transition: none !important; }
}
`;

export function UiUxCanvas() {
  const rootRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [tick, setTick] = useState(0);
  const [vw, setVw] = useState(0);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const el = viewRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setVw(entry.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
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

  const s = vw ? Math.min(1, (vw < 640 ? vw * 0.94 : vw * 0.56) / F) : 1;
  const x = vw / 2 - (step * (F + GAP) + F / 2) * s;

  return (
    <div
      ref={rootRef}
      className="service-demo relative w-full overflow-hidden rounded-md border border-rule bg-[#f8f9fa] text-black select-none"
    >
      <style>{css}</style>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#0000000d_1px,transparent_1px)] bg-[size:20px_20px]" />
      <div className="pointer-events-none absolute -top-24 -right-20 h-[420px] w-[420px] rounded-full bg-blue-200/40 blur-3xl" />

      <div className="relative z-10 flex flex-col gap-4 p-6 @max-[520px]:p-3">
        {/* process stepper */}
        <div className="grid grid-cols-4 gap-4 @max-[760px]:gap-2">
          {steps.map((st, i) => {
            const on = i === step;
            const fill = i < step ? 1 : on ? t : 0;
            return (
              <button
                key={st.title}
                type="button"
                onClick={() => setTick(starts[i])}
                className="group flex min-w-0 flex-col gap-2 text-left"
              >
                <span className="h-[3px] w-full overflow-hidden rounded-full bg-rule">
                  <span
                    className="block h-full rounded-full bg-brand transition-[width] duration-100 ease-linear"
                    style={{ width: `${fill * 100}%` }}
                  />
                </span>
                <span className="flex items-baseline gap-2 @max-[760px]:hidden">
                  <span className={`font-mono text-[11px] ${on ? "text-brand" : "text-black/35"}`}>0{i + 1}</span>
                  <span
                    className={`text-[13.5px] font-medium leading-snug transition-colors ${
                      on ? "text-black" : "text-black/45 group-hover:text-black/70"
                    }`}
                  >
                    {st.title}
                  </span>
                </span>
                <span
                  className={`pl-[26px] text-[12px] leading-snug transition-colors @max-[760px]:hidden ${
                    on ? "text-black/60" : "text-black/30"
                  }`}
                >
                  {st.desc}
                </span>
              </button>
            );
          })}
        </div>
        <div key={step} className="hidden animate-[ux-fade_.35s_ease-out] @max-[760px]:block">
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-[11px] text-brand">0{step + 1}</span>
            <span className="text-[14px] font-medium">{steps[step].title}</span>
          </div>
          <p className="mt-0.5 text-[12px] text-black/55">{steps[step].desc}</p>
        </div>

        {/* camera over the artboards */}
        <div
          ref={viewRef}
          className="ux-motion relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_9%,black_91%,transparent)]"
          style={{ height: H * s + 34 }}
        >
          <div
            className={`absolute left-0 top-[26px] flex origin-top-left transition-[transform,opacity] duration-[900ms] ease-[cubic-bezier(.65,0,.35,1)] ${
              vw ? "opacity-100" : "opacity-0"
            }`}
            style={{ transform: `translateX(${x}px) scale(${s})`, gap: GAP }}
          >
            {steps.map((st, i) => {
              const on = i === step;
              const localT = on ? t : i < step ? 1 : 0;
              return (
                <div key={st.frame} className="relative shrink-0" style={{ width: F, height: H }}>
                  <span
                    className={`absolute -top-[22px] left-0 flex items-center gap-1.5 font-mono text-[11px] transition-colors ${
                      on ? "text-brand" : "text-black/35"
                    }`}
                  >
                    <span className="text-[13px] leading-none">#</span>
                    {st.frame}
                  </span>
                  <div
                    className={`relative h-full w-full overflow-hidden rounded-[14px] border bg-white transition-all duration-700 ${
                      on
                        ? "border-brand/40 shadow-[0_24px_50px_-22px_rgba(0,34,255,0.45)] ring-1 ring-brand/15"
                        : "border-rule opacity-50 shadow-xs"
                    }`}
                  >
                    {i === 0 && <DiscoveryFrame t={localT} active={on} />}
                    {i === 1 && <JourneyFrame t={localT} active={on} />}
                    {i === 2 && <WireframeFrame t={localT} active={on} />}
                    {i === 3 && <UiFrame t={localT} active={on} />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── shared ───────────────────────────────────────────────────── */
function Cursor({
  x,
  y,
  label,
  tone = "brand",
  click,
}: {
  x: number;
  y: number;
  label: string;
  tone?: "brand" | "emerald";
  click?: string;
}) {
  const bg = tone === "brand" ? "bg-brand" : "bg-emerald-500";
  const fill = tone === "brand" ? "#0022ff" : "#10b981";
  return (
    <div
      className="ux-motion pointer-events-none absolute left-0 top-0 z-40 transition-transform duration-[650ms] ease-[cubic-bezier(.4,0,.2,1)]"
      style={{ transform: `translate(${x}px, ${y}px)` }}
    >
      {click && <span key={click} className={`absolute -left-2.5 -top-2.5 h-5 w-5 rounded-full ${bg} opacity-40 animate-[ux-ripple_.6s_ease-out_forwards]`} />}
      <svg width="18" height="18" viewBox="0 0 24 24" className="drop-shadow-[0_2px_3px_rgba(0,0,0,0.25)]">
        <path d="M4 1.5 20 13.2l-7 1.2 4.2 8.5-3.4 1.6-4.2-8.6L4 21.3Z" fill={fill} stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
      <span className={`ml-3.5 -mt-1 inline-block whitespace-nowrap rounded-full px-2 py-0.5 text-[10px] font-medium text-white shadow-md ${bg}`}>
        {label}
      </span>
    </div>
  );
}

function Pop({ show, children, className = "" }: { show: boolean; children: ReactNode; className?: string }) {
  if (!show) return null;
  return <div className={`animate-[ux-pop_.35s_ease-out_both] ${className}`}>{children}</div>;
}

/* ── 01 · discovery board ────────────────────────────────────── */
const notes = [
  { text: "Requesters submit invoices on mobile", tone: "yellow", from: [250, 206, 8], to: [20, 58] },
  { text: "Approvers sign off anything over $5k", tone: "yellow", from: [56, 226, -5], to: [20, 150] },
  { text: "Two approvals needed above $20k", tone: "blue", from: [372, 62, 6], to: [190, 58] },
  { text: "Every change must be logged", tone: "blue", from: [150, 112, -9], to: [190, 150] },
  { text: "Approvals stall for days", tone: "pink", from: [26, 40, -4], to: [360, 58] },
  { text: "Requesters can't see the status", tone: "pink", from: [330, 244, 5], to: [360, 150] },
] as const;

const noteTone = {
  yellow: "bg-[#fff4b8] border-[#f1dc85]",
  blue: "bg-[#dfe7ff] border-[#c3d1ff]",
  pink: "bg-[#ffe1ea] border-[#ffc4d5]",
};

function DiscoveryFrame({ t, active }: { t: number; active: boolean }) {
  const moved = notes.map((_, k) => t >= 0.16 + k * 0.1);
  const lastMoved = moved.lastIndexOf(true);
  const grouped = t >= 0.12;
  const insight = t >= 0.8;
  const cursor = insight
    ? { x: 250, y: 300 }
    : lastMoved >= 0
      ? { x: notes[lastMoved].to[0] + 96, y: notes[lastMoved].to[1] + 52 }
      : { x: 280, y: 180 };

  return (
    <div className="absolute inset-0 bg-[linear-gradient(#f1f4f9_1px,transparent_1px),linear-gradient(90deg,#f1f4f9_1px,transparent_1px)] bg-[size:24px_24px]">
      {(["People", "Rules", "Pain points"] as const).map((g, i) => (
        <div
          key={g}
          className={`absolute top-[24px] flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-black/55 transition-opacity duration-500 ${
            grouped ? "opacity-100" : "opacity-0"
          }`}
          style={{ left: 20 + i * 170 }}
        >
          <span className={`h-2 w-2 rounded-full ${i === 0 ? "bg-[#e9c53c]" : i === 1 ? "bg-brand" : "bg-rose-400"}`} />
          {g}
        </div>
      ))}
      {notes.map((n, k) => {
        const [fx, fy, fr] = n.from;
        const [tx, ty] = n.to;
        const at = moved[k];
        return (
          <div
            key={n.text}
            className={`ux-motion absolute left-0 top-0 flex h-[80px] w-[140px] items-start rounded-[6px] border p-2.5 text-[12px] font-medium leading-snug text-navy shadow-[0_6px_14px_-8px_rgba(15,26,52,0.35)] transition-transform duration-[650ms] ease-[cubic-bezier(.4,0,.2,1)] ${noteTone[n.tone]}`}
            style={{ transform: `translate(${at ? tx : fx}px, ${at ? ty : fy}px) rotate(${at ? 0 : fr}deg)` }}
          >
            {n.text}
          </div>
        );
      })}
      <div
        className={`absolute left-[20px] right-[20px] top-[260px] flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2.5 text-[12px] text-navy transition-all duration-500 ${
          insight ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
        }`}
      >
        <Lightbulb className="h-4 w-4 shrink-0 text-brand" />
        <span>
          <strong className="font-semibold">Insight:</strong>{" "}
          approvers aren&apos;t told when an invoice is waiting, so it stalls.
        </span>
      </div>
      {active && <Cursor x={cursor.x} y={cursor.y} label="Design lead" />}
    </div>
  );
}

/* ── 02 · journey map ────────────────────────────────────────── */
const jNodes = [
  { label: "Submit invoice", x: 20, y: 56, at: 0.02, kind: "start" },
  { label: "Manager review", x: 190, y: 56, at: 0.12, kind: "step" },
  { label: "Finance check", x: 350, y: 200, at: 0.32, kind: "step" },
  { label: "Payment run", x: 190, y: 200, at: 0.42, kind: "step" },
  { label: "Requester notified", x: 20, y: 200, at: 0.5, kind: "end" },
] as const;

const jEdges = [
  { d: "M160 79 L186 79", at: 0.1 },
  { d: "M330 79 L384 79", at: 0.2 },
  { d: "M420 113 L420 196", at: 0.3 },
  { d: "M350 223 L334 223", at: 0.4 },
  { d: "M190 223 L164 223", at: 0.48 },
  { d: "M420 45 C 420 8, 260 8, 260 52", at: 0.58 },
];

function JourneyFrame({ t, active }: { t: number; active: boolean }) {
  const decision = t >= 0.22;
  const pain = t >= 0.66;
  const fixed = t >= 0.84;
  const shownNodes = jNodes.filter((n) => t >= n.at);
  const last = shownNodes[shownNodes.length - 1];
  const cursor = pain
    ? { x: 300, y: 130 }
    : decision && t < 0.32
      ? { x: 436, y: 92 }
      : last
        ? { x: last.x + 110, y: last.y + 30 }
        : { x: 200, y: 160 };

  return (
    <div className="absolute inset-0">
      <svg className="absolute inset-0 h-full w-full" viewBox={`0 0 ${F} ${H}`} aria-hidden="true">
        <defs>
          <marker id="ux-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 Z" fill="#94a3b8" />
          </marker>
        </defs>
        {jEdges.map((e, i) => (
          <path
            key={i}
            d={e.d}
            fill="none"
            stroke="#94a3b8"
            strokeWidth="1.6"
            pathLength={1}
            strokeDasharray="1"
            strokeDashoffset={t >= e.at ? 0 : 1}
            markerEnd={t >= e.at + 0.04 ? "url(#ux-arrow)" : undefined}
            style={{ transition: "stroke-dashoffset 500ms ease" }}
          />
        ))}
      </svg>

      {shownNodes.map((n) => (
        <div
          key={n.label}
          className={`absolute flex h-[46px] w-[140px] items-center justify-center border px-2 text-center text-[12px] font-medium shadow-xs animate-[ux-pop_.35s_ease-out_both] ${
            n.kind === "start"
              ? "rounded-full border-blue-200 bg-blue-50 text-brand"
              : n.kind === "end"
                ? "rounded-full border-emerald-200 bg-emerald-50 text-emerald-700"
                : "rounded-lg border-rule bg-white text-navy"
          } ${last?.label === n.label && active && !pain ? "ring-2 ring-brand/25" : ""}`}
          style={{ left: n.x, top: n.y }}
        >
          {n.label}
        </div>
      ))}

      <Pop show={decision} className="absolute left-[388px] top-[47px]">
        <div className="relative flex h-[64px] w-[64px] items-center justify-center">
          <span className="absolute inset-[9px] rotate-45 rounded-md border border-amber-300 bg-amber-50" />
          <span className="relative text-[10.5px] font-semibold text-amber-700">Approved?</span>
        </div>
      </Pop>

      <span
        className={`absolute left-[428px] top-[150px] text-[10.5px] font-semibold text-emerald-600 transition-opacity duration-300 ${
          t >= 0.34 ? "opacity-100" : "opacity-0"
        }`}
      >
        Yes
      </span>
      <span
        className={`absolute left-[282px] top-[3px] rounded bg-white px-1.5 text-[10.5px] font-semibold text-rose-500 transition-opacity duration-300 ${
          t >= 0.62 ? "opacity-100" : "opacity-0"
        }`}
      >
        No · changes requested
      </span>

      {pain && (
        <div
          key={fixed ? "fixed" : "pain"}
          className={`absolute left-[190px] top-[112px] flex w-[168px] items-center gap-1.5 rounded-md border px-2 py-1.5 text-[11px] font-medium animate-[ux-pop_.35s_ease-out_both] ${
            fixed ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-rose-200 bg-rose-50 text-rose-600"
          }`}
        >
          {fixed ? <Check className="h-3.5 w-3.5 shrink-0" strokeWidth={3} /> : <TriangleAlert className="h-3.5 w-3.5 shrink-0" />}
          {fixed ? "Auto-reminder after 24h" : "Stalls here for ~3 days"}
        </div>
      )}

      {active && <Cursor x={cursor.x} y={cursor.y} label="Design lead" />}
    </div>
  );
}

/* ── 03 · wireframe prototype ────────────────────────────────── */
function WireframeFrame({ t, active }: { t: number; active: boolean }) {
  const hotspot = t >= 0.12;
  const click1 = t >= 0.28 && t < 0.4;
  const open = t >= 0.32;
  const click2 = t >= 0.62 && t < 0.74;
  const approved = t >= 0.65;
  const pin1 = t >= 0.78;
  const pin2 = t >= 0.9;
  const cursor = pin1 ? { x: 262, y: 236 } : t >= 0.48 ? { x: 356, y: 312 } : t >= 0.06 ? { x: 250, y: 146 } : { x: 420, y: 300 };

  return (
    <div className="absolute inset-0 bg-white">
      <div className="absolute inset-x-0 top-0 flex h-[30px] items-center gap-1.5 border-b border-[#e5e7eb] px-3">
        {[0, 1, 2].map((d) => (
          <span key={d} className="h-2 w-2 rounded-full border border-[#cbd5e1]" />
        ))}
        <span className="ml-3 h-2 w-40 rounded bg-[#e5e7eb]" />
      </div>
      <div className="absolute bottom-0 left-0 top-[30px] w-[92px] border-r border-[#e5e7eb] p-3">
        <span className="block h-6 w-6 rounded-full border-2 border-[#cbd5e1]" />
        {[0, 1, 2, 3, 4].map((i) => (
          <span key={i} className={`mt-3.5 block h-2 rounded ${i === 1 ? "w-14 bg-[#9ca3af]" : "w-12 bg-[#e5e7eb]"}`} />
        ))}
      </div>
      <div className="absolute left-[108px] top-[42px] h-6 w-[180px] rounded border border-[#d1d5db]" />
      <div className="absolute left-[440px] top-[42px] h-6 w-16 rounded border border-[#d1d5db]" />
      {[0, 1, 2, 3, 4].map((i) => (
        <div key={i} className="absolute left-[108px] right-[16px] h-10" style={{ top: 80 + i * 48 }}>
          <span className="absolute left-[10px] top-[9px] h-[22px] w-[22px] rounded-full bg-[#e5e7eb]" />
          <span className="absolute left-[44px] top-[10px] h-2 w-[120px] rounded bg-[#d1d5db]" />
          <span className="absolute left-[44px] top-[24px] h-1.5 w-20 rounded bg-[#e5e7eb]" />
          <span className="absolute right-[10px] top-[12px] h-4 w-12 rounded-full border border-[#d1d5db]" />
          <span className="absolute inset-x-0 bottom-[-4px] h-px bg-[#f1f5f9]" />
        </div>
      ))}
      <div
        className={`absolute left-[104px] right-[12px] top-[124px] h-12 rounded-md border-2 border-dashed border-brand/60 transition-opacity duration-300 ${
          hotspot ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="absolute -top-[19px] left-0 rounded bg-brand px-1.5 py-0.5 text-[9.5px] font-medium text-white">On tap → Detail</span>
      </div>

      <div
        className={`ux-motion absolute bottom-0 right-0 top-[30px] w-[220px] border-l border-[#e5e7eb] bg-white p-4 shadow-[-18px_0_30px_-20px_rgba(15,26,52,0.35)] transition-transform duration-500 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <span className="block h-3 w-[120px] rounded bg-[#9ca3af]" />
        <span className="mt-2.5 block h-2 w-20 rounded bg-[#d1d5db]" />
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className="mt-2.5 block h-1.5 rounded bg-[#e5e7eb]" style={{ width: `${[100, 88, 94, 70][i]}%` }} />
        ))}
        <div className="mt-4 h-[70px] rounded border border-dashed border-[#d1d5db]" />
        <div className="absolute bottom-[30px] left-4 right-4 flex gap-2">
          <span className={`h-[30px] flex-1 rounded transition-colors ${approved ? "bg-[#6b7280]" : "bg-[#9ca3af]"}`} />
          <span className="h-[30px] flex-1 rounded border border-[#9ca3af]" />
        </div>
      </div>

      {approved && (
        <div className="absolute left-[112px] top-[318px] flex items-center gap-1.5 rounded-full border border-[#d1d5db] bg-white px-3 py-1.5 text-[11px] font-medium text-[#4b5563] shadow-sm animate-[ux-pop_.35s_ease-out_both]">
          <Check className="h-3.5 w-3.5" strokeWidth={3} /> Approved
        </div>
      )}

      <span className="absolute right-3 top-[6px] flex items-center gap-1 rounded-full bg-brand px-2 py-0.5 text-[9.5px] font-medium text-white">
        <Play className="h-2.5 w-2.5 fill-white" /> Prototype
      </span>

      {pin1 && (
        <div className="absolute left-[150px] top-[218px] z-30 flex items-start gap-1.5 animate-[ux-pop_.35s_ease-out_both]">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full rounded-bl-none bg-amber-400 text-[10px] font-bold text-white shadow">S</span>
          <span className="rounded-lg border border-rule bg-white px-2 py-1 text-[11px] text-navy shadow-md">Status is hard to spot</span>
        </div>
      )}
      {pin2 && (
        <div className="absolute left-[330px] top-[176px] z-30 flex items-start gap-1.5 animate-[ux-pop_.35s_ease-out_both]">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full rounded-bl-none bg-violet-500 text-[10px] font-bold text-white shadow">M</span>
          <span className="rounded-lg border border-rule bg-white px-2 py-1 text-[11px] text-navy shadow-md">One-tap approve works</span>
        </div>
      )}

      {active && (
        <Cursor x={cursor.x} y={cursor.y} label="Design lead" click={click1 ? "c1" : click2 ? "c2" : undefined} />
      )}
    </div>
  );
}

/* ── 04 · hi-fi UI, states and handover ──────────────────────── */
const rows = [
  { vendor: "Northwind Logistics", id: "INV-2291 · Oct 02", amount: "$12,480", status: "Pending" },
  { vendor: "Kestrel Foods", id: "INV-2288 · Oct 01", amount: "$4,210", status: "Needs info" },
  { vendor: "Orbit Labs", id: "INV-2284 · Sep 29", amount: "$22,900", status: "Pending" },
  { vendor: "Harbor & Co", id: "INV-2279 · Sep 27", amount: "$1,150", status: "Approved" },
] as const;

const pill = {
  Pending: "bg-amber-50 text-amber-700 border-amber-200",
  "Needs info": "bg-blue-50 text-brand border-blue-200",
  Approved: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

const stateNames = ["Default", "Loading", "Empty", "Error"] as const;

function UiFrame({ t, active }: { t: number; active: boolean }) {
  const stateIdx = t < 0.14 ? 0 : t < 0.26 ? 1 : t < 0.38 ? 2 : t < 0.5 ? 3 : 0;
  const statesOn = t >= 0.1 && t < 0.56;
  const spec = t >= 0.6;
  const code = t >= 0.76;
  const leadCursor = spec ? { x: 340, y: 276 } : statesOn ? { x: 150 + stateIdx * 48, y: 336 } : { x: 250, y: 150 };

  return (
    <div className="absolute inset-0 bg-white">
      <div className="absolute inset-x-0 top-0 flex h-[30px] items-center gap-1.5 border-b border-rule bg-[#f8fafc] px-3">
        <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
        <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
        <span className="h-2 w-2 rounded-full bg-[#28c840]" />
      </div>

      {/* sidebar */}
      <div className="absolute bottom-0 left-0 top-[30px] w-[108px] border-r border-rule bg-[#f8fafc] px-2 py-3">
        <div className="flex items-center gap-1.5 px-1.5">
          <span className="h-[18px] w-[18px] rounded-[5px] bg-brand" />
          <span className="text-[12px] font-semibold">Payables</span>
        </div>
        <div className="mt-4 flex flex-col gap-1">
          {([
            ["Dashboard", LayoutDashboard],
            ["Invoices", FileText],
            ["Vendors", Building2],
            ["Reports", ChartColumn],
            ["Settings", Settings],
          ] as const).map(([label, Icon]) => (
            <span
              key={label}
              className={`flex items-center gap-1.5 rounded-md px-1.5 py-1.5 text-[11px] ${
                label === "Invoices" ? "bg-blue-50 font-medium text-brand" : "text-black/55"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* list */}
      <div className="absolute bottom-0 left-[108px] top-[30px] w-[210px] border-r border-rule px-3 py-3">
        <div className="flex items-center justify-between">
          <span className="text-[13.5px] font-semibold">Invoices</span>
          <span className="rounded-full bg-[#f1f4f9] px-1.5 py-0.5 font-mono text-[9px] text-black/55">4 open</span>
        </div>
        <div className="mt-2 flex items-center gap-1.5 rounded-md border border-rule px-2 py-1 text-[10px] text-black/35">
          <Search className="h-3 w-3" /> Search invoices
        </div>
        <div className="mt-2 h-[196px]">
          {stateIdx === 0 && (
            <div className="flex flex-col">
              {rows.map((r, i) => (
                <div
                  key={r.vendor}
                  className={`flex items-center justify-between gap-2 border-b border-rule/70 py-2 pl-2 ${
                    i === 0 ? "-mx-3 border-l-2 border-l-brand bg-blue-50/60 px-3" : ""
                  }`}
                >
                  <div className="min-w-0">
                    <div className="truncate text-[11px] font-medium">{r.vendor}</div>
                    <div className="font-mono text-[8.5px] text-black/40">{r.id}</div>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-0.5">
                    <span className="text-[11px] font-medium tabular-nums">{r.amount}</span>
                    <span className={`rounded-full border px-1.5 text-[8.5px] font-medium ${pill[r.status]}`}>{r.status}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
          {stateIdx === 1 && (
            <div className="flex flex-col gap-3 pt-2">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="ux-motion flex items-center justify-between animate-[ux-shimmer_1s_ease-in-out_infinite]" style={{ animationDelay: `${i * 0.12}s` }}>
                  <div className="flex flex-col gap-1.5">
                    <span className="h-2 w-24 rounded bg-[#e5e7eb]" />
                    <span className="h-1.5 w-16 rounded bg-[#eef1f5]" />
                  </div>
                  <span className="h-3 w-10 rounded-full bg-[#e5e7eb]" />
                </div>
              ))}
            </div>
          )}
          {stateIdx === 2 && (
            <div className="flex h-full flex-col items-center justify-center text-center animate-[ux-fade_.3s_ease-out]">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-brand">
                <Inbox className="h-5 w-5" />
              </span>
              <span className="mt-2 text-[12px] font-semibold">All caught up</span>
              <span className="text-[10px] text-black/50">No invoices are waiting for you.</span>
            </div>
          )}
          {stateIdx === 3 && (
            <div className="flex h-full flex-col items-center justify-center text-center animate-[ux-fade_.3s_ease-out]">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-50 text-rose-500">
                <TriangleAlert className="h-5 w-5" />
              </span>
              <span className="mt-2 text-[12px] font-semibold">Couldn&apos;t load invoices</span>
              <span className="mt-1.5 rounded-md border border-rule px-2.5 py-1 text-[10px] font-medium">Try again</span>
            </div>
          )}
        </div>
      </div>

      {/* detail */}
      <div className="absolute bottom-0 left-[318px] right-0 top-[30px] px-4 py-3">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[9.5px] text-black/40">INV-2291</span>
          <span className={`rounded-full border px-1.5 text-[8.5px] font-medium ${pill.Pending}`}>Pending</span>
        </div>
        <div className="mt-1 text-[13px] font-semibold">Northwind Logistics</div>
        <div className="mt-0.5 font-display text-[22px] leading-none tracking-[-0.02em]">$12,480.00</div>
        <div className="mt-3 grid grid-cols-2 gap-2 text-[10px]">
          <div>
            <div className="text-black/40">Due</div>
            <div className="font-medium">Oct 14</div>
          </div>
          <div>
            <div className="text-black/40">Submitted by</div>
            <div className="font-medium">Priya S.</div>
          </div>
        </div>
        <div className="mt-3 flex flex-col gap-1.5 border-t border-rule pt-2.5 text-[10px]">
          {([
            ["Submitted", true],
            ["Manager approved", true],
            ["Finance · you", false],
          ] as const).map(([label, done]) => (
            <span key={label} className="flex items-center gap-1.5">
              <span
                className={`flex h-3.5 w-3.5 items-center justify-center rounded-full ${
                  done ? "bg-emerald-500 text-white" : "border-2 border-brand bg-white"
                }`}
              >
                {done && <Check className="h-2 w-2" strokeWidth={4} />}
              </span>
              <span className={done ? "text-black/60" : "font-medium text-brand"}>{label}</span>
            </span>
          ))}
        </div>
        <div className="absolute bottom-[42px] left-4 right-4 flex flex-col gap-1.5">
          <span className="flex h-[34px] items-center justify-center rounded-lg bg-brand text-[11.5px] font-medium text-white shadow-[0_8px_16px_-8px_rgba(0,34,255,0.7)]">
            Approve
          </span>
          <span className="flex h-[30px] items-center justify-center rounded-lg border border-rule text-[11px] font-medium text-black/70">
            Request changes
          </span>
        </div>
      </div>

      {/* states annotation */}
      <div
        className={`absolute left-[114px] top-[318px] flex items-center gap-0.5 rounded-full border border-rule bg-white p-0.5 shadow-md transition-all duration-400 ${
          statesOn ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"
        }`}
      >
        {stateNames.map((n, i) => (
          <span
            key={n}
            className={`rounded-full px-2 py-1 text-[9.5px] font-medium transition-colors ${
              i === stateIdx ? "bg-brand text-white" : "text-black/50"
            }`}
          >
            {n}
          </span>
        ))}
      </div>

      {/* handover specs */}
      {/* Approve button box: x 334–504, y 248–282 */}
      <div className={`pointer-events-none transition-opacity duration-500 ${spec ? "opacity-100" : "opacity-0"}`}>
        <span className="absolute left-[331px] top-[245px] h-[40px] w-[176px] rounded-[10px] border-[1.5px] border-violet-500" />
        <span className="absolute right-[13px] top-[229px] flex items-center gap-1 rounded-t bg-violet-500 px-1.5 py-0.5 text-[9px] font-medium text-white">
          ◆ Button/Primary
        </span>
        <span className="absolute left-[318px] top-[265px] h-px w-4 bg-rose-500" />
        <span className="absolute left-[318px] top-[261px] h-[9px] w-px bg-rose-500" />
        <span className="absolute left-[333px] top-[261px] h-[9px] w-px bg-rose-500" />
        <span className="absolute left-[318px] top-[270px] rounded-sm bg-rose-500 px-1 text-[8.5px] font-bold text-white">16</span>
        <span className="absolute left-[512px] top-[248px] h-[34px] w-px bg-rose-500" />
        <span className="absolute left-[508px] top-[248px] h-px w-[9px] bg-rose-500" />
        <span className="absolute left-[508px] top-[281px] h-px w-[9px] bg-rose-500" />
        <span className="absolute left-[490px] top-[258px] rounded-sm bg-rose-500 px-1 text-[8.5px] font-bold text-white">34</span>
        <span className="absolute left-[450px] top-[92px] whitespace-nowrap rounded border border-rule bg-white px-1.5 py-0.5 font-mono text-[8.5px] text-black/60 shadow-sm">
          display/22
        </span>
      </div>

      {code && (
        <div className="absolute left-[130px] top-[232px] z-30 w-[172px] rounded-lg bg-navy p-2.5 font-mono text-[9.5px] leading-[1.55] text-white/80 shadow-[0_16px_30px_-12px_rgba(15,26,52,0.7)] animate-[ux-pop_.35s_ease-out_both]">
          <div className="mb-1 text-[8.5px] uppercase tracking-wider text-white/40">Dev mode · React</div>
          <div>
            <span className="text-sky-300">&lt;Button</span> <span className="text-amber-200">variant</span>=<span className="text-emerald-300">&quot;primary&quot;</span>
            <span className="text-sky-300">&gt;</span>
          </div>
          <div className="pl-3 text-white">Approve</div>
          <div className="text-sky-300">&lt;/Button&gt;</div>
        </div>
      )}

      {active && <Cursor x={leadCursor.x} y={leadCursor.y} label="Design lead" />}
      {active && code && <Cursor x={268} y={300} label="Engineer" tone="emerald" />}
    </div>
  );
}
