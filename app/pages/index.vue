<template>
  <div class="h-full w-full umo-editor-wrapper">
    <ClientOnly>
      <UmoEditor ref="editorRef" v-bind="editorOptions" @created="onCreated" />
    </ClientOnly>
  </div>
</template>

<script setup>
import { UmoEditor } from '@umoteam/editor';

const editorRef = ref(null);

// Get color mode reactive reference
const colorMode = useColorMode()

// Watch color mode changes to save content before theme change
watch(colorMode, async (newMode, oldMode) => {
  // Save content before theme changes (which causes editor re-render)
  if (oldMode && editorRef.value) {
    await editorRef.value?.saveContent()
  }
})

// Get i18n instance
const { t } = useI18n()

// Get runtime config to check file storage mode
const config = useRuntimeConfig()
const fileStorage = config.public.fileStorage || 'local'

const { locale } = useI18n()

// Watch locale changes and update localStorage for UMO Editor
watch(locale, async (newLocale) => {
  // sync UMO Editor language setting
  let lang = newLocale === 'zh' ? 'zh-CN' : 'en-US'

  if (import.meta.client) {
    localStorage.setItem('umo-editor:locale', lang)

    await editorRef.value?.saveContent()
  }
})

// File upload handler for local mode - creates blob URL
const onFileUploadLocal = async (file) => {
  // Create a blob URL for the file
  const blobUrl = URL.createObjectURL(file)
  const id = crypto.randomUUID()

  return {
    id: id,
    url: blobUrl,
  }
}

// File upload handler for Directus mode - uploads to server
const onFileUploadDirectus = async (file) => {
  try {
    // Create FormData
    const formData = new FormData()
    formData.append('file', file)

    // Use Nuxt's $fetch to upload file
    const res = await $fetch('/api/file-upload', {
      method: 'POST',
      body: formData,
    })

    // Return {id, url} on success
    return {
      id: res.id,
      url: res.url,
    }
  } catch (error) {
    console.error('File upload failed:', error)
    // Return false on error
    return false
  }
}

// File delete handler - MUST be a synchronous function
const onFileDelete = (id, url, type) => {
  // In local mode, revoke the blob URL to free memory
  if (fileStorage === 'local' && url.startsWith('blob:')) {
    URL.revokeObjectURL(url)
    return
  }

  // In Directus mode, delete from server
  if (!id) {
    console.error('File delete failed: No ID provided')
    return
  }

  // Fire and forget - don't await
  $fetch(`/api/file/${id}`, {
    method: 'DELETE'
  }).catch(error => {
    console.error('File delete failed:', error)
  })
}

const onSave = async(content, page, document) => {
  localStorage.setItem('document.content', document.content)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = true
      if (success) {
        console.log('onSave', { content, page, document })
        resolve('操作成功')
      } else {
        reject(new Error('操作失败'))
      }
    }, 2000)
  })
}

const onCreated = (editor) => {
  console.log('onCreated', editor)

  // Wait for next tick to ensure editor is fully initialized
  nextTick(() => {
    // Load document content from localStorage
    const content = localStorage.getItem('document.content')
    console.log('📖 Loading content from localStorage:', content?.substring(0, 50))
    if (content) {
      editorRef.value?.setContent(content, { emitUpdate: false })
    }
  })
}

// Reactive editor options that sync with color mode and locale
const editorOptions = computed(() => ({
  document: {
    title: t('docTitle'),
    content: localStorage.getItem('document.content') || '',
    autoSave: {
      enabled: true,
      interval: 60000,
    },
  },
  // Theme sync with Nuxt color mode
  theme: colorMode.value === 'dark' ? 'dark' : 'light',
  // Set height to 100%
  height: '100%',
  // Use different upload handler based on storage mode
  onFileUpload: fileStorage === 'directus' ? onFileUploadDirectus : onFileUploadLocal,
  onFileDelete: onFileDelete,
  onSave: onSave,
}))
</script>
