"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  BatteryFull,
  CalendarDays,
  Camera,
  Check,
  ChevronLeft,
  CircleCheck,
  ClipboardList,
  Clock,
  CloudOff,
  FileText,
  House,
  Map as MapIcon,
  MapPin,
  Navigation,
  RefreshCw,
  Signal,
  User,
  Wifi,
} from "lucide-react";

const phases = [
  { label: "Pick the job", ticks: 32 },
  { label: "Check in", ticks: 32 },
  { label: "Capture offline", ticks: 42 },
  { label: "Sign off", ticks: 36 },
];
const HOLD = 22;
const starts = phases.map((_, i) => phases.slice(0, i).reduce((s, p) => s + p.ticks, 0));
const JOURNEY = phases.reduce((s, p) => s + p.ticks, 0);
const CYCLE = JOURNEY + HOLD;

const css = `
@keyframes md-pop { 0% { transform: scale(.88); opacity: 0 } 60% { transform: scale(1.04); opacity: 1 } 100% { transform: scale(1); opacity: 1 } }
@keyframes md-rise { from { opacity: 0; transform: translateY(8px) } to { opacity: 1; transform: none } }
@keyframes md-screen { from { opacity: 0; transform: translateX(16px) } to { opacity: 1; transform: none } }
@keyframes md-tap { 0% { transform: translate(-50%, -50%) scale(.4); opacity: .55 } 100% { transform: translate(-50%, -50%) scale(1.8); opacity: 0 } }
@keyframes md-flash { 0% { opacity: .85 } 100% { opacity: 0 } }
@keyframes md-packet { 0% { left: 0%; opacity: 0 } 15% { opacity: 1 } 85% { opacity: 1 } 100% { left: 100%; opacity: 0 } }
@keyframes md-packet-y { 0% { top: 0%; opacity: 0 } 15% { opacity: 1 } 85% { opacity: 1 } 100% { top: 100%; opacity: 0 } }
@media (prefers-reduced-motion: reduce) {
  .md-motion, .md-motion * { animation: none !important; transition: none !important; }
  .md-packet { display: none !important; }
}
`;

