"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChartNoAxesCombined, MapPin, PanelsTopLeft, UserRound } from "lucide-react";

const navIds = ["home", "explore", "analytics", "profile"] as const;

const parcels = [
  {
    name: "North Field",
    crop: "Organic Almond & Citrus Grove",
    acres: "14.8 Acres",
    health: "98% Optimal",
    coords: "17.4382° N, 78.3824° E",
    status: "Active Harvest",
    left: "32%",
    top: "34%",
  },
  {
    name: "River Plot",
    crop: "Hydroponic Greenhouse Array",
    acres: "8.2 Acres",
    health: "94% Optimal",
    coords: "17.4410° N, 78.3790° E",
    status: "Irrigation Active",
    left: "68%",
    top: "48%",
  },
  {
    name: "South Ridge",
    crop: "Solar Agri-Voltaics & Vineyards",
    acres: "22.5 Acres",
    health: "99% Optimal",
    coords: "17.4320° N, 78.3895° E",
    status: "Sensors Online",
    left: "46%",
    top: "72%",
  },
];

export function MobileDevCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<"preview" | "code" | "metrics">("preview");
  const [activeNav, setActiveNav] = useState<"home" | "explore" | "analytics" | "profile">("home");
  const [selectedAsset, setSelectedAsset] = useState<number>(0);
  const [selectedParcel, setSelectedParcel] = useState(0);
  const [selectedPeriod, setSelectedPeriod] = useState(0);
  const [selectedAccount, setSelectedAccount] = useState(0);
  const [notifExpanded, setNotifExpanded] = useState<boolean>(false);
  const [faceIdVerified, setFaceIdVerified] = useState<boolean>(false);
  const [demoStep, setDemoStep] = useState(0);
  const [mapType, setMapType] = useState<"satellite" | "streets">("satellite");
  const reducedMotion = !!useReducedMotion();

  useEffect(() => {
    const timer = window.setInterval(() => setDemoStep((step) => (step + 1) % navIds.length), 3200);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    setActiveTab("preview");
    setActiveNav(navIds[demoStep]);
  }, [demoStep]);

  useEffect(() => {
    if (activeTab !== "preview") return;
    const timer = window.setInterval(() => {
      if (activeNav === "home") setSelectedAsset((value) => (value + 1) % 3);
      if (activeNav === "explore") setSelectedParcel((value) => (value + 1) % 3);
      if (activeNav === "analytics") setSelectedPeriod((value) => (value + 1) % 3);
      if (activeNav === "profile") setSelectedAccount((value) => (value + 1) % 3);
    }, 1050);
    return () => window.clearInterval(timer);
  }, [activeNav, activeTab]);

  useEffect(() => {
    if (activeTab !== "preview") return;
    setNotifExpanded(activeNav === "analytics");
    setFaceIdVerified(false);
    if (activeNav !== "profile") return;
    const timer = window.setTimeout(() => setFaceIdVerified(true), 850);
    return () => window.clearTimeout(timer);
  }, [activeNav, activeTab]);

  useEffect(() => {
    if (!containerRef.current || reducedMotion) return;
    const ctx = gsap.context(() => {
      gsap.to(".mob-orb-1", {
        x: 20,
        y: -15,
        duration: 4.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(".mob-orb-2", {
        x: -16,
        y: 16,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(".phone-chassis", {
        y: -3,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, [activeTab, reducedMotion]);

  const triggerFaceId = () => {
    setFaceIdVerified(false);
    setTimeout(() => {
      setFaceIdVerified(true);
      setTimeout(() => setFaceIdVerified(false), 3000);
    }, 600);
  };

  return (
    <div
      ref={containerRef}
      className="service-demo relative flex h-full min-h-[380px] w-full flex-col justify-between overflow-hidden bg-[#f8f9fa] text-[#000000] select-none border-l border-rule/50 font-sans sm:min-h-[650px]"
    >
      {/* Background Subtle Gradient & Dots Grid */}
      <div className="mob-orb-1 absolute -top-16 -right-16 w-80 h-80 rounded-full bg-blue-100/50 blur-3xl pointer-events-none" />
      <div className="mob-orb-2 absolute -bottom-16 -left-16 w-80 h-80 rounded-full bg-indigo-100/40 blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#0000000c_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      {/* Simulator Top Toolbar */}
      <div className="demo-toolbar relative z-20 shrink-0 flex items-center justify-between px-5 py-2.5 border-b border-rule bg-white/95 backdrop-blur-md">
        <div className="flex items-center gap-2 text-[11px] font-mono text-[#000000]/70">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-bold text-brand uppercase tracking-wider text-[11px]">iOS & Android</span>
          <span className="text-[#000000]/40 text-[10px] hidden sm:inline">/ Native Engineering Simulator</span>
        </div>

        {/* View Mode Switcher Tabs */}
        <div className="demo-tabs flex items-center gap-1 bg-[#e2e8f0]/60 p-0.5 rounded-lg border border-rule text-[11px] font-mono">
          <button
            type="button"
            onClick={() => {
              setActiveTab("preview");
              setDemoStep(0);
            }}
            className={`px-2.5 py-1 rounded-md transition-all font-bold ${
              activeTab === "preview"
                ? "bg-white text-brand shadow-xs border border-rule/50"
                : "text-[#000000]/60 hover:text-[#000000]"
            }`}
          >
            iPhone
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("code")}
            className={`px-2.5 py-1 rounded-md transition-all font-bold ${
              activeTab === "code"
                ? "bg-white text-brand shadow-xs border border-rule/50"
                : "text-[#000000]/60 hover:text-[#000000]"
            }`}
          >
            Native Code
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("metrics")}
            className={`px-2.5 py-1 rounded-md transition-all font-bold ${
              activeTab === "metrics"
                ? "bg-white text-brand shadow-xs border border-rule/50"
                : "text-[#000000]/60 hover:text-[#000000]"
            }`}
          >
            Telemetry
          </button>
        </div>
      </div>

      {/* Main Canvas Body - Clean vertical centering with zero clipping */}
      <div className="demo-body relative z-10 flex-1 flex flex-col items-center justify-center p-4 overflow-visible">
        {activeTab === "preview" && (
          /* ========================================================================= */
          /* SMARTPHONE CHASSIS - Height 480px, perfectly proportioned for 650px card  */
          /* ========================================================================= */
          <div className="relative flex items-center justify-center py-2">
            <div className="phone-chassis relative shrink-0 flex-none w-[240px] h-[480px] min-w-[240px] max-w-[240px] min-h-[480px] max-h-[480px] max-[767px]:w-[210px] max-[767px]:h-[420px] max-[767px]:min-w-[210px] max-[767px]:max-w-[210px] max-[767px]:min-h-[420px] max-[767px]:max-h-[420px] bg-[#0b1329] p-[8px] rounded-[42px] shadow-[0_22px_55px_-10px_rgba(0,0,0,0.34),0_0_0_1px_rgba(255,255,255,0.12)] flex flex-col items-center justify-center">
              
              {/* Hardware Side Buttons */}
              <div className="absolute -left-[3px] top-[75px] w-[3px] h-[20px] bg-[#334155] rounded-l-sm border-l border-white/20 shadow-xs" />
              <div className="absolute -left-[3px] top-[108px] w-[3px] h-[32px] bg-[#334155] rounded-l-sm border-l border-white/20 shadow-xs" />
              <div className="absolute -left-[3px] top-[148px] w-[3px] h-[32px] bg-[#334155] rounded-l-sm border-l border-white/20 shadow-xs" />
              <div className="absolute -right-[3px] top-[120px] w-[3px] h-[45px] bg-[#334155] rounded-r-sm border-r border-white/20 shadow-xs" />

              {/* OLED Screen (100% Contained & Clipped Inside Phone Frame) */}
              <div className="relative isolate w-full h-full min-h-0 bg-[#f8f9fa] rounded-[34px] [clip-path:inset(0_round_34px)] overflow-hidden flex flex-col justify-between shadow-inner">
                
                {/* Diagonal Glass Sheen Reflection Overlay */}
                <div className="absolute -top-[90px] -left-[90px] w-[320px] h-[170px] bg-gradient-to-br from-white/20 via-white/5 to-transparent rotate-[-35deg] pointer-events-none z-30" />

                {/* 1. STATUS BAR & DYNAMIC ISLAND */}
                <div className="relative z-40 shrink-0 px-3 pt-2.5 pb-1 flex items-center gap-1 justify-between text-[10px] font-mono text-[#000000] bg-transparent">
                  <span className="font-bold text-[11px] tracking-tight">9:41</span>

                  {/* Interactive Dynamic Island Pill */}
                  <button
                    type="button"
                    onClick={() => setNotifExpanded(!notifExpanded)}
                    className={`h-[20px] min-w-0 bg-black rounded-full flex items-center gap-1 justify-between px-2 transition-all cursor-pointer shadow-sm ${
                      notifExpanded ? "w-[115px]" : "w-[75px]"
                    }`}
                  >
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[8px] text-white font-sans font-medium truncate">
                        {notifExpanded ? "Farmland Live" : "Active"}
                      </span>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-[#0f172a] border border-slate-700" />
                  </button>

                  {/* 5G & Battery Icon */}
                  <div className="flex items-center gap-1 text-[9px] text-slate-800">
                    <span className="font-semibold text-[8px]">5G</span>
                    <div className="w-3.5 h-1.5 rounded-[2px] border border-slate-800 p-[1px] flex items-center">
                      <div className="w-full h-full bg-slate-800 rounded-[1px]" />
                    </div>
                  </div>
                </div>

                {/* Dynamic Push Notification Banner (Floating overlay - zero layout shift) */}
                {notifExpanded && (
                  <div className="absolute top-[32px] left-2 right-2 z-50 p-2 bg-white/95 backdrop-blur-md rounded-xl border border-rule shadow-lg flex items-center justify-between text-[10px] animate-fadeIn">
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-md bg-brand text-white flex items-center justify-center text-[8px] font-bold shadow-xs">
                        TG
                      </div>
                      <div>
                        <span className="font-bold text-[#000000] text-[9.5px] block leading-tight">Yield Disbursed</span>
                        <span className="text-[#000000]/60 text-[8px]">+$4,250 into escrow</span>
                      </div>
                    </div>
                    <span className="text-[8px] text-brand font-bold font-mono">Just now</span>
                  </div>
                )}

                {/* 2. APP SCREEN CONTENT VIEWPORT - 406px available height */}
                <div className="relative z-20 min-h-0 flex-1 px-3 py-1 flex flex-col gap-1.5 overflow-y-auto overscroll-contain">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={activeNav}
                      initial={reducedMotion ? false : { opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={reducedMotion ? undefined : { opacity: 0, x: -10 }}
                      transition={{ duration: 0.22 }}
                      className="flex flex-col gap-1.5 w-full h-full"
                    >
                      {/* HOME TAB */}
                      {activeNav === "home" && (
                        <>
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="block text-[9px] text-slate-500">Welcome back</span>
                              <h4 className="text-[13px] font-bold leading-tight">Pooja Dubey</h4>
                            </div>
                            <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[8.5px] font-semibold text-brand">
                              Farmland Pro
                            </span>
                          </div>

                          <div className="rounded-xl bg-gradient-to-br from-[#0022ff] to-[#0017a8] p-2.5 text-white shadow-md">
                            <div className="flex items-center justify-between text-[9px]">
                              <span className="text-white/70">Total Farm Equity</span>
                              <span className="rounded bg-emerald-400/20 px-1.5 py-0.5 text-emerald-200 text-[8.5px]">
                                +18.4% YTD
                              </span>
                            </div>
                            <p className="mt-1 font-mono text-[18px] font-bold leading-tight">$482,950.00</p>
                            <div className="mt-1.5 flex justify-between border-t border-white/20 pt-1 text-[8.5px] text-white/75">
                              <span>3 Managed Parcels</span>
                              <span>Harvest: Nov 15</span>
                            </div>
                          </div>

                          <p className="text-[9px] font-semibold text-slate-500 pt-0.5">What is happening</p>
                          {["Parcel health updated", "Yield forecast refreshed", "Document signed"].map(
                            (item, index) => (
                              <button
                                key={item}
                                type="button"
                                onClick={() => setSelectedAsset(index)}
                                className={`flex items-center gap-2 rounded-lg border p-1.5 text-left text-[9.5px] transition-colors ${
                                  selectedAsset === index ? "border-brand bg-blue-50" : "border-rule bg-white"
                                }`}
                              >
                                <span
                                  className={`size-2 rounded-full ${
                                    selectedAsset === index ? "bg-brand animate-pulse" : "bg-slate-300"
                                  }`}
                                />
                                <span className="flex-1 font-semibold truncate">{item}</span>
                                <span className="text-slate-400 text-[8.5px]">0{index + 1}</span>
                              </button>
                            )
                          )}
                        </>
                      )}

                      {/* EXPLORE / MAP TAB - REAL GEOSPATIAL MAP (No artificial box structure) */}
                      {activeNav === "explore" && (
                        <div className="flex flex-col gap-1.5 h-full">
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-[9px] text-slate-500">Live Farmland GIS</span>
                              <h4 className="text-[13px] font-bold leading-tight">Geospatial Map</h4>
                            </div>
                            <div className="flex items-center gap-0.5 bg-slate-100 p-0.5 rounded text-[8.5px] font-mono">
                              <button
                                type="button"
                                onClick={() => setMapType("satellite")}
                                className={`px-1.5 py-0.5 rounded font-bold transition-all ${
                                  mapType === "satellite" ? "bg-white text-brand shadow-xs" : "text-slate-500"
                                }`}
                              >
                                Satellite
                              </button>
                              <button
                                type="button"
                                onClick={() => setMapType("streets")}
                                className={`px-1.5 py-0.5 rounded font-bold transition-all ${
                                  mapType === "streets" ? "bg-white text-brand shadow-xs" : "text-slate-500"
                                }`}
                              >
                                Topo
                              </button>
                            </div>
                          </div>

                          {/* Real Map Viewport */}
                          <div className="relative h-[175px] w-full overflow-hidden rounded-xl border border-rule shadow-inner bg-slate-900">
                            <iframe
                              title="Real Farmland Map"
                              src={
                                mapType === "satellite"
                                  ? "https://maps.google.com/maps?q=17.4382,78.3824&t=k&z=14&ie=UTF8&iwloc=&output=embed"
                                  : "https://www.openstreetmap.org/export/embed.html?bbox=78.3600%2C17.4200%2C78.4050%2C17.4550&layer=mapnik"
                              }
                              className="w-full h-full border-0 pointer-events-auto filter saturate-110"
                              loading="lazy"
                            />

                            {/* GPS Telemetry Ribbon on Map */}
                            <div className="absolute top-1.5 left-1.5 right-1.5 z-20 flex justify-between items-center pointer-events-none">
                              <span className="px-1.5 py-0.5 rounded bg-black/80 backdrop-blur-md text-[8px] font-mono text-emerald-400 font-bold flex items-center gap-1 shadow-sm">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                RTK GPS
                              </span>
                              <span className="px-1.5 py-0.5 rounded bg-black/80 backdrop-blur-md text-[8px] font-mono text-white/90">
                                {parcels[selectedParcel].coords}
                              </span>
                            </div>

                            {/* Interactive Parcel Pin Markers on Real Map */}
                            {parcels.map((parcel, index) => (
                              <button
                                key={parcel.name}
                                type="button"
                                onClick={() => setSelectedParcel(index)}
                                style={{ left: parcel.left, top: parcel.top }}
                                className={`absolute z-20 grid size-5 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white text-[8.5px] font-bold text-white shadow-lg transition-transform ${
                                  selectedParcel === index
                                    ? "scale-125 bg-brand ring-2 ring-white ring-offset-1 ring-offset-brand"
                                    : "bg-emerald-600 hover:scale-110"
                                }`}
                                aria-label={`Select ${parcel.name}`}
                              >
                                {index + 1}
                              </button>
                            ))}
                          </div>

                          {/* Selected Parcel Details Card */}
                          <div className="rounded-xl border border-rule bg-white p-2 shadow-xs">
                            <div className="flex items-center justify-between mb-0.5">
                              <span className="text-[8px] uppercase tracking-wider text-brand font-bold">
                                {parcels[selectedParcel].crop}
                              </span>
                              <span className="text-[7.5px] font-mono text-emerald-600 font-bold px-1.5 py-0.5 bg-emerald-50 rounded border border-emerald-200">
                                {parcels[selectedParcel].status}
                              </span>
                            </div>
                            <p className="text-[12px] font-bold text-[#000000]">
                              {parcels[selectedParcel].name} · {parcels[selectedParcel].acres}
                            </p>
                            <div className="mt-1 flex items-center justify-between border-t border-rule/50 pt-0.5 text-[8.5px] text-slate-500 font-mono">
                              <span>Health: <strong className="text-emerald-600">{parcels[selectedParcel].health}</strong></span>
                              <span>IoT Sensor Online</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* ANALYTICS / YIELD TAB */}
                      {activeNav === "analytics" && (
                        <>
                          <div className="flex items-center justify-between">
                            <span className="text-[9px] text-slate-500">Yield distribution</span>
                            <span className="font-bold text-[9px] text-brand px-1.5 py-0.5 rounded bg-blue-50 border border-blue-200">
                              Active APY
                            </span>
                          </div>
                          <div className="flex gap-1 rounded-lg bg-slate-100 p-0.5">
                            {["2024", "2025", "2026"].map((period, index) => (
                              <button
                                key={period}
                                type="button"
                                onClick={() => setSelectedPeriod(index)}
                                className={`flex-1 rounded py-0.5 text-[9px] font-semibold transition-all ${
                                  selectedPeriod === index
                                    ? "bg-brand text-white shadow-xs font-bold"
                                    : "text-slate-500 hover:text-brand"
                                }`}
                              >
                                {period}
                              </button>
                            ))}
                          </div>
                          <div className="rounded-xl bg-gradient-to-br from-[#0022ff] to-[#0017a8] p-2.5 text-white shadow-md">
                            <div className="flex items-center justify-between">
                              <span className="text-[9px] text-white/75">Projected annual yield</span>
                              <span className="text-[7.5px] font-mono px-1.5 py-0.5 rounded bg-white/20 text-white font-bold">
                                Live Ledger
                              </span>
                            </div>
                            <p className="font-mono text-[18px] font-bold mt-0.5">
                              {["12.8%", "16.2%", "18.4%"][selectedPeriod]}
                            </p>
                            <div className="mt-1.5 flex h-[75px] items-end justify-between gap-1 border-b border-white/25 pb-0.5">
                              {[36, 54, 45, 68, 51, 77, 63, 86].map((height, index) => (
                                <motion.div
                                  key={index}
                                  animate={{ height: `${height + selectedPeriod * 5}%` }}
                                  transition={{ duration: reducedMotion ? 0 : 0.35, delay: index * 0.025 }}
                                  className="flex-1 rounded-t bg-gradient-to-t from-white/30 via-white/80 to-white shadow-[0_0_6px_rgba(255,255,255,0.4)]"
                                />
                              ))}
                            </div>
                            <div className="mt-1 flex justify-between text-[8px] text-white/70 font-mono">
                              <span>Jan</span>
                              <span>Dec</span>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-1.5">
                            <div className="rounded-xl border border-rule bg-white p-2 shadow-xs">
                              <span className="text-[8px] text-slate-500">Paid YTD</span>
                              <p className="text-[12px] font-bold text-brand mt-0.5">$42,500</p>
                            </div>
                            <div className="rounded-xl border border-rule bg-white p-2 shadow-xs">
                              <span className="text-[8px] text-slate-500">Next Payout</span>
                              <p className="text-[12px] font-bold text-brand mt-0.5">Nov 15</p>
                            </div>
                          </div>
                        </>
                      )}

                      {/* PROFILE TAB */}
                      {activeNav === "profile" && (
                        <>
                          <div className="flex items-center gap-2.5 rounded-xl border border-rule bg-white p-2">
                            <div className="grid size-8 place-items-center rounded-full bg-blue-100 text-[11px] font-bold text-brand">
                              PD
                            </div>
                            <div className="flex-1">
                              <p className="text-[11px] font-bold">Pooja Dubey</p>
                              <p className="text-[8.5px] text-slate-500">Portfolio Owner</p>
                            </div>
                            <button
                              type="button"
                              onClick={triggerFaceId}
                              className={`rounded-md px-2 py-0.5 text-[8.5px] font-semibold ${
                                faceIdVerified ? "bg-emerald-50 text-emerald-700" : "bg-blue-50 text-brand"
                              }`}
                            >
                              {faceIdVerified ? "Verified" : "Verify ID"}
                            </button>
                          </div>
                          <p className="text-[9px] font-semibold text-slate-500">Settings & Security</p>
                          {["Security & Biometrics", "Notifications", "Tax Documents"].map((item, index) => (
                            <button
                              key={item}
                              type="button"
                              onClick={() => setSelectedAccount(index)}
                              className={`flex items-center justify-between rounded-lg border p-2 text-left text-[9.5px] font-semibold transition-colors ${
                                selectedAccount === index
                                  ? "border-brand bg-blue-50 text-brand"
                                  : "border-rule bg-white"
                              }`}
                            >
                              <span>{item}</span>
                              <span>›</span>
                            </button>
                          ))}
                        </>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* 3. BOTTOM APP TAB BAR & HOME INDICATOR PILL */}
                <div className="relative z-30 shrink-0 rounded-b-[34px] overflow-hidden bg-white border-t border-rule pt-1.5 pb-2.5 px-3">
                  <div className="flex items-center justify-around text-[8px] font-medium text-[#000000]/50 mb-1">
                    {(
                      [
                        ["home", "Portfolio"],
                        ["explore", "Map"],
                        ["analytics", "Yield"],
                        ["profile", "Account"],
                      ] as const
                    ).map(([navId, label]) => (
                      <button
                        key={navId}
                        type="button"
                        onClick={() => setDemoStep(navIds.indexOf(navId))}
                        aria-current={activeNav === navId ? "page" : undefined}
                        className={`flex flex-col items-center gap-0.5 transition-all ${
                          activeNav === navId ? "text-brand font-bold" : "hover:text-[#000000]"
                        }`}
                      >
                        {navId === "home" ? (
                          <PanelsTopLeft size={12} />
                        ) : navId === "explore" ? (
                          <MapPin size={12} />
                        ) : navId === "analytics" ? (
                          <ChartNoAxesCombined size={12} />
                        ) : (
                          <UserRound size={12} />
                        )}
                        <span>{label}</span>
                      </button>
                    ))}
                  </div>

                  {/* iOS Home Indicator Pill */}
                  <div className="w-18 h-1 bg-[#0f172a]/40 rounded-full mx-auto" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* NATIVE CODE EDITOR TAB */}
        {activeTab === "code" && (
          <div className="w-full h-full max-w-[560px] rounded-xl bg-white border border-rule p-4 font-mono text-[11px] leading-relaxed overflow-x-auto flex flex-col justify-between shadow-xs">
            <div className="space-y-1">
              <p className="text-[#000000]/40">// MobileApplicationArchitecture.tsx</p>
              <p>
                <span className="text-purple-600 font-medium">import</span> {"{"}{" "}
                <span className="text-blue-600">Gesture</span>,{" "}
                <span className="text-blue-600">GestureDetector</span> {"}"}{" "}
                <span className="text-purple-600 font-medium">from</span>{" "}
                <span className="text-emerald-700">&quot;react-native-gesture-handler&quot;</span>;
              </p>
              <p>
                <span className="text-purple-600 font-medium">import</span> Animated, {"{"}{" "}
                <span className="text-blue-600">useAnimatedStyle</span>,{" "}
                <span className="text-blue-600">withSpring</span> {"}"}{" "}
                <span className="text-purple-600 font-medium">from</span>{" "}
                <span className="text-emerald-700">&quot;react-native-reanimated&quot;</span>;
              </p>
              <br />
              <p>
                <span className="text-blue-600 font-medium">export function</span>{" "}
                <span className="text-brand font-bold">NativeFarmlandCard</span>() {"{"}
              </p>
              <p className="pl-4">
                <span className="text-blue-600 font-medium">const</span> panGesture = Gesture.
                <span className="text-blue-600">Pan</span>().
                <span className="text-blue-600">onUpdate</span>((e) =&gt; {"{"}
              </p>
              <p className="pl-8 text-emerald-700">
                translateX.value = <span className="text-blue-600">withSpring</span>(e.translationX);
              </p>
              <p className="pl-4">{"}"});</p>
              <p className="pl-4 text-purple-600">
                return &lt;<span className="text-blue-600">GestureDetector</span> gesture=
                <span className="text-amber-600">{"{panGesture}"}</span>&gt; ... &lt;/&gt;;
              </p>
              <p>{"}"}</p>
            </div>
            <div className="pt-2.5 border-t border-rule flex items-center justify-between text-[10px] text-[#000000]/50">
              <span>Expo SDK 52 • React Native 0.76 • Swift 6</span>
              <span className="text-emerald-600 font-medium">Native Binary</span>
            </div>
          </div>
        )}

        {/* PERFORMANCE & METRICS TAB */}
        {activeTab === "metrics" && (
          <div className="w-full max-w-[560px] grid grid-cols-2 gap-2.5 content-center">
            <div className="p-3 rounded-xl bg-white border border-rule text-center flex flex-col items-center justify-center shadow-xs">
              <div className="w-12 h-12 rounded-full border-3 border-emerald-500 bg-emerald-50 flex items-center justify-center text-[15px] font-bold font-mono text-emerald-600 mb-1.5">
                120Hz
              </div>
              <p className="text-[12px] font-medium text-[#000000]">ProMotion Fluidity</p>
              <p className="text-[9px] text-[#000000]/50">Zero dropped frames on gestures</p>
            </div>

            <div className="p-3 rounded-xl bg-white border border-rule text-center flex flex-col items-center justify-center shadow-xs">
              <div className="w-12 h-12 rounded-full border-3 border-brand bg-blue-50 flex items-center justify-center text-[15px] font-bold font-mono text-brand mb-1.5">
                24MB
              </div>
              <p className="text-[12px] font-medium text-[#000000]">App Binary Size</p>
              <p className="text-[9px] text-[#000000]/50">Optimized Hermes bytecode</p>
            </div>

            <div className="p-3 rounded-xl bg-white border border-rule text-center flex flex-col items-center justify-center shadow-xs">
              <div className="w-12 h-12 rounded-full border-3 border-emerald-500 bg-emerald-50 flex items-center justify-center text-[15px] font-bold font-mono text-emerald-600 mb-1.5">
                &lt; 50ms
              </div>
              <p className="text-[12px] font-medium text-[#000000]">Cold Startup Time</p>
              <p className="text-[9px] text-[#000000]/50">Instant SQLite cache boot</p>
            </div>

            <div className="p-3 rounded-xl bg-white border border-rule text-center flex flex-col items-center justify-center shadow-xs">
              <div className="w-12 h-12 rounded-full border-3 border-purple-500 bg-purple-50 flex items-center justify-center text-[15px] font-bold font-mono text-purple-600 mb-1.5">
                100%
              </div>
              <p className="text-[12px] font-medium text-[#000000]">Offline Sync Ready</p>
              <p className="text-[9px] text-[#000000]/50">WatermelonDB + CRDT</p>
            </div>
          </div>
        )}
      </div>

      {/* Clean Footer Meta Badge */}
      <div className="demo-footer relative z-10 shrink-0 px-5 py-2 border-t border-rule bg-white/95 flex items-center justify-between text-[10px] text-[#000000]/50 font-mono">
        <span className="flex items-center gap-1.5 font-bold text-brand">
          <span className="w-1.5 h-1.5 rounded-full bg-brand animate-ping" />
          TechGy Link Mobile Engineering Simulator
        </span>
        <span className="hidden sm:inline">iOS 18 • Android 15 • React Native 0.76 • Swift 6</span>
      </div>
    </div>
  );
}
