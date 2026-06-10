# refine-a-group-114-novice-teaching-analysis

## Discussion Source

來源：`_private/discuss.txt`

## Conclusion

**Decision**: 以 A 組 114 年為範圍，重新整理全部 50 題的教學解析，使內容符合「非資工類新手也能讀懂」的標準。

**Rationale**: 目前題解多半已能通過既有內容審查，但仍偏向已知道專有名詞的讀者。使用者明確要求每題先補足名詞解釋、核心想法、要解決的問題與實作方式，再回到本題選項判斷。

**Capture to**: 建議建立 Spectra change：`refine-a-group-114-novice-teaching-analysis`

## Current Code Context

已確認相關程式位置：

- `src/modules/examGroups/aGroup/data/years/114ReviewedAnalyses.ts`
  - 114 年逐題 reviewed 教學解析主要放在這裡。
- `src/modules/examGroups/aGroup/data/years/114.ts`
  - 將 raw question 與 reviewed analysis 合併成題卡資料。
- `src/modules/examGroups/aGroup/types/questionAnalysis.ts`
  - 目前資料 shape 已包含 `coreTerms`、`beginnerExplanation`、`solvingSteps`、`optionExplanations`、`keyTakeaways`，也支援可選的 `teachingTables`。
- `src/modules/examGroups/aGroup/components/AGroupQuestionCard.vue`
  - 題卡已可呈現教學解析段落與可選表格。
- `src/modules/examGroups/aGroup/data/years/contentReview.ts`
  - 目前已有「新手系統教學解析標準」檢查，但仍需要針對 114 年新標準補強。
- `tests/unit/aGroup114ContentReview.spec.ts`
  - 114 年內容審查測試入口。

## Assumptions

1. **解析內容應主要修改 `114ReviewedAnalyses.ts`**
   Evidence: 114 年的題目、答案與 reviewed teaching fields 已在該檔分離。
   If wrong: 若未來改成資料庫或外部 JSON，任務應改成資料匯入流程，而不是直接改 TS data。

2. **不需要新增路由或儲存抽象**
   Evidence: `/a-group/114` 已存在，題卡也已能顯示教學欄位與表格。
   If wrong: 若新格式需要互動式分頁或折疊章節，才需要額外設計 UI/狀態。

3. **`teachingTables` 應作為輔助呈現，而不是每題必填**
   Evidence: 第 3 題 Python 型別比較適合表格，但 CRC、二補數、馮紐曼架構不一定每題都需要表格。
   If wrong: 若要求每題都必須至少一張表，shape 與 content review 需改為強制檢查。

4. **內容審查應從「有足夠文字」升級成「有固定教學結構」**
   Evidence: `contentReview.ts` 現在用 marker 檢查概念、規則、步驟與陷阱，但無法保證每題都有「名詞解釋、核心想法、如何使用」。
   If wrong: 若只靠人工審查，不需強化測試，但長期容易讓 50 題品質不一致。

## Proposed Scope

### In Scope

- A 組 114 年 50 題逐題教學解析重寫或補強。
- 每題依非資工新手標準補齊：
  - 名詞解釋
  - 核心想法
  - 要解決的問題
  - 如何使用或如何實作
  - 本題如何套用
  - 四個選項為什麼對或錯
  - 可複用規則與常見陷阱
- 第 1、2、3、4 題作為明確樣板。
- 強化 114 年內容審查測試，確保解析不是只給答案。
- 必要時補充 `teachingTables`，尤其是分類、比較、層級、流程、公式對照題。

### Out of Scope

- 不重做 107-113 年解析。
- 不新增 A 組路由或 PWA 離線架構。
- 不改官方答案，除非重寫過程發現答案疑義。
- 不把題卡改成互動式教科書或章節課程。

## Teaching Standard

每題的 `beginnerExplanation` 應採用以下順序整理：

1. **這題在問什麼**
   - 用白話說明題目想測的觀念。
   - 不假設讀者看得懂專有名詞。

2. **名詞解釋**
   - 解釋題目中的核心名詞。
   - 需要時補英文或常見縮寫。

