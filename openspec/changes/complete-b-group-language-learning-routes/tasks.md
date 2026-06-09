## 1. 路由與主導覽契約

- [x] 1.1 交付 `Group Routes Are Primary Navigation`、`Five exam learning routes`、`Route metadata shape` 與 design「新增學習 placeholder 並更新主導覽」：主導覽顯示 A 組、B 組、語言、學習，root 仍導向 `/a-group`，legacy subject routes 只做 redirect；以 `tests/unit/groupRoutes.spec.ts`、`tests/unit/AppShell.spec.ts`、`tests/unit/examLearningRoutes.spec.ts` 驗證。
- [x] 1.2 交付 `B Group Year Routes Resolve Valid Years` 與 `Invalid B Group Years Render NotFound`：`/b-group/107` 至 `/b-group/114` 進年度頁，`/b-group/115`、`/b-group/999`、`/b-group/abc` 顯示 NotFound；以 `tests/unit/groupRoutes.spec.ts` 與 `tests/e2e/group-routes.spec.ts` 驗證。
- [x] 1.3 交付 `Language Year Routes Resolve Source Years` 與 `Invalid Language Years Render NotFound`：`/language/107` 至 `/language/112` 進年度頁，`/language/113`、`/language/114`、`/language/115`、`/language/999`、`/language/abc` 顯示 NotFound；以 `tests/unit/groupRoutes.spec.ts` 與 `tests/e2e/group-routes.spec.ts` 驗證。
- [x] 1.4 交付 `Learning Placeholder Route Is Reachable`、`Learning Navigation Item Is Primary Navigation`、`Learning Placeholder Does Not Implement Notes` 與 `Placeholder learning content`：`/learning` 有非空 placeholder、主導覽 active state 正確、不讀寫筆記 storage、不顯示筆記 CRUD；以 `tests/unit/LearningView.spec.ts`、`tests/unit/AppShell.spec.ts` 驗證。
- [x] 1.5 交付 `Learning Placeholder Supports Route Preload And Offline Shell` 與 design「延續 lazy import 與離線優先驗證」：`routePreload` 可預載 `/learning`、B 組與語言年度 route，375px 手機與離線 cached navigation smoke 可用；以 `tests/unit/routePreload.spec.ts`、`tests/e2e/group-routes.spec.ts` 驗證。

## 2. B 組資料骨架、進度與來源索引

