## Context

目前 PWA 已採組別導向：`/a-group` 是主要入口，`/b-group` 與 `/language` 只有 placeholder，舊科目路由會 redirect 到 A/B 組。A 組已完成 107 至 114 年年度清單、年度解析頁、逐題資料、來源追蹤、年度 lazy import、localStorage 進度與手機優先 UI，可作為本 change 的行為基準。

B 組來源是 `_private/資訊管理、程式設計/` 的 107 至 114 年 PDF；語言來源只使用 `_private/國文、英文/` 的 107 至 112 年 PDF，暫不補 113 與 114。使用者要求每年題目數不可硬編為固定值，必須先由 PDF 轉 Markdown 或其他萃取流程建立題目索引，再依索引寫入資料模型。需要作圖的題目不產生正式 PNG 或 SVG 資產，而是產出精準的文字圖解與 alt text。未來可能有個人筆記，但目前只開 `/learning` 路由。

## Goals / Non-Goals

**Goals:**

- 讓 B 組 107 至 114 年與語言 107 至 112 年具備年度清單、年度解析頁、資料模型、來源追蹤、lazy import 與年度層級進度控制。
- 讓 B 組與語言 UI 行為與 A 組一致：列表主區可進年度頁，書籤與完成控制不觸發導航，完成目前書籤年度會清除書籤，壞 localStorage snapshot fail safe。
- 建立內容生產節奏：年度 PDF、題目索引、每批 2 至 3 題解析、校稿與寫入資料模型、測試或人工抽查、下一批。
- 把圖解副代理與高風險第二解析副代理寫成 apply 階段的明確工作門檻。
- 新增 `/learning` placeholder 路由與主導覽項目，但不設計筆記功能。

**Non-Goals:**

- 不把 `_private` PDF、Markdown 中繼檔或正式圖像資產放入 public asset。
- 不補語言 113、114 年，也不以外部來源補齊缺年。
- 不引入 Pinia store、IndexedDB、後端 API、登入、同步或 analytics。
- 不把 B 組申論題改造成四選一測驗；若來源是申論或問答題，資料模型保留申論解答與評分重點。
- 不在 `/learning` 建立筆記資料模型、編輯器、列表、搜尋或匯出。

## Decisions

### 沿用 A 組年度模組模式

B 組與語言各自建立 feature module，維持 `data/yearSummaries.ts`、`data/years/{year}.ts`、`composables/use...YearQuestions.ts`、`storage/...ProgressStorage.ts`、`types/...Analysis.ts`、年度列表 view、年度解析 view 與題卡 component 的結構。UI 借鏡 A 組，但 B 組題卡呈現申論題幹、題意拆解、擬答、評分重點、常見錯誤與文字圖解；語言題卡呈現題型、國文/英文解析、必要例句、閱讀策略或作文評分重點。

替代方案：抽出一套完全共用的 group year framework。淘汰原因是 A/B/語言資料形狀差異很大，過早抽象會讓申論、語言題與 A 組選擇題彼此牽制。

### 以題目索引決定年度題數

每個年度先建立 source index，再產生年度資料。`questionCount` 與年度資料長度必須由該年度索引決定；如果某年度索引確認 6 題，清單與資料都顯示 6 題，但 router、loader 與測試不可把所有年度固定成 6 題。索引欄位包含年度、題號、科目、題型、來源檔名、頁碼或待確認頁碼、原始摘錄、萃取狀態與廣告排除註記。

替代方案：直接從 PDF 逐題寫入正式資料。淘汰原因是題數與頁碼容易在 PDF 轉 Markdown 時出錯，先建索引能讓副代理、校稿與測試有共同基準。

### 以文字圖解與 alt text 交付作圖題

作圖題或需要圖形理解的題目，在資料模型中使用 `diagramInstructions` 與 `diagramAltText`，內容必須足以讓讀者照文字重建關係、流程、表格或圖形重點。apply 階段遇到圖解題要另開圖解副代理產出草稿，再由主流程校稿後寫入資料。正式 PNG、SVG 或其他圖像資產不在本 change 範圍。

