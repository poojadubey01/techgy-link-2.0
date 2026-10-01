"use client";
import { useEffect, useState } from "react";
import { ArrowUp } from "@/app/components/ui/icons";

export function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      setVisible(window.scrollY > window.innerHeight * 0.6);
      ticking = false;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={
        "fixed z-40 grid place-items-center h-14 w-14 max-[767px]:h-12 max-[767px]:w-12 rounded-full border border-rule bg-white text-brand shadow-[0_18px_30px_#00000026] transition-[opacity,transform] duration-300 hover:scale-105 left-5 bottom-5 max-[767px]:left-4 max-[767px]:bottom-4" +
        (visible
          ? " opacity-100 translate-y-0 pointer-events-auto"
          : " opacity-0 translate-y-3 pointer-events-none")
      }
    >
      <ArrowUp size={24} strokeWidth={1.8} />
    </button>
  );
}
