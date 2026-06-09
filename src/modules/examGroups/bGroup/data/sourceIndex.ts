export const B_GROUP_YEARS = ['114', '113', '112', '111', '110', '109', '108', '107'] as const;

export type BGroupYear = (typeof B_GROUP_YEARS)[number];
export type BGroupSubject = 'information-management' | 'programming' | 'mixed';
export type BGroupQuestionType = 'essay' | 'short-answer' | 'mixed';
export type BGroupExtractionStatus = 'verified' | 'needs-review';
export type BGroupPageState = number | 'pending';

export interface BGroupSourceIndexEntry {
  year: BGroupYear;
  number: number;
  subject: BGroupSubject;
  questionType: BGroupQuestionType;
  fileName: `${BGroupYear}.pdf`;
  pageNumber: BGroupPageState;
  originalExcerpt: string;
  extractionStatus: BGroupExtractionStatus;
  adContentRemoved: boolean;
}

const B_GROUP_114_SOURCE_INDEX: readonly BGroupSourceIndexEntry[] = [
  {
    year: '114',
    number: 1,
    subject: 'information-management',
    questionType: 'mixed',
    fileName: '114.pdf',
    pageNumber: 1,
    originalExcerpt:
      '用戶回報網路有「偶發高延遲」現象，網路管理員使用 traceroute 指令觀察到中間節點回應波動與路徑跳數不穩，請以 TTL 回應與非對稱路由概念診斷，試回答下列問題：（3 題，共 25 分）TTL/ICMP 在路徑追蹤扮演何種角色？（5 分）非對稱路徑可能出現的原因為何？（10 分）請就以下 5 種測試矩陣維度：協定/埠號、封包大小、時間、路徑、觀察邊界設備，排查該現象（包含從遠端測回）？（10 分）',
    extractionStatus: 'verified',
    adContentRemoved: true
  },
  {
    year: '114',
    number: 2,
    subject: 'information-management',
    questionType: 'essay',
    fileName: '114.pdf',
    pageNumber: 2,
    originalExcerpt:
      '請以企業域名（Domain Name）解析的角度，說明 DoH/DoT 與 DNSSEC 在資安功能上如何互補？（15 分）',
    extractionStatus: 'verified',
    adContentRemoved: true
  },
  {
    year: '114',
    number: 3,
    subject: 'information-management',
    questionType: 'essay',
    fileName: '114.pdf',
    pageNumber: 3,
    originalExcerpt:
      '請就以下 10 種面向：位址長度、位址型態、位址派發、標頭（Header）大小、鄰居探索、分片（Fragmentation）、QoS 標記欄位、總長度欄位、DNS 解析、行動（Mobility）路由模式，比較 IPv6 及 IPv4 之異同。（10 分）',
    extractionStatus: 'verified',
    adContentRemoved: true
  },
  {
    year: '114',
    number: 4,
    subject: 'programming',
    questionType: 'essay',
    fileName: '114.pdf',
    pageNumber: 5,
    originalExcerpt:
      '定義「快樂數」為一個正整數 N 經過以下過程：將 N 的每一位數字平方後相加，得到新數字。例如：25→2x2+5x5=29。重複此步驟，直到出現下述其中一種結果：得到 1，則 N 是快樂數；進入循環（例如：4→16→37→58→89→145→42→20→4），則 N 非屬快樂數。請設計一函式 isHappy（int n），並註明所使用的程式語言：（15 分）輸入：正整數 n（1≤n≤10^9）。輸出：若 n 是快樂數，回傳 true；否則回傳 false。',
    extractionStatus: 'verified',
    adContentRemoved: true
  },
  {
    year: '114',
    number: 5,
    subject: 'programming',
    questionType: 'mixed',
    fileName: '114.pdf',
    pageNumber: 6,
    originalExcerpt:
      'Java 是一種常見的物件導向程式語言，請回答下列問題：（3 題，共 20 分）Java 中基本型別（Primitive Type）與參考型別（Reference Type）差異為何？（5 分）Java 的垃圾回收機制（Garbage Collection）如何運作（3 分）？何時觸發（3 分）？Java 物件導向的三大特性為封裝、繼承、多型，請分別說明其定義與如何在 Java 中實現。（9 分）',
    extractionStatus: 'verified',
    adContentRemoved: true
  },
  {
    year: '114',
    number: 6,
    subject: 'information-management',
    questionType: 'mixed',
    fileName: '114.pdf',
    pageNumber: 7,
    originalExcerpt:
      '請說明下列網站攻擊的行為原理及如何防禦：（3 題，每題 5 分，共 15 分）SQL Injection；Cross-Site Scripting, XSS；CSRF。',
    extractionStatus: 'verified',
    adContentRemoved: true
  }
];