- [x] 2.1 [P] 依 design「沿用 A 組年度模組模式」交付 `B Group Year List Shows Indexed Years`：`/b-group` 顯示 114 至 107 年且題數來自年度 source index；以 `tests/unit/bGroupYearSummaries.spec.ts` 與 `tests/unit/BGroupView.spec.ts` 驗證。
- [x] 2.2 [P] 依 design「以 localStorage 保存年度進度」交付 `B Group Progress Controls Mirror A Group Behavior`：B 組單一 bookmark、completed years、完成已書籤年度清 bookmark、控制區不導航、壞 snapshot fail safe；以 `tests/unit/bGroupProgressStorage.spec.ts` 與 `tests/unit/BGroupView.spec.ts` 驗證。
- [x] 2.3 [P] 依 design「延續 lazy import 與離線優先驗證」交付 `B Group Year Data Loads Lazily`：列表頁只讀 summary，年度頁只 lazy import 該年度資料；以 `tests/unit/bGroupYearQuestionLoader.spec.ts` 與 build chunk 檢查驗證。
- [x] 2.4 [P] 交付 `B Group Essay Analysis Data Shape Is Traceable`：`BGroupEssayQuestionAnalysis` 與 sourceRef 欄位可驗證，廣告文字不進 app-facing content；以 `tests/unit/bGroupQuestionAnalysisShape.spec.ts` 與 `tests/unit/bGroupSourceTrace.spec.ts` 驗證。
- [x] 2.5 [P] 依 design「以題目索引決定年度題數」交付 114 年 `B Group Source Index Precedes Question Analysis`：從 114 PDF 建 source index，題號、頁碼狀態、原文摘錄、萃取狀態與 adContentRemoved 可追蹤，題數不硬編固定值；以 `tests/unit/bGroup114SourceIndex.spec.ts` 驗證。
- [x] 2.6 [P] 依 design「以題目索引決定年度題數」交付 113 年 `B Group Source Index Precedes Question Analysis`：從 113 PDF 建 source index，題號、頁碼狀態、原文摘錄、萃取狀態與 adContentRemoved 可追蹤；以 `tests/unit/bGroup113SourceIndex.spec.ts` 驗證。
- [x] 2.7 [P] 依 design「以題目索引決定年度題數」交付 112 年 `B Group Source Index Precedes Question Analysis`：從 112 PDF 建 source index，題號、頁碼狀態、原文摘錄、萃取狀態與 adContentRemoved 可追蹤；以 `tests/unit/bGroup112SourceIndex.spec.ts` 驗證。
- [x] 2.8 [P] 依 design「以題目索引決定年度題數」交付 111 年 `B Group Source Index Precedes Question Analysis`：從 111 PDF 建 source index，題號、頁碼狀態、原文摘錄、萃取狀態與 adContentRemoved 可追蹤；以 `tests/unit/bGroup111SourceIndex.spec.ts` 驗證。
- [x] 2.9 [P] 依 design「以題目索引決定年度題數」交付 110 年 `B Group Source Index Precedes Question Analysis`：從 110 PDF 建 source index，題號、頁碼狀態、原文摘錄、萃取狀態與 adContentRemoved 可追蹤；以 `tests/unit/bGroup110SourceIndex.spec.ts` 驗證。
- [x] 2.10 [P] 依 design「以題目索引決定年度題數」交付 109 年 `B Group Source Index Precedes Question Analysis`：從 109 PDF 建 source index，題號、頁碼狀態、原文摘錄、萃取狀態與 adContentRemoved 可追蹤；以 `tests/unit/bGroup109SourceIndex.spec.ts` 驗證。
- [x] 2.11 [P] 依 design「以題目索引決定年度題數」交付 108 年 `B Group Source Index Precedes Question Analysis`：從 108 PDF 建 source index，題號、頁碼狀態、原文摘錄、萃取狀態與 adContentRemoved 可追蹤；以 `tests/unit/bGroup108SourceIndex.spec.ts` 驗證。
- [x] 2.12 [P] 依 design「以題目索引決定年度題數」交付 107 年 `B Group Source Index Precedes Question Analysis`：從 107 PDF 建 source index，題號、頁碼狀態、原文摘錄、萃取狀態與 adContentRemoved 可追蹤；以 `tests/unit/bGroup107SourceIndex.spec.ts` 驗證。

## 3. B 組解析批次、圖解與年度頁

