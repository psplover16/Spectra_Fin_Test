# 提案草稿：國營事業考古題學習 PWA 大翻新

## Conclusion

**Decision**: 本專案要從目前「按科目呈現講義」的架構，改版成「A 組、B 組、語言」三個主路由。A 組第一批只完成 114 年年度解析與版型驗證；等版型確認後，再一次完成 107 至 113 年。視覺、互動與 CI/CD 以 `C:\Users\user1\Documents\Spectra-Learning-Japanese` 的 `/n5-grammar` 路由與 GitHub Pages 發布流程為實作參照。

**Rationale**: 實際讀取後確認，參考專案的 N5 文法頁不是單純配色，而是一套完整的 Vue/Tailwind 元件模式：sticky header、左側書籤、右側完成 checkbox、localStorage 狀態、lazy-loaded 分檔資料、手機 375px 版面測試與 GitHub Pages staging/production CD。A 組 PDF 已確認為 107 至 114 共 8 份、每份 4 頁、單選 50 題，總計 400 題；先做 114 年可讓版型、資料結構、PWA 與解析模板先穩定，避免 400 題內容一次展開後才發現整體方向要改。

**Capture to**: 後續應轉成 Spectra change 的 `proposal.md`、`design.md`、`tasks.md`，並新增或更新 capability spec，定義「年度清單」、「年度解析頁」、「逐題解析資料結構」、「書籤/完成狀態」與「PDF 擷取校對」的可驗收行為。

## 已讀取脈絡

### 參考專案程式碼

已讀取「日語學習PWA」的關鍵檔案：

1. `package.json`
2. `vite.config.ts`
3. `.github/workflows/ci.yml`
4. `.github/workflows/cd.yml`
5. `scripts/publishPages.mjs`
6. `src/app/router.ts`
7. `src/app/routePreload.ts`
8. `src/app/AppShell.vue`
9. `src/shared/components/RouteTabs.vue`
10. `src/modules/grammar/components/GrammarLevelSwitcher.vue`
11. `src/modules/n5Grammar/views/N5GrammarView.vue`
12. `src/modules/n5Grammar/components/N5GrammarSectionCard.vue`
13. `src/modules/n5Grammar/composables/useN5GrammarSections.ts`
14. `src/modules/n5Grammar/storage/n5GrammarCompletionStorage.ts`
15. `src/modules/n5Grammar/types/grammarNotes.ts`
16. `src/modules/n5Grammar/components/N5GrammarInfoBlock.vue`
17. `src/modules/n5Grammar/components/N5GrammarBulletBlock.vue`
18. `src/modules/n5Grammar/components/N5GrammarCompareTable.vue`
19. `src/styles/main.css`
20. `tailwind.config.ts`
21. N5 文法相關 unit/component/e2e 測試

### 本專案現況

已讀取本專案關鍵檔案：

1. `package.json`
2. `.github/workflows/ci.yml`
3. `.github/workflows/cd.yml`
4. `vite.config.ts`
5. `src/app/router.ts`
6. `src/app/AppShell.vue`
7. `src/app/pwa.ts`
8. `src/styles/main.css`
9. `src/modules/exam/data/examRoutes.ts`
10. `src/modules/exam/data/subjectContent.ts`
11. `src/modules/exam/views/ExamRouteView.vue`

現況判斷：

1. 本專案目前已有 Vue/Vite/Tailwind 基礎。
2. 目前路由是 `/computer-principles`、`/networking`、`/information-management`、`/programming`、`/language`，屬於按科目拆分。
3. 新需求是 `/a-group`、`/b-group`、`/language`，並由 A 組年度列導向 `/a-group/:year`，因此不是小幅補內容，而是路由與資料模型都要改版。
4. `subjectContent.ts` 目前引用的是長檔名 PDF，例如 `107國營事業新進職員-計算機原理、網路概論.pdf`；但實際 A 組資料夾目前是 `107.pdf` 至 `114.pdf`，需要更新來源檔案對應。
5. 本專案已有 CI/CD workflow 與 `scripts/publishPages.mjs`，但 package scripts 缺少 `lint` 與 `test:ci`，Vite 也尚未使用參考專案的 `vite-plugin-pwa`、Icons、compression、app version 注入等設定。
6. PWA 後續決策是完整改用 `vite-plugin-pwa`；現有 `src/app/pwa.ts` 要改成只包裝 plugin 提供的更新提示流程，不得自行註冊 service worker，也不保留兩套 service worker 註冊機制。

