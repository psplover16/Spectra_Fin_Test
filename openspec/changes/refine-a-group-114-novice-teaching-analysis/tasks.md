## 0. Overall Implementation Direction And Parallel-Agent Rules

此 change 的 apply 階段不是籠統的 Rewrite and review，而是用「逐題來源封包 → 新手阻塞點 → 教學重寫 → 交叉審查 → 主代理統一合併」的流程完成。複代理只產出草稿與審查報告，不直接修改同一份 TypeScript 資料檔；主代理負責合併、統一欄位順序、統一語氣、統一 `teachingTables` shape，並跑測試。

- [x] 0.1 建立 apply 階段總方向文件或工作註記：每題先保留原題題幹、A-D 選項、官方答案、`sourceRef`，再依 `Enforce a 10-step novice rewrite workflow` 補齊名詞、目的、規則、套用、選項陷阱與重點整理；驗證：後續任務都能對應到 `Year 114 analysis teaches non-CS beginners`。
- [x] 0.2 定義複代理 draft packet 格式，使 `Parallel subagents produce drafts and reviews, not direct merged edits` 可執行；每份 packet 必須包含 source packet、question type、novice blockers、core terms、beginnerExplanation、usage flow、solvingSteps、optionExplanations、keyTakeaways、table decision、answerNote changes、reviewer concerns；驗證：主代理合併前逐份檢查欄位完整性。
- [x] 0.3 定義複代理審查角色：Technical Reviewer 檢查定義、公式、計算、答案唯一性與疑義；Novice Reviewer 檢查非資工新手是否看得懂；Table Reviewer 檢查 `Use teachingTables only for comparison, classification, process, and formula-reference cases`；驗證：每個審查結果都標示 pass、fixed 或 needs-review。
- [x] 0.4 定義主代理合併規則：草稿可平行產生，但只有主代理能改 `114ReviewedAnalyses.ts`、rubric 測試與題卡 shape；驗證：合併後欄位順序、用語深度、`answerNote` 與 `sourceRef` 一致。

## 1. Rubric And Data Contract

- [x] 1.1 強化 114 年 novice rubric，使 `Year 114 content review rejects shallow teaching analysis` 能拒絕只給答案、缺少前置名詞、缺少使用流程、缺少干擾選項推理的解析；驗證：`tests/unit/aGroup114ContentReview.spec.ts` 的反例 fixture 會失敗，且 `npm run check:a-group-114-content` 通過。
- [x] 1.2 確認 `Use existing ExamQuestionAnalysis shape with optional teachingTables` 是資料契約：沒有 `teachingTables` 的題目仍通過，有 malformed `teachingTables` 的題目會失敗；驗證：`tests/unit/questionAnalysisShape.spec.ts` 覆蓋這兩種情境。
- [x] 1.3 補強表格渲染與 shape coverage，使 `Year 114 comparison content supports teaching tables` 支援 title、headers、等欄位 rows 與具體表示法；驗證：`tests/unit/AGroupQuestionCard.spec.ts` 與 `tests/unit/questionAnalysisShape.spec.ts` 通過。
- [x] 1.4 將 `Enforce a 10-step novice rewrite workflow` 轉成內容審查 checklist：source packet、題型、novice blockers、core explanation、usage flow、套回題幹、選項解釋、重點整理、表格決策、review；驗證：每題完成前都能逐項打勾。
- [x] 1.5 將 `Use teachingTables only for comparison, classification, process, and formula-reference cases` 寫入內容審查規則或 reviewer checklist；驗證：每張表格都有教學用途，且非必要題目不因沒有表格而失敗。
- [x] 1.6 強化 `Strengthen 114 content review rather than relying on manual reading`：新增 Q001、Q002、Q003、Q004 的題號特定 assertions，並新增 shallow-analysis 反例；驗證：`npm run check:a-group-114-content` 能抓出缺少系統教學的退化。
- [x] 1.7 檢查 `answerNote` 與 `answerVerification` 的保留規則，避免重寫時把疑義題硬改成無疑義；驗證：有疑義或需人工確認的題目仍保留對應 note 與 review 狀態。

## 2. Canonical Examples

