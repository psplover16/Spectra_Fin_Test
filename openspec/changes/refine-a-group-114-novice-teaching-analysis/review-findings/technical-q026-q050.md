# Technical review: 114-Q026 to Q050

## Summary

- 已依 Implementation Contract、變更規格、`114.ts`、`114ReviewedAnalyses.ts` 與 Q026-Q050 draft packets 核對題目定義、公式、計算、答案唯一性、疑義狀態與 `answerNote` 保留情形。
- Q026-Q042、Q044-Q048、Q050 的公式、定義、選項排除與答案唯一性未發現技術阻斷問題。
- Q029 的 ARP suppression/offload `answerNote` 已保留；Q034 與 Q049 仍維持 `needs-review` 並保留疑義說明。
- Blocking finding：Q043 已保留 5G 覆蓋限制 `answerNote`，但 `answerVerification` 目前為 `verified`；draft packet 的 Technical Reviewer 對 Q043 判定為 `needs-review`，因此目前狀態不符合「疑義題不要硬改成 verified」的檢查重點。

## Per-question findings Q026-Q050

Q026 - pass: 16-QAM 與 QPSK 在相同 baud 下以 `bits per symbol = log2(M)` 比較，`log2(16)=4`、`log2(4)=2`，比例 2 倍正確；表格列數與欄數一致。

Q027 - pass: 四個 `/21` 網段在第三個 octet 以 8 為步進，96-127 剛好合併為 32 大小區塊，即 `57.6.96.0/19`；排除 `/18`、`/17`、`/16` 的理由正確。

Q028 - pass: TCP flow control 被正確定位為保護接收端緩衝區與處理能力，並和 congestion control、RTT 上升、擁塞崩潰區分清楚。

Q029 - pass: `answerNote` 已保留；STP BPDU 屬於交換器生成樹控制訊息，不是 Wi-Fi 睡眠/喚醒省電流程。C 以 ARP suppression/offload 減少喚醒需求的解讀合理且已有 note 說明。

Q030 - pass: MTU 1500B 扣 20B IP header 得每片 payload 1480B，2300B payload 拆為 1480B 與 820B 共 2 片；非最後片 1480B 可被 8 整除，計算正確。

Q031 - pass: DF=1 且封包大於 Path MTU 時，路由器不能分片，需回 ICMP Fragmentation Needed；和 ICMP Time Exceeded、TCP RST、ARP 的區分正確。

Q032 - pass: ping 被定位為測可達性與 RTT，traceroute 被定位為利用 TTL 推估沿途節點；也正確避免把 traceroute 簡化成固定 UDP/TCP。

Q033 - pass: 傳統共享式半雙工 Ethernet 的 CSMA/CD 碰撞後機制為 binary exponential backoff；Token passing、TDMA、RTS/CTS 的排除理由正確。

Q034 - needs-review: 目前 `answerVerification: 'needs-review'` 與 `answerNote` 均已保留。B 是 full-duplex switch 情境下最直接答案，但 C「只在半雙工會」具一般正確性，答案唯一性仍需人工確認；目前狀態正確保留疑義。

Q035 - pass: Hidden node 情境、RTS/CTS 預約媒介、ACK 確認資料收到，以及 Wi-Fi 使用 CSMA/CA 而非 CSMA/CD 的說明正確。

Q036 - pass: HTTP stateless 與 Cookies/session id 的關係正確；ARP Cache、NAT、STP 被正確排除為底層網路或交換機制。

Q037 - pass: DNS iterative query 被正確解釋為查詢端逐層詢問並取得 referral；recursive query、authoritative answer 與 TCP 53 的干擾選項排除合理。

Q038 - pass: Open Resolver 的 DDoS amplification、資訊洩漏與內部名稱探測風險說明正確；HTTPS MITM 不會因 Open Resolver 自動成功，TLS 憑證驗證前提說明合理。

Q039 - pass: Blackholing/Sinkholing 被正確定位為導流、丟棄或收容分析惡意流量；加密、零信任、MFA 不直接處理 DDoS 大量流量。

