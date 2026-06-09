<!--
Each task description states:
- the behavior or contract delivered, and
- the verification target that proves completion.

File paths are locator context only. Each task still names observable behavior and verification.
-->

## 1. 路由與應用骨幹

- [x] 1.1 實作 [Design: Use group routes as the new public navigation contract] 與 Requirement: Group Routes Are Primary Navigation，完成後 `/` redirect 到 `/a-group`，`/a-group`、`/b-group`、`/language` 都可進入非 NotFound 頁；以 Vue Router unit test 與 Playwright route smoke test 驗證。
- [x] 1.2 實作 Requirement: Legacy Subject Routes Redirect To Groups，完成後 `/computer-principles`、`/networking` redirect 到 `/a-group`，`/information-management`、`/programming` redirect 到 `/b-group`；以 router test 驗證 redirect destination 與 replace 行為。
- [x] 1.3 實作 Requirement: A Group Year Routes Resolve Valid Years 與 [Design: Treat valid unfinished years differently from invalid years]，完成後 `/a-group/114` 顯示完整解析頁，`/a-group/107` 至 `/a-group/113` 顯示 pending 頁；以 route param unit test 與 Playwright route smoke test 驗證。
- [x] 1.4 實作 Requirement: Invalid A Group Years Render NotFound，完成後 `/a-group/115`、`/a-group/999`、`/a-group/abc` 顯示 NotFound 且不 redirect；以 router test 驗證 invalid params。
- [x] 1.5 建立 [Design: Create an examGroups feature module instead of extending subjectContent] 的 feature module 邊界，完成後 A 組資料與畫面位於 `src/modules/examGroups/aGroup/`，既有 `subjectContent.ts` 不承載年度題庫；以 `rg "ExamQuestionAnalysis|yearSummaries" src/modules/exam/data/subjectContent.ts` 無結果與 typecheck 驗證。
- [x] 1.6 更新 `src/app/AppShell.vue` 導覽，完成後主要導覽顯示 A 組、B 組、語言入口，active state 對應目前 route；以 component test 與 375px 手機 viewport 截圖人工檢查驗證。
- [x] 1.7 建立 `src/app/routePreload.ts`，完成後年度解析頁與組別頁在導覽前可預載對應 lazy route chunk；以 unit test mock import 呼叫次數與 `npm run build` 驗證。
- [x] 1.8 更新 route smoke e2e，完成後 primary group routes、legacy redirects、valid year routes、invalid year routes 都有 Playwright coverage；以 `npm run test:e2e -- --project=chromium` 驗證。

## 2. A 組年度清單與本機進度

- [x] 2.1 建立 `yearSummaries.ts` 並覆蓋 Requirement: A Group Year List Shows All Years，完成後 `/a-group` 依序顯示 114、113、112、111、110、109、108、107 八個年度列；以 unit test 驗證排序與列數。
- [x] 2.2 實作 Requirement: Year Row Main Area Navigates To Year Route，完成後年度列主體可導向 `/a-group/:year`；以 component test 觸發 row main button 並驗證 router push 目標。
- [x] 2.3 實作 [Design: Use localStorage snapshots for first-batch progress] 的 snapshot schema，完成後 localStorage 儲存 `version`、`completedYears`、`bookmark`、`updatedAt`；以 storage unit test 驗證序列化內容。
- [x] 2.4 實作 Requirement: Bookmark Control Persists One A Group Year，完成後同時只會有一個 A 組年度書籤，新書籤會取代舊書籤並 reload 後保留；以 storage unit test 與 component reload test 驗證。
- [x] 2.5 實作 Requirement: Completion Control Persists Completed Years，完成後完成年度集合可新增與移除，reload 後狀態保留；以 storage unit test 驗證 completedYears。
- [x] 2.6 實作 Requirement: Completing A Bookmarked Year Clears Its Bookmark，完成後標記已書籤年度為完成時 bookmark 變成 null；以 storage unit test 驗證狀態轉換。
- [x] 2.7 實作 Requirement: Bookmark And Completion Controls Do Not Navigate，完成後書籤與完成控制不觸發年度列導覽；以 component test 驗證 click 後 route 停留在 `/a-group`。
- [x] 2.8 實作 Requirement: Invalid Progress Snapshots Fail Safe，完成後壞 JSON、缺欄位與不支援 version 都會回到無書籤與無完成年度，且不產生 console error；以 unit test spy console.error 與 corrupt localStorage fixture 驗證。
- [x] 2.9 完成 A 組年度清單手機操作版型，完成後 375px viewport 內按鈕文字不溢出、書籤與 checkbox 可單手操作；以 Playwright screenshot 與人工離線檢查驗證。

## 3. 逐題解析資料框架與頁面

