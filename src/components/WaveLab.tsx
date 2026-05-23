"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { T, useLang } from "./lang";
import { GW_EVENTS, GW_FACTS } from "./content";

/* ──────────────────────────────────────────────────────────────
   BILINGUAL COPY
────────────────────────────────────────────────────────────── */
const COPY = {
  sectionLabel: { en: "05 — Gravitational Waves", zh: "05 — 引力波" },
  headline: { en: "The Universe Rings", zh: "宇宙在鸣响" },
  sub: {
    en: "Violent collisions a billion light-years away create ripples in spacetime. In 2015, we built an ear.",
    zh: "十亿光年之外的剧烈碰撞，在时空中激起涟漪。2015年，我们造出了一只耳朵。",
  },
  canvasTitle: { en: "Binary Inspiral & Chirp", zh: "双星旋近与啁啾" },
  canvasSub: {
    en: "Two compact masses spiral inward, shedding energy as spacetime ripples — the chirp waveform below syncs to the orbit.",
    zh: "两个致密天体向内旋近，以时空涟漪的形式耗散能量——下方的啁啾波形与轨道同步。",
  },
  freq: { en: "Frequency", zh: "频率" },
  sep: { en: "Separation", zh: "间距" },
  merger: { en: "MERGER", zh: "并合" },
  ringdown: { en: "Ringdown", zh: "铃宕" },
  detectionTitle: { en: "Detection Log", zh: "探测档案" },
  detectionSub: {
    en: "Every confirmed gravitational-wave event is a new sentence in the universe's autobiography.",
    zh: "每一次确认的引力波事件，都是宇宙自传中新添的一句话。",
  },
  firstEver: { en: "First detection", zh: "首次探测" },
  factsTitle: { en: "By the Numbers", zh: "数字里的宇宙" },
};

/* ──────────────────────────────────────────────────────────────
   CANVAS ANIMATION
────────────────────────────────────────────────────────────── */
const TWO_PI = Math.PI * 2;

// Chirp parameters
const INSPIRAL_DURATION = 4.2; // seconds for one inspiral cycle
const RINGDOWN_DURATION = 0.9;
const PAUSE_DURATION    = 0.6;
const TOTAL_CYCLE       = INSPIRAL_DURATION + RINGDOWN_DURATION + PAUSE_DURATION;

// Ripple pool
interface Ripple { x: number; y: number; born: number; freq: number }

