"use client";

import { useEffect, useRef, useState } from "react";
import { T, useLang } from "./lang";
import { BH_LAYERS, BH_FACTS } from "./content";

/**
 * Interactive black hole: a lensed accretion disk (Interstellar-style top arc),
 * a glowing photon ring, a pure-black event horizon — plus an interactive
 * "distance from horizon" slider driving a gravitational time-dilation gauge.
 */
export default function BlackHoleViz() {
  const { lang } = useLang();
  const ref = useRef<HTMLCanvasElement>(null);
  const [rOverRs, setROverRs] = useState(3); // observer distance in Schwarzschild radii

  // gravitational time-dilation factor: clock runs at sqrt(1 - rs/r) of a far clock
  const ratio = rOverRs <= 1 ? 0 : Math.sqrt(1 - 1 / rOverRs);
  const slowdown = ratio > 0 ? 1 / ratio : Infinity;

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
      t += 0.01;
      ctx.clearRect(0, 0, W, H);
      const cx = W / 2, cy = H / 2;
      const rs = Math.min(W, H) * 0.13; // horizon radius on screen

      // lensed disk: bottom arc (front) + top arc (light from behind, bent over the top)
      const drawDiskArc = (rx: number, ry: number, yShift: number, a0: number, a1: number, alpha: number) => {
        for (let k = 0; k < 28; k++) {
          const f = k / 28;
          const rr = rs * (1.5 + f * 2.4);
          ctx.beginPath();
          ctx.ellipse(cx, cy + yShift, rr * rx, rr * ry, 0, a0, a1);
          // spectrum: hot inner gold → cooler outer orange, with rotation shimmer
          const hue = 38 + f * 8;
          const beam = 0.55 + 0.45 * Math.sin(t * 2 + f * 6);
          ctx.strokeStyle = `hsla(${hue}, 95%, ${64 - f * 18}%, ${alpha * (0.5 + 0.5 * beam) * (1 - f * 0.5)})`;
          ctx.lineWidth = 2.4;
          ctx.stroke();
        }
      };
      // top (lensed-over) arc — flatter, sits above horizon
      drawDiskArc(1.0, 0.18, -rs * 0.92, Math.PI, Math.PI * 2, 0.85);
      // front disk arc — wider ellipse, below
      drawDiskArc(1.18, 0.34, rs * 0.06, 0, Math.PI, 1.0);

      // accretion glow halo
      const halo = ctx.createRadialGradient(cx, cy, rs, cx, cy, rs * 4.2);
      halo.addColorStop(0, "rgba(255,180,61,0.18)");
      halo.addColorStop(1, "rgba(255,180,61,0)");
      ctx.fillStyle = halo; ctx.beginPath(); ctx.arc(cx, cy, rs * 4.2, 0, Math.PI * 2); ctx.fill();

      // photon ring
      ctx.beginPath();
      ctx.arc(cx, cy, rs * 1.18, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255,224,170,0.95)";
      ctx.lineWidth = 2.4;
      ctx.shadowColor = "rgba(255,180,61,0.95)"; ctx.shadowBlur = 26;
      ctx.stroke(); ctx.shadowBlur = 0;

      // event horizon (pure black shadow, slightly larger than photon ring base)
      ctx.beginPath();
      ctx.arc(cx, cy, rs, 0, Math.PI * 2);
      ctx.fillStyle = "#04060f"; ctx.fill();

      // observer marker at r/rs along a ray
      const obsR = rs * rOverRs;
      const ax = cx + Math.cos(-0.6) * obsR;
      const ay = cy + Math.sin(-0.6) * obsR;
      if (obsR < Math.max(W, H)) {
        ctx.setLineDash([3, 5]);
        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(ax, ay);
        ctx.strokeStyle = "rgba(166,247,245,0.4)"; ctx.lineWidth = 1; ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = "#a6f7f5";
        ctx.beginPath(); ctx.arc(ax, ay, 4, 0, Math.PI * 2); ctx.fill();
        ctx.font = "10px 'JetBrains Mono', monospace";
        ctx.fillStyle = "rgba(166,247,245,0.85)";
        ctx.fillText("r = " + rOverRs.toFixed(1) + " rs", ax + 8, ay - 6);
      }

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, [rOverRs]);

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <div className="lg:col-span-3">
        <div className="holo overflow-hidden rounded-xl">
          <canvas ref={ref} className="block h-[380px] w-full md:h-[460px]" />
        </div>

        {/* time-dilation gauge */}
        <div className="mt-4 holo rounded-xl p-5">
          <div className="flex items-baseline justify-between">
            <span className="label-mono">Observer distance · 观察者距离</span>
            <span className="mono text-sm text-wave-300">{rOverRs.toFixed(2)} × r<sub>s</sub></span>
          </div>
          <input
            type="range" min={1.02} max={12} step={0.02} value={rOverRs}
            onChange={(e) => setROverRs(parseFloat(e.target.value))}
            className="mt-3 w-full accent-accret-500"
          />
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-lg border border-accret-500/25 bg-void-900/60 p-3">
              <div className="label-mono">Clock rate · 钟速</div>
              <div className="mono mt-1 text-2xl text-accret-300">{(ratio * 100).toFixed(1)}%</div>
              <div className="text-[0.7rem] text-ghost-500"><T v={{ en: "of a far-away clock", zh: "相对于远方的钟" }} /></div>
            </div>
            <div className="rounded-lg border border-warp-500/25 bg-void-900/60 p-3">
              <div className="label-mono">Time slowdown · 时间变慢</div>
              <div className="mono mt-1 text-2xl text-warp-300">{slowdown === Infinity ? "∞" : slowdown.toFixed(2) + "×"}</div>
              <div className="text-[0.7rem] text-ghost-500"><T v={{ en: "1 s here = this much there", zh: "此处1秒 = 远方这么久" }} /></div>
            </div>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-ghost-300">
            <T v={{
              en: "Slide toward the horizon (r → 1 rs). Time runs slower and slower; at the event horizon itself, a distant observer sees an infalling clock freeze and redden forever.",
              zh: "向视界滑动（r → 1 rs）。时间走得越来越慢；在事件视界处，远方的观察者会看见坠入的钟永远冻结、变红。",
            }} />
          </p>
        </div>
      </div>

      <div className="lg:col-span-2">
        <div className="label-mono">Anatomy of a black hole · 黑洞的解剖</div>
        <div className="mt-4 space-y-2.5">
          {BH_LAYERS.map((l) => (
            <div key={l.key} className="holo rounded-xl p-3.5" style={{ borderLeft: `3px solid ${l.accent}` }}>
              <div className="flex items-baseline justify-between gap-3">
                <span className={`text-sm text-ghost-50 ${lang === "zh" ? "zh" : "display"}`}><T v={l.name} /></span>
                <span className="mono text-[0.7rem]" style={{ color: l.accent }}><T v={l.r} /></span>
              </div>
              <p className="mt-1 text-xs leading-relaxed text-ghost-300"><T v={l.gloss} /></p>
            </div>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2.5">
          {BH_FACTS.map((f, i) => (
            <div key={i} className="holo rounded-lg p-3">
              <div className="mono text-base text-accret-300"><T v={f.value} /></div>
              <div className="mt-0.5 text-[0.72rem] text-ghost-200"><T v={f.metric} /></div>
              <div className="mt-1 text-[0.66rem] leading-snug text-ghost-500"><T v={f.gloss} /></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
