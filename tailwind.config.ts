import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#a53144",
        "primary-container": "#c64a5b",
        "primary-fixed": "#ffdadb",
        "primary-fixed-dim": "#ffb2b8",
        "on-primary": "#ffffff",
        "on-primary-container": "#fffbff",
        "on-primary-fixed": "#40000e",
        "on-primary-fixed-variant": "#881b31",
        "inverse-primary": "#ffb2b8",

        secondary: "#496551",
        "secondary-container": "#c9e7ce",
        "secondary-fixed": "#cbead1",
        "secondary-fixed-dim": "#b0ceb6",
        "on-secondary": "#ffffff",
        "on-secondary-container": "#4d6955",
        "on-secondary-fixed": "#062011",
        "on-secondary-fixed-variant": "#324d3a",

        tertiary: "#785158",
        "tertiary-container": "#936970",
        "tertiary-fixed": "#ffd9de",
        "tertiary-fixed-dim": "#ecbac1",
        "on-tertiary": "#ffffff",
        "on-tertiary-container": "#fffbff",
        "on-tertiary-fixed": "#2f1318",
        "on-tertiary-fixed-variant": "#613d43",

        surface: "#fff8f5",
        "surface-dim": "#e1d8d4",
        "surface-bright": "#fff8f5",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#fbf2ed",
        "surface-container": "#f5ece7",
        "surface-container-high": "#efe6e2",
        "surface-container-highest": "#e9e1dc",
        "surface-variant": "#e9e1dc",
        "surface-tint": "#a83447",

        "on-surface": "#1e1b18",
        "on-surface-variant": "#574143",
        "inverse-surface": "#34302c",
        "inverse-on-surface": "#f8efea",

        background: "#fff8f5",
        "on-background": "#1e1b18",

        outline: "#8a7172",
        "outline-variant": "#debfc0",

        error: "#ba1a1a",
        "error-container": "#ffdad6",
        "on-error": "#ffffff",
        "on-error-container": "#93000a",
      },
      fontFamily: {
        sans: ["var(--font-montserrat)", "Montserrat", "sans-serif"],
        headline: ["var(--font-montserrat)", "Montserrat", "sans-serif"],
        body: ["var(--font-montserrat)", "Montserrat", "sans-serif"],
      },
      spacing: {
        "space-xs": "0.25rem",
        "space-sm": "0.5rem",
        "space-md": "1rem",
        "space-lg": "1.5rem",
        "space-xl": "2.5rem",
        gutter: "1.5rem",
        margin: "2rem",
      },
      borderRadius: {
        DEFAULT: "1rem",
        lg: "2rem",
        xl: "3rem",
        full: "9999px",
      },
      boxShadow: {
        glow: "0 8px 24px -4px rgba(219, 90, 107, 0.25)",
        card: "0 8px 24px -4px rgba(219, 90, 107, 0.08), 0 2px 6px 0 rgba(45, 41, 38, 0.04)",
      },
    },
  },
  plugins: [],
};

export default config;
