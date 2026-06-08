## Discussion Conclusion

**Decision**: 本次變更先建立國營事業資訊人員考試 PWA 的樣式與基礎路由，不先匯入或整理參考來源資料夾內的完整 Markdown 內容。

**Rationale**: 目前需求重點是先把網站外觀、路由架構與 CI/CD 建立起來；考古題與講義內容雖已有參考資料來源，但本次若同時處理內容匯入，範圍會擴大到資料清理、格式轉換與內容審校。先完成樣式與路由，可讓後續內容導入有穩定承載介面。

**Capture to**: 後續可用 `$spectra-propose` 將此內容正式轉成 `openspec/changes/<change-id>/proposal.md`。

## Requirement Summary

本專案要製作一個手機端可使用的 PWA 網站，用於中華民國國營事業新進職員職員級資訊人員考試教學講義。樣式與功能可以參考 `C:\Users\Gary\Documents\Spectra-Learning-Japanese` 專案中「子路由-N5文法」的呈現方式，但本次討論結果不讀取該參考專案，僅記錄此參考方向。

## Scope

### In Scope

- 建立 5 個主要路由：
  - 計算機原理
  - 網路概論
  - 資訊管理
  - 程式設計
  - 語言
- 「語言」路由承載共同科目方向，對應國文與英文。
- 本次先做樣式、版面、路由與基本互動，不先處理完整講義內容匯入。
- 建立 CI/CD，確保後續變更可自動驗證與部署。
- 保留以下資料夾作為後續內容參考來源：
  - `@/_private/計算機原理、網路概論/*`
  - `@/_private/資訊管理、程式設計/*`
  - `@/_private/國文、英文/*`

### Out of Scope

- 本次不讀取或整理上述三個資料夾內的各 Markdown 檔。
- 本次不建立考古題匯入器。
- 本次不完成完整講義內容、題庫內容或逐題解析。
- 本次不做後台編輯器。

## Proposed Change

### User-Facing Behavior

- 使用者開啟網站後，可以進入 5 個學習路由。
- 每個路由需呈現一致但可區分科目特性的學習頁樣式。
- 頁面風格參考「子路由-N5文法」的學習頁體驗：適合手機閱讀、章節清楚、操作集中、可作為後續講義內容承載介面。
- 即使內容尚未完整匯入，每個路由也應有可展示的版面狀態，避免空白頁。

### Route Plan

| Route | Purpose |
| ----- | ------- |
| 計算機原理 | 專業科目學習頁，後續承載計算機原理講義與題目 |
| 網路概論 | 專業科目學習頁，後續承載網路概論講義與題目 |
| 資訊管理 | 專業科目學習頁，後續承載資訊管理講義與題目 |
| 程式設計 | 專業科目學習頁，後續承載程式設計講義與題目 |
| 語言 | 共同科目學習頁，後續承載國文與英文內容 |

## CI/CD Expectation

- 需要建立可執行的 CI/CD 流程。
- CI 至少應能驗證安裝、建置與測試流程。
- 若專案已有部署目標，CD 應銜接既有部署方式；若尚未確認部署目標，先建立可擴充的 CI 基礎，並在 proposal 或 design 中記錄部署目標待確認。

## Open Questions

- 「子路由-N5文法」的具體參考重點是版面結構、互動流程、視覺風格，還是三者都要參考？
- CI/CD 的部署目標是 GitHub Pages、Cloudflare Pages、Vercel，或其他平台？
- 5 個路由是否需要使用英文 URL slug，例如 `/computer-principles`、`/networking`、`/information-management`、`/programming`、`/language`？

## Recommended Next Step

使用 `$spectra-propose` 將本討論結論正式轉成 Spectra 變更提案。提案名稱可使用：

`build-exam-pwa-routes-and-cicd`
