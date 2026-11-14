import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Brand palette taken from the Ada Balon Bengkulu logo & Instagram catalog
        sky: {
          DEFAULT: "#8fcbe3",
          soft: "#d3eaf7",
          pale: "#eaf5fc",
        },
        brand: {
          DEFAULT: "#5f9ac4",
          dark: "#2f6590",
          deep: "#24435e",
        },
        leaf: {
          DEFAULT: "#4db547",
          dark: "#2f8a2b",
          soft: "#d7f0d3",
        },
        sun: "#ffdd44",
        peach: {
          DEFAULT: "#f4b8a5",
          dark: "#d9806a",
          deep: "#a9503b",
          soft: "#fde6dd",
        },
        cream: {
          DEFAULT: "#f4efe3",
          light: "#fffdf8",
        },
        ink: "#24435e",
      },
      fontFamily: {
        sans: ["var(--font-nunito)", "system-ui", "sans-serif"],
        display: ["var(--font-baloo)", "var(--font-nunito)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        polaroid: "0 18px 40px -16px rgba(36, 67, 94, 0.35), 0 2px 0 0 rgba(255,255,255,0.9) inset",
        soft: "0 10px 30px -12px rgba(36, 67, 94, 0.25)",
        peach: "0 6px 0 0 #c4624a, 0 12px 20px -6px rgba(169, 80, 59, 0.45)",
      },
      keyframes: {
        floaty: {
          "0%,100%": { transform: "translateY(0) rotate(-1deg)" },
          "50%": { transform: "translateY(-8px) rotate(1deg)" },
        },
      },
      animation: {
        floaty: "floaty 5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
