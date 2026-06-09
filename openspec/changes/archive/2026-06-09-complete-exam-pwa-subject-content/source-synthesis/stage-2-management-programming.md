# Stage 2 Source Synthesis: 資訊管理、程式設計

## Scope

第二階段來源資料夾：`_private/資訊管理、程式設計/`

本階段依 tasks 要求，在第一階段完成後處理資訊管理與程式設計來源。每個來源檔建立至少一個副代理工作項，並為「資訊管理」與「程式設計」建立科目整併工作項。副代理僅讀指定 PDF，未修改檔案，且未讀取受限私人筆記路徑。

## Source File Work Items

| Work item | Source file | Agent | Extraction status | Key output |
| --- | --- | --- | --- | --- |
| stage-2-107-source-agent | `107國營事業新進職員-資訊管理.程式設計.pdf` | `019ea813-3890-7451-8de0-5839cf77e2de` | 可抽取 | 大數據、BI、NoSQL、資安政策、Session/Cookie、GET/POST、身分證檢核、regex、環狀佇列 |
| stage-2-108-source-agent | `108國營事業新進職員-資訊管理、程式設計.pdf` | `019ea813-4ce8-71c1-b0c4-c45fe1f03f59` | 可抽取 | SQL、3NF、SQL Injection、CIA、Overfitting、OOP、Deadlock、Git、BST、變數生命週期 |
| stage-2-109-source-agent | `109國營事業新進職員-資訊管理、程式設計.pdf` | `019ea813-6127-7fb3-a085-5c6cb638f648` | 可抽取 | 正規化、反正規化、PaaS、Push、Blockchain、APT、OOP、二元樹交換、最大 pairwise product |
| stage-2-110-source-agent | `110國營事業新進職員-資訊管理、程式設計.pdf` | `019ea813-756b-7272-a473-4f28c435458b` | 可抽取 | 資訊系統安全、SQL、SQL Injection、IoT、雲端、資訊倫理、GCD、Queue、lock/unlock |
| stage-2-111-source-agent | `111國營事業新進職員-資訊管理、程式設計.pdf` | `019ea813-8986-7942-b0dd-c959daa6d1a8` | 可抽取 | SQL、監督/非監督學習、分群、PCA、SSDLC、Fibonacci、資料檢核、Quick Sort |
| stage-2-112-source-agent | `112國營事業新進職員-資訊管理、程式設計.pdf` | `019ea813-9d9d-74b2-9401-b8c9b51faf87` | 可抽取 | SQL、數位轉型、雲端服務、資安治理、C gets buffer overflow、Stack、Python/SQLite ETL |
| stage-2-113-source-agent | `113國營事業新進職員-資訊管理、程式設計.pdf` | `019ea81a-e5df-7c40-bf46-3a685de29f48` | OCR 可抽取但需校對 | DDL、PK/FK、JOIN/GROUP BY、關聯除法、B+ tree、ISO 27001 ISMS、UML、二元樹、AVL、Insertion Sort、質數平方 |
| stage-2-114-source-agent | `114國營事業新進職員-資訊管理、程式設計.pdf` | `019ea81a-fa35-7d21-9fde-b4f8fe8f9789` | 可抽取但需校對 | traceroute、TTL/ICMP、BGP/ECMP/NAT/MPLS/QoS、DoH/DoT/DNSSEC、IPv4/IPv6、SQL Injection/XSS/CSRF、Happy Number、Java GC/OOP |

## Consolidation: 資訊管理

整併後高頻主軸：

- 資訊系統與組織流程：TPS/MIS/DSS/BI、ERP/CRM/SCM、數位轉型、雲端服務模式與企業流程整合。
- 資料庫與資料治理：SQL、DDL、主鍵/外鍵、JOIN、GROUP BY、正規化、反正規化、NoSQL、資料倉儲、KPI、知識管理。
- 資料庫效能與全稱條件：B+ tree、clustered index、硬碟頁 I/O、關聯除法與「全部符合」SQL 寫法。
- 資安治理與風險：CIA、ISMS、ISO/IEC 27001、PDCA、SSDLC、APT、SQL Injection、XSS、CSRF、營運持續與稽核。
- 網路與安全治理延伸：traceroute、TTL/ICMP、BGP/ECMP/NAT/MPLS/QoS、DoH/DoT/DNSSEC、IPv4/IPv6。
- 系統分析圖形化表達：UML Use Case、Class、Sequence、Communication 圖。

