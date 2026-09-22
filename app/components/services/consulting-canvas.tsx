"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function ConsultingCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<"roadmap" | "architecture" | "roi">("roadmap");
  const [activeMilestone, setActiveMilestone] = useState<number>(1);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(".tech-orb-1", {
        x: 25,
        y: -20,
        duration: 4.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(".tech-card-float", {
        y: -4,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        stagger: 0.2,
      });
    }, containerRef);

    return () => ctx.revert();
  }, [activeTab]);

  const roadmapMilestones = [
    {
      num: "01",
      title: "System Assessment",
      scope: "Legacy dependencies, bottlenecks & technical debt audit",
      status: "Verified",
    },
    {
      num: "02",
      title: "Target Architecture",
      scope: "Event-driven microservices, serverless & API contracts",
      status: "Designed",
    },
    {
      num: "03",
      title: "Phased Execution",
      scope: "Zero-downtime cutover, database migration & CI/CD deployment",
      status: "Roadmapped",
    },
  ];

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[520px] bg-[#f8f9fa] text-[#000000] overflow-hidden flex flex-col select-none rounded-md"
    >
      {/* Background Subtle Gradient & Grid */}
      <div className="tech-orb-1 absolute -top-16 -right-16 w-80 h-80 rounded-full bg-blue-100/60 blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#00000010_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

      {/* Top Architecture Toolbar */}
      <div className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-rule bg-white/80 backdrop-blur-md">
        <div className="flex items-center gap-2 text-[12px] font-mono text-[#000000]/70">
          <span className="w-2.5 h-2.5 rounded-full bg-brand animate-pulse" />
          <span className="font-semibold text-brand">Enterprise Modernisation Framework</span>
          <span className="text-[#000000]/40">/ Senior Technical Advisory</span>
        </div>

        {/* View Mode Switcher Tabs */}
        <div className="flex items-center gap-1 bg-[#e2e8f0]/60 p-0.5 rounded-lg border border-rule text-[11px]">
          <button
            type="button"
            onClick={() => setActiveTab("roadmap")}
            className={`px-3 py-1 rounded-md transition-all ${
              activeTab === "roadmap"
                ? "bg-white text-brand font-medium shadow-xs"
                : "text-[#000000]/60 hover:text-[#000000]"
            }`}
          >
            Phased Roadmap
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("architecture")}
            className={`px-3 py-1 rounded-md transition-all ${
              activeTab === "architecture"
                ? "bg-white text-brand font-medium shadow-xs"
                : "text-[#000000]/60 hover:text-[#000000]"
            }`}
          >
            Cloud Topology
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("roi")}
            className={`px-3 py-1 rounded-md transition-all ${
              activeTab === "roi"
                ? "bg-white text-brand font-medium shadow-xs"
                : "text-[#000000]/60 hover:text-[#000000]"
            }`}
          >
            ROI & Security SLA
          </button>
        </div>
      </div>

      {/* Main Canvas Body */}
      <div className="relative z-10 flex-1 p-6 flex flex-col justify-between overflow-hidden">
        {activeTab === "roadmap" && (
          <div className="flex flex-col justify-between h-full gap-5">
            {/* Top Interactive Assessment Card */}
            <div className="tech-card-float flex items-center justify-between bg-white p-4 rounded-xl border border-rule shadow-xs">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-brand block mb-0.5">
                  Pragmatic Engineering Roadmap
                </span>
                <h4 className="text-[17px] font-display font-medium text-[#000000]">
                  Modernise Infrastructure Without Disrupting Business
                </h4>
              </div>
              <span className="px-3 py-1.5 bg-blue-50 text-brand text-[11px] font-mono font-semibold rounded-full border border-blue-200">
                Zero Downtime Guarantee
              </span>
            </div>

            {/* 3-Step Interactive Enterprise Framework */}
            <div className="grid grid-cols-3 gap-3.5 max-[767px]:grid-cols-1">
              {roadmapMilestones.map((m, i) => {
                const isActive = activeMilestone === i;
                return (
                  <div
                    key={m.num}
                    onClick={() => setActiveMilestone(i)}
                    className={`tech-card-float relative p-5 rounded-xl border transition-all cursor-pointer bg-white ${
                      isActive
                        ? "border-brand shadow-[0_10px_25px_rgba(0,34,255,0.12)] ring-1 ring-brand/30"
                        : "border-rule shadow-xs hover:border-rule"
                    }`}
                  >
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-[12px] font-bold text-brand bg-blue-50 px-2 py-0.5 rounded border border-blue-200 font-mono">
                        {m.num}
                      </span>
                      <span className="text-[11px] text-emerald-600 font-mono font-semibold">
                        {m.status}
                      </span>
                    </div>
                    <h5 className="text-[16px] font-display font-medium text-[#000000] mb-1.5">
                      {m.title}
                    </h5>
                    <p className="text-[11px] text-[#000000]/65 leading-relaxed">
                      {m.scope}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Bottom Status Banner */}
            <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-rule text-[11px] text-[#000000]/70">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Deterministic cost models • Senior Principal Architect oversight
              </span>
              <span className="font-mono text-brand font-medium">
                Milestone-Based Delivery
              </span>
            </div>
          </div>
        )}

        {activeTab === "architecture" && (
          <div className="h-full grid grid-cols-3 gap-3.5 content-center max-[767px]:grid-cols-1">
            <div className="p-4 rounded-xl bg-white border border-rule shadow-xs">
              <span className="text-[10px] font-mono uppercase tracking-wider text-brand px-2 py-0.5 rounded bg-blue-50 border border-blue-200 mb-2 inline-block">
                Edge Infrastructure
              </span>
              <h5 className="text-[16px] font-display font-medium text-[#000000] mb-1">
                Global Edge Routing
              </h5>
              <p className="text-[11px] text-[#000000]/70 leading-relaxed mb-3">
                Cloudflare / AWS CloudFront global edge caching with sub-30ms static asset and API latency.
              </p>
              <div className="text-[10px] font-mono text-emerald-600">320+ Global PoPs Active</div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-rule shadow-xs">
              <span className="text-[10px] font-mono uppercase tracking-wider text-brand px-2 py-0.5 rounded bg-blue-50 border border-blue-200 mb-2 inline-block">
                Compute Layer
              </span>
              <h5 className="text-[16px] font-display font-medium text-[#000000] mb-1">
                Auto-Scaling Clusters
              </h5>
              <p className="text-[11px] text-[#000000]/70 leading-relaxed mb-3">
                Kubernetes (EKS/GKE) and Serverless compute autoscaling seamlessly during peak transactional load.
              </p>
              <div className="text-[10px] font-mono text-brand">Dynamic Horizontal Pod Scaling</div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-rule shadow-xs">
              <span className="text-[10px] font-mono uppercase tracking-wider text-brand px-2 py-0.5 rounded bg-blue-50 border border-blue-200 mb-2 inline-block">
                Persistence & Cache
              </span>
              <h5 className="text-[16px] font-display font-medium text-[#000000] mb-1">
                Distributed Database
              </h5>
              <p className="text-[11px] text-[#000000]/70 leading-relaxed mb-3">
                PostgreSQL multi-AZ replication, Redis cluster caching, and automated encrypted point-in-time recovery.
              </p>
              <div className="text-[10px] font-mono text-purple-600">Zero Data Loss RPO = 0</div>
            </div>
          </div>
        )}

        {activeTab === "roi" && (
          <div className="h-full grid grid-cols-4 gap-3.5 content-center max-[767px]:grid-cols-2">
            <div className="p-4 rounded-xl bg-white border border-rule text-center flex flex-col items-center justify-center shadow-xs">
              <div className="w-16 h-16 rounded-full border-4 border-emerald-500 bg-emerald-50 flex items-center justify-center text-[16px] font-bold font-mono text-emerald-600 mb-2">
                64%
              </div>
              <p className="text-[13px] font-medium text-[#000000]">Infra Cost Savings</p>
              <p className="text-[10px] text-[#000000]/50">FinOps optimization</p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-rule text-center flex flex-col items-center justify-center shadow-xs">
              <div className="w-16 h-16 rounded-full border-4 border-brand bg-blue-50 flex items-center justify-center text-[16px] font-bold font-mono text-brand mb-2">
                5x
              </div>
              <p className="text-[13px] font-medium text-[#000000]">Release Velocity</p>
              <p className="text-[10px] text-[#000000]/50">Automated CI/CD</p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-rule text-center flex flex-col items-center justify-center shadow-xs">
              <div className="w-16 h-16 rounded-full border-4 border-emerald-500 bg-emerald-50 flex items-center justify-center text-[16px] font-bold font-mono text-emerald-600 mb-2">
                99.999%
              </div>
              <p className="text-[13px] font-medium text-[#000000]">System Reliability</p>
              <p className="text-[10px] text-[#000000]/50">Five-nines SLA</p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-rule text-center flex flex-col items-center justify-center shadow-xs">
              <div className="w-16 h-16 rounded-full border-4 border-purple-500 bg-purple-50 flex items-center justify-center text-[16px] font-bold font-mono text-purple-600 mb-2">
                SOC2
              </div>
              <p className="text-[13px] font-medium text-[#000000]">Compliance</p>
              <p className="text-[10px] text-[#000000]/50">Security fortified</p>
            </div>
          </div>
        )}
      </div>

      {/* Clean Footer Meta Badge */}
      <div className="relative z-10 px-6 py-2.5 border-t border-rule bg-white/80 flex items-center justify-between text-[11px] text-[#000000]/50">
        <span className="flex items-center gap-1.5 font-medium text-brand">
          <span className="w-2 h-2 rounded-full bg-brand animate-ping" />
          Enterprise Architecture Advisory
        </span>
        <span>TechGy Link Consulting Practice</span>
      </div>
    </div>
  );
}
