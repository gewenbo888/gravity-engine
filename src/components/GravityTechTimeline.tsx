"use client";

import { useLang, T } from "./lang";
import { GRAV_TECH, ESCAPE_LADDER, GRAV_FUTURES } from "./content";

const KIND_COLOR: Record<string, string> = {
  theory: "#8d96ba", rocket: "#ffb43d", orbit: "#9db4ff",
  deep: "#7d8cff", wave: "#6cefef", future: "#c4d2ff",
};

export default function GravityTechTimeline() {
  const { lang } = useLang();
  // log-scaled escape-velocity bars (Moon 2.4 → BH 299792 km/s)
  const maxLog = Math.log10(ESCAPE_LADDER[ESCAPE_LADDER.length - 1].kms);
  const minLog = Math.log10(ESCAPE_LADDER[0].kms) - 0.4;

  return (
    <div className="space-y-8">
      {/* mastery timeline */}
      <div>
        <div className="label-mono">Climbing &amp; using the well · 攀爬并利用引力阱</div>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {GRAV_TECH.map((g, i) => (
            <div key={i} className="holo rounded-xl p-4" style={{ borderTop: `2px solid ${KIND_COLOR[g.kind]}` }}>
              <div className="mono text-[0.66rem]" style={{ color: KIND_COLOR[g.kind] }}><T v={g.year} /></div>
              <div className={`mt-1 text-sm text-ghost-50 ${lang === "zh" ? "zh" : "display"}`}><T v={g.title} /></div>
              <p className="mt-1.5 text-xs leading-relaxed text-ghost-300"><T v={g.note} /></p>
            </div>
          ))}
        </div>
      </div>

      {/* escape velocity ladder */}
      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <div className="holo rounded-xl p-5">
            <div className="label-mono">Escape velocity · 逃逸速度 <span className="text-ghost-500">(log)</span></div>
            <div className="mt-4 space-y-2.5">
              {ESCAPE_LADDER.map((e, i) => {
                const frac = (Math.log10(e.kms) - minLog) / (maxLog - minLog);
                const isBH = i === ESCAPE_LADDER.length - 1;
                return (
                  <div key={i}>
                    <div className="flex items-baseline justify-between text-xs">
                      <span className={`text-ghost-100 ${lang === "zh" ? "zh" : ""}`}><T v={e.body} /></span>
                      <span className="mono" style={{ color: isBH ? "#ffb43d" : "#9db4ff" }}>
                        {e.kms >= 1000 ? (e.kms / 1000).toLocaleString(undefined, { maximumFractionDigits: 0 }) + "k" : e.kms} km/s
                      </span>
                    </div>
                    <div className="mt-1 h-2.5 w-full overflow-hidden rounded-full bg-void-700">
                      <div className="h-full rounded-full transition-all"
                        style={{ width: `${Math.max(4, frac * 100)}%`, background: isBH ? "linear-gradient(90deg,#f08a00,#ffdc94)" : "linear-gradient(90deg,#5160f0,#9db4ff)" }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="lg:col-span-2 flex flex-col justify-center">
          <p className="text-base leading-relaxed text-ghost-200">
            <T v={{
              en: "Every gravity well has an exit speed. From the Moon it is a gentle 2.4 km/s; from Earth, 11.2; from the Sun's surface, 618. At a black hole's horizon, the escape speed reaches the speed of light itself — which is exactly why nothing leaves.",
              zh: "每一口引力阱都有一个逃逸速度。从月球出发，是温和的 2.4 公里/秒；从地球，11.2；从太阳表面，618。而在黑洞的视界处，逃逸速度达到了光速本身——这正是为何无物可逃。",
            }} />
          </p>
        </div>
      </div>

      {/* future tech */}
      <div>
        <div className="label-mono">Toward sculpting spacetime · 迈向雕塑时空</div>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {GRAV_FUTURES.map((f, i) => (
            <div key={i} className="holo rounded-xl p-5" style={{ borderTop: `2px solid ${f.accent}` }}>
              <div className="flex items-center justify-between">
                <span className={`text-base text-ghost-50 ${lang === "zh" ? "zh" : "display"}`}><T v={f.name} /></span>
                <span className="mono text-[0.58rem] uppercase tracking-wider" style={{ color: f.accent }}><T v={f.horizon} /></span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-ghost-300"><T v={f.desc} /></p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