- [x] 2.1 更新 114-Q001，使 `Year 114 canonical questions define the rewrite standard` 明確示範 bit width、補數、二補數範圍、負數轉換、固定寬度加法與 signed overflow；驗證：內容說明 6 位元存下來是 `011111`，但數學和超出 6 位元 signed 範圍。
- [x] 2.2 更新 114-Q002，使 canonical example 示範精簡但完整的馮紐曼架構教學：目的、輸入、輸出、記憶體、控制單元、算術邏輯單元，以及物理裝置清單、軟體清單、CPU 細節的干擾差異；驗證：題號特定測試通過。
- [x] 2.3 更新 114-Q003，使 canonical example 示範 Python 主要型別表與 list、tuple、set 比較表；表格需包含表示法，例如 `[1, 2, 3]`、`(1, 2, 3)`、`{1, 2, 3}`、`set()`；驗證：題卡能正確呈現表格，內容審查確認可變性、順序、索引、重複值。
- [x] 2.4 更新 114-Q004，使 canonical example 示範 CRC 教學：CRC 解決的問題、產生多項式轉位元、modulo-2 XOR 除法、補零、餘數與 codeword；驗證：solvingSteps 明確說明 `G(x)=X^3+X^1` 為何對應 `1010`，以及為何資料後面補 3 個 0。
- [x] 2.5 將 Q001-Q004 當作後續複代理的範本：每份 draft packet 都要對齊這四題的深度，但不照抄文字；驗證：Q005-Q050 草稿審查時能引用 canonical criteria。
- [x] 2.6 為 Q001-Q004 補齊或更新測試 fixtures，避免後續重構讓 canonical examples 退回只給答案；驗證：`tests/unit/aGroup114ContentReview.spec.ts` 針對四題的 assertions 通過。

## 3. Parallel Draft Packets For Q005-Q050

這一段任務可用大量複代理平行完成。每個任務的交付物是 draft packet 與自評結果，不直接改資料檔；主代理在第 4 段統一合併。

