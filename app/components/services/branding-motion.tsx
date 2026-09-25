"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import gsap from "gsap";
import { TECHGY_LOGO_PATHS } from "@/app/components/shared/techgy-logo-animation";

const RIBBON_TINT = "#b8c6ff";
const STEP_MS = 3200;
const radii = (w: number, h: number) => ({ rx: w * (w < 520 ? 0.39 : 0.34), ry: h * 0.29 });

function BrandMark({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 979 1014" fill="none" aria-hidden="true">
      {TECHGY_LOGO_PATHS.map((path) => (
        <path key={path.id} d={path.d} fill={path.type === "node" ? "#ffffff" : RIBBON_TINT} />
      ))}
    </svg>
  );
}

function SpecCard({ n, label, detail, children }: { n: string; label: string; detail: string; children: ReactNode }) {
  return (
    <div className="rounded-[18px] border border-rule bg-white p-2.5 shadow-[0_22px_44px_-18px_rgba(15,26,52,0.32)]">
      <div className="relative aspect-[4/3] overflow-hidden rounded-[12px]">{children}</div>
      <div className="mt-2.5 flex items-center justify-between gap-2 px-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-navy/80 @max-[520px]:mt-1.5 @max-[520px]:text-[7px] @max-[520px]:tracking-[0.08em]">
        <span className="whitespace-nowrap">
          {n} / {label}
        </span>
        <span className="whitespace-nowrap text-navy/40 @max-[820px]:hidden">{detail}</span>
      </div>
    </div>
  );
}

const elements = [
  {
    n: "01",
    label: "Symbol",
    detail: "SVG",
    desc: "The mark, drawn to hold up at every size.",
    art: (
      <div className="flex h-full items-center justify-center bg-brand">
        <BrandMark className="h-[58%] w-auto" />
      </div>
    ),
  },
  {
    n: "02",
    label: "Pattern",
    detail: "Tile",
    desc: "A texture built from the curves of the mark.",
    art: (
      <div className="flex h-full items-center justify-center bg-[repeating-linear-gradient(135deg,#dfe5ff_0px,#dfe5ff_8px,#f3f5ff_8px,#f3f5ff_22px)]">
        <div className="flex aspect-square w-[44%] items-center justify-center rounded-full bg-brand shadow-[0_10px_24px_-8px_rgba(0,34,255,0.7)]">
          <BrandMark className="h-[60%] w-auto" />
        </div>
      </div>
    ),
  },
  {
    n: "03",
    label: "Stationery",
    detail: "85 × 55",
    desc: "Cards, letterheads and signage that match.",
    art: (
      <div className="flex h-full flex-col justify-between bg-[linear-gradient(135deg,#3552ff_0%,#0022ff_55%,#0016a6_100%)] p-3">
        <BrandMark className="h-[34%] w-auto self-start" />
        <p className="text-[12px] font-semibold leading-tight tracking-[-0.02em] text-white">
          TechGy Link
          <span className="block text-[7.5px] font-normal uppercase tracking-[0.16em] text-white/60">techgylink.com</span>
        </p>
      </div>
    ),
  },
  {
    n: "04",
    label: "Colour",
    detail: "#0022FF",
    desc: "Electric blue, anchored by navy and paper.",
    art: (
      <div className="flex h-full flex-col gap-1.5 bg-[#f1f4f9] p-1.5">
        <div className="relative flex-1 rounded-md bg-brand">
          <span className="absolute bottom-1.5 left-2 text-[7.5px] font-semibold uppercase tracking-[0.14em] text-white/85">
            Electric blue
          </span>
        </div>
        <div className="grid h-[32%] grid-cols-2 gap-1.5">
          <div className="relative rounded-md bg-navy">
            <span className="absolute bottom-1 left-1.5 text-[6.5px] font-semibold uppercase tracking-[0.14em] text-white/70">Navy</span>
          </div>
          <div className="relative rounded-md border border-rule bg-white">
            <span className="absolute bottom-1 left-1.5 text-[6.5px] font-semibold uppercase tracking-[0.14em] text-navy/60">Paper</span>
          </div>
        </div>
      </div>
    ),
  },
];

