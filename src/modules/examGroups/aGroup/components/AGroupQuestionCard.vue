<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import {
  ANSWER_OPTIONS,
  type ExamQuestionAnalysis
} from '@/modules/examGroups/aGroup/types/questionAnalysis';
import QuestionBookmarkButton from '@/modules/examGroups/shared/components/QuestionBookmarkButton.vue';

const props = defineProps<{
  question: ExamQuestionAnalysis;
  isBookmarked?: boolean;
}>();

const emit = defineEmits<{
  toggleBookmark: [questionNumber: number];
}>();

const beginnerExplanationParagraphs = computed(() =>
  props.question.beginnerExplanation
    .split(/\n+/)
    .map((paragraph) => paragraph.trim())
    .filter((paragraph) => paragraph.length > 0)
);

const teachingTables = computed(() => props.question.teachingTables ?? []);
const isAnswerDetailsVisible = ref(false);
const answerDetailsId = computed(() => `a-group-answer-details-${props.question.year}-${props.question.number}`);

watch(
  () => `${props.question.year}-${props.question.number}`,
  () => {
    isAnswerDetailsVisible.value = false;
  }
);
</script>

<template>
  <article class="surface-card space-y-4 p-4" data-testid="a-group-question-card">
    <header class="flex items-start justify-between gap-3">
      <div class="min-w-0">
        <p class="text-xs font-semibold text-teal">第 {{ question.number }} 題</p>
        <h3 class="mt-1 text-lg font-bold leading-tight">{{ question.coreTerms[0] }}</h3>
      </div>
      <QuestionBookmarkButton
        :is-bookmarked="isBookmarked"
        @toggle="emit('toggleBookmark', question.number)"
      />
    </header>

    <section class="space-y-3 border-t border-slate/10 pt-4" data-testid="original-exam-section">
      <div>
        <p class="text-xs font-semibold text-slate">原題內容</p>
        <p class="mt-2 whitespace-pre-line text-sm leading-6 text-ink">{{ question.originalStem }}</p>
      </div>
      <button
        type="button"
        class="inline-flex w-fit items-center gap-2 rounded-md border border-teal/20 bg-teal/10 px-3 py-2 text-left text-sm font-semibold text-teal transition hover:bg-teal/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal/40"
        :aria-controls="answerDetailsId"
        :aria-expanded="isAnswerDetailsVisible"
        data-testid="official-answer-toggle"
        @click="isAnswerDetailsVisible = !isAnswerDetailsVisible"
      >
        <span>官方答案</span>
        <span aria-hidden="true" class="text-xs">{{ isAnswerDetailsVisible ? '收合' : '查看' }}</span>
      </button>
      <div
        v-if="isAnswerDetailsVisible"
        :id="answerDetailsId"
        class="rounded-md bg-sand px-3 py-2 text-sm leading-6 text-ink"
        data-testid="official-answer-details"
      >
        <p class="font-semibold">答案：{{ question.acceptedAnswers.join('、') }}</p>
        <p v-if="question.answerNote" class="mt-1 text-slate">備註：{{ question.answerNote }}</p>
      </div>
      <ol class="space-y-2" aria-label="原始選項">
        <li
          v-for="option in ANSWER_OPTIONS"
          :key="option"
          class="rounded-md border border-slate/10 bg-white px-3 py-2 text-sm leading-6 text-ink"
        >
          <span class="font-semibold">{{ option }}.</span>
          {{ question.options[option] }}
        </li>
      </ol>
    </section>

    <section class="space-y-3 border-t border-slate/10 pt-4" data-testid="teaching-analysis-section">
      <div>
        <h4 class="text-sm font-bold leading-tight text-ink">核心術語</h4>
        <ul class="mt-2 flex flex-wrap gap-2">
          <li
            v-for="term in question.coreTerms"
            :key="term"
            class="rounded-md bg-teal/10 px-2 py-1 text-xs font-semibold text-teal"
          >
            {{ term }}
          </li>
        </ul>
      </div>
      <div>
        <p class="text-xs font-semibold text-slate">教學解析</p>
        <div class="mt-2 space-y-2 text-sm leading-6 text-ink" data-testid="beginner-explanation">
          <p
            v-for="(paragraph, index) in beginnerExplanationParagraphs"
            :key="`${index}-${paragraph}`"
          >
            {{ paragraph }}
          </p>
        </div>
      </div>
      <div v-if="teachingTables.length" class="space-y-3" data-testid="teaching-tables">
        <div
          v-for="table in teachingTables"
          :key="table.title"
          class="overflow-x-auto rounded-md border border-slate/10"
        >
          <table class="min-w-full text-left text-xs leading-5 sm:text-sm">
            <caption class="bg-sand px-3 py-2 text-left font-semibold text-ink">
              {{ table.title }}
            </caption>
            <thead class="bg-white text-slate">
              <tr>
                <th
                  v-for="header in table.headers"
                  :key="header"
                  scope="col"
                  class="border-t border-slate/10 px-3 py-2 font-semibold"
                >
                  {{ header }}
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate/10 bg-white text-ink">
              <tr v-for="(row, rowIndex) in table.rows" :key="`${table.title}-${rowIndex}`">
                <td
                  v-for="(cell, cellIndex) in row"
                  :key="`${table.title}-${rowIndex}-${cellIndex}`"
                  class="px-3 py-2 align-top"
                >
                  {{ cell }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <h4 class="text-sm font-bold leading-tight text-ink">解題步驟</h4>
        <ol class="mt-2 list-decimal space-y-1 pl-5 text-sm leading-6 text-slate">
          <li v-for="step in question.solvingSteps" :key="step">{{ step }}</li>
        </ol>
      </div>
      <div>
        <h4 class="text-sm font-bold leading-tight text-ink">選項解析</h4>
        <dl class="mt-2 space-y-2">
          <div v-for="option in ANSWER_OPTIONS" :key="option" class="text-sm leading-6">
            <dt class="font-semibold text-ink">{{ option }}</dt>
            <dd class="text-slate">{{ question.optionExplanations[option] }}</dd>
          </div>
        </dl>
      </div>
      <div>
        <h4 class="text-sm font-bold leading-tight text-ink">重點整理</h4>
        <ul class="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-slate">
          <li v-for="takeaway in question.keyTakeaways" :key="takeaway">{{ takeaway }}</li>
        </ul>
      </div>
      <div>
        <h4 class="text-sm font-bold leading-tight text-ink">標籤</h4>
        <ul class="mt-2 flex flex-wrap gap-2">
          <li
            v-for="tag in question.tags"
            :key="tag"
            class="rounded-md border border-slate/10 bg-white px-2 py-1 text-xs font-semibold text-slate"
          >
            {{ tag }}
          </li>
        </ul>
      </div>
    </section>

    <footer
      class="border-t border-slate/10 pt-3 text-xs font-semibold leading-5 text-slate"
      data-testid="source-traceability"
    >
      來源：{{ question.sourceRef.year }} 年 {{ question.sourceRef.fileName }}
      <span v-if="question.sourceRef.pageNumber">，第 {{ question.sourceRef.pageNumber }} 頁</span>
    </footer>
  </article>
</template>
