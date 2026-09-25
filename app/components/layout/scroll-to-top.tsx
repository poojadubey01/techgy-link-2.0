"use client";
import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

// Next's own scroll reset is unreliable here (sticky header, GSAP pin
// spacers), so every route change starts at the top unless a #hash is targeted.
export function ScrollToTop() {
  const pathname = usePathname();
  useLayoutEffect(() => {
    if (window.location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}
