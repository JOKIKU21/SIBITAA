import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Palette diambil langsung dari sibita.html agar desain tetap konsisten
        brand: {
          DEFAULT: "#2B3BAF",
          dark: "#1A2580",
          light: "#4A5CDB",
          bg: "#EEF1FD",
        },
        success: { DEFAULT: "#16A34A", bg: "#DCFCE7" },
        warning: { DEFAULT: "#B45309", bg: "#FEF3C7" },
        danger: { DEFAULT: "#DC2626", bg: "#FEE2E2" },
        neutral: {
          DEFAULT: "#6B7280",
          bg: "#F3F4F6",
          text: "#111827",
          muted: "#6B7280",
          light: "#9CA3AF",
          border: "#E5E7EB",
        },
        canvas: "#F0F2F9",
      },
      fontFamily: {
        display: ["'Plus Jakarta Sans'", "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "14px",
        panel: "16px",
      },
    },
  },
  plugins: [],
};

export default config;
