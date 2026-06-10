## Why

使用者要解決的問題是：A 組 114 年題解雖已具備逐題解析，但部分內容仍假設讀者懂資工術語，非資工新手不容易從名詞、核心想法、使用方式一路理解到答案。現在先以 114 年 50 題作為標準化樣板，讓後續年度與其他科目的解析品質有明確基準。

## What Changes

- 重寫或補強 A 組 114 年 50 題教學解析，使每題先說明名詞、問題目的、核心規則，再套回題幹與選項。
- 將 Q001 二補數、Q002 馮紐曼架構、Q003 Python 型別、Q004 CRC 作為 canonical examples。
- 對分類、比較、流程或公式對照題使用 teachingTables；Q003 必須包含 Python 主要型別表與 list/tuple/set 比較表。
- 強化 114 年內容審查 rubric，擋下只給答案、缺少名詞解釋、缺少使用流程或缺少陷阱說明的解析。
- 實作階段允許複代理平行產出草稿與審查報告，但由主代理統一合併資料。

## Non-Goals

- 不重做 107-113 年解析。
- 不新增 A 組路由、PWA 離線架構或新的學習互動模式。
- 不變更官方答案，除非重寫時發現題目或答案疑義，屆時只保留 answerNote 或 review 狀態。
- 不強制每題都有表格；表格只在能提升理解時使用。

## Capabilities

### New Capabilities

(none)

### Modified Capabilities

- a-group-question-analysis: 114 年題解需符合非資工新手教學解析標準，並支援以 teachingTables 呈現比較型內容。

## Impact

- Affected specs: a-group-question-analysis
- Affected code:
  - Modified: src/modules/examGroups/aGroup/data/years/114ReviewedAnalyses.ts
  - Modified: src/modules/examGroups/aGroup/data/years/114.ts
  - Modified: src/modules/examGroups/aGroup/types/questionAnalysis.ts
  - Modified: src/modules/examGroups/aGroup/components/AGroupQuestionCard.vue
  - Modified: src/modules/examGroups/aGroup/data/years/contentReview.ts
  - Modified: tests/unit/aGroup114ContentReview.spec.ts
  - Modified: tests/unit/AGroupQuestionCard.spec.ts
  - Modified: tests/unit/questionAnalysisShape.spec.ts