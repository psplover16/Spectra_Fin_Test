<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import {
  examRoutes,
  getExamRouteByPath
} from '@/modules/exam/data/examRoutes';
import { getSubjectContentBySlug } from '@/modules/exam/data/subjectContent';
import type { QuestionMapping, SourceReference, SubjectSlug } from '@/modules/exam/types/content';

const currentRoute = useRoute();
const optionLabels = ['A', 'B', 'C', 'D'] as const;
const subjectSlugs = new Set<string>([
  'computer-principles',
  'networking',
  'information-management',
  'programming',
  'language'
]);

const routeItem = computed(() => getExamRouteByPath(currentRoute.path));
const categoryLabel = computed(() => {
  if (routeItem.value?.category === 'common') {
    return '共同科目';
  }

  if (routeItem.value?.category === 'learning') {
    return '學習';
  }

  return '專業科目';
});
const subjectContent = computed(() =>
  routeItem.value && isSubjectSlug(routeItem.value.slug) ? getSubjectContentBySlug(routeItem.value.slug) : undefined
);
const routeIndex = computed(() =>
  routeItem.value ? examRoutes.findIndex((candidate) => candidate.slug === routeItem.value?.slug) : -1
);
const nextRoute = computed(() => {
  const nextIndex = routeIndex.value + 1;
  return examRoutes[nextIndex >= examRoutes.length ? 0 : nextIndex];
});
const visualTone = computed(() => {
  switch (routeItem.value?.slug) {
    case 'a-group':
      return {
        accent: 'bg-teal',
        soft: 'bg-teal/10',
        text: 'text-teal',
        border: 'border-teal/30'
      };
    case 'b-group':
      return {
        accent: 'bg-coral',
        soft: 'bg-coral/10',
        text: 'text-coral',
        border: 'border-coral/30'
      };
    case 'language':
      return {
        accent: 'bg-brass',
        soft: 'bg-brass/10',
        text: 'text-brass',
        border: 'border-brass/30'
      };
    case 'learning':
      return {
        accent: 'bg-ink',
        soft: 'bg-ink/10',
        text: 'text-ink',
        border: 'border-ink/30'
      };
    default:
      return {
        accent: 'bg-slate',
        soft: 'bg-slate/10',
        text: 'text-slate',
        border: 'border-slate/30'
      };
  }
});

function isSubjectSlug(slug: string): slug is SubjectSlug {
  return subjectSlugs.has(slug);
}

function verificationLabel(status: SourceReference['verificationStatus']): string {
  return status === 'verified' ? '已校對' : '待校對';
}

function sourceLabel(source: SourceReference): string {
  return source.sourceYear
    ? `${source.sourceYear} 年｜${source.sourceFile}`
    : source.sourceFile;
}

function correctOption(mapping: QuestionMapping): string {
  return mapping.options[optionLabels.indexOf(mapping.correctAnswer)];
}
</script>

