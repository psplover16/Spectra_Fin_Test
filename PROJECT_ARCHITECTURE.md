# 專案架構紀錄

## 變更：build-exam-pwa-routes-and-cicd

本變更先建立國營事業資訊人員考試講義 PWA 的手機版外殼、5 個學習路由、參考樣式與 GitHub Pages CI/CD。完整考古題、正式講義、題庫與逐題解析不在本次範圍內。

## 參考專案比對結論

參考專案：`C:\Users\Gary\Documents\Spectra-Learning-Japanese`

### N5 文法子路由可採用的版面與互動

- 參考 `src/modules/n5Grammar/views/N5GrammarView.vue` 的區塊節奏：loading/error 狀態先行，正式內容拆成待完成與已完成區塊；本專案改為學習入口與 5 個科目路由的佔位學習區。
- 參考 `src/modules/n5Grammar/components/N5GrammarSectionCard.vue` 的 section card 模式：卡片標題列、可展開內容區、狀態控制與可觸控命中區；本專案採用科目卡片與內容承載區，不複製日文資料。
- 參考 `src/styles/main.css` 的閱讀節奏：手機優先、safe-area 變數、8px 以下卡片圓角、sticky section header、`section-card` / `surface-card` 類型的輕量卡片、內容區 `space-y` 間距、標題列置中與左右操作區。
- 參考 `tests/e2e/n5-grammar-layout.spec.ts` 的驗證方向：375px 手機寬度、無水平 overflow、console/page error 為空、sticky header 與離線可用。

### GitHub Pages 設定差異

- 參考專案 CI 使用 `.github/workflows/ci.yml`：`pull_request` 與非 `gh-pages` push 觸發，Node 22、`npm ci`、lint、typecheck、unit test、build、Playwright Chromium 與失敗 artifact 上傳。
- 參考專案 CD 使用 `.github/workflows/cd.yml`：`dev` 與 `main` push 觸發，Node 22、`npm ci`、依 branch 設定 `VITE_APP_BASE_PATH` / `VITE_APP_START_URL`，build 後以 `.deploy-pages` worktree 發布到 `gh-pages`。
- 本專案部署目標同為 GitHub Pages；唯一預期差異是 repository 對應的 base path。參考專案使用 `/Spectra-Learning-Japanese/` 與 `/Spectra-Learning-Japanese/staging/`，本專案應改為 `/finPubTest/` 與 `/finPubTest/staging/`。
- 參考專案透過 `scripts/publishPages.mjs` 同步 `dist` 到 gh-pages worktree，並保留 `.nojekyll`、`CNAME` 與 staging 目錄。本專案會採同一發布模式。

## 目前實作架構

### `src/app`

- `src/app/main.ts` 建立 Vue app、掛載 Vue Router，並提供 PWA 離線就緒狀態。
- `src/app/AppShell.vue` 是手機優先的 PWA 外殼，包含全站標題、非阻塞離線狀態提示與 route outlet。
- `src/app/router.ts` 以 `examRoutes` 作為單一來源產生 5 個學習路由，未知路由導向 not-found 狀態。
- `src/app/pwa.ts` 封裝 service worker 註冊、base path 正規化與註冊失敗 fallback；service worker 不支援或註冊失敗時，網站仍維持線上瀏覽。

### `src/modules/exam`

- `src/modules/exam/data/examRoutes.ts` 定義 `ExamRouteItem`、5 筆固定路由、來源群組標籤與非正式 placeholder 內容。
- `src/modules/exam/views/LandingView.vue` 呈現學習入口，導覽由 `examRoutes` 產生，避免路由與顯示名稱不同步。
- `src/modules/exam/views/ExamRouteView.vue` 呈現參考 N5 文法子路由節奏的學習頁：科目識別、內容狀態、來源群組、章節卡與底部操作區。
- `src/modules/exam/views/NotFoundView.vue` 呈現未知路由恢復狀態，提供回到學習入口的動作。

### `src/shared`

- 本變更尚未建立 `src/shared`。目前共用邏輯集中在 `src/app/pwa.ts` 與 `src/modules/exam/data/examRoutes.ts`；若後續題庫、講義匯入或互動元件擴張，再抽出 shared module。

### `public`

- `public/manifest.webmanifest` 提供 PWA 名稱 `國營資訊職員考試講義`、display mode、theme metadata 與 icon。
- `public/icons/exam-icon.svg` 是本 PWA 的安裝圖示。
- `public/service-worker.js` 快取 build 後 app shell、manifest、icon 與主要路由 fallback；首次成功載入後，5 個學習路由可在離線狀態顯示 placeholder 內容。

## CI/CD 與 Build Output

- `.github/workflows/ci.yml` 在 pull request 與非 `gh-pages` push 執行 Node 22、`npm ci`、typecheck、unit test、build、Playwright Chromium 安裝與 E2E 測試；失敗時上傳 Playwright diagnostics。
- `.github/workflows/cd.yml` 在 `main` 與 `dev` push 執行部署。部署前同樣跑 typecheck、unit test、build 與 E2E，任一驗證失敗就不會進入 `gh-pages` 同步。
- `main` branch 使用 `VITE_APP_BASE_PATH=/finPubTest/` 並發布 production root；`dev` branch 使用 `VITE_APP_BASE_PATH=/finPubTest/staging/` 並發布 staging 子目錄。
- `vite.config.ts` 的 build output 是 `dist/`，chunk warning limit 維持 500 KB，並將 Vue/Vue Router 拆為 `vendor-vue` chunk。
- `scripts/publishPages.mjs` 將 `dist/` 同步到 `.deploy-pages` worktree，保留 `.nojekyll`、`CNAME` 與 `staging`；本專案版額外拒絕把目前 repo root 或 `dist/` 當 publish worktree，以降低誤刪風險。

### 私有內容範圍警戒

- 本次沒有讀取或整理本專案 `_private/計算機原理、網路概論/`、`_private/資訊管理、程式設計/`、`_private/國文、英文/` 內的 Markdown 或 PDF 作為頁面資料。
- 本次只在 route metadata 中保留來源群組名稱，供後續內容匯入變更使用。
- 後續實作若需要顯示內容狀態，必須顯示「尚未匯入正式講義」這類佔位訊息，不得把私有來源檔案轉為正式講義或題庫。
