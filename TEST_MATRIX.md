# 測試矩陣

本矩陣對應 Spectra changes `rebuild-exam-pwa-group-year-analysis`、`complete-a-group-107-113-year-analyses` 與 `complete-b-group-language-learning-routes`，用來確認 group routes、A 組 107 至 114 逐題解析、B 組 107 至 114 申論解析、語言 107 至 112 自然題組解析、learning placeholder、PDF source index、PWA runtime 與 CI/CD 都有測試或人工驗證紀錄。

| Area | Coverage | Evidence |
| --- | --- | --- |
| Router | 根路由 redirect、primary group routes、legacy redirects、A/B 組 107 至 114 年、語言 107 至 112 年、語言 113/114 NotFound、`/learning` placeholder、invalid years。 | `tests/unit/groupRoutes.spec.ts`、`tests/unit/examLearningRoutes.spec.ts`、`tests/unit/LearningView.spec.ts`、`tests/e2e/group-routes.spec.ts` |
| Storage | A 組、B 組、語言 localStorage snapshot、單一 bookmark、completed years、完成已書籤年度會清 bookmark、壞 snapshot fail safe。 | `tests/unit/aGroupProgressStorage.spec.ts`、`tests/unit/bGroupProgressStorage.spec.ts`、`tests/unit/languageProgressStorage.spec.ts`、`tests/unit/aGroupYearSummaries.spec.ts`、`tests/unit/bGroupYearSummaries.spec.ts`、`tests/unit/languageYearSummaries.spec.ts` |
| Loader | A 組、B 組與語言年度題庫 lazy loader；列表頁只讀 summary，年度頁才 import 對應資料。 | `tests/unit/aGroupYearQuestionLoader.spec.ts`、`tests/unit/bGroupYearQuestionLoader.spec.ts`、`tests/unit/languageYearQuestionLoader.spec.ts`、`tests/unit/AGroupYearView.spec.ts`、`tests/unit/BGroupYearView.spec.ts`、`tests/unit/LanguageYearView.spec.ts`、build chunk 檢查 |
| Source baseline | 107 至 114 年 PDF sourceRef、題號連續、A-D 選項、官方答案與頁碼，並對缺題、缺選項、錯頁碼產生 finding。 | `tests/unit/aGroup107To113SourceBaselineValidation.spec.ts`、`tests/unit/aGroup107SourceBaseline.spec.ts` 到 `tests/unit/aGroup114SourceBaseline.spec.ts`、`npm run check:a-group-107-source-baseline` 到 `npm run check:a-group-113-source-baseline` |
| Source index | B 組 107 至 114 年與語言 107 至 112 年先建 source index，題數、kind、頁碼狀態、原文摘錄、萃取狀態與 `adContentRemoved` 可追蹤，語言不補 113/114。 | `tests/unit/bGroup107SourceIndex.spec.ts` 到 `tests/unit/bGroup114SourceIndex.spec.ts`、`tests/unit/language107SourceIndex.spec.ts` 到 `tests/unit/language112SourceIndex.spec.ts` |
| Question card | A 組、B 組與語言題卡皆分隔原題與教學內容，呈現 sourceRef；A 組題卡可呈現 optional `teachingTables`，B 組呈現申論擬答與評分重點，語言呈現答案解析、教學筆記、策略提醒、題組選項狀態。 | `tests/unit/AGroupQuestionCard.spec.ts`、`tests/unit/BGroupEssayQuestionCard.spec.ts`、`tests/unit/LanguageQuestionCard.spec.ts`、`tests/unit/BGroupYearView.spec.ts`、`tests/unit/LanguageYearView.spec.ts` |
| Question analysis shape | A 組 `ExamQuestionAnalysis` 維持原欄位，並允許 optional `teachingTables`；表格必須有 title、headers、rows，且每列 cell 數量等於 headers 數量。 | `tests/unit/questionAnalysisShape.spec.ts` |
| Systematic novice teaching | 107 至 114 年逐題解析採用新手系統教學標準，內容必須包含前置觀念、公式或規則來源、逐步套用、干擾選項錯因、可複用重點與常見陷阱；114 年 Q001-Q004 是 canonical examples，內容審查 rubric 會拒絕只給結論、跳過前置觀念、缺少規則來源、暫存骨架或缺少常見陷阱的淺層解析。 | `tests/unit/aGroup107QuestionContent.spec.ts` 到 `tests/unit/aGroup114QuestionContent.spec.ts`、`tests/unit/aGroup107ContentReview.spec.ts` 到 `tests/unit/aGroup114ContentReview.spec.ts`、`npm run check:a-group-107-content` 到 `npm run check:a-group-114-content` |
| B group essay content | B 組 107 至 114 年每年依 source index 寫入完整申論分析，批次為每批 2 至 3 題，保留題意拆解、擬答、細節、評分重點、常見錯誤、文字圖解、alt text 與人工複核狀態。 | `tests/unit/bGroup107QuestionContent.spec.ts` 到 `tests/unit/bGroup114QuestionContent.spec.ts`、`tests/unit/bGroup107ContentReview.spec.ts` 到 `tests/unit/bGroup114ContentReview.spec.ts`、`tests/unit/bGroupDiagramContent.spec.ts` |
| Language teaching content | 語言 107 至 112 年每年 6 筆自然題組解析，英文用國二程度英文老師語氣，國文聚焦作文結構與評分，批次為每批 2 至 3 題。 | `tests/unit/language107QuestionContent.spec.ts` 到 `tests/unit/language112QuestionContent.spec.ts`、`tests/unit/language107ContentReview.spec.ts` 到 `tests/unit/language112ContentReview.spec.ts`、`tests/unit/languageEnglishTeaching.spec.ts`、`tests/unit/languageChineseTeaching.spec.ts` |
| Diagram text / alt text | B 組與語言需要圖形、流程、表格或文本結構輔助的題目使用 `diagramInstructions` 與 `diagramAltText`；非圖解題保留明確不適用文字，不產生正式 PNG/SVG 資產。 | `tests/unit/bGroupDiagramContent.spec.ts`、`tests/unit/languageDiagramContent.spec.ts`、副代理唯讀校稿人工抽查 |
| Risky PDF extraction | 圖形、表格、程式碼、特殊符號、換行錯位與特殊答案題在人工確認前保持 `needs-review`，不得靜默標為 verified。 | `tests/unit/aGroupRiskyExtractionReview.spec.ts`、年度 content review wrapper confirmed list |
| PWA wrapper | `vite-plugin-pwa` runtime wrapper、不手動呼叫 `navigator.serviceWorker.register`、unsupported/updateAvailable 非阻斷狀態。 | `tests/unit/pwaRuntime.spec.ts`、`tests/unit/AppShell.spec.ts` |
| PWA output | production build 後 `dist/manifest.webmanifest` 與 `dist/sw.js` 存在，CI/CD 使用同一 gate。 | `scripts/check-pwa-output.mjs`、`npm run check:pwa-output`、`tests/unit/ciWorkflow.spec.ts`、`tests/unit/cdWorkflow.spec.ts` |
| Mobile/offline smoke | 375px 導覽、A 組年度控制、B 組年度頁、語言年度頁、`/learning`、invalid year、離線 route smoke、cached navigation fallback。 | `tests/e2e/group-routes.spec.ts`、Playwright screenshots attached in `test-results/` on smoke runs |

## 最近本機驗證

- `npm run lint`
- `npm run typecheck`
- `npm run test:unit`
- `npm run check:a-group-114-content`
- `npm run check:a-group-107-source-baseline` 到 `npm run check:a-group-113-source-baseline`
- `npm run check:a-group-107-content` 到 `npm run check:a-group-113-content`
- `npm run build`
- `npm run check:pwa-output`
- `npm run test:e2e -- --project=chromium`
- B 組年度分批驗證：`vitest run tests/unit/bGroup{year}SourceIndex.spec.ts tests/unit/bGroup{year}QuestionContent.spec.ts tests/unit/bGroup{year}ContentReview.spec.ts`
- 語言年度分批驗證：`vitest run tests/unit/language{year}SourceIndex.spec.ts tests/unit/language{year}QuestionContent.spec.ts tests/unit/language{year}ContentReview.spec.ts`

以上命令會在 8.2 再執行一次全量驗證作為最終 gate。