### A 組 PDF

已讀取 `_private/計算機原理、網路概論/` 內 PDF：

| 年度 | 檔案 | 頁數 | 文字擷取量 | 觀察 |
| --- | --- | ---: | ---: | --- |
| 114 | `114.pdf` | 4 | 6162 chars | 答案多為 `[C]` 換行後接 `1.` |
| 113 | `113.pdf` | 4 | 5797 chars | 答案與題號有換行，需正規化 |
| 112 | `112.pdf` | 4 | 7324 chars | 部分題幹跨行，需保留換行語意 |
| 111 | `111.pdf` | 4 | 7137 chars | 可擷取 50 題答案與選項 |
| 110 | `110.pdf` | 4 | 6309 chars | 題號與答案格式不完全一致 |
| 109 | `109.pdf` | 4 | 6963 chars | 可擷取 50 題答案與選項 |
| 108 | `108.pdf` | 4 | 6055 chars | 題目前可能有額外數字 |
| 107 | `107.pdf` | 4 | 7154 chars | 會出現 `3 [D] 1.`、`6 [D] 2.` 這類格式 |

PDF 共同特徵：

1. 每份試題為 A3 紙 1 張、共 4 頁。
2. 每份為單選題 50 題，每題 2 分，共 100 分。
3. 題目前方已有答案標記，格式不完全一致。
4. 題幹與選項可能跨行。
5. 會出現程式碼題、計算題、概念題、資料結構題、作業系統題、資料庫題與網路題。
6. PDF 文字可用 PyMuPDF 擷取，但仍需正規化與人工/副代理校對。

## 參考專案可移植設計

### 路由與載入

參考專案使用 `vue-router` 與 `createWebHistory(import.meta.env.BASE_URL)`。

可移植要點：

1. 以 route loader 延遲載入主要頁面。
2. 使用 `primaryRoutePaths` 註冊主要路由。
3. 在 `AppShell` mounted 後 idle preload 其他主要路由。
4. `RouterView` 包在 `KeepAlive` 中，保留頁面狀態。

本專案建議改成：

| 顯示名稱 | 路由 | 說明 |
| --- | --- | --- |
| A 組 | `/a-group` | 年度清單，第一批完整支援 114 年 |
| B 組 | `/b-group` | 保留路由與樣式，內容延後 |
| 語言 | `/language` | 保留路由與樣式，內容延後或沿用後續資料 |
| A 組年度解析 | `/a-group/:year` | 顯示該年度 50 題解析 |

根路由建議 redirect 到 `/a-group`，而不是維持目前 landing page。

舊路由遷移建議：

| 舊路由 | 新行為 |
| --- | --- |
| `/computer-principles` | redirect 到 `/a-group` |
| `/networking` | redirect 到 `/a-group` |
| `/information-management` | redirect 到 `/b-group` |
| `/programming` | redirect 到 `/b-group` |
| `/language` | 保留為語言主路由 |

年度路由行為：

1. `/a-group/114` 第一批完整呈現 50 題解析。
2. `/a-group/107` 至 `/a-group/113` 第一批可進入待製作頁，標示「版型確認後製作」，不得顯示成完整解析。
3. `/a-group/999`、`/a-group/abc`、`/a-group/115` 等不在 107 至 114 範圍內的年度，一律進入 NotFound 頁。

### N5 文法視覺模式

參考專案的 `/n5-grammar` 主要由以下元素組成：

1. `.n5-grammar-view`
2. `.n5-grammar-section-card`
3. `.n5-grammar-section-header`
4. `.n5-grammar-section-bookmark-hit-area`
5. `.n5-grammar-section-completion-hit-area`
6. `.n5-grammar-section-toggle`
7. `.n5-grammar-section-body`
8. `.n5-grammar-topic-card`
9. `.n5-grammar-example-card`
10. `.n5-grammar-table-shell`
11. `.n5-grammar-table`

本專案應採用同一套視覺語彙，但互動要依需求調整：