export function MobileDevCanvas() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [total, setTotal] = useState(0);
  const tick = total % CYCLE;
  const loop = Math.floor(total / CYCLE);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const id = setInterval(() => setTotal((n) => n + 1), 100);
    return () => clearInterval(id);
  }, [visible]);

  const done = tick >= JOURNEY;
  let phase = 0;
  starts.forEach((s, i) => {
    if (tick >= s) phase = i;
  });
  const t = done ? 1 : (tick - starts[phase]) / phases[phase].ticks;
  const at = (p: number, local: number) => phase > p || (phase === p && t >= local);

  const android = loop % 2 === 1;
  const offline = phase === 2 && t < 0.78;
  const queued = phase === 2 ? [0.3, 0.46, 0.62].filter((x) => t >= x).length : 0;

  const events = [
    { show: at(0, 0.78), time: "10:18", text: "Job opened on mobile" },
    { show: at(1, 0.62), time: "10:32", text: "Checked in · GPS verified" },
    { show: at(2, 0.8), time: "10:41", text: "3 photos synced from site" },
    { show: at(3, 0.7), time: "10:47", text: "Signed off by M. Rao" },
    { show: at(3, 0.84), time: "10:47", text: "Invoice INV-2291 drafted" },
  ];
  const status = at(3, 0.7)
    ? { text: "Completed", cls: "border-emerald-200 bg-emerald-50 text-emerald-700" }
    : at(1, 0.62)
      ? { text: "On site", cls: "border-blue-200 bg-blue-50 text-brand" }
      : at(0, 0.78)
        ? { text: "En route", cls: "border-amber-200 bg-amber-50 text-amber-700" }
        : { text: "Scheduled", cls: "border-rule bg-[#f1f4f9] text-black/55" };

  return (
    <div
      ref={rootRef}
      className="service-demo md-motion relative w-full overflow-hidden rounded-md border border-rule bg-[#f8f9fa] text-black select-none"
    >
      <style>{css}</style>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#0000000d_1px,transparent_1px)] bg-[size:20px_20px]" />
      <div className="pointer-events-none absolute -top-24 -right-20 h-[420px] w-[420px] rounded-full bg-blue-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-24 h-[380px] w-[380px] rounded-full bg-blue-100/60 blur-3xl" />

      <div className="sv-body relative z-10 flex flex-col gap-5 p-6 @max-[520px]:p-3">
        {/* task progress */}
        <div className="grid grid-cols-4 gap-3 @max-[520px]:gap-1.5">
          {phases.map((p, i) => {
            const fill = done || i < phase ? 1 : i === phase ? t : 0;
            const on = !done && i === phase;
            return (
              <button key={p.label} type="button" onClick={() => setTotal(loop * CYCLE + starts[i])} className="group flex min-w-0 flex-col gap-2 text-left">
                <span className="h-[3px] w-full overflow-hidden rounded-full bg-rule">
                  <span className="block h-full rounded-full bg-brand transition-[width] duration-100 ease-linear" style={{ width: `${fill * 100}%` }} />
                </span>
                <span className="flex items-baseline gap-1.5">
                  <span className={`font-mono text-[11px] ${on ? "text-brand" : "text-black/35"}`}>0{i + 1}</span>
                  <span
                    className={`truncate text-[13px] font-medium transition-colors @max-[520px]:hidden ${
                      on ? "text-black" : "text-black/40 group-hover:text-black/70"
                    }`}
                  >
                    {p.label}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* scene */}
        <div className="grid grid-cols-[auto_minmax(56px,120px)_minmax(0,1fr)] items-center @max-[640px]:grid-cols-1 @max-[640px]:justify-items-center">
          {/* phone */}
          <div className="flex flex-col items-center gap-3">
            <Phone android={android}>
              {phase === 0 && !done && <TodayScreen t={t} />}
              {phase === 1 && !done && <JobScreen t={t} />}
              {phase === 2 && !done && <CaptureScreen t={t} offline={offline} />}
              {(phase === 3 || done) && <SignScreen t={t} />}
            </Phone>
            <span key={android ? "a" : "i"} className="flex items-center gap-2 text-[11px] text-black/55 animate-[md-rise_.4s_ease-out]">
              <span className="rounded-full border border-rule bg-white px-2 py-0.5 font-mono text-[10px] font-semibold text-black/75">
                {android ? "Android" : "iOS"}
              </span>
              One cross-platform codebase
            </span>
          </div>

          {/* sync link */}
          <div className="relative flex h-full w-full items-center @max-[640px]:h-12 @max-[640px]:w-auto @max-[640px]:flex-col">
            <div className="relative h-[2px] w-full @max-[640px]:h-full @max-[640px]:w-[2px]">
              <div
                className={`absolute inset-0 rounded-full transition-colors duration-500 ${
                  offline
                    ? "bg-[repeating-linear-gradient(90deg,#cbd5e1_0_5px,transparent_5px_10px)] @max-[640px]:bg-[repeating-linear-gradient(180deg,#cbd5e1_0_5px,transparent_5px_10px)]"
                    : "bg-gradient-to-r from-brand/30 to-brand/70 @max-[640px]:bg-gradient-to-b"
                }`}
              />
              {!offline &&
                [0, 1, 2].map((i) => (
                  <span key={i} className="md-packet absolute top-1/2 @max-[640px]:hidden" style={{ animation: `md-packet 1.8s linear ${i * 0.6}s infinite` }}>
                    <span className="block h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand shadow-[0_0_10px_rgba(0,34,255,0.7)]" />
                  </span>
                ))}
              {!offline &&
                [0, 1].map((i) => (
                  <span key={`y${i}`} className="md-packet absolute left-1/2 hidden @max-[640px]:block" style={{ animation: `md-packet-y 1.2s linear ${i * 0.6}s infinite` }}>
                    <span className="block h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand" />
                  </span>
                ))}
            </div>
            <span
              key={offline ? "off" : "on"}
              className={`absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-1 whitespace-nowrap rounded-full border bg-white px-2 py-1 text-[9.5px] font-semibold shadow-xs animate-[md-pop_.3s_ease-out] ${
                offline ? "border-amber-200 text-amber-700" : "border-blue-200 text-brand"
              }`}
            >
              {offline ? <CloudOff className="h-3 w-3" /> : <RefreshCw className="h-3 w-3" />}
              {offline ? "Offline" : "Live sync"}
            </span>
          </div>

          {/* office */}
          <OfficePanel status={status} events={events} offline={offline} queued={queued} photos={at(2, 0.8)} signed={at(3, 0.7)} />
        </div>
      </div>
    </div>
  );
}

/* ── device ───────────────────────────────────────────────────── */
function Phone({ android, children }: { android: boolean; children: ReactNode }) {
  return (
    <div
      className={`relative h-[580px] w-[284px] border-[7px] border-navy bg-navy shadow-[0_30px_60px_-24px_rgba(15,26,52,0.6)] transition-[border-radius] duration-500 @max-[520px]:h-[540px] @max-[520px]:w-[266px] ${
        android ? "rounded-[34px]" : "rounded-[46px]"
      }`}
    >
      <div className={`relative h-full w-full overflow-hidden bg-white ${android ? "rounded-[27px]" : "rounded-[39px]"}`}>
        <div className="relative z-20 flex h-9 items-center justify-between px-6 pt-1 text-[11px] font-semibold">
          <span>10:32</span>
          <span className="flex items-center gap-1">
            <Signal className="h-3 w-3" />
            <Wifi className="h-3 w-3" />
            <BatteryFull className="h-3.5 w-3.5" />
          </span>
        </div>
        {android ? (
          <span className="absolute left-1/2 top-2.5 z-30 h-3 w-3 -translate-x-1/2 rounded-full bg-navy" />
        ) : (
          <span className="absolute left-1/2 top-2 z-30 h-[22px] w-[84px] -translate-x-1/2 rounded-full bg-navy" />
        )}
        <div className="absolute inset-x-0 bottom-0 top-9">{children}</div>
        <span className={`absolute bottom-1.5 left-1/2 z-30 h-1 -translate-x-1/2 rounded-full bg-navy/80 ${android ? "w-16" : "w-24"}`} />
      </div>
    </div>
  );
}

function Tap({ x, y, show }: { x: number | string; y: number | string; show: boolean }) {
  if (!show) return null;
  return (
    <span className="pointer-events-none absolute z-40" style={{ left: x, top: y }}>
      <span className="absolute left-0 top-0 h-10 w-10 rounded-full bg-brand/40 animate-[md-tap_.6s_ease-out_forwards]" />
      <span className="absolute left-0 top-0 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-black/20" />
    </span>
  );
}

function TabBar({ active }: { active: number }) {
  return (
    <div className="absolute inset-x-0 bottom-0 flex h-14 items-start justify-around border-t border-rule bg-white/95 pt-2">
      {([
        ["Today", House],
        ["Map", MapIcon],
        ["Jobs", ClipboardList],
        ["Me", User],
      ] as const).map(([l, Icon], i) => (
        <span key={l} className={`flex flex-col items-center gap-0.5 text-[9px] font-medium ${i === active ? "text-brand" : "text-black/35"}`}>
          <Icon className="h-4 w-4" />
          {l}
        </span>
      ))}
    </div>
  );
}

function ScreenHeader({ back, title, sub }: { back?: boolean; title: string; sub?: string }) {
  return (
    <div className="flex items-center gap-2 px-4 pb-2 pt-1">
      {back && <ChevronLeft className="h-4 w-4 shrink-0 text-brand" />}
      <div className="min-w-0">
        <div className="truncate text-[15px] font-semibold tracking-[-0.01em]">{title}</div>
        {sub && <div className="truncate text-[10.5px] text-black/45">{sub}</div>}
      </div>
    </div>
  );
}

/* ── screens ──────────────────────────────────────────────────── */
const jobs = [
  { time: "10:30", name: "Kestrel Foods", task: "Warehouse inspection", dist: "2.4 km", urgent: true },
  { time: "13:00", name: "Orbit Labs", task: "Service check", dist: "6.1 km", urgent: false },
  { time: "15:30", name: "Harbor & Co", task: "Equipment install", dist: "9.8 km", urgent: false },
];

function TodayScreen({ t }: { t: number }) {
  const tapped = t >= 0.7;
  return (
    <div className="relative h-full animate-[md-screen_.35s_ease-out] bg-[#f6f7fb]">
      <div className="px-4 pt-2">
        <div className="text-[11px] text-black/45">Tue, 14 Oct</div>
        <div className="text-[19px] font-semibold tracking-[-0.02em]">Good morning, Ravi</div>
        <div className="mt-2.5 flex gap-1.5">
          <span className="flex items-center gap-1 rounded-full bg-white px-2 py-1 text-[10px] font-medium shadow-xs">
            <CalendarDays className="h-3 w-3 text-brand" /> 3 visits
          </span>
          <span className="rounded-full bg-rose-50 px-2 py-1 text-[10px] font-medium text-rose-600">1 urgent</span>
        </div>
      </div>
      <div className="mt-3 flex flex-col gap-2 px-3">
        {jobs.map((j, i) => (
          <div
            key={j.name}
            className={`rounded-2xl border bg-white p-3 shadow-xs transition-all duration-200 ${
              i === 0 && tapped ? "scale-[0.98] border-brand/40 ring-2 ring-brand/15" : "border-transparent"
            }`}
            style={{ animation: `md-rise .4s ease-out ${i * 0.08}s both` }}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] font-semibold text-brand">{j.time}</span>
              {j.urgent && <span className="rounded-full bg-rose-50 px-1.5 text-[8.5px] font-semibold text-rose-600">Urgent</span>}
            </div>
            <div className="mt-1 text-[13px] font-semibold">{j.name}</div>
            <div className="flex items-center justify-between text-[10.5px] text-black/50">
              <span>{j.task}</span>
              <span className="flex items-center gap-0.5">
                <MapPin className="h-3 w-3" />
                {j.dist}
              </span>
            </div>
          </div>
        ))}
      </div>
      <Tap x="55%" y={134} show={tapped} />
      <TabBar active={0} />
    </div>
  );
}

function JobScreen({ t }: { t: number }) {
  const tapped = t >= 0.56;
  const checked = t >= 0.62;
  return (
    <div className="relative h-full animate-[md-screen_.35s_ease-out] bg-white">
      <ScreenHeader back title="Kestrel Foods" sub="Warehouse inspection · 10:30" />
      <div className="relative mx-3 h-[190px] overflow-hidden rounded-2xl bg-[#eaf0f7]">
        <div className="absolute inset-0 bg-[linear-gradient(#dde5ef_2px,transparent_2px),linear-gradient(90deg,#dde5ef_2px,transparent_2px)] bg-[size:34px_34px]" />
        <div className="absolute left-[18%] top-0 h-full w-4 rotate-[14deg] bg-white/80" />
        <div className="absolute left-0 top-[58%] h-4 w-full -rotate-[6deg] bg-white/80" />
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 250 190" preserveAspectRatio="none" aria-hidden="true">
          <path
            d="M40 160 C 70 150, 80 110, 110 104 S 170 80, 196 44"
            fill="none"
            stroke="#0022ff"
            strokeWidth="4"
            strokeLinecap="round"
            pathLength={1}
            strokeDasharray="1"
            strokeDashoffset={1 - Math.min(1, t / 0.4)}
          />
        </svg>
        <span className="absolute left-[14%] top-[81%] h-3.5 w-3.5 rounded-full border-[3px] border-white bg-brand shadow" />
        <MapPin className="absolute left-[74%] top-[12%] h-7 w-7 fill-rose-500 text-white drop-shadow" />
        <span className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-white px-2 py-1 text-[10px] font-semibold shadow">
          <Navigation className="h-3 w-3 text-brand" /> 6 min
        </span>
      </div>
      <div className="mt-3 flex flex-col gap-2 px-4 text-[11px]">
        {[
          ["Address", "Plot 14, Industrial Area"],
          ["Contact", "M. Rao · Site manager"],
          ["Task", "Quarterly inspection"],
        ].map(([k, v]) => (
          <div key={k} className="flex justify-between gap-2 border-b border-rule pb-1.5">
            <span className="text-black/45">{k}</span>
            <span className="text-right font-medium">{v}</span>
          </div>
        ))}
      </div>
      <div className="absolute inset-x-4 bottom-6">
        <span
          className={`flex h-11 items-center justify-center gap-1.5 rounded-2xl text-[12.5px] font-semibold text-white transition-colors duration-300 ${
            checked ? "bg-emerald-500" : "bg-brand"
          }`}
        >
          {checked ? (
            <>
              <MapPin className="h-4 w-4" /> Checked in · 10:32
            </>
          ) : (
            "Check in"
          )}
        </span>
      </div>
      <Tap x="50%" y="calc(100% - 46px)" show={tapped && t < 0.8} />
    </div>
  );
}

function CaptureScreen({ t, offline }: { t: number; offline: boolean }) {
  const shots = [0.3, 0.46, 0.62];
  const taken = shots.filter((s) => t >= s).length;
  const flash = shots.some((s) => t >= s && t < s + 0.05);
  const checks = ["Fire exits clear", "Cold room at −18°C", "Racking secured"];
  return (
    <div className="relative h-full animate-[md-screen_.35s_ease-out] bg-white">
      <ScreenHeader back title="Inspection" sub="Kestrel Foods · on site" />
      <div
        key={offline ? "off" : "on"}
        className={`mx-3 flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-[10.5px] font-medium animate-[md-pop_.3s_ease-out] ${
          offline ? "bg-amber-50 text-amber-700" : "bg-emerald-50 text-emerald-700"
        }`}
      >
        {offline ? <CloudOff className="h-3.5 w-3.5 shrink-0" /> : <Check className="h-3.5 w-3.5 shrink-0" strokeWidth={3} />}
        {offline ? `No signal · ${taken ? `${taken} saved on device` : "working offline"}` : "Back online · 3 items synced"}
      </div>
      <div className="mt-2.5 flex flex-col gap-1.5 px-4">
        {checks.map((c, i) => {
          const on = t >= 0.06 + i * 0.07;
          return (
            <div key={c} className="flex items-center gap-2 text-[11px]">
              <span className={`flex h-4 w-4 items-center justify-center rounded-md ${on ? "bg-emerald-500 text-white" : "border border-rule"}`}>
                {on && <Check className="h-2.5 w-2.5" strokeWidth={3.5} />}
              </span>
              <span className={on ? "text-black/80" : "text-black/40"}>{c}</span>
            </div>
          );
        })}
      </div>
      <div className="relative mx-3 mt-3 h-[172px] overflow-hidden rounded-2xl bg-[linear-gradient(160deg,#334155,#0f172a)]">
        <div className="absolute inset-x-6 bottom-6 top-10 rounded-md bg-[repeating-linear-gradient(90deg,#475569_0_14px,#3b4a5e_14px_28px)] opacity-80" />
        <div className="absolute inset-x-6 top-10 h-2 bg-[#64748b]" />
        {["left-3 top-3 border-l-2 border-t-2", "right-3 top-3 border-r-2 border-t-2", "bottom-3 left-3 border-b-2 border-l-2", "bottom-3 right-3 border-b-2 border-r-2"].map((c) => (
          <span key={c} className={`absolute h-5 w-5 rounded-[3px] border-white/80 ${c}`} />
        ))}
        <span className="absolute left-3 top-3 ml-7 flex items-center gap-1 text-[9.5px] font-medium text-white/85">
          <Camera className="h-3 w-3" /> Rack B · aisle 4
        </span>
        {flash && <span className="absolute inset-0 bg-white animate-[md-flash_.35s_ease-out_forwards]" />}
      </div>
      <div className="mt-2.5 flex items-center gap-2 px-3">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={`h-12 flex-1 rounded-lg ${i < taken ? "bg-[linear-gradient(160deg,#475569,#1e293b)] animate-[md-pop_.3s_ease-out]" : "border border-dashed border-rule"}`}
          />
        ))}
        <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-4 border-rule ${taken < 3 ? "bg-brand" : "bg-black/15"}`}>
          <span className="h-5 w-5 rounded-full bg-white" />
        </span>
      </div>
      {taken < 3 && <Tap x="calc(100% - 36px)" y="calc(100% - 38px)" show={shots.some((s) => t >= s && t < s + 0.08)} />}
    </div>
  );
}

function SignScreen({ t }: { t: number }) {
  const draw = Math.min(1, Math.max(0, (t - 0.08) / 0.4));
  const tapped = t >= 0.62;
  const success = t >= 0.7;
  return (
    <div className="relative h-full animate-[md-screen_.35s_ease-out] bg-white">
      <ScreenHeader back title="Customer sign-off" sub="Kestrel Foods · Warehouse inspection" />
      <div className="mx-3 flex gap-2 text-[10.5px]">
        <span className="flex flex-1 items-center gap-1.5 rounded-xl bg-emerald-50 px-2.5 py-2 font-medium text-emerald-700">
          <Check className="h-3.5 w-3.5" strokeWidth={3} /> 3 checks passed
        </span>
        <span className="flex flex-1 items-center gap-1.5 rounded-xl bg-[#f1f4f9] px-2.5 py-2 font-medium text-black/65">
          <Camera className="h-3.5 w-3.5" /> 3 photos
        </span>
      </div>
      <div className="relative mx-3 mt-3 h-[190px] rounded-2xl border border-dashed border-black/20 bg-[#fafbfc]">
        <span className="absolute left-3 top-2 text-[9.5px] text-black/35">Sign here</span>
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 250 190" aria-hidden="true">
          <path
            d="M34 122 C 46 92, 58 84, 62 104 S 70 140, 84 112 S 104 70, 112 98 S 124 132, 140 104 C 150 88, 158 96, 164 110 S 184 118, 214 92"
            fill="none"
            stroke="#0f1a34"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
            strokeDasharray="1"
            strokeDashoffset={1 - draw}
          />
        </svg>
        <span className="absolute inset-x-6 bottom-9 h-px bg-black/15" />
        <span className="absolute bottom-3 left-6 text-[10.5px] font-medium text-black/60">M. Rao · Site manager</span>
      </div>
      <div className="absolute inset-x-4 bottom-6">
        <span className={`flex h-11 items-center justify-center rounded-2xl text-[12.5px] font-semibold text-white ${tapped ? "bg-[#001bd1]" : "bg-brand"}`}>
          Complete visit
        </span>
      </div>
      <Tap x="50%" y="calc(100% - 46px)" show={tapped && !success} />
      {success && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-white/95 text-center animate-[md-rise_.35s_ease-out]">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 text-white shadow-[0_12px_30px_-8px_rgba(16,185,129,0.7)] animate-[md-pop_.45s_ease-out]">
            <Check className="h-8 w-8" strokeWidth={3} />
          </span>
          <div className="mt-4 text-[17px] font-semibold">Visit complete</div>
          <div className="mt-1 px-8 text-[11px] leading-relaxed text-black/50">Report and photos sent to Kestrel Foods and the office.</div>
        </div>
      )}
    </div>
  );
}

/* ── office ───────────────────────────────────────────────────── */
function OfficePanel({
  status,
  events,
  offline,
  queued,
  photos,
  signed,
}: {
  status: { text: string; cls: string };
  events: { show: boolean; time: string; text: string }[];
  offline: boolean;
  queued: number;
  photos: boolean;
  signed: boolean;
}) {
  return (
    <div className="w-full min-w-0 overflow-hidden rounded-xl border border-rule bg-white shadow-[0_24px_50px_-28px_rgba(15,26,52,0.45)]">
      <div className="flex items-center justify-between gap-2 border-b border-rule bg-[#f8fafc] px-4 py-2.5">
        <span className="flex items-center gap-2 text-[12.5px] font-semibold">
          <span className="h-3.5 w-3.5 rounded-[4px] bg-brand" />
          Operations · Today
        </span>
        <span className="flex items-center gap-1.5 font-mono text-[10px] text-black/50">
          <span className={`h-1.5 w-1.5 rounded-full ${offline ? "bg-amber-500" : "bg-emerald-500 animate-pulse"}`} />
          {offline ? "Waiting for device" : "Live"}
        </span>
      </div>

      <div className="grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] @max-[1040px]:grid-cols-1">
        {/* jobs */}
        <div className="border-r border-rule p-3 @max-[1040px]:border-b @max-[1040px]:border-r-0">
          <div className="mb-2 px-1 font-mono text-[9.5px] font-semibold uppercase tracking-[0.14em] text-black/40">Field visits</div>
          <div className="flex flex-col gap-1.5">
            {jobs.map((j, i) => (
              <div
                key={j.name}
                className={`flex items-center justify-between gap-2 rounded-lg px-2.5 py-2 ${i === 0 ? "border border-brand/25 bg-blue-50/60" : "border border-transparent"}`}
              >
                <div className="min-w-0">
                  <div className="truncate text-[12px] font-medium">{j.name}</div>
                  <div className="truncate text-[10px] text-black/45">
                    {j.time} · {j.task}
                  </div>
                </div>
                <span
                  key={i === 0 ? status.text : "s"}
                  className={`shrink-0 rounded-full border px-2 py-0.5 text-[9.5px] font-semibold ${
                    i === 0 ? `${status.cls} animate-[md-pop_.3s_ease-out]` : "border-rule bg-[#f1f4f9] text-black/55"
                  }`}
                >
                  {i === 0 ? status.text : "Scheduled"}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-center gap-2 rounded-lg bg-[#f8fafc] px-2.5 py-2 text-[11px]">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-500 text-[9px] font-bold text-white">RK</span>
            <div className="min-w-0">
              <div className="truncate font-medium">Ravi K.</div>
              <div className="truncate text-[10px] text-black/45">Field engineer · Northwind Field app</div>
            </div>
          </div>
        </div>

        {/* activity */}
        <div className="flex min-w-0 flex-col p-3">
          <div className="mb-2 flex items-center justify-between px-1">
            <span className="font-mono text-[9.5px] font-semibold uppercase tracking-[0.14em] text-black/40">Kestrel Foods · activity</span>
            {offline && queued > 0 && (
              <span className="rounded-full bg-amber-50 px-1.5 py-0.5 text-[9px] font-semibold text-amber-700 animate-[md-pop_.3s_ease-out]">
                {queued} queued on device
              </span>
            )}
          </div>
          <div className="flex min-h-[150px] flex-col gap-2 px-1 @max-[1040px]:min-h-[84px]">
            {events.filter((e) => e.show).map((e) => (
              <div key={e.text} className="flex items-start gap-2 text-[11.5px] animate-[md-rise_.35s_ease-out]">
                <span className="mt-[3px] flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
                  <Check className="h-2 w-2" strokeWidth={4} />
                </span>
                <span className="font-mono text-[10px] text-black/40">{e.time}</span>
                <span className="min-w-0 text-black/80">{e.text}</span>
              </div>
            ))}
            {!events[0].show && (
              <div className="flex items-center gap-2 text-[11px] text-black/35">
                <Clock className="h-3.5 w-3.5" /> Visit scheduled for 10:30
              </div>
            )}
          </div>
          <div className="mt-2 grid grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] gap-2 border-t border-rule pt-3">
            <div>
              <div className="mb-1.5 text-[10px] font-medium text-black/45">Site photos</div>
              <div className="flex gap-1.5">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className={`h-11 flex-1 rounded-md ${photos ? "bg-[linear-gradient(160deg,#475569,#1e293b)] animate-[md-pop_.35s_ease-out_both]" : "border border-dashed border-rule"}`}
                    style={photos ? { animationDelay: `${i * 0.08}s` } : undefined}
                  />
                ))}
              </div>
            </div>
            <div>
              <div className="mb-1.5 text-[10px] font-medium text-black/45">Signature</div>
              <div className={`flex h-11 items-center justify-center rounded-md ${signed ? "border border-rule bg-[#fafbfc]" : "border border-dashed border-rule"}`}>
                {signed ? (
                  <svg viewBox="0 0 250 190" className="h-9 w-full animate-[md-rise_.35s_ease-out]" aria-hidden="true">
                    <path
                      d="M34 122 C 46 92, 58 84, 62 104 S 70 140, 84 112 S 104 70, 112 98 S 124 132, 140 104 C 150 88, 158 96, 164 110 S 184 118, 214 92"
                      fill="none"
                      stroke="#0f1a34"
                      strokeWidth="6"
                      strokeLinecap="round"
                    />
                  </svg>
                ) : (
                  <span className="text-[10px] text-black/30">Awaiting</span>
                )}
              </div>
            </div>
          </div>
          <div
            className={`mt-3 flex items-center gap-2 rounded-lg border px-2.5 py-2 text-[11px] transition-all duration-500 ${
              events[4].show ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-dashed border-rule text-black/35"
            }`}
          >
            <FileText className="h-3.5 w-3.5 shrink-0" />
            {events[4].show ? "Invoice INV-2291 ready for review" : "Invoice drafts after sign-off"}
            {events[4].show && <CircleCheck className="ml-auto h-3.5 w-3.5 shrink-0" />}
          </div>
        </div>
      </div>
    </div>
  );
}
