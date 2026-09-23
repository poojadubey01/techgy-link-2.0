"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { TECHGY_LOGO_PATHS } from "@/app/components/shared/techgy-logo-animation";

interface MockupSpec {
  id: string;
  name: string;
  category: string;
  medium: string;
  clearSpace: string;
  colorSpec: string;
  dimension: string;
}

const MOCKUP_DATA: Record<string, MockupSpec> = {
  desktop: {
    id: "desktop",
    name: "Enterprise Cloud & Web Platform",
    category: "Digital Platform",
    medium: "Retina P3 Wide Gamut • Scalable Vector Display",
    clearSpace: "2.0x X-Height Isolation Boundary",
    colorSpec: "#0022ff Electric Cobalt Primary",
    dimension: "3200 × 1962 px Liquid Retina",
  },
  mobile: {
    id: "mobile",
    name: "iOS & Android Mobile Application",
    category: "Mobile Ecosystem",
    medium: "OLED Super Retina • 1024px Super-Ellipse Icon",
    clearSpace: "1.5x Radius Margin",
    colorSpec: "#0022ff + Liquid White Contrast",
    dimension: "1179 × 2556 px • 460 ppi",
  },
  card: {
    id: "card",
    name: "600 GSM Cotton Visiting Card",
    category: "Corporate Print",
    medium: "Hot Metallic Cobalt Foil + Deep Deboss",
    clearSpace: "12mm Safety Foil Boundary",
    colorSpec: "Pantone 286 C Metallic Blue",
    dimension: "85 × 55 mm Standard Corporate",
  },
  paycard: {
    id: "paycard",
    name: "Black Titanium Corporate Card",
    category: "Physical Merchandise",
    medium: "Laser-Etched Titanium • Contactless NFC",
    clearSpace: "EMV Chip & Magstripe Isolation",
    colorSpec: "Obsidian Black + Laser Specular Core",
    dimension: "ISO/IEC 7810 ID-1 Standard",
  },
  cup: {
    id: "cup",
    name: "Executive Ceramic Drinkware",
    category: "Physical Collateral",
    medium: "Screen-Printed Matte Ceramic Enamel",
    clearSpace: "25mm Vessel Clearance Margin",
    colorSpec: "Heat-Cured Gloss Cobalt Decal",
    dimension: "12 oz High-Fired Porcelain",
  },
};

