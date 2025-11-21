<script setup>
import { Analytics } from '@vercel/analytics/nuxt'

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})

const title = useNuxtApp().$i18n ? useNuxtApp().$i18n.t('title') : 'A temp WYSIWYG Editor with Nuxt UI'
const description = useNuxtApp().$i18n ? useNuxtApp().$i18n.t('description') : 'A temp WYSIWYG Editor built with Nuxt UI and UMO Editor.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: 'https://ui.nuxt.com/assets/templates/nuxt/starter-light.png',
  twitterImage: 'https://ui.nuxt.com/assets/templates/nuxt/starter-light.png',
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <UApp class="relative h-screen overflow-hidden">
    <!-- Custom Header -->
    <header class="absolute top-0 left-0 right-0 z-10 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 h-20">
      <div class="flex flex-col justify-center px-4 h-full gap-1">
        <div class="flex items-center justify-between">
          <NuxtLink to="/" class="flex items-center gap-3">
            <AppLogo class="w-auto h-6" />
          </NuxtLink>

          <div class="flex items-center gap-2">
            <UColorModeButton />
            <LanguageSwitcher />
            <UButton
              to="https://github.com/tuutoo/temp-editor.git"
              target="_blank"
              icon="i-simple-icons-github"
              aria-label="GitHub"
              color="neutral"
              variant="ghost"
            />
          </div>
        </div>

        <span class="text-xs text-gray-500 dark:text-gray-500 pl-0.5">
          {{ $t('description') }}
        </span>
      </div>
    </header>

    <!-- Main Content Area -->
    <div class="absolute top-20 left-0 right-0 bottom-0">
      <Analytics />
      <NuxtPage />
    </div>
  </UApp>
</template>
