import { getBGroupSourceIndex } from '@/modules/examGroups/bGroup/data/sourceIndex';
import type { BGroupEssayQuestionAnalysis } from '@/modules/examGroups/bGroup/types/essayQuestionAnalysis';

const sourceIndex = getBGroupSourceIndex('108');

function sourceRef(number: number): BGroupEssayQuestionAnalysis['sourceRef'] {
  const entry = sourceIndex.find((candidate) => candidate.number === number);

  if (!entry) {
    throw new Error(`Missing 108 B group source index entry: ${number}`);
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
    year: '108',
    number: 1,
    subject: 'mixed',
    sourceBatch: '108-batch-1',
    examPoints: ['SQL', '資料庫設計', '反正規化', '查詢'],
    difficulty: 'advanced',
    questionType: 'mixed',
    originalQuestion: sourceRef(1).originalExcerpt,
    questionExplanation:
      '本題前半是 SQL 查詢，後半是資料庫設計檢討。貨品表同時放供應商名稱，容易出現資料重複與更新異常；供應商表又保存供應商資訊。因主鍵底線無法由文字抽取保留，解析維持 needs-review。',
    modelAnswer:
      '供應商名稱開頭為台可用 SupplierName LIKE `台%` 查供應商表。庫存數量為 0 的貨品需從貨品表找 stock=0，並帶出貨號、品名、單價、供應商名稱與聯絡人，可 join 供應商表。至少供應 2 種貨品的供應商需依供應商分組，HAVING COUNT(貨號)>=2。設計問題是貨品表重複保存供應商名稱，違反正規化，可能造成更新異常；缺點是資料重複與一致性難維護，優點是查詢時少 join、讀取較快。',
    modelAnswerDetails: [
      'LIKE `台%` 代表以台開頭，不是任意位置包含台。',
      '供應商聯絡人通常在供應商表，因此庫存為 0 查詢需要 join。',
      'HAVING 用於分組後篩選供應貨品種類數。',
      '設計優點若採反正規化角度，可說查詢簡化但維護成本增加。'
    ],
    diagramInstructions:
      '文字圖解：畫貨品表與供應商表。貨品表含貨號、品名、單價、庫存、供應商編號、供應商名稱；供應商表含供應商編號、名稱、地址、電話、聯絡人。用供應商編號連線，並在貨品表的供應商名稱上標示重複資料與更新異常風險。',
    diagramAltText:
      '貨品表與供應商表以供應商編號關聯，但供應商名稱重複出現在貨品表，造成反正規化風險。',
    keyTerms: ['LIKE', 'GROUP BY', 'HAVING', '正規化', '更新異常'],
    scoringPoints: ['三個 SQL 查詢條件正確', '供應商分組 HAVING 正確', '指出資料重複設計問題', '說明優缺點'],
    commonMistakes: ['把開頭為台寫成包含台', '用 WHERE COUNT 篩選分組', '只說設計不好但沒有指出重複欄位'],
    handoutRefs: ['B-108-SQL-資料庫設計'],
    sourceRef: sourceRef(1),
    reviewStatus: 'needs-review'
  },
  {
    year: '108',
    number: 2,
    subject: 'mixed',
    sourceBatch: '108-batch-1',
    examPoints: ['Unit test', 'OOP', '資訊安全', 'deadlock', 'git'],
    difficulty: 'basic',
    questionType: 'short-answer',
    originalQuestion: sourceRef(2).originalExcerpt,
    questionExplanation:
      '這題是多個基礎名詞簡答，答案要短但精準。每個概念都要有定義與核心特徵，尤其 deadlock 條件與 overload/override 很容易混淆。',
    modelAnswer:
      'Unit test 是針對最小程式單元如函式或類別方法進行自動化測試。Polymorphism 是同一介面或父類別參考在執行期有不同實作；Encapsulation 是封裝資料與方法並控制存取。登入 30 秒才回應最相關的是可用性。Deadlock 條件包含互斥、持有並等待、不可搶奪、循環等待。git 最重要功能是分散式版本控制。Overload 是同名方法不同參數；Override 是子類別重新定義父類別同簽章方法。',
    modelAnswerDetails: [
      '單元測試重點是隔離、小範圍、可重複驗證。',
      '可用性指系統能在需要時提供服務，登入延遲過久會影響可用性。',
      'deadlock 四條件缺一不可。',
      'overload 看參數列表，override 看繼承與同簽章。'
    ],
    diagramInstructions:
      '文字圖解：畫六格速查表。每格放名詞、核心定義、常見關鍵字：Unit test=函式/方法測試；Polymorphism/Encapsulation=多型/封裝；Availability=回應時間；Deadlock=四條件；git=版本控制；Overload/Override=參數不同/子類別改寫。',
    diagramAltText:
      '108 年簡答題以六格表整理單元測試、物件導向、安全可用性、死結、git 與方法多載覆寫。',
    keyTerms: ['Unit test', 'Polymorphism', 'Availability', 'Deadlock', 'git'],
    scoringPoints: ['各名詞定義正確', '登入延遲對應可用性', 'deadlock 四條件完整', 'overload/override 差異清楚'],
    commonMistakes: ['把可用性寫成機密性', 'deadlock 條件漏掉循環等待', '把 overload 與 override 混用'],
    handoutRefs: ['B-108-簡答'],
    sourceRef: sourceRef(2),
    reviewStatus: 'verified'
  },
  {
    year: '108',
    number: 3,
    subject: 'information-management',
    sourceBatch: '108-batch-1',
    examPoints: ['機率', '條件機率', 'Overfitting'],
    difficulty: 'basic',
    questionType: 'mixed',
    originalQuestion: sourceRef(3).originalExcerpt,
    questionExplanation:
      '機率小題要先由 P(A|B)=P(A∩B)/P(B) 求交集，再用聯集公式。Overfitting 則是模型過度貼合訓練資料，泛化能力變差。',
    modelAnswer:
      'P(A∩B)=P(A|B)*P(B)=0.3*0.2=0.06。P(A∪B)=P(A)+P(B)-P(A∩B)=0.5+0.2-0.06=0.64。過度訓練是模型把訓練資料中的噪音也學進去，在訓練集表現很好，但對新資料預測能力差；可用交叉驗證、正則化、剪枝、增加資料或早停改善。',
    modelAnswerDetails: [
      '條件機率公式是 P(A|B)=P(A∩B)/P(B)。',
      '聯集不能直接相加，需扣掉交集。',
      'Overfitting 的判斷常是訓練誤差低、驗證誤差高。',
      '改善方式要針對泛化能力。'
    ],
    diagramInstructions:
      '文字圖解：畫兩個重疊圓 A 與 B，在交集標示 0.06；A 圓整體 0.5、B 圓整體 0.2，聯集公式寫 0.5+0.2-0.06=0.64。旁邊畫訓練誤差低但驗證誤差高的 overfitting 對照。',
    diagramAltText:
      'A 與 B 的交集由條件機率算出，聯集需扣交集；overfitting 表示訓練好但泛化差。',
    keyTerms: ['P(A|B)', 'P(A∩B)', 'P(A∪B)', 'Overfitting'],
    scoringPoints: ['交集計算正確', '聯集公式正確', 'Overfitting 定義正確', '改善方法合理'],
    commonMistakes: ['直接把 0.5 與 0.2 相加', '把 P(A|B) 當 P(A∩B)', '只說模型太複雜但未提泛化'],
    handoutRefs: ['B-108-機率與過度訓練'],
    sourceRef: sourceRef(3),
    reviewStatus: 'verified'
  },
  {
    year: '108',
    number: 4,
    subject: 'mixed',
    sourceBatch: '108-batch-2',
    examPoints: ['Web 安全', 'SQL Injection', '輸入驗證', '後端處理'],
    difficulty: 'advanced',
    questionType: 'mixed',
    originalQuestion: sourceRef(4).originalExcerpt,
    questionExplanation:
      '題目描述前端輸入 ID 與地址、後端接收後進行資料庫處理，這是典型未驗證輸入導致 SQL Injection 或資料庫風險的情境。因原始 HTML 與後端程式碼未完整保留，解析維持 needs-review。',
    modelAnswer:
      '此設計可能產生 SQL Injection。攻擊者可在 ID 或地址欄位輸入 SQL 片段，使後端字串拼接後的查詢語意被改寫，造成資料外洩、未授權查詢、竄改或刪除。若只能新增 checkdata(xxxx)，函式至少應做白名單驗證、移除或轉義危險字元、限制長度與格式；更完整的修正應改用參數化查詢，而不是只靠前端限制。',
    modelAnswerDetails: [
      '前端 HTML 限制不能當成安全邊界，後端仍須驗證。',
      'SQL Injection 危害包含繞過身份驗證、讀取敏感資料與破壞資料。',
      '白名單比黑名單可靠，例如 ID 僅允許特定格式。',
      '參數化查詢是根本防禦，但題目限制不變動設定與前端時，可先在後端清理。'
    ],
    diagramInstructions:
      '文字圖解：畫資料流：使用者輸入 ID/地址 -> 前端 HTML 表單 -> 後端接收程式 -> SQL 字串/資料庫。攻擊路徑標示惡意輸入進入 SQL 字串造成資料庫風險；安全路徑標示 checkdata 先做白名單、轉義或參數化前處理，再送入查詢。',
    diagramAltText:
      '未處理的前端輸入進入後端 SQL 會造成資料庫資安風險，需先清理驗證。',
    keyTerms: ['SQL Injection', 'checkdata', '白名單', '參數化查詢', '後端驗證'],
    scoringPoints: ['指出資料庫資安風險', '列出對系統與資料危害', 'checkdata 邏輯合理', '每行註解要求有回應'],
    commonMistakes: ['只依賴前端驗證', '只刪單引號沒有長度與格式檢查', '把 XSS 與 SQL Injection 混淆'],
    handoutRefs: ['B-108-Web-輸入安全'],
    sourceRef: sourceRef(4),
    reviewStatus: 'needs-review'
  },
  {
    year: '108',
    number: 5,
    subject: 'programming',
    sourceBatch: '108-batch-2',
    examPoints: ['二元搜尋樹', '插入', '刪除', '前驅後繼'],
    difficulty: 'advanced',
    questionType: 'mixed',
    originalQuestion: sourceRef(5).originalExcerpt,
    questionExplanation:
      'BST 建立規則是左小右大。依序插入 27、35、17、33、20、3、38 後，27 是根。刪除有兩個子節點的根時，可用左子樹最大值（前驅）或右子樹最小值（後繼）取代。',
    modelAnswer:
      '插入後 BST 為：根 27；左子節點 17，17.left=3、17.right=20；右子節點 35，35.left=33、35.right=38。刪除 27 的做法一是以前驅 20 取代 27，再刪除原本 20 節點；做法二是以後繼 33 取代 27，再刪除原本 33 節點。兩種做法都要維持左子樹小於根、右子樹大於根。',
    modelAnswerDetails: [
      '第一個數字 27 為根。',
      '比根小往左，比根大往右，遞迴比較直到空位。',
      '刪除兩子節點可取 inorder predecessor 或 successor。',
      '取代後仍要修正原前驅或後繼位置。'
    ],
    diagramInstructions:
      '文字圖解：建立 BST：根 27；27.left=17、27.right=35；17.left=3、17.right=20；35.left=33、35.right=38。刪除 27 的兩法：以前驅 20 取代根，20.left=17 且 17.left=3，20.right=35；或以後繼 33 取代根，33.left=17 且 17.left=3、17.right=20，33.right=35 且 35.right=38。',
    diagramAltText:
      '插入序列形成根為 27 的 BST；刪除根節點可用前驅 20 或後繼 33 取代。',
    keyTerms: ['BST', 'inorder predecessor', 'inorder successor', 'delete node'],
    scoringPoints: ['BST 建立規則正確', '插入結果正確', '刪除前驅法正確', '刪除後繼法正確'],
    commonMistakes: ['把 33 放在 27 左側', '刪除 27 後未維持 BST 規則', '只寫一種刪除做法'],
    handoutRefs: ['B-108-BST'],
    sourceRef: sourceRef(5),
    reviewStatus: 'verified'
  },
  {
    year: '108',
    number: 6,
    subject: 'programming',
    sourceBatch: '108-batch-2',
    examPoints: ['變數生命週期', 'scope', 'static variable', '隨機函式'],
    difficulty: 'advanced',
    questionType: 'mixed',
    originalQuestion: sourceRef(6).originalExcerpt,
    questionExplanation:
      '本題先比較靜態變數與區域變數，再問同名變數優先權，最後是填空程式。由於 source index 未保留底線填空與程式碼區塊，最後一段只能給演算法框架，維持 needs-review。',
    modelAnswer:
      '區域變數宣告在函式或區塊內，作用域限於該區塊，生命週期通常隨函式呼叫建立與結束。靜態變數可有區域作用域但生命週期跨越整個程式執行期間，函式呼叫結束後值仍保留。同名時，一般在內層作用域的區域變數會遮蔽外層或全域變數。balls 函式可用 static count=1000 保存剩餘值；每次依隨機數決定 80% 回傳 0 或 20% 回傳 input1*input2，並更新 count。',
    modelAnswerDetails: [
      'static local variable 的作用域仍可在函式內，但生命週期是整個程式期間。',
      '同名變數依最近作用域優先。',
      '若需記錄每次呼叫後剩餘值，count 不應是每次呼叫都重設的普通區域變數。',
      '隨機成功率判斷需能表達 80% 失敗與 20% 成功。'
    ],
    diagramInstructions:
      '文字圖解：畫三欄比較表：全域變數、區域變數、靜態變數。列出作用域、生命週期、初始化時機、同名遮蔽規則。再畫 balls 流程：讀 input1/input2 -> 產生 0~99 隨機數 -> <80 回傳 0；>=80 計算 input1*input2 -> 更新 static count -> 回傳結果或剩餘值。',
    diagramAltText:
      '區域變數作用域短且呼叫結束消失，靜態變數可保留跨呼叫狀態；balls 用 static count 記錄剩餘值。',
    keyTerms: ['static variable', 'local variable', 'scope', 'lifetime', 'shadowing'],
    scoringPoints: ['靜態與區域變數差異正確', '同名優先權正確', 'static count 使用合理', '成功失敗機率邏輯清楚'],
    commonMistakes: ['把 static 說成全域變數', '認為全域變數永遠優先', 'count 每次呼叫都重設', '80%/20% 條件寫反'],
    handoutRefs: ['B-108-變數生命週期'],
    sourceRef: sourceRef(6),
    reviewStatus: 'needs-review'
  }
];
