## Why

使用者已確認 114 年 A 組題卡版型與新手教學深度，接下來需要把近 8 年範圍補齊到 107 至 114 年。propose 階段已平行盤點 107-113 PDF：每年 4 頁、50 題、題號連續、A-D 選項完整，但存在多答案、送分、圖形、表格、程式碼與特殊符號風險，因此必須以 PDF 來源基準驅動實作任務。

## What Changes

- 新增 107-113 年 A 組共 350 題完整逐題解析，沿用 114 年資料 shape、題卡版型、內容審查 rubric 與新手系統教學標準。
- 將 107-113 年 `/a-group/:year` 從 pending 頁改為完整解析頁，並讓年度列表顯示 107-114 皆為可學習內容。
- 為每年新增 PDF 來源基準、官方答案檢查、逐題內容審查與測試。
- 擴充內容審查，要求多答案、送分、needs-review、suspected-error 不得被硬標為 verified。
- 更新 `PROJECT_ARCHITECTURE.md`、`TEST_MATRIX.md` 與相關 specs。

## Non-Goals

- 不處理 B 組、共同科目或 106 年以前題目。
- 不新增伺服器、帳號、同步或 analytics。
- 不改寫 114 年版型；只抽共用 helper 或審查邏輯以支援 107-113。

## Capabilities

### New Capabilities

(none)

### Modified Capabilities

- `a-group-question-analysis`: 擴充 A 組逐題解析資料與審查契約到 107-113 年。
- `exam-group-routing`: 107-113 年 A 組年度路由改為完整解析頁。
- `a-group-year-progress`: 年度列表與本機進度需支援 107-114 皆為完整解析年度。

## Impact

- Affected specs: a-group-question-analysis, exam-group-routing, a-group-year-progress
- Affected code:
  - New: src/modules/examGroups/aGroup/data/years/107.ts through src/modules/examGroups/aGroup/data/years/113.ts, src/modules/examGroups/aGroup/data/years/107SourceBaseline.ts through src/modules/examGroups/aGroup/data/years/113SourceBaseline.ts, src/modules/examGroups/aGroup/data/years/107ReviewedAnalyses.ts through src/modules/examGroups/aGroup/data/years/113ReviewedAnalyses.ts, tests/unit/aGroup107QuestionContent.spec.ts through tests/unit/aGroup113QuestionContent.spec.ts, tests/unit/aGroup107SourceBaseline.spec.ts through tests/unit/aGroup113SourceBaseline.spec.ts, tests/unit/aGroup107ContentReview.spec.ts through tests/unit/aGroup113ContentReview.spec.ts
  - Modified: src/modules/examGroups/aGroup/composables/useAGroupYearQuestions.ts, src/modules/examGroups/aGroup/data/yearSummaries.ts, src/modules/examGroups/aGroup/data/years/114ContentReview.ts, src/modules/examGroups/aGroup/types/questionAnalysis.ts, src/modules/examGroups/aGroup/views/AGroupYearView.vue, tests/unit/aGroupYearQuestionLoader.spec.ts, tests/unit/aGroupYearSummaries.spec.ts, tests/unit/AGroupYearView.spec.ts, tests/e2e/group-routes.spec.ts, PROJECT_ARCHITECTURE.md, TEST_MATRIX.md
  - Removed: none
