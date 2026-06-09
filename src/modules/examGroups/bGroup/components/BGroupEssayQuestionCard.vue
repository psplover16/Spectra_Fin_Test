<script setup lang="ts">
import { computed } from 'vue';
import type {
  BGroupEssayChildItem,
  BGroupEssayQuestionAnalysis,
  BGroupReviewStatus
} from '@/modules/examGroups/bGroup/types/essayQuestionAnalysis';

const props = defineProps<{
  question: BGroupEssayQuestionAnalysis;
}>();

const REVIEW_STATUS_LABELS: Record<BGroupReviewStatus, string> = {
  pending: '待建立解析',
  'needs-review': '解析需人工複核',
  verified: '解析已校對'
};

const questionExplanationParagraphs = computed(() => splitParagraphs(props.question.questionExplanation));
const modelAnswerParagraphs = computed(() => splitParagraphs(props.question.modelAnswer));
const diagramParagraphs = computed(() => splitParagraphs(props.question.diagramInstructions));

function splitParagraphs(text: string): string[] {
  return text
    .split(/\n+/)
    .map((paragraph) => paragraph.trim())
    .filter((paragraph) => paragraph.length > 0);
}

function childItemKey(item: BGroupEssayChildItem, index: number): string {
  return `${index}-${item.kind}-${item.label}`;
}
</script>

<template>
  <article class="surface-card space-y-4 p-4" data-testid="b-group-question-card">
    <header class="flex items-start justify-between gap-3">
      <div class="min-w-0">
        <p class="text-xs font-semibold text-teal">第 {{ question.number }} 題</p>
        <h3 class="mt-1 text-lg font-bold leading-tight">
          {{ question.keyTerms[0] }}
        </h3>
      </div>
      <p class="shrink-0 rounded-md bg-teal/10 px-2 py-1 text-xs font-semibold text-teal">
        {{ question.year }} 年
      </p>
    </header>

    <section class="space-y-3 border-t border-slate/10 pt-4" data-testid="original-exam-section">
      <div>
        <p class="text-xs font-semibold text-slate">原題內容</p>
        <p class="mt-2 whitespace-pre-line text-sm leading-6 text-ink">{{ question.originalQuestion }}</p>
      </div>
      <div
        v-if="question.childItems?.length"
        class="space-y-2"
        data-testid="child-items-section"
      >
        <div
          v-for="(item, index) in question.childItems"
          :key="childItemKey(item, index)"
          class="rounded-md border border-slate/10 bg-white px-3 py-2 text-sm leading-6 text-ink"
        >
          <p class="font-semibold">{{ item.label }}</p>
          <p class="mt-1 whitespace-pre-line">{{ item.prompt }}</p>
        </div>
      </div>
      <p class="text-sm font-semibold text-teal">
        題型：{{ question.questionType }}，狀態：{{ REVIEW_STATUS_LABELS[question.reviewStatus] }}
      </p>
    </section>

    <section class="space-y-4 border-t border-slate/10 pt-4" data-testid="teaching-analysis-section">
      <div>
        <p class="text-xs font-semibold text-slate">題意拆解</p>
        <div class="mt-2 space-y-2 text-sm leading-6 text-ink">
          <p v-for="(paragraph, index) in questionExplanationParagraphs" :key="`${index}-${paragraph}`">
            {{ paragraph }}
          </p>
        </div>
      </div>

      <div>
        <p class="text-xs font-semibold text-slate">擬答</p>
        <div class="mt-2 space-y-2 text-sm leading-6 text-ink">
          <p v-for="(paragraph, index) in modelAnswerParagraphs" :key="`${index}-${paragraph}`">
            {{ paragraph }}
          </p>
        </div>
      </div>

      <div>
        <h4 class="text-sm font-bold leading-tight text-ink">擬答細節</h4>
        <ul class="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-slate">
          <li v-for="detail in question.modelAnswerDetails" :key="detail">{{ detail }}</li>
        </ul>
      </div>

      <div data-testid="diagram-support-section">
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
        <h4 class="text-sm font-bold leading-tight text-ink">評分重點</h4>
        <ul class="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-slate">
          <li v-for="point in question.scoringPoints" :key="point">{{ point }}</li>
        </ul>
      </div>

      <div>
        <h4 class="text-sm font-bold leading-tight text-ink">常見錯誤</h4>
        <ul class="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-slate">
          <li v-for="mistake in question.commonMistakes" :key="mistake">{{ mistake }}</li>
        </ul>
      </div>

      <div>
        <h4 class="text-sm font-bold leading-tight text-ink">關鍵詞</h4>
        <ul class="mt-2 flex flex-wrap gap-2">
          <li
            v-for="term in question.keyTerms"
            :key="term"
            class="rounded-md border border-slate/10 bg-white px-2 py-1 text-xs font-semibold text-slate"
          >
            {{ term }}
          </li>
        </ul>
      </div>
    </section>

    <footer
      class="border-t border-slate/10 pt-3 text-xs font-semibold leading-5 text-slate"
      data-testid="source-traceability"
    >
      來源：{{ question.sourceRef.fileName }}
      <span v-if="question.sourceRef.pageNumber !== 'pending'">，第 {{ question.sourceRef.pageNumber }} 頁</span>
      <span v-else>，頁碼待確認</span>
      ，萃取狀態：{{ question.sourceRef.extractionStatus }}
    </footer>
  </article>
</template>