- [x] [P] 3.1（可平行實作／草稿代理）產出 114-Q005 的結構化 draft packet，套用 10-step workflow，使 `Year 114 analysis teaches non-CS beginners` 對本題成立；驗證：packet 包含 source packet、question type、novice blockers、core explanation、usage flow、solvingSteps、optionExplanations、keyTakeaways、table decision、reviewer concerns。
- [x] [P] 3.2（可平行實作／草稿代理）產出 114-Q006 的結構化 draft packet，套用 10-step workflow，使 `Year 114 analysis teaches non-CS beginners` 對本題成立；驗證：packet 包含 source packet、question type、novice blockers、core explanation、usage flow、solvingSteps、optionExplanations、keyTakeaways、table decision、reviewer concerns。
- [x] [P] 3.3（可平行實作／草稿代理）產出 114-Q007 的結構化 draft packet，套用 10-step workflow，使 `Year 114 analysis teaches non-CS beginners` 對本題成立；驗證：packet 包含 source packet、question type、novice blockers、core explanation、usage flow、solvingSteps、optionExplanations、keyTakeaways、table decision、reviewer concerns。
- [x] [P] 3.4（可平行實作／草稿代理）產出 114-Q008 的結構化 draft packet，套用 10-step workflow，使 `Year 114 analysis teaches non-CS beginners` 對本題成立；驗證：packet 包含 source packet、question type、novice blockers、core explanation、usage flow、solvingSteps、optionExplanations、keyTakeaways、table decision、reviewer concerns。
- [x] [P] 3.5（可平行實作／草稿代理）產出 114-Q009 的結構化 draft packet，套用 10-step workflow，使 `Year 114 analysis teaches non-CS beginners` 對本題成立；驗證：packet 包含 source packet、question type、novice blockers、core explanation、usage flow、solvingSteps、optionExplanations、keyTakeaways、table decision、reviewer concerns。
- [x] [P] 3.6（可平行實作／草稿代理）產出 114-Q010 的結構化 draft packet，套用 10-step workflow，使 `Year 114 analysis teaches non-CS beginners` 對本題成立；驗證：packet 包含 source packet、question type、novice blockers、core explanation、usage flow、solvingSteps、optionExplanations、keyTakeaways、table decision、reviewer concerns。
- [x] [P] 3.7（可平行實作／草稿代理）產出 114-Q011 的結構化 draft packet，套用 10-step workflow，使 `Year 114 analysis teaches non-CS beginners` 對本題成立；驗證：packet 包含 source packet、question type、novice blockers、core explanation、usage flow、solvingSteps、optionExplanations、keyTakeaways、table decision、reviewer concerns。
- [x] [P] 3.8（可平行實作／草稿代理）產出 114-Q012 的結構化 draft packet，套用 10-step workflow，使 `Year 114 analysis teaches non-CS beginners` 對本題成立；驗證：packet 包含 source packet、question type、novice blockers、core explanation、usage flow、solvingSteps、optionExplanations、keyTakeaways、table decision、reviewer concerns。
- [x] [P] 3.9（可平行實作／草稿代理）產出 114-Q013 的結構化 draft packet，套用 10-step workflow，使 `Year 114 analysis teaches non-CS beginners` 對本題成立；驗證：packet 包含 source packet、question type、novice blockers、core explanation、usage flow、solvingSteps、optionExplanations、keyTakeaways、table decision、reviewer concerns。
- [x] [P] 3.10（可平行實作／草稿代理）產出 114-Q014 的結構化 draft packet，套用 10-step workflow，使 `Year 114 analysis teaches non-CS beginners` 對本題成立；驗證：packet 包含 source packet、question type、novice blockers、core explanation、usage flow、solvingSteps、optionExplanations、keyTakeaways、table decision、reviewer concerns。
- [x] [P] 3.11（可平行實作／草稿代理）產出 114-Q015 的結構化 draft packet，套用 10-step workflow，使 `Year 114 analysis teaches non-CS beginners` 對本題成立；驗證：packet 包含 source packet、question type、novice blockers、core explanation、usage flow、solvingSteps、optionExplanations、keyTakeaways、table decision、reviewer concerns。
- [x] [P] 3.12（可平行實作／草稿代理）產出 114-Q016 的結構化 draft packet，套用 10-step workflow，使 `Year 114 analysis teaches non-CS beginners` 對本題成立；驗證：packet 包含 source packet、question type、novice blockers、core explanation、usage flow、solvingSteps、optionExplanations、keyTakeaways、table decision、reviewer concerns。
- [x] [P] 3.13（可平行實作／草稿代理）產出 114-Q017 的結構化 draft packet，套用 10-step workflow，使 `Year 114 analysis teaches non-CS beginners` 對本題成立；驗證：packet 包含 source packet、question type、novice blockers、core explanation、usage flow、solvingSteps、optionExplanations、keyTakeaways、table decision、reviewer concerns。
- [x] [P] 3.14（可平行實作／草稿代理）產出 114-Q018 的結構化 draft packet，套用 10-step workflow，使 `Year 114 analysis teaches non-CS beginners` 對本題成立；驗證：packet 包含 source packet、question type、novice blockers、core explanation、usage flow、solvingSteps、optionExplanations、keyTakeaways、table decision、reviewer concerns。
- [x] [P] 3.15（可平行實作／草稿代理）產出 114-Q019 的結構化 draft packet，套用 10-step workflow，使 `Year 114 analysis teaches non-CS beginners` 對本題成立；驗證：packet 包含 source packet、question type、novice blockers、core explanation、usage flow、solvingSteps、optionExplanations、keyTakeaways、table decision、reviewer concerns。
- [x] [P] 3.16（可平行實作／草稿代理）產出 114-Q020 的結構化 draft packet，套用 10-step workflow，使 `Year 114 analysis teaches non-CS beginners` 對本題成立；驗證：packet 包含 source packet、question type、novice blockers、core explanation、usage flow、solvingSteps、optionExplanations、keyTakeaways、table decision、reviewer concerns。
- [x] [P] 3.17（可平行實作／草稿代理）產出 114-Q021 的結構化 draft packet，套用 10-step workflow，使 `Year 114 analysis teaches non-CS beginners` 對本題成立；驗證：packet 包含 source packet、question type、novice blockers、core explanation、usage flow、solvingSteps、optionExplanations、keyTakeaways、table decision、reviewer concerns。
- [x] [P] 3.18（可平行實作／草稿代理）產出 114-Q022 的結構化 draft packet，套用 10-step workflow，使 `Year 114 analysis teaches non-CS beginners` 對本題成立；驗證：packet 包含 source packet、question type、novice blockers、core explanation、usage flow、solvingSteps、optionExplanations、keyTakeaways、table decision、reviewer concerns。
- [x] [P] 3.19（可平行實作／草稿代理）產出 114-Q023 的結構化 draft packet，套用 10-step workflow，使 `Year 114 analysis teaches non-CS beginners` 對本題成立；驗證：packet 包含 source packet、question type、novice blockers、core explanation、usage flow、solvingSteps、optionExplanations、keyTakeaways、table decision、reviewer concerns。
- [x] [P] 3.20（可平行實作／草稿代理）產出 114-Q024 的結構化 draft packet，套用 10-step workflow，使 `Year 114 analysis teaches non-CS beginners` 對本題成立；驗證：packet 包含 source packet、question type、novice blockers、core explanation、usage flow、solvingSteps、optionExplanations、keyTakeaways、table decision、reviewer concerns。
- [x] [P] 3.21（可平行實作／草稿代理）產出 114-Q025 的結構化 draft packet，套用 10-step workflow，使 `Year 114 analysis teaches non-CS beginners` 對本題成立；驗證：packet 包含 source packet、question type、novice blockers、core explanation、usage flow、solvingSteps、optionExplanations、keyTakeaways、table decision、reviewer concerns。
- [x] [P] 3.22（可平行實作／草稿代理）產出 114-Q026 的結構化 draft packet，套用 10-step workflow，使 `Year 114 analysis teaches non-CS beginners` 對本題成立；驗證：packet 包含 source packet、question type、novice blockers、core explanation、usage flow、solvingSteps、optionExplanations、keyTakeaways、table decision、reviewer concerns。
- [x] [P] 3.23（可平行實作／草稿代理）產出 114-Q027 的結構化 draft packet，套用 10-step workflow，使 `Year 114 analysis teaches non-CS beginners` 對本題成立；驗證：packet 包含 source packet、question type、novice blockers、core explanation、usage flow、solvingSteps、optionExplanations、keyTakeaways、table decision、reviewer concerns。
- [x] [P] 3.24（可平行實作／草稿代理）產出 114-Q028 的結構化 draft packet，套用 10-step workflow，使 `Year 114 analysis teaches non-CS beginners` 對本題成立；驗證：packet 包含 source packet、question type、novice blockers、core explanation、usage flow、solvingSteps、optionExplanations、keyTakeaways、table decision、reviewer concerns。
- [x] [P] 3.25（可平行實作／草稿代理）產出 114-Q029 的結構化 draft packet，套用 10-step workflow，使 `Year 114 analysis teaches non-CS beginners` 對本題成立；驗證：packet 包含 source packet、question type、novice blockers、core explanation、usage flow、solvingSteps、optionExplanations、keyTakeaways、table decision、reviewer concerns。
- [x] [P] 3.26（可平行實作／草稿代理）產出 114-Q030 的結構化 draft packet，套用 10-step workflow，使 `Year 114 analysis teaches non-CS beginners` 對本題成立；驗證：packet 包含 source packet、question type、novice blockers、core explanation、usage flow、solvingSteps、optionExplanations、keyTakeaways、table decision、reviewer concerns。
- [x] [P] 3.27（可平行實作／草稿代理）產出 114-Q031 的結構化 draft packet，套用 10-step workflow，使 `Year 114 analysis teaches non-CS beginners` 對本題成立；驗證：packet 包含 source packet、question type、novice blockers、core explanation、usage flow、solvingSteps、optionExplanations、keyTakeaways、table decision、reviewer concerns。
- [x] [P] 3.28（可平行實作／草稿代理）產出 114-Q032 的結構化 draft packet，套用 10-step workflow，使 `Year 114 analysis teaches non-CS beginners` 對本題成立；驗證：packet 包含 source packet、question type、novice blockers、core explanation、usage flow、solvingSteps、optionExplanations、keyTakeaways、table decision、reviewer concerns。
- [x] [P] 3.29（可平行實作／草稿代理）產出 114-Q033 的結構化 draft packet，套用 10-step workflow，使 `Year 114 analysis teaches non-CS beginners` 對本題成立；驗證：packet 包含 source packet、question type、novice blockers、core explanation、usage flow、solvingSteps、optionExplanations、keyTakeaways、table decision、reviewer concerns。
- [x] [P] 3.30（可平行實作／草稿代理）產出 114-Q034 的結構化 draft packet，套用 10-step workflow，使 `Year 114 analysis teaches non-CS beginners` 對本題成立；驗證：packet 包含 source packet、question type、novice blockers、core explanation、usage flow、solvingSteps、optionExplanations、keyTakeaways、table decision、reviewer concerns。
- [x] [P] 3.31（可平行實作／草稿代理）產出 114-Q035 的結構化 draft packet，套用 10-step workflow，使 `Year 114 analysis teaches non-CS beginners` 對本題成立；驗證：packet 包含 source packet、question type、novice blockers、core explanation、usage flow、solvingSteps、optionExplanations、keyTakeaways、table decision、reviewer concerns。
- [x] [P] 3.32（可平行實作／草稿代理）產出 114-Q036 的結構化 draft packet，套用 10-step workflow，使 `Year 114 analysis teaches non-CS beginners` 對本題成立；驗證：packet 包含 source packet、question type、novice blockers、core explanation、usage flow、solvingSteps、optionExplanations、keyTakeaways、table decision、reviewer concerns。
- [x] [P] 3.33（可平行實作／草稿代理）產出 114-Q037 的結構化 draft packet，套用 10-step workflow，使 `Year 114 analysis teaches non-CS beginners` 對本題成立；驗證：packet 包含 source packet、question type、novice blockers、core explanation、usage flow、solvingSteps、optionExplanations、keyTakeaways、table decision、reviewer concerns。
- [x] [P] 3.34（可平行實作／草稿代理）產出 114-Q038 的結構化 draft packet，套用 10-step workflow，使 `Year 114 analysis teaches non-CS beginners` 對本題成立；驗證：packet 包含 source packet、question type、novice blockers、core explanation、usage flow、solvingSteps、optionExplanations、keyTakeaways、table decision、reviewer concerns。
- [x] [P] 3.35（可平行實作／草稿代理）產出 114-Q039 的結構化 draft packet，套用 10-step workflow，使 `Year 114 analysis teaches non-CS beginners` 對本題成立；驗證：packet 包含 source packet、question type、novice blockers、core explanation、usage flow、solvingSteps、optionExplanations、keyTakeaways、table decision、reviewer concerns。
- [x] [P] 3.36（可平行實作／草稿代理）產出 114-Q040 的結構化 draft packet，套用 10-step workflow，使 `Year 114 analysis teaches non-CS beginners` 對本題成立；驗證：packet 包含 source packet、question type、novice blockers、core explanation、usage flow、solvingSteps、optionExplanations、keyTakeaways、table decision、reviewer concerns。
- [x] [P] 3.37（可平行實作／草稿代理）產出 114-Q041 的結構化 draft packet，套用 10-step workflow，使 `Year 114 analysis teaches non-CS beginners` 對本題成立；驗證：packet 包含 source packet、question type、novice blockers、core explanation、usage flow、solvingSteps、optionExplanations、keyTakeaways、table decision、reviewer concerns。
- [x] [P] 3.38（可平行實作／草稿代理）產出 114-Q042 的結構化 draft packet，套用 10-step workflow，使 `Year 114 analysis teaches non-CS beginners` 對本題成立；驗證：packet 包含 source packet、question type、novice blockers、core explanation、usage flow、solvingSteps、optionExplanations、keyTakeaways、table decision、reviewer concerns。
- [x] [P] 3.39（可平行實作／草稿代理）產出 114-Q043 的結構化 draft packet，套用 10-step workflow，使 `Year 114 analysis teaches non-CS beginners` 對本題成立；驗證：packet 包含 source packet、question type、novice blockers、core explanation、usage flow、solvingSteps、optionExplanations、keyTakeaways、table decision、reviewer concerns。
- [x] [P] 3.40（可平行實作／草稿代理）產出 114-Q044 的結構化 draft packet，套用 10-step workflow，使 `Year 114 analysis teaches non-CS beginners` 對本題成立；驗證：packet 包含 source packet、question type、novice blockers、core explanation、usage flow、solvingSteps、optionExplanations、keyTakeaways、table decision、reviewer concerns。
- [x] [P] 3.41（可平行實作／草稿代理）產出 114-Q045 的結構化 draft packet，套用 10-step workflow，使 `Year 114 analysis teaches non-CS beginners` 對本題成立；驗證：packet 包含 source packet、question type、novice blockers、core explanation、usage flow、solvingSteps、optionExplanations、keyTakeaways、table decision、reviewer concerns。
- [x] [P] 3.42（可平行實作／草稿代理）產出 114-Q046 的結構化 draft packet，套用 10-step workflow，使 `Year 114 analysis teaches non-CS beginners` 對本題成立；驗證：packet 包含 source packet、question type、novice blockers、core explanation、usage flow、solvingSteps、optionExplanations、keyTakeaways、table decision、reviewer concerns。
- [x] [P] 3.43（可平行實作／草稿代理）產出 114-Q047 的結構化 draft packet，套用 10-step workflow，使 `Year 114 analysis teaches non-CS beginners` 對本題成立；驗證：packet 包含 source packet、question type、novice blockers、core explanation、usage flow、solvingSteps、optionExplanations、keyTakeaways、table decision、reviewer concerns。
- [x] [P] 3.44（可平行實作／草稿代理）產出 114-Q048 的結構化 draft packet，套用 10-step workflow，使 `Year 114 analysis teaches non-CS beginners` 對本題成立；驗證：packet 包含 source packet、question type、novice blockers、core explanation、usage flow、solvingSteps、optionExplanations、keyTakeaways、table decision、reviewer concerns。
- [x] [P] 3.45（可平行實作／草稿代理）產出 114-Q049 的結構化 draft packet，套用 10-step workflow，使 `Year 114 analysis teaches non-CS beginners` 對本題成立；驗證：packet 包含 source packet、question type、novice blockers、core explanation、usage flow、solvingSteps、optionExplanations、keyTakeaways、table decision、reviewer concerns。
- [x] [P] 3.46（可平行實作／草稿代理）產出 114-Q050 的結構化 draft packet，套用 10-step workflow，使 `Year 114 analysis teaches non-CS beginners` 對本題成立；驗證：packet 包含 source packet、question type、novice blockers、core explanation、usage flow、solvingSteps、optionExplanations、keyTakeaways、table decision、reviewer concerns。