export function BrandingMotion() {
  const sectionRef = useRef<HTMLElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const fogRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const size = useRef({ w: 0, h: 0 });
  const phase = useRef(0);
  const stepRef = useRef(0);
  const [step, setStep] = useState(0);
  const [track, setTrack] = useState({ w: 0, h: 0 });
  const [visible, setVisible] = useState(false);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  const active = ((step % elements.length) + elements.length) % elements.length;

  useEffect(() => {
    stepRef.current = step;
  }, [step]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const el = orbitRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      size.current = { w: width, h: height };
      setTrack({ w: width, h: height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const id = setTimeout(() => setStep((s) => s + 1), STEP_MS);
    return () => clearTimeout(id);
  }, [step, visible]);

  useEffect(() => {
    if (!visible) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const frame = () => {
      const target = stepRef.current * (Math.PI / 2);
      phase.current = reduce ? target : phase.current + (target - phase.current) * 0.07;
      const { rx, ry } = radii(size.current.w, size.current.h);
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const a = Math.PI / 2 + i * (Math.PI / 2) - phase.current;
        const s = Math.sin(a);
        const c = Math.cos(a);
        const depth = (s + 1) / 2;
        card.style.transform = `translate(-50%, -50%) translate(${c * rx}px, ${s * ry}px) scale(${0.64 + 0.36 * depth}) rotate(${c * -9}deg)`;
        card.style.zIndex = s >= 0 ? "30" : "10";
        card.style.opacity = "1";
        const fog = fogRefs.current[i];
        if (fog) fog.style.opacity = String((1 - depth) * 0.55);
      });
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [visible]);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const context = gsap.context(() => {
      gsap.timeline({ defaults: { ease: "power3.out" } })
        .fromTo(".brand-intro", { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.1 })
        .fromTo(".brand-orbit-inner", { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.9, stagger: 0.1 }, "-=0.6");
    }, sectionRef);
    return () => context.revert();
  }, []);

  const bringToFront = (i: number) => setStep((s) => s + ((i - (s % 4) + 4) % 4));

  const { rx, ry } = radii(track.w, track.h);
  const cx = track.w / 2;
  const cy = track.h / 2;

  return (
    <section
      ref={sectionRef}
      aria-label="TechGy Link brand identity in motion"
      className="branding-motion @container relative isolate overflow-hidden rounded-[6px] border border-rule bg-paper text-black"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#0000000d_1px,transparent_1px)] bg-[size:20px_20px]" />
      <div className="pointer-events-none absolute -top-24 -right-20 h-[420px] w-[420px] rounded-full bg-blue-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-24 h-[360px] w-[360px] rounded-full bg-blue-100/60 blur-3xl" />

      <div className="relative grid flex-1 min-h-[600px] grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] items-center gap-6 px-11 py-10 @max-[820px]:grid-cols-1 @max-[820px]:gap-2 @max-[820px]:px-6 @max-[820px]:py-8">
        <div className="relative z-20 flex flex-col">
          <h3 className="brand-intro font-display text-[clamp(40px,5.6cqw,70px)] leading-[0.95] tracking-[-0.05em]">
            One mark.
            <br />
            <span className="text-brand">Infinite motion.</span>
          </h3>
          <p className="brand-intro mt-5 max-w-[36ch] text-[14px] leading-relaxed text-black/60">
            One symbol, built into a system that stays recognisable everywhere it appears.
          </p>

          <div className="brand-intro mt-8 flex flex-col border-b border-rule">
            {elements.map((el, i) => {
              const on = i === active;
              return (
                <button
                  key={el.n}
                  type="button"
                  aria-pressed={on}
                  onClick={() => bringToFront(i)}
                  className="group relative flex w-full items-start gap-4 border-t border-rule py-3 pl-4 text-left"
                >
                  <span className={`absolute bottom-3 left-0 top-3 w-[2px] rounded-full ${on ? "bg-brand/15" : "bg-transparent"}`}>
                    {on && (
                      <span
                        key={step}
                        className="bm-progress absolute inset-0 origin-top rounded-full bg-brand"
                        style={{ animationDuration: `${STEP_MS}ms` }}
                      />
                    )}
                  </span>
                  <span className={`pt-[3px] font-mono text-[11px] transition-colors ${on ? "text-brand" : "text-black/30"}`}>{el.n}</span>
                  <span className="min-w-0 flex-1">
                    <span
                      className={`block text-[16px] font-medium tracking-[-0.01em] transition-colors duration-300 ${
                        on ? "text-black" : "text-black/40 group-hover:text-black/70"
                      }`}
                    >
                      {el.label}
                    </span>
                    <span
                      className={`block overflow-hidden text-[12.5px] text-black/55 transition-all duration-500 ${
                        on ? "mt-0.5 max-h-10 opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      {el.desc}
                    </span>
                  </span>
                  <span
                    className={`mt-[5px] h-2 w-2 rounded-full transition-all duration-300 ${
                      on ? "scale-100 bg-brand" : "scale-50 bg-black/15"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        <div
          ref={orbitRef}
          className="relative h-[540px] @max-[820px]:h-[430px] @max-[520px]:h-[340px]"
          onPointerMove={(event) => {
            if (event.pointerType === "touch") return;
            const b = event.currentTarget.getBoundingClientRect();
            setPointer({ x: (event.clientX - b.left) / b.width - 0.5, y: (event.clientY - b.top) / b.height - 0.5 });
          }}
          onPointerLeave={() => setPointer({ x: 0, y: 0 })}
        >
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,34,255,0.14)_0%,rgba(0,34,255,0.04)_40%,transparent_68%)]" />

          {track.w > 0 && (
            <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
              <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="none" stroke="#0022ff" strokeOpacity="0.2" strokeDasharray="3 7" />
              <ellipse cx={cx} cy={cy} rx={rx * 1.22} ry={ry * 1.22} fill="none" stroke="#0022ff" strokeOpacity="0.07" />
              <circle r="3.5" fill="#0022ff" className="bm-motion">
                <animateMotion
                  dur="9s"
                  repeatCount="indefinite"
                  path={`M ${cx - rx} ${cy} a ${rx} ${ry} 0 1 0 ${rx * 2} 0 a ${rx} ${ry} 0 1 0 ${-rx * 2} 0`}
                />
              </circle>
            </svg>
          )}

          <div className="brand-intro absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
            <div
              className="brand-core relative flex h-[260px] w-[260px] items-center justify-center rounded-full border-[6px] border-white bg-[radial-gradient(circle_at_35%_28%,#4d66ff_0%,#0022ff_46%,#0017b8_100%)] @max-[820px]:h-[190px] @max-[820px]:w-[190px] @max-[520px]:h-[150px] @max-[520px]:w-[150px] @max-[520px]:border-4"
              style={{ transform: `translate3d(${pointer.x * 14}px, ${pointer.y * 14}px, 0)` }}
            >
              <div className="bm-halo absolute -inset-7 rounded-full border border-dashed border-brand/25" />
              <div className="absolute inset-4 rounded-full border border-white/15" />
              <BrandMark className="relative h-[172px] w-auto drop-shadow-[0_6px_18px_rgba(0,10,90,0.35)] @max-[820px]:h-[124px] @max-[520px]:h-[96px]" />
              <span className="bm-spark absolute left-[16%] top-[16%] h-2 w-2 rounded-full bg-white shadow-[0_0_18px_white]" />
            </div>
          </div>

          {elements.map((el, i) => (
            <div
              key={el.n}
              ref={(node) => {
                cardRefs.current[i] = node;
              }}
              className="absolute left-1/2 top-1/2 w-[176px] will-change-transform @max-[820px]:w-[128px] @max-[520px]:w-[104px]"
              style={{ opacity: 0 }}
            >
              <button type="button" onClick={() => bringToFront(i)} className="brand-orbit-inner relative block w-full cursor-pointer text-left" aria-label={`Show ${el.label}`}>
                <SpecCard n={el.n} label={el.label} detail={el.detail}>
                  {el.art}
                </SpecCard>
                <span
                  ref={(node) => {
                    fogRefs.current[i] = node;
                  }}
                  className="pointer-events-none absolute inset-0 rounded-[18px] bg-paper"
                  style={{ opacity: 0 }}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .brand-core { transition: transform 650ms cubic-bezier(.2,.8,.2,1); animation: core-breathe 5s ease-in-out infinite; }
        .bm-halo { animation: halo-turn 30s linear infinite; }
        .bm-spark { animation: sparkle 3s ease-in-out infinite; }
        .bm-progress { animation-name: progress; animation-timing-function: linear; animation-fill-mode: both; }
        @keyframes core-breathe { 0%,100% { box-shadow: 0 30px 70px -18px rgba(0,34,255,0.55), 0 0 0 1px rgba(0,34,255,0.08), inset 0 2px 20px rgba(255,255,255,0.25); } 50% { box-shadow: 0 34px 90px -14px rgba(0,34,255,0.7), 0 0 0 10px rgba(0,34,255,0.06), inset 0 2px 24px rgba(255,255,255,0.35); } }
        @keyframes halo-turn { to { transform: rotate(360deg); } }
        @keyframes sparkle { 0%,100% { opacity: .4; transform: scale(.6); } 50% { opacity: 1; transform: scale(1.3); } }
        @keyframes progress { from { transform: scaleY(0); } to { transform: scaleY(1); } }
        @media (prefers-reduced-motion: reduce) {
          .brand-core, .bm-halo, .bm-spark, .bm-progress { animation: none; }
          .bm-motion { display: none; }
        }
      `}</style>
    </section>
  );
}
