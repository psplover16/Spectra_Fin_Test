import type { AnswerVerification, ExtractionStatus, FourOptionRecord } from '@/modules/examGroups/aGroup/types/questionAnalysis';
import type {
  QuestionTeachingReview,
  QuestionTeachingReviewMap
} from '@/modules/examGroups/aGroup/data/years/yearQuestionFactory';

interface ReviewInput {
  answerVerification?: AnswerVerification;
  answerNote?: string | null;
  coreTerms: string[];
  concept: string;
  rule: string;
  why: string;
  trap: string;
  solvingSteps: string[];
  optionExplanations: FourOptionRecord;
  keyTakeaways: string[];
  tags: string[];
  extractionStatus?: ExtractionStatus;
}

function createReview(input: ReviewInput): QuestionTeachingReview {
  const review: QuestionTeachingReview = {
    answerVerification: input.answerVerification ?? 'verified',
    answerNote: input.answerNote ?? null,
    coreTerms: input.coreTerms,
    beginnerExplanation: [
      `前置觀念：${input.concept}`,
      `規則來源與適用條件：${input.rule}`,
      `答案成立原因：${input.why}`,
      `常見混淆：${input.trap}`
    ].join('\n'),
    solvingSteps: input.solvingSteps,
    optionExplanations: input.optionExplanations,
    keyTakeaways: input.keyTakeaways,
    tags: input.tags
  };

  if (input.extractionStatus) {
    review.extractionStatus = input.extractionStatus;
  }

  return review;
}