const B_GROUP_113_SOURCE_INDEX: readonly BGroupSourceIndexEntry[] = [
  {
    year: '113',
    number: 1,
    subject: 'information-management',
    questionType: 'mixed',
    fileName: '113.pdf',
    pageNumber: 1,
    originalExcerpt:
      '某書店資料庫有 Product、Member、Buy、Author 等資料表，請以 SQL 列出各作者銷售總金額，列出達文西所有「鐵粉」姓名，並在 Product 資料表 100,000 筆、每頁 200 筆、pNo 與 unitPrice 的 B+ tree 各 4 層條件下，估算 Select * from Product where pNo=\'xxxxxx\' 與 Select * from Product where unitPrice>z 的平均硬碟頁存取次數並列示計算過程。（3 題，共 16 分）',
    extractionStatus: 'needs-review',
    adContentRemoved: true
  },
  {
    year: '113',
    number: 2,
    subject: 'information-management',
    questionType: 'mixed',
    fileName: '113.pdf',
    pageNumber: 3,
    originalExcerpt:
      '請簡要回答下列問題：（2 題，共 18 分）各雲端服務提供者（CSP）採 SaaS、PaaS、IaaS 雲端運算服務模式提供不同型態之服務，例如 Google 提供 Gmail 即為 SaaS 實例；請針對該 3 種模式分別列出 2 個 CSP 實例。（6 分）請繪圖說明 ISO 27001 資訊安全管理系統（ISMS）的 PDCA 循環。（12 分）',
    extractionStatus: 'verified',
    adContentRemoved: true
  },
  {
    year: '113',
    number: 3,
    subject: 'information-management',
    questionType: 'essay',
    fileName: '113.pdf',
    pageNumber: 3,
    originalExcerpt:
      'UML（統一建模語言）是一種用於系統設計與分析的標準語言，用以幫助系統分析師和設計師視覺化、設計和記錄系統構造。請列舉 4 種 UML 常用圖表並分別繪圖說明。（16 分）',
    extractionStatus: 'verified',
    adContentRemoved: true
  },
  {
    year: '113',
    number: 4,
    subject: 'programming',
    questionType: 'mixed',
    fileName: '113.pdf',
    pageNumber: 6,
    originalExcerpt:
      '請依下列條件畫出樹狀圖：（2 題，每題 6 分，共 12 分）依據前序（prefix）表示法 JBHCDIGAEF 及中序（infix）表示法 CHBIDJEAGF，畫出唯一的二元樹。在 1 個空的 AVL 樹，依序插入 53、68、72、5、47、14、36、21，畫出完成後的 AVL 樹。',
    extractionStatus: 'verified',
    adContentRemoved: true
  },
  {
    year: '113',
    number: 5,
    subject: 'programming',
    questionType: 'essay',
    fileName: '113.pdf',
    pageNumber: 7,
    originalExcerpt:
      '請實作下列函式以完成設計 1 個插入排序法（Insertion Sort），據以依參數值決定排序方式採遞增或遞減。bool isInverse(int x, int y, bool isAsc); void InsertionSort(int *arr, int len, bool isAsc); 註：參數 arr 為傳入的整數陣列；參數 len 為整數陣列的長度；參數 isAsc 為是否遞增，函式 InsertionSort 應呼叫函式 isInverse。（18 分）',
    extractionStatus: 'verified',
    adContentRemoved: true
  },
  {
    year: '113',
    number: 6,
    subject: 'programming',
    questionType: 'essay',
    fileName: '113.pdf',
    pageNumber: 9,
    originalExcerpt:
      '請使用程式語言設計 1 個低時間複雜度的函式，傳入 a、b 皆為不大於 2^30 的正整數後，可判斷出 |a - b| 的值是否只有 3 個因數，並註明所使用的程式語言。（20 分）註：該函式只允許呼叫平方根函式。',
    extractionStatus: 'verified',
    adContentRemoved: true
  }
];

