// -------------------------------------------------- // 📁 src/components/TheHeader.vue - 헤더
컴포넌트 (TypeScript 적용) // -------------------------------------------------- /*
<template>
  <header class="bg-white shadow-sm sticky top-0 z-10">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <svg
            class="w-8 h-8 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
            ></path>
          </svg>
          <h1 class="text-2xl font-bold text-slate-800 ml-2">북마크</h1>
        </div>
        <div class="relative w-full max-w-xs">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg class="h-5 w-5 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            :value="searchQuery"
            @input="$emit('update:searchQuery', ($event.target as HTMLInputElement).value)"
            type="text"
            placeholder="북마크 검색..."
            class="block w-full bg-slate-100 border border-transparent rounded-full py-2 pl-10 pr-3 text-sm placeholder-slate-500 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
          />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
defineProps<{
  searchQuery: string
}>()

defineEmits<{
  (e: 'update:searchQuery', value: string): void
}>()
</script>
