"use client";
import { useEffect, useState } from "react";
import { ArrowUp } from "@/app/components/ui/icons";

export function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      const scrollY = window.scrollY;
      const isVisible = scrollY > window.innerHeight * 0.6;
      setVisible(isVisible);

      frame = 0;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden={!visible}
      className={
        "footer-bounded-floating fixed z-40 left-5 bottom-5 max-[767px]:left-4 max-[767px]:bottom-4 transition-opacity duration-300" +
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
