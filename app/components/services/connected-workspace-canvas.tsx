"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface WorkflowNode {
  id: string;
  name: string;
  subtitle: string;
  iconType: "user" | "file" | "bank" | "memo" | "match" | "review" | "journal" | "ledger" | "monitor";
  position: { xPercent: number; yPercent: number };
  connectionTarget: { xPercent: number; yPercent: number };
  accentColor: string;
  tag: string;
}

const NODES: WorkflowNode[] = [
  {
    id: "user-reg",
    name: "User Registration",
    subtitle: "Identity & Roles",
    iconType: "user",
    position: { xPercent: 14, yPercent: 18 },
    connectionTarget: { xPercent: 44, yPercent: 45 },
    accentColor: "#3b82f6",
    tag: "01 Ingress",
  },
  {
    id: "files",
    name: "Company Files",
    subtitle: "Bank CSV & Invoices",
    iconType: "file",
    position: { xPercent: 35, yPercent: 12 },
    connectionTarget: { xPercent: 47, yPercent: 42 },
    accentColor: "#06b6d4",
    tag: "02 Intake",
  },
  {
    id: "accounts",
    name: "Accounts Setup",
    subtitle: "Multi-Entity Sync",
    iconType: "bank",
    position: { xPercent: 65, yPercent: 12 },
    connectionTarget: { xPercent: 53, yPercent: 42 },
    accentColor: "#10b981",
    tag: "03 Setup",
  },
  {
    id: "memo",
    name: "Memo Mapping",
    subtitle: "Semantic Intelligence",
    iconType: "memo",
    position: { xPercent: 86, yPercent: 18 },
    connectionTarget: { xPercent: 56, yPercent: 45 },
    accentColor: "#8b5cf6",
    tag: "04 Mapping",
  },
  {
    id: "matching",
    name: "Transaction Matching",
    subtitle: "2-Way Reconciliation",
    iconType: "match",
    position: { xPercent: 88, yPercent: 50 },
    connectionTarget: { xPercent: 58, yPercent: 50 },
    accentColor: "#f59e0b",
    tag: "05 Matching",
  },
  {
    id: "review",
    name: "Review & Approval",
    subtitle: "Human-in-the-Loop",
    iconType: "review",
    position: { xPercent: 86, yPercent: 82 },
    connectionTarget: { xPercent: 56, yPercent: 55 },
    accentColor: "#ec4899",
    tag: "06 Review",
  },
  {
    id: "journal",
    name: "Journal Posting",
    subtitle: "Double-Entry Matrix",
    iconType: "journal",
    position: { xPercent: 65, yPercent: 88 },
    connectionTarget: { xPercent: 53, yPercent: 58 },
    accentColor: "#3b82f6",
    tag: "07 Posting",
  },
  {
    id: "ledger",
    name: "General Ledger",
    subtitle: "Immutable Records",
    iconType: "ledger",
    position: { xPercent: 35, yPercent: 88 },
    connectionTarget: { xPercent: 47, yPercent: 58 },
    accentColor: "#059669",
    tag: "08 Ledger",
  },
  {
    id: "monitor",
    name: "Monitoring & Control",
    subtitle: "Continuous Telemetry",
    iconType: "monitor",
    position: { xPercent: 14, yPercent: 50 },
    connectionTarget: { xPercent: 42, yPercent: 50 },
    accentColor: "#6366f1",
    tag: "09 Telemetry",
  },
];

