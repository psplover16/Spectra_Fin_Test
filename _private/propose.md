# 提案草稿：完成 B 組、語言逐題解析與新增學習路由

## Conclusion

**Decision**: 下一個 Spectra change 應聚焦在三件事：完成 B 組年度清單與年度逐題解析、完成語言年度清單與年度逐題解析、並新增一個目前無內容的「學習」主路由。B 組與語言都沿用 A 組已建立的年度清單、書籤、完成狀態、年度導頁與逐題解析頁模式，但資料來源、題型與解析模板要各自獨立。

**Rationale**: 目前程式已有 `/a-group`、`/b-group`、`/language` 主路由；A 組已具備年度清單、localStorage 進度、lazy-loaded 年度資料與逐題解析 UI。B 組與語言目前仍是 placeholder，正好可以用 A 組作為穩定範本擴充，而不是再做一套新的互動模式。B 組與語言的來源 PDF 量大、題型偏申論與語文解析，必須把「PDF 轉 Markdown 記憶檔」、「廣告/水印排除」、「逐題多副代理解析」、「主任務整併與校稿」寫成正式流程，避免內容品質失控。

**Capture to**: 後續應用 `$spectra-propose` 建立正式 change，建議 change 名稱為 `complete-b-group-language-learning-routes`。正式 artifacts 至少包含 `proposal.md`、`design.md`、`tasks.md`，並新增或更新 specs 來定義 B 組、語言、學習路由、PDF 轉換、廣告排除與逐題解析品質要求。

## 已讀取脈絡

### 使用者指定需求來源

已讀取 `@/_private/discuss.txt`，主要需求如下：

1. 開始實作 B 組與語言。
2. B 組來源為 `@/_private/資訊管理、程式設計/` 內過去 8 年 PDF。
3. B 組每題都是申論題。
4. B 組 PDF 非官方，可能含補習班廣告水印、廣告圖片、廣告網址；這些內容必須排除、無視，不能寫入本專案。
5. `/b-group` 要與 `/a-group` 樣式、功能一致：年度清單、書籤功能、點選年度進入年度考題內容。
6. B 組每題需包含「問題、問題講解、擬答、擬答詳細說明」四步。
7. 有些 B 組回答可能需要作圖，有些使用純文字。
8. 主任務應從 114 年開始，先讓副代理讀 PDF、排除廣告與水印，轉成同名 Markdown 記憶檔，放入 `@/_private/資訊管理、程式設計/`。
9. 逐題處理採批次生產線，不一次開完全部題目；每批建議 2 至 3 題。
10. 每題固定最小流程為主解析副代理與審稿副代理；需要作圖才另開圖解副代理，高風險題才加開第二解析副代理交叉驗證。
11. 校稿後每題 Markdown 放入 `@/_private/資訊管理、程式設計/<年份>/`，檔案名稱為第幾題。
12. 每批完成校稿、寫入資料模型、測試或人工抽查後，才進入下一批。
13. 語言路由與 B 組高度雷同，來源改為 `@/_private/國文、英文/`。
14. 語言的英文題目應賦予副代理「英文老師」身分，受眾設定為國二程度英文學生。
15. 任務數量不設上限，重點是解析正確、精準、不能有錯、具備學習用途；可接受並行執行任務。
16. 新增一個路由名稱叫「學習」，目前沒有內容。

### 本專案現況

已讀取相關程式：

1. `src/app/router.ts`
2. `src/app/routePreload.ts`
3. `src/app/AppShell.vue`
4. `src/modules/examGroups/aGroup/views/AGroupView.vue`
5. `src/modules/examGroups/aGroup/views/AGroupYearView.vue`
6. `src/modules/examGroups/aGroup/storage/aGroupProgressStorage.ts`
7. `src/modules/examGroups/aGroup/types/questionAnalysis.ts`
8. `src/modules/examGroups/aGroup/data/yearSummaries.ts`
9. `src/modules/examGroups/aGroup/composables/useAGroupYearQuestions.ts`
10. `src/modules/examGroups/bGroup/views/BGroupView.vue`
11. `src/modules/examGroups/language/views/LanguageGroupView.vue`

現況判斷：

