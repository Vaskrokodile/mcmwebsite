"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const metrics: Record<string, { points: number[]; color: string }> = {
  views: {
    points: [2,3,5,8,5,3,8,12,10,7,10,15,18,12,20,30,20,8,15,5,20,45,30,50,60,80,100,60,130,145,160,180,200,195,215,210,230,220,240,255],
    color: "#22d3ee",
  },
  ccu: {
    points: [2,3,5,8,10,8,5,10,15,20,25,20,30,35,45,40,50,55,60,75,85,80,100,115,110,130,100,130,140,150,160,155,170,165,180,185,190,195,200,210],
    color: "#38bdf8",
  },
  conversion: {
    points: [100,90,110,95,115,100,105,115,110,120,115,125,120,130,125,135,130,140,138,145,142,150,148,155,152,160,158,165,162,170,168,175,172,178,174,180,176,182,178,185],
    color: "#67e8f9",
  },
};

function buildPath(pts: number[]) {
  const W = 860, H = 200, pad = 10;
  const min = Math.min(...pts), max = Math.max(...pts);
  const range = max - min || 1;
  const xs = pts.map((_, i) => (i / (pts.length - 1)) * (W - pad * 2) + pad);
  const ys = pts.map((v) => H - pad - ((v - min) / range) * (H - pad * 2));
  let d = `M ${xs[0]},${ys[0]}`;
  for (let i = 1; i < xs.length; i++) {
    const cpx1 = xs[i - 1] + (xs[i] - xs[i - 1]) * 0.4;
    const cpx2 = xs[i] - (xs[i] - xs[i - 1]) * 0.4;
    d += ` C ${cpx1},${ys[i - 1]} ${cpx2},${ys[i]} ${xs[i]},${ys[i]}`;
  }
  const fill = d + ` L ${xs[xs.length - 1]},${H} L ${xs[0]},${H} Z`;
  return { line: d, fill, xs, ys };
}

const tabs = [
  { key: "views", label: "Views", val: "2.4M", delta: "+18.3% ↑", positive: true },
  { key: "ccu", label: "CCU", val: "84,210", delta: "+7.1% ↑", positive: true },
  { key: "conversion", label: "Conversion Rate", val: "6.38%", delta: "−0.4% ↓", positive: false },
];

