"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowUpRight, ArrowRight } from "@/app/components/ui/icons";

export function ArchitectureCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeView, setActiveView] = useState<"transition" | "slider" | "materials">("transition");
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [activeHotspot, setActiveHotspot] = useState<string>("pergola");
  const [isHovered, setIsHovered] = useState(false);

  const hotspots = {
    blueprint_core: {
      title: "BIM Coordinate Wireframe",
      category: "Structural CAD Matrix",
      desc: "Sub-millimeter accurate structural steel, post-tension slabs, and MEP ducting geometry.",
      spec: "Revit / Rhino 3D Direct Import",
    },
    pergola: {
      title: "Rooftop Biophilic Pergola",
      category: "Outdoor Sky Terrace",
      desc: "Motorized louvered timber canopy, drought-tolerant roof garden, and seamless infinity edge.",
      spec: "Natural Teak & Anodized Charcoal Fins",
    },
    balconies: {
      title: "Cantilevered Glazed Balconies",
      category: "Facade Envelope",
      desc: "Frameless acoustic glass balustrades with vertical privacy timber louvers and integrated cove lighting.",
      spec: "Low-Iron Acoustic Laminate Glass",
    },
    landscape: {
      title: "Botanical Landscape & Entry Court",
      category: "Ground Arrival Experience",
      desc: "Native palm canopy, natural stone perimeter boundary, porous motor court, and ambient 2700K uplighting.",
      spec: "Unreal Engine 5.5 Lumen Raytracing",
    },
  };

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      // Flowing dotted bezier connector animation
      gsap.to(".flow-arrow-badge", {
        y: -4,
        x: 3,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Ambient pulse for hotspot markers
      gsap.to(".hotspot-pulse", {
        scale: 1.4,
        opacity: 0,
        duration: 1.8,
        repeat: -1,
        ease: "power2.out",
        stagger: 0.3,
      });

      // Background ambient orbs
      gsap.to(".arch-orb-bg", {
        x: 20,
        y: -15,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, [activeView]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[540px] bg-[#f8f9fa] text-[#000000] overflow-hidden flex flex-col select-none rounded-md border-l border-rule/50 font-sans"
    >
      {/* Subtle Architectural Blueprint Grid */}
      <div className="arch-orb-bg absolute -top-16 -right-16 w-80 h-80 rounded-full bg-blue-100/50 blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0022ff0a_1px,transparent_1px),linear-gradient(to_bottom,#0022ff0a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      {/* Top Architectural Studio Toolbar */}
      <div className="relative z-10 flex items-center justify-between px-6 py-3.5 border-b border-rule bg-white/90 backdrop-blur-md">
        <div className="flex items-center gap-2.5 text-[12px] font-mono text-[#000000]/75">
          <span className="w-2.5 h-2.5 rounded-full bg-brand animate-pulse" />
          <span className="font-semibold text-brand">Spatial Engine: CAD Blueprint ➔ 3D Photorealism</span>
          <span className="text-[#000000]/40">/ Unreal Engine 5.5</span>
        </div>

        {/* View Mode Switcher Tabs */}
        <div className="flex items-center gap-1 bg-[#e2e8f0]/60 p-0.5 rounded-lg border border-rule text-[11px]">
          <button
            type="button"
            onClick={() => setActiveView("transition")}
            className={`px-3 py-1 rounded-md transition-all ${
              activeView === "transition"
                ? "bg-white text-brand font-medium shadow-xs"
                : "text-[#000000]/60 hover:text-[#000000]"
            }`}
          >
            Blueprint ➔ 3D Render
          </button>
          <button
            type="button"
            onClick={() => setActiveView("slider")}
            className={`px-3 py-1 rounded-md transition-all ${
              activeView === "slider"
                ? "bg-white text-brand font-medium shadow-xs"
                : "text-[#000000]/60 hover:text-[#000000]"
            }`}
          >
            Interactive Split Reveal
          </button>
          <button
            type="button"
            onClick={() => setActiveView("materials")}
            className={`px-3 py-1 rounded-md transition-all ${
              activeView === "materials"
                ? "bg-white text-brand font-medium shadow-xs"
                : "text-[#000000]/60 hover:text-[#000000]"
            }`}
          >
            Material Shaders
          </button>
        </div>
      </div>

      {/* Main Visual Stage */}
      <div className="relative z-10 flex-1 p-6 grid grid-cols-[1.35fr_0.85fr] gap-5 items-center overflow-hidden max-[1023px]:grid-cols-1">
        {/* Left Interactive Visual Stage */}
        <div className="relative w-full h-full min-h-[380px] bg-white rounded-xl border border-rule shadow-sm overflow-hidden flex flex-col justify-between">
          {/* Header Coordinate Stamp */}
          <div className="absolute top-3 left-4 right-4 z-20 flex justify-between items-center text-[10px] font-mono text-[#000000]/60 pointer-events-none">
            <span className="px-2 py-0.5 rounded bg-white/90 backdrop-blur-md border border-rule shadow-xs font-semibold text-brand">
              ▲ CAD WIREFRAME ➔ RAYTRACED ARCHITECTURE
            </span>
            <span className="px-2 py-0.5 rounded bg-white/90 backdrop-blur-md border border-rule shadow-xs">
              4K UHD • LUMEN GI
            </span>
          </div>

          {activeView === "transition" && (
            <div className="relative flex-1 w-full h-full flex items-center justify-center p-2">
              {/* The Hero Blueprint-to-Render Image */}
              <div className="relative w-full h-full rounded-lg overflow-hidden flex items-center justify-center">
                <img
                  src="/work/optimized/isometric-blueprint-render.jpg"
                  alt="Isometric architectural blueprint wireframe morphing into photorealistic building render"
                  className="w-full h-full object-contain max-h-[360px]"
                />

                {/* Animated Bezier Connecting Curve and Flow Arrow */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none z-10"
                  viewBox="0 0 500 400"
                  fill="none"
                >
                  {/* Dotted Arching Path from Blueprint to Render */}
                  <path
                    d="M 175 80 Q 250 20, 315 115"
                    stroke="#0022ff"
                    strokeWidth="2.5"
                    strokeDasharray="6 6"
                    strokeLinecap="round"
                    className="opacity-80"
                  />
                  {/* Origin Pulse on Blueprint */}
                  <circle cx="175" cy="80" r="4.5" fill="#0022ff" />
                  <circle cx="175" cy="80" r="10" stroke="#0022ff" strokeWidth="1.5" className="hotspot-pulse" />

                  {/* Target Pulse on 3D Render */}
                  <circle cx="315" cy="115" r="4.5" fill="#0022ff" />
                  <circle cx="315" cy="115" r="10" stroke="#0022ff" strokeWidth="1.5" className="hotspot-pulse" />
                </svg>

                {/* Flow Arrow Button Badge */}
                <div className="flow-arrow-badge absolute top-[14%] left-[48%] -translate-x-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-brand text-white flex items-center justify-center shadow-lg border-2 border-white">
                  <ArrowRight size={16} />
                </div>

                {/* Interactive Hotspot Trigger 1: Blueprint Structural Core */}
                <button
                  type="button"
                  onClick={() => setActiveHotspot("blueprint_core")}
                  className="absolute top-[28%] left-[24%] z-20 group flex items-center gap-1.5 focus:outline-none"
                >
                  <span className="relative flex h-5 w-5 items-center justify-center">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-brand border-2 border-white shadow-md" />
                  </span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-mono bg-white/95 px-2 py-0.5 rounded border border-rule shadow-sm text-brand font-medium">
                    CAD Matrix
                  </span>
                </button>

                {/* Interactive Hotspot Trigger 2: Rooftop Pergola */}
                <button
                  type="button"
                  onClick={() => setActiveHotspot("pergola")}
                  className="absolute top-[32%] right-[40%] z-20 group flex items-center gap-1.5 focus:outline-none"
                >
                  <span className="relative flex h-5 w-5 items-center justify-center">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-brand border-2 border-white shadow-md" />
                  </span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-mono bg-white/95 px-2 py-0.5 rounded border border-rule shadow-sm text-brand font-medium">
                    Rooftop Pergola
                  </span>
                </button>

                {/* Interactive Hotspot Trigger 3: Cantilever Balconies */}
                <button
                  type="button"
                  onClick={() => setActiveHotspot("balconies")}
                  className="absolute top-[54%] right-[32%] z-20 group flex items-center gap-1.5 focus:outline-none"
                >
                  <span className="relative flex h-5 w-5 items-center justify-center">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-brand border-2 border-white shadow-md" />
                  </span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-mono bg-white/95 px-2 py-0.5 rounded border border-rule shadow-sm text-brand font-medium">
                    Balconies
                  </span>
                </button>

                {/* Interactive Hotspot Trigger 4: Landscape Arrival */}
                <button
                  type="button"
                  onClick={() => setActiveHotspot("landscape")}
                  className="absolute bottom-[20%] right-[36%] z-20 group flex items-center gap-1.5 focus:outline-none"
                >
                  <span className="relative flex h-5 w-5 items-center justify-center">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-brand border-2 border-white shadow-md" />
                  </span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-mono bg-white/95 px-2 py-0.5 rounded border border-rule shadow-sm text-brand font-medium">
                    Arrival Court
                  </span>
                </button>
              </div>
            </div>
          )}

          {activeView === "slider" && (
            <div className="relative flex-1 w-full h-full flex flex-col items-center justify-center p-4">
              <div className="relative w-full h-full rounded-lg overflow-hidden flex items-center justify-center bg-[#f1f5f9]">
                <img
                  src="/work/optimized/isometric-blueprint-render.jpg"
                  alt="Interactive architectural reveal"
                  className="w-full h-full object-contain max-h-[300px]"
                />

                {/* Slider divider line */}
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-brand z-20 pointer-events-none"
                  style={{ left: `${sliderPos}%` }}
                >
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-brand text-white flex items-center justify-center text-[10px] font-bold shadow-lg border-2 border-white">
                    ↔
                  </div>
                </div>
              </div>

              {/* Slider Control Bar */}
              <div className="w-full mt-3 px-2 flex items-center gap-4">
                <span className="text-[11px] font-mono font-medium text-brand">CAD Blueprint (0%)</span>
                <input
                  type="range"
                  min="5"
                  max="95"
                  value={sliderPos}
                  onChange={(e) => setSliderPos(Number(e.target.value))}
                  className="flex-1 accent-brand cursor-pointer h-1.5 bg-[#e2e8f0] rounded-lg"
                />
                <span className="text-[11px] font-mono font-medium text-emerald-600">3D Render (100%)</span>
              </div>
            </div>
          )}

          {activeView === "materials" && (
            <div className="h-full p-4 grid grid-cols-2 gap-3 content-center">
              <div className="p-3.5 rounded-xl bg-[#f8f9fa] border border-rule shadow-xs">
                <div className="w-full h-8 rounded-lg bg-gradient-to-r from-slate-200 to-slate-400 mb-2 border border-rule" />
                <h5 className="text-[14px] font-display font-medium text-[#000000] mb-0.5">
                  Fluted Cast Concrete
                </h5>
                <p className="text-[10px] text-[#000000]/60">Micro-displacement formwork roughness 0.68</p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#f8f9fa] border border-rule shadow-xs">
                <div className="w-full h-8 rounded-lg bg-gradient-to-r from-amber-200 to-amber-700 mb-2 border border-rule" />
                <h5 className="text-[14px] font-display font-medium text-[#000000] mb-0.5">
                  Natural Teak Louvers
                </h5>
                <p className="text-[10px] text-[#000000]/60">Anisotropic reflections with warm timber oil</p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#f8f9fa] border border-rule shadow-xs">
                <div className="w-full h-8 rounded-lg bg-gradient-to-r from-sky-100 to-blue-200 mb-2 border border-rule" />
                <h5 className="text-[14px] font-display font-medium text-[#000000] mb-0.5">
                  Low-Iron Glass Balustrades
                </h5>
                <p className="text-[10px] text-[#000000]/60">94% transmission with crisp Fresnel reflection</p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#f8f9fa] border border-rule shadow-xs">
                <div className="w-full h-8 rounded-lg bg-gradient-to-r from-amber-300 via-orange-400 to-amber-500 mb-2 border border-rule" />
                <h5 className="text-[14px] font-display font-medium text-[#000000] mb-0.5">
                  2700K Warm Lighting
                </h5>
                <p className="text-[10px] text-[#000000]/60">Recessed ceiling & landscape architectural LEDs</p>
              </div>
            </div>
          )}

          {/* Blueprint Footer Indicator */}
          <div className="px-4 py-2 bg-white border-t border-rule flex items-center justify-between text-[10px] font-mono text-[#000000]/60">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Interactive Hotspots: Click pins to inspect spatial details
            </span>
            <span className="text-brand font-medium">Scale 1:100 Isometric</span>
          </div>
        </div>

        {/* Right Architectural Data & Specification Panel */}
        <div className="flex flex-col justify-between h-full gap-3.5">
          {/* Selected Hotspot Detail Card */}
          <div className="bg-white p-5 rounded-xl border border-rule shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-brand px-2 py-0.5 rounded bg-blue-50 border border-blue-200">
                {hotspots[activeHotspot as keyof typeof hotspots]?.category || "Architectural Zone"}
              </span>
              <span className="text-emerald-600 font-mono font-bold text-[11px]">
                Sub-mm Precision
              </span>
            </div>

            <h4 className="text-[18px] font-display font-medium text-[#000000] mb-1">
              {hotspots[activeHotspot as keyof typeof hotspots]?.title}
            </h4>
            <p className="text-[12px] text-[#000000]/70 leading-relaxed mb-4">
              {hotspots[activeHotspot as keyof typeof hotspots]?.desc}
            </p>

            <div className="p-2.5 bg-[#f8f9fa] rounded-lg border border-rule text-[11px] font-mono">
              <span className="text-[10px] text-[#000000]/50 block mb-0.5">Material & Lighting Spec</span>
              <span className="font-bold text-brand">{hotspots[activeHotspot as keyof typeof hotspots]?.spec}</span>
            </div>
          </div>

          {/* Quick Zone Selector Buttons */}
          <div className="grid grid-cols-2 gap-2">
            {[
              ["blueprint_core", "01 CAD Matrix"],
              ["pergola", "02 Roof Pergola"],
              ["balconies", "03 Balconies"],
              ["landscape", "04 Arrival Court"],
            ].map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => setActiveHotspot(id)}
                className={`py-2 px-2.5 rounded-lg border text-[11px] font-mono font-medium text-left truncate transition-all ${
                  activeHotspot === id
                    ? "bg-brand text-white border-brand shadow-xs"
                    : "bg-white text-[#000000]/80 border-rule hover:bg-[#f8f9fa]"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Bottom Engine Specs */}
          <div className="bg-white p-3 rounded-lg border border-rule flex items-center justify-between text-[11px] text-[#000000]/70">
            <span>Render Pipeline</span>
            <span className="font-mono text-emerald-600 font-semibold">Unreal 5.5 Lumen Raytracing</span>
          </div>
        </div>
      </div>

      {/* Clean Bottom Title Block */}
      <div className="relative z-10 px-6 py-2.5 border-t border-rule bg-white/90 flex items-center justify-between text-[11px] text-[#000000]/50 font-mono">
        <span className="flex items-center gap-1.5 text-brand font-medium">
          <span className="w-2 h-2 rounded-full bg-brand animate-ping" />
          Live Architectural Visualization Pipeline
        </span>
        <span>TechGy Link Architectural Studio • Hyderabad / London</span>
      </div>
    </div>
  );
}
