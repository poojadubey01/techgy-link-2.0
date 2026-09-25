"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Link from "@/app/components/ui/internal-link";
import { enquiry } from "@/data/catalogue";

const SEARCH_PHRASES = [
  "Search platforms, design tokens, APIs...",
  "Search wireframes, user flows, workflows...",
  "Search design systems, iOS & Android exports...",
  "Search cross-device analytics, UI components...",
];

export function DigitalExperienceHeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeMobileTab, setActiveMobileTab] = useState<number>(0);
  const [hoveredBar, setHoveredBar] = useState<number | null>(3);
  const [searchWordIndex, setSearchWordIndex] = useState<number>(0);
  const [phraseIndex, setPhraseIndex] = useState<number>(0);
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);

  // Animated Numbers starting from 0
  const [metrics, setMetrics] = useState({
    visitors: 0,
    conversion: 0,
    roi: 0,
    leads: 0,
    delivery: 0,
    ctr: 0,
  });

  // Silky smooth word-by-word search animation loop
  useEffect(() => {
    const currentWords = SEARCH_PHRASES[phraseIndex].split(" ");
    let timer: NodeJS.Timeout;

    if (searchWordIndex < currentWords.length) {
      timer = setTimeout(() => {
        setSearchWordIndex((prev) => prev + 1);
      }, 240);
    } else {
      // Pause at full sentence, then smoothly fade to next phrase
      timer = setTimeout(() => {
        setIsFadingOut(true);
        setTimeout(() => {
          setSearchWordIndex(0);
          setPhraseIndex((prev) => (prev + 1) % SEARCH_PHRASES.length);
          setIsFadingOut(false);
        }, 400);
      }, 2400);
    }

    return () => clearTimeout(timer);
  }, [searchWordIndex, phraseIndex]);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Count-up animation starting from 0
      const counter = {
        visitors: 0,
        conversion: 0,
        roi: 0,
        leads: 0,
        delivery: 0,
        ctr: 0,
      };

      gsap.to(counter, {
        visitors: 12,
        conversion: 8.42,
        roi: 312,
        leads: 360,
        delivery: 1420000,
        ctr: 80.76,
        duration: 2.4,
        ease: "power2.out",
        onUpdate: () => {
          setMetrics({
            visitors: Math.round(counter.visitors),
            conversion: Number(counter.conversion.toFixed(2)),
            roi: Math.round(counter.roi),
            leads: Math.round(counter.leads),
            delivery: Math.round(counter.delivery),
            ctr: Number(counter.ctr.toFixed(2)),
          });
        },
      });

      // 2. Continuous slow rotation of the entire donut group
      gsap.to(".donut-rotator", {
        rotation: 360,
        duration: 24,
        repeat: -1,
        ease: "none",
        transformOrigin: "50% 50%",
      });

      // 3. Silky smooth sequential one-by-one Donut segment drawing timeline
      const donutTl = gsap.timeline({ repeat: -1, repeatDelay: 1.2 });

      donutTl.fromTo(
        ".donut-seg-1",
        { strokeDashoffset: 160, opacity: 0.2 },
        { strokeDashoffset: 0, opacity: 1, duration: 1.0, ease: "power2.out" }
      );
      donutTl.fromTo(
        ".donut-seg-2",
        { strokeDashoffset: 70, opacity: 0.2 },
        { strokeDashoffset: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.2"
      );
      donutTl.fromTo(
        ".donut-seg-3",
        { strokeDashoffset: 40, opacity: 0.2 },
        { strokeDashoffset: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
        "-=0.2"
      );
      donutTl.fromTo(
        ".donut-seg-4",
        { strokeDashoffset: 20, opacity: 0.2 },
        { strokeDashoffset: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
        "-=0.15"
      );

      // Gentle glow pulse on completed donut
      donutTl.to(".donut-center-badge", {
        scale: 1.08,
        duration: 0.8,
        yoyo: true,
        repeat: 1,
        ease: "sine.inOut",
      }, "+=0.2");

      // Smooth soft fade transition to restart loop
      donutTl.to([".donut-seg-1", ".donut-seg-2", ".donut-seg-3", ".donut-seg-4"], {
        opacity: 0.35,
        duration: 0.8,
        ease: "power1.inOut",
      }, "+=1.2");

      // 4. Continuous wave flow along fully visible Lead Conversion curve
      gsap.to(".conversion-pulse-path", {
        strokeDashoffset: -260,
        duration: 3.6,
        repeat: -1,
        ease: "linear",
      });

      // 5. Synchronous animation of highlighted CTR bar + floating tooltip pill together
      gsap.to([".ctr-bar-highlight", ".ctr-pill-tooltip"], {
        y: -7,
        duration: 1.6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // 6. Continuous vertical equalizing on other CTR bars
      const barSelectors = [".ctr-bar-0", ".ctr-bar-1", ".ctr-bar-2", ".ctr-bar-4", ".ctr-bar-5"];
      barSelectors.forEach((selector, idx) => {
        gsap.to(selector, {
          scaleY: 0.82 + (idx % 3) * 0.14,
          duration: 1.6 + idx * 0.35,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          transformOrigin: "bottom center",
        });
      });

      // 7. Calm, steady, slow signal wave lines for Total Delivery Value
      gsap.to(".growth-path-1", {
        strokeDashoffset: -300,
        duration: 14,
        repeat: -1,
        ease: "linear",
      });
      gsap.to(".growth-path-2", {
        strokeDashoffset: 300,
        duration: 18,
        repeat: -1,
        ease: "linear",
      });

      // 8. Micro-sparkline dynamic continuous wave animations for ROI & Leads
      gsap.to(".roi-sparkline-flow", {
        strokeDashoffset: -120,
        duration: 3.2,
        repeat: -1,
        ease: "linear",
      });
      gsap.to(".leads-sparkline-flow", {
        strokeDashoffset: -120,
        duration: 3.0,
        repeat: -1,
        ease: "linear",
      });

      // 9. Live status beacons
      gsap.to(".live-beacon-pulse", {
        scale: 1.3,
        opacity: 0.5,
        duration: 1.4,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    }, containerRef);

    const observer = new IntersectionObserver(
      ([entry]) => {
        ctx.getTweens().forEach((animation: gsap.core.Tween) => {
          if (entry.isIntersecting) {
            animation.resume();
          } else {
            animation.pause();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
      ctx.revert();
    };
  }, []);

  const currentWords = SEARCH_PHRASES[phraseIndex].split(" ");

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-white rounded-3xl border border-[#e2e8f0] shadow-xs overflow-hidden select-none p-4 sm:p-6 lg:p-7"
      aria-label="Modular Bento Box Analytics & Mobile Experience Showcase"
    >
      {/* Background Matrix & Ambient Brand Atmosphere */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -top-24 -left-24 w-96 h-96 bg-brand/6 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-24 -right-24 w-96 h-96 bg-cyan-400/6 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-7 items-center">
        {/* Left Section: Realistic Modern Laptop Mockup with Live Dashboard Screen (7 cols) */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center relative w-full group/laptop lg:translate-x-4 xl:translate-x-6">
          {/* Laptop Upper Display Screen Lid */}
          <div className="w-full relative bg-[#111318] rounded-t-[20px] sm:rounded-t-[26px] p-2 sm:p-2.5 sm:pb-3 border border-slate-700/80 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] ring-1 ring-white/10">
            {/* Top Bezel: Centered Camera Housing with FaceTime HD Lens & Indicator */}
            <div className="w-full flex items-center justify-center pb-1.5 pt-0.5 relative">
              <div className="flex items-center gap-1.5">
                <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 bg-[#050608] rounded-full ring-1 ring-slate-800 flex items-center justify-center relative shadow-inner">
                  <span className="w-1 h-1 rounded-full bg-cyan-950/90 block" />
                </div>
                <span className="w-1 h-1 rounded-full bg-emerald-400/90 shadow-[0_0_4px_#34d399]" />
              </div>
            </div>

            {/* Laptop Screen Display (Houses the interactive dashboard) */}
            <div className="relative flex flex-col gap-3.5 sm:gap-4 p-3 sm:p-4 rounded-[12px] sm:rounded-[16px] border border-slate-900/90 overflow-hidden ring-1 ring-black/50 bg-slate-900 shadow-inner">
              {/* 1. Lush Green Evening Grass & Sunset Landscape Background Image with high blur */}
              <div
                className="absolute inset-0 bg-cover bg-center opacity-90 scale-110 pointer-events-none transition-transform duration-700 blur-[22px] saturate-150"
                style={{ backgroundImage: "url(/source/optimized/grass_evening_sky.jpg)" }}
                aria-hidden="true"
              />
              {/* 2. Frosted Glass Ambient Overlay with High Diffusion */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-white/75 via-white/50 to-emerald-950/20 backdrop-blur-3xl pointer-events-none"
                aria-hidden="true"
              />
              {/* 3. Glossy Top Glass Shimmer Sheen */}
              <div
                className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-white/90 via-white/40 to-transparent pointer-events-none backdrop-blur-xs"
                aria-hidden="true"
              />
              {/* 4. Realistic Laptop Screen Glass Glare Sheen */}
              <div
                className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-white/[0.12] pointer-events-none z-20"
                aria-hidden="true"
              />
              {/* Ambient Glow Orbs behind Bento cluster */}
              <div
                className="absolute -top-12 -left-12 w-64 h-64 bg-brand/10 rounded-full blur-3xl pointer-events-none"
                aria-hidden="true"
              />
              <div
                className="absolute -bottom-12 -right-12 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none"
                aria-hidden="true"
              />

              {/* Top Search Bar with Silky Smooth Word-by-Word Animation */}
              <div className="w-full relative z-10 bg-white/75 backdrop-blur-2xl border border-white/80 shadow-md rounded-full px-4 py-2.5 flex items-center justify-between ring-1 ring-white/70">
                <div className="flex items-center gap-2.5 text-xs text-slate-500 overflow-hidden">
                  <svg className="w-4 h-4 text-brand shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <div
                    className={`flex items-center flex-wrap font-medium text-slate-700 min-h-[18px] transition-opacity duration-300 ${
                      isFadingOut ? "opacity-0" : "opacity-100"
                    }`}
                  >
                    {currentWords.map((word, idx) => (
                      <span
                        key={`${phraseIndex}-${idx}`}
                        className={`inline-block mr-1 transition-all duration-300 ${
                          idx < searchWordIndex
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-1 pointer-events-none"
                        }`}
                      >
                        {word}
                      </span>
                    ))}
                    <span className="inline-block w-1.5 h-3.5 bg-brand animate-pulse ml-0.5" />
                  </div>
                </div>
                <div className="flex items-center gap-1.5 shrink-0 ml-2">
                  <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-white text-brand rounded-md border border-brand/20 shadow-2xs">
                    ⌘K
                  </span>
                </div>
              </div>

              {/* Row 1: Donut Visitors Card + Lead Conversion Curve */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4 relative z-10">
                {/* 1. Website Visitors Card (Count-up from 0) */}
                <div className="sm:col-span-7 bg-[#0022FF]/95 backdrop-blur-2xl text-white rounded-[22px] sm:rounded-[26px] p-4 sm:p-4.5 shadow-xl border border-white/30 flex flex-col justify-between relative overflow-hidden ring-1 ring-white/20">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-100">
                      Website Visitors
                    </span>
                    <span className="flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-bold bg-white/20 text-white rounded-full shrink-0 whitespace-nowrap">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 live-beacon-pulse" />
                      Live Sync
                    </span>
                  </div>

                  {/* Smooth Sequential One-by-One Animated Donut Chart */}
                  <div className="my-auto py-2 flex items-center justify-center relative">
                    <svg className="donut-rotator w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                      {/* Background Track */}
                      <circle cx="60" cy="60" r="48" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="11" />
                      
                      {/* Segment 1: Direct (White) */}
                      <circle
                        className="donut-seg-1"
                        cx="60"
                        cy="60"
                        r="48"
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth="11"
                        strokeDasharray="160 300"
                        strokeDashoffset="0"
                        strokeLinecap="round"
                      />
                      {/* Segment 2: Search (Cyan) */}
                      <circle
                        className="donut-seg-2"
                        cx="60"
                        cy="60"
                        r="48"
                        fill="none"
                        stroke="#38BDF8"
                        strokeWidth="11"
                        strokeDasharray="70 300"
                        strokeDashoffset="-165"
                        strokeLinecap="round"
                      />
                      {/* Segment 3: Social (Mint) */}
                      <circle
                        className="donut-seg-3"
                        cx="60"
                        cy="60"
                        r="48"
                        fill="none"
                        stroke="#10B981"
                        strokeWidth="11"
                        strokeDasharray="40 300"
                        strokeDashoffset="-240"
                        strokeLinecap="round"
                      />
                      {/* Segment 4: Other (Soft White) */}
                      <circle
                        className="donut-seg-4"
                        cx="60"
                        cy="60"
                        r="48"
                        fill="none"
                        stroke="rgba(255,255,255,0.5)"
                        strokeWidth="11"
                        strokeDasharray="20 300"
                        strokeDashoffset="-285"
                        strokeLinecap="round"
                      />
                    </svg>
                    {/* Donut Center Metric starting from 0 */}
                    <div className="donut-center-badge absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <span className="text-2xl font-extrabold tracking-tight text-white leading-none">
                        {metrics.visitors}k
                      </span>
                      <span className="text-[10px] text-blue-100 uppercase font-mono mt-0.5">Total Users</span>
                    </div>
                  </div>

                  {/* Minimal 4-item Legend */}
                  <div className="grid grid-cols-4 gap-1 pt-2.5 border-t border-white/15 text-[10px] text-center font-medium">
                    <div>
                      <span className="w-2 h-2 rounded-full bg-white inline-block mr-1" />
                      <span className="text-blue-100">Direct</span>
                    </div>
                    <div>
                      <span className="w-2 h-2 rounded-full bg-[#38BDF8] inline-block mr-1" />
                      <span className="text-blue-100">Search</span>
                    </div>
                    <div>
                      <span className="w-2 h-2 rounded-full bg-[#10B981] inline-block mr-1" />
                      <span className="text-blue-100">Social</span>
                    </div>
                    <div>
                      <span className="w-2 h-2 rounded-full bg-white/50 inline-block mr-1" />
                      <span className="text-blue-100">Other</span>
                    </div>
                  </div>
                </div>

                {/* 2. Fully Visible Lead Conversion Rate Card + Micro Metrics */}
                <div className="sm:col-span-5 flex flex-col gap-3 sm:gap-3.5">
                  {/* Conversion Rate Card (Count-up from 0) */}
                  <div className="bg-white/80 backdrop-blur-2xl rounded-[22px] sm:rounded-[26px] p-3.5 sm:p-4 border border-white/80 shadow-md flex flex-col justify-between overflow-hidden ring-1 ring-white/60">
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                      <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Lead Conversion
                      </span>
                      <span className="text-xs font-bold text-brand bg-blue-50 px-2 py-0.5 rounded-full shrink-0 whitespace-nowrap">
                        +24.8%
                      </span>
                    </div>
                    <div className="text-xl font-extrabold text-slate-900 tracking-tight">
                      {metrics.conversion.toFixed(2)}%
                    </div>

                    {/* Fully Visible Smooth Curved Line Chart */}
                    <div className="h-16 w-full mt-1 px-1">
                      <svg className="w-full h-full overflow-visible" viewBox="0 0 190 65" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="brandBlueGradFull" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#0022FF" stopOpacity="0.18" />
                            <stop offset="100%" stopColor="#0022FF" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>
                        <path
                          d="M 6 52 Q 40 46 68 32 T 118 26 T 150 18 T 172 14 L 172 58 L 6 58 Z"
                          fill="url(#brandBlueGradFull)"
                        />
                        <path
                          d="M 6 52 Q 40 46 68 32 T 118 26 T 150 18 T 172 14"
                          fill="none"
                          stroke="#0022FF"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />
                        <path
                          className="conversion-pulse-path"
                          d="M 6 52 Q 40 46 68 32 T 118 26 T 150 18 T 172 14"
                          fill="none"
                          stroke="#38BDF8"
                          strokeWidth="3.5"
                          strokeDasharray="30 200"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Stacked Micro-Metric Cards (Count-up from 0) */}
                  <div className="grid grid-cols-2 gap-2.5">
                    {/* ROI Growth Card */}
                    <div className="bg-white/80 backdrop-blur-2xl rounded-[18px] sm:rounded-[20px] p-3 sm:p-3.5 border border-white/80 shadow-md flex flex-col justify-between overflow-hidden ring-1 ring-white/60">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] text-slate-500 font-mono font-medium min-w-0 truncate">ROI Growth</span>
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full shrink-0 whitespace-nowrap">
                          +18.4%
                        </span>
                      </div>
                      <div className="text-lg font-bold text-slate-900 mt-0.5">
                        {metrics.roi}%
                      </div>
                      
                      {/* Rich Emerald Green Animated Wave Sparkline */}
                      <div className="h-8 w-full mt-1">
                        <svg className="w-full h-full overflow-visible" viewBox="0 0 90 28" preserveAspectRatio="none">
                          <defs>
                            <linearGradient id="roiGreenGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#10B981" stopOpacity="0.22" />
                              <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                            </linearGradient>
                          </defs>
                          <path
                            d="M 2 24 Q 20 22 35 14 T 62 10 T 88 4 L 88 27 L 2 27 Z"
                            fill="url(#roiGreenGrad)"
                          />
                          <path
                            d="M 2 24 Q 20 22 35 14 T 62 10 T 88 4"
                            fill="none"
                            stroke="#10B981"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                          />
                          <path
                            className="roi-sparkline-flow"
                            d="M 2 24 Q 20 22 35 14 T 62 10 T 88 4"
                            fill="none"
                            stroke="#6EE7B7"
                            strokeWidth="2.8"
                            strokeDasharray="18 90"
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                    </div>

                    {/* Total Leads Card */}
                    <div className="bg-white/80 backdrop-blur-2xl rounded-[18px] sm:rounded-[20px] p-3 sm:p-3.5 border border-white/80 shadow-md flex flex-col justify-between overflow-hidden ring-1 ring-white/60">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] text-slate-500 font-mono font-medium min-w-0 truncate">Total Leads</span>
                        <span className="text-[10px] font-bold text-brand bg-blue-50 px-1.5 py-0.5 rounded-full shrink-0 whitespace-nowrap">
                          +42.1%
                        </span>
                      </div>
                      <div className="text-lg font-bold text-brand mt-0.5">
                        {metrics.leads}
                      </div>
                      
                      {/* Rich Electric Blue Animated Wave Sparkline */}
                      <div className="h-8 w-full mt-1">
                        <svg className="w-full h-full overflow-visible" viewBox="0 0 90 28" preserveAspectRatio="none">
                          <defs>
                            <linearGradient id="leadsBlueGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#0022FF" stopOpacity="0.20" />
                              <stop offset="100%" stopColor="#0022FF" stopOpacity="0.0" />
                            </linearGradient>
                          </defs>
                          <path
                            d="M 2 22 Q 18 20 32 12 T 60 14 T 88 3 L 88 27 L 2 27 Z"
                            fill="url(#leadsBlueGrad)"
                          />
                          <path
                            d="M 2 22 Q 18 20 32 12 T 60 14 T 88 3"
                            fill="none"
                            stroke="#0022FF"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                          />
                          <path
                            className="leads-sparkline-flow"
                            d="M 2 22 Q 18 20 32 12 T 60 14 T 88 3"
                            fill="none"
                            stroke="#38BDF8"
                            strokeWidth="2.8"
                            strokeDasharray="18 90"
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 2: CTR Traffic Sources + Total Investments */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4 relative z-10">
                {/* 3. CTR based on Traffic Sources Card (Count-up from 0) */}
                <div className="sm:col-span-7 bg-white/80 backdrop-blur-2xl rounded-[22px] sm:rounded-[26px] p-3.5 sm:p-4.5 border border-white/80 shadow-md flex flex-col justify-between ring-1 ring-white/60">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div>
                      <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                        CTR by Traffic Sources
                      </span>
                      <span className="text-[10px] text-slate-500">Live conversion distribution</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-brand live-beacon-pulse" />
                      <span className="text-xs font-mono font-bold text-brand">Direct Lead</span>
                    </div>
                  </div>

                  {/* Animated Vertical Bar Chart with Direct Lead Pill Animating Together */}
                  <div className="relative pt-7 pb-0 flex items-end justify-between gap-2 sm:gap-3 h-26">
                    {[
                      { label: "Organic", height: 45, val: "45%", class: "ctr-bar-0" },
                      { label: "Referral", height: 60, val: "60%", class: "ctr-bar-1" },
                      { label: "Paid", height: 38, val: "38%", class: "ctr-bar-2" },
                      { label: "Direct", height: 90, val: "80.76%", highlight: true, class: "ctr-bar-highlight" },
                      { label: "Email", height: 65, val: "65%", class: "ctr-bar-4" },
                      { label: "Social", height: 50, val: "50%", class: "ctr-bar-5" },
                    ].map((bar, idx) => (
                      <div
                        key={bar.label}
                        className="flex-1 flex flex-col items-center gap-1 cursor-pointer group relative"
                        onMouseEnter={() => setHoveredBar(idx)}
                        onMouseLeave={() => setHoveredBar(3)}
                      >
                        {/* Tooltip Pill on Direct Bar - Count up from 0 */}
                        {bar.highlight && (
                          <div className="ctr-pill-tooltip absolute -top-5 left-1/2 -translate-x-1/2 bg-[#0022FF] text-white text-[9px] font-mono font-bold px-2 py-0.5 rounded-full shadow-md pointer-events-none whitespace-nowrap z-10">
                            {metrics.ctr > 0 ? `${metrics.ctr.toFixed(2)}%` : "0.00%"} CTR
                          </div>
                        )}
                        {/* Bar Pill with Synchronized Height Animation */}
                        <div className="w-full bg-slate-100/80 rounded-xl h-20 flex items-end p-0.5">
                          <div
                            className={`${bar.class} w-full rounded-lg transition-colors duration-300`}
                            style={{
                              height: `${bar.height}%`,
                              backgroundColor: bar.highlight ? "#0022FF" : (hoveredBar === idx ? "#94a3b8" : "#cbd5e1"),
                            }}
                          />
                        </div>
                        <span className="text-[9px] text-slate-500 font-mono truncate w-full text-center">
                          {bar.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. Total Investments / Delivery Value (Count-up from 0) */}
                <div className="sm:col-span-5 bg-white/80 backdrop-blur-2xl rounded-[22px] sm:rounded-[26px] p-3.5 sm:p-4.5 border border-white/80 shadow-md flex flex-col justify-between ring-1 ring-white/60">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Total Delivery Value
                    </span>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full shrink-0 whitespace-nowrap">
                      Active
                    </span>
                  </div>
                  <div className="text-xl font-extrabold text-slate-900 tracking-tight">
                    ${metrics.delivery.toLocaleString("en-US")}
                  </div>

                  {/* Smooth, Slow Signal Waves */}
                  <div className="h-14 w-full mt-1.5">
                    <svg className="w-full h-full" viewBox="0 0 160 50" preserveAspectRatio="none">
                      <path
                        className="growth-path-1"
                        d="M0 35 Q 40 45 70 20 T 120 15 T 160 8"
                        fill="none"
                        stroke="#0022FF"
                        strokeWidth="2.5"
                        strokeDasharray="24 6"
                        strokeLinecap="round"
                      />
                      <path
                        className="growth-path-2"
                        d="M0 45 Q 40 30 80 35 T 130 25 T 160 18"
                        fill="none"
                        stroke="#38BDF8"
                        strokeWidth="2"
                        strokeDasharray="14 8"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono pt-2 border-t border-slate-100">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-brand" /> Platform Velocity
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-[#38BDF8]" /> Target
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Laptop Hinge Joint */}
          <div className="w-24 sm:w-36 h-1.5 bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 mx-auto -mt-0.5 z-20 rounded-b-xs border-b border-slate-800 shadow-inner" />

          {/* Laptop Bottom Aluminum Base Chassis / Deck Lip */}
          <div className="w-[104%] -ml-[2%] h-3.5 sm:h-4 bg-gradient-to-b from-[#2d3139] via-[#1e2127] to-[#111317] rounded-b-[12px] sm:rounded-b-[16px] border-t border-slate-500/50 shadow-2xl relative flex items-start justify-center overflow-hidden z-10">
            {/* Top edge metallic highlight line */}
            <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-slate-300/40 to-transparent" />
            {/* Centered Lid Opening Thumb Notch */}
            <div className="w-14 sm:w-18 h-1.5 bg-[#090a0d] rounded-b-md mx-auto border-t border-slate-800 shadow-inner" />
          </div>

          {/* Realistic Surface Contact Drop Shadow */}
          <div className="w-[94%] mx-auto h-3.5 bg-black/40 blur-md -mt-1 rounded-full pointer-events-none" />
        </div>

        {/* Right Section: Full Original High-Fidelity Mobile Screen Component (5 cols) */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          {/* Realistic Flagship Phone Shell (White Theme Interior) */}
          <div className="relative w-[280px] sm:w-[310px] lg:w-[325px] h-[520px] sm:h-[560px] lg:h-[580px] bg-[#0f172a] rounded-[44px] p-2.5 shadow-2xl border-[4px] border-[#334155] ring-1 ring-black/5 flex flex-col justify-between overflow-hidden">
            {/* Outer edge gloss sheen */}
            <div className="absolute inset-0 rounded-[40px] bg-gradient-to-tr from-white/10 via-transparent to-white/5 pointer-events-none" />

            {/* Screen Display Container - Clean White Theme */}
            <div className="relative w-full h-full bg-[#ffffff] rounded-[34px] overflow-hidden flex flex-col justify-between p-3.5 border border-slate-200">
              {/* Top Status Bar & Dynamic Island */}
              <div className="w-full flex items-center justify-between text-[11px] text-slate-800 font-mono pt-0.5 px-2 z-10">
                <span className="font-semibold tracking-wider text-slate-900">9:41</span>
                {/* Dynamic Island */}
                <div className="w-20 h-4 bg-black rounded-full flex items-center justify-between px-2 shadow-inner">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
                  <span className="w-1 h-1 rounded-full bg-slate-700" />
                </div>
                <div className="flex items-center gap-1 text-[10px] font-semibold text-slate-700">
                  <span>5G</span>
                  <span className="w-3.5 h-2 border border-slate-700 rounded-xs flex items-center p-0.5">
                    <span className="w-full h-full bg-emerald-500 rounded-2xs" />
                  </span>
                </div>
              </div>

              {/* App Internal Header */}
              <div className="mt-2.5 px-1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold text-brand uppercase tracking-wider">
                      Design & Product Hub
                    </p>
                    <h3 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight">
                      TechGy Workspace
                    </h3>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-brand/10 border border-brand/20 flex items-center justify-center text-xs text-brand font-bold shadow-xs">
                    AS
                  </div>
                </div>

                {/* In-app search bar */}
                <div className="mt-2 w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 flex items-center gap-2 text-xs text-slate-500 shadow-inner">
                  <svg className="w-3 h-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span className="text-[10px] text-slate-400">Search tokens, components...</span>
                </div>
              </div>

              {/* In-app Featured Hero Card */}
              <div className="my-auto px-1">
                <div className="relative bg-gradient-to-br from-blue-50/90 via-white to-slate-50 rounded-2xl p-3 border border-blue-100 shadow-xs overflow-hidden">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="px-2 py-0.5 text-[8px] font-bold bg-brand/10 text-brand rounded-full border border-brand/20">
                      Design Tokens v3.2
                    </span>
                    <span className="flex items-center gap-1 text-[9px] text-emerald-600 font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                      Synced
                    </span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                    Enterprise Brand System
                  </h4>
                  <p className="text-[10px] text-slate-600 mt-0.5 leading-relaxed">
                    Single source of truth across Figma, React, iOS & Android.
                  </p>

                  {/* Brand Color Chips inside Phone */}
                  <div className="flex items-center gap-1.5 mt-2.5 pt-2 border-t border-slate-100">
                    <span className="text-[9px] text-slate-400 font-mono mr-0.5">Palette:</span>
                    <span className="w-3.5 h-3.5 rounded-full bg-[#0022FF]" />
                    <span className="w-3.5 h-3.5 rounded-full bg-[#38BDF8]" />
                    <span className="w-3.5 h-3.5 rounded-full bg-[#10B981]" />
                    <span className="w-3.5 h-3.5 rounded-full bg-[#0F172A]" />
                  </div>
                </div>

                {/* 3 Quick Micro-Metric Pills */}
                <div className="grid grid-cols-3 gap-1.5 mt-2">
                  <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-1 text-center">
                    <span className="text-[8px] text-slate-400 block font-mono">Tokens</span>
                    <span className="text-[11px] font-bold text-slate-800">240+</span>
                  </div>
                  <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-1 text-center">
                    <span className="text-[8px] text-slate-400 block font-mono">Variants</span>
                    <span className="text-[11px] font-bold text-brand">1,280</span>
                  </div>
                  <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-1 text-center">
                    <span className="text-[8px] text-slate-400 block font-mono">Sync</span>
                    <span className="text-[11px] font-bold text-emerald-600">100%</span>
                  </div>
                </div>
              </div>

              {/* In-app Bottom Tab Navigation */}
              <div className="w-full bg-slate-50/90 border border-slate-200 rounded-xl py-1 px-3 flex items-center justify-between text-slate-400 mb-1">
                <button
                  onClick={() => setActiveMobileTab(0)}
                  className={`flex flex-col items-center gap-0.5 text-[8px] transition-colors ${activeMobileTab === 0 ? "text-brand font-bold" : "hover:text-slate-700"}`}
                >
                  <span>🎨</span>
                  <span>Tokens</span>
                </button>
                <button
                  onClick={() => setActiveMobileTab(1)}
                  className={`flex flex-col items-center gap-0.5 text-[8px] transition-colors ${activeMobileTab === 1 ? "text-brand font-bold" : "hover:text-slate-700"}`}
                >
                  <span>📐</span>
                  <span>UI Kit</span>
                </button>
                <button
                  onClick={() => setActiveMobileTab(2)}
                  className={`flex flex-col items-center gap-0.5 text-[8px] transition-colors ${activeMobileTab === 2 ? "text-brand font-bold" : "hover:text-slate-700"}`}
                >
                  <span>⚡</span>
                  <span>APIs</span>
                </button>
                <button
                  onClick={() => setActiveMobileTab(3)}
                  className={`flex flex-col items-center gap-0.5 text-[8px] transition-colors ${activeMobileTab === 3 ? "text-brand font-bold" : "hover:text-slate-700"}`}
                >
                  <span>👥</span>
                  <span>Team</span>
                </button>
              </div>

              {/* Action Button inside Phone */}
              <Link
                href={enquiry("Digital Experience & Product Delivery")}
                className="w-full bg-[#0022FF] hover:bg-[#001ad4] text-white font-bold text-xs py-2 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5"
              >
                <span>View details</span>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DigitalExperienceHeroCanvas;