1. 目前 router 已有 `/a-group`、`/a-group/:year`、`/b-group`、`/language`。
2. 根路由目前 redirect 到 `/a-group`。
3. 舊路由 `/information-management` 與 `/programming` 已 redirect 到 `/b-group`。
4. A 組年度資料已支援 107 至 114，且都是 complete 狀態。
5. A 組已有年度清單 UI、書籤、完成 checkbox、localStorage snapshot、年度導頁與年度資料 lazy import。
6. B 組目前只有 placeholder 入口文案，尚無年度清單、年度路由與逐題解析。
7. 語言目前只有 placeholder 入口文案，尚無年度清單、年度路由與逐題解析。
8. 主要導覽目前只有 A 組、B 組、語言，尚無「學習」。
9. route preloader 目前只認得 `aGroup`、`aGroupYear`、`bGroup`、`language`，尚無 B 組年度、語言年度與學習路由。

### 來源檔案現況

已檢視來源資料夾檔名清單，未讀取 PDF 內容：

`@/_private/資訊管理、程式設計/`：

1. `107.pdf`
2. `108.pdf`
3. `109.pdf`
4. `110.pdf`
5. `111.pdf`
6. `112.pdf`
7. `113.pdf`
8. `114.pdf`

`@/_private/國文、英文/`：

1. `107.pdf`
2. `108.pdf`
3. `109.pdf`
4. `110.pdf`
5. `111.pdf`
6. `112.pdf`

討論結論：

1. B 組明確是 107 至 114 共 8 年。
2. B 組 114 年目前確認總共 6 題，但每年題目數量不固定；PDF 轉 Markdown 時不能假設固定題數，必須先建立題目索引並逐題核對。
3. 語言來源只做 107 至 112，其他年度暫時不補。
4. B 組與語言的完成狀態粒度第一階段與 A 組一致，採年度層級完成狀態即可。
5. 作圖題第一階段只需要文字圖解與 alt text，不建立正式圖像資產；但這部分必須另開圖解副代理處理，不能由主任務或一般解析副代理順手帶過。
6. 逐題解析採批次節奏：年度 PDF → 題目索引 → 第 1 批 2 至 3 題解析 → 校稿與寫入資料模型 → 跑測試或人工抽查 → 下一批。
7. `@/_private/.../*.md` 記憶檔是否納入 git 由使用者看完後自行決定，不列為本 change 需要解決的問題。
8. 「學習」路由只先開 placeholder，未來可能放使用者筆記，但詳細功能尚未決定。

## 建議產品方向

### 主路由

| 顯示名稱 | 路由 | 狀態 | 說明 |
| --- | --- | --- | --- |
| A 組 | `/a-group` | 已存在 | 保留現有年度清單與逐題解析 |
| B 組 | `/b-group` | 待擴充 | 改成年度清單，點年度進入 B 組年度申論解析 |
| 語言 | `/language` | 待擴充 | 改成年度清單，點年度進入國文/英文年度解析 |
| 學習 | `/learning` | 新增 placeholder | 目前只有空白路由或無內容狀態 |

主導覽應新增「學習」，並確認 375px mobile 下四個主導覽項目不水平溢出。若四欄太擠，建議改成可換行 grid 或 compact tab，而不是縮小到不可讀。

### 年度路由

建議新增：

| 功能 | 路由 | 說明 |
| --- | --- | --- |
| B 組年度解析 | `/b-group/:year` | 年度範圍 107 至 114 |
| 語言年度解析 | `/language/:year` | 年度範圍 107 至 112，其他年度暫時不補 |

B 組與語言的 invalid year 應比照 A 組進入 NotFound，例如 `/b-group/999`、`/language/abc`。

B 組題目數量不得寫死。114 年目前確認 6 題，但其他年度題數不固定；年度 summary 的題數應由 PDF 轉 Markdown 後的題目索引或資料檔實際內容推導。

## B 組設計決策

### UI 與互動

B 組年度清單應與 A 組一致：

1. 使用同樣的 surface card 視覺。
2. 每個年度列有中央可點擊導頁區。
3. 左側或固定區域提供書籤操作。
4. 右側提供完成 checkbox。
5. 點書籤與 checkbox 時不可觸發導頁。
6. 書籤與完成狀態 reload 後保留。
7. 完成某年度時，若該年度是目前書籤，應清除或依明確規則處理；建議沿用 A 組「完成後清除同年度書籤」。

