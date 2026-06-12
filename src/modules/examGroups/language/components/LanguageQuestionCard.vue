<script setup lang="ts">
import { computed } from 'vue';
import type {
  LanguageQuestionAnalysis,
  LanguageReviewStatus
} from '@/modules/examGroups/language/types/languageQuestionAnalysis';
import QuestionBookmarkButton from '@/modules/examGroups/shared/components/QuestionBookmarkButton.vue';

const props = defineProps<{
  question: LanguageQuestionAnalysis;
  isBookmarked?: boolean;
}>();

const emit = defineEmits<{
  toggleBookmark: [questionNumber: number];
}>();

const REVIEW_STATUS_LABELS: Record<LanguageReviewStatus, string> = {
  pending: '待建立解析',
  'needs-review': '解析需人工複核',
  verified: '解析已校對'
};

const SUBJECT_LABELS: Record<LanguageQuestionAnalysis['subject'], string> = {
  chinese: '國文',
  english: '英文',
  mixed: '混合'
};

const answerParagraphs = computed(() => splitParagraphs(props.question.answerExplanation));
const diagramParagraphs = computed(() => splitParagraphs(props.question.diagramInstructions));

function splitParagraphs(text: string): string[] {
  return text
    .split(/\n+/)
    .map((paragraph) => paragraph.trim())
    .filter((paragraph) => paragraph.length > 0);
}
</script>

<template>
  <article class="surface-card space-y-4 p-4" data-testid="language-question-card">
    <header class="flex items-start justify-between gap-3">
      <div class="min-w-0">
        <p class="text-xs font-semibold text-teal">第 {{ question.number }} 題組</p>
        <h3 class="mt-1 text-lg font-bold leading-tight">
          {{ SUBJECT_LABELS[question.subject] }} / {{ question.kind }}
        </h3>
      </div>
      <QuestionBookmarkButton
        :is-bookmarked="isBookmarked"
        @toggle="emit('toggleBookmark', question.number)"
      />
    </header>

    <section class="space-y-3 border-t border-slate/10 pt-4" data-testid="language-original-section">
      <div>
        <p class="text-xs font-semibold text-slate">原題內容</p>
        <p class="mt-2 whitespace-pre-line text-sm leading-6 text-ink">{{ question.originalQuestion }}</p>
      </div>

      <div v-if="question.choices.length > 0" class="space-y-2" data-testid="language-choice-section">
        <p class="text-xs font-semibold text-slate">選項或題組選項狀態</p>
        <ul class="space-y-2">
          <li
            v-for="choice in question.choices"
            :key="choice.label"
            class="rounded-md border border-slate/10 bg-white px-3 py-2 text-sm leading-6 text-ink"
          >
            <span class="font-semibold">{{ choice.label }}：</span>{{ choice.text }}
          </li>
        </ul>
      </div>

      <p class="text-sm font-semibold text-teal">
        題型：{{ question.questionType }}，狀態：{{ REVIEW_STATUS_LABELS[question.reviewStatus] }}
      </p>
    </section>

    <section class="space-y-4 border-t border-slate/10 pt-4" data-testid="language-teaching-section">
      <div>
        <p class="text-xs font-semibold text-slate">答案解析</p>
        <div class="mt-2 space-y-2 text-sm leading-6 text-ink">
          <p v-for="(paragraph, index) in answerParagraphs" :key="`${index}-${paragraph}`">
            {{ paragraph }}
          </p>
        </div>
      </div>

      <div>
        <h4 class="text-sm font-bold leading-tight text-ink">教學筆記</h4>
        <ul class="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-slate">
          <li v-for="note in question.teachingNotes" :key="note">{{ note }}</li>
        </ul>
      </div>

      <div>
        <h4 class="text-sm font-bold leading-tight text-ink">策略提醒</h4>
        <ul class="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-slate">
          <li v-for="tip in question.strategyTips" :key="tip">{{ tip }}</li>
        </ul>
      </div>

      <div data-testid="language-diagram-section">
        <h4 class="text-sm font-bold leading-tight text-ink">文字圖解</h4>
        <div class="mt-2 space-y-2 text-sm leading-6 text-slate">
          <p v-for="(paragraph, index) in diagramParagraphs" :key="`${index}-${paragraph}`">
            {{ paragraph }}
          </p>
        </div>
        <p class="mt-2 text-xs font-semibold leading-5 text-slate">
          Alt text：{{ question.diagramAltText }}
        </p>
      </div>

      <div>
        <h4 class="text-sm font-bold leading-tight text-ink">考點</h4>
        <ul class="mt-2 flex flex-wrap gap-2">
          <li
            v-for="point in question.examPoints"
            :key="point"
            class="rounded-md border border-slate/10 bg-white px-2 py-1 text-xs font-semibold text-slate"
          >
            {{ point }}
          </li>
        </ul>
      </div>
    </section>

    <footer
      class="border-t border-slate/10 pt-3 text-xs font-semibold leading-5 text-slate"
      data-testid="language-source-traceability"
    >
      來源：{{ question.sourceRef.fileName }}
      <span v-if="question.sourceRef.pageNumber !== 'pending'">，第 {{ question.sourceRef.pageNumber }} 頁</span>
      <span v-else>，頁碼待確認</span>
      ，萃取狀態：{{ question.sourceRef.extractionStatus }}
    </footer>
  </article>
</template>