const B_GROUP_112_SOURCE_INDEX: readonly BGroupSourceIndexEntry[] = [
  {
    year: '112',
    number: 1,
    subject: 'mixed',
    questionType: 'short-answer',
    fileName: '112.pdf',
    pageNumber: 1,
    originalExcerpt:
      '某公司資訊系統之關聯式資料庫包含員工資料檔、產品資料檔、客戶資料檔、銷售資料檔等 4 個資料表，有底線者為主鍵。請分別寫出 SQL 指令：按銷售數量由大到小輸出產品名稱、出貨工廠、計量單位、銷售數量；列出銷售產品折扣情形並按折扣由小到大輸出前 5 筆；列出訂購產品代號 P017 至少 3 次之客戶並計算平均售價。（3 題，共 15 分）',
    extractionStatus: 'needs-review',
    adContentRemoved: true
  },
  {
    year: '112',
    number: 2,
    subject: 'information-management',
    questionType: 'essay',
    fileName: '112.pdf',
    pageNumber: 2,
    originalExcerpt:
      'COVID-19 疫情加速企業數位轉型，愈具有數位力應變的企業愈有機會在後疫情時代存續茁壯。請說明何謂數位轉型、企業進行數位轉型時須兼顧哪 5 大層面，以及企業須經歷哪 3 個階段才能逐步達成。（3 題，共 15 分）',
    extractionStatus: 'verified',
    adContentRemoved: true
  },
  {
    year: '112',
    number: 3,
    subject: 'information-management',
    questionType: 'essay',
    fileName: '112.pdf',
    pageNumber: 3,
    originalExcerpt:
      '依政府機關雲端服務應用資安參考指引，針對雲端服務回答：雲端服務提供者（CSP）提供服務的 3 個種類定義、雲端服務部署模型 4 種特性，以及機關雲端服務資安政策至少應考量的 6 個項目。（3 題，共 20 分）',
    extractionStatus: 'verified',
    adContentRemoved: true
  },
  {
    year: '112',
    number: 4,
    subject: 'programming',
    questionType: 'mixed',
    fileName: '112.pdf',
    pageNumber: 5,
    originalExcerpt:
      '下列 C 程式經審閱後有嚴重安全性威脅，可讓使用者執行不被允許的指令。程式使用 char username[16]、char password[16]、gets(username)、gets(password)，並以 strcmp 比對帳號與密碼。請說明該程式具有何種安全性威脅、如何造成危害及其運作原理，並提出修訂作法。（3 題，共 15 分）',
    extractionStatus: 'needs-review',
    adContentRemoved: true
  },
  {
    year: '112',
    number: 5,
    subject: 'programming',
    questionType: 'mixed',
    fileName: '112.pdf',
    pageNumber: 5,
    originalExcerpt:
      '在計算機科學中，stack 是 1 種常見的資料結構。請說明何謂 stack、以 2 個實際應用案例具體說明如何使用 stack，並基於 stack 概念設計 1 個程式，將 4 個浮點數 20.22、12.21、70.25 和 58.29 插入 stack 後逐一移除，且必須能檢測 stack 是否已為空。（3 題，共 15 分）',
    extractionStatus: 'verified',
    adContentRemoved: true
  },
  {
    year: '112',
    number: 6,
    subject: 'mixed',
    questionType: 'short-answer',
    fileName: '112.pdf',
    pageNumber: 7,
    originalExcerpt:
      '請扮演資料科學家的角色，設計 1 個程式將 data.txt 讀取數據後執行資料清理，最後將整理好的資料寫入資料庫。資料欄位包含 User ID、Name、Age、Address、Email、Phone；清理包含刪除缺失字段、清除姓名和地址空格、電子郵件轉小寫、驗證 8 位數字使用者號碼、合法正整數年齡與 09 開頭 10 位數手機號碼，並首次寫入時建立 user_data 資料表。（20 分）',
    extractionStatus: 'verified',
    adContentRemoved: true
  }
];

