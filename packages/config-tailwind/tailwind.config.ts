import type { Config } from "tailwindcss";

export const neraTailwindConfig: Partial<Config> = {
  theme: {
    extend: {
      colors: {
        nera: {
          yellow: "#FFB900",
          "yellow-soft": "#FFF0BD",
          brown: "#76520E",
          "brown-dark": "#3A2800",
          canvas: "#F1F2F4",
          card: "#FFFFFF",
          border: "#E9E5DD",
          "text-dark": "#2F240E",
          "text-muted": "#736B60",
          "text-subtle": "#817B70",
          safe: {
            DEFAULT: "#277449",
            soft: "#DDF0E6",
            dark: "#1F603C",
          },
          warning: {
            DEFAULT: "#A36A00",
            soft: "#FFF3D6",
            dark: "#76520E",
          },
          critical: {
            DEFAULT: "#C43737",
            soft: "#FBE4DE",
            dark: "#A92F2F",
          },
        },
      },
      borderRadius: {
        "nera-card": "22px",
        "nera-pill": "9999px",
        "nera-btn": "14px",
      },
      fontFamily: {
        sans: ["var(--font-inter-tight)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        mobile: "430px",
      },
    },
  },
};

export default neraTailwindConfig;