## 4. Main-Agent Merge By Draft Range

- [x] 4.1 主代理合併 Q005-Q010 draft packets 到 reviewed analysis data，統一欄位順序、`answerNote` 處理與表格決策；驗證：六題通過 114 content checklist，且原題、A-D 選項、官方答案、tags、sourceRef 未遺失。
- [x] 4.2 主代理合併 Q011-Q016 draft packets 到 reviewed analysis data，統一欄位順序、`answerNote` 處理與表格決策；驗證：六題通過 114 content checklist，且原題、A-D 選項、官方答案、tags、sourceRef 未遺失。
- [x] 4.3 主代理合併 Q017-Q022 draft packets 到 reviewed analysis data，統一欄位順序、`answerNote` 處理與表格決策；驗證：六題通過 114 content checklist，且原題、A-D 選項、官方答案、tags、sourceRef 未遺失。
- [x] 4.4 主代理合併 Q023-Q028 draft packets 到 reviewed analysis data，統一欄位順序、`answerNote` 處理與表格決策；驗證：六題通過 114 content checklist，且原題、A-D 選項、官方答案、tags、sourceRef 未遺失。
- [x] 4.5 主代理合併 Q029-Q034 draft packets 到 reviewed analysis data，統一欄位順序、`answerNote` 處理與表格決策；驗證：六題通過 114 content checklist，且原題、A-D 選項、官方答案、tags、sourceRef 未遺失。
- [x] 4.6 主代理合併 Q035-Q040 draft packets 到 reviewed analysis data，統一欄位順序、`answerNote` 處理與表格決策；驗證：六題通過 114 content checklist，且原題、A-D 選項、官方答案、tags、sourceRef 未遺失。
- [x] 4.7 主代理合併 Q041-Q046 draft packets 到 reviewed analysis data，統一欄位順序、`answerNote` 處理與表格決策；驗證：六題通過 114 content checklist，且原題、A-D 選項、官方答案、tags、sourceRef 未遺失。
- [x] 4.8 主代理合併 Q047-Q050 draft packets 到 reviewed analysis data，統一欄位順序、`answerNote` 處理與表格決策；驗證：四題通過 114 content checklist，且原題、A-D 選項、官方答案、tags、sourceRef 未遺失。

