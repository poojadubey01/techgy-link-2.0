"use client";

import { Fragment, useEffect, useRef, useState, type ReactNode } from "react";
import {
  Boxes,
  Check,
  CircleCheck,
  Database,
  GraduationCap,
  KeyRound,
  LifeBuoy,
  Lock,
  Mail,
  Rocket,
  ShieldCheck,
  SquareTerminal,
  Workflow,
} from "lucide-react";

const phases = [
  { tab: "Discover", title: "Discover the workflow", desc: "Capture roles, handoffs and the business rules behind every decision.", Icon: Workflow, ticks: 46 },
  { tab: "Scope", title: "Define scope and architecture", desc: "Define the application, integrations and shared source of truth.", Icon: Boxes, ticks: 46 },
  { tab: "Build", title: "Build and verify", desc: "Turn approved workflows into a tested business application.", Icon: SquareTerminal, ticks: 52 },
  { tab: "Release", title: "Release and support", desc: "Deploy, document and give the team a clear support path.", Icon: Rocket, ticks: 46 },
];
const starts = phases.map((_, i) => phases.slice(0, i).reduce((s, p) => s + p.ticks, 0));
const TOTAL = phases.reduce((s, p) => s + p.ticks, 0);

const modules = [
  { name: "Purchase orders", Icon: ShieldCheck, plannedAt: 0.27, builtAt: 0.56 },
  { name: "Approvals", Icon: CircleCheck, plannedAt: 0.31, builtAt: 0.61 },
  { name: "Vendor management", Icon: Boxes, plannedAt: 0.35, builtAt: 0.67 },
  { name: "Reporting", Icon: Database, plannedAt: 0.39, builtAt: 0.73 },
  { name: "Permissions", Icon: KeyRound, plannedAt: 0.43, builtAt: 0.79 },
];

const css = `
@keyframes cs-pop { 0% { transform: scale(.88); opacity: 0 } 60% { transform: scale(1.04); opacity: 1 } 100% { transform: scale(1); opacity: 1 } }
@keyframes cs-rise { from { opacity: 0; transform: translateY(8px) } to { opacity: 1; transform: none } }
@keyframes cs-fade { from { opacity: 0 } to { opacity: 1 } }
@keyframes cs-blink { 50% { opacity: 0 } }
@keyframes cs-dash { to { stroke-dashoffset: -16 } }
@keyframes cs-slide { from { opacity: 0; transform: translateX(20px) } to { opacity: 1; transform: none } }
@media (prefers-reduced-motion: reduce) {
  .cs-motion, .cs-motion * { animation: none !important; transition: none !important; }
}
`;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

