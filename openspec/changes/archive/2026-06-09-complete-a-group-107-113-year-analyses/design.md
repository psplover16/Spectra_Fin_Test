## Context

目前 114 年 A 組已完成 50 題完整解析，並建立 `ExamQuestionAnalysis`、題卡版型、來源基準、內容審查與 PWA 路由。107-113 年目前在年度列表與路由中仍是 pending 狀態，但使用者已要求一次補齊 350 題。

propose 階段已用多個代理平行讀取 107-113 PDF。盤點結論如下：七份 PDF 皆為 4 頁、50 題、題號 1-50 連續、A-D 選項完整，答案主要來自題目前方方括號標記，未見獨立答案表。主要風險不是題數缺漏，而是特殊答案、圖形、表格、程式碼、特殊符號與換行錯位。

| 年度 | PDF 基準 | 題數 | 特殊答案 | 抽取風險 |
| --- | --- | ---: | --- | --- |
| 107 | 107.pdf，4 頁 | 50 | 第 13、49 題 B 或 C | 長題幹詞中空白 |
| 108 | 108.pdf，4 頁 | 50 | 第 31 題全形 A 標記需正規化 | 第 9 題程式碼、第 22 題表格、第 27 題重複文字、公式題人工校對 |
| 109 | 109.pdf，4 頁 | 50 | 無特殊多答案回報 | 第 25 題二元樹圖、第 38 題路由表、第 40 題同列選項 |
| 110 | 110.pdf，4 頁 | 50 | 第 37 題一律給分 | 第 9 題上橫線、第 45 題箭頭符號 |
| 111 | 111.pdf，4 頁 | 50 | 無特殊多答案回報 | 程式碼縮排、第 33/41 題同列選項、第 50 題條列 |
| 112 | 112.pdf，4 頁 | 50 | 第 10 題 A 或 D、第 21 題一律送分、第 32 題 A 或 B | 第 33 題重複或錯位文字，同列選項 |
| 113 | 113.pdf，4 頁 | 50 | 第 17 題一律送分、第 43 題 B、C | 第 41/42 題程式碼格式、換行題幹 |

內容屬於專業科目，必須採嚴謹教學：定義、原理、適用條件、常見陷阱、解題步驟與四選項辨析都要完整。應用資料仍是靜態 TypeScript 模組，由 Vite 與 vite-plugin-pwa 打包進離線資源；沒有遠端同步與衝突處理。

## Goals / Non-Goals

**Goals:**

- 107-113 年每年新增 50 題 `ExamQuestionAnalysis`，總計 350 題。
- 每題具備原題題幹、A-D 選項、官方答案檢查、`answerNote`、`answerVerification`、`coreTerms`、`beginnerExplanation`、`solvingSteps`、`optionExplanations`、`keyTakeaways`、`tags`、`sourceRef`。
- 每年新增來源基準與內容審查測試，能攔住缺題、缺選項、錯頁碼、特殊答案誤標、薄弱解析與抽取風險未處理。
- 每年固定抽樣 10 題做人工 QA，總計 70 題，作為 archive 前驗收條件。
- 排除前述 70 題後，補做剩餘 280 題全量 QA，讓 107-113 的 350 題皆有 PDF 與題卡層級驗收紀錄。
- 107-113 年路由與年度列表從 pending 變為 complete，且沿用 114 年題卡與進度互動。
- 支援大量代理平行撰寫，但合併前必須通過同一資料 shape、rubric、測試與文件更新。

**Non-Goals:**

- 不加入 B 組、共同科目、106 年以前或 115 年以後資料。
- 不新增資料庫、伺服器、API、Pinia 題庫 store 或 IndexedDB 題庫同步。
- 不重新設計題卡視覺版型；只在共用 helper、路由載入與審查工具上做必要調整。
- 不把 PDF 檔或大型截圖資產公開打包到 PWA，除非實作階段確認某題必須有可視圖形且能以輕量方式呈現。

## Decisions

### 使用 114 年資料 shape 擴充 107-113

