<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import {
  loadLanguageYearQuestions,
  type LanguageYearQuestionState
} from '@/modules/examGroups/language/composables/useLanguageYearQuestions';
import LanguageQuestionCard from '@/modules/examGroups/language/components/LanguageQuestionCard.vue';
import type { LanguageYear } from '@/modules/examGroups/language/data/yearSummaries';
import { useYearQuestionBookmarkPage } from '@/modules/examGroups/shared/composables/useYearQuestionBookmarkPage';

const route = useRoute();
const questionState = ref<LanguageYearQuestionState | null>(null);
const loadError = ref(false);

const year = computed<string | undefined>(() => {
  const routeYear = route.params.year;
  return Array.isArray(routeYear) ? routeYear[0] : routeYear;
});
const {
  bookmarkedQuestionNumber,
  questionElementId,
  refreshBookmarkedQuestion,
  scrollToBookmarkedQuestion,
  toggleQuestionBookmark
} = useYearQuestionBookmarkPage('language', year);

const completeQuestions = computed(() =>
  questionState.value?.status === 'complete' ? questionState.value.questions : []
);

watch(
  year,
  async (nextYear) => {
    loadError.value = false;

    try {
      questionState.value = await loadLanguageYearQuestions(nextYear as LanguageYear);
      refreshBookmarkedQuestion();
      void scrollToBookmarkedQuestion();
    } catch {
      loadError.value = true;
      questionState.value = null;
    }
  },
  { immediate: true }
);
</script>

<template>
  <section class="space-y-3" data-testid="language-year-view">
    <div class="surface-card p-4">
      <p class="text-sm font-semibold text-teal">語言年度解析</p>
      <h2 class="mt-2 text-2xl font-bold leading-tight">
        {{ year }} 年語言逐題解析
      </h2>
      <p class="mt-3 text-sm leading-6 text-slate">
        本年度會依題目索引整理國文與英文解析，英文題會採國二程度可理解的教學語氣。
      </p>
      <p v-if="questionState?.status === 'complete'" class="mt-3 text-sm font-semibold text-teal">
        已載入 {{ questionState.questions.length }} 題解析資料
      </p>
      <p v-if="loadError" role="status" class="mt-3 text-sm font-semibold text-coral">
        年度資料載入失敗，請稍後再試。
      </p>
    </div>
    <div
      v-if="completeQuestions.length > 0"
      class="space-y-4"
      data-testid="language-question-list"
    >
      <div
        v-for="question in completeQuestions"
        :id="questionElementId(question.number)"
        :key="`${question.year}-${question.number}`"
        data-testid="year-question-anchor"
      >
        <LanguageQuestionCard
          :question="question"
          :is-bookmarked="bookmarkedQuestionNumber === question.number"
          @toggle-bookmark="toggleQuestionBookmark"
        />
      </div>
    </div>
  </section>
</template>