1. A 組年度清單列使用 N5 section header 的視覺。
2. 年度列中左側保留書籤、右側保留完成 checkbox。
3. 點選年度列中央區域時導向 `/a-group/:year`。
4. 點擊書籤或 checkbox 時必須 `preventDefault` 與 `stopPropagation`，不可導頁。
5. 年度清單不採用展開/收納；它是導頁清單。
6. 年度解析頁可使用同樣的 sticky 題目 header 與 topic card 樣式，但預設應直接呈現題目與解析，避免把主要內容藏在收納中。

### 狀態儲存

參考專案的狀態模式：

1. 完成狀態寫入 localStorage snapshot。
2. 書籤只保留目前閱讀位置。
3. 完成某 section 時會清掉該 section 書籤。
4. 完成 section 會移到 finished zone，且 finished zone 不顯示書籤按鈕。
5. reload 與離線時狀態仍要保留。

本專案建議建立獨立 storage key：

1. `finpub.exam.aGroup.completedYears`
2. `finpub.exam.aGroup.bookmark`
3. 後續若支援題目層級進度，再新增 `finpub.exam.aGroup.completedQuestions`

年度清單第一階段只需要年度層級完成與書籤即可；題目層級完成狀態可列為後續擴充，避免第一階段爆量。

### 資料分檔

參考專案 N5 文法資料型別包含：

1. section id/title/description
2. presentationMode
3. order/category
4. topics/sharedNotes
5. compare table 與 table examples
6. sourceRefs

A 組建議建立類似但更貼近考題的型別：

```ts
export interface ExamYearSummary {
  year: '114' | '113' | '112' | '111' | '110' | '109' | '108' | '107';
  title: string;
  sourceFile: string;
  questionCount: 50;
  subjects: ['計算機原理', '網路概論'];
}

export interface ExamQuestionAnalysis {
  year: string;
  number: number;
  acceptedAnswers: ('A' | 'B' | 'C' | 'D')[];
  answerNote: string | null;
  answerVerification: 'verified' | 'suspected-error' | 'needs-review';
  originalStem: string;
  options: Record<'A' | 'B' | 'C' | 'D', string>;
  coreTerms: string[];
  beginnerExplanation: string;
  solvingSteps: string[];
  optionExplanations: Record<'A' | 'B' | 'C' | 'D', string>;
  keyTakeaways: string[];
  tags: string[];
  sourceRef: {
    file: string;
    page: number | null;
    extractionStatus: 'extracted' | 'needs-review';
  };
}
```

建議資料分檔：

1. `src/modules/examGroups/aGroup/data/yearSummaries.ts`
2. `src/modules/examGroups/aGroup/data/years/114.ts`
3. `src/modules/examGroups/aGroup/data/years/113.ts`
4. `src/modules/examGroups/aGroup/data/years/112.ts`
5. `src/modules/examGroups/aGroup/data/years/111.ts`
6. `src/modules/examGroups/aGroup/data/years/110.ts`
7. `src/modules/examGroups/aGroup/data/years/109.ts`
8. `src/modules/examGroups/aGroup/data/years/108.ts`
9. `src/modules/examGroups/aGroup/data/years/107.ts`
10. `src/modules/examGroups/aGroup/composables/useAGroupYearQuestions.ts`

`useAGroupYearQuestions` 應依 route year lazy import 對應年度檔，不應在 A 組清單頁一次載入 400 題解析。

## PDF 擷取與解析規格

PDF 不能直接用單一 regex 切題，需先做正規化。

### 正規化規則

1. 將 `[C]\n1.` 合併成 `[C] 1.`。
2. 將 `3 [D] 1.` 正規化為答案 `[D]`、題號 `1`，前置數字只保留為 extraction note。
3. 保留題幹中的程式碼換行，例如 C 語言 `#include <stdio.h>` 與函式區塊。
4. 保留跨行題幹，但輸出到資料檔時要整理成可讀文字。
5. 選項必須完整對應 A/B/C/D。
6. 每題都要標示 `extractionStatus`，未人工確認前不得標成 fully verified。

### 逐題解析模板

每題都應包含：

1. 官方答案檢查。
2. 原始題目與選項。
3. 初學者背景說明。
4. 題目問法拆解。
5. 解題流程或判斷流程。
6. A/B/C/D 每個選項解析。
7. 重點統整。
8. 常見陷阱。
9. 題目標籤。
10. 來源 PDF 與頁碼。

