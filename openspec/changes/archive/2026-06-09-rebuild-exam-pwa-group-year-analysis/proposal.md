## Why

目前專案以科目講義路由呈現，與使用者要的 A 組、B 組、語言分組學習，以及 A 組年度考題解析流程不一致。現在要先用 114 年 A 組建立可驗證版型、資料結構、PWA 與逐題解析模板，避免 107 至 113 年共 350 題批次製作後才返工。

## What Changes

- **BREAKING**: 根路由改導向 A 組，既有科目路由改為對應組別 redirect。
- 新增 A 組年度清單、年度完成狀態、年度書籤與 invalid year NotFound 行為。
- 新增 A 組 114 年 50 題年度解析頁，保留原題、答案、選項、官方答案檢查與 AI 教學解析。
- 將 114 年每題 AI 教學解析提升為新手系統教學：逐題說明必要前置觀念、公式或規則來源、逐步套用、常見陷阱與可複用重點，避免只給結論或短版答案解析。
- 將 PWA 改為由 vite-plugin-pwa 統一產生 manifest、service worker 與快取策略。

## Non-Goals

- 第一批不製作 107 至 113 年完整解析，只顯示待製作狀態。
- 第一批不製作 B 組與語言逐題解析。
- 不保留手寫 service worker 註冊流程。
- 不引入後端、帳號、同步或 analytics。

## Capabilities

### New Capabilities

- `exam-group-routing`: A 組、B 組、語言主路由、舊路由 redirect、年度路由與 invalid year NotFound 行為。
- `a-group-year-progress`: A 組年度清單、年度書籤、年度完成狀態與 localStorage snapshot。
- `a-group-question-analysis`: A 組 114 年逐題解析資料、官方答案檢查、選項解析、tags 與來源追溯。
- `pwa-plugin-runtime`: vite-plugin-pwa manifest、service worker、離線快取與更新提示流程。

### Modified Capabilities

(none)

## Impact

- Affected specs: exam-group-routing, a-group-year-progress, a-group-question-analysis, pwa-plugin-runtime
- Affected code:
  - New: src/app/routePreload.ts, src/modules/examGroups/aGroup/views/AGroupView.vue, src/modules/examGroups/aGroup/views/AGroupYearView.vue, src/modules/examGroups/aGroup/data/yearSummaries.ts, src/modules/examGroups/aGroup/data/years/114.ts, src/modules/examGroups/aGroup/storage/aGroupProgressStorage.ts, src/modules/examGroups/aGroup/composables/useAGroupYearQuestions.ts
  - Modified: package.json, package-lock.json, vite.config.ts, src/app/router.ts, src/app/AppShell.vue, src/app/pwa.ts, src/styles/main.css, .github/workflows/ci.yml, .github/workflows/cd.yml, PROJECT_ARCHITECTURE.md, src/modules/examGroups/aGroup/data/years/114ReviewedAnalyses.ts, src/modules/examGroups/aGroup/data/years/114ContentReview.ts, tests/unit/aGroup114QuestionContent.spec.ts, tests/unit/aGroup114ContentReview.spec.ts
  - Removed: existing hand-written service-worker registration path if separate from src/app/pwa.ts
