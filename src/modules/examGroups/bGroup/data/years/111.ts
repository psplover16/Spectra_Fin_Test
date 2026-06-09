import { getBGroupSourceIndex } from '@/modules/examGroups/bGroup/data/sourceIndex';
import type { BGroupEssayQuestionAnalysis } from '@/modules/examGroups/bGroup/types/essayQuestionAnalysis';

const sourceIndex = getBGroupSourceIndex('111');

function sourceRef(number: number): BGroupEssayQuestionAnalysis['sourceRef'] {
  const entry = sourceIndex.find((candidate) => candidate.number === number);

  if (!entry) {
    throw new Error(`Missing 111 B group source index entry: ${number}`);
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
    year: '111',
    number: 1,
    subject: 'mixed',
    sourceBatch: '111-batch-1',
    examPoints: ['SQL', '萬用字元', 'EXISTS', 'JOIN'],
    difficulty: 'intermediate',
    questionType: 'short-answer',
    originalQuestion: sourceRef(1).originalExcerpt,
    questionExplanation:
      '本題以供應商與產品兩表考 SQL。第一小題是一般 join 與排序；第二小題是 LIKE 萬用字元與第 2 個字母條件；第三小題是 EXISTS 子查詢。因 PDF 用底線標示主鍵且表格對齊資訊流失，解析保留 needs-review。',
    modelAnswer:
      '第一小題可用 Suppliers join Products on SupplierID，選 SupplierName、ProductName，ORDER BY SupplierID ASC, ProductID DESC。第二小題可用 City LIKE `_a%` OR City LIKE `_e%` OR City LIKE `_i%`，列出 SupplierName 與 City。第三小題可用 WHERE EXISTS (SELECT 1 FROM Products p WHERE p.SupplierID=s.SupplierID AND p.Price>100) 列出供應商名稱。',
    modelAnswerDetails: [
      'JOIN 題要注意供應商代號排序與產品代號反向排序。',
      'SQL 單字元萬用字元在不同 DB 可能是 `_`，若 DB 使用其他語法要說明。',
      'EXISTS 重點是檢查相關子查詢是否存在符合條件的產品。',
      '若只用 IN 也可達類似結果，但題目指定 EXISTS 時應使用 EXISTS。'
    ],
    diagramInstructions:
      '文字圖解：畫 Suppliers 與 Products 兩個資料表方框，以 SupplierID 連線。查詢 1 在連線上標示 join 後排序；查詢 2 在 Suppliers.City 欄位旁標示第 2 字元符合 a/e/i；查詢 3 從 Suppliers 指向 Products 的 EXISTS 條件，標示 Price > 100。',
    diagramAltText:
      '供應商表與產品表以 SupplierID 關聯，三個 SQL 題分別處理 join 排序、城市萬用字元與 EXISTS 條件。',
    keyTerms: ['JOIN', 'LIKE', 'Wildcard', 'EXISTS', 'SupplierID'],
    scoringPoints: ['join 條件正確', '排序方向正確', '第 2 字母萬用字元正確', 'EXISTS 相關子查詢正確'],
    commonMistakes: ['把第 2 個字母寫成任意位置包含', 'EXISTS 子查詢未關聯外層供應商', '排序欄位方向寫反'],
    handoutRefs: ['B-111-SQL-供應商產品'],
    sourceRef: sourceRef(1),
    reviewStatus: 'needs-review'
  },
  {
    year: '111',
    number: 2,
    subject: 'information-management',
    sourceBatch: '111-batch-1',
    examPoints: ['機器學習', '監督式學習', '非監督式學習'],
    difficulty: 'basic',
    questionType: 'essay',
    originalQuestion: sourceRef(2).originalExcerpt,
    questionExplanation:
      '本題比較監督式與非監督式學習。作答需要定義、主要處理問題與演算法三部分。最穩的寫法是用是否有標籤資料來區分，再連到分類/迴歸與分群/降維。',
    modelAnswer:
      '監督式學習使用已標註輸入與答案的資料訓練模型，主要處理分類與迴歸，例如決策樹、邏輯迴歸、線性迴歸、SVM、隨機森林、神經網路。非監督式學習沒有預先標註答案，主要從資料中找結構、群組或低維表示，例如 K-means、階層式分群、DBSCAN、PCA、關聯規則。',
    modelAnswerDetails: [
      '監督式學習的模型會從特徵對應到標籤或數值目標。',
      '分類輸出類別，迴歸輸出連續數值。',
      '非監督式學習常用在探索資料結構，不直接給標準答案。',
      '演算法例子要和學習類型相符，不要把 K-means 寫成監督式。'
    ],
    diagramInstructions:
      '文字圖解：畫二欄比較表。左欄監督式學習：輸入資料 + 標籤 -> 訓練模型 -> 預測分類/數值；例子列決策樹、SVM、線性迴歸。右欄非監督式學習：輸入資料無標籤 -> 找群集/結構 -> 分群或降維；例子列 K-means、PCA、關聯規則。',
    diagramAltText:
      '監督式學習用有標籤資料做分類或迴歸；非監督式學習用無標籤資料找群集或結構。',
    keyTerms: ['監督式學習', '非監督式學習', '分類', '迴歸', '分群'],
    scoringPoints: ['兩者定義清楚', '主要問題類型正確', '演算法例子正確', '指出有無標籤差異'],
    commonMistakes: ['只列演算法沒有定義', '把分群寫成監督式分類', '忽略迴歸問題'],
    handoutRefs: ['B-111-機器學習'],
    sourceRef: sourceRef(2),
    reviewStatus: 'verified'
  },
  {
    year: '111',
    number: 3,
    subject: 'information-management',
    sourceBatch: '111-batch-1',
    examPoints: ['SSDLC', 'Web 安全', '控制措施'],
    difficulty: 'advanced',
    questionType: 'essay',
    originalQuestion: sourceRef(3).originalExcerpt,
    questionExplanation:
      '題目指定 SSDLC 的三個階段類別與控制措施數量。source index 保留了題目要求，但沒有列出指引中的完整措施名稱，因此解析提供常見控制項與答題架構，並保留人工複核。',
    modelAnswer:
      '開發階段可包含安全需求分析、威脅建模、安全設計審查、安全編碼規範、程式碼審查。測試階段可包含弱點掃描與滲透測試，或安全測試案例與修補驗證。部署與維運階段可包含安全設定基準、上線審查與變更管理、日誌監控與弱點修補。作答時需依題目要求列出開發 5 項、測試 2 項、部署維運 3 項。',
    modelAnswerDetails: [
      'SSDLC 重點是把安全控制嵌入系統生命週期，而不是上線後才掃描。',
      '開發階段著重需求、設計與程式碼品質。',
      '測試階段著重驗證弱點是否存在與修補是否有效。',
      '部署維運階段著重設定、監控、修補與變更管理。'
    ],
    diagramInstructions:
      '文字圖解：建立三欄階段表：開發階段、測試階段、部署與維運階段。開發階段放 5 個控制措施編號與名稱：安全需求、威脅建模、安全設計、安全編碼、程式碼審查；測試階段放弱點掃描、滲透測試；部署與維運階段放安全設定、監控稽核、弱點修補/變更管理，並以箭頭表示生命週期順序。',
    diagramAltText:
      'SSDLC 控制措施依開發、測試、部署與維運三階段分組呈現。',
    keyTerms: ['SSDLC', '威脅建模', '安全編碼', '弱點掃描', '變更管理'],
    scoringPoints: ['開發階段列 5 項', '測試階段列 2 項', '部署維運列 3 項', '控制措施符合安全生命週期'],
    commonMistakes: ['只寫一般開發流程沒有安全控制', '三階段數量不符合題目', '把測試與維運控制混在一起'],
    handoutRefs: ['B-111-SSDLC'],
    sourceRef: sourceRef(3),
    reviewStatus: 'needs-review'
  },
  {
    year: '111',
    number: 4,
    subject: 'programming',
    sourceBatch: '111-batch-2',
    examPoints: ['Fibonacci', '遞迴', '動態規劃', '非遞迴'],
    difficulty: 'intermediate',
    questionType: 'short-answer',
    originalQuestion: sourceRef(4).originalExcerpt,
    questionExplanation:
      '本題要求三種 Fibonacci 寫法：基本遞迴、非遞迴、避免重複計算的遞迴。第三小題通常可用 memoization，把已算過的 F(k) 存起來。',
    modelAnswer:
      '基本遞迴：if n==0 return 0, if n==1 return 1, else return F(n-1)+F(n-2)。非遞迴：用 prev=0、curr=1，從 2 到 n 迴圈更新 next=prev+curr。避免重複計算的遞迴：建立 memo 陣列或 Map，若 memo[n] 已存在就直接回傳，否則遞迴計算 F(n-1)+F(n-2) 後存入 memo[n]。',
    modelAnswerDetails: [
      '基本遞迴容易重複計算，時間複雜度呈指數成長。',
      '非遞迴版本只需保留前兩項即可，空間可為 O(1)。',
      'memoization 仍使用遞迴，但每個 n 只計算一次。',
      'n=0 與 n=1 是必要停止條件。'
    ],
    diagramInstructions:
      '文字圖解：畫 Fibonacci 呼叫樹。F(5) 分成 F(4)+F(3)，F(4) 又分成 F(3)+F(2)，標示 F(3)、F(2) 重複出現。旁邊畫 memo 表：索引 0、1、2、3、4、5 對應已計算值，遞迴前先查表，沒有才計算並寫入。',
    diagramAltText:
      '基本 Fibonacci 遞迴會重複展開相同子問題；memo 表可避免重複計算。',
    keyTerms: ['Fibonacci', 'recursive', 'non-recursive', 'memoization'],
    scoringPoints: ['遞迴停止條件正確', '非遞迴迴圈正確', 'memoization 仍保留遞迴', '避免重複計算'],
    commonMistakes: ['缺少 n=0 或 n=1', '第三小題改成純迴圈而非遞迴', 'memo 沒有先查表'],
    handoutRefs: ['B-111-Fibonacci'],
    sourceRef: sourceRef(4),
    reviewStatus: 'verified'
  },
  {
    year: '111',
    number: 5,
    subject: 'programming',
    sourceBatch: '111-batch-2',
    examPoints: ['資料驗證', '檔案處理', '分組彙總'],
    difficulty: 'advanced',
    questionType: 'short-answer',
    originalQuestion: sourceRef(5).originalExcerpt,
    questionExplanation:
      '本題先檢查員工代號，再讀取人事資料做部門特別費彙總。因原始資料表在 PDF 抽取時對齊資訊流失，解析保留 needs-review，但仍可依 source index 的欄位描述建立演算法。',
    modelAnswer:
      'check_dit(empId) 先確認 empId 長度為 6 且每碼都是數字，再把前 5 碼轉數字加總，若 sum%10 等於第 6 碼則回傳 true。main() 逐筆讀取 emp-id、dep-id、age、s_salary，呼叫 check_dit 篩掉不合法員工代號；對合法資料用 dep-id 當 key 加總 s_salary；最後輸出合計超過 100000 的部門代號與合計金額。',
    modelAnswerDetails: [
      '員工代號若含非數字字元，例如 A12345，應判定不合法。',
      '第 6 碼是前 5 碼總和的個位數，也就是 sum%10。',
      '分組彙總可用 dictionary/map，以部門代號當 key。',
      '篩選門檻是特別費合計超過 100000，不是單筆特別費。'
    ],
    diagramInstructions:
      '文字圖解：畫流程：讀取 emp-id/dep-id/age/s_salary -> check_dit 檢查 6 碼員工代號 -> 保留正確代號資料 -> 依 dep-id 分組加總 s_salary -> 篩選合計超過 100000 -> 輸出部門代號與合計金額。不合法資料走旁支「略過或記錄錯誤」。',
    diagramAltText:
      '逐筆檢查員工代號，保留合法資料後依部門彙總特別費。',
    keyTerms: ['check_dit', 'checksum', 'group by', 'map', 's_salary'],
    scoringPoints: ['員工代號格式檢查完整', '第 6 碼規則正確', '只彙總合法資料', '依部門加總並篩選門檻'],
    commonMistakes: ['未排除含英文字母員工代號', '把前 6 碼都加入總和', '用單筆 s_salary 判斷是否超過 100000'],
    handoutRefs: ['B-111-資料驗證-彙總'],
    sourceRef: sourceRef(5),
    reviewStatus: 'needs-review'
  },
  {
    year: '111',
    number: 6,
    subject: 'programming',
    sourceBatch: '111-batch-2',
    examPoints: ['Quick Sort', '遞迴', 'partition'],
    difficulty: 'intermediate',
    questionType: 'short-answer',
    originalQuestion: sourceRef(6).originalExcerpt,
    questionExplanation:
      '快速排序的核心是 partition：選一個 pivot，把比 pivot 小的放左邊、比 pivot 大的放右邊，再遞迴處理左右子陣列。題目要求由小至大排序，所以比較方向要正確。',
    modelAnswer:
      'QuickSort(arr, left, right) 若 left>=right 就返回。選 pivot，可用 arr[(left+right)/2] 或 arr[right]。以 i、j 從兩側往中間移動：i 找到大於等於 pivot 的元素，j 找到小於等於 pivot 的元素，i<=j 時交換並繼續。partition 完成後遞迴 QuickSort(left,j) 與 QuickSort(i,right)。也可使用 Lomuto partition，但需保持 pivot 左小右大。',
    modelAnswerDetails: [
      '停止條件避免子陣列長度 0 或 1 時無限遞迴。',
      'partition 後 pivot 左側元素應不大於 pivot，右側不小於 pivot。',
      '平均時間複雜度 O(n log n)，最壞情況 O(n^2)。',
      '若資料可能重複，交換與指標移動要避免卡住。'
    ],
    diagramInstructions:
      '文字圖解：畫遞迴分割圖。輸入陣列 -> 選 pivot -> 小於 pivot 的 left、pivot、大於 pivot 的 right；left 與 right 各自重複同流程，子陣列長度 0 或 1 時停止，最後組合 sorted(left)+pivot+sorted(right)。',
    diagramAltText:
      '快速排序反覆以基準值分割左右子陣列，再遞迴排序。',
    keyTerms: ['Quick Sort', 'pivot', 'partition', 'recursive'],
    scoringPoints: ['停止條件正確', 'partition 方向正確', '左右子陣列遞迴', '能由小至大排序'],
    commonMistakes: ['partition 後沒有遞迴兩側', 'pivot 比較方向反了', '指標沒有移動造成無限迴圈'],
    handoutRefs: ['B-111-QuickSort'],
    sourceRef: sourceRef(6),
    reviewStatus: 'verified'
  }
];
