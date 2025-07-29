<template>
  <div class="min-h-screen">
    <TheHeader v-model:searchQuery="searchQuery" />

    <main class="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <BookmarkList
        :bookmarks="filteredBookmarks"
        @edit="openEditModal"
        @delete="deleteBookmark"
        @add="openAddModal"
      />
    </main>

    <BookmarkModal
      :is-open="isModalOpen"
      :mode="modalMode"
      :bookmark="currentBookmark"
      @close="closeModal"
      @save="saveBookmark"
    />

    <!-- 플로팅 액션 버튼 (FAB) -->
    <button
      @click="openAddModal"
      class="fixed bottom-8 right-8 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-transform hover:scale-110"
    >
      <svg
        class="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
        ></path>
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import TheHeader from '@/components/TheHeader.vue'
import BookmarkList from '@/components/BookmarkList.vue'
import BookmarkModal from '@/components/BookmarkModal.vue'
import type { Bookmark } from '@/types'

// 상태 관리 (State)
const bookmarks = ref<Bookmark[]>([])
const searchQuery = ref<string>('')
const isModalOpen = ref<boolean>(false)
const modalMode = ref<'add' | 'edit'>('add')
const currentBookmark = ref<Partial<Bookmark>>({}) // Partial<T>는 T의 모든 속성을 선택적으로 만듭니다.

// 라이프사이클 훅
onMounted(() => {
  const storedBookmarks = localStorage.getItem('bookmarks')
  if (storedBookmarks) {
    bookmarks.value = JSON.parse(storedBookmarks)
  }
})

// 계산된 속성 (Computed)
const filteredBookmarks = computed<Bookmark[]>(() => {
  if (!searchQuery.value) {
    return bookmarks.value
  }
  return bookmarks.value.filter(
    (bookmark) =>
      bookmark.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      bookmark.url.toLowerCase().includes(searchQuery.value.toLowerCase()),
  )
})

// 메소드 (Methods)
const persistBookmarks = (): void => {
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks.value))
}

const openAddModal = (): void => {
  modalMode.value = 'add'
  currentBookmark.value = { name: '', url: '' }
  isModalOpen.value = true
}

const openEditModal = (bookmark: Bookmark): void => {
  modalMode.value = 'edit'
  currentBookmark.value = { ...bookmark }
  isModalOpen.value = true
}

const closeModal = (): void => {
  isModalOpen.value = false
}

const saveBookmark = (bookmarkData: Bookmark): void => {
  if (modalMode.value === 'add') {
    bookmarks.value.unshift({
      id: Date.now(),
      name: bookmarkData.name,
      url: bookmarkData.url,
    })
  } else {
    const index = bookmarks.value.findIndex((b) => b.id === bookmarkData.id)
    if (index !== -1) {
      bookmarks.value[index] = { ...bookmarkData }
    }
  }
  persistBookmarks()
  closeModal()
}

const deleteBookmark = (id: number): void => {
  if (confirm('정말 이 북마크를 삭제하시겠어요?')) {
    bookmarks.value = bookmarks.value.filter((b) => b.id !== id)
    persistBookmarks()
  }
}
</script>
