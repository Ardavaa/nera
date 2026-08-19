import type { Config } from "tailwindcss";

export const neraTailwindConfig: Partial<Config> = {
  theme: {
    extend: {
      colors: {
        nera: {
          purple: "#6C5CE7",
          "purple-light": "#8E80F5",
          "purple-dark": "#5143C7",
          blue: "#4EA8FF",
          "blue-soft": "#EAF4FF",
          bni: "#00747F",
          "bni-light": "#009DAA",
          canvas: "#F8FAFC",
          card: "#FFFFFF",
          border: "#E2E8F0",
          "text-dark": "#0F172A",
          "text-muted": "#64748B",
          "text-subtle": "#7D8A9E",
          safe: {
            DEFAULT: "#22C55E",
            soft: "#DDF0E6",
            dark: "#15803D",
          },
          warning: {
            DEFAULT: "#FBBF24",
            soft: "#FBF0D9",
            dark: "#B45309",
          },
          critical: {
            DEFAULT: "#EF4444",
            soft: "#FBE4DE",
            dark: "#B91C1C",
          },
        },
      },
      borderRadius: {
        "nera-card": "20px",
        "nera-pill": "9999px",
        "nera-btn": "14px",
      },
      boxShadow: {
        "nera-card": "0 2px 12px rgba(15, 23, 42, 0.04)",
        "nera-elevated": "0 8px 24px rgba(108, 92, 231, 0.12)",
        "nera-glow": "0 0 20px rgba(108, 92, 231, 0.25)",
      },
      fontFamily: {
        sans: ["Poppins", "var(--font-poppins)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        mobile: "430px",
      },
    },
  },
};

export default neraTailwindConfig;
