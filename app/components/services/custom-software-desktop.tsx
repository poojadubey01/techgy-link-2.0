"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useRive } from "@rive-app/react-canvas";

const steps = [
  {
    title: "Discover",
    short: "Map the work",
    detail: "Capture roles, handoffs and the business rules behind every decision.",
  },
  {
    title: "Architect",
    short: "Connect the system",
    detail: "Define the application, integrations and shared source of truth.",
  },
  {
    title: "Build",
    short: "Make it work",
    detail: "Turn approved workflows into a tested business application.",
  },
  {
    title: "Release",
    short: "Hand over clearly",
    detail: "Deploy, document and give the team a clear support path.",
  },
] as const;

const centers = [95, 245, 395, 545];

function BuildActivity() {
  const { RiveComponent } = useRive({ src: "/rive/workflow-loader.riv", autoplay: true });
  return <RiveComponent className="h-6 w-6" aria-hidden="true" />;
}

function StageIcon({ index, x }: { index: number; x: number }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 2.4, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (index === 0) return <g transform={`translate(${x - 19} 119)`} {...common}><rect x="1" y="0" width="35" height="39" rx="5" /><path d="M9 11h19M9 19h19M9 27h12" /></g>;
  if (index === 1) return <g transform={`translate(${x - 23} 120)`} {...common}><circle cx="23" cy="18" r="8" /><circle cx="3" cy="3" r="3" /><circle cx="43" cy="3" r="3" /><circle cx="3" cy="35" r="3" /><circle cx="43" cy="35" r="3" /><path d="M6 5l11 8M40 5l-11 8M6 33l11-9M40 33l-11-9" /></g>;
  if (index === 2) return <g transform={`translate(${x - 23} 122)`} {...common}><rect x="0" y="0" width="46" height="34" rx="5" /><path d="M12 12l-6 5 6 5M34 12l6 5-6 5M27 9l-8 17" /></g>;
  return <g transform={`translate(${x - 22} 120)`} {...common}><path d="M9 31H6a6 6 0 0 1-1-12 15 15 0 0 1 28-5 10 10 0 0 1 6 18h-4" /><path d="M22 16v22m-8-8 8 8 8-8" /></g>;
}

