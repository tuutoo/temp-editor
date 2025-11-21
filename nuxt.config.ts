// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devServer: {
    host: process.env.HOST || "0.0.0.0",
    port: process.env.PORT ? Number(process.env.PORT) : 3131,
  },
  runtimeConfig: {
    // Private runtime config (server-side only)
    fileStorage: process.env.FILE_STORAGE || "local",
    directusToken: process.env.DIRECTUS_TOKEN || "",
    directusUrl: process.env.DIRECTUS_URL || "",
    directusFolderId: process.env.DIRECTUS_FOLDER_ID || "",

    public: {
      // Expose fileStorage to client
      fileStorage: process.env.FILE_STORAGE || "local",
      gaMeasurementId: process.env.NUXT_PUBLIC_GA_ID || "",
    },
  },

  modules: ["@nuxt/eslint", "@nuxt/ui", "@nuxtjs/i18n"],

  i18n: {
    locales: [
      {
        code: "en",
        name: "English",
        file: "en.json",
      },
      {
        code: "zh",
        name: "中文",
        file: "zh.json",
      },
    ],
    defaultLocale: "en",
    strategy: "prefix_except_default",
  },

  devtools: {
    enabled: true,
  },

  css: ["~/assets/css/main.css"],

  routeRules: {
    "/": { prerender: true },
  },

  compatibilityDate: "2025-01-15",

  eslint: {
    config: {
      stylistic: {
        commaDangle: "never",
        braceStyle: "1tbs",
      },
    },
  },
});
