import { getBGroupSourceIndex } from '@/modules/examGroups/bGroup/data/sourceIndex';
import type { BGroupEssayQuestionAnalysis } from '@/modules/examGroups/bGroup/types/essayQuestionAnalysis';

const sourceIndex = getBGroupSourceIndex('112');

function sourceRef(number: number): BGroupEssayQuestionAnalysis['sourceRef'] {
  const entry = sourceIndex.find((candidate) => candidate.number === number);

  if (!entry) {
    throw new Error(`Missing 112 B group source index entry: ${number}`);
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
    year: '112',
    number: 1,
    subject: 'mixed',
    sourceBatch: '112-batch-1',
    examPoints: ['SQL', '關聯式資料庫', '聚合查詢', '排序'],
    difficulty: 'advanced',
    questionType: 'short-answer',
    originalQuestion: sourceRef(1).originalExcerpt,
    questionExplanation:
      '本題要求依四個資料表寫三個 SQL。第一題是銷售資料連產品資料並依銷售數量排序；第二題是計算折扣並取前 5 筆；第三題是針對 P017 找出至少訂購 3 次的客戶並算平均售價。由於 PDF 原題用底線標示主鍵，文字索引無法保留底線，所以此題保留人工複核。',
    modelAnswer:
      '第一小題可由銷售資料檔 join 產品資料檔，選出產品名稱、出貨工廠、計量單位、銷售數量並 ORDER BY 銷售數量 DESC。第二小題需計算 ROUND(售價/(銷售數量*單價),2) 作為銷售折扣，依折扣 ASC 排序並取前 5 筆。第三小題需篩選產品代號 P017，依公司與產品分組，HAVING COUNT(*) >= 3，並計算 SUM(售價)/SUM(銷售數量) 四捨五入後的平均售價。',
    modelAnswerDetails: [
      'JOIN 條件要使用產品代號、員工代號與公司代號對應到各主檔。',
      '折扣計算要注意分母是數量乘以單價，不是只用單價。',
      '前 5 筆可依資料庫語法使用 LIMIT 5、TOP 5 或 FETCH FIRST 5 ROWS。',
      'P017 題要分清楚訂購次數、銷售數量、總售價與平均售價。'
    ],
    diagramInstructions:
      '文字圖解：畫四個資料表方框。銷售資料檔位於中央，透過員工代號連到員工資料檔、公司代號連到客戶資料檔、產品代號連到產品資料檔。三個查詢路徑分別標示：銷售數量排序、折扣計算前 5 筆、P017 客戶分組與平均售價。',
    diagramAltText:
      '銷售資料檔連接員工、客戶與產品主檔，三個 SQL 題分別做排序、折扣計算與 P017 分組平均。',
    keyTerms: ['JOIN', 'ORDER BY', 'ROUND', 'HAVING', 'P017'],
    scoringPoints: ['JOIN 關係正確', '銷售折扣公式正確', '前 5 筆排序方向正確', 'P017 分組與 HAVING 條件正確'],
    commonMistakes: ['漏接產品資料檔導致沒有單價', '折扣分母少乘銷售數量', '把至少 3 次誤寫成數量至少 3', '平均售價未依總售價除以銷售數量'],
    handoutRefs: ['B-112-SQL-銷售資料'],
    sourceRef: sourceRef(1),
    reviewStatus: 'needs-review'
  },
  {
    year: '112',
    number: 2,
    subject: 'information-management',
    sourceBatch: '112-batch-1',
    examPoints: ['數位轉型', '企業策略', '成熟度階段'],
    difficulty: 'basic',
    questionType: 'essay',
    originalQuestion: sourceRef(2).originalExcerpt,
    questionExplanation:
      '本題要把數位轉型從「導入工具」提升到「改變營運與價值創造」。作答時要先定義，再列出轉型需兼顧的層面，最後用階段說明從數位化到真正轉型的漸進過程。',
    modelAnswer:
      '數位轉型是企業運用數位科技、資料與流程改造，重新設計營運模式、顧客體驗與決策方式，以提升效率、韌性與創新能力。五大層面可包含策略與領導、組織文化與人才、流程與營運、資料與科技基礎、顧客與商業模式。三階段可說明為數位化資料與作業、流程與服務數位優化、以資料與平台重塑商業模式。',
    modelAnswerDetails: [
      '數位轉型不等於把紙本變電子檔，重點是營運與價值鏈改變。',
      '策略與領導提供方向，文化與人才決定能否落地。',
      '流程與科技基礎要配合資料治理，才有後續分析與自動化價值。',
      '三階段答案需呈現由局部改善到整體商業模式改造。'
    ],
    diagramInstructions:
      '文字圖解：畫三階段路徑。階段 1「數位化」：紙本、人工作業轉成資料與系統。階段 2「數位優化」：流程自動化、跨部門整合、即時監控。階段 3「數位轉型」：用資料、平台與新服務改變商業模式。路徑下方橫跨五個支柱：策略領導、組織人才、流程營運、資料科技、顧客商模。',
    diagramAltText:
      '數位轉型由資料數位化開始，經流程優化，最後重塑商業模式，並由五個企業層面共同支撐。',
    keyTerms: ['數位轉型', '數位化', '流程優化', '資料治理', '商業模式'],
    scoringPoints: ['定義不只限於資訊化', '五大層面具體', '三階段順序合理', '能連到後疫情韌性'],
    commonMistakes: ['把數位轉型只寫成買系統', '只列科技不談人與流程', '階段沒有前後層次'],
    handoutRefs: ['B-112-數位轉型'],
    sourceRef: sourceRef(2),
    reviewStatus: 'verified'
  },
  {
    year: '112',
    number: 3,
    subject: 'information-management',
    sourceBatch: '112-batch-1',
    examPoints: ['雲端服務', 'CSP', '部署模型', '資安政策'],
    difficulty: 'intermediate',
    questionType: 'essay',
    originalQuestion: sourceRef(3).originalExcerpt,
    questionExplanation:
      '題目以政府機關雲端服務資安指引為背景，要求定義服務種類、部署模型與資安政策考量。答案要分層寫：服務模式是「供應什麼能力」，部署模型是「資源由誰使用與管理」，政策是「機關如何治理風險」。',
    modelAnswer:
      '雲端服務種類可分 IaaS、PaaS、SaaS：IaaS 提供運算、儲存、網路等基礎設施；PaaS 提供開發部署平台；SaaS 提供可直接使用的應用。部署模型可分公有雲、私有雲、社群雲、混合雲。資安政策至少應考量資料分類與保護、身分與存取控制、加密與金鑰管理、日誌監控與稽核、備份與營運持續、供應商責任與合約 SLA。',
    modelAnswerDetails: [
      'IaaS、PaaS、SaaS 的差異可用責任分工說明。',
      '公有雲是多租戶共享，私有雲由單一組織使用，社群雲由特定社群共享，混合雲結合多種模型。',
      '政府機關政策需特別注意資料主權、機敏資料分類與供應商合規。',
      '至少六項政策考量要可操作，不宜只寫「要安全」。'
    ],
    diagramInstructions:
      '文字圖解：建立兩層表。上層是服務模式三欄：IaaS=基礎設施、PaaS=平台、SaaS=應用。下層是部署模型四欄：公有雲、私有雲、社群雲、混合雲。表格右側接一個政策清單，列資料分類、IAM、加密金鑰、監控稽核、備份持續、供應商 SLA。',
    diagramAltText:
      '雲端題以服務模式、部署模型與資安政策三塊呈現，分別說明能力、使用方式與治理控制。',
    keyTerms: ['IaaS', 'PaaS', 'SaaS', '公有雲', '資安政策'],
    scoringPoints: ['三種服務種類定義正確', '四種部署模型特性完整', '列出六項政策考量', '能扣合政府機關風險'],
    commonMistakes: ['混淆服務模式與部署模型', '只列廠商名稱沒有定義', '政策項目過於抽象'],
    handoutRefs: ['B-112-雲端資安'],
    sourceRef: sourceRef(3),
    reviewStatus: 'verified'
  },
  {
    year: '112',
    number: 4,
    subject: 'programming',
    sourceBatch: '112-batch-2',
    examPoints: ['C 語言安全', 'buffer overflow', 'gets', '輸入驗證'],
    difficulty: 'advanced',
    questionType: 'mixed',
    originalQuestion: sourceRef(4).originalExcerpt,
    questionExplanation:
      '程式使用固定長度 char 陣列與 gets，這是典型緩衝區溢位風險。gets 不知道陣列大小，超長輸入可能覆寫相鄰記憶體，造成程式流程被改變。由於 source index 只保留摘要化程式碼，此題維持 needs-review。',
    modelAnswer:
      '安全性威脅是 buffer overflow。username[16] 與 password[16] 長度固定，但 gets 不檢查輸入長度，攻擊者可輸入超過 15 個字元加結尾字元的內容，覆寫相鄰變數或控制資料。修訂作法包含改用 fgets(username, sizeof(username), stdin)、移除換行、檢查長度、使用安全字串比較，避免硬編碼密碼，並以雜湊密碼與鎖定策略保護帳號驗證。',
    modelAnswerDetails: [
      'gets 已被視為不安全，因為無法限制讀入長度。',
      '固定長度陣列需要保留字串結尾 null byte。',
      '修正不只換函式，也要處理換行、長度與密碼儲存方式。',
      '若輸入可控制程式流程，可能造成未授權指令執行。'
    ],
    diagramInstructions:
      '文字圖解：畫垂直記憶體配置：username[16]、password[16]、相鄰控制資料。標示 gets(username) 或 gets(password) 不檢查長度，超長輸入會越界覆寫相鄰區域。防禦路徑標示改用 fgets、長度檢查、白名單驗證、密碼雜湊與避免執行使用者可控制指令。',
    diagramAltText:
      '固定長度字元陣列配合 gets 會讓超長輸入覆寫相鄰記憶體，造成安全風險。',
    keyTerms: ['buffer overflow', 'gets', 'fgets', '輸入長度', '密碼雜湊'],
    scoringPoints: ['指出緩衝區溢位', '說明 gets 危害原理', '提出安全讀入方式', '補充密碼驗證改善'],
    commonMistakes: ['只說密碼太短而未指出 gets', '改用 scanf 但仍未限制長度', '忽略 null byte 與換行處理'],
    handoutRefs: ['B-112-C-安全'],
    sourceRef: sourceRef(4),
    reviewStatus: 'needs-review'
  },
  {
    year: '112',
    number: 5,
    subject: 'programming',
    sourceBatch: '112-batch-2',
    examPoints: ['stack', 'LIFO', 'push', 'pop'],
    difficulty: 'basic',
    questionType: 'mixed',
    originalQuestion: sourceRef(5).originalExcerpt,
    questionExplanation:
      'stack 是後進先出資料結構。題目除了定義與應用案例，也要求把四個浮點數放入 stack 後逐一移除並檢查是否為空，因此必須寫出 top 指標或 count 狀態。',
    modelAnswer:
      'stack 是 Last-In, First-Out 的線性資料結構，只能從頂端 push 與 pop。應用例包含函式呼叫堆疊、括號配對、瀏覽器上一頁、undo/redo。程式可用陣列 stack[4] 與 top=-1；push 時先 top++ 再放值，依序放入 20.22、12.21、70.25、58.29；pop 時讀取 stack[top] 再 top--，輸出順序為 58.29、70.25、12.21、20.22；top==-1 表示 stack 已空。',
    modelAnswerDetails: [
      'LIFO 是最核心定義，最後放入的元素最先移除。',
      'push 前要檢查是否 full，pop 前要檢查是否 empty。',
      'top 可指向目前頂端元素，空堆疊時設為 -1。',
      '本題若不使用 stack 概念，即使能輸出數字也不得分。'
    ],
    diagramInstructions:
      '文字圖解：畫 stack 直式方格，底到頂依序為 20.22、12.21、70.25、58.29，top 指向 58.29。pop 流程依序移除 58.29、70.25、12.21、20.22，最後 top=-1 或 count=0 表示空堆疊。',
    diagramAltText:
      '四個數值依序入 stack，出 stack 時順序相反，最後可偵測為空。',
    keyTerms: ['stack', 'LIFO', 'push', 'pop', 'top'],
    scoringPoints: ['stack 定義正確', '應用案例具體', 'push/pop 順序正確', '能偵測空堆疊'],
    commonMistakes: ['把 stack 寫成 FIFO queue', 'pop 順序仍照輸入順序', '沒有檢查空堆疊'],
    handoutRefs: ['B-112-stack'],
    sourceRef: sourceRef(5),
    reviewStatus: 'verified'
  },
  {
    year: '112',
    number: 6,
    subject: 'mixed',
    sourceBatch: '112-batch-2',
    examPoints: ['資料清理', 'ETL', '資料驗證', '資料庫寫入'],
    difficulty: 'intermediate',
    questionType: 'short-answer',
    originalQuestion: sourceRef(6).originalExcerpt,
    questionExplanation:
      '本題是 ETL 小系統設計。讀取 data.txt 後不能直接寫入資料庫，必須先逐列切欄位、檢查缺漏、清理空白與大小寫，再做 User ID、Age、Phone 格式驗證，最後才建立資料表並寫入有效資料。',
    modelAnswer:
      '程式流程可分 read、clean、validate、load。逐行讀取 data.txt，以逗號切出 User ID、Name、Age、Address、Email、Phone；若欄位數不足或有必要欄位空白就跳過或記錄錯誤。Name 與 Address trim，Email 轉小寫。User ID 必須符合 8 位數字，Age 必須為正整數，Phone 必須符合 09 開頭且共 10 位數。首次寫入前建立 user_data 資料表，使用 prepared statement 將有效資料寫入 SQLite、MySQL 或 PostgreSQL。',
    modelAnswerDetails: [
      '資料清理與驗證要在寫入資料庫前完成。',
      'Email 轉小寫是標準化，User ID、Age、Phone 是合法性驗證。',
      '缺失欄位的紀錄應拒絕或記錄，不應以錯誤資料補進資料庫。',
      '寫入資料庫應使用 prepared statement，避免把資料直接拼成 SQL。'
    ],
    diagramInstructions:
      '文字圖解：畫 pipeline：data.txt -> 讀取欄位 User ID/Name/Age/Address/Email/Phone -> 清理空白與缺失欄位 -> Email 轉小寫 -> 驗證 User ID、Age、Phone -> 建立 user_data 表 -> 寫入有效資料；旁支標示不合法資料被拒絕或記錄。',
    diagramAltText:
      '程式從文字檔讀取資料，清理與驗證後建立資料表並寫入合法資料。',
    keyTerms: ['ETL', '資料清理', 'prepared statement', 'User ID', 'user_data'],
    scoringPoints: ['讀取與欄位切分合理', '清理規則完整', '三項格式驗證正確', '建立資料表並安全寫入'],
    commonMistakes: ['未檢查欄位數就直接取值', 'Email 未標準化', '手機號碼只檢查長度未檢查 09', '直接拼接 SQL'],
    handoutRefs: ['B-112-資料清理-ETL'],
    sourceRef: sourceRef(6),
    reviewStatus: 'verified'
  }
];
