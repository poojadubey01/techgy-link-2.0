"use client";
import { useState } from "react";
import { TechgyLogoAnimation } from "@/app/components/shared/techgy-logo-animation";

export function BrandingCanvas() {
  const [activeTab, setActiveTab] = useState<"logo_anim" | "brand_tokens" | "geometry_specs">("logo_anim");

  return (
    <div className="relative w-full h-full min-h-[620px] bg-[#f8f9fa] text-[#000000] overflow-hidden flex flex-col select-none border-l border-rule/50 font-sans">
      {/* Background Dots Matrix */}
      <div className="absolute inset-0 bg-[radial-gradient(#0022ff0f_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      {/* Top Toolbar */}
      <div className="relative z-20 flex items-center justify-between px-6 py-3 border-b border-rule bg-white/95 backdrop-blur-md max-[767px]:flex-col max-[767px]:gap-2.5 max-[767px]:items-start">
        <div className="flex items-center gap-2.5 text-[12px] font-mono text-[#000000]/70">
          <span className="w-2.5 h-2.5 rounded-full bg-brand animate-pulse" />
          <span className="font-bold text-brand uppercase tracking-wider">TechGy Brand System</span>
          <span className="text-[#000000]/40 text-[11px]">/ 3D Motion Identity</span>
        </div>

        {/* View Mode Switcher Tabs */}
        <div className="flex items-center gap-1 bg-[#e2e8f0]/60 p-0.5 rounded-lg border border-rule text-[11px] font-mono">
          <button
            type="button"
            onClick={() => setActiveTab("logo_anim")}
            className={`px-3 py-1.5 rounded-md transition-all font-bold ${
              activeTab === "logo_anim"
                ? "bg-white text-brand shadow-xs border border-rule/50"
                : "text-[#000000]/60 hover:text-[#000000]"
            }`}
          >
            3D Logo Motion
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("brand_tokens")}
            className={`px-3 py-1.5 rounded-md transition-all font-bold ${
              activeTab === "brand_tokens"
                ? "bg-white text-brand shadow-xs border border-rule/50"
                : "text-[#000000]/60 hover:text-[#000000]"
            }`}
          >
            Color Tokens
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("geometry_specs")}
            className={`px-3 py-1.5 rounded-md transition-all font-bold ${
              activeTab === "geometry_specs"
                ? "bg-white text-brand shadow-xs border border-rule/50"
                : "text-[#000000]/60 hover:text-[#000000]"
            }`}
          >
            Vector Geometry
          </button>
        </div>
      </div>

      {/* Main Canvas Body */}
      <div className="relative z-10 flex-1 p-6 flex flex-col items-center justify-center overflow-hidden">
        {activeTab === "logo_anim" && (
          <div className="w-full h-full flex flex-col items-center justify-center py-4">
            <TechgyLogoAnimation size={400} interactive={true} showGlow={true} showControls={true} />
          </div>
        )}

        {activeTab === "brand_tokens" && (
          <div className="w-full max-w-[620px] grid grid-cols-2 gap-4 max-[640px]:grid-cols-1">
            <div className="p-4 rounded-xl bg-white border border-rule shadow-sm">
              <div className="w-full h-16 rounded-lg bg-[#0022ff] mb-3 shadow-sm flex items-end p-2 text-white font-mono text-[10px] font-bold">
                TechGy Electric Blue
              </div>
              <h5 className="font-bold text-[13px] text-[#000000]">Brand Primary Blue</h5>
              <p className="text-[11px] font-mono text-[#000000]/60">HEX: #0022ff • RGB(0, 34, 255)</p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-rule shadow-sm">
              <div className="w-full h-16 rounded-lg bg-gradient-to-r from-slate-200 via-slate-100 to-white mb-3 border border-rule shadow-sm flex items-end p-2 text-slate-800 font-mono text-[10px] font-bold">
                Liquid Platinum Silver
              </div>
              <h5 className="font-bold text-[13px] text-[#000000]">Platinum Silver Metallic</h5>
              <p className="text-[11px] font-mono text-[#000000]/60">HEX: #cbd5e1 • Specular 0.95</p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-rule shadow-sm">
              <div className="w-full h-16 rounded-lg bg-[#0b1329] mb-3 shadow-sm flex items-end p-2 text-white font-mono text-[10px] font-bold">
                Deep Cobalt Navy
              </div>
              <h5 className="font-bold text-[13px] text-[#000000]">Deep Obsidian Cobalt</h5>
              <p className="text-[11px] font-mono text-[#000000]/60">HEX: #0b1329 • Shadow Core</p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-rule shadow-sm">
              <div className="w-full h-16 rounded-lg bg-white mb-3 border border-rule shadow-sm flex items-end p-2 text-slate-900 font-mono text-[10px] font-bold">
                Pure Specular White
              </div>
              <h5 className="font-bold text-[13px] text-[#000000]">Platinum Pure White</h5>
              <p className="text-[11px] font-mono text-[#000000]/60">HEX: #ffffff • 100% Luminescence</p>
            </div>
          </div>
        )}

        {activeTab === "geometry_specs" && (
          <div className="w-full max-w-[620px] bg-white p-6 rounded-xl border border-rule shadow-sm font-mono text-[11px] space-y-3.5">
            <div className="flex justify-between border-b border-rule/60 pb-2.5">
              <span className="text-[#000000]/50">Original Brand Geometry:</span>
              <span className="font-bold text-brand">TechGy Link 979×1014 Vector Rig</span>
            </div>
            <div className="flex justify-between border-b border-rule/60 pb-2.5">
              <span className="text-[#000000]/50">Ribbon & Node Topology:</span>
              <span className="font-bold text-slate-800">7 Interlocking Helixes + 4 Orbital Spheres</span>
            </div>
            <div className="flex justify-between border-b border-rule/60 pb-2.5">
              <span className="text-[#000000]/50">Surface Shader:</span>
              <span className="font-bold text-slate-800">Dual High-Speed Specular Gleam Beams</span>
            </div>
            <div className="flex justify-between border-b border-rule/60 pb-2.5">
              <span className="text-[#000000]/50">Motion Engine:</span>
              <span className="font-bold text-emerald-600">60 FPS GSAP Sine Wave Orbit</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#000000]/50">3D Parallax Tracking:</span>
              <span className="font-bold text-purple-600">Dynamic Perspective Cursor Tilt (±16°)</span>
            </div>
          </div>
        )}
      </div>

      {/* Clean Footer Meta Badge */}
      <div className="relative z-10 px-6 py-2.5 border-t border-rule bg-white/95 flex items-center justify-between text-[11px] text-[#000000]/50 font-mono max-[767px]:flex-col max-[767px]:gap-1 max-[767px]:items-start">
        <span className="flex items-center gap-1.5 font-bold text-brand">
          <span className="w-2 h-2 rounded-full bg-brand animate-ping" />
          TechGy Link Brand Identity Studio
        </span>
        <span>Electric Blue • Liquid Silver • Platinum White • Obsidian Cobalt</span>
      </div>
    </div>
  );
}