<template>
  <section v-if="routeItem && subjectContent" class="space-y-3 pb-2" data-testid="exam-route-view">
    <article class="surface-card overflow-hidden">
      <div
        data-testid="subject-accent"
        :data-subject="routeItem.slug"
        :data-category="routeItem.category"
        class="h-1.5"
        :class="visualTone.accent"
      />
      <div class="p-4">
        <div class="flex min-w-0 items-start justify-between gap-3">
          <div class="min-w-0">
            <p class="text-sm font-semibold" :class="visualTone.text">{{ categoryLabel }}</p>
            <h2 class="mt-2 text-2xl font-bold leading-tight">{{ subjectContent.title }}</h2>
          </div>
          <span
            class="shrink-0 rounded-md border px-2 py-1 text-xs font-semibold"
            :class="[visualTone.soft, visualTone.text, visualTone.border]"
          >
            {{ routeIndex + 1 }}/{{ examRoutes.length }}
          </span>
        </div>
        <p class="mt-3 text-sm leading-6 text-slate">{{ routeItem.description }}</p>
      </div>
    </article>

    <dl class="grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
      <div class="surface-card p-3">
        <dt class="text-xs font-semibold text-slate">內容狀態</dt>
        <dd class="mt-1 font-semibold text-ink">{{ routeItem.statusLabel }}</dd>
      </div>
      <div class="surface-card p-3">
        <dt class="text-xs font-semibold text-slate">來源群組</dt>
        <dd class="mt-1 font-semibold text-ink">{{ routeItem.sourceGroup }}</dd>
      </div>
      <div class="surface-card p-3">
        <dt class="text-xs font-semibold text-slate">整理階段</dt>
        <dd class="mt-1 font-semibold text-ink">Stage {{ subjectContent.stage }}</dd>
      </div>
      <div class="surface-card p-3">
        <dt class="text-xs font-semibold text-slate">來源檔數</dt>
        <dd class="mt-1 font-semibold text-ink">{{ subjectContent.yearlySources.length }} 份</dd>
      </div>
    </dl>

    <section class="overflow-hidden rounded-md border border-slate/10 bg-white" data-testid="subject-overview">
      <header class="sticky top-0 z-10 border-b border-slate/10 bg-mist px-3 py-2">
        <h3 class="text-base font-bold leading-tight">科目總覽</h3>
      </header>
      <div class="px-3 py-3">
        <p class="text-sm leading-6 text-slate">{{ subjectContent.overview }}</p>
      </div>
    </section>

    <section class="overflow-hidden rounded-md border border-slate/10 bg-white" data-testid="subject-points">
      <header class="sticky top-0 z-10 border-b border-slate/10 bg-mist px-3 py-2">
        <h3 class="text-base font-bold leading-tight">高頻考點</h3>
      </header>
      <div class="grid gap-2 px-3 py-3 sm:grid-cols-2">
        <article
          v-for="point in subjectContent.highFrequencyPoints"
          :key="point.id"
          class="rounded-md border border-slate/10 p-3"
        >
          <h4 class="text-sm font-bold leading-5 text-ink">{{ point.title }}</h4>
          <p class="mt-1 text-sm leading-6 text-slate">{{ point.summary }}</p>
          <p class="mt-2 text-xs font-semibold" :class="visualTone.text">
            {{ point.sourceRefs.length }} 個來源
          </p>
        </article>
      </div>
    </section>

    <section class="overflow-hidden rounded-md border border-slate/10 bg-white" data-testid="subject-sources">
      <header class="sticky top-0 z-10 border-b border-slate/10 bg-mist px-3 py-2">
        <h3 class="text-base font-bold leading-tight">年度來源索引</h3>
      </header>
      <div class="grid gap-2 px-3 py-3 sm:grid-cols-2">
        <div
          v-for="source in subjectContent.yearlySources"
          :key="source.sourceFile"
          class="rounded-md border border-slate/10 p-3"
        >
          <div class="flex min-w-0 items-center justify-between gap-2">
            <p class="text-sm font-bold leading-5 text-ink">{{ source.label }}</p>
            <span class="shrink-0 text-xs font-semibold text-slate">{{ verificationLabel(source.verificationStatus) }}</span>
          </div>
          <p class="mt-1 break-all text-xs leading-5 text-slate">{{ source.sourceFolder }}/{{ source.sourceFile }}</p>
          <p class="mt-2 text-xs font-semibold" :class="visualTone.text">{{ source.subjects.join('、') }}</p>
        </div>
      </div>
    </section>

    <section class="overflow-hidden rounded-md border border-slate/10 bg-white" data-testid="subject-lectures">
      <header class="sticky top-0 z-10 border-b border-slate/10 bg-mist px-3 py-2">
        <h3 class="text-base font-bold leading-tight">主題式講義</h3>
      </header>
      <div class="space-y-3 px-3 py-3">
        <article
          v-for="section in subjectContent.lectureSections"
          :key="section.id"
          class="rounded-md border border-slate/10 p-3"
        >
          <h4 class="text-base font-bold leading-tight text-ink">{{ section.title }}</h4>
          <p class="mt-2 text-sm leading-6 text-slate">{{ section.body }}</p>
          <ul class="mt-2 flex flex-wrap gap-1.5">
            <li
              v-for="keyPoint in section.keyPoints"
              :key="keyPoint"
              class="rounded border border-slate/10 bg-mist px-2 py-1 text-xs font-semibold text-slate"
            >
              {{ keyPoint }}
            </li>
          </ul>
        </article>
      </div>
    </section>

    <section class="overflow-hidden rounded-md border border-slate/10 bg-white" data-testid="subject-checklist">
      <header class="sticky top-0 z-10 border-b border-slate/10 bg-mist px-3 py-2">
        <h3 class="text-base font-bold leading-tight">複習清單</h3>
      </header>
      <ol class="grid gap-2 px-3 py-3 sm:grid-cols-2">
        <li
          v-for="(item, index) in subjectContent.reviewChecklist"
          :key="item"
          class="flex min-w-0 gap-2 rounded-md border border-slate/10 p-3 text-sm leading-6 text-slate"
        >
          <span class="shrink-0 font-bold" :class="visualTone.text">{{ index + 1 }}</span>
          <span class="min-w-0">{{ item }}</span>
        </li>
      </ol>
    </section>

    <section class="overflow-hidden rounded-md border border-slate/10 bg-white" data-testid="subject-pitfalls">
      <header class="sticky top-0 z-10 border-b border-slate/10 bg-mist px-3 py-2">
        <h3 class="text-base font-bold leading-tight">易錯觀念</h3>
      </header>
      <div class="grid gap-2 px-3 py-3 sm:grid-cols-2">
        <article
          v-for="pitfall in subjectContent.pitfalls"
          :key="pitfall.title"
          class="rounded-md border border-slate/10 p-3"
        >
          <h4 class="text-sm font-bold leading-5 text-ink">{{ pitfall.title }}</h4>
          <p class="mt-1 text-sm leading-6 text-slate">{{ pitfall.explanation }}</p>
        </article>
      </div>
    </section>

    <section class="overflow-hidden rounded-md border border-slate/10 bg-white" data-testid="subject-question-mappings">
      <header class="sticky top-0 z-10 border-b border-slate/10 bg-mist px-3 py-2">
        <h3 class="text-base font-bold leading-tight">題目對照</h3>
      </header>
      <div class="space-y-3 px-3 py-3">
        <article
          v-for="mapping in subjectContent.questionMappings"
          :key="`${mapping.examPointId}-${mapping.questionStem}`"
          class="rounded-md border border-slate/10 p-3"
        >
          <div class="flex min-w-0 flex-wrap items-center gap-2">
            <span class="rounded border border-slate/10 bg-mist px-2 py-1 text-xs font-semibold text-slate">
              {{ mapping.questionType }}
            </span>
            <span class="rounded px-2 py-1 text-xs font-semibold" :class="[visualTone.soft, visualTone.text]">
              {{ mapping.difficulty }}
            </span>
            <span class="rounded border border-slate/10 px-2 py-1 text-xs font-semibold text-slate">
              {{ verificationLabel(mapping.verificationStatus) }}
            </span>
          </div>
          <p class="mt-2 text-sm font-semibold leading-6 text-ink">{{ mapping.questionStem }}</p>
          <ol class="mt-2 grid gap-1.5 sm:grid-cols-2">
            <li
              v-for="(option, index) in mapping.options"
              :key="option"
              class="min-w-0 rounded border px-2 py-2 text-sm leading-5"
              :class="optionLabels[index] === mapping.correctAnswer ? [visualTone.soft, visualTone.border, 'text-ink'] : 'border-slate/10 text-slate'"
            >
              <span class="font-bold">{{ optionLabels[index] }}.</span>
              {{ option }}
              <p class="mt-1 text-xs leading-5 text-slate">{{ mapping.optionExplanations[index] }}</p>
            </li>
          </ol>
          <p class="mt-2 text-xs leading-5 text-slate">
            正解：{{ mapping.correctAnswer }}｜{{ correctOption(mapping) }}
          </p>
          <p class="mt-1 break-all text-xs leading-5 text-slate">
            來源：{{ sourceLabel(mapping.sourceRef) }}
          </p>
        </article>
      </div>
    </section>

    <nav
      v-if="nextRoute"
      class="sticky bottom-2 z-20 grid grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] gap-2 rounded-lg border border-slate/10 bg-white/95 p-2 shadow-soft backdrop-blur"
      aria-label="科目操作"
    >
      <RouterLink
        to="/"
        class="flex min-h-11 min-w-0 items-center justify-center rounded-md border border-slate/15 px-3 text-sm font-semibold text-ink"
      >
        回入口
      </RouterLink>
      <RouterLink
        :to="nextRoute.path"
        class="flex min-h-11 min-w-0 flex-col items-center justify-center rounded-md px-3 text-white"
        :class="visualTone.accent"
      >
        <span class="text-xs font-medium leading-4">下一科</span>
        <span class="max-w-full truncate text-sm font-semibold leading-5">{{ nextRoute.displayName }}</span>
      </RouterLink>
    </nav>
  </section>
</template>
