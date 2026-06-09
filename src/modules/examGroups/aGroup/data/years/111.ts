import { reviewedQuestionAnalyses } from '@/modules/examGroups/aGroup/data/years/111ReviewedAnalyses';
import { createAGroupYearQuestions, type RawAGroupQuestion } from '@/modules/examGroups/aGroup/data/years/yearQuestionFactory';

const rawQuestions: RawAGroupQuestion[] = [
  {
    number: 1,
    answers: ["A"],
    pageNumber: 1,
    topic: "待人工審查考點",
    stem: "若將CPU匯流排依傳遞內容進行區分，不包含下列哪一項？",
    options: {
      A: "流程匯流排(Process Bus)：傳送資料流程訊號",
      B: "控制匯流排(Control Bus)：傳送控制資料流程訊號",
      C: "位址匯流排(Address Bus)：傳送資料在記憶體中的位置",
      D: "資料匯流排(Data Bus)：傳送資料流程訊號"
    },
    tags: ["computer-principles", "operating-system"],
    extractionStatus: "verified"
  },
  {
    number: 2,
    answers: ["C"],
    pageNumber: 1,
    topic: "將2個八進位數(502)8與(325",
    stem: "將2個八進位數(502)8與(325)8轉換為二進位數，並逐位元執行OR運算後，所得結果如何以十 六進位數表示？",
    options: {
      A: "(157)16",
      B: "(197)16",
      C: "(1D7)16",
      D: "(1F7)16"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 3,
    answers: ["B"],
    pageNumber: 1,
    topic: "下列何者非屬作業系統(Operati",
    stem: "下列何者非屬作業系統(Operation System)所管理的對象？",
    options: {
      A: "裝置(Device)",
      B: "快取記憶體(Cash Memory)",
      C: "檔案(File)",
      D: "程序(Process)"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 4,
    answers: ["A"],
    pageNumber: 1,
    topic: "下列有關雜湊搜尋法(Hashing",
    stem: "下列有關雜湊搜尋法(Hashing Search)之敘述，何者有誤？",
    options: {
      A: "資料須先進行排序",
      B: "搜尋速度與資料量大小無關",
      C: "程式設計比較複雜",
      D: "保密性較高"
    },
    tags: ["computer-principles", "data-structure"],
    extractionStatus: "verified"
  },
  {
    number: 5,
    answers: ["B"],
    pageNumber: 1,
    topic: "待人工審查考點",
    stem: "使用二分搜尋法(Binary Search)自216個資料中尋找特定的一個資料時，最多要進行多少次比 對?",
    options: {
      A: "7",
      B: "8",
      C: "16",
      D: "108"
    },
    tags: ["computer-principles", "data-structure"],
    extractionStatus: "verified"
  },
  {
    number: 6,
    answers: ["B"],
    pageNumber: 1,
    topic: "作業系統使用最短作業優先(Short",
    stem: "作業系統使用最短作業優先(Shortest Job First)的排程方式來選擇執行順序，假設有4個排程 P1~P4，P1送達時間為0 ms，執行時間為8 ms，P2送達時間為1 ms，執行時間為3 ms，P3送達 時間為2 ms，執行時間為9 ms，P4送達時間為3 ms，執行時間為5 ms，請問平均等待時間為 何？",
    options: {
      A: "7 ms",
      B: "7.25 ms",
      C: "7.5 ms",
      D: "8 ms"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 7,
    answers: ["A"],
    pageNumber: 1,
    topic: "依磁碟陣列(RAID)的資料存放安全",
    stem: "依磁碟陣列(RAID)的資料存放安全性，由高到低排列，下列何者正確？",
    options: {
      A: "RAID 1 RAID 5  RAID 0",
      B: "RAID 0 RAID 5  RAID 1",
      C: "RAID 1 RAID 0  RAID 5",
      D: "RAID 0RAID 1 RAID 5"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 8,
    answers: ["D"],
    pageNumber: 1,
    topic: "某一邏輯電路有2個輸入，分別為dat",
    stem: "某一邏輯電路有2個輸入，分別為data和control，當control為0時，輸出data的值；當control為1 時，輸出data的補數，請問此電路為下列何者？",
    options: {
      A: "AND",
      B: "NAND",
      C: "OR",
      D: "XOR"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 9,
    answers: ["D"],
    pageNumber: 1,
    topic: "待人工審查考點",
    stem: "(101100)2的2補數(2’s complement)為下列哪一項?",
    options: {
      A: "010001",
      B: "010011",
      C: "010101",
      D: "010100"
    },
    tags: ["computer-principles", "data-structure"],
    extractionStatus: "verified"
  },
  {
    number: 10,
    answers: ["B"],
    pageNumber: 1,
    topic: "下列哪一種排序演算法，在最差的情況下",
    stem: "下列哪一種排序演算法，在最差的情況下排序n筆資料，其時間複雜度為O(n log n)？",
    options: {
      A: "氣泡排序法(Bubble Sort)",
      B: "合併排序法(Merge Sort)",
      C: "快速排序法(Quick Sort)",
      D: "基數排序法(Radix Sort)"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 11,
    answers: ["D"],
    pageNumber: 2,
    topic: "待人工審查考點",
    stem: `下列Java片段程式碼中的2個add方法是運用了物件導向程式設計中的何種概念？
Class Sub {
   int add () {…..}
   int add(int x,int y) {…..}
}`,
    options: {
      A: "繼承(Inheritance)",
      B: "抽象化(Abstraction)",
      C: "覆寫(Override)",
      D: "重載(Overload)"
    },
    tags: ["computer-principles", "programming"],
    extractionStatus: "verified"
  },
  {
    number: 12,
    answers: ["C"],
    pageNumber: 2,
    topic: "將一組陣列(Array)的值由主程式",
    stem: "將一組陣列(Array)的值由主程式傳遞給副程式，使用哪一種呼叫方式會使資料的傳遞速度較 快？",
    options: {
      A: "傳名呼叫(Call by Name)",
      B: "傳值呼叫(Call by Value)",
      C: "傳址呼叫(Call by Reference)",
      D: "一樣快"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 13,
    answers: ["C"],
    pageNumber: 2,
    topic: "下列C語言片段程式碼之執行結果為何？",
    stem: `下列C語言片段程式碼之執行結果為何？
int i=0
printf(“%d”,i++);
printf(“%d”,++i);
printf(“%d”,++i);`,
    options: {
      A: "0 1 2",
      B: "0 2 2",
      C: "0 2 3",
      D: "1 2 3"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 14,
    answers: ["B"],
    pageNumber: 2,
    topic: "待人工審查考點",
    stem: "下列Java程式語言中共有8種基本資料型態，依位元長度大到小排列，何者正確？",
    options: {
      A: "double  short  int  byte",
      B: "long  int  char  byte",
      C: "double  float  byte  char",
      D: "long char int boolean"
    },
    tags: ["computer-principles", "programming"],
    extractionStatus: "verified"
  },
  {
    number: 15,
    answers: ["D"],
    pageNumber: 2,
    topic: "待人工審查考點",
    stem: `下列Java片段程式碼，何者正確？
byte a=100;
byte b=200;
byte c=(byte)(a+b);
system.out.print(c);`,
    options: {
      A: "執行時顯示300",
      B: "執行時顯示127",
      C: "執行時出現錯誤",
      D: "編譯失敗"
    },
    tags: ["computer-principles", "programming"],
    extractionStatus: "verified"
  },
  {
    number: 16,
    answers: ["C"],
    pageNumber: 2,
    topic: "在堆疊(Stack)結構上，依序存取",
    stem: "在堆疊(Stack)結構上，依序存取資料如下： push(‘A’)push(‘B’)pop()pop()push(‘C’)push(‘D’)pop()pop() 請問最後1次pop()所得之內容為何？",
    options: {
      A: "‘A’",
      B: "‘B’",
      C: "‘C’",
      D: "‘D’"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 17,
    answers: ["D"],
    pageNumber: 2,
    topic: "將十進位數528.75，轉換為二進位",
    stem: "將十進位數528.75，轉換為二進位數表示，下列何者正確？",
    options: {
      A: "1000011000.101",
      B: "1000010000.101",
      C: "1000011000.11",
      D: "1000010000.11"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 18,
    answers: ["A"],
    pageNumber: 2,
    topic: "請問Amazon EC2是屬於哪一種",
    stem: "請問Amazon EC2是屬於哪一種雲端運算的服務？",
    options: {
      A: "IaaS",
      B: "PaaS",
      C: "SaaS",
      D: "AssS"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 19,
    answers: ["A"],
    pageNumber: 2,
    topic: "待人工審查考點",
    stem: "下列在Java語言中，當陣列(Array)的索引值(Index)超過宣告範圍時，何者正確？",
    options: {
      A: "編譯器會編譯程式，但程式執行時會產生例外(Exception)",
      B: "編譯器會編譯程式，但程式執行時結果可能錯誤",
      C: "編譯器在編譯程式時產生錯誤並停止編譯程式",
      D: "編譯器在編譯程式時產生警告訊息，但仍會編譯程式"
    },
    tags: ["computer-principles", "programming"],
    extractionStatus: "verified"
  },
  {
    number: 20,
    answers: ["C"],
    pageNumber: 2,
    topic: "在C語言中宣告陣列int arrar",
    stem: "在C語言中宣告陣列int arrary[4][2][2]={1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16}，請問array[2][1][1]的 值為何？",
    options: {
      A: "8",
      B: "10",
      C: "12",
      D: "14"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 21,
    answers: ["C"],
    pageNumber: 2,
    topic: "待人工審查考點",
    stem: `下列Python程式碼執行完成後，產生之值為何？
def calnum (n)
 return 1 if (n==1 or n==0) else n * calnum (n-1);
print(calnum(5))`,
    options: {
      A: "24",
      B: "25",
      C: "120",
      D: "125"
    },
    tags: ["computer-principles", "programming"],
    extractionStatus: "verified"
  },
  {
    number: 22,
    answers: ["D"],
    pageNumber: 2,
    topic: "關聯式資料庫中之檢視表(View)，",
    stem: "關聯式資料庫中之檢視表(View)，下列何者有誤？",
    options: {
      A: "使用 View 可以隱藏過濾敏感資料，提高安全性",
      B: "View 是唯讀的，外部使用者無法直接透過 View 去修改內部資料",
      C: "View 之資料來源可以是其他資料的運算結果",
      D: "View 本身有儲存資料"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 23,
    answers: ["D"],
    pageNumber: 3,
    topic: "下列C語言程式片段中，若a=36，b",
    stem: `下列C語言程式片段中，若a=36，b=45，執行結果為何？
main ()
{
   int a,b,r;
while(b!=0)
{
  r=a%b;
  a=b;
  b=r;
}
Printf(“result=%d\\n”,a);
}`,
    options: {
      A: "6",
      B: "7",
      C: "8",
      D: "9"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 24,
    answers: ["B"],
    pageNumber: 3,
    topic: "待人工審查考點",
    stem: "下列有關編譯式語言與直譯式語言，何者有誤？",
    options: {
      A: "直譯式語言在執行時會逐行將程式碼讀取並執行",
      B: "相同程式邏輯條件下，直譯式語言在執行期的執行速度，比編譯式語言來得快",
      C: "Python屬於直譯式語言",
      D: "C++屬於編譯式語言"
    },
    tags: ["computer-principles", "programming"],
    extractionStatus: "verified"
  },
  {
    number: 25,
    answers: ["C"],
    pageNumber: 3,
    topic: "待人工審查考點",
    stem: "下列何者非屬精簡指令(RISC)架構？",
    options: {
      A: "MIPS",
      B: "ARM",
      C: "x86",
      D: "RISC-V"
    },
    tags: ["computer-principles", "networking"],
    extractionStatus: "verified"
  },
  {
    number: 26,
    answers: ["A"],
    pageNumber: 3,
    topic: "待人工審查考點",
    stem: "下列哪一種網際網路通訊協定，是以廣播(Broadcast)方式來進行？",
    options: {
      A: "ARP",
      B: "IPv6",
      C: "DNS",
      D: "BGP"
    },
    tags: ["computer-principles", "networking"],
    extractionStatus: "verified"
  },
  {
    number: 27,
    answers: ["B"],
    pageNumber: 3,
    topic: "待人工審查考點",
    stem: "下列有關IPv6之敘述，何者有誤？",
    options: {
      A: "支援自動組態設定",
      B: "表頭設計不支援QoS機制",
      C: "內建加密機制",
      D: "書寫時各組數字之間以冒號「：」隔開"
    },
    tags: ["computer-principles", "networking"],
    extractionStatus: "verified"
  },
  {
    number: 28,
    answers: ["A"],
    pageNumber: 3,
    topic: "下列有關乙太網路與光纖網路之敘述，何",
    stem: "下列有關乙太網路與光纖網路之敘述，何者有誤？",
    options: {
      A: "光纖類型的乙太網路可分為長距離傳輸的多模光纖與短距離傳輸的單模光纖",
      B: "100Gbps乙太網路目前使用附加標準IEEE 802.3ba",
      C: "光纖網路主要用於連接網路儲存設備",
      D: "光纖網路協定大部分邏輯運行於獨立的硬體晶片而不是在作業系統中"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 29,
    answers: ["D"],
    pageNumber: 3,
    topic: "CIDR(Classless Int",
    stem: "CIDR(Classless Inter-Domain Routing)是一種用來合併數個C級位址的規劃方式。如分配到的網 路是192.168.240.0到192.168.247.0共8個連續的C級位址，則其子網路遮罩為何？",
    options: {
      A: "255.255.192.0",
      B: "255.255.224.0",
      C: "255.255.240.0",
      D: "255.255.248.0"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 30,
    answers: ["D"],
    pageNumber: 3,
    topic: "依開放網路基金會(Open Netw",
    stem: "依開放網路基金會(Open Networking Foundation)有關軟體定義網路(Software Define Network)的 架構說明，不包含下列哪一層？",
    options: {
      A: "應用層(Application Layer)",
      B: "控制層(Control Layer)",
      C: "基礎設備層(Infrastructure Layer)",
      D: "網路層(Network Layer)"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 31,
    answers: ["C"],
    pageNumber: 3,
    topic: "無線通訊技術中，個人化的短距離無線網",
    stem: "無線通訊技術中，個人化的短距離無線網路(Wireless Personal Area Network)使用下列哪一種 通訊標準？",
    options: {
      A: "IEEE 802.11",
      B: "IEEE 802.13",
      C: "IEEE 802.15",
      D: "IEEE 802.16"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 32,
    answers: ["C"],
    pageNumber: 3,
    topic: "下列哪一種設備，可以處理不同格式的資",
    stem: "下列哪一種設備，可以處理不同格式的資料封包，並進行通訊協定轉換、錯誤偵測及網路路 徑控制與位址轉換等？",
    options: {
      A: "交換器",
      B: "橋接器",
      C: "閘道器",
      D: "路由器"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 33,
    answers: ["A"],
    pageNumber: 3,
    topic: "傳輸層安全性協定(TLS)中，下列哪",
    stem: "傳輸層安全性協定(TLS)中，下列哪一種金鑰交換方法因易受中間人攻擊，已很少使用？",
    options: {
      A: "TLS_DH_ANON",
      B: "TLS_DHE",
      C: "TLS_ECDHE",
      D: "TLS_RSA"
    },
    tags: ["computer-principles"],
    extractionStatus: "needs-review"
  },
  {
    number: 34,
    answers: ["B"],
    pageNumber: 3,
    topic: "待人工審查考點",
    stem: "OSI參考模型中，哪一層提供資料壓縮、加密及解密服務？",
    options: {
      A: "應用層(Application Layer)",
      B: "呈現層(Presentation Layer)",
      C: "會談層(Session Layer)",
      D: "傳輸層(Transport Layer)"
    },
    tags: ["computer-principles", "security"],
    extractionStatus: "verified"
  },
  {
    number: 35,
    answers: ["B"],
    pageNumber: 3,
    topic: "待人工審查考點",
    stem: "下列哪一個動態路由協定，屬於鏈路狀態(Link-State)路由協定？",
    options: {
      A: "邊界閘道通訊協定(BGP)",
      B: "開放式最短路徑優先(OSPF)協定",
      C: "路由資訊協定(RIP)",
      D: "Enhanced 企業網路閘道路由協定(EIGRP)"
    },
    tags: ["computer-principles", "networking"],
    extractionStatus: "verified"
  },
  {
    number: 36,
    answers: ["C"],
    pageNumber: 3,
    topic: "待人工審查考點",
    stem: "下列哪一種虛擬私人網路(VPN)通信協定，所使用的演算法未採用256-bit加密？",
    options: {
      A: "L2TP/IPsec",
      B: "Openvpn",
      C: "PPTP",
      D: "SSTP"
    },
    tags: ["computer-principles", "security", "networking"],
    extractionStatus: "verified"
  },
  {
    number: 37,
    answers: ["B"],
    pageNumber: 4,
    topic: "待人工審查考點",
    stem: "IPv4位址在設計時區分為5個等級，其中198.x.y.z屬於哪一個等級？",
    options: {
      A: "B級",
      B: "C級",
      C: "D級",
      D: "E級"
    },
    tags: ["computer-principles", "networking"],
    extractionStatus: "verified"
  },
  {
    number: 38,
    answers: ["D"],
    pageNumber: 4,
    topic: "待人工審查考點",
    stem: "下列有關路由器之敘述，何者有誤？",
    options: {
      A: "具備路由表",
      B: "通常具有兩個以上網路介面",
      C: "具有解讀IP封包的能力",
      D: "運作於TCP/IP模型的傳輸層以上"
    },
    tags: ["computer-principles", "networking"],
    extractionStatus: "verified"
  },
  {
    number: 39,
    answers: ["A"],
    pageNumber: 4,
    topic: "待人工審查考點",
    stem: "IP 封包之協定欄，主要是記載該封包資料所使用的協定。例如TCP、UDP、IGMP、ICMP， 下列哪一項屬於傳輸層的通訊協定？",
    options: {
      A: "TCP與UDP",
      B: "IGMP與UDP",
      C: "IGMP與TCP",
      D: "IGMP與ICMP"
    },
    tags: ["computer-principles", "networking"],
    extractionStatus: "verified"
  },
  {
    number: 40,
    answers: ["D"],
    pageNumber: 4,
    topic: "物聯網的發展，使低功耗廣域網路(Lo",
    stem: "物聯網的發展，使低功耗廣域網路(Low Power Wide Area Network)應用需求大增，下列哪一項 技術不屬於長距離通訊？",
    options: {
      A: "LoRa",
      B: "NB-IoT",
      C: "Sigfox",
      D: "Zigbee"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 41,
    answers: ["B"],
    pageNumber: 4,
    topic: "下列有關防火牆(Firewall)之",
    stem: "下列有關防火牆(Firewall)之敘述，何者有誤？",
    options: {
      A: "無法過濾內部網路封包",
      B: "可以阻擋病毒攻擊",
      C: "可以阻擋外界對內部網路所發動的攻擊",
      D: "主要分為網路層及應用層防火牆"
    },
    tags: ["computer-principles"],
    extractionStatus: "needs-review"
  },
  {
    number: 42,
    answers: ["C"],
    pageNumber: 4,
    topic: "待人工審查考點",
    stem: "下列何者非使用TCP/IP 協定中的UDP 做為通訊服務的基礎？",
    options: {
      A: "簡單網路管理協定(SNMP)",
      B: "網路時間協定(NTP)",
      C: "網際網路控制訊息協定(ICMP)",
      D: "動態主機組態協定(DHCP)"
    },
    tags: ["computer-principles", "networking"],
    extractionStatus: "verified"
  },
  {
    number: 43,
    answers: ["D"],
    pageNumber: 4,
    topic: "STRIDE是一種識別弱點與威脅的簡",
    stem: "STRIDE是一種識別弱點與威脅的簡單作法，其名稱來自6個威脅類型的英文字首縮寫，下列 何者有誤？",
    options: {
      A: "偽冒(Spoofing)",
      B: "否認(Repudiation)",
      C: "拒絕存取服務(Denial of Service)",
      D: "入侵(Intrusion)"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 44,
    answers: ["C"],
    pageNumber: 4,
    topic: "ISO27001：2013 版，計有",
    stem: "ISO27001：2013 版，計有幾個領域與幾個控制目標？",
    options: {
      A: "11 與 35",
      B: "11 與 39",
      C: "14 與35",
      D: "14 與 39"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 45,
    answers: ["B"],
    pageNumber: 4,
    topic: "下列有關傳統入侵偵測防禦系統(IDP",
    stem: "下列有關傳統入侵偵測防禦系統(IDPS)之敘述，何者有誤？",
    options: {
      A: "可以防止蠕蟲由外部入侵至組織網路內部",
      B: "可以使用packet-based 做為檢查流量內容",
      C: "可以破解駭客閃躲(Evasion)手法",
      D: "可以將防火牆存取控制清單(ACL)之功能包含在內"
    },
    tags: ["computer-principles", "security"],
    extractionStatus: "verified"
  },
  {
    number: 46,
    answers: ["A"],
    pageNumber: 4,
    topic: "HTTP",
    stem: "下列常見的電子郵件存取協定，哪一種是送出協定(Push Protocol)？",
    options: {
      A: "SMTP",
      B: "HTTP",
      C: "POP",
      D: "IMAP"
    },
    tags: ["computer-principles", "networking"],
    extractionStatus: "verified"
  },
  {
    number: 47,
    answers: ["A"],
    pageNumber: 4,
    topic: "無線區域網路的標準為IEEE 802",
    stem: "無線區域網路的標準為IEEE 802.11系列，請問俗稱第五代Wi-Fi是哪一個標準？",
    options: {
      A: "802.11ac",
      B: "802.11ax",
      C: "802.11g",
      D: "802.11n"
    },
    tags: ["computer-principles", "networking"],
    extractionStatus: "verified"
  },
  {
    number: 48,
    answers: ["D"],
    pageNumber: 4,
    topic: "待人工審查考點",
    stem: "現行3個主要的無線區域網路安全性機制是：WEP、WPA及WPA2，下列哪一項非其所使用之 安全防護技術？",
    options: {
      A: "TKIP",
      B: "AES",
      C: "CCMP",
      D: "DES"
    },
    tags: ["computer-principles", "networking"],
    extractionStatus: "verified"
  },
  {
    number: 49,
    answers: ["D"],
    pageNumber: 4,
    topic: "待人工審查考點",
    stem: "下列哪一項非屬ISO 制定7498-4 號標準文件中所提到之網路管理功能?",
    options: {
      A: "故障管理",
      B: "組態管理",
      C: "安全管理",
      D: "事件管理"
    },
    tags: ["computer-principles", "data-structure"],
    extractionStatus: "verified"
  },
  {
    number: 50,
    answers: ["C"],
    pageNumber: 4,
    topic: "下列有關加密系統與數位簽章之敘述，何",
    stem: `下列有關加密系統與數位簽章之敘述，何者正確？
○1 對稱性加密法加密速度快，適合長度較長與大量的資料
○2 目前普遍使用的非對稱性加密法為IDEA
○3 非對稱性加密公開金鑰必須由憑證管理中心簽發
○4 數位簽章的運作方式是以公開金鑰與雜湊函數互相搭配使用`,
    options: {
      A: "○1 ○2 ○3",
      B: "○1 ○2 ○4",
      C: "○1 ○3 ○4",
      D: "○2 ○3 ○4"
    },
    tags: ["computer-principles"],
    extractionStatus: "needs-review"
  },
];

export const questions = createAGroupYearQuestions('111', rawQuestions, reviewedQuestionAnalyses);