export function BrandingCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Progress: 0.0 (Master Hero Logo) -> 1.0 (Fully Split & Settled into Mockups)
  const [progress, setProgress] = useState<number>(0.85);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [hoveredItem, setHoveredItem] = useState<MockupSpec | null>(null);

  // Ambient GSAP glow animation
  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(".ambient-glow-left", {
        x: 35,
        y: -30,
        duration: 7,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(".ambient-glow-right", {
        x: -30,
        y: 25,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Cinematic Auto Tour loop
  useEffect(() => {
    if (!isPlaying) return;
    let forward = true;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 1) forward = false;
        else if (prev <= 0.02) forward = true;
        return forward ? Math.min(1, prev + 0.012) : Math.max(0, prev - 0.012);
      });
    }, 38);

    return () => clearInterval(interval);
  }, [isPlaying]);

  // Window scroll interaction: scrubs transformation as user scrolls through page
  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const windowH = window.innerHeight;
    // Maps when section enters to when it exits
    const scrollT = 1 - rect.top / (windowH * 0.72);
    if (scrollT >= 0 && scrollT <= 1.25) {
      setProgress(Math.max(0, Math.min(1, scrollT)));
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const clamp = (val: number, min = 0, max = 1) => Math.max(min, Math.min(max, val));

  // Transformation physics & keyframe interpolation (Outcrowd-reverse engineered)
  const t = progress;

  // 1. Master Central Logo (Dissolves and scales down as scroll proceeds)
  // At t=0: scale=1.5, opacity=1. At t=0.65: scale=0.15, opacity=0
  const masterScale = clamp(1.5 - t * 1.35, 0.1, 1.5);
  const masterOpacity = clamp(1 - (t - 0.12) / 0.42);

  // 2. Desktop Mockup (Center Stage)
  // Moves up and docks into place
  const desktopT = clamp((t - 0.15) / 0.55);
  const desktopY = 120 - desktopT * 120; // 120 -> 0px
  const desktopScale = 0.84 + desktopT * 0.16; // 0.84 -> 1.0
  const desktopOpacity = clamp((t - 0.1) / 0.35);

  // 3. Mobile Phone Mockup (Right Side)
  // Glides in from right
  const mobileT = clamp((t - 0.22) / 0.55);
  const mobileX = 380 - mobileT * 85; // 380 -> 295px
  const mobileY = 70 - mobileT * 75; // 70 -> -5px
  const mobileRot = 8 - mobileT * 5; // 8deg -> 3deg
  const mobileScale = 0.86 + mobileT * 0.14;
  const mobileOpacity = clamp((t - 0.15) / 0.35);

  // 4. Visiting Card (Lower-Left)
  // Slides up from bottom left
  const cardT = clamp((t - 0.26) / 0.55);
  const cardX = -320 + cardT * 60; // -320 -> -260px
  const cardY = 180 - cardT * 75; // 180 -> 105px
  const cardRot = -10 + cardT * 6; // -10deg -> -4deg
  const cardScale = 0.85 + cardT * 0.15;
  const cardOpacity = clamp((t - 0.2) / 0.35);

  // 5. Titanium Banking Card (Mid-Left)
  // Glides in from left
  const payT = clamp((t - 0.3) / 0.55);
  const payX = -340 + payT * 65; // -340 -> -275px
  const payY = -20 - payT * 55; // -20 -> -75px
  const payRot = 12 - payT * 7; // 12deg -> 5deg
  const payScale = 0.85 + payT * 0.15;
  const payOpacity = clamp((t - 0.22) / 0.35);

  // 6. Ceramic Mug (Upper-Left Accent)
  const mugT = clamp((t - 0.2) / 0.55);
  const mugX = -400 + mugT * 70; // -400 -> -330px
  const mugY = 80 - mugT * 60; // 80 -> 20px
  const mugRot = -12 + mugT * 8; // -12deg -> -4deg
  const mugScale = 0.84 + mugT * 0.16;
  const mugOpacity = clamp((t - 0.18) / 0.35);

  // 7. Flying Vector Particles / Split Trajectories (during transition)
  const isSplitting = t > 0.12 && t < 0.88;

  return (
    <div
      ref={containerRef}
      className="service-demo relative w-full h-full min-h-[720px] lg:min-h-[780px] bg-[#f8f9fa] text-[#000000] overflow-hidden flex flex-col justify-between select-none font-sans"
    >
      {/* Ambient Studio Lighting Nebulas */}
      <div className="ambient-glow-left absolute -top-32 -left-32 w-[520px] h-[520px] rounded-full bg-gradient-to-br from-blue-200/40 via-indigo-100/30 to-transparent blur-3xl pointer-events-none" />
      <div className="ambient-glow-right absolute -bottom-32 -right-32 w-[520px] h-[520px] rounded-full bg-gradient-to-tl from-blue-100/50 via-slate-100/40 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#0022ff06_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />

      {/* Elegant Editorial Canvas Header */}
      <div className="relative z-30 px-6 sm:px-10 pt-6 pb-2 flex items-center justify-between flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand animate-pulse" />
            <p className="text-[11px] font-mono uppercase tracking-[0.14em] text-brand font-bold">
              Brand Ecosystem • Outcrowd Architecture
            </p>
          </div>
          <h3 className="text-[24px] sm:text-[28px] font-display font-medium tracking-tight text-[#000000] mt-1">
            One Logo. Every Touchpoint.
          </h3>
        </div>

        {/* Floating Minimalist Tour Trigger */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-3.5 py-1.5 rounded-full bg-white text-brand border border-rule shadow-xs text-[11px] font-mono font-bold hover:bg-brand hover:text-white transition-all flex items-center gap-1.5"
          >
            <span>{isPlaying ? "❚❚ Pause Tour" : "▶ Auto Tour"}</span>
          </button>
          <span className="text-[11px] font-mono text-[#000000]/40 hidden sm:inline">
            Scroll page or scrub below
          </span>
        </div>
      </div>

      {/* Main 3D Transformation Studio Stage */}
      <div className="relative flex-1 w-full flex items-center justify-center p-4 overflow-hidden">
        <div className="relative w-full max-w-[1080px] h-[540px] flex items-center justify-center transform scale-[0.72] sm:scale-[0.85] md:scale-[0.95] lg:scale-[1.0] transition-transform origin-center">
          
          {/* =================================================================== */}
          {/* 1. MASTER CENTRAL TECHGY 3D LOGO (Scales & dissolves on scroll)     */}
          {/* =================================================================== */}
          <div
            style={{
              transform: `scale(${masterScale})`,
              opacity: masterOpacity,
              pointerEvents: masterOpacity > 0.05 ? "auto" : "none",
            }}
            className="absolute z-30 flex flex-col items-center justify-center will-change-transform"
          >
            <div className="relative">
              {/* Outer Calibration Ring */}
              <div className="absolute -inset-10 rounded-full border border-blue-200/50 border-dashed animate-[spin_30s_linear_infinite] pointer-events-none" />
              
              <svg
                width={220}
                height={220}
                viewBox="0 0 979 1014"
                className="filter drop-shadow-[0_22px_40px_rgba(0,34,255,0.35)]"
              >
                <defs>
                  <linearGradient id="techgyCobaltGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="25%" stopColor="#3b82f6" />
                    <stop offset="70%" stopColor="#0022ff" />
                    <stop offset="100%" stopColor="#001489" />
                  </linearGradient>
                  <linearGradient id="techgySilverGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#0b1329" />
                    <stop offset="50%" stopColor="#94a3b8" />
                    <stop offset="100%" stopColor="#ffffff" />
                  </linearGradient>
                </defs>

                {TECHGY_LOGO_PATHS.map((item, idx) => (
                  <path
                    key={item.id}
                    d={item.d}
                    fill={idx % 2 === 0 ? "url(#techgyCobaltGrad)" : "url(#techgySilverGrad)"}
                    stroke="rgba(255,255,255,0.7)"
                    strokeWidth={item.type === "node" ? "5" : "2"}
                  />
                ))}
              </svg>
            </div>

            <div className="mt-4 text-center">
              <h4 className="text-[22px] font-display font-medium tracking-tight text-[#000000]">
                TechGy Link Identity
              </h4>
              <p className="text-[12px] font-mono text-[#000000]/60 mt-0.5">
                Scroll to split into physical & digital ecosystem mockups
              </p>
            </div>
          </div>

          {/* =================================================================== */}
          {/* DYNAMIC PARTICLE TRAILS (Split energy arcs from center to devices)   */}
          {/* =================================================================== */}
          {isSplitting && (
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-25 overflow-visible">
              <defs>
                <linearGradient id="trailGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0022ff" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.2" />
                </linearGradient>
              </defs>
              <g style={{ transform: "translate(540px, 270px)" }}>
                {/* Arc to Desktop */}
                <path
                  d="M 0 0 Q 0 -60 0 -30"
                  stroke="url(#trailGrad)"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  fill="none"
                />
                {/* Arc to Phone */}
                <path
                  d={`M 0 0 Q 150 -40 ${mobileX} ${mobileY}`}
                  stroke="url(#trailGrad)"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  fill="none"
                />
                {/* Arc to Visiting Card */}
                <path
                  d={`M 0 0 Q -140 60 ${cardX} ${cardY}`}
                  stroke="url(#trailGrad)"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  fill="none"
                />
                {/* Arc to Paycard */}
                <path
                  d={`M 0 0 Q -150 -50 ${payX} ${payY}`}
                  stroke="url(#trailGrad)"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  fill="none"
                />
              </g>
            </svg>
          )}

          {/* =================================================================== */}
          {/* 2. CENTER PIECE: REAL PHOTOREALISTIC DESKTOP / TABLET SCREEN         */}
          {/* =================================================================== */}
          <div
            onMouseEnter={() => setHoveredItem(MOCKUP_DATA.desktop)}
            onMouseLeave={() => setHoveredItem(null)}
            style={{
              transform: `translate3d(0px, ${desktopY}px, 0px) scale(${desktopScale})`,
              opacity: desktopOpacity,
            }}
            className="absolute z-20 w-[580px] h-[355px] cursor-pointer transition-transform duration-300 hover:scale-[1.02] group will-change-transform"
          >
            {/* Real Studio Render Background Asset */}
            <div className="relative w-full h-full">
              <img
                src="/brand-mockups/desktop.webp"
                alt="TechGy Link Desktop Platform"
                className="w-full h-full object-contain filter drop-shadow-[0_28px_50px_rgba(0,0,0,0.22)]"
              />

              {/* Seamless TechGy Link Active Screen Overlay */}
              <div className="absolute top-[3%] bottom-[4%] left-[2.2%] right-[2.2%] rounded-[18px] overflow-hidden bg-gradient-to-br from-[#070d1e] via-[#0b1429] to-[#040815] p-5 flex flex-col justify-between text-white select-none border border-white/10 shadow-inner">
                {/* Screen Header Navbar */}
                <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                  <div className="flex items-center gap-2.5">
                    <img
                      src="/brand/logo.png"
                      alt="TechGy Link"
                      className="h-4.5 w-auto object-contain filter brightness-0 invert"
                    />
                    <span className="text-[8px] font-mono uppercase text-blue-300 font-bold bg-blue-500/20 px-2 py-0.5 rounded border border-blue-400/30">
                      P3 WIDE GAMUT
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-[9px] font-mono text-white/70">
                    <span>Platform</span>
                    <span>Solutions</span>
                    <span>Ecosystem</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-brand text-white font-bold text-[8px] shadow-xs">
                      Enterprise Core
                    </span>
                  </div>
                </div>

                {/* Screen Hero Centerpiece */}
                <div className="my-auto text-center py-2">
                  <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-gradient-to-br from-blue-600 to-brand flex items-center justify-center p-1.5 shadow-[0_0_25px_rgba(0,34,255,0.5)]">
                    <img
                      src="/brand/logo.png"
                      alt="TG"
                      className="w-full h-auto filter brightness-0 invert"
                    />
                  </div>
                  <h4 className="text-[17px] font-display font-medium tracking-tight text-white">
                    One Cohesive Brand System
                  </h4>
                  <p className="text-[9.5px] font-mono text-white/60 max-w-[340px] mx-auto mt-0.5">
                    Precision engineering applied across digital, print, and physical mediums.
                  </p>
                </div>

                {/* Telemetry Footer */}
                <div className="flex items-center justify-between text-[8px] font-mono text-white/50 border-t border-white/10 pt-2">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Status: System Docked & Synchronized
                  </span>
                  <span className="text-blue-300 font-bold">Retina 3200 × 1962</span>
                </div>
              </div>
            </div>
          </div>

          {/* =================================================================== */}
          {/* 3. RIGHT SIDE: REAL PHOTOREALISTIC SMARTPHONE (iPhone 16 Pro)       */}
          {/* =================================================================== */}
          <div
            onMouseEnter={() => setHoveredItem(MOCKUP_DATA.mobile)}
            onMouseLeave={() => setHoveredItem(null)}
            style={{
              transform: `translate3d(${mobileX}px, ${mobileY}px, 0px) rotate(${mobileRot}deg) scale(${mobileScale})`,
              opacity: mobileOpacity,
            }}
            className="absolute z-30 w-[170px] h-[340px] cursor-pointer transition-transform duration-300 hover:scale-105 will-change-transform"
          >
            <div className="relative w-full h-full">
              {/* Real Outcrowd Smartphone SVG Frame */}
              <img
                src="/brand-mockups/mobile_brand.svg"
                alt="TechGy Link Mobile App"
                className="w-full h-full object-contain filter drop-shadow-[0_24px_45px_rgba(0,0,0,0.28)]"
              />

              {/* Seamless TechGy Link Mobile App Interface */}
              <div className="absolute top-[4.2%] bottom-[4.2%] left-[7.5%] right-[7.5%] rounded-[26px] overflow-hidden bg-gradient-to-b from-[#f8faff] to-white p-2.5 flex flex-col justify-between select-none">
                {/* Dynamic Island */}
                <div className="w-14 h-3 bg-black rounded-full mx-auto flex items-center justify-end px-1.5 shadow-sm">
                  <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                </div>

                {/* Status Bar */}
                <div className="flex justify-between items-center text-[7.5px] font-mono text-slate-800 px-1 -mt-1">
                  <span className="font-bold">9:41</span>
                  <div className="flex items-center gap-1 text-[7px]">
                    <span>5G</span>
                    <span>100%</span>
                  </div>
                </div>

                {/* App Content */}
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div className="p-1.5 bg-white rounded-xl border border-rule shadow-xs flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-brand flex items-center justify-center p-1 shadow-sm shrink-0">
                      <img src="/brand/logo.png" alt="TG" className="w-full h-auto filter brightness-0 invert" />
                    </div>
                    <div className="truncate">
                      <span className="text-[8.5px] font-bold text-slate-900 block leading-tight">TechGy Link</span>
                      <span className="text-[7px] text-slate-400 font-mono">Mobile App</span>
                    </div>
                  </div>

                  {/* Brand Blue Metric Card */}
                  <div className="rounded-xl bg-gradient-to-br from-[#0022ff] to-[#001489] p-2 text-white shadow-xs">
                    <span className="text-[7px] uppercase font-mono tracking-wider text-blue-200">
                      Gamut
                    </span>
                    <h6 className="text-[10px] font-bold mt-0.5">
                      P3 Wide Color
                    </h6>
                    <div className="mt-1 flex items-center justify-between text-[7px] font-mono text-blue-200 pt-1 border-t border-white/20">
                      <span>460 PPI</span>
                      <span className="text-white font-bold">100% Vector</span>
                    </div>
                  </div>

                  <div className="text-center">
                    <span className="text-[7.5px] font-mono text-brand font-bold">
                      iOS 18 Native Ecosystem
                    </span>
                  </div>
                </div>

                {/* Home Indicator */}
                <div className="w-12 h-1 bg-black/40 rounded-full mx-auto" />
              </div>
            </div>
          </div>

          {/* =================================================================== */}
          {/* 4. LOWER-LEFT: REAL PHOTOREALISTIC COTTON VISITING CARD             */}
          {/* =================================================================== */}
          <div
            onMouseEnter={() => setHoveredItem(MOCKUP_DATA.card)}
            onMouseLeave={() => setHoveredItem(null)}
            style={{
              transform: `translate3d(${cardX}px, ${cardY}px, 0px) rotate(${cardRot}deg) scale(${cardScale})`,
              opacity: cardOpacity,
            }}
            className="absolute z-30 w-[195px] h-[125px] cursor-pointer transition-transform duration-300 hover:scale-105 will-change-transform"
          >
            <div className="relative w-full h-full">
              {/* Studio Rendered Visit Card */}
              <img
                src="/brand-mockups/visit_card.webp"
                alt="TechGy Link Visiting Card"
                className="w-full h-full object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.18)]"
              />

              {/* Overlaid TechGy Link Corporate Print Identity */}
              <div className="absolute top-[8%] bottom-[8%] left-[7%] right-[7%] flex flex-col justify-between p-2.5 select-none">
                <div className="flex justify-between items-start">
                  <div className="w-18">
                    <img src="/brand/logo.png" alt="TechGy Link" className="w-full h-auto filter drop-shadow-[0_1px_2px_rgba(0,34,255,0.3)]" />
                  </div>
                  <span className="text-[6.5px] font-mono text-brand font-bold border border-blue-200 bg-blue-50/90 px-1 py-0.2 rounded">
                    HOT FOIL
                  </span>
                </div>

                <div>
                  <p className="text-[8.5px] font-bold text-slate-900 leading-tight">
                    Phani Krishna
                  </p>
                  <p className="text-[6.5px] text-slate-500 font-mono">
                    Founder · TechGy Link
                  </p>
                  <p className="text-[6px] text-brand font-mono mt-0.5">
                    sales@techgylink.com • 600 GSM Cotton
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* =================================================================== */}
          {/* 5. MID-LEFT: REAL PHOTOREALISTIC TITANIUM CORPORATE PAYCARD          */}
          {/* =================================================================== */}
          <div
            onMouseEnter={() => setHoveredItem(MOCKUP_DATA.paycard)}
            onMouseLeave={() => setHoveredItem(null)}
            style={{
              transform: `translate3d(${payX}px, ${payY}px, 0px) rotate(${payRot}deg) scale(${payScale})`,
              opacity: payOpacity,
            }}
            className="absolute z-25 w-[190px] h-[130px] cursor-pointer transition-transform duration-300 hover:scale-105 will-change-transform"
          >
            <div className="relative w-full h-full">
              {/* Studio Rendered PayCard */}
              <img
                src="/brand-mockups/banking_card.webp"
                alt="TechGy Link Titanium PayCard"
                className="w-full h-full object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.3)]"
              />

              {/* Overlaid TechGy Link Laser Etched Branding */}
              <div className="absolute top-[8%] bottom-[8%] left-[7%] right-[7%] flex flex-col justify-between p-2.5 font-mono text-white select-none">
                <div className="flex justify-between items-center">
                  <div className="w-4.5 h-3 rounded-[2px] bg-gradient-to-br from-amber-200 to-amber-500 border border-amber-300 shadow-xs" />
                  <span className="text-[7.5px] font-bold text-blue-400">)))</span>
                </div>
                <div className="text-[7.5px] tracking-widest text-slate-300">
                  •••• 9042
                </div>
                <div className="flex justify-between items-end">
                  <span className="text-[6.5px] text-slate-400">CORPORATE PAY</span>
                  <span className="text-[7px] font-bold text-brand bg-white/95 px-1 rounded-[2px]">
                    TECHGY
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* =================================================================== */}
          {/* 6. FAR-LEFT ACCENT: REAL PHOTOREALISTIC CERAMIC DRINKWARE (MUG)     */}
          {/* =================================================================== */}
          <div
            onMouseEnter={() => setHoveredItem(MOCKUP_DATA.cup)}
            onMouseLeave={() => setHoveredItem(null)}
            style={{
              transform: `translate3d(${mugX}px, ${mugY}px, 0px) rotate(${mugRot}deg) scale(${mugScale})`,
              opacity: mugOpacity,
            }}
            className="absolute z-20 w-[125px] h-[115px] cursor-pointer transition-transform duration-300 hover:scale-105 will-change-transform"
          >
            <div className="relative w-full h-full">
              <img
                src="/brand-mockups/cup.webp"
                alt="TechGy Ceramic Mug"
                className="w-full h-full object-contain filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.2)]"
              />
              {/* Printed TechGy Emblem */}
              <div className="absolute top-[32%] left-[24%] w-9 h-9 rounded-full bg-gradient-to-br from-blue-600 to-brand flex items-center justify-center p-1 shadow-sm border border-white/20">
                <img
                  src="/brand/logo.png"
                  alt="TG"
                  className="w-full h-auto filter brightness-0 invert"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Discreet Design Tokens Specs Drawer (Appears when hovering or active) */}
      <div className="relative z-30 px-6 sm:px-10 pb-5 pt-2 flex items-center justify-between border-t border-rule bg-white/90 backdrop-blur-md flex-wrap gap-3">
        <div className="flex items-center gap-3 text-[11px] font-mono">
          <span className="font-bold text-brand">
            {hoveredItem ? hoveredItem.name : "TechGy Link Ecosystem"}
          </span>
          <span className="text-slate-400">•</span>
          <span className="text-slate-600">
            {hoveredItem ? hoveredItem.medium : "Hover any device or collateral to inspect design system tokens"}
          </span>
        </div>

        {/* Minimalist Scrub Control */}
        <div className="flex items-center gap-2.5 text-[11px] font-mono">
          <span className="text-slate-400">Scrub:</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={progress}
            onChange={(e) => {
              setIsPlaying(false);
              setProgress(parseFloat(e.target.value));
            }}
            className="w-24 sm:w-32 h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand"
          />
          <span className="font-bold text-brand w-8 text-right">
            {Math.round(progress * 100)}%
          </span>
        </div>
      </div>
    </div>
  );
}
