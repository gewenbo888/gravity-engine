"use client";

import { useState } from "react";
import { T, useLang } from "./lang";
import { UNIFY_NODES, UNIFY_EDGES } from "./content";

const GROUP_COLOR: Record<string, string> = {
  grav: "#7d8cff", quantum: "#6cefef", info: "#ffb43d", cosmo: "#c4d2ff",
};
const GROUP_LABEL: Record<string, { en: string; zh: string }> = {
  grav: { en: "Gravity", zh: "引力" },
  quantum: { en: "Quantum", zh: "量子" },
  info: { en: "Information", zh: "信息" },
  cosmo: { en: "Cosmology", zh: "宇宙学" },
};

export default function UnifiedTheoryMap() {
  const { lang } = useLang();
  const [active, setActive] = useState<string | null>("holo");
  const byId = (id: string) => UNIFY_NODES.find((n) => n.id === id)!;
  const connected = (id: string) =>
    UNIFY_EDGES.filter(([a, b]) => a === id || b === id).map(([a, b]) => (a === id ? b : a));
  const litEdges = (a: string, b: string) => active === a || active === b;

  return (
    <div>
      <div className="holo overflow-hidden rounded-xl p-4">
        <svg viewBox="0 0 100 100" className="w-full" style={{ maxHeight: 460 }}>
          {/* edges */}
          {UNIFY_EDGES.map(([a, b], i) => {
            const na = byId(a), nb = byId(b);
            const lit = litEdges(a, b);
            return (
              <line key={i} x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
                stroke={lit ? "#ffdc94" : "rgba(157,180,255,0.22)"}
                strokeWidth={lit ? 0.5 : 0.3}
                className={lit ? "flow" : ""} />
            );
          })}
          {/* nodes */}
          {UNIFY_NODES.map((n) => {
            const isActive = active === n.id;
            const isNeighbor = active ? connected(active).includes(n.id) : false;
            const c = GROUP_COLOR[n.group];
            const r = isActive ? 3.4 : isNeighbor ? 2.6 : 2.1;
            return (
              <g key={n.id} className="cursor-pointer" onClick={() => setActive(n.id)}
                onMouseEnter={() => setActive(n.id)}>
                <circle cx={n.x} cy={n.y} r={r + 2.6} fill={c} opacity={isActive ? 0.22 : 0.08} />
                <circle cx={n.x} cy={n.y} r={r} fill={isActive || isNeighbor ? c : "#11162b"} stroke={c} strokeWidth="0.4" />
                <text x={n.x} y={n.y - r - 1.4} textAnchor="middle"
                  fontSize="2.5" fontFamily={lang === "zh" ? "'Noto Sans SC'" : "'Space Grotesk'"}
                  fill={isActive ? "#f5f7ff" : "#c2c9e4"} fontWeight={isActive ? 600 : 400}>
                  {n.label[lang]}
                </text>
              </g>
            );
          })}
        </svg>
        {/* legend */}
        <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1">
          {Object.keys(GROUP_COLOR).map((g) => (
            <span key={g} className="flex items-center gap-1.5 mono text-[0.6rem] text-ghost-300">
              <span className="inline-block h-2 w-2 rounded-full" style={{ background: GROUP_COLOR[g] }} />
              <T v={GROUP_LABEL[g]} />
            </span>
          ))}
        </div>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-ghost-300">
        <T v={{
          en: "Every serious attempt to finish physics threads through the same crossroads — holography and entanglement, where gravity, quantum mechanics, information and cosmology appear to be different views of one structure. Hover a node to trace its connections.",
          zh: "每一次完成物理学的认真尝试，都穿过同一个十字路口——全息与纠缠，在那里，引力、量子力学、信息与宇宙学，似乎是同一个结构的不同视角。悬停一个节点，追踪它的连接。",
        }} />
      </p>
    </div>
  );
}
