"use client";

import { useEffect, useRef, useState } from "react";
import { T, useLang } from "./lang";
import { GR_CONCEPTS, FIELD_EQUATION } from "./content";

/**
 * Interactive spacetime-curvature sheet: a 3-D-looking grid dished by a
 * central mass the user can scale. A test particle traces a geodesic in the
 * well. Demonstrates "gravity is not a force, it is geometry."
 */
export default function CurvatureWell() {
  const { lang } = useLang();
  const ref = useRef<HTMLCanvasElement>(null);
  const [mass, setMass] = useState(0.6);
  const mRef = useRef(mass);
  mRef.current = mass;

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

    let t = 0;
    const N = 22; // grid resolution

    const draw = () => {
      t += 0.012;
      ctx.clearRect(0, 0, W, H);
      const cx = W / 2, cy = H * 0.46;
      const depth = mRef.current * Math.min(W, H) * 0.95;
      const sigma = Math.min(W, H) * 0.26;

      // dip function — how far a grid point sinks toward the mass
      const dipAt = (x: number, y: number) => {
        const d = Math.hypot(x - cx, y - cy);
        return depth / (1 + (d * d) / (sigma * sigma));
      };
      // project a logical (x,y) with vertical sink applied, plus slight isometric squash
      const proj = (x: number, y: number) => {
        const sink = dipAt(x, y);
        return { x, y: y * 0.62 + H * 0.16 + sink * 0.5 };
      };

      const stepX = W / N;
      const stepY = (H * 1.05) / N;

      ctx.lineWidth = 1;
      // rows
      for (let j = 0; j <= N; j++) {
        ctx.beginPath();
        for (let i = 0; i <= N; i++) {
          const p = proj(i * stepX, j * stepY);
          i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
        }
        const dipCenter = dipAt(cx, (j * stepY) * 0.62 + H * 0.16);
        const a = 0.08 + Math.min(0.32, dipCenter / (depth + 1) * 0.4);
        ctx.strokeStyle = `rgba(125,140,255,${0.1 + a})`;
        ctx.stroke();
      }
      // cols
      for (let i = 0; i <= N; i++) {
        ctx.beginPath();
        for (let j = 0; j <= N; j++) {
          const p = proj(i * stepX, j * stepY);
          j === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
        }
        ctx.strokeStyle = "rgba(157,180,255,0.10)";
        ctx.stroke();
      }

      // geodesic test particle orbiting in the well
      const orbR = sigma * (0.62 + 0.25 * Math.sin(t * 0.4));
      const ang = t * 1.1;
      const ox = cx + Math.cos(ang) * orbR;
      const oyLogical = cy + Math.sin(ang) * orbR;
      const op = proj(ox, oyLogical);
      // trailing arc
      ctx.beginPath();
      for (let k = 0; k < 36; k++) {
        const aa = ang - k * 0.05;
        const xx = cx + Math.cos(aa) * orbR;
        const yy = cy + Math.sin(aa) * orbR;
        const pp = proj(xx, yy);
        k === 0 ? ctx.moveTo(pp.x, pp.y) : ctx.lineTo(pp.x, pp.y);
      }
      ctx.strokeStyle = "rgba(108,239,239,0.55)"; ctx.lineWidth = 1.5; ctx.stroke();
      const pg = ctx.createRadialGradient(op.x, op.y, 0, op.x, op.y, 8);
      pg.addColorStop(0, "#a6f7f5"); pg.addColorStop(1, "rgba(47,224,230,0)");
      ctx.fillStyle = pg; ctx.beginPath(); ctx.arc(op.x, op.y, 8, 0, Math.PI * 2); ctx.fill();

      // central mass at the bottom of the well
      const mp = proj(cx, cy);
      const mg = ctx.createRadialGradient(mp.x, mp.y, 0, mp.x, mp.y, 26);
      mg.addColorStop(0, "#ffdc94"); mg.addColorStop(0.45, "#ffb43d"); mg.addColorStop(1, "rgba(240,138,0,0)");
      ctx.fillStyle = mg; ctx.beginPath(); ctx.arc(mp.x, mp.y, 26, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#ffdc94"; ctx.beginPath();
      ctx.arc(mp.x, mp.y, 6 + mRef.current * 8, 0, Math.PI * 2); ctx.fill();

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <div className="lg:col-span-3">
        <div className="holo overflow-hidden rounded-xl">
          <canvas ref={ref} className="block h-[360px] w-full md:h-[440px]" />
        </div>
        <div className="mt-4 holo rounded-xl p-5">
          <div className="flex items-baseline justify-between">
            <span className="label-mono">Mass-energy · 质能</span>
            <span className="mono text-sm text-accret-300">{Math.round(mass * 100)}%</span>
          </div>
          <input
            type="range" min={0.05} max={1} step={0.01} value={mass}
            onChange={(e) => setMass(parseFloat(e.target.value))}
            className="mt-3 w-full accent-warp-500"
          />
          <p className="mt-3 text-sm leading-relaxed text-ghost-300">
            <T v={{
              en: "Drag the mass. More mass-energy means a deeper well — and the test particle (cyan) is not pulled by a force; it simply follows the straightest path through the curved geometry.",
              zh: "拖动质量。质能越大，引力阱越深——而那颗测试粒子（青色）并非被某种力拽动；它只是沿弯曲几何中最直的路径前行。",
            }} />
          </p>
          <div className="mt-4 rounded-lg border border-warp-500/25 bg-void-900/60 px-4 py-3 text-center">
            <div className="label-mono">Einstein field equation · 爱因斯坦场方程</div>
            <div className="mono mt-1.5 text-base text-warp-300">{FIELD_EQUATION}</div>
            <div className="mt-1 text-[0.7rem] text-ghost-500">
              <T v={{ en: "matter tells spacetime how to curve; spacetime tells matter how to move", zh: "物质告诉时空如何弯曲；时空告诉物质如何运动" }} />
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-2">
        <div className="label-mono">The geometry of gravity · 引力的几何</div>
        <div className="mt-4 grid gap-3">
          {GR_CONCEPTS.map((c, i) => (
            <div key={i} className="holo rounded-xl p-4" style={{ borderLeft: `3px solid ${c.accent}` }}>
              <div className={`text-base text-ghost-50 ${lang === "zh" ? "zh" : "display"}`}><T v={c.name} /></div>
              <p className="mt-1.5 text-sm leading-relaxed text-ghost-300"><T v={c.gloss} /></p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
