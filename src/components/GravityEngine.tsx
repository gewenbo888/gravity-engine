"use client";

import { ReactNode } from "react";
import { LangProvider, LangToggle, T, useLang } from "./lang";
import { SECTIONS, BIG_QUESTIONS } from "./content";
import GravityField from "./GravityField";
import GravityTimeline from "./GravityTimeline";
import OrbitLab from "./OrbitLab";
import CurvatureWell from "./CurvatureWell";
import BlackHoleViz from "./BlackHoleViz";
import WaveLab from "./WaveLab";
import QuantumSpacetime from "./QuantumSpacetime";
import CosmicWeb from "./CosmicWeb";
import HolographicGravity from "./HolographicGravity";
import GravityTechTimeline from "./GravityTechTimeline";
import UnifiedTheoryMap from "./UnifiedTheoryMap";
import GravityRadar from "./GravityRadar";
import RecursiveGravityEngine from "./RecursiveGravityEngine";

const VIS: Record<string, ReactNode> = {
  history: <GravityTimeline />,
  newton: <OrbitLab />,
  relativity: <CurvatureWell />,
  blackhole: <BlackHoleViz />,
  waves: <WaveLab />,
  quantum: <QuantumSpacetime />,
  cosmos: <CosmicWeb />,
  emergent: <HolographicGravity />,
  civilization: <GravityTechTimeline />,
  future: (
    <div className="space-y-8">
      <UnifiedTheoryMap />
      <QuestionsGrid />
    </div>
  ),
};

function Header() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between border-b border-warp-500/12 bg-void-950/80 px-5 py-3 backdrop-blur md:px-9">
      <div className="flex items-center gap-3">
        <svg viewBox="0 0 32 32" className="h-8 w-8">
          <g fill="none" stroke="#7d8cff" strokeWidth="1.1" opacity="0.85">
            <ellipse cx="16" cy="16" rx="13" ry="4.6" />
            <ellipse cx="16" cy="16" rx="13" ry="4.6" transform="rotate(60 16 16)" />
            <ellipse cx="16" cy="16" rx="13" ry="4.6" transform="rotate(120 16 16)" />
          </g>
          <circle cx="16" cy="16" r="5.4" fill="#ffb43d" opacity="0.9" />
          <circle cx="16" cy="16" r="2.7" fill="#04060f" />
          <circle cx="16" cy="16" r="2.7" fill="none" stroke="#ffdc94" strokeWidth="0.7" />
        </svg>
        <div className="leading-tight">
          <div className="display text-base text-ghost-50">Gravity Engine</div>
          <div className="zh text-[0.6rem] text-ghost-500">引力引擎</div>
        </div>
      </div>
      <nav className="hidden gap-5 font-mono text-[0.58rem] uppercase tracking-[0.18em] text-ghost-500 xl:flex">
        <a href="#history" className="hover:text-warp-400">History</a>
        <a href="#newton" className="hover:text-warp-400">Newton</a>
        <a href="#relativity" className="hover:text-warp-400">Curvature</a>
        <a href="#blackhole" className="hover:text-warp-400">Black holes</a>
        <a href="#waves" className="hover:text-warp-400">Waves</a>
        <a href="#quantum" className="hover:text-warp-400">Quantum</a>
        <a href="#cosmos" className="hover:text-warp-400">Cosmos</a>
        <a href="#future" className="hover:text-warp-400">Future</a>
      </nav>
      <div className="flex items-center gap-3">
        <LangToggle />
        <a href="https://psyverse.fun" className="hidden font-mono text-[0.58rem] uppercase tracking-[0.18em] text-wave-400 hover:text-warp-400 sm:block">← Psyverse</a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-24">
      <div className="absolute inset-0 z-0 opacity-95"><GravityField /></div>
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-void-950/30 via-transparent to-void-950" />
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-void-950/70 via-transparent to-transparent" />
      <div className="relative z-20 mx-auto w-full max-w-6xl px-6 md:px-12">
        <div className="label-mono">Psyverse · An atlas of gravity</div>
        <div className="mt-2 font-mono text-[0.6rem] uppercase tracking-[0.3em] text-ghost-500">
          EN · 中文 · falling → orbits → curved spacetime → black holes → cosmic structure → emergent geometry
        </div>
        <h1 className="display mt-6 text-6xl leading-[0.95] text-ghost-50 md:text-8xl">
          Gravity <span className="warp-text">Engine</span>
        </h1>
        <h2 className="zh mt-3 text-3xl text-ghost-200 md:text-5xl">引力引擎</h2>

        <p className="mt-9 max-w-2xl text-lg leading-relaxed text-ghost-100 md:text-xl">
          <T v={{
            en: "Gravity governs planets, stars, galaxies, black holes — and the evolution of the universe itself. Yet it remains one of physics' deepest mysteries. We went from falling objects, to universal attraction, to curved spacetime, to the suspicion that gravity may not be a force at all.",
            zh: "引力统辖行星、恒星、星系、黑洞——以及宇宙自身的演化。然而它仍是物理学最深的奥秘之一。我们一路从坠落之物，走向万有引力，走向弯曲的时空，再走向一个怀疑：引力，或许根本就不是一种力。",
          }} />
        </p>

        <div className="mt-10 max-w-2xl holo rounded-lg p-6">
          <div className="label-mono">Central thesis · 核心论点</div>
          <p className="serif mt-3 text-xl leading-relaxed text-ghost-50 md:text-2xl">
            <T v={{
              en: "Gravity may not merely pull objects together. It may reveal how spacetime, information, energy, and reality itself are fundamentally organized — the deepest architecture of the universe.",
              zh: "引力或许并不只是把物体拽到一起。它也许揭示着时空、信息、能量与现实本身，是如何被根本地组织起来的——宇宙最深的架构。",
            }} />
          </p>
        </div>

        <div className="mt-12 flex flex-wrap gap-x-8 gap-y-2 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-ghost-500">
          <span>10 systems · 十大系统</span>
          <span>live orbit · curvature · black-hole sims</span>
          <span>F=Gm₁m₂/r² · Gμν · LIGO · holography</span>
        </div>
      </div>
    </section>
  );
}

