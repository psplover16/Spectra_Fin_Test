# Novice Reviewer Report: 114-Q001 to Q025

## Summary

本次以非資工新手可讀性為主軸，檢查 `114ReviewedAnalyses.ts` 中 Q001-Q025 是否符合 Implementation Contract 與 spec rubric：先補必要名詞與問題目的，再說明規則、公式或判斷來源，接著把規則逐步套回題幹與選項，最後整理可複用規則與常見陷阱。

結論：Q001-Q025 整體已具備新手教學結構，沒有發現因 beginnerExplanation、solvingSteps、optionExplanations、keyTakeaways 或 teachingTables 過淺而必須阻擋的問題。Q016 文字本身有解釋 XOR 在 sum bit 與 overflow detection 的邊界，但題目答案仍有可辯性，資料也已標為 `needs-review`，因此本 report 也將 Q016 列為 `needs-review`。本次沒有修改題解資料，因此未使用 `fixed` 狀態。

## Per-question findings Q001-Q025

Q001 - pass: 二補數題有先講 6 位元寬度、二補數範圍、負數轉換、固定寬度加法與 signed overflow；solvingSteps 逐步把 100111、111000、011111 套回題幹，選項也能指出位元結果或範圍錯誤，適合非資工新手。

Q002 - pass: 馮紐曼架構先說明儲存程式概念與五大功能單元，再逐項排除實體設備、軟體清單與 CPU 細部元件；keyTakeaways 可複用，沒有表格也不影響理解。

Q003 - pass: Python 型別與 list/tuple/set 的比較有足夠前置分類，並用兩張 teachingTables 承接具體表示法、順序、索引、重複與可變性；表格有助於新手建立對照，不是額外負擔。

Q004 - pass: CRC 先講資料多項式、生成多項式、GF(2) XOR 除法、補 0 與餘數，再把 G(x)=X^3+X^1 轉成 1010；選項說明能指出餘數與常見誤算來源。

Q005 - pass: Hamming(7,4) 有先交代校驗位位置、偶校驗規則與資料位配置；solvingSteps 逐格計算 p1、p2、p4，兩張表格對新手追蹤位置與檢查組很有幫助。

Q006 - pass: ACID 先定義 transaction 與四個字母，再釐清 Availability、Concurrency、Integrity、Dependability 等干擾詞；表格讓字母、中文概念與陷阱集中對照，負擔合理。

Q007 - pass: 優先權排程、starvation 與 Aging 的因果關係講清楚，solvingSteps 能逐項排除增加核心、調整 time quantum 與強制終止等非對症做法。

Q008 - pass: 二元樹走訪先定義 preorder、inorder、postorder，再用 preorder 找根、inorder 切子樹、postorder 合併；表格摘要重建流程，有助於新手跟上遞迴。

Q009 - pass: Bucket Sort 先說流程，再說 O(n) 依賴均勻分佈與桶內成本分散；選項說明能排除所有元素相同、桶數誤解與單一桶退化。

Q010 - pass: Stable sort 的「相等鍵值保留相對順序」定義清楚，並明確切開排序結果不變、時間複雜度穩定與空間固定等常見誤解。

Q011 - pass: 記憶體層次用「越靠近 CPU 越快」作為判斷規則，逐步排出暫存器、快取、主記憶體、硬碟；表格輔助速度與容量直覺，對新手有幫助。

Q012 - pass: 多重類別繼承、interface 與 Java 的 extends/implements 限制有先講清楚；語言比較表能幫助排除 C++、JavaScript、Python，不會增加閱讀負擔。

Q013 - pass: 強/弱型別與靜態/動態型別被拆成兩條軸線說明，避免新手把動態型別等同弱型別；表格能支撐 Python、Java、JavaScript 的比較。

Q014 - pass: C 語言 pass by value 用 main 的 `a` 與 func 的 `p` 分開說明，執行追蹤表有效降低新手對參數副本的混淆。

Q015 - pass: AVL 先補 BST、平衡因子、旋轉與高度差概念，再說明與一般 BST 差異；表格能明確排除「鍵值差」與「多父節點」干擾。

Q016 - needs-review: 新手教學文字本身合格，已說明 XOR 真值表、半加器、全加器 sum bit 與 carry/overflow 的邊界；但選項 B 的 overflow detection 也可用 XOR，資料已標 `answerVerification: 'needs-review'`。此題需人工確認題意是否只考 XOR 在 sum bit 的典型用途。

Q017 - pass: READ UNCOMMITTED、未提交資料、rollback 與 Dirty Read 的關係有明確情境化；表格有效比較 Dirty Read、non-repeatable read、lost update 與舊資料。

Q018 - pass: 1NF、2NF、3NF、BCNF 的處理問題與常見混淆有先建立；雖 answerNote 承認 A、D 措辭較簡化，但 B 把 2NF 與 3NF 混淆的判斷對新手仍清楚。

Q019 - pass: Currying 有先說明函式可被傳遞、回傳與組合，再解釋多參數函式轉成連續單參數函式；選項能區分函數式、物件導向、程序式與邏輯式。

Q020 - pass: 紅黑樹先講根黑、紅節點限制、黑高度，再說新節點預設紅色的原因；表格可幫助新手理解為何黑色、隨機或跟父節點同色不合適。

Q021 - pass: FCFS/FIFO、優點與 convoy effect 的邊界講得清楚；solvingSteps 能把簡單公平與平均等待最短、互動式適合、CPU 效率高分開。

Q022 - pass: RGB 加色模型、三通道亮度與 alpha channel 有先補名詞，能清楚排除透明、白色、灰色；不需表格，段落與步驟已足夠。

Q023 - pass: 過擬合以泛化能力、訓練誤差與測試誤差建立判斷規則；選項說明能指出「訓練好、測試差」才是核心，不只是訓練資料表現好。

Q024 - pass: SMP 的對稱、多 CPU、共享主記憶體與記憶體瓶頸都有先講清楚；answerNote 也保留典型教材觀點，能避免新手誤以為任一 CPU 故障必然停擺。

Q025 - pass: CPU 基本組成先講 ALU、控制單元、Register，再界定 SRAM 是記憶體技術、可用於快取但不是基本 CPU 組成分類；常見陷阱界線清楚。

## Blocking findings

無針對新手可讀性的 blocking findings。Q016 為答案可辯性與題意確認問題，已列為 `needs-review`，但不是因解析文字缺少新手教學結構而阻擋。

## Suggested fixes

- Q016：建議由 Technical Reviewer 或主代理依題本上下文確認題目是否明確限定 XOR 在加法器中的「sum bit」用途。若維持答案 D，建議保留目前的 ambiguity note，並可再補一句說明「本題採最直接的加法器功能分類；overflow detection 屬另一個 XOR 應用場景」。

## Verification notes

- 已讀取 `openspec/changes/refine-a-group-114-novice-teaching-analysis/design.md` 的 Implementation Contract。
- 已讀取 `openspec/changes/refine-a-group-114-novice-teaching-analysis/specs/a-group-question-analysis/spec.md`。
- 已檢查 `src/modules/examGroups/aGroup/data/years/114ReviewedAnalyses.ts` 中 Q001-Q025 的 beginnerExplanation、solvingSteps、optionExplanations、keyTakeaways 與 teachingTables。
- 已對照 `src/modules/examGroups/aGroup/data/years/114.ts` 中 Q001-Q025 的題幹、選項與官方答案。
- 未執行 npm、vitest、typecheck 或 build；本任務是內容 review report，且要求不得修改程式碼、測試或 Spectra task。