const B_GROUP_111_SOURCE_INDEX: readonly BGroupSourceIndexEntry[] = [
  {
    year: '111',
    number: 1,
    subject: 'mixed',
    questionType: 'short-answer',
    fileName: '111.pdf',
    pageNumber: 1,
    originalExcerpt:
      '供應商及其所銷售產品的關聯式資料庫包含供應商資料表與產品資料表，有底線為主鍵。請寫出 SQL 指令：列出供應商名稱及其所銷售產品名稱並依供應商代號與產品代號排序；使用 SQL 萬用字元列出城市名稱第 2 個字母包含 a、e、i 的供應商名稱與城市名稱；使用 SQL EXISTS 語法列出產品價格大於 100 的供應商名稱。（3 題，共 15 分）',
    extractionStatus: 'needs-review',
    adContentRemoved: true
  },
  {
    year: '111',
    number: 2,
    subject: 'information-management',
    questionType: 'essay',
    fileName: '111.pdf',
    pageNumber: 1,
    originalExcerpt:
      '目前機器學習實務上主要應用的學習方式為監督式學習及非監督式學習，請分別說明其定義、主要處理問題及常見的演算法。（15 分）',
    extractionStatus: 'verified',
    adContentRemoved: true
  },
  {
    year: '111',
    number: 3,
    subject: 'information-management',
    questionType: 'essay',
    fileName: '111.pdf',
    pageNumber: 4,
    originalExcerpt:
      '依據 WEB 應用程式安全參考指引，針對安全系統發展生命週期（SSDLC），請列出開發階段類別之 5 項控制措施、測試階段類別之 2 項控制措施，以及部署與維運階段類別之 3 項控制措施。（3 題，共 20 分）',
    extractionStatus: 'verified',
    adContentRemoved: true
  },
  {
    year: '111',
    number: 4,
    subject: 'programming',
    questionType: 'short-answer',
    fileName: '111.pdf',
    pageNumber: 6,
    originalExcerpt:
      '有一費氏 Fibonacci 數學函式 F(n)=F(n-1)+F(n-2)，F(1)=1、F(0)=0。請以遞迴方式寫出程式碼、以非遞迴方式寫出程式碼，並修改遞迴程式碼使其計算時不須重複計算 F(n-1) 和 F(n-2)。（3 題，每題 5 分，共 15 分）',
    extractionStatus: 'verified',
    adContentRemoved: true
  },
  {
    year: '111',
    number: 5,
    subject: 'programming',
    questionType: 'short-answer',
    fileName: '111.pdf',
    pageNumber: 7,
    originalExcerpt:
      'A 公司 1 月人事資料檔案含 emp-id、dep-id、age、s_salary 欄位與多筆資料。請撰寫 check_dit() 檢查 6 碼員工代號是否符合第 6 碼為前 5 碼總和個位數的規則，並撰寫 main() 逐筆讀取人事資料、呼叫檢查函式、篩選正確員工代號資料，最後列出特別費合計超過 100,000 元之部門代號及合計金額。（2 題，共 15 分）',
    extractionStatus: 'needs-review',
    adContentRemoved: true
  },
  {
    year: '111',
    number: 6,
    subject: 'programming',
    questionType: 'short-answer',
    fileName: '111.pdf',
    pageNumber: 8,
    originalExcerpt:
      '快速排序法（Quick Sort）先選擇一個資料為基準點，所有比基準點小的元素放在左邊、比基準點大的元素放在右邊，之後反覆對基準點左右兩邊的數列執行相同處理直到完成排序。請撰寫函式 QuickSort()，將傳入的一維陣列利用快速排序法由小至大排序陣列元素。（20 分）',
    extractionStatus: 'verified',
    adContentRemoved: true
  }
];

