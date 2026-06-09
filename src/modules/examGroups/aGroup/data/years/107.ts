import { reviewedQuestionAnalyses } from '@/modules/examGroups/aGroup/data/years/107ReviewedAnalyses';
import { createAGroupYearQuestions, type RawAGroupQuestion } from '@/modules/examGroups/aGroup/data/years/yearQuestionFactory';

const rawQuestions: RawAGroupQuestion[] = [
  {
    number: 1,
    answers: ["D"],
    pageNumber: 1,
    topic: "0100和1100邏輯運算後的結果是",
    stem: "0100和1100邏輯運算後的結果是1011，請問運算子為下列何者？",
    options: {
      A: "AND",
      B: "NOR",
      C: "XOR",
      D: "NAND"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 2,
    answers: ["D"],
    pageNumber: 1,
    topic: "下列哪一個載入程式(Loader)是",
    stem: "下列哪一個載入程式(Loader)是在載入階段進行繫結(Binding)工作？",
    options: {
      A: "絕對載入程式(Absolute Loader)",
      B: "重疊載入程式(Overlay)",
      C: "動態連結載入程式(Dynamic Linking Loader)",
      D: "直接連結載入程式(Direct Linking Loader)"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 3,
    answers: ["B"],
    pageNumber: 1,
    topic: "待人工審查考點",
    stem: "若CPU之工作頻率為2.5 GHz，則其時脈週期(Clock Cycle)應是下列何者？",
    options: {
      A: "250 ps",
      B: "400 ps",
      C: "2.5 ns",
      D: "4 ns"
    },
    tags: ["computer-principles", "operating-system"],
    extractionStatus: "verified"
  },
  {
    number: 4,
    answers: ["B"],
    pageNumber: 1,
    topic: "待人工審查考點",
    stem: "將配備2顆具有超執行緒(Hyper-Threading)功能CPU(每顆有 6 核心)，記憶體128 GB的實體主 機虛擬化做資源共享，有關虛擬伺服器(VM)的資源配置，下列何者有誤？",
    options: {
      A: "若可啟用超執行緒，可建立配置 20 顆虛擬 CPU，16 GB記憶體的 VM 1 部",
      B: "若可啟用超執行緒，可建立配置 20 顆虛擬 CPU，256 GB記憶體的 VM 1 部",
      C: "若不啟用超執行緒，可建立配置 10 顆虛擬 CPU，16 GB記憶體的 VM 5 部",
      D: "若不啟用超執行緒，可建立配置 4 顆虛擬 CPU，16 GB記憶體的 VM 10 部"
    },
    tags: ["computer-principles", "operating-system"],
    extractionStatus: "verified"
  },
  {
    number: 5,
    answers: ["C"],
    pageNumber: 1,
    topic: "戴斯卓拉(Dijkstra)提出銀行",
    stem: "戴斯卓拉(Dijkstra)提出銀行家演算法(Banker’s Algorithm)是解決下列哪一項問題？",
    options: {
      A: "Mutual Exclusion",
      B: "Deadlock Recovery",
      C: "Deadlock Avoidance",
      D: "Indefinite Postponement"
    },
    tags: ["computer-principles", "operating-system", "algorithm"],
    extractionStatus: "verified"
  },
  {
    number: 6,
    answers: ["C"],
    pageNumber: 1,
    topic: "補習班老師要兩位同學「寫作業」，一位",
    stem: "補習班老師要兩位同學「寫作業」，一位寫「數學作業」，另一位則寫「英文作業」，以物 件導向程式設計觀點，是運用下列哪一種特性？",
    options: {
      A: "封裝(Encapsulation)",
      B: "繼承(Inheritance)",
      C: "多型(Polymorphism)",
      D: "屬性(Property)"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 7,
    answers: ["B"],
    pageNumber: 1,
    topic: "下列哪一種螢幕用連接埠，是以類比方式",
    stem: "下列哪一種螢幕用連接埠，是以類比方式來傳輸訊號？",
    options: {
      A: "HDMI",
      B: "D-Sub",
      C: "DVI-D",
      D: "Display Port"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 8,
    answers: ["A"],
    pageNumber: 1,
    topic: "待人工審查考點",
    stem: "資料位元10101010，利用循環冗餘碼(CRC)技術傳送資料，若生成多項式為X4+X2+X+1，下 列哪一個是產生的CRC code？",
    options: {
      A: "1100",
      B: "1010",
      C: "0110",
      D: "0101"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 9,
    answers: ["C"],
    pageNumber: 2,
    topic: "一個分頁系統(Paging Syst",
    stem: "一個分頁系統(Paging System)之分頁表(Page Table)儲存在實體記憶體，實體記憶體與 TLB(Translation Look-aside Buffer)的存取時間各為200 ns及20 ns，TLB失誤率(Miss Rate)是 20%，若不考慮頁錯失(Page Fault)，有效記憶體存取時間為下列哪一個？",
    options: {
      A: "56 ns",
      B: "220 ns",
      C: "260 ns",
      D: "380 ns"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 10,
    answers: ["D"],
    pageNumber: 2,
    topic: "使用雜湊函數h(key) = 100",
    stem: "使用雜湊函數h(key) = 1000 + key mod 11的雜湊法(Hash Method)將16、86、134、186、213、 315、452、594八個數存入1000開始的11個位置，下列何者有誤？",
    options: {
      A: "213 存於位置 1004",
      B: "16 存於位置 1005",
      C: "315 存於位置 1007",
      D: "86 存於位置 1010"
    },
    tags: ["computer-principles", "data-structure"],
    extractionStatus: "verified"
  },
  {
    number: 11,
    answers: ["A"],
    pageNumber: 2,
    topic: "在實體關係圖(ER Diagram)",
    stem: "在實體關係圖(ER Diagram)中使用下列哪一種圖形來代表屬性？",
    options: {
      A: "橢圓形",
      B: "菱形",
      C: "矩形",
      D: "圓形"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 12,
    answers: ["B"],
    pageNumber: 2,
    topic: "下列哪一種匯流排屬於並列傳輸介面？",
    stem: "下列哪一種匯流排屬於並列傳輸介面？",
    options: {
      A: "SAS",
      B: "SCSI",
      C: "SATA",
      D: "USB"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 13,
    answers: ["B", "C"],
    pageNumber: 2,
    topic: "有關虛擬記憶體之描述，下列何者有誤？",
    stem: "有關虛擬記憶體之描述，下列何者有誤？",
    options: {
      A: "經由作業系統的管理，程式可以不受主記憶體實際大小的限制",
      B: "不採用虛擬記憶體技術，程式無法在實際記憶體空間比程式小的狀況下執行",
      C: "採用頁替換法則時，頁框(Frame)個數增加，取頁失敗(Page Fault)次數不增反降，稱為畢雷帝異常現象(Belady’s anormaly)",
      D: "最久未用的頁取代法(LRU)，其策略符合局限性理論(Theory of Locality)"
    },
    tags: ["computer-principles"],
    answerNote: "PDF 題目前方答案標記列出 B 或 C；此題保留多答案並等待人工複核。",
    extractionStatus: "needs-review"
  },
  {
    number: 14,
    answers: ["A"],
    pageNumber: 2,
    topic: "調低螢幕解析度，對於畫面中字型與視窗",
    stem: "調低螢幕解析度，對於畫面中字型與視窗的影響，下列何者正確？",
    options: {
      A: "字型與視窗都變大",
      B: "字型與視窗都變小",
      C: "字型變小、視窗變大",
      D: "視窗變小、字型變大"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 15,
    answers: ["B"],
    pageNumber: 2,
    topic: "與迴圈(Loop)相比，下列哪一個不",
    stem: "與迴圈(Loop)相比，下列哪一個不是使用遞迴(Recursive)的優點？",
    options: {
      A: "程式可讀性高",
      B: "程式執行效率較高",
      C: "區域變數與暫存變數較少",
      D: "程式碼較短"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 16,
    answers: ["D"],
    pageNumber: 2,
    topic: "指令之運算元欄的值，其意義在計算機指",
    stem: "指令之運算元欄的值，其意義在計算機指令集的各種定址模式各有不同，下列何者有誤？",
    options: {
      A: "立即(Immediate)定址模式，是所要的資料值",
      B: "直接(Direct)定址模式，是資料存放於記憶體的實際位址",
      C: "間接(Indirect)定址模式，是有效位址(Effective Address)的位址值",
      D: "相對(Relative)定址模式，加上基底暫存器的值，是有效位址的位址值"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 17,
    answers: ["D"],
    pageNumber: 2,
    topic: "待人工審查考點",
    stem: "下列哪一個屬於SQL的資料控制語言？",
    options: {
      A: "SELECT",
      B: "ALTER",
      C: "UPDATE",
      D: "COMMIT"
    },
    tags: ["computer-principles", "security", "database"],
    extractionStatus: "verified"
  },
  {
    number: 18,
    answers: ["C"],
    pageNumber: 2,
    topic: "下列哪一個編譯程式(Compiler",
    stem: "下列哪一個編譯程式(Compiler)的最佳化過程與機器有關？",
    options: {
      A: "布林表示式的最佳化(Boolean Expression Optimization)",
      B: "刪除共同的副式子(Elimination Of Common Subexpression)",
      C: "窺孔最佳化(Peephole Optimization)",
      D: "不變計算移至迴圈外面(Loop Optimization)"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 19,
    answers: ["B"],
    pageNumber: 2,
    topic: "下列以C語言呈現的語句，含有多少個單",
    stem: "下列以C語言呈現的語句，含有多少個單語(Token)？ If(a1 >= a2) b = 6;",
    options: {
      A: "9",
      B: "10",
      C: "11",
      D: "14"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 20,
    answers: ["D"],
    pageNumber: 2,
    topic: "索引式配置(Indexed Allo",
    stem: "索引式配置(Indexed Allocation)是檔案在磁碟上使用之一種方式，下列何者有誤？",
    options: {
      A: "每個檔案擁有自己的索引區塊(Index Block)，所以不需連續區塊來儲存檔案",
      B: "索引區塊內含有一些指標(Pointer)，藉以指向配置該檔案的區塊",
      C: "需要額外的空間來儲存索引區塊",
      D: "檔案大小不會影響索引區塊儲存空間的大小"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 21,
    answers: ["A"],
    pageNumber: 3,
    topic: "螢幕上同一張照片，分別以解析度600",
    stem: "螢幕上同一張照片，分別以解析度600 dpi和300 dpi的印表機輸出，前者面積是後者多少倍？",
    options: {
      A: "1/4",
      B: "1/2",
      C: "2",
      D: "4"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 22,
    answers: ["C"],
    pageNumber: 3,
    topic: "待人工審查考點",
    stem: "下列哪一個暫存器是用來紀錄CPU目前的執行狀態？",
    options: {
      A: "程式計數器",
      B: "資料暫存器",
      C: "旗標暫存器",
      D: "指令暫存器"
    },
    tags: ["computer-principles", "operating-system"],
    extractionStatus: "verified"
  },
  {
    number: 23,
    answers: ["B"],
    pageNumber: 3,
    topic: "待人工審查考點",
    stem: "三個處理單元(Process)A、B、C其執行時間(Burst Time)分別為20、8、2，採先來先服務 (FCFS)來排班，進入預備佇列的先後順序為A、B、C，下列何者有誤？",
    options: {
      A: "平均等待時間(Waiting Time) = 16",
      B: "平均返轉時間(Turnaround Time) = 25",
      C: "FCFS 屬於不可搶用(Non-preemptive)排班法",
      D: "FCFS 發生護航效應(Convey Effect)時，會造成 CPU 與 IO 設備在某些時段使用率極低"
    },
    tags: ["computer-principles", "operating-system"],
    extractionStatus: "verified"
  },
  {
    number: 24,
    answers: ["A"],
    pageNumber: 3,
    topic: "在Windows 7作業系統中，下列",
    stem: "在Windows 7作業系統中，下列何者可讓桌上型電腦主機繼續在省電狀態下執行？",
    options: {
      A: "睡眠",
      B: "螢幕鎖定",
      C: "登出",
      D: "安全模式"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 25,
    answers: ["D"],
    pageNumber: 3,
    topic: "有關記憶體DRAM描述，下列何者有誤",
    stem: "有關記憶體DRAM描述，下列何者有誤？",
    options: {
      A: "伺服器等級的 DRAM 具有 ECC 功能，可對資料做錯誤偵測與校正",
      B: "DDR3-1600 的資料傳輸頻率是 1600 MHz",
      C: "將相同標準不同速度的記憶體放在一起使用，實際速度會以最慢的那一條記憶體為準",
      D: "支援 DDR3 標準的主機板，不能插 DDR4 標準的記憶體，但可往前相容 DDR2 標準的記憶體"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 26,
    answers: ["C"],
    pageNumber: 3,
    topic: "工控系統(ICS)常號稱實體隔離，但",
    stem: "工控系統(ICS)常號稱實體隔離，但因特殊需求，仍須透過工控系統與公司內網間之DMZ區進 行資料傳送，以駭客角度，在OSI架構各層別中最有機會入侵工控系統的為何？",
    options: {
      A: "Layer 7 至 Layer 6",
      B: "Layer 5 至 Layer 4",
      C: "Layer 4 至 Layer 3",
      D: "Layer 2 至 Layer 1"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 27,
    answers: ["C"],
    pageNumber: 3,
    topic: "待人工審查考點",
    stem: "140.112屬class B網段，請問可提供多少IP位址(包含網路位址與主機位址)來使用？",
    options: {
      A: "2048",
      B: "32864",
      C: "65536",
      D: "102560"
    },
    tags: ["computer-principles", "networking"],
    extractionStatus: "verified"
  },
  {
    number: 28,
    answers: ["A"],
    pageNumber: 3,
    topic: "在電子資料安全防護上，下列何種防護機",
    stem: "在電子資料安全防護上，下列何種防護機制具備有不可否認性之安全特質？",
    options: {
      A: "數位簽章",
      B: "數位摘要",
      C: "對稱密鑰加密",
      D: "非對稱密鑰加密"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 29,
    answers: ["A"],
    pageNumber: 3,
    topic: "待人工審查考點",
    stem: "在OSI所定架構中，負責將資料切成資料片段(segments)，將資料片段傳輸至目的地，並可以 保證資料可靠性與順序之正確性者為哪一層？",
    options: {
      A: "Transport Layer",
      B: "Application Layer",
      C: "Network Layer",
      D: "Session Layer"
    },
    tags: ["computer-principles", "security"],
    extractionStatus: "verified"
  },
  {
    number: 30,
    answers: ["D"],
    pageNumber: 3,
    topic: "待人工審查考點",
    stem: "企業配置之IP位址不敷使用，對外通訊時須將Private address space轉換成對外ㄧ組IP位址，此 種轉換稱為何？",
    options: {
      A: "FTP",
      B: "HTTP",
      C: "DHCP",
      D: "NAT"
    },
    tags: ["computer-principles", "networking"],
    extractionStatus: "verified"
  },
  {
    number: 31,
    answers: ["C"],
    pageNumber: 3,
    topic: "待人工審查考點",
    stem: "下列採用H.323協定之設備中，何者負責終端機在LAN的名稱及IP位址轉換以及頻寬管理功能？",
    options: {
      A: "Terminal",
      B: "GateWay",
      C: "GateKeeper",
      D: "Video conference"
    },
    tags: ["computer-principles", "networking"],
    extractionStatus: "verified"
  },
  {
    number: 32,
    answers: ["A"],
    pageNumber: 3,
    topic: "兩個網路使用者以共用之秘密金鑰進行認",
    stem: "兩個網路使用者以共用之秘密金鑰進行認證程序時，其中一方先產生一組隨機訊息傳給對方 ，下列程序何者有誤？",
    options: {
      A: "對方直接回傳驗證",
      B: "隨機訊息亦以 secret key 加密",
      C: "對方以 secret key 加密後回傳",
      D: "比較對方加密後傳回之隨機訊息"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 33,
    answers: ["D"],
    pageNumber: 3,
    topic: "待人工審查考點",
    stem: "下列有關電腦網路之敘述，何者有誤？",
    options: {
      A: "可利用 ARP 取得在同一個 LAN 下使用某 IP address 機器之 MAC address",
      B: "ICMP 封包是嵌在 IP 封包內傳送的",
      C: "TCP 具有流量控制之機制",
      D: "使用 DHCP 取得的 IP address 可永久使用"
    },
    tags: ["computer-principles", "networking"],
    extractionStatus: "verified"
  },
  {
    number: 34,
    answers: ["B"],
    pageNumber: 3,
    topic: "以下何種協定屬IEEE標準802.3",
    stem: "以下何種協定屬IEEE標準802.3？",
    options: {
      A: "CSMA/CA",
      B: "CSMA/CD",
      C: "WAP",
      D: "AES"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 35,
    answers: ["C"],
    pageNumber: 4,
    topic: "待人工審查考點",
    stem: "以下何者非VPN通訊協定？",
    options: {
      A: "IPSec",
      B: "L2TP",
      C: "RMON",
      D: "PPTP"
    },
    tags: ["computer-principles", "security", "networking"],
    extractionStatus: "verified"
  },
  {
    number: 36,
    answers: ["D"],
    pageNumber: 4,
    topic: "待人工審查考點",
    stem: "IPv6延伸標頭中，下列何項未經定義？",
    options: {
      A: "Routing",
      B: "Fragment",
      C: "Authentication",
      D: "IPSec"
    },
    tags: ["computer-principles", "networking"],
    extractionStatus: "verified"
  },
  {
    number: 37,
    answers: ["B"],
    pageNumber: 4,
    topic: "待人工審查考點",
    stem: "IPv4標頭欄位中之存活時間(TTL)相對於IPv6標頭中哪一欄位？",
    options: {
      A: "Next header",
      B: "Hop Limit",
      C: "Payload length",
      D: "Flags"
    },
    tags: ["computer-principles", "networking"],
    extractionStatus: "verified"
  },
  {
    number: 38,
    answers: ["C"],
    pageNumber: 4,
    topic: "使用對稱型的區塊式加密法如DES或A",
    stem: "使用對稱型的區塊式加密法如DES或AES，如果資料長度不等於加密演算法每次所取區塊大 小之倍數，則會使用下列何種方法？",
    options: {
      A: "將資料序列化(Serializaton)",
      B: "加入 IV(Initialization Vector)值",
      C: "使用相對應之墊充(Padding)演算法",
      D: "最後一個不足規定區塊大小之資料不加密"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 39,
    answers: ["D"],
    pageNumber: 4,
    topic: "對於802.11無線區域網路之標準規",
    stem: "對於802.11無線區域網路之標準規格，資料傳輸率最高的為何？",
    options: {
      A: "802.11a",
      B: "802.11b",
      C: "802.11g",
      D: "802.11n"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 40,
    answers: ["A"],
    pageNumber: 4,
    topic: "下列何者不是電子郵件所使用之通訊協定",
    stem: "下列何者不是電子郵件所使用之通訊協定？",
    options: {
      A: "FTP",
      B: "POP3",
      C: "SMTP",
      D: "IMAP"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 41,
    answers: ["B"],
    pageNumber: 4,
    topic: "國內目前行動支付，有關Apple P",
    stem: "國內目前行動支付，有關Apple Pay之Tokenization，下列何者有誤？",
    options: {
      A: "較易阻絕盜刷風險",
      B: "須存實體卡號",
      C: "尚未支援悠遊卡",
      D: "以近端交易為主"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 42,
    answers: ["D"],
    pageNumber: 4,
    topic: "待人工審查考點",
    stem: "在網頁上進行金融交易，網址出現「https://」代表何種安全機制？",
    options: {
      A: "SIP",
      B: "SSH",
      C: "SMTP",
      D: "SSL"
    },
    tags: ["computer-principles", "security", "networking"],
    extractionStatus: "verified"
  },
  {
    number: 43,
    answers: ["D"],
    pageNumber: 4,
    topic: "依據歐洲電信標準協會(ETSI)之定",
    stem: "依據歐洲電信標準協會(ETSI)之定義物聯網架構，扮演感知層與應用層中間橋樑，負責將各感測資訊集中轉換與傳遞至應用層者為何？",
    options: {
      A: "表示層",
      B: "傳輸層",
      C: "實體層",
      D: "網路層"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 44,
    answers: ["A"],
    pageNumber: 4,
    topic: "雲端服務已行之多年，像中華電信的Hi",
    stem: "雲端服務已行之多年，像中華電信的HiCloud、Amazon的EC2(Elastic Compute Cloud)等屬下 列何種雲端服務？",
    options: {
      A: "IaaS",
      B: "PaaS",
      C: "SaaS",
      D: "MaaS"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 45,
    answers: ["A"],
    pageNumber: 4,
    topic: "下列何項屬星狀網路拓墣(star t",
    stem: "下列何項屬星狀網路拓墣(star topology)之特性？",
    options: {
      A: "任一連線損壞不影響其他連線",
      B: "無資料碰撞問題",
      C: "拓樸中所有節點角色相同",
      D: "網路中不會產生瓶頸點"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 46,
    answers: ["B"],
    pageNumber: 4,
    topic: "待人工審查考點",
    stem: "下列關於網路通訊協定TCP與UDP之比較及敘述何者正確？",
    options: {
      A: "TCP 傳送速度較快",
      B: "UDP 不保證傳到",
      C: "僅 TCP 屬傳輸層",
      D: "UDP 傳輸較可靠"
    },
    tags: ["computer-principles", "networking"],
    extractionStatus: "verified"
  },
  {
    number: 47,
    answers: ["C"],
    pageNumber: 4,
    topic: "工控系統(ICS)如果異常，通常影響",
    stem: "工控系統(ICS)如果異常，通常影響層面很大，甚至常須緊急處置停止災損，同時維持最低營 運狀況，在資安防護上，下列何項應為最首要考量？",
    options: {
      A: "機密性",
      B: "完整性",
      C: "可用性",
      D: "依賴性"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 48,
    answers: ["D"],
    pageNumber: 4,
    topic: "HTTP",
    stem: "下列服務項目/預設通訊埠何者有誤？",
    options: {
      A: "POP3/110",
      B: "DNS/53",
      C: "HTTPS/443",
      D: "IMAP/147"
    },
    tags: ["computer-principles", "networking"],
    extractionStatus: "verified"
  },
  {
    number: 49,
    answers: ["B", "C"],
    pageNumber: 4,
    topic: "HTML5的規則是由下列哪一團體所制",
    stem: "HTML5的規則是由下列哪一團體所制定？",
    options: {
      A: "CSS",
      B: "WHATWG",
      C: "W3C",
      D: "HTML5"
    },
    tags: ["computer-principles"],
    answerNote: "PDF 題目前方答案標記列出 B 或 C；此題保留多答案並等待人工複核。",
    extractionStatus: "needs-review"
  },
  {
    number: 50,
    answers: ["C"],
    pageNumber: 4,
    topic: "SSL/TLS",
    stem: "在使用SSL方式進行通訊時，通訊雙方須取得對方憑證並確認是否有效，主要在防止下列何項情境？",
    options: {
      A: "阻斷服務攻擊(Denial of Service)",
      B: "跨站腳本攻擊(XSS Attack)",
      C: "中間人攻擊(Man-in-the-middle Attack)",
      D: "重送攻擊(Replay Attack)"
    },
    tags: ["computer-principles", "security"],
    extractionStatus: "verified"
  },
];

export const questions = createAGroupYearQuestions('107', rawQuestions, reviewedQuestionAnalyses);
