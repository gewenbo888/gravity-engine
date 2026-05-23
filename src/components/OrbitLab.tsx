"use client";

import { useEffect, useRef, useState } from "react";
import { T, useLang } from "./lang";
import { NEWTON_PILLARS, ORBIT_PRESETS } from "./content";

/**
 * Interactive Newtonian orbit simulator: a central mass + a test body whose
 * initial speed (as a fraction of circular-orbit speed) the user controls,
 * integrated with real inverse-square gravity. Shows circle → ellipse →
 * sub-orbital fall → hyperbolic escape, plus Newton's pillars.
 */
export default function OrbitLab() {
  const { lang } = useLang();
  const ref = useRef<HTMLCanvasElement>(null);
  const [vFrac, setVFrac] = useState(1.0);
  const [presetIdx, setPresetIdx] = useState(0);
  const vRef = useRef(vFrac);
  vRef.current = vFrac;

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

    const GM = 26000;       // gravitational parameter (tuned for screen)
    let trail: { x: number; y: number }[] = [];
    let body = { x: 0, y: 0, vx: 0, vy: 0 };
    let lastFrac = -1;
    let r0 = 0;

    const reset = (cx: number, cy: number) => {
      r0 = Math.min(W, H) * 0.27;
      const vCirc = Math.sqrt(GM / r0);
      body = { x: cx, y: cy - r0, vx: vCirc * vRef.current, vy: 0 };
      trail = [];
    };

    const draw = () => {
      const cx = W / 2, cy = H / 2;
      if (vRef.current !== lastFrac) { reset(cx, cy); lastFrac = vRef.current; }

      ctx.clearRect(0, 0, W, H);

      // gravity-well rings backdrop
      for (let i = 1; i <= 6; i++) {
        ctx.beginPath();
        ctx.arc(cx, cy, i * Math.min(W, H) * 0.06, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(125,140,255,${0.12 - i * 0.012})`;
        ctx.lineWidth = 1; ctx.stroke();
      }

      // integrate several substeps for accuracy
      const dt = 0.18;
      for (let s = 0; s < 6; s++) {
        const dx = cx - body.x, dy = cy - body.y;
        const r = Math.hypot(dx, dy) || 1;
        const a = GM / (r * r);
        body.vx += (dx / r) * a * dt;
        body.vy += (dy / r) * a * dt;
        body.x += body.vx * dt;
        body.y += body.vy * dt;
        // collision / far escape → recycle
        if (r < Math.min(W, H) * 0.03 || r > Math.max(W, H) * 1.4) { reset(cx, cy); break; }
      }
      trail.push({ x: body.x, y: body.y });
      if (trail.length > 520) trail.shift();

      // trail
      ctx.beginPath();
      trail.forEach((p, i) => (i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)));
      ctx.strokeStyle = "rgba(255,200,105,0.55)";
      ctx.lineWidth = 1.6; ctx.stroke();

      // central mass
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, 30);
      g.addColorStop(0, "#ffdc94"); g.addColorStop(0.4, "#ffb43d"); g.addColorStop(1, "rgba(240,138,0,0)");
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, 30, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#ffdc94"; ctx.beginPath(); ctx.arc(cx, cy, 7, 0, Math.PI * 2); ctx.fill();

      // body
      const bg = ctx.createRadialGradient(body.x, body.y, 0, body.x, body.y, 10);
      bg.addColorStop(0, "#c4d2ff"); bg.addColorStop(1, "rgba(125,140,255,0)");
      ctx.fillStyle = bg; ctx.beginPath(); ctx.arc(body.x, body.y, 10, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#f5f7ff"; ctx.beginPath(); ctx.arc(body.x, body.y, 3, 0, Math.PI * 2); ctx.fill();

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  const applyPreset = (i: number) => { setPresetIdx(i); setVFrac(ORBIT_PRESETS[i].vFrac); };

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <div className="lg:col-span-3">
        <div className="holo overflow-hidden rounded-xl">
          <canvas ref={ref} className="block h-[360px] w-full md:h-[440px]" />
        </div>
        <div className="mt-4 holo rounded-xl p-5">
          <div className="flex items-baseline justify-between">
            <span className="label-mono">Launch speed · 发射速度</span>
            <span className="mono text-sm text-accret-300">{(vFrac).toFixed(2)} × v<sub>circular</sub></span>
          </div>
          <input
            type="range" min={0.4} max={1.6} step={0.01} value={vFrac}
            onChange={(e) => { setVFrac(parseFloat(e.target.value)); setPresetIdx(-1); }}
            className="mt-3 w-full accent-warp-500"
          />
          <div className="mt-4 flex flex-wrap gap-2">
            {ORBIT_PRESETS.map((p, i) => (
              <button
                key={i}
                onClick={() => applyPreset(i)}
                className={`rounded-full border px-3 py-1 text-xs transition ${
                  presetIdx === i
                    ? "border-warp-500 bg-warp-500/20 text-warp-300"
                    : "border-void-500 text-ghost-300 hover:border-warp-500/60"
                } ${lang === "zh" ? "zh" : "mono"}`}
              >
                <T v={p.label} />
              </button>
            ))}
          </div>
          {presetIdx >= 0 && (
            <p className="mt-3 text-sm text-ghost-300"><T v={ORBIT_PRESETS[presetIdx].note} /></p>
          )}
        </div>
      </div>

      <div className="lg:col-span-2">
        <div className="label-mono">Newton&apos;s pillars · 牛顿的支柱</div>
        <div className="mt-4 space-y-3">
          {NEWTON_PILLARS.map((p, i) => (
            <div key={i} className="holo rounded-xl p-4" style={{ borderLeft: `3px solid ${p.accent}` }}>
              <div className="flex items-baseline justify-between gap-3">
                <span className={`text-base text-ghost-50 ${lang === "zh" ? "zh" : "display"}`}><T v={p.name} /></span>
                <span className="mono text-xs" style={{ color: p.accent }}>{p.formula}</span>
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-ghost-300"><T v={p.gloss} /></p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