### B 組資料模型

B 組是申論題，不應沿用 A 組四選一選項型別。建議建立獨立型別：

```ts
export interface BGroupEssayQuestionAnalysis {
  year: BGroupYear;
  number: number;
  originalQuestion: string;
  questionExplanation: string;
  modelAnswer: string;
  modelAnswerDetails: string;
  diagramInstructions: string[];
  diagramAltText: string | null;
  keyTerms: string[];
  scoringPoints: string[];
  commonMistakes: string[];
  sourceRef: {
    fileName: string;
    pageNumber?: number;
    originalExcerpt: string;
    extractionStatus: 'verified' | 'needs-review';
    adContentRemoved: boolean;
  };
  reviewStatus: 'draft' | 'reviewed' | 'needs-review';
}
```

資料分檔建議：

1. `src/modules/examGroups/bGroup/data/yearSummaries.ts`
2. `src/modules/examGroups/bGroup/data/years/114.ts`
3. `src/modules/examGroups/bGroup/data/years/113.ts`
4. 依此到 `107.ts`
5. `src/modules/examGroups/bGroup/composables/useBGroupYearQuestions.ts`
6. `src/modules/examGroups/bGroup/storage/bGroupProgressStorage.ts`
7. `src/modules/examGroups/bGroup/types/essayQuestionAnalysis.ts`

B 組年度資料必須 lazy import，不可在 `/b-group` 清單頁一次載入所有年度申論解析。`/b-group` 只載入年度 summary；`/b-group/:year` 才載入該年度資料。

### B 組內容模板

每題至少包含：

1. 問題。
2. 問題講解。
3. 擬答。
4. 擬答詳細說明。
5. 評分重點。
6. 常見錯誤。
7. 關鍵名詞。
8. 若需要作圖，提供精準的文字圖解與替代文字，不直接用廣告或來源圖浮水印。
9. 來源 PDF、頁碼、擷取狀態與廣告排除標記。

文字圖解與 alt text 規則：

1. 需要作圖的題目必須另開圖解副代理。
2. 圖解副代理負責把圖的節點、箭頭、方向、層級、標籤與流程關係寫成可審查的文字。
3. alt text 必須能讓未看圖的人理解圖中所有關鍵元素與關係。
4. 圖解副代理不得沿用 PDF 中的廣告圖、水印圖、補習班樣板圖或含廣告的截圖描述。
5. 校稿副代理需檢查文字圖解與 alt text 是否和題目要求、擬答內容一致。

題數規則：

1. 不預設每年固定題數。
2. 每年 PDF 轉 Markdown 後先產生題目索引，列出題號、頁碼、題型、是否需作圖、擷取狀態。
3. 114 年目前以 6 題作為第一個垂直切片的預期範圍，但仍必須由題目索引校對副代理重新確認，不可直接寫死。
4. 其他年度依實際 PDF 題目數建立資料，不補空題、不硬湊固定數量。

### B 組批次節奏與副代理流程

主任務每一年從 114 年開始，逐年往前處理。每個年度都採以下節奏：

```text
年度 PDF
  ↓
題目索引
  ↓
第 1 批 2 至 3 題解析
  ↓
校稿 + 寫入資料模型
  ↓
跑測試/人工抽查
  ↓
下一批
```

批次規則：

1. 沒有完成該年度題目索引前，不開始逐題解析。
2. 每批建議 2 至 3 題，避免一次開太多副代理導致整併與校稿失控。
3. 同一批內可並行處理不同題目。
4. 每批必須完成校稿、資料寫入、內容完整性測試或人工抽查後，才進入下一批。
5. 若某題被標為高風險，該題必須暫停進批次完成條件，先加開第二解析副代理交叉驗證。

副代理角色：

1. **PDF 轉 Markdown 副代理**
   - 讀取該年度 PDF。
   - 排除廣告水印、廣告圖片、廣告網址與無關補習班資訊。
   - 先建立題目索引，確認該年度實際題數，避免把頁首、頁尾、廣告或水印誤切成題目。
   - 產出同名 Markdown 記憶檔到 `@/_private/資訊管理、程式設計/`。
   - 檔名與 PDF 對應，例如 `114.md`。

