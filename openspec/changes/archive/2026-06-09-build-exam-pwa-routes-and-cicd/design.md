## Context

此專案目前尚未有前端應用程式碼，需求是先建立國營事業資訊人員考試講義 PWA 的手機版外殼、5 個學習路由、可展示的學習頁樣式與 GitHub Pages CI/CD。需求來源限定為 `_private/propose.md`；本設計不使用參考專案或 `_private` 來源資料夾內容作為需求輸入，但 apply 階段需讀取 Spectra-Learning-Japanese 專案以比對 N5 文法子路由樣式與 GitHub Pages 設定。

## Goals / Non-Goals

**Goals:**

- 建立 Vue 3、TypeScript、Vite、Tailwind、Vue Router 的手機優先 PWA app shell。
- 提供 5 個英文 slug 路由，頁面顯示中文科目名稱：`/computer-principles`, `/networking`, `/information-management`, `/programming`, `/language`。
- 讓每個路由呈現可展示的學習頁狀態，供後續講義與題庫內容承載。
- 參考 Spectra-Learning-Japanese 的 N5 文法子路由，採用其版面結構、互動流程與視覺風格，但依本考試科目調整文字與資訊層級。
- 建立 GitHub Pages CI/CD，CI 驗證安裝、測試與建置，CD 部署靜態產物。

**Non-Goals:**

- 不匯入、解析或整理 `_private` 來源資料夾內的 Markdown 或 PDF 內容。
- 不建立考古題匯入器、題庫審校流程、後台編輯器或完整逐題解析。
- 不新增需要伺服器、帳號、analytics 或遠端同步的功能。

## Decisions

### Build Vue PWA Foundation From Project Conventions

使用 Vite + Vue 3 + TypeScript 建立純前端 PWA，配合 Tailwind、Vue Router 與 Playwright/Vitest。PWA shell 包含 manifest、service worker 註冊、基本 app shell 快取與未知路由 fallback；首次載入成功後，5 個主要路由的靜態佔位內容可在離線狀態開啟。

替代方案：直接製作靜態 HTML 頁面較快，但後續要承載講義、測驗、進度與 PWA 快取時會重做路由與狀態架構，因此不採用。

### Implement Five English-Slug Learning Routes

建立一份 typed route metadata 作為路由與導覽單一來源。每筆 route item 包含 `slug`, `path`, `displayName`, `category`, `description`, `statusLabel`, `sourceGroup`。`category` 僅允許 `professional` 或 `common`；`sourceGroup` 僅記錄後續內容來源群組名稱，不在本變更讀取來源資料夾。

替代方案：直接在多個元件手寫路由與中文名稱較省事，但容易造成導覽、頁面標題與測試資料不同步。

### Adapt N5 Grammar Learning Page Experience Without Content Import

apply 階段需讀取參考專案的 N5 文法子路由，擷取版面結構、互動流程與視覺風格，包括手機閱讀節奏、章節/重點排列、操作區位置、導覽方式與空/載入狀態處理。實作不得逐字複製日文學習內容，也不得讀取本專案 `_private` 來源資料夾內的 Markdown 或 PDF 內容作為頁面資料。

替代方案：自行設計全新 UI 可完全貼合考試主題，但會偏離使用者指定的既有參考風格，也增加首次實作的不確定性。

### Mirror GitHub Pages CI/CD With Repository-Specific Settings

apply 階段需讀取 Spectra-Learning-Japanese 專案的 workflow、build scripts、Pages 部署設定與 Vite base path 設定，將等價設定移植到本專案。唯一允許的差異是本專案 repository 名稱、GitHub Pages base path、workflow 顯示名稱與必要的專案相對路徑。

替代方案：從零撰寫 GitHub Actions workflow 較獨立，但可能與使用者現有部署習慣不一致，且容易漏掉參考專案已驗證的 Pages 設定。

### Keep Placeholder Content Separate From Exam Source Data

本變更只建立可展示的靜態佔位內容：科目定位、後續內容來源提示、章節卡片範例與尚未匯入內容狀態。不得把 `_private` 的 Markdown 或 PDF 內容轉成講義、題庫或正式測驗資料。若需要顯示來源資料夾，只能用資料群組名稱說明後續將承接哪一類內容。

