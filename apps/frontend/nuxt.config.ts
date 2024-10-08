// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",

  css: ["@/assets/css/main.css"],

  modules: [
    ["@nuxtjs/stylelint-module", { fix: true }],
    "unplugin-icons/nuxt",
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
  ],

  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
});
