"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function MobileDevCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<"preview" | "code" | "metrics">("preview");
  const [activeCard, setActiveCard] = useState<number>(0);
  const [notifVisible, setNotifVisible] = useState(true);

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
      gsap.to(".phone-frame", {
        y: -6,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, [activeTab]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[520px] bg-[#f8f9fa] text-[#000000] overflow-hidden flex flex-col select-none border-l border-rule/50"
    >
      {/* Background Subtle Gradient & Grid */}
      <div className="mob-orb-1 absolute -top-16 -right-16 w-80 h-80 rounded-full bg-blue-100/60 blur-3xl pointer-events-none" />
      <div className="mob-orb-2 absolute -bottom-16 -left-16 w-80 h-80 rounded-full bg-indigo-100/50 blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#00000010_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

      {/* Simulator Top Toolbar */}
      <div className="relative z-10 flex items-center justify-between px-4 py-3 border-b border-rule bg-white/80 backdrop-blur-md">
        {/* Device target */}
        <div className="flex items-center gap-2 text-[11px] font-mono text-[#000000]/70">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-semibold text-brand">iOS & Android</span>
          <span className="text-[#000000]/40">/ React Native & Swift</span>
        </div>

        {/* View Mode Switcher Tabs */}
        <div className="flex items-center gap-1 bg-[#e2e8f0]/60 p-0.5 rounded-lg border border-rule text-[11px]">
          <button
            type="button"
            onClick={() => setActiveTab("preview")}
            className={`px-2.5 py-1 rounded-md transition-all ${
              activeTab === "preview"
                ? "bg-white text-brand font-medium shadow-xs"
                : "text-[#000000]/60 hover:text-[#000000]"
            }`}
          >
            Simulator
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("code")}
            className={`px-2.5 py-1 rounded-md transition-all ${
              activeTab === "code"
                ? "bg-white text-brand font-medium shadow-xs"
                : "text-[#000000]/60 hover:text-[#000000]"
            }`}
          >
            Native Code
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("metrics")}
            className={`px-2.5 py-1 rounded-md transition-all ${
              activeTab === "metrics"
                ? "bg-white text-brand font-medium shadow-xs"
                : "text-[#000000]/60 hover:text-[#000000]"
            }`}
          >
            Performance
          </button>
        </div>
      </div>

      {/* Main Canvas Body */}
      <div className="relative z-10 flex-1 p-5 flex flex-col items-center justify-center overflow-hidden">
        {activeTab === "preview" && (
          <div className="phone-frame w-full max-w-[340px] bg-white rounded-3xl border-4 border-[#0f1a34] shadow-[0_20px_45px_rgba(0,0,0,0.12)] p-4 flex flex-col gap-3.5 relative">
            {/* Dynamic Island / Status Bar */}
            <div className="flex items-center justify-between px-2 pt-0.5 text-[11px] font-mono text-[#000000]">
              <span className="font-semibold">9:41</span>
              {/* Dynamic Island */}
              <div className="h-4 w-20 bg-[#0f1a34] rounded-full flex items-center justify-center gap-1.5 px-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-[8px] text-white/90 font-sans">Active Sync</span>
              </div>
              <div className="flex items-center gap-1 text-[10px]">
                <span>5G</span>
                <span>100%</span>
              </div>
            </div>

            {/* Interactive Simulated Push Notification */}
            {notifVisible && (
              <div className="p-2.5 bg-[#f8f9fa] rounded-xl border border-rule shadow-xs flex items-center justify-between text-[11px] animate-fadeIn">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-brand text-white flex items-center justify-center text-[10px] font-bold">
                    TG
                  </div>
                  <div>
                    <span className="font-semibold text-[#000000] block">New Verified Asset</span>
                    <span className="text-[#000000]/60 text-[10px]">Tap to inspect telemetry</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setNotifVisible(false)}
                  className="text-[#000000]/40 hover:text-[#000000] text-[12px] px-1"
                >
                  ✕
                </button>
              </div>
            )}

            {/* In-app Interactive Action Cards */}
            <div className="space-y-2">
              <div
                onClick={() => setActiveCard(0)}
                className={`p-3 rounded-xl border transition-all cursor-pointer ${
                  activeCard === 0
                    ? "bg-blue-50/60 border-brand shadow-xs"
                    : "bg-white border-rule hover:border-rule"
                }`}
              >
                <div className="flex justify-between items-center text-[11px] mb-1">
                  <span className="font-semibold text-[#000000]">Farmland Discovery Flow</span>
                  <span className="text-brand font-mono font-medium text-[10px]">Native Maps</span>
                </div>
                <p className="text-[11px] text-[#000000]/70">Smooth 60fps pan, pinch zoom & geospatial parcel boundaries.</p>
              </div>

              <div
                onClick={() => setActiveCard(1)}
                className={`p-3 rounded-xl border transition-all cursor-pointer ${
                  activeCard === 1
                    ? "bg-blue-50/60 border-brand shadow-xs"
                    : "bg-white border-rule hover:border-rule"
                }`}
              >
                <div className="flex justify-between items-center text-[11px] mb-1">
                  <span className="font-semibold text-[#000000]">Biometric Authentication</span>
                  <span className="text-emerald-600 font-mono font-medium text-[10px]">FaceID Ready</span>
                </div>
                <p className="text-[11px] text-[#000000]/70">Instant secure token storage with offline encrypted cache.</p>
              </div>
            </div>

            {/* Bottom App Navigation Bar */}
            <div className="pt-2 border-t border-rule flex items-center justify-around text-[10px] text-[#000000]/60">
              <span className="text-brand font-semibold">Explore</span>
              <span>Saved</span>
              <span>Documents</span>
              <span>Profile</span>
            </div>

            {/* Home Indicator */}
            <div className="w-24 h-1 bg-[#0f1a34]/30 rounded-full mx-auto" />
          </div>
        )}

        {activeTab === "code" && (
          <div className="w-full h-full rounded-xl bg-white border border-rule p-4 font-mono text-[12px] leading-relaxed overflow-x-auto flex flex-col justify-between shadow-xs">
            <div className="space-y-1">
              <p className="text-[#000000]/40">// MobileApplication.tsx</p>
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
                <span className="text-brand font-bold">NativeInteractiveCard</span>() {"{"}
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
            <div className="pt-2 border-t border-rule flex items-center justify-between text-[11px] text-[#000000]/50">
              <span>Expo SDK 52 • React Native 0.76</span>
              <span className="text-emerald-600 font-medium">Target: iOS 18 & Android 15</span>
            </div>
          </div>
        )}

        {activeTab === "metrics" && (
          <div className="w-full h-full grid grid-cols-2 gap-3.5 content-center">
            <div className="p-4 rounded-xl bg-white border border-rule text-center flex flex-col items-center justify-center shadow-xs">
              <div className="w-16 h-16 rounded-full border-4 border-emerald-500 bg-emerald-50 flex items-center justify-center text-[18px] font-bold font-mono text-emerald-600 mb-2">
                120Hz
              </div>
              <p className="text-[13px] font-medium text-[#000000]">ProMotion Fluidity</p>
              <p className="text-[10px] text-[#000000]/50">Zero dropped frames</p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-rule text-center flex flex-col items-center justify-center shadow-xs">
              <div className="w-16 h-16 rounded-full border-4 border-brand bg-blue-50 flex items-center justify-center text-[18px] font-bold font-mono text-brand mb-2">
                24MB
              </div>
              <p className="text-[13px] font-medium text-[#000000]">App Bundle Size</p>
              <p className="text-[10px] text-[#000000]/50">Optimized lean binary</p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-rule text-center flex flex-col items-center justify-center shadow-xs">
              <div className="w-16 h-16 rounded-full border-4 border-emerald-500 bg-emerald-50 flex items-center justify-center text-[18px] font-bold font-mono text-emerald-600 mb-2">
                &lt; 50ms
              </div>
              <p className="text-[13px] font-medium text-[#000000]">Startup Time</p>
              <p className="text-[10px] text-[#000000]/50">Instant cold boot</p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-rule text-center flex flex-col items-center justify-center shadow-xs">
              <div className="w-16 h-16 rounded-full border-4 border-purple-500 bg-purple-50 flex items-center justify-center text-[18px] font-bold font-mono text-purple-600 mb-2">
                100%
              </div>
              <p className="text-[13px] font-medium text-[#000000]">Offline Sync</p>
              <p className="text-[10px] text-[#000000]/50">Local SQLite & WatermelonDB</p>
            </div>
          </div>
        )}
      </div>

      {/* Clean Footer Meta Badge */}
      <div className="relative z-10 px-4 py-2 border-t border-rule bg-white/80 flex items-center justify-between text-[11px] text-[#000000]/50">
        <span className="flex items-center gap-1.5 font-medium text-brand">
          <span className="w-2 h-2 rounded-full bg-brand animate-ping" />
          Interactive Mobile Canvas
        </span>
        <span>TechGy Link Mobile Engineering</span>
      </div>
    </div>
  );
}