### 114 年範例題型確認

已從 `114.pdf` 抽樣確認，前段包含：

1. 6 位元 2 的補數加法。
2. 馮紐曼架構基本組成。
3. Python list 與 tuple 差異。
4. CRC 錯誤偵測。
5. Hamming Code。
6. Transaction 的 ACID。
7. 優先權排程與 Aging。
8. 二元樹前序/中序推後序。
9. Bucket Sort 時間複雜度。
10. 穩定排序定義。
11. Memory Hierarchy。
12. Java 介面與多重繼承。
13. 強型別與動態型別。
14. C 語言函式呼叫與輸出追蹤。

因此 A 組解析不應只分成「計算機原理」與「網路概論」兩大段，還需要更細的 tags，例如：

1. 資料表示與補數
2. 錯誤偵測與編碼
3. 作業系統
4. 資料結構
5. 演算法
6. 程式語言
7. 資料庫
8. 計算機組織
9. 網路分層
10. 網路安全

## 副代理分工建議

每個年度 50 題，A 組共 400 題。第一批只處理 114 年，等使用者確認版型後，再以同樣任務模式一次完成 107 至 113 年。

每題分工：

1. **PDF 擷取者**
   - 從 PDF 擷取答案、題號、題幹、選項與頁碼。

2. **格式校對者**
   - 檢查題幹跨行、選項斷行、程式碼與特殊符號是否正確。

3. **官方答案驗證者**
   - 判斷官方答案是否合理；若有疑慮標示 `suspected-error`。

4. **初學者教學者**
   - 解釋核心名詞與背景概念。

5. **解題推導者**
   - 針對計算題、程式題、資料結構題逐步推導。

6. **選項解析者**
   - 逐一解析 A/B/C/D。

7. **考點歸類者**
   - 產生 tags、常見陷阱與複習重點。

8. **整合審稿者**
   - 統一語氣、繁體中文、資料結構與格式。

## CI/CD 調整

參考專案 CI：

1. `pull_request` 與 push 時執行。
2. 忽略 `gh-pages` push。
3. 使用 Node.js 22。
4. `npm ci`
5. `npm run lint`
6. `npm run typecheck`
7. `npm run test:unit`
8. `npm run build`
9. 安裝 Playwright Chromium。
10. `npm run test:e2e`
11. 失敗時上傳 Playwright diagnostics。

參考專案 CD：

1. `dev` 發 staging。
2. `main` 發 production。
3. production base path 為 `/Spectra-Learning-Japanese/`。
4. staging base path 為 `/Spectra-Learning-Japanese/staging/`。
5. 使用 `scripts/publishPages.mjs` 同步 `dist` 到 `gh-pages`。
6. staging 發布到 `gh-pages/staging`。
7. production 發布到 `gh-pages` 根目錄。

本專案現況已有相似 CD，base path 是 `/finPubTest/` 與 `/finPubTest/staging/`。PWA 決策是完整改用 `vite-plugin-pwa`，使 build 產物、manifest、service worker 與快取策略由 Vite plugin 統一管理。

需要補齊：

1. `package.json` 增加 `lint` 與 `test:ci`。
2. 視需要加入 ESLint 設定。
3. `package.json` 增加 `vite-plugin-pwa`、`workbox-window`、`vite-plugin-compression`，以及 app version 或 icon 需要的套件。
4. Vite 補上 `VitePWA`、manifest、workbox runtime caching、compression 與 app version。
5. 移除手寫 `service-worker.js` 註冊路徑，並把 `src/app/pwa.ts` 改成只處理 `vite-plugin-pwa` 的更新提示，不再自行註冊 service worker。
6. CI/CD 保留本專案目前額外的 PWA output 驗證，並補上參考專案已有的 lint。
7. 發布 repository slug 仍暫定為 `finPubTest`，除非正式部署前另行更名。

## 建議任務拆分

正式 `tasks.md` 可以破百個任務，不需要壓成大型工作項。建議採取「架構任務小步化、內容任務逐題化」的方式。

### 架構與路由任務

