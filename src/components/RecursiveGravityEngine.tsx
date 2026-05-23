"use client";

import { useEffect, useRef, useState } from "react";
import { T, useLang } from "./lang";
import { RECURSION_LAYERS } from "./content";

/**
 * The capstone simulation: gravity re-expressed scale by scale, from the
 * quantum vacuum to emergent spacetime. Toggle layers and ramp the "coupling"
 * to watch a spacetime-integration index climb through emergent regimes.
 */
const STATES: { min: number; label: { en: string; zh: string }; color: string }[] = [
  { min: 0, label: { en: "Flat · decoupled", zh: "平直 · 解耦" }, color: "#5b6488" },
  { min: 20, label: { en: "Local attraction", zh: "局部吸引" }, color: "#9db4ff" },
  { min: 40, label: { en: "Bound orbits & wells", zh: "束缚轨道与引力阱" }, color: "#7d8cff" },
  { min: 58, label: { en: "Collapse & horizons", zh: "坍缩与视界" }, color: "#ffb43d" },
  { min: 74, label: { en: "Cosmic structure", zh: "宇宙结构" }, color: "#ffc869" },
  { min: 88, label: { en: "Emergent spacetime", zh: "涌现时空" }, color: "#6cefef" },
];

export default function RecursiveGravityEngine() {
  const { lang } = useLang();
  const [active, setActive] = useState<Record<string, boolean>>(
    Object.fromEntries(RECURSION_LAYERS.map((l) => [l.k, true]))
  );
  const [coupling, setCoupling] = useState(0.6);
  const [running, setRunning] = useState(false);
  const ramp = useRef<number>(0);

  useEffect(() => {
    if (!running) return;
    let raf = 0;
    const tick = () => {
      setCoupling((c) => {
        const next = c + 0.006;
        if (next >= 1) { setRunning(false); return 1; }
        return next;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [running]);

  const onCount = RECURSION_LAYERS.filter((l) => active[l.k]).length;
  // integration index: how many scales are coupled × coupling strength, with
  // a bonus for spanning from the quantum floor to the emergent ceiling.
  const span =
    active["planck"] && active["emerge"] ? 1.15 : 1;
  const integration = Math.min(
    100,
    Math.round((onCount / RECURSION_LAYERS.length) * 100 * (0.45 + coupling * 0.55) * span)
  );
  const state = [...STATES].reverse().find((s) => integration >= s.min) ?? STATES[0];

  const toggle = (k: string) => setActive((s) => ({ ...s, [k]: !s[k] }));

  return (
    <div className="holo rounded-2xl p-5 md:p-7">
      <div className="grid gap-6 lg:grid-cols-5">
        {/* layer stack */}
        <div className="lg:col-span-3">
          <div className="label-mono">Scales of gravity · 引力的尺度</div>
          <div className="mt-3 space-y-1.5">
            {RECURSION_LAYERS.map((l, i) => {
              const isOn = active[l.k];
              // light up progressively as integration rises
              const threshold = (i / RECURSION_LAYERS.length) * 100;
              const lit = isOn && integration >= threshold * 0.7;
              return (
                <button key={l.k} onClick={() => toggle(l.k)}
                  className={`flex w-full items-center gap-3 rounded-lg border px-3 py-2 text-left transition ${
                    isOn ? "border-void-500 bg-void-800/60" : "border-void-700 bg-transparent opacity-45"
                  }`}
                  style={lit ? { borderColor: l.color, boxShadow: `0 0 22px -12px ${l.color}` } : {}}>
                  <span className="inline-block h-2.5 w-2.5 shrink-0 rounded-full transition"
                    style={{ background: isOn ? l.color : "#383f5c", boxShadow: lit ? `0 0 10px ${l.color}` : "none" }} />
                  <span className="w-28 shrink-0">
                    <span className={`block text-sm text-ghost-50 ${lang === "zh" ? "zh" : ""}`}><T v={l.name} /></span>
                    <span className="mono text-[0.6rem] text-ghost-500"><T v={l.scale} /></span>
                  </span>
                  <span className="hidden flex-1 text-xs leading-snug text-ghost-300 sm:block"><T v={l.move} /></span>
                </button>
              );
            })}
          </div>
        </div>

        {/* gauge + controls */}
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-void-500 bg-void-900/60 p-5 text-center">
            <div className="label-mono">Spacetime integration · 时空整合度</div>
            <div className="mono mt-2 text-5xl" style={{ color: state.color }}>{integration}%</div>
            <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-void-700">
              <div className="h-full rounded-full transition-all"
                style={{ width: `${integration}%`, background: `linear-gradient(90deg,#5160f0,${state.color})` }} />
            </div>
            <div className={`mt-3 text-lg ${lang === "zh" ? "zh" : "display"}`} style={{ color: state.color }}>
              <T v={state.label} />
            </div>
            <div className="mt-0.5 mono text-[0.62rem] text-ghost-500">{onCount}/{RECURSION_LAYERS.length} scales coupled</div>
          </div>

          <div className="mt-4">
            <div className="flex items-baseline justify-between">
              <span className="label-mono">Coupling G · 耦合强度</span>
              <span className="mono text-sm text-warp-300">{coupling.toFixed(2)}</span>
            </div>
            <input type="range" min={0} max={1} step={0.01} value={coupling}
              onChange={(e) => { setCoupling(parseFloat(e.target.value)); setRunning(false); }}
              className="mt-2 w-full accent-warp-500" />
          </div>

          <div className="mt-4 flex gap-2">
            <button onClick={() => { setCoupling(0); setRunning(true); }}
              className="flex-1 rounded-lg border border-accret-500/50 bg-accret-500/15 py-2 text-sm text-accret-300 transition hover:bg-accret-500/25">
              <T v={{ en: "▶ Run the engine", zh: "▶ 运行引擎" }} />
            </button>
            <button onClick={() => { setRunning(false); setCoupling(0.6); setActive(Object.fromEntries(RECURSION_LAYERS.map((l) => [l.k, true]))); }}
              className="rounded-lg border border-void-500 px-4 py-2 text-sm text-ghost-300 transition hover:border-warp-500/60">
              <T v={{ en: "Reset", zh: "重置" }} />
            </button>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-ghost-500">
            <T v={{
              en: "The same principle repeats at every scale: mass-energy bends geometry, geometry steers mass-energy. Couple the quantum floor to the emergent ceiling and a single rule scales from a falling apple to the architecture of the cosmos.",
              zh: "同一个原理在每一个尺度上重复：质能弯曲几何，几何引导质能。把量子的底层与涌现的顶层耦合起来，一条规则便从一颗坠落的苹果，一路扩展到宇宙的架构。",
            }} />
          </p>
        </div>
      </div>
    </div>
  );
}
