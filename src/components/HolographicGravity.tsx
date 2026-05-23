"use client";

import { useEffect, useRef, useState } from "react";
import { T, useLang } from "./lang";
import { EMERGENT_IDEAS, TRAD_VS_EMERGENT } from "./content";

/**
 * Emergent / holographic gravity: a holographic-boundary canvas (a 2-D boundary
 * of bits projecting a 3-D bulk), the traditional-vs-emergent comparison, and
 * the gallery of radical ideas.
 */
export default function HolographicGravity() {
  const { lang } = useLang();
  const ref = useRef<HTMLCanvasElement>(null);
  const [sel, setSel] = useState(1);

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
    const draw = () => {
      t += 0.014;
      ctx.clearRect(0, 0, W, H);
      const cx = W / 2, cy = H / 2;
      const R = Math.min(W, H) * 0.4;

      // boundary circle (the 2-D screen of information)
      const Nbits = 60;
      const bits: { x: number; y: number; a: number }[] = [];
      for (let i = 0; i < Nbits; i++) {
        const ang = (i / Nbits) * Math.PI * 2;
        const x = cx + Math.cos(ang) * R;
        const y = cy + Math.sin(ang) * R;
        const a = 0.4 + 0.6 * Math.abs(Math.sin(t * 2 + i * 0.6));
        bits.push({ x, y, a });
      }
      // bulk projection lines from boundary inward
      for (const b of bits) {
        const grad = ctx.createLinearGradient(b.x, b.y, cx, cy);
        grad.addColorStop(0, `rgba(255,180,61,${b.a * 0.25})`);
        grad.addColorStop(1, "rgba(125,140,255,0)");
        ctx.strokeStyle = grad; ctx.lineWidth = 0.7;
        ctx.beginPath(); ctx.moveTo(b.x, b.y);
        ctx.lineTo(cx + (b.x - cx) * 0.18, cy + (b.y - cy) * 0.18);
        ctx.stroke();
      }
      // boundary ring
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255,180,61,0.5)"; ctx.lineWidth = 1.5; ctx.stroke();
      // boundary bits
      for (const b of bits) {
        ctx.fillStyle = `rgba(255,220,148,${b.a})`;
        ctx.beginPath(); ctx.arc(b.x, b.y, 2.4, 0, Math.PI * 2); ctx.fill();
      }
      // emergent bulk: faint curved interior grid that "projects" from the boundary
      ctx.strokeStyle = "rgba(125,140,255,0.18)";
      for (let r = 0.25; r < 1; r += 0.18) {
        ctx.beginPath();
        ctx.arc(cx, cy, R * r, 0, Math.PI * 2);
        ctx.stroke();
      }
      // a wandering "particle" in the bulk = emergent gravity
      const px = cx + Math.cos(t * 0.7) * R * 0.42;
      const py = cy + Math.sin(t * 0.9) * R * 0.42;
      const pg = ctx.createRadialGradient(px, py, 0, px, py, 10);
      pg.addColorStop(0, "#a6f7f5"); pg.addColorStop(1, "rgba(47,224,230,0)");
      ctx.fillStyle = pg; ctx.beginPath(); ctx.arc(px, py, 10, 0, Math.PI * 2); ctx.fill();

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  return (
    <div className="space-y-8">
      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="holo overflow-hidden rounded-xl">
            <canvas ref={ref} className="block h-[300px] w-full" />
          </div>
          <p className="mt-3 text-xs leading-relaxed text-ghost-400">
            <T v={{
              en: "The holographic principle: everything inside a region (the bulk) may be fully encoded as information on its 2-D boundary — and gravity is what that information looks like from inside.",
              zh: "全息原理：一个区域内部（体）的一切，或许都可作为信息完整编码在它的二维边界上——而引力，正是那些信息从内部看上去的样子。",
            }} />
          </p>
        </div>

        {/* traditional vs emergent */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-[auto_1fr_1fr] gap-px overflow-hidden rounded-xl border border-void-500 bg-void-500 text-sm">
            <div className="bg-void-900 p-3" />
            <div className="bg-void-900 p-3 text-center">
              <span className={`text-warp-300 ${lang === "zh" ? "zh" : "display"}`}><T v={{ en: "Traditional", zh: "传统" }} /></span>
            </div>
            <div className="bg-void-900 p-3 text-center">
              <span className={`text-accret-300 ${lang === "zh" ? "zh" : "display"}`}><T v={{ en: "Emergent", zh: "涌现" }} /></span>
            </div>
            {TRAD_VS_EMERGENT.map((row, i) => (
              <div key={i} className="contents">
                <div className="bg-void-900/70 p-3 mono text-[0.72rem] text-ghost-300"><T v={row.q} /></div>
                <div className="bg-void-900/40 p-3 text-ghost-200"><T v={row.trad} /></div>
                <div className="bg-void-900/40 p-3 text-ghost-200"><T v={row.emergent} /></div>
              </div>
            ))}
          </div>
          <p className="mt-3 text-sm leading-relaxed text-ghost-300">
            <T v={{
              en: "On the emergent view, gravity is not a fundamental force but a statistical, thermodynamic effect — like temperature or pressure — arising as deeper information rearranges itself toward maximum entropy.",
              zh: "在涌现的视角下，引力并非一种基本力，而是一种统计性的热力学效应——如同温度或压强——随着更深层的信息趋向最大熵而重排，从中生出。",
            }} />
          </p>
        </div>
      </div>

      {/* radical ideas gallery */}
      <div>
        <div className="label-mono">The radical ideas · 那些激进的构想</div>
        <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-6">
          {EMERGENT_IDEAS.map((idea, i) => (
            <button
              key={i}
              onClick={() => setSel(i)}
              className={`holo rounded-lg p-3 text-left transition ${sel === i ? "" : "opacity-70 hover:opacity-100"}`}
              style={sel === i ? { borderColor: idea.accent, boxShadow: `0 0 24px -10px ${idea.accent}` } : {}}
            >
              <span className={`text-xs leading-tight text-ghost-50 ${lang === "zh" ? "zh" : "display"}`}><T v={idea.name} /></span>
            </button>
          ))}
        </div>
        <div className="mt-4 holo rounded-xl p-5" style={{ borderLeft: `3px solid ${EMERGENT_IDEAS[sel].accent}` }}>
          <div className={`text-lg text-ghost-50 ${lang === "zh" ? "zh" : "display"}`}><T v={EMERGENT_IDEAS[sel].name} /></div>
          <p className="mt-2 text-sm leading-relaxed text-ghost-200"><T v={EMERGENT_IDEAS[sel].gloss} /></p>
        </div>
      </div>
    </div>
  );
}