3. **要解決的問題**
   - 說明這個概念通常是為了解決什麼問題。

4. **核心想法**
   - 用簡單模型、比喻、公式或規則說明。

5. **如何使用或如何實作**
   - 對計算題要列出操作流程。
   - 對概念題要列出判斷規則。
   - 對比較題要列出比較面向。

6. **套回本題**
   - 明確把規則套到題幹或選項。

7. **常見混淆**
   - 指出干擾選項錯在哪個觀念。

## Canonical Examples

### Question 1: 6 位元 2 的補數加法

此題應補足：

- 6 位元是什麼：只能保留 6 個 bit，結果超出時會丟掉高位。
- 2 的補數系統是什麼：固定 bit 數下表示正負整數的方法。
- 補數是什麼：用固定範圍內的互補關係表示負數。
- 6 位元二補數範圍：`-2^(6-1)` 到 `2^(6-1)-1`，即 `-32` 到 `31`。
- 為什麼最高位可視為 `-32` 權重。
- 負數 bit pattern 如何轉十進位：
  - 無號值減 `2^n`
  - 反相加 1 找大小
- 補數系統的基本運算概念：
  - 加法：直接做二進位加法，只保留固定位數。
  - 減法：轉成加上對方的二補數。
  - 乘法：可視為加法延伸，但要注意位數擴張與溢位。
  - 除法：概念上可做有號除法，但考試多先確認正負與商/餘數規則。
- 本題要特別指出：
  - 機器留下 `011111`，所以題目答案是 31。
  - 真實數學值是 `-25 + -8 = -33`，超出範圍，因此有 signed overflow。

### Question 2: 馮紐曼架構

此題不宜過度深入，應讓讀者快速掌握：

- 馮紐曼架構是什麼：現代通用電腦的基本設計模型。
- 主要用途：讓程式與資料都能放在記憶體中，由 CPU 依序取指令、解碼、執行。
- 大致概念：
  - 輸入單元
  - 輸出單元
  - 記憶體
  - 控制器
  - 運算器
- 各概念功能：
  - 輸入：把外部資料送進電腦。
  - 輸出：把結果送出。
  - 記憶體：保存資料與指令。
  - 控制器：負責指揮流程。
  - 運算器：負責算術與邏輯運算。
- 選項解析應提醒：
  - 不要把具體硬體設備清單當成架構功能分類。
  - 不要把軟體項目當成馮紐曼硬體架構。

### Question 3: Python list、tuple 與 set

此題應保留並擴充表格呈現。

第一張表：Python 常見主要型別

| 中文類別 | 英文/型別 | 怎麼表示 | 主要特徵 |
| --- | --- | --- | --- |
| 數值型別 | `int`, `float`, `complex` | `1`, `3.14`, `1+2j` | 表示數字，可做數學運算 |
| 布林型別 | `bool` | `True`, `False` | 表示真假 |
| 文字型別 | `str` | `'hello'`, `"abc"` | 有順序，可索引，但不可直接改字元 |
| 串列 | `list` | `[1, 2, 3]` | 有順序，可重複，可修改 |
| 元組 | `tuple` | `(1, 2, 3)` | 有順序，可重複，不可修改 |
| 集合 | `set` | `{1, 2, 3}`, `set()` | 不靠位置索引，元素不重複 |
| 字典 | `dict` | `{'name': 'Amy'}` | 用 key 找 value |
| 空值 | `NoneType` | `None` | 表示沒有值 |

第二張表：list、tuple 與 set 核心差異

| 比較面向 | list | tuple | set |
| --- | --- | --- | --- |
| 字面值寫法 | `[1, 2, 3]` | `(1, 2, 3)` | `{1, 2, 3}`，空集合是 `set()` |
| 是否有順序 | 有 | 有 | 不靠固定位置順序使用 |
| 是否支援索引 | 支援，如 `items[0]` | 支援，如 `pair[0]` | 不支援 |
| 是否允許重複 | 允許 | 允許 | 不允許 |
| 是否可修改 | 可變 | 不可變 | `set` 可變，`frozenset` 不可變 |
| 本題重點 | list 可變 | tuple 不可變 | 用來對照「無序、不可索引」的集合概念 |

