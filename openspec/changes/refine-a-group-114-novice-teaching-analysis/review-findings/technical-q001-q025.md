# Technical Review: 114-Q001 至 Q025

## Summary

本次審查範圍為 114-Q001 至 Q025 的題目定義、公式、計算、答案唯一性，以及 `answerNote` / `answerVerification` 保留情形。審查結果：24 題為 `pass`，1 題為 `needs-review`。

Q016 仍正確保留 `answerVerification: 'needs-review'` 與 answerNote，未被硬改為 verified。Q018 與 Q020 的 answerNote 已保留；Q024 與 Q025 的語意邊界也已用 answerNote 說明。`src/modules/examGroups/aGroup/data/years/114.ts` 目前以 `acceptedAnswers: [raw.answer]` 使用官方答案；對疑義或邊界題則由 answerNote / review 狀態保留脈絡，符合 Implementation Contract 不改官方答案的要求。

## Per-question findings Q001-Q025

Q001 - pass: 6 位元二補數範圍、負數轉換、固定寬度加法與 signed overflow 說明正確。官方答案 C 對應加法器保留的 `011111`，answerNote 也保留真實數學和為 -33 且溢位的脈絡。

Q002 - pass: 馮紐曼架構的五大功能單元定義正確，選項 B 唯一完整列出輸入、輸出、記憶體、運算器、控制器；其他選項分別混入實體設備、軟體或 CPU 細部元件。

Q003 - pass: Python `list` 與 `tuple` 的可變性差異正確，表格也正確區分 list、tuple、set 的表示法、順序、索引、重複值與可變性。

Q004 - pass: 依題目字面 `G(x)=X^3+X^1` 轉為 `1010`、補 3 個 0、模 2 XOR 除法得餘數 `100`，完整 codeword `1101100` 對應官方答案 C。answerNote 已保留此生成多項式沒有常數項、較不典型的提醒。

Q005 - pass: Hamming(7,4) 以 1-based 位置配置第 1、2、4 位為校驗位，第 3、5、6、7 位放入資料 `1011`；偶校驗推得 `p1=0, p2=1, p4=0`，結果 `0110011` 對應答案 B。answerNote 已保留配置前提。

Q006 - pass: ACID 四項展開為 Atomicity、Consistency、Isolation、Durability，答案 D 唯一正確；干擾選項中的 Availability、Concurrency、Integrity、Dependability 均不屬標準 ACID 展開。

Q007 - pass: 優先權排程避免 starvation 的標準策略是 Aging，答案 A 正確；其他選項未直接解決低優先權行程長期等待。

Q008 - pass: 由 preorder 第一個節點 A 找根，再用 inorder 切分左右子樹，後序為 `D,E,B,F,C,A`，答案 C 正確且唯一。

Q009 - pass: Bucket Sort 達到 O(n) 仰賴元素均勻分佈與桶內成本分散，答案 A 合理。answerNote 已保留「理想或平均情況」限制，避免過度宣稱無條件線性。

Q010 - pass: Stable sort 定義為相等鍵值排序後保持原始相對順序，答案 D 正確；其餘選項混淆陣列不變、時間或空間複雜度。

Q011 - pass: 記憶體層次由最快到最慢為暫存器、快取、主記憶體、硬碟，答案 A 正確。

Q012 - pass: 以「類別多重繼承」為判斷基準時，Java 必須透過多個 interface 模擬多重能力，答案 B 正確。answerNote 已保留此語意邊界。

Q013 - pass: Python 可歸為強型別且動態型別，答案 C 合理；解析正確區分強弱型別與靜態/動態型別兩條軸線。

Q014 - pass: C 語言此例為 pass by value，`func(a)` 只修改參數副本 `p`，`main` 中 `a` 仍為 3，答案 B 正確。

Q015 - pass: AVL 樹與一般 BST 的核心差異是維持平衡因子在 -1 到 1，答案 B 正確；解析未把高度差誤寫成鍵值差。

