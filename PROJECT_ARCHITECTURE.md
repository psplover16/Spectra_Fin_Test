# 專案架構紀錄

## 變更：rebuild-exam-pwa-group-year-analysis / complete-b-group-language-learning-routes

本專案目前是國營資訊職員考試講義 PWA。公開導覽已從舊科目路由改成組別導向：`/a-group`、`/b-group`、`/language`、`/learning`。A 組支援 107 至 114 年完整年度入口；B 組支援 107 至 114 年資訊管理與程式設計申論解析；語言只支援 107 至 112 年共同科目，不補 113/114；`/learning` 是未來筆記功能的 placeholder 路由。

## `src/app`

- `src/app/main.ts` 建立 Vue app、掛載 Vue Router，並以 `createPwaRuntime` 封裝 `vite-plugin-pwa` 的 runtime 狀態後 provide 給 AppShell。
- `src/app/AppShell.vue` 是手機優先的全站外殼，包含 A 組、B 組、語言、學習主導覽、active state、route preload 觸發，以及非阻斷 PWA 狀態列。
- `src/app/router.ts` 定義 group-first routing contract：`/` redirect 到 `/a-group`，舊科目路由 redirect 到 A/B 組，`/a-group/:year` 與 `/b-group/:year` 只接受 107 至 114，`/language/:year` 只接受 107 至 112，語言 113/114 與其他 invalid year 顯示 NotFound。
- `src/app/routePreload.ts` 集中 lazy route component loader，讓組別頁、年度解析頁與 `/learning` 可在 focus 或 pointerenter 時預載。
- `src/app/pwa.ts` 只暴露 `checking`、`ready`、`unsupported`、`error`、`updateAvailable` 狀態與 `updateServiceWorker` wrapper，不直接呼叫 `navigator.serviceWorker.register`。

## `src/modules/examGroups/`