### Question 4: CRC 與生成多項式

此題應明確補足：

- 生成多項式是什麼：
  - 用來產生 CRC 檢查碼的規則。
  - 題目給 `G(x)=X^3+X^1`，需轉成位元表示。
- CRC 是什麼：
  - 一種錯誤偵測方法，用來檢查資料傳輸或儲存後是否可能出錯。
- 要解決什麼問題：
  - 資料在傳送或保存時可能 bit 翻轉，CRC 用額外檢查碼協助發現錯誤。
- 核心概念：
  - 把資料看成二進位多項式。
  - 用生成多項式做模 2 除法。
  - 模 2 運算用 XOR，不是一般十進位減法。
- 如何實作：
  - 將 `G(x)=X^3+X^1` 轉成 `1010`。
  - 最高次數是 3，所以原始資料後面補 3 個 0。
  - 用 XOR 長除法求餘數。
  - 把原始資料與餘數串接。
- 此部分要比目前解析更詳細，尤其是 XOR 除法過程。
- 若題目多項式慣例有疑義，`answerNote` 應保留說明，不可硬消除。

## Data And UI Design

### Data Shape

維持目前 `ExamQuestionAnalysis`：

- `coreTerms`
- `beginnerExplanation`
- `solvingSteps`
- `optionExplanations`
- `keyTakeaways`
- `teachingTables?`

不新增強制欄位，以免影響 107-113 年資料；但 114 年內容審查可針對特定題號要求表格。

### Table Usage Rule

使用 `teachingTables` 的情境：

- 型別比較
- OSI / TCP-IP 層級
- 記憶體階層
- 排程演算法比較
- 資料結構差異
- 公式欄位對照
- 正反概念比較

不需要表格的情境：

- 單一流程可用步驟清楚說完。
- 概念很短，表格只會增加閱讀負擔。

## Execution Direction

這個 change 的實作不能只做文字潤飾；每題都要用固定流程重建教學解析。實作時大致採以下方法。

### Per-Question Rewrite Workflow

每一題都依序產出以下內容，再寫回 `114ReviewedAnalyses.ts`：

1. **題型分類**
   - 先判斷此題是計算題、概念題、比較題、流程題、架構題、協定題、資料結構題、資安題，或名詞辨識題。
   - 題型會決定解析方式：計算題重視公式與代入，比較題重視表格，流程題重視步驟目的。

2. **新手名詞表**
   - 從題幹與選項抽出非資工新手可能不懂的詞。
   - 每個核心詞都要用白話解釋，不可直接把英文縮寫當作已知前提。
   - 例：CRC、生成多項式、二補數、馮紐曼架構、tuple、set、ACID、preorder、CIDR。

3. **問題目的**
   - 說明該概念通常要解決什麼問題。
   - 例：CRC 是為了偵測資料傳輸錯誤；二補數是為了讓固定 bit 數能表示正負整數並直接做加法。

4. **核心規則或模型**
   - 計算題：列公式、位元權重、單位換算、範圍、演算法規則。
   - 概念題：列定義、組成、用途、判斷條件。
   - 比較題：列比較面向並決定是否新增 `teachingTables`。

5. **如何使用或如何實作**
   - 把規則變成可操作的流程。
   - 不只說「套公式」，而要寫出「先看哪個值、再做哪個換算、最後如何判斷」。
   - 若涉及演算法、CRC、Hamming Code、樹走訪、排程、網路協定流程，必須逐步說明每一步在做什麼。

6. **套回本題**
   - `solvingSteps` 必須逐步引用本題的題幹資料或選項。
   - 每一步都要讓讀者知道為什麼下一步成立。

7. **A-D 選項辨析**
   - 每個選項都要說明「對在哪裡」或「錯在哪個觀念」。
   - 不可只寫「不是答案」。

8. **重點整理**
   - `keyTakeaways` 必須能讓讀者下次遇到同類題可複用。
   - 至少包含一條規則、一條判斷方法、一條常見陷阱。