替代方案：先用 AI 產生圖片資產。淘汰原因是考題圖解需要可驗證、可搜尋且離線穩定的文本描述；正式圖片資產會引入資產管理、可及性與校稿成本。

### 以 localStorage 保存年度進度

B 組與語言沿用 A 組的 versioned localStorage snapshot。`BGroupProgressSnapshot` 與 `LanguageProgressSnapshot` state shape 均包含 `version: 1`、`completedYears: Year[]`、`bookmark: { year, updatedAt } | null`、`updatedAt: string | null`。讀取壞 JSON、缺欄位、不支援版本或非合法年度時回傳空 snapshot；寫入時只保存合法年度與單一 bookmark。Pinia 不保存這些年度進度，IndexedDB 不使用於本 change。

替代方案：新增 Pinia store 並同步 localStorage。淘汰原因是目前狀態量很小，A 組已用純 storage helper 穩定處理，新增 store 只會增加測試面與初始化複雜度。

### 新增學習 placeholder 並更新主導覽

AppShell 主導覽改成 A 組、B 組、語言、學習四項；`/learning` 渲染非空 placeholder，說明未來學習筆記區尚未建立，但不得提供假的筆記 CRUD。root 仍 redirect 到 `/a-group`，舊科目路由仍 redirect 到 A/B 組，unknown route 仍使用 NotFound。`exam-learning-routes` 的舊五科目入口契約同步調整，避免 active spec 與新導覽互相矛盾。

替代方案：把 `/learning` 放在 `/a-group` 或只在隱藏路由中保留。淘汰原因是使用者要求先開「學習」路由，主導覽可達能降低之後功能銜接成本。

### 延續 lazy import 與離線優先驗證

B 組與語言年度資料使用年度動態 import；列表頁只載入年度 summary，不載入所有逐題解析。route preload 支援 group list、year route 與 learning placeholder，但 hover/focus 預載失敗不得阻斷導航。所有資料是靜態 TypeScript 內容，PWA build 後可被 service worker 快取，離線 reload 與 cached navigation fallback 必須維持。

替代方案：把所有年度資料集中成單一檔案。淘汰原因是 B 組與語言內容量會逐年擴大，集中檔案會提高初始 bundle 與手機載入成本。

## Implementation Contract

B 組 observable behavior：`/b-group` 顯示 114、113、112、111、110、109、108、107 的年度列，順序由新 `B_GROUP_YEAR_SUMMARIES` 定義；每列顯示年度、狀態、索引確認後的題數、進度狀態與三個可操作區域：主區導航、書籤、完成。`/b-group/:year` 僅接受 107 至 114；有效年度渲染完整 B 組申論解析頁，無效年度或非數字參數渲染 NotFound。

B 組 data shape：`BGroupEssayQuestionAnalysis` 包含 `year`、`number`、`subject`、`sourceBatch`、`examPoints`、`difficulty`、`questionType`、`originalQuestion`、`questionExplanation`、`modelAnswer`、`modelAnswerDetails`、`diagramInstructions`、`diagramAltText`、`keyTerms`、`scoringPoints`、`commonMistakes`、`handoutRefs`、`sourceRef`、`reviewStatus`。`sourceRef` 包含 `fileName`、`pageNumber` 或待確認頁碼狀態、`originalExcerpt`、`extractionStatus`、`adContentRemoved`。申論題沒有 A-D 選項；若來源出現子題或選擇式片段，資料模型以 typed child items 表示，不假裝成 A 組選擇題。

語言 observable behavior：`/language` 顯示 112、111、110、109、108、107 的年度列；`/language/:year` 僅接受 107 至 112；113、114、115、999 或非數字參數渲染 NotFound。英文題的解析語氣採英文老師教國二程度學生，主體使用繁體中文，必要時放英文例句。國文題保留文本理解、文意判斷、作文或字詞用法的解析重點。