- [x] 3.1 [P] 依 design「以文字圖解與 alt text 交付作圖題」交付 `B Group Diagram Questions Use Text Diagram And Alt Text`：需要圖形、流程、表格或架構關係的 B 組題目另開圖解副代理，寫入精準 `diagramInstructions` 與 `diagramAltText`，不產生正式圖片資產；以 `tests/unit/bGroupDiagramContent.spec.ts` 與人工抽查驗證。
- [x] 3.2 [P] 交付 `B Group Year Page Separates Original And Teaching Content`：年度頁與題卡清楚分隔原題、題意拆解、擬答、評分重點、常見錯誤與來源追蹤；以 `tests/unit/BGroupEssayQuestionCard.spec.ts`、`tests/unit/BGroupYearView.spec.ts` 驗證。
- [x] 3.3 [P] 交付 114 年 `B Group Batch Review Uses Controlled Work Units` 與 `B Group Content Completeness Is Validated`：依 source index 每批 2 至 3 題解析，必要時開第二解析副代理，寫入完整 114 年 reviewed analyses；以 `tests/unit/bGroup114QuestionContent.spec.ts`、`tests/unit/bGroup114ContentReview.spec.ts`、人工抽查驗證。
- [x] 3.4 [P] 交付 113 年 `B Group Batch Review Uses Controlled Work Units` 與 `B Group Content Completeness Is Validated`：依 source index 每批 2 至 3 題解析，必要時開第二解析副代理，寫入完整 113 年 reviewed analyses；以 `tests/unit/bGroup113QuestionContent.spec.ts`、`tests/unit/bGroup113ContentReview.spec.ts`、人工抽查驗證。
- [x] 3.5 [P] 交付 112 年 `B Group Batch Review Uses Controlled Work Units` 與 `B Group Content Completeness Is Validated`：依 source index 每批 2 至 3 題解析，必要時開第二解析副代理，寫入完整 112 年 reviewed analyses；以 `tests/unit/bGroup112QuestionContent.spec.ts`、`tests/unit/bGroup112ContentReview.spec.ts`、人工抽查驗證。
- [x] 3.6 [P] 交付 111 年 `B Group Batch Review Uses Controlled Work Units` 與 `B Group Content Completeness Is Validated`：依 source index 每批 2 至 3 題解析，必要時開第二解析副代理，寫入完整 111 年 reviewed analyses；以 `tests/unit/bGroup111QuestionContent.spec.ts`、`tests/unit/bGroup111ContentReview.spec.ts`、人工抽查驗證。
- [x] 3.7 [P] 交付 110 年 `B Group Batch Review Uses Controlled Work Units` 與 `B Group Content Completeness Is Validated`：依 source index 每批 2 至 3 題解析，必要時開第二解析副代理，寫入完整 110 年 reviewed analyses；以 `tests/unit/bGroup110QuestionContent.spec.ts`、`tests/unit/bGroup110ContentReview.spec.ts`、人工抽查驗證。
- [x] 3.8 [P] 交付 109 年 `B Group Batch Review Uses Controlled Work Units` 與 `B Group Content Completeness Is Validated`：依 source index 每批 2 至 3 題解析，必要時開第二解析副代理，寫入完整 109 年 reviewed analyses；以 `tests/unit/bGroup109QuestionContent.spec.ts`、`tests/unit/bGroup109ContentReview.spec.ts`、人工抽查驗證。
- [x] 3.9 [P] 交付 108 年 `B Group Batch Review Uses Controlled Work Units` 與 `B Group Content Completeness Is Validated`：依 source index 每批 2 至 3 題解析，必要時開第二解析副代理，寫入完整 108 年 reviewed analyses；以 `tests/unit/bGroup108QuestionContent.spec.ts`、`tests/unit/bGroup108ContentReview.spec.ts`、人工抽查驗證。
- [x] 3.10 [P] 交付 107 年 `B Group Batch Review Uses Controlled Work Units` 與 `B Group Content Completeness Is Validated`：依 source index 每批 2 至 3 題解析，必要時開第二解析副代理，寫入完整 107 年 reviewed analyses；以 `tests/unit/bGroup107QuestionContent.spec.ts`、`tests/unit/bGroup107ContentReview.spec.ts`、人工抽查驗證。

## 4. 語言資料骨架、進度與來源索引

