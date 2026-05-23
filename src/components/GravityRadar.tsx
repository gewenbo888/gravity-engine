"use client";

import { useState } from "react";
import { T, useLang } from "./lang";
import { CAPACITIES } from "./content";

type Key = "newton" | "relativity" | "frontier";
const PROFILES: { key: Key; label: { en: string; zh: string }; color: string }[] = [
  { key: "newton", label: { en: "Newtonian", zh: "牛顿引力" }, color: "#9db4ff" },
  { key: "relativity", label: { en: "General relativity", zh: "广义相对论" }, color: "#ffb43d" },
  { key: "frontier", label: { en: "Quantum / emergent", zh: "量子 / 涌现" }, color: "#6cefef" },
];

export default function GravityRadar() {
  const { lang } = useLang();
  const [on, setOn] = useState<Record<Key, boolean>>({ newton: true, relativity: true, frontier: true });

  const N = CAPACITIES.length;
  const C = 50, R = 38;
  const pt = (i: number, v: number) => {
    const ang = (i / N) * Math.PI * 2 - Math.PI / 2;
    const r = (v / 100) * R;
    return [C + Math.cos(ang) * r, C + Math.sin(ang) * r];
  };
  const polyFor = (key: Key) =>
    CAPACITIES.map((c, i) => pt(i, c[key]).map((n) => n.toFixed(1)).join(",")).join(" ");

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <div className="lg:col-span-3">
        <div className="holo rounded-xl p-4">
          <svg viewBox="0 0 100 100" className="w-full" style={{ maxHeight: 460 }}>
            {/* rings */}
            {[0.25, 0.5, 0.75, 1].map((f) => (
              <polygon key={f}
                points={CAPACITIES.map((_, i) => pt(i, f * 100).map((n) => n.toFixed(1)).join(",")).join(" ")}
                fill="none" stroke="rgba(157,180,255,0.13)" strokeWidth="0.3" />
            ))}
            {/* spokes + labels */}
            {CAPACITIES.map((c, i) => {
              const [x, y] = pt(i, 100);
              const [lx, ly] = pt(i, 122);
              return (
                <g key={i}>
                  <line x1={C} y1={C} x2={x} y2={y} stroke="rgba(157,180,255,0.13)" strokeWidth="0.3" />
                  <text x={lx} y={ly} textAnchor="middle" dominantBaseline="middle"
                    fontSize="3" fontFamily="'JetBrains Mono', monospace" fill="#8d96ba">{c.sym}</text>
                </g>
              );
            })}
            {/* profile polygons */}
            {PROFILES.filter((p) => on[p.key]).map((p) => (
              <polygon key={p.key} points={polyFor(p.key)}
                fill={p.color} fillOpacity={0.12} stroke={p.color} strokeWidth="0.7" />
            ))}
            {PROFILES.filter((p) => on[p.key]).map((p) =>
              CAPACITIES.map((c, i) => {
                const [x, y] = pt(i, c[p.key]);
                return <circle key={p.key + i} cx={x} cy={y} r="0.9" fill={p.color} />;
              })
            )}
          </svg>
          <div className="mt-2 flex flex-wrap justify-center gap-2">
            {PROFILES.map((p) => (
              <button key={p.key} onClick={() => setOn((s) => ({ ...s, [p.key]: !s[p.key] }))}
                className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs transition ${on[p.key] ? "" : "opacity-40"}`}
                style={{ borderColor: p.color }}>
                <span className="inline-block h-2 w-2 rounded-full" style={{ background: p.color }} />
                <span className={lang === "zh" ? "zh" : "mono"}><T v={p.label} /></span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="lg:col-span-2">
        <div className="space-y-2.5">
          {CAPACITIES.map((c, i) => (
            <div key={i} className="holo rounded-lg p-3.5">
              <div className="flex items-baseline gap-2">
                <span className="mono text-sm text-warp-400">{c.sym}</span>
                <span className={`text-sm text-ghost-50 ${lang === "zh" ? "zh" : "display"}`}><T v={c.name} /></span>
              </div>
              <p className="mt-1 text-xs leading-relaxed text-ghost-300"><T v={c.gloss} /></p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs leading-relaxed text-ghost-500">
          <T v={{
            en: "Each theory captures a different face of gravity. Newton nails the force of mass; relativity owns geometry and the cosmos; only the quantum-emergent frontier reaches information, entropy and the quantum — at the cost of still being untested.",
            zh: "每一种理论都捕捉到引力的不同面孔。牛顿精确刻画了质量之力；相对论占据了几何与宇宙；唯有量子—涌现的前沿，才触及信息、熵与量子——代价是它仍未经检验。",
          }} />
        </p>
      </div>
    </div>
  );
}