2. **題目索引校對副代理**
   - 依 PDF 轉 Markdown 結果建立題目索引。
   - 核對題號、頁碼、題型、是否需作圖、擷取信心與廣告排除狀態。
   - 114 年雖目前預期為 6 題，仍需重新確認題目索引，避免把頁尾、附註、廣告或跨頁內容誤判成題目。
   - 對題數不固定的年度，這一步是逐題解析的前置門檻。

3. **主解析副代理**
   - 每題固定開一個主解析副代理。
   - 一次產出完整初稿，包含問題、問題講解、擬答、擬答詳細說明、評分重點、常見錯誤與關鍵名詞。
   - 輸出要標明依據、假設與不確定處。

4. **圖解副代理**
   - 若題目需要作圖、流程圖、架構圖、資料流程圖、ERD、樹狀圖或網路拓樸，主任務需另開圖解副代理。
   - 圖解副代理只產出文字圖解與 alt text，不產出正式 PNG/SVG 圖像資產。
   - 圖解內容必須精準描述節點、箭頭、方向、關係、層級與必要標籤。
   - 若題目不需要作圖，需明確標示「不需圖解」。

5. **第二解析副代理**
   - 只在高風險題開啟，不是每題固定開。
   - 高風險條件包含 PDF 擷取不清、題意模糊、答案可能有爭議、題目涉及制度/標準/年份、需要嚴格計算、需圖解但圖形關係複雜、或主解析副代理標記不確定。
   - 只要符合任一高風險條件，就必須開第二解析副代理，不能由主任務自行略過。
   - 第二解析副代理負責交叉驗證，不直接覆蓋主解析。

6. **逐題審稿副代理**
   - 檢查答案正確性、術語、邏輯、格式、繁體中文、是否誤收廣告。
   - 若題目有文字圖解與 alt text，需檢查圖解是否精準、是否漏節點、箭頭方向是否正確、alt text 是否足以替代圖像。
   - 若主解析與第二解析副代理有衝突，審稿副代理需列出差異與建議採用版本。
   - 有疑慮時標記 `needs-review`，不能硬寫成 verified。

7. **主任務整併與寫入專案**
   - 主任務負責決策、整併與寫入，不再為每題固定加開整併副代理。
   - 若題目同時有主解析、圖解、第二解析與審稿輸出，主任務依審稿意見整合成最終版本。
   - 產出每題 Markdown 到 `@/_private/資訊管理、程式設計/<年份>/`，檔名建議 `Q01.md`、`Q02.md`。
   - 只把校稿後內容轉入 `src/` 的 TypeScript 資料檔。
   - 不把廣告、水印、補習班網址或無關行銷文字寫入本專案。

## 語言設計決策

### UI 與互動

語言路由沿用 B 組模式：

1. `/language` 顯示年度清單。
2. `/language/:year` 顯示該年度國文與英文解析。
3. 年度列有書籤、完成 checkbox、中央導頁。
4. 進度 storage 與 B 組/A 組分開，避免互相污染。

### 語言資料模型

語言題型可能包含國文閱讀、作文、英文文法、字彙、克漏字與閱讀理解。建議建立比 B 組更彈性的 union：

```ts
export type LanguageQuestionKind =
  | 'chinese-reading'
  | 'chinese-composition'
  | 'english-grammar'
  | 'english-vocabulary'
  | 'english-cloze'
  | 'english-reading'
  | 'mixed';

export interface LanguageQuestionAnalysis {
  year: LanguageYear;
  number: number;
  kind: LanguageQuestionKind;
  originalQuestion: string;
  questionExplanation: string;
  modelAnswer: string;
  modelAnswerDetails: string;
  teacherNotes: string[];
  beginnerLevelNotes: string[];
  vocabularyNotes: string[];
  grammarNotes: string[];
  sourceRef: {
    fileName: string;
    pageNumber?: number;
    originalExcerpt: string;
    extractionStatus: 'verified' | 'needs-review';
    adContentRemoved: boolean;
  };
  reviewStatus: 'draft' | 'reviewed' | 'needs-review';
}
```

### 英文題教學身分

英文題的副代理應明確使用以下教學設定：

