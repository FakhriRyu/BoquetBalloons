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
        primary: "#a43073",
        "primary-container": "#f472b6",
        "primary-fixed": "#ffd8e7",
        "primary-fixed-dim": "#ffafd3",
        "on-primary": "#ffffff",
        "on-primary-container": "#6d0047",
        "on-primary-fixed": "#3d0026",
        "on-primary-fixed-variant": "#85145a",
        "inverse-primary": "#ffafd3",

        secondary: "#00668a",
        "secondary-container": "#40c2fd",
        "secondary-fixed": "#c4e7ff",
        "secondary-fixed-dim": "#7bd0ff",
        "on-secondary": "#ffffff",
        "on-secondary-container": "#004d6a",
        "on-secondary-fixed": "#001e2c",
        "on-secondary-fixed-variant": "#004c69",

        tertiary: "#795900",
        "tertiary-container": "#ca9700",
        "tertiary-fixed": "#ffdf9f",
        "tertiary-fixed-dim": "#f9bd22",
        "on-tertiary": "#ffffff",
        "on-tertiary-container": "#473300",

        surface: "#fbf8fc",
        "surface-dim": "#dcd9dd",
        "surface-bright": "#fbf8fc",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f5f3f6",
        "surface-container": "#f0edf1",
        "surface-container-high": "#eae7eb",
        "surface-container-highest": "#e4e1e5",
        "surface-variant": "#e4e1e5",
        "surface-tint": "#a43073",

        "on-surface": "#1b1b1e",
        "on-surface-variant": "#544249",
        "inverse-surface": "#303033",
        "inverse-on-surface": "#f3f0f4",

        background: "#fbf8fc",
        "on-background": "#1b1b1e",

        outline: "#87717a",
        "outline-variant": "#dac0c9",

        error: "#ba1a1a",
        "error-container": "#ffdad6",
        "on-error": "#ffffff",
        "on-error-container": "#93000a",
      },
      fontFamily: {
        headline: ["var(--font-epilogue)", "Epilogue", "sans-serif"],
        body: ["var(--font-plus-jakarta)", "Plus Jakarta Sans", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "1rem",
        lg: "2rem",
        xl: "3rem",
        full: "9999px",
      },
      boxShadow: {
        glow: "0 12px 32px rgba(244, 114, 182, 0.25)",
        card: "0 8px 30px rgba(0, 0, 0, 0.04)",
      },
    },
  },
  plugins: [],
};

export default config;
