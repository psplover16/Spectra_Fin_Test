## Why

使用者需要一個能作為國營事業資訊人員考試講義的 PWA，不只提供路由外殼，而是能依近八年考古題與指定資料來源完整整理五個科目的內容。現在要做，是因為前兩科 PDF 與後續科目資料來源已被指定，且需明確規範大量副代理分工，避免實作時只停留在骨架頁或零散摘要。

## What Changes

- 建立並完成五個學習路由：計算機原理、網路概論、資訊管理、程式設計、語言。
- 第一階段以 `_private/計算機原理、網路概論/` PDF，透過大量副代理完整整理前兩科。
- 第二階段以 `@/_private/資訊管理、程式設計/` 指定來源檔（PDF/Markdown），完整完成資訊管理與程式設計。
- 第三階段以 `@/_private/國文、英文/` 指定來源檔（PDF/Markdown），完整完成語言。
- CI/CD 需涵蓋安裝、檢查、測試或建置與 PWA 產出驗證。

## Non-Goals

- 不建立後台編輯器或伺服器端功能。
- 不把非指定資料夾或個人筆記納入內容來源。
- 不在前端即時解析 PDF；來源整理應先產出可呈現的學習內容。

## Capabilities

### New Capabilities

- `exam-subject-learning-content`: 規範五個科目路由的完整學習內容、來源階段順序、考點整理與副代理分工結果要求。
- `exam-content-delivery-validation`: 規範內容交付時的路由可用性、PWA 建置與 CI/CD 驗證要求。

### Modified Capabilities

(none)

## Impact

- Affected specs: exam-subject-learning-content, exam-content-delivery-validation
- Affected code:
  - Modified: src/modules/exam/data/examRoutes.ts, src/modules/exam/views/ExamRouteView.vue, src/modules/exam/views/LandingView.vue, tests/unit/examRoutes.spec.ts, tests/e2e/exam-learning.spec.ts, .github/workflows/ci.yml, .github/workflows/cd.yml
  - New: src/modules/exam/data/subjectContent.ts, src/modules/exam/types/content.ts, tests/unit/subjectContent.spec.ts
  - Removed: none