- [x] 4.1 [P] 依 design「沿用 A 組年度模組模式」交付 `Language Year List Shows Source Years Only`：`/language` 只顯示 112 至 107 年，113 與 114 不出現在清單；以 `tests/unit/languageYearSummaries.spec.ts` 與 `tests/unit/LanguageGroupView.spec.ts` 驗證。
- [x] 4.2 [P] 依 design「以 localStorage 保存年度進度」交付 `Language Progress Controls Mirror A Group Behavior`：語言單一 bookmark、completed years、完成已書籤年度清 bookmark、控制區不導航、壞 snapshot fail safe；以 `tests/unit/languageProgressStorage.spec.ts` 與 `tests/unit/LanguageGroupView.spec.ts` 驗證。
- [x] 4.3 [P] 依 design「延續 lazy import 與離線優先驗證」交付 `Language Year Data Loads Lazily`：列表頁只讀 summary，年度頁只 lazy import 該年度資料；以 `tests/unit/languageYearQuestionLoader.spec.ts` 與 build chunk 檢查驗證。
- [x] 4.4 [P] 交付 `Language Question Analysis Data Shape Is Traceable`：`LanguageQuestionAnalysis` 支援選擇題、閱讀、作文與開放題，sourceRef 可追蹤，選擇題保留原始選項與答案辨析；以 `tests/unit/languageQuestionAnalysisShape.spec.ts` 與 `tests/unit/languageSourceTrace.spec.ts` 驗證。
- [x] 4.5 [P] 交付 112 年 `Language Source Index Classifies Question Kind Before Analysis`：source index 先分類 `kind` 再派工解析，題數、頁碼狀態、原文摘錄與 adContentRemoved 可追蹤；以 `tests/unit/language112SourceIndex.spec.ts` 驗證。
- [x] 4.6 [P] 交付 111 年 `Language Source Index Classifies Question Kind Before Analysis`：source index 先分類 `kind` 再派工解析，題數、頁碼狀態、原文摘錄與 adContentRemoved 可追蹤；以 `tests/unit/language111SourceIndex.spec.ts` 驗證。
- [x] 4.7 [P] 交付 110 年 `Language Source Index Classifies Question Kind Before Analysis`：source index 先分類 `kind` 再派工解析，題數、頁碼狀態、原文摘錄與 adContentRemoved 可追蹤；以 `tests/unit/language110SourceIndex.spec.ts` 驗證。
- [x] 4.8 [P] 交付 109 年 `Language Source Index Classifies Question Kind Before Analysis`：source index 先分類 `kind` 再派工解析，題數、頁碼狀態、原文摘錄與 adContentRemoved 可追蹤；以 `tests/unit/language109SourceIndex.spec.ts` 驗證。
- [x] 4.9 [P] 交付 108 年 `Language Source Index Classifies Question Kind Before Analysis`：source index 先分類 `kind` 再派工解析，題數、頁碼狀態、原文摘錄與 adContentRemoved 可追蹤；以 `tests/unit/language108SourceIndex.spec.ts` 驗證。
- [x] 4.10 [P] 交付 107 年 `Language Source Index Classifies Question Kind Before Analysis`：source index 先分類 `kind` 再派工解析，題數、頁碼狀態、原文摘錄與 adContentRemoved 可追蹤；以 `tests/unit/language107SourceIndex.spec.ts` 驗證。

## 5. 語言解析批次、教學設定與年度頁

