import { getBGroupSourceIndex } from '@/modules/examGroups/bGroup/data/sourceIndex';
import type { BGroupEssayQuestionAnalysis } from '@/modules/examGroups/bGroup/types/essayQuestionAnalysis';

const sourceIndex = getBGroupSourceIndex('107');

function sourceRef(number: number): BGroupEssayQuestionAnalysis['sourceRef'] {
  const entry = sourceIndex.find((candidate) => candidate.number === number);

  if (!entry) {
    throw new Error(`Missing 107 B group source index entry: ${number}`);
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
    year: '107',
    number: 1,
    subject: 'information-management',
    sourceBatch: '107-batch-1',
    examPoints: ['大資料平台', '資料來源', '資料湖', '資料應用'],
    difficulty: 'advanced',
    questionType: 'essay',
    originalQuestion: sourceRef(1).originalExcerpt,
    questionExplanation:
      '題目要求用資料來源、資料系統、資料應用三層順序規劃大資料平台。答案要說出為何傳統 RDB/DW/MPP 不足，以及新平台如何與既有資訊架構整合。',
    modelAnswer:
      '可規劃多層架構：資料來源包含系統紀錄、郵件、社群媒體、感測器、既有 RDB/DW；資料匯入層支援批次 ETL 與串流 ingestion；平台層使用分散式儲存、資料湖、運算框架與 metadata 管理；整合層提供 API、資料倉儲同步與資料治理；應用層支援 BI 儀表板、異常偵測、精準行銷、預測維護與機器學習。',
    modelAnswerDetails: [
      '新型資料來源有 volume、velocity、variety 特性，傳統系統在成本與效能上可能不足。',
      '資料湖可先保存原始資料，再依應用需求整理成可分析資料集。',
      '與既有資訊架構整合時，要保留 DW/報表並用 API 或 ETL 串接。',
      '治理、安全、metadata 與權限控管應橫跨所有層。'
    ],
    diagramInstructions:
      '文字圖解：畫五層架構。資料來源層含紀錄、郵件、社群媒體、感應器、既有資料庫；匯入層含串流/批次 ETL；平台層含分散式儲存與運算；整合層連到既有資訊系統、資料倉儲、API；應用層含 BI、儀表板、分析、機器學習。安全、治理、metadata 橫跨各層。',
    diagramAltText:
      '大資料平台從多元資料來源匯入，經分散式儲存與運算後整合既有系統並支援分析應用。',
    keyTerms: ['big data', 'data lake', 'ETL', 'streaming', 'metadata'],
    scoringPoints: ['三層或多層架構清楚', '資料來源多元', '說明與既有系統整合', '應用情境具體'],
    commonMistakes: ['只畫 Hadoop 名稱沒有應用情境', '忽略治理與安全', '未說明既有 RDB/DW 如何整合'],
    handoutRefs: ['B-107-大資料平台'],
    sourceRef: sourceRef(1),
    reviewStatus: 'verified'
  },
  {
    year: '107',
    number: 2,
    subject: 'information-management',
    sourceBatch: '107-batch-1',
    examPoints: ['NoSQL', 'scalability', 'schema-less', '資料庫類型'],
    difficulty: 'basic',
    questionType: 'short-answer',
    originalQuestion: sourceRef(2).originalExcerpt,
    questionExplanation:
      'NoSQL 題要列出類型並說明擴充與 schema 彈性。答案可用 key-value、document、column-family、graph 四類，並說明水平擴充與非固定欄位。',
    modelAnswer:
      '四類主流 NoSQL 包含 key-value store，適合快取與簡單查找；document database，以 JSON/BSON 文件保存半結構資料；column-family database，適合大量稀疏欄位與分散式寫入；graph database，適合節點與關係查詢。增加機器自動擴充容量通常靠水平擴充、分片與 replication；打破 schema 限制是指資料不必預先固定欄位，可依文件或列族彈性保存不同結構。',
    modelAnswerDetails: [
      'NoSQL 不代表沒有查詢語言，而是資料模型不以傳統關聯表為唯一中心。',
      '水平擴充讓系統透過增加節點提升容量與吞吐。',
      'schema-less 或 schema-flexible 有彈性，但仍需要應用層資料治理。',
      '圖資料庫適合社群關係、推薦或路徑查詢。'
    ],
    diagramInstructions:
      '文字圖解：畫四象限 NoSQL 類型圖。左上 Key-Value：key -> value；右上 Document：文件含彈性欄位；左下 Column-family：row key 對多欄族；右下 Graph：node-edge-node。圖下方標示共同特性：水平擴充、分散式、彈性 schema。',
    diagramAltText:
      'NoSQL 可分 key-value、document、column-family、graph 四類，支援水平擴充與彈性欄位。',
    keyTerms: ['NoSQL', 'key-value', 'document database', 'column-family', 'graph database'],
    scoringPoints: ['列出四類 NoSQL', '各類說明合理', '自動擴充特性正確', 'schema 彈性說明清楚'],
    commonMistakes: ['只列產品名稱沒有類型', '把 NoSQL 說成不能有 schema', '忽略一致性與治理成本'],
    handoutRefs: ['B-107-NoSQL'],
    sourceRef: sourceRef(2),
    reviewStatus: 'verified'
  },
  {
    year: '107',
    number: 3,
    subject: 'information-management',
    sourceBatch: '107-batch-1',
    examPoints: ['資通安全管理法', '政策目標', '推動策略', '具體措施'],
    difficulty: 'intermediate',
    questionType: 'short-answer',
    originalQuestion: sourceRef(3).originalExcerpt,
    questionExplanation:
      '本題是政策型申論，重點是把目標、推動策略、具體措施分層回答。不要只喊口號，要能對應政府提升資安治理、關鍵基礎設施防護與人才能量。',
    modelAnswer:
      '目標可包含建立安全可信賴數位環境、提升政府與關鍵基礎設施防護能力、帶動資安產業與人才。推動策略可包含強化法制與治理、建立資安聯防與通報應變、推動資安人才與產業、深化關鍵基礎設施防護。具體措施可包含分級防護、資安責任等級、稽核與演練、事件通報、資安監控、教育訓練與供應鏈安全管理。',
    modelAnswerDetails: [
      '目標是政策想達成的結果，策略是推進方向，措施是可執行行動。',
      '資通安全管理法強調政府機關與特定非公務機關的資安責任。',
      '通報與應變能縮短事件發現到處理時間。',
      '分級防護可依機關重要性配置不同資安要求。'
    ],
    diagramInstructions:
      '文字圖解：畫三層金字塔。頂層「目標」：可信賴數位國家、關鍵基礎設施安全、資安產業人才。中層「推動策略」：法制治理、聯防應變、人才產業、基礎設施防護。底層「具體措施」：分級防護、稽核演練、事件通報、監控、教育訓練、供應鏈管理。',
    diagramAltText:
      '資安政策以目標、策略、措施三層展開，從願景到治理方向再到可執行做法。',
    keyTerms: ['資通安全管理法', '分級防護', '資安通報', '關鍵基礎設施'],
    scoringPoints: ['目標列舉合理', '推動策略具體', '措施可執行', '三層不混淆'],
    commonMistakes: ['只寫抽象願景', '策略與措施混在一起', '漏掉通報應變與分級管理'],
    handoutRefs: ['B-107-資安政策'],
    sourceRef: sourceRef(3),
    reviewStatus: 'verified'
  },
  {
    year: '107',
    number: 4,
    subject: 'mixed',
    sourceBatch: '107-batch-2',
    examPoints: ['Session', 'Cookie', 'POST', 'GET', 'Web 開發'],
    difficulty: 'basic',
    questionType: 'essay',
    originalQuestion: sourceRef(4).originalExcerpt,
    questionExplanation:
      '這題比較四種網頁狀態或參數傳遞方式。Session 與 Cookie 常用於狀態管理；GET/POST 是 HTTP request 傳參方式。要從運作位置、安全性、速度與適用情境比較。',
    modelAnswer:
      'Session 通常把狀態資料存在伺服器端，瀏覽器只保存 session id，較適合登入狀態與敏感資料，但伺服器需維護狀態。Cookie 存在用戶端，每次符合條件會隨 request 傳送，可設定 HttpOnly、Secure、SameSite，但容量小且可能被竄改。GET 把參數放在 URL，方便分享與快取，但不適合敏感資料且長度有限。POST 把資料放在 request body，適合表單與較大量資料，但仍需 HTTPS 才能保護傳輸。',
    modelAnswerDetails: [
      'Session 安全性取決於 session id 保護與伺服器端控管。',
      'Cookie 可被使用者端看到或修改，重要資料不應只靠 cookie 明文保存。',
      'GET 參數會出現在網址、瀏覽器紀錄與伺服器日誌。',
      'POST 並非天生加密，沒有 HTTPS 一樣可能被攔截。'
    ],
    diagramInstructions:
      '文字圖解：畫四欄比較表：Session、Cookie、GET、POST。列出保存位置、傳輸方式、適用情境、安全注意、速度/限制。Session 欄寫伺服器端狀態；Cookie 欄寫用戶端小資料；GET 欄寫 URL query；POST 欄寫 request body。',
    diagramAltText:
      'Session、Cookie、GET、POST 的比較表，依保存位置、傳參方式、安全性與適用情境區分。',
    keyTerms: ['Session', 'Cookie', 'GET', 'POST', 'HTTPS'],
    scoringPoints: ['四者運作方式正確', '安全性比較具體', '速度與限制合理', '適用情境清楚'],
    commonMistakes: ['以為 POST 一定安全', '把 Cookie 說成伺服器端保存', 'GET 傳敏感資料'],
    handoutRefs: ['B-107-Web-狀態管理'],
    sourceRef: sourceRef(4),
    reviewStatus: 'verified'
  },
  {
    year: '107',
    number: 5,
    subject: 'programming',
    sourceBatch: '107-batch-2',
    examPoints: ['身分證字號', 'IF conditions', 'Regular Expression', '輸入驗證'],
    difficulty: 'intermediate',
    questionType: 'mixed',
    originalQuestion: sourceRef(5).originalExcerpt,
    questionExplanation:
      '題目要求用兩種方式檢查身分證格式：多條件式與正規表示法。若只檢查長度不夠，至少要檢查首碼英文字母、第二碼性別碼與後續數字；若要更完整可加入檢查碼。',
    modelAnswer:
      '多條件式可依序檢查：字串長度為 10；第 1 碼為 A-Z；第 2 碼為 1 或 2；第 3 到第 10 碼皆為數字；若要完整驗證，再依臺灣身分證規則計算檢查碼。正規表示法基本格式可用 /^[A-Z][12][0-9]{8}$/，若允許小寫則先轉大寫。兩者都應處理空字串與非字串輸入。',
    modelAnswerDetails: [
      'IF conditions 的優點是每個錯誤可回報不同原因。',
      'Regex 寫法簡潔，但較不容易表達檢查碼演算法。',
      '第二碼常用 1/2 代表性別碼或類別規則。',
      '正式系統還需檢查字母對應數值與權重檢查碼。'
    ],
    diagramInstructions:
      '文字圖解：畫驗證流程。輸入字串 -> 長度是否 10 -> 第 1 碼是否英文字母 -> 第 2 碼是否 1/2 -> 後 8 碼是否數字 -> 可選檢查碼驗證 -> 通過或失敗。旁邊放 regex：^[A-Z][12][0-9]{8}$。',
    diagramAltText:
      '身分證格式驗證依長度、首碼字母、第二碼與後八碼數字逐步檢查，也可用正規表示法表示。',
    keyTerms: ['IF conditions', 'Regular Expression', '身分證字號', 'input validation'],
    scoringPoints: ['多條件式檢查完整', 'Regex 格式合理', '處理大小寫或輸入例外', '可說明檢查碼加分'],
    commonMistakes: ['只檢查長度', 'Regex 少了開頭結尾錨點', '第二碼未限制 1/2'],
    handoutRefs: ['B-107-身分證驗證'],
    sourceRef: sourceRef(5),
    reviewStatus: 'verified'
  },
  {
    year: '107',
    number: 6,
    subject: 'programming',
    sourceBatch: '107-batch-2',
    examPoints: ['Circular Queue', 'Array', 'enqueue', 'dequeue'],
    difficulty: 'intermediate',
    questionType: 'mixed',
    originalQuestion: sourceRef(6).originalExcerpt,
    questionExplanation:
      '環狀佇列用固定陣列模擬 queue，透過取餘數讓尾端接回開頭。重點是 front、rear 的定義，以及空佇列與滿佇列條件。',
    modelAnswer:
      'Circular Queue 是用陣列首尾相接的佇列，避免一般陣列 queue 刪除前端後浪費空間。可設 front 指向隊首元素，rear 指向下一個可插入位置；empty 條件 front==rear，full 條件 (rear+1)%capacity==front。enqueue 時若 full 則拒絕，否則 queue[rear]=item，rear=(rear+1)%capacity。dequeue 時若 empty 則拒絕，否則取 queue[front]，front=(front+1)%capacity。',
    modelAnswerDetails: [
      'queue 是 FIFO，先進先出。',
      'rear 用取餘數回到陣列開頭，形成環狀效果。',
      '預留一格可區分 full 與 empty；也可用 count 變數區分。',
      '新增與刪除都應先檢查滿/空狀態。'
    ],
    diagramInstructions:
      '文字圖解：畫 N 格環狀陣列，索引 0 到 N-1 首尾相接。採 front 指向隊首元素、rear 指向下一個可插入位置；empty 條件為 front==rear，full 條件為 (rear+1)%N==front。enqueue 在 rear 寫入後 rear=(rear+1)%N；dequeue 讀取 front 後 front=(front+1)%N。',
    diagramAltText:
      '環狀佇列以陣列首尾相接，front 與 rear 用取餘數方式循環移動。',
    keyTerms: ['Circular Queue', 'front', 'rear', 'enqueue', 'dequeue'],
    scoringPoints: ['定義 FIFO 與環狀陣列', 'front/rear 更新正確', '滿與空條件正確', '新增刪除方法完整'],
    commonMistakes: ['把 queue 寫成 stack', 'rear 到陣列尾端後未取餘數', '無法區分滿與空'],
    handoutRefs: ['B-107-CircularQueue'],
    sourceRef: sourceRef(6),
    reviewStatus: 'verified'
  }
];
