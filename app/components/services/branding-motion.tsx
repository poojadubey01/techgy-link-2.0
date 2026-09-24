"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { TECHGY_LOGO_PATHS } from "@/app/components/shared/techgy-logo-animation";

const colors = ["#fff", "#d9e5ff", "#96b6ff", "#fff", "#8bacff", "#fff", "#d9e5ff", "#fff", "#96b6ff"];

function BrandMark({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 979 1014" fill="none" aria-hidden="true">
      {TECHGY_LOGO_PATHS.map((path, index) => (
        <path key={path.id} d={path.d} fill={colors[index % colors.length]} />
      ))}
    </svg>
  );
}

export function BrandingMotion() {
  const stageRef = useRef<HTMLElement>(null);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!stageRef.current) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const context = gsap.context(() => {
      gsap.timeline({ defaults: { ease: "power3.out" } })
        .fromTo(".brand-intro", { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 1, stagger: 0.13 })
        .fromTo(".brand-orbit", { opacity: 0, scale: 0.72, y: 60 }, { opacity: 1, scale: 1, y: 0, duration: 1.1, stagger: 0.1 }, "-=0.55");
    }, stageRef);
    return () => context.revert();
  }, []);

  return (
    <section
      ref={stageRef}
      aria-label="Techgy brand identity in motion"
      className="branding-motion relative isolate min-h-[760px] overflow-hidden rounded-[6px] bg-[#07112a] text-white max-[767px]:min-h-[720px]"
      onPointerMove={(event) => {
        if (event.pointerType === "touch") return;
        const bounds = event.currentTarget.getBoundingClientRect();
        setPointer({
          x: (event.clientX - bounds.left) / bounds.width - 0.5,
          y: (event.clientY - bounds.top) / bounds.height - 0.5,
        });
      }}
      onPointerLeave={() => setPointer({ x: 0, y: 0 })}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_44%,#234ecb_0%,#101e4f_34%,#07112a_73%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:linear-gradient(#8da8ff22_1px,transparent_1px),linear-gradient(90deg,#8da8ff22_1px,transparent_1px)] [background-size:68px_68px]" />
      <div className="brand-halo pointer-events-none absolute left-1/2 top-[45%] h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 max-[767px]:h-[350px] max-[767px]:w-[350px]" />
      <div className="brand-halo brand-halo-two pointer-events-none absolute left-1/2 top-[45%] h-[760px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5 max-[767px]:h-[490px] max-[767px]:w-[490px]" />

      <div className="absolute left-7 right-7 top-7 z-20 flex items-start justify-between gap-4 text-[11px] font-medium uppercase tracking-[0.18em] sm:left-11 sm:right-11 sm:top-10">
        <div className="brand-intro flex items-center gap-3"><span className="h-2 w-2 rounded-full bg-[#a9c3ff] shadow-[0_0_16px_#8baaff]" />Techgy Link / Brand identity</div>
        <span className="brand-intro text-right text-white/50">A living identity</span>
      </div>

      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pb-12 max-[767px]:pb-24">
        <div
          className="brand-intro brand-core relative flex h-[310px] w-[310px] items-center justify-center rounded-full border border-white/15 bg-[radial-gradient(circle_at_35%_30%,#284cc4_0%,#102971_48%,#0a1743_100%)] shadow-[0_25px_90px_#020817a8,inset_0_2px_18px_#b0c7ff33] max-[767px]:h-[230px] max-[767px]:w-[230px]"
          style={{ transform: `translate3d(${pointer.x * 16}px, ${pointer.y * 16}px, 0)` }}
        >
          <div className="absolute inset-4 rounded-full border border-white/10" />
          <BrandMark className="relative h-[215px] w-[215px] drop-shadow-[0_0_22px_#9fbaff77] max-[767px]:h-[158px] max-[767px]:w-[158px]" />
          <span className="brand-spark absolute left-[16%] top-[16%] h-2 w-2 rounded-full bg-white shadow-[0_0_18px_white]" />
        </div>
        <p className="brand-intro mt-9 text-[11px] uppercase tracking-[0.35em] text-[#a9c3ff]">Ideas made visible</p>
        <h3 className="brand-intro mt-3 text-center font-display text-[clamp(36px,5vw,70px)] leading-none tracking-[-0.055em]">One mark. Infinite motion.</h3>
      </div>

      <div className="brand-orbit brand-card brand-card-left absolute left-[7%] top-[24%] z-10 w-[190px] -rotate-[13deg] max-[767px]:left-[-38px] max-[767px]:top-[23%] max-[767px]:w-[118px]">
        <div className="brand-float rounded-[18px] border border-white/25 bg-[#f3f5ff] p-3 shadow-[0_25px_55px_#02081788] max-[767px]:p-2">
          <div className="flex aspect-[4/3] items-center justify-center rounded-[12px] bg-[#0c30cc]"><BrandMark className="h-20 w-20 max-[767px]:h-14 max-[767px]:w-14" /></div>
          <p className="mt-3 text-[9px] font-semibold uppercase tracking-[0.15em] text-[#10245d] max-[767px]:mt-2 max-[767px]:text-[7px]">The symbol / 01</p>
        </div>
      </div>

      <div className="brand-orbit brand-card absolute right-[7%] top-[19%] z-10 w-[188px] rotate-[12deg] max-[767px]:right-[-42px] max-[767px]:top-[22%] max-[767px]:w-[120px]">
        <div className="brand-float brand-float-late aspect-[5/4] overflow-hidden rounded-[20px] border border-white/30 bg-[#e9eeff] shadow-[0_25px_55px_#02081788]">
          <div className="flex h-full items-center justify-center bg-[repeating-linear-gradient(135deg,#c5d4ff_0px,#c5d4ff_8px,#e9eeff_8px,#e9eeff_24px)]"><div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#1034d4] shadow-xl max-[767px]:h-14 max-[767px]:w-14"><BrandMark className="h-12 w-12 max-[767px]:h-9 max-[767px]:w-9" /></div></div>
        </div>
      </div>

      <div className="brand-orbit brand-card absolute bottom-[20%] left-[9%] z-10 w-[220px] rotate-[9deg] max-[767px]:bottom-[23%] max-[767px]:left-[-54px] max-[767px]:w-[145px]">
        <div className="brand-float brand-float-late aspect-[1.62] rounded-[15px] border border-white/30 bg-gradient-to-br from-[#254ee6] via-[#102fa9] to-[#09184f] p-5 shadow-[0_25px_55px_#02081788] max-[767px]:p-3">
          <BrandMark className="h-11 w-11 max-[767px]:h-7 max-[767px]:w-7" /><p className="mt-3 text-[12px] font-semibold tracking-[-0.04em] max-[767px]:mt-2 max-[767px]:text-[9px]">Techgy Link<span className="block text-[8px] font-normal uppercase tracking-[0.17em] text-white/55 max-[767px]:text-[6px]">Build what comes next</span></p>
        </div>
      </div>

      <div className="brand-orbit brand-card absolute bottom-[18%] right-[8%] z-10 w-[180px] -rotate-[10deg] max-[767px]:bottom-[24%] max-[767px]:right-[-45px] max-[767px]:w-[115px]">
        <div className="brand-float flex aspect-square flex-col justify-between rounded-[22px] border border-white/25 bg-[#e8edff] p-5 text-[#10245d] shadow-[0_25px_55px_#02081788] max-[767px]:p-3">
          <span className="text-[9px] font-semibold uppercase tracking-[0.17em] max-[767px]:text-[7px]">Color / 02</span><span className="block h-16 w-full rounded-lg bg-[#1239e0] max-[767px]:h-11" /><span className="text-[9px] font-semibold uppercase tracking-[0.17em] max-[767px]:text-[7px]">Electric blue</span>
        </div>
      </div>

      <div className="brand-intro absolute bottom-8 left-7 right-7 z-20 flex justify-between gap-4 border-t border-white/20 pt-4 text-[10px] uppercase tracking-[0.17em] text-white/55 sm:bottom-10 sm:left-11 sm:right-11">
        <span>Strategy / Identity / Experience</span><span className="text-right">Move with purpose</span>
      </div>

      <style jsx>{`
        .brand-core { transition: transform 650ms cubic-bezier(.2,.8,.2,1); animation: core-breathe 5s ease-in-out infinite; }
        .brand-halo { animation: halo-turn 32s linear infinite; }
        .brand-halo-two { animation-direction: reverse; animation-duration: 42s; }
        .brand-float { animation: float 5s ease-in-out infinite; }
        .brand-float-late { animation-delay: -2.5s; }
        .brand-spark { animation: sparkle 3s ease-in-out infinite; }
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
        @keyframes core-breathe { 0%,100% { box-shadow: 0 25px 90px #020817a8, inset 0 2px 18px #b0c7ff33; } 50% { box-shadow: 0 25px 110px #4164ee77, inset 0 2px 24px #b0c7ff66; } }
        @keyframes halo-turn { to { transform: translate(-50%,-50%) rotate(360deg); } }
        @keyframes sparkle { 0%,100% { opacity: .4; transform: scale(.6); } 50% { opacity: 1; transform: scale(1.3); } }
        @media (prefers-reduced-motion: reduce) { .brand-core,.brand-halo,.brand-float,.brand-spark { animation: none; } }
      `}</style>
    </section>
  );
}
