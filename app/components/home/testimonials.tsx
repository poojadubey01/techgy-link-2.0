"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import testimonialsData from "@/data/testimonials.json";
import { ArrowLeft, ArrowRight } from "@/app/components/ui/icons";

type Testimonial = {
  name: string;
  company: string;
  quote: string;
  logo?: string;
};

const testimonials = testimonialsData as Testimonial[];

export function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const firstSetRef = useRef<HTMLDivElement>(null);

  const targetXRef = useRef(0);
  const currentXRef = useRef(0);
  const isHoveredRef = useRef(false);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const isIntentConfirmedRef = useRef(false);
  const dragDistanceRef = useRef(0);
  const singleWidthRef = useRef(0);

  const [cursorClass, setCursorClass] = useState("cursor-grab");

  const getGap = () => (typeof window !== "undefined" && window.innerWidth >= 640 ? 48 : 24);

  const updateSingleWidth = () => {
    if (!firstSetRef.current) return;
    const gap = getGap();
    singleWidthRef.current = firstSetRef.current.offsetWidth + gap;
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    updateSingleWidth();
    window.addEventListener("resize", updateSingleWidth);

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const autoSpeed = reducedMotion ? 0 : 0.65; // ~39px per second at 60fps

    let rafId: number;
    let lastTime = performance.now();

    const tick = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      if (!isHoveredRef.current && !isDraggingRef.current && autoSpeed > 0) {
        targetXRef.current -= autoSpeed * (dt * 60);
      }

      // Smooth lerp to target position
      currentXRef.current += (targetXRef.current - currentXRef.current) * 0.12;

      // Wrap around seamlessly
      const sw = singleWidthRef.current;
      if (sw > 0) {
        while (targetXRef.current <= -sw) {
          targetXRef.current += sw;
          currentXRef.current += sw;
        }
        while (targetXRef.current > 0) {
          targetXRef.current -= sw;
          currentXRef.current -= sw;
        }
      }

      track.style.transform = `translate3d(${currentXRef.current}px, 0, 0)`;
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", updateSingleWidth);
    };
  }, []);

  const handleNext = () => {
    const cardEl = firstSetRef.current?.firstElementChild as HTMLElement | null;
    const cardWidth = cardEl ? cardEl.offsetWidth : 560;
    const gap = getGap();
    targetXRef.current -= cardWidth + gap;
  };

  const handlePrev = () => {
    const cardEl = firstSetRef.current?.firstElementChild as HTMLElement | null;
    const cardWidth = cardEl ? cardEl.offsetWidth : 560;
    const gap = getGap();
    targetXRef.current += cardWidth + gap;
  };

  const onPointerDown = (e: React.PointerEvent) => {
    startXRef.current = e.clientX;
    startYRef.current = e.clientY;
    isDraggingRef.current = false;
    isIntentConfirmedRef.current = false;
    dragDistanceRef.current = 0;
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const dx = e.clientX - startXRef.current;
    const dy = e.clientY - startYRef.current;

    if (!isIntentConfirmedRef.current) {
      if (Math.abs(dx) > 6 || Math.abs(dy) > 6) {
        if (Math.abs(dx) > Math.abs(dy)) {
          isIntentConfirmedRef.current = true;
          isDraggingRef.current = true;
          setCursorClass("cursor-grabbing");
          try {
            (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
          } catch {}
        } else {
          isIntentConfirmedRef.current = true;
          isDraggingRef.current = false;
        }
      }
    }

    if (isDraggingRef.current) {
      const delta = e.clientX - startXRef.current;
      startXRef.current = e.clientX;
      targetXRef.current += delta;
      currentXRef.current += delta;
      dragDistanceRef.current += Math.abs(delta);
    }
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (isDraggingRef.current) {
      try {
        (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {}
      isDraggingRef.current = false;
      setCursorClass("cursor-grab");
    }
    isIntentConfirmedRef.current = false;
  };

  return (
    <section aria-labelledby="testimonials-title" className="w-full section-space overflow-hidden">
      <div className="site-container mx-auto mb-8 sm:mb-12 flex items-center justify-between gap-4">
        <motion.h2
          id="testimonials-title"
          className="font-medium text-[30px] sm:text-[36px] [@media(min-width:1360px)]:text-[40px] leading-[1.2] [@media(min-width:1360px)]:leading-12 tracking-[-0.8px] text-ink"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          What our <span className="text-brand">partners</span> say.
        </motion.h2>

        {/* Prev / Next controls */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous testimonial"
            className="w-11 h-11 rounded-full border border-brand text-brand flex items-center justify-center transition-all duration-200 hover:bg-brand hover:text-white active:scale-95 cursor-pointer"
          >
            <ArrowLeft size={20} />
          </button>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next testimonial"
            className="w-11 h-11 rounded-full border border-brand text-brand flex items-center justify-center transition-all duration-200 hover:bg-brand hover:text-white active:scale-95 cursor-pointer"
          >
            <ArrowRight size={20} />
          </button>
        </div>
      </div>

      {/* Infinite Scrolling Track */}
      <div
        ref={containerRef}
        className={`w-full overflow-hidden select-none touch-pan-y ${cursorClass}`}
        onMouseEnter={() => { isHoveredRef.current = true; }}
        onMouseLeave={() => { isHoveredRef.current = false; }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div
          ref={trackRef}
          className="flex gap-6 sm:gap-12 w-max will-change-transform py-2"
        >
          {/* First set of testimonials */}
          <div ref={firstSetRef} className="flex gap-6 sm:gap-12 shrink-0">
            {testimonials.map((t, idx) => (
              <TestimonialCard key={`${t.name}-${t.company}-${idx}`} t={t} />
            ))}
          </div>

          {/* Second duplicate set for seamless infinite loop */}
          <div aria-hidden="true" className="flex gap-6 sm:gap-12 shrink-0">
            {testimonials.map((t, idx) => (
              <TestimonialCard key={`${t.name}-${t.company}-dup-${idx}`} t={t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div
      className="relative shrink-0 w-[84vw] sm:w-[540px] md:w-[620px] h-[350px] sm:h-85 overflow-hidden bg-white border border-brand flex flex-col pt-8 px-6 pb-8 sm:pt-10 sm:px-9 sm:pb-10 select-none shadow-[0_4px_24px_rgba(0,34,255,0.03)]"
    >
      <span className="font-display font-medium text-brand leading-[0.9] text-[50px] sm:text-[58px] select-none">
        &ldquo;
      </span>
      <p className="font-medium text-ink leading-[1.35] mt-3 line-clamp-4 text-[15px] sm:text-[16px]">
        &ldquo;{t.quote}&rdquo;
      </p>
      <div className="flex items-center gap-4 mt-auto pt-6">
        {t.logo ? (
          <div className={`relative w-24 shrink-0 ${t.logo === "/testimonials/vijetha.png" ? "h-13" : "h-10"}`}>
            <img
              src={t.logo}
              alt={t.company}
              loading="lazy"
              draggable={false}
              className="absolute inset-0 h-full w-full object-contain object-left pointer-events-none"
            />
          </div>
        ) : (
          <div
            aria-label={`${t.name} avatar`}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-semibold text-white select-none"
          >
            {t.name.split(" ").map((part) => part[0]).join("")}
          </div>
        )}
        <div className="min-w-0">
          <p className="font-medium text-ink leading-[1.2] text-[15px] sm:text-[16px] truncate">
            {t.name}
          </p>
          <p className="font-sans text-ink/60 mt-1 text-[12px] sm:text-[13px] truncate">
            {t.company}
          </p>
        </div>
      </div>
    </div>
  );
}