沿用 `ExamQuestionAnalysis` 作為唯一題目解析 shape。每個年度建立 `year.ts`、`yearReviewedAnalyses.ts`、`yearSourceBaseline.ts`，並在 loader 中註冊 107-113。替代方案是建立新的批次資料模型，但會迫使題卡、測試與審查分裂，增加合併風險，因此不採用。

### 以 PDF 來源基準作為匯入關卡

每年先建立來源基準，來源基準負責題號、原始題幹、A-D 選項、官方答案標記、頁碼、PDF 檔名與抽取狀態。解析內容不得直接覆蓋來源基準；解析必須引用已校對的來源欄位。替代方案是直接在 `year.ts` 手填題目與解析，但 350 題容易在答案、頁碼與選項上漂移，因此不採用。

### 特殊答案以 acceptedAnswers 與 answerNote 表示

多答案題使用多個 `acceptedAnswers`；一律送分題使用 A-D 全部作為 `acceptedAnswers`。這兩類題的 `answerVerification` 必須是 `needs-review` 或 `suspected-error`，並以 `answerNote` 說明 PDF 標記與學習解讀。替代方案是新增 `allAwarded` 欄位，但 114 shape 已可表達這種情況，新增欄位會擴大 UI 與測試改動，因此不採用。

### 年度題目可平行撰寫但合併前統一審查

apply 階段可用多個代理依年度、題號區間或單題分工。每個代理只能負責不重疊題號，產出必須符合相同欄位、繁體中文語氣、rubric 與測試命名。合併者負責跑全域內容審查，避免不同代理留下格式差異。

### 路由與年度列表從 pending 改為 complete

`/a-group/107` 至 `/a-group/113` 應回傳 complete 狀態並渲染完整題卡，不再顯示 layout confirmation pending 文案。年度列表仍保持 114 到 107 降冪排序，所有年度 questionCount 為 50，status 為 complete。localStorage 只維持既有完成年度與書籤；IndexedDB 與 Pinia 不承擔題庫資料。

### 內容審查共用化並維持離線打包

將 114 內容審查抽成可接收 year、PDF 檔名、頁數與題目集合的共用函式，再建立 107-113 對應測試或 npm script。所有題庫資料仍在 Vite bundle 內，由 vite-plugin-pwa 快取；沒有網路請求、同步策略或資料衝突。

### 固定每年 10 題抽樣作為 archive 前驗收

抽樣 QA 採固定題號而非隨機題號，讓驗收可重跑、可交接、可被任務追蹤。每年 10 題必須同時涵蓋前段、中段、後段題號，並優先納入特殊答案、圖表、表格、程式碼、特殊符號、同列選項、疑似答案錯誤與 needs-review 題。替代方案是每次 archive 前隨機抽樣，但隨機抽樣可能漏掉已知高風險題，且難以讓後續代理重現同一組審查，因此不採用。

### 剩餘 280 題採排除樣本的全量驗收

完成固定 70 題抽樣後，剩餘驗收不再抽樣，而是以「年度 + 10 題區塊」覆蓋所有尚未人工 QA 的題號。每個區塊需確認 PDF 來源頁、題幹、A-D 選項、官方答案標記、sourceRef、answerVerification、answerNote、題卡資料流與新手教學 rubric。替代方案是只保留抽樣 QA 加自動 content review，但使用者已要求全題驗收，且先前抽樣已找出實際可修正問題，因此不採用只抽樣。

## Implementation Contract

完成後，使用者在 `/a-group` 會看到 114、113、112、111、110、109、108、107 共 8 個完整年度。點入任何 `/a-group/:year`，若 year 在 107-114 範圍內，頁面都會顯示 50 題題卡；若 year 超出範圍，既有 NotFound 行為維持不變。

資料介面維持 `ExamQuestionAnalysis`：

