export default {
  content: [],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
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
