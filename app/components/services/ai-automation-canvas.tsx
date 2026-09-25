"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  Check,
  CircleCheck,
  Gauge,
  Inbox,
  Plug,
  Route,
  ShieldCheck,
  Sparkles,
  UserCheck,
  Workflow,
} from "lucide-react";

const phases = [
  { tab: "Map", title: "Map one workflow", desc: "List every step, its volume and the decisions that should stay human.", Icon: Workflow, ticks: 44 },
  { tab: "Choose", title: "Choose the right automation", desc: "An integration, a rule or AI, whichever fits each step.", Icon: Route, ticks: 46 },
  { tab: "Evaluate", title: "Evaluate the exceptions", desc: "Run real samples and see what needs a person before going live.", Icon: ShieldCheck, ticks: 56 },
  { tab: "Deploy", title: "Deploy with visibility", desc: "Live runs, approvals and an audit trail your team can read.", Icon: Gauge, ticks: 64 },
];
const starts = phases.map((_, i) => phases.slice(0, i).reduce((s, p) => s + p.ticks, 0));
const TOTAL = phases.reduce((s, p) => s + p.ticks, 0);

const tones = {
  blue: "border-blue-200 bg-blue-50 text-brand",
  violet: "border-violet-200 bg-violet-50 text-violet-700",
  emerald: "border-emerald-200 bg-emerald-50 text-emerald-700",
  amber: "border-amber-200 bg-amber-50 text-amber-700",
} as const;

const flow = [
  { name: "Invoice arrives by email", time: "1 min", judge: false, how: "Integration", HowIcon: Plug, tone: "blue" },
  { name: "Fields re-typed from the PDF", time: "6 min", judge: false, how: "AI reads the document", HowIcon: Sparkles, tone: "violet" },
  { name: "Totals checked against the PO", time: "3 min", judge: false, how: "Rules", HowIcon: Route, tone: "emerald" },
  { name: "Approval chased by email", time: "waiting", judge: true, how: "Human approval", HowIcon: UserCheck, tone: "amber" },
  { name: "Posted to accounting and filed", time: "2 min", judge: false, how: "Integration", HowIcon: Plug, tone: "blue" },
] as const;

const css = `
@keyframes ai-pop { 0% { transform: scale(.88); opacity: 0 } 60% { transform: scale(1.04); opacity: 1 } 100% { transform: scale(1); opacity: 1 } }
@keyframes ai-rise { from { opacity: 0; transform: translateY(8px) } to { opacity: 1; transform: none } }
@keyframes ai-fade { from { opacity: 0 } to { opacity: 1 } }
@keyframes ai-ping { 0% { transform: scale(1); opacity: .5 } 100% { transform: scale(2.2); opacity: 0 } }
@media (prefers-reduced-motion: reduce) {
  .ai-motion, .ai-motion * { animation: none !important; transition: none !important; }
}
`;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

