# 測試矩陣

本矩陣對應 Spectra change `rebuild-exam-pwa-group-year-analysis`，用來確認 group routes、A 組 114 逐題解析、PWA runtime 與 CI/CD 都有測試或人工驗證紀錄。

| Area | Coverage | Evidence |
| --- | --- | --- |
| Router | 根路由 redirect、primary group routes、legacy redirects、valid A group years、invalid years。 | `tests/unit/groupRoutes.spec.ts`、`tests/e2e/group-routes.spec.ts` |
| Storage | A 組 localStorage snapshot、單一 bookmark、completed years、完成已書籤年度會清 bookmark、壞 snapshot fail safe。 | `tests/unit/aGroupProgressStorage.spec.ts`、`tests/unit/aGroupYearSummaries.spec.ts` |
| Loader | 年度題庫 lazy loader、114 年完整資料、107 至 113 年 pending。 | `tests/unit/aGroupYearQuestionLoader.spec.ts`、`tests/unit/AGroupYearView.spec.ts` |
| Question card | 原題與教學解析分區、三種官方答案檢查狀態、sourceRef 顯示、初學者教學欄位。 | `tests/unit/AGroupQuestionCard.spec.ts`、`tests/unit/aGroup114QuestionContent.spec.ts`、`tests/unit/aGroup114ContentReview.spec.ts` |
| Systematic novice teaching | 114 年 50 題逐題解析採用新手系統教學標準，內容必須包含前置觀念、公式或規則來源、逐步套用、干擾選項錯因、可複用重點與常見陷阱；內容審查 rubric 會拒絕只給結論、跳過前置觀念或缺少規則來源的淺層解析。 | `tests/unit/aGroup114QuestionContent.spec.ts`、`tests/unit/aGroup114ContentReview.spec.ts`、`npm run check:a-group-114-content` |
| PWA wrapper | `vite-plugin-pwa` runtime wrapper、不手動呼叫 `navigator.serviceWorker.register`、unsupported/updateAvailable 非阻斷狀態。 | `tests/unit/pwaRuntime.spec.ts`、`tests/unit/AppShell.spec.ts` |
| PWA output | production build 後 `dist/manifest.webmanifest` 與 `dist/sw.js` 存在，CI/CD 使用同一 gate。 | `scripts/check-pwa-output.mjs`、`npm run check:pwa-output`、`tests/unit/ciWorkflow.spec.ts`、`tests/unit/cdWorkflow.spec.ts` |
| Mobile/offline smoke | 375px 導覽、A 組年度控制、114 年離線 reload、`/a-group` cached navigation fallback。 | `tests/e2e/group-routes.spec.ts`、Playwright screenshots attached in `test-results/` on smoke runs |

## 最近本機驗證

- `npm run lint`
- `npm run typecheck`
- `npm run test:unit`
- `npm run check:a-group-114-content`
- `npm run build`
- `npm run check:pwa-output`
- `npm run test:e2e -- --project=chromium`

以上命令會在 8.2 再執行一次全量驗證作為最終 gate。