## 5. Cross Review

- [x] [P] 5.1（可平行實作／Technical Reviewer）檢查 Q001-Q025 的定義、公式、計算、答案唯一性與 `answerNote` 保留；驗證：每題都有 pass、fixed 或 needs-review 結論。
- [x] [P] 5.2（可平行實作／Technical Reviewer）檢查 Q026-Q050 的定義、公式、計算、答案唯一性與 `answerNote` 保留；驗證：每題都有 pass、fixed 或 needs-review 結論。
- [x] [P] 5.3（可平行實作／Novice Reviewer）檢查 Q001-Q025 是否缺少名詞、目的、使用流程、清楚步驟或干擾選項說明；驗證：每個問題都修正，或以理由標為保留。
- [x] [P] 5.4（可平行實作／Novice Reviewer）檢查 Q026-Q050 是否缺少名詞、目的、使用流程、清楚步驟或干擾選項說明；驗證：每個問題都修正，或以理由標為保留。
- [x] [P] 5.5（可平行實作／Table Reviewer）檢查所有 `teachingTables` 是否符合 `Year 114 comparison content supports teaching tables`：title、headers、等欄位 rows、具體表示法、手機可讀性；驗證：`tests/unit/AGroupQuestionCard.spec.ts` 與 `tests/unit/questionAnalysisShape.spec.ts` 通過。
- [x] 5.6 主代理彙整所有 cross-review findings，修正格式漂移、概念錯誤、表格 shape 問題與疑義標記；驗證：沒有任何題目在 unresolved finding 下被標為完成。