const B_GROUP_110_SOURCE_INDEX: readonly BGroupSourceIndexEntry[] = [
  {
    year: '110',
    number: 1,
    subject: 'information-management',
    questionType: 'essay',
    fileName: '110.pdf',
    pageNumber: 1,
    originalExcerpt:
      '資訊系統的安全威脅與日俱增，企業必須採取有效防護措施以避免資安問題造成損失。資訊系統包含硬體、軟體、資料、程序及人員等 5 項元件，其中硬體及軟體可藉由 5 個資訊技術防護措施進行安全防護，請詳細說明之。（15 分）',
    extractionStatus: 'verified',
    adContentRemoved: true
  },
  {
    year: '110',
    number: 2,
    subject: 'mixed',
    questionType: 'mixed',
    fileName: '110.pdf',
    pageNumber: 1,
    originalExcerpt:
      '某書局採會員制販售參考書，關聯式資料庫包含參考書、出版商、銷售、會員等資料表，有底線者為主鍵。請寫出 SQL 查詢：列出每本參考書銷售數量並按書籍編號排序；針對書籍編號 B3169 列出會員與非會員購買總額；針對書籍編號 B6188 因會員折扣數由 92 折誤輸入為 82 折，計算當天少收金額。（3 題，每題 5 分，共 15 分）',
    extractionStatus: 'needs-review',
    adContentRemoved: true
  },
  {
    year: '110',
    number: 3,
    subject: 'information-management',
    questionType: 'short-answer',
    fileName: '110.pdf',
    pageNumber: 3,
    originalExcerpt:
      '簡答題：請說明何謂 SQL Injection 與如何防範；請說明物聯網（IoT）技術涵蓋的 4 項範疇；請說明雲端運算服務的 3 項類別；請說明何謂資訊倫理。（4 題，每題 5 分，共 20 分）',
    extractionStatus: 'verified',
    adContentRemoved: true
  },
  {
    year: '110',
    number: 4,
    subject: 'programming',
    questionType: 'mixed',
    fileName: '110.pdf',
    pageNumber: 4,
    originalExcerpt:
      '請用遞迴方式撰寫：實驗室培養某細胞，成年細胞 1 個月後會生出 2 個幼年細胞，幼年細胞 1 個月後會變為成年細胞，請撰寫 CellNumber 函式輸入 N 個月後傳回細胞總數；並撰寫 GCD 函式輸入 2 個正整數傳回最大公因數。（2 題，共 15 分）',
    extractionStatus: 'verified',
    adContentRemoved: true
  },
  {
    year: '110',
    number: 5,
    subject: 'programming',
    questionType: 'mixed',
    fileName: '110.pdf',
    pageNumber: 5,
    originalExcerpt:
      '某銀行有多台取號機供民眾取號，同一服務依各取號機取號先後時間給予連續號碼且最小號碼為 1。請使用 lock、unlock、get、set、sleep 等函式撰寫取號函式 GetNumber，輸入服務代碼與鎖定號碼變數失敗上限次數，傳回下一個號碼；當鎖定失敗超過上限次數則傳回 0。（15 分）',
    extractionStatus: 'needs-review',
    adContentRemoved: true
  },
  {
    year: '110',
    number: 6,
    subject: 'programming',
    questionType: 'mixed',
    fileName: '110.pdf',
    pageNumber: 6,
    originalExcerpt:
      '某電梯管理系統控制多台電梯，樓層等待區按鈕會將樓層號碼送到共用 Queue，系統定時讀取目標樓層並尋找最近電梯服務。請使用 getqueue 與 getcurfloor 等函式撰寫選取電梯函式 SelElev，輸入電梯總數並傳回離目標樓層最近的電梯號碼；未選到電梯則傳回 0，並處理樓層號碼與電梯服務狀態規則。（20 分）',
    extractionStatus: 'needs-review',
    adContentRemoved: true
  }
];

