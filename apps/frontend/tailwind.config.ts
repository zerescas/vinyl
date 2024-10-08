export default {
  content: [],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      colors: {
        accent: {
          800: "rgb(var(--rgb-accent-800) / <alpha-value>)",
          900: "rgb(var(--rgb-accent-900) / <alpha-value>)",
          950: "rgb(var(--rgb-accent-950) / <alpha-value>)",
        },
      },

      dropShadow: {
        "accent-sm": "0 0 4px rgb(var(--rgb-accent-950) / 0.85)",
        accent: "0 0 8px rgb(var(--rgb-accent-950) / 0.85)",
        "accent-md": "0 0 16px rgb(var(--rgb-accent-950) / 0.85)",
      },

      transitionProperty: {
        size: "height, width",
        ["max-size"]: "max-height, max-width",
      },

      screens: {
        xs: "350px",
        "2xs": "450px",
      },
    },
  },
};