export function AiAutomationCanvas() {
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

  let phase = 0;
  starts.forEach((s, i) => {
    if (tick >= s) phase = i;
  });
  const t = (tick - starts[phase]) / phases[phase].ticks;
  const live = phase === 3 && t >= 0.68;

  const status = [
    { text: "Mapping", cls: "border-amber-200 bg-amber-50 text-amber-700", dot: "bg-amber-500" },
    { text: "Designing", cls: "border-rule bg-[#f1f4f9] text-black/60", dot: "bg-black/40" },
    { text: "Testing", cls: "border-blue-200 bg-blue-50 text-brand", dot: "bg-brand" },
    live
      ? { text: "Live", cls: "border-emerald-200 bg-emerald-50 text-emerald-700", dot: "bg-emerald-500 animate-pulse" }
      : { text: "Going live", cls: "border-amber-200 bg-amber-50 text-amber-700", dot: "bg-amber-500" },
  ][phase];

  return (
    <div ref={rootRef} className="service-demo ai-motion relative w-full overflow-hidden rounded-md border border-rule bg-[#f8f9fa] text-black select-none">
      <style>{css}</style>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#0000000d_1px,transparent_1px)] bg-[size:20px_20px]" />
      <div className="pointer-events-none absolute -top-24 -right-20 h-[420px] w-[420px] rounded-full bg-blue-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-24 h-[360px] w-[360px] rounded-full bg-violet-100/50 blur-3xl" />

      <div className="sv-body relative z-10 p-6 @max-[520px]:p-3">
        {/* process stepper */}
        <div className="grid grid-cols-4 gap-3 @max-[640px]:gap-1.5">
          {phases.map((p, i) => {
            const on = i === phase;
            const fill = i < phase ? 1 : on ? t : 0;
            return (
              <button key={p.tab} type="button" onClick={() => setTick(starts[i])} className="group flex min-w-0 flex-col gap-2 text-left">
                <span className="h-[3px] w-full overflow-hidden rounded-full bg-rule">
                  <span className="block h-full rounded-full bg-brand transition-[width] duration-100 ease-linear" style={{ width: `${fill * 100}%` }} />
                </span>
                <span className="flex items-center gap-1.5">
                  <p.Icon className={`h-3.5 w-3.5 shrink-0 ${on ? "text-brand" : "text-black/35"}`} />
                  <span className={`truncate text-[13px] font-medium ${on ? "text-black" : "text-black/40 group-hover:text-black/70"}`}>
                    <span className="@max-[640px]:hidden">{p.title}</span>
                    <span className="hidden @max-[640px]:inline">{p.tab}</span>
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* workflow window */}
        <div className="mt-4 overflow-hidden rounded-xl border border-rule bg-white shadow-[0_28px_60px_-30px_rgba(15,26,52,0.45)]">
          <div className="flex items-center justify-between gap-3 border-b border-rule bg-[#f8fafc] px-4 py-2.5">
            <span className="flex min-w-0 items-center gap-2 text-[12.5px] font-semibold">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-brand text-white">
                <Inbox className="h-3.5 w-3.5" />
              </span>
              <span className="truncate">Invoice intake</span>
              <span className="hidden font-mono text-[10px] font-normal text-black/40 @min-[520px]:inline">accounts payable workflow</span>
            </span>
            <span key={status.text} className={`flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider animate-[ai-pop_.35s_ease-out] ${status.cls}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
              {status.text}
            </span>
          </div>

          <div key={phase} className="min-h-[350px] animate-[ai-fade_.4s_ease-out] @max-[640px]:min-h-0">
            {phase === 0 && <MapScene t={t} />}
            {phase === 1 && <ChooseScene t={t} />}
            {phase === 2 && <EvaluateScene t={t} />}
            {phase === 3 && <DeployScene t={t} />}
          </div>
        </div>

        {/* caption */}
        <div key={phase} className="mt-4 flex items-baseline gap-3 px-1 animate-[ai-rise_.4s_ease-out] @max-[520px]:flex-col @max-[520px]:gap-0.5">
          <span className="font-mono text-[11px] text-brand">0{phase + 1}</span>
          <span className="text-[14px] font-medium">{phases[phase].title}</span>
          <span className="text-[13px] text-black/55">{phases[phase].desc}</span>
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

const grid = "grid grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] gap-4 p-5 @max-[640px]:grid-cols-1 @max-[640px]:p-3.5";

/* ── 01 · map one workflow ───────────────────────────────────── */
function MapScene({ t }: { t: number }) {
  const stats = [
    { k: "Volume", v: "about 40 invoices a day", at: 0.72 },
    { k: "Hands-on time", v: "roughly 12 min each", at: 0.8 },
    { k: "Needs a person's judgement", v: "1 of 5 steps", at: 0.9 },
  ];
  return (
    <div className={grid}>
      <Panel title="Today's process · manual">
        <div className="flex flex-col gap-2">
          {flow.map((f, i) => {
            const shown = t >= 0.05 + i * 0.09;
            const tagged = t >= 0.5 + i * 0.07;
            return (
              <div
                key={f.name}
                className={`flex items-center gap-3 rounded-lg border px-3 py-2.5 transition-all duration-300 ${
                  shown ? "border-rule bg-white opacity-100" : "translate-y-1 border-dashed border-rule opacity-0"
                }`}
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#f1f4f9] font-mono text-[10px] font-semibold text-black/55">{i + 1}</span>
                <span className="min-w-0 flex-1 text-[12px] font-medium leading-snug">{f.name}</span>
                <span className="shrink-0 font-mono text-[10.5px] text-black/45">{f.time}</span>
                <span
                  className={`hidden shrink-0 rounded-full border px-2 py-0.5 text-[9.5px] font-semibold transition-opacity duration-300 @min-[520px]:inline ${
                    tagged ? (f.judge ? tones.amber : "border-rule bg-[#f1f4f9] text-black/60") : "border-transparent opacity-0"
                  }`}
                >
                  {f.judge ? "Needs judgement" : "Repetitive"}
                </span>
              </div>
            );
          })}
        </div>
      </Panel>
      <Panel title="Baseline · example">
        <div className="flex flex-col gap-3">
          {stats.map((s) => (
            <div key={s.k} className={`transition-all duration-400 ${t >= s.at ? "translate-y-0 opacity-100" : "translate-y-1.5 opacity-0"}`}>
              <div className="text-[10.5px] text-black/45">{s.k}</div>
              <div className="text-[13.5px] font-medium">{s.v}</div>
            </div>
          ))}
        </div>
        <p className={`mt-auto pt-4 text-[11.5px] leading-relaxed text-black/55 transition-opacity duration-500 ${t >= 0.92 ? "opacity-100" : "opacity-0"}`}>
          The baseline is agreed first, so the result is measured against it.
        </p>
      </Panel>
    </div>
  );
}

/* ── 02 · choose the right automation ────────────────────────── */
const mix = [
  { label: "Integration", n: 2, tone: "blue" },
  { label: "Rules", n: 1, tone: "emerald" },
  { label: "AI", n: 1, tone: "violet" },
  { label: "Human", n: 1, tone: "amber" },
] as const;
const barTone = { blue: "bg-brand", emerald: "bg-emerald-500", violet: "bg-violet-500", amber: "bg-amber-500" } as const;

function ChooseScene({ t }: { t: number }) {
  return (
    <div className={grid}>
      <Panel title="Approach per step">
        <div className="flex flex-col gap-2">
          {flow.map((f, i) => {
            const on = t >= 0.08 + i * 0.13;
            return (
              <div key={f.name} className="flex items-center gap-3 rounded-lg border border-rule bg-white px-3 py-2.5">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#f1f4f9] font-mono text-[10px] font-semibold text-black/55">{i + 1}</span>
                <span className="min-w-0 flex-1 text-[12px] font-medium leading-snug">{f.name}</span>
                <span className="flex min-w-[118px] shrink-0 justify-end">
                  {on ? (
                    <span className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10.5px] font-semibold animate-[ai-pop_.35s_ease-out_both] ${tones[f.tone]}`}>
                      <f.HowIcon className="h-3 w-3" />
                      <span className="@max-[520px]:hidden">{f.how}</span>
                      <span className="hidden @max-[520px]:inline">{f.how.split(" ")[0]}</span>
                    </span>
                  ) : (
                    <span className="rounded-full border border-dashed border-rule px-2.5 py-1 text-[10.5px] text-black/30">Deciding…</span>
                  )}
                </span>
              </div>
            );
          })}
        </div>
      </Panel>
      <Panel title="The mix">
        <div className="flex flex-col gap-3.5">
          {mix.map((m) => (
            <div key={m.label}>
              <div className="mb-1 flex items-center justify-between text-[11.5px]">
                <span className="font-medium">{m.label}</span>
                <span className="font-mono text-[10.5px] text-black/45">
                  {m.n} {m.n === 1 ? "step" : "steps"}
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-[#f1f4f9]">
                <div
                  className={`h-full rounded-full ${barTone[m.tone]} transition-[width] duration-[900ms] ease-out`}
                  style={{ width: t >= 0.72 ? `${(m.n / 2) * 100}%` : "0%" }}
                />
              </div>
            </div>
          ))}
        </div>
        <p className={`mt-auto pt-4 text-[11.5px] leading-relaxed text-black/55 transition-opacity duration-500 ${t >= 0.86 ? "opacity-100" : "opacity-0"}`}>
          Not every step needs AI. It is used only where reading the document needs it.
        </p>
      </Panel>
    </div>
  );
}

