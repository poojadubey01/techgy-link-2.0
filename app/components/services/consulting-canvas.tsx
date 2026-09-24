"use client";

import { useEffect, useRef, useState } from "react";
import {
  Activity,
  Boxes,
  ChartColumn,
  Check,
  CircleCheck,
  Cloud,
  CreditCard,
  Gauge,
  GitBranch,
  Network,
  Server,
  ShieldCheck,
  ShoppingCart,
  Users,
  Zap,
} from "lucide-react";

type Tab = "portal" | "impact" | "roadmap";

const modules = [
  { name: "Auth", code: "SEC-01", Icon: ShieldCheck, at: 22 },
  { name: "Customers", code: "CRM-02", Icon: Users, at: 34 },
  { name: "Orders", code: "ORD-03", Icon: ShoppingCart, at: 46 },
  { name: "Billing", code: "BIL-04", Icon: CreditCard, at: 58 },
  { name: "Inventory", code: "INV-05", Icon: Boxes, at: 70 },
  { name: "Reports", code: "RPT-06", Icon: ChartColumn, at: 82 },
];

const phases = [
  { label: "Assess", from: 0 },
  { label: "Bridge", from: 12 },
  { label: "Migrate", from: 22 },
  { label: "Optimise", from: 88 },
];

const legacyLogs: [string, string][] = [
  ["WARN", "heap 91% · GC pause 2.4s"],
  ["ERR ", "batch BIL-07 timed out"],
  ["WARN", "tape backup window exceeded"],
  ["ERR ", "deadlock on TBL_ORDERS"],
  ["INFO", "manual patch applied by ops"],
  ["WARN", "TLS cert expires in 6 days"],
  ["ERR ", "RPT-06 nightly job failed"],
];

// Deliberately messy coupling drawn over the monolith; each entry lists the modules it ties together.
const tangles: { d: string; ends: [number, number] }[] = [
  { d: "M16.7 25 C 30 85, 40 15, 50 75", ends: [0, 4] },
  { d: "M50 25 C 40 60, 22 38, 16.7 75", ends: [1, 3] },
  { d: "M83.3 25 C 60 92, 38 8, 16.7 75", ends: [2, 3] },
  { d: "M16.7 25 C 50 -8, 60 108, 83.3 75", ends: [0, 5] },
  { d: "M50 25 C 76 38, 60 82, 83.3 75", ends: [1, 5] },
  { d: "M83.3 25 C 96 60, 70 55, 50 75", ends: [2, 4] },
  { d: "M16.7 25 C 38 52, 62 -2, 83.3 25", ends: [0, 2] },
];

// Cloud mesh geometry in % of a fixed 166px-tall box: gateway 0–32px, tiles rows at 50–100px and 116–166px.
const MESH_X = [16.1, 50, 83.9];
const MESH_ROW1_TOP = 30.1;
const MESH_Y = [45.2, 84.9];
const meshEdges: [number, number][] = [[0, 1], [1, 2], [3, 4], [4, 5], [0, 3], [1, 4], [2, 5]];

const kpis = [
  { value: 43, decimals: 0, prefix: "", suffix: "×", label: "Faster responses", sub: "520 ms → 12 ms p95" },
  { value: 45, decimals: 0, prefix: "", suffix: "/day", label: "Production releases", sub: "was 1 every 6 months" },
  { value: 82, decimals: 0, prefix: "−", suffix: "%", label: "Maintenance drag", sub: "78% → 14% of IT budget" },
  { value: 99.99, decimals: 2, prefix: "", suffix: "%", label: "Uptime SLA", sub: "up from 98.1%" },
];

const comparisons = [
  { metric: "p95 response time", before: "520 ms", after: "12 ms", b: 100, a: 2.3, gain: "43× faster" },
  { metric: "Annual downtime", before: "166 h", after: "53 min", b: 100, a: 0.6, gain: "99.99% SLA" },
  { metric: "Maintenance share of budget", before: "78%", after: "14%", b: 78, a: 14, gain: "−82% drag" },
  { metric: "Time between releases", before: "6 months", after: "32 min", b: 100, a: 0.4, gain: "Continuous CD" },
];

const roadmapSteps = [
  {
    n: "01",
    title: "Discovery & Audit",
    weeks: "Weeks 1–2",
    metric: "Full dependency map",
    desc: "Deconstruct legacy codebases, map data dependencies and isolate technical debt before anything moves.",
    owner: "Principal architect",
    checkpoint: "Roadmap sign-off",
    items: ["Systems & dependency map", "Risk & tech-debt register", "Target architecture options"],
  },
  {
    n: "02",
    title: "Strangler Fig Bridge",
    weeks: "Weeks 3–6",
    metric: "Zero-downtime cutover",
    desc: "A gateway sits in front of the legacy core and routes live traffic to new services one slice at a time.",
    owner: "Integration lead",
    checkpoint: "Shadow parity ≥ 99.9%",
    items: ["Gateway in front of legacy", "Shadow-traffic validation", "Incremental cutover plan"],
  },
  {
    n: "03",
    title: "Cloud Native Execution",
    weeks: "Weeks 7–12",
    metric: "45× ship velocity",
    desc: "Auto-scaled services with continuous delivery, observability and principal-level advisory throughout.",
    owner: "Platform team",
    checkpoint: "Legacy decommissioned",
    items: ["Containerised services", "CI/CD & automated tests", "Observability & FinOps"],
  },
];

const CYCLE_TICKS = 132;
const ROADMAP_MS = 4500;