export function CustomSoftwareDesktop() {
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
  const gf = tick / TOTAL;

  const status = [
    { text: "Discovery", cls: "border-amber-200 bg-amber-50 text-amber-700", dot: "bg-amber-500" },
    { text: "Architecture", cls: "border-rule bg-[#f1f4f9] text-black/60", dot: "bg-black/40" },
    { text: "Building", cls: "border-blue-200 bg-blue-50 text-brand", dot: "bg-brand" },
    gf >= 0.9
      ? { text: "Live", cls: "border-emerald-200 bg-emerald-50 text-emerald-700", dot: "bg-emerald-500 animate-pulse" }
      : { text: "Staging", cls: "border-amber-200 bg-amber-50 text-amber-700", dot: "bg-amber-500" },
  ][phase];

  return (
    <div ref={rootRef} className="service-demo cs-motion relative w-full overflow-hidden rounded-md border border-rule bg-[#f8f9fa] text-black select-none">
      <style>{css}</style>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#0000000d_1px,transparent_1px)] bg-[size:20px_20px]" />
      <div className="pointer-events-none absolute -top-24 -right-20 h-[420px] w-[420px] rounded-full bg-blue-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-24 h-[360px] w-[360px] rounded-full bg-blue-100/60 blur-3xl" />

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

        {/* console */}
        <div className="mt-4 overflow-hidden rounded-xl border border-rule bg-white shadow-[0_28px_60px_-30px_rgba(15,26,52,0.45)]">
          <div className="flex items-center gap-3 border-b border-rule px-3 py-2">
            <span className="flex shrink-0 items-center gap-1.5 @max-[520px]:hidden">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            </span>
            <div className="flex min-w-0 flex-1 items-center gap-2 rounded-full bg-[#f1f4f9] px-3 py-1.5 font-mono text-[11.5px]">
              <Lock className="h-3 w-3 shrink-0 text-emerald-600" />
              <span className="truncate text-black/80">app.meridian-procure.internal</span>
            </div>
            <span key={status.text} className={`flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider animate-[cs-pop_.35s_ease-out] ${status.cls}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
              {status.text}
            </span>
          </div>

          <div className="grid grid-cols-[minmax(120px,148px)_minmax(0,1fr)] @max-[640px]:grid-cols-1">
            {/* persistent sidebar */}
            <div className="border-r border-rule bg-[#f8fafc] p-3 @max-[640px]:border-b @max-[640px]:border-r-0">
              <div className="flex items-center gap-1.5 px-1">
                <span className="h-[18px] w-[18px] rounded-[5px] bg-brand" />
                <span className="text-[11.5px] font-semibold">Procure</span>
              </div>
              <div className="mt-3 flex flex-col gap-1 @max-[640px]:grid @max-[640px]:grid-cols-2 @max-[640px]:gap-1.5">
                {modules.map((m) => {
                  const planned = gf >= m.plannedAt;
                  const built = gf >= m.builtAt;
                  return (
                    <div key={m.name} className={`flex items-center gap-1.5 rounded-md px-1.5 py-1.5 text-[10.5px] transition-colors ${built ? "bg-blue-50 text-brand" : "text-black/40"}`}>
                      <span
                        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-[4px] transition-colors ${
                          built ? "bg-brand text-white" : planned ? "border border-dashed border-black/25" : "border border-black/10"
                        }`}
                      >
                        {built ? <Check className="h-2.5 w-2.5" strokeWidth={3.5} /> : <m.Icon className="h-2.5 w-2.5" />}
                      </span>
                      <span className={`truncate ${built ? "font-medium" : ""}`}>{m.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* phase content */}
            <div key={phase} className="min-h-[420px] animate-[cs-fade_.4s_ease-out] @max-[640px]:min-h-[380px]">
              {phase === 0 && <DiscoverScene t={t} />}
              {phase === 1 && <ScopeScene t={t} />}
              {phase === 2 && <BuildScene t={t} />}
              {phase === 3 && <ReleaseScene t={t} gf={gf} />}
            </div>
          </div>
        </div>

        {/* caption */}
        <div key={phase} className="mt-4 flex items-baseline gap-3 px-1 animate-[cs-rise_.4s_ease-out] @max-[520px]:flex-col @max-[520px]:gap-0.5">
          <span className="font-mono text-[11px] text-brand">0{phase + 1}</span>
          <span className="text-[14px] font-medium">{phases[phase].title}</span>
          <span className="text-[13px] text-black/55">{phases[phase].desc}</span>
        </div>
      </div>
    </div>
  );
}

/* ── shared ───────────────────────────────────────────────────── */
function Panel({ title, children, className = "" }: { title: string; children: ReactNode; className?: string }) {
  return (
    <div className={`flex min-h-0 min-w-0 flex-col rounded-xl border border-rule bg-white p-4 shadow-xs ${className}`}>
      <div className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-black/45">{title}</div>
      {children}
    </div>
  );
}

/* ── 01 · discover the workflow ──────────────────────────────── */
const flowNodes = [
  { label: "Order raised", x: 8, y: 40, at: 0.03, kind: "start" },
  { label: "≥ $10,000?", x: 184, y: 40, at: 0.14, kind: "decision" },
  { label: "Manager approves", x: 8, y: 160, at: 0.3, kind: "step" },
  { label: "Finance approves", x: 184, y: 160, at: 0.42, kind: "step" },
  { label: "PO issued", x: 96, y: 252, at: 0.56, kind: "end" },
] as const;
const flowEdges = [
  { d: "M114 62 L182 62", at: 0.1 },
  { d: "M204 84 Q 60 108, 60 156", at: 0.22, label: { x: 102, y: 116, text: "No" } },
  { d: "M236 84 L236 156", at: 0.34, label: { x: 244, y: 124, text: "Yes" } },
  { d: "M60 204 Q 70 240, 100 250", at: 0.48 },
  { d: "M236 204 Q 228 240, 196 250", at: 0.5 },
];
const rules = [
  { text: "Orders ≥ $10,000 require Finance approval", at: 0.62 },
  { text: "Manager sign-off within 2 business days", at: 0.72 },
  { text: "Vendor must already be pre-approved", at: 0.82 },
];