替代方案：直接把現有考古題 PDF 檔名列入頁面可讓畫面看起來更完整，但會把資料整理與內容審校提前混入本變更，不符合本次範圍。

## Implementation Contract

### Observable Behavior

- 使用者開啟網站時，看到手機優先的 PWA 學習入口與 5 個主要學習路由導覽。
- 使用者可進入 `/computer-principles`, `/networking`, `/information-management`, `/programming`, `/language`，每個頁面顯示中文名稱、科目分類、內容佔位狀態與後續講義承載區。
- 頁面版面、互動流程與視覺風格需可對照參考專案 N5 文法子路由；本專案文字與科目資訊需改為國營事業資訊人員考試語境。
- 首次成功載入後，5 個主要路由與 app shell 可在瀏覽器離線狀態開啟並顯示佔位內容。
- GitHub Actions 需能在 push 或 pull request 時執行安裝、測試與建置；主分支部署需產生 GitHub Pages 可使用的靜態網站。

### Interface And Data Shape

- Route metadata type 名稱使用 `ExamRouteItem`，欄位包含 `slug: string`, `path: string`, `displayName: string`, `category: 'professional' | 'common'`, `description: string`, `statusLabel: string`, `sourceGroup: string`。
- 5 筆 route metadata 必須固定為：`computer-principles`, `networking`, `information-management`, `programming`, `language`。
- App shell 需提供 manifest 名稱 `國營資訊職員考試講義`，並提供可安裝圖示與 service worker 註冊狀態處理。
- CI/CD workflow 需包含可辨識的 install、test、build、deploy jobs 或 steps；部署目標為 GitHub Pages。

### Failure Modes

- 未知路由顯示找不到頁面狀態，並提供回到學習入口的動作。
- 尚未匯入內容時顯示佔位狀態，不顯示空白頁，也不拋出 console error。
- Service worker 註冊失敗時，網站仍可線上瀏覽，並以非阻塞方式顯示離線功能尚未就緒狀態。
- GitHub Pages workflow 建置或部署失敗時，CI/CD 必須讓 job 失敗，不得吞掉錯誤。

### Acceptance Criteria

- `npm run test:unit` 通過 route metadata、空內容狀態與 PWA 註冊 fallback 的單元測試。
- `npm run build` 通過，且單一 chunk 未超過 500 KB 警戒線。
- `npx playwright test` 通過手機 viewport 下 5 個路由 smoke test、未知路由 smoke test 與建置後離線 app shell smoke test。
- GitHub Actions workflow 檔案存在，且 CI 包含安裝、測試、建置，CD 指向 GitHub Pages。
- `PROJECT_ARCHITECTURE.md` 記錄 `src/app`, `src/modules/exam`, `src/shared`, `public`, `.github/workflows` 的職責。

### Scope Boundaries

- In scope：PWA shell、5 個英文 slug 路由、手機學習頁樣式、佔位內容、參考專案樣式/CI 設定比對、GitHub Pages CI/CD、測試與架構文件。
- Out of scope：讀取或整理 `_private` 來源 Markdown/PDF、考古題匯入器、正式題庫、完整講義、後台編輯器、帳號或雲端同步。

## Risks / Trade-offs

- [Risk] 參考專案設定與本專案 repository base path 不同 → Mitigation：apply 階段先讀取參考專案 workflow 與 Vite 設定，再只調整 repository 對應差異。
- [Risk] 只做佔位內容可能被誤解為正式講義 → Mitigation：頁面明確呈現尚未匯入內容狀態與後續來源群組，不產生正式題庫或解析。
- [Risk] PWA 離線 shell 手寫快取易漏主要路由 → Mitigation：Playwright 建置後離線 smoke test 覆蓋 5 個路由。
- [Risk] 參考風格過度套用導致考試科目辨識不足 → Mitigation：保留參考版面與互動節奏，但中文標題、科目分類與內容狀態依本考試領域呈現。

## Migration Plan

這是新建前端應用與 CI/CD，無既有使用者資料需要遷移。若 GitHub Pages 部署失敗，可回復 workflow 或 Vite base path 設定；本變更不改動既有考古題素材。

## Open Questions

目前沒有阻擋實作的開放問題。若 apply 階段發現參考專案 GitHub Pages 設定依賴 repository secret 或特殊 branch，需在 tasks 中記錄對應調整並維持部署目標不變。