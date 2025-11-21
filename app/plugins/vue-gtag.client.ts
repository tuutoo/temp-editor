import VueGtag, { trackRouter } from "vue-gtag-next";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const gaId = config.public.gaMeasurementId as string;

  if (!gaId) {
    return;
  }

  nuxtApp.vueApp.use(VueGtag, {
    property: {
      id: gaId,
    },
  });
  trackRouter(useRouter());
});
