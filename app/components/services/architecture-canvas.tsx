"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export function ArchitectureCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  // The Vintage Living Room Model Specifications
  const vintageRoom = {
    name: "Modular Vintage Living Room",
    subtitle: "High-Fidelity Architectural 3D Visualization",
    modelId: "d83c3f837bae4c9aa52fafc476500386",
    category: "Interior Architecture & 3D Modeling",
    polyCount: "142,800 Polygons",
    materials: "4K Photorealistic Textures & Shaders",
    description:
      "Architectural-grade vintage modular living room modeled in 3ds Max featuring antique Chesterfield leather upholstery, bespoke walnut wood joinery, brass hardware, and physical illumination.",
    specs: [
      { label: "Modeling Suite:", value: "Autodesk 3ds Max" },
      { label: "Render Engine:", value: "V-Ray / Corona Renderer" },
      { label: "Flooring System:", value: "French Chevron White Oak Parquet" },
      { label: "Lighting Array:", value: "2700K Warm Architectural Ambient" },
      { label: "Wall Detailing:", value: "CNC Fluted Wainscoting Paneling" },
      { label: "Model Mesh Quality:", value: "High-Poly Sub-D (LOD 0)" },
    ],
  };

  // GSAP Ambient Orbs
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(".arch-ambient-orb", {
        x: 15,
        y: -10,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="service-demo relative w-full h-full min-h-[600px] bg-[#f8f9fa] text-[#000000] overflow-hidden flex flex-col select-none rounded-md border-l border-rule/50 font-sans"
    >
      {/* Background Architectural Grid Matrix */}
      <div className="arch-ambient-orb absolute -top-20 -right-20 w-96 h-96 rounded-full bg-blue-100/40 blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0022ff08_1px,transparent_1px),linear-gradient(to_bottom,#0022ff08_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />

      {/* Top Architectural Studio Control Bar */}
      <div className="demo-row demo-toolbar relative z-20 flex items-center justify-between px-6 py-3.5 border-b border-rule bg-white/95 backdrop-blur-md flex-wrap gap-2">
        <div className="flex items-center gap-2.5 text-[12px] font-mono">
          <span className="w-2.5 h-2.5 rounded-full bg-brand animate-pulse" />
          <span className="font-bold text-brand uppercase tracking-wider">Arch 3D Studio</span>
          <span className="text-[#000000]/40 text-[11px]">/ 3ds Max Interactive 3D WebGL</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-mono font-bold flex items-center gap-1.5 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            3D WebGL Active • 60 FPS
          </span>
          <span className="px-2.5 py-1 rounded-md bg-blue-50 text-brand border border-blue-200 text-[11px] font-mono font-bold shadow-xs">
            3ds Max • 142.8k Poly
          </span>
        </div>
      </div>

      {/* Main Interactive Studio Grid */}
      <div className="demo-body relative z-10 flex-1 p-5 grid grid-cols-[1.5fr_0.85fr] gap-4 items-stretch overflow-hidden max-[1024px]:grid-cols-1">
        
        {/* Left 3D WebGL Viewport Stage */}
        <div className="relative w-full h-full min-h-[460px] bg-[#090d16] rounded-xl border border-rule shadow-sm overflow-hidden flex flex-col justify-between">
          
          {/* Top Viewport Header Info */}
          <div className="absolute top-3 left-4 right-4 z-30 flex justify-between items-center text-[10px] font-mono pointer-events-none">
            <span className="px-2.5 py-1 rounded bg-black/85 backdrop-blur-md border border-white/15 text-white font-bold flex items-center gap-1.5 shadow-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              REAL-TIME 3D WEBGL • 360° ORBIT / PAN / ZOOM
            </span>

            <span className="px-2.5 py-1 rounded bg-black/85 backdrop-blur-md border border-white/15 text-white font-bold tracking-wider shadow-md">
              3DS MAX ARCH-VIZ
            </span>
          </div>

          {/* 3D WebGL Frame Wrapper (Strictly cropped with 80px bottom offset to hide all Sketchfab icons & settings gears) */}
          <div className="relative w-full h-full flex-1 min-h-[400px] overflow-hidden bg-[#090d16]">
            <iframe
              title={vintageRoom.name}
              className="w-full h-[calc(100%+80px)] border-0 absolute top-0 left-0 right-0 pointer-events-auto"
              src={`https://sketchfab.com/models/${vintageRoom.modelId}/embed?autostart=1&internal=1&tracking=0&ui_infos=0&ui_watermark_link=0&ui_watermark=0&ui_hint=0&ui_help=0&ui_settings=0&ui_inspector=0&ui_annotations=0&ui_controls=0&ui_general_controls=0&ui_vr=0&ui_ar=0&ui_fade=0&ui_theme=dark&ui_stop=0`}
              allow="autoplay; fullscreen; xr-spatial-tracking"
              allowFullScreen
            />
          </div>

          {/* Bottom Viewport Status & Navigation Controls Hint */}
          <div className="demo-row relative z-30 px-4 py-3 bg-[#090d16] border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/90 shadow-lg">
            <span className="text-white font-medium flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand" />
              Left Click: Orbit • Right Click: Pan • Scroll: Zoom
            </span>
            <span className="text-emerald-400 font-semibold">Autodesk 3ds Max LOD 0</span>
          </div>
        </div>

        {/* Right Architectural Data & Specification Panel */}
        <div className="flex flex-col justify-between h-full gap-3.5">
          
          {/* Main Selected Zone Card */}
          <div className="bg-white p-6 rounded-xl border border-rule shadow-sm flex flex-col justify-between flex-1">
            <div>
              <div className="demo-row flex flex-wrap items-center justify-between gap-2 mb-3">
                <span className="min-w-0 text-[10px] font-mono uppercase tracking-[0.12em] leading-snug text-brand px-2.5 py-1 rounded bg-blue-50 border border-blue-200 font-bold">
                  {vintageRoom.category}
                </span>
                <span className="shrink-0 text-emerald-600 font-mono font-bold text-[11px]">
                  3ds Max Production
                </span>
              </div>

              <h4 className="text-[20px] font-display font-medium text-[#000000] mb-2">
                {vintageRoom.name}
              </h4>

              <p className="text-[13px] text-[#000000]/70 leading-relaxed mb-5">
                {vintageRoom.description}
              </p>
            </div>

            {/* Architecture Specifications Matrix */}
            <div className="p-4 bg-[#f8f9fa] rounded-lg border border-rule text-[11px] font-mono space-y-2.5">
              {vintageRoom.specs.map((spec, i) => (
                <div key={i} className="flex justify-between gap-3 border-b border-rule/50 pb-2 last:border-0 last:pb-0">
                  <span className="shrink-0 whitespace-nowrap text-[#000000]/50">{spec.label}</span>
                  <span className="min-w-0 text-right font-bold text-slate-800">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Render Pipeline Banner */}
          <div className="demo-row bg-white p-4 rounded-xl border border-rule shadow-sm flex items-center justify-between text-[11px] font-mono">
            <span className="text-[#000000]/60">Visualization Pipeline</span>
            <span className="text-brand font-bold">3ds Max + V-Ray Studio</span>
          </div>
        </div>
      </div>

      {/* Clean Bottom Title Block */}
      <div className="demo-row demo-footer relative z-10 px-6 py-2.5 border-t border-rule bg-white/95 flex items-center justify-between text-[11px] text-[#000000]/50 font-mono">
        <span className="flex items-center gap-1.5 text-brand font-bold">
          <span className="w-2 h-2 rounded-full bg-brand animate-ping" />
          TechGy Link Architectural Studio Visualizer
        </span>
        <span>Autodesk 3ds Max • V-Ray • Corona Renderer • 3D WebGL</span>
      </div>
    </div>
  );
}
