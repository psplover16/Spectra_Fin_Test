## Context

本變更要把國營事業資訊人員考試講義 PWA 從路由外殼推進到五科完整內容。需求來源只指定三組資料來源與階段順序：第一階段處理 `_private/計算機原理、網路概論/`，第二階段處理 `@/_private/資訊管理、程式設計/`，第三階段處理 `@/_private/國文、英文/`。目前指定資料夾內來源檔以 PDF 為主；若後續出現 Markdown，也依同一來源階段規則處理。內容整理必須使用大量副代理，主流程只負責整併、去重、統一術語與轉成前端資料。

## Goals / Non-Goals

**Goals:**

- 五個路由都呈現完整學習內容，不停留在空白、骨架或摘要狀態。
- 來源處理遵守三階段順序，且每一階段使用多個副代理分批整理。
- 前端以可維護的 typed content data 呈現內容，並保留來源檔案回溯資訊。
- CI/CD 驗證路由、內容資料、測試或建置與 PWA 產出。

**Non-Goals:**

- 不新增後台、伺服器、使用者帳號或外部 API。
- 不在瀏覽器執行 PDF 或 Markdown 原始來源檔即時解析。
- 不讀取非指定來源資料夾或個人筆記。
- 不為尚未校對的題目建立正式測驗題。

## Decisions

### 使用 typed subject content data 承載五科內容

將五科內容整理成前端可直接匯入的資料模組，例如 `SubjectContent[]`。這比在頁面元件中硬寫文字更容易測試，也能讓 `ExamRouteView` 只負責呈現資料。替代方案是直接把內容寫在 Vue template；淘汰原因是難以追蹤來源、重複版面高，且測試只能檢查畫面文字。

### 來源整理階段與副代理輸出分離

每個來源檔至少建立一個副代理工作項，科目整併再建立彙整工作項。副代理輸出固定包含摘要、考點、重點、題目對照、來源檔案與待校對標記；主流程合併後才進入前端資料。替代方案是由主代理逐檔整理；淘汰原因是違反大量副代理要求，也會讓錯漏集中在單一路徑。

### 不新增 runtime parser

PDF 與 Markdown 來源檔只在實作整理階段被處理，PWA runtime 只載入已整理資料。替代方案是在前端讀取原始檔並解析；淘汰原因是私有來源不應成為 runtime 依賴，且會增加離線快取與瀏覽器解析風險。

### 離線與狀態職責維持簡單

學習內容以 build output 或 bundled app data 提供離線閱讀。localStorage 不新增內容儲存責任；IndexedDB 不新增大量內容資料庫；Pinia 不新增全域學習內容 store。若後續加入進度追蹤，才由獨立變更定義 state shape。

## Implementation Contract

**Observable behavior:** 使用者從 PWA 入口可進入五個科目路由；每個路由都有科目總覽、高頻考點、年度來源索引、主題式講義、複習清單、易錯觀念，以及題目或來源與考點的對照。任何科目不得顯示為待補內容、空白頁或只有路由殼。

**Data shape:** 新增或更新 `SubjectContent` 資料模型，至少包含 `id`, `title`, `routePath`, `stage`, `sourceFolders`, `overview`, `highFrequencyPoints`, `yearlySources`, `lectureSections`, `reviewChecklist`, `pitfalls`, `questionMappings`, `synthesisBatches`。來源欄位至少保留 `sourceFolder`, `sourceFile`, `sourceYear` 或 `sourceBatch`, `verificationStatus`。題目對照欄位至少保留 `subject`, `examPointId`, `difficulty`, `questionType`, `questionStem`, `options[4]`, `correctAnswer`, `optionExplanations[4]`, `lectureSectionId`, `verificationStatus`；未校對題目不得作為正式測驗題呈現。

**Source workflow:** 第一階段完成「計算機原理」與「網路概論」，第二階段完成「資訊管理」與「程式設計」，第三階段完成「語言」。每個階段必須有副代理分批輸出與主流程整併輸出；副代理結果需能回溯來源檔案。

**Failure modes:** 若某科缺少必要內容區塊，單元測試應失敗。若某來源項缺少來源檔案或校對狀態，資料驗證測試應失敗。若 PWA build output 缺失或路由無法渲染內容，CI/CD 應失敗。

**Acceptance criteria:** `tests/unit/subjectContent.spec.ts` 驗證五科資料完整度、來源回溯、四選項題目欄位與校對狀態；`tests/unit/examRoutes.spec.ts` 驗證五個路由都連到內容資料；`tests/e2e/exam-learning.spec.ts` 驗證入口導覽與至少一個科目內容渲染。CI/CD 必須執行安裝、檢查、測試或建置，並確認 PWA 產出存在。

**Scope boundaries:** 本變更只整理並呈現指定來源的學習內容與交付驗證；不新增測驗流程、進度追蹤、搜尋、後台管理或外部部署平台切換。

## Risks / Trade-offs

- [Risk] 指定來源檔案可能無法直接抽取文字 → Mitigation: 副代理輸出需標示待校對與來源，無法校對的題目不得變成正式測驗題。
- [Risk] 五科內容量大導致資料模組膨脹 → Mitigation: 以科目切分資料檔，build 後檢查 chunk 警戒線。
- [Risk] 大量副代理輸出風格不一致 → Mitigation: 主流程負責去重、統一術語、章節順序與內容欄位格式。
- [Risk] CI/CD 平台細節未在需求來源中指定 → Mitigation: 沿用現有 workflow，只補足安裝、檢查、測試或建置與 PWA 產出驗證。

## Migration Plan

1. 先加入 typed content model 與資料完整度測試。
2. 依三階段來源順序整理並匯入內容。
3. 更新路由資料與頁面呈現。
4. 更新 CI/CD 驗證。
5. 若 build 或測試失敗，回退本變更新增的內容資料與路由連接，不影響既有 PWA 外殼。

## Open Questions

指定資料夾內來源格式已在 apply 前盤點為 PDF 為主，因此後續 tasks 以「指定來源檔（PDF/Markdown）」執行。若實作時又發現額外格式或缺檔，apply 階段需先回報並以來源盤點結果更新 tasks 或重新 ingest。
