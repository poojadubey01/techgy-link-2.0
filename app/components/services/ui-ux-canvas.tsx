"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function UiUxCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<"prototype" | "specs" | "tokens">("prototype");
  const [selectedPlan, setSelectedPlan] = useState<"starter" | "growth">("growth");
  const [toggleState, setToggleState] = useState(true);
  const [showRulers, setShowRulers] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      // Multiplayer Design Cursor Path Animation
      if (cursorRef.current) {
        const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });
        tl.to(cursorRef.current, {
          x: 180,
          y: 70,
          duration: 2.2,
          ease: "power2.inOut",
        })
          .to(cursorRef.current, {
            scale: 0.85,
            duration: 0.15,
            yoyo: true,
            repeat: 1,
            ease: "power1.inOut",
          })
          .to(cursorRef.current, {
            x: 290,
            y: 190,
            duration: 2.5,
            ease: "power2.inOut",
          })
          .to(cursorRef.current, {
            scale: 0.85,
            duration: 0.15,
            yoyo: true,
            repeat: 1,
            ease: "power1.inOut",
          })
          .to(cursorRef.current, {
            x: 60,
            y: 130,
            duration: 2,
            ease: "power2.inOut",
          });
      }

      // Floating ambient elements
      gsap.to(".ui-orb-1", {
        x: 25,
        y: -15,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(".ui-card-float", {
        y: -5,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        stagger: 0.2,
      });
    }, containerRef);

    return () => ctx.revert();
  }, [activeTab]);

  return (
    <div
      ref={containerRef}
      className="service-demo relative w-full h-full min-h-[520px] bg-[#f8f9fa] text-[#000000] overflow-hidden flex flex-col select-none border-l border-rule/50"
    >
      {/* Background Subtle Gradient & Dot Grid */}
      <div className="ui-orb-1 absolute -top-16 -right-16 w-80 h-80 rounded-full bg-blue-100/60 blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#00000010_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

      {/* Figma-style Design Canvas Toolbar */}
      <div className="demo-row demo-toolbar relative z-10 flex items-center justify-between px-4 py-3 border-b border-rule bg-white/80 backdrop-blur-md">
        {/* Layer & Selection info */}
        <div className="flex items-center gap-2 text-[11px] font-mono text-[#000000]/70">
          <span className="w-2 h-2 rounded-full bg-brand" />
          <span className="font-semibold text-brand">Frame: UserFlow_v4</span>
          <span className="text-[#000000]/40">/ Auto-Layout (Hug)</span>
        </div>

        {/* View Mode Switcher Tabs */}
        <div className="demo-tabs flex items-center gap-1 bg-[#e2e8f0]/60 p-0.5 rounded-lg border border-rule text-[11px]">
          <button
            type="button"
            onClick={() => setActiveTab("prototype")}
            className={`px-2.5 py-1 rounded-md transition-all ${
              activeTab === "prototype"
                ? "bg-white text-brand font-medium shadow-xs"
                : "text-[#000000]/60 hover:text-[#000000]"
            }`}
          >
            Prototype
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("specs")}
            className={`px-2.5 py-1 rounded-md transition-all ${
              activeTab === "specs"
                ? "bg-white text-brand font-medium shadow-xs"
                : "text-[#000000]/60 hover:text-[#000000]"
            }`}
          >
            Specs & Layout
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("tokens")}
            className={`px-2.5 py-1 rounded-md transition-all ${
              activeTab === "tokens"
                ? "bg-white text-brand font-medium shadow-xs"
                : "text-[#000000]/60 hover:text-[#000000]"
            }`}
          >
            Design Tokens
          </button>
        </div>
      </div>

      {/* Simulated Live Multiplayer Design Cursor */}
      <div
        ref={cursorRef}
        className="absolute top-12 left-10 z-30 pointer-events-none flex flex-col items-start transition-opacity duration-300"
      >
        <svg
          className="w-5 h-5 text-brand drop-shadow-md"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M4 0l16 12.279-6.951 1.17 4.325 8.817-3.596 1.734-4.35-8.879-5.428 5.279v-20.4z" />
        </svg>
        <span className="ml-3 -mt-1 px-2 py-0.5 text-[10px] font-mono font-medium text-white bg-brand rounded-full shadow-md">
          Design Lead • editing
        </span>
      </div>

      {/* Main Canvas Body */}
      <div className="demo-body relative z-10 flex-1 p-5 flex flex-col justify-between overflow-hidden">
        {activeTab === "prototype" && (
          <div className="flex flex-col gap-3.5 h-full justify-between">
            {/* Top Interactive Component Card */}
            <div className="ui-card-float relative p-5 rounded-xl bg-white border border-rule shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
              <div className="demo-row flex items-center justify-between mb-3">
                <span className="text-[10px] uppercase font-mono tracking-wider text-brand px-2 py-0.5 rounded bg-blue-50 border border-blue-200">
                  Interactive Micro-Interaction
                </span>
                <span className="text-[11px] text-[#000000]/50 font-mono">
                  Spring: 300 / Damping: 25
                </span>
              </div>

              {/* Segmented Pill Controller */}
              <div className="demo-row flex items-center justify-between gap-3 mb-4">
                <div className="flex bg-[#f1f5f9] p-1 rounded-lg border border-rule">
                  <button
                    type="button"
                    onClick={() => setSelectedPlan("starter")}
                    className={`px-3 py-1 text-[12px] font-medium rounded-md transition-all ${
                      selectedPlan === "starter"
                        ? "bg-white text-brand shadow-xs"
                        : "text-[#000000]/60 hover:text-[#000000]"
                    }`}
                  >
                    User Journey
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedPlan("growth")}
                    className={`px-3 py-1 text-[12px] font-medium rounded-md transition-all ${
                      selectedPlan === "growth"
                        ? "bg-white text-brand shadow-xs"
                        : "text-[#000000]/60 hover:text-[#000000]"
                    }`}
                  >
                    Conversion Funnel
                  </button>
                </div>

                {/* Animated Toggle Switch */}
                <div
                  onClick={() => setToggleState(!toggleState)}
                  className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
                    toggleState ? "bg-brand" : "bg-[#cbd5e1]"
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                      toggleState ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </div>
              </div>

              <h4 className="text-[18px] font-display font-medium leading-tight text-[#000000] mb-1.5 tracking-tight">
                {selectedPlan === "growth" ? "84.2% Funnel Completion" : "Seamless 3-Step Flow"}
              </h4>
              <p className="text-[12px] text-[#000000]/70 leading-relaxed max-w-sm">
                Every screen is tested for cognitive clarity, accessible contrast, and zero-friction navigation.
              </p>
            </div>

            {/* Bottom 2-Column Floating Cards */}
            <div className="grid grid-cols-2 gap-3.5">
              {/* Feature 1: User Experience Metric */}
              <div className="ui-card-float p-3.5 rounded-lg bg-white border border-rule shadow-xs">
                <div className="demo-row flex items-center justify-between text-[11px] text-[#000000]/70 mb-1.5">
                  <span>Usability Rating</span>
                  <span className="text-emerald-600 font-mono font-semibold">9.8 / 10</span>
                </div>
                <div className="w-full bg-[#e2e8f0] h-1.5 rounded-full overflow-hidden mb-2">
                  <div className="bg-gradient-to-r from-brand to-emerald-500 h-full w-[96%]" />
                </div>
                <p className="text-[10px] text-[#000000]/50">Based on structured user validation</p>
              </div>

              {/* Feature 2: Wireframe System */}
              <div className="ui-card-float p-3.5 rounded-lg bg-white border border-rule shadow-xs">
                <div className="demo-row flex items-center justify-between text-[11px] text-[#000000]/70 mb-1">
                  <span>Component States</span>
                  <span className="text-brand font-mono font-medium">8 Variations</span>
                </div>
                <div className="flex gap-1.5 mt-2">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#f1f5f9] border border-rule text-[#000000]/80">Default</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-blue-50 border border-blue-200 text-brand">Hover</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#f1f5f9] border border-rule text-[#000000]/80">Focus</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "specs" && (
          <div className="h-full rounded-xl bg-white border border-dashed border-brand/40 p-4 font-mono text-[12px] leading-relaxed flex flex-col justify-between shadow-xs relative">
            {/* Blue bounding box overlay with dimension badges */}
            <div className="absolute top-2 left-2 text-[10px] bg-brand text-white px-1.5 py-0.5 rounded font-mono">
              w: 420px • h: 280px
            </div>
            <div className="absolute top-2 right-2 text-[10px] bg-emerald-600 text-white px-1.5 py-0.5 rounded font-mono">
              gap: 16px • p: 24px
            </div>

            <div className="mt-6 space-y-2">
              <div className="p-3 bg-[#f8f9fa] rounded-lg border border-rule">
                <div className="flex justify-between text-[11px] text-[#000000]/80 font-semibold mb-1">
                  <span>Component: PrimaryCard</span>
                  <span className="text-brand">Auto-Layout: Flex-Col</span>
                </div>
                <p className="text-[11px] text-[#000000]/60">Border-radius: 12px • Shadow: 0 10px 30px rgba(0,0,0,0.06)</p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="p-2.5 bg-[#f8f9fa] rounded-lg border border-rule">
                  <span className="text-[10px] text-[#000000]/50 block">Typography</span>
                  <span className="text-[11px] font-bold text-[#000000]">Brutel / 18px Medium</span>
                </div>
                <div className="p-2.5 bg-[#f8f9fa] rounded-lg border border-rule">
                  <span className="text-[10px] text-[#000000]/50 block">Grid System</span>
                  <span className="text-[11px] font-bold text-brand">8pt Baseline Grid</span>
                </div>
              </div>
            </div>

            <div className="demo-row pt-2 border-t border-rule flex items-center justify-between text-[11px] text-[#000000]/50">
              <span>Figma DevMode Sync</span>
              <span className="text-emerald-600 font-medium">Pixel-perfect specifications</span>
            </div>
          </div>
        )}

        {activeTab === "tokens" && (
          <div className="h-full flex flex-col justify-between gap-3">
            {/* Color Palette Tokens */}
            <div className="grid grid-cols-3 gap-2">
              <div className="p-3 rounded-xl bg-white border border-rule shadow-xs text-center">
                <div className="w-full h-8 rounded-lg bg-brand mb-1.5 shadow-inner" />
                <span className="text-[11px] font-bold block text-[#000000]">Brand Blue</span>
                <span className="text-[10px] font-mono text-[#000000]/50">#0022FF • 7.2:1 AAA</span>
              </div>
              <div className="p-3 rounded-xl bg-white border border-rule shadow-xs text-center">
                <div className="w-full h-8 rounded-lg bg-[#0f1a34] mb-1.5 shadow-inner" />
                <span className="text-[11px] font-bold block text-[#000000]">Navy Ink</span>
                <span className="text-[10px] font-mono text-[#000000]/50">#0F1A34 • 14:1 AAA</span>
              </div>
              <div className="p-3 rounded-xl bg-white border border-rule shadow-xs text-center">
                <div className="w-full h-8 rounded-lg bg-[#e2e8f0] mb-1.5 border border-rule" />
                <span className="text-[11px] font-bold block text-[#000000]">Rule Silver</span>
                <span className="text-[10px] font-mono text-[#000000]/50">#E2E8F0 • Surface</span>
              </div>
            </div>

            {/* Typography Tokens */}
            <div className="p-3.5 rounded-xl bg-white border border-rule shadow-xs flex flex-col gap-1.5">
              <div className="flex justify-between items-center text-[11px]">
                <span className="font-display font-medium text-[15px] text-[#000000]">Brutel Display</span>
                <span className="font-mono text-[#000000]/50">Headings & Brand</span>
              </div>
              <div className="flex justify-between items-center text-[11px]">
                <span className="font-sans text-[13px] text-[#000000]/80">Inter Sans</span>
                <span className="font-mono text-[#000000]/50">Body & Ergonomic UI</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Clean Footer Meta Badge */}
      <div className="demo-row demo-footer relative z-10 px-4 py-2 border-t border-rule bg-white/80 flex items-center justify-between text-[11px] text-[#000000]/50">
        <span className="flex items-center gap-1.5 font-medium text-brand">
          <span className="w-2 h-2 rounded-full bg-brand animate-ping" />
          Interactive UI/UX Canvas
        </span>
        <span>TechGy Link Design System</span>
      </div>
    </div>
  );
}
