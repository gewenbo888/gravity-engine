"use client";

import { useEffect, useRef } from "react";

/**
 * Hero canvas: a warped spacetime grid dished into a central gravity well,
 * a glowing black hole with an accretion ring, orbiting test particles,
 * and a faint starfield. Pure canvas, no deps.
 */
export default function GravityField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let W = 0, H = 0;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      W = r.width; H = r.height;
      canvas.width = W * DPR; canvas.height = H * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // starfield
    const stars = Array.from({ length: 150 }, () => ({
      x: Math.random(), y: Math.random(),
      r: Math.random() * 1.3 + 0.2, tw: Math.random() * Math.PI * 2,
    }));

    // orbiting test particles (perpetual free fall around the well)
    const orbits = Array.from({ length: 5 }, (_, i) => ({
      a: 0.18 + i * 0.085,         // semi-major (fraction of min(W,H))
      e: 0.12 + (i % 3) * 0.14,    // eccentricity
      phase: Math.random() * Math.PI * 2,
      speed: 0.55 - i * 0.06,
      tilt: (i * 0.7) % Math.PI,
      color: ["#ffdc94", "#9db4ff", "#6cefef", "#c4d2ff", "#ffc869"][i],
    }));

    const t0 = performance.now();

    const draw = (now: number) => {
      const t = (now - t0) / 1000;
      ctx.clearRect(0, 0, W, H);

      // center of the well (slightly low + right of center for composition)
      const cx = W * 0.62, cy = H * 0.52;
      const S = Math.min(W, H);
      const wellR = S * 0.085;

      // --- starfield ---
      for (const s of stars) {
        const a = 0.35 + 0.4 * Math.sin(s.tw + t * 1.3);
        ctx.fillStyle = `rgba(197,210,255,${a * 0.6})`;
        ctx.beginPath();
        ctx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // --- warped grid (perspective rows + radial dishing toward the well) ---
      const warp = (x: number, y: number) => {
        const dx = x - cx, dy = y - cy;
        const d = Math.hypot(dx, dy);
        const pull = (wellR * 2.6) / (d + wellR * 0.9); // dimensionless dip factor
        const k = Math.min(pull, 1.4);
        return { x: x - dx * k * 0.32, y: y - dy * k * 0.32 };
      };

      const step = Math.max(34, S * 0.052);
      ctx.lineWidth = 1;
      // horizontal-ish lines
      for (let gy = -step; gy <= H + step; gy += step) {
        ctx.beginPath();
        for (let gx = -step; gx <= W + step; gx += step / 3) {
          const p = warp(gx, gy);
          if (gx <= -step) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y);
        }
        ctx.strokeStyle = "rgba(125,140,255,0.13)";
        ctx.stroke();
      }
      // vertical-ish lines
      for (let gx = -step; gx <= W + step; gx += step) {
        ctx.beginPath();
        for (let gy = -step; gy <= H + step; gy += step / 3) {
          const p = warp(gx, gy);
          if (gy <= -step) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y);
        }
        ctx.strokeStyle = "rgba(125,140,255,0.10)";
        ctx.stroke();
      }

      // --- orbiting particles + trails ---
      for (const o of orbits) {
        const aPx = o.a * S;
        const bPx = aPx * Math.sqrt(1 - o.e * o.e);
        const ang = o.phase + t * o.speed;
        // ellipse param with focus at well center
        const focus = aPx * o.e;
        const ex = Math.cos(ang) * aPx - focus;
        const ey = Math.sin(ang) * bPx;
        // rotate by tilt
        const px = cx + ex * Math.cos(o.tilt) - ey * Math.sin(o.tilt);
        const py = cy + ex * Math.sin(o.tilt) + ey * Math.cos(o.tilt);

        // faint orbit path
        ctx.beginPath();
        for (let a = 0; a <= Math.PI * 2 + 0.1; a += 0.12) {
          const x = Math.cos(a) * aPx - focus;
          const y = Math.sin(a) * bPx;
          const rx = cx + x * Math.cos(o.tilt) - y * Math.sin(o.tilt);
          const ry = cy + x * Math.sin(o.tilt) + y * Math.cos(o.tilt);
          if (a === 0) ctx.moveTo(rx, ry); else ctx.lineTo(rx, ry);
        }
        ctx.strokeStyle = "rgba(157,180,255,0.10)";
        ctx.lineWidth = 1;
        ctx.stroke();

        // particle glow
        const g = ctx.createRadialGradient(px, py, 0, px, py, 9);
        g.addColorStop(0, o.color);
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(px, py, 9, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = o.color;
        ctx.beginPath(); ctx.arc(px, py, 2, 0, Math.PI * 2); ctx.fill();
      }

      // --- accretion glow ring ---
      const ringG = ctx.createRadialGradient(cx, cy, wellR * 0.6, cx, cy, wellR * 3.2);
      ringG.addColorStop(0, "rgba(255,180,61,0)");
      ringG.addColorStop(0.45, "rgba(255,180,61,0.22)");
      ringG.addColorStop(0.7, "rgba(240,138,0,0.10)");
      ringG.addColorStop(1, "rgba(255,180,61,0)");
      ctx.fillStyle = ringG;
      ctx.beginPath(); ctx.arc(cx, cy, wellR * 3.2, 0, Math.PI * 2); ctx.fill();

      // spinning accretion arcs
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        const rr = wellR * (1.5 + i * 0.45);
        const start = t * (0.9 - i * 0.18) + i * 2;
        ctx.arc(cx, cy, rr, start, start + Math.PI * 1.2);
        ctx.strokeStyle = `rgba(255,${200 - i * 30},120,${0.5 - i * 0.12})`;
        ctx.lineWidth = 2.5 - i * 0.6;
        ctx.stroke();
      }

      // --- photon ring + event horizon (the black hole) ---
      ctx.beginPath();
      ctx.arc(cx, cy, wellR * 1.18, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255,220,148,0.85)";
      ctx.lineWidth = 2;
      ctx.shadowColor = "rgba(255,180,61,0.9)";
      ctx.shadowBlur = 22;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // pure black horizon
      ctx.beginPath();
      ctx.arc(cx, cy, wellR, 0, Math.PI * 2);
      ctx.fillStyle = "#04060f";
      ctx.fill();

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  return <canvas ref={ref} className="h-full w-full" aria-hidden />;
}
