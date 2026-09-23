"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function AiAutomationCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<"pipeline" | "agents" | "telemetry">("pipeline");
  const [activeStep, setActiveStep] = useState<number>(1);
  const [processedEvents, setProcessedEvents] = useState<number>(48291);
  const [isProcessing, setIsProcessing] = useState(false);

  const runSimulation = () => {
    setIsProcessing(true);
    let step = 0;
    const interval = setInterval(() => {
      step++;
      setActiveStep(step % 4);
      if (step >= 4) {
        clearInterval(interval);
        setIsProcessing(false);
        setProcessedEvents((c) => c + 1);
      }
    }, 450);
  };

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      // Floating ambient elements
      gsap.to(".ai-orb-1", {
        x: 30,
        y: -20,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(".ai-node-pulse", {
        scale: 1.04,
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        stagger: 0.2,
      });
    }, containerRef);

    return () => ctx.revert();
  }, [activeTab]);

  const pipelineNodes = [
    {
      num: "01",
      title: "Data Ingestion",
      desc: "Webhooks, WhatsApp, Emails & ERP streams",
      latency: "8ms",
      status: "Active Ingest",
    },
    {
      num: "02",
      title: "Semantic Vector RAG",
      desc: "Pinecone embeddings & contextual chunking",
      latency: "42ms",
      status: "Neural Match",
    },
    {
      num: "03",
      title: "Agent Reasoning",
      desc: "LLM guardrails, validation & structured parsing",
      latency: "68ms",
      status: "Rule Checked",
    },
    {
      num: "04",
      title: "Business Execution",
      desc: "Automated CRM update, notification & action trigger",
      latency: "14ms",
      status: "Synchronized",
    },
  ];

  return (
    <div
      ref={containerRef}
      className="service-demo relative w-full h-full min-h-[520px] bg-[#f8f9fa] text-[#000000] overflow-hidden flex flex-col select-none rounded-md"
    >
      {/* Background Subtle Gradient & Grid */}
      <div className="ai-orb-1 absolute -top-16 -right-16 w-80 h-80 rounded-full bg-blue-100/60 blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#00000010_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

      {/* Top Architecture Toolbar */}
      <div className="demo-row demo-toolbar relative z-10 flex items-center justify-between px-6 py-4 border-b border-rule bg-white/80 backdrop-blur-md">
        {/* Pipeline status */}
        <div className="flex items-center gap-2 text-[12px] font-mono text-[#000000]/70">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-semibold text-brand">System: Autonomous Neural Pipeline</span>
          <span className="text-[#000000]/40">/ Live Event Stream</span>
        </div>

        {/* View Mode Switcher Tabs */}
        <div className="demo-tabs flex items-center gap-1 bg-[#e2e8f0]/60 p-0.5 rounded-lg border border-rule text-[11px]">
          <button
            type="button"
            onClick={() => setActiveTab("pipeline")}
            className={`px-3 py-1 rounded-md transition-all ${
              activeTab === "pipeline"
                ? "bg-white text-brand font-medium shadow-xs"
                : "text-[#000000]/60 hover:text-[#000000]"
            }`}
          >
            Live Pipeline
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("agents")}
            className={`px-3 py-1 rounded-md transition-all ${
              activeTab === "agents"
                ? "bg-white text-brand font-medium shadow-xs"
                : "text-[#000000]/60 hover:text-[#000000]"
            }`}
          >
            Agent Matrix
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("telemetry")}
            className={`px-3 py-1 rounded-md transition-all ${
              activeTab === "telemetry"
                ? "bg-white text-brand font-medium shadow-xs"
                : "text-[#000000]/60 hover:text-[#000000]"
            }`}
          >
            Telemetry & SLA
          </button>
        </div>
      </div>

      {/* Main Canvas Body */}
      <div className="demo-body relative z-10 flex-1 p-6 flex flex-col justify-between overflow-hidden">
        {activeTab === "pipeline" && (
          <div className="flex flex-col justify-between h-full gap-5">
            {/* Simulation Controller Header */}
            <div className="demo-row flex items-center justify-between bg-white p-4 rounded-xl border border-rule shadow-xs">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-brand block mb-0.5">
                  Real-time Event Orchestration
                </span>
                <h4 className="text-[17px] font-display font-medium text-[#000000]">
                  End-to-End Autonomous Intelligence
                </h4>
              </div>
              <button
                type="button"
                disabled={isProcessing}
                onClick={runSimulation}
                className={`px-4 py-2 text-[12px] font-medium rounded-full transition-all flex items-center gap-2 shadow-xs ${
                  isProcessing
                    ? "bg-blue-100 text-brand cursor-wait"
                    : "bg-brand text-white hover:bg-blue-700 active:scale-95 cursor-pointer"
                }`}
              >
                {isProcessing ? (
                  <>
                    <span className="w-2 h-2 rounded-full bg-brand animate-ping" />
                    Processing Stream...
                  </>
                ) : (
                  <>
                    <span>⚡ Simulate Ingest Event</span>
                  </>
                )}
              </button>
            </div>

            {/* 4-Step Animated Pipeline Nodes */}
            <div className="grid grid-cols-4 gap-3 max-[1023px]:grid-cols-2 max-[767px]:grid-cols-1">
              {pipelineNodes.map((node, i) => {
                const isActive = activeStep === i;
                return (
                  <div
                    key={node.num}
                    onClick={() => setActiveStep(i)}
                    className={`ai-node-pulse relative p-4 rounded-xl border transition-all cursor-pointer bg-white ${
                      isActive
                        ? "border-brand shadow-[0_10px_25px_rgba(0,34,255,0.12)] ring-1 ring-brand/30"
                        : "border-rule shadow-xs hover:border-rule"
                    }`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[11px] font-bold text-brand bg-blue-50 px-2 py-0.5 rounded border border-blue-200 font-mono">
                        {node.num}
                      </span>
                      <span className="text-[10px] text-emerald-600 font-mono font-medium">
                        {node.latency}
                      </span>
                    </div>
                    <h5 className="text-[15px] font-display font-medium text-[#000000] mb-1">
                      {node.title}
                    </h5>
                    <p className="text-[11px] text-[#000000]/60 leading-relaxed mb-3">
                      {node.desc}
                    </p>
                    <div className="demo-row pt-2 border-t border-rule flex items-center justify-between text-[10px] text-[#000000]/50 font-mono">
                      <span>Status:</span>
                      <span className={isActive ? "text-brand font-semibold" : "text-emerald-600 font-medium"}>
                        {node.status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pipeline Meta Status */}
            <div className="demo-row flex items-center justify-between bg-white p-3 rounded-lg border border-rule text-[11px] text-[#000000]/70">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Zero data loss guarantee • Encrypted SOC2 Type II compliance
              </span>
              <span className="font-mono text-brand font-medium">
                Total Latency: 132ms average
              </span>
            </div>
          </div>
        )}

        {activeTab === "agents" && (
          <div className="h-full grid grid-cols-3 gap-3.5 content-center">
            <div className="p-4 rounded-xl bg-white border border-rule shadow-xs">
              <span className="text-[10px] font-mono uppercase tracking-wider text-brand px-2 py-0.5 rounded bg-blue-50 border border-blue-200 mb-2 inline-block">
                LLM Routing Engine
              </span>
              <h5 className="text-[16px] font-display font-medium text-[#000000] mb-1">
                Multi-Model Fallback
              </h5>
              <p className="text-[11px] text-[#000000]/70 leading-relaxed mb-3">
                Dynamic routing between Claude 3.7, GPT-4o, and Gemini Flash based on task complexity and cost optimization.
              </p>
              <div className="text-[10px] font-mono text-emerald-600">99.98% Model Availability</div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-rule shadow-xs">
              <span className="text-[10px] font-mono uppercase tracking-wider text-brand px-2 py-0.5 rounded bg-blue-50 border border-blue-200 mb-2 inline-block">
                Vector Knowledge Base
              </span>
              <h5 className="text-[16px] font-display font-medium text-[#000000] mb-1">
                Enterprise RAG Store
              </h5>
              <p className="text-[11px] text-[#000000]/70 leading-relaxed mb-3">
                High-dimensional vector indexing across millions of documents, chats, product inventories and PDF archives.
              </p>
              <div className="text-[10px] font-mono text-blue-600">&lt; 35ms Semantic Search</div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-rule shadow-xs">
              <span className="text-[10px] font-mono uppercase tracking-wider text-brand px-2 py-0.5 rounded bg-blue-50 border border-blue-200 mb-2 inline-block">
                Deterministic Guards
              </span>
              <h5 className="text-[16px] font-display font-medium text-[#000000] mb-1">
                Safety & Validation
              </h5>
              <p className="text-[11px] text-[#000000]/70 leading-relaxed mb-3">
                JSON schema enforcement, PII masking, human-in-the-loop review thresholds, and strict compliance sandboxing.
              </p>
              <div className="text-[10px] font-mono text-purple-600">Zero Hallucination Guard</div>
            </div>
          </div>
        )}

        {activeTab === "telemetry" && (
          <div className="h-full grid grid-cols-4 gap-3.5 content-center max-[767px]:grid-cols-2">
            <div className="p-4 rounded-xl bg-white border border-rule text-center flex flex-col items-center justify-center shadow-xs">
              <div className="w-16 h-16 rounded-full border-4 border-emerald-500 bg-emerald-50 flex items-center justify-center text-[16px] font-bold font-mono text-emerald-600 mb-2">
                99.99%
              </div>
              <p className="text-[13px] font-medium text-[#000000]">System Uptime</p>
              <p className="text-[10px] text-[#000000]/50">Zero downtime SLA</p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-rule text-center flex flex-col items-center justify-center shadow-xs">
              <div className="w-16 h-16 rounded-full border-4 border-brand bg-blue-50 flex items-center justify-center text-[16px] font-bold font-mono text-brand mb-2">
                {processedEvents.toLocaleString()}
              </div>
              <p className="text-[13px] font-medium text-[#000000]">Processed Tasks</p>
              <p className="text-[10px] text-[#000000]/50">Today&apos;s throughput</p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-rule text-center flex flex-col items-center justify-center shadow-xs">
              <div className="w-16 h-16 rounded-full border-4 border-emerald-500 bg-emerald-50 flex items-center justify-center text-[16px] font-bold font-mono text-emerald-600 mb-2">
                94.8%
              </div>
              <p className="text-[13px] font-medium text-[#000000]">Zero-Touch Rate</p>
              <p className="text-[10px] text-[#000000]/50">Automated resolution</p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-rule text-center flex flex-col items-center justify-center shadow-xs">
              <div className="w-16 h-16 rounded-full border-4 border-purple-500 bg-purple-50 flex items-center justify-center text-[16px] font-bold font-mono text-purple-600 mb-2">
                132ms
              </div>
              <p className="text-[13px] font-medium text-[#000000]">Average P95</p>
              <p className="text-[10px] text-[#000000]/50">End-to-end latency</p>
            </div>
          </div>
        )}
      </div>

      {/* Clean Footer Meta Badge */}
      <div className="demo-row demo-footer relative z-10 px-6 py-2.5 border-t border-rule bg-white/80 flex items-center justify-between text-[11px] text-[#000000]/50">
        <span className="flex items-center gap-1.5 font-medium text-brand">
          <span className="w-2 h-2 rounded-full bg-brand animate-ping" />
          Autonomous System Integration
        </span>
        <span>TechGy Link AI Operations Engine</span>
      </div>
    </div>
  );
}
