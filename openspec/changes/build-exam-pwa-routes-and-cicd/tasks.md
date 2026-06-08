## 1. 參考比對與專案骨架

- [x] 1.1 讀取 Spectra-Learning-Japanese 參考專案並形成比對結論，交付 `Adapt N5 Grammar Learning Page Experience Without Content Import`、`Mirror GitHub Pages CI/CD With Repository-Specific Settings`、`Scope Boundaries` 的實作依據；完成定義為 `PROJECT_ARCHITECTURE.md` 記錄 N5 文法子路由可參考的版面結構、互動流程、視覺風格與 GitHub Pages 設定差異，並以內容審查確認未讀取本專案 `_private` 來源 Markdown/PDF 作為頁面資料。
- [x] 1.2 建立 `Build Vue PWA Foundation From Project Conventions` 所需的 Vue 3 + TypeScript + Vite + Tailwind + Vue Router 專案骨架，交付可啟動的 app shell 與基本建置流程；完成定義為 `npm install` 與 `npm run build` 成功，且 `.gitignore` 排除 `node_modules/`, `dist/`, `build/`, `coverage/`, `test-results/`, `playwright-report/`。

## 2. TDD 測試先行

- [x] [P] 2.1 先建立 Vitest 測試覆蓋 `Five exam learning routes`、`Route metadata shape`、`Placeholder learning content`、`Unknown route recovery` 與 `Interface And Data Shape`，交付 route metadata 與空內容狀態的可驗證契約；完成定義為測試在實作前失敗、實作後 `npm run test:unit` 通過。
- [x] [P] 2.2 先建立 Playwright 測試覆蓋 `Observable Behavior`、`Offline app shell fallback`、`Mobile-first reading layout` 與 `Subject-specific visual distinction`，交付手機 viewport、未知路由與離線 app shell 的 smoke contract；完成定義為測試在實作前失敗、實作後 `npx playwright test` 通過。

## 3. 路由、頁面與 PWA 行為

- [x] 3.1 實作 `Implement Five English-Slug Learning Routes`，交付 `/computer-principles`, `/networking`, `/information-management`, `/programming`, `/language` 5 個英文 slug 路由與中文顯示名稱；完成定義為 task 2.1 的 route metadata 測試通過，並手動確認每個路由可從入口導覽進入。
- [x] 3.2 實作 `Keep Placeholder Content Separate From Exam Source Data` 與 `No source content import in style pages`，交付每個路由的非空佔位內容、source group 標籤與「尚未匯入正式講義」狀態；完成定義為 task 2.1 的 placeholder/unknown route 測試通過，且 `rg "_private/.*\.md|_private/.*\.pdf" src public` 不出現將私有來源檔案當頁面資料匯入的程式碼。
- [x] 3.3 實作 `Reference learning page experience`、`Mobile-first reading layout` 與 `Subject-specific visual distinction`，交付參考 N5 文法子路由的學習頁版面、互動流程與視覺風格，並讓 5 個科目保持一致架構與可區分科目識別；完成定義為 task 2.2 的手機 smoke test 通過，並手動確認 390 px viewport 無水平捲動、文字重疊或主要操作區遮擋。
- [x] 3.4 實作 `Installable PWA shell`、`Offline app shell fallback`、`Non-blocking service worker failure` 與 `Failure Modes`，交付 manifest、icons、service worker 註冊、離線 fallback 與註冊失敗提示；完成定義為 `npm run build` 後執行 task 2.2 的離線 Playwright smoke test 通過，且模擬 service worker 不可用時網站仍可線上瀏覽。

## 4. GitHub Pages CI/CD

- [x] 4.1 實作 `Reference project settings parity`、`GitHub Pages deployment workflow` 與 `Mirror GitHub Pages CI/CD With Repository-Specific Settings`，交付比照 Spectra-Learning-Japanese 的 GitHub Pages workflow 與 Vite Pages base path 設定，僅調整本 repository 對應差異；完成定義為 workflow 檔案存在並經內容審查確認 build/deploy pattern 與參考專案一致。
- [x] 4.2 實作 `CI verification steps`，交付 install、unit test、build、Playwright verification 與 deploy 的 CI/CD 順序，且任一驗證失敗時不部署；完成定義為 workflow 內容審查確認失敗會中止部署，並本機執行 `npm run test:unit`, `npm run build`, `npx playwright test` 通過。

## 5. 文件與最終驗證

- [x] 5.1 實作 `Architecture documentation for CI/CD`，交付 `PROJECT_ARCHITECTURE.md` 對 `src/app`, `src/modules/exam`, `src/shared`, `public`, `.github/workflows` 的職責、GitHub Pages 目標、build output 與 repository-specific 假設說明；完成定義為內容審查確認文件涵蓋 CI/CD、PWA shell、5 個路由與參考專案差異。
- [x] 5.2 執行 `Acceptance Criteria` 與 `Scope Boundaries` 最終驗證，交付可安裝 PWA、5 個路由、參考樣式、離線 fallback、GitHub Pages CI/CD 與不匯入私有內容的完整驗證證據；完成定義為 `npm run test:unit`, `npm run build`, `npx playwright test`, `spectra validate build-exam-pwa-routes-and-cicd` 全部通過，且 Vite build 單一 chunk 未超過 500 KB 警戒線。