export default {
  content: [],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      dropShadow: {
        "accent-sm": "0 0 4px var(--color-accent-950)",
        accent: "0 0 8px var(--color-accent-950)",
        "accent-md": "0 0 16px var(--color-accent-950)",
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
