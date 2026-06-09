# 專案架構紀錄

## 變更：rebuild-exam-pwa-group-year-analysis

本專案目前是國營資訊職員考試講義 PWA。公開導覽已從舊科目路由改成組別導向：`/a-group`、`/b-group`、`/language`，其中 A 組第一批完成 114 年 50 題逐題解析；107 至 113 年保留年度入口並顯示 pending 狀態，等版型確認後再擴充完整解析。

## `src/app`

- `src/app/main.ts` 建立 Vue app、掛載 Vue Router，並以 `createPwaRuntime` 封裝 `vite-plugin-pwa` 的 runtime 狀態後 provide 給 AppShell。
- `src/app/AppShell.vue` 是手機優先的全站外殼，包含 A 組、B 組、語言主導覽、active state、route preload 觸發，以及非阻斷 PWA 狀態列。
- `src/app/router.ts` 定義 group-first routing contract：`/` redirect 到 `/a-group`，舊科目路由 redirect 到 A/B 組，`/a-group/:year` 只接受 107 至 114，invalid year 顯示 NotFound。
- `src/app/routePreload.ts` 集中 lazy route component loader，讓組別頁與年度解析頁可在 focus 或 pointerenter 時預載。
- `src/app/pwa.ts` 只暴露 `checking`、`ready`、`unsupported`、`error`、`updateAvailable` 狀態與 `updateServiceWorker` wrapper，不直接呼叫 `navigator.serviceWorker.register`。

## `src/modules/examGroups/`

- `src/modules/examGroups/aGroup/` 是 A 組 feature module，包含年度摘要、localStorage 進度、年度 loader、114 年資料、解析頁與題卡元件。
- `src/modules/examGroups/aGroup/data/yearSummaries.ts` 定義 114 至 107 年清單與 route path，`/a-group` 依序顯示八個年度。
- `src/modules/examGroups/aGroup/storage/aGroupProgressStorage.ts` 使用 versioned localStorage snapshot 保存 completed years 與單一 bookmark；壞 JSON、缺欄位或不支援版本會 fail safe。
- `src/modules/examGroups/aGroup/composables/useAGroupYearQuestions.ts` lazy load 年度內容；114 年載入完整題庫，107 至 113 年回傳 pending 狀態。
- `src/modules/examGroups/aGroup/data/years/114.ts` 組合來源基準與審查後解析，交付 114 年 50 題完整 `ExamQuestionAnalysis`。
- `src/modules/examGroups/aGroup/data/years/114SourceBaseline.ts` 保留原題、A-D 選項、官方答案與 PDF sourceRef 對照。
- `src/modules/examGroups/aGroup/data/years/114ReviewedAnalyses.ts` 放置逐題教學解析、核心術語、解題步驟、選項辨析、重點整理與 tags；114 年解析採用新手系統教學標準。
- `src/modules/examGroups/aGroup/data/years/114ContentReview.ts` 定義 114 年內容審查 rubric，檢查來源基準、資料 shape、逐選項辨析、疑義題註記與新手系統教學標準。
- `src/modules/examGroups/aGroup/components/AGroupQuestionCard.vue` 將原題內容、官方答案檢查、教學解析與來源追溯分區呈現。
- `src/modules/examGroups/bGroup/` 與 `src/modules/examGroups/language/` 目前是可到達的輕量入口，完整逐題解析不在本 change 範圍內。

## A 組內容範圍

- 114 年是第一批完整內容，頁面顯示 50 題解析、官方答案狀態與 PDF 來源追溯。
- 114 年每題解析都必須把讀者視為第一次接觸該觀念的新手；`beginnerExplanation` 說明前置觀念、公式或規則來源、適用條件與容易混淆的邊界，`solvingSteps` 把規則逐步套回題目具體值或選項，`optionExplanations` 說明 A-D 干擾選項錯在哪個條件，`keyTakeaways` 留下可複用規則與常見陷阱。
- 107 至 113 年是有效年度但尚未製作完整解析，年度列與路由會保留，年度頁顯示 pending，不會出現 50 題完整題卡。
- invalid year，例如 `/a-group/115`、`/a-group/999`、`/a-group/abc`，不 redirect，直接顯示 NotFound。
- 目前沒有把 B 組、語言或 107 至 113 年完整題庫放入資料模組；這些內容需另開 change。