/* ── 03 · evaluate the exceptions ────────────────────────────── */
const HUMAN = [3, 11, 17, 24, 33];
const CAUGHT = 26;
const results = Array.from({ length: 40 }, (_, i) => (HUMAN.includes(i) ? "human" : i === CAUGHT ? "caught" : "ok"));
const safeguards = [
  "Only permitted data is sent to the model",
  "Access limited to the accounts team",
  "Low confidence goes to a person",
  "Every action kept in an audit trail",
];

function EvaluateScene({ t }: { t: number }) {
  const n = Math.floor(clamp01((t - 0.04) / 0.66) * 40);
  const seen = results.slice(0, n);
  const ok = seen.filter((r) => r === "ok").length;
  const human = seen.filter((r) => r === "human").length;
  const caught = seen.filter((r) => r === "caught").length;
  const cell = { ok: "bg-emerald-500", human: "bg-amber-400", caught: "bg-rose-400" } as const;
  return (
    <div className={grid}>
      <Panel
        title="Test set · 40 sample invoices"
        right={<span className="font-mono text-[10px] text-black/40">{n} / 40 run</span>}
      >
        <div className="grid grid-cols-10 gap-1.5 @max-[520px]:gap-1">
          {results.map((r, i) => (
            <span
              key={i}
              className={`aspect-square rounded-[5px] transition-all duration-300 ${i < n ? `${cell[r as keyof typeof cell]} scale-100` : "scale-90 border border-rule bg-[#f8fafc]"}`}
            />
          ))}
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {[
            { label: "Accepted", v: ok, dot: "bg-emerald-500" },
            { label: "Sent to a person", v: human, dot: "bg-amber-400" },
            { label: "Errors caught", v: caught, dot: "bg-rose-400" },
          ].map((s) => (
            <div key={s.label} className="rounded-lg border border-rule bg-[#f8fafc] px-2.5 py-2">
              <div className="flex items-start gap-1.5 text-[10px] leading-tight text-black/50">
                <span className={`mt-[3px] h-1.5 w-1.5 shrink-0 rounded-full ${s.dot}`} />
                <span>{s.label}</span>
              </div>
              <div className="font-display text-[20px] leading-none tabular-nums">{s.v}</div>
            </div>
          ))}
        </div>
      </Panel>
      <Panel title="Safeguards">
        <div className="flex flex-col gap-2.5">
          {safeguards.map((s, i) => {
            const on = t >= 0.74 + i * 0.06;
            return (
              <div key={s} className="flex items-start gap-2.5 text-[11.5px] leading-snug">
                <span className={`mt-[1px] flex h-4 w-4 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${on ? "bg-emerald-500 text-white" : "border border-rule"}`}>
                  {on && <Check className="h-2.5 w-2.5" strokeWidth={3.5} />}
                </span>
                <span className={on ? "text-black/80" : "text-black/35"}>{s}</span>
              </div>
            );
          })}
        </div>
        <p className={`mt-auto pt-4 text-[11.5px] leading-relaxed text-black/55 transition-opacity duration-500 ${t >= 0.94 ? "opacity-100" : "opacity-0"}`}>
          Exceptions are expected. They are designed for, not hidden.
        </p>
      </Panel>
    </div>
  );
}

