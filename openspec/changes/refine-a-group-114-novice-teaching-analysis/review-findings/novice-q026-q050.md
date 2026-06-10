# Novice Review Report: 114-Q026 to Q050

## Summary

本次以非資工新手可讀性檢查 114-Q026 至 Q050 的 reviewed analysis，對照 Implementation Contract、a-group-question-analysis spec、`114ReviewedAnalyses.ts`，並在必要處對照 `114.ts` 的原始題幹與選項。

整體結論：Q026-Q050 多數已符合新手教學 rubric，能先補必要名詞、問題目的與判斷規則，再把規則套回題幹或選項。`optionExplanations` 大多能指出干擾選項錯在什麼觀念或條件；`keyTakeaways` 也多半保留可複用規則與常見陷阱。表格使用集中在公式比較、CIDR 範圍、機制比較、分類或分層題，對新手理解有幫助，未見明顯只是增加閱讀負擔的表格。

本輪只做審查報告，未修改分析內容，因此沒有標示 `fixed` 的題目。需要後續人工確認的是 Q034 與 Q049，原因是題目或分類模型本身存在語意重疊或教材範圍差異，並非目前解析缺少新手教學步驟。

## Per-question findings Q026-Q050

Q026 - pass: 先區分 baud rate 與 bit rate，再給出 `bits per symbol = log2(M)` 的公式來源與套用方式；solvingSteps 雖短但逐步計算 16-QAM 與 QPSK 的 bit 數，表格也能幫助新手避免把 16/4 誤算成 4 倍。

Q027 - pass: CIDR、prefix 與路由聚合目的有先說明，solvingSteps 逐步計算 `/21` 步進、四段總大小與 `/19` 邊界；各干擾選項也清楚指出涵蓋過大或表示不標準。

Q028 - pass: 能先把 TCP flow control 與 congestion control 分開，並說明 receiver window 與接收端緩衝區的關係；選項 A/C 的壅塞與 RTT 陷阱有被明確拆開。

Q029 - pass: Wi-Fi 省電流程、Beacon/TIM、PS-Poll、TWT 與 ARP suppression 的用途都有先鋪陳；STP BPDU 被排除的理由對新手足夠清楚，沒有只靠答案標籤。

Q030 - pass: MTU、IP header、payload 與 8-byte boundary 都有先定義，計算步驟能從 2300B payload 推到 1480B 與 820B 兩片；干擾選項以單片負載上限排除，適合新手閱讀。

Q031 - pass: PMTUD、DF bit、Path MTU 與 ICMP Fragmentation Needed 的角色說明完整；solvingSteps 能把 DF=1 與路徑 MTU 不足接回「不能分片、只能丟棄並回報」的規則。

Q032 - pass: ping 與 traceroute 的目的、ICMP Echo、TTL 與 Time Exceeded 先講清楚，再逐一排除選項；對「traceroute 不一定只用 UDP」的邊界提醒有助於新手避免過度簡化。

Q033 - pass: CSMA/CD 的共享式半雙工情境、collision 與 binary exponential backoff 都先建立，再排除 Token passing、TDMA、RTS/CTS；常見混淆邊界足夠。

Q034 - needs-review: 教學內容本身清楚說明 full-duplex switch、collision domain 與 half-duplex 條件，也誠實保留 B/C 語意重疊疑義。對非資工新手而言，這題適合閱讀但仍需要人工確認題目選項設計，否則新手可能不知為何 B 比 C 更直接。

Q035 - pass: hidden node、RTS、CTS、ACK、NAV 與 CSMA/CA 的流程有先鋪底，solvingSteps 能把「彼此聽不到但都到 AP」接到 RTS/CTS 預約媒介；各干擾選項理由明確。

Q036 - pass: HTTP stateless 與 Cookie/session id 的問題目的講得清楚，並能把 ARP、NAT、STP 排除為底層網路機制；新手可看出狀態管理與位址/交換機制的界線。

Q037 - pass: DNS 階層、iterative query、referral、recursive query 與 authoritative answer 的差異完整；選項 C 也有提醒 TCP/UDP 53 不是 iterative 的定義。