語言 data shape：`LanguageQuestionAnalysis` 包含 `year`、`number`、`subject`、`kind`、`sourceBatch`、`examPoints`、`difficulty`、`questionType`、`originalQuestion`、`choices`、`acceptedAnswers`、`answerExplanation`、`teachingNotes`、`strategyTips`、`diagramInstructions`、`diagramAltText`、`handoutRefs`、`sourceRef`、`reviewStatus`。有選項的題目必須保留所有原始選項與答案辨析；作文或開放題可讓 `choices` 與 `acceptedAnswers` 為空陣列，但必須有評分重點與範文或架構。

內容生產 failure modes：每個年度必須先有題目索引。題目索引未確認、原始摘錄缺失、頁碼不明、PDF 萃取有圖表/程式碼/特殊符號風險、答案有疑義或主解析不確定時，`reviewStatus` 或 `sourceRef.extractionStatus` 必須保持待確認，不得標成 verified。若來源文字含廣告浮水印、網址、聯絡資訊或行銷句，寫入 `src/` 前必須排除，並把 `adContentRemoved` 設為 true。

學習 route behavior：`/learning` 渲染手機可讀、非空且不崩潰的 placeholder，主導覽有 active state 與 preload。placeholder 不讀寫 localStorage，不建立筆記資料，也不宣稱已有功能。

Acceptance criteria：實作完成時需通過 `npm run lint`、`npm run typecheck`、`npm run test:unit`、`npm run build`、`npm run check:pwa-output`、`npm run test:e2e`。新增或更新的單元測試須覆蓋 B 組/語言年度 summary、year loader、資料 shape、source index completeness、progress storage fail safe、route preload、AppShell nav、NotFound year boundary、內容完整性 rubric。E2E 至少覆蓋 375px 手機導覽、B 組年度頁、語言年度頁、`/learning`、invalid year 與離線 cached navigation smoke。`PROJECT_ARCHITECTURE.md` 與 `TEST_MATRIX.md` 必須同步更新。

Scope boundaries：本 change 只交付 B 組、語言與學習 placeholder 的路由、資料、解析、進度、測試與文件。不交付正式圖像資產、個人筆記功能、同步功能、語言 113/114 補件、外部 API 或 private source 檔案入庫。

## Risks / Trade-offs

- [PDF 轉 Markdown 抽取錯位] → 先建立題目索引與 risky extraction review，索引未確認不得進正式資料。
- [每題內容量龐大導致一次 change 難審] → apply 依年度與每批 2 至 3 題節奏推進，批次完成後先跑該年度內容測試與人工抽查。
- [副代理解析不一致] → 主流程只採納通過校稿的結果；高風險題開第二解析副代理，差異未解決前保持待確認。
- [圖解文字不夠精準] → 圖解副代理輸出必須能讓讀者重建關係，主校稿檢查 `diagramInstructions` 與 `diagramAltText` 是否與原題相符。
- [localStorage key 或版本污染 A 組資料] → B 組與語言使用各自 key 與合法年度 set，測試覆蓋壞 snapshot 與跨組隔離。
- [bundle 過大] → 年度資料維持 lazy import，build 後檢查 chunk 警戒線與 route preload 行為。

## Migration Plan

1. 在 apply 階段先建立 B 組、語言與 learning 的 route skeleton、summary、storage 與 loader 測試。
2. 依年度建立題目索引，再依每批 2 至 3 題寫入解析資料；每批完成後跑該年度 shape/content/source 測試。
3. 年度完成後補上年度頁、清單進度、route preload、mobile/e2e 與離線 smoke。
4. 最後同步 `PROJECT_ARCHITECTURE.md`、`TEST_MATRIX.md` 與 active specs，跑完整驗證。
5. 若需要 rollback，移除新增路由、summary、storage key 使用點與年度資料，保留既有 A 組與 legacy redirect 行為。

## Open Questions

- 無需使用者在 propose 階段再回答；語言 113/114、正式圖像資產與學習筆記功能均刻意留在後續 change。
