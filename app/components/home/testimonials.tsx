"use client";

import { useEffect, useRef } from "react";
import testimonials from "@/data/testimonials.json";
import { ArrowLeft, ArrowRight } from "@/app/components/ui/icons";

export function Testimonials() {
  const track = useRef<HTMLDivElement>(null);
  const paused = useRef(false);

  function move(direction: number) {
    const element = track.current;
    const card = element?.firstElementChild as HTMLElement | null;
    if (!element || !card) return;
    const end = element.scrollWidth - element.clientWidth;
    const next = direction > 0
      ? element.scrollLeft >= end - 2 ? 0 : Math.min(end, element.scrollLeft + card.offsetWidth + 20)
      : element.scrollLeft <= 2 ? end : Math.max(0, element.scrollLeft - card.offsetWidth - 20);
    element.scrollTo({
      left: next,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  }

  useEffect(() => {
    const timer = window.setInterval(() => {
      const element = track.current;
      const card = element?.firstElementChild as HTMLElement | null;
      if (!element || !card || paused.current || document.hidden) return;
      const bounds = element.getBoundingClientRect();
      if (bounds.bottom <= 0 || bounds.top >= window.innerHeight) return;
      const end = element.scrollWidth - element.clientWidth;
      if (end <= 0) return;
      element.scrollTo({
        left: element.scrollLeft >= end - 2 ? 0 : Math.min(end, element.scrollLeft + card.offsetWidth + 20),
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
      });
    }, 2000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section aria-labelledby="testimonials-title" className="bg-paper py-[65px] max-[767px]:py-[45px] border-t border-rule">
      <div className="w-full">
        <div className="site-container mx-auto flex items-end justify-between gap-5 mb-6 max-[767px]:flex-wrap">
          <h2 id="testimonials-title" className="text-[clamp(32px,3.5vw,48px)] leading-[1.15]">What our <span className="text-brand">partners</span> say.</h2>
          <div className="flex gap-3 shrink-0">
            <button type="button" onClick={() => move(-1)} aria-label="Previous testimonial" aria-controls="testimonial-cards" className="grid place-items-center w-11 h-11 rounded-full border border-brand text-brand hover:bg-brand hover:text-white"><ArrowLeft size={20} /></button>
            <button type="button" onClick={() => move(1)} aria-label="Next testimonial" aria-controls="testimonial-cards" className="grid place-items-center w-11 h-11 rounded-full border border-brand text-brand hover:bg-brand hover:text-white"><ArrowRight size={20} /></button>
          </div>
        </div>
        <div
          id="testimonial-cards"
          ref={track}
          tabIndex={0}
          aria-label="Client testimonials. Reviews advance every two seconds; hover or focus here to pause."
          onMouseEnter={() => { paused.current = true; }}
          onMouseLeave={() => { paused.current = false; }}
          onFocus={() => { paused.current = true; }}
          onBlur={() => { paused.current = false; }}
          className="flex gap-5 overflow-hidden mx-6 max-[767px]:mx-5"
        >
          {testimonials.map((item) => (
            <figure key={item.name} className="flex flex-col shrink-0 w-[calc((100%_-_40px)/3)] max-[1023px]:w-[calc((100%_-_20px)/2)] max-[767px]:w-full bg-white border border-brand p-5">
              <span aria-hidden="true" className="font-display text-[40px] leading-none text-brand">&ldquo;</span>
              <blockquote className="text-[14px] leading-[1.6]">{item.quote}</blockquote>
              <figcaption className="flex items-center gap-3 mt-auto pt-5">
                <img src={item.logo} alt="" width={60} height={36} loading="lazy" className="w-[60px] h-9 object-contain shrink-0" />
                <div><p className="font-medium text-[14px]">{item.name}</p><p className="text-[12px] leading-[1.4] mt-1">{item.company}</p></div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}