Q038 - pass: Open Resolver、recursive resolver 與 DNS amplification 先講，再說 HTTPS certificate validation 為另一層防線；能避免新手把 DNS 解析風險誤解成 TLS 驗證自動失效。

Q039 - pass: DDoS、blackholing、sinkholing 與 traffic diversion 的目的清楚，並把加密、零信任、MFA 與 DDoS 流量處置分開；干擾選項解釋足夠。

Q040 - pass: Round Robin 與 Weighted Round Robin 的差異以分派演算法與 weight 說明，並排除 SSL 終結、L7 規則、健康檢查等產品功能；符合新手比較題需求。

Q041 - pass: stateful backend、session affinity 與 sticky session 的問題目的完整，並能說明 HSTS、HPKP、OCSP Stapling 都是 TLS/憑證相關機制，不是分派策略。

Q042 - pass: SQL Injection 的成因、Prepared Statements 與 code/data separation 的規則來源清楚；對 16 進位、Base64、Try/Catch 的錯誤安全感有具體說明。

Q043 - pass: 先把 5G 常見能力分成 eMBB、URLLC、mMTC、spectral efficiency，再區分「覆蓋率下降」是部署挑戰而非核心特性；answerNote 的邊界說明對新手有幫助。

Q044 - pass: IAM、authentication、authorization、RBAC 與 role 的包含關係清楚，solvingSteps 逐一檢查集合方向；干擾選項能指出方向顛倒、無關與等同的錯誤。

Q045 - pass: 兩步驟驗證的 second factor 與 authentication strength 先說明，再連到 confidentiality；也清楚排除可用性、完整性與不可否認性，適合新手分辨 CIA 與認證概念。

Q046 - pass: Signature、Anomaly、baseline、false positive 與 Stateful Protocol Analysis 的比較完整；表格能降低分類負擔，且有提醒未知攻擊題目為何偏向 anomaly detection。

Q047 - pass: Session Hijacking、session token、cookie、MITM、Sniffing、XSS 的關係先講清楚，再排除 UDP 檔案傳輸；選項解釋能回到「是否取得或濫用 session」。

Q048 - pass: WAF 與 packet-filtering firewall 的觀察層級、HTTP 內容、SQLi/XSS 防護目標說明完整；比較表有助於新手分辨 IP/port/protocol 與應用層內容。

Q049 - needs-review: 解析已清楚區分傳統 MFA 三因素與現代 risk-based authentication 的 location 風險訊號，表格也有幫助；但因教材若採不同模型可能導致 C 的判斷不唯一，建議維持人工審查，不宜把它當成無疑義題。

Q050 - pass: Internet layer 與 transport layer 先分層，再說明 ICMP、IGMP、OSPF 與 UDP 的功能；表格能幫新手把「網路通訊協定」和「TCP/IP 網路層」分開。

## Blocking findings

無。Q034 與 Q049 需要人工確認的是題目/答案模型邊界，不是目前解析缺少新手教學深度、逐步推理或干擾選項說明。

## Suggested fixes

- Q034: 若後續要讓新手更不困惑，可在題目層或 answerNote 補一句「本題為單選題時，B 是直接回答 full-duplex switch 情境；C 是一般規則描述，因此與 B 有語意重疊但非官方最佳選項」。
- Q049: 建議維持 `needs-review`，或在教材口徑確定後明確標示「本題採傳統 MFA 三因素模型，不採 risk-based/context signal 分類」。

## Verification notes

- 已讀取 `openspec/changes/refine-a-group-114-novice-teaching-analysis/design.md` 的 Implementation Contract。
- 已讀取 `openspec/changes/refine-a-group-114-novice-teaching-analysis/specs/a-group-question-analysis/spec.md`。
- 已檢查 `src/modules/examGroups/aGroup/data/years/114ReviewedAnalyses.ts` 中 Q026-Q050 的 `beginnerExplanation`、`solvingSteps`、`optionExplanations`、`keyTakeaways` 與必要 `teachingTables`。
- 已對照 `src/modules/examGroups/aGroup/data/years/114.ts` 中 Q026-Q050 的題幹、選項與官方答案。
- 未執行自動化測試；本任務是人工 novice review report，且指示要求不要修改程式碼、測試或 Spectra tasks。
