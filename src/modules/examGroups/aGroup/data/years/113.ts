import { reviewedQuestionAnalyses } from '@/modules/examGroups/aGroup/data/years/113ReviewedAnalyses';
import { createAGroupYearQuestions, type RawAGroupQuestion } from '@/modules/examGroups/aGroup/data/years/yearQuestionFactory';

const rawQuestions: RawAGroupQuestion[] = [
  {
    number: 1,
    answers: ["A"],
    pageNumber: 1,
    topic: "將200轉換為八進制數值，產生結果為",
    stem: "將200轉換為八進制數值，產生結果為何？",
    options: {
      A: "(310)8",
      B: "(376)8",
      C: "(412)8",
      D: "(420)8"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 2,
    answers: ["C"],
    pageNumber: 1,
    topic: "下列何者屬於萬用閘？",
    stem: "下列何者屬於萬用閘？",
    options: {
      A: "AND閘",
      B: "OR閘",
      C: "NAND閘",
      D: "XOR閘"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 3,
    answers: ["B"],
    pageNumber: 1,
    topic: "關於複雜指令集架構(CISC)之敘述",
    stem: "關於複雜指令集架構(CISC)之敘述，下列何者有誤？",
    options: {
      A: "有較多的指令種類",
      B: "需利用編譯器以進行最佳化指令設計",
      C: "定址模式較多",
      D: "大部分的指令能存取記憶體"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 4,
    answers: ["D"],
    pageNumber: 1,
    topic: "若硬體無法滿足每個時脈週期在管路(P",
    stem: "若硬體無法滿足每個時脈週期在管路(Pipeline)中同時被執行的指令，會發生下列何種問題？",
    options: {
      A: "排程危障",
      B: "控制危障",
      C: "資料危障",
      D: "結構危障"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 5,
    answers: ["B"],
    pageNumber: 1,
    topic: "下列何種磁碟陣列的成本最高？",
    stem: "下列何種磁碟陣列的成本最高？",
    options: {
      A: "RAID 0",
      B: "RAID 1",
      C: "RAID 3",
      D: "RAID 4"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 6,
    answers: ["C"],
    pageNumber: 1,
    topic: "待人工審查考點",
    stem: "關於CPU與I/O的輪詢(Polling)方式，下列何者有誤？",
    options: {
      A: "簡單易執行",
      B: "CPU會週期性確認I/O的狀態",
      C: "適用於高速裝置傳送大量資料",
      D: "CPU的利用率較差"
    },
    tags: ["computer-principles", "operating-system"],
    extractionStatus: "verified"
  },
  {
    number: 7,
    answers: ["D"],
    pageNumber: 1,
    topic: "下列何種排程演算法最適合用在分時系統",
    stem: "下列何種排程演算法最適合用在分時系統？",
    options: {
      A: "FCFS",
      B: "SJF",
      C: "PS",
      D: "RR"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 8,
    answers: ["A"],
    pageNumber: 1,
    topic: "行程(Process)若沒有配置足夠",
    stem: "行程(Process)若沒有配置足夠的實體記憶體頁框(Frames)時，將因分頁錯誤率高而產生大量 記憶體分頁切換，此現象稱為下列何者？",
    options: {
      A: "Thrashing",
      B: "Starvation",
      C: "Memory Leak",
      D: "Deadlock"
    },
    tags: ["computer-principles", "operating-system"],
    extractionStatus: "verified"
  },
  {
    number: 9,
    answers: ["C"],
    pageNumber: 1,
    topic: "關於死結(Deadlock)發生的必",
    stem: "關於死結(Deadlock)發生的必要條件，下列何者有誤？",
    options: {
      A: "互斥",
      B: "占用並等候",
      C: "程式發生不可預期的錯誤",
      D: "不可強奪"
    },
    tags: ["computer-principles", "operating-system"],
    extractionStatus: "verified"
  },
  {
    number: 10,
    answers: ["B"],
    pageNumber: 1,
    topic: "關於記憶體管理方式中的分頁法(Pag",
    stem: "關於記憶體管理方式中的分頁法(Paging)，下列何者有誤？",
    options: {
      A: "會有內部碎裂",
      B: "會有外部碎裂",
      C: "區塊大小為固定",
      D: "允許1個程式載入不連續的記憶體空間"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 11,
    answers: ["D"],
    pageNumber: 1,
    topic: "下列何種檔案配置法，對於增加或刪除檔",
    stem: "下列何種檔案配置法，對於增加或刪除檔案最不具彈性？",
    options: {
      A: "連結配置法",
      B: "隨機配置法",
      C: "索引配置法",
      D: "連續配置法"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 12,
    answers: ["C"],
    pageNumber: 2,
    topic: "下列何者是世界上第一個被正式採用，並",
    stem: "下列何者是世界上第一個被正式採用，並流傳至今的高階程式語言？",
    options: {
      A: "BASIC",
      B: "COBOL",
      C: "FORTRAN",
      D: "PASCAL"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 13,
    answers: ["B"],
    pageNumber: 2,
    topic: "關於伺服器端動態網頁之敘述，下列何者",
    stem: "關於伺服器端動態網頁之敘述，下列何者有誤？",
    options: {
      A: "用戶端安全性佳",
      B: "使用系統資源較少",
      C: "通常只能下載HTML程式碼",
      D: "網頁在用戶端的呈現結果一致"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 14,
    answers: ["B"],
    pageNumber: 2,
    topic: "關於巨集(Macro)之敘述，下列何",
    stem: "關於巨集(Macro)之敘述，下列何者有誤？",
    options: {
      A: "執行速度快",
      B: "被呼叫多次時需要的記憶體空間較少",
      C: "編譯器會以巨集取代程式原來的敘述",
      D: "可不需花費時間在堆疊的push與pop動作"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 15,
    answers: ["A"],
    pageNumber: 2,
    topic: "關於遞迴(Recursive)程式之",
    stem: "關於遞迴(Recursive)程式之敘述，下列何者正確？",
    options: {
      A: "通常用在各個擊破法的問題上",
      B: "程式可讀性較差",
      C: "節省記憶體空間",
      D: "節省執行時間"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 16,
    answers: ["A"],
    pageNumber: 2,
    topic: "下列何種測試不適合以黑箱(Black",
    stem: "下列何種測試不適合以黑箱(Black-box)測試運作？",
    options: {
      A: "單元測試",
      B: "系統測試",
      C: "整合測試",
      D: "壓力測試"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 17,
    answers: ["A", "B", "C", "D"],
    pageNumber: 2,
    topic: "執行下列C語言程式，輸出的值為何？",
    stem: `執行下列C語言程式，輸出的值為何？
int i = 0, n = 1, sum = 0;

for(n = 2; n <= 7; n++){
  i = n / 2;
  sum *= i;
}

printf("%d\\n", sum);`,
    options: {
      A: "12",
      B: "36",
      C: "72",
      D: "5040"
    },
    tags: ["computer-principles"],
    answerNote: "PDF 題目前方標記為一律給分；acceptedAnswers 暫列 A-D 並等待人工複核。",
    extractionStatus: "needs-review"
  },
  {
    number: 18,
    answers: ["D"],
    pageNumber: 2,
    topic: "在C語言中，下列何種運算子的運算優先",
    stem: "在C語言中，下列何種運算子的運算優先順位最高？",
    options: {
      A: "加法",
      B: "位元OR運算",
      C: "等式比較",
      D: "取指標指向的值"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 19,
    answers: ["D"],
    pageNumber: 2,
    topic: "待人工審查考點",
    stem: "下列何者非屬關聯式資料庫？",
    options: {
      A: "Microsoft Access",
      B: "dBase",
      C: "PostgreSQL",
      D: "MongoDB"
    },
    tags: ["computer-principles", "security", "database"],
    extractionStatus: "verified"
  },
  {
    number: 20,
    answers: ["C"],
    pageNumber: 2,
    topic: "下列何種資料庫類型的技術門檻最高？",
    stem: "下列何種資料庫類型的技術門檻最高？",
    options: {
      A: "階層式資料庫",
      B: "網狀式資料庫",
      C: "物件導向式資料庫",
      D: "關聯式資料庫"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 21,
    answers: ["A"],
    pageNumber: 2,
    topic: "關於評估演算法之優劣，下列何者時間複",
    stem: "關於評估演算法之優劣，下列何者時間複雜度最高？",
    options: {
      A: "O(n!)",
      B: "O(2n)",
      C: "O(n3)",
      D: "O(log n)"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 22,
    answers: ["B"],
    pageNumber: 2,
    topic: "下列何種排序法屬於穩定排序(Stab",
    stem: "下列何種排序法屬於穩定排序(Stable Sorting)？",
    options: {
      A: "快速排序法",
      B: "氣泡排序法",
      C: "選擇排序法",
      D: "堆積排序法"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 23,
    answers: ["B"],
    pageNumber: 2,
    topic: "關於鏈結串列(Linked List",
    stem: "關於鏈結串列(Linked List)的特點，下列何者正確？",
    options: {
      A: "實作簡單",
      B: "插入資料速度快",
      C: "利用索引存取資料",
      D: "存取資料的時間固定"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 24,
    answers: ["C"],
    pageNumber: 2,
    topic: "下列何種演算法屬於動態規劃法(Dyn",
    stem: "下列何種演算法屬於動態規劃法(Dynamic Programming)？",
    options: {
      A: "Prim演算法",
      B: "Kruskal演算法",
      C: "Dijkstra演算法",
      D: "快速排序"
    },
    tags: ["computer-principles", "algorithm"],
    extractionStatus: "verified"
  },
  {
    number: 25,
    answers: ["A"],
    pageNumber: 2,
    topic: "關於雜湊法(Hashing)之敘述，",
    stem: "關於雜湊法(Hashing)之敘述，下列何者有誤？",
    options: {
      A: "資料需排序過",
      B: "具保密性",
      C: "可資料壓縮",
      D: "無碰撞或溢位的情形下只需讀取1次"
    },
    tags: ["computer-principles", "data-structure"],
    extractionStatus: "verified"
  },
  {
    number: 26,
    answers: ["B"],
    pageNumber: 2,
    topic: "待人工審查考點",
    stem: "關於HTTP之敘述，下列何者有誤？",
    options: {
      A: "HTTP是無狀態的協定",
      B: "HTTP傳輸過程中的資料是加密的",
      C: "HTTP使用TCP進行資料傳輸",
      D: "HTTP預設使用的連接埠為80"
    },
    tags: ["computer-principles", "networking"],
    extractionStatus: "verified"
  },
  {
    number: 27,
    answers: ["A"],
    pageNumber: 3,
    topic: "下列何者為區域網路(LAN)常使用的",
    stem: "下列何者為區域網路(LAN)常使用的標準？",
    options: {
      A: "Ethernet",
      B: "Bluetooth",
      C: "LTE",
      D: "ADSL"
    },
    tags: ["computer-principles", "networking"],
    extractionStatus: "verified"
  },
  {
    number: 28,
    answers: ["C"],
    pageNumber: 3,
    topic: "SSL/TLS",
    stem: "下列何者為SSL(Secure Socket Layer)使用的通訊埠？",
    options: {
      A: "441",
      B: "442",
      C: "443",
      D: "444"
    },
    tags: ["computer-principles", "security"],
    extractionStatus: "verified"
  },
  {
    number: 29,
    answers: ["C"],
    pageNumber: 3,
    topic: "對於網路安全，下列何種措施可以有效防",
    stem: "對於網路安全，下列何種措施可以有效防止未授權的設備接入網路？",
    options: {
      A: "使用防火牆",
      B: "使用NAT",
      C: "使用端口安全",
      D: "使用加密"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 30,
    answers: ["B"],
    pageNumber: 3,
    topic: "待人工審查考點",
    stem: "關於多重協定標籤交換(MPLS)之敘述，下列何者正確？",
    options: {
      A: "MPLS主要依賴目標IP位址來轉發封包",
      B: "MPLS可以基於標籤進行資料轉發",
      C: "MPLS無法與現有的IP網路共存",
      D: "MPLS只適用於區域網路"
    },
    tags: ["computer-principles", "networking"],
    extractionStatus: "verified"
  },
  {
    number: 31,
    answers: ["B"],
    pageNumber: 3,
    topic: "待人工審查考點",
    stem: "下列何種網路攻擊主要利用TCP協定的三向交握機制耗盡伺服器資源？",
    options: {
      A: "DDoS攻擊",
      B: "SYN Flood攻擊",
      C: "Man-in-the-Middle攻擊",
      D: "ARP Spoofing"
    },
    tags: ["computer-principles", "networking"],
    extractionStatus: "verified"
  },
  {
    number: 32,
    answers: ["D"],
    pageNumber: 3,
    topic: "關於Ethernet之敘述，下列何者",
    stem: "關於Ethernet之敘述，下列何者有誤？",
    options: {
      A: "Ethernet使用CSMA/CD進行碰撞偵測",
      B: "以太網中常見的速率包含100 Mbps和1 Gbps",
      C: "以太網標準規範包含多種物理層技術",
      D: "在現代以太網中，CSMA/CD機制仍然廣泛使用於所有網路環境"
    },
    tags: ["computer-principles", "networking"],
    extractionStatus: "verified"
  },
  {
    number: 33,
    answers: ["A"],
    pageNumber: 3,
    topic: "待人工審查考點",
    stem: "在TCP協定中，若接收方的窗口大小為0，發送方會採取何種行為？",
    options: {
      A: "停止傳送資料直到窗口更新",
      B: "持續傳送資料直到接收方滿載",
      C: "自動關閉連線",
      D: "重設連線並重新發送資料"
    },
    tags: ["computer-principles", "networking"],
    extractionStatus: "verified"
  },
  {
    number: 34,
    answers: ["B"],
    pageNumber: 3,
    topic: "待人工審查考點",
    stem: "下列何種技術能有效防禦DDoS攻擊？",
    options: {
      A: "防火牆",
      B: "IPS/IDS",
      C: "NAT",
      D: "安裝防毒軟體"
    },
    tags: ["computer-principles", "networking"],
    extractionStatus: "verified"
  },
  {
    number: 35,
    answers: ["D"],
    pageNumber: 3,
    topic: "下列何種協定係用於網路設備遠程管理？",
    stem: "下列何種協定係用於網路設備遠程管理？",
    options: {
      A: "FTP",
      B: "NAT",
      C: "SMTP",
      D: "SNMP"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 36,
    answers: ["C"],
    pageNumber: 3,
    topic: "下列何種技術可以實現以太網中的循環避",
    stem: "下列何種技術可以實現以太網中的循環避免，防止數據包無限重複傳輸？",
    options: {
      A: "ARP",
      B: "VLAN Trunking Protocol (VTP)",
      C: "Spanning Tree Protocol (STP)",
      D: "MPLS"
    },
    tags: ["computer-principles", "networking"],
    extractionStatus: "verified"
  },
  {
    number: 37,
    answers: ["A"],
    pageNumber: 3,
    topic: "待人工審查考點",
    stem: "在IPsec中，ESP(Encapsulating Security Payload)除了加密封包內容，另可提供下列何種功能 ？",
    options: {
      A: "認證與完整性保護",
      B: "路徑選擇",
      C: "壓縮數據",
      D: "負載均衡"
    },
    tags: ["computer-principles", "networking"],
    extractionStatus: "verified"
  },
  {
    number: 38,
    answers: ["B"],
    pageNumber: 3,
    topic: "在無線網路中，下列何種技術用來避免碰",
    stem: "在無線網路中，下列何種技術用來避免碰撞並允許多個設備共享同一無線頻譜？",
    options: {
      A: "CSMA/CD",
      B: "CSMA/CA",
      C: "STP",
      D: "VLAN"
    },
    tags: ["computer-principles", "networking"],
    extractionStatus: "verified"
  },
  {
    number: 39,
    answers: ["C"],
    pageNumber: 3,
    topic: "SSL/TLS",
    stem: "若瀏覽某網站發現其URL出現https，表示該網站可能出現下列何種狀況？",
    options: {
      A: "該網站在黑名單之列",
      B: "伺服器連線異常",
      C: "該網站的SSL憑證未獲得認證",
      D: "該網站拒絕client使用https連線"
    },
    tags: ["computer-principles", "security"],
    extractionStatus: "verified"
  },
  {
    number: 40,
    answers: ["A"],
    pageNumber: 3,
    topic: "某網站開發者會在密文裡額外添加一串隨",
    stem: "某網站開發者會在密文裡額外添加一串隨機字串，這種防範攻擊的方式稱為下列何者？",
    options: {
      A: "Password salting",
      B: "Password hashing",
      C: "Key hashing",
      D: "Password vinegar"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 41,
    answers: ["A"],
    pageNumber: 4,
    topic: "待人工審查考點",
    stem: `下列 Javascript 的程式片段將造成什麼樣的風險？
var user = getUrlParameter('user');

document.write("<h1>Hi, " + user + " !</h1> ");`,
    options: {
      A: "XSS",
      B: "CSRF",
      C: "Html Scripting",
      D: "Broken Access Control"
    },
    tags: ["computer-principles", "security", "programming"],
    extractionStatus: "verified"
  },
  {
    number: 42,
    answers: ["C"],
    pageNumber: 4,
    topic: "關於如何安全使用SSH連線之敘述，以",
    stem: "關於如何安全使用SSH連線之敘述，以OpenSSH為例，下列何者有誤？",
    options: {
      A: "正確使用憑證登入，會比高強度密碼，安全性更高",
      B: "為避免遭到暴力登入嘗試，可安裝fail2ban來協助建立自動阻擋機制",
      C: "為避免登入後再切換root帳號造成不易追蹤來源，ssh config中的PermitRootLogin應設為 yes",
      D: "若需使用sftp上傳檔案，應另外建立專用帳號並在ssh config中設定ChrootDirectory限制可存取的目錄範圍"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 43,
    answers: ["B", "C"],
    pageNumber: 4,
    topic: "路由器中的一個介面ip位址為192.",
    stem: "路由器中的一個介面ip位址為192.168.192.10/27，請問連接到此介面的區域網路，最多能提供幾個ip位址讓該區域網路之電腦使用？",
    options: {
      A: "13",
      B: "29",
      C: "30",
      D: "31"
    },
    tags: ["computer-principles"],
    answerNote: "PDF 題目前方答案標記列出 B、C；此題保留多答案並等待人工複核。",
    extractionStatus: "needs-review"
  },
  {
    number: 44,
    answers: ["D"],
    pageNumber: 4,
    topic: "VPN",
    stem: "在電子商務中，企業與上下游廠商之間使用的網路為下列何者？",
    options: {
      A: "VPN",
      B: "Internet",
      C: "Intranet",
      D: "Extranet"
    },
    tags: ["computer-principles", "security"],
    extractionStatus: "verified"
  },
  {
    number: 45,
    answers: ["D"],
    pageNumber: 4,
    topic: "管理網路內的流量及處理網路壅塞，係指",
    stem: "管理網路內的流量及處理網路壅塞，係指下列何者？",
    options: {
      A: "組態管理",
      B: "安全管理",
      C: "錯誤管理",
      D: "效能管理"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 46,
    answers: ["D"],
    pageNumber: 4,
    topic: "UTP依EIA/TIA-568B定義",
    stem: "UTP依EIA/TIA-568B定義，腳位排列順序為下列何者？",
    options: {
      A: "藍白 藍 綠白 綠 橙白 橙 棕白 棕",
      B: "棕白 棕 藍白 藍 綠白 綠 橙白 橙",
      C: "橙白 橙 綠白 綠 藍白 藍 棕白 棕",
      D: "橙白 橙 綠白 藍 藍白 綠 棕白 棕"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 47,
    answers: ["D"],
    pageNumber: 4,
    topic: "關於ftp協定之敘述，下列何者正確？",
    stem: "關於ftp協定之敘述，下列何者正確？",
    options: {
      A: "預設使用port 20作資料連線及控制連線",
      B: "預設使用port 21作資料連線及控制連線",
      C: "預設使用port 21作資料連線，port 20作控制連線",
      D: "預設使用port 21作控制連線，port 20作資料連線"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 48,
    answers: ["A"],
    pageNumber: 4,
    topic: "執行「ping 192.168.1.",
    stem: "執行「ping 192.168.1.1 -t」指令，其中的 -t 係指下列何者？",
    options: {
      A: "持續ping",
      B: "將位址解析為主機名稱",
      C: "在封包中設定timeout旗標",
      D: "路由區間識別碼"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 49,
    answers: ["D"],
    pageNumber: 4,
    topic: "下列何者非屬ICMP錯誤報告訊息？",
    stem: "下列何者非屬ICMP錯誤報告訊息？",
    options: {
      A: "轉址",
      B: "無法到達目的地",
      C: "時間超過",
      D: "暫停回應要求"
    },
    tags: ["computer-principles", "networking"],
    extractionStatus: "verified"
  },
  {
    number: 50,
    answers: ["C"],
    pageNumber: 4,
    topic: "待人工審查考點",
    stem: "VPN不具有下列何種特點？",
    options: {
      A: "保密",
      B: "認證",
      C: "IPSec安全協定屬TCP/UDP協定層級",
      D: "保持封包傳送之完整性"
    },
    tags: ["computer-principles", "security", "networking"],
    extractionStatus: "verified"
  },
];

export const questions = createAGroupYearQuestions('113', rawQuestions, reviewedQuestionAnalyses);