已反映到 `src/modules/exam/data/subjectContent.ts` 的 `information-management`：

- `highFrequencyPoints`: `management-information-systems`, `management-project-security`, `management-data-governance`, `management-security-risk`, `management-cloud-transformation`, `management-network-dns`, `management-uml-analysis`
- `lectureSections`: `management-systems-lecture`, `management-governance-lecture`, `management-data-decision-lecture`, `management-cloud-ml-lecture`, `management-sql-index-lecture`, `management-network-security-lecture`, `management-uml-lecture`
- `questionMappings`: 包含 ERP/流程、營運持續、正規化、ISMS/PDCA、DNS 安全與 UML 圖種辨識題目對照

## Consolidation: 程式設計

整併後高頻主軸：

- 流程控制與程式追蹤：迴圈、條件、遞迴、Fibonacci、GCD、快樂數與循環偵測。
- 資料結構與演算法：Stack、Queue、環狀佇列、BST、二元樹重建、AVL、排序、搜尋、Quick Sort、Insertion Sort。
- 語言語意與物件導向：C 指標/陣列/安全輸入、Java primitive/reference、stack/heap、GC、封裝、繼承、多型、Python 資料處理。
- 複雜度與數論：最大 pairwise product、低時間複雜度設計、質數平方與三因數判斷。
- 安全與資料處理：regex、輸入驗證、buffer overflow、參數化查詢、ORM、輸出編碼、CSP、Anti-CSRF、SameSite、HttpOnly、SQLite ETL。

已反映到 `src/modules/exam/data/subjectContent.ts` 的 `programming`：

- `highFrequencyPoints`: `programming-control-flow`, `programming-data-structures`, `programming-language-semantics`, `programming-complexity-design`, `programming-security-data-processing`, `programming-java-web-security`
- `lectureSections`: `programming-trace-lecture`, `programming-structure-lecture`, `programming-language-lecture`, `programming-security-data-lecture`, `programming-tree-sort-lecture`, `programming-java-security-lecture`
- `questionMappings`: 包含流程追蹤、資料結構、C 安全輸入、AVL/Insertion Sort、Happy Number/Java GC 與 Web 安全防禦題目對照

## Review Notes

- 113 年來源以 OCR 產出，英數、SQL、程式碼與樹圖需人工校對；因此目前只作為學習內容與考點對照，不建立正式測驗答案鍵。
- 114 年 PDF 可還原文字，但第 4 題程式碼本體未完整出現在文字層，且第 9 頁需確認是否空白；目前只納入可辨識的演算法、Java 與 Web 安全主題。
- 所有前端題目對照維持 `verificationStatus: needs-review` 與 `kind: topic-mapping`，不把未校對來源當作正式題庫。

## Content Review

- 資訊管理定義審查：資料庫、資料治理、雲端、資安治理、網路診斷、DNS 安全與 UML 皆以年度來源副代理回報為依據，並保留來源檔與校對狀態。
- 資訊管理解題邏輯審查：SQL 題先分資料定義、連接彙總、正規化與全稱條件；治理題先分控制目標；網路安全題先分傳輸加密、真實性、完整性與隱私。
- 程式設計定義審查：流程控制、資料結構、排序、樹、Java 記憶體、C 安全輸入、Python/SQLite 與 Web 安全均以可抽取考點整併，不使用待校對答案鍵。
- 程式設計解題邏輯審查：程式追蹤先列狀態表，樹與排序先確認操作規則，Java 題先分 primitive/reference 與 GC 條件，Web 安全題先把攻擊原理對應防禦。
- 四選項欄位審查：新增與既有題目對照都維持 4 個選項、1 個正解、4 份選項辨析、考點標籤與來源資訊，並以跨科錯配或相近防禦概念作為干擾項以區分觀念。
