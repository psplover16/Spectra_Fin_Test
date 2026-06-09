import { getBGroupSourceIndex } from '@/modules/examGroups/bGroup/data/sourceIndex';
import type { BGroupEssayQuestionAnalysis } from '@/modules/examGroups/bGroup/types/essayQuestionAnalysis';

const sourceIndex = getBGroupSourceIndex('109');

function sourceRef(number: number): BGroupEssayQuestionAnalysis['sourceRef'] {
  const entry = sourceIndex.find((candidate) => candidate.number === number);

  if (!entry) {
    throw new Error(`Missing 109 B group source index entry: ${number}`);
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
    year: '109',
    number: 1,
    subject: 'information-management',
    sourceBatch: '109-batch-1',
    examPoints: ['正規化', '1NF', '2NF', '3NF', '反正規化'],
    difficulty: 'advanced',
    questionType: 'mixed',
    originalQuestion: sourceRef(1).originalExcerpt,
    questionExplanation:
      '正規化題要依資料相依性逐步拆表：1NF 消除重複群組與非原子欄位，2NF 消除複合主鍵下的部分相依，3NF 消除非鍵欄位間的遞移相依。因 source index 沒保留原始訂單表欄位，解析提供方法與範例方向，維持 needs-review。',
    modelAnswer:
      '1NF 要讓每個欄位都是單一值，訂單明細需一列一品項。2NF 若主鍵為訂單編號加商品編號，顧客資料只依訂單或顧客代號，商品名稱只依商品編號，就應拆到顧客表、商品表與訂單明細表。3NF 進一步把非鍵決定非鍵的欄位拆出，例如顧客代號決定顧客名稱、商品代號決定商品名稱與單價。反正規化是為了查詢效能或報表方便，刻意合併表或複製彙總欄位，但要承擔資料重複與更新一致性成本。',
    modelAnswerDetails: [
      '1NF 重點是欄位原子性與重複群組處理。',
      '2NF 只適用於有複合鍵且存在部分相依時。',
      '3NF 要消除非鍵欄位決定非鍵欄位的遞移相依。',
      '反正規化不是設計錯誤，而是有意識地用冗餘換取查詢效能。'
    ],
    diagramInstructions:
      '文字圖解：畫由原始訂單表到 1NF、2NF、3NF 的階段圖。每一階段列資料表名稱、欄位、PK、FK；用箭頭表示部分相依被拆到 2NF，遞移相依被拆到 3NF；另畫反正規化箭頭表示為查詢效能而合併或複製欄位。',
    diagramAltText:
      '資料庫正規化逐步把訂單資料拆成符合 1NF、2NF、3NF 的關聯表。',
    keyTerms: ['1NF', '2NF', '3NF', 'functional dependency', 'de-normalization'],
    scoringPoints: ['三階段正規化目的正確', '拆表需說明主鍵外鍵', '反正規化意義正確', '指出效能與一致性的取捨'],
    commonMistakes: ['把正規化只寫成拆越多表越好', '2NF 與 3NF 差異不清', '反正規化被誤寫成不需要資料庫設計'],
    handoutRefs: ['B-109-資料庫正規化'],
    sourceRef: sourceRef(1),
    reviewStatus: 'needs-review'
  },
  {
    year: '109',
    number: 2,
    subject: 'information-management',
    sourceBatch: '109-batch-1',
    examPoints: ['PaaS', 'push technology', 'blockchain'],
    difficulty: 'basic',
    questionType: 'short-answer',
    originalQuestion: sourceRef(2).originalExcerpt,
    questionExplanation:
      '三個名詞各自要有定義與用途。PaaS 是雲端服務模式，推播技術是伺服器主動通知，區塊鏈是分散式帳本與不可竄改鏈結。',
    modelAnswer:
      'PaaS 是 Platform as a Service，供應商提供應用開發、部署、資料庫與執行環境，使用者專注開發程式。推播技術是伺服器在事件發生時主動把訊息送到用戶端或裝置，例如手機通知、即時訊息。區塊鏈是由多個節點共同維護的分散式帳本，交易資料以區塊串接並使用雜湊與共識機制提高不可竄改性。',
    modelAnswerDetails: [
      'PaaS 介於 SaaS 與 IaaS 之間，免去使用者管理底層硬體與作業系統。',
      '推播相對於輪詢，可降低延遲並即時通知，但需管理權限與連線。',
      '區塊鏈的重點是分散、共識、雜湊鏈結與紀錄透明。',
      '名詞解釋應避免只翻譯英文。'
    ],
    diagramInstructions:
      '文字圖解：畫三張概念卡。PaaS 卡顯示開發者 -> PaaS 平台 -> 執行環境/資料庫；推播卡顯示伺服器事件 -> 推播服務 -> 手機/瀏覽器；區塊鏈卡顯示 Block1 hash -> Block2 hash -> Block3 hash，旁邊標示多節點共識。',
    diagramAltText:
      'PaaS、推播技術與區塊鏈分別呈現平台服務、主動通知與雜湊串接分散式帳本。',
    keyTerms: ['PaaS', 'push technology', 'blockchain', 'hash', 'consensus'],
    scoringPoints: ['三個名詞定義清楚', '用途或例子合理', 'PaaS 層級正確', '區塊鏈特性完整'],
    commonMistakes: ['PaaS 寫成直接使用應用', '推播誤寫成使用者手動查詢', '區塊鏈只寫比特幣'],
    handoutRefs: ['B-109-名詞解釋'],
    sourceRef: sourceRef(2),
    reviewStatus: 'verified'
  },
  {
    year: '109',
    number: 3,
    subject: 'information-management',
    sourceBatch: '109-batch-1',
    examPoints: ['APT', '資安事件', '防禦策略'],
    difficulty: 'intermediate',
    questionType: 'essay',
    originalQuestion: sourceRef(3).originalExcerpt,
    questionExplanation:
      'APT 是長期、隱蔽、針對特定目標的攻擊。流程要寫出從偵察到入侵、橫向移動、維持存取與資料外洩；因應對策則要分層防禦，而不是只說安裝防毒。',
    modelAnswer:
      'APT 流程常包含偵察目標、魚叉式郵件或弱點初始入侵、植入惡意程式、權限提升、橫向移動、建立 C2 通訊、蒐集資料與外洩、維持存取與清除痕跡。資管人員可採資產盤點與修補、端點防護、網路分段、最小權限、多因素認證、日誌集中監控、異常偵測、備份演練與事件應變流程。',
    modelAnswerDetails: [
      'APT 的 persistent 表示攻擊者會長期維持存取並反覆嘗試。',
      '橫向移動常利用憑證竊取與內部信任關係。',
      '防禦需要偵測與應變，不能只靠邊界防火牆。',
      '日誌與威脅情資能幫助及早發現異常行為。'
    ],
    diagramInstructions:
      '文字圖解：畫攻擊生命週期：偵察 -> 初始入侵 -> 權限提升 -> 橫向移動 -> C2 通訊 -> 資料蒐集/外洩 -> 維持存取。每一階段下方加一格資管因應：監控、修補、分段、偵測、備援、事件應變。',
    diagramAltText:
      'APT 通常由偵察開始，逐步入侵、擴張、控制並外洩資料，防禦需分階段對應。',
    keyTerms: ['APT', 'C2', '橫向移動', '最小權限', '事件應變'],
    scoringPoints: ['攻擊流程階段完整', '指出長期隱蔽特性', '因應對策分層', '包含監控與事件應變'],
    commonMistakes: ['把 APT 寫成一般病毒', '只列單一防毒措施', '漏掉橫向移動與維持存取'],
    handoutRefs: ['B-109-APT'],
    sourceRef: sourceRef(3),
    reviewStatus: 'verified'
  },
  {
    year: '109',
    number: 4,
    subject: 'programming',
    sourceBatch: '109-batch-2',
    examPoints: ['OOP', '封裝', '繼承', '覆寫', '超載'],
    difficulty: 'intermediate',
    questionType: 'mixed',
    originalQuestion: sourceRef(4).originalExcerpt,
    questionExplanation:
      '題目用 class A 與 class B 測 OOP 基礎。封裝看 public/private 權限；繼承看 B extends A；覆寫看子類別重新定義父類別同簽章方法；超載看同類別中方法名稱相同但參數不同。',
    modelAnswer:
      '封裝是把資料與操作包在類別中，並用 public/private 控制可見性，例如 A 中 a1 是 private，只能透過 A 的方法操作。繼承是 B extends A，B 取得 A 的 public/protected 成員與行為並可擴充。覆寫是 B 定義與 A 同簽章的 m2()，執行時以 B 的版本取代父類別版本。超載是 A 中 m1() 與 m1(int x) 名稱相同但參數不同。',
    modelAnswerDetails: [
      '封裝不是單純把程式放進 class，而是控制資料存取。',
      'private 成員不會被子類別直接存取。',
      'overriding 需要方法簽章相同且發生在繼承關係中。',
      'overloading 可在同一類別中發生，依參數列表區分。'
    ],
    diagramInstructions:
      '文字圖解：畫兩個類別方框。class A：+a0:int、-a1:int、m1()、m1(int x)、m2()。class B extends A：-b1、-b2、m2()、m3()。用 B --|> A 表示繼承；標註 A 的 private 成員體現封裝，A 的 m1 與 m1(int) 是超載，B 的 m2 覆寫 A 的 m2。',
    diagramAltText:
      'B 繼承 A；封裝由存取權限呈現，m1 是超載，B.m2 是覆寫。',
    keyTerms: ['encapsulation', 'inheritance', 'overriding', 'overloading', 'class'],
    scoringPoints: ['封裝以存取權限說明', '繼承關係正確', '覆寫辨識正確', '超載辨識正確'],
    commonMistakes: ['把覆寫與超載混淆', '認為 private 欄位可直接由子類別存取', '只翻譯名詞沒有對應到 class A/B'],
    handoutRefs: ['B-109-OOP'],
    sourceRef: sourceRef(4),
    reviewStatus: 'verified'
  },
  {
    year: '109',
    number: 5,
    subject: 'programming',
    sourceBatch: '109-batch-2',
    examPoints: ['二元樹', '遞迴', '指標交換', 'mirror tree'],
    difficulty: 'intermediate',
    questionType: 'mixed',
    originalQuestion: sourceRef(5).originalExcerpt,
    questionExplanation:
      '這題要寫 6 行內 pseudo-code，把每個節點的左右子樹交換。核心是遞迴處理：空節點停止，非空節點交換 leftchild 與 rightchild，再遞迴處理左右子樹。因原始左右圖示未保留，維持 needs-review。',
    modelAnswer:
      'Pseudo-code 可寫：Mirror(t): if t==NULL return; temp=t->leftchild; t->leftchild=t->rightchild; t->rightchild=temp; Mirror(t->leftchild); Mirror(t->rightchild)。交換後遞迴處理新的左右子樹，即可把整棵二元樹變成鏡射。',
    modelAnswerDetails: [
      '空節點停止條件不可省略。',
      '交換左右指標只需要暫存 temp。',
      '交換後再遞迴左右子樹，或先遞迴再交換也可，但要涵蓋所有節點。',
      '這題交換的是指標，不是複製節點資料。'
    ],
    diagramInstructions:
      '文字圖解：畫泛型節點 t：交換前 t.left=L、t.right=R；交換後 t.left=R、t.right=L。遞迴規則為若 t 為空則停止，否則交換 t 的左右指標，再對新的 t.left 與 t.right 重複同一規則。',
    diagramAltText:
      '每個二元樹節點都把左子樹與右子樹互換，遞迴完成整棵樹的鏡射。',
    keyTerms: ['binary tree', 'recursive', 'leftchild', 'rightchild', 'mirror'],
    scoringPoints: ['空節點停止條件', '左右指標交換', '遞迴處理左右子樹', '符合 6 行內精神'],
    commonMistakes: ['只交換根節點', '忘記暫存造成一側遺失', '把節點值交換而非子樹指標交換'],
    handoutRefs: ['B-109-二元樹鏡射'],
    sourceRef: sourceRef(5),
    reviewStatus: 'needs-review'
  },
  {
    year: '109',
    number: 6,
    subject: 'programming',
    sourceBatch: '109-batch-2',
    examPoints: ['Maximum pairwise product', 'O(n)', '陣列掃描'],
    difficulty: 'intermediate',
    questionType: 'mixed',
    originalQuestion: sourceRef(6).originalExcerpt,
    questionExplanation:
      '最大兩兩乘積若整數可含負數，不能只找最大兩個正數；也要考慮最小兩個負數相乘可能最大。題目要求 O(n)，所以一次掃描維護最大兩個與最小兩個即可。',
    modelAnswer:
      '主要邏輯：掃描 NUM 一次，維護 max1、max2 兩個最大值，以及 min1、min2 兩個最小值。每讀一個 x，就更新最大兩值與最小兩值。掃描結束後，maxprod = max(max1*max2, min1*min2)。若題目保證全為正整數，則只需維護最大兩值；但題幹只說不重複整數，因此保留負數情境較完整。',
    modelAnswerDetails: [
      '一次掃描即可完成，時間 O(n)。',
      '維護最小兩值可處理兩個負數乘積變大的情況。',
      'n>2 保證至少有兩個元素可取，但仍應初始化前兩個或使用無限值。',
      '雙層迴圈枚舉所有配對會是 O(n^2)，不符合題目限制。'
    ],
    diagramInstructions:
      '文字圖解：畫一條陣列掃描線，掃過每個 NUM[i] 時更新四個盒子：最大值 max1、次大 max2、最小值 min1、次小 min2。掃描結束後比較兩條候選乘積線：max1*max2 與 min1*min2，較大者寫入 maxprod。',
    diagramAltText:
      'O(n) 演算法一次掃描陣列，維護最大兩值與最小兩值，再比較兩種候選乘積。',
    keyTerms: ['O(n)', 'maxprod', 'max1', 'min1', 'pairwise product'],
    scoringPoints: ['主要邏輯清楚', '時間複雜度 O(n)', '最大兩值維護正確', '考慮負數乘積情境'],
    commonMistakes: ['用雙層迴圈造成 O(n^2)', '只找最大值沒有找次大值', '忽略兩個負數相乘'],
    handoutRefs: ['B-109-MaxPairwiseProduct'],
    sourceRef: sourceRef(6),
    reviewStatus: 'verified'
  }
];
