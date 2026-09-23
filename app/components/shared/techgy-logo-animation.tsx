"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export const TECHGY_LOGO_PATHS = [
  { id: "node_1", type: "node", name: "Bottom Node", d: "M525.434 905.011C543.258 872.799 586.738 858.157 620.09 872.932C676.667 898.356 680.583 975.693 626.571 1004.71C561.352 1039.59 490.056 969.303 525.434 905.011Z" },
  { id: "ribbon_2", type: "ribbon", name: "Lower Left Return", d: "M103.864 592.176C108.725 590.846 109.805 592.976 114.261 612.808C151.124 776.266 296.686 909.775 462.367 932.005L485.997 935.199V943.851C485.997 948.51 486.808 956.363 487.753 961.155L489.508 969.807L468.173 968.077C291.284 953.568 121.417 801.024 79.6934 619.464C74.2923 595.771 73.7526 597.234 86.9854 595.371C93.3317 594.439 100.894 592.975 103.864 592.176Z" },
  { id: "ribbon_3", type: "ribbon", name: "Outer Right Sweep", d: "M623.467 69.3591C624.413 69.4924 635.215 72.4202 647.773 76.1471C877.052 142.968 1017.48 370.852 969.683 599.001C940.921 736.236 850.181 856.034 725.684 921.258C695.302 937.23 695.032 937.23 693.007 923.121C692.062 916.865 690.576 909.144 689.631 905.95C688.281 901.025 690.307 899.028 704.484 891.973C802.516 843.122 886.774 745.82 921.882 640.531C996.418 417.44 864.089 172.518 635.214 110.223C623.602 107.029 618.336 104.367 618.336 101.438C618.471 91.4549 621.982 69.2259 623.467 69.3591Z" },
  { id: "ribbon_4", type: "ribbon", name: "Inner Right Helix", d: "M774.957 472.519C782.789 468.127 784.95 467.728 786.705 470.523C796.832 486.897 798.317 615.612 788.865 660.204C772.662 736.874 739.04 805.026 691.645 857.072L674.631 875.973L661.668 864.526L648.84 853.212L660.452 840.3C739.714 753.38 774.958 631.984 757.674 505.797C753.758 477.578 753.893 476.513 762.265 476.38C765.505 476.38 771.176 474.649 774.957 472.519Z" },
  { id: "ribbon_5", type: "ribbon", name: "Lower Swirl Connector", d: "M178.132 508.576C178.81 508.71 189.206 511.638 201.087 514.966C343.273 555.83 456.292 634.631 533.259 746.709C550.272 771.333 580.518 827.503 580.52 834.294C580.52 836.556 550.409 847.605 549.327 845.742C549.192 845.476 543.521 833.762 536.635 819.919C476.007 695.994 352.185 596.694 201.087 551.038C178.537 544.116 168.814 539.99 169.355 537.461C170.975 527.744 176.782 508.443 178.132 508.576Z" },
  { id: "node_6", type: "node", name: "Left Node", d: "M8.66214 527.385C-21.9895 469.084 33.6425 405.457 98.1866 425.024C117.631 430.881 138.561 452.312 144.502 472.677C169.617 558 49.9812 606.186 8.66214 527.385Z" },
  { id: "ribbon_7", type: "ribbon", name: "Horizontal Center Bridge", d: "M162.337 414.498C254.022 335.032 399.718 292.57 532.992 306.413C563.778 309.607 639.663 326.379 644.392 330.905C645.202 331.704 635.615 359.258 633.859 360.855C633.18 361.652 618.058 358.725 600.372 354.333C451.435 317.728 314.245 344.615 193.259 434.331L169.358 452.035L159.906 438.324L150.589 424.614L162.337 414.498Z" },
  { id: "node_8", type: "node", name: "Right Node", d: "M668.292 345.029C682.605 315.745 724.599 296.445 753.36 305.762C820.875 327.859 828.571 414.645 765.513 443.663C703.939 472.015 638.451 405.461 668.292 345.029Z" },
  { id: "ribbon_9", type: "ribbon", name: "Upper Left Arch", d: "M404.975 82.1276C404.975 88.9162 405.65 96.9033 406.46 99.8317C407.675 104.49 404.974 106.087 383.234 112.743C260.493 150.812 156.655 253.972 119.657 374.702C113.716 394.002 111.151 399.06 107.91 397.863C105.75 397.064 98.0528 395.067 91.0313 393.603C75.773 390.409 76.043 392.539 86.5752 360.06C131.405 221.36 258.603 102.094 393.497 72.278L404.975 69.7487V82.1276Z" },
  { id: "ribbon_10", type: "ribbon", name: "Upper Right Incline", d: "M605.226 132.048C606.308 130.718 617.785 139.636 630.611 152.014C662.613 182.763 720.945 260.632 720.945 272.745C720.944 274.342 715.814 277.137 709.468 278.734C703.122 280.464 696.101 282.594 693.67 283.526C690.429 284.724 686.378 280.331 677.871 266.089C659.912 236.272 628.856 197.271 606.306 176.24L585.647 156.806L594.423 145.625C599.149 139.502 604.01 133.379 605.226 132.048Z" },
  { id: "node_11", type: "node", name: "Top Node", d: "M435.23 73.5915C438.47 25.14 484.921 -9.6012 530.561 2.37858C593.079 18.618 611.038 93.4255 562.697 135.488C511.791 179.68 430.909 140.279 435.23 73.5915Z" },
];

