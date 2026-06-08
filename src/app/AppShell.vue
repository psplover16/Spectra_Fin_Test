<script setup lang="ts">
import { computed, inject } from 'vue';
import { RouterView } from 'vue-router';
import { defaultOfflineReadinessState, offlineReadinessKey } from '@/app/pwa';

const offlineReadiness = inject(offlineReadinessKey);
const offlineReadinessMessage = computed(() => offlineReadiness?.value.message ?? defaultOfflineReadinessState.message);
const offlineReadinessStatus = computed(() => offlineReadiness?.value.status ?? defaultOfflineReadinessState.status);
</script>

<template>
  <div data-testid="app-shell" class="min-h-screen bg-paper text-ink">
    <div class="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-3 py-3">
      <header class="surface-card mb-3 p-3" data-testid="app-header">
        <div class="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div class="min-w-0">
            <p class="text-xs font-semibold text-teal">PWA 學習講義</p>
            <h1 class="mt-1 text-xl font-bold leading-tight">國營資訊職員考試講義</h1>
          </div>
          <p
            data-testid="offline-readiness"
            role="status"
            class="max-w-full rounded-md border px-2 py-1 text-xs font-semibold leading-5"
            :class="offlineReadinessStatus === 'ready' ? 'border-teal/30 bg-teal/10 text-teal' : 'border-brass/30 bg-brass/10 text-brass'"
          >
            {{ offlineReadinessMessage }}
          </p>
        </div>
      </header>
      <main class="min-w-0 flex-1" data-testid="app-main">
        <RouterView />
      </main>
    </div>
  </div>
</template>
