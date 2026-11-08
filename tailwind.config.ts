import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#010409",
        foreground: "#f8fafc",
        surface: {
          DEFAULT: "#0d1117",
          border: "rgba(255, 255, 255, 0.08)",
          card: "rgba(13, 17, 23, 0.85)",
        },
        cyan: {
          glow: "#00f0ff",
          dim: "rgba(0, 240, 255, 0.15)",
        },
        emerald: {
          glow: "#10b981",
          dim: "rgba(16, 185, 129, 0.15)",
        },
        amber: {
          glow: "#f59e0b",
        },
        purple: {
          glow: "#a855f7",
        },
      },
      fontFamily: {
        orbitron: ["var(--font-orbitron)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      boxShadow: {
        "cyan-glow": "0 0 25px rgba(0, 240, 255, 0.35)",
        "green-glow": "0 0 25px rgba(16, 185, 129, 0.35)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "radar-sweep": "spin 8s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