- [x] 5.1 [P] 交付 `Language English Teaching Uses Junior-High Friendly Instruction`：英文題以英文老師教國二程度學生的語氣，用繁體中文解釋規則並在必要時加入英文例句；以 `tests/unit/languageEnglishTeaching.spec.ts` 與人工抽查驗證。
- [x] 5.2 [P] 交付 `Language Chinese Teaching Focuses On Exam Reading And Writing`：國文題提供文意證據、字詞用法、作文架構、評分重點與常見錯誤提醒；以 `tests/unit/languageChineseTeaching.spec.ts` 與人工抽查驗證。
- [x] 5.3 [P] 依 design「以文字圖解與 alt text 交付作圖題」交付 `Language Diagram Questions Use Text Diagram And Alt Text`：需要文本結構圖、表格或關係圖的語言題另開圖解副代理，寫入精準 `diagramInstructions` 與 `diagramAltText`；以 `tests/unit/languageDiagramContent.spec.ts` 與人工抽查驗證。
- [x] 5.4 [P] 交付語言年度頁與題卡呈現：原題、選項或開放作答、答案解析、教學筆記、策略提醒與來源追蹤可讀且手機不溢出；以 `tests/unit/LanguageQuestionCard.spec.ts`、`tests/unit/LanguageYearView.spec.ts`、375px 手動檢查驗證。
- [x] 5.5 [P] 交付 112 年 `Language Batch Review Uses Controlled Work Units` 與 `Language Content Completeness Is Validated`：依 source index 每批 2 至 3 題解析，必要時開第二解析副代理，寫入完整 112 年 reviewed analyses；以 `tests/unit/language112QuestionContent.spec.ts`、`tests/unit/language112ContentReview.spec.ts`、人工抽查驗證。
- [x] 5.6 [P] 交付 111 年 `Language Batch Review Uses Controlled Work Units` 與 `Language Content Completeness Is Validated`：依 source index 每批 2 至 3 題解析，必要時開第二解析副代理，寫入完整 111 年 reviewed analyses；以 `tests/unit/language111QuestionContent.spec.ts`、`tests/unit/language111ContentReview.spec.ts`、人工抽查驗證。
- [x] 5.7 [P] 交付 110 年 `Language Batch Review Uses Controlled Work Units` 與 `Language Content Completeness Is Validated`：依 source index 每批 2 至 3 題解析，必要時開第二解析副代理，寫入完整 110 年 reviewed analyses；以 `tests/unit/language110QuestionContent.spec.ts`、`tests/unit/language110ContentReview.spec.ts`、人工抽查驗證。
- [x] 5.8 [P] 交付 109 年 `Language Batch Review Uses Controlled Work Units` 與 `Language Content Completeness Is Validated`：依 source index 每批 2 至 3 題解析，必要時開第二解析副代理，寫入完整 109 年 reviewed analyses；以 `tests/unit/language109QuestionContent.spec.ts`、`tests/unit/language109ContentReview.spec.ts`、人工抽查驗證。
- [x] 5.9 [P] 交付 108 年 `Language Batch Review Uses Controlled Work Units` 與 `Language Content Completeness Is Validated`：依 source index 每批 2 至 3 題解析，必要時開第二解析副代理，寫入完整 108 年 reviewed analyses；以 `tests/unit/language108QuestionContent.spec.ts`、`tests/unit/language108ContentReview.spec.ts`、人工抽查驗證。
- [x] 5.10 [P] 交付 107 年 `Language Batch Review Uses Controlled Work Units` 與 `Language Content Completeness Is Validated`：依 source index 每批 2 至 3 題解析，必要時開第二解析副代理，寫入完整 107 年 reviewed analyses；以 `tests/unit/language107QuestionContent.spec.ts`、`tests/unit/language107ContentReview.spec.ts`、人工抽查驗證。

## 6. 文件、規格同步與最終驗證

- [x] 6.1 更新 `PROJECT_ARCHITECTURE.md`：B 組、語言、learning route、source index、批次副代理節奏、localStorage key 與 lazy import 行為成為文件真相；以 `tests/unit/projectArchitectureDoc.spec.ts` 驗證。
- [x] 6.2 更新 `TEST_MATRIX.md`：新增 B 組、語言、learning、source index、diagram text/alt text、離線 smoke 與內容審查證據；以 `tests/unit/testMatrixDoc.spec.ts` 驗證。
- [x] 6.3 跑年度與內容分批驗證：B 組與語言每個年度完成後執行該年度 source index、question content、content review 測試，且人工抽查記錄包含高風險題與圖解題；以各年度 `vitest run` 指令與人工抽查紀錄驗證。
- [x] 6.4 跑完整品質 gate：`npm run lint`、`npm run typecheck`、`npm run test:unit`、`npm run build`、`npm run check:pwa-output`、`npm run test:e2e` 全部通過，且 build output 沒有 UTF-8 亂碼、BOM 可見字元或手機水平溢出；以命令輸出與 375px Playwright/人工截圖驗證。
