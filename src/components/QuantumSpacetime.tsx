"use client";

import { useEffect, useRef, useState } from "react";
import { T, useLang } from "./lang";
import { QG_APPROACHES, QG_TENSIONS } from "./content";

/**
 * Quantum gravity: a living spin-network / spacetime-foam canvas, the GR↔QM
 * tension table, and a selectable gallery of competing approaches.
 */
export default function QuantumSpacetime() {
  const { lang } = useLang();
  const ref = useRef<HTMLCanvasElement>(null);
  const [sel, setSel] = useState(3); // holographic principle by default

  useEffect(() => {
    const canvas = ref.current;
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

    // spin-network nodes
    let nodes: { x: number; y: number; bx: number; by: number; ph: number; r: number }[] = [];
    const build = () => {
      const count = Math.max(26, Math.floor((W * H) / 9000));
      nodes = Array.from({ length: count }, () => {
        const bx = Math.random() * W, by = Math.random() * H;
        return { x: bx, y: by, bx, by, ph: Math.random() * Math.PI * 2, r: Math.random() * 2 + 1.4 };
      });
    };
    build();
    const ro2 = new ResizeObserver(build); ro2.observe(canvas);

    let t = 0;
    // transient virtual pairs
    let pairs: { x: number; y: number; life: number }[] = [];

    const draw = () => {
      t += 0.016;
      ctx.clearRect(0, 0, W, H);

      // jitter nodes around base positions (Planck-scale fluctuation)
      for (const n of nodes) {
        n.x = n.bx + Math.sin(t * 1.7 + n.ph) * 7;
        n.y = n.by + Math.cos(t * 1.3 + n.ph * 1.4) * 7;
      }
      // edges between near neighbors — flickering
      const maxD = Math.min(W, H) * 0.22;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < maxD) {
            const flick = 0.5 + 0.5 * Math.sin(t * 3 + (i + j));
            const al = (1 - d / maxD) * 0.4 * flick;
            ctx.strokeStyle = `rgba(${i % 2 ? "108,239,239" : "125,140,255"},${al})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
      }
      // nodes
      for (const n of nodes) {
        ctx.fillStyle = "#9db4ff";
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2); ctx.fill();
      }
      // spawn virtual pairs (gold flashes)
      if (Math.random() < 0.18) pairs.push({ x: Math.random() * W, y: Math.random() * H, life: 1 });
      pairs = pairs.filter((p) => p.life > 0);
      for (const p of pairs) {
        p.life -= 0.04;
        ctx.fillStyle = `rgba(255,180,61,${p.life * 0.9})`;
        const off = (1 - p.life) * 6;
        ctx.beginPath(); ctx.arc(p.x - off, p.y, 1.8, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(p.x + off, p.y, 1.8, 0, Math.PI * 2); ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); ro2.disconnect(); };
  }, []);

  return (
    <div className="space-y-8">
      {/* foam canvas */}
      <div className="holo overflow-hidden rounded-xl">
        <div className="relative">
          <canvas ref={ref} className="block h-[300px] w-full md:h-[360px]" />
          <div className="pointer-events-none absolute left-5 top-4">
            <div className="label-mono">Spacetime foam · 时空泡沫</div>
            <div className="mt-1 max-w-xs text-xs text-ghost-300">
              <T v={{ en: "Zoom to the Planck scale and smooth spacetime should boil — fluctuating, discrete, woven from quantum information.", zh: "缩放到普朗克尺度，光滑的时空就应当沸腾——涨落、离散，由量子信息编织而成。" }} />
            </div>
          </div>
        </div>
      </div>

      {/* GR vs QM tension */}
      <div>
        <div className="grid grid-cols-2 gap-3 text-center md:gap-6">
          <div className="rounded-t-lg border-b-2 border-warp-500 py-2">
            <div className={`text-lg text-warp-300 ${lang === "zh" ? "zh" : "display"}`}>
              <T v={{ en: "General Relativity", zh: "广义相对论" }} />
            </div>
            <div className="mono text-[0.65rem] text-ghost-500">smooth · curved · certain</div>
          </div>
          <div className="rounded-t-lg border-b-2 border-wave-500 py-2">
            <div className={`text-lg text-wave-300 ${lang === "zh" ? "zh" : "display"}`}>
              <T v={{ en: "Quantum Mechanics", zh: "量子力学" }} />
            </div>
            <div className="mono text-[0.65rem] text-ghost-500">discrete · jittery · probabilistic</div>
          </div>
        </div>
        <div className="mt-3 space-y-2">
          {QG_TENSIONS.map((row, i) => (
            <div key={i} className="grid grid-cols-2 gap-3 md:gap-6">
              <div className="holo rounded-l-lg p-3 text-right text-sm text-ghost-200"><T v={row.gr} /></div>
              <div className="holo rounded-r-lg p-3 text-left text-sm text-ghost-200"><T v={row.qm} /></div>
              <div className="pointer-events-none col-span-2 -mt-[1.85rem] flex justify-center">
                <span className="rounded-full border border-accret-500/40 bg-void-950 px-2.5 py-0.5 mono text-[0.6rem] uppercase tracking-widest text-accret-300">
                  <T v={row.aspect} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* approaches gallery */}
      <div>
        <div className="label-mono">Roads to quantum gravity · 通往量子引力之路</div>
        <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-6">
          {QG_APPROACHES.map((a, i) => (
            <button
              key={i}
              onClick={() => setSel(i)}
              className={`holo rounded-lg p-3 text-left transition ${sel === i ? "ring-1" : "opacity-70 hover:opacity-100"}`}
              style={sel === i ? { borderColor: a.accent, boxShadow: `0 0 24px -10px ${a.accent}` } : {}}
            >
              <div className={`text-xs leading-tight text-ghost-50 ${lang === "zh" ? "zh" : "display"}`}><T v={a.name} /></div>
              <div className="mt-1 mono text-[0.58rem]" style={{ color: a.accent }}><T v={a.status} /></div>
            </button>
          ))}
        </div>
        <div className="mt-4 holo rounded-xl p-5" style={{ borderLeft: `3px solid ${QG_APPROACHES[sel].accent}` }}>
          <div className={`text-lg text-ghost-50 ${lang === "zh" ? "zh" : "display"}`}><T v={QG_APPROACHES[sel].name} /></div>
          <p className="mt-2 text-sm leading-relaxed text-ghost-200"><T v={QG_APPROACHES[sel].idea} /></p>
          <div className="mt-2 mono text-xs" style={{ color: QG_APPROACHES[sel].accent }}>
            <T v={{ en: "status: ", zh: "状态：" }} /><T v={QG_APPROACHES[sel].status} />
          </div>
        </div>
      </div>
    </div>
  );
}
