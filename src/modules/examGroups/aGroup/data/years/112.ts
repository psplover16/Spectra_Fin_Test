import { reviewedQuestionAnalyses } from '@/modules/examGroups/aGroup/data/years/112ReviewedAnalyses';
import { createAGroupYearQuestions, type RawAGroupQuestion } from '@/modules/examGroups/aGroup/data/years/yearQuestionFactory';

const rawQuestions: RawAGroupQuestion[] = [
  {
    number: 1,
    answers: ["C"],
    pageNumber: 1,
    topic: "將八進制數值(2345.67)8轉換",
    stem: "將八進制數值(2345.67)8轉換成十六進制數值，請問其結果為何？",
    options: {
      A: "(95.13)16",
      B: "(59.13)16",
      C: "(4E5.DC)16",
      D: "(45E.DC)16"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 2,
    answers: ["A"],
    pageNumber: 1,
    topic: "下列何種定址模式(Addressin",
    stem: "下列何種定址模式(Addressing Modes)無須記憶體的存取動作，運算元擷取速度最快？",
    options: {
      A: "立即定址",
      B: "直接定址",
      C: "相對定址",
      D: "間接定址"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 3,
    answers: ["B"],
    pageNumber: 1,
    topic: "待人工審查考點",
    stem: "當快取記憶體(Cache)已滿，需要刪除一些元素(Element)為新元素釋放空間時，下列何種策略 在性能上表現較佳？",
    options: {
      A: "刪除在 Cache 內停留次數最少的元素",
      B: "刪除自進入 Cache 以來未被使用時間最長的元素",
      C: "刪除在 Cache 內停留時間最長的元素",
      D: "替換在 Cache 內停留時間最短的元素"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 4,
    answers: ["C"],
    pageNumber: 1,
    topic: "下列分數何者無法以二進制精確表示(或",
    stem: "下列分數何者無法以二進制精確表示(或存入電腦會有誤差)？",
    options: {
      A: "3 / 24",
      B: "7 / 16",
      C: "5 / 12",
      D: "13 / 32"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 5,
    answers: ["D"],
    pageNumber: 1,
    topic: "有關 BCD 編碼，下列何者有誤？",
    stem: "有關 BCD 編碼，下列何者有誤？",
    options: {
      A: "100110000111",
      B: "000110000000",
      C: "01110100",
      D: "010100101100"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 6,
    answers: ["B"],
    pageNumber: 1,
    topic: "USB 3.2 Gen 2×1 的傳",
    stem: "USB 3.2 Gen 2×1 的傳輸速度最高每秒可達多少？",
    options: {
      A: "5 GB",
      B: "10 GB",
      C: "20 GB",
      D: "40 GB"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 7,
    answers: ["D"],
    pageNumber: 1,
    topic: "待人工審查考點",
    stem: "有關匯流排(Bus)之敘述，下列何者有誤？",
    options: {
      A: "CPU 主要是靠匯流排傳輸資料、位址及控制訊號",
      B: "資料匯流排(Data Bus)的排線數，決定每次能同時傳送資料的位元數",
      C: "位址匯流排(Address Bus)的排線數，決定可定址的最大記憶體空間",
      D: "資料匯流排(Data Bus)與控制匯流排(Control Bus)的傳輸方向，同為雙向"
    },
    tags: ["computer-principles", "operating-system"],
    extractionStatus: "verified"
  },
  {
    number: 8,
    answers: ["A"],
    pageNumber: 1,
    topic: "有關資料儲存單位的大小排列，下列何者",
    stem: "有關資料儲存單位的大小排列，下列何者正確？",
    options: {
      A: "ZB > EB > PB > TB",
      B: "ZB > TB > PB > EB",
      C: "TB > EB > PB > ZB",
      D: "PB > EB > ZB > TB"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 9,
    answers: ["B"],
    pageNumber: 1,
    topic: "有關邏輯運算式，下列何者有誤？",
    stem: "有關邏輯運算式，下列何者有誤？",
    options: {
      A: "X • X = X",
      B: "Y + 1 = Y",
      C: "Y • 0 = 0",
      D: "X + XY = X"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 10,
    answers: ["A", "D"],
    pageNumber: 1,
    topic: "有關最小成本擴張樹演算法，下列何者可",
    stem: "有關最小成本擴張樹演算法，下列何者可以任意挑選起始節點？",
    options: {
      A: "Prim",
      B: "Bellman-Ford",
      C: "Dijkstra",
      D: "Kruskal"
    },
    tags: ["computer-principles", "algorithm"],
    answerNote: "PDF 題目前方答案標記列出 A 或 D；此題保留多答案並等待人工複核。",
    extractionStatus: "needs-review"
  },
  {
    number: 11,
    answers: ["B"],
    pageNumber: 2,
    topic: "在單一處理器中執行一個程式，其執行時",
    stem: "在單一處理器中執行一個程式，其執行時間 25 %是循序的，75 %可用多核心平行處理，若欲以 多個同樣的處理器加速執行，將總執行時間減至原本的一半，依據阿姆達爾定律(Amdahl's Law) 至少需要使用多少個處理器？",
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
    number: 12,
    answers: ["C"],
    pageNumber: 2,
    topic: "有關作業系統對於記憶體管理之方式，包",
    stem: "有關作業系統對於記憶體管理之方式，包括 7 種分頁替換演算法(Page Replacement Algorithm)，分 別為 FIFO(First In First Out)、OPT(Optimal)、LRU(Least Recently Used)、LFU(Least Frequently Used) 、MFU(Most Frequently Used)、Second Chance及Enhanced Second Chance，請問前述有幾種會遭遇布 雷第異常現象(Belady’s Anomaly)？",
    options: {
      A: "3",
      B: "4",
      C: "5",
      D: "6"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 13,
    answers: ["C"],
    pageNumber: 2,
    topic: "有關排序演算法，下列何者在最差情況下",
    stem: "有關排序演算法，下列何者在最差情況下的時間複雜度相對最佳？",
    options: {
      A: "選擇排序",
      B: "快速排序",
      C: "合併排序",
      D: "插入排序"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 14,
    answers: ["B"],
    pageNumber: 2,
    topic: "待人工審查考點",
    stem: "下列 7 項中有幾項非屬程序控制區塊 PCB(Process Control Block)組成內容？ ○1 CPU Register ○2 Memory Management Information ○3 Programming Counter ○4 Bit Map ○5 Process State ○6 CPU Scheduling Information ○7 I/O Device Queue",
    options: {
      A: "1",
      B: "2",
      C: "3",
      D: "4"
    },
    tags: ["computer-principles", "operating-system"],
    extractionStatus: "verified"
  },
  {
    number: 15,
    answers: ["A"],
    pageNumber: 2,
    topic: "待人工審查考點",
    stem: "下列何種程式語言有垃圾收集(Garbage Collection)之機制？",
    options: {
      A: "Java",
      B: "Pascal",
      C: "C",
      D: "C+ +"
    },
    tags: ["computer-principles", "programming"],
    extractionStatus: "verified"
  },
  {
    number: 16,
    answers: ["D"],
    pageNumber: 2,
    topic: "有關雜湊(Hash)函數之敘述，下列",
    stem: "有關雜湊(Hash)函數之敘述，下列何者有誤？",
    options: {
      A: "固定長度",
      B: "正常情況下雜湊結果為唯一值",
      C: "常用於驗證資料的完整性",
      D: "可以解密"
    },
    tags: ["computer-principles", "data-structure"],
    extractionStatus: "verified"
  },
  {
    number: 17,
    answers: ["A"],
    pageNumber: 2,
    topic: "有關人工智慧之敘述，下列何者有誤？",
    stem: "有關人工智慧之敘述，下列何者有誤？",
    options: {
      A: "主成分分析是一種降維手段，需要標籤信息進行運算",
      B: "在訓練樣本不足時，增加模型的複雜度仍舊可能得到更高的訓練準確度",
      C: "循環神經網路常會出現梯度消失或梯度爆炸的現象，是因為參數與層數較多",
      D: "LISP 為早期人工智慧專案常使用的程式語言"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 18,
    answers: ["C"],
    pageNumber: 2,
    topic: "有關資料庫正規化(Normaliza",
    stem: "有關資料庫正規化(Normalization)之敘述，下列何者正確？ ○1 正規化的程度越高，資料的重複性會降低 ○2 正規化的程度越高，資料存取效能亦會越高 ○3 正規化的程度越高，資料表格的數量亦會增多 ○4 正規化程序可避免更新異常",
    options: {
      A: "○1 ○2 ○3",
      B: "○1 ○2 ○4",
      C: "○1 ○3 ○4",
      D: "○2 ○3 ○4"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 19,
    answers: ["C"],
    pageNumber: 2,
    topic: "待人工審查考點",
    stem: "有關虛擬記憶體的設計，下列何者屬於用來儲存尚未執行完之程式碼的磁碟空間？",
    options: {
      A: "Page Table",
      B: "Task Looking Forward Table",
      C: "Swap Space",
      D: "Virtual Cache"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 20,
    answers: ["D"],
    pageNumber: 2,
    topic: "阿華在設計一個程式，需要一種資料結構",
    stem: "阿華在設計一個程式，需要一種資料結構，可以一邊新增資料，一邊取出資料，且每次取出 的資料都是現有資料中的最大值。您建議阿華使用下列何種資料結構？",
    options: {
      A: "Array",
      B: "Linked List",
      C: "Queue",
      D: "Heap"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 21,
    answers: ["A", "B", "C", "D"],
    pageNumber: 2,
    topic: "下列何種磁碟陣列不具有容錯能力？",
    stem: "下列何種磁碟陣列不具有容錯能力？",
    options: {
      A: "RAID 1",
      B: "RAID 3",
      C: "RAID 5",
      D: "RAID 1 + 0"
    },
    tags: ["computer-principles"],
    answerNote: "PDF 題目前方標記為一律給分；acceptedAnswers 暫列 A-D 並等待人工複核。",
    extractionStatus: "needs-review"
  },
  {
    number: 22,
    answers: ["A"],
    pageNumber: 2,
    topic: "將一組陣列的值由主程式傳遞給副程式時",
    stem: "將一組陣列的值由主程式傳遞給副程式時，使用下列何種呼叫方法使資料傳遞速度最快？",
    options: {
      A: "傳址呼叫",
      B: "傳名呼叫",
      C: "傳值呼叫",
      D: "傳結果呼叫"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 23,
    answers: ["A"],
    pageNumber: 2,
    topic: "現有資料碼 1010111 及 00",
    stem: "現有資料碼 1010111 及 0011001，若採用奇同位元(Odd Parity)檢查，其同位元值分別為何？",
    options: {
      A: "0及0",
      B: "0及1",
      C: "1及0",
      D: "1及1"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 24,
    answers: ["C"],
    pageNumber: 3,
    topic: "有關自然語言處理之敘述，下列何者有誤",
    stem: "有關自然語言處理之敘述，下列何者有誤？",
    options: {
      A: "自然語言處理中越來越多使用機器自動學習的方法來獲取語言知識",
      B: "自然語言處理可以將英文文章翻譯成中文文章",
      C: "自然語言處理以單詞出現的次數來衡量單詞重要性",
      D: "自然語言處理需要將文字轉化成向量以進行後續處理及篩選"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 25,
    answers: ["D"],
    pageNumber: 3,
    topic: "下列何種影像格式可將顏色儲存為透明？",
    stem: "下列何種影像格式可將顏色儲存為透明？",
    options: {
      A: "BMP",
      B: "TIFF",
      C: "JPG",
      D: "GIF"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 26,
    answers: ["C"],
    pageNumber: 3,
    topic: "有關 OSI 模型(Open Sys",
    stem: "有關 OSI 模型(Open System Interconnection Model)中傳輸層之協議數據單元(Protocol Data Unit, PDU)， 下列何者正確？",
    options: {
      A: "Frame",
      B: "Packet",
      C: "Segment",
      D: "Bit"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 27,
    answers: ["D"],
    pageNumber: 3,
    topic: "待人工審查考點",
    stem: "如果您採取手動設定方式想讓個人電腦能經由區域網路正確連上網際網路，除了 IP 位址外， 下列何者非屬必要設定？",
    options: {
      A: "子網路遮罩",
      B: "預設閘道器",
      C: "名稱伺服器",
      D: "防火牆"
    },
    tags: ["computer-principles", "networking"],
    extractionStatus: "verified"
  },
  {
    number: 28,
    answers: ["A"],
    pageNumber: 3,
    topic: "待人工審查考點",
    stem: "針對 IPv4 位址不足的問題，下列何者非屬解決之技術？",
    options: {
      A: "SNMP",
      B: "DHCP",
      C: "IPv6",
      D: "NAT"
    },
    tags: ["computer-principles", "networking"],
    extractionStatus: "verified"
  },
  {
    number: 29,
    answers: ["B"],
    pageNumber: 3,
    topic: "依據 OWASP(Open Web",
    stem: "依據 OWASP(Open Web Application Security Project)提出之 10 大安全漏洞(最新版本為2021版) ，下列何者非屬前 3 名？",
    options: {
      A: "Injection",
      B: "Broken Authentication",
      C: "Cryptographic Failures",
      D: "Broken Access Control"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 30,
    answers: ["D"],
    pageNumber: 3,
    topic: "VPN",
    stem: "下列何者為員工居家上班時可以透過 Internet 安全連線到公司內網的技術？",
    options: {
      A: "VLAN",
      B: "NAT",
      C: "PPP",
      D: "VPN"
    },
    tags: ["computer-principles", "security", "networking"],
    extractionStatus: "verified"
  },
  {
    number: 31,
    answers: ["B"],
    pageNumber: 3,
    topic: "待人工審查考點",
    stem: "有關 IPv4 的表頭欄位值，下列何者會隨著路由器的轉送而變動？",
    options: {
      A: "封包總長(TL)",
      B: "存活時間(TTL)",
      C: "標頭檢驗值(HC)",
      D: "標頭長度(IHL)"
    },
    tags: ["computer-principles", "networking"],
    extractionStatus: "verified"
  },
  {
    number: 32,
    answers: ["A", "B"],
    pageNumber: 3,
    topic: "有關網路設備之敘述，下列何者正確？",
    stem: "有關網路設備之敘述，下列何者正確？",
    options: {
      A: "路由器可分割碰撞網域",
      B: "集線器可用來加強纜線上的訊號",
      C: "橋接器可分割廣播網域",
      D: "交換器可將數位轉換為類比訊號"
    },
    tags: ["computer-principles"],
    answerNote: "PDF 題目前方答案標記列出 A 或 B；此題保留多答案並等待人工複核。",
    extractionStatus: "needs-review"
  },
  {
    number: 33,
    answers: ["B"],
    pageNumber: 3,
    topic: "有關物聯網(Internet of",
    stem: "有關物聯網(Internet of Things)網路層主要功能之敘述，下列何者正確？",
    options: {
      A: "負責監控感測器的網路狀態",
      B: "負責上傳感知層收集到的資料至應用層",
      C: "負責感測與辨識感測器的信號",
      D: "負責將感測及辨識後的資料進行分類"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 34,
    answers: ["A"],
    pageNumber: 3,
    topic: "待人工審查考點",
    stem: "有關 OSI 模型(Open System Interconnection Model)中各層之敘述，下列何者有誤？",
    options: {
      A: "網路層：ARP 及 FTP 均屬於網路層的協定",
      B: "實體層：負責將資料轉成電子訊號後再傳送出去",
      C: "應用層：負責規範各項網路服務的使用者介面",
      D: "傳輸層：UDP 屬於傳輸層的協定"
    },
    tags: ["computer-principles", "networking"],
    extractionStatus: "verified"
  },
  {
    number: 35,
    answers: ["D"],
    pageNumber: 3,
    topic: "有關對稱式加密與非對稱式加密之敘述，",
    stem: "有關對稱式加密與非對稱式加密之敘述，下列何者有誤？",
    options: {
      A: "對稱式代表加密與解密均為相同密鑰，非對稱式則需公、私鑰各一把",
      B: "對稱式使用上解密較快速，非對稱式使用上則較為安全",
      C: "DES、3DES 及 AES 均為對稱式加密算法",
      D: "DSA、IDEA 及 RSA 均為非對稱式加密算法"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 36,
    answers: ["C"],
    pageNumber: 3,
    topic: "為預防遭受勒索軟體(Ransomwa",
    stem: "為預防遭受勒索軟體(Ransomware)之攻擊，定期備份重要檔案並採用「3-2-1原則」備份方案 是防護措施之一，有關「3-2-1原則」之敘述，下列何者正確？",
    options: {
      A: "3：以 3 種不同形式媒體儲存備份",
      B: "2：重要資料至少備份 2 份",
      C: "1：其中 1 份備份要存放異地",
      D: "3：每月至少進行 3 次備份"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 37,
    answers: ["C"],
    pageNumber: 4,
    topic: "待人工審查考點",
    stem: "有關網際網路通訊協定第 4 版(IPv4)和第 6 版(IPv6)之比較敘述，下列何者有誤？",
    options: {
      A: "IPv6 位址格式設有省略規則，IPv4 則無",
      B: "IPv6 位址數量比 IPv4 多",
      C: "IPv6 表頭長度可以變動，IPv4 則為固定",
      D: "IPv6 表頭欄位比 IPv4 少"
    },
    tags: ["computer-principles", "networking"],
    extractionStatus: "verified"
  },
  {
    number: 38,
    answers: ["A"],
    pageNumber: 4,
    topic: "待人工審查考點",
    stem: "下列哪一個 IP 位址與 172.16.28.252 / 20 非屬同一個子網路中？",
    options: {
      A: "172.16.33.18",
      B: "172.16.29.166",
      C: "172.16.27.39",
      D: "172.16.17.122"
    },
    tags: ["computer-principles", "networking"],
    extractionStatus: "verified"
  },
  {
    number: 39,
    answers: ["B"],
    pageNumber: 4,
    topic: "SSL/TLS",
    stem: "SSL 和 TLS 都是基於加密的網路安全協定，下列何者有誤？",
    options: {
      A: "SSL 交握程序的步驟比 TLS 程序多",
      B: "SSL 使用雜湊訊息驗證碼(HMAC)",
      C: "TLS 是 SSL 的升級版本",
      D: "TLS 提醒訊息已加密"
    },
    tags: ["computer-principles", "security"],
    extractionStatus: "verified"
  },
  {
    number: 40,
    answers: ["C"],
    pageNumber: 4,
    topic: "有關入侵偵測系統(Intrusion",
    stem: "有關入侵偵測系統(Intrusion-Detection System, IDS)之敘述，下列何者有誤？",
    options: {
      A: "可監控網絡或系統中的異常或可疑行為",
      B: "異常行為偵測需先定義正常行為",
      C: "具有主動防禦的能力",
      D: "網路型 IDS 可安裝於任何地方，屬獨立系統"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 41,
    answers: ["B"],
    pageNumber: 4,
    topic: "待人工審查考點",
    stem: "有關 TCP 協定之流量控制(Flow Control)功能之敘述，下列何者正確？",
    options: {
      A: "避免流量超過發送端傳送的能力",
      B: "避免流量超過接收端接收的能力",
      C: "避免流量超過路由器轉送的能力",
      D: "避免流量超過交換器轉址的能力"
    },
    tags: ["computer-principles", "networking"],
    extractionStatus: "verified"
  },
  {
    number: 42,
    answers: ["C"],
    pageNumber: 4,
    topic: "待人工審查考點",
    stem: "下列何者非針對 OSI 模型(Open System Interconnection Model)中應用層的攻擊手法？",
    options: {
      A: "DNS Cache Poisoning",
      B: "HTTP Flood",
      C: "SYN Flood",
      D: "SQL Injection"
    },
    tags: ["computer-principles", "security", "networking", "database"],
    extractionStatus: "verified"
  },
  {
    number: 43,
    answers: ["C"],
    pageNumber: 4,
    topic: "待人工審查考點",
    stem: "有關 FTP 傳輸時使用 2 個連接埠來建立連線通道之敘述，下列何者正確？",
    options: {
      A: "控制連線用 TCP 連接埠 20",
      B: "控制連線用 UDP 連接埠 20",
      C: "資料連線用 TCP 連接埠 20",
      D: "資料連線用 UDP 連接埠 20"
    },
    tags: ["computer-principles", "networking"],
    extractionStatus: "verified"
  },
  {
    number: 44,
    answers: ["A"],
    pageNumber: 4,
    topic: "檢測系統安全與否一般會採用弱點掃描(",
    stem: "檢測系統安全與否一般會採用弱點掃描(簡稱弱掃)和滲透測試(簡稱滲透)，有關兩者差異比較 之敘述，下列何者有誤？",
    options: {
      A: "弱掃較滲透更能發現未知漏洞",
      B: "弱掃採自動化工具，滲透採人工檢測",
      C: "執行弱掃之成本通常較滲透低",
      D: "執行弱掃之時機通常較滲透頻繁"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 45,
    answers: ["D"],
    pageNumber: 4,
    topic: "待人工審查考點",
    stem: "有關 Distance Vector(簡稱DV)與 Link State(簡稱LS)路由演算法兩者差異之敘述，下列何者有誤？",
    options: {
      A: "DV 定期更新路由資訊，但 LS 則否",
      B: "RIPv2 路由協定採取 DV，OSPF 則採取 LS",
      C: "LS 之路由資訊收斂較 DV 快",
      D: "DV 運行較 LS 需更大頻寬"
    },
    tags: ["computer-principles", "networking"],
    extractionStatus: "verified"
  },
  {
    number: 46,
    answers: ["B"],
    pageNumber: 4,
    topic: "VPN",
    stem: "有關路由器和第 3 層交換器(簡稱L3SW)之差異敘述，下列何者有誤？",
    options: {
      A: "路由器的路由表規模較 L3SW 大",
      B: "兩者都支援 NAT and Tunneling",
      C: "路由器支援 VPN，L3 Switch 則不支援",
      D: "路由器由軟體執行路由，L3SW 則由硬體執行"
    },
    tags: ["computer-principles", "security"],
    extractionStatus: "verified"
  },
  {
    number: 47,
    answers: ["C"],
    pageNumber: 4,
    topic: "待人工審查考點",
    stem: "CIDR(Classless Inter-Domain Routing)是一種 IP 地址分配方法，下列敘述何者有誤？",
    options: {
      A: "CIDR 標記 172.16.0.0 / 12 是 IPv4 Class B 的私有 IP 範圍",
      B: "CIDR 可提高網際網路上的資料路由效率",
      C: "CIDR 標記 192.168.1.1 / 25 的子網路遮罩是 255.255.255.192",
      D: "CIDR 可減少 IP 位址浪費"
    },
    tags: ["computer-principles", "networking"],
    extractionStatus: "verified"
  },
  {
    number: 48,
    answers: ["D"],
    pageNumber: 4,
    topic: "下列何者為輕量型目錄存取通訊協定(L",
    stem: "下列何者為輕量型目錄存取通訊協定(LDAP)預設使用之連接埠？",
    options: {
      A: "290",
      B: "289",
      C: "390",
      D: "389"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 49,
    answers: ["A"],
    pageNumber: 4,
    topic: "tracert 或 tracerou",
    stem: "tracert 或 traceroute 指令常利用於網路診斷，下列何者為前述指令採用之協定？",
    options: {
      A: "ICMP",
      B: "SNMP",
      C: "SMTP",
      D: "DHCP"
    },
    tags: ["computer-principles", "networking"],
    extractionStatus: "verified"
  },
  {
    number: 50,
    answers: ["D"],
    pageNumber: 4,
    topic: "ZigBee 與 Bluetooth",
    stem: "ZigBee 與 Bluetooth 皆屬近距離的無線網路技術，下列敘述何者正確？",
    options: {
      A: "兩者都是基於 IEEE 802.15.4 標準",
      B: "ZigBee 的傳輸速率較 Bluetooth 快",
      C: "ZigBee 的成本較 Bluetooth 高",
      D: "ZigBee 的功耗較 Bluetooth 低"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
];

export const questions = createAGroupYearQuestions('112', rawQuestions, reviewedQuestionAnalyses);