1. 建立正式 Spectra change。
2. 建立 `/a-group`、`/b-group`、`/language` 三個主路由。
3. 建立 `/a-group/:year` 年度解析路由。
4. 將根路由 redirect 到 `/a-group`。
5. 將 `/computer-principles` redirect 到 `/a-group`。
6. 將 `/networking` redirect 到 `/a-group`。
7. 將 `/information-management` redirect 到 `/b-group`。
8. 將 `/programming` redirect 到 `/b-group`。
9. 保留 `/language` 作為語言主路由。
10. 建立 invalid year guard，限制 A 組年度只接受 107 至 114。
11. 建立 `/a-group/107` 至 `/a-group/113` 待製作狀態頁。
12. 建立 invalid year 一律進入 NotFound 的錯誤處理。
13. 移植參考專案 route preload。
14. 移植 RouteTabs 或建立對應的組別導覽元件。
15. 調整 AppShell 框架與 `KeepAlive` 行為。

### 視覺與互動任務

1. 移植或改寫 `.n5-grammar-view` 樣式。
2. 移植或改寫 `.n5-grammar-section-card` 樣式。
3. 移植或改寫 `.n5-grammar-section-header` 樣式。
4. 移植或改寫左側書籤 hit area。
5. 移植或改寫右側完成 checkbox hit area。
6. 建立 A 組年度列元件。
7. 建立年度列中央導頁行為。
8. 確認書籤點擊不導頁。
9. 確認 checkbox 點擊不導頁。
10. 建立年度解析頁題目 header 樣式。
11. 建立題目解析 topic card 樣式。
12. 建立 375px mobile 版型測試。

### 狀態與資料任務

1. 建立 `ExamYearSummary` 型別。
2. 建立 `ExamQuestionAnalysis` 型別。
3. 建立 `yearSummaries.ts`，列出 114 至 107。
4. 建立 `114.ts` 年度資料檔。
5. 建立 107 至 113 年 placeholder 資料檔。
6. 建立 `useAGroupYearQuestions` lazy loader。
7. 建立 `finpub.exam.aGroup.completedYears` storage。
8. 建立 `finpub.exam.aGroup.bookmark` storage。
9. 建立完成年度後清除同年度書籤的規則。
10. 建立 storage snapshot schema 驗證。

### PWA 與 CI/CD 任務

1. 安裝 `vite-plugin-pwa`。
2. 安裝 `workbox-window`。
3. 安裝 `vite-plugin-compression`。
4. 在 `vite.config.ts` 加入 `VitePWA`。
5. 設定 PWA manifest。
6. 設定 workbox navigation cache。
7. 設定 staging 與 production start URL。
8. 移除手寫 service worker 註冊。
9. 將 `src/app/pwa.ts` 改成 plugin 更新提示 wrapper。
10. 補上 app version 注入。
11. 補上 gzip 與 brotli compression。
12. 補上 `lint` script。
13. 補上 `test:ci` script。
14. CI 加入 lint。
15. CI 保留 PWA output 驗證。
16. CD 保留 `dev` staging 與 `main` production。

### PDF 擷取任務

1. 建立 PDF 擷取工具或腳本。
2. 建立題號與答案正規化規則。
3. 建立跨行題幹正規化規則。
4. 建立選項 A/B/C/D 完整性檢查。
5. 建立程式碼題保留換行規則。
6. 建立頁碼來源標記。
7. 擷取 `114.pdf` 第 1 頁。
8. 擷取 `114.pdf` 第 2 頁。
9. 擷取 `114.pdf` 第 3 頁。
10. 擷取 `114.pdf` 第 4 頁。
11. 校對 114 年 50 題題號。
12. 校對 114 年 50 題答案。
13. 校對 114 年 50 題選項。

### 114 年逐題任務拆法

114 年每一題至少拆成三個任務：

1. `114-Qxx` PDF 擷取與格式校對。
2. `114-Qxx` 官方答案驗證與教學解析。
3. `114-Qxx` 選項解析、tags 與審稿。

以 50 題計算，逐題任務至少是 150 個。正式 `tasks.md` 可以展開成：

1. `114-Q01` 擷取與校對。
2. `114-Q01` 答案驗證與教學解析。
3. `114-Q01` 選項解析與審稿。
4. `114-Q02` 擷取與校對。
5. `114-Q02` 答案驗證與教學解析。
6. `114-Q02` 選項解析與審稿。
7. 依此模式持續到 `114-Q50`。

