import { reviewedQuestionAnalyses } from '@/modules/examGroups/aGroup/data/years/110ReviewedAnalyses';
import { createAGroupYearQuestions, type RawAGroupQuestion } from '@/modules/examGroups/aGroup/data/years/yearQuestionFactory';

const rawQuestions: RawAGroupQuestion[] = [
  {
    number: 1,
    answers: ["B"],
    pageNumber: 1,
    topic: "待人工審查考點",
    stem: "二進位數A取其1's補數後，於左側添加其「奇同位元檢查碼」成為9個位元的B；二進位數C 取其2's補數後，於左側添加其「偶同位元檢查碼」成為9個位元的D。最後B與D計算其漢明 距離(Hamming Distance)為E。假設A=(01100111)2，C=(10110110)2，則E為多少？",
    options: {
      A: "4",
      B: "5",
      C: "6",
      D: "7"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 2,
    answers: ["C"],
    pageNumber: 1,
    topic: "待人工審查考點",
    stem: "下列有關CPU的敘述，何者有誤？",
    options: {
      A: "CPU的執行動作含擷取、解碼、執行與儲存",
      B: "CPU指令週期動作含擷取週期與執行週期",
      C: "CPU指令週期=時脈頻率的倒數",
      D: "CPU內頻=外頻×倍頻係數"
    },
    tags: ["computer-principles", "operating-system"],
    extractionStatus: "verified"
  },
  {
    number: 3,
    answers: ["A"],
    pageNumber: 1,
    topic: "待人工審查考點",
    stem: "下列有關CPU匯流排的敘述，何者有誤？",
    options: {
      A: "一般所謂N位元微處理機(Microprocessor)，指其控制匯流排有N條排線",
      B: "位址匯流排有N條排線時，則最大可定址到2N個記憶體位址",
      C: "位址、控制與資料匯流排的傳輸方向，分別為單向、單向與雙向",
      D: "匯流排頻寬=頻率×匯流排寬度"
    },
    tags: ["computer-principles", "operating-system"],
    extractionStatus: "verified"
  },
  {
    number: 4,
    answers: ["B"],
    pageNumber: 1,
    topic: "下列有關IEEE 1394連接埠的敘",
    stem: "下列有關IEEE 1394連接埠的敘述，何者有誤？",
    options: {
      A: "又稱為火線埠",
      B: "為高速並列匯流排介面",
      C: "具備熱插拔功能",
      D: "適用於消費性電子產品"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 5,
    answers: ["D"],
    pageNumber: 1,
    topic: "下列記憶體中何者的pin腳數最少？",
    stem: "下列記憶體中何者的pin腳數最少？",
    options: {
      A: "DDR SDRAM",
      B: "DDR2 SDRAM",
      C: "DRDRAM",
      D: "SDRAM"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 6,
    answers: ["C"],
    pageNumber: 1,
    topic: "下列硬碟陣列中，何者之「至少所需的硬",
    stem: "下列硬碟陣列中，何者之「至少所需的硬碟數」為最多？",
    options: {
      A: "RAID 0",
      B: "RAID 1",
      C: "RAID 0+1",
      D: "RAID 5"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 7,
    answers: ["C"],
    pageNumber: 1,
    topic: "下列何者為VCD影音光碟格式之光碟片",
    stem: "下列何者為VCD影音光碟格式之光碟片標準規格書？",
    options: {
      A: "紅皮書",
      B: "黃皮書",
      C: "白皮書",
      D: "綠皮書"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 8,
    answers: ["D"],
    pageNumber: 1,
    topic: "下列何者屬「搶奪式」(Preempt",
    stem: "下列何者屬「搶奪式」(Preemptive)工作排程？",
    options: {
      A: "FCFS",
      B: "PS",
      C: "SJF",
      D: "SRTF"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 9,
    answers: ["C"],
    pageNumber: 1,
    topic: "代數函數X= A̅ B̅ +AB為下",
    stem: "代數函數X= A̅ B̅ +AB為下列何種邏輯閘(Gate)？",
    options: {
      A: "NAND",
      B: "NOR",
      C: "XNOR",
      D: "XOR"
    },
    tags: ["computer-principles"],
    extractionStatus: "needs-review"
  },
  {
    number: 10,
    answers: ["B"],
    pageNumber: 2,
    topic: "介面AGP、IDE、IEEE 139",
    stem: "介面AGP、IDE、IEEE 1394、PCI、PS/2、SATA、SCSI中，有幾種為一般的硬碟傳輸介面？",
    options: {
      A: "2",
      B: "3",
      C: "4",
      D: "5"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 11,
    answers: ["A"],
    pageNumber: 2,
    topic: "下列何者為布林函數ABC+A̅BC+",
    stem: "下列何者為布林函數ABC+A̅BC+ABC̅ + A̅BC̅ + B̅簡化之結果？",
    options: {
      A: "1",
      B: "A̅C+B",
      C: "B",
      D: "C"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 12,
    answers: ["B"],
    pageNumber: 2,
    topic: "下列有關色彩模式的敘述，何者有誤？",
    stem: "下列有關色彩模式的敘述，何者有誤？",
    options: {
      A: "灰階模式為不同層次深淺的灰色變化",
      B: "CMYK模式係指4種印刷油墨的顏色，分別為青色、洋紅色、黃色與藍色",
      C: "HSB模式係指色相、飽和度與亮度",
      D: "RGB模式係指光的三原色，分別為紅色、綠色與藍色"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 13,
    answers: ["C"],
    pageNumber: 2,
    topic: "圖檔格式BMP、JPEG、PCX、P",
    stem: "圖檔格式BMP、JPEG、PCX、PNG與TIF中，有幾種為「非破壞性壓縮模式」？",
    options: {
      A: "1",
      B: "2",
      C: "3",
      D: "4"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 14,
    answers: ["A"],
    pageNumber: 2,
    topic: "待人工審查考點",
    stem: "有關作業系統之硬體保護，下列敘述何者有誤？",
    options: {
      A: "I/O保護為將所有I/O指令均納入使用者模式",
      B: "記憶體保護以基底暫存器與限制暫存器來鎖定記憶體之使用範圍",
      C: "CPU保護採限制CPU之使用時間",
      D: "保護的對象為I/O系統、記憶體與CPU"
    },
    tags: ["computer-principles", "operating-system"],
    extractionStatus: "verified"
  },
  {
    number: 15,
    answers: ["D"],
    pageNumber: 2,
    topic: "下列何種儲存架構採用光纖傳輸並建立專",
    stem: "下列何種儲存架構採用光纖傳輸並建立專用區域網路做資料存取？",
    options: {
      A: "DAS",
      B: "Host Attached Storage",
      C: "NAS",
      D: "SAN"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 16,
    answers: ["C"],
    pageNumber: 2,
    topic: "下列行程狀態(Process Sta",
    stem: "下列行程狀態(Process State)的轉換中，何者非屬直接轉換？",
    options: {
      A: "Running轉為Ready",
      B: "Running轉為Waiting",
      C: "Waiting轉為Running",
      D: "Waiting轉為Ready"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 17,
    answers: ["A"],
    pageNumber: 2,
    topic: "下列何者非避免輾轉混亂現象(Thra",
    stem: "下列何者非避免輾轉混亂現象(Thrashing)的方法？",
    options: {
      A: "Global Replacement",
      B: "Local Replacement",
      C: "Page Fault Frequency",
      D: "Working Set Model"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 18,
    answers: ["D"],
    pageNumber: 2,
    topic: "下列何種匯流排架構屬於高速匯流排連接",
    stem: "下列何種匯流排架構屬於高速匯流排連接高速傳輸裝置，低速匯流排連接低速傳輸裝置？",
    options: {
      A: "Daisy Chaining",
      B: "Independent Requesting",
      C: "Pulling",
      D: "Separating"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 19,
    answers: ["C"],
    pageNumber: 2,
    topic: "待人工審查考點",
    stem: "某Hamming Code編碼方式之最小漢明距離為5，則其最大可偵錯與最大自動更正的位元數分 別為多少？",
    options: {
      A: "4與3",
      B: "3與3",
      C: "4與2",
      D: "3與2"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 20,
    answers: ["D"],
    pageNumber: 2,
    topic: "下列何種磁碟排程可能造成餓死(Sta",
    stem: "下列何種磁碟排程可能造成餓死(Starvation)的問題？",
    options: {
      A: "C-Look Scheduling",
      B: "C-Scan Scheduling",
      C: "Scan Scheduling",
      D: "SSTF Scheduling"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 21,
    answers: ["A"],
    pageNumber: 2,
    topic: "待人工審查考點",
    stem: "下列何種硬碟陣列採用漢明偵錯碼(Hamming Codes)並在可能的範圍內自動修補錯誤？",
    options: {
      A: "RAID 2",
      B: "RAID 3",
      C: "RAID 4",
      D: "RAID 5"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 22,
    answers: ["D"],
    pageNumber: 2,
    topic: "有關分散式系統事件執行之先後關係式的",
    stem: "有關分散式系統事件執行之先後關係式的偏序(Partial Order)中，下列何者非其需滿足的條件？",
    options: {
      A: "反對稱律(Anti-Symmetric)",
      B: "反身律(Reflexive)",
      C: "遞移律(Transitive)",
      D: "單一律(Unity)"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 23,
    answers: ["C"],
    pageNumber: 2,
    topic: "分散式系統之時間戳記優先演算法(Ti",
    stem: "分散式系統之時間戳記優先演算法(Timestamp Priority Algorithm)為下列何種死結處理？",
    options: {
      A: "Deadlock Detection",
      B: "Deadlock Distribution",
      C: "Deadlock Prevention",
      D: "Recovery From Deadlock"
    },
    tags: ["computer-principles", "operating-system"],
    extractionStatus: "verified"
  },
  {
    number: 24,
    answers: ["A"],
    pageNumber: 3,
    topic: "下列何者不是雲端運算產業的類層？",
    stem: "下列何者不是雲端運算產業的類層？",
    options: {
      A: "CaaS",
      B: "IaaS",
      C: "PaaS",
      D: "SaaS"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 25,
    answers: ["B"],
    pageNumber: 3,
    topic: "下列何者不是系統呼叫(System",
    stem: "下列何者不是系統呼叫(System Call)之參數傳遞方式？",
    options: {
      A: "By Address",
      B: "By Queue",
      C: "By Register",
      D: "By Stack"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 26,
    answers: ["B"],
    pageNumber: 3,
    topic: "待人工審查考點",
    stem: "下列有關IPv4及IPv6的差異敘述，何者有誤？",
    options: {
      A: "IP位址的長度，IPv4是32位元，IPv6是128位元",
      B: "和IPv4相同，IPv6的IP表頭(Header)中亦有Checksum欄位",
      C: "不同於IPv4，IPv6內建加密機制，具有更好的安全與保密性",
      D: "兩者IP表頭(Header)中，IPv4之欄位Time to Live與IPv6之欄位Hop Limit意義相同"
    },
    tags: ["computer-principles", "networking"],
    extractionStatus: "verified"
  },
  {
    number: 27,
    answers: ["D"],
    pageNumber: 3,
    topic: "待人工審查考點",
    stem: "下列有關IPv6位址表示法，何者有誤？",
    options: {
      A: "2004:1:25A4:886F::1",
      B: "8293:5:9A:918::586D:99BA",
      C: "21DA:00D3:0000:2F3B:02AA:00FF:FE28:9C5A",
      D: "2001:0000:130F::099A::12A"
    },
    tags: ["computer-principles", "networking"],
    extractionStatus: "verified"
  },
  {
    number: 28,
    answers: ["C"],
    pageNumber: 3,
    topic: "HTTP",
    stem: "下列何種傳輸協定在傳輸過程中會將傳輸資料加密保護？",
    options: {
      A: "HTTP",
      B: "FTP",
      C: "SSH",
      D: "SMTP"
    },
    tags: ["computer-principles", "networking"],
    extractionStatus: "verified"
  },
  {
    number: 29,
    answers: ["B"],
    pageNumber: 3,
    topic: "外寄郵件伺服器採用下列何種通訊協定？",
    stem: "外寄郵件伺服器採用下列何種通訊協定？",
    options: {
      A: "SNMP",
      B: "SMTP",
      C: "POP3",
      D: "IMAP"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 30,
    answers: ["D"],
    pageNumber: 3,
    topic: "待人工審查考點",
    stem: "下列有關路由器(router)的敘述，何者有誤？",
    options: {
      A: "負責轉寄不同網段之間的封包",
      B: "routing路徑可手動建立或採動態方式決定",
      C: "屬於TCP/IP協定的網路層",
      D: "不可連接內部網路(LAN)和外部網路(WAN)"
    },
    tags: ["computer-principles", "networking"],
    extractionStatus: "verified"
  },
  {
    number: 31,
    answers: ["A"],
    pageNumber: 3,
    topic: "待人工審查考點",
    stem: "路由器透過「動態路由設定」建立路由表，下列何者並非路由(routing)協定？",
    options: {
      A: "PPTP(Point to Point Tunneling Protocol)",
      B: "BGP(Border Gateway Protocol)",
      C: "OSPF(Open Shortest Path First)",
      D: "RIP(Routing Information Protocol)"
    },
    tags: ["computer-principles", "networking"],
    extractionStatus: "verified"
  },
  {
    number: 32,
    answers: ["D"],
    pageNumber: 3,
    topic: "待人工審查考點",
    stem: "下列有關TCP通訊協定之敘述，何者有誤？",
    options: {
      A: "在傳送資料前須先建立連線",
      B: "當發送端未收到確認(ACK)封包將重送封包",
      C: "使用滑動窗口(Sliding Window)進行流量管控",
      D: "採用三次交握(Three Way Handshake)機制中斷連線"
    },
    tags: ["computer-principles", "networking"],
    extractionStatus: "verified"
  },
  {
    number: 33,
    answers: ["B"],
    pageNumber: 3,
    topic: "待人工審查考點",
    stem: "下列何種通訊協定為可動態設定IP組態(含IP位址、子網路遮罩、預設閘道及DNS等)？",
    options: {
      A: "SNMP",
      B: "DHCP",
      C: "ARP",
      D: "SMTP"
    },
    tags: ["computer-principles", "networking"],
    extractionStatus: "verified"
  },
  {
    number: 34,
    answers: ["C"],
    pageNumber: 3,
    topic: "待人工審查考點",
    stem: "IPv4的網路中，有一主機之IP位址為149.84.63.17，子網路遮罩為255.255.224.0，下列何者之 IP位址與該主機不在同一子網路中？",
    options: {
      A: "149.84.55.49",
      B: "149.84.39.59",
      C: "149.84.30.62",
      D: "149.84.42.66"
    },
    tags: ["computer-principles", "networking"],
    extractionStatus: "verified"
  },
  {
    number: 35,
    answers: ["A"],
    pageNumber: 3,
    topic: "待人工審查考點",
    stem: "IPsec網路協定運作於DoD(TCP/IP)網路四層模型中的哪一層？",
    options: {
      A: "網路層(Network Layer)",
      B: "應用層(Application Layer)",
      C: "實體層(Physical Layer)",
      D: "傳輸層(Transport Layer)"
    },
    tags: ["computer-principles", "networking"],
    extractionStatus: "verified"
  },
  {
    number: 36,
    answers: ["D"],
    pageNumber: 3,
    topic: "待人工審查考點",
    stem: "ICMP網路協定運作於DoD(TCP/IP)網路四層模型中的網路層，其功能為何？",
    options: {
      A: "通知路由器有關路徑改變的訊息",
      B: "將IP位址轉換成MAC位址",
      C: "確認IP封包成功遞送",
      D: "提供IP封包傳送的過程資訊"
    },
    tags: ["computer-principles", "networking"],
    extractionStatus: "verified"
  },
  {
    number: 37,
    answers: ["A", "B", "C", "D"],
    pageNumber: 3,
    topic: "Wifi無線網路需採用傳輸加密技術來",
    stem: "Wifi無線網路需採用傳輸加密技術來確保資料傳輸安全，下列何者非屬無線網路加密技術？",
    options: {
      A: "WPA2",
      B: "WPA",
      C: "WEP",
      D: "WPS"
    },
    tags: ["computer-principles"],
    answerNote: "PDF 題目前方標記為一律給分；acceptedAnswers 暫列 A-D 並等待人工複核。",
    extractionStatus: "needs-review"
  },
  {
    number: 38,
    answers: ["B"],
    pageNumber: 4,
    topic: "下列何者為利用尚未被發現或公開的軟體",
    stem: "下列何者為利用尚未被發現或公開的軟體安全漏洞，進行植入惡意程式的攻擊手法？",
    options: {
      A: "網路釣魚",
      B: "零時差攻擊",
      C: "入侵網路",
      D: "殭屍網路"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 39,
    answers: ["C"],
    pageNumber: 4,
    topic: "待人工審查考點",
    stem: "有關TCP/IP常用的應用服務所對應之傳輸協定及其預設連接埠號，下列何者有誤？",
    options: {
      A: "SMTP使用TCP連接埠25",
      B: "SNMP使用UDP連接埠161",
      C: "Telnet使用UDP連接埠23",
      D: "POP3使用TCP連接埠110"
    },
    tags: ["computer-principles", "networking"],
    extractionStatus: "verified"
  },
  {
    number: 40,
    answers: ["A"],
    pageNumber: 4,
    topic: "企業建置防火牆主要是防護下列何者之安",
    stem: "企業建置防火牆主要是防護下列何者之安全措施？",
    options: {
      A: "網路",
      B: "實體",
      C: "原始碼",
      D: "人員"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 41,
    answers: ["B"],
    pageNumber: 4,
    topic: "下列有關行動裝置安全的敘述，何者非屬",
    stem: "下列有關行動裝置安全的敘述，何者非屬保護之面向？",
    options: {
      A: "機密性",
      B: "擴充性",
      C: "完整性",
      D: "可用性"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 42,
    answers: ["D"],
    pageNumber: 4,
    topic: "下列有關VLAN的特點敘述，何者有誤",
    stem: "下列有關VLAN的特點敘述，何者有誤？",
    options: {
      A: "隔離廣播封包",
      B: "不受實體限制",
      C: "提高安全性",
      D: "提升傳輸速率"
    },
    tags: ["computer-principles", "networking"],
    extractionStatus: "verified"
  },
  {
    number: 43,
    answers: ["C"],
    pageNumber: 4,
    topic: "因應新型冠狀病毒肺炎疫情，有關採取遠",
    stem: "因應新型冠狀病毒肺炎疫情，有關採取遠距辦公的網路安全，下列敘述何者有誤？",
    options: {
      A: "避免使用公用Wifi連接公司網路",
      B: "電子郵件之附件加密",
      C: "可使用公用電腦登入公司系統",
      D: "離開電腦立刻鎖定電腦或切斷連線"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 44,
    answers: ["B"],
    pageNumber: 4,
    topic: "下列有關加密技術之敘述，何者有誤？",
    stem: "下列有關加密技術之敘述，何者有誤？",
    options: {
      A: "數位簽章是收件者使用寄件者的公鑰解密",
      B: "數位簽章是用寄件者的公鑰加密",
      C: "對稱式加密是雙方都使用同一把金鑰",
      D: "不可否認性是使用寄件者的私鑰加密"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 45,
    answers: ["A"],
    pageNumber: 4,
    topic: "下列有關物聯網層級架構由下而上的順序",
    stem: "下列有關物聯網層級架構由下而上的順序，何者正確？",
    options: {
      A: "感知層→網路層→應用層",
      B: "網路層→感知層→應用層",
      C: "應用層→網路層→感知層",
      D: "網路層→應用層→感知層"
    },
    tags: ["computer-principles"],
    extractionStatus: "needs-review"
  },
  {
    number: 46,
    answers: ["C"],
    pageNumber: 4,
    topic: "待人工審查考點",
    stem: "下列有關使用HTTP Cookie的敘述，何者正確？",
    options: {
      A: "防禦XSS攻擊",
      B: "作為瀏覽器的組態設定檔",
      C: "在瀏覽器中儲存資訊(如使用者帳密)",
      D: "防禦SQL Injection攻擊"
    },
    tags: ["computer-principles", "security", "networking", "database"],
    extractionStatus: "verified"
  },
  {
    number: 47,
    answers: ["D"],
    pageNumber: 4,
    topic: "下列何種指令可用來測試主機是否回應？",
    stem: "下列何種指令可用來測試主機是否回應？",
    options: {
      A: "ipconfig",
      B: "netstat",
      C: "telnet",
      D: "ping"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 48,
    answers: ["B"],
    pageNumber: 4,
    topic: "下列有關1000 Base TX的特",
    stem: "下列有關1000 Base TX的特性敘述，何者有誤？",
    options: {
      A: "傳輸速率為1 Gbps",
      B: "每對絞線皆可傳送及接收資料",
      C: "同時使用4對絞線傳輸資料",
      D: "使用2對絞線專門傳輸資料"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 49,
    answers: ["C"],
    pageNumber: 4,
    topic: "待人工審查考點",
    stem: "下列有關TCP與UDP通訊協定的敘述，何者正確？",
    options: {
      A: "UDP為可靠式傳輸",
      B: "TCP為安全式傳輸",
      C: "TCP為可靠式傳輸",
      D: "UDP為安全式傳輸"
    },
    tags: ["computer-principles", "networking"],
    extractionStatus: "verified"
  },
  {
    number: 50,
    answers: ["A"],
    pageNumber: 4,
    topic: "下列有關Syn Flooding網路",
    stem: "下列有關Syn Flooding網路阻斷服務攻擊的敘述，何者有誤？",
    options: {
      A: "伺服器端回傳ACK到用戶端",
      B: "用戶端不發送ACK到伺服器端",
      C: "伺服器端回傳SYN-ACK到用戶端",
      D: "用戶端發送SYN到伺服器端"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
];

export const questions = createAGroupYearQuestions('110', rawQuestions, reviewedQuestionAnalyses);
