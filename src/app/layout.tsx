import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

const TITLE_EN =
  "Gravity Engine · The Nature of Gravity, Spacetime Curvature, Cosmic Structure & Universal Attraction";
const TITLE_ZH = "引力引擎 · 引力、时空曲率、宇宙结构与万有引力的本质";
const DESC =
  "A civilization-scale, bilingual exploration of gravity — from falling apples to curved spacetime, black holes, gravitational waves, dark matter, quantum gravity and emergent, information-theoretic models. Gravity may not be a force at all, but the geometry of reality and perhaps the deepest architecture of the universe itself.";

export const metadata: Metadata = {
  metadataBase: new URL("https://gravity-engine.psyverse.fun"),
  title: `${TITLE_EN} | ${TITLE_ZH}`,
  description: DESC,
  keywords: [
    "gravity", "spacetime curvature", "general relativity", "Einstein field equations",
    "Newtonian gravity", "universal gravitation", "orbital mechanics", "geodesics",
    "black holes", "event horizon", "singularity", "Hawking radiation", "time dilation",
    "gravitational waves", "LIGO", "neutron stars", "gravitational lensing",
    "quantum gravity", "graviton", "loop quantum gravity", "string theory",
    "holographic principle", "emergent gravity", "entropic gravity", "Verlinde",
    "dark matter", "dark energy", "cosmic expansion", "large-scale structure",
    "galaxy rotation curves", "cosmic web", "Kardashev", "warp drive", "artificial gravity",
    "information paradox", "spacetime engineering", "cosmology", "astrophysics",
    "引力", "重力", "时空曲率", "广义相对论", "牛顿引力", "万有引力", "轨道力学", "测地线",
    "黑洞", "事件视界", "奇点", "霍金辐射", "时间膨胀", "引力波", "中子星", "引力透镜",
    "量子引力", "引力子", "圈量子引力", "弦论", "全息原理", "涌现引力", "熵引力",
    "暗物质", "暗能量", "宇宙膨胀", "宇宙大尺度结构", "星系自转曲线", "宇宙网",
    "信息悖论", "时空工程", "宇宙学", "天体物理",
  ],
  authors: [{ name: "Gewenbo", url: "https://psyverse.fun" }],
  alternates: { canonical: "/", languages: { en: "/", "zh-CN": "/", "x-default": "/" } },
  openGraph: {
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: "Gravity Engine · 引力引擎 — The Nature of Gravity" }],
    title: TITLE_EN,
    description:
      "From falling apples to curved spacetime. A bilingual atlas of gravity — Newton, Einstein, black holes, gravitational waves, dark matter, quantum gravity, emergent spacetime, and the cosmic-scale future of gravity engineering.",
    url: "https://gravity-engine.psyverse.fun/",
    siteName: "Psyverse",
    type: "website",
    locale: "en_US",
    alternateLocale: ["zh_CN"],
  },
  twitter: {
    images: ["/twitter-image.png"],
    card: "summary_large_image",
    title: TITLE_EN,
    description: "Gravity may not be a force. A bilingual exploration of the geometry through which stars orbit, light bends, black holes form, and the cosmos takes shape.",
  },
  robots: { index: true, follow: true },
  other: { "theme-color": "#04060f" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Sora:wght@300;400;500;600&family=Spectral:ital,wght@0,300;0,400;0,500;1,400&family=JetBrains+Mono:wght@300;400;500&family=Noto+Sans+SC:wght@400;500;700&family=Noto+Serif+SC:wght@400;600&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: TITLE_EN,
              alternateName: TITLE_ZH,
              description: DESC,
              url: "https://gravity-engine.psyverse.fun/",
              inLanguage: ["en", "zh-CN"],
              author: { "@type": "Person", name: "Gewenbo", url: "https://psyverse.fun/" },
              publisher: { "@type": "Organization", name: "Psyverse", url: "https://psyverse.fun/" },
            }),
          }}
        />
      </head>
      <body className="bg-void-950 text-ghost-100 antialiased">
        {children}
        <Script src="https://analytics-dashboard-two-blue.vercel.app/tracker.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
