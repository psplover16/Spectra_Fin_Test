## Why

使用者要把目前只有 placeholder 的 B 組與語言路由，擴充成可離線學習的年度逐題解析；同時先開一個未來可承載個人筆記的學習路由。現在 A 組已完成年度清單、進度狀態、lazy-loaded 年度資料與逐題解析 UI，可作為 B 組與語言的穩定範本。

## What Changes

- B 組新增 107 至 114 年度清單、年度申論解析頁、年度層級書籤與完成狀態。
- B 組內容來源為近 8 年資訊管理、程式設計 PDF；每年題數不固定，114 年預期 6 題但需由題目索引重新確認。
- 語言新增 107 至 112 年度清單與年度解析頁，英文題以英文老師、國二程度學生為教學設定。
- B 組與語言都採年度 PDF、題目索引、每批 2 至 3 題解析、校稿與寫入、測試或人工抽查、下一批的生產線。
- 需要作圖的題目另開圖解副代理產出文字圖解與 alt text；高風險題必須開第二解析副代理。
- 新增 /learning placeholder 路由與主導覽項目。
- B 組與語言年度資料必須 lazy import，清單頁不得一次載入所有年度逐題解析。

## Non-Goals

- 不補語言 113、114 年來源。
- 不建立正式 PNG、SVG 或其他圖像資產。
- 不設計學習路由的筆記資料模型、編輯流程或同步功能。
- 不決定 _private 內 Markdown 記憶檔是否納入 git。

## Capabilities

### New Capabilities

- b-group-essay-analysis: B 組年度申論題清單、年度解析頁、PDF 題目索引、批次解析流程、來源追蹤與廣告排除。
- language-question-analysis: 語言年度清單、國文與英文逐題解析、題型分類、英文老師教學設定與批次解析流程。
- learning-placeholder-route: 學習主路由 placeholder 與導覽可達性。

### Modified Capabilities

- exam-group-routing: 主要導覽新增學習，並支援 B 組與語言年度路由及 invalid year NotFound 行為。
- exam-learning-routes: 將舊五科目路由契約調整為組別導向入口、legacy redirect 與學習 placeholder 的路由中繼契約。

## Impact

- Affected specs: b-group-essay-analysis, language-question-analysis, learning-placeholder-route, exam-group-routing, exam-learning-routes
- Affected code:
  - New: src/modules/examGroups/bGroup/data/yearSummaries.ts, src/modules/examGroups/bGroup/data/years/114.ts, src/modules/examGroups/bGroup/composables/useBGroupYearQuestions.ts, src/modules/examGroups/bGroup/storage/bGroupProgressStorage.ts, src/modules/examGroups/bGroup/types/essayQuestionAnalysis.ts, src/modules/examGroups/bGroup/views/BGroupYearView.vue, src/modules/examGroups/bGroup/components/BGroupEssayQuestionCard.vue, src/modules/examGroups/language/data/yearSummaries.ts, src/modules/examGroups/language/data/years/112.ts, src/modules/examGroups/language/composables/useLanguageYearQuestions.ts, src/modules/examGroups/language/storage/languageProgressStorage.ts, src/modules/examGroups/language/types/languageQuestionAnalysis.ts, src/modules/examGroups/language/views/LanguageYearView.vue, src/modules/examGroups/language/components/LanguageQuestionCard.vue, src/modules/learning/views/LearningView.vue
  - Modified: src/app/router.ts, src/app/routePreload.ts, src/app/AppShell.vue, src/modules/examGroups/bGroup/views/BGroupView.vue, src/modules/examGroups/language/views/LanguageGroupView.vue, PROJECT_ARCHITECTURE.md, TEST_MATRIX.md, package.json, tests/unit, tests/e2e
  - Removed: none