- `src/modules/examGroups/aGroup/` 是 A 組 feature module，包含年度摘要、localStorage 進度、年度 loader、107 至 114 年資料、解析頁與題卡元件。
- `src/modules/examGroups/aGroup/data/yearSummaries.ts` 定義 114 至 107 年清單與 route path，`/a-group` 依序顯示八個 complete 年度。
- `src/modules/examGroups/aGroup/storage/aGroupProgressStorage.ts` 使用 versioned localStorage snapshot 保存 completed years 與單一 bookmark；壞 JSON、缺欄位或不支援版本會 fail safe。
- `src/modules/examGroups/aGroup/composables/useAGroupYearQuestions.ts` 以年度動態 import lazy load 107 至 114 年內容，避免初始頁一次載入全部題庫。
- `src/modules/examGroups/aGroup/data/years/{year}.ts` 組合 PDF 來源基準與 `{year}ReviewedAnalyses.ts`，交付每年 50 題 `ExamQuestionAnalysis`。
- `src/modules/examGroups/aGroup/data/years/{year}SourceBaseline.ts` 保留原題、A-D 選項、官方答案與 PDF sourceRef 對照；107 至 113 年共用 `sourceBaselineReview.ts` 進行缺題、缺選項、錯頁碼檢查。
- `src/modules/examGroups/aGroup/data/years/{year}ReviewedAnalyses.ts` 放置逐題教學解析、核心術語、解題步驟、選項辨析、重點整理與 tags；所有年度解析採用新手系統教學標準。A 組解析 shape 可選擇加入 `teachingTables`，用於比較、分類、流程、層級或公式對照題。
- `src/modules/examGroups/aGroup/data/years/{year}ContentReview.ts` 將年度資料接到共用 `contentReview.ts` rubric，檢查來源基準、資料 shape、逐選項辨析、疑義題註記、風險 PDF 抽取狀態與新手系統教學標準。
- `src/modules/examGroups/aGroup/data/years/riskyExtractionReview.ts` 登錄 107 至 113 PDF 盤點中需要人工確認的圖形、表格、程式碼、特殊符號與換行風險題；未確認前不得把 `sourceRef.extractionStatus` 靜默標成 `verified`。
- `src/modules/examGroups/aGroup/components/AGroupQuestionCard.vue` 將原題內容、官方答案檢查、教學解析、可選 `teachingTables` 與來源追溯分區呈現。
- `src/modules/examGroups/bGroup/` 是 B 組 feature module，包含 107 至 114 年 source index、年度 summary、localStorage 進度、年度 lazy loader、申論解析資料、文字圖解與題卡。
- `src/modules/examGroups/bGroup/data/sourceIndex.ts` 是 B 組題數與來源追蹤的單一來源；`B_GROUP_YEAR_SUMMARIES` 從 source index 推導題數與 `indexed` / `pending-review` 狀態。
- `src/modules/examGroups/bGroup/storage/bGroupProgressStorage.ts` 使用 `finpub:b-group-progress:v1` 保存 versioned snapshot、completed years 與單一 bookmark；壞 snapshot fail safe。
- `src/modules/examGroups/bGroup/composables/useBGroupYearQuestions.ts` 以年度動態 import lazy load 107 至 114 年內容；列表頁只讀 summary，不載入所有申論解析。
- `src/modules/examGroups/bGroup/components/BGroupEssayQuestionCard.vue` 分區呈現原題、子題、題意拆解、擬答、文字圖解、alt text、評分重點、常見錯誤與來源追蹤。
- `src/modules/examGroups/language/` 是語言 feature module，只收 107 至 112 年共同科目。英文以國二程度英文老師語氣，用繁體中文講解文法、字彙、克漏字與閱讀策略；國文聚焦作文審題、結構、例證與評分重點。
- `src/modules/examGroups/language/data/sourceIndex.ts` 以自然題組建立 source index，每年 6 筆，先分類 `kind` 再寫解析；`LANGUAGE_YEAR_SUMMARIES` 從 source index 推導題數，且不包含 113/114。
- `src/modules/examGroups/language/storage/languageProgressStorage.ts` 使用 `finpub:language-progress:v1` 保存 versioned snapshot、completed years 與單一 bookmark；壞 snapshot fail safe。
- `src/modules/examGroups/language/composables/useLanguageYearQuestions.ts` 以年度動態 import lazy load 107 至 112 年內容；列表頁只讀 summary。
- `src/modules/examGroups/language/components/LanguageQuestionCard.vue` 分區呈現原題、題組選項狀態、答案解析、教學筆記、策略提醒、文字圖解、alt text 與來源追蹤。
- `src/modules/learning/views/LearningView.vue` 是 `/learning` placeholder。它不讀寫筆記 storage、不提供筆記 CRUD，也不宣稱已有學習功能。

## A 組內容範圍

- 107 至 114 年皆為完整年度入口，頁面顯示 50 題解析、官方答案狀態與 PDF 來源追溯。
- 每題解析都必須把讀者視為第一次接觸該觀念的新手；`beginnerExplanation` 說明前置觀念、公式或規則來源、適用條件與容易混淆的邊界，`solvingSteps` 把規則逐步套回題目具體值或選項，`optionExplanations` 說明 A-D 干擾選項錯在哪個條件，`keyTakeaways` 留下可複用規則與常見陷阱。
- `teachingTables` 只在能提升理解時使用，例如 114-Q003 的 Python 主要型別與 list、tuple、set 比較表；每張表都必須有 title、headers、rows，且每列欄位數必須等於 headers 數量。
- 多答案與送分題以多個 `acceptedAnswers` 保留官方疑義，並以 `answerVerification: needs-review` 或 `suspected-error` 搭配 `answerNote` 說明。
- invalid year，例如 `/a-group/115`、`/a-group/999`、`/a-group/abc`，不 redirect，直接顯示 NotFound。
- B 組與語言已各自具備年度資料模組，但資料形狀不與 A 組抽象共用；A 組仍維持選擇題逐題資料與官方答案基準。