const css = `
@keyframes cc-packet { 0% { left: 0%; opacity: 0 } 12% { opacity: 1 } 88% { opacity: 1 } 100% { left: 100%; opacity: 0 } }
@keyframes cc-packet-y { 0% { top: 0%; opacity: 0 } 15% { opacity: 1 } 85% { opacity: 1 } 100% { top: 100%; opacity: 0 } }
@keyframes cc-spin { to { transform: rotate(360deg) } }
@keyframes cc-halo { 0%, 100% { transform: scale(0.92); opacity: .55 } 50% { transform: scale(1.12); opacity: .12 } }
@keyframes cc-log { from { transform: translateY(0) } to { transform: translateY(-50%) } }
@keyframes cc-dash { to { stroke-dashoffset: -16 } }
@keyframes cc-pop { 0% { transform: scale(.86); opacity: 0 } 60% { transform: scale(1.04); opacity: 1 } 100% { transform: scale(1); opacity: 1 } }
@keyframes cc-fade { from { opacity: 0; transform: translateY(6px) } to { opacity: 1; transform: none } }
@keyframes cc-stamp { 0% { transform: rotate(-11deg) scale(1.7); opacity: 0 } 55% { transform: rotate(-11deg) scale(.94); opacity: 1 } 100% { transform: rotate(-11deg) scale(1); opacity: 1 } }
@keyframes cc-flicker { 0%, 100% { opacity: 1 } 42% { opacity: .5 } 47% { opacity: .95 } 52% { opacity: .35 } }
@keyframes cc-fill { from { transform: scaleX(0) } to { transform: scaleX(1) } }
@keyframes cc-shine { from { transform: translateX(-120%) } to { transform: translateX(420%) } }
@media (prefers-reduced-motion: reduce) {
  .cc-motion, .cc-motion * { animation: none !important; }
  .cc-packet { display: none !important; }
}
`;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/* ─────────────────────────────────────────────────────────────── */
export function ConsultingCanvas() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<Tab>("portal");
  const [visible, setVisible] = useState(false);
  const [tick, setTick] = useState(0);
  const [stepIdx, setStepIdx] = useState(0);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (activeTab !== "portal" || !visible) return;
    const id = setInterval(() => setTick((t) => (t + 1) % CYCLE_TICKS), 100);
    return () => clearInterval(id);
  }, [activeTab, visible]);

  useEffect(() => {
    if (activeTab !== "roadmap" || !visible) return;
    const id = setTimeout(() => setStepIdx((s) => (s + 1) % roadmapSteps.length), ROADMAP_MS);
    return () => clearTimeout(id);
  }, [activeTab, stepIdx, visible]);

  return (
    <div
      ref={rootRef}
      className="service-demo relative w-full h-full min-h-[680px] bg-[#f8f9fa] text-black overflow-hidden flex flex-col select-none rounded-md border border-rule font-sans"
    >
      <style>{css}</style>
      <div className="absolute inset-0 bg-[radial-gradient(#0000000d_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
      <div className="absolute -top-24 -right-20 w-[420px] h-[420px] rounded-full bg-blue-200/40 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-24 w-[380px] h-[380px] rounded-full bg-amber-100/50 blur-3xl pointer-events-none" />

      {/* ── HEADER ─────────────────────────────────────────── */}
      <div className="demo-toolbar relative z-10 flex items-center justify-between px-6 py-3 border-b border-rule bg-white/80 backdrop-blur-md">
        <div className="flex items-center gap-2.5 min-w-0 font-mono text-[12px]">
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="cc-motion absolute inline-flex h-full w-full rounded-full bg-brand opacity-60 animate-ping" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-brand" />
          </span>
          <span className="font-semibold text-brand">Modernisation Engine</span>
          <span className="text-black/40">/ legacy → cloud-native</span>
        </div>
        <div className="demo-tabs flex items-center gap-1 bg-[#e2e8f0]/60 p-0.5 rounded-lg border border-rule text-[11px]">
          {([
            { id: "portal", label: "Transformation", Icon: Activity },
            { id: "impact", label: "Impact", Icon: Gauge },
            { id: "roadmap", label: "3-Step Roadmap", Icon: GitBranch },
          ] as const).map(({ id, label, Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setActiveTab(id)}
              className={`flex items-center justify-center gap-1.5 px-3 py-1 rounded-md transition-all ${
                activeTab === id ? "bg-white text-brand font-medium shadow-xs" : "text-black/60 hover:text-black"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ── BODY ───────────────────────────────────────────── */}
      <div className="relative z-10 flex-1 flex flex-col min-h-0 p-6 @max-[520px]:p-3">
        {activeTab === "portal" && <TransformationView tick={tick} />}
        {activeTab === "impact" && <ImpactView />}
        {activeTab === "roadmap" && (
          <RoadmapView stepIdx={stepIdx} onSelect={setStepIdx} timerKey={`${stepIdx}-${visible}`} />
        )}
      </div>

      {/* ── FOOTER ─────────────────────────────────────────── */}
      <div className="demo-footer relative z-10 flex items-center justify-between px-6 py-2.5 border-t border-rule bg-white/80 text-[12px] text-black/60">
        <span className="flex items-center gap-2">
          <Activity className="h-4 w-4 text-brand" />
          Principal-led advisory · <strong className="font-medium text-black">zero-downtime delivery</strong>
        </span>
        <span className="font-mono text-[11px] text-black/40">TechGy Link · Modernisation Engine</span>
      </div>
    </div>
  );
}

/* ══ TAB 1 · TRANSFORMATION ═════════════════════════════════════ */
function TransformationView({ tick }: { tick: number }) {
  const p = Math.min(tick, 100);
  const done = p >= 100;
  const live = modules.map((m) => p >= m.at);
  const liveCount = live.filter(Boolean).length;
  const share = liveCount / modules.length;
  const pct = Math.round(share * 100);
  const migrateT = clamp01((p - 22) / (82 - 22));
  const latency = Math.round(520 - (520 - 12) * easeOut(migrateT));
  const week = Math.min(12, 1 + Math.floor((p / 100) * 12));
  const gatewayLive = p >= 12;

  let phaseIdx = 0;
  phases.forEach((ph, i) => {
    if (p >= ph.from) phaseIdx = i;
  });

  const event = done
    ? { ok: true, text: "Cutover complete · legacy mainframe decommissioned" }
    : p >= 88
      ? { ok: false, text: "Autoscaling & FinOps tuning across 6 services" }
      : liveCount > 0
        ? { ok: true, text: `${modules[liveCount - 1].name} service live on cloud · 0 dropped requests` }
        : gatewayLive
          ? { ok: false, text: "Gateway shadowing live traffic to the new stack" }
          : { ok: false, text: "Mapping 1,284 legacy dependencies" };

  const latencyTone = migrateT >= 1 ? "text-emerald-600" : migrateT > 0.5 ? "text-brand" : "text-amber-600";

  return (
    <div className="flex-1 flex flex-col gap-4 min-h-0 animate-[cc-fade_.4s_ease-out]">
      {/* control strip */}
      <div className="rounded-xl border border-rule bg-white/90 backdrop-blur px-4 py-3 flex flex-col gap-3 shadow-xs">
        <div className="flex items-center justify-between gap-x-4 gap-y-2 flex-wrap">
          <div className="flex items-center gap-1.5 flex-wrap">
            {phases.map((ph, i) => {
              const complete = done || i < phaseIdx;
              const current = !done && i === phaseIdx;
              return (
                <div key={ph.label} className="flex items-center gap-1.5">
                  {i > 0 && <span className={`w-4 h-px ${complete || current ? "bg-brand/40" : "bg-rule"}`} />}
                  <span
                    className={`flex items-center gap-1 rounded-full border px-2.5 py-1 text-[10.5px] font-medium transition-colors duration-300 ${
                      current
                        ? "bg-brand border-brand text-white shadow-[0_4px_12px_-4px_rgba(0,34,255,0.6)]"
                        : complete
                          ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                          : "bg-white border-rule text-black/40"
                    }`}
                  >
                    {complete && <Check className="h-3 w-3" />}
                    {ph.label}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="flex items-center gap-4 font-mono text-[11px] text-black/50">
            <span>
              Week <strong className="text-black font-semibold tabular-nums">{String(week).padStart(2, "0")}</strong>/12
            </span>
            <span>
              p95 <strong className={`font-semibold tabular-nums transition-colors ${latencyTone}`}>{latency}ms</strong>
            </span>
            <span>
              Downtime <strong className="font-semibold text-emerald-600">0s</strong>
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3 font-mono text-[10.5px]">
          <span className="shrink-0 w-[92px] @max-[520px]:w-auto text-amber-700">
            Legacy <span className="tabular-nums">{100 - pct}%</span>
          </span>
          <div className="relative flex-1 h-2 rounded-full bg-amber-200/70 overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#3350ff] to-brand transition-[width] duration-700 ease-out overflow-hidden"
              style={{ width: `${pct}%` }}
            >
              <span className="cc-motion absolute inset-y-0 w-1/4 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[cc-shine_2.4s_ease-in-out_infinite]" />
            </div>
          </div>
          <span className="shrink-0 w-[92px] @max-[520px]:w-auto text-right text-brand">
            Cloud <span className="tabular-nums">{pct}%</span>
          </span>
        </div>
      </div>

      {/* scene */}
      <div className="relative flex-1 grid grid-cols-[minmax(0,1fr)_minmax(190px,236px)_minmax(0,1fr)] items-stretch @max-[880px]:grid-cols-1 @max-[880px]:gap-y-1">
        <LegacyPanel live={live} done={done} liveCount={liveCount} />
        <div className="relative self-center flex items-center @max-[880px]:flex-col @max-[880px]:py-1">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-[radial-gradient(circle,rgba(0,34,255,0.14),transparent_62%)] pointer-events-none" />
          <Connector dir="in" active={!done} />
          <Hub p={p} done={done} pct={pct} />
          <Connector dir="out" active={liveCount > 0} />
        </div>
        <CloudPanel live={live} liveCount={liveCount} share={share} tick={tick} gatewayLive={gatewayLive} p={p} />
      </div>

      {/* event strip */}
      <div className="flex items-center justify-between gap-3 bg-white px-4 py-2.5 rounded-lg border border-rule text-[11.5px] text-black/70 shadow-xs">
        <span key={event.text} className="flex items-center gap-2 min-w-0 animate-[cc-fade_.35s_ease-out]">
          {event.ok ? (
            <CircleCheck className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
          ) : (
            <Zap className="h-3.5 w-3.5 shrink-0 text-brand" />
          )}
          <span className="truncate">{event.text}</span>
        </span>
        <span className="font-mono text-brand font-medium shrink-0 @max-[520px]:hidden">43× faster · 99.99% SLA</span>
      </div>
    </div>
  );
}

function LegacyPanel({ live, done, liveCount }: { live: boolean[]; done: boolean; liveCount: number }) {
  const cpu = Math.round(94 - 86 * (liveCount / modules.length));
  return (
    <div className="relative min-w-0">
      <div
        className={`relative h-full rounded-xl border border-[#2f2822] bg-[#16130f] text-stone-300 shadow-[0_22px_44px_-24px_rgba(28,25,23,0.75)] overflow-hidden flex flex-col transition-[filter,opacity] duration-700 ${
          done ? "grayscale opacity-75" : ""
        }`}
      >
        <div className="absolute inset-0 pointer-events-none opacity-[0.06] bg-[repeating-linear-gradient(0deg,#fff_0_1px,transparent_1px_3px)]" />
        <div className="absolute -top-20 -left-10 w-56 h-56 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

        {/* titlebar */}
        <div className="relative flex items-center justify-between gap-2 px-3.5 py-2.5 border-b border-[#2f2822] bg-[#1d1914]">
          <div className="flex items-center gap-2 min-w-0">
            <span className="flex gap-1 shrink-0">
              <span className="w-2 h-2 rounded-full bg-stone-700" />
              <span className="w-2 h-2 rounded-full bg-stone-700" />
              <span className="w-2 h-2 rounded-full bg-stone-700" />
            </span>
            <Server className="h-3.5 w-3.5 shrink-0 text-amber-500/80" />
            <span className="font-mono text-[11px] text-stone-400 truncate">mainframe-01 · on-prem</span>
          </div>
          <span
            className={`shrink-0 flex items-center gap-1.5 rounded border px-1.5 py-0.5 font-mono text-[9.5px] font-bold uppercase tracking-wider ${
              done ? "border-stone-600 text-stone-400" : "border-red-500/40 bg-red-500/10 text-red-400"
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${done ? "bg-stone-500" : "bg-red-500 cc-motion animate-pulse"}`} />
            {done ? "Offline" : "Degraded"}
          </span>
        </div>

        <div className="relative flex-1 flex flex-col gap-3 p-3.5">
          {/* monolith */}
          <div className="h-[166px] rounded-lg border border-[#3a3029] bg-[#1c1813] p-2 flex flex-col gap-2">
            <div className="flex items-center justify-between font-mono text-[9.5px] uppercase tracking-wider">
              <span className="text-amber-500/80">Monolith · COBOL · 1.2M LOC</span>
              <span className="text-red-400/80">Coupling: high</span>
            </div>
            <div className="relative flex-1 grid grid-cols-3 grid-rows-2 gap-1.5">
              {modules.map((m, i) => (
                <div
                  key={m.name}
                  className={`relative rounded-md border px-2 flex flex-col justify-center min-w-0 transition-all duration-500 ${
                    live[i] ? "border-dashed border-stone-700/80 bg-transparent" : "border-[#40352b] bg-[#241e18]"
                  }`}
                >
                  <span
                    className={`font-mono text-[11px] truncate transition-colors ${
                      live[i] ? "text-stone-600 line-through" : "text-amber-100/90"
                    }`}
                  >
                    {m.name}
                  </span>
                  {live[i] ? (
                    <span className="font-mono text-[9px] text-emerald-400/90 animate-[cc-fade_.4s_ease-out]">→ migrated</span>
                  ) : (
                    <span className="flex items-center gap-1 font-mono text-[9px] text-stone-500">
                      <span
                        className="cc-motion w-1 h-1 rounded-full bg-amber-500 animate-[cc-flicker_2.6s_linear_infinite]"
                        style={{ animationDelay: `${i * 0.37}s` }}
                      />
                      {m.code}
                    </span>
                  )}
                </div>
              ))}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden
              >
                {tangles.map((t, i) => {
                  const cut = live[t.ends[0]] || live[t.ends[1]];
                  return (
                    <path
                      key={i}
                      d={t.d}
                      fill="none"
                      stroke="#f87171"
                      strokeWidth="1.1"
                      strokeDasharray="3 3"
                      vectorEffect="non-scaling-stroke"
                      className="cc-motion animate-[cc-dash_1.6s_linear_infinite] transition-opacity duration-500"
                      style={{ opacity: cut ? 0 : 0.42 }}
                    />
                  );
                })}
              </svg>
            </div>
          </div>

          {/* stats */}
          <div className="grid grid-cols-3 gap-1.5">
            <div className="rounded-md border border-[#2f2822] bg-[#1d1914] px-2 py-1.5 min-w-0">
              <div className="font-mono text-[9px] uppercase tracking-wider text-stone-500">CPU load</div>
              <div className="font-mono text-[13px] text-amber-300 tabular-nums">{cpu}%</div>
              <div className="mt-1 h-1 rounded-full bg-stone-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-amber-500 to-red-500 transition-[width] duration-700"
                  style={{ width: `${cpu}%` }}
                />
              </div>
            </div>
            <div className="rounded-md border border-[#2f2822] bg-[#1d1914] px-2 py-1.5 min-w-0">
              <div className="font-mono text-[9px] uppercase tracking-wider text-stone-500">p95</div>
              <div className="cc-motion font-mono text-[13px] text-red-300 tabular-nums animate-[cc-flicker_3.2s_linear_infinite]">
                520ms
              </div>
              <div className="font-mono text-[9px] text-stone-600 truncate">sla breach</div>
            </div>
            <div className="rounded-md border border-[#2f2822] bg-[#1d1914] px-2 py-1.5 min-w-0">
              <div className="font-mono text-[9px] uppercase tracking-wider text-stone-500">Last release</div>
              <div className="font-mono text-[13px] text-stone-300 tabular-nums">184d</div>
              <div className="font-mono text-[9px] text-stone-600 truncate">manual deploy</div>
            </div>
          </div>

          {/* log ticker */}
          <div className="relative h-[58px] overflow-hidden rounded-md border border-[#2f2822] bg-black/40 px-2.5 [mask-image:linear-gradient(to_bottom,transparent,black_22%,black_78%,transparent)]">
            <div className="cc-motion animate-[cc-log_14s_linear_infinite]">
              {[...legacyLogs, ...legacyLogs].map(([lvl, msg], i) => (
                <div key={i} className="font-mono text-[10px] leading-[19px] whitespace-nowrap truncate">
                  <span className={lvl.startsWith("ERR") ? "text-red-400" : lvl === "WARN" ? "text-amber-400" : "text-stone-500"}>
                    {lvl}
                  </span>
                  <span className="text-stone-500"> {msg}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {done && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="animate-[cc-stamp_.55s_cubic-bezier(.2,.9,.3,1.25)_both] rounded-md border-[2.5px] border-red-500/85 bg-[#16130f]/75 px-4 py-1.5 font-mono text-[15px] font-bold uppercase tracking-[0.22em] text-red-400 shadow-[0_0_0_4px_rgba(239,68,68,0.12)] backdrop-blur-[1px]">
            DISCONNECTED
          </div>
        </div>
      )}
    </div>
  );
}

function Connector({ dir, active }: { dir: "in" | "out"; active: boolean }) {
  const isIn = dir === "in";
  return (
    <div className="relative flex-1 min-w-[26px] h-[2px] @max-[880px]:flex-none @max-[880px]:w-[2px] @max-[880px]:h-7">
      <div
        className={`absolute inset-0 rounded-full ${
          isIn
            ? "bg-gradient-to-r from-amber-400/80 to-brand/40 @max-[880px]:bg-gradient-to-b"
            : "bg-gradient-to-r from-brand/40 to-brand/80 @max-[880px]:bg-gradient-to-b"
        }`}
      />
      <span
        className={`absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full border-2 bg-white @max-[880px]:hidden ${
          isIn ? "left-0 -translate-x-1/2 border-amber-400" : "right-0 translate-x-1/2 border-brand"
        }`}
      />
      {active &&
        [0, 1, 2].map((i) => (
          <span
            key={i}
            className="cc-packet absolute top-1/2 @max-[880px]:hidden"
            style={{ animation: `cc-packet 1.8s linear ${i * 0.6}s infinite` }}
          >
            <span
              className={
                isIn
                  ? "block w-[7px] h-[7px] -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-[1px] bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.8)]"
                  : "block w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand shadow-[0_0_10px_rgba(0,34,255,0.75)]"
              }
            />
          </span>
        ))}
      {active &&
        [0, 1].map((i) => (
          <span
            key={`y${i}`}
            className="cc-packet absolute left-1/2 hidden @max-[880px]:block"
            style={{ animation: `cc-packet-y 1.2s linear ${i * 0.6}s infinite` }}
          >
            <span
              className={`block w-1.5 h-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full ${
                isIn ? "bg-amber-400" : "bg-brand"
              }`}
            />
          </span>
        ))}
    </div>
  );
}

function Hub({ p, done, pct }: { p: number; done: boolean; pct: number }) {
  const R = 58;
  const C = 2 * Math.PI * R;
  return (
    <div className="relative flex flex-col items-center shrink-0">
      <div className="relative w-[144px] h-[144px]">
        <span className="cc-motion absolute inset-3 rounded-full bg-brand/15 animate-[cc-halo_3.2s_ease-in-out_infinite]" />
        <svg viewBox="0 0 144 144" className="cc-motion absolute inset-0 animate-[cc-spin_40s_linear_infinite]" aria-hidden>
          <circle cx="72" cy="72" r="71" fill="none" stroke="#0022ff" strokeOpacity="0.3" strokeDasharray="1.5 5" />
        </svg>
        <div className="cc-motion absolute inset-[5px] animate-[cc-spin_3.2s_linear_infinite]">
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: "conic-gradient(from 0deg, rgba(0,34,255,0) 0deg 230deg, rgba(0,34,255,0.7) 360deg)",
              WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 2.5px), #000 calc(100% - 2px))",
              mask: "radial-gradient(farthest-side, transparent calc(100% - 2.5px), #000 calc(100% - 2px))",
            }}
          />
          <span className="absolute left-1/2 -top-[3px] -translate-x-1/2 w-[7px] h-[7px] rounded-full bg-brand shadow-[0_0_10px_3px_rgba(0,34,255,0.45)]" />
        </div>
        <svg viewBox="0 0 144 144" className="absolute inset-0 -rotate-90" aria-hidden>
          <defs>
            <linearGradient id="cc-ring" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#5b73ff" />
              <stop offset="100%" stopColor={done ? "#10b981" : "#0022ff"} />
            </linearGradient>
          </defs>
          <circle cx="72" cy="72" r={R} fill="none" stroke="#e3e9fb" strokeWidth="4" />
          <circle
            cx="72"
            cy="72"
            r={R}
            fill="none"
            stroke="url(#cc-ring)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={C}
            strokeDashoffset={C * (1 - p / 100)}
            style={{ transition: "stroke-dashoffset 120ms linear" }}
          />
        </svg>
        <div className="absolute inset-[22px] rounded-full bg-white border border-[#dbe3f5] shadow-[0_16px_36px_-12px_rgba(0,34,255,0.5),inset_0_-8px_16px_rgba(0,34,255,0.06)] flex items-center justify-center overflow-hidden">
          <img src="/brand/apple-icon.png" alt="" width="180" height="180" className="w-[80px] h-[80px] rounded-full" />
        </div>
      </div>

      <div className="absolute top-full mt-3 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 @max-[880px]:static @max-[880px]:translate-x-0 @max-[880px]:mt-2">
        <img src="/brand/logo.png" alt="TechGy Link" width="541" height="110" className="w-[118px] h-auto" />
        <span
          key={done ? "done" : "routing"}
          className={`flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-1 font-mono text-[10px] font-medium animate-[cc-fade_.35s_ease-out] ${
            done ? "bg-emerald-50 border-emerald-200 text-emerald-700" : "bg-white border-rule text-black/60"
          }`}
        >
          {done ? (
            <>
              <Check className="h-3 w-3" /> Cutover complete
            </>
          ) : (
            <>
              Routing <span className="text-brand tabular-nums">{pct}%</span> → cloud
            </>
          )}
        </span>
      </div>
    </div>
  );
}

function CloudPanel({
  live,
  liveCount,
  share,
  tick,
  gatewayLive,
  p,
}: {
  live: boolean[];
  liveCount: number;
  share: number;
  tick: number;
  gatewayLive: boolean;
  p: number;
}) {
  const deploys = Math.round(share * 45);
  const pods = liveCount * 3 + (p >= 88 ? 6 : 0);
  const offset = Math.floor(tick / 3);
  const load = 0.12 + 0.88 * share;
  const badge =
    liveCount === modules.length
      ? { text: "Healthy", cls: "border-emerald-200 bg-emerald-50 text-emerald-700", dot: "bg-emerald-500" }
      : liveCount > 0
        ? { text: `${liveCount}/6 live`, cls: "border-blue-200 bg-blue-50 text-brand", dot: "bg-brand" }
        : { text: "Provisioning", cls: "border-amber-200 bg-amber-50 text-amber-700", dot: "bg-amber-500" };

  return (
    <div className="relative min-w-0 h-full rounded-xl border border-[#d6def5] bg-white shadow-[0_22px_44px_-26px_rgba(0,34,255,0.45)] overflow-hidden flex flex-col">
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-blue-50/80 to-transparent pointer-events-none" />

      {/* titlebar */}
      <div className="relative flex items-center justify-between gap-2 px-3.5 py-2.5 border-b border-rule bg-white/70">
        <div className="flex items-center gap-2 min-w-0">
          <span className="flex gap-1 shrink-0">
            <span className="w-2 h-2 rounded-full bg-[#ff5f57]" />
            <span className="w-2 h-2 rounded-full bg-[#febc2e]" />
            <span className="w-2 h-2 rounded-full bg-[#28c840]" />
          </span>
          <Cloud className="h-3.5 w-3.5 shrink-0 text-brand" />
          <span className="font-mono text-[11px] text-black/55 truncate">k8s-prod · multi-region</span>
        </div>
        <span
          className={`shrink-0 flex items-center gap-1.5 rounded border px-1.5 py-0.5 font-mono text-[9.5px] font-bold uppercase tracking-wider transition-colors ${badge.cls}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
          {badge.text}
        </span>
      </div>

      <div className="relative flex-1 flex flex-col gap-3 p-3.5">
        {/* service mesh */}
        <div className="relative h-[166px]">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
            {MESH_X.map((x, i) => {
              const lit = gatewayLive && live[i];
              return (
                <path
                  key={`g${i}`}
                  d={`M50 19.3 C 50 26, ${x} 23, ${x} ${MESH_ROW1_TOP}`}
                  fill="none"
                  stroke={lit ? "#0022ff" : "#cbd5e1"}
                  strokeOpacity={lit ? 0.7 : 1}
                  strokeWidth="1.5"
                  strokeDasharray={lit ? "4 4" : "2 4"}
                  vectorEffect="non-scaling-stroke"
                  className={lit ? "cc-motion animate-[cc-dash_.9s_linear_infinite]" : ""}
                />
              );
            })}
            {meshEdges.map(([a, b]) => {
              const lit = live[a] && live[b];
              const ax = MESH_X[a % 3];
              const bx = MESH_X[b % 3];
              const ay = MESH_Y[Math.floor(a / 3)];
              const by = MESH_Y[Math.floor(b / 3)];
              return (
                <line
                  key={`${a}-${b}`}
                  x1={ax}
                  y1={ay}
                  x2={bx}
                  y2={by}
                  stroke={lit ? "#0022ff" : "#cbd5e1"}
                  strokeOpacity={lit ? 0.7 : 1}
                  strokeWidth="1.5"
                  strokeDasharray={lit ? "4 4" : "2 4"}
                  vectorEffect="non-scaling-stroke"
                  className={lit ? "cc-motion animate-[cc-dash_.9s_linear_infinite]" : ""}
                />
              );
            })}
          </svg>

          <div
            className={`absolute top-0 left-1/2 -translate-x-1/2 h-8 px-3 rounded-full flex items-center gap-1.5 whitespace-nowrap text-[11px] font-medium transition-all duration-500 ${
              gatewayLive
                ? "bg-brand text-white shadow-[0_8px_20px_-8px_rgba(0,34,255,0.8)]"
                : "bg-white border border-dashed border-slate-300 text-black/40"
            }`}
          >
            <Network className="h-3.5 w-3.5" />
            API Gateway
            <span className={`font-mono text-[9.5px] ${gatewayLive ? "text-white/70" : "text-black/30"}`}>
              {gatewayLive ? "· strangler" : "· pending"}
            </span>
          </div>

          <div className="absolute inset-x-0 top-[50px] grid grid-cols-3 gap-x-[14px] gap-y-4">
            {modules.map(({ name, Icon }, i) => (
              <div
                key={name}
                className={`h-[50px] rounded-lg border px-2 flex flex-col justify-center gap-1 min-w-0 transition-colors duration-300 ${
                  live[i]
                    ? "bg-white border-brand/25 shadow-[0_8px_18px_-10px_rgba(0,34,255,0.55)] animate-[cc-pop_.5s_ease-out]"
                    : "bg-[#f8fafc] border-dashed border-slate-200"
                }`}
              >
                <div className="flex items-center gap-1.5 min-w-0">
                  <span
                    className={`shrink-0 w-5 h-5 rounded-md flex items-center justify-center @max-[420px]:hidden ${
                      live[i] ? "bg-blue-50 text-brand" : "bg-slate-100 text-slate-300"
                    }`}
                  >
                    <Icon className="h-3 w-3" />
                  </span>
                  <span className={`text-[11.5px] font-medium truncate ${live[i] ? "text-black" : "text-black/35"}`}>
                    {name}
                  </span>
                </div>
                <span className="flex items-center gap-1 font-mono text-[9px] pl-0.5">
                  {live[i] ? (
                    <>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span className="text-emerald-600">12ms · ×3</span>
                    </>
                  ) : (
                    <span className="text-black/30">queued</span>
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* stats */}
        <div className="grid grid-cols-3 gap-1.5">
          <div className="rounded-md border border-rule bg-[#f8fafc] px-2 py-1.5 min-w-0">
            <div className="font-mono text-[9px] uppercase tracking-wider text-black/40">Uptime</div>
            <div className="font-mono text-[13px] text-emerald-600 tabular-nums">99.99%</div>
            <div className="font-mono text-[9px] text-black/35 truncate">self-healing</div>
          </div>
          <div className="rounded-md border border-rule bg-[#f8fafc] px-2 py-1.5 min-w-0">
            <div className="font-mono text-[9px] uppercase tracking-wider text-black/40">Deploys/day</div>
            <div className="font-mono text-[13px] text-brand tabular-nums">{deploys}</div>
            <div className="font-mono text-[9px] text-black/35 truncate">automated CD</div>
          </div>
          <div className="rounded-md border border-rule bg-[#f8fafc] px-2 py-1.5 min-w-0">
            <div className="font-mono text-[9px] uppercase tracking-wider text-black/40">Pods</div>
            <div className="font-mono text-[13px] text-black tabular-nums">{pods}</div>
            <div className="font-mono text-[9px] text-black/35 truncate">{p >= 88 ? "autoscaled" : "scaling"}</div>
          </div>
        </div>

        {/* throughput */}
        <div className="h-[58px] rounded-md border border-rule bg-[#f8fafc] px-2.5 py-1.5 flex flex-col gap-1">
          <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-wider text-black/40">
            <span>Throughput</span>
            <span className="text-brand normal-case tabular-nums">{(share * 4.2).toFixed(1)}k req/s</span>
          </div>
          <div className="flex-1 flex items-end gap-[2px]">
            {Array.from({ length: 32 }).map((_, i) => {
              const k = i + offset;
              const h = 0.5 + 0.28 * Math.sin(k * 0.8) + 0.18 * Math.sin(k * 2.1 + 1);
              return (
                <span
                  key={i}
                  className={`flex-1 rounded-[1px] transition-[height] duration-300 ${i === 31 ? "bg-emerald-500" : "bg-brand/70"}`}
                  style={{ height: `${Math.max(6, h * load * 100)}%` }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══ TAB 2 · IMPACT ═════════════════════════════════════════════ */
function useCountUp(target: number, duration = 1400) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (prefersReducedMotion()) {
      setV(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const step = (now: number) => {
      const k = Math.min(1, (now - start) / duration);
      setV(target * easeOut(k));
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return v;
}

function KpiTile({ kpi, index }: { kpi: (typeof kpis)[number]; index: number }) {
  const v = useCountUp(kpi.value, 1300 + index * 150);
  return (
    <div className="relative rounded-xl border border-rule bg-white p-4 shadow-xs overflow-hidden min-w-0">
      <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-blue-100/60 blur-2xl pointer-events-none" />
      <div className="relative font-mono text-[9.5px] uppercase tracking-widest text-black/45">{kpi.label}</div>
      <div className="relative mt-1.5 font-display text-[32px] leading-none font-medium text-brand tabular-nums tracking-[-0.03em]">
        {kpi.prefix}
        {v.toFixed(kpi.decimals)}
        <span className="text-[18px] text-brand/70">{kpi.suffix}</span>
      </div>
      <div className="relative mt-2 text-[11px] text-black/55">{kpi.sub}</div>
      <div className="relative mt-3 h-[3px] rounded-full bg-[#eef1f8] overflow-hidden">
        <div
          className="cc-motion h-full rounded-full bg-gradient-to-r from-brand to-emerald-400 origin-left animate-[cc-fill_1.2s_ease-out_both]"
          style={{ animationDelay: `${index * 0.12}s` }}
        />
      </div>
    </div>
  );
}

function ImpactView() {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div className="flex-1 flex flex-col gap-4 animate-[cc-fade_.4s_ease-out]">
      <div className="flex items-center justify-between gap-3 flex-wrap bg-white p-4 rounded-xl border border-rule shadow-xs">
        <div>
          <span className="text-[10px] uppercase font-mono tracking-widest text-brand block mb-0.5">Quantified outcomes</span>
          <h4 className="text-[18px] font-display font-medium text-black">Before &amp; after modernisation</h4>
        </div>
        <span className="text-[11px] font-mono text-emerald-700 font-medium bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
          Typical engagement · 6–12 weeks
        </span>
      </div>

      <div className="grid grid-cols-4 gap-3 @max-[880px]:grid-cols-2 @max-[420px]:grid-cols-1">
        {kpis.map((k, i) => (
          <KpiTile key={k.label} kpi={k} index={i} />
        ))}
      </div>

      <div className="flex-1 rounded-xl border border-rule bg-white shadow-xs px-4 py-3 flex flex-col">
        <div className="flex items-center justify-between gap-3 pb-2.5 border-b border-rule font-mono text-[10px] uppercase tracking-wider">
          <span className="text-black/45">Lower is better</span>
          <span className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-amber-700">
              <span className="w-2.5 h-2.5 rounded-sm bg-amber-300" /> Before
            </span>
            <span className="flex items-center gap-1.5 text-brand">
              <span className="w-2.5 h-2.5 rounded-sm bg-brand" /> After
            </span>
          </span>
        </div>
        <div className="flex-1 flex flex-col justify-around">
          {comparisons.map((c, i) => (
            <div
              key={c.metric}
              className="grid grid-cols-[minmax(150px,200px)_minmax(0,1fr)_auto] items-center gap-4 py-2.5 border-b border-rule/70 last:border-0 @max-[620px]:grid-cols-1 @max-[620px]:gap-2"
            >
              <span className="text-[12.5px] font-medium text-black">{c.metric}</span>
              <div className="flex flex-col gap-1.5 min-w-0">
                {([
                  ["before", c.b, c.before, "bg-gradient-to-r from-amber-200 to-amber-300", "text-amber-700"],
                  ["after", c.a, c.after, "bg-gradient-to-r from-[#4d66ff] to-brand", "text-brand font-semibold"],
                ] as const).map(([k, w, label, bar, text], j) => (
                  <div key={k} className="flex items-center gap-2 min-w-0">
                    <div className="flex-1 h-2 rounded-full bg-[#f1f4f9] overflow-hidden">
                      <div
                        className={`h-full rounded-full ${bar} transition-[width] duration-[1100ms] ease-out`}
                        style={{ width: shown ? `${Math.max(1.5, w)}%` : "0%", transitionDelay: `${i * 110 + j * 180}ms` }}
                      />
                    </div>
                    <span className={`w-[64px] shrink-0 font-mono text-[11px] tabular-nums ${text}`}>{label}</span>
                  </div>
                ))}
              </div>
              <span className="justify-self-start text-[10px] font-mono font-bold text-brand bg-blue-50 border border-blue-200 px-2 py-0.5 rounded whitespace-nowrap">
                {c.gain}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ══ TAB 3 · ROADMAP ════════════════════════════════════════════ */
function RoadmapView({
  stepIdx,
  onSelect,
  timerKey,
}: {
  stepIdx: number;
  onSelect: (i: number) => void;
  timerKey: string;
}) {
  const last = roadmapSteps.length - 1;
  return (
    <div className="flex-1 flex flex-col gap-4 animate-[cc-fade_.4s_ease-out]">
      <div className="flex items-center justify-between gap-3 flex-wrap bg-white p-4 rounded-xl border border-rule shadow-xs">
        <div>
          <span className="text-[10px] uppercase font-mono tracking-widest text-brand block mb-0.5">Execution methodology</span>
          <h4 className="text-[18px] font-display font-medium text-black">How we modernise without downtime</h4>
        </div>
        <span className="flex items-center gap-2 text-[11px] font-mono text-black/50">
          <span className="cc-motion w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
          Auto-playing · click a phase
        </span>
      </div>

      {/* timeline */}
      <div className="relative bg-white rounded-xl border border-rule shadow-xs px-4 py-4">
        <div className="relative grid grid-cols-3">
          <div className="absolute left-[16.66%] right-[16.66%] top-[15px] h-[2px] bg-rule rounded-full">
            <div
              className="h-full rounded-full bg-gradient-to-r from-brand to-[#4d66ff] transition-[width] duration-700 ease-out"
              style={{ width: `${(stepIdx / last) * 100}%` }}
            />
          </div>
          {roadmapSteps.map((s, i) => {
            const complete = i < stepIdx;
            const active = i === stepIdx;
            return (
              <button
                key={s.n}
                type="button"
                onClick={() => onSelect(i)}
                className="relative flex flex-col items-center gap-1.5 cursor-pointer group"
              >
                <span className="relative flex items-center justify-center">
                  {active && (
                    <span className="cc-motion absolute w-8 h-8 rounded-full bg-brand/25 animate-ping" />
                  )}
                  <span
                    className={`relative w-8 h-8 rounded-full flex items-center justify-center font-mono text-[11px] font-bold transition-all duration-300 ${
                      complete
                        ? "bg-brand text-white"
                        : active
                          ? "bg-white border-2 border-brand text-brand shadow-[0_0_0_4px_rgba(0,34,255,0.1)]"
                          : "bg-white border border-rule text-black/40 group-hover:border-brand/40"
                    }`}
                  >
                    {complete ? <Check className="h-3.5 w-3.5" /> : s.n}
                  </span>
                </span>
                <span className={`font-mono text-[10px] ${active ? "text-brand font-semibold" : "text-black/45"}`}>
                  {s.weeks}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* phase cards */}
      <div className="flex-1 grid grid-cols-3 gap-3.5 @max-[880px]:grid-cols-1">
        {roadmapSteps.map((step, idx) => {
          const active = idx === stepIdx;
          const complete = idx < stepIdx;
          return (
            <div
              key={step.n}
              onClick={() => onSelect(idx)}
              className={`relative cursor-pointer p-5 rounded-xl border bg-white overflow-hidden flex flex-col transition-all duration-300 ${
                active
                  ? "border-brand shadow-[0_14px_30px_-12px_rgba(0,34,255,0.35)] ring-1 ring-brand/25 -translate-y-0.5"
                  : "border-rule shadow-xs hover:border-brand/40"
              }`}
            >
              {active && <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-blue-100/70 blur-2xl pointer-events-none" />}
              <div className="relative flex items-center justify-between gap-2 mb-3">
                <span className="text-[11px] font-bold text-brand bg-blue-50 px-2 py-0.5 rounded border border-blue-200 font-mono">
                  {step.n}
                </span>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded border transition-colors ${
                    active ? "bg-brand text-white border-brand font-semibold" : "bg-[#f1f5f9] border-rule text-black/50"
                  }`}
                >
                  {step.metric}
                </span>
              </div>
              <h5 className="relative text-[15.5px] font-display font-medium text-black mb-1.5">{step.title}</h5>
              <p className="relative text-[11.5px] text-black/60 leading-relaxed mb-4">{step.desc}</p>
              <div className="relative grid grid-cols-2 gap-2 mb-4">
                {([
                  ["Owner", step.owner],
                  ["Checkpoint", step.checkpoint],
                ] as const).map(([k, v]) => (
                  <div key={k} className="rounded-md border border-rule bg-[#f8fafc] px-2.5 py-2 min-w-0">
                    <div className="font-mono text-[9px] uppercase tracking-wider text-black/40">{k}</div>
                    <div className={`text-[11.5px] font-medium truncate ${active ? "text-brand" : "text-black/75"}`}>{v}</div>
                  </div>
                ))}
              </div>
              <div className="relative mt-auto pt-3 border-t border-rule font-mono text-[9px] uppercase tracking-wider text-black/40 mb-2">
                Deliverables
              </div>
              <ul className="relative flex flex-col gap-2">
                {step.items.map((item, j) => {
                  const ticked = complete || active;
                  return (
                    <li key={item} className="flex items-center gap-2 text-[11.5px]">
                      <span className="relative w-4 h-4 shrink-0 rounded-full border border-rule bg-white flex items-center justify-center">
                        {ticked && (
                          <span
                            key={active ? timerKey : "static"}
                            className="absolute inset-[-1px] rounded-full bg-emerald-500 text-white flex items-center justify-center animate-[cc-pop_.35s_ease-out_both]"
                            style={{ animationDelay: active ? `${0.35 + j * 0.55}s` : "0s" }}
                          >
                            <Check className="h-2.5 w-2.5" strokeWidth={3} />
                          </span>
                        )}
                      </span>
                      <span className={ticked ? "text-black/80" : "text-black/40"}>{item}</span>
                    </li>
                  );
                })}
              </ul>
              {active && (
                <div className="absolute inset-x-0 bottom-0 h-[3px] bg-blue-50">
                  <div
                    key={timerKey}
                    className="cc-motion h-full bg-brand origin-left"
                    style={{ animation: `cc-fill ${ROADMAP_MS}ms linear both` }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
