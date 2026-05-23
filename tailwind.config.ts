import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // deep gravitational void — black with a blue undertone
        void: {
          950: "#04060f",
          900: "#070a16",
          800: "#0b0f1f",
          700: "#11162b",
          600: "#1a2140",
          500: "#262f54",
        },
        // warp — spacetime curvature, geodesics, the grid (primary signal)
        warp: {
          600: "#5160f0",
          500: "#7d8cff",
          400: "#9db4ff",
          300: "#c4d2ff",
        },
        // accretion — singularity heat, the event-horizon glow (hot accent)
        accret: {
          600: "#f08a00",
          500: "#ffb43d",
          400: "#ffc869",
          300: "#ffdc94",
        },
        // wave — gravitational waves, lensing, the cold ripple of spacetime
        wave: {
          600: "#16b5c6",
          500: "#2fe0e6",
          400: "#6cefef",
          300: "#a6f7f5",
        },
        // light text on void — cool neutral
        ghost: {
          50: "#f5f7ff",
          100: "#e6e9f8",
          200: "#c2c9e4",
          300: "#8d96ba",
          500: "#5b6488",
          700: "#383f5c",
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ['"Sora"', "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ['"Spectral"', "ui-serif", "Georgia", "serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
        zh: ['"Noto Sans SC"', "sans-serif"],
        zhserif: ['"Noto Serif SC"', "serif"],
      },
      boxShadow: {
        warpcard: "inset 0 1px 0 rgba(157,180,255,0.07), 0 24px 60px -28px rgba(0,0,0,0.94)",
        glow: "0 0 40px -8px rgba(125,140,255,0.55)",
        glowaccret: "0 0 36px -8px rgba(255,180,61,0.5)",
        glowwave: "0 0 36px -8px rgba(47,224,230,0.5)",
      },
    },
  },
  plugins: [],
};

export default config;
