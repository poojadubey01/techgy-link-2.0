"use client";
import Link from "@/app/components/ui/internal-link";
import { services } from "@/data/catalogue";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, ArrowUp, Menu, X, ChevronDown } from "@/app/components/ui/icons";
const nav = [
  ["Solutions", "/solutions"],
  ["Work", "/work"],
  ["Our story", "/about"],
  ["Insights", "/insights"],
];
export function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const mobile = useRef<HTMLDialogElement>(null);
  const details = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    setOpen(false);
    if (details.current) details.current.open = false;
  }, [path]);
  useEffect(() => {
    const d = mobile.current;
    if (!d) return;
    if (open) {
      d.showModal();
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
        d.close();
      };
    } else d.close();
  }, [open]);
  useEffect(() => {
    const close = (e: PointerEvent) => {
      if (details.current && !details.current.contains(e.target as Node))
        details.current.open = false;
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, []);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="nav-wrap">
          <Link href="/" className="brand" aria-label="TechGy Link home">
            <img
              src="/brand/logo.png"
              width="541"
              height="111"
              alt="TechGy Link"
            />
          </Link>
          <nav className="desktop-nav" aria-label="Main navigation">
            <details
              className="service-menu"
              ref={details}
              onKeyDown={(e) => {
                if (e.key === "Escape" && details.current) {
                  details.current.open = false;
                  details.current.querySelector("summary")?.focus();
                }
              }}
            >
              <summary>
                Services <ChevronDown size={14} />
              </summary>
              <div className="mega-menu">
                <div className="mega-intro">
                  <p className="eyebrow">Our expertise</p>
                  <h2>
                    The right minds.
                    <br />
                    Around your brief.
                  </h2>
                  <Link href="/services" className="text-link">
                    All services <ArrowUpRight size={18} />
                  </Link>
                </div>
                <div className="mega-list">
                  {services.map((s) => (
                    <Link key={s.id} href={"/services/" + s.id}>
                      <span>{s.num}</span>
                      {s.name}
                      <ArrowUpRight size={17} />
                    </Link>
                  ))}
                </div>
              </div>
            </details>
            {nav.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                aria-current={path.startsWith(href) ? "page" : undefined}
              >
                {label}
              </Link>
            ))}
          </nav>
          <Link href="/contact" className="nav-cta">
            Let’s talk <ArrowUpRight size={18} />
          </Link>
          <button
            className="menu-button"
            onClick={() => setOpen(true)}
            aria-label="Open navigation"
            aria-expanded={open}
          >
            <Menu />
          </button>
        </div>
        <div className="reading-progress" />
      </header>
      <dialog
        ref={mobile}
        className="mobile-nav-dialog"
        aria-label="Website navigation"
        onCancel={() => setOpen(false)}
        onClick={(e) => {
          if (e.target === e.currentTarget) setOpen(false);
        }}
      >
        <div className="mobile-nav-top">
          <img
            src="/brand/logo.png"
            alt="TechGy Link"
            width="190"
            height="39"
          />
          <button onClick={() => setOpen(false)} aria-label="Close navigation">
            <X />
          </button>
        </div>
        <nav aria-label="Mobile navigation">
          {[
            ["Home", "/"],
            ["Services", "/services"],
            ...nav,
            ["Contact", "/contact"],
          ].map(([label, href]) => (
            <Link onClick={() => setOpen(false)} key={href} href={href}>
              {label}
              <ArrowUpRight />
            </Link>
          ))}
        </nav>
        <div className="mobile-service-links">
          {services.map((s) => (
            <Link
              onClick={() => setOpen(false)}
              key={s.id}
              href={"/services/" + s.id}
            >
              {s.name}
            </Link>
          ))}
        </div>
      </dialog>
    </>
  );
}
export function Footer() {
  const path = usePathname();
  return (
    <footer className="footer collective-footer">
      {path !== "/contact/" && path !== "/contact" && (
        <div className="wrap footer-cta">
          <Link href="/contact" className="footer-headline">
            <span>
              Let’s build<em>what’s next.</em>
            </span>
            <span className="footer-arrow">
              <ArrowUpRight strokeWidth={1} />
            </span>
          </Link>
          <p>
            Bring us the ambition. We’ll connect the thinking, the people and
            the work to take it forward.
          </p>
        </div>
      )}
      <div className="wrap footer-grid">
        <div className="footer-contact">
          <p className="eyebrow">Connect with TechGy Link</p>
          <a className="footer-email" href="mailto:sales@techgylink.com">
            sales@techgylink.com
          </a>
          <a href="tel:+919100043542">+91 91000 43542</a>
          <p>
            Hyderabad, India
            <br />
            Design, Technology & Growth Partner
          </p>
          <p className="footer-origin">
            From TechGy Innovations to TechGy Link.
            <br />
            Our capabilities grew. Our name grew with them.
          </p>
        </div>
        <div>
          <p className="eyebrow">Explore</p>
          {[
            ...nav,
            ["Services", "/services"],
            ["Starting engagements", "/campaigns"],
            ["Business platforms", "/products"],
            ["Contact", "/contact"],
          ].map(([name, href]) => (
            <Link href={href} key={href}>
              {name}
            </Link>
          ))}
        </div>
        <div className="footer-services">
          <p className="eyebrow">Expertise</p>
          {services.map((s) => (
            <Link key={s.id} href={"/services/" + s.id}>
              {s.name}
            </Link>
          ))}
        </div>
      </div>
      <div className="wrap footer-bottom">
        <img src="/brand/logo.png" alt="TechGy Link" width="180" height="37" />
        <p>© {new Date().getFullYear()} TechGy Link</p>
        <Link href="/privacy">Privacy</Link>
        <a
          href="https://in.linkedin.com/company/techgy-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn <ArrowUpRight size={14} />
        </a>
        <a href="#main">
          Back to top <ArrowUp size={14} />
        </a>
      </div>
    </footer>
  );
}
export function Motion() {
  const path = usePathname();
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    const cleanups: Array<() => void> = [];
    const context = gsap.context(() => {
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (s) => gsap.set(".reading-progress", { scaleX: s.progress }),
      });
      const sectionLinks = gsap.utils.toArray<Element>(
        '.page-tabs a[href^="#"]',
      );
      const setCurrentSection = (active: Element) =>
        sectionLinks.forEach((link) => {
          if (link === active) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      sectionLinks.forEach((link) => {
        const id = link.getAttribute("href")?.slice(1);
        const section = id ? document.getElementById(id) : null;
        if (section)
          ScrollTrigger.create({
            trigger: section,
            start: "top 32%",
            end: "bottom 32%",
            onEnter: () => setCurrentSection(link),
            onEnterBack: () => setCurrentSection(link),
          });
      });
      cleanups.push(() =>
        sectionLinks.forEach((link) => link.removeAttribute("aria-current")),
      );
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const heroLines = document.querySelectorAll(".hero-line > span");
        if (heroLines.length)
          gsap.fromTo(
            heroLines,
            { yPercent: 110 },
            {
              yPercent: 0,
              duration: 1.1,
              stagger: 0.13,
              ease: "power4.out",
              clearProps: "transform",
            },
          );
        const heroIntro = document.querySelectorAll(".next-hero-top");
        if (heroIntro.length)
          gsap.fromTo(
            heroIntro,
            { opacity: 0, y: 18 },
            { opacity: 1, y: 0, duration: 0.8, delay: 0.15, clearProps: "all" },
          );
        const pageTitles = document.querySelectorAll(
          ".detail-copy h1,.page-intro h1",
        );
        if (pageTitles.length)
          gsap.fromTo(
            pageTitles,
            { y: 25, opacity: 0.2 },
            {
              y: 0,
              opacity: 1,
              duration: 0.9,
              ease: "power3.out",
              clearProps: "all",
            },
          );
        gsap.utils
          .toArray<Element>("[data-image-reveal]")
          .forEach((el) =>
            gsap.fromTo(
              el,
              { clipPath: "inset(7% 0 0 0 round 6px)" },
              {
                clipPath: "inset(0% 0 0 0 round 6px)",
                duration: 1.15,
                ease: "power3.out",
                scrollTrigger: { trigger: el, start: "top 92%", once: true },
                clearProps: "clipPath",
              },
            ),
          );
        gsap.utils.toArray<Element>("[data-diagram]").forEach((el) => {
          const nodes = el.querySelectorAll(
            ".workflow-nodes>li,.marketing-path>li,.assessment-map>div",
          );
          gsap.fromTo(
            nodes,
            { opacity: 0.15, y: 24 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.15,
              ease: "power3.out",
              scrollTrigger: { trigger: el, start: "top 75%", once: true },
              clearProps: "all",
            },
          );
        });
        gsap.utils
          .toArray<Element>(".reveal,.section-title")
          .forEach((el) =>
            gsap.fromTo(
              el,
              { y: 30, opacity: 0.15 },
              {
                y: 0,
                opacity: 1,
                duration: 0.85,
                ease: "power3.out",
                scrollTrigger: { trigger: el, start: "top 93%", once: true },
                clearProps: "all",
              },
            ),
          );
        gsap.utils
          .toArray<Element>("[data-manifesto]>span,[data-manifesto]>em")
          .forEach((el) =>
            gsap.fromTo(
              el,
              { opacity: 0.7, y: 12 },
              {
                opacity: 1,
                y: 0,
                ease: "none",
                scrollTrigger: {
                  trigger: el,
                  start: "top 84%",
                  end: "top 48%",
                  scrub: 0.6,
                },
              },
            ),
          );
        gsap.utils
          .toArray<Element>(
            ".work-card,.feature-project,.architecture-card,.solution-editorial-row",
          )
          .forEach((el) => {
            const img = el.querySelector("img");
            if (!img) return;
            const enter = () =>
              gsap.to(img, {
                scale: 1.035,
                duration: 0.65,
                ease: "power2.out",
              });
            const leave = () =>
              gsap.to(img, { scale: 1, duration: 0.65, ease: "power2.out" });
            el.addEventListener("pointerenter", enter);
            el.addEventListener("pointerleave", leave);
            cleanups.push(() => {
              el.removeEventListener("pointerenter", enter);
              el.removeEventListener("pointerleave", leave);
              gsap.killTweensOf(img);
            });
          });
      });
      mm.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          const composition = document.querySelector("[data-composition]");
          if (composition) {
            const cards = composition.querySelectorAll(".composition-project");
            gsap.from(cards, {
              y: 60,
              opacity: 0,
              rotation: 0,
              duration: 1.35,
              stagger: 0.12,
              ease: "power3.out",
              delay: 0.15,
            });
            gsap.to(".composition-web", {
              y: -32,
              rotation: -2,
              ease: "none",
              scrollTrigger: {
                trigger: composition,
                start: "top 28%",
                end: "bottom top",
                scrub: 1.2,
              },
            });
            gsap.to(".composition-space", {
              y: -72,
              rotation: 2,
              ease: "none",
              scrollTrigger: {
                trigger: composition,
                start: "top 28%",
                end: "bottom top",
                scrub: 1.2,
              },
            });
            gsap.to(".composition-app", {
              y: 28,
              rotation: 2,
              ease: "none",
              scrollTrigger: {
                trigger: composition,
                start: "top 28%",
                end: "bottom top",
                scrub: 1.2,
              },
            });
          }
          gsap.utils
            .toArray<Element>("[data-parallax]")
            .forEach((el) =>
              gsap.fromTo(
                el.querySelector("img"),
                { yPercent: -5, scale: 1.1 },
                {
                  yPercent: 5,
                  scale: 1.1,
                  ease: "none",
                  scrollTrigger: {
                    trigger: el,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                  },
                },
              ),
            );
        },
      );
      mm.add("(min-width: 768px)", () => {
        const frames = gsap.utils.toArray<Element>("[data-story-frame]");
        const bars = gsap.utils.toArray<Element>("[data-story-progress] i");
        const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
        const show = (index: number) => {
          frames.forEach((frame, i) =>
            gsap.to(frame, {
              autoAlpha: i === index ? 1 : 0,
              y: i === index ? 0 : 16,
              duration: reduced ? 0 : 0.55,
              overwrite: true,
              ease: "power2.out",
            }),
          );
          bars.forEach((bar, i) =>
            gsap.to(bar, {
              scaleX: i <= index ? 1 : 0,
              duration: reduced ? 0 : 0.45,
              overwrite: true,
            }),
          );
        };
        gsap.utils
          .toArray<Element>("[data-chapter]")
          .forEach((chapter, i) =>
            ScrollTrigger.create({
              trigger: chapter,
              start: "top 52%",
              end: "bottom 52%",
              onEnter: () => show(i),
              onEnterBack: () => show(i),
            }),
          );
      });
    });
    const refresh = () => ScrollTrigger.refresh();
    document.fonts.ready.then(refresh);
    window.addEventListener("load", refresh);
    const timer = setTimeout(refresh, 450);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("load", refresh);
      cleanups.forEach((fn) => fn());
      mm.revert();
      context.revert();
    };
  }, [path]);
  return null;
}