1. 身分：英文老師。
2. 受眾：國二程度英文學生。
3. 教學語氣：繁體中文說明為主，英文例句可保留英文。
4. 解釋重點：先用學生能懂的詞彙講概念，再補正式文法名稱。
5. 禁止只翻譯答案；必須說明為什麼其他選項不適合。

### 語言批次節奏與副代理流程

語言也採與 B 組相同的批次生產線，不能一次處理全部年度或全部題目：

```text
年度 PDF
  ↓
題目索引
  ↓
第 1 批 2 至 3 題解析
  ↓
校稿 + 寫入資料模型
  ↓
跑測試/人工抽查
  ↓
下一批
```

語言批次規則：

1. 沒有完成該年度題目索引前，不開始逐題解析。
2. 每批建議 2 至 3 題，同一批內可並行處理不同題目。
3. 題目索引階段必須先分類 `LanguageQuestionKind`，再分派副代理；不可先解析後補分類。
4. 每題固定開主解析副代理與審稿副代理。
5. 英文題的主解析副代理必須使用英文老師身分與國二程度受眾設定。
6. 國文作文、國文閱讀、英文文法、字彙、克漏字與閱讀理解應使用不同解析重點，避免套錯模板。
7. 若語言題涉及圖表、流程、文章結構圖或作文架構圖，另開圖解副代理產出文字圖解與 alt text。
8. 高風險題必須開第二解析副代理交叉驗證。
9. 每批必須完成校稿、資料寫入、內容完整性測試或人工抽查後，才進入下一批。

### 語言來源決策

目前 `@/_private/國文、英文/` 可見 107 至 112 PDF。使用者已確認語言來源只做 107 至 112，其他年度暫時不補。

1. 語言年度清單只顯示 107 至 112。
2. `/language/:year` 只接受 107 至 112。
3. `/language/113`、`/language/114` 與其他不支援年度應進 NotFound。
4. 語言年度資料必須 lazy import，不可在 `/language` 清單頁一次載入所有年度解析。

## 廣告與水印排除規則

B 組與語言來源 PDF 可能包含非官方補習班素材。正式規格應明確要求：

1. 不得把廣告水印寫入 `src/`。
2. 不得把廣告圖片轉成內容。
3. 不得把廣告網址、補習班行銷文案、聯絡資訊寫入本專案。
4. PDF 轉 Markdown 記憶檔也應排除廣告，或若為校稿需要暫存，必須標記為排除項且不得進入正式資料。
5. 每題資料應有 `adContentRemoved: true` 或等價欄位，表示已做廣告排除檢查。
6. 校稿副代理需把「是否誤收廣告」列為必查項。

## 新增「學習」路由

需求是新增路由名稱「學習」，目前沒有內容。建議：

1. 路由使用 `/learning`。
2. AppShell 主導覽新增「學習」。
3. 建立 `LearningView.vue` placeholder。
4. placeholder 僅顯示目前沒有內容，不建立假資料。
5. route preload 支援 `learning`。
6. e2e 驗證 `/learning` 可到達且不顯示 NotFound。
7. 未來可能承載使用者筆記，但本 change 不設計筆記功能、資料模型或編輯流程。

## Interface Depth Check

本次會引入新模組與新路由，屬於需要界面深度檢查的變更。

1. **Seam location**
   - B 組合約放在 `src/modules/examGroups/bGroup/`。
   - 語言合約放在 `src/modules/examGroups/language/`。
   - 學習 placeholder 放在新的 `src/modules/learning/` 或 `src/modules/examGroups/learning/`，建議若未來會獨立於考題組別，使用 `src/modules/learning/`。

2. **Adapter count**
   - 每個群組只需要一層 route loader 加一層年度資料 loader。
   - 不建議為 B 組/語言再疊一層空的 generic adapter，否則只會轉呼叫。

3. **Depth**
   - B 組與語言 loader 不只是 forward calls，應負責年度合法性、lazy import、資料 shape 驗證或錯誤狀態。
   - storage module 應負責 snapshot parse、版本、無效資料 fallback、完成年度清除書籤等行為。