function useChirpCanvas(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  const frameRef    = useRef<number>(0);
  const startRef    = useRef<number | null>(null);
  const ripplesRef  = useRef<Ripple[]>([]);
  const lastRipple  = useRef<number>(0);

  const animate = useCallback((ts: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (startRef.current === null) startRef.current = ts;
    const elapsed = (ts - startRef.current) / 1000; // seconds

    const W = canvas.width;
    const H = canvas.height;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Logical sizes (pre-DPR)
    const lW = W / dpr;
    const lH = H / dpr;

    // Phase within cycle
    const cycleT = elapsed % TOTAL_CYCLE;
    const isMerging  = cycleT >= INSPIRAL_DURATION && cycleT < INSPIRAL_DURATION + RINGDOWN_DURATION;
    const isPausing  = cycleT >= INSPIRAL_DURATION + RINGDOWN_DURATION;
    const phase      = isPausing ? 1 : Math.min(cycleT / INSPIRAL_DURATION, 1);

    // Orbit panel (top 58%)
    const orbitH = lH * 0.57;
    // Waveform panel (bottom 43%)
    const waveY  = orbitH;
    const waveH  = lH - waveY;

    ctx.clearRect(0, 0, W, H);

    // ── Background gradient ──
    const bgGrad = ctx.createLinearGradient(0, 0, 0, H);
    bgGrad.addColorStop(0,   "#04060f");
    bgGrad.addColorStop(0.6, "#070a16");
    bgGrad.addColorStop(1,   "#0b0f1f");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, W, H);

    // ── Grid dots ──
    ctx.fillStyle = "rgba(97,245,179,0.04)";
    const gs = 28 * dpr;
    for (let gx = gs; gx < W; gx += gs) {
      for (let gy = gs; gy < H; gy += gs) {
        ctx.beginPath();
        ctx.arc(gx, gy, 0.8 * dpr, 0, TWO_PI);
        ctx.fill();
      }
    }

    // ── Divider ──
    ctx.strokeStyle = "rgba(47,224,230,0.12)";
    ctx.lineWidth   = 1 * dpr;
    ctx.beginPath();
    ctx.moveTo(0, waveY * dpr);
    ctx.lineTo(W, waveY * dpr);
    ctx.stroke();

    // ── Orbit center ──
    const cx = lW / 2;
    const cy = orbitH * 0.52;

    // Inspired orbit: radius shrinks, angular speed rises
    const minR = 18;  // logical px at merger
    const maxR = 80;
    const orbitR = isMerging
      ? minR * (1 - (cycleT - INSPIRAL_DURATION) / RINGDOWN_DURATION)
      : maxR - (maxR - minR) * Math.pow(phase, 1.6);

    // Angular velocity: inversely proportional to r^1.5 (Kepler)
    const baseOmega = 0.6;
    const omega = baseOmega * Math.pow(maxR / Math.max(orbitR, 1), 1.5);

    // Integrate angle (approximate: use elapsed × omega at current phase)
    // We track angle cumulatively via elapsed time with varying omega
    // Simplified: use phase-warped angle
    const angleWarp = phase < 1
      ? elapsed * baseOmega * Math.pow(maxR / Math.max(orbitR, 1), 1.5)
      : elapsed * baseOmega * Math.pow(maxR / minR, 1.5);
    const angle = angleWarp;

    const m1x = cx + orbitR * Math.cos(angle);
    const m1y = cy + orbitR * Math.sin(angle);
    const m2x = cx - orbitR * Math.cos(angle);
    const m2y = cy - orbitR * Math.sin(angle);

    // ── Spawn ripples ──
    const rippleInterval = 0.08 / (1 + phase * 6); // faster near merger
    if (elapsed - lastRipple.current > rippleInterval && !isPausing) {
      ripplesRef.current.push({ x: cx, y: cy, born: elapsed, freq: omega });
      if (ripplesRef.current.length > 60) ripplesRef.current.shift();
      lastRipple.current = elapsed;
    }

    // ── Draw ripples ──
    ripplesRef.current = ripplesRef.current.filter(r => {
      const age   = elapsed - r.born;
      const maxAge = 2.2;
      if (age > maxAge) return false;
      const progress = age / maxAge;
      const r_px = progress * orbitH * 0.88;
      const alpha = (1 - progress) * 0.45;

      ctx.beginPath();
      ctx.arc(cx * dpr, cy * dpr, r_px * dpr, 0, TWO_PI);
      ctx.strokeStyle = `rgba(47,224,230,${alpha})`;
      ctx.lineWidth   = (1.2 - progress * 0.7) * dpr;
      ctx.stroke();
      return true;
    });

    // ── Glow at center (merger flash) ──
    if (isMerging) {
      const flashT  = (cycleT - INSPIRAL_DURATION) / RINGDOWN_DURATION;
      const flashA  = Math.max(0, 1 - flashT * 2.5);
      const flashR  = 70 * (1 - flashT) * dpr;
      const fg      = ctx.createRadialGradient(cx * dpr, cy * dpr, 0, cx * dpr, cy * dpr, flashR);
      fg.addColorStop(0,   `rgba(255,220,100,${flashA * 0.9})`);
      fg.addColorStop(0.3, `rgba(255,180,60,${flashA * 0.5})`);
      fg.addColorStop(1,   "rgba(255,180,60,0)");
      ctx.fillStyle = fg;
      ctx.beginPath();
      ctx.arc(cx * dpr, cy * dpr, flashR, 0, TWO_PI);
      ctx.fill();
    }

    // ── Draw masses ──
    const drawMass = (mx: number, my: number, color: string, radius: number) => {
      const glow = ctx.createRadialGradient(
        mx * dpr, my * dpr, 0,
        mx * dpr, my * dpr, radius * dpr * 2.5
      );
      glow.addColorStop(0,   color.replace("1)", "0.95)"));
      glow.addColorStop(0.4, color.replace("1)", "0.4)"));
      glow.addColorStop(1,   color.replace("1)", "0)"));
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(mx * dpr, my * dpr, radius * dpr * 2.5, 0, TWO_PI);
      ctx.fill();

      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(mx * dpr, my * dpr, radius * dpr, 0, TWO_PI);
      ctx.fill();
    };

    if (!isMerging || (cycleT - INSPIRAL_DURATION) / RINGDOWN_DURATION < 0.5) {
      const massR = isMerging
        ? 6 + 4 * (1 - (cycleT - INSPIRAL_DURATION) / RINGDOWN_DURATION)
        : 5 + 3 * phase;
      drawMass(m1x, m1y, "rgba(47,224,230,1)",  massR);
      drawMass(m2x, m2y, "rgba(157,180,255,1)", massR * 0.85);
    }

    // Center of mass marker
    ctx.beginPath();
    ctx.arc(cx * dpr, cy * dpr, 2.5 * dpr, 0, TWO_PI);
    ctx.fillStyle = "rgba(255,220,100,0.3)";
    ctx.fill();

    // ── Chirp waveform ──
    const waveBaseY = (waveY + waveH * 0.5) * dpr;
    const waveXStart = 18 * dpr;
    const waveXEnd   = (lW - 18) * dpr;
    const waveWidth  = waveXEnd - waveXStart;

    // Build chirp curve
    const pts = 420;
    const chirpPath = new Path2D();
    let firstPt = true;

    for (let i = 0; i <= pts; i++) {
      const t    = i / pts; // 0 → 1 = start → "now" (merger at ~0.78)
      const mergerAt = 0.78;

      let amp = 0, cyc = 0;
      if (t < mergerAt) {
        // Inspiral: amp and freq rise sharply near merger
        const s   = t / mergerAt;
        amp  = (waveH * 0.28) * (0.05 + 0.95 * Math.pow(s, 1.7));
        const freqBase = 1.8;
        const freqPeak = 22;
        cyc  = freqBase + (freqPeak - freqBase) * Math.pow(s, 2.4);
      } else {
        // Ringdown: decaying sinusoid
        const rd = (t - mergerAt) / (1 - mergerAt);
        amp  = (waveH * 0.32) * Math.exp(-rd * 5.5);
        cyc  = 22;
      }

      // Phase at this point
      const phaseAt = t < mergerAt
        ? Math.pow(t / mergerAt, 3) * 18 * TWO_PI
        : 18 * TWO_PI + (t - mergerAt) * 22 * TWO_PI;

      const px = waveXStart + t * waveWidth;
      const py = waveBaseY - amp * dpr * Math.sin(phaseAt);

      if (firstPt) { chirpPath.moveTo(px, py); firstPt = false; }
      else           chirpPath.lineTo(px, py);
    }

    // Glow stroke (wide, blurry)
    ctx.save();
    ctx.shadowColor = "rgba(47,224,230,0.7)";
    ctx.shadowBlur  = 8 * dpr;
    ctx.strokeStyle = "rgba(47,224,230,0.25)";
    ctx.lineWidth   = 4 * dpr;
    ctx.stroke(chirpPath);
    ctx.restore();

    // Crisp stroke
    ctx.strokeStyle = "rgba(47,224,230,0.9)";
    ctx.lineWidth   = 1.5 * dpr;
    ctx.stroke(chirpPath);

    // Animated playhead — travels along chirp in sync with inspiral
    const playT = isMerging
      ? 0.78 + (cycleT - INSPIRAL_DURATION) / RINGDOWN_DURATION * 0.22
      : isPausing ? 1
      : phase * 0.78;
    const headX = waveXStart + playT * waveWidth;

    ctx.beginPath();
    ctx.moveTo(headX, (waveY + 4) * dpr);
    ctx.lineTo(headX, (waveY + waveH - 4) * dpr);
    ctx.strokeStyle = "rgba(255,220,100,0.7)";
    ctx.lineWidth   = 1.5 * dpr;
    ctx.setLineDash([4 * dpr, 4 * dpr]);
    ctx.stroke();
    ctx.setLineDash([]);

    // ── Labels on waveform ──
    ctx.font = `${10 * dpr}px 'JetBrains Mono', monospace`;
    ctx.fillStyle = "rgba(166,247,245,0.5)";
    ctx.fillText("inspiral →", waveXStart + 4 * dpr, (waveY + 14) * dpr);

    ctx.fillStyle = "rgba(255,220,100,0.6)";
    const mergerLabelX = waveXStart + 0.78 * waveWidth;
    ctx.fillText("✕", mergerLabelX - 5 * dpr, (waveY + 14) * dpr);

    ctx.fillStyle = "rgba(166,247,245,0.35)";
    ctx.fillText("ringdown", mergerLabelX + 8 * dpr, (waveY + 14) * dpr);

    // Zero line
    ctx.beginPath();
    ctx.moveTo(waveXStart, waveBaseY);
    ctx.lineTo(waveXEnd,   waveBaseY);
    ctx.strokeStyle = "rgba(47,224,230,0.1)";
    ctx.lineWidth   = 1 * dpr;
    ctx.stroke();

    frameRef.current = requestAnimationFrame(animate);
  }, [canvasRef]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width  = rect.width  * dpr;
      canvas.height = rect.height * dpr;
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    frameRef.current = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(frameRef.current);
      ro.disconnect();
    };
  }, [animate]);
}

