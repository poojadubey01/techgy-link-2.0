"use client";
import { useEffect, useState, useRef } from "react";
import { ArrowUp } from "@/app/components/ui/icons";

export function BackToTopButton() {
  const [visible, setVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      const scrollY = window.scrollY;
      const isVisible = scrollY > window.innerHeight * 0.6;
      setVisible(isVisible);

      if (containerRef.current) {
        if (!isVisible) {
          containerRef.current.style.transform = "";
        } else {
          const footer = document.querySelector("footer");
          if (footer) {
            const rect = footer.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const overlap = windowHeight - rect.top;
            if (overlap > 0) {
              const maxShift = Math.max(0, windowHeight - 90);
              const shift = Math.min(overlap, maxShift);
              containerRef.current.style.transform = `translateY(-${shift}px)`;
            } else {
              containerRef.current.style.transform = "";
            }
          } else {
            containerRef.current.style.transform = "";
          }
        }
      }
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden={!visible}
      className={
        "fixed z-40 left-5 bottom-5 max-[767px]:left-4 max-[767px]:bottom-4 transition-opacity duration-300 will-change-transform" +
        (visible
          ? " opacity-100 pointer-events-auto"
          : " opacity-0 pointer-events-none")
      }
    >
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        tabIndex={visible ? 0 : -1}
        className="grid place-items-center h-14 w-14 max-[767px]:h-12 max-[767px]:w-12 rounded-full border border-rule bg-white text-brand shadow-[0_18px_30px_#00000026] transition-transform duration-200 hover:scale-105 cursor-pointer"
      >
        <ArrowUp size={24} strokeWidth={1.8} />
      </button>
    </div>
  );
}
