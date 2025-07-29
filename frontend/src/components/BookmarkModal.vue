<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black bg-opacity-50 z-30 flex items-center justify-center"
    @click.self="$emit('close')"
  >
    <div class="bg-white rounded-lg shadow-xl w-full max-w-md mx-4" @click.stop>
      <div class="p-6">
        <h3 class="text-xl font-bold text-slate-800 mb-4">
          {{ mode === 'add' ? '새 북마크 추가' : '북마크 수정' }}
        </h3>
        <form @submit.prevent="handleSubmit">
          <div class="space-y-4">
            <div>
              <label for="name" class="block text-sm font-medium text-slate-700">이름</label>
              <input
                v-model="editableBookmark.name"
                type="text"
                id="name"
                class="mt-1 block w-full border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label for="url" class="block text-sm font-medium text-slate-700">URL</label>
              <input
                v-model="editableBookmark.url"
                type="url"
                id="url"
                class="mt-1 block w-full border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="https://example.com"
                required
              />
            </div>
          </div>
          <div class="mt-6 flex justify-end space-x-3">
            <button
              @click="$emit('close')"
              type="button"
              class="bg-white py-2 px-4 border border-slate-300 rounded-md shadow-sm text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              취소
            </button>
            <button
              type="submit"
              class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              저장
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Bookmark } from '@/types'

const props = defineProps<{
  isOpen: boolean
  mode: 'add' | 'edit'
  bookmark: Partial<Bookmark>
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'save', bookmark: Bookmark): void
}>()

const editableBookmark = ref<Partial<Bookmark>>({})

watch(
  () => props.bookmark,
  (newVal) => {
    editableBookmark.value = { ...newVal }
  },
  { deep: true, immediate: true },
)

const handleSubmit = () => {
  emit('save', editableBookmark.value as Bookmark)
}
</script>
