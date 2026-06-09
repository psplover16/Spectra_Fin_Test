<script setup lang="ts">
import { examRoutes } from '@/modules/exam/data/examRoutes';
</script>

<template>
  <section class="space-y-3" data-testid="exam-landing-view">
    <div class="surface-card p-4">
      <p class="text-sm font-semibold text-teal">學習入口</p>
      <h2 class="mt-2 text-xl font-bold leading-tight">國營資訊職員考試講義</h2>
      <p class="mt-2 text-sm leading-6 text-slate">
        五個科目已依來源階段整理成可離線閱讀的講義內容，保留年度來源、主題講義與題目對照。
      </p>
    </div>
    <nav class="grid gap-2" aria-label="學習路由">
      <RouterLink
        v-for="route in examRoutes"
        :key="route.slug"
        :to="route.path"
        class="surface-card flex min-h-14 items-center justify-between gap-3 px-3 text-left text-sm font-semibold text-ink"
      >
        <span class="min-w-0">
          <span class="block">{{ route.displayName }}</span>
          <span class="mt-1 block text-xs font-medium leading-5 text-slate">
            {{ route.sourceGroup }}｜{{ route.statusLabel }}
          </span>
        </span>
        <span class="shrink-0 text-xs font-medium text-slate">
          {{ route.category === 'professional' ? '專業科目' : route.category === 'common' ? '共同科目' : '學習' }}
        </span>
      </RouterLink>
    </nav>
  </section>
</template>