4. **Deletion test**
   - 刪掉 B 組模組會使 `/b-group`、`/b-group/:year`、B 組 storage 與逐題資料全部失效。
   - 刪掉語言模組會使 `/language`、`/language/:year` 與英文/國文解析資料失效。
   - 刪掉學習模組只會讓 `/learning` placeholder 失效；因此學習模組第一階段應保持很薄，不要過早建立複雜抽象。

## 建議任務拆分

### 1. 路由與導覽

1. 新增 `/b-group/:year` 路由。
2. 新增 `/language/:year` 路由。
3. 新增 `/learning` 路由。
4. AppShell 導覽新增「學習」。
5. route preload 新增 `bGroupYear`、`languageYear`、`learning`。
6. invalid B 組年度進 NotFound。
7. invalid 語言年度進 NotFound。
8. 補 e2e 驗證四個主路由與年度路由。

### 2. B 組年度清單與狀態

1. 建立 B 組年度 summary，範圍 114 至 107。
2. 年度題數由實際資料推導或由 PDF 轉 Markdown 題目索引填入，不寫死固定題數。
3. 改寫 `BGroupView.vue` 為年度清單。
4. 建立 B 組 progress storage。
5. B 組書籤 reload 後保留。
6. B 組完成狀態 reload 後保留。
7. B 組完成年度後清除同年度書籤。
8. 補 unit 與 e2e。

### 3. B 組資料與年度頁

1. 建立 B 組申論題型別。
2. 建立 B 組年度資料 lazy loader。
3. 建立 B 組年度解析頁。
4. 建立 B 組申論題卡元件。
5. 建立 B 組資料 shape validation。
6. 先完成 114 年垂直切片。
7. 依序完成 113 至 107。

### 4. B 組 PDF 轉 Markdown 與逐題解析

每一年都先執行年度前置流程，再依批次處理題目：

1. PDF 轉 Markdown 記憶檔。
2. 建立題目索引並確認實際題數。
3. 廣告/水印/網址排除檢查。
4. 題目切分與頁碼標記。
5. 將題目切成每批 2 至 3 題。
6. 每題固定開主解析副代理，產出完整初稿。
7. 需要作圖的題目另開圖解副代理，產出精準文字圖解與 alt text。
8. 高風險題另開第二解析副代理交叉驗證。
9. 每題固定開審稿副代理，含圖解精準性檢查。
10. 主任務整併並寫入資料模型。
11. 對該批跑內容完整性測試或人工抽查。
12. 該批通過後才進入下一批。

### 5. 語言年度清單與狀態

1. 建立語言年度 summary。
2. 年度範圍固定為 107 至 112，其他年度暫時不補。
3. 改寫 `LanguageGroupView.vue` 為年度清單。
4. 建立語言 progress storage。
5. 語言書籤 reload 後保留。
6. 語言完成狀態 reload 後保留。
7. 補 unit 與 e2e。

### 6. 語言資料與年度頁

1. 建立語言題型 union。
2. 建立語言年度資料 lazy loader。
3. 建立語言年度解析頁。
4. 建立語言題卡元件。
5. 語言也採每批 2 至 3 題處理。
6. 英文題加入國二程度教學 notes。
7. 國文題加入閱讀/作文/文意解析 notes。
8. 高風險語言題必須開第二解析副代理交叉驗證。
9. 先完成 112 年垂直切片。
10. 依序完成其他年度。

### 7. 學習路由

1. 建立 `LearningView.vue`。
2. 新增 `/learning` route。
3. AppShell 顯示「學習」。
4. route preload 支援 learning。
5. e2e 驗證 `/learning` 可到達。
6. placeholder 不建立假內容。

### 8. 驗證與品質門檻

1. `npm run lint`
2. `npm run typecheck`
3. `npm run test:unit`
4. `npm run build`
5. `npm run check:pwa-output`
6. `npm run test:e2e`
7. 每個年度資料檔都有內容完整性測試。
8. 每個 PDF 轉 Markdown 檔都有廣告排除檢查紀錄。
9. 中文內容需 UTF-8 正確保存，不能有亂碼、問號替代字元或可見 BOM。

## 驗收標準