export function CustomSoftwareDesktop() {
  const screenRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const reducedMotion = !!useReducedMotion();

  useEffect(() => {
    const timer = window.setInterval(() => setActive((current) => (current + 1) % steps.length), 2700);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (reducedMotion || !screenRef.current) return;
    const context = gsap.context(() => {
      gsap.fromTo("[data-process-enter]", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: "power2.out" });
      gsap.to("[data-process-scan]", { xPercent: 650, duration: 5, repeat: -1, ease: "none" });
    }, screenRef);
    return () => context.revert();
  }, [reducedMotion]);

  return (
    <div className="service-demo relative flex h-full min-h-[380px] items-center justify-center overflow-hidden bg-[#eaf0ff] px-4 py-6 sm:min-h-[650px] sm:px-7 sm:py-9">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,#ffffff_0%,#edf2ff_57%,#dbe5ff_100%)]" />
      <div className="relative z-10 w-full max-w-[710px]">
        <div className="rounded-[17px] border-[8px] border-[#172238] bg-[#172238] shadow-[0_26px_50px_rgba(20,41,91,0.22)] sm:border-[10px]">
          <div ref={screenRef} className="relative aspect-[16/10] overflow-hidden rounded-[8px] bg-white text-[#152139]">
            <div className="absolute inset-x-0 top-0 z-10 flex h-[10%] items-center justify-between border-b border-[#e2e9f6] bg-[#f8faff] px-[3.5%]">
              <img src="/brand/logo.png" alt="TechGy Link" width="541" height="111" className="h-[70%] max-h-7 w-auto max-w-[52%] object-contain" />
              <span className="flex items-center gap-1.5 text-[clamp(7px,0.75vw,10px)] font-medium text-[#52647f]"><span className="size-1.5 rounded-full bg-[#25b88f]" /> PROCESS LIVE</span>
            </div>

            <div className="absolute inset-x-0 top-[10%] bottom-[18%] overflow-hidden">
              <div data-process-scan className="pointer-events-none absolute -left-[24%] top-0 h-full w-[18%] -skew-x-12 bg-gradient-to-r from-transparent via-[#c4d5ff]/20 to-transparent" />
              <svg viewBox="0 0 640 285" preserveAspectRatio="xMidYMid meet" className="h-full w-full" role="img" aria-label="Animated custom software process: discover, architect, build, release">
                <defs>
                  <pattern id="softwareGrid" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M24 0H0V24" fill="none" stroke="#edf2fa" strokeWidth="1" /></pattern>
                  <filter id="packetGlow" x="-200%" y="-200%" width="500%" height="500%"><feGaussianBlur stdDeviation="6" /></filter>
                </defs>
                <rect width="640" height="285" fill="url(#softwareGrid)" />
                <text x="34" y="38" fill="#0022ff" fontSize="10" fontWeight="700" letterSpacing="2">FROM PROCESS TO PRODUCT</text>
                <text x="34" y="61" fill="#13213d" fontSize="19" fontWeight="600">Built around the way you work.</text>
                <path d="M95 183H545" stroke="#cfdbf5" strokeWidth="4" strokeLinecap="round" />
                <motion.path d="M95 183H545" stroke="#7390ff" strokeWidth="3" strokeLinecap="round" strokeDasharray="8 13" animate={reducedMotion ? undefined : { strokeDashoffset: [0, -42] }} transition={{ repeat: Infinity, duration: 1.3, ease: "linear" }} />
                {steps.map((step, index) => {
                  const x = centers[index];
                  const selected = active === index;
                  return (
                    <g key={step.title} data-process-enter>
                      <motion.rect x={x - 62} y="87" width="124" height="150" rx="16" animate={{ fill: selected ? "#eff3ff" : "#ffffff", stroke: selected ? "#4265ff" : "#dfe7f5", strokeWidth: selected ? 2 : 1 }} transition={{ duration: reducedMotion ? 0 : 0.45 }} />
                      <motion.g animate={{ y: selected && !reducedMotion ? -5 : 0, color: selected ? "#0022ff" : "#8da0c1" }} transition={{ duration: reducedMotion ? 0 : 0.45 }}><StageIcon index={index} x={x} /></motion.g>
                      <text x={x} y="207" textAnchor="middle" fill={selected ? "#102478" : "#22304c"} fontSize="13" fontWeight="700">{step.title}</text>
                      <text x={x} y="224" textAnchor="middle" fill="#7989a5" fontSize="9">{step.short}</text>
                      <circle cx={x} cy="183" r="4" fill={selected ? "#0022ff" : "#b7c5df"} />
                    </g>
                  );
                })}
                <motion.circle cy="183" r="12" fill="#708cff" opacity="0.3" filter="url(#packetGlow)" animate={{ cx: centers[active] }} transition={{ duration: reducedMotion ? 0 : 1.05, ease: "easeInOut" }} />
                <motion.circle cy="183" r="6" fill="#0022ff" stroke="#fff" strokeWidth="2" animate={{ cx: centers[active] }} transition={{ duration: reducedMotion ? 0 : 1.05, ease: "easeInOut" }} />
                <text x="34" y="265" fill="#91a0bb" fontSize="9">REQUIREMENTS</text><text x="532" y="265" fill="#91a0bb" fontSize="9">HANDOVER</text>
              </svg>
            </div>

            <div className="absolute inset-x-0 bottom-0 flex h-[18%] items-center justify-between gap-3 border-t border-[#e2e9f6] bg-[#f8faff] px-[4%]">
              <div className="flex min-w-0 items-center gap-3">
                <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-[#0022ff] text-[11px] font-semibold text-white">0{active + 1}</span>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div key={active} initial={reducedMotion ? false : { opacity: 0, y: 7 }} animate={{ opacity: 1, y: 0 }} exit={reducedMotion ? undefined : { opacity: 0, y: -7 }} transition={{ duration: 0.28 }} className="min-w-0">
                    <p className="text-[clamp(9px,1vw,13px)] font-semibold leading-tight">{steps[active].title}</p>
                    <p className="truncate text-[clamp(7px,0.8vw,10px)] text-[#657693]">{steps[active].detail}</p>
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="hidden shrink-0 items-center gap-2 text-[9px] font-medium text-[#456183] sm:flex">{active === 2 && !reducedMotion ? <BuildActivity /> : <span className="size-2 rounded-full bg-[#27b88e]" />} AUTO SEQUENCE</div>
            </div>
          </div>
        </div>
        <div className="relative mx-auto w-[106%] -translate-x-[2.8%] drop-shadow-[0_15px_18px_rgba(30,49,89,0.2)]" aria-hidden="true">
          <div className="mx-auto h-2 w-[88%] rounded-b-lg bg-[#75859d]" />
          <div className="relative h-[clamp(58px,10vw,105px)] overflow-hidden bg-gradient-to-b from-[#dfe6f0] via-[#bdc9d9] to-[#a8b7cb]" style={{ clipPath: "polygon(4% 0, 96% 0, 100% 100%, 0 100%)" }}>
            <div className="mx-auto w-[78%] space-y-1 pt-[2%]">
              {[13, 12, 11, 10].map((count, row) => (
                <div key={row} className="flex justify-center gap-[0.7%]">
                  {Array.from({ length: count }, (_, key) => (
                    <span key={key} className="h-[clamp(3px,0.75vw,9px)] min-w-0 flex-1 rounded-[2px] border border-[#344157]/60 bg-[#35445c] shadow-[0_1px_1px_rgba(9,20,44,0.3)]" />
                  ))}
                </div>
              ))}
            </div>
            <div className="absolute bottom-[6%] left-1/2 h-[20%] w-[23%] -translate-x-1/2 rounded-[4px] border border-[#8192aa] bg-[#c9d4e2]/70" />
          </div>
          <div className="mx-auto h-1.5 w-[98%] rounded-b-[50%] bg-gradient-to-b from-[#a8b7cb] to-[#7d8da6]" />
        </div>
      </div>
    </div>
  );
}
