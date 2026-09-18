"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
export function EssenceMotion() {
  const path = usePathname();
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    const cleanups: Array<() => void> = [];
    const context = gsap.context(() => {
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const title = document.querySelectorAll("[data-ambition-line]");
        if (title.length)
          gsap.fromTo(
            title,
            { y: 44, opacity: 0.2 },
            {
              y: 0,
              opacity: 1,
              duration: 1.15,
              stagger: 0.16,
              ease: "power3.out",
              clearProps: "all",
            },
          );
        const art = document.querySelectorAll(".ambition-project");
        if (art.length)
          gsap.fromTo(
            art,
            { y: 40, clipPath: "inset(12% 0 0 0)" },
            {
              y: 0,
              clipPath: "inset(0% 0 0 0)",
              duration: 1.2,
              stagger: 0.12,
              ease: "power3.out",
              scrollTrigger: {
                trigger: ".ambition-work",
                start: "top 95%",
                once: true,
              },
              clearProps: "all",
            },
          );
        const rebrandWords = document.querySelectorAll("[data-rebrand-word]");
        if (rebrandWords.length)
          gsap.fromTo(
            rebrandWords,
            { y: 16, opacity: 0.18 },
            {
              y: 0,
              opacity: 1,
              stagger: 0.08,
              ease: "none",
              scrollTrigger: {
                trigger: ".rebrand-statement",
                start: "top 72%",
                end: "bottom 42%",
                scrub: 0.65,
              },
            },
          );
        gsap.utils
          .toArray<Element>(
            ".capability-column,.growth-start,.partner-promises article,.team-discipline,.service-contribution-link,.case-decision,.portfolio-card",
          )
          .forEach((el) =>
            gsap.fromTo(
              el,
              { y: 26, opacity: 0.45 },
              {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: { trigger: el, start: "top 92%", once: true },
                clearProps: "all",
              },
            ),
          );
      });
      mm.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          const strength = gsap.utils.toArray<Element>("[data-strength]");
          const chapters = gsap.utils.toArray<Element>("[data-evolution-step]");
          if (strength.length && chapters.length) {
            const show = (index: number) => {
              strength.forEach((el, i) =>
                gsap.to(el, {
                  backgroundColor:
                    index === 2
                      ? "#ffffff"
                      : index === 1
                        ? "#4865ec"
                        : "#112ebe",
                  color: index === 2 ? "#173fff" : "#ffffff",
                  opacity: index === 0 && ![1, 2, 3, 4].includes(i) ? 0.42 : 1,
                  duration: 0.6,
                  overwrite: true,
                }),
              );
              gsap.to(".evolution-link", {
                x: index === 2 ? 10 : 0,
                duration: 0.7,
                ease: "power3.out",
              });
              gsap.to(".evolution-rule i", {
                scaleX: (index + 1) / 3,
                duration: 0.7,
                ease: "power3.out",
              });
            };
            show(0);
            chapters.forEach((el, i) =>
              ScrollTrigger.create({
                trigger: el,
                start: "top 56%",
                end: "bottom 56%",
                onEnter: () => show(i),
                onEnterBack: () => show(i),
              }),
            );
          }
          gsap.utils.toArray<Element>(".case-flow").forEach((flow) => {
            gsap.fromTo(
              flow.querySelectorAll("[data-case-step]"),
              { y: 22, opacity: 0.35 },
              {
                y: 0,
                opacity: 1,
                stagger: 0.14,
                duration: 0.7,
                ease: "power3.out",
                scrollTrigger: { trigger: flow, start: "top 82%", once: true },
                clearProps: "all",
              },
            );
          });
          const ensemble = document.querySelector(".glc-ensemble");
          if (ensemble) {
            gsap.from(".ensemble-web", {
              y: 55,
              ease: "none",
              scrollTrigger: {
                trigger: ensemble,
                start: "top 88%",
                end: "top 20%",
                scrub: 1,
              },
            });
            gsap.from(".ensemble-app,.ensemble-ops", {
              y: 100,
              ease: "none",
              stagger: 0.1,
              scrollTrigger: {
                trigger: ensemble,
                start: "top 88%",
                end: "top 20%",
                scrub: 1,
              },
            });
          }
          gsap.utils
            .toArray<Element>(".ambition-project,.glc-ensemble>a")
            .forEach((el) => {
              const img = el.querySelector("img");
              if (!img) return;
              const enter = () =>
                gsap.to(img, {
                  scale: 1.025,
                  duration: 0.7,
                  ease: "power2.out",
                });
              const leave = () =>
                gsap.to(img, { scale: 1, duration: 0.7, ease: "power2.out" });
              el.addEventListener("pointerenter", enter);
              el.addEventListener("pointerleave", leave);
              cleanups.push(() => {
                el.removeEventListener("pointerenter", enter);
                el.removeEventListener("pointerleave", leave);
                gsap.killTweensOf(img);
              });
            });
        },
      );
    });
    const refresh = () => ScrollTrigger.refresh();
    document.fonts.ready.then(refresh);
    const timer = setTimeout(refresh, 400);
    return () => {
      clearTimeout(timer);
      cleanups.forEach((fn) => fn());
      mm.revert();
      context.revert();
    };
  }, [path]);
  return null;
}