function SectionBlock({ num, id, title, sub, body, vis }: { num: string; id: string; title: any; sub: any; body: any; vis?: ReactNode }) {
  const { lang } = useLang();
  return (
    <section id={id} className="relative border-t border-warp-500/8 px-6 py-24 md:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-baseline gap-4">
          <span className="display text-5xl text-warp-500/25">{num}</span>
          <div>
            <h2 className={`text-4xl text-ghost-50 md:text-5xl ${lang === "zh" ? "zh" : "display"}`}><T v={title} /></h2>
            <h3 className="mt-1 text-lg text-wave-400"><T v={sub} /></h3>
          </div>
        </div>
        <div className="mt-5 h-px rule-grav opacity-60" />
        <p className="mt-8 max-w-3xl text-lg leading-relaxed text-ghost-200"><T v={body} /></p>
        {vis && <div className="mt-12">{vis}</div>}
      </div>
    </section>
  );
}

function sectionProps(id: string) {
  const s = SECTIONS.find((x) => x.id === id)!;
  return { num: s.num, id: s.id, title: s.title, sub: s.sub, body: s.body };
}

/* ---- Section 10 : big questions ---- */
function QuestionsGrid() {
  const { lang } = useLang();
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {BIG_QUESTIONS.map((q, i) => (
        <div key={i} className="holo flex gap-4 rounded-xl p-5">
          <span className="mono shrink-0 text-2xl text-warp-400/60">{String(i + 1).padStart(2, "0")}</span>
          <div>
            <div className={`text-base leading-snug text-ghost-50 ${lang === "zh" ? "zh" : "display"}`}><T v={q.q} /></div>
            <p className="mt-2 font-mono text-[0.68rem] leading-relaxed text-wave-400/80"><T v={q.lens} /></p>
          </div>
        </div>
      ))}
    </div>
  );
}