- [x] 3.1 定義 `ExamQuestionAnalysis` 型別並覆蓋 Requirement: Question Analysis Uses Verified Data Shape，完成後每筆資料有 year、number、acceptedAnswers、answerNote、answerVerification、originalStem、options、coreTerms、beginnerExplanation、solvingSteps、optionExplanations、keyTakeaways、tags、sourceRef；以 TypeScript typecheck 與資料 shape unit test 驗證。
- [x] 3.2 實作 [Design: Use lazy-loaded static year modules for question content] 與 Requirement: Year Content Is Lazy Loaded，完成後 `/a-group` 只載入年度摘要，`/a-group/114` 才載入 `years/114.ts`；以 dynamic import mock test 與 build chunk 檢查驗證。
- [x] 3.3 實作 Requirement: Year 114 Contains Fifty Question Analyses，完成後 114 年 loader 回傳 exactly 50 records；以 unit test 驗證 record count 等於 50。
- [x] 3.4 實作 Requirement: Question Analysis Presents Original Exam Content Separately，完成後題卡把原題題幹、官方答案、四個原始選項與教學解析分區呈現；以 component test 查詢 section headings 與人工視覺檢查驗證。
- [x] 3.5 實作 Requirement: Question Analysis Provides Beginner Teaching Content，完成後每題顯示 core terms、beginner explanation、solving steps、option explanations、key takeaways、tags；以 component test 對 fixture 題目驗證欄位可見。
- [x] 3.6 實作 Requirement: Official Answer Verification Is Explicit，完成後 `verified`、`suspected-error`、`needs-review` 狀態都有明確標籤，疑義題顯示 answerNote；以 component test 覆蓋三種狀態。
- [x] 3.7 實作 Requirement: Source Traceability Is Visible，完成後每題顯示 source year、PDF filename 與可用 page number；以 component test 對 sourceRef fixture 驗證。
- [x] 3.8 實作 Requirement: Pending Years Do Not Show Complete Analysis 與 [Design: Keep the first batch focused on 114 while preserving the 107 to 113 path]，完成後 107 至 113 年 pending 頁不顯示 50 題完整解析；以 route component test 與 Playwright smoke test 驗證。
- [x] 3.9 完成 114 年解析頁 mobile/offline smoke，完成後先載入 `/a-group/114` 再離線重新整理仍能看到 app shell 與已快取內容；以 Playwright offline 模式人工檢查驗證。

## 4. 114 年逐題內容建置

