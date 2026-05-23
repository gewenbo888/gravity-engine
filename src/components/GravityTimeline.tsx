"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { T, useLang } from "./lang";
import { EPOCHS } from "./content";

/* ─────────────────────────────────────────────
   UNDERSTANDING DEPTH — maps each epoch to a
   conceptual depth score (0–100) along several
   axes that feed a small "comprehension bar".
───────────────────────────────────────────── */
const DEPTH: Record<string, { rigor: number; scope: number; math: number }> = {
  ancient:  { rigor: 8,  scope: 25, math: 0  },
  galileo:  { rigor: 52, scope: 34, math: 30 },
  kepler:   { rigor: 60, scope: 44, math: 55 },
  newton:   { rigor: 88, scope: 85, math: 90 },
  einstein: { rigor: 98, scope: 95, math: 98 },
  tests:    { rigor: 99, scope: 92, math: 95 },
  bh:       { rigor: 94, scope: 88, math: 96 },
  cosmo:    { rigor: 92, scope: 99, math: 90 },
  ligo:     { rigor: 99, scope: 97, math: 97 },
  quantum:  { rigor: 70, scope: 100, math: 85 },
};

/* ─────────────────────────────────────────────
   ANIMATED GEODESIC SVG SPINE
   A single tall gradient line with subtle pulse
───────────────────────────────────────────── */
function SpineLine({ count }: { count: number }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <linearGradient id="spine-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#5160f0" stopOpacity="0.9" />
          <stop offset="25%"  stopColor="#7d8cff" stopOpacity="0.8" />
          <stop offset="55%"  stopColor="#2fe0e6" stopOpacity="0.75" />
          <stop offset="78%"  stopColor="#ffc869" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#a6f7f5" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id="spine-glow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#5160f0" stopOpacity="0.25" />
          <stop offset="55%"  stopColor="#2fe0e6" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#a6f7f5" stopOpacity="0.08" />
        </linearGradient>
        <filter id="spine-blur">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>
      {/* glow */}
      <line x1="50%" y1="0%" x2="50%" y2="100%"
        stroke="url(#spine-glow)" strokeWidth="12"
        filter="url(#spine-blur)" />
      {/* sharp line */}
      <line x1="50%" y1="0%" x2="50%" y2="100%"
        stroke="url(#spine-grad)" strokeWidth="1.5" />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   GLOWING NODE DOT
───────────────────────────────────────────── */
function NodeDot({
  accent,
  active,
  idx,
}: {
  accent: string;
  active: boolean;
  idx: number;
}) {
  return (
    <div
      className="relative z-10 flex items-center justify-center flex-shrink-0"
      style={{ width: 36, height: 36 }}
    >
      {/* outer halo */}
      <div
        className="absolute inset-0 rounded-full transition-all duration-500"
        style={{
          background: `radial-gradient(circle, ${accent}44 0%, transparent 70%)`,
          transform: active ? "scale(2.2)" : "scale(1.4)",
          opacity: active ? 1 : 0.5,
        }}
      />
      {/* ring */}
      <div
        className="absolute inset-0 rounded-full border transition-all duration-500"
        style={{
          borderColor: accent,
          opacity: active ? 0.85 : 0.35,
          transform: active ? "scale(1.35)" : "scale(1)",
          boxShadow: active ? `0 0 18px 4px ${accent}66` : "none",
        }}
      />
      {/* core dot */}
      <div
        className="relative rounded-full transition-all duration-500"
        style={{
          width: active ? 14 : 9,
          height: active ? 14 : 9,
          background: accent,
          boxShadow: `0 0 12px 3px ${accent}88`,
        }}
      />
      {/* epoch index */}
      <div
        className="absolute -top-5 left-1/2 -translate-x-1/2 label-mono text-[0.55rem] opacity-50"
      >
        {String(idx + 1).padStart(2, "0")}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   UNDERSTANDING DEPTH BAR (3 axes)
───────────────────────────────────────────── */
const DEPTH_AXES: { key: "rigor" | "scope" | "math"; en: string; zh: string; color: string }[] = [
  { key: "rigor", en: "Empirical rigor",   zh: "实证严谨",   color: "#7d8cff" },
  { key: "scope", en: "Cosmic scope",      zh: "宇宙尺度",   color: "#2fe0e6" },
  { key: "math",  en: "Mathematical depth",zh: "数学深度",   color: "#ffb43d" },
];

function DepthBar({ epochKey, visible }: { epochKey: string; visible: boolean }) {
  const { lang } = useLang();
  const d = DEPTH[epochKey] ?? { rigor: 0, scope: 0, math: 0 };
  return (
    <div className="mt-4 space-y-2">
      {DEPTH_AXES.map((ax) => (
        <div key={ax.key}>
          <div className="flex justify-between items-center mb-1">
            <span className="label-mono" style={{ color: ax.color }}>
              {ax[lang]}
            </span>
            <span className="label-mono text-ghost-500">{d[ax.key]}%</span>
          </div>
          <div className="h-[3px] w-full rounded-full bg-void-600 overflow-hidden">
            <div
              className="h-full rounded-full transition-all ease-out"
              style={{
                width: visible ? `${d[ax.key]}%` : "0%",
                background: ax.color,
                boxShadow: `0 0 8px 1px ${ax.color}88`,
                transitionDuration: "900ms",
                transitionDelay: visible ? "300ms" : "0ms",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   EPOCH CARD
───────────────────────────────────────────── */
function EpochCard({
  epoch,
  idx,
  active,
  side,
  onActivate,
}: {
  epoch: (typeof EPOCHS)[0];
  idx: number;
  active: boolean;
  side: "left" | "right";
  onActivate: () => void;
}) {
  const { lang } = useLang();
  const cardRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`
        holo rounded-2xl p-5 sm:p-6 cursor-pointer
        transition-all duration-500 ease-out
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
        ${active
          ? "border-opacity-70 shadow-[0_0_48px_-12px_var(--accent-shadow)]"
          : "hover:scale-[1.015]"
        }
      `}
      style={
        {
          "--accent-shadow": epoch.accent + "88",
          borderColor: active ? epoch.accent + "60" : undefined,
          transitionDelay: visible ? `${idx * 60}ms` : "0ms",
        } as React.CSSProperties
      }
      onClick={onActivate}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onActivate()}
      aria-expanded={active}
    >
      {/* era label */}
      <div className="label-mono mb-3" style={{ color: epoch.accent }}>
        <T v={epoch.era} />
      </div>

      {/* thinker */}
      <div
        className={`display text-xl sm:text-2xl leading-tight mb-1 ${lang === "zh" ? "zh" : ""}`}
        style={{ color: epoch.accent }}
      >
        <T v={epoch.who} />
      </div>

      {/* breakthrough name */}
      <h3
        className={`display text-2xl sm:text-3xl leading-snug text-ghost-100 mb-3 ${lang === "zh" ? "zh" : ""}`}
      >
        <T v={epoch.name} />
      </h3>

      {/* gain — always present but animates in */}
      <div
        className={`
          serif text-ghost-200 text-sm sm:text-base leading-relaxed
          transition-all duration-500 ease-out
          ${lang === "zh" ? "zh" : ""}
          ${active ? "max-h-64 opacity-100" : "max-h-12 opacity-60 overflow-hidden"}
        `}
      >
        <T v={epoch.gain} />
      </div>

      {/* depth bars — only when active */}
      <div
        className={`transition-all duration-500 overflow-hidden ${active ? "max-h-40 opacity-100 mt-2" : "max-h-0 opacity-0"}`}
      >
        <div className="h-px w-full bg-void-500 my-4" />
        <DepthBar epochKey={epoch.key} visible={active} />
      </div>

      {/* expand cue */}
      <div className="mt-4 flex items-center gap-2">
        <div
          className="h-[1px] flex-1 transition-all duration-300"
          style={{ background: `linear-gradient(90deg, ${epoch.accent}88, transparent)` }}
        />
        <span
          className="label-mono text-[0.55rem] transition-colors duration-300"
          style={{ color: active ? epoch.accent : "#383f5c" }}
        >
          {active
            ? (lang === "zh" ? "收起" : "COLLAPSE")
            : (lang === "zh" ? "展开" : "EXPAND")}
        </span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SELECTED EPOCH READOUT (fixed instrument)
───────────────────────────────────────────── */
function ReadOut({ epoch }: { epoch: (typeof EPOCHS)[0] | null }) {
  const { lang } = useLang();
  if (!epoch) return null;
  return (
    <div
      className="holo rounded-xl px-4 py-3 flex items-center gap-4 text-xs mono"
      style={{ borderColor: epoch.accent + "40" }}
    >
      <div
        className="w-2.5 h-2.5 rounded-full flex-shrink-0 pulse"
        style={{ background: epoch.accent, boxShadow: `0 0 8px 2px ${epoch.accent}` }}
      />
      <div className="flex-1 min-w-0">
        <div className="label-mono text-ghost-500 mb-0.5">
          {lang === "zh" ? "当前纪元" : "SELECTED EPOCH"}
        </div>
        <div
          className={`text-sm font-semibold truncate ${lang === "zh" ? "zh" : "display"}`}
          style={{ color: epoch.accent }}
        >
          <T v={epoch.name} />
        </div>
      </div>
      <div className="text-ghost-500 text-right hidden sm:block">
        <div className="label-mono mb-0.5">{lang === "zh" ? "时代" : "ERA"}</div>
        <div className="text-ghost-300 text-xs mono">
          <T v={epoch.era} />
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PROGRESS INDICATOR — bottom legend bar
───────────────────────────────────────────── */
function ProgressLegend({
  activeIdx,
  onSelect,
}: {
  activeIdx: number | null;
  onSelect: (i: number) => void;
}) {
  const { lang } = useLang();
  return (
    <div className="flex items-center gap-1 flex-wrap justify-center">
      {EPOCHS.map((ep, i) => (
        <button
          key={ep.key}
          title={ep.name[lang]}
          onClick={() => onSelect(i)}
          className="relative group transition-all duration-200"
          aria-label={ep.name[lang]}
        >
          <div
            className="h-[5px] rounded-full transition-all duration-300"
            style={{
              width: activeIdx === i ? 28 : 14,
              background: activeIdx === i ? ep.accent : ep.accent + "44",
              boxShadow: activeIdx === i ? `0 0 8px 1px ${ep.accent}` : "none",
            }}
          />
          {/* tooltip */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-50">
            <div
              className="holo rounded px-2 py-1 label-mono text-[0.55rem]"
              style={{ color: ep.accent }}
            >
              <T v={ep.name} />
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   SECTION HEADER
───────────────────────────────────────────── */
function SectionHeader() {
  const { lang } = useLang();
  return (
    <div className="text-center mb-14 sm:mb-20">
      {/* section label */}
      <div className="label-mono text-warp-400 mb-4">
        {lang === "zh"
          ? "01 · 引力的历史"
          : "01 · THE HISTORY OF GRAVITY"}
      </div>

      {/* main title */}
      <h1
        className={`display text-4xl sm:text-5xl lg:text-6xl text-ghost-50 mb-4 leading-[1.05] ${lang === "zh" ? "zh" : ""}`}
      >
        {lang === "zh" ? (
          <>从坠落之物，<br className="sm:hidden" />到时空的形状</>
        ) : (
          <>From things that fall<br className="sm:hidden" /> to the shape of spacetime</>
        )}
      </h1>

      {/* rule */}
      <div className="rule-grav h-px w-40 mx-auto my-5" />

      {/* sub */}
      <p
        className={`serif text-ghost-300 text-base sm:text-lg max-w-xl mx-auto leading-relaxed ${lang === "zh" ? "zh" : ""}`}
      >
        {lang === "zh"
          ? "十个纪元，两千年来人类对引力理解的演变。"
          : "Ten epochs. Two thousand years of humanity learning to see what holds the cosmos together."}
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MOBILE STACKED LAYOUT
   Single column, spine on the left edge
───────────────────────────────────────────── */
function MobileTimeline({
  activeIdx,
  setActive,
}: {
  activeIdx: number | null;
  setActive: (i: number | null) => void;
}) {
  const SPINE_WIDTH = 48; // px — spine + dot column width

  return (
    <div className="relative flex flex-col gap-0">
      {EPOCHS.map((ep, i) => (
        <div key={ep.key} className="flex gap-0">
          {/* spine column */}
          <div
            className="relative flex-shrink-0 flex flex-col items-center"
            style={{ width: SPINE_WIDTH }}
          >
            {/* connector line segment */}
            <div
              className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px"
              style={{
                background: `linear-gradient(180deg, ${
                  i === 0 ? "transparent" : ep.accent + "55"
                }, ${
                  i === EPOCHS.length - 1 ? "transparent" : (EPOCHS[i + 1]?.accent ?? ep.accent) + "44"
                })`,
              }}
            />
            {/* node — vertically centered at card top */}
            <div className="relative z-10 mt-5">
              <NodeDot
                accent={ep.accent}
                active={activeIdx === i}
                idx={i}
              />
            </div>
          </div>

          {/* card */}
          <div className="flex-1 py-3 pr-2 pl-1">
            <EpochCard
              epoch={ep}
              idx={i}
              active={activeIdx === i}
              side="right"
              onActivate={() => setActive(activeIdx === i ? null : i)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   DESKTOP ZIG-ZAG LAYOUT
   Alternating left / right cards with spine
───────────────────────────────────────────── */
function DesktopTimeline({
  activeIdx,
  setActive,
}: {
  activeIdx: number | null;
  setActive: (i: number | null) => void;
}) {
  const ROW_MIN_H = 160; // px

  return (
    <div className="relative">
      {/* Vertical spine — absolutely positioned behind rows */}
      <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-0 flex flex-col pointer-events-none">
        <div className="relative flex-1">
          <SpineLine count={EPOCHS.length} />
        </div>
      </div>

      <div className="flex flex-col">
        {EPOCHS.map((ep, i) => {
          const isLeft = i % 2 === 0;
          return (
            <div
              key={ep.key}
              className="relative grid"
              style={{
                gridTemplateColumns: "1fr 48px 1fr",
                minHeight: ROW_MIN_H,
              }}
            >
              {/* left card slot */}
              <div className={`flex items-start py-4 pr-6 ${isLeft ? "" : "opacity-0 pointer-events-none"}`}>
                {isLeft && (
                  <EpochCard
                    epoch={ep}
                    idx={i}
                    active={activeIdx === i}
                    side="left"
                    onActivate={() => setActive(activeIdx === i ? null : i)}
                  />
                )}
              </div>

              {/* spine + dot column */}
              <div className="relative flex items-start justify-center pt-5">
                <NodeDot
                  accent={ep.accent}
                  active={activeIdx === i}
                  idx={i}
                />
              </div>

              {/* right card slot */}
              <div className={`flex items-start py-4 pl-6 ${!isLeft ? "" : "opacity-0 pointer-events-none"}`}>
                {!isLeft && (
                  <EpochCard
                    epoch={ep}
                    idx={i}
                    active={activeIdx === i}
                    side="right"
                    onActivate={() => setActive(activeIdx === i ? null : i)}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   ANIMATED PARTICLE FIELD (background)
   Tiny stars that drift very slowly
───────────────────────────────────────────── */
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = canvas.offsetWidth;
    let H = canvas.offsetHeight;
    canvas.width = W;
    canvas.height = H;

    const STAR_COUNT = Math.min(Math.floor((W * H) / 8000), 160);

    type Star = { x: number; y: number; r: number; a: number; da: number; vx: number; vy: number };
    const stars: Star[] = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.4 + 0.3,
      a: Math.random(),
      da: (Math.random() - 0.5) * 0.004,
      vx: (Math.random() - 0.5) * 0.06,
      vy: (Math.random() - 0.5) * 0.04,
    }));

    const render = () => {
      ctx.clearRect(0, 0, W, H);
      for (const s of stars) {
        s.x += s.vx;
        s.y += s.vy;
        s.a = Math.max(0.05, Math.min(1, s.a + s.da));
        if (s.x < 0) s.x = W;
        if (s.x > W) s.x = 0;
        if (s.y < 0) s.y = H;
        if (s.y > H) s.y = 0;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(196,210,255,${s.a * 0.6})`;
        ctx.fill();
      }
      frameRef.current = requestAnimationFrame(render);
    };

    render();

    const onResize = () => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width = W;
      canvas.height = H;
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
      aria-hidden
    />
  );
}

/* ─────────────────────────────────────────────
   SCROLL-TO EPOCH (keyboard / progress legend)
───────────────────────────────────────────── */
function useScrollToEpoch() {
  return useCallback((idx: number) => {
    const el = document.getElementById(`epoch-${EPOCHS[idx].key}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  }, []);
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function GravityTimeline() {
  const { lang } = useLang();
  const [activeIdx, setActiveIdxRaw] = useState<number | null>(null);
  const scrollTo = useScrollToEpoch();

  const setActive = useCallback(
    (i: number | null) => {
      setActiveIdxRaw(i);
    },
    []
  );

  const handleLegendSelect = useCallback(
    (i: number) => {
      setActive(i);
      scrollTo(i);
    },
    [setActive, scrollTo]
  );

  return (
    <section
      id="gravity-timeline"
      className="relative w-full min-h-screen overflow-hidden"
      style={{ background: "#04060f" }}
    >
      {/* ambient star field */}
      <div className="absolute inset-0 pointer-events-none">
        <ParticleField />
      </div>

      {/* gravitational well radial glow */}
      <div
        className="absolute inset-x-0 top-0 h-96 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(81,96,240,0.18) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-64 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 110%, rgba(47,224,230,0.12) 0%, transparent 70%)",
        }}
      />

      {/* content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">

        <SectionHeader />

        {/* selected epoch readout */}
        <div
          className={`mb-8 transition-all duration-400 ${
            activeIdx !== null ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
          }`}
        >
          <ReadOut epoch={activeIdx !== null ? EPOCHS[activeIdx] : null} />
        </div>

        {/* timeline — mobile vs desktop */}
        <div className="block sm:hidden">
          {/* Add invisible anchor divs for scroll-to */}
          {EPOCHS.map((ep, i) => (
            <div
              key={ep.key}
              id={`epoch-${ep.key}`}
            />
          ))}
          <MobileTimeline activeIdx={activeIdx} setActive={setActive} />
        </div>

        <div className="hidden sm:block">
          {EPOCHS.map((ep) => (
            <div key={ep.key} id={`epoch-${ep.key}`} />
          ))}
          <DesktopTimeline activeIdx={activeIdx} setActive={setActive} />
        </div>

        {/* bottom rule */}
        <div className="rule-grav h-px w-full my-14 sm:my-20" />

        {/* progress legend */}
        <div className="flex flex-col items-center gap-4">
          <div className="label-mono text-ghost-500">
            {lang === "zh" ? "纪元导航" : "EPOCH NAVIGATOR"}
          </div>
          <ProgressLegend activeIdx={activeIdx} onSelect={handleLegendSelect} />
          {/* conceptual axis labels */}
          <div className="flex items-center gap-6 mt-2">
            {[
              { label: { en: "Intuition", zh: "直觉" }, color: "#8d96ba" },
              { label: { en: "Measurement", zh: "测量" }, color: "#9db4ff" },
              { label: { en: "Geometry", zh: "几何" }, color: "#2fe0e6" },
              { label: { en: "Quantum", zh: "量子" }, color: "#a6f7f5" },
            ].map((ax) => (
              <div key={ax.label.en} className="flex items-center gap-1.5">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: ax.color }}
                />
                <span
                  className={`label-mono text-[0.55rem] ${lang === "zh" ? "zh" : ""}`}
                  style={{ color: ax.color }}
                >
                  {ax.label[lang]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* closing meditation */}
        <div className="mt-20 text-center max-w-2xl mx-auto">
          <div className="rule-grav h-px w-24 mx-auto mb-8" />
          <p
            className={`serif text-ghost-400 text-sm sm:text-base leading-[1.9] ${lang === "zh" ? "zh" : ""}`}
          >
            {lang === "zh" ? (
              <>
                每一次革命都没有否定上一个纪元，而是揭示出它是某个更深框架的一种近似。
                牛顿并未错——他的方程在我们的宇宙角落里依然有效。
                他只是不够深。这，正是引力的故事，也是科学的故事。
              </>
            ) : (
              <>
                Each revolution did not disprove the last epoch — it revealed it as an approximation
                of a deeper frame. Newton was not wrong; his equations still work in our corner of the
                cosmos. He was merely not deep enough. That is the story of gravity.
                That is the story of science.
              </>
            )}
          </p>
        </div>

      </div>
    </section>
  );
}