- `year`: `AGroupYear`
- `number`: 1 到 50
- `acceptedAnswers`: A-D 的非空陣列
- `answerNote`: `null` 或非空文字
- `answerVerification`: `verified`、`needs-review`、`suspected-error`
- `originalStem`: 原題題幹
- `options`: A-D 四選項
- `coreTerms`: 核心術語
- `beginnerExplanation`: 新手系統教學
- `solvingSteps`: 逐步解題
- `optionExplanations`: A-D 選項辨析
- `keyTakeaways`: 可複用規則與陷阱
- `tags`: 考點標籤
- `sourceRef`: year、fileName、pageNumber、extractionStatus

特殊答案契約：多答案題不得被縮成單一答案；一律送分題不得被標成普通 verified 單選題。當 PDF 題幹、答案或抽取文字有疑義時，`answerVerification` 必須維持 `needs-review` 或 `suspected-error`，`answerNote` 必須說明原因。

驗證契約：實作完成需通過 `npm run check:a-group-114-content`、107-113 對應內容審查、`npm run test:unit`、`npm run typecheck`、`npm run build`、`npm run test:e2e -- --project=chromium`、`spectra analyze complete-a-group-107-113-year-analyses --json` 與 `spectra validate complete-a-group-107-113-year-analyses`。文件驗證需涵蓋 `PROJECT_ARCHITECTURE.md` 與 `TEST_MATRIX.md`。

抽樣 QA 驗收契約：archive 前必須完成 107-113 每年 10 題固定樣本，總計 70 題。每題需人工對照 PDF 來源頁、題幹、A-D 選項、官方答案標記、題卡渲染、answerNote、answerVerification、新手教學解析、解題步驟、四選項辨析與 keyTakeaways。若抽樣題發現錯誤，必須修正內容或明確保留 `needs-review` / `suspected-error` 與非空 `answerNote`，不得在未處理時 archive。

剩餘全量 QA 驗收契約：archive 前必須完成 107-113 扣除固定抽樣題後的 280 題驗收。任一剩餘題若出現 PDF 對照不一致、題卡資料流不一致、verified 題仍顯示待確認備註、特殊答案缺少 answerNote、或新手教學欄位不足，必須先修正並重跑該年度 source baseline、content review 與總驗證，才能標記該區塊完成。

## Risks / Trade-offs

- [Risk] 350 題解析量大，代理輸出可能格式不一致 → Mitigation: 每題拆成來源基準、答案檢查、解析撰寫、逐題測試、內容審查，並以共用審查函式統一阻擋。
- [Risk] 方括號答案標記不是獨立答案表 → Mitigation: sourceRef 與 answerNote 明確寫入 inline answer marker 來源；抽樣與特殊題人工確認。
- [Risk] 圖形、表格或程式碼在 PDF 抽取時失真 → Mitigation: 第 108/109/111/113 等高風險題保留獨立任務，sourceRef.extractionStatus 在校對前不得標 verified。
- [Risk] 一律送分題被誤當單選題 → Mitigation: spec 與內容審查要求 A-D 全接受、needs-review 或 suspected-error、answerNote 必填。
- [Risk] 打包 350 題靜態資料增加 bundle 大小 → Mitigation: 維持年度動態 import，loader 只載入使用者打開的年度；build 後檢查 chunk 警戒線。
- [Risk] 只做抽樣 QA 不能證明 350 題皆達出版級精校 → Mitigation: 固定樣本刻意納入每年高風險題與一般題，並保留全量自動內容審查；抽樣發現的問題需回推檢查同類題。
- [Risk] 全量 QA 容易因一次檢查過多題而漏看細節 → Mitigation: 剩餘 280 題依年度與 10 題區塊拆分，每個區塊獨立列出 pass/finding；總彙整再重跑全量內容審查與 build。

## Migration Plan

1. 新增 107-113 年資料與來源基準，不變更 114 年既有內容。
2. 註冊年度 loader 並將年度列表狀態改為 complete。
3. 擴充共用內容審查與測試，再更新文件與 specs。
4. 若實作後發現某年度資料需暫停發布，回復該年度 loader 與 year summary 為 pending，保留來源基準供後續修正。

## Open Questions

目前沒有阻擋提案的開放問題。PDF 盤點列出的特殊答案與抽取風險已轉為 apply 階段任務與內容審查條件。