function DiscoverScene({ t }: { t: number }) {
  return (
    <div className="grid h-full grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] gap-4 p-5 @max-[640px]:grid-cols-1 @max-[640px]:p-3.5">
      <Panel title="Workflow map">
        <div className="relative mx-auto h-[300px] w-[296px] max-w-full">
          <svg className="absolute left-0 top-0" width="296" height="300" viewBox="0 0 296 300" aria-hidden="true">
            {flowEdges.map((e, i) => (
              <g key={i}>
                <path
                  d={e.d}
                  fill="none"
                  stroke="#cbd5e1"
                  strokeWidth="1.6"
                  pathLength={1}
                  strokeDasharray="1"
                  strokeDashoffset={t >= e.at ? 0 : 1}
                  style={{ transition: "stroke-dashoffset 500ms ease" }}
                  markerEnd="url(#cs-arrow)"
                />
                {e.label && (
                  <text x={e.label.x} y={e.label.y} fontSize="9.5" fontWeight="600" fill="#64748b" opacity={t >= e.at ? 1 : 0} style={{ transition: "opacity 300ms" }}>
                    {e.label.text}
                  </text>
                )}
              </g>
            ))}
            <defs>
              <marker id="cs-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M0 0 L10 5 L0 10 Z" fill="#94a3b8" />
              </marker>
            </defs>
          </svg>
          {flowNodes.map((n) =>
            t >= n.at ? (
              <div
                key={n.label}
                className={`absolute flex h-11 w-[104px] items-center justify-center rounded-lg border px-2 text-center text-[11px] font-medium shadow-xs animate-[cs-pop_.35s_ease-out_both] ${
                  n.kind === "start"
                    ? "border-blue-200 bg-blue-50 text-brand"
                    : n.kind === "end"
                      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                      : n.kind === "decision"
                        ? "rounded-full border-amber-200 bg-amber-50 text-amber-700"
                        : "border-rule bg-white text-navy"
                }`}
                style={{ left: n.x, top: n.y }}
              >
                {n.label}
              </div>
            ) : null,
          )}
        </div>
      </Panel>
      <Panel title="Business rules captured">
        <div className="flex flex-col gap-2">
          {rules.map((r) => (
            <div
              key={r.text}
              className={`flex items-start gap-2 rounded-lg border px-3 py-2.5 text-[11.5px] leading-snug transition-all duration-300 ${
                t >= r.at ? "border-rule bg-white opacity-100" : "border-dashed border-rule text-black/30 opacity-60"
              }`}
            >
              <span className={`mt-[1px] flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${t >= r.at ? "bg-emerald-500 text-white" : "border border-rule"}`}>
                {t >= r.at && <Check className="h-2.5 w-2.5" strokeWidth={3.5} />}
              </span>
              <span className={t >= r.at ? "text-black/80" : ""}>{r.text}</span>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

/* ── 02 · scope and architecture ─────────────────────────────── */
const archNodes = [
  { label: "Web App", x: 12, y: 112, at: 0.1, core: true },
  { label: "API", x: 190, y: 4, at: 0.18, core: false },
  { label: "Database", x: 190, y: 56, at: 0.26, core: false },
  { label: "ERP", x: 190, y: 108, at: 0.38, core: false },
  { label: "SSO", x: 190, y: 160, at: 0.46, core: false },
  { label: "Email", x: 190, y: 212, at: 0.54, core: false },
] as const;
const archEdges: [number, number, number][] = [
  [0, 1, 0.14],
  [0, 2, 0.22],
  [0, 3, 0.32],
  [0, 4, 0.4],
  [0, 5, 0.48],
];
const scope = [
  { name: "Purchase orders", in: true, at: 0.64 },
  { name: "Vendor management", in: true, at: 0.7 },
  { name: "Approval workflow", in: true, at: 0.76 },
  { name: "Advanced analytics", in: false, at: 0.84, note: "Phase 2" },
];

function ScopeScene({ t }: { t: number }) {
  return (
    <div className="grid h-full grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] gap-4 p-5 @max-[640px]:grid-cols-1 @max-[640px]:p-3.5">
      <Panel title="System architecture">
        <div className="relative mx-auto h-[260px] w-[296px] max-w-full">
          <svg className="absolute left-0 top-0" width="296" height="260" viewBox="0 0 296 260" aria-hidden="true">
            {archEdges.map(([a, b, at], i) => {
              const on = t >= at;
              const na = archNodes[a];
              const nb = archNodes[b];
              return (
                <line
                  key={i}
                  x1={na.x + 100}
                  y1={na.y + 18}
                  x2={nb.x}
                  y2={nb.y + 18}
                  stroke="#0022ff"
                  strokeOpacity={on ? 0.55 : 0}
                  strokeWidth="1.6"
                  strokeDasharray="4 4"
                  className={on ? "animate-[cs-dash_1s_linear_infinite]" : ""}
                  style={{ transition: "stroke-opacity 400ms" }}
                />
              );
            })}
          </svg>
          {archNodes.map((n) =>
            t >= n.at ? (
              <div
                key={n.label}
                className={`absolute flex h-9 w-[100px] items-center justify-center rounded-lg border text-[11px] font-medium shadow-xs animate-[cs-pop_.35s_ease-out_both] ${
                  n.core ? "border-brand/40 bg-blue-50 text-brand ring-1 ring-brand/15" : "border-rule bg-white text-navy"
                }`}
                style={{ left: n.x, top: n.y }}
              >
                {n.label}
              </div>
            ) : null,
          )}
        </div>
      </Panel>
      <Panel title="Scope">
        <div className="flex flex-col gap-2">
          {scope.map((s) => (
            <div
              key={s.name}
              className={`flex items-center justify-between gap-2 rounded-lg border px-3 py-2.5 text-[11.5px] transition-all duration-300 ${
                t >= s.at ? "border-rule bg-white opacity-100" : "border-dashed border-rule text-black/30 opacity-60"
              }`}
            >
              <span className={t >= s.at ? "font-medium text-black/85" : ""}>{s.name}</span>
              {t >= s.at &&
                (s.in ? (
                  <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[9.5px] font-semibold text-emerald-700 animate-[cs-pop_.3s_ease-out]">
                    <Check className="h-2.5 w-2.5" strokeWidth={3} /> In scope
                  </span>
                ) : (
                  <span className="rounded-full bg-[#f1f4f9] px-2 py-0.5 text-[9.5px] font-semibold text-black/50 animate-[cs-pop_.3s_ease-out]">{s.note}</span>
                ))}
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

/* ── 03 · build and verify ───────────────────────────────────── */
const codeLine = 'if (order.amount >= 10000) requireApproval("finance");';
const tests = [
  { text: "Requester can submit an order", at: 0.58 },
  { text: "Manager can approve under $10k", at: 0.66 },
  { text: "Finance approval required at $10k+", at: 0.74 },
  { text: "Unapproved vendors are blocked", at: 0.82 },
];
const perms = [
  ["Requester", [true, false, false]],
  ["Manager", [true, true, false]],
  ["Finance", [true, true, true]],
] as const;

function BuildScene({ t }: { t: number }) {
  const typed = codeLine.slice(0, Math.floor(clamp01(t / 0.4) * codeLine.length));
  const typing = t < 0.4;
  return (
    <div className="grid h-full grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] gap-4 p-5 @max-[640px]:grid-cols-1 @max-[640px]:p-3.5">
      <div className="flex min-h-0 min-w-0 flex-col gap-3">
        <div className="rounded-xl border border-rule bg-navy p-4 font-mono text-[11.5px] leading-relaxed text-white/85 shadow-xs">
          <div className="mb-2 text-[10px] uppercase tracking-wider text-white/40">approvals.ts</div>
          <div className="text-sky-300">
            {typed}
            {typing && <span className="ml-px inline-block h-3.5 w-px bg-white align-middle animate-[cs-blink_1s_steps(1)_infinite]" />}
          </div>
        </div>
        <Panel title="Automated tests" className="flex-1">
          <div className="flex flex-col gap-2">
            {tests.map((ts) => {
              const on = t >= ts.at;
              return (
                <div key={ts.text} className="flex items-center gap-2 text-[11.5px]">
                  <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${on ? "bg-emerald-500 text-white" : "border border-rule"}`}>
                    {on && <Check className="h-2.5 w-2.5" strokeWidth={3.5} />}
                  </span>
                  <span className={on ? "text-black/80" : "text-black/35"}>{ts.text}</span>
                </div>
              );
            })}
          </div>
        </Panel>
      </div>
      <Panel title="Permissions">
        <div className="grid grid-cols-4 gap-1.5 text-[10px]">
          <span />
          {["Submit", "≤ $10k", "≥ $10k"].map((h) => (
            <span key={h} className="text-center font-medium text-black/45">
              {h}
            </span>
          ))}
          {perms.map(([role, cells], ri) => (
            <Fragment key={role}>
              <span className="flex items-center font-medium text-black/70">{role}</span>
              {cells.map((c, ci) => {
                const at = 0.1 + (ri * 3 + ci) * 0.045;
                const on = c && t >= at;
                return (
                  <span key={ci} className="flex items-center justify-center">
                    {on && <Check className="h-3.5 w-3.5 text-emerald-500 animate-[cs-pop_.3s_ease-out]" strokeWidth={3} />}
                  </span>
                );
              })}
            </Fragment>
          ))}
        </div>
      </Panel>
    </div>
  );
}

/* ── 04 · release and support ────────────────────────────────── */
const pipeline = ["Build", "Staging", "Production"];
const handover = [
  { Icon: GraduationCap, text: "Training session booked · 2 Oct" },
  { Icon: LifeBuoy, text: "Support: Tier 2, 4h response SLA" },
  { Icon: Mail, text: "Documentation sent to the team" },
];

function ReleaseScene({ t, gf }: { t: number; gf: number }) {
  const stage = t < 0.3 ? 0 : t < 0.6 ? 1 : 2;
  const live = gf >= 0.9;
  const ticket = t >= 0.86;
  return (
    <div className="grid h-full grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] gap-4 p-5 @max-[640px]:grid-cols-1 @max-[640px]:p-3.5">
      <Panel title="Deployment">
        <div className="flex items-center gap-2">
          {pipeline.map((p, i) => (
            <div key={p} className="flex flex-1 items-center gap-2">
              <div className={`flex h-8 flex-1 items-center justify-center gap-1.5 rounded-lg border text-[11px] font-medium ${i < stage ? "border-emerald-200 bg-emerald-50 text-emerald-700" : i === stage ? "border-brand/40 bg-blue-50 text-brand" : "border-dashed border-rule text-black/35"}`}>
                {i < stage && <Check className="h-3 w-3" strokeWidth={3} />}
                {p}
              </div>
              {i < pipeline.length - 1 && <span className={`h-px w-4 shrink-0 ${i < stage ? "bg-emerald-300" : "bg-rule"}`} />}
            </div>
          ))}
        </div>
        <div className={`mt-4 flex items-center gap-2.5 rounded-lg border px-3 py-2.5 text-[12.5px] font-medium transition-all duration-500 ${live ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-dashed border-rule text-black/35"}`}>
          <span className={`h-2 w-2 shrink-0 rounded-full ${live ? "bg-emerald-500 animate-pulse" : "bg-black/20"}`} />
          {live ? "meridian-procure.internal is live" : "Deploying to production…"}
        </div>
        <div className="mt-3 flex flex-col gap-1.5 text-[11px] text-black/55">
          <div className="flex items-center gap-1.5">
            <Check className={`h-3 w-3 ${t >= 0.14 ? "text-emerald-500" : "text-black/20"}`} strokeWidth={3} /> Build passed · 0 errors
          </div>
          <div className="flex items-center gap-1.5">
            <Check className={`h-3 w-3 ${t >= 0.44 ? "text-emerald-500" : "text-black/20"}`} strokeWidth={3} /> Smoke tests passed on staging
          </div>
        </div>
      </Panel>
      <Panel title="Handover">
        <div className="flex flex-col gap-2.5">
          {handover.map((h, i) => {
            const at = 0.66 + i * 0.07;
            const on = t >= at;
            return (
              <div key={h.text} className={`flex items-center gap-2.5 text-[11.5px] transition-opacity duration-300 ${on ? "opacity-100" : "opacity-30"}`}>
                <h.Icon className={`h-3.5 w-3.5 shrink-0 ${on ? "text-brand" : "text-black/35"}`} />
                <span className={on ? "text-black/80" : "text-black/40"}>{h.text}</span>
              </div>
            );
          })}
        </div>
        {ticket && (
          <div className="mt-auto flex items-center gap-2.5 rounded-lg border border-rule bg-[#f8fafc] px-3 py-2.5 text-[11px] animate-[cs-slide_.45s_ease-out_both]">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-[9px] font-bold text-white">PR</span>
            <div className="min-w-0 flex-1">
              <div className="font-medium">New vendor request</div>
              <div className="truncate text-[10px] text-black/45">Assigned to Priya · Support</div>
            </div>
            <CircleCheck className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
          </div>
        )}
      </Panel>
    </div>
  );
}
