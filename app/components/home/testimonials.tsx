"use client";

import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { motion } from "framer-motion";
import testimonialsData from "@/data/testimonials.json";
import { ArrowLeft, ArrowRight } from "@/app/components/ui/icons";

type Testimonial = {
  name: string;
  company: string;
  quote: string;
  logo: string;
};

const testimonials = testimonialsData as Testimonial[];

const IDLE_SNAP_MS = 160;
const GAP_PX = 48;
const POP_TRANSITION =
  "width 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), height 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s ease";

export function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isDraggingRef = useRef(false);
  const targetScrollRef = useRef(0);
  const minScrollRef = useRef(0);
  const maxScrollRef = useRef(0);
  const lenisRef = useRef<Lenis | null>(null);
  const cardStepRef = useRef(0);
  const [isMobile, setIsMobile] = useState(false);

  // Mobile state & refs
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);
  const activeMobileIndexRef = useRef(0);
  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const mobileCardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Below `sm` the drag carousel feels janky on touch, so we swap
  // it out for a plain native scroll-snap strip with bottom-left navigation controls.
  useEffect(() => {
    const mql = window.matchMedia("(max-width: 639px)");
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  const handleMobileScroll = () => {
    const container = mobileScrollRef.current;
    if (!container) return;
    const containerLeft = container.getBoundingClientRect().left;
    const gutter = container.firstElementChild
      ? parseFloat(getComputedStyle(container.firstElementChild).paddingLeft)
      : 0;
    let closestIndex = 0;
    let minDiff = Infinity;
    mobileCardsRef.current.forEach((card, idx) => {
      if (!card) return;
      const diff = Math.abs(card.getBoundingClientRect().left - (containerLeft + gutter));
      if (diff < minDiff) {
        minDiff = diff;
        closestIndex = idx;
      }
    });
    activeMobileIndexRef.current = closestIndex;
    setActiveMobileIndex(closestIndex);
  };

  const scrollToMobileCard = (index: number) => {
    const container = mobileScrollRef.current;
    const card = mobileCardsRef.current[index];
    if (!container || !card) return;

    const containerLeft = container.getBoundingClientRect().left;
    const gutter = container.firstElementChild
      ? parseFloat(getComputedStyle(container.firstElementChild).paddingLeft)
      : 0;
    const cardLeft = card.getBoundingClientRect().left;
    const diff = cardLeft - (containerLeft + gutter);

    container.scrollBy({
      left: diff,
      behavior: "smooth",
    });
    activeMobileIndexRef.current = index;
    setActiveMobileIndex(index);
  };

  const handlePrevMobile = () => {
    if (activeMobileIndex > 0) {
      scrollToMobileCard(activeMobileIndex - 1);
    }
  };

  const handleNextMobile = () => {
    if (activeMobileIndex < testimonials.length - 1) {
      scrollToMobileCard(activeMobileIndex + 1);
    }
  };

  useEffect(() => {
    if (isMobile) return;
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const cards = cardRefs.current.filter((c): c is HTMLDivElement => !!c);
    if (cards.length < 2) return;

    // Measure the actual rendered card width
    let cardWidth = cards[0].getBoundingClientRect().width;
    let cardStep = cardWidth + GAP_PX;
    let centerOffset = (container.clientWidth - cardWidth) / 2;
    let maxRaw = cardStep * (testimonials.length - 1);
    const toRaw = (scroll: number) => scroll + centerOffset;
    const toScroll = (raw: number) => raw - centerOffset;
    const clampRaw = (raw: number) => Math.min(Math.max(raw, 0), maxRaw);

    const recalculate = () => {
      const width = cards[0]?.getBoundingClientRect().width;
      if (!width) return;
      cardWidth = width;
      cardStep = cardWidth + GAP_PX;
      centerOffset = (container.clientWidth - cardWidth) / 2;
      maxRaw = cardStep * (testimonials.length - 1);
      cardStepRef.current = cardStep;
      minScrollRef.current = toScroll(0);
      maxScrollRef.current = toScroll(maxRaw);
    };
    window.addEventListener("resize", recalculate);
    cardStepRef.current = cardStep;
    minScrollRef.current = toScroll(0);
    maxScrollRef.current = toScroll(maxRaw);

    const lenis = new Lenis({
      wrapper: container,
      content: track,
      orientation: "horizontal",
      gestureOrientation: "horizontal",
      smoothWheel: true,
      syncTouch: true,
      duration: 1.2,
    });
    lenisRef.current = lenis;

    // Start centered on the first card
    lenis.scrollTo(toScroll(0), { immediate: true });
    targetScrollRef.current = toScroll(0);

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    let idleTimer: ReturnType<typeof setTimeout>;
    const snapToNearest = (duration: number) => {
      const raw = clampRaw(toRaw(lenis.animatedScroll));
      const nearestRaw = clampRaw(Math.round(raw / cardStep) * cardStep);
      const nearest = toScroll(nearestRaw);
      lenis.scrollTo(nearest, { duration });
      targetScrollRef.current = nearest;
    };

    const updateScales = () => {
      const containerRect = container.getBoundingClientRect();
      const viewportCenter = containerRect.left + containerRect.width / 2;

      cardRefs.current.forEach((card) => {
        if (!card) return;

        const rect = card.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;

        const distance = Math.abs(viewportCenter - cardCenter);
        const normalized = Math.min(distance / cardStep, 1);

        card.style.opacity = `${1 - normalized * 0.35}`;
        card.style.zIndex = `${Math.round((1 - normalized) * 10)}`;
      });

      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        if (!isDraggingRef.current) snapToNearest(0.5);
      }, IDLE_SNAP_MS);
    };

    lenis.on("scroll", updateScales);
    updateScales();

    // Drag to scroll (mouse + touch via Pointer Events)
    const setCardTransitions = (value: string) => {
      cardRefs.current.forEach((card) => {
        if (card) card.style.transition = value;
      });
    };
    setCardTransitions(POP_TRANSITION);

    let startX = 0;
    let startScroll = 0;
    const onPointerDown = (e: PointerEvent) => {
      isDraggingRef.current = true;
      clearTimeout(idleTimer);
      setCardTransitions("none");
      startX = e.clientX;
      startScroll = lenis.animatedScroll;
      container.setPointerCapture(e.pointerId);
      container.style.cursor = "grabbing";
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!isDraggingRef.current) return;
      const delta = e.clientX - startX;
      const raw = clampRaw(toRaw(startScroll - delta));
      lenis.scrollTo(toScroll(raw), { immediate: true });
    };
    const onPointerUp = () => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      container.style.cursor = "grab";
      setCardTransitions(POP_TRANSITION);
      snapToNearest(0.6);
    };
    container.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(idleTimer);
      window.removeEventListener("resize", recalculate);
      container.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      lenis.off("scroll", updateScales);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [isMobile]);

  // Desktop carousel is a single bounded pass through the real 9 cards,
  // so prev/next clamp at the first and last card instead of wrapping.
  const handlePrevDesktop = () => {
    const lenis = lenisRef.current;
    if (!lenis || !cardStepRef.current) return;
    const next = Math.max(targetScrollRef.current - cardStepRef.current, minScrollRef.current);
    targetScrollRef.current = next;
    lenis.scrollTo(next, { duration: 0.6 });
  };

  const handleNextDesktop = () => {
    const lenis = lenisRef.current;
    if (!lenis || !cardStepRef.current) return;
    const next = Math.min(targetScrollRef.current + cardStepRef.current, maxScrollRef.current);
    targetScrollRef.current = next;
    lenis.scrollTo(next, { duration: 0.6 });
  };

  return (
    <section aria-labelledby="testimonials-title" className="w-full py-10 md:py-14 [@media(min-width:1360px)]:py-16">
      <div className="site-container mx-auto mb-10 md:mb-16 [@media(min-width:1360px)]:mb-25 flex items-center justify-between gap-6">
        <motion.h2
          id="testimonials-title"
          className="font-medium text-[32px] sm:text-[36px] [@media(min-width:1360px)]:text-[40px] leading-[1.2] [@media(min-width:1360px)]:leading-12 tracking-[-0.8px] text-ink"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          What our <span className="text-brand">partners</span> say.
        </motion.h2>

        {/* Desktop/tablet prev/next controls, in the same row as the title */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={handlePrevDesktop}
            aria-label="Previous testimonial"
            className="w-11 h-11 rounded-full border border-brand text-brand flex items-center justify-center transition-all duration-200 hover:bg-brand hover:text-white active:scale-95 cursor-pointer"
          >
            <ArrowLeft size={20} />
          </button>

          <button
            type="button"
            onClick={handleNextDesktop}
            aria-label="Next testimonial"
            className="w-11 h-11 rounded-full border border-brand text-brand flex items-center justify-center transition-all duration-200 hover:bg-brand hover:text-white active:scale-95 cursor-pointer"
          >
            <ArrowRight size={20} />
          </button>
        </div>
      </div>

      {/* Mobile: swipe with scroll-snap & manual controls */}
      <div className="sm:hidden w-full">
        <div
          ref={mobileScrollRef}
          onScroll={handleMobileScroll}
          className="w-full overflow-x-auto overscroll-x-contain touch-pan-x snap-x snap-mandatory [&::-webkit-scrollbar]:hidden scroll-smooth"
          style={{ scrollbarWidth: "none" }}
        >
          <div className="flex gap-6 w-max px-[var(--site-gutter)] scroll-px-[var(--site-gutter)]">
            {testimonials.map((t, idx) => (
              <div
                key={t.name}
                ref={(el) => {
                  mobileCardsRef.current[idx] = el;
                }}
                className="snap-center relative shrink-0 w-[86vw] h-[24rem] overflow-hidden bg-white border border-brand flex flex-col pt-10 px-6 pb-10"
              >
                <span className="font-display font-medium text-brand leading-[0.9] text-[60px]">
                  &ldquo;
                </span>
                <p className="font-medium text-ink leading-[1.2] mt-4 line-clamp-4 text-[16px]">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-4 mt-auto pt-10">
                  <div className="relative h-10 w-20 shrink-0">
                    <img
                      src={t.logo}
                      alt={t.company}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-contain object-left"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-ink leading-[1.2] text-[16px]">
                      {t.name}
                    </p>
                    <p className="font-sans text-ink/60 mt-1 text-[13px]">
                      {t.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile bottom-left controls for navigating left and right */}
        <div className="site-container mx-auto flex items-center gap-3 mt-6">
          <button
            type="button"
            onClick={handlePrevMobile}
            disabled={activeMobileIndex === 0}
            aria-label="Previous testimonial"
            className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-200 ${
              activeMobileIndex === 0
                ? "border-rule text-ink/30 opacity-60 cursor-not-allowed"
                : "border-brand text-brand hover:bg-brand hover:text-white active:scale-95 cursor-pointer"
            }`}
          >
            <ArrowLeft size={20} />
          </button>

          <button
            type="button"
            onClick={handleNextMobile}
            disabled={activeMobileIndex === testimonials.length - 1}
            aria-label="Next testimonial"
            className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-200 ${
              activeMobileIndex === testimonials.length - 1
                ? "border-rule text-ink/30 opacity-60 cursor-not-allowed"
                : "border-brand text-brand hover:bg-brand hover:text-white active:scale-95 cursor-pointer"
            }`}
          >
            <ArrowRight size={20} />
          </button>
        </div>
      </div>

      {/* Tablet/desktop: drag carousel */}
      <div
        ref={containerRef}
        className="hidden sm:block relative w-full h-85 overflow-x-auto overflow-y-hidden overscroll-x-contain cursor-grab select-none touch-pan-y [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: "none" }}
      >
        <div ref={trackRef} className="flex items-center gap-12 w-max">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="relative shrink-0 w-[min(78vw,800px)] h-85 overflow-hidden bg-white border border-brand flex flex-col pt-12 px-10 pb-12 will-change-transform"
            >
              <span className="font-display font-medium text-brand leading-[0.9] text-[60px]">
                &ldquo;
              </span>
              <p className="font-medium text-ink leading-[1.2] mt-4 max-w-212.5 line-clamp-4 text-[16px]">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-4 mt-auto pt-10">
                <div className="relative h-10 w-20 shrink-0">
                  <img
                    src={t.logo}
                    alt={t.company}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-contain object-left"
                  />
                </div>
                <div>
                  <p className="font-medium text-ink leading-[1.2] text-[16px]">
                    {t.name}
                  </p>
                  <p className="font-sans text-ink/60 mt-1 text-[13px]">
                    {t.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
