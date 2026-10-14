import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: "#183e30",
          dark: "#0e2920",
          deep: "#0a1f18",
          light: "#27614b",
          muted: "#365c4f",
        },
        cream: {
          DEFAULT: "#f7f5ee",
          pure: "#fcfbf7",
          warm: "#faf8f3",
          card: "#eeeee4",
          sage: "#e4e9d6",
          dark: "#e9eddc",
          border: "#d8ddd0",
        },
        sun: {
          orange: "#f67e48",
          terracotta: "#bc522d",
          amber: "#e07138",
          gold: "#f5b74f",
        },
        leaf: {
          50: "#f4f7f2",
          100: "#e5ede0",
          200: "#cddcc5",
          300: "#abc3a0",
          400: "#84a578",
          500: "#658758",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-dm-sans)", "DM Sans", "system-ui", "sans-serif"],
      },
      animation: {
        "drift-slow": "drift 22s ease-in-out infinite alternate",
        "spin-slow": "spin 25s linear infinite",
        "pulse-subtle": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        drift: {
          "0%": { transform: "scale(1.0) translate(0, 0)" },
          "100%": { transform: "scale(1.08) translate(-1%, -1.5%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
