## Why

目前需要先建立國營事業資訊人員考試講義 PWA 的可用外殼，讓後續考古題與講義內容有穩定的手機版承載介面。這次先以近 8 年考古題作為後續內容範圍，但不在本變更匯入完整內容，避免樣式、路由、CI/CD 與內容審校混在同一個變更。

## What Changes

- 建立手機可使用的 PWA app shell，包含安裝資訊、主要路由資源與離線 fallback。
- 建立 5 個學習路由：計算機原理、網路概論、資訊管理、程式設計、語言；URL 使用英文 slug，頁面顯示中文名稱。
- 建立手機優先的學習頁樣式、版面與基本互動，版面結構、互動流程與視覺風格參考 Spectra-Learning-Japanese 的 N5 文法子路由。
- 每個路由提供可展示的內容佔位狀態，作為後續講義與測驗資料承載介面。
- 建立 GitHub Pages CI/CD，設定比照參考專案，僅調整本專案 repository 差異。

## Non-Goals

- 不讀取、整理或匯入參考來源資料夾內的完整 Markdown 或 PDF 內容。
- 不建立考古題匯入器、題庫審校流程或後台編輯器。
- 不完成完整講義內容、題庫內容或逐題解析。

## Capabilities

### New Capabilities

- `exam-pwa-shell`: 定義可安裝、手機可用且有離線 fallback 的 PWA app shell。
- `exam-learning-routes`: 定義 5 個考試學習路由、英文 slug、中文顯示名稱與空內容可展示狀態。
- `exam-learning-page-style`: 定義手機優先學習頁的版面、互動流程與參考樣式採用範圍。
- `github-pages-cicd`: 定義安裝、測試、建置與 GitHub Pages 部署流程。

### Modified Capabilities

(none)

## Impact

- Affected specs: exam-pwa-shell, exam-learning-routes, exam-learning-page-style, github-pages-cicd
- Affected code:
  - New: package.json, package-lock.json, index.html, vite.config.ts, tsconfig.json, tsconfig.node.json, tailwind.config.ts, postcss.config.js, public, src/app, src/modules/exam, src/shared, tests, playwright.config.ts, .github/workflows, PROJECT_ARCHITECTURE.md
  - Modified: .gitignore
  - Removed: none