function Body() {
  const { lang } = useLang();
  return (
    <main className="relative bg-void-950 text-ghost-100">
      <Header />
      <Hero />

      <div className="grid-bg border-y border-warp-500/12 bg-void-900/60 py-2.5 overflow-hidden">
        <div className="whitespace-nowrap font-mono text-[0.65rem] uppercase tracking-[0.3em] text-wave-400/70 ticker inline-block">
          {(lang === "zh"
            ? "万有引力 · 自由落体 · 椭圆轨道 · 时空曲率 · 测地线 · 引力阱 · 事件视界 · 奇点 · 霍金辐射 · 引力波 · 引力透镜 · 暗物质 · 暗能量 · 量子引力 · 全息原理 · 涌现时空 · "
            : "UNIVERSAL GRAVITATION · FREE FALL · ELLIPTICAL ORBITS · SPACETIME CURVATURE · GEODESICS · GRAVITY WELLS · EVENT HORIZON · SINGULARITY · HAWKING RADIATION · GRAVITATIONAL WAVES · LENSING · DARK MATTER · DARK ENERGY · QUANTUM GRAVITY · HOLOGRAPHY · EMERGENT SPACETIME · ").repeat(2)}
        </div>
      </div>

      {SECTIONS.map((s) => (
        <SectionBlock key={s.id} {...sectionProps(s.id)} vis={VIS[s.id]} />
      ))}

      {/* Meta-model */}
      <section id="model" className="relative border-t border-warp-500/8 px-6 py-24 md:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="label-mono">Meta-model · 元模型</div>
          <h2 className="display mt-3 text-4xl text-ghost-50 md:text-5xl">
            <T v={{ en: "The anatomy of gravity", zh: "引力的解剖" }} />
          </h2>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-ghost-200">
            <T v={{
              en: "Gravity Structure = Mass-Energy Distribution + Spacetime Geometry + Information Density + Entropy Dynamics + Quantum Structure + Cosmic Curvature. No single theory yet pushes all six terms at once — compare how Newton, Einstein and the quantum frontier each capture a different face of the same phenomenon.",
              zh: "引力结构 = 质能分布 + 时空几何 + 信息密度 + 熵动力学 + 量子结构 + 宇宙曲率。至今没有任何单一理论能同时推动全部六项——比较牛顿、爱因斯坦与量子前沿，看它们各自如何捕捉同一现象的不同面孔。",
            }} />
          </p>
          <div className="mt-12"><GravityRadar /></div>
        </div>
      </section>

      {/* Recursive engine */}
      <section id="recursion" className="relative border-t border-warp-500/8 px-6 py-24 md:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="label-mono">Recursive engine · 递归引擎</div>
          <h2 className="display mt-3 text-4xl text-ghost-50 md:text-5xl">
            <T v={{ en: "Run gravity, scale by scale", zh: "逐尺度地，运行引力" }} />
          </h2>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-ghost-200">
            <T v={{
              en: "The same move repeats from the quantum vacuum to the cosmic web: mass-energy bends geometry, and geometry steers mass-energy. Couple the scales, ramp the coupling, and watch a single principle build everything from a falling apple to the architecture of the cosmos.",
              zh: "从量子真空到宇宙网，同一个动作不断重复：质能弯曲几何，几何引导质能。把各个尺度耦合起来，调高耦合强度，看一条原理如何从一颗坠落的苹果，一路建造出宇宙的架构。",
            }} />
          </p>
          <div className="mt-12"><RecursiveGravityEngine /></div>
        </div>
      </section>

      {/* Closing */}
      <section className="relative border-t border-warp-500/8 px-6 py-32 md:px-12">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="serif text-4xl leading-snug text-ghost-50 md:text-6xl">
            <T v={{ en: "Gravity may be the shape reality takes when it has mass, memory, and time.", zh: "引力，也许就是现实在拥有质量、记忆与时间之后，所呈现出的形状。" }} />
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-ghost-300">
            <T v={{
              en: "From a falling apple to the bending of starlight to ripples crossing a billion light-years, the same quiet principle is at work: matter tells spacetime how to curve, and spacetime tells matter how to move. Gravity governs stars, galaxies, black holes, and the structure of the cosmos itself — yet its true nature remains unknown. It may not merely pull objects together. It may reveal how spacetime, information, energy, and reality itself are fundamentally organized.",
              zh: "从一颗坠落的苹果，到星光的弯折，再到横越十亿光年的涟漪，同一个静默的原理始终在运作：物质告诉时空如何弯曲，时空告诉物质如何运动。引力统辖恒星、星系、黑洞，以及宇宙自身的结构——然而它真正的本质，仍不为人所知。它或许并不只是把物体拽到一起。它也许揭示着时空、信息、能量与现实本身，是如何被根本地组织起来的。",
            }} />
          </p>
          <div className="mx-auto mt-10 max-w-xl rounded-lg border border-wave-500/25 bg-void-900/60 p-5">
            <p className="text-xs leading-relaxed text-ghost-500">
              <T v={{
                en: "An educational synthesis of classical mechanics, general relativity, astrophysics, and the frontier of quantum gravity. Simulations are illustrative simplifications, not exact solutions of the field equations; figures are order-of-magnitude. Speculative ideas — emergent gravity, holography, warp drives — are flagged as open, not settled.",
                zh: "一份融合经典力学、广义相对论、天体物理与量子引力前沿的教育性综述。文中的模拟为示意性的简化，并非场方程的精确解；数字为数量级估计。涌现引力、全息、曲速等推测性构想，均被如实标注为悬而未决，而非定论。",
              }} />
            </p>
          </div>
          <div className="mx-auto mt-12 h-px w-40 rule-grav" />
          <p className="mt-6 font-mono text-[0.6rem] uppercase tracking-[0.4em] text-wave-400/70">
            Gravity Engine · 引力引擎 · Psyverse · 2026
          </p>
        </div>
      </section>

      <footer className="border-t border-warp-500/12 bg-void-950 px-6 py-16 md:px-12">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-3">
          <div>
            <div className="display text-xl text-ghost-50">Gravity Engine</div>
            <div className="zh mt-1 text-sm text-ghost-300">引力引擎</div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ghost-500">
              <T v={{ en: "The nature of gravity, spacetime curvature, cosmic structure, and universal attraction.", zh: "引力、时空曲率、宇宙结构与万有引力的本质。" }} />
            </p>
          </div>
          <div>
            <div className="label-mono">Systems · 系统</div>
            <ul className="mt-4 space-y-1.5 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-ghost-500">
              {SECTIONS.slice(0, 6).map((s) => (
                <li key={s.id}><a href={`#${s.id}`} className="hover:text-warp-400">{s.num} · <T v={s.title} /></a></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="label-mono">Companion archives</div>
            <ul className="mt-4 space-y-1.5 text-sm text-ghost-300">
              <li><a href="https://energy-engine.psyverse.fun" className="hover:text-warp-300">Energy Engine · 能量引擎</a></li>
              <li><a href="https://spacetime-engine.psyverse.fun" className="hover:text-warp-300">Spacetime Engine · 时空引擎</a></li>
              <li><a href="https://information-engine.psyverse.fun" className="hover:text-warp-300">Information Engine · 信息引擎</a></li>
              <li className="pt-3"><a href="https://psyverse.fun" className="text-wave-400 hover:text-warp-300">↩ All Psyverse archives</a></li>
            </ul>
          </div>
        </div>
        <div className="mx-auto mt-12 h-px max-w-7xl rule-grav" />
        <div className="mx-auto mt-6 flex max-w-7xl items-center justify-between text-[0.58rem] uppercase tracking-[0.3em] text-ghost-500">
          <div>© 2026 Gewenbo · Psyverse</div>
          <div>EN · 中文 · educational</div>
        </div>
      </footer>
    </main>
  );
}

export default function GravityEngine() {
  return (
    <LangProvider>
      <Body />
    </LangProvider>
  );
}