Q016 - needs-review: 官方答案 D 對應 XOR 在加法器中計算 sum bit 的典型用途，技術上正確；但選項 B「檢測溢位」可由二補數最高位 carry-in 與 carry-out 做 XOR 支持，具可辯性。目前 `answerVerification: 'needs-review'` 與 answerNote 均已保留，符合 contract。

Q017 - pass: Dirty Read 定義為讀到其他交易已修改但尚未提交的資料，答案 C 正確；解析也正確區分 non-repeatable read 與 lost update。

Q018 - pass: 2NF 消除部分函數依賴，3NF 才消除傳遞函數依賴，因此 B 明確錯誤。A 與 D 用語較簡化但不影響答案唯一性，answerNote 已保留此脈絡。

Q019 - pass: Currying 是函數式程式設計概念，將多參數函式轉成一連串單參數函式，答案 C 正確。

Q020 - pass: 紅黑樹新插入節點通常先設紅色，避免立即增加黑高度，答案 B 正確。answerNote 已保留根節點最後會被設為黑色的特例。

Q021 - pass: FCFS 的優點是規則簡單、容易實作且先來先服務具公平性，答案 A 正確；平均等待時間最短與互動式適用性不是 FCFS 保證。

Q022 - pass: RGB(0,0,0) 在加色模型中代表三通道無光，因此為黑色，答案 D 正確；透明度屬 alpha channel，已被正確排除。

Q023 - pass: Overfitting 的典型現象是訓練誤差低、測試誤差高，答案 D 正確；解析未把訓練集表現好誤認成泛化良好。

Q024 - pass: 依典型 SMP 教材觀點，SMP 的必要特性是多 CPU 對稱、共享主記憶體與同一 OS 管理；「任一 CPU 故障通常導致整體停擺」不是必要特性，答案 C 可成立。answerNote 已保留系統設計語境差異。

Q025 - pass: ALU、control unit、Register 是基本 CPU 組成分類；SRAM 是記憶體技術，可用於 cache，但不是此題所問的基本 CPU 組成元件，答案 D 正確。answerNote 已保留 SRAM/cache 的語意邊界。

## Blocking findings

無。Q016 仍為 `needs-review`，但這是已正確保留的疑義狀態，不是本輪 blocking finding。

## Suggested fixes

無需立即修正程式碼或資料。後續若要解除 Q016 的 `needs-review`，需先人工確認題意是否明確排除二補數 overflow detection；在確認前不應移除 answerNote 或改成 verified。

## Verification notes

- 讀取 `design.md` 的 Implementation Contract，確認本輪審查準則包含不改官方答案、保留 `originalStem`、options A-D、`acceptedAnswers`、`answerVerification`、`answerNote`、`sourceRef` 與 tags。
- 讀取 `specs/a-group-question-analysis/spec.md`，確認 114 年解析需符合非資工新手教學、計算/流程需逐步套用、選項需說明干擾概念。
- 讀取 `114.ts`，核對 Q001-Q025 題幹、A-D 選項、官方答案與 `createQuestion()` 的 `acceptedAnswers: [raw.answer]` 行為。
- 讀取 `114ReviewedAnalyses.ts`，逐題核對 Q001-Q025 的 `answerVerification`、`answerNote`、核心公式與選項解析。
- 讀取 draft packets `q005-q012.md`、`q013-q020.md`、`q021-q028.md`，比對 answerNote changes 與 reviewer concerns，特別檢查 Q016、Q018、Q020、Q024、Q025。
- 執行唯讀的 `spectra status --change "refine-a-group-114-novice-teaching-analysis" --json` 與 `spectra instructions apply --change "refine-a-group-114-novice-teaching-analysis" --json` 以確認 change 與任務狀態；未執行會修改狀態的 Spectra 指令，未標記 tasks.md。
- 未執行自動化測試；本任務目標是 Technical Reviewer 靜態審查並產出 report，未修改程式碼、測試或 tasks.md。
