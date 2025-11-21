<template>
  <UDropdownMenu :items="items" :content="{ align: 'start' }" :ui="{ content: 'w-32' }">
    <UButton
      color="neutral"
      variant="ghost"
      icon="i-lucide-languages"
      trailing-icon="i-lucide-chevron-down"
      :aria-label="$t('language')"
    >
      {{ currentLanguageLabel }}
    </UButton>
  </UDropdownMenu>
</template>

<script setup>
const { locale, setLocale, t } = useI18n()
const switchLocalePath = useSwitchLocalePath()

// 当前选中的语言标签
const currentLanguageLabel = computed(() => {
  return locale.value === 'zh' ? '中文' : 'EN'
})

// 下拉菜单项
const items = computed(() => [
  {
    label: 'English',
    type: 'checkbox',
    checked: locale.value === 'en',
    onUpdateChecked(checked) {
      if (checked) {
        switchLanguage('en')
      }
    },
  },
  {
    label: '中文',
    type: 'checkbox',
    checked: locale.value === 'zh',
    onUpdateChecked(checked) {
      if (checked) {
        switchLanguage('zh')
      }
    },
  }
])

// 切换语言的方法
const switchLanguage = async (langCode) => {
  await setLocale(langCode)
  await navigateTo(switchLocalePath(langCode))
}
</script>
