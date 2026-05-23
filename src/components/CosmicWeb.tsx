"use client";

import { useEffect, useRef } from "react";
import { T, useLang } from "./lang";
import { COSMIC_BUDGET, STRUCTURE_SCALES, ROTATION_CURVE } from "./content";

export default function CosmicWeb() {
  const { lang } = useLang();
  const webRef = useRef<HTMLCanvasElement>(null);

  // ---- rotation-curve SVG geometry ----
  const VW = 560, VH = 320, PAD = 48;
  const maxR = 30, maxV = 250;
  const sx = (r: number) => PAD + (r / maxR) * (VW - PAD - 16);
  const sy = (v: number) => VH - PAD - (v / maxV) * (VH - PAD - 20);
  const pathOf = (key: "visible" | "observed") =>
    ROTATION_CURVE.map((p, i) => `${i === 0 ? "M" : "L"}${sx(p.r).toFixed(1)},${sy(p[key]).toFixed(1)}`).join(" ");
  const gapArea =
    ROTATION_CURVE.map((p, i) => `${i === 0 ? "M" : "L"}${sx(p.r).toFixed(1)},${sy(p.observed).toFixed(1)}`).join(" ") +
    " " + [...ROTATION_CURVE].reverse().map((p) => `L${sx(p.r).toFixed(1)},${sy(p.visible).toFixed(1)}`).join(" ") + " Z";

  // ---- cosmic-web backdrop canvas ----
  useEffect(() => {
    const canvas = webRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf = 0, W = 0, H = 0;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      W = r.width; H = r.height;
      canvas.width = W * DPR; canvas.height = H * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize); ro.observe(canvas);
    let nodes: { x: number; y: number; r: number; ph: number }[] = [];
    const build = () => {
      const n = Math.max(34, Math.floor((W * H) / 6500));
      nodes = Array.from({ length: n }, () => ({ x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.8 + 0.6, ph: Math.random() * 6 }));
    };
    build();
    const ro2 = new ResizeObserver(build); ro2.observe(canvas);
    let t = 0;
    const draw = () => {
      t += 0.01;
      ctx.clearRect(0, 0, W, H);
      const maxD = Math.min(W, H) * 0.2;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
          if (d < maxD) {
            ctx.strokeStyle = `rgba(125,140,255,${(1 - d / maxD) * 0.13})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath(); ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(nodes[j].x, nodes[j].y); ctx.stroke();
          }
        }
      }
      for (const n of nodes) {
        const tw = 0.5 + 0.5 * Math.sin(t * 1.5 + n.ph);
        ctx.fillStyle = `rgba(197,210,255,${0.5 * tw})`;
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2); ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); ro2.disconnect(); };
  }, []);

  let cum = 0;

  return (
    <div className="space-y-8">
      {/* rotation curve — the smoking gun */}
      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <div className="holo rounded-xl p-4">
            <div className="label-mono">Galaxy rotation curve · 星系自转曲线</div>
            <svg viewBox={`0 0 ${VW} ${VH}`} className="mt-2 w-full">
              {/* gridlines */}
              {[0, 50, 100, 150, 200, 250].map((v) => (
                <g key={v}>
                  <line x1={PAD} y1={sy(v)} x2={VW - 16} y2={sy(v)} stroke="rgba(157,180,255,0.10)" />
                  <text x={PAD - 6} y={sy(v) + 3} textAnchor="end" fontSize="9" fill="#5b6488" fontFamily="monospace">{v}</text>
                </g>
              ))}
              {[0, 10, 20, 30].map((r) => (
                <text key={r} x={sx(r)} y={VH - PAD + 14} textAnchor="middle" fontSize="9" fill="#5b6488" fontFamily="monospace">{r}</text>
              ))}
              {/* dark-matter gap */}
              <path d={gapArea} fill="rgba(125,140,255,0.13)" />
              {/* visible-matter prediction (declining, dashed) */}
              <path d={pathOf("visible")} fill="none" stroke="#6cefef" strokeWidth="2" strokeDasharray="5 4" />
              {/* observed (flat, solid gold) */}
              <path d={pathOf("observed")} fill="none" stroke="#ffb43d" strokeWidth="2.5" />
              {/* axis labels */}
              <text x={VW / 2} y={VH - 8} textAnchor="middle" fontSize="9.5" fill="#8d96ba" fontFamily="monospace">
                {lang === "zh" ? "半径 (千秒差距)" : "radius (kpc)"}
              </text>
              <text x={14} y={VH / 2} textAnchor="middle" fontSize="9.5" fill="#8d96ba" fontFamily="monospace" transform={`rotate(-90 14 ${VH / 2})`}>
                {lang === "zh" ? "轨道速度 (km/s)" : "orbital speed (km/s)"}
              </text>
              {/* gap label */}
              <text x={sx(20)} y={sy(160)} fontSize="11" fill="#9db4ff" fontFamily="monospace" fontWeight="600">
                {lang === "zh" ? "暗物质" : "dark matter"}
              </text>
            </svg>
            <div className="mt-1 flex flex-wrap gap-x-5 gap-y-1 mono text-[0.62rem]">
              <span className="text-accret-300">— {lang === "zh" ? "实测（保持平直）" : "observed (stays flat)"}</span>
              <span className="text-wave-300">- - {lang === "zh" ? "可见物质预测（应下降）" : "visible-matter prediction (should fall)"}</span>
            </div>
          </div>
        </div>
        <div className="lg:col-span-2 flex flex-col justify-center">
          <p className="text-base leading-relaxed text-ghost-200">
            <T v={{
              en: "Stars at a galaxy's edge should slow down — but they don't. They orbit just as fast far out as near the center. Either there is five times more invisible mass than we can see, or our law of gravity is wrong.",
              zh: "星系边缘的恒星本该慢下来——但它们没有。在外缘，它们绕行得和靠近中心时一样快。要么存在五倍于可见物质的隐形质量，要么我们的引力定律错了。",
            }} />
          </p>
        </div>
      </div>

      {/* cosmic energy budget */}
      <div>
        <div className="label-mono">The cosmic energy budget · 宇宙的能量预算</div>
        <div className="mt-3 flex h-12 w-full overflow-hidden rounded-lg border border-void-500">
          {COSMIC_BUDGET.map((b, i) => (
            <div key={i} className="flex items-center justify-center" style={{ width: `${b.pct}%`, background: `${b.accent}30`, borderRight: i < 2 ? `1px solid #04060f` : undefined }}>
              <span className="mono text-xs font-medium" style={{ color: b.accent }}>{b.pct}%</span>
            </div>
          ))}
        </div>
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {COSMIC_BUDGET.map((b, i) => (
            <div key={i} className="holo rounded-xl p-4" style={{ borderTop: `2px solid ${b.accent}` }}>
              <div className="flex items-baseline justify-between">
                <span className={`text-base text-ghost-50 ${lang === "zh" ? "zh" : "display"}`}><T v={b.name} /></span>
                <span className="mono text-sm" style={{ color: b.accent }}>{b.pct}%</span>
              </div>
              <p className="mt-1.5 text-xs leading-relaxed text-ghost-300"><T v={b.gloss} /></p>
            </div>
          ))}
        </div>
      </div>

      {/* structure ladder over a cosmic-web backdrop */}
      <div className="holo relative overflow-hidden rounded-xl p-5">
        <canvas ref={webRef} className="pointer-events-none absolute inset-0 h-full w-full opacity-60" />
        <div className="relative">
          <div className="label-mono">Gravity assembles structure · 引力组装结构</div>
          <div className="mt-4 grid grid-cols-2 gap-2.5 md:grid-cols-5">
            {STRUCTURE_SCALES.map((s, i) => (
              <div key={i} className="rounded-lg border border-void-500/70 bg-void-900/70 p-3 backdrop-blur-sm" style={{ borderBottom: `2px solid ${s.accent}` }}>
                <div className="mono text-[0.62rem]" style={{ color: s.accent }}><T v={s.size} /></div>
                <div className={`mt-1 text-sm text-ghost-50 ${lang === "zh" ? "zh" : "display"}`}><T v={s.name} /></div>
                <p className="mt-1 text-[0.68rem] leading-snug text-ghost-300"><T v={s.gloss} /></p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