const B_GROUP_109_SOURCE_INDEX: readonly BGroupSourceIndexEntry[] = [
  {
    year: '109',
    number: 1,
    subject: 'information-management',
    questionType: 'mixed',
    fileName: '109.pdf',
    pageNumber: 1,
    originalExcerpt:
      '考慮某公司的客戶訂單資料。請依設計關聯式資料庫的標準進行第一正規化（1NF）、第二正規化（2NF）及第三正規化（3NF），並寫出每次正規化的結果，包含資料表名稱、欄位名稱、主鍵、外來鍵等項；另說明反正規化（De-normalization）的意義及作法。（2 題，共 15 分）',
    extractionStatus: 'needs-review',
    adContentRemoved: true
  },
  {
    year: '109',
    number: 2,
    subject: 'information-management',
    questionType: 'short-answer',
    fileName: '109.pdf',
    pageNumber: 2,
    originalExcerpt:
      '解釋名詞：PaaS（platform as a service）、推播技術（push technology）、區塊鏈（block chain）。（3 題，每題 5 分，共 15 分）',
    extractionStatus: 'verified',
    adContentRemoved: true
  },
  {
    year: '109',
    number: 3,
    subject: 'information-management',
    questionType: 'essay',
    fileName: '109.pdf',
    pageNumber: 3,
    originalExcerpt:
      '進階持續性威脅（Advanced Persistent Threats, APT）係針對特定組織所作的複雜且多方位網路攻擊。請說明 APT 攻擊流程，以及資訊管理人員對 APT 的因應對策。（2 題，共 20 分）',
    extractionStatus: 'verified',
    adContentRemoved: true
  },
  {
    year: '109',
    number: 4,
    subject: 'programming',
    questionType: 'mixed',
    fileName: '109.pdf',
    pageNumber: 3,
    originalExcerpt:
      '給定物件導向程式碼 class A 與 class B extends A，其中 class A 含 public int a0、private int a1、m1、m1(int x)、m2，class B 含 private int b1、b2、m2、m3。請以 class A 說明封裝與繼承，並以 class A、class B 說明覆寫與超載。（2 題，共 10 分）',
    extractionStatus: 'verified',
    adContentRemoved: true
  },
  {
    year: '109',
    number: 5,
    subject: 'programming',
    questionType: 'mixed',
    fileName: '109.pdf',
    pageNumber: 4,
    originalExcerpt:
      '請在待填入程式區塊中以 6 行內虛擬程式碼實現將二元樹（以鏈結串列方式儲存）中每一節點的左子樹、右子樹皆調換之功能；題目以左右圖示意交換前後二元樹，並以 t 表示父節點指標、t->leftchild 與 t->rightchild 表示左右子節點指標。（15 分）',
    extractionStatus: 'needs-review',
    adContentRemoved: true
  },
  {
    year: '109',
    number: 6,
    subject: 'programming',
    questionType: 'mixed',
    fileName: '109.pdf',
    pageNumber: 5,
    originalExcerpt:
      '給定一陣列 NUM，包含 n 個不重複整數且 n>2，請撰寫虛擬程式碼找出陣列中元素兩兩乘積最大者（Maximum pairwise product，maxprod = maximum(NUM[i] * NUM[j], i <> j)）。請說明主要程式邏輯，並在時間複雜度須為 O(n) 的限制下撰寫虛擬程式碼。（2 題，共 25 分）',
    extractionStatus: 'verified',
    adContentRemoved: true
  }
];

