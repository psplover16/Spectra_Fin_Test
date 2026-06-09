<script setup lang="ts">
import { computed, ref } from 'vue';
import { preloadRoute } from '@/app/routePreload';
import { B_GROUP_YEAR_SUMMARIES } from '@/modules/examGroups/bGroup/data/yearSummaries';
import type { BGroupYear } from '@/modules/examGroups/bGroup/data/yearSummaries';
import {
  readBGroupProgressSnapshot,
  setBGroupYearBookmark,
  setBGroupYearCompletion
} from '@/modules/examGroups/bGroup/storage/bGroupProgressStorage';

const progressSnapshot = ref(readBGroupProgressSnapshot());
const bookmarkedYear = computed(() => progressSnapshot.value.bookmark?.year ?? null);
const completedYears = computed(() => new Set(progressSnapshot.value.completedYears));

function preloadYearRoute(path: string): void {
  void preloadRoute(path);
}

function bookmarkYear(year: BGroupYear): void {
  progressSnapshot.value = setBGroupYearBookmark(year);
}

function setYearCompleted(year: BGroupYear, event: Event): void {
  const completed = event.target instanceof HTMLInputElement ? event.target.checked : false;
  progressSnapshot.value = setBGroupYearCompletion(year, completed);
}
</script>

<template>
  <section class="space-y-3" data-testid="b-group-view">
    <div class="surface-card p-4">
      <p class="text-sm font-semibold text-teal">資訊人員職員級</p>
      <h2 class="mt-2 text-2xl font-bold leading-tight">B 組</h2>
      <p class="mt-3 text-sm leading-6 text-slate">
        依年度整理資訊管理與程式設計申論解析，題數由年度題目索引推導。
      </p>
    </div>
    <ol class="space-y-2" aria-label="B 組年度清單">
      <li
        v-for="summary in B_GROUP_YEAR_SUMMARIES"
        :key="summary.year"
        data-testid="b-group-year-row"
        :data-year="summary.year"
        class="surface-card p-1"
      >
        <div class="flex items-center gap-2">
          <RouterLink v-slot="{ navigate }" :to="summary.routePath" custom>
            <a
              :href="summary.routePath"
              data-testid="b-group-year-main"
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
              data-testid="b-group-bookmark-control"
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
                data-testid="b-group-completion-control"
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