## PWA Runtime

- `vite.config.ts` 使用 `vite-plugin-pwa` 產生 manifest 與 generated service worker，production build 後應有 `dist/manifest.webmanifest` 與 `dist/sw.js`。
- manifest 的 `start_url` 與 `scope` 由 `VITE_APP_BASE_PATH` 推導，`main` 使用 `/finPubTest/`，`dev` 使用 `/finPubTest/staging/`。
- Workbox `navigateFallback` 指向目前 base path 的 `index.html`，讓已快取後離線開啟 primary learning route 可以回到 app shell。
- PWA 狀態是非阻斷 UI：不支援 service worker 或註冊失敗時仍可線上瀏覽；plugin 回報 update 時 AppShell 顯示 `updateAvailable` 狀態。
- 手寫 service worker 已移除，PWA runtime 以 plugin 產物為準。

## CI/CD 與部署

- `.github/workflows/ci.yml` 在 pull request 與非 `gh-pages` push 執行 `npm ci`、`npm run lint`、`npm run typecheck`、`npm run test:unit`、`npm run build`、`npm run check:pwa-output`、`npm run test:e2e`。
- `.github/workflows/cd.yml` 只在 `dev` 與 `main` push 執行；部署前同樣跑 lint、typecheck、unit test、build、PWA output check 與 e2e，全部通過後才同步 `dist` 到 `gh-pages`。
- `scripts/deploymentBasePaths.mjs` 是 branch-to-base-path 的單一來源；`scripts/resolveDeploymentTarget.mjs` 在 GitHub Actions 中寫入 `PUBLISH_TARGET`、`VITE_APP_BASE_PATH`、`VITE_APP_START_URL`。
- `scripts/check-pwa-output.mjs` 驗證 `dist/manifest.webmanifest` 與 `dist/sw.js` 存在，是 CI/CD 使用的 PWA output gate。
- `scripts/publishPages.mjs` 將 `dist/` 同步到 `.deploy-pages` worktree；production 發布到 root，staging 發布到 `staging/` 子目錄，並保留 `.nojekyll`、`CNAME` 與既有 staging 目錄。

## 測試覆蓋摘要

- Router 與 route smoke 覆蓋 group routes、legacy redirects、valid/pending years、invalid years。
- Storage tests 覆蓋 A 組 bookmark、completed years、壞 snapshot fail safe。
- Loader 與 data tests 覆蓋 114 年 50 題、資料 shape、來源基準與整批內容審查。
- `tests/unit/aGroup114QuestionContent.spec.ts` 逐題驗證 114 年 50 題的新手系統教學內容；`tests/unit/aGroup114ContentReview.spec.ts` 與 `npm run check:a-group-114-content` 驗證 rubric 能抓出只給結論、跳過前置觀念、缺少規則來源或缺少常見陷阱的淺層解析。
- Component tests 覆蓋 AppShell 導覽、PWA 狀態列與題卡分區呈現。
- Playwright smoke 覆蓋 375px 手機導覽、A 組年度控制、114 年離線 reload，以及 `/a-group` cached navigation fallback。

## 私有內容範圍

- 題目來源資料只轉為 `src/modules/examGroups/aGroup/data/years/` 下的靜態 TypeScript 資料，不把私有 PDF 或筆記檔作為 public asset 發布。
- 後續內容匯入仍需遵守 AGENTS.md 的私有檔案限制；受限 `_private/_private_notes/` 與 `_private/_private_fileAssets/` 版本資料夾不得讀取或修改。