const B_GROUP_108_SOURCE_INDEX: readonly BGroupSourceIndexEntry[] = [
  {
    year: '108',
    number: 1,
    subject: 'mixed',
    questionType: 'mixed',
    fileName: '108.pdf',
    pageNumber: 1,
    originalExcerpt:
      '某公司的關聯式資料庫包含貨品與供應商表格，有底線者為主鍵。請用 SQL 列出所有供應商名稱開頭為「台」的供應商資料、所有庫存數量為 0 的貨品資料，以及至少供應 2 種貨品之供應商名稱與販售貨品種類數；並回答此資料庫設計上的問題、資料庫運作缺點與優點。（共 22 分）',
    extractionStatus: 'needs-review',
    adContentRemoved: true
  },
  {
    year: '108',
    number: 2,
    subject: 'mixed',
    questionType: 'short-answer',
    fileName: '108.pdf',
    pageNumber: 1,
    originalExcerpt:
      '簡答題：請說明何謂單元測試；請說明何謂同名異式（Polymorphism）及封裝（Encapsulation）；某資訊系統登入時約 30 秒才有回應，請說明此現象與資訊安全哪一個特性最相關；請說明死結（Dead Lock）發生條件；GitHub 近來被併購，git 是一種開源軟體，請說明 git 最重要之功能；請說明何謂超荷（Overload）及覆寫（Override）。（22 分）',
    extractionStatus: 'verified',
    adContentRemoved: true
  },
  {
    year: '108',
    number: 3,
    subject: 'information-management',
    questionType: 'mixed',
    fileName: '108.pdf',
    pageNumber: 2,
    originalExcerpt:
      '巨量資料題組：若 P(A)=0.5，P(B)=0.2，P(A|B)=0.3，求 P(A∪B)；並說明何謂過度訓練（Overfitting）。（2 題，共 6 分）',
    extractionStatus: 'verified',
    adContentRemoved: true
  },
  {
    year: '108',
    number: 4,
    subject: 'mixed',
    questionType: 'mixed',
    fileName: '108.pdf',
    pageNumber: 2,
    originalExcerpt:
      '有一 Web 程式系統，由使用者輸入 ID 及地址，並由後端接收處理程式進行資料庫相關處理，其前端畫面輸入欄位、對應 HTML 碼及後端接收處理程式如題示。請說明此設計會產生何種資料庫資安風險、列舉對系統及資料危害，並在不變動系統設定及前端輸入下，在後端新增字串處理函數 checkdata(xxxx) 將使用者輸入處理為無風險資料，且每行程式碼皆須註解。（14 分）',
    extractionStatus: 'needs-review',
    adContentRemoved: true
  },
  {
    year: '108',
    number: 5,
    subject: 'programming',
    questionType: 'mixed',
    fileName: '108.pdf',
    pageNumber: 4,
    originalExcerpt:
      '請就二元搜尋樹回答：欲建立二元搜尋樹必須滿足哪些條件；數列 27、35、17、33、20、3、38，以第 1 個數字為根，寫出其二元搜尋樹及建立步驟；在上述二元搜尋樹中，若欲刪除元素 27，請寫出 2 種做法。（20 分）',
    extractionStatus: 'verified',
    adContentRemoved: true
  },
  {
    year: '108',
    number: 6,
    subject: 'programming',
    questionType: 'mixed',
    fileName: '108.pdf',
    pageNumber: 5,
    originalExcerpt:
      '在常見程式設計語言中，變數常區分為全域變數與區域變數，並在某些情況下使用靜態變數。請說明靜態變數與區域變數的特性、差別及生命週期；說明區域變數與全域變數同名時何者優先使用；並針對打彈珠機函數 balls 依 80% 失敗、20% 成功、count 初始值 1,000 等需求，在底線部分填入適當程式碼。（16 分）',
    extractionStatus: 'needs-review',
    adContentRemoved: true
  }
];