export const reviewedQuestionAnalyses = {
  1: createReview({
    coreTerms: ['CPU 匯流排', '控制匯流排', '位址匯流排', '資料匯流排'],
    concept:
      'CPU 與記憶體、I/O 裝置交換資訊時，會透過匯流排傳送不同性質的訊號；常見分類是資料、位址與控制三類。',
    rule:
      '判斷 CPU 匯流排類型時，規則是看它承載的內容：資料匯流排傳資料位元，位址匯流排指定位置，控制匯流排傳讀寫、中斷等控制訊號；「流程匯流排」不是標準分類。',
    why:
      '題目問「不包含哪一項」，A 的 Process Bus 不是 CPU 匯流排依傳遞內容分類的標準名稱，因此成立。',
    trap:
      '容易把「流程」兩字誤會成控制流程；但標準教材通常說 control/address/data bus，不會把 process bus 列成並列類型。',
    solvingSteps: [
      '先確認題目是在問 CPU 匯流排依傳遞內容的分類。',
      '列出標準三類：控制匯流排、位址匯流排、資料匯流排。',
      '逐一比對選項，B、C、D 都能對應到標準分類。',
      'A 的流程匯流排不是標準分類，所以選 A。'
    ],
    optionExplanations: {
      A: '流程匯流排不是依傳遞內容區分 CPU 匯流排時的標準類型，是本題要找的非包含項。',
      B: '控制匯流排負責讀寫、時脈、中斷等控制訊號，屬於標準分類。',
      C: '位址匯流排用來指出記憶體或 I/O 的位置，屬於標準分類。',
      D: '資料匯流排承載實際資料位元，屬於標準分類。'
    },
    keyTakeaways: [
      'CPU 匯流排常見分類是 data bus、address bus、control bus。',
      '分類題要先背標準名稱，再排除看似合理但非標準的詞。',
      '常見陷阱是把控制流程誤展開成不存在的流程匯流排。'
    ],
    tags: ['computer-architecture', 'bus']
  }),
  2: createReview({
    coreTerms: ['八進位轉二進位', 'OR 位元運算', '十六進位'],
    concept:
      '八進位每一位正好對應 3 個二進位位元，十六進位每一位正好對應 4 個二進位位元；位元 OR 只要任一輸入為 1，結果就是 1。',
    rule:
      '適用條件是兩個數字要先補成相同位元長度再逐位 OR；八進位 502 轉成 101 000 010，325 轉成 011 010 101。',
    why:
      '101000010 OR 011010101 得 111010111，從右往左每 4 位分組為 0001 1101 0111，所以是 (1D7)16。',
    trap:
      '常見錯誤是把 OR 當加法、忘記補前導 0，或八進位轉二進位時沒有固定每位 3 bit。',
    solvingSteps: [
      '先把 (502)8 寫成 5、0、2 三位八進位，轉成 101 000 010。',
      '再把 (325)8 寫成 3、2、5，轉成 011 010 101。',
      '逐位執行 OR：101000010 OR 011010101 = 111010111。',
      '轉十六進位時補前導 0 成 0001 1101 0111。',
      '0001 是 1，1101 是 D，0111 是 7，因此答案是 1D7。'
    ],
    optionExplanations: {
      A: '(157)16 對應的二進位不是 111010111，通常是位元 OR 分組或轉換漏位造成。',
      B: '(197)16 把中間 4 位算成 1001，與 OR 後的 1101 不符合。',
      C: '(1D7)16 正確對應 111010111，是兩個八進位數逐位 OR 的結果。',
      D: '(1F7)16 把中間 4 位誤成 1111，等於多放入了不該出現的 1。'
    },
    keyTakeaways: [
      '八進位一位對三個 bit，十六進位一位對四個 bit。',
      'OR 的規則是只要其中一個 bit 為 1，結果就是 1。',
      '常見陷阱是沒有補齊位元長度，導致左右對不齊。'
    ],
    tags: ['number-system', 'bitwise-or']
  }),
  3: createReview({
    coreTerms: ['作業系統管理', '程序', '檔案', '裝置', '快取記憶體'],
    concept:
      '作業系統主要管理使用者程式與硬體資源之間的共享，包括程序、記憶體、檔案與 I/O 裝置。',
    rule:
      '題目問「非屬作業系統所管理的對象」時，要把 OS 的抽象資源和硬體內部快取機制分開；CPU cache 多由硬體與快取一致性機制處理。',
    why:
      '裝置、檔案、程序都是作業系統明確管理的資源；快取記憶體雖與效能有關，但不是一般 OS 管理清單中的主要對象。',
    trap:
      '容易看到「記憶體」就選錯；主記憶體由 OS 管理，但題目寫的是 cache memory，層級與管理方式不同。',
    solvingSteps: [
      '先列出 OS 常見管理對象：程序、記憶體、檔案、裝置。',
      '檢查 A 裝置，OS 透過驅動程式與 I/O 管理裝置。',
      '檢查 C 檔案，檔案系統由 OS 管理。',
      '檢查 D 程序，排程與程序狀態由 OS 管理。',
      '剩下 B 快取記憶體不是此分類下的主要 OS 管理對象，因此選 B。'
    ],
    optionExplanations: {
      A: '裝置由作業系統透過 driver、I/O 排程與權限控制管理，不是非管理項。',
      B: '快取記憶體多由硬體快取機制處理，不是一般 OS 管理對象清單中的標準項。',
      C: '檔案由檔案系統管理，是作業系統的重要職責。',
      D: '程序由作業系統建立、排程、切換與回收，是標準管理對象。'
    },
    keyTakeaways: [
      'OS 管理程序、記憶體、檔案與 I/O 裝置。',
      'cache memory 和 main memory 的管理層級不同。',
      '常見陷阱是只看到 memory 就把所有記憶體都歸到 OS 管理。'
    ],
    tags: ['operating-system']
  }),
  4: createReview({
    coreTerms: ['雜湊搜尋', 'Hash table', '排序需求', '平均 O(1)'],
    concept:
      '雜湊搜尋是把 key 經由 hash function 對應到桶或表格位置，再直接到該位置查找；它追求的是快速定位，不是依大小順序掃描。',
    rule:
      'Hashing 的適用條件是能設計合適的雜湊函式與碰撞處理；平均搜尋時間可接近 O(1)，但資料不需要先排序。',
    why:
      'A 說資料須先排序，這是二分搜尋等有序搜尋常見條件，不是雜湊搜尋條件，所以為錯誤敘述。',
    trap:
      '容易把搜尋法混在一起：二分搜尋要排序，雜湊搜尋要好 hash 與碰撞處理，兩者前提不同。',
    solvingSteps: [
      '先辨認題目問「何者有誤」，要找錯誤敘述。',
      '回想 hashing 的核心是用 hash function 算位置。',
      '檢查 A：排序不是 hashing 的必要條件。',
      '檢查 B、C、D：平均速度與資料量關係較小、設計較複雜、可用於隱藏原 key 分布，皆可視為合理敘述。',
      '因此答案選 A。'
    ],
    optionExplanations: {
      A: '雜湊搜尋不要求資料先排序；排序需求是二分搜尋的條件，這項有誤。',
      B: '理想 hash table 平均查找接近 O(1)，速度不會像線性搜尋那樣隨資料量等比例成長。',
      C: '雜湊函式、碰撞處理與負載因子都需要設計，實作確實較單純線性搜尋複雜。',
      D: 'hash 可隱藏原始 key 與位置的直接關係，雖不是絕對安全，但相對有保密效果。'
    },
    keyTakeaways: [
      '雜湊搜尋靠 hash function 定位，不靠排序。',
      '二分搜尋需要有序資料；不要把二分搜尋條件套到 hashing。',
      '常見陷阱是忽略碰撞處理與負載因子會影響實際效能。'
    ],
    tags: ['hashing', 'search']
  }),
  5: createReview({
    coreTerms: ['二分搜尋', '最多比較次數', 'log2'],
    concept:
      '二分搜尋每次比較後都把候選範圍切成一半，因此最多比較次數和 log2(n) 有關，而不是和 n 成正比。',
    rule:
      '對 n 筆已排序資料，最多比較次數可用 ceil(log2(n)) 或接近的二分切半層數判斷；本題 n=216，2^7=128、2^8=256。',
    why:
      '216 介於 128 與 256 之間，所以最壞情況需要 8 次以內的切半比較，選 8。',
    trap:
      '常見混淆是把二分搜尋當線性搜尋，或把 216 誤讀成 2^16；若是 2^16 答案就不會是 8。',
    solvingSteps: [
      '先確認二分搜尋的前提是資料已排序。',
      '找最接近 216 的 2 的次方：2^7=128 小於 216。',
      '再看 2^8=256 大於或等於 216。',
      '表示最多需要 8 次比較才能涵蓋 216 筆資料。',
      '因此答案選 B。'
    ],
    optionExplanations: {
      A: '7 次最多只能涵蓋到 2^7=128 筆，不足以保證搜尋 216 筆資料。',
      B: '8 次可涵蓋到 2^8=256 筆，足以覆蓋 216 筆資料的最壞情況。',
      C: '16 次太多，常見於把題目數字誤看成 2^16 或把 log 概念用錯。',
      D: '108 是把資料量約除以 2 的一次結果，不是連續切半的最多比較次數。'
    },
    keyTakeaways: [
      '二分搜尋最多比較次數與 log2(n) 有關。',
      '找最小的 k 讓 2^k >= n，即可估最多比較次數。',
      '常見陷阱是把一次切半後的 108 當答案，或把二分搜尋當線性搜尋。'
    ],
    tags: ['binary-search', 'algorithm']
  }),
  6: createReview({
    coreTerms: ['SJF', '非搶先排程', '等待時間', '平均等待時間'],
    concept:
      '最短作業優先 SJF 會在 CPU 空閒時，從已到達的工作中挑執行時間最短者；非搶先版本一旦開始執行就會跑到完成。',
    rule:
      '等待時間的規則是 start time 減 arrival time；平均等待時間則把所有程序等待時間相加再除以程序數。',
    why:
      't=0 只有 P1 到達，所以 P1 先跑 0-8；之後依執行時間選 P2、P4、P3，等待時間為 0、7、8、14，平均為 7.25 ms。',
    trap:
      '常見混淆是誤用搶先式 SJF/SRTF，或在 t=0 就把尚未到達的 P2、P3、P4 拿來排序。',
    solvingSteps: [
      '先看 t=0，只有 P1 到達，因此 P1 從 0 跑到 8。',
      't=8 時 P2、P3、P4 都已到達，選最短的 P2，從 8 跑到 11。',
      '剩下 P4 執行 5 ms、P3 執行 9 ms，所以 P4 從 11 跑到 16，P3 從 16 跑到 25。',
      '計算等待時間：P1=0-0=0，P2=8-1=7，P4=11-3=8，P3=16-2=14。',
      '平均等待時間=(0+7+8+14)/4=7.25 ms。'
    ],
    optionExplanations: {
      A: '7 ms 少算了某個程序的等待時間，通常是 P4 或 P3 起始時間算錯。',
      B: '7.25 ms 來自非搶先 SJF 排序 P1、P2、P4、P3 後的平均等待時間。',
      C: '7.5 ms 常見於排序順序或到達時間處理略有偏差。',
      D: '8 ms 會高估等待總和，沒有符合本題排程順序。'
    },
    keyTakeaways: [
      '非搶先 SJF 只能在 CPU 空閒時從已到達程序中選最短者。',
      '等待時間等於開始執行時間減到達時間。',
      '常見陷阱是把尚未到達的程序提前納入排序，或誤用搶先式 SRTF。'
    ],
    tags: ['scheduling', 'sjf']
  }),
  7: createReview({
    coreTerms: ['RAID 0', 'RAID 1', 'RAID 5', '資料安全性'],
    concept:
      'RAID 是用多顆磁碟組合效能或可靠性的技術。RAID 0 重在分散讀寫，RAID 1 重在鏡像備援，RAID 5 則用同位元資訊容忍單顆磁碟故障。',
    rule:
      '依資料存放安全性排序時，鏡像完整複製通常高於同位元容錯；RAID 0 沒有冗餘，安全性最低。',
    why:
      'RAID 1 有完整鏡像，RAID 5 有 parity 可復原單顆故障，RAID 0 只有 striping 無備援，所以順序是 RAID 1、RAID 5、RAID 0。',
    trap:
      '容易把效能和安全性混在一起；RAID 0 讀寫快，但任一磁碟故障都可能破壞資料。',
    solvingSteps: [
      '先辨認題目問的是安全性，不是效能或容量利用率。',
      '檢查 RAID 1：鏡像保存資料副本，安全性最高。',
      '檢查 RAID 5：靠 parity 可容忍單顆磁碟故障，安全性居中。',
      '檢查 RAID 0：只有切割分散，沒有冗餘，安全性最低。',
      '因此由高到低是 RAID 1、RAID 5、RAID 0。'
    ],
    optionExplanations: {
      A: 'RAID 1 > RAID 5 > RAID 0 正確反映鏡像、同位元容錯、無冗餘的安全性差異。',
      B: '把 RAID 0 放最高是把效能誤當安全性，RAID 0 無容錯。',
      C: 'RAID 0 不應高於 RAID 5，因為 RAID 5 有 parity 容錯。',
      D: 'RAID 0 不應高於 RAID 1，也不應高於 RAID 5。'
    },
    keyTakeaways: [
      'RAID 1 透過鏡像提高資料安全性。',
      'RAID 5 透過 parity 容忍單顆磁碟故障。',
      'RAID 0 沒有冗餘，效能可能好但安全性最低。'
    ],
    tags: ['raid', 'storage']
  }),
  8: createReview({
    coreTerms: ['XOR', '反相控制', '真值表', '補數'],
    concept:
      'XOR 的規則是兩個輸入不同時輸出 1，相同時輸出 0；若其中一個輸入當控制位元，它可以決定另一個資料位元是否反相。',
    rule:
      'data XOR 0 = data，data XOR 1 = NOT data；這正好符合題目 control=0 輸出原值、control=1 輸出補數的條件。',
    why:
      '題幹描述的是用 control 決定資料是否反相的電路，XOR 正是標準做法，所以 D 成立。',
    trap:
      '常見混淆是看到反相就選 NAND，但 NAND 不會在 control=0 時直接保持 data。',
    solvingSteps: [
      '先把 control=0 的需求寫成輸出 data。',
      '測試 XOR：data XOR 0 會得到 data。',
      '再把 control=1 的需求寫成輸出 data 的補數。',
      '測試 XOR：data XOR 1 會得到 NOT data。',
      '兩個條件都符合，所以選 XOR。'
    ],
    optionExplanations: {
      A: 'AND 在 control=0 時永遠輸出 0，不能保留 data。',
      B: 'NAND 是 AND 後反相，無法同時滿足 control=0 保留 data、control=1 反相 data。',
      C: 'OR 在 control=1 時永遠輸出 1，不是 data 的補數。',
      D: 'XOR 滿足 data XOR 0=data、data XOR 1=補數，是本題電路。'
    },
    keyTakeaways: [
      'XOR 可作為可控制反相器。',
      'data XOR 0 保持原值；data XOR 1 反相。',
      '常見陷阱是只看到反相就選 NAND，卻忘記 control=0 的保持條件。'
    ],
    tags: ['digital-logic', 'xor']
  }),
  9: createReview({
    coreTerms: ['2 的補數', '反相加一', '固定 bit 寬度'],
    concept:
      '2 的補數是用固定位元寬度表示負數或求相反數的方法；對一個 bit pattern 求 2 補數，規則是逐位反相後再加 1。',
    rule:
      '本題輸入是 6 位元 101100，所以必須保留 6 位元寬度；反相得到 010011，再加 1 得 010100。',
    why:
      '010100 正是 101100 的 2 補數結果，因此 D 正確。',
    trap:
      '容易只做反相忘記加 1，或加 1 時從錯誤位元開始進位。',
    solvingSteps: [
      '先確認位元寬度是 6 位元。',
      '把 101100 逐位反相，得到 010011。',
      '對 010011 加 1，得到 010100。',
      '比對選項，010100 是 D。'
    ],
    optionExplanations: {
      A: '010001 僅接近反相結果但加法錯誤，不是反相加一。',
      B: '010011 只是 101100 的一補數，少了再加 1。',
      C: '010101 是加 1 時多進了一位，與正確結果差 1。',
      D: '010100 是反相 010011 再加 1 的結果。'
    },
    keyTakeaways: [
      '求 2 補數的規則是反相加一。',
      '固定 bit 寬度不能任意增減位數。',
      '常見陷阱是把一補數誤當二補數。'
    ],
    tags: ['two-complement', 'binary-arithmetic']
  }),
  10: createReview({
    coreTerms: ['最差時間複雜度', '合併排序', '快速排序', '氣泡排序'],
    concept:
      '排序演算法會用最好、平均、最差情況分析時間複雜度；題目明確問最差情況，因此不能只記平均表現。',
    rule:
      '合併排序每層合併成本 O(n)，共有 log n 層，最差、平均、最好都維持 O(n log n)。',
    why:
      '四個選項中，合併排序在最差情況仍是 O(n log n)，所以 B 正確。',
    trap:
      '快速排序平均 O(n log n) 但最差 O(n^2)，常被拿來當干擾選項。',
    solvingSteps: [
      '先抓關鍵字「最差情況」。',
      '檢查氣泡排序，最差要多輪相鄰交換，為 O(n^2)。',
      '檢查合併排序，每層處理 n 個元素，共 log n 層，最差 O(n log n)。',
      '檢查快速排序，若 pivot 極差可能退化成 O(n^2)。',
      '檢查基數排序不是比較排序，複雜度依位數與基數而定，不是本題標準答案。'
    ],
    optionExplanations: {
      A: '氣泡排序最差情況需要 O(n^2) 次比較或交換，不符合 O(n log n)。',
      B: '合併排序每次對半分割再線性合併，最差仍是 O(n log n)。',
      C: '快速排序平均很好，但 pivot 選得很差時最差會退化為 O(n^2)。',
      D: '基數排序的成本依位數與桶數而定，通常寫作 O(d(n+k))，不是本題的比較排序答案。'
    },
    keyTakeaways: [
      '看到最差情況，要特別排除快速排序的平均表現陷阱。',
      '合併排序最差時間複雜度穩定為 O(n log n)。',
      '氣泡排序最差為 O(n^2)。'
    ],
    tags: ['sorting', 'merge-sort']
  }),
  11: createReview({
    coreTerms: ['方法重載', 'Overload', '方法簽章', '物件導向'],
    concept:
      '方法簽章包含方法名稱與參數列表；在同一類別中，名稱相同但參數個數或型別不同，稱為方法重載 overload。',
    rule:
      '適用條件是同一作用域內的方法名稱相同、參數列表不同；回傳型別不同但參數相同不構成合法重載。',
    why:
      '題目中的兩個 add 都在 Sub 類別內，第一個沒有參數，第二個有兩個 int 參數，名稱相同但參數列表不同，因此是重載。',
    trap:
      '常見混淆是把 overload 和 override 混在一起；override 是子類別重新定義父類別同簽章方法。',
    solvingSteps: [
      '先讀程式碼，看到同一個類別 Sub 內有兩個 add。',
      '檢查第一個 add 沒有參數。',
      '檢查第二個 add 有 int x、int y 兩個參數。',
      '套用重載規則：同名方法但參數列表不同。',
      '因此答案選 D。'
    ],
    optionExplanations: {
      A: '繼承是子類別取得父類別成員，本題只看到同一類別內兩個同名方法。',
      B: '抽象化是隱藏細節與抽出共同特性，不是同名方法參數不同的概念。',
      C: '覆寫需要子類別與父類別間同簽章方法，本題沒有父子類別關係。',
      D: '重載是同一類別中同名但參數列表不同的方法，符合兩個 add。'
    },
    keyTakeaways: [
      'Overload 看方法名稱相同、參數列表不同。',
      'Override 看繼承關係與同簽章重新定義。',
      '常見陷阱是只看到同名方法就誤選覆寫，必須先看是否有父子類別。'
    ],
    tags: ['java', 'oop', 'overloading']
  }),
  12: createReview({
    coreTerms: ['Call by Reference', '陣列傳遞', '傳址呼叫', '資料複製成本'],
    concept:
      '呼叫副程式時，資料可以用複製值的方式傳遞，也可以用位址或參考傳遞；大量資料結構若整份複製，成本會比較高。',
    rule:
      '陣列元素很多時，用傳址呼叫只傳遞陣列所在位置或參考，副程式可透過該位置存取資料，因此傳遞成本低。',
    why:
      '題目問傳遞速度較快，傳址呼叫不需要複製整個陣列，所以 C 成立。',
    trap:
      '容易把「副程式執行速度」和「參數傳遞速度」混在一起；本題重點是把陣列交給副程式時的資料搬移成本。',
    solvingSteps: [
      '先確認題目資料型態是一組陣列，不是單一整數。',
      '比較傳值呼叫：可能需要複製資料內容。',
      '比較傳址呼叫：只傳遞位址或參考即可。',
      '陣列越大，少複製資料越有利。',
      '因此答案選 C。'
    ],
    optionExplanations: {
      A: '傳名呼叫是較特殊的參數評估策略，不是一般陣列快速傳遞的標準答案。',
      B: '傳值呼叫若複製陣列內容，資料量大時成本較高。',
      C: '傳址呼叫傳位置或參考，不必複製整個陣列，傳遞速度較快。',
      D: '陣列資料量大時，傳值與傳址的資料搬移成本通常不會一樣。'
    },
    keyTakeaways: [
      '大型資料結構常用 reference/address 方式避免複製成本。',
      '傳值重點是複製值，傳址重點是傳位置。',
      '常見陷阱是忽略題目問的是陣列，不是單一小型變數。'
    ],
    tags: ['programming', 'parameter-passing']
  }),
  13: createReview({
    coreTerms: ['i++', '++i', '遞增運算子', 'C 語言輸出順序'],
    concept:
      'C 語言的後置遞增 i++ 會先使用目前值再把 i 加 1；前置遞增 ++i 會先加 1 再使用新值。',
    rule:
      '適用條件是每個 printf 都是分開的完整敘述，前一行的副作用會在下一行前完成；因此可以依序追蹤 i 的值。',
    why:
      'i 初始為 0，第一次 i++ 印 0 後 i 變 1；第二次 ++i 先變 2 印 2；第三次 ++i 先變 3 印 3，所以輸出 0 2 3。',
    trap:
      '常見混淆是把 i++ 也當成先加，或忘記每行 printf 之後 i 的值已改變。',
    solvingSteps: [
      '先記下 i=0。',
      '執行 printf("%d", i++)：先印 0，再把 i 改成 1。',
      '執行 printf("%d", ++i)：先把 i 改成 2，再印 2。',
      '再執行一次 ++i：先把 i 改成 3，再印 3。',
      '所以結果為 0 2 3。'
    ],
    optionExplanations: {
      A: '0 1 2 把前置遞增誤當成使用後才加，沒有先加再印。',
      B: '0 2 2 忘記第三次 ++i 還會再加一次。',
      C: '0 2 3 正確反映後置遞增與兩次前置遞增的順序。',
      D: '1 2 3 把第一次 i++ 誤當成先加再印。'
    },
    keyTakeaways: [
      'i++ 是先用再加；++i 是先加再用。',
      '分開的敘述可以逐行追蹤變數狀態。',
      '常見陷阱是只背符號，不看使用值與更新值的先後。'
    ],
    tags: ['c-language', 'increment-operator']
  }),
  14: createReview({
    coreTerms: ['Java primitive types', '位元長度', 'long', 'int', 'char', 'byte'],
    concept:
      'Java 基本型別有固定大小，例如 byte 8 bit、char 16 bit、int 32 bit、long 64 bit；boolean 在規格中不以一般數值位元長度排序。',
    rule:
      '題目要求由大到小排列，要比較同一選項內型別長度是否一路遞減。',
    why:
      'B 的 long 64、int 32、char 16、byte 8 正好由大到小排列，所以正確。',
    trap:
      '常見混淆是以為 char 比 int 大，或把 boolean 放進數值型別位元排序。',
    solvingSteps: [
      '先列出常見長度：long 64、int 32、char 16、short 16、byte 8。',
      '檢查 A：double 64 後接 short 16，再接 int 32，順序回升，錯誤。',
      '檢查 B：64、32、16、8 完整遞減。',
      '檢查 C：double 64、float 32、byte 8、char 16，最後回升，錯誤。',
      '檢查 D：long 後接 char 再 int，16 到 32 回升，錯誤。'
    ],
    optionExplanations: {
      A: 'short 16 bit 後面接 int 32 bit，不是由大到小。',
      B: 'long 64、int 32、char 16、byte 8，符合由大到小。',
      C: 'byte 8 bit 後面接 char 16 bit，順序錯誤。',
      D: 'char 16 bit 後面接 int 32 bit，且 boolean 不適合拿來作一般數值長度排序。'
    },
    keyTakeaways: [
      'Java long 64 bit，int 32 bit，char 16 bit，byte 8 bit。',
      '排序題要逐項比大小，不能只看第一個型別。',
      '常見陷阱是忘記 char 是 16 bit Unicode code unit。'
    ],
    tags: ['java', 'primitive-types']
  }),
  15: createReview({
    coreTerms: ['Java byte 範圍', '編譯期檢查', '整數常值', '大小寫識別'],
    concept:
      'Java 的 byte 是 8 位元有號整數，範圍是 -128 到 127；指派常數給 byte 時，編譯器會檢查常數是否落在範圍內。',
    rule:
      'byte b=200 超過 byte 範圍，會在編譯期失敗；另外 Java 也區分大小寫，system 不是標準的 System 類別名稱。',
    why:
      '程式在執行前就無法通過編譯，因此不是顯示 300、127 或執行時錯誤，而是編譯失敗。',
    trap:
      '常見混淆是只看到 c=(byte)(a+b) 就去算溢位，卻忽略前面的 byte b=200 已經先編譯失敗。',
    solvingSteps: [
      '先檢查 byte a=100，100 在 -128 到 127 內，合法。',
      '再檢查 byte b=200，200 超過 byte 上限 127。',
      '因為常數指派已不合法，程式在這行就編譯失敗。',
      '即使後面有強制轉型，也無法補救前一行的錯誤。',
      '因此答案選 D。'
    ],
    optionExplanations: {
      A: '300 是以一般整數加法想像的結果，但程式無法先通過編譯。',
      B: '127 不是本程式的輸出；byte 溢位也不是在合法執行後才發生。',
      C: '錯誤不是執行時才出現，而是編譯期就會被拒絕。',
      D: 'byte b=200 超出 byte 範圍，加上 system 大小寫也不符，會編譯失敗。'
    },
    keyTakeaways: [
      'Java byte 範圍是 -128 到 127。',
      '常數指派給 byte 會做編譯期範圍檢查。',
      '常見陷阱是先算後面的轉型，忽略前面宣告已不合法。'
    ],
    tags: ['java', 'byte', 'compile-error']
  }),
  16: createReview({
    coreTerms: ['Stack', 'LIFO', 'push', 'pop'],
    concept:
      '堆疊 Stack 的核心規則是 LIFO，Last In First Out，最後放入的元素會最先被 pop 取出。',
    rule:
      '追蹤堆疊題時，要每做一次 push 就把元素放到頂端，每做一次 pop 就移除目前頂端。',
    why:
      'A、B 依序放入後又被兩次 pop 移除；接著 C、D 放入，第一次 pop 取出 D，最後一次 pop 取出 C。',
    trap:
      '常見混淆是把 stack 當 queue，以為先進先出；本題必須照 LIFO 逐步追蹤。',
    solvingSteps: [
      '先執行 push A，堆疊為 [A]；再執行 push B，堆疊為 [A, B]，頂端是 B。',
      '再執行第一次 pop 取出 B，第二次 pop 取出 A，堆疊清空。',
      '接著 push C 得到 [C]，再 push D 得到 [C, D]，頂端是 D。',
      '然後執行下一次 pop，取出目前頂端 D。',
      '最後一次 pop 會取出剩下的 C，因此答案是 C。'
    ],
    optionExplanations: {
      A: 'A 已在前半段第二次 pop 被取出，不會留到最後。',
      B: 'B 是第一個被 pop 取出的元素，不是最後一次結果。',
      C: 'C 在 D 被 pop 後留在頂端，因此最後一次 pop 取出 C。',
      D: 'D 是後半段第一次 pop 的結果，不是最後一次。'
    },
    keyTakeaways: [
      'Stack 是 LIFO，最後放入最先取出。',
      '追蹤 push/pop 題要畫出每一步頂端元素。',
      '常見陷阱是把 stack 和 queue 的 FIFO 規則混淆。'
    ],
    tags: ['data-structure', 'stack']
  }),
  17: createReview({
    coreTerms: ['十進位轉二進位', '整數部分', '小數部分', '位權'],
    concept:
      '十進位轉二進位可分開處理整數與小數。整數用 2 的冪次分解，小數用乘 2 或位權 1/2、1/4、1/8 判斷。',
    rule:
      '528 = 512 + 16，因此整數二進位在 2^9 與 2^4 位置為 1；0.75 = 1/2 + 1/4，因此小數為 .11。',
    why:
      '整數部分 528 是 1000010000，小數部分 .75 是 .11，合起來為 1000010000.11。',
    trap:
      '常見錯誤是把 16 看成 32，或把 0.75 誤寫成 .101；.101 代表 0.625，不是 0.75。',
    solvingSteps: [
      '先找最大 2 的冪次：2^9=512，小於 528。',
      '528-512=16，16 是 2^4，所以整數部分為 1000010000。',
      '處理小數 0.75：0.5 取 1，剩 0.25。',
      '下一位 0.25 取 1，剩 0，所以小數部分是 .11。',
      '合併得到 1000010000.11。'
    ],
    optionExplanations: {
      A: '1000011000 多了 2^3 的 8，整數部分變成 536，且 .101 不是 0.75。',
      B: '整數部分正確，但 .101 代表 0.625，不是 0.75。',
      C: '小數 .11 正確，但整數 1000011000 多了 8。',
      D: '1000010000.11 同時符合 528 與 0.75 的二進位表示。'
    },
    keyTakeaways: [
      '整數轉二進位可用 2 的冪次分解。',
      '二進位小數 .11 代表 1/2 + 1/4 = 0.75。',
      '常見陷阱是忽略小數位權不是十進位位權。'
    ],
    tags: ['number-system', 'binary']
  }),
  18: createReview({
    coreTerms: ['IaaS', 'PaaS', 'SaaS', 'Amazon EC2'],
    concept:
      '雲端服務可依使用者取得的抽象層級分類：IaaS 提供運算、儲存、網路等基礎資源；PaaS 提供應用開發平台；SaaS 提供可直接使用的軟體。',
    rule:
      'Amazon EC2 讓使用者建立與管理虛擬機器執行個體，使用者仍需管理作業系統與部署內容，因此屬於基礎設施層級。',
    why:
      'EC2 的核心是彈性運算資源，不是開發平台或成品軟體，所以答案是 IaaS。',
    trap:
      '常見混淆是把所有雲端服務都叫 SaaS；要看使用者拿到的是機器、平台還是應用程式。',
    solvingSteps: [
      '先讀出服務名稱 Amazon EC2。',
      '回想 EC2 提供的是可啟動的 virtual machine instance。',
      '判斷使用者要自行管理 OS、套件與應用部署。',
      '這符合 IaaS 的基礎資源模式。',
      '因此答案選 A。'
    ],
    optionExplanations: {
      A: 'IaaS 提供虛擬機、儲存與網路等基礎資源，EC2 正是此類服務。',
      B: 'PaaS 偏向提供應用執行平台，例如免管理底層主機的部署環境，不是 EC2 的主要分類。',
      C: 'SaaS 是直接使用軟體服務，EC2 不是成品應用。',
      D: 'AssS 不是常見的標準雲端服務分類。'
    },
    keyTakeaways: [
      'EC2 屬於 IaaS，重點是虛擬運算資源。',
      'PaaS 管平台，SaaS 給應用，IaaS 給基礎設施。',
      '常見陷阱是只因為服務在雲端就選 SaaS。'
    ],
    tags: ['cloud', 'iaas']
  }),
  19: createReview({
    coreTerms: ['Java array', 'IndexOutOfBoundsException', '編譯期', '執行期'],
    concept:
      'Java 陣列長度在建立後固定，合法索引範圍是 0 到 length-1；索引值是否超界通常要到程式執行時才知道。',
    rule:
      '若程式語法與型別本身合法，編譯器會先通過；實際存取超出範圍時，JVM 會丟出陣列索引越界例外。',
    why:
      '題目問索引值超過宣告範圍，正確狀況是可編譯，但執行到該存取時產生 Exception。',
    trap:
      '常見混淆是把執行期錯誤誤當編譯期錯誤；除非索引是明顯不合法的語法，否則一般是 runtime exception。',
    solvingSteps: [
      '先確認 Java 陣列索引合法範圍為 0 到 length-1。',
      '超出範圍的存取不是語法錯誤，程式仍可編譯。',
      '執行時 JVM 會檢查索引。',
      '若索引超出範圍，會產生例外。',
      '因此答案選 A。'
    ],
    optionExplanations: {
      A: '程式可通過編譯，但執行到越界存取時會產生例外，符合 Java 陣列邊界檢查。',
      B: 'Java 不會默默給可能錯誤結果；它會丟出明確例外。',
      C: '一般越界存取不是編譯器停止編譯的原因，因為索引常到執行時才確定。',
      D: 'Java 對陣列越界不是只給警告後繼續執行，而是 runtime exception。'
    },
    keyTakeaways: [
      'Java 陣列索引從 0 到 length-1。',
      '陣列越界通常是執行期例外，不是單純編譯警告。',
      '常見陷阱是把語法錯誤、邏輯錯誤與 runtime exception 混在一起。'
    ],
    tags: ['java', 'array', 'exception']
  }),
  20: createReview({
    coreTerms: ['C 多維陣列', 'row-major order', '零起始索引', 'array indexing'],
    concept:
      'C 語言陣列索引從 0 開始，多維陣列初始化時會依 row-major order 由最右邊維度最快變化依序填入。',
    rule:
      'int array[4][2][2] 可看成 4 個大區塊，每個區塊有 2x2=4 個元素；第一維索引 2 代表第三個區塊，包含第 9 到第 12 個值。',
    why:
      'array[2][1][1] 在第三個 2x2 區塊的第二列第二欄，值是 12。',
    trap:
      '常見混淆是把索引從 1 開始算，或忘記最右邊維度最先遞增。',
    solvingSteps: [
      '先把 16 個值分成 4 個第一維區塊，每個區塊 4 個值。',
      'array[0] 是 1,2,3,4；array[1] 是 5,6,7,8；array[2] 是 9,10,11,12。',
      '在 array[2] 內再分成兩列：[9,10] 與 [11,12]。',
      '索引 [1][1] 代表第二列第二欄。',
      '因此值為 12。'
    ],
    optionExplanations: {
      A: '8 位於第二個第一維區塊末端，通常是第一維索引少算一組造成。',
      B: '10 是第三個區塊第一列第二欄，沒有套用第二維索引 1。',
      C: '12 是第三個區塊第二列第二欄，符合 array[2][1][1]。',
      D: '14 位於第四個區塊，表示第一維索引誤往後算。'
    },
    keyTakeaways: [
      'C 陣列索引從 0 開始。',
      '多維陣列初始化採 row-major，最右邊索引變化最快。',
      '常見陷阱是把 [2] 當第二組而非第三組。'
    ],
    tags: ['c-language', 'array']
  }),
  21: createReview({
    coreTerms: ['Python recursion', '階乘', 'base case', 'recursive case'],
    concept:
      '遞迴函式需要終止條件 base case 和遞迴步驟 recursive case；階乘 n! 的規則是 n! = n x (n-1)!，且 0! 與 1! 都是 1。',
    rule:
      '題目程式的條件運算式表示 n 為 0 或 1 時回傳 1，其他情況回傳 n * calnum(n-1)，正是階乘定義。',
    why:
      'calnum(5)=5*4*3*2*1=120，因此答案是 C。',
    trap:
      '常見混淆是只看第一層 5*(5-1) 就停下，或把 base case 的 0/1 回傳值誤算進兩次。',
    solvingSteps: [
      '先辨認 calnum 的 base case：n==1 或 n==0 時回傳 1。',
      'calnum(5) 不是 base case，所以變成 5*calnum(4)。',
      'calnum(4)=4*calnum(3)，calnum(3)=3*calnum(2)，calnum(2)=2*calnum(1)。',
      'calnum(1)=1，往回乘得到 2、6、24、120。',
      '因此 print(calnum(5)) 產生 120。'
    ],
    optionExplanations: {
      A: '24 是 4!，少乘了最外層的 5。',
      B: '25 像是把 5 平方或其他運算誤套到遞迴，沒有照階乘展開。',
      C: '120 是 5!，符合 n * calnum(n-1) 的遞迴規則。',
      D: '125 是 5 的三次方，不是這段遞迴的乘法展開。'
    },
    keyTakeaways: [
      '遞迴要先找 base case，再展開 recursive case。',
      '階乘規則是 n! = n x (n-1)!，0! 和 1! 都是 1。',
      '常見陷阱是只展開一層或把階乘誤當次方。'
    ],
    tags: ['python', 'recursion']
  }),
  22: createReview({
    coreTerms: ['View', '關聯式資料庫', '虛擬表', '安全性'],
    concept:
      '資料庫 View 可看成儲存好的查詢定義，使用者像查表一樣查它，但它通常不另存一份實體資料內容。',
    rule:
      'View 的資料來自基底資料表或查詢運算結果；可用來限制欄位、過濾資料與簡化查詢，但「View 本身有儲存資料」不是一般 View 的正確描述。',
    why:
      '題目問何者有誤，D 把 View 說成自己儲存資料，因此是錯誤敘述。',
    trap:
      '常見混淆是把一般 View 和 materialized view 混在一起；materialized view 可能實體化，但題目通常指一般檢視表。',
    solvingSteps: [
      '先辨認題目問關聯式資料庫的一般 View。',
      '檢查 A：View 可隱藏敏感欄位或列，合理。',
      '檢查 B：一般使用者可被限制透過 View 讀取，合理。',
      '檢查 C：View 可由查詢或運算結果形成，合理。',
      '檢查 D：一般 View 儲存的是查詢定義，不是資料本身，因此有誤。'
    ],
    optionExplanations: {
      A: 'View 可以只暴露部分欄位或資料列，常用來提高資料存取安全性。',
      B: 'View 可作為受控介面，限制使用者直接碰基底資料；實際可否更新仍依 DBMS 與 View 定義而定。',
      C: 'View 可建立在查詢結果上，來源可以包含 join、投影、篩選或運算。',
      D: '一般 View 不儲存資料內容，而是儲存查詢定義；這項有誤。'
    },
    keyTakeaways: [
      'View 通常是虛擬表，資料來自基底表查詢。',
      'View 可用於安全性、簡化查詢與資料抽象。',
      '常見陷阱是把一般 View 與 materialized view 混淆。'
    ],
    tags: ['database', 'view']
  }),
  23: createReview({
    coreTerms: ['Euclidean algorithm', '最大公因數', 'while loop', 'modulus'],
    concept:
      '輾轉相除法用反覆取餘數求最大公因數；規則是 gcd(a,b)=gcd(b,a mod b)，直到餘數為 0。',
    rule:
      '程式每輪把 r 設成 a%b，再令 a=b、b=r；當 b 變 0 時，a 就是最後的最大公因數。',
    why:
      '36%45=36，45%36=9，36%9=0；迴圈結束時 a=9，所以輸出 result=9。',
    trap:
      '常見混淆是看到 a=36 小於 b=45 就以為不能取餘數；實際上 36%45 仍是 36，演算法仍可前進。',
    solvingSteps: [
      '先設定初始值 a=36、b=45，並依 while(b!=0) 檢查 b 不是 0。',
      '第一輪計算 r=36%45=36，再更新 a=45、b=36。',
      '第二輪計算 r=45%36=9，再更新 a=36、b=9。',
      '第三輪計算 r=36%9=0，再更新 a=9、b=0。',
      '最後檢查 b==0 離開迴圈，輸出目前的 a，也就是 9。'
    ],
    optionExplanations: {
      A: '6 不是 36 與 45 的最大公因數；45 不能被 6 整除。',
      B: '7 不是兩數公因數。',
      C: '8 不是兩數公因數。',
      D: '9 是 36 與 45 的最大公因數，也是程式最後輸出的 a。'
    },
    keyTakeaways: [
      '輾轉相除法用 gcd(a,b)=gcd(b,a mod b)。',
      'while 迴圈停止於 b=0，當下 a 是最大公因數。',
      '常見陷阱是忘記每輪 a、b 都會被重新指定。'
    ],
    tags: ['algorithm', 'gcd', 'c-language']
  }),
  24: createReview({
    coreTerms: ['編譯式語言', '直譯式語言', '執行期', '效能'],
    concept:
      '編譯式語言通常先把程式轉成機器碼或較低階目標碼再執行；直譯式語言則常在執行時逐行或逐段解讀與執行。',
    rule:
      '在相同程式邏輯與一般情況下，編譯式語言通常執行效率較高；直譯式語言有彈性但執行期解讀成本較大。',
    why:
      'B 說直譯式語言在執行期比編譯式語言快，這與一般分類規則相反，因此為錯誤敘述。',
    trap:
      '常見混淆是把開發速度或互動性當成執行速度；直譯式常方便開發，但不代表執行期一定更快。',
    solvingSteps: [
      '先抓題目問「何者有誤」。',
      '檢查 A：直譯式語言逐行或逐段讀取執行，合理。',
      '檢查 B：說直譯式執行速度比編譯式快，通常錯誤。',
      '檢查 C：Python 常被歸為直譯式語言，合理。',
      '檢查 D：C++ 常被歸為編譯式語言，合理。'
    ],
    optionExplanations: {
      A: '這是直譯式語言的一般描述，屬於正確敘述。',
      B: '一般而言編譯式語言執行期速度較快，這項把速度關係說反。',
      C: 'Python 通常以直譯式或動態執行環境介紹，敘述合理。',
      D: 'C++ 通常先編譯成目標碼或機器碼，屬於編譯式語言。'
    },
    keyTakeaways: [
      '編譯式偏向先翻譯再執行，直譯式偏向執行時解讀。',
      '執行期效能通常編譯式較有優勢，但實際仍受實作與最佳化影響。',
      '常見陷阱是把直譯式的開發便利誤當成執行速度較快。'
    ],
    tags: ['programming-language', 'compiler', 'interpreter']
  }),
  25: createReview({
    coreTerms: ['RISC', 'CISC', 'MIPS', 'ARM', 'x86', 'RISC-V'],
    concept:
      'RISC 是精簡指令集架構，偏向簡單、固定格式、容易管線化的指令；CISC 則指令較複雜，x86 常被歸為 CISC 架構。',
    rule:
      '判斷架構分類時，可記 MIPS、ARM、RISC-V 都是常見 RISC 代表；x86 是常見 CISC 代表。',
    why:
      '題目問非屬 RISC，四個選項中 x86 不屬於精簡指令集代表，因此選 C。',
    trap:
      '常見混淆是看到現代 x86 內部也有微操作，就以為它等同 RISC；考題通常看指令集架構分類。',
    solvingSteps: [
      '先確認題目問「非屬 RISC」。',
      '檢查 MIPS，它是典型 RISC 教材範例。',
      '檢查 ARM，它是常見 RISC 架構。',
      '檢查 RISC-V，名稱與設計皆屬 RISC。',
      'x86 傳統分類為 CISC，因此答案選 C。'
    ],
    optionExplanations: {
      A: 'MIPS 是典型 RISC 架構，不是本題答案。',
      B: 'ARM 常被歸為 RISC 架構，不是本題答案。',
      C: 'x86 傳統上屬 CISC 指令集架構，是非 RISC 選項。',
      D: 'RISC-V 是開放的 RISC 指令集，名稱與設計都直接對應 RISC。'
    },
    keyTakeaways: [
      'MIPS、ARM、RISC-V 是常見 RISC 代表。',
      'x86 是常見 CISC 代表。',
      '常見陷阱是用處理器內部實作推翻 ISA 分類；考題多看指令集架構。'
    ],
    tags: ['computer-architecture', 'risc']
  }),
  26: createReview({
    coreTerms: ['ARP', 'Broadcast', 'MAC address', 'IPv4 LAN'],
    concept:
      'ARP 用於在 IPv4 區域網路中，透過已知 IP 位址查詢對應 MAC 位址；查詢者一開始不知道目標 MAC，所以會用廣播詢問。',
    rule:
      'ARP Request 通常送到乙太網路廣播位址，讓同一 broadcast domain 內的主機都能收到；擁有該 IP 的主機再回覆自己的 MAC。',
    why:
      '四個選項中，以廣播方式進行的典型協定是 ARP。',
    trap:
      '常見混淆是 DNS 也像查詢資料，但 DNS 通常向指定伺服器查詢，不是 LAN broadcast。',
    solvingSteps: [
      '先讀關鍵字「廣播 Broadcast」。',
      '回想 ARP Request 需要問區域網路內誰擁有某個 IP。',
      '因為尚不知道目標 MAC，必須用廣播送出。',
      '檢查其他選項，IPv6、DNS、BGP 都不是這種典型 broadcast ARP 查詢。',
      '因此答案選 A。'
    ],
    optionExplanations: {
      A: 'ARP Request 會在區域網路中廣播，尋找 IP 對應的 MAC 位址。',
      B: 'IPv6 本身不是以廣播為核心，鄰居探索也使用 multicast 而非 IPv4 式 broadcast。',
      C: 'DNS 通常查詢指定 DNS server，不是 LAN 廣播協定。',
      D: 'BGP 是自治系統間路由協定，透過 TCP 會話交換路由，不是廣播。'
    },
    keyTakeaways: [
      'ARP 的典型流程是廣播 request、目標主機回覆 MAC。',
      'Broadcast domain 內所有主機都會收到 ARP Request。',
      '常見陷阱是把查詢型協定都當廣播；DNS 不是 ARP。'
    ],
    tags: ['networking', 'arp']
  }),
  27: createReview({
    coreTerms: ['IPv6', 'QoS', 'Flow Label', '自動組態', 'IPsec'],
    concept:
      'IPv6 是新一代 IP 協定，提供更大的位址空間，也支援自動組態、較簡化的基本表頭與 flow label 等欄位。',
    rule:
      'IPv6 表頭包含 Traffic Class 與 Flow Label，可支援流量分類與 QoS 相關處理；因此說表頭不支援 QoS 機制是錯誤的。',
    why:
      '題目問何者有誤，B 否定 IPv6 表頭對 QoS 的支援，與 IPv6 設計不符。',
    trap:
      '常見混淆是覺得 IPv6 表頭簡化就少了所有控制能力；實際上它仍保留流量類別與 flow label。',
    solvingSteps: [
      '先抓題目問 IPv6 敘述何者有誤。',
      '檢查 A：IPv6 支援自動組態，正確。',
      '檢查 B：IPv6 有 Traffic Class/Flow Label，可支援 QoS，故此敘述錯。',
      '檢查 C：教材常說 IPv6 對 IPsec 有內建支援，合理。',
      '檢查 D：IPv6 書寫以冒號分隔各組十六進位，正確。'
    ],
    optionExplanations: {
      A: 'IPv6 支援無狀態位址自動組態等機制，敘述正確。',
      B: 'IPv6 表頭有 Traffic Class 與 Flow Label 等欄位可支援 QoS，說不支援有誤。',
      C: 'IPv6 設計中對 IPsec 支援較完整，教材常描述為內建加密支援。',
      D: 'IPv6 位址以冒號分隔八組十六進位數，敘述正確。'
    },
    keyTakeaways: [
      'IPv6 位址使用冒號分隔的十六進位表示。',
      'IPv6 支援自動組態與 QoS 相關欄位。',
      '常見陷阱是把表頭簡化誤解成不支援流量分類。'
    ],
    tags: ['networking', 'ipv6']
  }),
  28: createReview({
    coreTerms: ['乙太網路', '光纖', '單模光纖', '多模光纖', 'IEEE 802.3ba'],
    concept:
      '光纖依傳輸模式分為多模與單模。多模光纖適合較短距離且成本較低；單模光纖適合長距離傳輸。',
    rule:
      '判斷有誤敘述時，要注意長距離與短距離的光纖類型不能顛倒；100Gbps Ethernet 則常對應 IEEE 802.3ba。',
    why:
      'A 把多模說成長距離、單模說成短距離，方向顛倒，所以是錯誤敘述。',
    trap:
      '常見混淆是看到「多」就以為能力更強、距離更長；實際上多模因模式色散通常距離較短。',
    solvingSteps: [
      '先辨認題目問有誤敘述。',
      '回想光纖距離規則：單模長距離，多模短距離。',
      '檢查 A，正好把兩者顛倒。',
      'B 的 IEEE 802.3ba 可對應 40/100GbE 標準，合理。',
      'C、D 描述光纖網路常見使用與硬體卸載，也可視為合理。'
    ],
    optionExplanations: {
      A: '長距離通常是單模光纖，短距離常用多模光纖；此選項顛倒。',
      B: 'IEEE 802.3ba 與 40/100Gbps Ethernet 標準相關，敘述合理。',
      C: '光纖網路常用於高速儲存或資料中心連接，敘述合理。',
      D: '光纖通訊常仰賴專用硬體晶片處理協定與訊號，敘述合理。'
    },
    keyTakeaways: [
      '單模光纖適合長距離，多模光纖適合短距離。',
      '100Gbps Ethernet 常見標準關聯是 IEEE 802.3ba。',
      '常見陷阱是把多模與單模的距離特性顛倒。'
    ],
    tags: ['networking', 'fiber', 'ethernet']
  }),
  29: createReview({
    coreTerms: ['CIDR', 'C 級網路聚合', '子網路遮罩', '/21'],
    concept:
      'CIDR 可把連續網路聚合成較短的前綴；8 個連續 C 級網路代表第三個 octet 有 8 個值的範圍。',
    rule:
      '每個 C 級網路是 /24，聚合 8 個網路等於少 3 個網路位元，因為 2^3=8，所以前綴變成 /21。',
    why:
      '/21 的遮罩是 255.255.248.0，且 240 到 247 正好是 8 個連續第三 octet 值，對齊 248 的區塊大小。',
    trap:
      '常見混淆是看到 240 就選 255.255.240.0；但 240.0 的區塊大小是 16，不是本題 8 個 C 級。',
    solvingSteps: [
      '先確認範圍是 192.168.240.0 到 192.168.247.0，共 8 個 C 級網路。',
      '8=2^3，表示從 /24 往前少 3 位，得到 /21。',
      '把 /21 轉遮罩：前兩個 octet 都是 255。',
      '第三個 octet 前 5 位為 1，二進位 11111000 是 248。',
      '所以遮罩為 255.255.248.0。'
    ],
    optionExplanations: {
      A: '255.255.192.0 是 /18，區塊太大，不只涵蓋 8 個 C 級。',
      B: '255.255.224.0 是 /19，區塊大小 32 個 C 級，太大。',
      C: '255.255.240.0 是 /20，區塊大小 16 個 C 級，仍太大。',
      D: '255.255.248.0 是 /21，區塊大小 8 個 C 級，符合 240 到 247。'
    },
    keyTakeaways: [
      '8 個連續 /24 聚合成 /21。',
      '/21 遮罩是 255.255.248.0。',
      '常見陷阱是把第三 octet 的起點 240 誤當遮罩值。'
    ],
    tags: ['networking', 'cidr', 'subnet']
  }),
  30: createReview({
    coreTerms: ['SDN', 'ONF', 'Application Layer', 'Control Layer', 'Infrastructure Layer'],
    concept:
      '軟體定義網路 SDN 的核心是把控制平面與資料轉送平面分離，讓控制器集中決策，底層設備負責轉送。',
    rule:
      'ONF 常見 SDN 架構分為應用層、控制層、基礎設備層；傳統 OSI 的網路層不是這個三層架構的名稱。',
    why:
      '題目問不包含哪一層，D 的網路層不是 ONF SDN 架構三層之一。',
    trap:
      '常見混淆是把 OSI 七層模型的 network layer 套到 SDN 架構層次。',
    solvingSteps: [
      '先辨認題目指的是 ONF 對 SDN 的架構說明。',
      '列出三層：Application Layer、Control Layer、Infrastructure Layer。',
      '檢查 A、B、C，都在這三層中。',
      '檢查 D，Network Layer 屬於傳統網路分層名詞，不是 SDN 三層名稱。',
      '因此答案選 D。'
    ],
    optionExplanations: {
      A: '應用層是 SDN 架構中表達網路需求與策略的層。',
      B: '控制層包含 SDN controller，負責集中控制與決策。',
      C: '基礎設備層包含交換器等轉送設備，是 SDN 架構的一層。',
      D: '網路層是 OSI/TCP-IP 分層概念，不是 ONF SDN 三層架構名稱。'
    },
    keyTakeaways: [
      'SDN 常見三層是應用層、控制層、基礎設備層。',
      'SDN 強調控制平面與資料平面分離。',
      '常見陷阱是把 OSI 層名混入 SDN 架構。'
    ],
    tags: ['networking', 'sdn']
  }),
  31: createReview({
    coreTerms: ['WPAN', 'IEEE 802.15', 'Bluetooth', 'IEEE 802.11'],
    concept:
      '無線網路標準常依範圍分類：WLAN 是區域網路，WPAN 是個人短距離網路，WMAN 是都會網路。',
    rule:
      'IEEE 802.15 對應 Wireless Personal Area Network，常見技術包含 Bluetooth 與 Zigbee 類應用；IEEE 802.11 對應 Wi-Fi WLAN。',
    why:
      '題目問個人化短距離無線網路 WPAN，因此標準是 IEEE 802.15。',
    trap:
      '常見混淆是把熟悉的 802.11 Wi-Fi 選成所有無線網路答案；實際上 Wi-Fi 是 WLAN，不是 WPAN。',
    solvingSteps: [
      '先讀出 WPAN 的 P 是 Personal。',
      '回想 Personal Area Network 代表個人短距離範圍。',
      '對應 IEEE 802.15。',
      '排除 802.11，因為它是 WLAN。',
      '排除 802.16，因為它偏向 WMAN。'
    ],
    optionExplanations: {
      A: 'IEEE 802.11 是 WLAN，也就是 Wi-Fi 類無線區域網路。',
      B: 'IEEE 802.13 不是本題常見的 WPAN 標準答案。',
      C: 'IEEE 802.15 對應 WPAN，符合個人短距離無線網路。',
      D: 'IEEE 802.16 對應 WiMAX/WMAN 類都會範圍，不是 WPAN。'
    },
    keyTakeaways: [
      'WPAN 對應 IEEE 802.15。',
      'WLAN 對應 IEEE 802.11。',
      '常見陷阱是看到無線就直覺選 802.11。'
    ],
    tags: ['networking', 'wireless', 'wpan']
  }),
  32: createReview({
    coreTerms: ['Gateway', '協定轉換', 'Router', 'Bridge', 'Switch'],
    concept:
      '不同網路設備工作層級不同。交換器偏資料鏈結層轉送，路由器偏網路層路徑選擇，閘道器則可在不同協定或格式間轉換。',
    rule:
      '題幹同時提到不同格式資料封包、通訊協定轉換、錯誤偵測、路徑控制與位址轉換，關鍵字是「協定轉換」，最符合 Gateway。',
    why:
      'Gateway 可連接不同協定或不同格式的網路，負責轉換與銜接，因此 C 正確。',
    trap:
      '常見混淆是看到路徑控制就選路由器；但路由器通常不做跨協定格式轉換，題幹範圍比 router 更廣。',
    solvingSteps: [
      '先抓題幹關鍵字「不同格式」與「通訊協定轉換」。',
      '交換器主要在同一種二層網路中依 MAC 轉送。',
      '橋接器連接相似 LAN 區段，不是主要協定轉換設備。',
      '路由器做 IP 路由與轉送，但不一定處理不同格式協定轉換。',
      '閘道器可做協定轉換與網路銜接，所以選 C。'
    ],
    optionExplanations: {
      A: '交換器主要依 MAC 位址轉送 frame，不是處理不同協定格式轉換的代表。',
      B: '橋接器連接 LAN 區段，功能比題幹描述窄。',
      C: '閘道器可在不同協定或資料格式間轉換，符合題幹描述。',
      D: '路由器負責路徑選擇與 IP 轉送，但協定轉換不是它的核心定義。'
    },
    keyTakeaways: [
      'Gateway 的關鍵字是協定轉換與異質網路銜接。',
      'Router 的關鍵字是 IP 路由與下一跳選擇。',
      '常見陷阱是只看到路徑控制就忽略題目中的格式與協定轉換。'
    ],
    tags: ['networking', 'gateway']
  }),
  33: createReview({
    answerNote: '已人工對照 111.pdf 第 3 頁：A/B 同列選項已拆分為 TLS_DH_ANON 與 TLS_DHE，題目前方答案為 A。',
    coreTerms: ['TLS', '匿名 Diffie-Hellman', '中間人攻擊', '金鑰交換'],
    concept:
      'TLS 金鑰交換不只要協商共同祕密，也要確認對方身分；若交換過程沒有認證，就容易被中間人插入自己的金鑰。',
    rule:
      'TLS_DH_ANON 是匿名 Diffie-Hellman，不提供憑證或身分認證；DHE/ECDHE/RSA 會搭配認證或憑證機制，安全性假設不同。',
    why:
      '匿名 DH 無法確認對方是否真的是目標伺服器，中間人可分別和兩端建立金鑰，因此已很少使用。',
    trap:
      '常見混淆是以為 Diffie-Hellman 本身就能防中間人；實際上 DH 需要認證搭配，匿名版本才是問題。',
    solvingSteps: [
      '先讀出題目問容易受中間人攻擊的 TLS 金鑰交換。',
      '檢查 TLS_DH_ANON，ANON 表示 anonymous，沒有身分認證。',
      '沒有認證時，中間人可和 client、server 各自協商金鑰。',
      'DHE、ECDHE、RSA 在 TLS 套件中通常會搭配憑證或認證。',
      '因此答案選 A。'
    ],
    optionExplanations: {
      A: 'TLS_DH_ANON 是匿名 DH，缺少身分認證，容易被中間人攻擊。',
      B: 'TLS_DHE 是暫時性 DH，通常搭配憑證認證，不是匿名版本。',
      C: 'TLS_ECDHE 是橢圓曲線暫時性 DH，常用於提供前向安全性並搭配認證。',
      D: 'TLS_RSA 以 RSA 憑證做金鑰交換或認證，不是題目指的匿名 DH。'
    },
    keyTakeaways: [
      'Diffie-Hellman 需要身分認證，否則不能防中間人。',
      'ANON 是匿名，看到 TLS_DH_ANON 要想到未認證風險。',
      '常見陷阱是把 DHE/ECDHE 與匿名 DH 混為一談。'
    ],
    tags: ['tls', 'security', 'key-exchange'],
    extractionStatus: 'verified'
  }),
  34: createReview({
    coreTerms: ['OSI', '呈現層', '加密', '壓縮', '資料表示'],
    concept:
      'OSI 七層模型中，呈現層負責資料表示方式，包含格式轉換、字元編碼、壓縮、加密與解密等和資料呈現有關的處理。',
    rule:
      '判斷 OSI 層功能時，要把使用者服務、會談控制、端到端傳輸與資料表示分開；壓縮與加密通常歸在 Presentation Layer。',
    why:
      '題目問提供資料壓縮、加密及解密服務的是哪一層，答案是呈現層。',
    trap:
      '常見混淆是看到加密就選應用層或傳輸層；在 OSI 教材分類中，資料格式與表示轉換是呈現層重點。',
    solvingSteps: [
      '先列出題目關鍵功能：壓縮、加密、解密。',
      '這些都屬於資料呈現與表示格式處理。',
      'OSI 中處理資料表示的是 Presentation Layer。',
      '排除 Application，因為它提供使用者應用服務。',
      '排除 Session 和 Transport，因為它們分別處理會談與端到端傳輸。'
    ],
    optionExplanations: {
      A: '應用層提供使用者面向服務，如 HTTP、FTP 應用，不是 OSI 教材中壓縮加密的標準層。',
      B: '呈現層負責資料表示、壓縮、加密與解密，符合題目。',
      C: '會談層負責建立、管理與結束會談，不是資料格式轉換層。',
      D: '傳輸層負責端到端傳輸、分段與可靠性，不是壓縮與表示層。'
    },
    keyTakeaways: [
      'OSI 呈現層負責資料表示、轉換、壓縮與加密。',
      '會談層管 session，傳輸層管端到端傳輸。',
      '常見陷阱是看到加密就不分模型直接選安全相關層。'
    ],
    tags: ['networking', 'osi']
  }),
  35: createReview({
    coreTerms: ['Link-State', 'OSPF', 'RIP', 'BGP', 'EIGRP'],
    concept:
      '動態路由協定可依演算法分類。Link-State 會讓路由器建立拓撲資訊，再用最短路徑演算法計算路由。',
    rule:
      'OSPF 是典型鏈路狀態路由協定；RIP 是 distance-vector，BGP 是 path-vector，EIGRP 常被視為 advanced distance-vector 或 hybrid。',
    why:
      '四個選項中，OSPF 正是 Link-State 路由協定。',
    trap:
      '常見混淆是把所有動態路由都當同一類；考題常要分清 distance-vector、link-state、path-vector。',
    solvingSteps: [
      '先抓題目問 Link-State 路由協定。',
      '回想 OSPF 會交換 link-state advertisement 並計算 SPF。',
      'BGP 用路徑屬性在自治系統間交換路由，不是 link-state。',
      'RIP 依 hop count，是 distance-vector。',
      'EIGRP 不列為標準 link-state，因此答案選 B。'
    ],
    optionExplanations: {
      A: 'BGP 是 path-vector，常用於自治系統之間，不是 link-state。',
      B: 'OSPF 是典型 link-state 路由協定，會建立拓撲資料並計算最短路徑。',
      C: 'RIP 是 distance-vector，依 hop count 判斷路徑。',
      D: 'EIGRP 通常歸為 advanced distance-vector/hybrid，不是標準 link-state 答案。'
    },
    keyTakeaways: [
      'OSPF 是 Link-State 的代表。',
      'RIP 是 Distance-Vector，BGP 是 Path-Vector。',
      '常見陷阱是只記動態路由，不記演算法分類。'
    ],
    tags: ['networking', 'routing', 'ospf']
  }),
  36: createReview({
    coreTerms: ['VPN', 'PPTP', 'L2TP/IPsec', 'OpenVPN', 'SSTP'],
    concept:
      'VPN 協定會搭配不同封裝與加密機制；現代安全 VPN 通常可搭配較強的加密演算法，而 PPTP 是較舊且被視為不安全的方案。',
    rule:
      'PPTP 常與 MPPE/MS-CHAPv2 等舊機制相關，安全性與加密強度不如 L2TP/IPsec、OpenVPN、SSTP 這些可使用 256-bit 加密的方案。',
    why:
      '題目問所使用演算法未採用 256-bit 加密者，依常見教材分類是 PPTP。',
    trap:
      '常見混淆是只看所有選項都是 VPN 協定；要比較它們可支援的加密強度與現代安全性。',
    solvingSteps: [
      '先辨認題目要找未採用 256-bit 加密的 VPN 協定。',
      'L2TP/IPsec 可搭配 IPsec 強加密。',
      'OpenVPN 可使用 SSL/TLS 與 AES-256 等配置。',
      'SSTP 也可搭配 SSL/TLS 強加密。',
      'PPTP 是舊式且安全性不足的方案，因此選 C。'
    ],
    optionExplanations: {
      A: 'L2TP/IPsec 可透過 IPsec 使用強加密，不是本題要找的弱項。',
      B: 'OpenVPN 可配置 AES-256 等現代加密演算法。',
      C: 'PPTP 是較舊且安全性較弱的 VPN 協定，常不採 256-bit 強加密。',
      D: 'SSTP 基於 SSL/TLS，可支援強加密配置。'
    },
    keyTakeaways: [
      'PPTP 是舊式 VPN，安全性常被視為不足。',
      'L2TP/IPsec、OpenVPN、SSTP 通常可搭配較強加密。',
      '常見陷阱是只背 VPN 名稱，不比較加密機制。'
    ],
    tags: ['vpn', 'security']
  }),
  37: createReview({
    coreTerms: ['IPv4 classful addressing', 'Class C', '位址範圍', 'first octet'],
    concept:
      '早期 IPv4 classful addressing 依第一個 octet 的範圍分 A、B、C、D、E 類。',
    rule:
      'Class A 是 1-126，Class B 是 128-191，Class C 是 192-223，Class D 是 224-239，Class E 是 240-255。',
    why:
      '198 落在 192 到 223 之間，所以 198.x.y.z 屬於 C 級。',
    trap:
      '常見混淆是把 198 看成接近 191 而選 B；分類只看第一個 octet 是否落在固定範圍。',
    solvingSteps: [
      '先取出第一個 octet：198。',
      '回想 B 級範圍到 191 為止。',
      'C 級範圍是 192 到 223。',
      '198 落在 C 級範圍。',
      '因此答案選 B。'
    ],
    optionExplanations: {
      A: 'B 級範圍是 128-191，198 已超過。',
      B: 'C 級範圍是 192-223，198 落在其中。',
      C: 'D 級範圍是 224-239，常用於 multicast，198 不在其中。',
      D: 'E 級範圍是 240-255，198 不在其中。'
    },
    keyTakeaways: [
      'Class C IPv4 第一個 octet 範圍是 192-223。',
      'Classful 題目只看第一個 octet 的固定範圍。',
      '常見陷阱是忘記 B/C 分界在 191/192。'
    ],
    tags: ['networking', 'ipv4']
  }),
  38: createReview({
    coreTerms: ['Router', '路由表', 'IP 封包', 'TCP/IP 模型'],
    concept:
      '路由器主要工作在網路層，負責讀取 IP 封包目的位址，查路由表，選擇下一跳或輸出介面。',
    rule:
      '判斷路由器敘述時，要看是否符合網路層功能；若說它運作於 TCP/IP 模型的傳輸層以上，就把層級說高了。',
    why:
      'A、B、C 都是路由器常見特性；D 說它運作於傳輸層以上，與路由器的網路層定位不符。',
    trap:
      '常見混淆是因為路由器可做 NAT、防火牆等延伸功能，就忘記其核心路由功能在網路層。',
    solvingSteps: [
      '先確認題目問路由器敘述何者有誤。',
      '路由器具備路由表，A 正確。',
      '路由器通常有兩個以上網路介面，B 正確。',
      '路由器會解讀 IP 封包目的位址，C 正確。',
      '路由器核心工作在網路層，不是傳輸層以上，因此 D 有誤。'
    ],
    optionExplanations: {
      A: '路由器用路由表決定下一跳或輸出介面，敘述正確。',
      B: '路由器連接不同網路，通常有兩個以上介面，敘述正確。',
      C: '路由器需讀取 IP 封包資訊才能轉送，敘述正確。',
      D: '路由器核心運作在網路層，不是 TCP/IP 傳輸層以上，這項有誤。'
    },
    keyTakeaways: [
      'Router 的核心功能是網路層路由與轉送。',
      '路由表、IP 封包與多介面都是路由器關鍵字。',
      '常見陷阱是把延伸功能誤當路由器核心層級。'
    ],
    tags: ['networking', 'router']
  }),
  39: createReview({
    coreTerms: ['IP protocol field', 'TCP', 'UDP', 'ICMP', 'IGMP'],
    concept:
      'IP 封包中的 protocol 欄位用來指出上層承載的是哪個協定，例如 TCP、UDP、ICMP 或 IGMP。',
    rule:
      '在 TCP/IP 分層中，TCP 與 UDP 是傳輸層協定；ICMP 與 IGMP 屬於網路層控制或管理相關協定。',
    why:
      '題目問屬於傳輸層的通訊協定，只有 TCP 與 UDP 這一組完全符合。',
    trap:
      '常見混淆是看到 ICMP/IGMP 也出現在 IP protocol 欄位，就以為它們是傳輸層；protocol 欄位列出上層或控制協定，不代表全是傳輸層。',
    solvingSteps: [
      '先列出四個協定的分層。',
      'TCP 是傳輸層，提供可靠連線導向傳輸。',
      'UDP 是傳輸層，提供無連線資料報服務。',
      'ICMP 與 IGMP 都是網路層控制相關。',
      '因此只有 A 的 TCP 與 UDP 正確。'
    ],
    optionExplanations: {
      A: 'TCP 與 UDP 都是傳輸層協定，符合題目。',
      B: 'IGMP 不是傳輸層；它用於 multicast 群組管理。',
      C: 'IGMP 不是傳輸層，雖然 TCP 是傳輸層。',
      D: 'IGMP 與 ICMP 都偏網路層控制相關，不是傳輸層組合。'
    },
    keyTakeaways: [
      'TCP 與 UDP 是傳輸層兩大代表。',
      'ICMP 用於控制訊息，IGMP 用於 multicast 群組管理。',
      '常見陷阱是把 IP protocol 欄位中的所有項目都歸成傳輸層。'
    ],
    tags: ['networking', 'tcp-ip']
  }),
  40: createReview({
    coreTerms: ['LPWAN', 'LoRa', 'NB-IoT', 'Sigfox', 'Zigbee'],
    concept:
      '低功耗廣域網路 LPWAN 針對低資料率、長距離、低耗電的物聯網場景，代表技術包含 LoRa、NB-IoT 與 Sigfox。',
    rule:
      'Zigbee 屬於短距離低功耗無線通訊，常見於個人或區域感測網路，不是長距離 LPWAN 技術。',
    why:
      '題目問不屬於長距離通訊者，Zigbee 的典型範圍較短，因此選 D。',
    trap:
      '常見混淆是把所有物聯網無線技術都歸為 LPWAN；要看是否以廣域長距離為主要定位。',
    solvingSteps: [
      '先讀出題目情境是 LPWAN 與長距離通訊。',
      'LoRa 是 LPWAN 代表。',
      'NB-IoT 是蜂巢式 LPWAN 技術。',
      'Sigfox 也是 LPWAN 代表。',
      'Zigbee 偏短距離無線感測與控制，因此不屬於長距離通訊。'
    ],
    optionExplanations: {
      A: 'LoRa 是長距離低功耗物聯網通訊代表。',
      B: 'NB-IoT 是蜂巢網路中的低功耗廣域物聯網技術。',
      C: 'Sigfox 是 LPWAN 技術之一，定位於長距離低資料率。',
      D: 'Zigbee 通常用於短距離低功耗網路，不是 LPWAN 長距離代表。'
    },
    keyTakeaways: [
      'LoRa、NB-IoT、Sigfox 都是 LPWAN 常見代表。',
      'Zigbee 是短距離低功耗通訊，不是長距離 LPWAN。',
      '常見陷阱是把所有 IoT 無線技術混成同一類。'
    ],
    tags: ['iot', 'lpwan', 'zigbee']
  }),
  41: createReview({
    answerNote: '已人工對照 111.pdf 第 4 頁：C/D 同列選項已拆分為 C「可以阻擋外界對內部網路所發動的攻擊」與 D「主要分為網路層及應用層防火牆」，題目前方答案為 B。',
    coreTerms: ['Firewall', '封包過濾', '應用層防火牆', '惡意程式防護'],
    concept:
      '防火牆主要根據 IP、port、protocol、連線狀態或應用層內容控制流量進出，重點是存取控制與邊界防護。',
    rule:
      '防火牆能阻擋不被允許的連線或攻擊流量，但不能保證「阻擋病毒攻擊」本身；病毒偵測通常還需要防毒、端點防護或內容掃描。',
    why:
      'B 把防火牆說成可以阻擋病毒攻擊，過度擴張防火牆能力，因此是有誤敘述。',
    trap:
      '常見混淆是把防火牆、防毒、IDS/IPS 都視為同一種安全工具；它們防護位置與判斷依據不同。',
    solvingSteps: [
      '先確認題目問防火牆敘述何者有誤。',
      '防火牆可阻擋外界未授權流量，C 合理。',
      '防火牆可依網路層或應用層方式分類，D 合理。',
      '防火牆主要做流量控制，不等於能辨識並阻擋所有病毒。',
      '因此答案選 B。'
    ],
    optionExplanations: {
      A: '傳統邊界防火牆通常主要控管進出邊界流量；內部橫向流量是否過濾要看部署位置與架構。',
      B: '防火牆不能被概括成可以阻擋病毒攻擊，病毒防護需要防毒或端點安全等機制配合。',
      C: '防火牆可阻擋外界對內部網路的未授權連線或攻擊流量。',
      D: '防火牆常可依網路層、傳輸層或應用層能力分類；題目表述可視為合理分類。'
    },
    keyTakeaways: [
      '防火牆的核心是流量與存取控制。',
      '病毒防護通常需要防毒、端點防護或內容掃描，不是防火牆單獨保證。',
      '常見陷阱是把所有資安防護工具功能混在一起。'
    ],
    tags: ['firewall', 'security'],
    extractionStatus: 'verified'
  }),
  42: createReview({
    coreTerms: ['UDP', 'SNMP', 'NTP', 'ICMP', 'DHCP'],
    concept:
      'UDP 是傳輸層的無連線協定，常用於簡單查詢、廣播或可容忍少量遺失的服務；但不是所有網路控制協定都建立在 UDP 上。',
    rule:
      'SNMP 常用 UDP 161/162，NTP 用 UDP 123，DHCP 用 UDP 67/68；ICMP 是網路層控制訊息，不使用 UDP 作為基礎。',
    why:
      '題目問非使用 UDP 作為通訊服務基礎者，ICMP 不屬於 UDP 應用，因此選 C。',
    trap:
      '常見混淆是 ICMP 和 UDP 都常被網路工具使用，就以為 ICMP 跑在 UDP 上；實際上 ICMP 直接由 IP 承載。',
    solvingSteps: [
      '先列出常見 UDP 服務：SNMP、NTP、DHCP 都使用 UDP。',
      '檢查 ICMP，它用於錯誤回報與診斷訊息。',
      'ICMP 不使用傳輸層 port，也不是 UDP payload。',
      '因此 C 是非使用 UDP 的選項。'
    ],
    optionExplanations: {
      A: 'SNMP 常使用 UDP，因此不是本題答案。',
      B: 'NTP 常使用 UDP 123，因此不是本題答案。',
      C: 'ICMP 是 IP 層控制訊息，不以 UDP 作為通訊基礎。',
      D: 'DHCP 使用 UDP 67/68，因此不是本題答案。'
    },
    keyTakeaways: [
      'SNMP、NTP、DHCP 都是常見 UDP-based 服務。',
      'ICMP 不使用 UDP port，直接屬於網路層控制訊息。',
      '常見陷阱是把 ping 相關的 ICMP 誤以為跑在 UDP 上。'
    ],
    tags: ['networking', 'udp', 'icmp']
  }),
  43: createReview({
    coreTerms: ['STRIDE', 'Spoofing', 'Tampering', 'Repudiation', 'Information Disclosure', 'Denial of Service', 'Elevation of Privilege'],
    concept:
      'STRIDE 是威脅建模分類，六個字母分別代表 Spoofing、Tampering、Repudiation、Information Disclosure、Denial of Service、Elevation of Privilege。',
    rule:
      '判斷 STRIDE 題時，要逐一對應英文首字母；Intrusion 雖是資安名詞，但不是 STRIDE 的 I。',
    why:
      'D 把 I 說成 Intrusion，正確的 I 是 Information Disclosure，所以 D 有誤。',
    trap:
      '常見混淆是把常見攻擊名詞放入縮寫；STRIDE 的每個字母是固定威脅類型。',
    solvingSteps: [
      '先展開 STRIDE 六項。',
      'S 對應 Spoofing，A 正確。',
      'R 對應 Repudiation，B 正確。',
      'D 對應 Denial of Service，C 正確。',
      'I 應對應 Information Disclosure，不是 Intrusion。',
      '因此答案選 D。'
    ],
    optionExplanations: {
      A: 'Spoofing 是 STRIDE 的 S，表示偽冒身分。',
      B: 'Repudiation 是 STRIDE 的 R，表示否認已做過的行為。',
      C: 'Denial of Service 是 STRIDE 的 D，表示拒絕服務。',
      D: 'STRIDE 的 I 是 Information Disclosure，不是 Intrusion，因此有誤。'
    },
    keyTakeaways: [
      'STRIDE 的 I 是 Information Disclosure。',
      'STRIDE 的 E 是 Elevation of Privilege。',
      '常見陷阱是把一般資安名詞 Intrusion 誤塞進 STRIDE。'
    ],
    tags: ['security', 'stride']
  }),
  44: createReview({
    coreTerms: ['ISO 27001:2013', 'Annex A', '控制領域', '控制目標'],
    concept:
      'ISO/IEC 27001:2013 是資訊安全管理系統標準，其 Annex A 提供控制領域、控制目標與控制項作為風險處理參考。',
    rule:
      '2013 版常見記憶點是 14 個控制領域、35 個控制目標與 114 個控制項；題目問領域與控制目標。',
    why:
      '依 2013 版分類，領域為 14，控制目標為 35，所以答案是 C。',
    trap:
      '常見混淆是把 2005 版或控制項數量與控制目標數量混在一起。',
    solvingSteps: [
      '先確認題目版本是 ISO27001:2013。',
      '回想 2013 版 Annex A 記憶點：14 個領域。',
      '再回想控制目標數量：35 個。',
      '比對選項，14 與 35 對應 C。'
    ],
    optionExplanations: {
      A: '11 與 35 混入了舊版領域數，版本不符。',
      B: '11 與 39 不是 2013 版領域與控制目標組合。',
      C: '14 與 35 符合 ISO 27001:2013 Annex A 的常見分類。',
      D: '14 領域正確，但控制目標不是 39。'
    },
    keyTakeaways: [
      'ISO 27001:2013 常見記憶點是 14 個領域、35 個控制目標、114 個控制項。',
      '版本題要先確認年份，避免與舊版數字混淆。',
      '常見陷阱是把控制目標數與控制項數混在一起。'
    ],
    tags: ['security', 'iso27001']
  }),
  45: createReview({
    coreTerms: ['IDPS', 'packet-based', 'ACL', 'evasion', 'worm'],
    concept:
      'IDPS 用於偵測或阻擋入侵行為，可能根據特徵、異常、狀態協定分析或與防火牆規則整合進行防護。',
    rule:
      '傳統 IDPS 可檢查封包內容與流量行為，但「使用 packet-based 做為檢查流量內容」這種說法在題庫脈絡中不是正確能力描述；內容判斷通常稱 signature、anomaly 或 protocol analysis。',
    why:
      '官方答案標示 B，表示題目認為 packet-based 不是傳統 IDPS 檢查流量內容的適當說法。',
    trap:
      '常見混淆是把 packet capture、packet filter 與 IDPS 的內容分析分類混用；考題重點在辨認術語是否精確。',
    solvingSteps: [
      '先讀出題目問 IDPS 敘述何者有誤。',
      'A 描述阻擋外部蠕蟲入侵，符合 IDPS 防禦目標。',
      'C 描述破解或降低 evasion 手法，符合 IDPS 需要處理的能力方向。',
      'D 描述可整合或包含 ACL 類防火牆控制，也屬常見整合情境。',
      'B 的 packet-based 用語不符合題庫對內容檢查技術的分類，因此選 B。'
    ],
    optionExplanations: {
      A: 'IDPS 可偵測或阻擋蠕蟲等攻擊流量，敘述可接受。',
      B: '題庫將 packet-based 視為不適當的流量內容檢查描述；IDPS 通常以特徵、異常或協定狀態分析來說明。',
      C: 'IDPS 需要處理攻擊者規避偵測的 evasion 手法，敘述可接受。',
      D: '部分防禦系統可與防火牆 ACL 類控制整合，敘述可接受。'
    },
    keyTakeaways: [
      'IDPS 常見偵測方法包含 signature、anomaly、stateful protocol analysis。',
      'packet capture 或 packet filter 名詞不等同於 IDPS 內容分析分類。',
      '常見陷阱是把防火牆、封包過濾與入侵偵測術語混用。'
    ],
    tags: ['security', 'idps']
  }),
  46: createReview({
    coreTerms: ['SMTP', 'Push Protocol', 'POP', 'IMAP', 'Email'],
    concept:
      '電子郵件流程可分為送出與收取。送出郵件時，客戶端或郵件伺服器會主動把信件推送到下一個伺服器。',
    rule:
      'SMTP 是 Simple Mail Transfer Protocol，用於寄送與轉送電子郵件；POP 與 IMAP 主要用於使用者收取或同步信件。',
    why:
      '題目問送出協定 Push Protocol，SMTP 正是電子郵件送出與轉送的標準協定。',
    trap:
      '常見混淆是把 POP/IMAP 都看成電子郵件協定就選錯；它們是存取信箱，不是送出信件。',
    solvingSteps: [
      '先抓關鍵字「送出協定」。',
      '回想 SMTP 負責 mail transfer，也就是寄送與轉送。',
      'POP 用於下載信件，IMAP 用於同步與存取信箱。',
      'HTTP 不是電子郵件標準送出協定。',
      '因此答案選 A。'
    ],
    optionExplanations: {
      A: 'SMTP 用於送出與轉送電子郵件，是 push/transfer 方向的協定。',
      B: 'HTTP 是 Web 通訊協定，不是電子郵件送出標準協定。',
      C: 'POP 主要用於從郵件伺服器取回信件。',
      D: 'IMAP 主要用於線上存取與同步信箱。'
    },
    keyTakeaways: [
      'SMTP 負責寄信與轉送。',
      'POP 與 IMAP 負責收信或存取信箱。',
      '常見陷阱是把所有 email 相關協定都當成送出協定。'
    ],
    tags: ['networking', 'email', 'smtp']
  }),
  47: createReview({
    coreTerms: ['IEEE 802.11ac', 'Wi-Fi 5', 'IEEE 802.11ax', 'Wi-Fi 6'],
    concept:
      'Wi-Fi 世代名稱對應 IEEE 802.11 標準。Wi-Fi 4 是 802.11n，Wi-Fi 5 是 802.11ac，Wi-Fi 6 是 802.11ax。',
    rule:
      '題目問俗稱第五代 Wi-Fi，要對應 Wi-Fi Alliance 的世代命名；第五代就是 Wi-Fi 5，也就是 802.11ac。',
    why:
      '802.11ac 對應 Wi-Fi 5，因此答案是 A。',
    trap:
      '常見混淆是看到 ax 比 ac 新就選 ax；但 ax 是 Wi-Fi 6，不是第五代。',
    solvingSteps: [
      '先把「第五代 Wi-Fi」轉成 Wi-Fi 5。',
      '回想 Wi-Fi 5 對應 IEEE 802.11ac。',
      '檢查 802.11ax，它是 Wi-Fi 6。',
      '檢查 802.11n，它是 Wi-Fi 4。',
      '因此答案選 A。'
    ],
    optionExplanations: {
      A: '802.11ac 對應 Wi-Fi 5，符合題目。',
      B: '802.11ax 對應 Wi-Fi 6，比第五代更新。',
      C: '802.11g 是較早期標準，不是 Wi-Fi 5。',
      D: '802.11n 對應 Wi-Fi 4，不是第五代。'
    },
    keyTakeaways: [
      'Wi-Fi 4 是 802.11n。',
      'Wi-Fi 5 是 802.11ac。',
      'Wi-Fi 6 是 802.11ax；常見陷阱是把最新標準誤當第五代。'
    ],
    tags: ['networking', 'wifi']
  }),
  48: createReview({
    coreTerms: ['WEP', 'WPA', 'WPA2', 'TKIP', 'AES', 'CCMP', 'DES'],
    concept:
      'WEP、WPA、WPA2 是 Wi-Fi 安全機制。WPA 引入 TKIP，WPA2 使用以 AES 為基礎的 CCMP 作為核心保護方式。',
    rule:
      '判斷是否為 Wi-Fi 安全防護技術時，要看是否屬於 WEP/WPA/WPA2 使用的加密或完整性機制；DES 不是這三者的標準防護技術。',
    why:
      'TKIP、AES、CCMP 都與 WPA/WPA2 安全機制相關，DES 不屬於其使用項，因此選 D。',
    trap:
      '常見混淆是看到 DES 也是加密演算法就選成 Wi-Fi 防護；但題目問特定 Wi-Fi 安全機制使用的技術。',
    solvingSteps: [
      '先列出 WPA/WPA2 關鍵技術：TKIP、AES、CCMP。',
      '檢查 A TKIP，與 WPA 相關。',
      '檢查 B AES，與 WPA2/CCMP 相關。',
      '檢查 C CCMP，是 WPA2 的核心協定。',
      '檢查 D DES，它不是 WEP/WPA/WPA2 標準使用的防護技術。'
    ],
    optionExplanations: {
      A: 'TKIP 是 WPA 時期常見的過渡安全機制。',
      B: 'AES 是 WPA2/CCMP 背後的重要加密演算法。',
      C: 'CCMP 是 WPA2 使用的安全協定，基於 AES。',
      D: 'DES 雖是加密演算法，但不是 WEP、WPA、WPA2 的標準防護技術。'
    },
    keyTakeaways: [
      'WPA 常見 TKIP，WPA2 常見 AES/CCMP。',
      'DES 不屬於 WEP/WPA/WPA2 的標準防護技術。',
      '常見陷阱是把所有加密演算法都當成 Wi-Fi 安全機制。'
    ],
    tags: ['networking', 'wifi-security']
  }),
  49: createReview({
    coreTerms: ['ISO 7498-4', '網路管理功能', 'FCAPS', '事件管理'],
    concept:
      'ISO 網路管理常用 FCAPS 記憶五大功能：Fault、Configuration、Accounting、Performance、Security。',
    rule:
      '對應中文是故障管理、組態管理、計費或帳務管理、效能管理、安全管理；事件管理不是 ISO 7498-4 五大功能之一。',
    why:
      'A、B、C 都在 FCAPS 中，D 的事件管理不屬於標準五大功能，因此為非屬項。',
    trap:
      '常見混淆是把一般監控會做的事件處理當成 ISO 網路管理五大功能名稱。',
    solvingSteps: [
      '先回想 ISO 7498-4 的 FCAPS 五項。',
      'Fault 對應故障管理，A 正確。',
      'Configuration 對應組態管理，B 正確。',
      'Security 對應安全管理，C 正確。',
      'Event 不是 FCAPS 的字母之一，因此 D 非屬。'
    ],
    optionExplanations: {
      A: '故障管理對應 FCAPS 的 Fault Management，屬於標準功能。',
      B: '組態管理對應 Configuration Management，屬於標準功能。',
      C: '安全管理對應 Security Management，屬於標準功能。',
      D: '事件管理不是 ISO 7498-4 的 FCAPS 五大網路管理功能之一。'
    },
    keyTakeaways: [
      'FCAPS 是 Fault、Configuration、Accounting、Performance、Security。',
      '事件管理可以是實務監控活動，但不是 FCAPS 標準五大項。',
      '常見陷阱是用一般 IT 管理名詞取代標準分類。'
    ],
    tags: ['network-management', 'fcaps']
  }),
  50: createReview({
    answerNote: '已人工對照 111.pdf 第 4 頁：題幹保留 ○1 至 ○4 四個條列，題目前方答案為 C。',
    coreTerms: ['對稱式加密', '非對稱式加密', '憑證管理中心', '數位簽章', '雜湊函數'],
    concept:
      '對稱式加密使用同一把祕密金鑰加解密，速度快，適合大量資料；非對稱式加密使用公鑰與私鑰，常搭配憑證和數位簽章建立身分信任。',
    rule:
      '數位簽章通常先對訊息做雜湊，再用私鑰簽署，驗證者用公開金鑰驗證；公鑰的可信度在 PKI 中由 CA 簽發憑證來保證。IDEA 則是對稱式區塊加密，不是普遍使用的非對稱式加密法。',
    why:
      '○1 對稱式加密快且適合大量資料為真；○2 把 IDEA 說成非對稱式加密為假；○3 與 PKI 公鑰憑證信任有關，依題庫判為真；○4 描述簽章與公鑰密碼及雜湊搭配，依題庫判為真，所以選 ○1○3○4。',
    trap:
      '常見混淆是把加密與簽章方向混在一起；簽章是私鑰簽、公鑰驗，並搭配雜湊，不是拿公鑰去產生簽章。',
    solvingSteps: [
      '先判斷 ○1：對稱式加密速度快，適合大量資料，為真。',
      '判斷 ○2：IDEA 是對稱式區塊加密，不是非對稱式加密，為假。',
      '判斷 ○3：在 PKI 信任模型中，公開金鑰通常透過 CA 憑證簽發或認證，依題意為真。',
      '判斷 ○4：數位簽章使用公私鑰機制與雜湊函數搭配，依題意為真。',
      '真的是 ○1、○3、○4，因此答案選 C。'
    ],
    optionExplanations: {
      A: '○1 與 ○3 可接受，但 ○2 錯，因為 IDEA 不是非對稱式加密法。',
      B: '○1 與 ○4 可接受，但包含錯誤的 ○2，且漏掉題庫視為正確的 ○3。',
      C: '○1、○3、○4 為題庫判定的正確組合，排除了錯誤的 IDEA 敘述。',
      D: '包含錯誤的 ○2，且漏掉正確的 ○1。'
    },
    keyTakeaways: [
      '對稱式加密速度快，適合大量資料；非對稱式加密適合金鑰交換、身分與簽章場景。',
      'IDEA 是對稱式加密演算法，不是非對稱式加密法。',
      '數位簽章要記成私鑰簽、公鑰驗，並搭配雜湊函數。',
      '常見陷阱是把 CA 簽發憑證、公鑰、私鑰簽章與資料加密流程混在一起。'
    ],
    tags: ['cryptography', 'digital-signature', 'pki'],
    extractionStatus: 'verified'
  })
} satisfies QuestionTeachingReviewMap;
