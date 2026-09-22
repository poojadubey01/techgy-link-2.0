"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function MarketingCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<"funnel" | "enablement" | "growth">("funnel");
  const [activeStep, setActiveStep] = useState<number>(0);
  const [leadScore, setLeadScore] = useState<number>(94);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(".mkt-orb-1", {
        x: 30,
        y: -20,
        duration: 4.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(".mkt-card-float", {
        y: -5,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        stagger: 0.2,
      });
    }, containerRef);

    return () => ctx.revert();
  }, [activeTab]);

  const funnelSteps = [
    {
      num: "01",
      title: "Targeted Reach",
      metric: "+340% ROAS",
      desc: "High-intent audiences on Meta, Google & LinkedIn search.",
    },
    {
      num: "02",
      title: "Value Resonance",
      metric: "4.8% CTR",
      desc: "Clear value proposition & bespoke narrative positioning.",
    },
    {
      num: "03",
      title: "Conversion Engine",
      metric: "18.4% CVR",
      desc: "High-speed landing pages engineered for instant action.",
    },
    {
      num: "04",
      title: "Sales Handoff",
      metric: "Instant Routing",
      desc: "Enriched CRM lead data directly into sales workflows.",
    },
  ];

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[520px] bg-[#f8f9fa] text-[#000000] overflow-hidden flex flex-col select-none rounded-md"
    >
      {/* Background Subtle Gradient & Grid */}
      <div className="mkt-orb-1 absolute -top-16 -right-16 w-80 h-80 rounded-full bg-blue-100/60 blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#00000010_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

      {/* Top Campaign Toolbar */}
      <div className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-rule bg-white/80 backdrop-blur-md">
        <div className="flex items-center gap-2 text-[12px] font-mono text-[#000000]/70">
          <span className="w-2.5 h-2.5 rounded-full bg-brand animate-pulse" />
          <span className="font-semibold text-brand">Campaign Engine: High-Velocity Acquisition</span>
          <span className="text-[#000000]/40">/ Omnichannel Flow</span>
        </div>

        {/* View Mode Switcher Tabs */}
        <div className="flex items-center gap-1 bg-[#e2e8f0]/60 p-0.5 rounded-lg border border-rule text-[11px]">
          <button
            type="button"
            onClick={() => setActiveTab("funnel")}
            className={`px-3 py-1 rounded-md transition-all ${
              activeTab === "funnel"
                ? "bg-white text-brand font-medium shadow-xs"
                : "text-[#000000]/60 hover:text-[#000000]"
            }`}
          >
            Acquisition Funnel
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("enablement")}
            className={`px-3 py-1 rounded-md transition-all ${
              activeTab === "enablement"
                ? "bg-white text-brand font-medium shadow-xs"
                : "text-[#000000]/60 hover:text-[#000000]"
            }`}
          >
            Sales Enablement
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("growth")}
            className={`px-3 py-1 rounded-md transition-all ${
              activeTab === "growth"
                ? "bg-white text-brand font-medium shadow-xs"
                : "text-[#000000]/60 hover:text-[#000000]"
            }`}
          >
            Pipeline Growth
          </button>
        </div>
      </div>

      {/* Main Canvas Body */}
      <div className="relative z-10 flex-1 p-6 flex flex-col justify-between overflow-hidden">
        {activeTab === "funnel" && (
          <div className="flex flex-col justify-between h-full gap-5">
            {/* Top Interactive Strategy Card */}
            <div className="mkt-card-float flex items-center justify-between bg-white p-4 rounded-xl border border-rule shadow-xs">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-brand block mb-0.5">
                  End-to-End Pipeline Alignment
                </span>
                <h4 className="text-[17px] font-display font-medium text-[#000000]">
                  Turn Visitor Attention into Measurable Revenue
                </h4>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1.5 bg-emerald-50 text-emerald-700 text-[11px] font-mono font-semibold rounded-full border border-emerald-200">
                  +184% Pipeline Velocity
                </span>
              </div>
            </div>

            {/* 4-Step Interactive Connected Funnel */}
            <div className="grid grid-cols-4 gap-3 max-[1023px]:grid-cols-2 max-[767px]:grid-cols-1">
              {funnelSteps.map((step, i) => {
                const isActive = activeStep === i;
                return (
                  <div
                    key={step.num}
                    onClick={() => setActiveStep(i)}
                    className={`mkt-card-float relative p-4 rounded-xl border transition-all cursor-pointer bg-white ${
                      isActive
                        ? "border-brand shadow-[0_10px_25px_rgba(0,34,255,0.12)] ring-1 ring-brand/30"
                        : "border-rule shadow-xs hover:border-rule"
                    }`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[11px] font-bold text-brand bg-blue-50 px-2 py-0.5 rounded border border-blue-200 font-mono">
                        {step.num}
                      </span>
                      <span className="text-[11px] text-emerald-600 font-mono font-semibold">
                        {step.metric}
                      </span>
                    </div>
                    <h5 className="text-[15px] font-display font-medium text-[#000000] mb-1">
                      {step.title}
                    </h5>
                    <p className="text-[11px] text-[#000000]/60 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Bottom Status Banner */}
            <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-rule text-[11px] text-[#000000]/70">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Multi-touch attribution • PostHog & GA4 real-time analytics
              </span>
              <span className="font-mono text-brand font-medium">
                Conversion Latency: Real-Time Stream
              </span>
            </div>
          </div>
        )}

        {activeTab === "enablement" && (
          <div className="h-full grid grid-cols-3 gap-3.5 content-center max-[767px]:grid-cols-1">
            <div className="p-4 rounded-xl bg-white border border-rule shadow-xs">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-brand px-2 py-0.5 rounded bg-blue-50 border border-blue-200">
                  Lead Intelligence
                </span>
                <span className="text-emerald-600 font-mono font-bold text-[12px]">{leadScore}/100</span>
              </div>
              <h5 className="text-[16px] font-display font-medium text-[#000000] mb-1">
                Intent Scoring & Enrichment
              </h5>
              <p className="text-[11px] text-[#000000]/70 leading-relaxed mb-3">
                Automatic company size, tech stack, and budget qualification before the first discovery call.
              </p>
              <div className="text-[10px] font-mono text-brand">Auto-routed to Senior AE</div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-rule shadow-xs">
              <span className="text-[10px] font-mono uppercase tracking-wider text-brand px-2 py-0.5 rounded bg-blue-50 border border-blue-200 mb-2 inline-block">
                Collateral Automation
              </span>
              <h5 className="text-[16px] font-display font-medium text-[#000000] mb-1">
                Bespoke Sales Decks
              </h5>
              <p className="text-[11px] text-[#000000]/70 leading-relaxed mb-3">
                Dynamic proposal generation tailoring case studies and deliverables to client specific industry vertical.
              </p>
              <div className="text-[10px] font-mono text-emerald-600">Generated in &lt; 2 minutes</div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-rule shadow-xs">
              <span className="text-[10px] font-mono uppercase tracking-wider text-brand px-2 py-0.5 rounded bg-blue-50 border border-blue-200 mb-2 inline-block">
                Pipeline Automation
              </span>
              <h5 className="text-[16px] font-display font-medium text-[#000000] mb-1">
                CRM Bidirectional Sync
              </h5>
              <p className="text-[11px] text-[#000000]/70 leading-relaxed mb-3">
                HubSpot, Salesforce, and WhatsApp automation syncing call summaries, task assignments and follow-ups.
              </p>
              <div className="text-[10px] font-mono text-purple-600">Zero Manual Data Entry</div>
            </div>
          </div>
        )}

        {activeTab === "growth" && (
          <div className="h-full grid grid-cols-4 gap-3.5 content-center max-[767px]:grid-cols-2">
            <div className="p-4 rounded-xl bg-white border border-rule text-center flex flex-col items-center justify-center shadow-xs">
              <div className="w-16 h-16 rounded-full border-4 border-emerald-500 bg-emerald-50 flex items-center justify-center text-[16px] font-bold font-mono text-emerald-600 mb-2">
                3.8x
              </div>
              <p className="text-[13px] font-medium text-[#000000]">Pipeline Velocity</p>
              <p className="text-[10px] text-[#000000]/50">Deal cycle acceleration</p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-rule text-center flex flex-col items-center justify-center shadow-xs">
              <div className="w-16 h-16 rounded-full border-4 border-brand bg-blue-50 flex items-center justify-center text-[16px] font-bold font-mono text-brand mb-2">
                42%
              </div>
              <p className="text-[13px] font-medium text-[#000000]">Lower CAC</p>
              <p className="text-[10px] text-[#000000]/50">Optimized ad spend</p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-rule text-center flex flex-col items-center justify-center shadow-xs">
              <div className="w-16 h-16 rounded-full border-4 border-emerald-500 bg-emerald-50 flex items-center justify-center text-[16px] font-bold font-mono text-emerald-600 mb-2">
                89%
              </div>
              <p className="text-[13px] font-medium text-[#000000]">Follow-up Rate</p>
              <p className="text-[10px] text-[#000000]/50">Same-day response</p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-rule text-center flex flex-col items-center justify-center shadow-xs">
              <div className="w-16 h-16 rounded-full border-4 border-purple-500 bg-purple-50 flex items-center justify-center text-[16px] font-bold font-mono text-purple-600 mb-2">
                100%
              </div>
              <p className="text-[13px] font-medium text-[#000000]">Attribution</p>
              <p className="text-[10px] text-[#000000]/50">Clear revenue tracking</p>
            </div>
          </div>
        )}
      </div>

      {/* Clean Footer Meta Badge */}
      <div className="relative z-10 px-6 py-2.5 border-t border-rule bg-white/80 flex items-center justify-between text-[11px] text-[#000000]/50">
        <span className="flex items-center gap-1.5 font-medium text-brand">
          <span className="w-2 h-2 rounded-full bg-brand animate-ping" />
          Growth & Sales Engine
        </span>
        <span>TechGy Link Marketing Operations</span>
      </div>
    </div>
  );
}
