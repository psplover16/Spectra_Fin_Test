## 1. Content Data Contract

- [x] 1.1 實作「使用 typed subject content data 承載五科內容」：建立 `SubjectContent` 與來源/題目對照型別，使 Complete five-subject learning content 能以 typed data 表示五科、階段、來源、章節、考點與題目欄位；以 TypeScript 型別檢查與 `tests/unit/subjectContent.spec.ts` 驗證欄位存在。
- [x] 1.2 建立 Subject content structure 與 Source traceability 資料驗證：測試五科內容都含科目總覽、高頻考點、年度來源索引、主題式講義、複習清單、易錯觀念與來源檔案資訊；以 `tests/unit/subjectContent.spec.ts` 驗證缺少任一區塊或來源欄位時會失敗。

## 2. Source Workflow and Subagent Synthesis

- [x] 2.1 落實「來源整理階段與副代理輸出分離」與 Source order for content completion：先盤點 `_private/計算機原理、網路概論/`，為每個來源檔建立至少一個副代理工作項，並為「計算機原理」與「網路概論」各建立至少一個科目整併工作項；以副代理輸出清單與 subjectContent 測試驗證 stage=1、來源路徑與兩科必備內容。
- [x] 2.2 執行 Parallel subagent synthesis 的第一階段整併：將「計算機原理」與「網路概論」副代理摘要、考點、重點、題目對照與學習內容合併進前端資料；以內容審查驗證定義正確、解題邏輯完整、干擾選項能區分觀念。
- [x] 2.3 依 Source order for content completion 處理第二階段：完成第一階段後，盤點 `@/_private/資訊管理、程式設計/` 指定來源檔（PDF/Markdown），為每個來源檔建立至少一個副代理工作項，並為「資訊管理」與「程式設計」各建立至少一個科目整併工作項；以副代理輸出清單與 subjectContent 測試驗證 stage=2、來源路徑與兩科必備內容。
- [x] 2.4 執行 Parallel subagent synthesis 的第二階段整併：將「資訊管理」與「程式設計」副代理結果合併進前端資料；以內容審查驗證專業科目定義正確、解題邏輯完整、題目欄位包含 4 個選項、1 個正解、4 份選項辨析、考點標籤與來源資訊。
- [x] 2.5 依 Source order for content completion 處理第三階段：完成第二階段後，盤點 `@/_private/國文、英文/` 指定來源檔（PDF/Markdown），為每個來源檔建立至少一個副代理工作項，並為「語言」建立至少一個科目整併工作項；以內容審查驗證文意或語法答案唯一、解析足以支撐學習，並以 subjectContent 測試驗證 stage=3 與必備內容。

## 3. Route Rendering and Runtime Boundaries

- [x] 3.1 實作 Subject route delivery：五個路由都從 PWA 入口可達，且每個路由連到對應 `SubjectContent`；以 `tests/unit/examRoutes.spec.ts` 與 `tests/e2e/exam-learning.spec.ts` 驗證入口導覽與五科 route metadata。
- [x] 3.2 更新科目頁呈現 Complete five-subject learning content：`ExamRouteView` 顯示各科總覽、高頻考點、年度來源索引、講義、複習清單、易錯觀念與題目對照；以 e2e smoke 驗證任一科目不出現空白頁、骨架頁、摘要-only 或待補內容。
- [x] 3.3 實作「不新增 runtime parser」與 Built content availability：PWA runtime 僅載入 bundled app data，不從私有來源資料夾讀取 PDF 或 Markdown；以 production build 檢查與程式審查驗證路由能從 build output 渲染內容。
- [x] 3.4 落實「離線與狀態職責維持簡單」：不新增 localStorage、IndexedDB 或 Pinia 內容儲存責任，內容以 build output 離線可讀；以離線模式手動驗證一個專業科目與語言路由可開啟並顯示內容。

## 4. Delivery Validation

- [x] 4.1 建立 Content route regression tests：測試移除任一科目 route metadata、內容 metadata 或必備區塊時會失敗；以 Vitest 與 Playwright 測試結果驗證回歸保護。
- [x] 4.2 補足 CI validation coverage：CI/CD 執行安裝、靜態檢查或型別檢查、測試或 production build，並確認 PWA output 存在；以 workflow 執行紀錄或本機等效命令驗證失敗條件會阻擋部署。
- [x] 4.3 完成最終驗證：執行 `spectra analyze complete-exam-pwa-subject-content --json`、`spectra validate complete-exam-pwa-subject-content`、專案測試與 production build；以命令輸出確認 artifacts、內容資料、路由、PWA build 與 CI/CD 契約一致。
