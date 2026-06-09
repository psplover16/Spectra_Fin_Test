## Context

目前專案以科目講義路由呈現，與使用者要的 A 組、B 組、語言分組學習不一致。A 組第一批只製作 114 年逐題解析，107 至 113 年先保留年度入口與待製作狀態，等版型確認後再批次補齊。現有 `src/modules/exam/data/subjectContent.ts` 適合科目講義資料，不適合承載年度試題、官方答案檢查、逐選項解析、來源追溯與 PWA 離線閱讀流程。本 change 會建立新的 examGroups feature module，並把 PWA runtime 改由 `vite-plugin-pwa` 產生。

## Goals / Non-Goals

**Goals:**

- 建立 `/a-group`、`/b-group`、`/language` 與 `/a-group/:year` 路由。
- 將既有科目路由 redirect 到新組別路由，並讓 invalid year 顯示 NotFound。
- 建立 A 組年度清單、年度書籤與年度完成狀態。
- 建立 A 組 114 年 50 題逐題解析資料、lazy loader 與頁面呈現。
- 讓 107 至 113 年顯示待製作狀態，不呈現完整解析。
- 改用 `vite-plugin-pwa`，讓 `src/app/pwa.ts` 只封裝 plugin 提供的 ready、unsupported、error 與 updateAvailable 狀態。
- 更新 CI/CD，讓 PWA output、lint、typecheck、unit test、build 與 e2e 都在部署前驗證。

**Non-Goals:**

- 第一批不製作 107 至 113 年完整解析。
- 第一批不製作 B 組與語言逐題解析。
- 不新增後端、帳號、同步、遙測或 analytics。
- 不保留手寫 service worker 註冊流程。
- 不在這個 change 補齊所有未來年度與共同科目資料。

## Decisions

### Use group routes as the new public navigation contract

`/a-group` 會成為根路由目的地，根路由 redirect 到 `/a-group`。`/computer-principles` 與 `/networking` redirect 到 `/a-group`，`/information-management` 與 `/programming` redirect 到 `/b-group`，`/language` 先建立可到達的輕量入口。這讓公開導覽從科目導向改成組別導向，也讓舊連結保有可預期遷移路徑。

### Treat valid unfinished years differently from invalid years

`/a-group/107` 至 `/a-group/113` 是有效但未完成的年度，頁面會顯示待版型確認後製作的狀態。`/a-group/115`、`/a-group/999` 與 `/a-group/abc` 是無效年度，必須顯示 NotFound。這個區分避免使用者把待製作內容誤解成壞連結，也避免無效路由被 redirect 掩蓋。

### Create an examGroups feature module instead of extending subjectContent

新增 `src/modules/examGroups/aGroup/` 管理 A 組年度清單、進度儲存、年度資料 loader 與解析頁。`subjectContent.ts` 保留現有科目講義用途，不承擔年度考題資料。這樣可以讓年度題庫的資料 shape、來源追溯與解析頁元件獨立演進，不影響既有科目講義。

### Use localStorage snapshots for first-batch progress

第一批只需要年度書籤與年度完成狀態，因此採用 localStorage snapshot。資料 shape 固定為 `completedYears: string[]`、`bookmark: { year: string; updatedAt: string } | null`、`version: 1`、`updatedAt: string`。讀取失敗、JSON 損壞或版本不支援時，畫面回到無書籤與無完成年度，不丟出 console error。

### Use lazy-loaded static year modules for question content

`yearSummaries.ts` 只存 114 至 107 的年度摘要。`useAGroupYearQuestions` 依 route year lazy import 年度資料，114 年載入 `years/114.ts`，107 至 113 年回傳 pending 狀態。這讓 `/a-group` 清單不需要載入未來 400 題資料，也讓第一批可先驗證 114 年版型。

### Convert src/app/pwa.ts into a vite-plugin-pwa update wrapper

Vite 使用 `VitePWA` 產生 manifest、service worker 與 Workbox 快取。`src/app/pwa.ts` 不再呼叫 `navigator.serviceWorker.register`，只封裝 plugin runtime 的 ready、unsupported、error 與 updateAvailable 狀態，供 AppShell 顯示非阻斷狀態或更新提示。CI 需要檢查 build 後有 `dist/manifest.webmanifest` 與 service worker output。

### Keep the first batch focused on 114 while preserving the 107 to 113 path

第一批只交付 114 年 50 題完整解析。107 至 113 年保留年度列、路由與 pending 頁，並明確顯示等待版型確認後製作。這能先把資料結構、PWA、逐題解析頁與互動狀態驗證清楚，再一口氣擴充 107 至 113 年。

### Use systematic novice teaching analysis as the content quality bar

114 年逐題解析的品質標準改為「把讀者當成第一次接觸該觀念的新手」。每題不得只給答案結論或短版解析；若題目涉及公式、表示法、演算法、通訊流程、資料結構、資料庫規則、程式語言規則或安全機制，`beginnerExplanation` 必須先交代必要前置觀念、規則來源與適用條件，再把規則套回本題。`solvingSteps` 必須逐步說明本題如何使用那些觀念，`keyTakeaways` 必須留下可在類似題目重用的規則與常見陷阱。

