import { getBGroupSourceIndex } from '@/modules/examGroups/bGroup/data/sourceIndex';
import type { BGroupEssayQuestionAnalysis } from '@/modules/examGroups/bGroup/types/essayQuestionAnalysis';

const sourceIndex = getBGroupSourceIndex('114');

function sourceRef(number: number): BGroupEssayQuestionAnalysis['sourceRef'] {
  const entry = sourceIndex.find((candidate) => candidate.number === number);

  if (!entry) {
    throw new Error(`Missing 114 B group source index entry: ${number}`);
  }

  return {
    fileName: entry.fileName,
    pageNumber: entry.pageNumber,
    originalExcerpt: entry.originalExcerpt,
    extractionStatus: entry.extractionStatus,
    adContentRemoved: entry.adContentRemoved
  };
}

export const questions: BGroupEssayQuestionAnalysis[] = [
  {
    year: '114',
    number: 1,
    subject: 'information-management',
    sourceBatch: '114-batch-1',
    examPoints: ['網路診斷', 'traceroute', '非對稱路由', '測試矩陣'],
    difficulty: 'advanced',
    questionType: 'mixed',
    originalQuestion: sourceRef(1).originalExcerpt,
    questionExplanation:
      '本題不是要求背 traceroute 指令，而是要把它的觀測限制說清楚。TTL/ICMP 只能顯示探測封包沿途節點的回應，偶發高延遲可能來自節點回 ICMP 的優先權、回程路徑、負載平衡或防火牆策略。作答時要先定義工具，再說明非對稱路由原因，最後用測試矩陣把排查範圍縮小。',
    modelAnswer:
      'traceroute 透過逐步增加 TTL，讓沿途路由器回傳 TTL exceeded 的 ICMP 訊息，以推估探測封包經過的節點與跳數；但它看到的是探測封包與回覆封包的結果，不必然等於實際應用流量的完整雙向路徑。非對稱路由可能由動態路由策略、ECMP 或負載平衡、不同 ISP 回程、NAT/防火牆政策、QoS 與路由收斂造成。排查時應交叉測試協定與埠號、封包大小、不同時間、正反向路徑，以及邊界設備的介面錯誤、丟包與流量紀錄。',
    modelAnswerDetails: [
      'TTL 的角色是限制封包生命週期；每經過一個路由器就遞減，歸零時節點通常回 ICMP，traceroute 才能推估該 hop。',
      '高延遲若只出現在中間 hop，不代表終點一定慢；中間設備可能降低 ICMP 回應優先權，需看後續 hop 與端到端測試。',
      '非對稱路由的重點是去程與回程不一定相同，因此從本端測遠端與從遠端測回本端都要做。',
      '測試矩陣需同時包含 TCP/UDP/ICMP、常用服務埠、不同封包大小、尖離峰時間、不同來源與目的路徑，以及邊界設備觀察點。'
    ],
    diagramInstructions:
      '文字圖解：用三層呈現。第一層畫 Client -> R1 -> R2 -> R3 -> Server，標示 TTL=1、TTL=2、TTL=3 逐跳遞增，並在各路由器回 Client 的箭頭標示 ICMP Time Exceeded/Reply。第二層畫 Server 回 Client 的回程箭頭可走 R4、R5 等不同節點，表示非對稱路由。第三層建立 5 欄測試矩陣：協定/埠號、封包大小、時間、路徑、觀察邊界設備；每欄列測項、觀察值、可能結論，並加一列遠端反向測試。',
    diagramAltText:
      '以 TTL 逐跳追蹤路徑，回程可能不同，排查時依五個維度建立測試矩陣。',
    keyTerms: ['TTL', 'ICMP', 'traceroute', '非對稱路由', 'ECMP'],
    scoringPoints: ['正確說明 TTL/ICMP 的角色', '指出非對稱路由可能原因', '提出正反向測試', '用五個矩陣維度組織排查'],
    commonMistakes: ['把中間節點 ICMP 延遲直接判定為該節點壅塞', '只從單一方向測試而忽略回程路徑', '只改 MTU 或只看 ping，沒有交叉協定與埠號'],
    handoutRefs: ['B-114-網路診斷-traceroute'],
    sourceRef: sourceRef(1),
    reviewStatus: 'verified',
    childItems: [
      {
        kind: 'short-answer',
        label: 'TTL/ICMP',
        prompt: 'TTL/ICMP 在路徑追蹤扮演何種角色？',
        expectedAnswer: '以 TTL 遞減觸發 ICMP 回覆，推估沿途 hop 與節點回應。',
        scoringPoints: ['說明 TTL 遞減', '說明 ICMP 回覆', '指出觀測限制']
      },
      {
        kind: 'essay-part',
        label: '非對稱路徑',
        prompt: '非對稱路徑可能出現的原因為何？',
        expectedAnswer: '由路由政策、負載平衡、不同 ISP 回程、防火牆或 QoS 等因素造成去回程不同。',
        scoringPoints: ['列出多種網路原因', '說明去程與回程不同', '連到診斷限制']
      },
      {
        kind: 'diagram',
        label: '測試矩陣',
        prompt: '用五種測試矩陣維度排查偶發高延遲。',
        expectedAnswer: '以協定/埠號、封包大小、時間、路徑、邊界設備交叉測試。',
        scoringPoints: ['五個維度完整', '包含遠端測回', '能連到觀察指標']
      }
    ]
  },
  {
    year: '114',
    number: 2,
    subject: 'information-management',
    sourceBatch: '114-batch-1',
    examPoints: ['DNS 安全', 'DoH', 'DoT', 'DNSSEC'],
    difficulty: 'intermediate',
    questionType: 'essay',
    originalQuestion: sourceRef(2).originalExcerpt,
    questionExplanation:
      '本題要比較的是「傳輸保密」與「資料真實性」。DoH 與 DoT 讓 DNS 查詢在傳輸途中不易被旁聽或竄改；DNSSEC 則讓查詢結果可驗證是否由權威來源簽章。兩者處理的威脅不同，所以答案要寫互補，而不是說誰取代誰。',
    modelAnswer:
      'DoH 和 DoT 主要保護 DNS 查詢傳輸通道。DoH 使用 HTTPS 承載 DNS，DoT 使用 TLS 專用連線，兩者都能降低查詢內容被監聽、被中間人竄改或被網路設備側錄的風險。DNSSEC 則透過數位簽章與信任鏈驗證 DNS 回應資料是否正確，避免快取中毒與偽造回應。企業域名解析若同時採用 DoH/DoT 與 DNSSEC，可兼顧查詢過程的機密性、完整性與回應來源可信度。',
    modelAnswerDetails: [
      'DoH/DoT 的重點是加密 resolver 連線，保護查詢封包在路上不被讀取或竄改。',
      'DNSSEC 的重點是簽章驗證，確認回應資料沒有被偽造，並不能加密查詢內容。',
      '企業導入時仍要控管 resolver 來源、記錄稽核、內外部 DNS 分流與憑證或信任鏈維護。',
      '完整答案要明確說出兩者互補：DoH/DoT 保護傳輸，DNSSEC 保護資料真偽。'
    ],
    diagramInstructions: '不適用：本題為 DNS 安全機制比較，使用文字說明傳輸加密與簽章驗證的互補即可。',
    diagramAltText: '無圖解；DoH/DoT 保護 DNS 查詢通道，DNSSEC 驗證 DNS 回應資料來源與完整性。',
    keyTerms: ['DoH', 'DoT', 'DNSSEC', '傳輸加密', '數位簽章'],
    scoringPoints: ['說明 DoH/DoT 的傳輸保護', '說明 DNSSEC 的簽章驗證', '指出兩者互補而非取代', '連到企業域名解析風險'],
    commonMistakes: ['把 DNSSEC 誤寫成加密查詢內容', '只列名詞沒有說明互補關係', '忽略企業 resolver 控管與稽核需求'],
    handoutRefs: ['B-114-DNS-安全'],
    sourceRef: sourceRef(2),
    reviewStatus: 'verified'
  },
  {
    year: '114',
    number: 3,
    subject: 'information-management',
    sourceBatch: '114-batch-1',
    examPoints: ['IPv6', 'IPv4', '網路協定比較'],
    difficulty: 'intermediate',
    questionType: 'essay',
    originalQuestion: sourceRef(3).originalExcerpt,
    questionExplanation:
      '本題給了 10 個指定面向，作答時最忌只泛泛寫 IPv6 位址比較長。應逐欄比較：位址、標頭、鄰居探索、分片、QoS、DNS 與行動支援。用表格式答案最穩，因為每個面向都能對應到一個得分點。',
    modelAnswer:
      'IPv4 使用 32 位元位址，常見單播、廣播與多播，位址派發可透過手動、DHCP 或 NAT 輔助；IPv6 使用 128 位元位址，以單播、多播、任播取代廣播，支援 SLAAC 與 DHCPv6。IPv4 標頭最小 20 bytes 且欄位較多，路由器可分片；IPv6 固定 40 bytes 基本標頭，選項改用延伸標頭，通常由來源端分片。IPv4 使用 ARP，IPv6 使用 NDP。QoS 在 IPv4 可用 DSCP/ToS，在 IPv6 有 Traffic Class 與 Flow Label。IPv4 總長度欄位包含標頭與資料，IPv6 Payload Length 只計 payload。DNS 上 IPv4 對應 A record，IPv6 對應 AAAA record；行動性上 IPv6 較早把 Mobile IPv6 與端到端位址空間納入設計。',
    modelAnswerDetails: [
      '位址長度與位址型態是最基本分數：32 位元對 128 位元，IPv6 沒有廣播。',
      '標頭比較要寫出 IPv6 基本標頭固定 40 bytes，並用延伸標頭處理選項。',
      '分片差異是常考陷阱：IPv4 路由器可分片，IPv6 主要由來源端處理。',
      'DNS 與行動路由模式要具體寫 A/AAAA 與 Mobile IPv6，不要只寫「IPv6 比較新」。'
    ],
    diagramInstructions:
      '文字圖解：建立 4 欄比較表：面向、IPv4、IPv6、答題重點。列出位址長度、位址型態、位址派發、Header 大小、鄰居探索、Fragmentation、QoS 標記欄位、總長度欄位、DNS 解析、Mobility 路由模式共 10 列。IPv4 欄填 32 位元、單播/廣播/多播、DHCP/NAT、20 bytes 起、ARP、路由器可分片、DSCP/ToS、Total Length、A record、Mobile IPv4；IPv6 欄填 128 位元、單播/多播/任播、SLAAC/DHCPv6、固定 40 bytes、NDP、來源端分片、Traffic Class/Flow Label、Payload Length、AAAA record、Mobile IPv6。',
    diagramAltText:
      'IPv4 與 IPv6 的十列比較表，逐項對照位址、標頭、鄰居探索、分片、QoS、DNS 與行動支援差異。',
    keyTerms: ['IPv4', 'IPv6', 'NDP', 'SLAAC', 'Flow Label'],
    scoringPoints: ['10 個指定面向都有比較', '分片與標頭差異正確', 'DNS A/AAAA 對應正確', 'IPv6 位址型態不寫廣播'],
    commonMistakes: ['只寫 IPv6 位址較長，漏掉其他指定面向', '把 ARP 與 NDP 混用', '誤寫 IPv6 路由器會像 IPv4 一樣中途分片'],
    handoutRefs: ['B-114-IPv6-IPv4-比較'],
    sourceRef: sourceRef(3),
    reviewStatus: 'verified'
  },
  {
    year: '114',
    number: 4,
    subject: 'programming',
    sourceBatch: '114-batch-2',
    examPoints: ['演算法', '迴圈偵測', '快樂數'],
    difficulty: 'intermediate',
    questionType: 'essay',
    originalQuestion: sourceRef(4).originalExcerpt,
    questionExplanation:
      '快樂數題的核心是避免無限迴圈。每次把各位數平方和轉成下一個數；若到 1 就回傳 true，若同一個數再次出現就代表進入循環，回傳 false。因為輸入上限是 10^9，用集合記錄看過的值，或用快慢指標偵測循環，都能符合需求。',
    modelAnswer:
      '可使用 C、Java、Python 等語言實作。以集合版為例：建立 seen 集合；當 n 不等於 1 且不在 seen 中，就把 n 加入 seen，計算每一位數字平方和並指定回 n。迴圈結束後若 n 等於 1 回傳 true，否則代表 n 已重複出現並進入循環，回傳 false。此法每一步只處理十進位位數，且平方和會很快降到有限範圍內，時間與空間都足以處理 1≤n≤10^9。',
    modelAnswerDetails: [
      'digitSquareSum 函式可用 while n>0 逐位取 n%10，累加 digit*digit，再 n/=10。',
      'seen 集合用來記錄已出現過的平方和，遇到重複值代表不可能再到 1。',
      '若用快慢指標，slow 每次走一步、fast 每次走兩步，最後 fast 為 1 或 slow==fast。',
      '回答時要註明語言，並處理 n=1 時直接回傳 true。'
    ],
    diagramInstructions:
      '文字圖解：畫流程圖。輸入 n -> 拆成各位數 -> 各位數平方後加總 -> 得到新 n；若 n=1 則標示快樂數，若 n 已出現在 seen 集合則標示非快樂數，否則把 n 加入 seen 並重複流程。旁邊列範例循環 4 -> 16 -> 37 -> 58 -> 89 -> 145 -> 42 -> 20 -> 4，標示 4 重複所以失敗。',
    diagramAltText:
      '快樂數流程圖：輸入數字後反覆計算各位數平方和；到 1 回 true，遇到重複數代表循環並回 false。',
    keyTerms: ['快樂數', '平方和', '迴圈偵測', 'seen set'],
    scoringPoints: ['正確計算各位數平方和', '能判斷到 1 的情況', '能偵測循環', '註明使用的程式語言'],
    commonMistakes: ['只跑固定次數而沒有循環判斷', '忘記把看過的平方和加入集合', '把位數平方寫成數字本身平方'],
    handoutRefs: ['B-114-演算法-快樂數'],
    sourceRef: sourceRef(4),
    reviewStatus: 'verified'
  },
  {
    year: '114',
    number: 5,
    subject: 'programming',
    sourceBatch: '114-batch-2',
    examPoints: ['Java', '基本型別', '垃圾回收', '物件導向'],
    difficulty: 'basic',
    questionType: 'mixed',
    originalQuestion: sourceRef(5).originalExcerpt,
    questionExplanation:
      '本題把 Java 基礎分成三塊：型別、記憶體管理、物件導向。基本型別與參考型別要比較存放內容與操作差異；垃圾回收要說明可達性與 JVM 自動回收；封裝、繼承、多型要各自有定義與 Java 實作方式。',
    modelAnswer:
      'Primitive type 直接保存值，例如 int、double、boolean，大小與語意固定，不能為 null；reference type 保存物件參考，例如 String、Array、class instance，可為 null，操作時常涉及物件狀態與方法呼叫。Java GC 由 JVM 追蹤物件是否仍可由 GC roots 連到，無法到達的物件會成為回收候選；觸發時機由 JVM 依 heap 使用量、配置壓力與收集策略決定。封裝是把資料與行為包在類別中並以 private、getter/setter 控制存取；繼承以 extends 重用與擴充父類別；多型讓父類別或介面型別的變數在執行期呼叫子類別覆寫方法。',
    modelAnswerDetails: [
      '基本型別比較值，參考型別變數保存的是參考；兩個參考可能指向同一物件。',
      'GC 不保證立即回收，也不應用 System.gc() 當成可靠控制手段。',
      '封裝重點是資訊隱藏與維護不變量，不只是把欄位寫成 private。',
      '多型需搭配 overriding、介面或父類別參考，回答時要提到動態繫結。'
    ],
    diagramInstructions:
      '文字圖解：先畫二列表格比較 Primitive 與 Reference。Primitive 欄寫「變數格內就是值，例如 int x=3」；Reference 欄寫「變數格內是位址/參考，箭頭指向 heap 中物件，例如 Person p -> Person 物件」。下方再畫 OOP 三角：封裝在底部代表類別邊界與存取控制，繼承從父類別向下連到子類別，多型從介面/父類別箭頭指向多個實作類別，表示同一呼叫在執行期有不同實作。',
    diagramAltText:
      'Java 型別與物件導向文字圖：基本型別直接存值，參考型別指向 heap 物件；封裝、繼承、多型分別表示類別邊界、父子關係與執行期不同實作。',
    keyTerms: ['Primitive Type', 'Reference Type', 'Garbage Collection', '封裝', '多型'],
    scoringPoints: ['比較基本型別與參考型別差異', '說明 GC 可達性與觸發概念', '分別定義封裝、繼承、多型', '說出 Java 實作方式'],
    commonMistakes: ['把 reference type 說成一定在 stack 存整個物件', '誤以為 GC 可由程式精準指定時間', '只列 OOP 三特性名稱沒有說明 Java 實作'],
    handoutRefs: ['B-114-Java-OOP'],
    sourceRef: sourceRef(5),
    reviewStatus: 'verified',
    childItems: [
      {
        kind: 'short-answer',
        label: '型別差異',
        prompt: 'Java 中 Primitive Type 與 Reference Type 差異為何？',
        expectedAnswer: '基本型別直接存值，參考型別保存物件參考且可為 null。',
        scoringPoints: ['存放內容', 'null 差異', '操作語意']
      },
      {
        kind: 'essay-part',
        label: 'GC',
        prompt: 'Java 垃圾回收如何運作與何時觸發？',
        expectedAnswer: 'JVM 依可達性找出不可達物件，通常因 heap 壓力或配置需求觸發。',
        scoringPoints: ['JVM 自動管理', '可達性', '觸發不保證立即']
      },
      {
        kind: 'essay-part',
        label: 'OOP 三特性',
        prompt: '說明封裝、繼承、多型並指出 Java 實作方式。',
        expectedAnswer: '封裝用類別與存取修飾子，繼承用 extends，多型靠 overriding、介面或父類別參考。',
        scoringPoints: ['三項定義', 'Java 語法', '例子合理']
      }
    ]
  },
  {
    year: '114',
    number: 6,
    subject: 'information-management',
    sourceBatch: '114-batch-2',
    examPoints: ['Web 安全', 'SQL Injection', 'XSS', 'CSRF'],
    difficulty: 'intermediate',
    questionType: 'mixed',
    originalQuestion: sourceRef(6).originalExcerpt,
    questionExplanation:
      '三種攻擊要分清楚攻擊面。SQL Injection 攻擊資料庫查詢組字串；XSS 攻擊瀏覽器執行未信任腳本；CSRF 利用已登入使用者的憑證送出非本人意願的請求。防禦時要對應攻擊原理，不要全部只寫「過濾輸入」。',
    modelAnswer:
      'SQL Injection 是把惡意輸入拼進 SQL，使查詢語意被改寫，可能造成資料外洩、竄改或繞過登入；防禦應使用參數化查詢、ORM 安全綁定、最小權限與錯誤訊息控管。XSS 是讓未信任內容在使用者瀏覽器中以腳本執行，可能竊取憑證或操作頁面；防禦應做輸出編碼、內容安全政策、避免直接插入 HTML，並使用 HttpOnly/SameSite cookie。CSRF 是誘使已登入者瀏覽器帶著既有憑證送出請求；防禦應使用 CSRF token、SameSite cookie、檢查 Origin/Referer，並對高風險操作要求重新驗證。',
    modelAnswerDetails: [
      'SQL Injection 的根因是把資料當成 SQL 語法的一部分，參數化查詢可分離語法與資料。',
      'XSS 分反射型、儲存型與 DOM 型，核心都是未信任內容被瀏覽器執行。',
      'CSRF 不一定能讀回應內容，但可借用使用者登入狀態送出狀態改變請求。',
      'Cookie 屬性只能降低風險，仍需搭配 token 與伺服器端驗證。'
    ],
    diagramInstructions:
      '文字圖解：建立 3 列表格：SQL Injection、XSS、CSRF。每列分成攻擊入口、資料流、影響、防禦。SQL Injection 流程為使用者輸入 -> SQL 字串 -> DB，影響是查詢被改寫或資料外洩，防禦是參數化查詢與最小權限。XSS 流程為惡意腳本 -> 網頁輸出 -> 使用者瀏覽器，影響是竊取憑證或操作頁面，防禦是輸出編碼、CSP、HttpOnly。CSRF 流程為已登入瀏覽器 -> 偽造請求 -> 伺服器動作，防禦是 CSRF token、SameSite、Origin 檢查。',
    diagramAltText:
      '三列 Web 攻擊流程表，分別對照 SQL Injection、XSS、CSRF 的攻擊路徑與主要防禦措施。',
    keyTerms: ['SQL Injection', 'XSS', 'CSRF', '參數化查詢', 'CSRF token'],
    scoringPoints: ['三種攻擊原理各自正確', '危害描述具體', '防禦措施能對應攻擊面', '沒有把 XSS 與 CSRF 混為一談'],
    commonMistakes: ['三題都只寫過濾輸入', '把 CSRF 誤解成偷密碼', '忽略輸出編碼與參數化查詢的差異'],
    handoutRefs: ['B-114-Web-安全'],
    sourceRef: sourceRef(6),
    reviewStatus: 'verified',
    childItems: [
      {
        kind: 'short-answer',
        label: 'SQL Injection',
        prompt: '說明 SQL Injection 的原理與防禦。',
        expectedAnswer: '惡意輸入改寫 SQL 語意；以參數化查詢、最小權限等防禦。',
        scoringPoints: ['原理', '危害', '防禦']
      },
      {
        kind: 'short-answer',
        label: 'XSS',
        prompt: '說明 XSS 的原理與防禦。',
        expectedAnswer: '未信任腳本在瀏覽器執行；以輸出編碼、CSP、HttpOnly 等防禦。',
        scoringPoints: ['原理', '危害', '防禦']
      },
      {
        kind: 'short-answer',
        label: 'CSRF',
        prompt: '說明 CSRF 的原理與防禦。',
        expectedAnswer: '利用使用者已登入狀態送出非本人意願請求；以 token、SameSite、Origin 檢查防禦。',
        scoringPoints: ['原理', '危害', '防禦']
      }
    ]
  }
];