## B 組與語言內容生產節奏

- 每個年度先從 PDF 建 source index，再依 source index 寫入年度資料；年度題數不得硬編固定值。
- 內容節奏固定為：年度 PDF -> 題目索引 -> 第 1 批 2 至 3 題解析 -> 校稿 + 寫入資料模型 -> 跑測試/人工抽查 -> 下一批。
- 需要圖形、流程、表格或文本結構輔助的題目，只交付 `diagramInstructions` 與 `diagramAltText`，不產生正式 PNG、SVG 或其他圖像資產。
- 圖解題另開副代理做唯讀校稿；高風險題或 PDF 萃取有疑義時，`sourceRef.extractionStatus` 或 `reviewStatus` 保持 `needs-review`，不得靜默標成 `verified`。
- 廣告浮水印、網址、聯絡資訊或行銷句不得進入 app-facing content；sourceRef 以 `adContentRemoved: true` 記錄已排除。

## PWA Runtime

- `vite.config.ts` 使用 `vite-plugin-pwa` 產生 manifest 與 generated service worker，production build 後應有 `dist/manifest.webmanifest` 與 `dist/sw.js`。
- manifest 的 `start_url` 與 `scope` 由 `VITE_APP_BASE_PATH` 推導，`main` 使用 `/Spectra_Fin_Test/`，`dev` 使用 `/Spectra_Fin_Test/staging/`。
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

- Router 與 route smoke 覆蓋 group routes、legacy redirects、A/B 組 107 至 114 年、語言 107 至 112 年、`/learning`、invalid years。
- Storage tests 覆蓋 A 組、B 組與語言 bookmark、completed years、完成已書籤年度清 bookmark、壞 snapshot fail safe。
- Loader 與 data tests 覆蓋 A 組年度 50 題、B 組 107 至 114 年 source index 與申論解析、語言 107 至 112 年 source index 與自然題組解析。
- `tests/unit/aGroup{year}QuestionContent.spec.ts` 逐題驗證 107 至 114 年的新手系統教學內容；`tests/unit/aGroup{year}ContentReview.spec.ts` 與 `npm run check:a-group-{year}-content` 驗證 rubric 能抓出只給結論、跳過前置觀念、缺少規則來源或缺少常見陷阱的淺層解析。`tests/unit/AGroupQuestionCard.spec.ts` 與 `tests/unit/questionAnalysisShape.spec.ts` 另外覆蓋 `teachingTables` rendering 與資料 shape。
- `tests/unit/bGroup{year}QuestionContent.spec.ts`、`tests/unit/bGroup{year}ContentReview.spec.ts` 驗證 B 組 source trace、批次大小、申論內容完整性與圖解文字。
- `tests/unit/language{year}QuestionContent.spec.ts`、`tests/unit/language{year}ContentReview.spec.ts` 驗證語言 source trace、每批 2 至 3 題、國英文教學設定與自然題組內容完整性。
- `tests/unit/bGroupDiagramContent.spec.ts`、`tests/unit/languageDiagramContent.spec.ts` 驗證文字圖解與 alt text，不要求正式圖片資產。
- Component tests 覆蓋 AppShell 導覽、PWA 狀態列與題卡分區呈現。
- Playwright smoke 覆蓋 375px 手機導覽、A 組年度控制、B 組年度頁、語言年度頁、`/learning`、invalid year、離線 route smoke，以及 cached navigation fallback。

## 私有內容範圍

- 題目來源資料只轉為 `src/modules/examGroups/aGroup/data/years/` 下的靜態 TypeScript 資料，不把私有 PDF 或筆記檔作為 public asset 發布。
- 後續內容匯入仍需遵守 AGENTS.md 的私有檔案限制；受限 `_private/_private_notes/` 與 `_private/_private_fileAssets/` 版本資料夾不得讀取或修改。