9. **表格判斷**
   - 若題目是分類、比較、流程、層級或公式對照，判斷是否需要 `teachingTables`。
   - 表格必須包含具體例子；例如 Python 型別需寫出 `[1, 2, 3]`、`(1, 2, 3)`、`{1, 2, 3}`、`set()`。
   - 若表格只會重複段落內容，則不要加入。

10. **Rubric Review**
   - 檢查是否有名詞解釋、核心想法、問題目的、使用流程、本題套用、選項辨析、常見陷阱。
   - 若是比較題，確認是否該使用 `teachingTables`。
   - 若官方答案或題幹有疑義，保留 `answerNote`，不可硬標成無疑義。

### Question Type Playbooks

| 題型 | 改寫方向 | 常見需要補的內容 |
| --- | --- | --- |
| 計算題 | 先教符號、公式、範圍或單位，再逐步代入 | 位元寬度、公式來源、每一步換算、溢位或邊界 |
| 比較題 | 優先用表格整理比較面向 | 怎麼表示、是否有序、是否可變、用途、常見混淆 |
| 架構題 | 先說架構用途，再拆組成與功能 | 架構解決什麼問題、各組成負責什麼 |
| 流程題 | 用「目的 -> 流程 -> 每步原因」講解 | 每一步輸入/輸出、為什麼順序不能亂 |
| 協定題 | 先說協定在哪一層、解決什麼通訊問題 | 封包/連線/錯誤控制/安全性目的 |
| 資料結構題 | 先說資料如何存、適合什麼操作 | 索引、插入刪除、走訪順序、複雜度 |
| 資安題 | 先說威脅或保護目標，再說控制方法 | 機密性、完整性、認證、授權、攻擊情境 |
| 名詞辨識題 | 先建立分類地圖，再排除相似名詞 | 類別界線、相似詞差異、典型例子 |

### Field-Level Output Contract

每題最後必須回到現有資料欄位：

| 欄位 | 寫作要求 |
| --- | --- |
| `coreTerms` | 放本題真正需要先懂的名詞，不只是題目標題 |
| `beginnerExplanation` | 以非資工新手為讀者，先講名詞與目的，再講核心規則 |
| `solvingSteps` | 一步一步把規則套回題幹或選項 |
| `optionExplanations` | A-D 每個選項都要指出判斷依據或錯誤觀念 |
| `keyTakeaways` | 可複用規則、判斷方法、常見陷阱 |
| `teachingTables` | 只在分類、比較、流程或公式對照能明顯提升清楚度時使用 |
| `answerNote` | 若題目、官方答案或 PDF 抽取有疑義，保留說明 |

### Concrete Example Of Execution

以 114-Q004 CRC 為例，實作不是把原文改長，而是依序補出：

1. CRC 是錯誤偵測。
2. CRC 解決資料傳送或保存時 bit 可能出錯的問題。
3. 生成多項式是產生檢查碼的規則。
4. `G(x)=X^3+X^1` 如何轉成 `1010`。
5. 為什麼最高次數 3 代表原資料後面要補 3 個 0。
6. XOR 長除法每一步如何對齊、如何 XOR、如何得到餘數。
7. 餘數如何接回原資料得到答案。
8. A-D 哪些是餘數錯、補 0 錯、生成多項式轉換錯，哪個正確。

## Parallel Subagent Plan

由於 114 年共有 50 題，而且每題解析會變長，實作階段應使用大量複代理平行處理草稿與審查。複代理的用途不是各自任意改檔，而是平行產出結構化草稿、審查報告與修正建議，最後由主代理統一合併到 `114ReviewedAnalyses.ts`，避免格式與資料 shape 不一致。

### Subagent Roles