- [x] 4.1 建立 114 年來源抽取基準，完成後 50 題原始題幹、A 至 D 選項、官方答案與 PDF sourceRef 都有對照表；以內容審查表驗證題號 1 至 50 無缺題、無重號、無未標來源。
- [x] [P] 4.2 建立 114 年第 1 題解析，完成後該 record 有原題、A 至 D 四選項、acceptedAnswers、answerVerification、A 至 D optionExplanations、tags 與 sourceRef；以資料 shape unit test 與內容審查驗證。
- [x] [P] 4.3 建立 114 年第 2 題解析，完成後該 record 有原題、A 至 D 四選項、acceptedAnswers、answerVerification、A 至 D optionExplanations、tags 與 sourceRef；以資料 shape unit test 與內容審查驗證。
- [x] [P] 4.4 建立 114 年第 3 題解析，完成後該 record 有原題、A 至 D 四選項、acceptedAnswers、answerVerification、A 至 D optionExplanations、tags 與 sourceRef；以資料 shape unit test 與內容審查驗證。
- [x] [P] 4.5 建立 114 年第 4 題解析，完成後該 record 有原題、A 至 D 四選項、acceptedAnswers、answerVerification、A 至 D optionExplanations、tags 與 sourceRef；以資料 shape unit test 與內容審查驗證。
- [x] [P] 4.6 建立 114 年第 5 題解析，完成後該 record 有原題、A 至 D 四選項、acceptedAnswers、answerVerification、A 至 D optionExplanations、tags 與 sourceRef；以資料 shape unit test 與內容審查驗證。
- [x] [P] 4.7 建立 114 年第 6 題解析，完成後該 record 有原題、A 至 D 四選項、acceptedAnswers、answerVerification、A 至 D optionExplanations、tags 與 sourceRef；以資料 shape unit test 與內容審查驗證。
- [x] [P] 4.8 建立 114 年第 7 題解析，完成後該 record 有原題、A 至 D 四選項、acceptedAnswers、answerVerification、A 至 D optionExplanations、tags 與 sourceRef；以資料 shape unit test 與內容審查驗證。
- [x] [P] 4.9 建立 114 年第 8 題解析，完成後該 record 有原題、A 至 D 四選項、acceptedAnswers、answerVerification、A 至 D optionExplanations、tags 與 sourceRef；以資料 shape unit test 與內容審查驗證。
- [x] [P] 4.10 建立 114 年第 9 題解析，完成後該 record 有原題、A 至 D 四選項、acceptedAnswers、answerVerification、A 至 D optionExplanations、tags 與 sourceRef；以資料 shape unit test 與內容審查驗證。
- [x] [P] 4.11 建立 114 年第 10 題解析，完成後該 record 有原題、A 至 D 四選項、acceptedAnswers、answerVerification、A 至 D optionExplanations、tags 與 sourceRef；以資料 shape unit test 與內容審查驗證。
- [x] [P] 4.12 建立 114 年第 11 題解析，完成後該 record 有原題、A 至 D 四選項、acceptedAnswers、answerVerification、A 至 D optionExplanations、tags 與 sourceRef；以資料 shape unit test 與內容審查驗證。
- [x] [P] 4.13 建立 114 年第 12 題解析，完成後該 record 有原題、A 至 D 四選項、acceptedAnswers、answerVerification、A 至 D optionExplanations、tags 與 sourceRef；以資料 shape unit test 與內容審查驗證。
- [x] [P] 4.14 建立 114 年第 13 題解析，完成後該 record 有原題、A 至 D 四選項、acceptedAnswers、answerVerification、A 至 D optionExplanations、tags 與 sourceRef；以資料 shape unit test 與內容審查驗證。
- [x] [P] 4.15 建立 114 年第 14 題解析，完成後該 record 有原題、A 至 D 四選項、acceptedAnswers、answerVerification、A 至 D optionExplanations、tags 與 sourceRef；以資料 shape unit test 與內容審查驗證。
- [x] [P] 4.16 建立 114 年第 15 題解析，完成後該 record 有原題、A 至 D 四選項、acceptedAnswers、answerVerification、A 至 D optionExplanations、tags 與 sourceRef；以資料 shape unit test 與內容審查驗證。
- [x] [P] 4.17 建立 114 年第 16 題解析，完成後該 record 有原題、A 至 D 四選項、acceptedAnswers、answerVerification、A 至 D optionExplanations、tags 與 sourceRef；以資料 shape unit test 與內容審查驗證。
- [x] [P] 4.18 建立 114 年第 17 題解析，完成後該 record 有原題、A 至 D 四選項、acceptedAnswers、answerVerification、A 至 D optionExplanations、tags 與 sourceRef；以資料 shape unit test 與內容審查驗證。
- [x] [P] 4.19 建立 114 年第 18 題解析，完成後該 record 有原題、A 至 D 四選項、acceptedAnswers、answerVerification、A 至 D optionExplanations、tags 與 sourceRef；以資料 shape unit test 與內容審查驗證。
- [x] [P] 4.20 建立 114 年第 19 題解析，完成後該 record 有原題、A 至 D 四選項、acceptedAnswers、answerVerification、A 至 D optionExplanations、tags 與 sourceRef；以資料 shape unit test 與內容審查驗證。
- [x] [P] 4.21 建立 114 年第 20 題解析，完成後該 record 有原題、A 至 D 四選項、acceptedAnswers、answerVerification、A 至 D optionExplanations、tags 與 sourceRef；以資料 shape unit test 與內容審查驗證。
- [x] [P] 4.22 建立 114 年第 21 題解析，完成後該 record 有原題、A 至 D 四選項、acceptedAnswers、answerVerification、A 至 D optionExplanations、tags 與 sourceRef；以資料 shape unit test 與內容審查驗證。
- [x] [P] 4.23 建立 114 年第 22 題解析，完成後該 record 有原題、A 至 D 四選項、acceptedAnswers、answerVerification、A 至 D optionExplanations、tags 與 sourceRef；以資料 shape unit test 與內容審查驗證。
- [x] [P] 4.24 建立 114 年第 23 題解析，完成後該 record 有原題、A 至 D 四選項、acceptedAnswers、answerVerification、A 至 D optionExplanations、tags 與 sourceRef；以資料 shape unit test 與內容審查驗證。
- [x] [P] 4.25 建立 114 年第 24 題解析，完成後該 record 有原題、A 至 D 四選項、acceptedAnswers、answerVerification、A 至 D optionExplanations、tags 與 sourceRef；以資料 shape unit test 與內容審查驗證。
- [x] [P] 4.26 建立 114 年第 25 題解析，完成後該 record 有原題、A 至 D 四選項、acceptedAnswers、answerVerification、A 至 D optionExplanations、tags 與 sourceRef；以資料 shape unit test 與內容審查驗證。
- [x] [P] 4.27 建立 114 年第 26 題解析，完成後該 record 有原題、A 至 D 四選項、acceptedAnswers、answerVerification、A 至 D optionExplanations、tags 與 sourceRef；以資料 shape unit test 與內容審查驗證。
- [x] [P] 4.28 建立 114 年第 27 題解析，完成後該 record 有原題、A 至 D 四選項、acceptedAnswers、answerVerification、A 至 D optionExplanations、tags 與 sourceRef；以資料 shape unit test 與內容審查驗證。
- [x] [P] 4.29 建立 114 年第 28 題解析，完成後該 record 有原題、A 至 D 四選項、acceptedAnswers、answerVerification、A 至 D optionExplanations、tags 與 sourceRef；以資料 shape unit test 與內容審查驗證。
- [x] [P] 4.30 建立 114 年第 29 題解析，完成後該 record 有原題、A 至 D 四選項、acceptedAnswers、answerVerification、A 至 D optionExplanations、tags 與 sourceRef；以資料 shape unit test 與內容審查驗證。
- [x] [P] 4.31 建立 114 年第 30 題解析，完成後該 record 有原題、A 至 D 四選項、acceptedAnswers、answerVerification、A 至 D optionExplanations、tags 與 sourceRef；以資料 shape unit test 與內容審查驗證。
- [x] [P] 4.32 建立 114 年第 31 題解析，完成後該 record 有原題、A 至 D 四選項、acceptedAnswers、answerVerification、A 至 D optionExplanations、tags 與 sourceRef；以資料 shape unit test 與內容審查驗證。
- [x] [P] 4.33 建立 114 年第 32 題解析，完成後該 record 有原題、A 至 D 四選項、acceptedAnswers、answerVerification、A 至 D optionExplanations、tags 與 sourceRef；以資料 shape unit test 與內容審查驗證。
- [x] [P] 4.34 建立 114 年第 33 題解析，完成後該 record 有原題、A 至 D 四選項、acceptedAnswers、answerVerification、A 至 D optionExplanations、tags 與 sourceRef；以資料 shape unit test 與內容審查驗證。
- [x] [P] 4.35 建立 114 年第 34 題解析，完成後該 record 有原題、A 至 D 四選項、acceptedAnswers、answerVerification、A 至 D optionExplanations、tags 與 sourceRef；以資料 shape unit test 與內容審查驗證。
- [x] [P] 4.36 建立 114 年第 35 題解析，完成後該 record 有原題、A 至 D 四選項、acceptedAnswers、answerVerification、A 至 D optionExplanations、tags 與 sourceRef；以資料 shape unit test 與內容審查驗證。
- [x] [P] 4.37 建立 114 年第 36 題解析，完成後該 record 有原題、A 至 D 四選項、acceptedAnswers、answerVerification、A 至 D optionExplanations、tags 與 sourceRef；以資料 shape unit test 與內容審查驗證。
- [x] [P] 4.38 建立 114 年第 37 題解析，完成後該 record 有原題、A 至 D 四選項、acceptedAnswers、answerVerification、A 至 D optionExplanations、tags 與 sourceRef；以資料 shape unit test 與內容審查驗證。
- [x] [P] 4.39 建立 114 年第 38 題解析，完成後該 record 有原題、A 至 D 四選項、acceptedAnswers、answerVerification、A 至 D optionExplanations、tags 與 sourceRef；以資料 shape unit test 與內容審查驗證。
- [x] [P] 4.40 建立 114 年第 39 題解析，完成後該 record 有原題、A 至 D 四選項、acceptedAnswers、answerVerification、A 至 D optionExplanations、tags 與 sourceRef；以資料 shape unit test 與內容審查驗證。
- [x] [P] 4.41 建立 114 年第 40 題解析，完成後該 record 有原題、A 至 D 四選項、acceptedAnswers、answerVerification、A 至 D optionExplanations、tags 與 sourceRef；以資料 shape unit test 與內容審查驗證。
- [x] [P] 4.42 建立 114 年第 41 題解析，完成後該 record 有原題、A 至 D 四選項、acceptedAnswers、answerVerification、A 至 D optionExplanations、tags 與 sourceRef；以資料 shape unit test 與內容審查驗證。
- [x] [P] 4.43 建立 114 年第 42 題解析，完成後該 record 有原題、A 至 D 四選項、acceptedAnswers、answerVerification、A 至 D optionExplanations、tags 與 sourceRef；以資料 shape unit test 與內容審查驗證。
- [x] [P] 4.44 建立 114 年第 43 題解析，完成後該 record 有原題、A 至 D 四選項、acceptedAnswers、answerVerification、A 至 D optionExplanations、tags 與 sourceRef；以資料 shape unit test 與內容審查驗證。
- [x] [P] 4.45 建立 114 年第 44 題解析，完成後該 record 有原題、A 至 D 四選項、acceptedAnswers、answerVerification、A 至 D optionExplanations、tags 與 sourceRef；以資料 shape unit test 與內容審查驗證。
- [x] [P] 4.46 建立 114 年第 45 題解析，完成後該 record 有原題、A 至 D 四選項、acceptedAnswers、answerVerification、A 至 D optionExplanations、tags 與 sourceRef；以資料 shape unit test 與內容審查驗證。
- [x] [P] 4.47 建立 114 年第 46 題解析，完成後該 record 有原題、A 至 D 四選項、acceptedAnswers、answerVerification、A 至 D optionExplanations、tags 與 sourceRef；以資料 shape unit test 與內容審查驗證。
- [x] [P] 4.48 建立 114 年第 47 題解析，完成後該 record 有原題、A 至 D 四選項、acceptedAnswers、answerVerification、A 至 D optionExplanations、tags 與 sourceRef；以資料 shape unit test 與內容審查驗證。
- [x] [P] 4.49 建立 114 年第 48 題解析，完成後該 record 有原題、A 至 D 四選項、acceptedAnswers、answerVerification、A 至 D optionExplanations、tags 與 sourceRef；以資料 shape unit test 與內容審查驗證。
- [x] [P] 4.50 建立 114 年第 49 題解析，完成後該 record 有原題、A 至 D 四選項、acceptedAnswers、answerVerification、A 至 D optionExplanations、tags 與 sourceRef；以資料 shape unit test 與內容審查驗證。
- [x] [P] 4.51 建立 114 年第 50 題解析，完成後該 record 有原題、A 至 D 四選項、acceptedAnswers、answerVerification、A 至 D optionExplanations、tags 與 sourceRef；以資料 shape unit test 與內容審查驗證。
- [x] 4.52 完成 114 年整批內容一致性審查，完成後 50 題皆有唯一題號、四個原始選項、四份選項辨析、非空 tags、sourceRef、官方答案狀態與專業教學解析；以資料驗證腳本、內容審查表與 `npm run test:unit` 驗證。