完成 114 年後，等待使用者確認版型；確認後再用同樣模式一次展開 107 至 113 年。

## 驗收標準

1. 根路由進入後可到達 `/a-group`。
2. `/a-group`、`/b-group`、`/language` 三個主路由存在。
3. `/a-group` 顯示 114、113、112、111、110、109、108、107 共 8 個年度列。
4. 年度列視覺與參考專案 N5 section header 一致。
5. 年度列中央點擊會導向 `/a-group/:year`。
6. 年度列左側書籤點擊不導頁，且 reload 後保留。
7. 年度列右側 checkbox 點擊不導頁，且 reload 後保留。
8. 完成年度後，若該年度是書籤，書籤應被清除或依明確規則處理。
9. 第一批 `/a-group/114` 完整呈現 50 題原始題目、答案、選項與 AI 教學解析。
10. 第一批 `/a-group/107` 至 `/a-group/113` 可導覽，但必須顯示待製作狀態，不得顯示成完整解析。
11. 題目解析包含官方答案檢查、初學者背景、解題流程、逐選項解析、重點統整與 tags。
12. PDF 題目資料來源指向實際存在的 `107.pdf` 至 `114.pdf`。
13. 舊路由 `/computer-principles` 與 `/networking` redirect 到 `/a-group`。
14. 舊路由 `/information-management` 與 `/programming` redirect 到 `/b-group`。
15. `/a-group/999`、`/a-group/abc`、`/a-group/115` 等 invalid year 一律進入 NotFound。
16. 375px mobile viewport 不得水平溢出。
17. sticky header、書籤、checkbox、年度導頁、舊路由 redirect、invalid year 需有 unit/component/e2e 測試。
18. 完整改用 `vite-plugin-pwa`，不得同時保留手寫 service worker 註冊與 plugin service worker 註冊。
19. CI 在 PR/push 跑 lint、typecheck、unit、build、e2e 與 PWA output 驗證。
20. CD 在 `dev` 發 staging，在 `main` 發 production，且 base path 指向本專案 repository slug。
21. 所有新增或修改的中文內容以 UTF-8 正確保存，無 BOM、無亂碼、無問號替代字元、無替代字元。

## 後續批次規劃

1. 第一批 change 驗收完成後，使用者確認 114 年版型。
2. 使用者確認版型後，第二批再一次完成 107 至 113 年逐題解析。
3. 第二批沿用第一批的資料型別、PDF 擷取規則、逐題任務拆法與版型，不重新討論架構。

## 風險與待確認

1. 400 題逐題解析內容量很大；第一批只做 114 年，107 至 113 年放入後續批次規劃。
2. PDF 答案與題號格式不一致，擷取流程需要正規化與人工/副代理校對。
3. 目前本專案資料模型是主題式講義，不是逐題解析；沿用會造成需求落差，建議建立新資料模型。
4. 目前本專案 route 是按科目，不符合 A/B/語言分組，需要明確替換或遷移。
5. 參考專案 N5 頁面原本是展開/收納 section，本專案年度清單需求是導頁，因此只能移植視覺與狀態控制，不應照搬展開 body 行為。
6. 完整改用 `vite-plugin-pwa` 時，`src/app/pwa.ts` 只能作為 plugin 更新提示 wrapper，避免 service worker 註冊衝突。
7. B 組與語言目前只明確指定路由與題科；若也要逐題解析，需要另讀對應 PDF 並另開資料處理流程。

## 下一步建議

下一步使用 `$spectra-propose` 建立正式 change，建議 change 名稱：

`rebuild-exam-pwa-group-year-analysis`

正式 change 至少要包含：

1. `proposal.md`：說明從科目講義改為組別/年度解析 PWA 的原因、範圍與非目標。
2. `design.md`：明確定義路由、元件、storage、資料分檔、PDF 擷取流程、CI/CD 對齊方式。
3. `tasks.md`：以 114 年垂直切片為第一批，避免一次承諾 400 題全部完成。
4. `spec.md`：用 SHALL/MUST 定義年度清單、年度解析頁、書籤、checkbox、PDF 題目資料與解析內容品質。