| 角色 | 負責內容 | 輸出 |
| --- | --- | --- |
| Rubric Lead | 建立 114 年新手教學 rubric 與固定輸出格式 | rubric、欄位檢查規則、範例題標準 |
| Source Scout | 讀取 114 年題目、目前解析、官方答案、sourceRef、answerNote | 每題 source packet |
| Draft Agents | 按題號區間平行重寫解析 | 每題的 `coreTerms`、`beginnerExplanation`、`solvingSteps`、`optionExplanations`、`keyTakeaways`、必要 `teachingTables` |
| Table Specialist | 專門處理比較題與分類題表格 | `teachingTables` 草稿與表格欄位一致性檢查 |
| Technical Reviewer | 檢查技術正確性、公式、計算過程與官方答案疑義 | finding list、需保留的 `answerNote` |
| Novice Reviewer | 檢查非資工新手是否能讀懂 | 缺少名詞、目的、流程、陷阱的清單 |
| Merge Lead | 統一整合文字風格、資料 shape、測試與格式 | 最終 patch 與驗證結果 |

### Suggested Parallel Split

第一輪先由主代理或 Rubric Lead 完成 Q001-Q004，作為所有代理遵守的範本。

第二輪平行處理 Q005-Q050：

| Agent | 題號範圍 | 備註 |
| --- | --- | --- |
| Draft Agent A | Q005-Q010 | 編碼、資料庫、作業系統早段題 |
| Draft Agent B | Q011-Q016 | 程式語言、資料結構、演算法 |
| Draft Agent C | Q017-Q022 | 系統、資料庫、管理資訊題 |
| Draft Agent D | Q023-Q028 | 網路概論前段 |
| Draft Agent E | Q029-Q034 | 網路協定、IP、OSI/TCP-IP |
| Draft Agent F | Q035-Q040 | 資安、加密、攻擊與防護 |
| Draft Agent G | Q041-Q046 | 網路工具、協定細節、錯誤控制 |
| Draft Agent H | Q047-Q050 | 尾段資安/網路題與整體補洞 |

第三輪再平行審查：

| Reviewer | 審查角度 |
| --- | --- |
| Technical Reviewer 1 | Q001-Q025 技術正確性 |
| Technical Reviewer 2 | Q026-Q050 技術正確性 |
| Novice Reviewer 1 | Q001-Q025 新手可讀性 |
| Novice Reviewer 2 | Q026-Q050 新手可讀性 |
| Table Reviewer | 所有 `teachingTables` 欄位數、例子、可讀性 |

### Source Packet For Each Subagent

每個草稿代理只應收到必要輸入，避免互相污染格式：

- 題號
- 原題題幹
- A-D 選項
- 官方答案
- 目前 `answerNote`
- 目前解析內容
- sourceRef
- 本 change 的 teaching rubric
- Q001-Q004 的 canonical examples
- 必須輸出的欄位格式

### Subagent Output Format

每個草稿代理輸出時必須使用同一格式：

```text
Question: 114-Q###
Question type:
Potential novice blockers:
Core terms:
Beginner explanation:
Teaching tables:
Solving steps:
Option explanations:
Key takeaways:
Answer note changes:
Reviewer concerns:
```

### Merge Rules

- 複代理不得各自直接改同一個 `114ReviewedAnalyses.ts` 區塊。
- 主代理統一合併，確保欄位順序、語氣、標點、表格 shape 一致。
- 若草稿代理與 reviewer 對官方答案有衝突，保留 `answerNote` 並標記人工複核，不可強行消除疑義。
- 表格不得為了好看而加入；只有比較、分類、流程、公式對照能讓新手更清楚時才保留。
- 合併後必須跑內容審查與 typecheck，不能只靠人工讀過。

## Spec Delta Recommendation

### Requirement: Year 114 Teaching Analysis Is Non-CS Beginner Friendly

A Group year 114 question analyses SHALL explain each question for readers without a computer-science background.

#### Scenario: Teaching analysis explains prerequisite concepts

- **WHEN** a user reads any 114 A group question card
- **THEN** the beginner explanation introduces required terms before using them as assumptions
- **THEN** it states the concept's core purpose or problem being solved
- **THEN** it explains the rule, formula, mechanism, or comparison basis used to answer the question

#### Scenario: Teaching analysis applies the rule to the current question

