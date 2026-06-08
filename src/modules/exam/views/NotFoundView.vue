<template>
  <section class="space-y-3" data-testid="not-found-view">
    <div class="surface-card p-4">
      <p class="text-sm font-semibold text-coral">路由未定義</p>
      <h2 class="mt-2 text-2xl font-bold leading-tight">找不到頁面</h2>
      <p class="mt-3 text-sm leading-6 text-slate">
        這個路徑不在本次建立的五個學習路由中，請回到入口重新選擇科目。
      </p>
    </div>
    <RouterLink
      to="/"
      class="inline-flex min-h-11 items-center rounded-md bg-teal px-4 text-sm font-semibold text-white"
    >
      回到學習入口
    </RouterLink>
  </section>
</template>