interface TechgyLogoAnimationProps {
  size?: number;
  className?: string;
  interactive?: boolean;
  theme?: "platinum_blue" | "liquid_chrome" | "electric_cobalt" | "cyber_white";
  showGlow?: boolean;
  showControls?: boolean;
}

export function TechgyLogoAnimation({
  size = 440,
  className = "",
  interactive = true,
  theme = "platinum_blue",
  showGlow = true,
  showControls = true,
}: TechgyLogoAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoGroupRef = useRef<SVGGElement>(null);
  const [activeTheme, setActiveTheme] = useState(theme);
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, lightX: 50, lightY: 50 });

  useEffect(() => {
    setActiveTheme(theme);
  }, [theme]);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Continuous Organic 3D Floating & Breathing Loop (Sine Wave)
      gsap.to(".techgy-3d-floating-rig", {
        y: -14,
        rotateZ: 1.5,
        duration: 3.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".techgy-3d-breathing-scale", {
        scale: 1.025,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // 2. Liquid Specular Gleams sweeping along the 7 ribbons with staggered delay
      gsap.to(".specular-sweep-primary", {
        x: "220%",
        y: "180%",
        duration: 2.6,
        repeat: -1,
        ease: "power2.inOut",
        repeatDelay: 0.5,
        stagger: 0.18,
      });

      gsap.to(".specular-sweep-secondary", {
        x: "-200%",
        y: "-160%",
        duration: 3.2,
        repeat: -1,
        ease: "power2.inOut",
        repeatDelay: 0.8,
        stagger: 0.22,
      });

      // 3. Four Sphere Nodes - Breathing & Metallic Catchlight Shimmer
      gsap.to(".sphere-node-glow", {
        scale: 1.08,
        opacity: 0.95,
        duration: 2.1,
        repeat: -1,
        yoyo: true,
        stagger: 0.35,
        ease: "sine.inOut",
        transformOrigin: "center center",
      });

      // 4. Orbital Energy Rings - Counter-rotating in 3D Perspective
      gsap.to(".orbital-ring-outer", {
        rotation: 360,
        transformOrigin: "489px 507px",
        duration: 24,
        repeat: -1,
        ease: "none",
      });

      gsap.to(".orbital-ring-inner", {
        rotation: -360,
        transformOrigin: "489px 507px",
        duration: 18,
        repeat: -1,
        ease: "none",
      });

      // 5. Pulsing Ambient Luminescence Core
      gsap.to(".ambient-glow-core", {
        scale: 1.25,
        opacity: 0.75,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, [activeTheme]);

  // Interactive 3D Cursor Parallax Physics
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rotX = -(y / (rect.height / 2)) * 16;
    const rotY = (x / (rect.width / 2)) * 16;
    const lightPercentX = 50 + (x / (rect.width / 2)) * 35;
    const lightPercentY = 50 + (y / (rect.height / 2)) * 35;

    setTilt({
      rotateX: rotX,
      rotateY: rotY,
      lightX: lightPercentX,
      lightY: lightPercentY,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0, lightX: 50, lightY: 50 });
    setIsHovered(false);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: "1200px" }}
      className={`relative w-full min-w-0 flex flex-col items-center justify-center select-none ${className}`}
    >
      {/* Dynamic 3D Transform Anchor */}
      <div
        style={{
          transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(${isHovered ? 1.04 : 1})`,
          transition: isHovered
            ? "transform 0.15s cubic-bezier(0.2, 0.8, 0.2, 1)"
            : "transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
          transformStyle: "preserve-3d",
        }}
        className="techgy-3d-floating-rig relative max-w-full flex items-center justify-center"
      >
        {/* Ambient Halo & Energy Diffusion */}
        {showGlow && (
          <div
            className="ambient-glow-core absolute w-[420px] h-[420px] rounded-full blur-[72px] pointer-events-none transition-all duration-700"
            style={{
              background:
                activeTheme === "platinum_blue"
                  ? "radial-gradient(circle, rgba(0,34,255,0.22) 0%, rgba(56,189,248,0.15) 45%, transparent 75%)"
                  : activeTheme === "liquid_chrome"
                  ? "radial-gradient(circle, rgba(203,213,225,0.28) 0%, rgba(148,163,184,0.18) 45%, transparent 75%)"
                  : activeTheme === "electric_cobalt"
                  ? "radial-gradient(circle, rgba(0,34,255,0.32) 0%, rgba(11,19,41,0.25) 50%, transparent 80%)"
                  : "radial-gradient(circle, rgba(255,255,255,0.35) 0%, rgba(203,213,225,0.2) 50%, transparent 75%)",
            }}
          />
        )}

        {/* ========================================================================= */}
        {/* TECHGY 3D METALLIC VECTOR EMBLEM ENGINE (EXACT 979x1014 GEOMETRY)         */}
        {/* ========================================================================= */}
        <svg
          width={size}
          height={size * (1014 / 979)}
          viewBox="-40 -40 1059 1094"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="techgy-3d-breathing-scale max-w-full h-auto relative z-10 overflow-visible drop-shadow-[0_24px_38px_rgba(0,34,255,0.14)]"
        >
          <defs>
            {/* 3D Surface Bevel & Specular Lighting Filter */}
            <filter id="techgy-3d-specular-bevel" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="3.5" result="blur" />
              <feSpecularLighting
                in="blur"
                surfaceScale="6"
                specularConstant="1.4"
                specularExponent="28"
                lightingColor="#ffffff"
                result="specularLight"
              >
                <fePointLight x={tilt.lightX * 10} y={tilt.lightY * 10} z="220" />
              </feSpecularLighting>
              <feComposite in="specularLight" in2="SourceAlpha" operator="in" result="specularCut" />
              <feComposite in="SourceGraphic" in2="specularCut" operator="arithmetic" k1="0" k2="1" k3="0.85" k4="0" />
            </filter>

            {/* Depth Drop Shadow Filter for Layer Elevation */}
            <filter id="techgy-depth-shadow" x="-25%" y="-25%" width="150%" height="150%">
              <feDropShadow dx="0" dy="12" stdDeviation="14" floodColor="#0b1329" floodOpacity="0.22" />
            </filter>

            {/* =================================================================== */}
            {/* COLOR PALETTE GRADIENT SHADERS (TECHGY BRAND SYSTEM)               */}
            {/* =================================================================== */}

            {/* Theme 1: Platinum Electric Blue (Default) */}
            <linearGradient id="tg-grad-ribbon-main" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0022ff" />
              <stop offset="28%" stopColor="#2563eb" />
              <stop offset="52%" stopColor="#ffffff" />
              <stop offset="76%" stopColor="#cbd5e1" />
              <stop offset="100%" stopColor="#0022ff" />
            </linearGradient>

            <linearGradient id="tg-grad-ribbon-outer" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#001cd4" />
              <stop offset="35%" stopColor="#38bdf8" />
              <stop offset="55%" stopColor="#ffffff" />
              <stop offset="78%" stopColor="#0022ff" />
              <stop offset="100%" stopColor="#0b1329" />
            </linearGradient>

            <radialGradient id="tg-grad-node-sphere" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="30%" stopColor="#93c5fd" />
              <stop offset="65%" stopColor="#0022ff" />
              <stop offset="100%" stopColor="#0b1329" />
            </radialGradient>

            {/* Theme 2: Liquid Platinum Silver Chrome */}
            <linearGradient id="tg-grad-chrome-main" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#94a3b8" />
              <stop offset="25%" stopColor="#f8fafc" />
              <stop offset="48%" stopColor="#ffffff" />
              <stop offset="72%" stopColor="#cbd5e1" />
              <stop offset="100%" stopColor="#64748b" />
            </linearGradient>

            <radialGradient id="tg-grad-chrome-node" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="40%" stopColor="#e2e8f0" />
              <stop offset="80%" stopColor="#94a3b8" />
              <stop offset="100%" stopColor="#475569" />
            </radialGradient>

            {/* Theme 3: Deep Obsidian Cobalt */}
            <linearGradient id="tg-grad-cobalt-main" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#050b18" />
              <stop offset="35%" stopColor="#0022ff" />
              <stop offset="60%" stopColor="#60a5fa" />
              <stop offset="85%" stopColor="#0b1329" />
              <stop offset="100%" stopColor="#020617" />
            </linearGradient>

            {/* Theme 4: Pure Specular Luminescent White */}
            <linearGradient id="tg-grad-white-main" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="30%" stopColor="#e2e8f0" />
              <stop offset="55%" stopColor="#93c5fd" />
              <stop offset="80%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#cbd5e1" />
            </linearGradient>

            {/* Dynamic Specular Light Beam Gleam Shaders */}
            <linearGradient id="specular-gleam-beam-1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="40%" stopColor="#ffffff" stopOpacity="0.15" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="60%" stopColor="#38bdf8" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>

            <linearGradient id="specular-gleam-beam-2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="45%" stopColor="#ffffff" stopOpacity="0.85" />
              <stop offset="55%" stopColor="#93c5fd" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>

            {/* Path Clip Masks for Dynamic Specular Tracing */}
            <clipPath id="techgy-full-logo-clip">
              {TECHGY_LOGO_PATHS.map((p) => (
                <path key={p.id} d={p.d} />
              ))}
            </clipPath>
          </defs>

          {/* =================================================================== */}
          {/* ORBITAL ENERGY RINGS (3D CELESTIAL ALIGNMENT)                      */}
          {/* =================================================================== */}
          <g opacity="0.65">
            <circle
              cx="489"
              cy="507"
              r="480"
              stroke="url(#tg-grad-ribbon-main)"
              strokeWidth="1.5"
              strokeDasharray="8 14 2 12"
              fill="none"
              className="orbital-ring-outer opacity-40"
            />
            <circle
              cx="489"
              cy="507"
              r="420"
              stroke="#0022ff"
              strokeWidth="1"
              strokeDasharray="4 8"
              fill="none"
              className="orbital-ring-inner opacity-30"
            />
            <circle
              cx="489"
              cy="507"
              r="515"
              stroke="#cbd5e1"
              strokeWidth="0.8"
              strokeDasharray="1 12"
              fill="none"
              className="orbital-ring-outer opacity-50"
            />
          </g>

          {/* =================================================================== */}
          {/* LAYER 1: 3D DEPTH SHADOWS                                           */}
          {/* =================================================================== */}
          <g filter="url(#techgy-depth-shadow)" opacity="0.45">
            {TECHGY_LOGO_PATHS.map((p) => (
              <path key={`shadow-${p.id}`} d={p.d} fill="#0b1329" />
            ))}
          </g>

          {/* =================================================================== */}
          {/* LAYER 2: METALLIC CHROMATIC BASE WITH SURFACE LIGHTING             */}
          {/* =================================================================== */}
          <g ref={logoGroupRef} filter="url(#techgy-3d-specular-bevel)">
            {TECHGY_LOGO_PATHS.map((p, index) => {
              const isNode = p.type === "node";
              let fillUrl = "url(#tg-grad-ribbon-main)";

              if (activeTheme === "liquid_chrome") {
                fillUrl = isNode ? "url(#tg-grad-chrome-node)" : "url(#tg-grad-chrome-main)";
              } else if (activeTheme === "electric_cobalt") {
                fillUrl = isNode ? "url(#tg-grad-node-sphere)" : "url(#tg-grad-cobalt-main)";
              } else if (activeTheme === "cyber_white") {
                fillUrl = isNode ? "url(#tg-grad-chrome-node)" : "url(#tg-grad-white-main)";
              } else {
                fillUrl = isNode
                  ? "url(#tg-grad-node-sphere)"
                  : index % 2 === 0
                  ? "url(#tg-grad-ribbon-main)"
                  : "url(#tg-grad-ribbon-outer)";
              }

              return (
                <path
                  key={`base-${p.id}`}
                  d={p.d}
                  fill={fillUrl}
                  className={isNode ? "sphere-node-glow transition-all duration-300" : "transition-all duration-300"}
                  style={{
                    transformOrigin: isNode ? "center center" : undefined,
                  }}
                />
              );
            })}
          </g>

          {/* =================================================================== */}
          {/* LAYER 3: DYNAMIC LIQUID SPECULAR GLEAM BEAMS (DRIBBLE EFFECT)       */}
          {/* =================================================================== */}
          <g clipPath="url(#techgy-full-logo-clip)" className="pointer-events-none">
            {/* Primary High-Speed Specular Sweep */}
            <rect
              x="-500"
              y="-500"
              width="700"
              height="1800"
              transform="rotate(-35 489 507)"
              fill="url(#specular-gleam-beam-1)"
              className="specular-sweep-primary mix-blend-overlay"
            />

            {/* Secondary High-Specular Glint Sweep */}
            <rect
              x="1000"
              y="1000"
              width="500"
              height="1600"
              transform="rotate(45 489 507)"
              fill="url(#specular-gleam-beam-2)"
              className="specular-sweep-secondary mix-blend-color-dodge"
            />
          </g>

          {/* =================================================================== */}
          {/* LAYER 4: SPHERE NODE SPECULAR HIGHLIGHT ACCENTS                    */}
          {/* =================================================================== */}
          <g pointerEvents="none">
            {/* Node 11 (Top Node Accent) */}
            <circle cx="505" cy="72" r="22" fill="#ffffff" opacity="0.75" filter="blur(4px)" />
            <circle cx="502" cy="68" r="8" fill="#ffffff" opacity="0.95" />

            {/* Node 8 (Right Node Accent) */}
            <circle cx="738" cy="370" r="20" fill="#ffffff" opacity="0.75" filter="blur(4px)" />
            <circle cx="735" cy="366" r="7" fill="#ffffff" opacity="0.95" />

            {/* Node 1 (Bottom Node Accent) */}
            <circle cx="590" cy="935" r="22" fill="#ffffff" opacity="0.75" filter="blur(4px)" />
            <circle cx="586" cy="931" r="8" fill="#ffffff" opacity="0.95" />

            {/* Node 6 (Left Node Accent) */}
            <circle cx="75" cy="495" r="18" fill="#ffffff" opacity="0.75" filter="blur(4px)" />
            <circle cx="72" cy="491" r="6" fill="#ffffff" opacity="0.95" />
          </g>
        </svg>
      </div>

      {/* Theme & Motion Interactive Selector Toolbar */}
      {showControls && (
        <div className="relative z-20 mt-8 flex flex-wrap items-center justify-center gap-2 bg-white/90 backdrop-blur-md p-1.5 rounded-2xl border border-rule shadow-sm text-[12px] font-mono">
          <button
            type="button"
            onClick={() => setActiveTheme("platinum_blue")}
            className={`px-3.5 py-1.5 rounded-full transition-all flex items-center gap-2 font-bold ${
              activeTheme === "platinum_blue"
                ? "bg-brand text-white shadow-xs"
                : "text-[#000000]/70 hover:text-brand hover:bg-[#f1f5f9]"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#38bdf8]" />
            Platinum Blue
          </button>

          <button
            type="button"
            onClick={() => setActiveTheme("liquid_chrome")}
            className={`px-3.5 py-1.5 rounded-full transition-all flex items-center gap-2 font-bold ${
              activeTheme === "liquid_chrome"
                ? "bg-slate-900 text-white shadow-xs"
                : "text-[#000000]/70 hover:text-slate-900 hover:bg-[#f1f5f9]"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-slate-300" />
            Liquid Chrome
          </button>

          <button
            type="button"
            onClick={() => setActiveTheme("electric_cobalt")}
            className={`px-3.5 py-1.5 rounded-full transition-all flex items-center gap-2 font-bold ${
              activeTheme === "electric_cobalt"
                ? "bg-[#0b1329] text-white shadow-xs"
                : "text-[#000000]/70 hover:text-[#0b1329] hover:bg-[#f1f5f9]"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#0022ff]" />
            Obsidian Cobalt
          </button>

          <button
            type="button"
            onClick={() => setActiveTheme("cyber_white")}
            className={`px-3.5 py-1.5 rounded-full transition-all flex items-center gap-2 font-bold ${
              activeTheme === "cyber_white"
                ? "bg-slate-100 text-slate-900 border border-slate-300 shadow-xs"
                : "text-[#000000]/70 hover:text-slate-900 hover:bg-[#f1f5f9]"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-white border border-slate-400" />
            Specular White
          </button>
        </div>
      )}
    </div>
  );
}
