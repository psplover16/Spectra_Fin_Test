## Context

A 組 114 年已有 50 題資料、題卡呈現、內容審查與逐題 reviewed analysis。近期已加入可選的 teachingTables，讓比較型內容能用表格呈現。這次變更聚焦於專業科目題解品質：114 年每題解析必須從非資工新手角度重建，先解釋名詞、問題目的與核心規則，再把規則套回題幹與選項。

此變更不新增路由、不新增外部依賴、不改 PWA 離線策略。資料仍為 bundled TypeScript data，建置後可離線閱讀。

## Goals / Non-Goals

**Goals:**

- 建立 114 年非資工新手教學解析 rubric。
- 以 Q001 至 Q004 作為 canonical examples，固定解析深度與表格用法。
- 讓 Q005 至 Q050 依 10-step novice rewrite workflow 重寫或補強。
- 強化內容審查，擋下只給答案、缺少名詞解釋、缺少使用流程、缺少選項陷阱的解析。
- 設計可平行處理的複代理流程，但由主代理統一合併到資料檔。

**Non-Goals:**

- 不重做 107 至 113 年解析。
- 不新增年度路由、進度儲存、Pinia store 或 IndexedDB。
- 不把題卡改成互動式課程或章節教科書。
- 不變更官方答案；若發現疑義，只保留 answerNote 或 review 狀態。
- 不強制每題都有 teachingTables。

## Decisions

### Use existing ExamQuestionAnalysis shape with optional teachingTables

維持 ExamQuestionAnalysis 現有欄位，包含 coreTerms、beginnerExplanation、solvingSteps、optionExplanations、keyTakeaways、answerNote、sourceRef，並沿用可選 teachingTables。這能讓 114 年提高教學品質，同時不破壞 107 至 113 年資料。

替代方案：新增一組 114-only detail fields，例如 termGlossary、problemPurpose、usageFlow。淘汰原因是題卡與內容審查會變成雙軌，且 107 至 113 年未必需要立刻遷移。

### Enforce a 10-step novice rewrite workflow

每題都先整理 source packet，再分類題型、列出 novice blockers、重寫 core explanation、usage flow、solvingSteps、optionExplanations、keyTakeaways、table decision，最後做 rubric review。這使任務可拆細，也讓不同代理產出的草稿能被同一套格式審查。

替代方案：只要求「重寫得更白話」。淘汰原因是不可測，也會讓 apply 階段只改語氣卻漏掉名詞、目的、規則與陷阱。

### Use teachingTables only for comparison, classification, process, and formula-reference cases

teachingTables 用於明顯提升理解的內容，例如 Python 型別、資料結構比較、OSI/TCP-IP 層級、公式對照與流程拆解。Q003 必須包含 Python 主要型別表與 list/tuple/set 比較表，且表格需包含具體表示法，例如 [1, 2, 3]、(1, 2, 3)、{1, 2, 3}、set()。

替代方案：每題都加表格。淘汰原因是表格會在單一概念題中造成閱讀負擔，也增加手機畫面水平捲動。

### Parallel subagents produce drafts and reviews, not direct merged edits

實作階段可用複代理平行處理 Q005 至 Q050 的草稿與審查。草稿代理輸出固定格式；Technical Reviewer 檢查公式、定義、答案疑義；Novice Reviewer 檢查新手可讀性；Table Reviewer 檢查表格。主代理負責統一合併，維持欄位順序、文字風格與 TypeScript shape。

替代方案：讓每個代理直接改同一個資料檔。淘汰原因是容易產生 merge 衝突、欄位順序不一致、表格 shape 不一致與語氣漂移。

### Strengthen 114 content review rather than relying on manual reading

內容審查需新增 114-specific assertions，確保 Q001、Q002、Q003、Q004 的 canonical behavior 存在，並檢查全 50 題符合非資工新手 rubric。測試需能拒絕 answer-only、missing term explanation、missing usage flow、missing option trap 的反例。

替代方案：只做人工抽查。淘汰原因是 50 題內容量大，人工抽查無法防止後續修改讓解析退化。

## Implementation Contract

**Behavior:**

- 使用者在 /a-group/114 閱讀任一題時，教學解析以非資工新手為對象，先補足名詞與問題目的，再說明核心規則與本題套用方式。
- Q003 題卡呈現兩張表：Python 常見主要型別表，以及 list、tuple 與 set 核心差異表。
- 其他比較、分類、流程或公式對照題在有助於理解時呈現 teachingTables；非必要題目仍用段落與步驟呈現。

**Interface / data shape:**

- ExamQuestionAnalysis 維持原欄位，teachingTables 為可選陣列。
- 每個 TeachingTable 包含 title、headers、rows，且每列 cell 數量必須等於 headers 數量。
- 114 年每題仍保留 originalStem、options A-D、acceptedAnswers、answerVerification、answerNote、sourceRef、tags。
- Draft agent output 必須包含 Question、Question type、Potential novice blockers、Core terms、Beginner explanation、Teaching tables、Solving steps、Option explanations、Key takeaways、Answer note changes、Reviewer concerns。

**Failure modes:**

- 若解析缺少名詞解釋、核心目的、使用流程、逐步套用或選項陷阱，內容審查回報 failure，不得標為完成。
- 若 table rows 與 headers 欄位數不一致，shape validation 回報 failure。
- 若重寫過程發現官方答案或題目文字疑義，保留或新增 answerNote，且不得把疑義題硬改成無備註 verified 狀態。

**Acceptance criteria:**

- npm run check:a-group-114-content 通過。
- npx vitest run tests/unit/AGroupQuestionCard.spec.ts tests/unit/questionAnalysisShape.spec.ts 通過。
- npm run typecheck 通過。
- npm run test:unit 通過。
- npm run build 通過。
- spectra analyze refine-a-group-114-novice-teaching-analysis --json 無 Critical 或 Warning。
- spectra validate refine-a-group-114-novice-teaching-analysis 通過。

**Scope boundaries:**

- In scope: 114 年 reviewed analysis、114 年內容審查、題卡表格呈現與 shape validation。
- Out of scope: 107 至 113 年重寫、B 組與語言、路由重構、PWA 快取策略、正式圖像資產。

## Risks / Trade-offs

- 解析變長導致手機閱讀壓力增加 → 使用段落、solvingSteps、keyTakeaways 與必要表格分層呈現。
- 複代理產生風格不一致 → 主代理統一合併，並以 Q001 至 Q004 作為 canonical examples。
- 表格濫用造成畫面水平捲動 → 只在比較、分類、流程與公式對照題使用表格。
- 技術說明過度簡化導致錯誤 → Technical Reviewer 必須檢查公式、定義、答案唯一性與 answerNote。
- 內容審查過度依賴 marker → 加入題號特定測試與反例 fixture，避免只有關鍵字卻沒有真正教學結構。