## 5. PWA plugin runtime 與部署驗證

- [x] 5.1 安裝 `vite-plugin-pwa` 並覆蓋 Requirement: Vite Plugin Generates PWA Runtime Assets，完成後 production build 產生 `dist/manifest.webmanifest` 與 generated service worker；以 `npm run build` 與 filesystem output check 驗證。
- [x] 5.2 實作 [Design: Convert src/app/pwa.ts into a vite-plugin-pwa update wrapper] 與 Requirement: App PWA Wrapper Does Not Register Service Worker Manually，完成後 `src/app/pwa.ts` 不直接呼叫 `navigator.serviceWorker.register`，只暴露 plugin runtime 狀態；以 `rg "navigator\\.serviceWorker\\.register" src/app/pwa.ts` 無結果與 unit test 驗證。
- [x] 5.3 實作 Requirement: PWA Runtime Provides Update Feedback，完成後 service worker unsupported 與 update available 都顯示非阻斷狀態，學習路由仍可線上使用；以 unit test mock plugin states 與 manual browser assertion 驗證。
- [x] 5.4 實作 Requirement: Navigation Is Cached For Offline Reading，完成後已快取後離線開啟 `/a-group` 會回到 app shell；以 Playwright offline flow 與 production preview 驗證。
- [x] 5.5 實作 Requirement: Deployment Base Paths Are Branch Specific，完成後 `main` 使用 `/finPubTest/`，`dev` 使用 `/finPubTest/staging/`，manifest start_url 與 scope 同步；以 workflow shell step unit check 或 CI dry-run command 驗證。
- [x] 5.6 實作 Requirement: CI Validates PWA Output，完成後 CI 在 pull request 與非 `gh-pages` push 跑 lint、typecheck、unit test、build、PWA output check、e2e；以 workflow lint 與一次本機等價命令驗證。
- [x] 5.7 更新 CD 部署順序，完成後 build、PWA output check 與 e2e 都通過後才同步 `dist` 到 `gh-pages`；以 workflow review 與 staging branch manual assertion 驗證。

## 6. 文件、整合測試與收尾

- [x] 6.1 更新 `PROJECT_ARCHITECTURE.md`，完成後文件記錄 examGroups module、group routes、A 組 114 first batch、107 至 113 pending、vite-plugin-pwa runtime 與 CI/CD 驗證；以文件審查確認與實作檔案一致。
- [x] 6.2 更新測試矩陣，完成後 router、storage、loader、question card、PWA wrapper、PWA output、mobile/offline smoke 都有對應測試或人工驗證紀錄；以測試清單審查驗證。
- [x] 6.3 執行全量驗證，完成後 `npm run typecheck`、`npm run test:unit`、`npm run build`、PWA output check、`npm run test:e2e -- --project=chromium` 全部通過；以終端輸出與 CI 結果驗證。
- [x] 6.4 執行 Spectra 收尾檢查，完成後 specs、design、tasks 與實作行為一致；以 `spectra analyze rebuild-exam-pwa-group-year-analysis --json` 與 `spectra validate rebuild-exam-pwa-group-year-analysis` 驗證。

