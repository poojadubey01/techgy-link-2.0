"use client";
import Link from "@/app/components/ui/internal-link";
import { services } from "@/data/catalogue";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, ArrowUp, Menu, X, ChevronDown, Phone } from "@/app/components/ui/icons";
const nav = [
  ["Solutions", "/solutions"],
  ["Work", "/work"],
  ["Our story", "/about"],
  ["Insights", "/insights"],
];
export function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const mobile = useRef<HTMLDialogElement>(null);
  const details = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    setOpen(false);
    setServicesOpen(false);
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
      <a
        className="fixed left-5 -top-[100px] focus:top-3 z-[1000] bg-brand text-white p-3"
        href="#main"
      >
        Skip to content
      </a>
      <header className="sticky top-0 z-50 bg-[#f8f9faf0] backdrop-blur-lg border-b border-b-[#e2e8f0]">
        <div className="flex items-center gap-8 max-[1200px]:gap-[25px] max-[1100px]:min-[768px]:gap-5 max-[767px]:gap-[13px] max-[370px]:gap-2 mx-auto h-[82px] max-[1023px]:h-20 max-[767px]:h-[74px] site-container">
          <Link
            href="/"
            className="w-[194px] max-[1200px]:w-[170px] max-[1100px]:min-[768px]:w-[174px] max-[767px]:w-[154px] max-[370px]:w-[104px] shrink-0"
            aria-label="TechGy Link home"
          >
            <img
              src="/brand/logo.png"
              width="541"
              height="111"
              alt="TechGy Link"
              className="w-full h-auto"
            />
          </Link>
          <nav
            className="flex items-center gap-[26px] max-[1200px]:gap-[22px] max-[1100px]:min-[768px]:gap-4 ml-auto text-[14px] max-[1023px]:hidden"
            aria-label="Main navigation"
          >
            <details
              className="group"
              ref={details}
              onKeyDown={(e) => {
                if (e.key === "Escape" && details.current) {
                  details.current.open = false;
                  details.current.querySelector("summary")?.focus();
                }
              }}
            >
              <summary className="flex cursor-pointer items-center gap-2 list-none min-h-11 [&::-webkit-details-marker]:hidden group-open:text-brand">
                Services <ChevronDown size={14} />
              </summary>
              <div className="absolute left-0 right-0 bg-white border-b border-rule grid top-full py-12 px-14 grid-cols-[1fr_2fr] gap-14 shadow-[0_35px_40px_#1116250d]">
                <div>
                  <p className="eyebrow text-brand">
                    Our expertise
                  </p>
                  <h2 className="text-[38px] mt-[22px] mx-0 mb-8">
                    The right minds.
                    <br />
                    Around your brief.
                  </h2>
                  <Link
                    href="/services"
                    className="cta-link inline-flex items-center font-medium text-brand hover:text-brand"
                  >
                    All services <ArrowUpRight size={18} />
                  </Link>
                </div>
                <div className="grid grid-cols-2 gap-x-8">
                  {services.map((s) => (
                    <Link
                      key={s.id}
                      href={"/services/" + s.id}
                      className="flex items-center gap-3 py-4 border-b border-rule text-sm leading-normal hover:text-brand"
                    >
                      <span className="text-[#000000] text-[12px]">
                        {s.num}
                      </span>
                      {s.name}
                      <ArrowUpRight size={17} className="ml-auto" />
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
                className="hover:text-brand aria-[current=page]:text-brand"
              >
                {label}
              </Link>
            ))}
          </nav>
          <Link
            href="/contact"
            className="cta-button inline-flex items-center rounded-full bg-brand text-white border border-brand max-[1023px]:ml-auto shrink-0 max-[370px]:px-3"
          >
            Let’s talk <ArrowUpRight size={18} className="max-[767px]:w-[15px]" />
          </Link>
          <button
            className="hidden max-[1023px]:block shrink-0 p-2 max-[767px]:p-[7px]"
            onClick={() => setOpen(true)}
            aria-label="Open navigation"
            aria-expanded={open}
          >
            <Menu />
          </button>
        </div>
        <div className="reading-progress absolute -bottom-px left-0 h-0.5 w-full bg-brand origin-left scale-x-0" />
      </header>
      <dialog
        ref={mobile}
        className="w-full max-w-[520px] h-[100dvh] max-h-[100dvh] mt-0 mr-0 mb-0 ml-auto border-0 p-6 bg-white text-ink overflow-auto"
        aria-label="Website navigation"
        onCancel={() => setOpen(false)}
        onClick={(e) => {
          if (e.target === e.currentTarget) setOpen(false);
        }}
      >
        <div className="flex justify-between items-center mb-9">
          <img
            src="/brand/logo.png"
            alt="TechGy Link"
            width="190"
            height="39"
          />
          <button
            className="p-3"
            onClick={() => setOpen(false)}
            aria-label="Close navigation"
          >
            <X />
          </button>
        </div>
        <nav aria-label="Mobile navigation">
          {[
            ["Home", "/"],
            ["Services", "/services"],
            ...nav,
            ["Contact", "/contact"],
          ].map(([label, href]) =>
            label === "Services" ? (
              <div key={href} className="border-b border-rule">
                <button
                  type="button"
                  onClick={() => setServicesOpen((v) => !v)}
                  aria-expanded={servicesOpen}
                  aria-controls="mobile-services"
                  className="flex w-full justify-between items-center py-3 font-display text-[29px] text-left"
                >
                  <span className={servicesOpen ? "text-brand" : ""}>Services</span>
                  <ChevronDown
                    size={24}
                    className={`transition-transform duration-300 ${servicesOpen ? "rotate-180 text-brand" : ""}`}
                  />
                </button>
                <div
                  id="mobile-services"
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${servicesOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                >
                  <div className="overflow-hidden">
                    <ul className="m-0 flex list-none flex-col p-0 pb-3" inert={!servicesOpen}>
                      {services.map((s) => (
                        <li key={s.id}>
                          <Link
                            onClick={() => setOpen(false)}
                            href={"/services/" + s.id}
                            className="flex items-center gap-3 border-t border-rule/60 py-3 pl-1 text-[15px] leading-snug text-[#000000] hover:text-brand"
                          >
                            <span className="w-6 shrink-0 font-mono text-[11px] text-black/40">{s.num}</span>
                            <span className="flex-1">{s.name}</span>
                            <ArrowUpRight size={16} className="shrink-0 text-black/40" />
                          </Link>
                        </li>
                      ))}
                      <li>
                        <Link
                          onClick={() => setOpen(false)}
                          href="/services"
                          className="flex items-center gap-2 border-t border-rule/60 pt-3.5 pl-1 text-[14px] font-medium text-brand"
                        >
                          All services <ArrowUpRight size={16} />
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                onClick={() => setOpen(false)}
                key={href}
                href={href}
                className="flex justify-between items-center py-3 border-b border-rule font-display text-[29px]"
              >
                {label}
                <ArrowUpRight />
              </Link>
            ),
          )}
        </nav>
      </dialog>
    </>
  );
}
export function Footer() {
  const path = usePathname();
  const wrap =
    "site-container mx-auto";
  const footerEyebrow =
    "eyebrow text-[#f8f9fa] mb-[22px] max-[767px]:mb-[19px]";
  const footerNavLink =
    "block text-[14px] leading-[1.75] mb-2.5 text-[#f8f9fa]";
  return (
    <footer className="bg-[#111625] text-white">
      {path !== "/contact/" && path !== "/contact" && (
        <div
          className={
            wrap +
            " pt-[85px] pb-[70px] max-[767px]:pt-[55px] max-[767px]:pb-10 border-b border-b-[#f8f9fa26]"
          }
        >
          <Link
            href="/contact"
            className="flex items-center justify-between max-[767px]:gap-5 gap-[30px] font-display my-[30px] mx-0 py-[30px] max-[767px]:py-[25px] text-[clamp(70px,8vw,120px)] max-[767px]:text-[clamp(32px,8.5vw,52px)] leading-[1.03] max-[767px]:leading-[1.1] tracking-[-0.05em]"
          >
            <span className="max-w-[900px]">
              Let’s build<em className="block text-[#f8f9fa]">what’s next.</em>
            </span>
            <span className="grid place-items-center bg-brand rounded-full h-[120px] w-[120px] max-[1023px]:h-[90px] max-[1023px]:w-[90px] max-[767px]:w-[52px] max-[767px]:h-[52px] max-[767px]:basis-[52px] shrink-0 text-white border-0">
              <ArrowUpRight
                strokeWidth={1}
                className="w-[68px] h-[68px] max-[1023px]:w-[52px] max-[1023px]:h-[52px] max-[767px]:w-[27px] max-[767px]:h-[27px]"
              />
            </span>
          </Link>
          <p className="text-[18px] leading-[1.8] text-[#f8f9fa] max-w-[630px]">
            Bring us the ambition. We’ll connect the thinking, the people and
            the work to take it forward.
          </p>
        </div>
      )}
      <div
        className={
          wrap +
          " grid grid-cols-[1.7fr_0.75fr_1.35fr] max-[1200px]:gap-10 max-[1023px]:grid-cols-[1.2fr_0.8fr_1.3fr] max-[1023px]:gap-[25px] max-[767px]:grid-cols-[1fr_1.5fr] max-[767px]:gap-y-[34px] max-[767px]:gap-x-5 max-[767px]:py-10 gap-[65px] pt-[62px] pb-[72px] border-[#0f1a3480]"
        }
      >
        <div className="max-[767px]:col-span-full">
          <p className={footerEyebrow}>Connect with TechGy Link</p>
          <a
            className="block text-[15px] leading-[1.75] mb-2.5 text-[#f8f9fa]"
            href="mailto:sales@techgylink.com"
          >
            sales@techgylink.com
          </a>
          <a className={footerNavLink} href="tel:+919989858282"><span className="inline-flex items-center gap-2"><Phone size={16} className="shrink-0" /> +91 99898 58282</span></a>
          <p>
            Hyderabad, India
            <br />
            Design, Technology & Growth Partner
          </p>
          <p className="text-[14px] mt-[27px] leading-[1.8] text-[#f8f9fa]">
            From TechGy Innovations to TechGy Link.
            <br />
            Our capabilities grew. Our name grew with them.
          </p>
        </div>
        <div>
          <p className={footerEyebrow}>Explore</p>
          {[
            ...nav,
            ["Services", "/services"],
            ["Business platforms", "/products"],
            ["Contact", "/contact"],
          ].map(([name, href]) => (
            <Link href={href} key={href} className={footerNavLink}>
              {name}
            </Link>
          ))}
        </div>
        <div>
          <p className={footerEyebrow}>Expertise</p>
          {services.map((s) => (
            <Link
              key={s.id}
              href={"/services/" + s.id}
              className={footerNavLink}
            >
              {s.name}
            </Link>
          ))}
        </div>
      </div>
      <div
        className={
          wrap +
          " flex items-center gap-7 max-[1023px]:gap-5 max-[767px]:flex-wrap max-[767px]:gap-y-5 max-[767px]:gap-x-[18px] border-t border-t-[#0f1a3480] py-[26px] max-[767px]:py-7 text-[#f8f9fa] text-[12px] max-[767px]:text-[11px]"
        }
      >
        <img
          src="/brand/logo.png"
          alt="TechGy Link"
          width="180"
          height="37"
          className="brightness-0 invert w-[155px] max-[767px]:w-[145px] h-auto mr-auto"
        />
        <p className="max-[767px]:ml-auto">
          © {new Date().getFullYear()} TechGy Link
        </p>
        <Link
          href="/privacy"
          className="inline-flex items-center gap-2 max-[767px]:gap-1.5 text-[13px]"
        >
          Privacy
        </Link>
        <a
          href="https://in.linkedin.com/company/techgy-link"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 max-[767px]:gap-1.5 text-[13px]"
        >
          LinkedIn <ArrowUpRight size={14} />
        </a>
        <a
          href="#main"
          className="inline-flex items-center gap-2 max-[767px]:gap-1.5 text-[13px]"
        >
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
            if (!img || img.hasAttribute("data-preserve-image-bounds")) return;
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
