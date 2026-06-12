<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import AGroupQuestionCard from '@/modules/examGroups/aGroup/components/AGroupQuestionCard.vue';
import type { AGroupYear } from '@/modules/examGroups/aGroup/data/yearSummaries';
import {
  loadAGroupYearQuestions,
  type AGroupYearQuestionState
} from '@/modules/examGroups/aGroup/composables/useAGroupYearQuestions';
import { useYearQuestionBookmarkPage } from '@/modules/examGroups/shared/composables/useYearQuestionBookmarkPage';

const route = useRoute();
const questionState = ref<AGroupYearQuestionState | null>(null);
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
} = useYearQuestionBookmarkPage('a-group', year);

const completeQuestions = computed(() =>
  questionState.value?.status === 'complete' ? questionState.value.questions : []
);

watch(
  year,
  async (nextYear) => {
    loadError.value = false;

    try {
      questionState.value = await loadAGroupYearQuestions(nextYear as AGroupYear);
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
  <section class="space-y-3" data-testid="a-group-year-view">
    <div class="surface-card p-4">
      <p class="text-sm font-semibold text-teal">A 組年度解析</p>
      <h2 class="mt-2 text-2xl font-bold leading-tight">
        {{ year }} 年 A 組逐題解析
      </h2>
      <p class="mt-3 text-sm leading-6 text-slate">
        本年度解析包含原題、官方答案檢查與教學解析。
      </p>
      <p v-if="questionState?.status === 'complete'" class="mt-3 text-sm font-semibold text-teal">
        已載入 {{ questionState.questions.length }} 題解析資料
      </p>
      <p v-if="loadError" role="status" class="mt-3 text-sm font-semibold text-coral">
        年度資料載入失敗，請稍後再試。
      </p>
    </div>

    <div v-if="completeQuestions.length > 0" class="space-y-3">
      <div
        v-for="question in completeQuestions"
        :id="questionElementId(question.number)"
        :key="question.number"
        data-testid="year-question-anchor"
      >
        <AGroupQuestionCard
          :question="question"
          :is-bookmarked="bookmarkedQuestionNumber === question.number"
          @toggle-bookmark="toggleQuestionBookmark"
        />
      </div>
    </div>
  </section>
</template>