export function ConnectedWorkspaceCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeNodeId, setActiveNodeId] = useState<string>("user-reg");
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Subtle float motion on floating labels
      NODES.forEach((node) => {
        gsap.to(`.floating-node-${node.id}`, {
          y: "-=4",
          x: "+=2",
          duration: 3 + Math.random() * 1.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      // 2. Master continuous smooth operational loop timeline
      const tl = gsap.timeline({
        repeat: -1,
        repeatDelay: 1.0,
        onUpdate: () => {
          const progress = tl.progress();
          const step = Math.min(NODES.length - 1, Math.floor(progress * NODES.length));
          setActiveNodeId(NODES[step].id);
        },
      });

      timelineRef.current = tl;

      NODES.forEach((node, i) => {
        const timeOffset = i * 1.4;

        // Subtle soft highlight on active node
        tl.to(`.node-pill-${node.id}`, {
          borderColor: node.accentColor,
          boxShadow: `0 8px 20px -4px ${node.accentColor}25, 0 0 0 1.5px ${node.accentColor}`,
          duration: 0.5,
          ease: "power2.out",
        }, timeOffset);

        // Smooth pulse flow along connector track
        tl.fromTo(
          `.path-pulse-${node.id}`,
          { strokeDashoffset: 300, opacity: 0.15 },
          { strokeDashoffset: 0, opacity: 0.9, duration: 0.9, ease: "power1.inOut" },
          timeOffset
        );

        // Return node to resting state smoothly
        tl.to(`.node-pill-${node.id}`, {
          borderColor: "#e2e8f0",
          boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
          duration: 0.5,
          ease: "power2.inOut",
        }, timeOffset + 1.1);
      });
    }, containerRef);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!timelineRef.current) return;
        if (entry.isIntersecting) {
          timelineRef.current.play();
        } else {
          timelineRef.current.pause();
        }
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

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[620px] sm:h-[680px] lg:h-[720px] bg-white rounded-3xl border border-[#e2e8f0] shadow-xs overflow-hidden select-none"
      aria-label="Connected Workspace Architecture Ecosystem"
    >
      {/* Background Matrix & Subtle Ambient Core Glow */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[450px] bg-gradient-to-tr from-brand/5 via-cyan-400/5 to-emerald-400/5 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      {/* SVG Connection Tracks & Pulses */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        viewBox="0 0 1000 700"
        preserveAspectRatio="none"
      >
        <defs>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {NODES.map((node) => {
          const startX = (node.position.xPercent / 100) * 1000;
          const startY = (node.position.yPercent / 100) * 700;
          const endX = (node.connectionTarget.xPercent / 100) * 1000;
          const endY = (node.connectionTarget.yPercent / 100) * 700;

          const midX = (startX + endX) / 2;
          const midY = (startY + endY) / 2 + (node.position.yPercent > 50 ? 20 : -20);
          const pathData = `M ${startX} ${startY} Q ${midX} ${midY} ${endX} ${endY}`;
          const isActive = activeNodeId === node.id;

          return (
            <g key={node.id}>
              {/* Base Track */}
              <path
                d={pathData}
                fill="none"
                stroke="#e2e8f0"
                strokeWidth="2"
                strokeDasharray="4 4"
                className="opacity-70"
              />

              {/* Active Highlight Track */}
              <path
                d={pathData}
                fill="none"
                stroke={node.accentColor}
                strokeWidth={isActive ? "2" : "1"}
                strokeDasharray="6 6"
                className={`transition-opacity duration-500 ${
                  isActive ? "opacity-90" : "opacity-25"
                }`}
              />

              {/* Animated GSAP Pulse Line */}
              <path
                d={pathData}
                fill="none"
                stroke={node.accentColor}
                strokeWidth="3"
                strokeDasharray="60 300"
                className={`path-pulse-${node.id}`}
                opacity="0.2"
                filter="url(#glow)"
              />

              {/* Dynamic Traveling Orb */}
              {isActive && (
                <circle
                  r="4"
                  fill={node.accentColor}
                  filter="url(#glow)"
                >
                  <animateMotion
                    dur="1.4s"
                    repeatCount="indefinite"
                    path={pathData}
                  />
                </circle>
              )}
            </g>
          );
        })}
      </svg>

      {/* Central Laptop Element with Static Crisp Logo & TechGy Link Wordmark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center select-none pointer-events-none">
        <div className="relative w-[300px] sm:w-[360px] lg:w-[410px] h-[190px] sm:h-[230px] lg:h-[260px] bg-[#0f172a] rounded-t-xl p-2.5 shadow-2xl border-[3px] border-[#334155] flex flex-col justify-between overflow-hidden">
          <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-slate-700" />

          <div className="relative w-full h-full bg-[#0a0f1d] rounded-lg overflow-hidden flex flex-col items-center justify-between p-4 border border-slate-800">
            {/* Top Bar with Official TechGy Link Wordmark Logo */}
            <div className="w-full flex items-center justify-between text-[10px] text-slate-400 font-mono border-b border-slate-800/80 pb-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand" />
                <img
                  src="/brand/logo.png"
                  alt="TechGy Link"
                  width={100}
                  height={22}
                  className="h-3.5 sm:h-4 w-auto object-contain brightness-0 invert"
                />
              </div>
              <span className="text-emerald-400 font-medium">● Connected Live</span>
            </div>

            {/* Central Soft Glowing Workspace with Crisp Static Logo */}
            <div className="relative my-auto flex flex-col items-center justify-center">
              <div className="relative flex items-center justify-center">
                {/* Outer soft glowing ambient halo */}
                <div className="absolute w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-brand/25 to-cyan-400/20 blur-lg pointer-events-none" />

                {/* Static Clean Logo Container (No Rotation) */}
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white shadow-2xl border-2 border-brand/50 flex items-center justify-center overflow-hidden ring-4 ring-brand/15">
                  <img
                    src="/source/optimized/apple-icon.png"
                    alt="TechGy Link Logo"
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <p className="mt-3 text-xs font-semibold text-slate-100 tracking-wide">
                Single Connected Workspace
              </p>
              <p className="text-[10px] text-brand font-mono font-medium mt-0.5">
                9 Integrated Disciplines Active
              </p>
            </div>

            <div className="w-full flex items-center justify-between text-[9px] font-mono text-slate-400 bg-slate-900/90 px-2.5 py-1 rounded border border-slate-800">
              <span>Reconciliation Sync</span>
              <span className="text-emerald-400 font-bold">100% Balanced</span>
            </div>
          </div>
        </div>

        {/* Laptop Base Stand */}
        <div className="relative w-[360px] sm:w-[440px] lg:w-[500px] h-[14px] bg-gradient-to-b from-[#cbd5e1] via-[#94a3b8] to-[#64748b] rounded-b-xl shadow-xl flex justify-center border-t border-slate-300">
          <div className="w-24 h-1.5 bg-[#475569] rounded-b-md" />
        </div>
        <div className="w-[320px] sm:w-[400px] lg:w-[450px] h-3 bg-black/15 blur-md rounded-full mt-1" />
      </div>

      {/* Floating Labeled Nodes arranged in clean Clockwise sequence */}
      {NODES.map((node) => {
        const isActive = activeNodeId === node.id;
        return (
          <div
            key={node.id}
            className={`floating-node-${node.id} absolute z-30 transition-all duration-300`}
            style={{
              left: `${node.position.xPercent}%`,
              top: `${node.position.yPercent}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div
              className={`node-pill-${node.id} relative bg-white/95 backdrop-blur-md px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-2xl border flex items-center gap-3 transition-all duration-300 cursor-pointer ${
                isActive
                  ? "border-brand shadow-lg bg-white"
                  : "border-slate-200/90 shadow-xs hover:border-slate-300 hover:shadow-md"
              }`}
              onClick={() => setActiveNodeId(node.id)}
            >
              {/* Node Icon Box */}
              <div
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center text-sm shadow-xs shrink-0 transition-transform duration-300"
                style={{
                  backgroundColor: `${node.accentColor}15`,
                  color: node.accentColor,
                }}
              >
                {node.iconType === "user" && "👤"}
                {node.iconType === "file" && "📁"}
                {node.iconType === "bank" && "🏦"}
                {node.iconType === "memo" && "🧠"}
                {node.iconType === "match" && "⚡"}
                {node.iconType === "review" && "🛡️"}
                {node.iconType === "journal" && "📑"}
                {node.iconType === "ledger" && "🏛️"}
                {node.iconType === "monitor" && "📡"}
              </div>

              {/* Node Text */}
              <div className="flex flex-col text-left">
                <div className="flex items-center gap-1.5">
                  <span className="text-[9px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
                    {node.tag}
                  </span>
                </div>
                <span className="text-xs sm:text-sm font-bold text-slate-800 leading-tight">
                  {node.name}
                </span>
                <span className="text-[10px] text-slate-500 font-normal">
                  {node.subtitle}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}

export default ConnectedWorkspaceCanvas;
