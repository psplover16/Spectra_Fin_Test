<script setup lang="ts">
import { computed, ref } from 'vue';
import { preloadRoute } from '@/app/routePreload';
import { LANGUAGE_YEAR_SUMMARIES, type LanguageYear } from '@/modules/examGroups/language/data/yearSummaries';
import {
  readLanguageProgressSnapshot,
  setLanguageYearBookmark,
  setLanguageYearCompletion
} from '@/modules/examGroups/language/storage/languageProgressStorage';

const progressSnapshot = ref(readLanguageProgressSnapshot());
const bookmarkedYear = computed(() => progressSnapshot.value.bookmark?.year ?? null);
const completedYears = computed(() => new Set(progressSnapshot.value.completedYears));

function preloadYearRoute(path: string): void {
  void preloadRoute(path);
}

function bookmarkYear(year: LanguageYear): void {
  progressSnapshot.value = setLanguageYearBookmark(year);
}

function setYearCompleted(year: LanguageYear, event: Event): void {
  const completed = event.target instanceof HTMLInputElement ? event.target.checked : false;
  progressSnapshot.value = setLanguageYearCompletion(year, completed);
}
</script>

<template>
  <section class="space-y-3" data-testid="language-group-view">
    <div class="surface-card p-4">
      <p class="text-sm font-semibold text-teal">共同科目</p>
      <h2 class="mt-2 text-2xl font-bold leading-tight">語言</h2>
      <p class="mt-3 text-sm leading-6 text-slate">
        依年度整理國文與英文解析，題數由年度題目索引推導。
      </p>
    </div>
    <ol class="space-y-2" aria-label="語言年度清單">
      <li
        v-for="summary in LANGUAGE_YEAR_SUMMARIES"
        :key="summary.year"
        data-testid="language-year-row"
        :data-year="summary.year"
        class="surface-card p-1"
      >
        <div class="flex items-center gap-2">
          <RouterLink v-slot="{ navigate }" :to="summary.routePath" custom>
            <a
              :href="summary.routePath"
              data-testid="language-year-main"
              :data-year="summary.year"
              class="flex min-h-16 min-w-0 flex-1 items-center justify-between gap-3 rounded-md p-2 text-left transition-colors hover:bg-teal/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
              @click="navigate"
              @focus="preloadYearRoute(summary.routePath)"
              @pointerenter="preloadYearRoute(summary.routePath)"
            >
              <div class="min-w-0">
                <h3 class="text-base font-bold leading-tight">{{ summary.year }} 年</h3>
                <p class="mt-1 text-sm leading-5 text-slate">{{ summary.statusLabel }}</p>
              </div>
              <p class="shrink-0 text-sm font-semibold text-teal">{{ summary.questionCount }} 題</p>
            </a>
          </RouterLink>
          <div class="flex shrink-0 items-center gap-2">
            <button
              type="button"
              data-testid="language-bookmark-control"
              :data-year="summary.year"
              :data-bookmarked="bookmarkedYear === summary.year ? 'true' : 'false'"
              :aria-pressed="bookmarkedYear === summary.year"
              class="min-h-10 rounded-md border px-2 text-xs font-semibold leading-tight"
              :class="
                bookmarkedYear === summary.year
                  ? 'border-brass bg-brass/10 text-brass'
                  : 'border-slate/20 bg-white text-slate'
              "
              @click.stop="bookmarkYear(summary.year)"
            >
              {{ bookmarkedYear === summary.year ? '已書籤' : '書籤' }}
            </button>
            <label
              class="flex min-h-10 items-center gap-1 rounded-md border border-slate/20 bg-white px-2 text-xs font-semibold leading-tight text-slate"
            >
              <input
                type="checkbox"
                data-testid="language-completion-control"
                :data-year="summary.year"
                :checked="completedYears.has(summary.year)"
                class="h-4 w-4 accent-teal"
                @change.stop="setYearCompleted(summary.year, $event)"
              />
              完成
            </label>
          </div>
        </div>
      </li>
    </ol>
  </section>
</template>