/* ── 04 · deploy with visibility ─────────────────────────────── */
const nodes = ["Received", "Read", "Checked", "Approve", "Posted"];
const log = [
  { at: 0.04, time: "09:12", text: "Invoice INV-4471 received from Bluepeak Supplies" },
  { at: 0.18, time: "09:12", text: "Fields read · confidence 97%" },
  { at: 0.32, time: "09:12", text: "Totals match PO-2208" },
  { at: 0.44, time: "09:13", text: "Over $5,000, sent to Priya for approval" },
  { at: 0.6, time: "09:41", text: "Approved by Priya" },
  { at: 0.72, time: "09:41", text: "Posted to accounting and filed" },
];

function DeployScene({ t }: { t: number }) {
  const active = t < 0.12 ? 0 : t < 0.26 ? 1 : t < 0.4 ? 2 : t < 0.68 ? 3 : t < 0.8 ? 4 : 5;
  const waiting = active === 3 && t < 0.58;
  const shown = log.filter((l) => t >= l.at);
  const done = t >= 0.72;
  return (
    <div className={grid}>
      <div className="flex min-h-0 min-w-0 flex-col gap-4">
        <Panel title="Live run · INV-4471">
          <div className="grid grid-cols-5 gap-2 @max-[520px]:grid-cols-1">
            {nodes.map((n, i) => {
              const state = i < active ? "done" : i === active ? "active" : "pending";
              return (
                <div
                  key={n}
                  className={`relative flex items-center gap-2 rounded-lg border px-2.5 py-2.5 text-[11px] font-medium transition-all duration-300 @min-[521px]:flex-col @min-[521px]:gap-1 @min-[521px]:text-center ${
                    state === "done"
                      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                      : state === "active"
                        ? i === 3
                          ? "border-amber-300 bg-amber-50 text-amber-700 ring-2 ring-amber-200"
                          : "border-brand/40 bg-blue-50 text-brand ring-2 ring-brand/15"
                        : "border-dashed border-rule text-black/35"
                  }`}
                >
                  {state === "done" ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : i === 3 ? <UserCheck className="h-3.5 w-3.5" /> : <span className="font-mono text-[10px]">0{i + 1}</span>}
                  {n}
                  {state === "active" && (
                    <span className="ai-motion absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-current opacity-60 animate-[ai-ping_1.2s_ease-out_infinite]" />
                  )}
                </div>
              );
            })}
          </div>
          <div
            className={`mt-3 flex items-center gap-2.5 rounded-lg border px-3 py-2.5 text-[11.5px] transition-all duration-300 ${
              waiting ? "border-amber-200 bg-amber-50 text-amber-700" : done ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-rule bg-[#f8fafc] text-black/55"
            }`}
          >
            {waiting ? <UserCheck className="h-3.5 w-3.5 shrink-0" /> : done ? <CircleCheck className="h-3.5 w-3.5 shrink-0" /> : <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />}
            <span key={waiting ? "w" : done ? "d" : "r"} className="animate-[ai-fade_.3s_ease-out]">
              {waiting ? "Waiting for a person: a human decision, by design" : done ? "Complete · no one had to retype anything" : "Running automatically"}
            </span>
          </div>
        </Panel>
        <Panel title="Activity log" className="flex-1">
          <div className="flex min-h-[112px] flex-col gap-1.5">
            {shown.map((l) => (
              <div key={l.text} className="flex items-start gap-2 text-[11px] animate-[ai-rise_.3s_ease-out]">
                <span className="font-mono text-[10px] text-black/40">{l.time}</span>
                <span className="min-w-0 text-black/75">{l.text}</span>
              </div>
            ))}
          </div>
        </Panel>
      </div>
      <Panel title="Run summary · example">
        <div className="flex flex-col gap-3">
          {[
            { k: "Processed today", v: 37 + (done ? 1 : 0) },
            { k: "Handled automatically", v: 31 },
            { k: "Sent to a person", v: 6 + (t >= 0.44 ? 1 : 0) },
          ].map((s) => (
            <div key={s.k} className="flex items-baseline justify-between gap-2 border-b border-rule pb-2.5 last:border-0 last:pb-0">
              <span className="text-[11.5px] text-black/55">{s.k}</span>
              <span className="font-display text-[22px] leading-none tabular-nums">{s.v}</span>
            </div>
          ))}
        </div>
        <div className="mt-auto flex flex-col gap-2 pt-4 text-[11px]">
          <div className="flex items-center justify-between gap-2 rounded-lg bg-[#f8fafc] px-2.5 py-2">
            <span className="text-black/50">Owner</span>
            <span className="font-medium">Finance Ops</span>
          </div>
          <div className="flex items-center justify-between gap-2 rounded-lg bg-[#f8fafc] px-2.5 py-2">
            <span className="text-black/50">Digest</span>
            <span className="font-medium">Daily, 8:00</span>
          </div>
          <div className="flex items-center justify-between gap-2 rounded-lg bg-[#f8fafc] px-2.5 py-2">
            <span className="text-black/50">Running cost</span>
            <span className="font-medium">Tracked per run</span>
          </div>
        </div>
      </Panel>
    </div>
  );
}
