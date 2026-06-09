<script setup lang="ts">
import { computed, inject } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import { defaultOfflineReadinessState, offlineReadinessKey } from '@/app/pwa';
import { preloadRoute } from '@/app/routePreload';

const primaryNavItems = [
  { label: 'A 組', to: '/a-group' },
  { label: 'B 組', to: '/b-group' },
  { label: '語言', to: '/language' }
] as const;

const offlineReadiness = inject(offlineReadinessKey, undefined);
const offlineReadinessMessage = computed(() => offlineReadiness?.value.message ?? defaultOfflineReadinessState.message);
const offlineReadinessStatus = computed(() => offlineReadiness?.value.status ?? defaultOfflineReadinessState.status);

function preloadNavigationTarget(path: string): void {
  void preloadRoute(path);
}
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
            :data-status="offlineReadinessStatus"
            role="status"
            class="max-w-full rounded-md border px-2 py-1 text-xs font-semibold leading-5"
            :class="offlineReadinessStatus === 'ready' ? 'border-teal/30 bg-teal/10 text-teal' : 'border-brass/30 bg-brass/10 text-brass'"
          >
            {{ offlineReadinessMessage }}
          </p>
        </div>
        <nav aria-label="主要組別導覽" data-testid="primary-nav" class="mt-3 grid grid-cols-3 gap-2">
          <RouterLink
            v-for="item in primaryNavItems"
            :key="item.to"
            v-slot="{ href, navigate, isActive }"
            :to="item.to"
            custom
          >
            <a
              :href="href"
              data-testid="primary-nav-link"
              :data-active="isActive ? 'true' : 'false'"
              :aria-current="isActive ? 'page' : undefined"
              class="flex min-h-10 items-center justify-center rounded-md border px-2 text-center text-sm font-semibold leading-tight transition-colors"
              :class="
                isActive
                  ? 'border-teal bg-teal text-white shadow-sm'
                  : 'border-slate/20 bg-white text-slate hover:border-teal/40 hover:text-teal'
              "
              @click="navigate"
              @focus="preloadNavigationTarget(item.to)"
              @pointerenter="preloadNavigationTarget(item.to)"
            >
              {{ item.label }}
            </a>
          </RouterLink>
        </nav>
      </header>
      <main class="min-w-0 flex-1" data-testid="app-main">
        <RouterView />
      </main>
    </div>
  </div>
</template>