const B_GROUP_107_SOURCE_INDEX: readonly BGroupSourceIndexEntry[] = [
  {
    year: '107',
    number: 1,
    subject: 'information-management',
    questionType: 'essay',
    fileName: '107.pdf',
    pageNumber: 1,
    originalExcerpt:
      '比起傳統資料來源，新型態資料來源如紀錄、郵件、社交媒體、各型感應器等，具有產出快速、資料量大、多元格式等特性，使用傳統資料系統處理成本高且效能低。請依資料來源、資料系統、資料應用之層次順序，用示意圖及簡短文字說明應用情境，規劃如何整合現有資訊架構與大資料平台。（20 分）',
    extractionStatus: 'verified',
    adContentRemoved: true
  },
  {
    year: '107',
    number: 2,
    subject: 'information-management',
    questionType: 'short-answer',
    fileName: '107.pdf',
    pageNumber: 2,
    originalExcerpt:
      '為了滿足資料成長的擴充需求，傳統商用關聯式資料庫已不敷實用，NoSQL 資料庫因而崛起。請列舉 4 類型主流 NoSQL 資料庫並簡要說明，並就增加機器就能自動擴充資料庫容量、打破 Schema 欄位架構限制等 NoSQL 特性簡要說明。（20 分）',
    extractionStatus: 'verified',
    adContentRemoved: true
  },
  {
    year: '107',
    number: 3,
    subject: 'information-management',
    questionType: 'short-answer',
    fileName: '107.pdf',
    pageNumber: 3,
    originalExcerpt:
      '資通安全管理法已於 107 年 5 月 11 日經立法院三讀通過，國家資通安全發展方案以打造安全可信賴的數位國家為願景，請列舉政府訂定之目標、推動策略及具體措施。（10 分）',
    extractionStatus: 'verified',
    adContentRemoved: true
  },
  {
    year: '107',
    number: 4,
    subject: 'mixed',
    questionType: 'essay',
    fileName: '107.pdf',
    pageNumber: 3,
    originalExcerpt:
      '以 PHP、JSP、ASP NET 等程式語言開發網站時，常利用 Session、Cookie、POST Method、GET Method 儲存網頁資訊或傳遞參數，請說明其運作方式與安全性、速度等特性。（16 分）',
    extractionStatus: 'verified',
    adContentRemoved: true
  },
  {
    year: '107',
    number: 5,
    subject: 'programming',
    questionType: 'mixed',
    fileName: '107.pdf',
    pageNumber: 4,
    originalExcerpt:
      '請以 Perl、Javascript 等程式語言或虛擬碼檢查使用者輸入之字串是否符合身分證字號格式，並分別以多條件式判斷（IF conditions）與正規表示法（Regular Expression）兩種處理方式撰寫。（每小題 5 分，共 10 分）',
    extractionStatus: 'verified',
    adContentRemoved: true
  },
  {
    year: '107',
    number: 6,
    subject: 'programming',
    questionType: 'mixed',
    fileName: '107.pdf',
    pageNumber: 4,
    originalExcerpt:
      '何謂環狀佇列（Circular Queue）？請使用 C、Java 等程式語言或虛擬碼以陣列方式實作環狀佇列，其中須包含新增與刪除佇列元素之方法。（24 分）',
    extractionStatus: 'verified',
    adContentRemoved: true
  }
];

export const B_GROUP_SOURCE_INDEXES: Readonly<Record<BGroupYear, readonly BGroupSourceIndexEntry[]>> = {
  '114': B_GROUP_114_SOURCE_INDEX,
  '113': B_GROUP_113_SOURCE_INDEX,
  '112': B_GROUP_112_SOURCE_INDEX,
  '111': B_GROUP_111_SOURCE_INDEX,
  '110': B_GROUP_110_SOURCE_INDEX,
  '109': B_GROUP_109_SOURCE_INDEX,
  '108': B_GROUP_108_SOURCE_INDEX,
  '107': B_GROUP_107_SOURCE_INDEX
};

export function getBGroupSourceIndex(year: BGroupYear): readonly BGroupSourceIndexEntry[] {
  return B_GROUP_SOURCE_INDEXES[year];
}
