# Stage 1 Source Synthesis: 計算機原理、網路概論

## Scope

第一階段來源資料夾：`_private/計算機原理、網路概論/`

本階段依 tasks 要求，為每個來源檔建立至少一個副代理工作項，並為「計算機原理」與「網路概論」建立科目整併工作項。副代理僅讀指定 PDF，未修改檔案，且未讀取受限私人筆記路徑。

## Source File Work Items

| Work item | Source file | Agent | Extraction status | Key output |
| --- | --- | --- | --- | --- |
| stage-1-107-source-agent | `107國營事業新進職員-計算機原理、網路概論.pdf` | `019ea804-f59c-7593-891f-582130193695` | 可抽取 | OS 記憶體/排程、Loader/Compiler、OSI/TCP/IP、安全、IoT、ICS |
| stage-1-108-source-agent | `108國營事業新進職員-計算機原理、網路概論.pdf` | `019ea805-09c3-7f30-b211-fc115f1d3779` | 可抽取 | Cache、Amdahl、排序/搜尋、SQL/NoSQL、子網路、OSPF、SNMP、加密 |
| stage-1-109-source-agent | `109國營事業新進職員-計算機原理 網路概論.pdf` | `019ea805-1e0b-72b0-b9ff-aee010c23135` | 部分可抽取 | OS 行程/記憶體、DMA/中斷、路由表、CIDR、無線、VPN、IDS |
| stage-1-110-source-agent | `110國營事業新進職員-計算機原理、網路概論.pdf` | `019ea805-3218-77f0-ac28-6838cf26f922` | 部分可抽取 | 補數/Hamming、匯流排、RAID/SAN、IPv4/IPv6、TCP/IPsec、VLAN |
| stage-1-111-source-agent | `111國營事業新進職員-計算機原理、網路概論.pdf` | `019ea805-4664-75c2-8ef8-6cb6e619964f` | 可抽取 | C/Java/Python、Stack、RISC、CIDR、SDN、WPAN、TLS、STRIDE、IDPS |
| stage-1-112-source-agent | `112國營事業新進職員(資訊)-計算機原理、網路概論.pdf` | `019ea805-5a81-7212-8684-f7bf5b33f57f` | 可抽取但需校對 | Cache replacement、Amdahl、Heap、AI/NLP、OWASP、SSL/TLS、IDS、弱掃/滲透 |
| stage-1-113-source-agent | `113國營事業新進職員(資訊)計算機原理、網路概論.pdf` | `019ea80b-e2d8-7422-a85b-93cb28aa8221` | 可抽取但需校對 | CISC/Pipeline、paging、linked list、HTTP/HTTPS、SYN flood、XSS、SSH、CIDR |
| stage-1-114-source-agent | `114年度新進職員甄試試題科目A_資訊_計算機原理網路概論.pdf` | `019ea80b-f70d-7f62-9b44-829a60357075` | 可抽取 | 補數、Von Neumann、AVL/紅黑樹、ACID、CSMA/CD、DNS、WAF、MFA |

## Consolidation: 計算機原理

整併後高頻主軸：

- 資料表示與位元運算：進位、補數、BCD、同位元、CRC、Hamming Code、布林代數。
- 計算機組織與效能：CPU、時脈、指令時間、匯流排、位址線、Cache、CISC/RISC、Pipeline、SMP、Amdahl’s Law。
- 作業系統與儲存：行程狀態、排程、deadlock、分頁、thrashing、system call、RAID、SAN、磁碟排程。
- 資料結構與演算法：排序、搜尋、二元樹、Stack、linked list、Hash、Heap、AVL、紅黑樹、時間複雜度。
- 程式語言與資料系統：C/Java/Python、OOP、參數傳遞、遞迴、Compiler、SQL、正規化、NoSQL、ERP、AI/ML、IoT、雲端。

已反映到 `src/modules/exam/data/subjectContent.ts` 的 `computer-principles`：

- `highFrequencyPoints`: `computer-data-representation`, `computer-os-memory`, `computer-architecture-performance`, `computer-algorithms-structures`, `computer-database-ai-media`
- `lectureSections`: `computer-representation-lecture`, `computer-system-lecture`, `computer-performance-storage-lecture`, `computer-algorithm-programming-lecture`
- `questionMappings`: 包含資料表示、效能儲存、演算法程式追蹤三類題目對照

## Consolidation: 網路概論

整併後高頻主軸：

- 分層與協定：OSI/TCP-IP、ARP、ICMP、TCP/UDP、DHCP、DNS、SMTP、FTP、LDAP、SNMP、OSPF、BGP。
- IP 與路由：IPv4/IPv6、CIDR、子網路遮罩、routing table、longest-prefix matching、traceroute、PMTUD。
- 乙太、無線與 IoT：CSMA/CD、CSMA/CA、Wi-Fi、WPAN、ZigBee、Bluetooth、SDN、IoT 分層。
- 資安與身分：SSL/TLS、VPN、IPsec、數位簽章、IDS/IDPS、OWASP、STRIDE、WAF、MFA、Session Hijacking、XSS、SQL Injection、SYN flood。

已反映到 `src/modules/exam/data/subjectContent.ts` 的 `networking`：

- `highFrequencyPoints`: `network-layering`, `network-addressing`, `network-protocol-services`, `network-security-wireless`
- `lectureSections`: `network-layer-lecture`, `network-security-lecture`, `network-address-routing-lecture`, `network-security-wireless-lecture`
- `questionMappings`: 包含分層、CIDR/路由、資安功能辨識三類題目對照

## Review Notes

- 所有副代理都回報題號、選項或答案符號需要人工校對；因此目前前端資料以 `verificationStatus: needs-review` 呈現來源追蹤與學習內容，不把抽取結果當作正式答案鍵。
- 113、114 年可辨識近年 Web 資安與身分管理題型，已納入網路概論資安章節。
- 107–112 年反覆出現 OS/記憶體、資料結構、OSI/IP/TCP/資安，已納入高頻考點。

## Content Review

- 計算機原理定義審查：資料表示、補數、Cache、RAID、排程、分頁、資料結構與演算法章節皆以副代理回報的年度考點作為來源，未把未校對答案鍵寫成正式題庫。
- 計算機原理解題邏輯審查：效能題先整理單位與公式，OS 題先辨識資源與排程規則，程式/演算法題先分類資料結構再逐步追蹤狀態。
- 網路概論定義審查：OSI/TCP-IP、IP/CIDR、路由、協定、資安、無線與 IoT 章節以功能與層級區分，避免只背英文縮寫。
- 網路概論解題邏輯審查：CIDR 題先切網段，協定題先定位功能與層級，資安題先分辨機密性、完整性、認證、不可否認性、Web 防護與偵測。
- 干擾選項審查：前端資料中的題目對照以跨科錯配作為干擾項，例如把 OSI、ERP、國文主旨或補數放在不相干題型中，能明確區分觀念邊界。