1. `/b-group` 顯示 114 至 107 年度清單。
2. `/b-group/:year` 可顯示該年度 B 組申論題解析。
3. B 組每題包含問題、問題講解、擬答、擬答詳細說明。
4. B 組不假設固定題數；114 年雖預期 6 題，仍需由題目索引校對副代理重新確認，其他年度依 PDF 實際題數建立。
5. B 組需要作圖的題目必須由圖解副代理產出精準文字圖解與替代文字。
6. 文字圖解需描述節點、箭頭、方向、層級、標籤與流程關係；alt text 需足以替代圖像理解。
7. B 組內容不得包含補習班廣告、水印文字、廣告圖片描述或廣告網址。
8. `/language` 顯示 107 至 112 年度清單。
9. `/language/:year` 可顯示該年度國文與英文解析。
10. `/language/113`、`/language/114` 進 NotFound。
11. 英文題解析符合英文老師、國二程度學生的教學設定。
12. 語言題目索引階段必須先分類題型，避免英文老師副代理或國文解析模板套錯題目。
13. 語言內容不得包含補習班廣告、水印文字、廣告圖片描述或廣告網址。
14. B 組與語言都有獨立書籤與年度完成狀態，不與 A 組互相污染。
15. `/learning` 可到達，顯示目前沒有內容，不進 NotFound。
16. 主導覽包含 A 組、B 組、語言、學習。
17. 375px mobile viewport 不水平溢出。
18. invalid B 組與語言年度進 NotFound。
19. 所有逐題資料都有來源 PDF、頁碼或待確認頁碼、原題摘錄、擷取狀態、廣告排除狀態與校稿狀態。
20. 每批 2 至 3 題需完成校稿、資料寫入、內容完整性測試或人工抽查後，才進入下一批。
21. 內容完整性測試能擋下缺少問題講解、擬答或擬答詳細說明的題目。
22. B 組與語言年度資料都必須 lazy import，清單頁不得一次載入所有年度逐題解析。
23. 符合高風險條件的題目必須有第二解析副代理交叉驗證紀錄。
24. CI/CD 原有驗證維持通過。

## 已確認決策

1. 語言來源只做 107 至 112，其他年度暫時不補。
2. B 組 114 年目前預期總共 6 題，但仍需由題目索引校對副代理重新確認；每年題目數量不固定，PDF 轉 Markdown 時要特別小心題目切分。
3. B 組與語言的完成狀態第一階段與 A 組一致，採年度層級完成即可。
4. 作圖題第一階段用文字圖解與 alt text 即可，但必須另開圖解副代理，並把圖解精準性納入校稿。
5. 副代理流程採批次生產線：年度 PDF → 題目索引 → 每批 2 至 3 題解析 → 校稿與寫入資料模型 → 跑測試或人工抽查 → 下一批。
6. 每題固定開主解析副代理與審稿副代理；圖解副代理與第二解析副代理採條件式加開。
7. 高風險題只要符合 PDF 擷取不清、題意模糊、答案爭議、制度/標準/年份、嚴格計算、複雜圖解或主解析不確定任一條件，就必須開第二解析副代理。
8. B 組與語言年度資料都必須 lazy import，避免清單頁 bundle 膨脹。
9. 每題都要保留來源 PDF、頁碼或待確認頁碼、原題摘錄、擷取狀態、廣告排除狀態與校稿狀態。
10. 語言題目索引階段必須先分類題型，避免副代理身分與解析模板用錯。
11. 「正式圖像資產」指另外製作並納入專案的 PNG、SVG 或其他圖片檔；本 change 不需要製作這類圖像資產。
12. `@/_private/.../*.md` 記憶檔是否納入 git 由使用者看完後自行決定，本 change 不替使用者決策。
13. 「學習」路由未來可能放使用者筆記，但目前只先開路由與 placeholder，不設計詳細功能。

## 下一步建議

使用 `$spectra-propose complete-b-group-language-learning-routes` 建立正式 change。建議正式 proposal 採垂直切片：

1. 第一階段：B 組 114 年完整流程，包含 PDF 轉 Markdown、題目索引、預期 6 題的重新確認、分批逐題解析、校稿、寫入專案、路由與測試。
2. 第二階段：B 組 113 至 107。
3. 第三階段：語言 112 年垂直切片，採同樣批次流程與來源追蹤要求。
4. 第四階段：語言剩餘年度。
5. 學習路由可在第一階段一起新增，因為目前只是 placeholder，風險低。
