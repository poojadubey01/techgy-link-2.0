"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowUpRight } from "@/app/components/ui/icons";

export function WebDevCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<"preview" | "code" | "vitals">("preview");
  const [buttonCount, setButtonCount] = useState(148);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      // Floating ambient elements
      gsap.to(".glow-orb-1", {
        x: 25,
        y: -20,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(".glow-orb-2", {
        x: -20,
        y: 15,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(".floating-card", {
        y: -5,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        stagger: 0.25,
      });
    }, containerRef);

    return () => ctx.revert();
  }, [activeTab]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[520px] bg-[#f8f9fa] text-[#000000] overflow-hidden flex flex-col select-none border-l border-rule/50"
    >
      {/* Background Subtle Animated Glows & Grid */}
      <div className="glow-orb-1 absolute -top-16 -right-16 w-80 h-80 rounded-full bg-blue-200/50 blur-3xl pointer-events-none" />
      <div className="glow-orb-2 absolute -bottom-16 -left-16 w-80 h-80 rounded-full bg-indigo-100/60 blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />

      {/* Clean White Browser Chrome / Header Bar */}
      <div className="relative z-10 flex items-center justify-between px-4 py-3 border-b border-rule bg-white/80 backdrop-blur-md">
        {/* Window controls */}
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block shadow-sm" />
          <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block shadow-sm" />
          <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block shadow-sm" />
        </div>

        {/* URL / Status Bar */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#f1f5f9] border border-rule text-[11px] text-[#000000]/70 font-mono shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[#000000]/40">https://</span>
          <span className="text-[#000000] font-medium">techgy.link</span>
          <span className="text-brand">/experience</span>
        </div>

        {/* View Mode Switcher Tabs */}
        <div className="flex items-center gap-1 bg-[#e2e8f0]/60 p-0.5 rounded-lg border border-rule text-[11px]">
          <button
            type="button"
            onClick={() => setActiveTab("preview")}
            className={`px-2.5 py-1 rounded-md transition-all ${
              activeTab === "preview"
                ? "bg-white text-brand font-medium shadow-xs"
                : "text-[#000000]/60 hover:text-[#000000]"
            }`}
          >
            Preview
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("code")}
            className={`px-2.5 py-1 rounded-md transition-all ${
              activeTab === "code"
                ? "bg-white text-brand font-medium shadow-xs"
                : "text-[#000000]/60 hover:text-[#000000]"
            }`}
          >
            Code
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("vitals")}
            className={`px-2.5 py-1 rounded-md transition-all ${
              activeTab === "vitals"
                ? "bg-white text-brand font-medium shadow-xs"
                : "text-[#000000]/60 hover:text-[#000000]"
            }`}
          >
            Vitals
          </button>
        </div>
      </div>

      {/* Main Canvas Body */}
      <div className="relative z-10 flex-1 p-5 flex flex-col justify-between overflow-hidden">
        {activeTab === "preview" && (
          <div className="flex flex-col gap-4 h-full justify-between">
            {/* Top Interactive Hero Preview Card */}
            <div className="floating-card relative p-5 rounded-xl bg-white border border-rule shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] uppercase font-mono tracking-widest text-brand px-2 py-0.5 rounded bg-blue-50 border border-blue-200">
                  Next.js 16 • React 19 • GSAP
                </span>
                <span className="text-[11px] text-[#000000]/60 font-mono flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" /> 60 FPS
                </span>
              </div>
              <h4 className="text-[22px] font-display font-medium leading-tight text-[#000000] mb-2 tracking-tight">
                Crafted for Speed & Story.
              </h4>
              <p className="text-[12px] text-[#000000]/70 leading-relaxed max-w-sm mb-4">
                Interactive web experiences engineered with smooth micro-interactions, responsive architecture, and instant load times.
              </p>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setButtonCount((c) => c + 1)}
                  className="px-4 py-1.5 text-[12px] font-medium rounded-full bg-brand text-white hover:bg-blue-700 active:scale-95 transition-all shadow-sm flex items-center gap-1.5"
                >
                  Interactive Click <span className="bg-white/25 px-1.5 py-0.2 rounded-full text-[10px]">{buttonCount}</span>
                </button>
                <span className="text-[11px] text-[#000000]/50 font-mono">
                  ← Tap to test state
                </span>
              </div>
            </div>

            {/* Bottom 2-Column Floating Grid */}
            <div className="grid grid-cols-2 gap-3.5">
              {/* Feature 1: Performance Sparkline */}
              <div className="floating-card p-3.5 rounded-lg bg-white border border-rule shadow-xs">
                <div className="flex items-center justify-between text-[11px] text-[#000000]/70 mb-2">
                  <span>Lighthouse Core</span>
                  <span className="text-emerald-600 font-mono font-semibold">100 / 100</span>
                </div>
                <div className="w-full bg-[#e2e8f0] h-1.5 rounded-full overflow-hidden mb-2">
                  <div className="bg-gradient-to-r from-brand to-emerald-500 h-full w-[99%]" />
                </div>
                <p className="text-[10px] text-[#000000]/50">Sub-second First Contentful Paint</p>
              </div>

              {/* Feature 2: Responsive Stack */}
              <div className="floating-card p-3.5 rounded-lg bg-white border border-rule shadow-xs">
                <div className="flex items-center justify-between text-[11px] text-[#000000]/70 mb-1">
                  <span>Motion Engine</span>
                  <span className="text-brand font-mono font-medium">GSAP 3.15</span>
                </div>
                <div className="flex gap-1.5 mt-2">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#f1f5f9] border border-rule text-[#000000]/80">Tailwind</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#f1f5f9] border border-rule text-[#000000]/80">TypeScript</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#f1f5f9] border border-rule text-[#000000]/80">SSR</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "code" && (
          <div className="h-full rounded-xl bg-white border border-rule p-4 font-mono text-[12px] leading-relaxed overflow-x-auto flex flex-col justify-between shadow-xs">
            <div className="space-y-1">
              <p className="text-[#000000]/40">// ExperienceComponent.tsx</p>
              <p>
                <span className="text-purple-600 font-medium">import</span> {"{"}{" "}
                <span className="text-blue-600">useRef</span>,{" "}
                <span className="text-blue-600">useEffect</span> {"}"}{" "}
                <span className="text-purple-600 font-medium">from</span>{" "}
                <span className="text-emerald-700">&quot;react&quot;</span>;
              </p>
              <p>
                <span className="text-purple-600 font-medium">import</span>{" "}
                <span className="text-blue-600">gsap</span>{" "}
                <span className="text-purple-600 font-medium">from</span>{" "}
                <span className="text-emerald-700">&quot;gsap&quot;</span>;
              </p>
              <br />
              <p>
                <span className="text-blue-600 font-medium">export function</span>{" "}
                <span className="text-brand font-bold">InteractiveCanvas</span>() {"{"}
              </p>
              <p className="pl-4">
                <span className="text-blue-600 font-medium">const</span> scope ={" "}
                <span className="text-blue-600">useRef</span>(
                <span className="text-amber-600">null</span>);
              </p>
              <p className="pl-4">
                <span className="text-blue-600">useEffect</span>(() =&gt; {"{"}
              </p>
              <p className="pl-8 text-emerald-700">
                gsap.to(<span className="text-[#000000]">&quot;.hero-element&quot;</span>, {"{"}
              </p>
              <p className="pl-12 text-[#000000]/80">
                opacity: <span className="text-amber-600 font-medium">1</span>, y:{" "}
                <span className="text-amber-600 font-medium">0</span>, ease:{" "}
                <span className="text-emerald-700">&quot;power3.out&quot;</span>
              </p>
              <p className="pl-8 text-emerald-700">{"}"});</p>
              <p className="pl-4">{"}"}, []);</p>
              <p className="pl-4 text-purple-600">
                return &lt;<span className="text-blue-600">main</span> className=
                <span className="text-emerald-700">&quot;smooth-experience&quot;</span> /&gt;;
              </p>
              <p>{"}"}</p>
            </div>
            <div className="pt-2 border-t border-rule flex items-center justify-between text-[11px] text-[#000000]/50">
              <span>TypeScript 5.9</span>
              <span className="text-emerald-600 font-medium">Compiled successfully</span>
            </div>
          </div>
        )}

        {activeTab === "vitals" && (
          <div className="h-full grid grid-cols-2 gap-3.5 content-center">
            <div className="p-4 rounded-xl bg-white border border-rule text-center flex flex-col items-center justify-center shadow-xs">
              <div className="w-16 h-16 rounded-full border-4 border-emerald-500 bg-emerald-50 flex items-center justify-center text-[20px] font-bold font-mono text-emerald-600 mb-2">
                100
              </div>
              <p className="text-[13px] font-medium text-[#000000]">Performance</p>
              <p className="text-[10px] text-[#000000]/50">Google PageSpeed</p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-rule text-center flex flex-col items-center justify-center shadow-xs">
              <div className="w-16 h-16 rounded-full border-4 border-brand bg-blue-50 flex items-center justify-center text-[20px] font-bold font-mono text-brand mb-2">
                0.4s
              </div>
              <p className="text-[13px] font-medium text-[#000000]">Largest Contentful Paint</p>
              <p className="text-[10px] text-[#000000]/50">Instant LCP target</p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-rule text-center flex flex-col items-center justify-center shadow-xs">
              <div className="w-16 h-16 rounded-full border-4 border-emerald-500 bg-emerald-50 flex items-center justify-center text-[20px] font-bold font-mono text-emerald-600 mb-2">
                0.00
              </div>
              <p className="text-[13px] font-medium text-[#000000]">Cumulative Layout Shift</p>
              <p className="text-[10px] text-[#000000]/50">Zero visual shift</p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-rule text-center flex flex-col items-center justify-center shadow-xs">
              <div className="w-16 h-16 rounded-full border-4 border-purple-500 bg-purple-50 flex items-center justify-center text-[20px] font-bold font-mono text-purple-600 mb-2">
                100
              </div>
              <p className="text-[13px] font-medium text-[#000000]">Best Practices & SEO</p>
              <p className="text-[10px] text-[#000000]/50">Modern semantic web</p>
            </div>
          </div>
        )}
      </div>

      {/* Clean Footer Meta Badge */}
      <div className="relative z-10 px-4 py-2 border-t border-rule bg-white/80 flex items-center justify-between text-[11px] text-[#000000]/50">
        <span className="flex items-center gap-1.5 font-medium text-brand">
          <span className="w-2 h-2 rounded-full bg-brand animate-ping" />
          Interactive Canvas
        </span>
        <span>TechGy Link Development Engine</span>
      </div>
    </div>
  );
}
