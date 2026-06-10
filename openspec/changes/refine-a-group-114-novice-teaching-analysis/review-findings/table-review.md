# Table Reviewer Report

Change: `refine-a-group-114-novice-teaching-analysis`

Task scope: 檢查 114 年 `teachingTables` 是否符合 Implementation Contract、規格與非資工新手教學用途。本次為 review-only，未修改程式碼、測試或 `tasks.md`。

## Summary

- 總計 50 題中有 20 題包含 `teachingTables`，共 22 張表。
- 所有表格都有非空 `title`、`headers`、`rows`，且每列 cell 數量皆等於 headers 數量。
- Q003 已包含兩張必要表格：Python 常見主要型別表，以及 list、tuple、set 核心差異表。
- Q003 表格內容已包含 `[1, 2, 3]`、`(1, 2, 3)`、`{1, 2, 3}`、`set()`。
- 表格用途皆落在 comparison、classification、process、layer、formula-reference 等有助理解的內容，未發現裝飾性或不必要表格。
- 手機可讀性檢查未發現需要拆表的項目。
- 指定 vitest 已通過。

## Teaching Table Inventory

| 題號 | 表格數 | 表格標題 |
| --- | ---: | --- |
| Q001 | 0 | 無 |
| Q002 | 0 | 無 |
| Q003 | 2 | Python 常見主要型別對照；list、tuple 與 set 核心差異 |
| Q004 | 0 | 無 |
| Q005 | 2 | Hamming(7,4) 位元配置；偶校驗檢查組 |
| Q006 | 1 | ACID 四個字母對照 |
| Q007 | 0 | 無 |
| Q008 | 1 | 由 Preorder 與 Inorder 重建後序 |
| Q009 | 0 | 無 |
| Q010 | 0 | 無 |
| Q011 | 1 | 記憶體層次由快到慢 |
| Q012 | 1 | 語言與多重類別繼承比較 |
| Q013 | 1 | 強弱型別與靜態動態型別是兩條軸線 |
| Q014 | 1 | C 傳值呼叫執行追蹤 |
| Q015 | 1 | 一般 BST 與 AVL 樹比較 |
| Q016 | 1 | XOR 在加法器中的功能分工 |
| Q017 | 1 | 資料庫交易異常比較 |
| Q018 | 1 | 正規化層級對照 |
| Q019 | 0 | 無 |
| Q020 | 1 | 紅黑樹插入顏色判斷 |
| Q021 | 0 | 無 |
| Q022 | 0 | 無 |
| Q023 | 0 | 無 |
| Q024 | 0 | 無 |
| Q025 | 0 | 無 |
| Q026 | 1 | 相同 baud 下的資料率比較 |
| Q027 | 1 | 四個 /21 網段的連續範圍 |
| Q028 | 1 | TCP flow control 與 congestion control |
| Q029 | 0 | 無 |
| Q030 | 0 | 無 |
| Q031 | 0 | 無 |
| Q032 | 0 | 無 |
| Q033 | 0 | 無 |
| Q034 | 0 | 無 |
| Q035 | 0 | 無 |
| Q036 | 0 | 無 |
| Q037 | 0 | 無 |
| Q038 | 0 | 無 |
| Q039 | 0 | 無 |
| Q040 | 0 | 無 |
| Q041 | 0 | 無 |
| Q042 | 0 | 無 |
| Q043 | 0 | 無 |
| Q044 | 0 | 無 |
| Q045 | 0 | 無 |
| Q046 | 1 | IDPS 偵測技術比較 |
| Q047 | 0 | 無 |
| Q048 | 1 | WAF 與封包過濾式防火牆比較 |
| Q049 | 1 | 傳統 MFA 因素與位置訊號 |
| Q050 | 1 | TCP/IP 網路層相關協定與傳輸層對照 |

## Findings

| 狀態 | 範圍 | Finding |
| --- | --- | --- |
| pass | 全部 `teachingTables` | 22 張表皆有非空 `title`、非空 `headers`、非空 `rows`；未發現空 header 或空 cell。 |
| pass | 全部 `teachingTables` | 每列 cell 數量皆等於該表 headers 數量，未發現 shape mismatch。 |
| pass | Q003 | 已有 Python 常見主要型別表，欄位涵蓋中文類別、型別名稱、具體表示法與主要特徵。 |
| pass | Q003 | 已有 list、tuple、set 比較表，涵蓋字面值寫法、順序、索引、重複元素、可變性與本題判斷重點。 |
| pass | Q003 | 指定具體表示法 `[1, 2, 3]`、`(1, 2, 3)`、`{1, 2, 3}`、`set()` 均存在。 |
| pass | 教學用途 | 表格內容皆屬比較、分類、流程追蹤、層級對照或公式參考，例如 Hamming 位元配置、ACID 分類、tree traversal process、網路層協定對照等；未發現只為裝飾或重複段落的表格。 |
| pass | 手機可讀性 | 表格多為 3 到 4 欄；Q013 為 5 欄但 cell 短且比較軸明確。最長 header 為 Q026 `每符號 bit 數 log2(M)`，長度 17；最長 cell 為 Q003 `元素有固定順序，可用位置索引讀取；list 與 tuple 的差別在可變性。`，長度 38。未達需要拆表的程度。 |
| pass | 測試覆蓋 | `AGroupQuestionCard.spec.ts` 覆蓋 optional teaching table rendering；`questionAnalysisShape.spec.ts` 覆蓋合法表格與 row/header mismatch 反例。 |

本次沒有 `fixed` 類 finding，因為任務要求僅產出 review report，不修改資料或測試。

## Blocking Findings

無。

## Suggested Fixes

無。

## Verification Notes

- 已讀取 `openspec/changes/refine-a-group-114-novice-teaching-analysis/design.md` 的 Implementation Contract。
- 已讀取 `openspec/changes/refine-a-group-114-novice-teaching-analysis/specs/a-group-question-analysis/spec.md`。
- 已讀取 `src/modules/examGroups/aGroup/data/years/114ReviewedAnalyses.ts`。
- 已讀取 `tests/unit/AGroupQuestionCard.spec.ts`。
- 已讀取 `tests/unit/questionAnalysisShape.spec.ts`。
- 程式化檢查結果：`issueCount = 0`；empty cells = 0；Q003 required representations 全部 found。
- 手機可讀性檢查結果：未發現過長到需要拆表的 headers 或 rows。
- 已執行：

```bash
npx vitest run tests/unit/AGroupQuestionCard.spec.ts tests/unit/questionAnalysisShape.spec.ts
```

Vitest 結果：

```text
Test Files  2 passed (2)
Tests       22 passed (22)
Duration    2.45s
Exit code   0
```