## 7. 114 年新手系統教學解析回補

- [x] 7.1 實作 [Design: Use systematic novice teaching analysis as the content quality bar] 與 Requirement: Question Analysis Provides Systematic Novice Teaching Content 的內容審查 rubric，完成後 `validateAGroup114QuestionContent` 能拒絕只給結論、跳過前置觀念、缺少公式或規則來源、缺少常見陷阱的淺層解析；以 `tests/unit/aGroup114ContentReview.spec.ts` 的 fail/pass fixture 與 `npm run check:a-group-114-content` 驗證。
- [x] 7.2 升級 Requirement: Question Analysis Provides Systematic Novice Teaching Content 的 114 年第 1 題解析，完成後該題 `beginnerExplanation`、`solvingSteps`、`keyTakeaways` 明確說明必要前置觀念、公式或規則來源、逐步套用、本題常見陷阱與可複用重點；以 `tests/unit/aGroup114QuestionContent.spec.ts` 與內容審查 rubric 驗證。
- [x] 7.3 升級 Requirement: Question Analysis Provides Systematic Novice Teaching Content 的 114 年第 2 題解析，完成後該題 `beginnerExplanation`、`solvingSteps`、`keyTakeaways` 明確說明必要前置觀念、公式或規則來源、逐步套用、本題常見陷阱與可複用重點；以 `tests/unit/aGroup114QuestionContent.spec.ts` 與內容審查 rubric 驗證。
- [x] 7.4 升級 Requirement: Question Analysis Provides Systematic Novice Teaching Content 的 114 年第 3 題解析，完成後該題 `beginnerExplanation`、`solvingSteps`、`keyTakeaways` 明確說明必要前置觀念、公式或規則來源、逐步套用、本題常見陷阱與可複用重點；以 `tests/unit/aGroup114QuestionContent.spec.ts` 與內容審查 rubric 驗證。
- [x] 7.5 升級 Requirement: Question Analysis Provides Systematic Novice Teaching Content 的 114 年第 4 題解析，完成後該題 `beginnerExplanation`、`solvingSteps`、`keyTakeaways` 明確說明必要前置觀念、公式或規則來源、逐步套用、本題常見陷阱與可複用重點；以 `tests/unit/aGroup114QuestionContent.spec.ts` 與內容審查 rubric 驗證。
- [x] 7.6 升級 Requirement: Question Analysis Provides Systematic Novice Teaching Content 的 114 年第 5 題解析，完成後該題 `beginnerExplanation`、`solvingSteps`、`keyTakeaways` 明確說明必要前置觀念、公式或規則來源、逐步套用、本題常見陷阱與可複用重點；以 `tests/unit/aGroup114QuestionContent.spec.ts` 與內容審查 rubric 驗證。
- [x] 7.7 升級 Requirement: Question Analysis Provides Systematic Novice Teaching Content 的 114 年第 6 題解析，完成後該題 `beginnerExplanation`、`solvingSteps`、`keyTakeaways` 明確說明必要前置觀念、公式或規則來源、逐步套用、本題常見陷阱與可複用重點；以 `tests/unit/aGroup114QuestionContent.spec.ts` 與內容審查 rubric 驗證。
- [x] 7.8 升級 Requirement: Question Analysis Provides Systematic Novice Teaching Content 的 114 年第 7 題解析，完成後該題 `beginnerExplanation`、`solvingSteps`、`keyTakeaways` 明確說明必要前置觀念、公式或規則來源、逐步套用、本題常見陷阱與可複用重點；以 `tests/unit/aGroup114QuestionContent.spec.ts` 與內容審查 rubric 驗證。
- [x] 7.9 升級 Requirement: Question Analysis Provides Systematic Novice Teaching Content 的 114 年第 8 題解析，完成後該題 `beginnerExplanation`、`solvingSteps`、`keyTakeaways` 明確說明必要前置觀念、公式或規則來源、逐步套用、本題常見陷阱與可複用重點；以 `tests/unit/aGroup114QuestionContent.spec.ts` 與內容審查 rubric 驗證。
- [x] 7.10 升級 Requirement: Question Analysis Provides Systematic Novice Teaching Content 的 114 年第 9 題解析，完成後該題 `beginnerExplanation`、`solvingSteps`、`keyTakeaways` 明確說明必要前置觀念、公式或規則來源、逐步套用、本題常見陷阱與可複用重點；以 `tests/unit/aGroup114QuestionContent.spec.ts` 與內容審查 rubric 驗證。
- [x] 7.11 升級 Requirement: Question Analysis Provides Systematic Novice Teaching Content 的 114 年第 10 題解析，完成後該題 `beginnerExplanation`、`solvingSteps`、`keyTakeaways` 明確說明必要前置觀念、公式或規則來源、逐步套用、本題常見陷阱與可複用重點；以 `tests/unit/aGroup114QuestionContent.spec.ts` 與內容審查 rubric 驗證。
- [x] 7.12 升級 Requirement: Question Analysis Provides Systematic Novice Teaching Content 的 114 年第 11 題解析，完成後該題 `beginnerExplanation`、`solvingSteps`、`keyTakeaways` 明確說明必要前置觀念、公式或規則來源、逐步套用、本題常見陷阱與可複用重點；以 `tests/unit/aGroup114QuestionContent.spec.ts` 與內容審查 rubric 驗證。
- [x] 7.13 升級 Requirement: Question Analysis Provides Systematic Novice Teaching Content 的 114 年第 12 題解析，完成後該題 `beginnerExplanation`、`solvingSteps`、`keyTakeaways` 明確說明必要前置觀念、公式或規則來源、逐步套用、本題常見陷阱與可複用重點；以 `tests/unit/aGroup114QuestionContent.spec.ts` 與內容審查 rubric 驗證。
- [x] 7.14 升級 Requirement: Question Analysis Provides Systematic Novice Teaching Content 的 114 年第 13 題解析，完成後該題 `beginnerExplanation`、`solvingSteps`、`keyTakeaways` 明確說明必要前置觀念、公式或規則來源、逐步套用、本題常見陷阱與可複用重點；以 `tests/unit/aGroup114QuestionContent.spec.ts` 與內容審查 rubric 驗證。
- [x] 7.15 升級 Requirement: Question Analysis Provides Systematic Novice Teaching Content 的 114 年第 14 題解析，完成後該題 `beginnerExplanation`、`solvingSteps`、`keyTakeaways` 明確說明必要前置觀念、公式或規則來源、逐步套用、本題常見陷阱與可複用重點；以 `tests/unit/aGroup114QuestionContent.spec.ts` 與內容審查 rubric 驗證。
- [x] 7.16 升級 Requirement: Question Analysis Provides Systematic Novice Teaching Content 的 114 年第 15 題解析，完成後該題 `beginnerExplanation`、`solvingSteps`、`keyTakeaways` 明確說明必要前置觀念、公式或規則來源、逐步套用、本題常見陷阱與可複用重點；以 `tests/unit/aGroup114QuestionContent.spec.ts` 與內容審查 rubric 驗證。
- [x] 7.17 升級 Requirement: Question Analysis Provides Systematic Novice Teaching Content 的 114 年第 16 題解析，完成後該題 `beginnerExplanation`、`solvingSteps`、`keyTakeaways` 明確說明必要前置觀念、公式或規則來源、逐步套用、本題常見陷阱與可複用重點；以 `tests/unit/aGroup114QuestionContent.spec.ts` 與內容審查 rubric 驗證。
- [x] 7.18 升級 Requirement: Question Analysis Provides Systematic Novice Teaching Content 的 114 年第 17 題解析，完成後該題 `beginnerExplanation`、`solvingSteps`、`keyTakeaways` 明確說明必要前置觀念、公式或規則來源、逐步套用、本題常見陷阱與可複用重點；以 `tests/unit/aGroup114QuestionContent.spec.ts` 與內容審查 rubric 驗證。
- [x] 7.19 升級 Requirement: Question Analysis Provides Systematic Novice Teaching Content 的 114 年第 18 題解析，完成後該題 `beginnerExplanation`、`solvingSteps`、`keyTakeaways` 明確說明必要前置觀念、公式或規則來源、逐步套用、本題常見陷阱與可複用重點；以 `tests/unit/aGroup114QuestionContent.spec.ts` 與內容審查 rubric 驗證。
- [x] 7.20 升級 Requirement: Question Analysis Provides Systematic Novice Teaching Content 的 114 年第 19 題解析，完成後該題 `beginnerExplanation`、`solvingSteps`、`keyTakeaways` 明確說明必要前置觀念、公式或規則來源、逐步套用、本題常見陷阱與可複用重點；以 `tests/unit/aGroup114QuestionContent.spec.ts` 與內容審查 rubric 驗證。
- [x] 7.21 升級 Requirement: Question Analysis Provides Systematic Novice Teaching Content 的 114 年第 20 題解析，完成後該題 `beginnerExplanation`、`solvingSteps`、`keyTakeaways` 明確說明必要前置觀念、公式或規則來源、逐步套用、本題常見陷阱與可複用重點；以 `tests/unit/aGroup114QuestionContent.spec.ts` 與內容審查 rubric 驗證。
- [x] 7.22 升級 Requirement: Question Analysis Provides Systematic Novice Teaching Content 的 114 年第 21 題解析，完成後該題 `beginnerExplanation`、`solvingSteps`、`keyTakeaways` 明確說明必要前置觀念、公式或規則來源、逐步套用、本題常見陷阱與可複用重點；以 `tests/unit/aGroup114QuestionContent.spec.ts` 與內容審查 rubric 驗證。
- [x] 7.23 升級 Requirement: Question Analysis Provides Systematic Novice Teaching Content 的 114 年第 22 題解析，完成後該題 `beginnerExplanation`、`solvingSteps`、`keyTakeaways` 明確說明必要前置觀念、公式或規則來源、逐步套用、本題常見陷阱與可複用重點；以 `tests/unit/aGroup114QuestionContent.spec.ts` 與內容審查 rubric 驗證。
- [x] 7.24 升級 Requirement: Question Analysis Provides Systematic Novice Teaching Content 的 114 年第 23 題解析，完成後該題 `beginnerExplanation`、`solvingSteps`、`keyTakeaways` 明確說明必要前置觀念、公式或規則來源、逐步套用、本題常見陷阱與可複用重點；以 `tests/unit/aGroup114QuestionContent.spec.ts` 與內容審查 rubric 驗證。
- [x] 7.25 升級 Requirement: Question Analysis Provides Systematic Novice Teaching Content 的 114 年第 24 題解析，完成後該題 `beginnerExplanation`、`solvingSteps`、`keyTakeaways` 明確說明必要前置觀念、公式或規則來源、逐步套用、本題常見陷阱與可複用重點；以 `tests/unit/aGroup114QuestionContent.spec.ts` 與內容審查 rubric 驗證。
- [x] 7.26 升級 Requirement: Question Analysis Provides Systematic Novice Teaching Content 的 114 年第 25 題解析，完成後該題 `beginnerExplanation`、`solvingSteps`、`keyTakeaways` 明確說明必要前置觀念、公式或規則來源、逐步套用、本題常見陷阱與可複用重點；以 `tests/unit/aGroup114QuestionContent.spec.ts` 與內容審查 rubric 驗證。
- [x] 7.27 升級 Requirement: Question Analysis Provides Systematic Novice Teaching Content 的 114 年第 26 題解析，完成後該題 `beginnerExplanation`、`solvingSteps`、`keyTakeaways` 明確說明必要前置觀念、公式或規則來源、逐步套用、本題常見陷阱與可複用重點；以 `tests/unit/aGroup114QuestionContent.spec.ts` 與內容審查 rubric 驗證。
- [x] 7.28 升級 Requirement: Question Analysis Provides Systematic Novice Teaching Content 的 114 年第 27 題解析，完成後該題 `beginnerExplanation`、`solvingSteps`、`keyTakeaways` 明確說明必要前置觀念、公式或規則來源、逐步套用、本題常見陷阱與可複用重點；以 `tests/unit/aGroup114QuestionContent.spec.ts` 與內容審查 rubric 驗證。
- [x] 7.29 升級 Requirement: Question Analysis Provides Systematic Novice Teaching Content 的 114 年第 28 題解析，完成後該題 `beginnerExplanation`、`solvingSteps`、`keyTakeaways` 明確說明必要前置觀念、公式或規則來源、逐步套用、本題常見陷阱與可複用重點；以 `tests/unit/aGroup114QuestionContent.spec.ts` 與內容審查 rubric 驗證。
- [x] 7.30 升級 Requirement: Question Analysis Provides Systematic Novice Teaching Content 的 114 年第 29 題解析，完成後該題 `beginnerExplanation`、`solvingSteps`、`keyTakeaways` 明確說明必要前置觀念、公式或規則來源、逐步套用、本題常見陷阱與可複用重點；以 `tests/unit/aGroup114QuestionContent.spec.ts` 與內容審查 rubric 驗證。
- [x] 7.31 升級 Requirement: Question Analysis Provides Systematic Novice Teaching Content 的 114 年第 30 題解析，完成後該題 `beginnerExplanation`、`solvingSteps`、`keyTakeaways` 明確說明必要前置觀念、公式或規則來源、逐步套用、本題常見陷阱與可複用重點；以 `tests/unit/aGroup114QuestionContent.spec.ts` 與內容審查 rubric 驗證。
- [x] 7.32 升級 Requirement: Question Analysis Provides Systematic Novice Teaching Content 的 114 年第 31 題解析，完成後該題 `beginnerExplanation`、`solvingSteps`、`keyTakeaways` 明確說明必要前置觀念、公式或規則來源、逐步套用、本題常見陷阱與可複用重點；以 `tests/unit/aGroup114QuestionContent.spec.ts` 與內容審查 rubric 驗證。
- [x] 7.33 升級 Requirement: Question Analysis Provides Systematic Novice Teaching Content 的 114 年第 32 題解析，完成後該題 `beginnerExplanation`、`solvingSteps`、`keyTakeaways` 明確說明必要前置觀念、公式或規則來源、逐步套用、本題常見陷阱與可複用重點；以 `tests/unit/aGroup114QuestionContent.spec.ts` 與內容審查 rubric 驗證。
- [x] 7.34 升級 Requirement: Question Analysis Provides Systematic Novice Teaching Content 的 114 年第 33 題解析，完成後該題 `beginnerExplanation`、`solvingSteps`、`keyTakeaways` 明確說明必要前置觀念、公式或規則來源、逐步套用、本題常見陷阱與可複用重點；以 `tests/unit/aGroup114QuestionContent.spec.ts` 與內容審查 rubric 驗證。
- [x] 7.35 升級 Requirement: Question Analysis Provides Systematic Novice Teaching Content 的 114 年第 34 題解析，完成後該題 `beginnerExplanation`、`solvingSteps`、`keyTakeaways` 明確說明必要前置觀念、公式或規則來源、逐步套用、本題常見陷阱與可複用重點；以 `tests/unit/aGroup114QuestionContent.spec.ts` 與內容審查 rubric 驗證。
- [x] 7.36 升級 Requirement: Question Analysis Provides Systematic Novice Teaching Content 的 114 年第 35 題解析，完成後該題 `beginnerExplanation`、`solvingSteps`、`keyTakeaways` 明確說明必要前置觀念、公式或規則來源、逐步套用、本題常見陷阱與可複用重點；以 `tests/unit/aGroup114QuestionContent.spec.ts` 與內容審查 rubric 驗證。
- [x] 7.37 升級 Requirement: Question Analysis Provides Systematic Novice Teaching Content 的 114 年第 36 題解析，完成後該題 `beginnerExplanation`、`solvingSteps`、`keyTakeaways` 明確說明必要前置觀念、公式或規則來源、逐步套用、本題常見陷阱與可複用重點；以 `tests/unit/aGroup114QuestionContent.spec.ts` 與內容審查 rubric 驗證。
- [x] 7.38 升級 Requirement: Question Analysis Provides Systematic Novice Teaching Content 的 114 年第 37 題解析，完成後該題 `beginnerExplanation`、`solvingSteps`、`keyTakeaways` 明確說明必要前置觀念、公式或規則來源、逐步套用、本題常見陷阱與可複用重點；以 `tests/unit/aGroup114QuestionContent.spec.ts` 與內容審查 rubric 驗證。
- [x] 7.39 升級 Requirement: Question Analysis Provides Systematic Novice Teaching Content 的 114 年第 38 題解析，完成後該題 `beginnerExplanation`、`solvingSteps`、`keyTakeaways` 明確說明必要前置觀念、公式或規則來源、逐步套用、本題常見陷阱與可複用重點；以 `tests/unit/aGroup114QuestionContent.spec.ts` 與內容審查 rubric 驗證。
- [x] 7.40 升級 Requirement: Question Analysis Provides Systematic Novice Teaching Content 的 114 年第 39 題解析，完成後該題 `beginnerExplanation`、`solvingSteps`、`keyTakeaways` 明確說明必要前置觀念、公式或規則來源、逐步套用、本題常見陷阱與可複用重點；以 `tests/unit/aGroup114QuestionContent.spec.ts` 與內容審查 rubric 驗證。
- [x] 7.41 升級 Requirement: Question Analysis Provides Systematic Novice Teaching Content 的 114 年第 40 題解析，完成後該題 `beginnerExplanation`、`solvingSteps`、`keyTakeaways` 明確說明必要前置觀念、公式或規則來源、逐步套用、本題常見陷阱與可複用重點；以 `tests/unit/aGroup114QuestionContent.spec.ts` 與內容審查 rubric 驗證。
- [x] 7.42 升級 Requirement: Question Analysis Provides Systematic Novice Teaching Content 的 114 年第 41 題解析，完成後該題 `beginnerExplanation`、`solvingSteps`、`keyTakeaways` 明確說明必要前置觀念、公式或規則來源、逐步套用、本題常見陷阱與可複用重點；以 `tests/unit/aGroup114QuestionContent.spec.ts` 與內容審查 rubric 驗證。
- [x] 7.43 升級 Requirement: Question Analysis Provides Systematic Novice Teaching Content 的 114 年第 42 題解析，完成後該題 `beginnerExplanation`、`solvingSteps`、`keyTakeaways` 明確說明必要前置觀念、公式或規則來源、逐步套用、本題常見陷阱與可複用重點；以 `tests/unit/aGroup114QuestionContent.spec.ts` 與內容審查 rubric 驗證。
- [x] 7.44 升級 Requirement: Question Analysis Provides Systematic Novice Teaching Content 的 114 年第 43 題解析，完成後該題 `beginnerExplanation`、`solvingSteps`、`keyTakeaways` 明確說明必要前置觀念、公式或規則來源、逐步套用、本題常見陷阱與可複用重點；以 `tests/unit/aGroup114QuestionContent.spec.ts` 與內容審查 rubric 驗證。
- [x] 7.45 升級 Requirement: Question Analysis Provides Systematic Novice Teaching Content 的 114 年第 44 題解析，完成後該題 `beginnerExplanation`、`solvingSteps`、`keyTakeaways` 明確說明必要前置觀念、公式或規則來源、逐步套用、本題常見陷阱與可複用重點；以 `tests/unit/aGroup114QuestionContent.spec.ts` 與內容審查 rubric 驗證。
- [x] 7.46 升級 Requirement: Question Analysis Provides Systematic Novice Teaching Content 的 114 年第 45 題解析，完成後該題 `beginnerExplanation`、`solvingSteps`、`keyTakeaways` 明確說明必要前置觀念、公式或規則來源、逐步套用、本題常見陷阱與可複用重點；以 `tests/unit/aGroup114QuestionContent.spec.ts` 與內容審查 rubric 驗證。
- [x] 7.47 升級 Requirement: Question Analysis Provides Systematic Novice Teaching Content 的 114 年第 46 題解析，完成後該題 `beginnerExplanation`、`solvingSteps`、`keyTakeaways` 明確說明必要前置觀念、公式或規則來源、逐步套用、本題常見陷阱與可複用重點；以 `tests/unit/aGroup114QuestionContent.spec.ts` 與內容審查 rubric 驗證。
- [x] 7.48 升級 Requirement: Question Analysis Provides Systematic Novice Teaching Content 的 114 年第 47 題解析，完成後該題 `beginnerExplanation`、`solvingSteps`、`keyTakeaways` 明確說明必要前置觀念、公式或規則來源、逐步套用、本題常見陷阱與可複用重點；以 `tests/unit/aGroup114QuestionContent.spec.ts` 與內容審查 rubric 驗證。
- [x] 7.49 升級 Requirement: Question Analysis Provides Systematic Novice Teaching Content 的 114 年第 48 題解析，完成後該題 `beginnerExplanation`、`solvingSteps`、`keyTakeaways` 明確說明必要前置觀念、公式或規則來源、逐步套用、本題常見陷阱與可複用重點；以 `tests/unit/aGroup114QuestionContent.spec.ts` 與內容審查 rubric 驗證。
- [x] 7.50 升級 Requirement: Question Analysis Provides Systematic Novice Teaching Content 的 114 年第 49 題解析，完成後該題 `beginnerExplanation`、`solvingSteps`、`keyTakeaways` 明確說明必要前置觀念、公式或規則來源、逐步套用、本題常見陷阱與可複用重點；以 `tests/unit/aGroup114QuestionContent.spec.ts` 與內容審查 rubric 驗證。
- [x] 7.51 升級 Requirement: Question Analysis Provides Systematic Novice Teaching Content 的 114 年第 50 題解析，完成後該題 `beginnerExplanation`、`solvingSteps`、`keyTakeaways` 明確說明必要前置觀念、公式或規則來源、逐步套用、本題常見陷阱與可複用重點；以 `tests/unit/aGroup114QuestionContent.spec.ts` 與內容審查 rubric 驗證。

## 8. 新手解析文件與收尾驗證

- [x] 8.1 更新 `PROJECT_ARCHITECTURE.md` 與 `TEST_MATRIX.md`，完成後文件記錄 114 年逐題解析採用新手系統教學標準、內容審查 rubric 與對應測試；以文件測試與人工審查驗證。
- [x] 8.2 執行新手解析全量驗證，完成後 `npm run check:a-group-114-content`、`npm run test:unit`、`npm run typecheck`、`npm run build` 與 `npm run test:e2e -- --project=chromium` 全部通過；以終端輸出驗證。
- [x] 8.3 執行 Spectra 收尾檢查，完成後更新後的 specs、design、tasks 與實作行為一致；以 `spectra analyze rebuild-exam-pwa-group-year-analysis --json` 與 `spectra validate rebuild-exam-pwa-group-year-analysis` 驗證。
