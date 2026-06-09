import { getBGroupSourceIndex } from '@/modules/examGroups/bGroup/data/sourceIndex';
import type { BGroupEssayQuestionAnalysis } from '@/modules/examGroups/bGroup/types/essayQuestionAnalysis';

const sourceIndex = getBGroupSourceIndex('113');

function sourceRef(number: number): BGroupEssayQuestionAnalysis['sourceRef'] {
  const entry = sourceIndex.find((candidate) => candidate.number === number);

  if (!entry) {
    throw new Error(`Missing 113 B group source index entry: ${number}`);
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
    year: '113',
    number: 1,
    subject: 'information-management',
    sourceBatch: '113-batch-1',
    examPoints: ['SQL', '關聯式資料庫', 'B+ tree', '查詢成本'],
    difficulty: 'advanced',
    questionType: 'mixed',
    originalQuestion: sourceRef(1).originalExcerpt,
    questionExplanation:
      '本題分成 SQL 查詢與實體資料庫成本估算兩段。SQL 部分要把 Author、Product、Buy、Member 的關聯接起來；「鐵粉」要用除法語意，也就是某會員買過指定作者所有書。B+ tree 部分要分清楚等值查詢與範圍查詢，且題目牽涉 clustered index 與資料分布假設，原始 DDL 細節仍需人工核對。',
    modelAnswer:
      '各作者銷售總金額可由 Author 連 Product 再連 Buy，依作者分組並計算 SUM(amount * unitPrice)。達文西鐵粉可先找出 Author.name 為達文西的所有 pNo，再用 GROUP BY 會員並以 HAVING COUNT(DISTINCT pNo) 等於達文西作品總數篩選。pNo 等值查詢若走 4 層 B+ tree，通常需 4 次索引頁加 1 次資料頁。unitPrice > z 是範圍查詢，需先走到起始 leaf，再掃描符合範圍的 leaf 或資料頁；若題目未給 z 選擇率，只能以選擇率 s 表示約 4 + ceil(100000*s/200) 頁，或明確說明估算假設。',
    modelAnswerDetails: [
      'SQL 銷售總金額的核心是 Author.pNo = Product.pNo 與 Product.pNo = Buy.pNo，金額是數量乘單價。',
      '鐵粉題是典型 relational division，可用 HAVING COUNT(DISTINCT b.pNo) = 子查詢總作品數。',
      'pNo 為主鍵等值查詢時，索引定位後最多取一筆對應資料頁。',
      'unitPrice 是範圍查詢，若未給資料分布或 z 的選擇率，不能武斷給單一固定頁數。'
    ],
    diagramInstructions:
      '文字圖解：分成兩區。左側畫資料表關聯摘要：Author(pNo,name) -> Product(pNo,pName,unitPrice) -> Buy(mId,pNo,BuyTime,amount) -> Member(mId,name)，箭頭標示 pNo 與 mId 的 join。右側畫 B+ tree 4 層搜尋路徑 root -> internal -> internal -> leaf -> data page。pNo 等值查詢標示走單一路徑後取單一資料頁；unitPrice > z 標示先找到起始 leaf，再沿 leaf 鏈與資料頁做範圍掃描，旁註需依選擇率估算。',
    diagramAltText:
      'SQL 表格以 pNo 與 mId 串接；B+ tree 查詢先走 4 層索引，等值查詢取單筆資料頁，範圍查詢還要掃描後續葉節點與資料頁。',
    keyTerms: ['SQL JOIN', 'relational division', 'B+ tree', 'clustered index', 'selectivity'],
    scoringPoints: ['銷售總額 SQL 連接與分組正確', '鐵粉查詢符合買齊所有作品語意', 'pNo 等值查詢成本計算合理', 'unitPrice 範圍查詢說明選擇率與掃描成本'],
    commonMistakes: ['鐵粉只查買過任一本達文西作品', '忘記乘上 amount', '把範圍查詢當成只取一個資料頁', '未說明 z 或資料分布假設'],
    handoutRefs: ['B-113-資料庫-SQL-BPlusTree'],
    sourceRef: sourceRef(1),
    reviewStatus: 'needs-review',
    childItems: [
      {
        kind: 'essay-part',
        label: '銷售總金額',
        prompt: '試以 SQL 語法列出各作者之銷售總金額。',
        expectedAnswer: 'Author、Product、Buy join 後依作者 GROUP BY，SUM(amount * unitPrice)。',
        scoringPoints: ['join 正確', '分組正確', '金額公式正確']
      },
      {
        kind: 'essay-part',
        label: '鐵粉查詢',
        prompt: '列出達文西的所有鐵粉姓名。',
        expectedAnswer: '用會員購買達文西作品的 distinct pNo 數量等於達文西作品總數篩選。',
        scoringPoints: ['指定作者', 'COUNT DISTINCT', '買齊所有作品']
      },
      {
        kind: 'calculation',
        label: 'B+ tree 成本',
        prompt: '估算 pNo 等值查詢與 unitPrice 範圍查詢平均存取硬碟頁數。',
        expectedAnswer: '等值查詢約 4+1；範圍查詢為 4 加符合資料頁數，需依選擇率估算。',
        scoringPoints: ['4 層索引', '資料頁', '範圍掃描']
      }
    ]
  },
  {
    year: '113',
    number: 2,
    subject: 'information-management',
    sourceBatch: '113-batch-1',
    examPoints: ['雲端服務模式', 'CSP', 'ISO 27001', 'PDCA'],
    difficulty: 'basic',
    questionType: 'mixed',
    originalQuestion: sourceRef(2).originalExcerpt,
    questionExplanation:
      '本題前半要能把 SaaS、PaaS、IaaS 的責任層級分清楚，並各舉兩個雲端服務提供者或服務實例。後半要求畫 ISO 27001 ISMS 的 PDCA 循環，重點是四階段持續改善，而不是只列英文單字。',
    modelAnswer:
      'SaaS 是直接使用供應商提供的應用服務，例如 Google Workspace/Gmail、Microsoft 365。PaaS 是使用供應商提供的應用開發與部署平台，例如 Google App Engine、Azure App Service、Heroku。IaaS 是使用虛擬機、儲存、網路等基礎設施，例如 AWS EC2、Azure Virtual Machines、Google Compute Engine。ISO 27001 ISMS 的 PDCA 為 Plan 規劃資安政策、範圍與風險評估；Do 實作控制措施；Check 監控、稽核與量測；Act 依結果矯正與持續改善。',
    modelAnswerDetails: [
      'SaaS 管理最少，使用者主要設定帳號與資料；IaaS 管理最多，仍需管 OS、middleware 與應用。',
      '舉例要能對應到模式，不宜把 Gmail 寫成 IaaS 或把 EC2 寫成 SaaS。',
      'PDCA 的圖要呈現循環，不是一次性流程。',
      'ISMS 情境下 Plan 需連到風險評估，Check 需連到稽核與績效量測。'
    ],
    diagramInstructions:
      '文字圖解：建立順時針循環 Plan -> Do -> Check -> Act -> 回到 Plan。Plan 標示 ISMS 範圍、風險評估、目標與政策；Do 標示控制措施執行與教育訓練；Check 標示監控、內部稽核、績效量測；Act 標示矯正、預防與持續改善。循環外側註明 ISO 27001 ISMS 是持續改善管理系統。',
    diagramAltText:
      'ISO 27001 ISMS 以 Plan、Do、Check、Act 四階段循環持續改善資訊安全管理。',
    keyTerms: ['SaaS', 'PaaS', 'IaaS', 'ISMS', 'PDCA'],
    scoringPoints: ['三種雲端模式各有正確定義', '每種模式舉例合理', 'PDCA 四階段完整', '能連結 ISMS 風險與持續改善'],
    commonMistakes: ['只列廠商名稱未說明服務模式', '把 PaaS 與 IaaS 混淆', 'PDCA 少了回到 Plan 的循環意義'],
    handoutRefs: ['B-113-雲端與ISMS'],
    sourceRef: sourceRef(2),
    reviewStatus: 'verified'
  },
  {
    year: '113',
    number: 3,
    subject: 'information-management',
    sourceBatch: '113-batch-1',
    examPoints: ['UML', '系統分析', '圖表建模'],
    difficulty: 'advanced',
    questionType: 'essay',
    originalQuestion: sourceRef(3).originalExcerpt,
    questionExplanation:
      '題目要求列舉 4 種 UML 常用圖表並繪圖說明。可選圖種不只一種組合，但答案要涵蓋不同視角：使用者需求、靜態結構、互動順序、流程行為。因原題可接受圖種有彈性，解析採常見組合並保留人工複核。',
    modelAnswer:
      '可列舉使用案例圖、類別圖、循序圖與活動圖。使用案例圖描述 actor 與系統功能的互動；類別圖描述類別、屬性、方法與類別關係；循序圖描述物件之間訊息傳遞的時間順序；活動圖描述工作流程、判斷分支與開始結束。繪圖時每一種圖都要有基本符號與一個小情境，而不是只寫用途。',
    modelAnswerDetails: [
      '使用案例圖要有 actor、系統邊界與 use case 橢圓。',
      '類別圖要有類別名稱、屬性、方法與關聯或繼承線。',
      '循序圖要有生命線、訊息箭頭與由上而下的時間順序。',
      '活動圖要有開始、動作、判斷分支、合併與結束。'
    ],
    diagramInstructions:
      '文字圖解：用四個小圖呈現。Use Case 圖：actor「使用者」在系統邊界外，連到「登入」「查詢資料」「維護資料」三個用例。Class 圖：Member、Order、Product 三個類別方框，Member 1 對多 Order，Order 多對多 Product 可透過 OrderItem 連接。Sequence 圖：使用者 -> 系統 -> 資料庫 -> 系統 -> 使用者，訊息依序為送出查詢、查資料、回傳結果、顯示結果。Activity 圖：開始 -> 輸入資料 -> 檢核 -> 合法則處理，不合法則顯示錯誤 -> 結束。',
    diagramAltText:
      '以用例圖、類別圖、循序圖、活動圖示範 UML 的四種常用視角。',
    keyTerms: ['UML', 'Use Case Diagram', 'Class Diagram', 'Sequence Diagram', 'Activity Diagram'],
    scoringPoints: ['列出四種 UML 圖', '每種圖有用途說明', '每種圖有可重建的文字圖解', '圖種涵蓋需求、結構、互動與流程'],
    commonMistakes: ['只寫圖名沒有圖形元素', '把流程圖誤當所有 UML 圖', '類別圖缺少屬性方法與關係'],
    handoutRefs: ['B-113-UML-圖表'],
    sourceRef: sourceRef(3),
    reviewStatus: 'needs-review'
  },
  {
    year: '113',
    number: 4,
    subject: 'programming',
    sourceBatch: '113-batch-2',
    examPoints: ['二元樹', '前序中序重建', 'AVL 樹'],
    difficulty: 'advanced',
    questionType: 'mixed',
    originalQuestion: sourceRef(4).originalExcerpt,
    questionExplanation:
      '第一小題用前序與中序唯一重建二元樹：前序第一個字元是根，再用中序把左右子樹切開，遞迴處理。第二小題是 AVL 插入，重點是每次插入後回溯檢查高度差並用旋轉修正。',
    modelAnswer:
      '依前序 JBHCDIGAEF 與中序 CHBIDJEAGF，可重建根為 J 的二元樹。J 左子樹含 C H B I D，右子樹含 E A G F，繼續依前序切分可得 B、G 等節點位置。AVL 插入 53、68、72、5、47、14、36、21 後，最終可整理為以 47 為根，左子樹根 14、右子樹根 68 的平衡樹。',
    modelAnswerDetails: [
      '前序第一個節點永遠是目前子樹根。',
      '中序中根的左邊是左子樹、右邊是右子樹。',
      'AVL 每個節點左右子樹高度差不可超過 1。',
      '插入後若失衡，依 LL、RR、LR、RL 型態做單旋或雙旋。'
    ],
    diagramInstructions:
      '文字圖解：第一棵二元樹為根 J；J.left=B、J.right=G；B.left=H、B.right=D；H.left=C；D.left=I；G.left=A、G.right=F；A.left=E，其餘子節點為空。AVL 最終樹為根 47；47.left=14、47.right=68；14.left=5、14.right=36；36.left=21；68.left=53、68.right=72。',
    diagramAltText:
      '前序與中序可重建出根為 J 的二元樹；AVL 插入後根為 47，左右子樹分別以 14 與 68 為根。',
    keyTerms: ['prefix', 'infix', '二元樹', 'AVL', '旋轉'],
    scoringPoints: ['用前序找根', '用中序切分左右子樹', '二元樹節點位置正確', 'AVL 最終結構平衡'],
    commonMistakes: ['只照前序從左到右排節點', '忘記中序切分', 'AVL 插入後沒有做旋轉', '把 21 放到錯誤子樹'],
    handoutRefs: ['B-113-資料結構-樹'],
    sourceRef: sourceRef(4),
    reviewStatus: 'verified',
    childItems: [
      {
        kind: 'diagram',
        label: '二元樹重建',
        prompt: '依前序 JBHCDIGAEF 與中序 CHBIDJEAGF 畫唯一二元樹。',
        expectedAnswer: '根為 J，依中序左右切分遞迴完成各節點位置。',
        scoringPoints: ['根 J', '左右子樹正確', '所有節點放置正確']
      },
      {
        kind: 'diagram',
        label: 'AVL 插入',
        prompt: '依序插入 53、68、72、5、47、14、36、21，畫完成後 AVL 樹。',
        expectedAnswer: '最終根為 47，左右子樹高度平衡。',
        scoringPoints: ['插入順序正確', '旋轉正確', '最終平衡']
      }
    ]
  },
  {
    year: '113',
    number: 5,
    subject: 'programming',
    sourceBatch: '113-batch-2',
    examPoints: ['Insertion Sort', '函式設計', '排序方向'],
    difficulty: 'intermediate',
    questionType: 'essay',
    originalQuestion: sourceRef(5).originalExcerpt,
    questionExplanation:
      '題目要求兩個函式合作：isInverse 判斷兩個元素在指定排序方向下是否反序；InsertionSort 則在插入排序內呼叫 isInverse。重點不是只寫出排序，而是把遞增與遞減邏輯抽到 isInverse。',
    modelAnswer:
      '可用 C 語言實作。isInverse(x,y,isAsc) 若 isAsc 為 true 則回傳 x>y，表示遞增排序中前者大於後者需移動；若 isAsc 為 false 則回傳 x<y。InsertionSort 從 i=1 到 len-1，取 key=arr[i]，令 j=i-1，當 j>=0 且 isInverse(arr[j], key, isAsc) 為 true 時，將 arr[j] 往右移到 arr[j+1] 並遞減 j，最後把 key 放到 arr[j+1]。',
    modelAnswerDetails: [
      '插入排序維持 arr[0..i-1] 已排序，把第 i 個元素插入正確位置。',
      'isAsc 控制比較方向，不應在 InsertionSort 內複製兩套排序流程。',
      'while 迴圈要先檢查 j>=0，避免陣列越界。',
      '移動元素後要在 j+1 放回 key。'
    ],
    diagramInstructions:
      '文字圖解：畫插入排序流程。已排序區在左、未排序區在右；每輪取 key=arr[i]，j 從 i-1 往左比較。若 isInverse(arr[j], key, isAsc) 為 true，就把 arr[j] 往右移一格；直到不反序或 j<0，將 key 插入 j+1。旁註 isAsc=true 使用 x>y，isAsc=false 使用 x<y。',
    diagramAltText:
      '插入排序每輪取出 key，向左比較並右移反序元素，最後依遞增或遞減方向插入正確位置。',
    keyTerms: ['Insertion Sort', 'isInverse', 'isAsc', 'in-place sorting'],
    scoringPoints: ['isInverse 方向判斷正確', 'InsertionSort 呼叫 isInverse', 'while 邊界正確', '可遞增也可遞減'],
    commonMistakes: ['只支援遞增排序', 'while 條件順序導致 j 越界', '移動後忘記放回 key', '沒有呼叫 isInverse'],
    handoutRefs: ['B-113-排序-InsertionSort'],
    sourceRef: sourceRef(5),
    reviewStatus: 'verified'
  },
  {
    year: '113',
    number: 6,
    subject: 'programming',
    sourceBatch: '113-batch-2',
    examPoints: ['數論', '質數判斷', '時間複雜度', '平方根'],
    difficulty: 'advanced',
    questionType: 'essay',
    originalQuestion: sourceRef(6).originalExcerpt,
    questionExplanation:
      '一個正整數恰有 3 個因數，必定是質數的平方，因為因數為 1、p、p^2。題目要判斷 |a-b| 是否只有 3 個因數，所以先算差值 d，再確認 d 是完全平方數，且 sqrt(d) 是質數。',
    modelAnswer:
      '設 d=abs(a-b)。若 d<=1，回傳 false。令 r=floor(sqrt(d))，若 r*r != d，代表 d 不是完全平方數，回傳 false。接著判斷 r 是否為質數：若 r<2 回 false；從 i=2 檢查到 i*i<=r，只要 r%i==0 就回 false；若沒有整除，回 true。此演算法只需平方根與迴圈除法，時間複雜度約 O(sqrt(sqrt(d)))，對 d<=2^30 足夠低。',
    modelAnswerDetails: [
      '只有三個因數的數必為 p^2，其中 p 是質數。',
      '|a-b| 若為 0 或 1，不可能有三個正因數。',
      '完全平方數檢查可避免對所有 d 因數暴力計數。',
      '質數檢查只需做到 i*i<=r，符合低時間複雜度要求。'
    ],
    diagramInstructions:
      '文字圖解：畫決策流程。輸入 a,b -> d=|a-b| -> d<=1 則 false -> r=floor(sqrt(d)) -> r*r 是否等於 d；否則 false，是則檢查 r 是否為質數 -> 若 r 有 2 到 sqrt(r) 之間的因數則 false，否則 true。旁註 true 的理由是 d 的因數剛好為 1、r、d。',
    diagramAltText:
      '判斷 |a-b| 是否為質數平方；是質數平方才剛好有 1、質數平方根與自身三個因數。',
    keyTerms: ['三個因數', '完全平方數', '質數', 'sqrt', '時間複雜度'],
    scoringPoints: ['指出三因數數字是質數平方', '處理 d<=1', '檢查完全平方', '檢查平方根是否為質數'],
    commonMistakes: ['直接計算所有因數導致複雜度過高', '只檢查完全平方但忘記平方根必須是質數', '沒有處理 a=b 的情況'],
    handoutRefs: ['B-113-數論-三因數'],
    sourceRef: sourceRef(6),
    reviewStatus: 'verified'
  }
];
