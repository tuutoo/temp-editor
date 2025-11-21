// plugins/umo.client.ts
import { defineNuxtPlugin } from "#app";
import { useUmoEditor } from "@umoteam/editor";
// 如果官方有样式文件，请在这里全局引入：
// import '@umoteam/editor/dist/style.css'

export default defineNuxtPlugin((nuxtApp) => {
  // Register editor as a Vue plugin on client side
  nuxtApp.vueApp.use(useUmoEditor, {
    // Configuration options
    // ... your editor config here
  });
});