替代方案是只維持既有的欄位存在檢查與簡短專業解析；淘汰原因是欄位存在不等於新手能看懂，會讓 107 至 113 年批次製作時複製到太淺的解析標準。

## Implementation Contract

**Routing behavior:** 根路由進入 `/a-group`。舊科目路由必須 redirect 到新組別路由。`/a-group/114` 顯示完整年度解析。`/a-group/107` 至 `/a-group/113` 顯示 pending 頁。invalid year 顯示 NotFound。驗證目標是 Vue Router unit tests 與 Playwright route smoke tests。

**A 組年度清單 behavior:** `/a-group` 顯示 114、113、112、111、110、109、108、107 八列。列主體可導向年度路由。書籤與完成 checkbox 不觸發列導覽。書籤一次只能有一個年度，完成已書籤年度時會清空書籤。reload 後 localStorage 狀態保留，壞 snapshot 會 fail safe。驗證目標是 storage unit tests、component tests 與 mobile/offline manual assertions。

**Question analysis data shape:** `ExamQuestionAnalysis` 使用 `acceptedAnswers: ('A' | 'B' | 'C' | 'D')[]`、`answerNote: string | null`、`answerVerification`、`originalStem`、`options`、`coreTerms`、`beginnerExplanation`、`solvingSteps`、`optionExplanations`、`keyTakeaways`、`tags`、`sourceRef`。每題都要有 A 至 D 四個原始選項、A 至 D 四份辨析、非空 tags 與來源資訊。官方答案需標示 `verified`、`suspected-error` 或 `needs-review`。

**114 content contract:** 114 年資料必須有 50 題。每題都需要原題題幹、四個選項、官方答案檢查、AI 教學解析、選項辨析、解題步驟、核心術語、易錯提醒、tags 與 PDF 來源追溯。專業內容審查要確認定義正確、解題邏輯完整、干擾選項能區分觀念。

**Systematic novice teaching contract:** 每題都必須用現有 `ExamQuestionAnalysis` 欄位達成新手教學，不新增資料 shape。`beginnerExplanation` 需包含本題必要前置觀念、公式或規則來源、適用條件、為何答案成立、以及本題容易混淆的邊界。`solvingSteps` 需把抽象規則逐步套到題目中的具體值、語句或選項。`optionExplanations` 需說明每個干擾選項錯在哪個觀念或條件。`keyTakeaways` 需包含可複用的規則與常見陷阱。驗收方式是內容審查函式能抓出只給結論、跳過前置觀念或缺少規則來源的淺層解析，並以 114 年逐題 unit tests 與內容審查表確認 50 題都符合。

**PWA contract:** `vite.config.ts` 使用 `VitePWA`。production build 後必須有 `dist/manifest.webmanifest` 與 generated service worker。`src/app/pwa.ts` 不直接註冊 service worker。離線後 primary learning routes 能由 app shell fallback 開啟。CI 必須跑 lint、typecheck、unit test、build、PWA output check 與 e2e。

**Scope boundaries:** 此 change 只涵蓋 114 年完整解析、107 至 113 年 pending 路徑、A 組年度進度、組別路由、PWA plugin runtime、CI/CD 與架構文件。107 至 113 年完整解析、B 組逐題解析、語言逐題解析、後端同步與 analytics 需要另開 change。

## Risks / Trade-offs

- 114 年 50 題內容製作量大，任務需逐題拆分，並以資料 shape 測試與內容審查降低批次錯誤。
- 新手系統解析會顯著增加單題文字量 → 以既有欄位承載、題卡支援換行與手機 viewport smoke 驗證可讀性，避免新增複雜資料模型。
- PDF 抽取可能有換行、選項符號或表格錯位，資料需要保留 `extractionStatus` 與來源資訊，不能把未校對內容標示為 verified。
- PWA plugin 會改變 service worker 生命週期，因此 CI 必須檢查 output，AppShell 必須顯示非阻斷狀態，避免離線更新流程靜默失敗。
- 舊路由 redirect 會影響既有 e2e 與 deep link，需用 router tests 與 Playwright smoke tests 同時覆蓋。

## Migration Plan

1. 建立新組別路由、舊路由 redirect、年度 route guard 與 NotFound 規則。
2. 建立 A 組年度清單、localStorage snapshot 與 UI 控制。
3. 建立 114 年資料型別、lazy loader、解析頁與 pending page。
4. 逐題建立並審查 114 年 50 題解析。
5. 安裝並設定 `vite-plugin-pwa`，改寫 `src/app/pwa.ts` 為 plugin wrapper。
6. 更新 CI/CD、PWA output checks、PROJECT_ARCHITECTURE.md 與測試。

## Resolved Assumptions

- 部署 base path 沿用既有 CI/CD 與 `PROJECT_ARCHITECTURE.md` 的設定：production 使用 `/finPubTest/`，staging 使用 `/finPubTest/staging/`。
- 114 年版型確認前，107 至 113 年只顯示 pending，不產生草稿解析資料。