- **WHEN** a 114 question has calculation or multi-step reasoning
- **THEN** solvingSteps walk through the operation in the order a beginner can follow
- **THEN** each step maps back to the original question data or options

#### Scenario: Comparison questions use tables when clarity improves

- **WHEN** a 114 question compares categories, types, layers, data structures, or algorithms
- **THEN** the analysis MAY include teachingTables
- **THEN** each table has a title, headers, and rows with the same number of cells as headers
- **THEN** table cells include concrete examples when the concept has a literal representation, such as `[1, 2, 3]`, `(1, 2, 3)`, `{1, 2, 3}`, or `set()`

#### Scenario: CRC question explains implementation mechanics

- **WHEN** the user reads 114-Q004
- **THEN** the analysis explains CRC, the problem CRC solves, generating polynomial conversion, modulo-2 XOR division, zero padding, remainder calculation, and final codeword construction

#### Scenario: Two's complement question explains the system before the answer

- **WHEN** the user reads 114-Q001
- **THEN** the analysis explains bit width, complement, two's complement range, negative number conversion, fixed-width arithmetic, and signed overflow before concluding the answer

## Task Breakdown

### 1. Prepare Rubric

- [ ] Define 114 年「非資工新手教學解析」rubric.
- [ ] Add rubric checks to `contentReview.ts` or 114-specific review helpers.
- [ ] Add tests proving shallow answer-only explanations fail.
- [ ] Add tests proving missing term explanation, missing usage steps, and missing trap explanation fail.

### 2. Canonical Question Rewrites

- [ ] Rewrite 114-Q001 二補數解析 according to the new rubric.
- [ ] Add or update Q001 tests for bit width, two's complement range, complement conversion, arithmetic operations, and overflow.
- [ ] Rewrite 114-Q002 馮紐曼架構解析 with concise beginner explanation.
- [ ] Add or update Q002 tests for five functional units.
- [ ] Rewrite 114-Q003 Python type comparison with two teaching tables.
- [ ] Add or update Q003 tests for Python type table and list/tuple/set table.
- [ ] Rewrite 114-Q004 CRC analysis with detailed generating polynomial and XOR division steps.
- [ ] Add or update Q004 tests for CRC concept, problem, core mechanism, and implementation flow.

### 3. Full 114 Year Rewrite

以下每題獨立處理，避免大批量改寫造成品質不一致。每一題在正式 tasks 中都應至少展開為下列微任務：

1. `source packet`：整理題幹、A-D、官方答案、現有解析、answerNote、sourceRef。
2. `question type`：標記題型與適用 playbook。
3. `novice blockers`：列出新手會卡住的名詞與前置觀念。
4. `core explanation`：重寫名詞解釋、問題目的、核心規則或模型。
5. `usage flow`：重寫如何使用、如何計算、如何判斷或如何實作。
6. `apply to question`：重寫 `solvingSteps`，逐步套回題幹。
7. `option review`：重寫 A-D `optionExplanations`。
8. `takeaways`：重寫可複用規則與常見陷阱。
9. `table decision`：判斷是否需要 `teachingTables`，需要時補表格。
10. `review`：技術正確性、新手可讀性、answerNote、資料 shape 與 rubric 檢查。

建議在 Spectra tasks 中把以下每個題號都展開成上述微任務；若任務數超過數百個也可以接受。

