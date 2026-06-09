import { reviewedQuestionAnalyses } from '@/modules/examGroups/aGroup/data/years/108ReviewedAnalyses';
import { createAGroupYearQuestions, type RawAGroupQuestion } from '@/modules/examGroups/aGroup/data/years/yearQuestionFactory';

const rawQuestions: RawAGroupQuestion[] = [
  {
    number: 1,
    answers: ['C'],
    pageNumber: 1,
    topic: '監督式學習與分群',
    stem:
      '機器學習之監督式學習使用資料(含特徵及標籤)，透過演算法進行訓練產生模型。下列演算法中，何者非此類監督式學習常用之演算法？',
    options: {
      A: '二元分類',
      B: '多元分類',
      C: '分群',
      D: '迴歸分析'
    },
    tags: ['computer-principles', 'machine-learning'],
    extractionStatus: 'verified'
  },
  {
    number: 2,
    answers: ['A'],
    pageNumber: 1,
    topic: '記憶體位址線',
    stem: '若要定址32 M記憶體，最少需使用幾條位址線？',
    options: {
      A: '25',
      B: '26',
      C: '27',
      D: '28'
    },
    tags: ['computer-principles', 'memory-addressing'],
    extractionStatus: 'verified'
  },
  {
    number: 3,
    answers: ['C'],
    pageNumber: 1,
    topic: '快取平均存取時間',
    stem:
      '記憶體系統相關資料如下：Cache 存取時間為 15 ns、Cache容量為 C Kbytes、記憶體存取時間為 200 ns。Cache Hit Ratio值 H與 Cache容量值 C之關係為 H = 0.5 + 0.1 × log2 C，其中 2 ≤ C ≤ 32。若期望Cache 存取時間≤ 35 ns，所需 Cache容量值 C最小為何？',
    options: {
      A: '4',
      B: '8',
      C: '16',
      D: '32'
    },
    tags: ['computer-principles', 'cache'],
    extractionStatus: 'verified'
  },
  {
    number: 4,
    answers: ['D'],
    pageNumber: 1,
    topic: '雲端運算特徵',
    stem: '有關雲端運算，下列何者正確？',
    options: {
      A: '雲端運算等同邊緣運算',
      B: '分為SaaS、PaaS、IaaS 3種佈署模式',
      C: '有公有雲、私有雲、混和雲等3種服務模式',
      D: '具On-Demand Self-Service、Broad Network Access、Resource Pooling、Rapid Elasticity與Measured Service 5個特徵'
    },
    tags: ['computer-principles', 'cloud-computing'],
    extractionStatus: 'verified'
  },
  {
    number: 5,
    answers: ['B'],
    pageNumber: 1,
    topic: '非揮發性記憶體',
    stem: 'DRAM、SRAM、ROM、Flash Memory 4類記憶體，其中屬於非揮發性記憶體共有幾類？',
    options: {
      A: '1',
      B: '2',
      C: '3',
      D: '4'
    },
    tags: ['computer-principles', 'memory'],
    extractionStatus: 'verified'
  },
  {
    number: 6,
    answers: ['D'],
    pageNumber: 1,
    topic: '編譯器與機器碼',
    stem: '使用何種軟體可將高階語言轉換成機器碼(Machine Code)？',
    options: {
      A: '組譯器(Assembler)',
      B: '編輯器(Editor)',
      C: '載入程式(Loader)',
      D: '編譯器(Compiler)'
    },
    tags: ['computer-principles', 'programming-language'],
    extractionStatus: 'verified'
  },
  {
    number: 7,
    answers: ['B'],
    pageNumber: 1,
    topic: '布林函數化簡',
    stem:
      '化簡布林函數f(x,y,z) = x′y′z′ + xy′z′ + xy′z + xyz + xyz′，其最簡式為何？',
    options: {
      A: 'xy + z′',
      B: 'x + y′z′',
      C: 'x′y + z′',
      D: 'x + yz′'
    },
    tags: ['computer-principles', 'boolean-algebra'],
    extractionStatus: 'verified'
  },
  {
    number: 8,
    answers: ['A'],
    pageNumber: 1,
    topic: 'CPU 指令時間',
    stem: '若CPU每秒可執行10,000,000,000個指令，則執行1個指令的時間？',
    options: {
      A: '0.1 奈秒(ns)',
      B: '0.1 微秒(μs)',
      C: '1 毫秒(ms)',
      D: '1 微秒(μs)'
    },
    tags: ['computer-principles', 'cpu-performance'],
    extractionStatus: 'verified'
  },
  {
    number: 9,
    answers: ['D'],
    pageNumber: 2,
    topic: '傳址呼叫參數別名',
    stem: `副程式傳參數採傳址方式(call by address or reference)，以下程式執行完最後產出值為何？
begin
  A,B:integer;
  procedure P(X,Y,Z:integer);
  begin
    Y=Y+1;
    Z=Z+X+2×Z
  begin
    A=3;
    B=3;
    P(A+B,A,A);
    print A;
  end;
end`,
    options: {
      A: '3',
      B: '6',
      C: '17',
      D: '18'
    },
    tags: ['computer-principles', 'parameter-passing'],
    extractionStatus: 'verified'
  },
  {
    number: 10,
    answers: ['D'],
    pageNumber: 2,
    topic: '營業秘密法',
    stem: '下列何者可用來保護隱含在產品與技術背後之程式或設計，避免這些資訊洩漏給競爭對手？',
    options: {
      A: '專利法',
      B: '著作權法',
      C: '個人資料保護法',
      D: '營業秘密法'
    },
    tags: ['computer-principles', 'intellectual-property'],
    extractionStatus: 'verified'
  },
  {
    number: 11,
    answers: ['B'],
    pageNumber: 2,
    topic: '物聯網三層架構',
    stem: '物聯網之架構大致分成3個層次，下列何者有誤？',
    options: {
      A: '應用層',
      B: '可視層',
      C: '感知層',
      D: '網路層'
    },
    tags: ['computer-principles', 'iot'],
    extractionStatus: 'verified'
  },
  {
    number: 12,
    answers: ['B'],
    pageNumber: 2,
    topic: 'Apache Spark',
    stem: 'Apache Spark 是開放原始碼叢集運算框架，用來建置大數據平台，下列敘述何者有誤？',
    options: {
      A: '運算速度快',
      B: 'GraphY是Spark上的分散式圖形處理框架',
      C: '可在雲端運算平台執行',
      D: '支援多種語言(Python、Java、R…)'
    },
    tags: ['computer-principles', 'big-data'],
    extractionStatus: 'verified'
  },
  {
    number: 13,
    answers: ['C'],
    pageNumber: 2,
    topic: '十進位轉二進位',
    stem: '將十進位678.625，轉為二進位表示，下列何者正確？',
    options: {
      A: '1010100111.101',
      B: '1010100111.110',
      C: '1010100110.101',
      D: '1010100110.110'
    },
    tags: ['computer-principles', 'number-system'],
    extractionStatus: 'verified'
  },
  {
    number: 14,
    answers: ['A'],
    pageNumber: 2,
    topic: '二元樹走訪',
    stem: '二元樹的前序順序為ACDFHBEG及中序順序為FDHCAEGB，其後序順序為何？',
    options: {
      A: 'FHDCGEBA',
      B: 'FHDCGEAB',
      C: 'FHDCEGAB',
      D: 'FHDCEGBA'
    },
    tags: ['computer-principles', 'tree-traversal'],
    extractionStatus: 'verified'
  },
  {
    number: 15,
    answers: ['D'],
    pageNumber: 2,
    topic: '作業系統類型',
    stem: '下列不同類型作業系統之敘述，何者有誤？',
    options: {
      A: '多元程式處理(Multi-Programming)系統，可同時服務多個使用者或多個程式',
      B: '早期批次系統，屬於單工系統，一次只能服務1位使用者',
      C: '多處理器系統可共用匯流排、時脈或記憶體',
      D: '分時系統能隨時對輸入訊號立刻回應'
    },
    tags: ['computer-principles', 'operating-system'],
    extractionStatus: 'verified'
  },
  {
    number: 16,
    answers: ['B'],
    pageNumber: 2,
    topic: 'NoSQL 一致性',
    stem: '下列NoSQL資料庫之敘述，何者有誤？',
    options: {
      A: '分散式資料庫',
      B: '資料隨時都一致',
      C: '支援大量運算',
      D: '欄位定義有彈性'
    },
    tags: ['computer-principles', 'database'],
    extractionStatus: 'verified'
  },
  {
    number: 17,
    answers: ['A'],
    pageNumber: 2,
    topic: 'CPI 計算',
    stem: '電腦時脈速度為10 GHz，執行10^12個指令費時200秒，此電腦執行每個指令需要多少時脈週期(Clock Cycle)？',
    options: {
      A: '2',
      B: '12',
      C: '20',
      D: '120'
    },
    tags: ['computer-principles', 'cpu-performance'],
    extractionStatus: 'verified'
  },
  {
    number: 18,
    answers: ['B'],
    pageNumber: 2,
    topic: '插入排序平均時間',
    stem: '插入排序法平均的執行時間複雜度(Time Complexity)，下列何者最接近？',
    options: {
      A: 'O(N)',
      B: 'O(N^2)',
      C: 'O(N log2 N)',
      D: 'O(Nlog2N^2)'
    },
    tags: ['computer-principles', 'sorting'],
    extractionStatus: 'verified'
  },
  {
    number: 19,
    answers: ['B'],
    pageNumber: 2,
    topic: 'RAID 可用空間',
    stem: '相同的硬碟數量，何種磁碟陣列組態可用空間最小？',
    options: {
      A: 'RAID 0',
      B: 'RAID 1',
      C: 'RAID 5',
      D: 'RAID 6'
    },
    tags: ['computer-principles', 'raid'],
    extractionStatus: 'verified'
  },
  {
    number: 20,
    answers: ['D'],
    pageNumber: 2,
    topic: '費氏搜尋法',
    stem: '何種搜尋法於搜尋過程中僅運用加減法？',
    options: {
      A: '雜湊搜尋法',
      B: '二元搜尋法',
      C: '循序搜尋法',
      D: '費氏搜尋法'
    },
    tags: ['computer-principles', 'search'],
    extractionStatus: 'verified'
  },
  {
    number: 21,
    answers: ['A'],
    pageNumber: 2,
    topic: '阿姆達爾定律',
    stem: '新軟體模組速度為原軟體模組之5倍，該模組占整體軟體系統20%，新程式碼模組上線後，可改善整體軟體系統速度約多少倍？',
    options: {
      A: '1.2',
      B: '1.8',
      C: '2',
      D: '5'
    },
    tags: ['computer-principles', 'performance'],
    extractionStatus: 'verified'
  },
  {
    number: 22,
    answers: ['A'],
    pageNumber: 3,
    topic: 'Round-Robin 平均等待時間',
    stem: `分時系統CPU採用Round-Robin循環排程，時間片段為 4 ms，CPU執行下列3行程，P1、P2、P3 的處理所需時間如下，請問行程平均等待時間為多少ms？
Process | Burst Time
P1 | 20 ms
P2 | 2 ms
P3 | 2 ms`,
    options: {
      A: '14/3',
      B: '16/3',
      C: '20/3',
      D: '24/3'
    },
    tags: ['computer-principles', 'operating-system', 'scheduling'],
    extractionStatus: 'verified'
  },
  {
    number: 23,
    answers: ['C'],
    pageNumber: 3,
    topic: 'ERP',
    stem: '下列何種資訊系統可將財務、會計、採購等業務整合？',
    options: {
      A: '管理資訊系統',
      B: '專家系統',
      C: '企業資源規劃',
      D: '決策支援系統'
    },
    tags: ['computer-principles', 'information-system'],
    extractionStatus: 'verified'
  },
  {
    number: 24,
    answers: ['D'],
    pageNumber: 3,
    topic: 'SQL GROUP BY',
    stem: 'SQL指令GROUP BY最常與下列何種功能指令一起使用？',
    options: {
      A: 'SET',
      B: 'ALTER',
      C: 'COMMIT',
      D: 'SUM'
    },
    tags: ['computer-principles', 'database', 'sql'],
    extractionStatus: 'verified'
  },
  {
    number: 25,
    answers: ['B'],
    pageNumber: 3,
    topic: '資料庫正規化',
    stem: '下列何者不是透過資料庫正規化(Normalization)進行改善？',
    options: {
      A: '資料表新增資料後產生之異常',
      B: '資料表查詢效能',
      C: '資料表資料重複',
      D: '資料表資料不一致'
    },
    tags: ['computer-principles', 'database'],
    extractionStatus: 'verified'
  },
  {
    number: 26,
    answers: ['A'],
    pageNumber: 3,
    topic: '數據機',
    stem: '下列何者可將資料於傳輸過程中，進行數位信號與類比信號轉換？',
    options: {
      A: '數據機',
      B: '交換機',
      C: '多工器',
      D: '路由器'
    },
    tags: ['computer-principles', 'networking'],
    extractionStatus: 'verified'
  },
  {
    number: 27,
    answers: ['B'],
    pageNumber: 3,
    topic: '子網路位址',
    stem: '如果目的位址為200.45.34.56，子網路遮罩為255.255.240.0，下列子網路位址何者正確？',
    options: {
      A: '200.45.31.0',
      B: '200.45.32.0',
      C: '200.45.33.0',
      D: '200.45.34.0'
    },
    tags: ['computer-principles', 'networking', 'subnet'],
    extractionStatus: 'verified'
  },
  {
    number: 28,
    answers: ['C'],
    pageNumber: 3,
    topic: '傳輸機密性',
    stem: '資料於網路傳送時，防範機密資訊外洩的主要方法為何？',
    options: {
      A: '安裝防毒軟體',
      B: '將資料壓縮',
      C: '將資料加密',
      D: '安裝防火牆'
    },
    tags: ['computer-principles', 'security', 'cryptography'],
    extractionStatus: 'verified'
  },
  {
    number: 29,
    answers: ['A'],
    pageNumber: 3,
    topic: '公鑰加密與鑰匙',
    stem: '以公鑰加密(public-key encryption)時會使用到幾把鑰匙？',
    options: {
      A: '1把鑰',
      B: '2把鑰',
      C: '3把鑰',
      D: '4把鑰'
    },
    tags: ['computer-principles', 'cryptography'],
    extractionStatus: 'verified'
  },
  {
    number: 30,
    answers: ['D'],
    pageNumber: 3,
    topic: '網路路徑追蹤',
    stem: '當網路不通時若想知道網路何處不通，最應該使用下列何種指令來進行追蹤？',
    options: {
      A: 'ipconfig',
      B: 'ping',
      C: 'netstat',
      D: 'tracert'
    },
    tags: ['computer-principles', 'networking', 'diagnostics'],
    extractionStatus: 'verified'
  },
  {
    number: 31,
    answers: ['A'],
    pageNumber: 3,
    topic: '檢查碼',
    stem: '身分證號碼及銀行帳號皆設有檢查碼，其作用為何？',
    options: {
      A: '提升資料正確性',
      B: '增加資料隱密性',
      C: '使位數對齊較為美觀',
      D: '加快處理速度'
    },
    answerNote: 'PDF 題目前方以全形「Ａ」標示答案；資料已正規化為 A。',
    tags: ['computer-principles', 'data-validation'],
    extractionStatus: 'verified'
  },
  {
    number: 32,
    answers: ['C'],
    pageNumber: 3,
    topic: 'Huffman encoding',
    stem: '有關哈夫曼Huffman encoding之敘述，下列何者有誤？',
    options: {
      A: '可以減少資料量',
      B: '以字元出現頻率為基礎',
      C: '編碼後每個字元的代碼長度相同',
      D: '可用tree來編碼'
    },
    tags: ['computer-principles', 'compression'],
    extractionStatus: 'verified'
  },
  {
    number: 33,
    answers: ['D'],
    pageNumber: 3,
    topic: '網路管理協定',
    stem: '下列何者為網路管理之協定？',
    options: {
      A: 'SMTP',
      B: 'OSPF',
      C: 'RIP',
      D: 'SNMP'
    },
    tags: ['computer-principles', 'networking'],
    extractionStatus: 'verified'
  },
  {
    number: 34,
    answers: ['C'],
    pageNumber: 3,
    topic: 'CRC 特性',
    stem: '下列何者非循環冗位檢查(Cyclic Redundancy Check, CRC)之特性？',
    options: {
      A: '以二進位除法為基礎',
      B: 'CRC有可能皆為0',
      C: '可偵測到所有影響到的偶數位元一連串錯誤',
      D: '很有機會偵測到長度大於多項式的指數次方之連串錯誤'
    },
    tags: ['computer-principles', 'error-detection'],
    extractionStatus: 'verified'
  },
  {
    number: 35,
    answers: ['B'],
    pageNumber: 3,
    topic: '週期與頻率',
    stem: '一正弦波的頻率是10 Hz，其週期為何？',
    options: {
      A: '0.01 秒',
      B: '0.1 秒',
      C: '1 秒',
      D: '10 秒'
    },
    tags: ['computer-principles', 'signal'],
    extractionStatus: 'verified'
  },
  {
    number: 36,
    answers: ['B'],
    pageNumber: 3,
    topic: 'OSI 資料連接層',
    stem: '有關OSI資料連接層主要功能之敘述，下列何者有誤？',
    options: {
      A: '實體定址',
      B: '邏輯定址',
      C: '流量控制',
      D: '將資料流分封成訊框'
    },
    tags: ['networking', 'osi'],
    extractionStatus: 'verified'
  },
  {
    number: 37,
    answers: ['D'],
    pageNumber: 4,
    topic: 'TCP 錯誤偵測與改正',
    stem: '有關TCP錯誤偵測與改正之敘述，下列何者有誤？',
    options: {
      A: '檢查和',
      B: '回應',
      C: '計時',
      D: '緩慢啟動'
    },
    tags: ['networking', 'tcp'],
    extractionStatus: 'verified'
  },
  {
    number: 38,
    answers: ['C'],
    pageNumber: 4,
    topic: 'CSMA/CD',
    stem: '何者與CSMA/CD標準無關？',
    options: {
      A: '最小訊框長度',
      B: '資料傳輸率',
      C: '路徑選擇',
      D: '碰撞區間'
    },
    tags: ['networking', 'ethernet'],
    extractionStatus: 'verified'
  },
  {
    number: 39,
    answers: ['C'],
    pageNumber: 4,
    topic: 'OSI 傳輸層',
    stem: '有關OSI傳輸層主要功能之敘述，下列何者有誤？',
    options: {
      A: '流量控制',
      B: '連線控制',
      C: '邏輯定址',
      D: '錯誤控制'
    },
    tags: ['networking', 'osi'],
    extractionStatus: 'verified'
  },
  {
    number: 40,
    answers: ['A'],
    pageNumber: 4,
    topic: 'TCP 壅塞控制',
    stem: '有關TCP壅塞控制，下列何者有誤？',
    options: {
      A: '乘法式增加',
      B: '乘法式減少',
      C: '緩慢起動',
      D: '添加式增加'
    },
    tags: ['networking', 'tcp', 'congestion-control'],
    extractionStatus: 'verified'
  },
  {
    number: 41,
    answers: ['A'],
    pageNumber: 4,
    topic: 'ARP',
    stem: '有關ARP網路協定之敘述，下列何者有誤？',
    options: {
      A: '使用群播傳送',
      B: '使用單點位址回應',
      C: '使用廣播傳送',
      D: '目的是取得實體位址'
    },
    tags: ['networking', 'arp'],
    extractionStatus: 'verified'
  },
  {
    number: 42,
    answers: ['C'],
    pageNumber: 4,
    topic: 'UDP',
    stem: '有關UDP網路協定敘述，下列何者有誤？',
    options: {
      A: '不可靠性傳輸',
      B: '適合不在乎流量與錯誤控制',
      C: '完全不提供錯誤偵測',
      D: '有的埠號UDP可以同時給UDP和TCP用'
    },
    tags: ['networking', 'udp'],
    extractionStatus: 'verified'
  },
  {
    number: 43,
    answers: ['D'],
    pageNumber: 4,
    topic: '多工',
    stem: '下列何者為多工？',
    options: {
      A: '多條通路和多條頻道',
      B: '多條通路和1條頻道',
      C: '1條通路和1條頻道',
      D: '1條通路和多條頻道'
    },
    tags: ['networking', 'multiplexing'],
    extractionStatus: 'verified'
  },
  {
    number: 44,
    answers: ['B'],
    pageNumber: 4,
    topic: 'CIDR 網路位址',
    stem: '某位址為167.199.170.82/27，其網路位址為何？',
    options: {
      A: '167.199.170.32/27',
      B: '167.199.170.64/27',
      C: '167.199.170.128/27',
      D: '167.199.170.196/27'
    },
    tags: ['networking', 'subnet'],
    extractionStatus: 'verified'
  },
  {
    number: 45,
    answers: ['D'],
    pageNumber: 4,
    topic: 'OSPF 封包',
    stem: '下列何者非OSPF所使用之封包？',
    options: {
      A: 'link state acknowledgement packet',
      B: 'link state request packet',
      C: 'link state update packet',
      D: 'link down packet'
    },
    tags: ['networking', 'ospf'],
    extractionStatus: 'verified'
  },
  {
    number: 46,
    answers: ['A'],
    pageNumber: 4,
    topic: '漢明距離',
    stem: '(10101010)2 與 (11101010)2 的漢明距離，下列何者正確？',
    options: {
      A: '1',
      B: '2',
      C: '3',
      D: '4'
    },
    tags: ['computer-principles', 'hamming-distance'],
    extractionStatus: 'verified'
  },
  {
    number: 47,
    answers: ['D'],
    pageNumber: 4,
    topic: 'ICMPv4 錯誤訊息',
    stem: '有關ICMPv4的錯誤訊息報告，下列何者有誤？',
    options: {
      A: '來源端放慢',
      B: '時間超過',
      C: '參數問題',
      D: '封包太大'
    },
    tags: ['networking', 'icmp'],
    extractionStatus: 'verified'
  },
  {
    number: 48,
    answers: ['C'],
    pageNumber: 4,
    topic: 'IPv6 位址長度',
    stem: '請問IPv6網址長度為多少位元？',
    options: {
      A: '32',
      B: '64',
      C: '128',
      D: '256'
    },
    tags: ['networking', 'ipv6'],
    extractionStatus: 'verified'
  },
  {
    number: 49,
    answers: ['A'],
    pageNumber: 4,
    topic: '數位簽章目標',
    stem: '下列何者非數位簽章可達到之目標？',
    options: {
      A: '隱私性',
      B: '認證',
      C: '完整性',
      D: '不可否認性'
    },
    tags: ['security', 'digital-signature'],
    extractionStatus: 'verified'
  },
  {
    number: 50,
    answers: ['D'],
    pageNumber: 4,
    topic: '交換器與網路容量',
    stem: '100Base-T網路將集線器改為交換器，理論上N台設備的整個網路容量將由100 Mbps改變成多少？',
    options: {
      A: '100 Mbps',
      B: '0.1 N × 100 Mbps',
      C: '0.5 N × 100 Mbps',
      D: 'N × 100 Mbps'
    },
    tags: ['networking', 'ethernet', 'switch'],
    extractionStatus: 'verified'
  }
];

export const questions = createAGroupYearQuestions('108', rawQuestions, reviewedQuestionAnalyses);
