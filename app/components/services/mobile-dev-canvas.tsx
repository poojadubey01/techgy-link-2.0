"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function MobileDevCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<"preview" | "code" | "metrics">("preview");
  const [activeNav, setActiveNav] = useState<"home" | "explore" | "analytics" | "profile">("home");
  const [selectedAsset, setSelectedAsset] = useState<number>(0);
  const [notifExpanded, setNotifExpanded] = useState<boolean>(false);
  const [faceIdVerified, setFaceIdVerified] = useState<boolean>(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      // Floating ambient elements
      gsap.to(".mob-orb-1", {
        x: 25,
        y: -20,
        duration: 4.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(".mob-orb-2", {
        x: -20,
        y: 15,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(".phone-chassis", {
        y: -6,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, [activeTab]);

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
      className="relative w-full h-full min-h-[580px] bg-[#f8f9fa] text-[#000000] overflow-hidden flex flex-col select-none border-l border-rule/50 font-sans"
    >
      {/* Background Subtle Gradient & Dots Grid */}
      <div className="mob-orb-1 absolute -top-16 -right-16 w-80 h-80 rounded-full bg-blue-100/50 blur-3xl pointer-events-none" />
      <div className="mob-orb-2 absolute -bottom-16 -left-16 w-80 h-80 rounded-full bg-indigo-100/40 blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#0000000c_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      {/* Simulator Top Toolbar */}
      <div className="relative z-20 flex items-center justify-between px-6 py-3 border-b border-rule bg-white/95 backdrop-blur-md">
        <div className="flex items-center gap-2 text-[12px] font-mono text-[#000000]/70">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-bold text-brand uppercase tracking-wider">iOS & Android Simulator</span>
          <span className="text-[#000000]/40 text-[11px]">/ React Native • Swift • Kotlin</span>
        </div>

        {/* View Mode Switcher Tabs */}
        <div className="flex items-center gap-1 bg-[#e2e8f0]/60 p-0.5 rounded-lg border border-rule text-[11px] font-mono">
          <button
            type="button"
            onClick={() => setActiveTab("preview")}
            className={`px-3 py-1.5 rounded-md transition-all font-bold ${
              activeTab === "preview"
                ? "bg-white text-brand shadow-xs border border-rule/50"
                : "text-[#000000]/60 hover:text-[#000000]"
            }`}
          >
            iPhone Simulator
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("code")}
            className={`px-3 py-1.5 rounded-md transition-all font-bold ${
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
            className={`px-3 py-1.5 rounded-md transition-all font-bold ${
              activeTab === "metrics"
                ? "bg-white text-brand shadow-xs border border-rule/50"
                : "text-[#000000]/60 hover:text-[#000000]"
            }`}
          >
            Performance & Telemetry
          </button>
        </div>
      </div>

      {/* Main Canvas Body */}
      <div className="relative z-10 flex-1 p-5 flex flex-col items-center justify-center overflow-hidden">
        {activeTab === "preview" && (
          /* ========================================================================= */
          /* AUTHENTIC SMARTPHONE CHASSIS (Fixed Outer Bezel, Screen Perfectly Contained)*/
          /* ========================================================================= */
          <div className="relative flex items-center justify-center py-2">
            {/* Phone Outer Bezel Enclosure */}
            <div className="phone-chassis relative w-[285px] h-[560px] bg-[#0b1329] p-[10px] rounded-[52px] shadow-[0_30px_70px_-15px_rgba(0,0,0,0.35),0_0_0_1px_rgba(255,255,255,0.12)] flex flex-col items-center justify-center">
              
              {/* Hardware Side Buttons */}
              {/* Action Button (Top Left) */}
              <div className="absolute -left-[3px] top-[95px] w-[3.5px] h-[24px] bg-[#334155] rounded-l-md border-l border-white/20 shadow-xs" />
              {/* Volume Up (Left) */}
              <div className="absolute -left-[3px] top-[132px] w-[3.5px] h-[40px] bg-[#334155] rounded-l-md border-l border-white/20 shadow-xs" />
              {/* Volume Down (Left) */}
              <div className="absolute -left-[3px] top-[182px] w-[3.5px] h-[40px] bg-[#334155] rounded-l-md border-l border-white/20 shadow-xs" />
              {/* Power / Lock Button (Right) */}
              <div className="absolute -right-[3px] top-[145px] w-[3.5px] h-[55px] bg-[#334155] rounded-r-md border-r border-white/20 shadow-xs" />

              {/* OLED Screen (100% Contained & Clipped Inside Phone Frame) */}
              <div className="relative isolate w-full h-full min-h-0 bg-[#f8f9fa] rounded-[42px] [clip-path:inset(0_round_42px)] overflow-hidden flex flex-col justify-between shadow-inner">
                
                {/* Diagonal Glass Sheen Reflection Overlay */}
                <div className="absolute -top-[100px] -left-[100px] w-[400px] h-[220px] bg-gradient-to-br from-white/20 via-white/5 to-transparent rotate-[-35deg] pointer-events-none z-30" />

                {/* 1. STATUS BAR & DYNAMIC ISLAND */}
                <div className="relative z-40 px-5 pt-3 pb-1 flex items-center justify-between text-[11px] font-mono text-[#000000] bg-transparent">
                  <span className="font-bold text-[12px] tracking-tight">9:41</span>

                  {/* Interactive Dynamic Island Pill */}
                  <div
                    onClick={() => setNotifExpanded(!notifExpanded)}
                    className={`h-[24px] bg-black rounded-full flex items-center justify-between px-2.5 transition-all cursor-pointer shadow-sm ${
                      notifExpanded ? "w-[155px]" : "w-[90px]"
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[9px] text-white font-sans font-medium">
                        {notifExpanded ? "Farmland Live" : "Active"}
                      </span>
                    </div>
                    {/* Front Camera Lens Dot */}
                    <div className="w-2.5 h-2.5 rounded-full bg-[#0f172a] border border-slate-700" />
                  </div>

                  {/* 5G & Battery Icon */}
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-800">
                    <span className="font-semibold text-[9px]">5G</span>
                    <div className="w-4 h-2 rounded-[2px] border border-slate-800 p-[1px] flex items-center">
                      <div className="w-full h-full bg-slate-800 rounded-[1px]" />
                    </div>
                  </div>
                </div>

                {/* 2. APP SCREEN SCROLLABLE CONTENT */}
                <div className="relative z-20 flex-1 px-3.5 py-1.5 flex flex-col justify-between overflow-hidden">
                  
                  {/* Dynamic Push Notification Banner */}
                  {notifExpanded && (
                    <div className="p-2.5 bg-white rounded-2xl border border-rule shadow-md flex items-center justify-between text-[11px] mb-1.5 animate-fadeIn">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-brand text-white flex items-center justify-center text-[10px] font-bold shadow-xs">
                          TG
                        </div>
                        <div>
                          <span className="font-bold text-[#000000] text-[11px] block">Yield Disbursed</span>
                          <span className="text-[#000000]/60 text-[9px]">+$4,250 deposited to escrow</span>
                        </div>
                      </div>
                      <span className="text-[9px] text-brand font-bold font-mono">Just now</span>
                    </div>
                  )}

                  {/* App Header User Info */}
                  <div className="flex items-center justify-between mb-1.5">
                    <div>
                      <span className="text-[10px] text-[#000000]/50 font-mono block">Welcome back</span>
                      <h4 className="text-[14px] font-bold text-[#000000] leading-none">Pooja Dubey</h4>
                    </div>
                    <button
                      type="button"
                      onClick={triggerFaceId}
                      className="px-2 py-1 bg-blue-50 hover:bg-blue-100 text-brand rounded-lg border border-blue-200 text-[10px] font-mono font-bold transition-all flex items-center gap-1 shadow-xs"
                    >
                      {faceIdVerified ? "✓ Verified" : "🔒 FaceID"}
                    </button>
                  </div>

                  {/* Investment Portfolio Balance Card */}
                  <div className="p-3 bg-gradient-to-br from-[#0022ff] to-[#0017a8] rounded-2xl text-white shadow-md flex flex-col justify-between mb-2">
                    <div className="flex justify-between items-start mb-0.5">
                      <span className="text-[10px] text-white/70 font-mono uppercase tracking-wider">Total Farm Equity</span>
                      <span className="px-1.5 py-0.5 rounded bg-emerald-400/20 text-emerald-300 text-[9px] font-bold font-mono">
                        +18.4% YTD
                      </span>
                    </div>
                    <h3 className="text-[19px] font-mono font-bold tracking-tight mb-1.5">
                      $482,950.00
                    </h3>
                    <div className="flex items-center justify-between text-[9px] text-white/80 font-mono border-t border-white/15 pt-1.5">
                      <span>4 Managed Parcels</span>
                      <span>Harvest: Nov 15</span>
                    </div>
                  </div>

                  {/* Native Feature Action Cards */}
                  <div className="space-y-1.5">
                    {[
                      { id: 0, title: "Farmland Mapbox Engine", sub: "60 FPS Pinch-to-zoom 3D contours", badge: "Metal 3D" },
                      { id: 1, title: "Offline Secure Cache", sub: "Encrypted WatermelonDB + SQLite", badge: "Zero-Latency" },
                      { id: 2, title: "Biometric Token Vault", sub: "Apple Secure Enclave Auth", badge: "FaceID Ready" },
                    ].map((item) => (
                      <div
                        key={item.id}
                        onClick={() => setSelectedAsset(item.id)}
                        className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                          selectedAsset === item.id
                            ? "bg-white border-brand shadow-xs"
                            : "bg-white/80 border-rule hover:bg-white"
                        }`}
                      >
                        <div>
                          <span className="text-[11px] font-bold text-[#000000] block">{item.title}</span>
                          <span className="text-[9px] text-[#000000]/60">{item.sub}</span>
                        </div>
                        <span className={`text-[8px] font-mono font-bold px-1.5 py-0.5 rounded ${
                          selectedAsset === item.id ? "bg-brand text-white" : "bg-slate-100 text-slate-700"
                        }`}>
                          {item.badge}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. BOTTOM APP TAB BAR & HOME INDICATOR PILL */}
                <div className="relative z-30 shrink-0 rounded-b-[42px] overflow-hidden bg-white border-t border-rule pt-2 pb-3 px-3">
                  <div className="flex items-center justify-around text-[9px] font-medium text-[#000000]/50 mb-1.5">
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
                        onClick={() => setActiveNav(navId)}
                        className={`flex flex-col items-center gap-0.5 transition-all ${
                          activeNav === navId ? "text-brand font-bold" : "hover:text-[#000000]"
                        }`}
                      >
                        <span className="text-[11px]">{navId === "home" ? "◈" : navId === "explore" ? "🗺" : navId === "analytics" ? "📈" : "👤"}</span>
                        <span>{label}</span>
                      </button>
                    ))}
                  </div>

                  {/* iOS Home Indicator Pill */}
                  <div className="w-28 h-1 bg-[#0f172a]/40 rounded-full mx-auto" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* NATIVE CODE EDITOR TAB */}
        {activeTab === "code" && (
          <div className="w-full h-full max-w-[640px] rounded-xl bg-white border border-rule p-5 font-mono text-[12px] leading-relaxed overflow-x-auto flex flex-col justify-between shadow-xs">
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
            <div className="pt-3 border-t border-rule flex items-center justify-between text-[11px] text-[#000000]/50">
              <span>Expo SDK 52 • React Native 0.76 • Swift 6</span>
              <span className="text-emerald-600 font-medium">Native iOS & Android Binary</span>
            </div>
          </div>
        )}

        {/* PERFORMANCE & METRICS TAB */}
        {activeTab === "metrics" && (
          <div className="w-full max-w-[640px] grid grid-cols-2 gap-3.5 content-center">
            <div className="p-4 rounded-xl bg-white border border-rule text-center flex flex-col items-center justify-center shadow-xs">
              <div className="w-16 h-16 rounded-full border-4 border-emerald-500 bg-emerald-50 flex items-center justify-center text-[18px] font-bold font-mono text-emerald-600 mb-2">
                120Hz
              </div>
              <p className="text-[13px] font-medium text-[#000000]">ProMotion Fluidity</p>
              <p className="text-[10px] text-[#000000]/50">Zero dropped frames on gestures</p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-rule text-center flex flex-col items-center justify-center shadow-xs">
              <div className="w-16 h-16 rounded-full border-4 border-brand bg-blue-50 flex items-center justify-center text-[18px] font-bold font-mono text-brand mb-2">
                24MB
              </div>
              <p className="text-[13px] font-medium text-[#000000]">App Binary Size</p>
              <p className="text-[10px] text-[#000000]/50">Optimized Hermes bytecode</p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-rule text-center flex flex-col items-center justify-center shadow-xs">
              <div className="w-16 h-16 rounded-full border-4 border-emerald-500 bg-emerald-50 flex items-center justify-center text-[18px] font-bold font-mono text-emerald-600 mb-2">
                &lt; 50ms
              </div>
              <p className="text-[13px] font-medium text-[#000000]">Cold Startup Time</p>
              <p className="text-[10px] text-[#000000]/50">Instant SQLite cache boot</p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-rule text-center flex flex-col items-center justify-center shadow-xs">
              <div className="w-16 h-16 rounded-full border-4 border-purple-500 bg-purple-50 flex items-center justify-center text-[18px] font-bold font-mono text-purple-600 mb-2">
                100%
              </div>
              <p className="text-[13px] font-medium text-[#000000]">Offline Sync Ready</p>
              <p className="text-[10px] text-[#000000]/50">WatermelonDB + CRDT conflict resolver</p>
            </div>
          </div>
        )}
      </div>

      {/* Clean Footer Meta Badge */}
      <div className="relative z-10 px-6 py-2.5 border-t border-rule bg-white/95 flex items-center justify-between text-[11px] text-[#000000]/50 font-mono">
        <span className="flex items-center gap-1.5 font-bold text-brand">
          <span className="w-2 h-2 rounded-full bg-brand animate-ping" />
          TechGy Link Mobile Engineering Simulator
        </span>
        <span>iOS 18 • Android 15 • React Native 0.76 • Swift 6</span>
      </div>
    </div>
  );
}