- [ ] Apply 10-step novice rewrite workflow to 114-Q005.
- [ ] Apply 10-step novice rewrite workflow to 114-Q006.
- [ ] Apply 10-step novice rewrite workflow to 114-Q007.
- [ ] Apply 10-step novice rewrite workflow to 114-Q008.
- [ ] Apply 10-step novice rewrite workflow to 114-Q009.
- [ ] Apply 10-step novice rewrite workflow to 114-Q010.
- [ ] Apply 10-step novice rewrite workflow to 114-Q011.
- [ ] Apply 10-step novice rewrite workflow to 114-Q012.
- [ ] Apply 10-step novice rewrite workflow to 114-Q013.
- [ ] Apply 10-step novice rewrite workflow to 114-Q014.
- [ ] Apply 10-step novice rewrite workflow to 114-Q015.
- [ ] Apply 10-step novice rewrite workflow to 114-Q016.
- [ ] Apply 10-step novice rewrite workflow to 114-Q017.
- [ ] Apply 10-step novice rewrite workflow to 114-Q018.
- [ ] Apply 10-step novice rewrite workflow to 114-Q019.
- [ ] Apply 10-step novice rewrite workflow to 114-Q020.
- [ ] Apply 10-step novice rewrite workflow to 114-Q021.
- [ ] Apply 10-step novice rewrite workflow to 114-Q022.
- [ ] Apply 10-step novice rewrite workflow to 114-Q023.
- [ ] Apply 10-step novice rewrite workflow to 114-Q024.
- [ ] Apply 10-step novice rewrite workflow to 114-Q025.
- [ ] Apply 10-step novice rewrite workflow to 114-Q026.
- [ ] Apply 10-step novice rewrite workflow to 114-Q027.
- [ ] Apply 10-step novice rewrite workflow to 114-Q028.
- [ ] Apply 10-step novice rewrite workflow to 114-Q029.
- [ ] Apply 10-step novice rewrite workflow to 114-Q030.
- [ ] Apply 10-step novice rewrite workflow to 114-Q031.
- [ ] Apply 10-step novice rewrite workflow to 114-Q032.
- [ ] Apply 10-step novice rewrite workflow to 114-Q033.
- [ ] Apply 10-step novice rewrite workflow to 114-Q034.
- [ ] Apply 10-step novice rewrite workflow to 114-Q035.
- [ ] Apply 10-step novice rewrite workflow to 114-Q036.
- [ ] Apply 10-step novice rewrite workflow to 114-Q037.
- [ ] Apply 10-step novice rewrite workflow to 114-Q038.
- [ ] Apply 10-step novice rewrite workflow to 114-Q039.
- [ ] Apply 10-step novice rewrite workflow to 114-Q040.
- [ ] Apply 10-step novice rewrite workflow to 114-Q041.
- [ ] Apply 10-step novice rewrite workflow to 114-Q042.
- [ ] Apply 10-step novice rewrite workflow to 114-Q043.
- [ ] Apply 10-step novice rewrite workflow to 114-Q044.
- [ ] Apply 10-step novice rewrite workflow to 114-Q045.
- [ ] Apply 10-step novice rewrite workflow to 114-Q046.
- [ ] Apply 10-step novice rewrite workflow to 114-Q047.
- [ ] Apply 10-step novice rewrite workflow to 114-Q048.
- [ ] Apply 10-step novice rewrite workflow to 114-Q049.
- [ ] Apply 10-step novice rewrite workflow to 114-Q050.

### 4. Review And Verification

- [ ] Run `npm run check:a-group-114-content`.
- [ ] Run targeted component tests for `AGroupQuestionCard`.
- [ ] Run `npm run typecheck`.
- [ ] Run `npm run test:unit`.
- [ ] Run `npm run build`.
- [ ] Run `spectra analyze <change-name> --json`.
- [ ] Run `spectra validate <change-name>`.

## Acceptance Criteria

- 114 年 50 題都仍載入成功。
- 每題仍保留原題題幹、A-D 選項、官方答案、answerNote、answerVerification、sourceRef。
- 每題解析都以非資工新手為對象。
- 每題至少包含：
  - 名詞解釋或前置觀念
  - 核心想法或問題目的
  - 使用方式、規則、公式或流程
  - 套回本題的解題步驟
  - 四個選項的排除理由
  - 可複用重點與常見陷阱
- Q003 必須包含 Python 主要型別表與 list/tuple/set 比較表。
- Q004 必須詳細說明 CRC 的生成多項式、模 2 XOR 除法與餘數串接。
- Q001 必須說明 6 位元、二補數、補數系統與固定寬度運算。
- Q002 必須能快速說明馮紐曼架構的用途與五大功能單元。

## Recommended Next Command

```text
$spectra-propose 請讀取指定 Markdown 檔案 `@/_private/propose.md` 的內容，並以它作為唯一輸入。
```
