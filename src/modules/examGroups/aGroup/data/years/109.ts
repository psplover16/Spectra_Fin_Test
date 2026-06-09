import { reviewedQuestionAnalyses } from '@/modules/examGroups/aGroup/data/years/109ReviewedAnalyses';
import { createAGroupYearQuestions, type RawAGroupQuestion } from '@/modules/examGroups/aGroup/data/years/yearQuestionFactory';

const rawQuestions: RawAGroupQuestion[] = [
  {
    number: 1,
    answers: ["C"],
    pageNumber: 1,
    topic: "下列何者為人工智慧運算常用的程式語言",
    stem: "下列何者為人工智慧運算常用的程式語言？",
    options: {
      A: "Fortran",
      B: "BASIC",
      C: "PROLOG",
      D: "COBOL"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 2,
    answers: ["D"],
    pageNumber: 1,
    topic: "右列數字27、7、36、15、1、9",
    stem: "右列數字27、7、36、15、1、9，利用氣泡排序法由小至大排列，其第二次結果為何？",
    options: {
      A: "7、27、36、15、1、9",
      B: "7、27、9、1、15、36",
      C: "7、15、9、1、27、36",
      D: "7、15、1、9、27、36"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 3,
    answers: ["B"],
    pageNumber: 1,
    topic: "下列何者無法提升磁碟效能最佳化？",
    stem: "下列何者無法提升磁碟效能最佳化？",
    options: {
      A: "磁碟重組",
      B: "磁碟加密",
      C: "掃描修復磁碟錯誤",
      D: "清除磁碟內不必要檔案"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 4,
    answers: ["A"],
    pageNumber: 1,
    topic: "一張圖形大小為1280 × 1024",
    stem: "一張圖形大小為1280 × 1024標準RGB全彩影像，未經壓縮資料量約為下列何者？",
    options: {
      A: "3.84 MB",
      B: "1.4 MB",
      C: "1.4 GB",
      D: "10 MB"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 5,
    answers: ["C"],
    pageNumber: 1,
    topic: "電腦主機板利用連接埠(I/O por",
    stem: "電腦主機板利用連接埠(I/O port)連接不同輸出入設備，如螢幕、滑鼠、磁碟機等，下列何者 不是連接埠規格？",
    options: {
      A: "USB",
      B: "SCSI",
      C: "CISC",
      D: "RS-232"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 6,
    answers: ["B"],
    pageNumber: 1,
    topic: "待人工審查考點",
    stem: "下列何者不是CPU行程協調運作時，發生死結(deadlock)的必要條件？",
    options: {
      A: "hold and wait",
      B: "non-circular wait",
      C: "no preemptive",
      D: "mutual exclusion"
    },
    tags: ["computer-principles", "operating-system"],
    extractionStatus: "verified"
  },
  {
    number: 7,
    answers: ["A"],
    pageNumber: 1,
    topic: "物件導向程式設計(Object-Or",
    stem: "物件導向程式設計(Object-Oriented Program Design)的主要特色，下列何者有誤？",
    options: {
      A: "多執行緒",
      B: "封裝",
      C: "繼承",
      D: "多型"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 8,
    answers: ["C"],
    pageNumber: 1,
    topic: "若以直接存取(direct acce",
    stem: "若以直接存取(direct access)方式進行檔案資料讀寫，下列何者有誤？",
    options: {
      A: "適用大量資訊即時存取",
      B: "將檔案分成有編號區段",
      C: "循序一筆一筆讀寫資料",
      D: "允許讀寫任意區段"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 9,
    answers: ["D"],
    pageNumber: 1,
    topic: "待人工審查考點",
    stem: "CPU排程中以行程(process)所需CPU週期長短為依據，若使用固定CPU執行時間，超過此段 時間則被迫捨棄，等待下次循環的排程方法為下列何者？",
    options: {
      A: "SJF",
      B: "FCFS",
      C: "Priority",
      D: "Round Robin"
    },
    tags: ["computer-principles", "operating-system"],
    extractionStatus: "verified"
  },
  {
    number: 10,
    answers: ["D"],
    pageNumber: 1,
    topic: "若假設(365)10 = (731)",
    stem: "若假設(365)10 = (731)R，則下列何者正確？",
    options: {
      A: "R = 4",
      B: "R = 5",
      C: "R = 6",
      D: "R = 7"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 11,
    answers: ["A"],
    pageNumber: 2,
    topic: "待人工審查考點",
    stem: "依CPU與I/O溝通方式(輪詢、中斷、直接記憶體存取DMA)比較CPU利用率排名，下列何者正 確？",
    options: {
      A: "輪詢最差",
      B: "中斷最差",
      C: "直接記憶體存取最差",
      D: "中斷最佳"
    },
    tags: ["computer-principles", "operating-system"],
    extractionStatus: "verified"
  },
  {
    number: 12,
    answers: ["B"],
    pageNumber: 2,
    topic: "待人工審查考點",
    stem: "一個CPU行程如果沒有配置足夠的實體記憶體空間(frames)時，將產生極高的分頁錯誤率，導 致高頻率分頁置出/置入(swap-in/swap-out)切換活動，此為下列何者？",
    options: {
      A: "週期盜取(Cycle Stealing)",
      B: "輾轉現象(Thrashing)",
      C: "貝勒地異常(Belady’s Anomaly)",
      D: "內部碎裂(Internal fragmentation)"
    },
    tags: ["computer-principles", "operating-system"],
    extractionStatus: "verified"
  },
  {
    number: 13,
    answers: ["A"],
    pageNumber: 2,
    topic: "下列何種電腦元件的存取速度最快？",
    stem: "下列何種電腦元件的存取速度最快？",
    options: {
      A: "暫存器(register)",
      B: "固態硬碟(SSD)",
      C: "DRAM",
      D: "快取記憶體(cache)"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 14,
    answers: ["C"],
    pageNumber: 2,
    topic: "下列何者不是系統呼叫(system",
    stem: "下列何者不是系統呼叫(system call)的特性？",
    options: {
      A: "進入監督模式(monitor mode)執行",
      B: "有內容切換(context switch)發生",
      C: "不引起中斷(interrupt)",
      D: "從一個行程轉換到另一個行程"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 15,
    answers: ["D"],
    pageNumber: 2,
    topic: "行程(process)在執行時會依據",
    stem: "行程(process)在執行時會依據目前需求而有不同的狀態，下列何者並非狀態之一？",
    options: {
      A: "等待(wait)",
      B: "就緒(ready)",
      C: "執行(running)",
      D: "輸出(output)"
    },
    tags: ["computer-principles", "operating-system"],
    extractionStatus: "verified"
  },
  {
    number: 16,
    answers: ["B"],
    pageNumber: 2,
    topic: "合作行程(cooperating p",
    stem: "合作行程(cooperating process)可用臨界區間(Critical Section)來達成行程溝通(process communication) ，下列何者並非臨界區間需具備的性質？",
    options: {
      A: "可進行性(progress)",
      B: "跨平台(cross platform)",
      C: "有限性等待(bounded waiting)",
      D: "互斥(mutual exclusion)"
    },
    tags: ["computer-principles", "operating-system"],
    extractionStatus: "verified"
  },
  {
    number: 17,
    answers: ["D"],
    pageNumber: 2,
    topic: "待人工審查考點",
    stem: "允許很多使用者同時共用一部電腦，同時執行多個程式並分配固定長度CPU時間，採用輪流 執行法則(round robin scheduling)，此為下列何種作業系統？",
    options: {
      A: "嵌入式系統",
      B: "平行系統",
      C: "分散式系統",
      D: "分時系統"
    },
    tags: ["computer-principles", "operating-system"],
    extractionStatus: "verified"
  },
  {
    number: 18,
    answers: ["C"],
    pageNumber: 2,
    topic: "某電腦系統支援分頁虛擬記憶體，目前記",
    stem: "某電腦系統支援分頁虛擬記憶體，目前記憶體有4個分頁框(page frames)，若採用最近較少使 用(Least-Recently-Used)分頁替換演算法，請問下列頁碼參考之串列，總共會發生多少次分頁 錯誤(page faults)？串列[1, 2, 3, 4, 2, 1, 5, 6, 2, 1, 2, 3, 7, 6, 3, 2, 1, 2, 3, 6]",
    options: {
      A: "7",
      B: "8",
      C: "10",
      D: "12"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 19,
    answers: ["C"],
    pageNumber: 2,
    topic: "下列何者並非入侵偵測系統(IDS)具",
    stem: "下列何者並非入侵偵測系統(IDS)具有的主要功能？",
    options: {
      A: "蒐集目前網路系統狀態",
      B: "預警通知管理者",
      C: "備份資料加密",
      D: "判斷是否有入侵行為發生"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 20,
    answers: ["C"],
    pageNumber: 2,
    topic: "演算法的時間複雜度表示法中，下列何者",
    stem: "演算法的時間複雜度表示法中，下列何者表示指數時間(exponential time)複雜度？",
    options: {
      A: "Ο(1)",
      B: "Ο(n^2)",
      C: "Ο(2^n)",
      D: "Ο(n!)"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 21,
    answers: ["D"],
    pageNumber: 2,
    topic: "下列演算法的描述，何者正確？",
    stem: "下列演算法的描述，何者正確？",
    options: {
      A: "循序搜尋法之資料須先排序過",
      B: "二分搜尋法適用於動態資料",
      C: "雜湊法不具保密性",
      D: "二分搜尋法之資料須先排序過"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 22,
    answers: ["B"],
    pageNumber: 2,
    topic: "待人工審查考點",
    stem: "CPU控制單元實作分為硬體接線法(hardwired control)和微程式設計(MicroProgramming)，下列 描述何者正確？",
    options: {
      A: "微程式設計執行速度較快",
      B: "微程式設計製作軔體(firmware)",
      C: "硬體接線法設計較簡單",
      D: "硬體接線法成本較低"
    },
    tags: ["computer-principles", "operating-system"],
    extractionStatus: "verified"
  },
  {
    number: 23,
    answers: ["D"],
    pageNumber: 2,
    topic: "待人工審查考點",
    stem: "下列何者屬於編譯式程式語言？",
    options: {
      A: "UNIX shell",
      B: "Javascript",
      C: "Perl",
      D: "COBOL"
    },
    tags: ["computer-principles", "programming"],
    extractionStatus: "verified"
  },
  {
    number: 24,
    answers: ["C"],
    pageNumber: 2,
    topic: "利用卡諾圖(Karnaugh map",
    stem: "利用卡諾圖(Karnaugh map)化簡布林函數F(X, Y) = X’ + XY，下列何者正確？",
    options: {
      A: "X’ + Y’",
      B: "X + Y",
      C: "X’ + Y",
      D: "X + Y’"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 25,
    answers: ["B"],
    pageNumber: 3,
    topic: "如右圖二元樹，下列前序、中序、後序追",
    stem: "如右圖二元樹（圖形：1 為根；2、3 為其左右子節點；2 的子節點為 4、5；3 的子節點為 6、7），下列前序、中序、後序追蹤順序何者正確？",
    options: {
      A: "前序 - 1245376",
      B: "中序 - 4251637",
      C: "前序 - 1254367",
      D: "後序 - 4526713"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 26,
    answers: ["A"],
    pageNumber: 3,
    topic: "待人工審查考點",
    stem: "TCP/IP協定中不同層有不同的位址名稱，下列敘述何者有誤？",
    options: {
      A: "MAC位址(address)用於實體層(Physical Layer)",
      B: "IP位址用於網路層(Network Layer)",
      C: "Port編號用於傳輸層(Transport Layer)",
      D: "電子郵件位址用於應用層(Application Layer)"
    },
    tags: ["computer-principles", "networking"],
    extractionStatus: "verified"
  },
  {
    number: 27,
    answers: ["C"],
    pageNumber: 3,
    topic: "關於網路設備之敘述，下列何者有誤？",
    stem: "關於網路設備之敘述，下列何者有誤？",
    options: {
      A: "中繼器(repeater)用於增強纜線上之訊號，使網路訊號傳送更遠",
      B: "橋接器(bridge)可決定讓資料通過，連結至同網路的不同區段",
      C: "閘道器(gateway)無法連接不同通信協定的異質網路",
      D: "路由器(router)可連接不同的區域網路或廣域網路"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 28,
    answers: ["D"],
    pageNumber: 3,
    topic: "待人工審查考點",
    stem: "下列何項服務用來查詢IP位址所對應之MAC位址？",
    options: {
      A: "FTP",
      B: "NNTP",
      C: "DNS",
      D: "ARP"
    },
    tags: ["computer-principles", "networking"],
    extractionStatus: "verified"
  },
  {
    number: 29,
    answers: ["B"],
    pageNumber: 3,
    topic: "物聯網(Internet of Th",
    stem: "物聯網(Internet of Things)於設計上可分成3層之架構，下列何項不屬於其架構成員？",
    options: {
      A: "網路層",
      B: "鏈結層",
      C: "應用層",
      D: "感知層"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 30,
    answers: ["A"],
    pageNumber: 3,
    topic: "於手機上之某APP(應用程式)可感應",
    stem: "於手機上之某APP(應用程式)可感應信用卡之資料內容並呈現於螢幕，它是一種點對點的通 訊技術，以13.56 MHz頻率在20 公分距離內運作，此項技術為下列何者？",
    options: {
      A: "NFC",
      B: "Bluetooth",
      C: "Wi-Fi",
      D: "WiMAX"
    },
    tags: ["computer-principles", "networking"],
    extractionStatus: "verified"
  },
  {
    number: 31,
    answers: ["C"],
    pageNumber: 3,
    topic: "下列何項網路的連接拓樸(topolo",
    stem: "下列何項網路的連接拓樸(topology)，可能會有隱藏節點(hidden node)的狀況發生？",
    options: {
      A: "Ring network",
      B: "Star network",
      C: "Ad hoc network",
      D: "Bus network"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 32,
    answers: ["B"],
    pageNumber: 3,
    topic: "超級(super)Wi-Fi 也就是",
    stem: "超級(super)Wi-Fi 也就是wireless regional area network(WRAN)的概念，其採用下列何項規範？",
    options: {
      A: "802.16",
      B: "802.22",
      C: "802.11ac",
      D: "802.11n"
    },
    tags: ["computer-principles", "networking"],
    extractionStatus: "verified"
  },
  {
    number: 33,
    answers: ["D"],
    pageNumber: 3,
    topic: "行動電話本身是可移動性，於通話過程中",
    stem: "行動電話本身是可移動性，於通話過程中從目前使用的基地台頻道，轉換到鄰近基地台的另 一個可使用之頻道，以維持通話持續，此項動作稱為下列何者？",
    options: {
      A: "交換(switch)",
      B: "路由(routing)",
      C: "追蹤(tracking)",
      D: "交遞(handoff)"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 34,
    answers: ["C"],
    pageNumber: 3,
    topic: "待人工審查考點",
    stem: "國際標準組織(ISO)訂定的OSI七層網路通訊模型，何層負責建立、維護與切斷連線、對話控 制等工作？",
    options: {
      A: "網路層(Network Layer)",
      B: "資料鏈結層(Data Link Layer)",
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
    topic: "下列何項無線通訊協定的傳輸速度最快？",
    stem: "下列何項無線通訊協定的傳輸速度最快？",
    options: {
      A: "802.11a",
      B: "802.11ac",
      C: "802.11b",
      D: "802.11n"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 36,
    answers: ["A"],
    pageNumber: 3,
    topic: "OSI 七層網路通訊模型，資料由上層",
    stem: "OSI 七層網路通訊模型，資料由上層往下層傳遞之封裝順序，下列何者正確？①資料(data) ②位元(bit) ③區段(segment) ④封包(packet) ⑤訊框(frame)",
    options: {
      A: "①③④⑤②",
      B: "①②④③⑤",
      C: "①④③⑤②",
      D: "①⑤②④③"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 37,
    answers: ["D"],
    pageNumber: 3,
    topic: "下列何者為一個半雙工傳輸之網路系統特",
    stem: "下列何者為一個半雙工傳輸之網路系統特性？",
    options: {
      A: "單向傳輸",
      B: "單向傳輸，但可以同時進行",
      C: "雙向傳輸，且可同時進行",
      D: "雙向傳輸，但不可同時進行"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 38,
    answers: ["C"],
    pageNumber: 4,
    topic: "某路由器已建立下列路由表： 位址 子",
    stem: "某路由器已建立下列路由表：\n位址 | 子網路遮罩 | 下一站(Next hop)\n128.96.39.0 | 255.255.255.128 | 介面m0\n128.96.39.128 | 255.255.255.128 | 介面m1\n128.96.40.0 | 255.255.255.128 | R2\n192.4.153.0 | 255.255.255.192 | R3\n* (默認) | - | R4\n如果目的位址為128.96.40.12之封包到達路由器，請問此封包之下一站為何？",
    options: {
      A: "介面m0",
      B: "介面m1",
      C: "R2",
      D: "R3"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 39,
    answers: ["D"],
    pageNumber: 4,
    topic: "有4個CIDR (Classless",
    stem: "有4個CIDR (Classless InterDomain Routing)位址： 212.56.132.0/24 212.56.133.0/24 212.56.134.0/24 212.56.135.0/24 如進行最大可能的聚合為一組CIDR位址，下列何項正確？",
    options: {
      A: "212.56.133.0/23",
      B: "212.56.132.0/23",
      C: "212.56.134.0/22",
      D: "212.56.132.0/22"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 40,
    answers: ["B"],
    pageNumber: 4,
    topic: "待人工審查考點",
    stem: "下列何者並非TCP封包表頭當中的欄位資訊？",
    options: {
      A: "循序(sequence)編號",
      B: "目的IP位址(destination IP address)",
      C: "來源連接埠編號(source port)",
      D: "流量視窗大小(window size)"
    },
    tags: ["computer-principles", "networking"],
    extractionStatus: "verified"
  },
  {
    number: 41,
    answers: ["A"],
    pageNumber: 4,
    topic: "下列何者為傳輸快且不受電路干擾(具保",
    stem: "下列何者為傳輸快且不受電路干擾(具保密性)之電腦網路通訊傳輸媒體？",
    options: {
      A: "光纖",
      B: "電話線",
      C: "微波",
      D: "無線電"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 42,
    answers: ["C"],
    pageNumber: 4,
    topic: "下列何項電腦網路傳輸媒介，收訊端必須",
    stem: "下列何項電腦網路傳輸媒介，收訊端必須對準發射端且誤差不得超過收訊角度？",
    options: {
      A: "無線電",
      B: "微波",
      C: "紅外線",
      D: "雙絞線"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 43,
    answers: ["B"],
    pageNumber: 4,
    topic: "個人無線網路之藍芽(Bluetoot",
    stem: "個人無線網路之藍芽(Bluetooth)，其RF(radio frequency)是屬於OSI參考模型的何項？",
    options: {
      A: "應用層",
      B: "實體層",
      C: "傳輸層",
      D: "網路層"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 44,
    answers: ["C"],
    pageNumber: 4,
    topic: "下列何項設備具有將數位訊號轉換為類比",
    stem: "下列何項設備具有將數位訊號轉換為類比訊號之功能？",
    options: {
      A: "交換器(switch)",
      B: "路由器(router)",
      C: "數據機(modem)",
      D: "集線器(hub)"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 45,
    answers: ["C"],
    pageNumber: 4,
    topic: "將所有網路節點放在一條纜線上的網路拓",
    stem: "將所有網路節點放在一條纜線上的網路拓樸為下列何者？",
    options: {
      A: "廣域網路",
      B: "環狀網路",
      C: "匯流排網路",
      D: "星形網路"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 46,
    answers: ["A"],
    pageNumber: 4,
    topic: "待人工審查考點",
    stem: "於IPv4網路中，IP位址為142.50.140.22，若子網路遮罩為255.255.224.0/19，則其子網路位址 (netid)為下列何者？",
    options: {
      A: "142.50.128.0",
      B: "142.50.130.0",
      C: "142.50.132.0",
      D: "142.50.136.0"
    },
    tags: ["computer-principles", "networking"],
    extractionStatus: "verified"
  },
  {
    number: 47,
    answers: ["D"],
    pageNumber: 4,
    topic: "HTTP",
    stem: "下列何項通訊協定不屬於應用層(Application Layer)之協定？",
    options: {
      A: "HTTP",
      B: "POP3",
      C: "FTP",
      D: "ARP"
    },
    tags: ["computer-principles", "networking"],
    extractionStatus: "verified"
  },
  {
    number: 48,
    answers: ["B"],
    pageNumber: 4,
    topic: "DNS",
    stem: "下列何項網路設備負責遞減封包存活期(time to live, TTL)之數值？",
    options: {
      A: "交換器",
      B: "路由器",
      C: "DNS伺服器",
      D: "橋接器"
    },
    tags: ["computer-principles", "networking"],
    extractionStatus: "verified"
  },
  {
    number: 49,
    answers: ["C"],
    pageNumber: 4,
    topic: "數位用戶專線(digital sub",
    stem: "數位用戶專線(digital subscriber line)為下列何項多工技術的結合應用？",
    options: {
      A: "AM與FM",
      B: "AM與TDM",
      C: "FDM與TDM",
      D: "FDM與FM"
    },
    tags: ["computer-principles"],
    extractionStatus: "verified"
  },
  {
    number: 50,
    answers: ["A"],
    pageNumber: 4,
    topic: "待人工審查考點",
    stem: "於VPN網路環境中，PPTP(point-to-point tunnel protocol)的運作，使用下列何者為預設TCP連接 埠號？",
    options: {
      A: "1723",
      B: "2146",
      C: "3306",
      D: "3389"
    },
    tags: ["computer-principles", "security", "networking"],
    extractionStatus: "verified"
  },
];

export const questions = createAGroupYearQuestions('109', rawQuestions, reviewedQuestionAnalyses);