## 6. Documentation And Architecture Notes

- [x] 6.1 若 optional `teachingTables` rendering 或 content review contract 影響架構行為，更新 `PROJECT_ARCHITECTURE.md`；驗證：`projectArchitectureDoc.spec.ts` 或既有架構文件測試通過。
- [x] 6.2 更新 `TEST_MATRIX.md`，記錄 114 novice teaching rubric、canonical question tests、表格 rendering tests、content review commands 與 final verification commands；驗證：`tests/unit/testMatrixDoc.spec.ts` 通過。

## 7. Final Verification

- [x] 7.1 執行 `npm run check:a-group-114-content`，確認 `Year 114 analysis teaches non-CS beginners`、`Year 114 canonical questions define the rewrite standard`、`Year 114 content review rejects shallow teaching analysis` 都通過。
- [x] 7.2 執行 `npx vitest run tests/unit/AGroupQuestionCard.spec.ts tests/unit/questionAnalysisShape.spec.ts`，確認題卡表格渲染與 `TeachingTable` shape 行為通過。
- [x] 7.3 執行 `npm run typecheck`，確認 `ExamQuestionAnalysis` 與 `TeachingTable` contracts 無 TypeScript 錯誤。
- [x] 7.4 執行 `npm run test:unit`，確認全部單元測試通過。
- [x] 7.5 執行 `npm run build`，確認 production build 成功，且 114 bundled content 可離線使用。
- [x] 7.6 執行 `spectra analyze refine-a-group-114-novice-teaching-analysis --json`，確認沒有 Critical 或 Warning findings。
- [x] 7.7 執行 `spectra validate refine-a-group-114-novice-teaching-analysis`，確認 change artifacts 有效。
