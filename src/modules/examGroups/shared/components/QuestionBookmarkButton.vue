<script setup lang="ts">
defineProps<{
  isBookmarked?: boolean;
}>();

defineEmits<{
  toggle: [];
}>();
</script>

<template>
  <button
    type="button"
    class="shrink-0 rounded-md px-2 py-1 text-xs font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-teal/40"
    :class="
      isBookmarked
        ? 'border border-teal bg-teal text-white'
        : 'border border-teal/20 bg-teal/10 text-teal hover:bg-teal/15'
    "
    :aria-label="isBookmarked ? '取消本頁書籤' : '設為本頁書籤'"
    :aria-pressed="isBookmarked ? 'true' : 'false'"
    :title="isBookmarked ? '取消本頁書籤' : '設為本頁書籤'"
    data-testid="question-bookmark-button"
    @click="$emit('toggle')"
  >
    {{ isBookmarked ? '已書籤' : '書籤' }}
  </button>
</template>