/* ──────────────────────────────────────────────────────────────
   LIVE READOUT HOOK
────────────────────────────────────────────────────────────── */
function useLiveReadout() {
  const [readout, setReadout] = useState({ freq: "—", sep: "—", phase: "inspiral" });

  useEffect(() => {
    let start: number | null = null;
    let raf = 0;

    const tick = (ts: number) => {
      if (start === null) start = ts;
      const elapsed = (ts - start) / 1000;
      const cycleT  = elapsed % TOTAL_CYCLE;
      const phase   = Math.min(cycleT / INSPIRAL_DURATION, 1);

      const isMerging  = cycleT >= INSPIRAL_DURATION && cycleT < INSPIRAL_DURATION + RINGDOWN_DURATION;
      const isPausing  = cycleT >= INSPIRAL_DURATION + RINGDOWN_DURATION;

      const minHz = 12, maxHz = 250;
      const minSep = 0.01, maxSep = 1.0;

      let freqStr = "—", sepStr = "—", phaseLabel = "inspiral";

      if (isMerging) {
        freqStr  = `${maxHz} Hz`;
        sepStr   = `${minSep.toFixed(2)} AU`;
        phaseLabel = "merger";
      } else if (isPausing) {
        freqStr  = `${(maxHz * 0.4).toFixed(0)} Hz`;
        sepStr   = "—";
        phaseLabel = "ringdown";
      } else {
        const f  = minHz + (maxHz - minHz) * Math.pow(phase, 2.2);
        const s  = maxSep - (maxSep - minSep) * Math.pow(phase, 1.6);
        freqStr  = `${f.toFixed(0)} Hz`;
        sepStr   = `${s.toFixed(2)} AU`;
        phaseLabel = "inspiral";
      }

      setReadout({ freq: freqStr, sep: sepStr, phase: phaseLabel });
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return readout;
}

/* ──────────────────────────────────────────────────────────────
   MAIN COMPONENT
────────────────────────────────────────────────────────────── */
export default function WaveLab() {
  const { lang } = useLang();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useChirpCanvas(canvasRef);
  const readout = useLiveReadout();

  const phaseColor =
    readout.phase === "merger"   ? "text-accret-400" :
    readout.phase === "ringdown" ? "text-ghost-300"  :
    "text-wave-400";

  return (
    <section
      id="waves"
      className="relative py-24 px-4"
      style={{ background: "linear-gradient(to bottom, #070a16, #04060f 40%, #070a16)" }}
    >
      {/* ── Section header ── */}
      <div className="max-w-4xl mx-auto mb-12">
        <p className="label-mono mb-3">
          <T v={COPY.sectionLabel} />
        </p>
        <h2 className="display text-4xl sm:text-5xl lg:text-6xl text-wave-400 mb-4">
          <T v={COPY.headline} />
        </h2>
        <p className="text-ghost-300 text-lg max-w-2xl leading-relaxed">
          <T v={COPY.sub} />
        </p>
      </div>

      {/* ── Canvas section ── */}
      <div className="max-w-4xl mx-auto mb-6">
        <div className="mb-4 flex flex-col sm:flex-row sm:items-end gap-2 sm:gap-6">
          <div>
            <h3 className="serif text-xl text-wave-300">
              <T v={COPY.canvasTitle} />
            </h3>
            <p className="text-ghost-500 text-sm mt-1 max-w-xl leading-snug">
              <T v={COPY.canvasSub} />
            </p>
          </div>

          {/* Live readout */}
          <div className="flex gap-4 sm:gap-6 ml-auto flex-shrink-0">
            <div className="text-right">
              <div className="label-mono text-[0.65rem] mb-0.5">
                <T v={COPY.freq} />
              </div>
              <div className={`mono text-lg font-semibold transition-colors ${phaseColor}`}>
                {readout.freq}
              </div>
            </div>
            <div className="text-right">
              <div className="label-mono text-[0.65rem] mb-0.5">
                <T v={COPY.sep} />
              </div>
              <div className={`mono text-lg font-semibold transition-colors ${phaseColor}`}>
                {readout.sep}
              </div>
            </div>
            <div className="text-right">
              <div className="label-mono text-[0.65rem] mb-0.5">phase</div>
              <div className={`mono text-base font-semibold uppercase tracking-widest transition-colors ${phaseColor}`}>
                {readout.phase === "merger"
                  ? (lang === "zh" ? COPY.merger.zh : COPY.merger.en)
                  : readout.phase === "ringdown"
                  ? (lang === "zh" ? COPY.ringdown.zh : COPY.ringdown.en)
                  : "inspiral"}
              </div>
            </div>
          </div>
        </div>

        {/* Canvas */}
        <div className="holo rounded-2xl overflow-hidden border border-wave-600/30 relative">
          <canvas
            ref={canvasRef}
            className="w-full block"
            style={{ height: "clamp(320px, 46vw, 500px)" }}
            aria-label="Binary inspiral and chirp waveform animation"
          />
          {/* Corner decorations */}
          <div className="absolute top-3 left-3 w-3 h-3 border-l border-t border-wave-500/50 rounded-tl-sm pointer-events-none" />
          <div className="absolute top-3 right-3 w-3 h-3 border-r border-t border-wave-500/50 rounded-tr-sm pointer-events-none" />
          <div className="absolute bottom-3 left-3 w-3 h-3 border-l border-b border-wave-500/50 rounded-bl-sm pointer-events-none" />
          <div className="absolute bottom-3 right-3 w-3 h-3 border-r border-b border-wave-500/50 rounded-br-sm pointer-events-none" />
        </div>

        {/* Axis labels */}
        <div className="flex justify-between mt-1.5 px-1">
          <span className="mono text-[0.6rem] text-ghost-500/50">orbit plane</span>
          <span className="mono text-[0.6rem] text-ghost-500/50">chirp waveform · h(t)</span>
        </div>
      </div>

      {/* ── Fact stat strip ── */}
      <div className="max-w-4xl mx-auto mb-14">
        <div className="rule-grav mb-5" />
        <h3 className="label-mono mb-4">
          <T v={COPY.factsTitle} />
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {GW_FACTS.map((fact, i) => (
            <div
              key={i}
              className="holo rounded-xl p-4 border border-wave-600/20 flex flex-col gap-1.5"
            >
              <div
                className="mono text-base sm:text-lg font-semibold text-wave-300 leading-tight"
              >
                <T v={fact.value} />
              </div>
              <div className="text-ghost-500 text-xs leading-snug">
                <T v={fact.label} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Detection log ── */}
      <div className="max-w-4xl mx-auto">
        <div className="rule-grav mb-5" />
        <div className="mb-6">
          <h3 className="serif text-2xl text-wave-300 mb-1">
            <T v={COPY.detectionTitle} />
          </h3>
          <p className="text-ghost-500 text-sm">
            <T v={COPY.detectionSub} />
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {GW_EVENTS.map((ev, i) => (
            <div
              key={ev.id}
              className="holo rounded-2xl p-5 border flex flex-col gap-3 group transition-all duration-300 hover:border-wave-500/40"
              style={{ borderColor: `${ev.accent}22` }}
            >
              {/* Top row: ID + badge */}
              <div className="flex items-start justify-between gap-2">
                <span
                  className="mono text-xl font-bold tracking-tight"
                  style={{ color: ev.accent }}
                >
                  {ev.id}
                </span>
                {i === 0 && (
                  <span className="label-mono text-[0.6rem] px-2 py-0.5 rounded-full border"
                    style={{ borderColor: `${ev.accent}55`, color: ev.accent, background: `${ev.accent}11` }}
                  >
                    <T v={COPY.firstEver} />
                  </span>
                )}
              </div>

              {/* Source with accent dot */}
              <div className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0 pulse"
                  style={{ background: ev.accent, boxShadow: `0 0 6px ${ev.accent}` }}
                />
                <span className="text-ghost-200 font-medium text-sm">
                  <T v={ev.source} />
                </span>
              </div>

              {/* Date */}
              <div className="mono text-[0.7rem] text-ghost-500">
                <T v={ev.date} />
              </div>

              {/* Divider */}
              <div style={{ height: "1px", background: `${ev.accent}18` }} />

              {/* Gloss */}
              <p className="text-ghost-300 text-sm leading-relaxed">
                <T v={ev.gloss} />
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Closing line ── */}
      <div className="max-w-4xl mx-auto mt-14">
        <div className="rule-grav" />
        <p className="text-center text-ghost-500/60 text-xs mono mt-4 tracking-widest uppercase">
          LIGO · Virgo · KAGRA · PTA · LISA (future)
        </p>
      </div>
    </section>
  );
}
