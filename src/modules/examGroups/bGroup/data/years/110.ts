import { getBGroupSourceIndex } from '@/modules/examGroups/bGroup/data/sourceIndex';
import type { BGroupEssayQuestionAnalysis } from '@/modules/examGroups/bGroup/types/essayQuestionAnalysis';

const sourceIndex = getBGroupSourceIndex('110');

function sourceRef(number: number): BGroupEssayQuestionAnalysis['sourceRef'] {
  const entry = sourceIndex.find((candidate) => candidate.number === number);

  if (!entry) {
    throw new Error(`Missing 110 B group source index entry: ${number}`);
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
    year: '110',
    number: 1,
    subject: 'information-management',
    sourceBatch: '110-batch-1',
    examPoints: ['資訊安全', '硬體防護', '軟體防護', '技術控制'],
    difficulty: 'basic',
    questionType: 'essay',
    originalQuestion: sourceRef(1).originalExcerpt,
    questionExplanation:
      '題目問資訊系統五項元件中，硬體與軟體可用哪些資訊技術防護措施保護。答案要聚焦技術控制，並說明措施如何降低安全威脅。',
    modelAnswer:
      '可列出身分鑑別與存取控制、加密、惡意程式防護、弱點修補與更新、備份與復原、網路防火牆與入侵偵測等措施。若需限定五項，可整理為：存取控制、加密保護、防火牆/IDS/IPS、弱點管理與修補、備份與災難復原。這些措施分別保護硬體與軟體免於未授權存取、資料外洩、惡意程式、已知漏洞與營運中斷。',
    modelAnswerDetails: [
      '存取控制包含帳號權限、MFA、最小權限與權限審查。',
      '加密可用於資料傳輸與儲存，避免設備遺失或網路竊聽造成外洩。',
      '弱點管理包含修補、版本更新、弱點掃描與設定基準。',
      '備份與復原是可用性控制，能降低勒索軟體或硬體故障的損害。'
    ],
    diagramInstructions:
      '文字圖解：畫「硬體/軟體資產」在中央，外圍五個防護圈依序為存取控制、加密、防火牆/IDS/IPS、弱點修補、備份復原。每個防護圈旁標示防的風險：未授權、外洩、入侵、漏洞、營運中斷。',
    diagramAltText:
      '硬體與軟體可用五種技術控制保護：存取控制、加密、網路防護、弱點修補與備份復原。',
    keyTerms: ['存取控制', '加密', 'IDS', '弱點管理', '備份復原'],
    scoringPoints: ['列出五個技術防護措施', '每項能對應安全威脅', '涵蓋機密性完整性可用性', '說明硬體與軟體保護方式'],
    commonMistakes: ['只寫管理制度沒有技術措施', '只列名詞未說明用途', '忽略備份復原與可用性'],
    handoutRefs: ['B-110-資訊安全防護'],
    sourceRef: sourceRef(1),
    reviewStatus: 'verified'
  },
  {
    year: '110',
    number: 2,
    subject: 'mixed',
    sourceBatch: '110-batch-1',
    examPoints: ['SQL', '會員折扣', '銷售統計'],
    difficulty: 'advanced',
    questionType: 'mixed',
    originalQuestion: sourceRef(2).originalExcerpt,
    questionExplanation:
      '題目要求依書局資料庫寫三個 SQL。重點是會員與非會員售價規則、銷售數量彙總，以及錯誤折扣造成的少收金額。因原 PDF 以底線標示主鍵但抽取無法保留，解析維持 needs-review。',
    modelAnswer:
      '每本參考書銷售數量可由銷售資料依書籍編號 GROUP BY，SUM(數量) 後 ORDER BY 書籍編號 ASC。B3169 會員與非會員購買總額可用 CASE WHEN 會員編號 = N99 THEN 非會員 ELSE 會員 END 分組，SUM(購買總額) 或依售價乘數量計算。B6188 少收金額可找出當天 B6188 會員銷售資料，計算正確 92 折售價與誤輸入 82 折售價差額乘以數量，合計為少收金額。',
    modelAnswerDetails: [
      '非會員會員編號為 N99，會員售價依單價乘會員折扣數。',
      '若購買總額欄位已保存實際收款，可用於統計；若要重算需使用單價、折扣與數量。',
      '少收金額是 0.92 與 0.82 的差距，不是 92 減 82 元。',
      'SQL 可用 CASE WHEN 分組會員/非會員。'
    ],
    diagramInstructions:
      '文字圖解：畫參考書、出版商、銷售、會員四表，銷售表居中連到參考書與會員。旁邊畫三條查詢線：書籍銷售數量 GROUP BY；B3169 依會員編號 N99 分組；B6188 用正確 92 折與錯誤 82 折差額計算少收金額。',
    diagramAltText:
      '書局銷售資料以書籍與會員關聯，三個 SQL 分別彙總銷售量、分組會員/非會員金額與計算折扣錯誤少收金額。',
    keyTerms: ['GROUP BY', 'CASE WHEN', '會員折扣', 'B3169', 'B6188'],
    scoringPoints: ['銷售數量彙總正確', '會員與非會員分組正確', 'B6188 少收公式正確', 'SQL join 關係合理'],
    commonMistakes: ['把 N99 當正常會員', '少收金額只算單筆未乘數量', '折扣差額方向寫反'],
    handoutRefs: ['B-110-SQL-書局銷售'],
    sourceRef: sourceRef(2),
    reviewStatus: 'needs-review'
  },
  {
    year: '110',
    number: 3,
    subject: 'information-management',
    sourceBatch: '110-batch-1',
    examPoints: ['SQL Injection', 'IoT', '雲端運算', '資訊倫理'],
    difficulty: 'basic',
    questionType: 'short-answer',
    originalQuestion: sourceRef(3).originalExcerpt,
    questionExplanation:
      '這題是四個概念簡答。每題需要定義加上關鍵例子或防範方式，尤其 SQL Injection 要同時說明原理與防禦。',
    modelAnswer:
      'SQL Injection 是惡意輸入被拼接進 SQL，導致查詢語意被改寫；防範用參數化查詢、輸入驗證、最小權限與錯誤訊息控管。IoT 涵蓋感測/識別、網路連接、資料處理平台、應用服務與控制。雲端運算服務可分 IaaS、PaaS、SaaS。資訊倫理是使用資訊科技時遵守隱私、智財、公平、責任與安全等原則。',
    modelAnswerDetails: [
      'SQL Injection 防禦最核心是參數化查詢，不是只過濾單引號。',
      'IoT 要同時包含端點感測、通訊、平台與應用。',
      'IaaS/PaaS/SaaS 可用責任分工解釋。',
      '資訊倫理常和個資保護、著作權、系統濫用與數位落差相關。'
    ],
    diagramInstructions:
      '文字圖解：畫四格概念卡。SQL Injection 卡列「輸入 -> SQL -> DB」與參數化防禦；IoT 卡列感測器 -> 網路 -> 平台 -> 應用；雲端卡列 IaaS/PaaS/SaaS 三層；資訊倫理卡列隱私、智財、公平、責任、安全。',
    diagramAltText:
      '四個簡答概念分別整理 SQL Injection、IoT、雲端服務類別與資訊倫理核心原則。',
    keyTerms: ['SQL Injection', 'IoT', 'IaaS', 'PaaS', '資訊倫理'],
    scoringPoints: ['SQL Injection 原理與防禦完整', 'IoT 四項範疇合理', '雲端三類正確', '資訊倫理定義具體'],
    commonMistakes: ['只寫 SQL Injection 是駭客攻擊', 'IoT 只寫感測器', '雲端三類名稱與定義不匹配'],
    handoutRefs: ['B-110-簡答概念'],
    sourceRef: sourceRef(3),
    reviewStatus: 'verified'
  },
  {
    year: '110',
    number: 4,
    subject: 'programming',
    sourceBatch: '110-batch-2',
    examPoints: ['遞迴', '細胞成長', 'GCD', '輾轉相除法'],
    difficulty: 'intermediate',
    questionType: 'mixed',
    originalQuestion: sourceRef(4).originalExcerpt,
    questionExplanation:
      '本題兩個遞迴函式。細胞題要建立成年與幼年兩狀態的遞迴關係；GCD 則使用輾轉相除法。由於 source index 沒保留初始細胞數條件，細胞函式解析保留 needs-review。',
    modelAnswer:
      '細胞題可設 adult(n)、young(n) 兩函式：adult(n)=adult(n-1)+young(n-1)，young(n)=2*adult(n-1)，total(n)=adult(n)+young(n)。若題目預設起始為 1 個成年細胞，則 adult(0)=1、young(0)=0。GCD 可寫成 gcd(a,b)：若 b==0 回傳 a，否則回傳 gcd(b, a%b)。',
    modelAnswerDetails: [
      '成年細胞下個月仍為成年，且會產生 2 個幼年細胞。',
      '幼年細胞下個月轉為成年細胞。',
      'total 可由成年與幼年數相加得出。',
      'GCD 遞迴停止條件是餘數為 0。'
    ],
    diagramInstructions:
      '文字圖解：細胞模型畫兩狀態轉移：Adult(t) 產生 2 個 Young(t+1)，Young(t) 於下月轉為 Adult(t+1)，Total(t)=Adult(t)+Young(t)。GCD 另畫遞迴：GCD(a,b) -> GCD(b,a mod b)，直到 b=0 回傳 a。',
    diagramAltText:
      '細胞數可由成年與幼年兩狀態逐月轉移計算；GCD 用輾轉相除遞迴。',
    keyTerms: ['recursive', 'CellNumber', 'adult', 'young', 'GCD'],
    scoringPoints: ['細胞狀態轉移合理', '遞迴停止條件明確', 'GCD 輾轉相除正確', '輸入與回傳定義清楚'],
    commonMistakes: ['只用單一數列而漏掉幼年轉成年', 'GCD 直接暴力試除', '沒有處理 b==0 停止條件'],
    handoutRefs: ['B-110-遞迴'],
    sourceRef: sourceRef(4),
    reviewStatus: 'needs-review'
  },
  {
    year: '110',
    number: 5,
    subject: 'programming',
    sourceBatch: '110-batch-2',
    examPoints: ['並行控制', 'lock', 'retry', '取號系統'],
    difficulty: 'advanced',
    questionType: 'mixed',
    originalQuestion: sourceRef(5).originalExcerpt,
    questionExplanation:
      '多台取號機同時操作同一服務號碼，核心是臨界區保護。GetNumber 必須先 lock，成功後才能 get/set 號碼，最後 unlock；lock 失敗要 sleep 後重試，超過上限回傳 0。',
    modelAnswer:
      'GetNumber(serviceid, maxFail) 可設 fail=0；while lock(serviceid)==0 時，fail++，若 fail>maxFail 回傳 0，否則 sleep() 後重試。鎖定成功後 current=get(serviceid)，next=current+1，set(serviceid,next)，unlock(serviceid)，return next。若採 get 回傳目前最後號碼，則回傳 next；若 get 回傳下一號碼，需依題目定義調整，這點因抽取需複核而保留 needs-review。',
    modelAnswerDetails: [
      'lock 成功後到 unlock 前是臨界區，避免兩台機器拿到同一號碼。',
      '失敗次數上限要在重試迴圈內檢查。',
      'sleep 可降低忙等造成的系統負載。',
      '成功路徑必須 unlock，否則後續取號會被永久阻塞。'
    ],
    diagramInstructions:
      '文字圖解：畫 GetNumber 流程：輸入服務代碼與失敗上限 -> 嘗試 lock；失敗則 retry+1、sleep，若 retry 超過上限回傳 0；成功則 get 目前號碼、next=current+1、set 新號碼、unlock、回傳 next。',
    diagramAltText:
      '取號函式用鎖保護共用號碼，鎖定失敗過多則回傳 0。',
    keyTerms: ['lock', 'unlock', 'critical section', 'retry', 'GetNumber'],
    scoringPoints: ['先 lock 再讀寫號碼', '失敗上限處理正確', '成功後 set 並 unlock', '失敗過多回傳 0'],
    commonMistakes: ['未加 lock 就 get/set', 'lock 成功後忘記 unlock', '失敗次數沒有上限', '回傳舊號碼或新號碼定義混亂'],
    handoutRefs: ['B-110-取號系統'],
    sourceRef: sourceRef(5),
    reviewStatus: 'needs-review'
  },
  {
    year: '110',
    number: 6,
    subject: 'programming',
    sourceBatch: '110-batch-2',
    examPoints: ['Queue', '電梯派遣', '最短距離', '例外處理'],
    difficulty: 'advanced',
    questionType: 'mixed',
    originalQuestion: sourceRef(6).originalExcerpt,
    questionExplanation:
      '題目要從共用 Queue 取一個目標樓層，再掃描所有電梯目前位置，選距離最近且可服務的電梯。需處理 Queue 無資料、電梯不可服務、未選到電梯與地下樓層號碼等情況。',
    modelAnswer:
      'SelElev(N) 先 target=getqueue()；若 target==999 回傳 0。設定 bestElev=0、bestDistance=無限大。for elevid=1..N，cur=getcurfloor(elevid)，若 cur==999 代表不服務則跳過；distance=abs(cur-target)，若 distance<bestDistance，更新 bestDistance 與 bestElev。迴圈結束回傳 bestElev；若沒有任何可服務電梯，bestElev 仍為 0。平手規則題目未明確，可採較小電梯號碼優先並註明假設。',
    modelAnswerDetails: [
      'getqueue 回傳 999 表示無目標樓層，應立即回傳 0。',
      'getcurfloor 回傳 999 表示該電梯不提供服務，不能納入比較。',
      '地下樓層以 0、-1 等數值表示，距離可直接用絕對值計算。',
      '若平手規則未給，需在答案中說明採用的 tie-breaker。'
    ],
    diagramInstructions:
      '文字圖解：畫流程：getqueue 取得目標樓層；若無目標回傳 0；逐台電梯呼叫 getcurfloor 與服務狀態；排除不可服務者；計算 |目前樓層-目標樓層|；選距離最小者回傳電梯號碼，若無可用電梯回傳 0。',
    diagramAltText:
      '系統從 Queue 取出目標樓層，逐台比較距離與狀態後選最近可服務電梯。',
    keyTerms: ['Queue', 'SelElev', 'getqueue', 'getcurfloor', 'distance'],
    scoringPoints: ['處理 getqueue 無資料', '排除不服務電梯', '距離計算正確', '沒有可用電梯回傳 0'],
    commonMistakes: ['把 999 當樓層', '地下樓層距離算錯', '未處理沒有可用電梯', '平手規則未說明'],
    handoutRefs: ['B-110-電梯派遣'],
    sourceRef: sourceRef(6),
    reviewStatus: 'needs-review'
  }
];