export function Dashboard() {
  const [active, setActive] = useState("views");
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const clipRef = useRef<SVGRectElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const fillRef = useRef<SVGPathElement>(null);
  const dotsRef = useRef<SVGGElement>(null);
  const gradRef = useRef<SVGStopElement>(null);
  const animRef = useRef<number>(0);

  const animateChart = useCallback((metric: string) => {
    if (animRef.current) cancelAnimationFrame(animRef.current);
    const data = metrics[metric];
    const { line, fill, xs, ys } = buildPath(data.points);
    if (!lineRef.current || !fillRef.current || !clipRef.current || !dotsRef.current || !gradRef.current) return;

    lineRef.current.setAttribute("stroke", data.color);
    gradRef.current.setAttribute("stop-color", data.color);
    lineRef.current.setAttribute("d", line);
    fillRef.current.setAttribute("d", fill);
    dotsRef.current.innerHTML = "";

    const start = performance.now();
    function tick(now: number) {
      const t = Math.min((now - start) / 700, 1);
      const ease = 1 - Math.pow(1 - t, 4);
      const w = 860 * ease;
      clipRef.current?.setAttribute("width", String(w));

      if (dotsRef.current) {
        dotsRef.current.innerHTML = "";
        xs.forEach((x, i) => {
          if (x <= w) {
            const c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            c.setAttribute("cx", String(x));
            c.setAttribute("cy", String(ys[i]));
            c.setAttribute("r", "3.5");
            c.setAttribute("fill", data.color);
            c.setAttribute("opacity", "0.85");
            dotsRef.current?.appendChild(c);
          }
        });
      }
      if (t < 1) animRef.current = requestAnimationFrame(tick);
    }
    animRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          setTimeout(() => animateChart(active), 400);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [active, animateChart]);

  const handleTab = (key: string) => {
    setActive(key);
    animateChart(key);
  };

  return (
    <div
      ref={ref}
      className={`relative w-[82%] max-w-[980px] rounded-t-[28px] border border-b-0 border-white/[0.18] overflow-hidden mt-auto transition-all duration-[850ms] ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
      }`}
      style={{
        background: "linear-gradient(160deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 40%, rgba(6,182,212,0.04) 100%)",
        backdropFilter: "blur(48px) saturate(200%) brightness(1.15)",
        boxShadow: "inset 0 1.5px 0 rgba(255,255,255,0.35), 0 -24px 80px rgba(6,182,212,0.18), 0 40px 80px rgba(0,0,0,0.35)",
      }}
    >
      {/* Shimmer line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] z-[2] pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0) 10%, rgba(34,211,238,0.7) 30%, rgba(255,255,255,0.9) 50%, rgba(56,189,248,0.7) 70%, rgba(255,255,255,0) 90%, transparent 100%)",
          borderRadius: "28px 28px 0 0",
        }}
      />
      {/* Inner glow */}
      <div className="absolute inset-0 pointer-events-none z-[1]"
        style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.07) 0%, transparent 65%)" }}
      />

      {/* Topbar */}
      <div className="relative z-[3] flex items-center justify-between px-7 py-4 border-b border-white/[0.08]">
        <span className="text-[1.15rem] font-bold text-white/95 tracking-tight">Analytics</span>
        <div className="flex items-center gap-2">
          <div className="text-xs text-white/45 bg-white/5 border border-white/[0.08] rounded-lg px-3 py-1 cursor-pointer hover:bg-white/[0.09] hover:text-white transition-all">
            Last 30 days ▾
          </div>
          {["⚙", "🔔"].map((icon) => (
            <div key={icon} className="w-8 h-8 rounded-full flex items-center justify-center text-xs cursor-pointer text-[#0c4a6e]"
              style={{
                background: "linear-gradient(90deg, #f0fdff 0%, #22d3ee 100%)",
                boxShadow: "inset 0 2px 4px rgba(255,255,255,0.9), inset 0 -2px 4px rgba(0,0,0,0.1), 0 10px 25px rgba(34,211,238,0.3)",
              }}
            >
              {icon}
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="relative z-[3] flex gap-3 px-7 py-5 border-b border-white/[0.06]">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => handleTab(tab.key)}
            className={`flex-1 flex items-center justify-between gap-4 px-5 py-4 rounded-2xl border transition-all duration-300 cursor-pointer ${
              active === tab.key
                ? "border-cyan-300/35 bg-gradient-to-br from-cyan-400/15 to-cyan-700/8 shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_8px_32px_rgba(6,182,212,0.2)] -translate-y-0.5"
                : "border-white/[0.08] bg-gradient-to-br from-white/5 to-white/[0.02] shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_4px_16px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 hover:border-white/[0.14]"
            }`}
            style={{ backdropFilter: "blur(20px)" }}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-[#0c4a6e] transition-all ${
                  active === tab.key ? "scale-105" : ""
                }`}
                style={{
                  background: active === tab.key
                    ? "linear-gradient(90deg, #ffffff 10%, #67e8f9 100%)"
                    : "linear-gradient(90deg, #f0fdff 0%, #22d3ee 100%)",
                  boxShadow: active === tab.key
                    ? "inset 0 3px 6px rgba(255,255,255,1), 0 15px 35px rgba(34,211,238,0.45)"
                    : "inset 0 2px 4px rgba(255,255,255,0.9), 0 10px 25px rgba(34,211,238,0.3)",
                }}
              >
                {tab.key === "views" && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
                  </svg>
                )}
                {tab.key === "ccu" && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                )}
                {tab.key === "conversion" && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" />
                  </svg>
                )}
              </div>
              <div className="flex flex-col gap-0.5 text-left">
                <span className={`text-[0.65rem] font-semibold tracking-[0.1em] uppercase transition-colors ${active === tab.key ? "text-white/65" : "text-white/35"}`}>
                  {tab.label}
                </span>
                <span className={`text-xl font-bold tracking-tight leading-none transition-all ${active === tab.key ? "text-white [text-shadow:0_0_24px_rgba(34,211,238,0.5)]" : "text-white/45"}`}>
                  {tab.val}
                </span>
              </div>
            </div>
            <span className={`text-[0.7rem] font-bold rounded-lg px-2.5 py-1 whitespace-nowrap tracking-wide transition-all ${
              active === tab.key
                ? tab.positive
                  ? "text-green-400 bg-green-400/12 shadow-[0_0_12px_rgba(74,222,128,0.1)]"
                  : "text-red-400 bg-red-400/12"
                : tab.positive
                  ? "text-green-400/45"
                  : "text-red-400/45"
            }`}>
              {tab.delta}
            </span>
          </button>
        ))}
      </div>

      {/* Chart */}
      <div className="relative z-[3] flex flex-col px-7 pt-4 pb-2 h-[220px]">
        <div className="flex-1 w-full overflow-visible">
          <svg viewBox="0 0 860 200" preserveAspectRatio="none" width="100%" height="100%">
            <defs>
              <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                <stop ref={gradRef} offset="0%" stopColor="#22d3ee" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
              </linearGradient>
              <clipPath id="chartClip">
                <rect ref={clipRef} x="0" y="0" width="0" height="200" />
              </clipPath>
            </defs>
            <line x1="0" y1="40" x2="860" y2="40" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            <line x1="0" y1="90" x2="860" y2="90" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            <line x1="0" y1="140" x2="860" y2="140" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            <line x1="0" y1="190" x2="860" y2="190" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            <path ref={fillRef} fill="url(#chartGrad)" clipPath="url(#chartClip)" />
            <path ref={lineRef} fill="none" stroke="#22d3ee" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" clipPath="url(#chartClip)" />
            <g ref={dotsRef} />
          </svg>
        </div>
        <div className="flex justify-between px-1 pt-1.5 text-[0.65rem] text-white/[0.28] tracking-wider">
          <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span>
        </div>
      </div>
    </div>
  );
}
