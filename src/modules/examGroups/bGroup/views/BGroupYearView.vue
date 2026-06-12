<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import {
  loadBGroupYearQuestions,
  type BGroupYearQuestionState
} from '@/modules/examGroups/bGroup/composables/useBGroupYearQuestions';
import BGroupEssayQuestionCard from '@/modules/examGroups/bGroup/components/BGroupEssayQuestionCard.vue';
import type { BGroupYear } from '@/modules/examGroups/bGroup/data/yearSummaries';
import { useYearQuestionBookmarkPage } from '@/modules/examGroups/shared/composables/useYearQuestionBookmarkPage';

const route = useRoute();
const questionState = ref<BGroupYearQuestionState | null>(null);
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
} = useYearQuestionBookmarkPage('b-group', year);

watch(
  year,
  async (nextYear) => {
    loadError.value = false;

    try {
      questionState.value = await loadBGroupYearQuestions(nextYear as BGroupYear);
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
  <section class="space-y-3" data-testid="b-group-year-view">
    <div class="surface-card p-4">
      <p class="text-sm font-semibold text-teal">B 組年度解析</p>
      <h2 class="mt-2 text-2xl font-bold leading-tight">
        {{ year }} 年 B 組申論解析
      </h2>
      <p class="mt-3 text-sm leading-6 text-slate">
        本年度會依題目索引逐批整理資訊管理與程式設計申論解析。
      </p>
      <p v-if="questionState?.status === 'complete'" class="mt-3 text-sm font-semibold text-teal">
        已載入 {{ questionState.questions.length }} 題解析資料
      </p>
      <p v-if="loadError" role="status" class="mt-3 text-sm font-semibold text-coral">
        年度資料載入失敗，請稍後再試。
      </p>
    </div>
    <div
      v-if="questionState?.status === 'complete' && questionState.questions.length > 0"
      class="space-y-4"
      data-testid="b-group-question-list"
    >
      <div
        v-for="question in questionState.questions"
        :id="questionElementId(question.number)"
        :key="`${question.year}-${question.number}`"
        data-testid="year-question-anchor"
      >
        <BGroupEssayQuestionCard
          :question="question"
          :is-bookmarked="bookmarkedQuestionNumber === question.number"
          @toggle-bookmark="toggleQuestionBookmark"
        />
      </div>
    </div>
  </section>
</template>