Q040 - pass: Round Robin 與 Weighted Round Robin 的核心差異為是否考量伺服器權重；SSL 終結、L7 規則、健康檢查屬產品功能或輔助能力，排除合理。

Q041 - pass: Session Stickiness/session affinity 用於避免使用者會話在多後端間漂移；HSTS、HPKP、OCSP Stapling 被正確歸為 HTTPS/憑證相關機制。

Q042 - pass: Prepared Statements 的關鍵是 SQL 結構與資料值分離、參數化；16 進位、Base64、Try/Catch 不能取代參數化查詢。

Q043 - needs-review: 解析內容正確區分 5G 核心特性與高頻部署覆蓋限制，且 `answerNote` 已保留；但 `114ReviewedAnalyses.ts` 目前將 Q043 標為 `answerVerification: 'verified'`，與 draft packet 中 Technical Reviewer 的 `needs-review` 結論不一致。因選項「覆蓋率下降」涉及高頻部署限制，建議在人工確認前保留 `needs-review`。

Q044 - pass: IAM 被正確定義為身分與存取管理大範圍，RBAC 是其中一種 authorization 模型；包含關係判斷正確。

Q045 - pass: Two-Step Verification 提升 authentication strength 並有助於保護 confidentiality 的說明合理；可用性、完整性、不可否認性排除正確。

Q046 - pass: IDPS 對未知攻擊一般以 anomaly detection 較適合的說明正確，並有補充 false positive 限制；signature 與 stateful protocol analysis 的排除合理。

Q047 - pass: Session Hijacking 的核心被正確連到 session token/cookie；MITM、Sniffing、XSS 可取得或濫用會話資訊，UDP 檔案傳輸不是典型手段。

Q048 - pass: WAF 與封包過濾式防火牆的差異被正確定位在應用層 HTTP 內容/命令檢查；第 2 層、代理部署、SSL 支援與否的干擾選項排除合理。

Q049 - needs-review: 目前 `answerVerification: 'needs-review'` 與 `answerNote` 均已保留。傳統 MFA 三因素下答案 C 成立，但現代風險式驗證可能將位置視為輔助訊號；目前狀態正確保留疑義。

Q050 - pass: UDP 被正確歸為傳輸層；ICMP、IGMP、OSPF 作為網路層相關控制或路由協定的分類合理，非屬題答案 D 唯一。

## Blocking findings

- Q043：`answerVerification` 目前為 `verified`，但 draft packet 的 Technical Reviewer 對 Q043 判定為 `needs-review`，理由是「覆蓋率下降」雖不是 5G 核心特性，卻可能對應高頻段部署限制。`answerNote` 雖已保留，但疑義狀態未保留，建議視為阻斷項。

## Suggested fixes

- 將 Q043 的 `answerVerification` 改回 `needs-review`，並保留現有 `answerNote`；除非後續人工確認教材只採「5G 常見核心特性」分類且可接受 `verified`。
- 其餘 Q026-Q050 未發現需要修改答案、公式、定義或 `answerNote` 的技術修正。

## Verification notes

- 已讀取並核對：`design.md` 的 Implementation Contract、變更 spec、`114.ts`、`114ReviewedAnalyses.ts`、draft packets `q021-q028.md`、`q029-q036.md`、`q037-q044.md`、`q045-q050.md`。
- 已比對 Q026-Q050 的 raw 題幹、選項、官方答案與 reviewed analysis 的 `answerVerification`、`answerNote`、公式/流程/選項解釋。
- 已特別確認 Q029 `answerNote` 保留、Q034 `needs-review` 保留、Q043 5G 覆蓋限制 note 保留但狀態疑義、Q049 `needs-review` 保留。
- 未執行 npm、Vitest、build 或 Spectra 指令；本次任務是靜態技術審查並產出 report，未修改程式碼、測試或 `tasks.md`，也未標記 Spectra task。
