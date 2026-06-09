import type { ExamQuestionAnalysis, FourOptionRecord } from '@/modules/examGroups/aGroup/types/questionAnalysis';

interface QuestionTeachingReview {
  answerVerification: ExamQuestionAnalysis['answerVerification'];
  answerNote: string | null;
  coreTerms?: string[];
  beginnerExplanation: string;
  solvingSteps: string[];
  optionExplanations: FourOptionRecord;
  keyTakeaways: string[];
  tags?: string[];
}

export const reviewedQuestionAnalyses: Partial<Record<number, QuestionTeachingReview>> = {
  1: {
    answerVerification: 'verified',
    answerNote:
      'PDF 答案為 C。以 6 位元二補數加法器執行時，丟棄第 7 位進位後結果為 011111，即 31；但真實算術和為 -33，已超出 6 位元二補數可表示範圍。',
    coreTerms: ['二補數加法', '6 位元範圍', 'signed overflow'],
    beginnerExplanation:
      [
        '這題會用到四個觀念：固定 6 位元、2 的補數範圍、負數轉十進位、以及溢位。',
        '第一，6 位元代表所有結果都只能留下 6 個 bit。6 位元共有 2^6 = 64 種排列；在 2 的補數中，一半給非負數 0 到 31，另一半給負數 -32 到 -1。因此 6 位元 2 的補數範圍是 -32 到 31。',
        '第二，最高位是符號位，但它不是單純只表示正負。6 位元 2 的補數可以把各位權重看成 -32、16、8、4、2、1，所以 100000 = -32，011111 = 16+8+4+2+1 = 31。',
        '第三，看到最高位是 1 時，可以用兩種方法轉成十進位。方法一是「無號值 - 2^6」：100111 當無號值是 39，所以 39-64 = -25。方法二是「反相加 1 找大小」：100111 反相成 011000，再加 1 得 011001，也就是 25，所以原數是 -25。反相加 1 的原理是：反相等於 63-N，再加 1 等於 64-N，也就是負數的正數大小。',
        '第四，固定 6 位元加法只保留低 6 位。100111 + 111000 = 1 011111，最前面的第 7 位超出 6 位元會被丟掉，所以機器留下 011111，十進位是 31。不過真實數學值是 -25 + -8 = -33，超出 -32 到 31 的範圍，因此這次加法有 signed overflow。'
      ].join('\n'),
    solvingSteps: [
      '先確認位元寬度：6 位元 2 的補數範圍是 -2^5 到 2^5-1，也就是 -32 到 31。',
      '判斷 100111：最高位是 1，代表它是負數；用反相加 1 得 011001 = 25，所以 100111 = -25。',
      '判斷 111000：最高位是 1，代表它也是負數；反相得 000111，加 1 得 001000 = 8，所以 111000 = -8。',
      '做真正的數學檢查：-25 + -8 = -33，已經小於 6 位元可表示的最小值 -32，因此會溢位。',
      '再看 6 位元加法器實際留下的 bit：100111 + 111000 = 1 011111，丟掉第 7 位後剩 011111。',
      '把 011111 轉成十進位：最高位是 0，代表正數；16+8+4+2+1 = 31。',
      '因此若題目問「執行後以 10 進位表示」，答案是 31；但要知道這個結果伴隨 signed overflow，不能把它當成真實數學和。'
    ],
    optionExplanations: {
      A: '0 對應 000000，與保留後的 011111 不符。',
      B: '1 對應 000001，並非本題加總後的低 6 位結果。',
      C: '31 對應 011111，符合固定 6 位元加法後丟棄進位的結果。',
      D: '33 超過 6 位元二補數正數上限 31，也不是結果位元 011111 的值。'
    },
    keyTakeaways: [
      '6 位元二補數範圍是 -32 到 31。',
      'n 位元二補數範圍公式是 -2^(n-1) 到 2^(n-1)-1。',
      '負數 bit pattern 可用「無號值 - 2^n」轉十進位，也可用「反相加 1」找正數大小。',
      '反相加 1 的原理是反相等於 (2^n-1)-N，再加 1 變成 2^n-N。',
      '固定寬度加法會丟棄超出位寬的進位，只保留低 n 位。',
      '兩個負數相加卻得到正數，是 signed overflow（有號溢位）的典型警訊。'
    ],
    tags: ['two-complement', 'signed-overflow']
  },
  2: {
    answerVerification: 'verified',
    answerNote: null,
    coreTerms: ['馮紐曼架構', '儲存程式概念', '五大功能單元'],
    beginnerExplanation:
      [
        '馮紐曼架構的前置觀念是「儲存程式概念」：程式指令和資料都可以放在同一套記憶體中，CPU 再依序取出指令、解碼、執行。這也是現代通用電腦能更換程式而不用改硬體線路的核心原因。',
        '基本組成規則通常整理成五大功能單元：輸入、輸出、記憶體、運算器、控制器。輸入單元把外部資料送進系統，輸出單元把結果送出；記憶體保存程式與資料；控制器負責取指令與協調流程；運算器負責算術與邏輯運算。',
        '本題常見陷阱是把「實體零件清單」或「軟體清單」誤認成架構基本功能。硬碟、鍵盤、顯示器是具體設備；作業系統、驅動程式是軟體；暫存器、ALU、快取則是 CPU 或記憶體階層中的細部元件，不等於完整五大功能單元。'
      ].join('\n'),
    solvingSteps: [
      '先確認題目問的是馮紐曼架構的基本組成，不是在問常見硬體設備或作業系統軟體。',
      '套用五大功能單元規則：輸入、輸出、記憶體、運算器、控制器都必須出現。',
      '檢查選項 A：記憶體與 CPU 太籠統，硬碟、顯示器、鍵盤是具體周邊，沒有完整列出控制器與運算器等功能分類。',
      '檢查選項 B：輸入單元、輸出單元、運算器、控制器、記憶體五項完整對應馮紐曼架構。',
      '檢查選項 C：作業系統、應用程式、驅動程式、資料庫、網路屬軟體或服務層次，不是基本硬體功能單元。',
      '檢查選項 D：快取、暫存器、ALU、控制單元、I/O 介面多屬 CPU 內部或細部實作，少了輸入、輸出、記憶體等完整分類。',
      '因此只有選項 B 同時符合儲存程式架構下的五大功能單元。'
    ],
    optionExplanations: {
      A: '硬碟、顯示器、鍵盤是具體設備或周邊，不是馮紐曼架構的完整功能分類；CPU 也沒有拆成控制器與運算器。',
      B: '輸入、輸出、運算器、控制器、記憶體正好是馮紐曼架構常見的五大功能單元。',
      C: '作業系統、應用程式、驅動程式、資料庫、網路偏軟體與服務層次，不能回答基本硬體功能單元。',
      D: '快取、暫存器、ALU、控制單元、I/O 介面多是 CPU 內部或細部實作項目，少了完整的輸入、輸出與記憶體分類。'
    },
    keyTakeaways: [
      '馮紐曼架構的核心是儲存程式概念：指令與資料都放在記憶體中，由控制器取指令並協調執行。',
      '五大功能單元為輸入、輸出、記憶體、運算器、控制器；少任一類通常就不是完整答案。',
      '常見陷阱是把實體設備、軟體名稱或 CPU 內部元件清單當成架構功能單元。',
      '看到「基本組成」題，先回到功能分類，再比較選項是否只是列舉零件。'
    ],
    tags: ['von-neumann']
  },
  3: {
    answerVerification: 'verified',
    answerNote: null,
    coreTerms: ['list', 'tuple', '可變性'],
    beginnerExplanation:
      [
        '這題的前置觀念是 Python 的「序列」：list 和 tuple 都是有序序列，元素有固定前後順序，也都可以用索引讀取，例如第 0 個、第 1 個元素。也就是說，「有序」和「支援索引」不是它們的主要差別。',
        '真正的判斷規則是可變性。list 是 mutable，可在建立後 append 新元素、移除元素或改某個索引的值；tuple 是 immutable，建立後不能改變長度，也不能直接替換其中元素。這個規則來源於 Python 對容器型別的設計。',
        '本題常見陷阱是把 tuple 的「不可變」誤會成「不能讀取」或「沒有順序」。不可變只代表內容不能被直接修改，不代表不能用索引讀值，也不代表它是無序集合。'
      ].join('\n'),
    solvingSteps: [
      '先確認 list 與 tuple 都屬於有序序列，因此「有序或無序」不是本題差異。',
      '再確認兩者都支援索引讀取，所以「tuple 支援索引、list 不支援」也是錯誤比較。',
      '套用可變性規則：list 是 mutable，能 append、刪除或指定索引改值。',
      '套用同一規則到 tuple：tuple 是 immutable，建立後不能直接改長度或替換元素。',
      '比對選項，A 說 list 可變、tuple 不可變，正好符合規則。'
    ],
    optionExplanations: {
      A: 'list 可變、tuple 不可變，這正是 Python 序列容器最常考的核心差異。',
      B: '這個選項把可變性顛倒了；tuple 是 immutable，不是可變容器。',
      C: 'list 與 tuple 都是有序序列，不是 list 無序、tuple 有序。',
      D: 'tuple 支援索引沒錯，但 list 也支援索引，所以索引能力不是兩者差別。'
    },
    keyTakeaways: [
      'list 是 mutable，tuple 是 immutable；判斷時要問內容會不會被改。',
      '兩者都屬於有序序列，也都支援索引讀取。',
      '常見陷阱是把不可變誤解成不可讀、無序或不能用索引。',
      '需要頻繁新增、刪除或改值時通常用 list；希望資料固定時可考慮 tuple。'
    ],
    tags: ['mutability']
  },
  4: {
    answerVerification: 'verified',
    answerNote:
      'PDF 答案為 C。依題目字面 G(x)=X^3+X^1，生成位元為 1010；此多項式沒有常數項，作為 CRC 生成多項式較不典型，建議題庫註記此慣例。',
    coreTerms: ['CRC', '生成多項式', '模 2 除法'],
    beginnerExplanation:
      [
        'CRC 的前置觀念是把資料看成二進位多項式，再用生成多項式做除法。這裡的「除法」不是十進位減法，而是 GF(2) 的模 2 除法；每次相減都用 XOR，所以 1-1、0-0 都變 0，1-0、0-1 都變 1。',
        '題目給 G(x)=X^3+X^1，代表從 x^3 到 x^0 的係數依序是 1、0、1、0，因此生成位元是 1010。最高次數是 3，所以原始資料 1101 後面要先補 3 個 0，變成 1101000，再拿 1010 去做 XOR 除法。',
        '1101000 除以 1010 的 CRC 餘數是 100，最後把原始資料 1101 與餘數 100 串接，得到 1101100。常見陷阱是把 X^3+X^1 誤寫成 1011、忘記補 3 個 0，或把 XOR 除法當成一般十進位減法。'
      ].join('\n'),
    solvingSteps: [
      '先把生成多項式轉位元：X^3+X^1 從 x^3 到 x^0 的係數是 1、0、1、0，所以除數為 1010。',
      '最高次數為 3，表示 CRC 餘數長度是 3 bit，因此資料 1101 後補 3 個 0，得到 1101000。',
      '用 1010 對 1101000 做模 2 除法；每次遇到目前最高位是 1，就用 1010 對齊後 XOR。',
      'XOR 除法完成後留下低 3 位餘數 100。',
      '把原始資料與 CRC 餘數串接：1101 + 100 = 1101100。',
      '比對選項，只有 C 的尾端餘數是 100，且前四位仍保留原始資料 1101。'
    ],
    optionExplanations: {
      A: '1101001 代表餘數 001；常見原因是把生成式誤看成含常數項的 1011，或 XOR 除法過程算錯。',
      B: '1101011 代表餘數 011，並非 1101000 除以 1010 的餘數。',
      C: '1101100 代表 CRC 餘數 100，符合題目生成式 1010 的模 2 除法結果。',
      D: '1101111 代表餘數 111，與實際除法餘數 100 不符。'
    },
    keyTakeaways: [
      'CRC 餘數長度等於生成多項式最高次數；最高次是 3 就補 3 個 0、留下 3 bit 餘數。',
      'CRC 除法在 GF(2) 中進行，使用 XOR 而非一般減法。',
      '生成多項式的位元係數必須依最高次到常數項排列，本題 X^3+X^1 是 1010。',
      '常見陷阱是漏掉 0 係數、忘記補 0，或把 XOR 除法當成一般數值除法。'
    ],
    tags: ['crc']
  },
  5: {
    answerVerification: 'verified',
    answerNote: '採標準 Hamming(7,4) 位置配置：第 1、2、4 位為校驗位，第 3、5、6、7 位放入資料 1011。',
    coreTerms: ['Hamming(7,4)', '偶校驗', '校驗位位置'],
    beginnerExplanation:
      [
        'Hamming(7,4) 的前置觀念是：7 個傳送位元中有 4 個資料位、3 個校驗位。校驗位放在 2 的冪次位置，也就是第 1、2、4 位，分別記為 p1、p2、p4；其他第 3、5、6、7 位放原始資料 1011。',
        '偶校驗的規則是每一組被檢查的位置中，1 的總數必須是偶數。p1 檢查位置 1、3、5、7；p2 檢查 2、3、6、7；p4 檢查 4、5、6、7。每個 p 值都要選成讓自己的檢查組變成偶數。',
        '把資料 1011 放入位置 3、5、6、7 後，位置 3=1、5=0、6=1、7=1。計算後 p1=0、p2=1、p4=0，所以完整碼字是 0 1 1 0 0 1 1，也就是 0110011。常見陷阱是把位元從 0 開始編號、把資料位放錯順序，或把偶校驗誤算成奇校驗。'
      ].join('\n'),
    solvingSteps: [
      '先設定 Hamming(7,4) 的校驗位位置：第 1、2、4 位是 p1、p2、p4。',
      '把原始資料 1011 依序放入非校驗位，也就是位置 3、5、6、7，得到 _ _ 1 _ 0 1 1。',
      '計算 p1：它檢查位置 1、3、5、7；已知資料位 1、0、1 中有兩個 1，已是偶數，所以 p1=0。',
      '計算 p2：它檢查位置 2、3、6、7；已知資料位 1、1、1 中有三個 1，是奇數，所以要令 p2=1 變成偶數。',
      '計算 p4：它檢查位置 4、5、6、7；已知資料位 0、1、1 中有兩個 1，已是偶數，所以 p4=0。',
      '依位置 1 到 7 寫回 p1 p2 d1 p4 d2 d3 d4，得到 0 1 1 0 0 1 1，也就是 0110011。'
    ],
    optionExplanations: {
      A: '0011011 的 p2 與 p4 會讓相關檢查組出現奇數個 1，不符合偶校驗規則。',
      B: '0110011 的資料位讀出為 1011，且 p1、p2、p4 都讓各檢查組維持偶數。',
      C: '0110110 的資料位置 3、5、6、7 讀出為 1110，不是題目給的原始資料 1011。',
      D: '1110011 的 p1=1，會讓 p1 檢查組出現奇數個 1，常見於把偶校驗算成奇校驗。'
    },
    keyTakeaways: [
      'Hamming(7,4) 的校驗位在 2 的冪次位置：1、2、4。',
      '偶校驗要求每個檢查組的 1 總數為偶數；若目前是奇數，就把校驗位設成 1。',
      '資料位要依序放在位置 3、5、6、7，最後再從位置 1 寫到 7。',
      '常見陷阱是從 0 開始編號、資料位順序放錯，或把偶校驗與奇校驗混用。'
    ],
    tags: ['hamming-code']
  },
  6: {
    answerVerification: 'verified',
    answerNote: null,
    coreTerms: ['ACID', 'Atomicity', 'Consistency', 'Isolation', 'Durability'],
    beginnerExplanation:
      [
        'ACID 的前置觀念是資料庫 transaction 不是單一 SQL 而已，而是一組必須被當成整體處理的操作。為了讓轉帳、訂單、庫存這類資料變更可靠，交易需要符合 Atomicity、Consistency、Isolation、Durability 四個性質。',
        'Atomicity 是原子性，意思是全做或全不做；Consistency 是一致性，交易前後都要符合資料庫規則與約束；Isolation 是隔離性，並行交易彼此不能看到不該看的中間狀態；Durability 是持久性，提交後資料即使遇到系統故障也應保存。',
        '本題常見陷阱是看到 A 就想成 Availability、看到 C 就想成 Concurrency，或把 Integrity 混進 ACID。Availability 是可用性，Concurrency 是並行能力，Integrity 是完整性概念，但它們不是 ACID 四個字母的標準展開。'
      ].join('\n'),
    solvingSteps: [
      '先確認題目問的是交易 Transaction 的 ACID 特性，而不是一般系統可靠性或可用性名詞。',
      '展開 A：Atomicity，表示全做或全不做；因此 Availability 不是本題的 A。',
      '展開 C：Consistency，表示交易前後資料要符合規則；因此 Concurrency 不是本題的 C。',
      '展開 I：Isolation，表示並行交易之間要隔離；因此 Integrity 不是 ACID 中的 I。',
      '展開 D：Durability，表示提交後資料要持久保存；因此 Dependability 不是本題的 D。',
      '逐項比對選項，只有 D 同時列出 Atomicity, Consistency, Isolation, Durability。'
    ],
    optionExplanations: {
      A: 'Availability 與 Dependability 不是 ACID 中的 A 與 D，Integrity 也不是標準 C 項。',
      B: 'Atomicity 和 Durability 正確，但 Concurrency、Integrity 不是 ACID 的 C 與 I，屬於把相近資料庫名詞混入。',
      C: 'Isolation 正確，但 Availability、Concurrency、Dependability 不是 ACID 的其餘三項。',
      D: 'Atomicity, Consistency, Isolation, Durability 正是 ACID 的標準全名。'
    },
    keyTakeaways: [
      'ACID 用來描述交易處理的可靠性，不是一般系統可用性清單。',
      'Atomicity 是全做或全不做；Consistency 是符合資料規則。',
      'Isolation 不是 Concurrency，它強調並行交易彼此隔離。',
      'Durability 強調提交後資料不因系統故障輕易消失。',
      '常見陷阱是把 Availability、Concurrency、Integrity、Dependability 混進 ACID。'
    ],
    tags: ['acid']
  },
  7: {
    answerVerification: 'verified',
    answerNote: null,
    coreTerms: ['優先權排程', '飢餓', '老化機制'],
    beginnerExplanation:
      [
        '優先權排程的前置觀念是：排程器會優先挑高優先權行程使用 CPU。這能讓重要工作先做，但如果高優先權工作一直進來，低優先權行程可能長時間等不到 CPU，這種無限期等待就叫飢餓 starvation。',
        '老化機制 Aging 的規則是把等待時間納入優先權調整：一個行程等待越久，就逐步提高它的優先權。這樣低優先權行程不會永遠被插隊，最後也會升到足以被排程的等級。',
        '本題常見陷阱是把 starvation 當成 CPU 不夠、time quantum 太長，或高優先權行程太麻煩要直接終止。這些做法沒有解決「低優先權長期被高優先權壓住」的核心原因，甚至可能產生公平性或穩定性副作用。'
      ].join('\n'),
    solvingSteps: [
      '先辨認題目情境：優先權排程中要避免低優先權行程長期等待，也就是 starvation。',
      '套用 Aging 規則：等待時間越長，行程優先權逐步提高，直到有機會取得 CPU。',
      '檢查選項 A：老化(Aging)機制正是直接調整等待行程優先權的策略。',
      '檢查選項 B：增加 CPU 核心數可能提高吞吐量，但不保證低優先權行程不再被高優先權行程壓住。',
      '檢查選項 C：降低 time quantum 主要影響 Round Robin 類排程的切換頻率，不是優先權飢餓的直接解法。',
      '檢查選項 D：強制終止高優先級進程會破壞系統正確性，副作用太大，也不是標準排程策略。',
      '因此答案選 A，因為 Aging 才是對優先權排程 starvation 的對症解法。'
    ],
    optionExplanations: {
      A: '老化會提高等待過久行程的優先權，能直接對抗飢餓。',
      B: '增加 CPU 核心數可能降低壅塞，但不能保證低優先權行程不被持續插隊。',
      C: '時間片長度主要影響輪轉排程的反應與切換成本，不是優先權飢餓的核心解法。',
      D: '強制終止高優先級進程會破壞正常排程語意，副作用很大，也不是標準避免飢餓策略。'
    },
    keyTakeaways: [
      'Starvation 是行程長期得不到資源，常見於低優先權行程一直被延後。',
      'Aging 的核心是等待越久，優先權越高，用時間補償低優先權。',
      '常見陷阱是把硬體不足、time quantum 或強制終止行程當成優先權飢餓的標準解法。',
      '增加硬體資源不等於解決排程公平性；要改的是排程規則本身。'
    ],
    tags: ['starvation', 'scheduling']
  },
  8: {
    answerVerification: 'verified',
    answerNote: null,
    coreTerms: ['Preorder', 'Inorder', 'Postorder', '遞迴重建'],
    beginnerExplanation:
      [
        '二元樹走訪的前置觀念是三種順序：Preorder 前序是根、左、右；Inorder 中序是左、根、右；Postorder 後序是左、右、根。已知前序與中序時，常用規則是「前序的第一個節點是根」，再用這個根去中序序列切開左右子樹。',
        '本題前序第一個是 A，所以整棵樹根節點是 A。把 A 放到中序 D,B,E,A,C,F 中看，A 左邊 D,B,E 是左子樹，A 右邊 C,F 是右子樹。接著對左右子樹重複同樣規則，這就是遞迴重建。',
        '左子樹的前序是 B,D,E，中序是 D,B,E，所以 B 是左子樹根，D 是左子、E 是右子；右子樹的前序是 C,F，中序是 C,F，所以 C 是右子樹根，F 是它的右子。後序是左、右、根，所以答案是 D,E,B,F,C,A。常見陷阱是直接把題目給的前序或中序拿來當後序，或忘記整棵樹根 A 必須放在最後。'
      ].join('\n'),
    solvingSteps: [
      '由 Preorder 第一個元素判斷整棵樹根節點為 A。',
      '在 Inorder 中以 A 分割：左子樹是 D,B,E，右子樹是 C,F。',
      '左子樹 Preorder 為 B,D,E，所以 B 為左子樹根；對照 Inorder 的 D,B,E，可知 D 為左子、E 為右子。',
      '右子樹 Preorder 為 C,F，所以 C 為右子樹根；對照 Inorder 的 C,F，可知 F 在 C 的右側。',
      '依 Postorder 左、右、根輸出左子樹，得到 D,E,B。',
      '再輸出右子樹，得到 F,C；最後輸出整棵樹根 A。',
      '合併後序結果為 D,E,B,F,C,A。'
    ],
    optionExplanations: {
      A: 'A,B,D,E,C,F 是題目給的前序，不是後序；後序的根 A 應在最後。',
      B: 'D,B,E 把左子樹根 B 放在 E 前面，但後序應先走完左右子節點再到 B。',
      C: 'D,E,B,F,C,A 符合左子樹、右子樹、根節點的後序規則。',
      D: 'A 出現在中間，違反整棵樹後序走訪最後才訪問根 A 的規則。'
    },
    keyTakeaways: [
      'Preorder 第一個節點是根，這是重建樹的入口。',
      'Inorder 可用根節點切分左右子樹，再對子樹遞迴套用同一規則。',
      'Postorder 順序是左子樹、右子樹、根；整棵樹根會在最後。',
      '常見陷阱是把輸入的 Preorder 或 Inorder 直接當答案，而沒有重建左右子樹。'
    ],
    tags: ['binary-tree']
  },
  9: {
    answerVerification: 'verified',
    answerNote: '桶子排序達到 O(n) 通常指元素分佈均勻、桶內處理成本總和維持線性的理想或平均情況。',
    coreTerms: ['Bucket Sort', '均勻分佈', 'O(n)'],
    beginnerExplanation:
      [
        'Bucket Sort 的前置觀念是「先分配、再桶內處理、最後收集」。演算法會依元素值把資料分配到桶中，每個桶再各自排序或整理，最後依桶的順序合併。',
        '它能接近 O(n) 的規則來源在於分佈假設：如果元素均勻分佈在所有桶中，每個桶裡的元素數量都很少，桶內排序成本加總就不會集中爆增，整體總成本才可能維持線性；分配到桶與收集回來也都是線性掃描。',
        '本題常見陷阱是以為桶子排序永遠 O(n)，或以為桶數越多一定越快。若大量元素集中到同一桶，該桶內排序成本會上升；若只有一個桶，幾乎退化成一般排序而不是線性分散。'
      ].join('\n'),
    solvingSteps: [
      '先確認 Bucket Sort 的流程是分配到桶、桶內處理、再依桶順序收集。',
      '判斷何時能達到 O(n)：需要元素均勻分佈，使每個桶的元素數量大致平均。',
      '檢查選項 A：元素均勻分佈在所有桶中，桶內成本分散，符合線性時間的理想或平均情況。',
      '檢查選項 B：所有元素相同時通常會集中到同一桶，桶內處理可能變重。',
      '檢查選項 C：桶數量寫成 n2 不是達到 O(n) 的充分條件，桶數多也要搭配合理分佈與映射。',
      '檢查選項 D：僅一個桶代表所有元素都在同一桶，無法利用分桶分散成本。',
      '因此選 A，因為均勻分佈才是桶子排序線性表現的關鍵條件。'
    ],
    optionExplanations: {
      A: '元素均勻分佈能讓各桶負載平均，是 Bucket Sort 達到 O(n) 的典型條件。',
      B: '所有元素相同可能集中在同一桶；除非實作特別處理，否則不是通用的線性條件描述。',
      C: '桶數量設成 n2 只描述桶的數量，不能保證元素分佈與桶內成本合理；只看桶數會誤判。',
      D: '僅一個桶會讓全部資料集中在同一桶內處理，失去 bucket sort 分散負載的優勢。'
    },
    keyTakeaways: [
      'Bucket Sort 的 O(n) 表現仰賴資料均勻分佈與桶內成本分散。',
      '元素均勻分散時，分配、桶內處理與收集的總成本才可能維持線性。',
      '常見陷阱是以為桶數多或演算法名稱叫 Bucket Sort 就必然 O(n)。',
      '元素集中到同一桶時，桶內處理成本會上升，可能失去分桶優勢。'
    ],
    tags: ['bucket-sort']
  },
  10: {
    answerVerification: 'verified',
    answerNote: null,
    coreTerms: ['Stable Sort', '相等鍵值', '相對順序'],
    beginnerExplanation:
      [
        'Stable Sort 穩定排序的前置觀念是：排序時常用某個 key 來比較元素，例如分數、日期或姓名。若兩個元素的 key 相等，穩定排序會保留它們在原始資料中的相對順序。',
        '規則來源是穩定性的定義本身：只討論「相等鍵值」元素之間的先後是否被保留，不是在說整個陣列都不變，也不是在說時間複雜度或空間複雜度固定。這個特性常用於多欄位排序，例如先依次要欄位排序，再用穩定排序依主要欄位排序。',
        '本題常見陷阱是看到「穩定」就聯想到不會改變、速度穩定或記憶體固定。演算法的 stable 指的是相等鍵值的原始相對順序，而不是效能數字不變。'
      ].join('\n'),
    solvingSteps: [
      '先鎖定題目問的是 stable sorting 的定義，不是在問特定排序演算法名稱。',
      '套用定義：穩定性只討論相等鍵值元素之間的原始相對順序是否保留。',
      '檢查選項 A：排序後陣列不變不是 stable 的定義；陣列可以改變，只要相等鍵值相對順序保留即可。',
      '檢查選項 B：時間複雜度是否穩定與 stable sort 無關。',
      '檢查選項 C：空間複雜度固定是記憶體使用特性，也不是穩定性。',
      '檢查選項 D：相等的元素排序後保持原始相對順序，正好符合 stable sort 定義。',
      '因此選項 D 是正確答案。'
    ],
    optionExplanations: {
      A: '排序後陣列不變只可能表示原本已排序或沒有實際交換，並非穩定排序的定義。',
      B: '時間複雜度是否穩定與 stable sort 無關。',
      C: '空間複雜度固定比較接近記憶體使用特性，不是穩定性。',
      D: '相等元素保持原始相對順序，正是穩定排序的標準定義。'
    },
    keyTakeaways: [
      'Stable sort 關注相等鍵值元素的相對順序，而不是整個陣列是否不變。',
      '穩定排序與時間複雜度、空間複雜度是不同概念。',
      '多鍵排序常會利用穩定排序保留前一次排序結果。',
      '常見陷阱是把 stable 誤解成速度穩定、空間固定或資料完全不動。'
    ],
    tags: ['stable-sort']
  },
  11: {
    answerVerification: 'verified',
    answerNote: null,
    coreTerms: ['Memory Hierarchy', '暫存器', '快取', '主記憶體', '硬碟'],
    beginnerExplanation:
      [
        'Memory Hierarchy 記憶體層次的前置觀念是：CPU 需要資料很快，但越快的儲存單元通常越貴、容量越小。系統因此把儲存分成多層，讓最常用的資料放在靠近 CPU 的高速層，較大量資料放在外層。',
        '判斷速度順序的規則是「越靠近 CPU，速度越快；越往外層，容量通常越大但速度越慢」。暫存器在 CPU 內部，最快但容量最小；快取 cache 靠近 CPU，用來減少 CPU 等主記憶體的時間；主記憶體 DRAM 再往外；硬碟屬於外部儲存，速度最慢。',
        '本題常見陷阱是把「容量大」誤認成「速度快」，或把快取排在暫存器前面。快取雖然很快，但暫存器直接在 CPU 執行單元旁邊，通常仍是最快層。'
      ].join('\n'),
    solvingSteps: [
      '先找出最靠近 CPU 的元件：暫存器在 CPU 內部，因此速度最快。',
      '下一層是快取 cache，用來縮短 CPU 與主記憶體之間的速度落差。',
      '再下一層是主記憶體，容量較大但比快取慢。',
      '最外層的硬碟或外部儲存容量大但延遲高，速度最慢。',
      '所以由最快到最慢是暫存器、快取、主記憶體、硬碟。',
      '比對選項，只有 A 符合這個由近到遠的速度層次。'
    ],
    optionExplanations: {
      A: '正確，暫存器最快，其次是快取、主記憶體，硬碟最慢。',
      B: '這是由慢到快的方向，和題目要求的最快到最慢完全反向。',
      C: '「記憶體」表述不精確，且把快取排在暫存器之前也不符合速度層次。',
      D: '暫存器通常比快取更快，順序開頭把快取放在暫存器前面，已經顛倒。'
    },
    keyTakeaways: [
      '越靠近 CPU 的儲存層通常速度越快、容量越小、成本越高。',
      '暫存器最快，其次通常是快取、主記憶體，硬碟或外部儲存最慢。',
      '快取用來縮短 CPU 與主記憶體的速度落差，但仍慢於暫存器。',
      '常見陷阱是用容量大小判斷速度，或把快取與暫存器的順序顛倒。'
    ],
    tags: ['memory-hierarchy', 'cache']
  },
  12: {
    answerVerification: 'verified',
    answerNote: '此題以「類別多重繼承」為判斷基準；Java 不能直接繼承多個類別，通常透過多個 interface 達成類似效果。',
    coreTerms: ['多重類別繼承', 'interface', 'Java'],
    beginnerExplanation:
      [
        '多重繼承的前置觀念是：一個類別若能同時繼承多個父類別，就會同時取得多個父類別的狀態與行為。這很有彈性，但也可能帶來方法衝突、初始化順序與菱形繼承等問題。',
        'Java 的規則是「類別只能 extends 一個 class，但可以 implements 多個 interface」。interface 主要描述一組能力或合約，讓類別承諾提供哪些方法，因此 Java 常用多個介面來模擬多重能力，而不是直接多重類別繼承。',
        '本題常見陷阱是把「多重類別繼承」和「實作多個 interface」混成同一件事。C++ 與 Python 可以直接多重繼承 class；Java 不行，所以題目問必須使用介面來模擬時，答案是 Java。'
      ].join('\n'),
    solvingSteps: [
      '先確認題目問的是多重類別繼承，也就是同時繼承多個父類別 class。',
      '檢查 C++：C++ 可直接多重繼承 class，所以不需要必須使用 interface 模擬。',
      '檢查 Java：Java 不能 extends 多個 class，但可以 implements 多個 interface，因此符合題目。',
      '檢查 JavaScript：它主要是原型導向語言，interface 不是用來模擬多重類別繼承的語言核心機制。',
      '檢查 Python：Python 可直接多重繼承 class，所以不是本題答案。',
      '因此選 B，因為 Java 以多個 interface 取得類似多重能力。'
    ],
    optionExplanations: {
      A: 'C++ 支援直接多重類別繼承，所以不屬於必須使用 interface 模擬的情況。',
      B: 'Java 不能繼承多個 class，但可 implements 多個 interface，因此常用 interface 取得類似多重能力。',
      C: 'JavaScript 是原型導向語言，沒有必須使用 interface 來模擬多重類別繼承的語言機制。',
      D: 'Python 支援類別多重繼承，所以不需要必須透過 interface 模擬。'
    },
    keyTakeaways: [
      'Java 不支援多重類別繼承：一個 class 只能 extends 一個 class。',
      'Java 可實作多個 interface，用合約方式取得多種能力。',
      'C++ 與 Python 可直接多重繼承 class。',
      '常見陷阱是把 implements 多個 interface 誤認成 extends 多個 class。'
    ],
    tags: ['interface', 'inheritance']
  },
  13: {
    answerVerification: 'verified',
    answerNote: null,
    coreTerms: ['強型別', '動態型別', 'Python'],
    beginnerExplanation:
      [
        '這題的前置觀念是型別分類有兩條不同軸線。第一條是強型別與弱型別，重點在語言會不會任意把不相容型別混在一起運算；強型別通常不允許把字串和數字隨便相加而默默轉換成你沒預期的結果。',
        '第二條是靜態型別與動態型別，重點在型別何時決定與檢查。靜態型別多在編譯期間檢查，動態型別多在執行期間才決定變數實際型別。Python 的特色是強型別且動態型別：它在執行期間才知道變數目前指向哪種物件，但不會任意容忍不相容型別運算。',
        '本題常見陷阱是把「動態」誤解成「弱」，或把 Java 的強型別誤以為也符合動態型別。JavaScript 常被歸為動態型別，但因隱式轉型多，強型別判斷不如 Python 標準。'
      ].join('\n'),
    solvingSteps: [
      '先把題目拆成兩個判斷：是否強型別，以及是否動態型別。',
      'Java 是強型別，但型別主要在編譯期間檢查，通常歸為靜態型別。',
      'JavaScript 是動態型別，但常有隱式型別轉換，不是此題最標準的強型別答案。',
      'Python 在執行期間決定變數型別，因此是動態型別。',
      'Python 不允許不相容型別任意混算，因此也屬於強型別。',
      '所以同時符合強型別且動態型別的是 Python。'
    ],
    optionExplanations: {
      A: 'Java 是強型別，但型別主要在編譯期檢查，屬靜態型別。',
      B: 'JavaScript 是動態型別，但常見隱式型別轉換，不是此題最標準的強型別答案。',
      C: 'Python 變數型別在執行期決定，且不允許不相容型別任意運算，因此是強型別且動態型別。',
      D: 'VB 的型別特性依版本與設定差異較大，非此題標準答案。'
    },
    keyTakeaways: [
      '強弱型別看的是不相容型別是否會被任意混用或隱式轉換。',
      '靜態/動態型別看的是型別主要在編譯期間還是執行期間決定。',
      'Python 是強型別也是動態型別。',
      '常見陷阱是把動態型別等同於弱型別，或把 Java 的強型別誤判成動態型別。'
    ],
    tags: ['dynamic-typing']
  },
  14: {
    answerVerification: 'verified',
    answerNote: null,
    coreTerms: ['pass by value', '區域變數', '指標'],
    beginnerExplanation:
      [
        'C 語言函式參數的前置觀念是 pass by value，也就是呼叫函式時，會把引數的值複製一份給參數。main 裡的 a 是一個變數，func 裡的 p 是另一個區域變數；p 一開始拿到 a 的值 3，但 p 不是 a 本身。',
        '執行 func(a) 時，p 得到 3。進入 func 後執行 p = p*p，只有 func 內部的 p 從 3 變成 9；函式結束後 p 這個區域變數消失，main 裡的 a 仍然是 3。因此 printf("%d\\n", a) 輸出 3。',
        '本題常見陷阱是看到 p 變成 9，就以為 a 也被改成 9。若真的要讓函式修改呼叫端的變數，通常要傳指標，例如把 a 的位址傳入函式，再透過指標改值。'
      ].join('\n'),
    solvingSteps: [
      'main 中先設定 a = 3。',
      '呼叫 func(a) 時，C 語言把 a 的值複製給參數 p，因此 p 一開始也是 3。',
      '注意 p 是另一個區域變數，不是 main 裡的 a。',
      '在 func 內執行 p = p*p，只讓 p 變成 9。',
      'func 結束後回到 main，p 已經不存在，a 仍然是 3。',
      'printf("%d\\n", a) 印出 a 的值，所以輸出 3。'
    ],
    optionExplanations: {
      A: '程式沒有把 a 設成 0，也沒有未初始化問題。',
      B: 'func 修改的是參數 p 的複本，a 仍為 3。',
      C: '9 是函式內 p 的結果；p 變成 9 不會回寫到 main 裡的 a。',
      D: '程式語法可編譯，void 函式不回傳值也沒有問題。'
    },
    keyTakeaways: [
      'C 語言一般函式參數是 pass by value，呼叫時會把值複製一份。',
      '函式內的參數是區域變數，修改參數不會自動改變呼叫端變數。',
      '若要改呼叫端變數，通常要傳指標或位址。',
      '常見陷阱是把參數副本 p 的變化誤認成 main 裡 a 的變化。'
    ],
    tags: ['pass-by-value', 'c-language']
  },
  15: {
    answerVerification: 'verified',
    answerNote: null,
    coreTerms: ['AVL 樹', 'BST', '平衡因子', '旋轉'],
    beginnerExplanation:
      [
        'AVL 樹的前置觀念是 BST 二元搜尋樹：左子樹鍵值小於節點，右子樹鍵值大於節點。一般 BST 若插入順序很偏，可能退化成很長的鏈，查找效率變差。',
        'AVL 樹在 BST 規則之外加入自平衡條件。它用平衡因子 balance factor 觀察每個節點的左右子樹高度差，通常定義為左子樹高度減右子樹高度；規則要求每個節點的平衡因子維持在 -1 到 1 之間。',
        '若高度差超過範圍，AVL 會透過旋轉重新調整樹形，讓高度回到平衡。本題常見陷阱是把平衡因子誤解成父子節點的鍵值差，或以為 AVL 允許多父節點；AVL 仍然是樹，而且比較的是高度，不是鍵值大小差。'
      ].join('\n'),
    solvingSteps: [
      '先確認 AVL 樹仍然是 BST，所以它保留二元搜尋樹的鍵值排序規則。',
      '找出 AVL 額外限制：每個節點都要檢查左右子樹高度差。',
      '套用平衡因子規則：平衡因子必須在 -1、0、1，也就是 -1 到 1 的範圍內。',
      '若平衡因子超出範圍，AVL 會透過旋轉調整，不是改變鍵值或允許多父節點。',
      '檢查選項 D：父子節點的鍵值差不是 AVL 的平衡條件。',
      '因此選 B，因為 -1 ≤ 平衡因子 ≤ 1 才是 AVL 與一般 BST 最關鍵的差別。'
    ],
    optionExplanations: {
      A: '是否允許重複鍵值不是 AVL 與一般 BST 的核心差別。',
      B: 'AVL 樹要求各節點平衡因子，也就是左右子樹高度差，介於 -1 到 1。',
      C: 'AVL 樹仍是樹結構，節點不會有多個父節點。',
      D: 'AVL 比較的是子樹高度差，不是父子節點的鍵值差。'
    },
    keyTakeaways: [
      'AVL 樹是自平衡 BST，先保留 BST 的鍵值排序規則。',
      '平衡因子 = 左右子樹高度差，通常需維持在 -1 到 1。',
      '失衡時透過旋轉恢復平衡。',
      '常見陷阱是把高度差誤認為父子節點的鍵值差。'
    ],
    tags: ['avl-tree', 'self-balancing-tree']
  },
  16: {
    answerVerification: 'needs-review',
    answerNote:
      'D 是加法器中 XOR 的典型用途；但二補數溢位也常用最高位進位輸入與輸出做 XOR 檢測，因此 B 具可辯性，建議人工確認題本是否只考「sum bit」。',
    coreTerms: ['XOR', '半加器', '全加器', 'sum bit'],
    beginnerExplanation:
      [
        'XOR 的前置觀念是真值表：兩個輸入不同輸出 1，兩個輸入相同輸出 0。也就是 0 XOR 1 = 1、1 XOR 0 = 1、0 XOR 0 = 0、1 XOR 1 = 0。',
        '在半加器中，如果只看兩個輸入位元 A、B 的和位元 sum bit，不含進位，公式就是 A XOR B。在全加器中，多了一個進位輸入 Cin，所以 sum bit 會變成 A XOR B XOR Cin。這就是 XOR 閘在加法器中最典型、最直接的功能。',
        '本題常見陷阱是把「產生進位」和「計算和位元」混在一起。進位通常由 AND、OR 等邏輯組合產生；不過二補數 overflow 檢測有時也會用最高位進位輸入與輸出做 XOR，因此選項 B 有可辯性，這題保留 needs-review 註記。'
      ].join('\n'),
    solvingSteps: [
      '回想 XOR 真值表：輸入不同輸出 1，相同輸出 0。',
      '套用到半加器：每位二進位相加時，不含進位的和就是 A XOR B。',
      '套用到全加器：多了 Cin 時，sum bit 是 A XOR B XOR Cin。',
      '檢查選項 A：產生進位通常要看兩個位元是否同時為 1，常用 AND/OR 組合，不是單純 XOR。',
      '檢查選項 B：二補數 signed overflow 的確可能用最高位 carry-in 與 carry-out 做 XOR 檢測，所以此選項有可辯性。',
      '檢查選項 D：計算每位的和且不含進位，正是 XOR 在加法器中的標準用途。',
      '因此依題庫採答選 D，但保留 needs-review，等待人工確認題意是否排除 overflow detection。'
    ],
    optionExplanations: {
      A: '進位產生主要看兩位是否同為 1，以及輸入進位，通常由 AND/OR 組合處理。',
      B: '二補數 overflow 檢測可用最高位 carry in 與 carry out 做 XOR，因此此選項有可辯性，但不是題目答案鍵標示的主用途。',
      C: '符號位是資料位元的一部分，不是由 XOR 閘負責儲存。',
      D: 'XOR 可計算每位不含進位的和；全加器的 sum 也會再與 carry in 做 XOR。'
    },
    keyTakeaways: [
      'XOR 可表示「兩輸入不同」。',
      '半加器 sum bit = A XOR B；全加器 sum bit = A XOR B XOR Cin。',
      '進位產生通常不是單純 XOR，而是 AND/OR 類邏輯組合。',
      '二補數 overflow detection 也可能使用 XOR，因此本題保留 needs-review。',
      '常見陷阱是把 sum bit、carry generation、overflow detection 三個功能混在一起。'
    ],
    tags: ['xor', 'twos-complement', 'adder']
  },
  17: {
    answerVerification: 'verified',
    answerNote: null,
    coreTerms: ['READ UNCOMMITTED', 'Dirty Read', 'rollback'],
    beginnerExplanation:
      [
        'Dirty Read 的前置觀念是資料庫交易可能先修改資料，但還沒 commit 提交。READ UNCOMMITTED 是最低的隔離層級之一，允許其他交易讀到這種尚未提交的資料。',
        '如果交易 T1 修改一筆資料但尚未提交，交易 T2 就讀到了這個新值，之後 T1 又 rollback，T2 剛剛讀到的值就像一份不可靠的暫時狀態。這種讀到「已修改但未提交」資料的情況，就叫 Dirty Read。',
        '本題常見陷阱是把 Dirty Read 和 non-repeatable read 或 lost update 混淆。Dirty Read 的核心是未提交；non-repeatable read 是同一交易重讀同一筆已提交資料時結果改變；lost update 是更新互相覆蓋。'
      ].join('\n'),
    solvingSteps: [
      '先確認題目指定隔離層級為 READ UNCOMMITTED，代表可能讀到別人尚未提交的資料。',
      '抓 Dirty Read 的關鍵字：資料已修改但尚未 commit。',
      '檢查選項 A：後提交覆蓋先提交較接近 lost update 或覆寫問題。',
      '檢查選項 B：重複讀相同資料卻拿到不同值是 non-repeatable read。',
      '檢查選項 C：讀取到已修改但未提交的數據，正好符合 Dirty Read。',
      '檢查選項 D：讀到交易發生前的舊資料不是 Dirty Read 的定義重點。',
      '因此選 C。'
    ],
    optionExplanations: {
      A: '後提交覆蓋先提交較接近 lost update 或覆寫問題。',
      B: '重複讀同一筆資料卻得到不同值是 non-repeatable read。',
      C: 'Dirty Read 就是讀取到別的交易已修改但尚未提交的資料。',
      D: '讀到舊資料不是 Dirty Read 的定義重點。'
    },
    keyTakeaways: [
      'READ UNCOMMITTED 可能發生 Dirty Read。',
      'Dirty Read 的重點是讀到未提交資料；若原交易 rollback，讀到的值可能不可靠。',
      'Non-repeatable read 是同一交易內重讀已提交資料時結果改變。',
      '常見陷阱是把 Dirty Read、non-repeatable read 與 lost update 混在一起。'
    ],
    tags: ['dirty-read']
  },
  18: {
    answerVerification: 'verified',
    answerNote: 'B 明確把 2NF 與 3NF 搞混；A 與 D 的措辭較簡化，但不影響此題選 B。',
    coreTerms: ['1NF', '2NF', '3NF', 'BCNF'],
    beginnerExplanation:
      [
        '正規化的前置觀念是用一系列規則降低重複、更新異常與不合理依賴。1NF 先要求欄位值原子化、避免重複群組；2NF 建立在 1NF 之上，重點是消除部分函數依賴，通常發生在複合主鍵時，某個非鍵屬性只依賴主鍵的一部分。',
        '3NF 的重點才是消除傳遞函數依賴，也就是非鍵屬性依賴另一個非鍵屬性，再間接依賴主鍵。BCNF 更嚴格，要求每個函數依賴的決定因子都必須是 superkey。',
        '本題問何者有誤，選項 B 說第二正規化必須消除傳遞函數依賴，這把 2NF 和 3NF 的規則來源混在一起。常見陷阱是只背 NF 數字，卻沒分清部分依賴、傳遞依賴與 superkey。'
      ].join('\n'),
    solvingSteps: [
      '先整理 1NF、2NF、3NF、BCNF 的主要目的。',
      '1NF 處理欄位值原子化與重複群組問題。',
      '2NF 要消除部分函數依賴，尤其是複合鍵的一部分決定非鍵屬性。',
      '3NF 才處理非鍵屬性之間造成的傳遞函數依賴。',
      'BCNF 要求函數依賴的決定因子必須是 superkey。',
      '檢查選項 B：它把傳遞函數依賴放到 2NF，因此是錯誤敘述。',
      '題目問「何者有誤」，所以答案選 B。'
    ],
    optionExplanations: {
      A: '1NF 常用來消除重複群組並要求欄位值原子化；「重複資料」是較簡化說法。',
      B: '消除傳遞函數依賴是 3NF 的要求，不是 2NF。',
      C: '3NF 要避免非主鍵屬性依賴其他非主鍵屬性。',
      D: 'BCNF 要求函數依賴的決定因子必須是超鍵，避免由非鍵屬性決定鍵屬性。'
    },
    keyTakeaways: [
      '2NF 消除部分依賴，常和複合鍵有關。',
      '3NF 消除傳遞依賴，處理非鍵屬性之間的間接依賴。',
      'BCNF 要求每個決定因子都是 superkey。',
      '常見陷阱是把 2NF 的部分依賴與 3NF 的傳遞依賴對調。'
    ],
    tags: ['2nf', '3nf']
  },
  19: {
    answerVerification: 'verified',
    answerNote: null,
    coreTerms: ['Currying', '函數式程式設計', '單參數函式'],
    beginnerExplanation:
      [
        'Currying 柯里化的前置觀念是函式也可以像資料一樣被傳遞、回傳與組合。一般多參數函式可能長得像 f(a, b, c)，一次收多個參數。',
        '柯里化的規則是把接受多個參數的函式，轉換成一連串每次只接受一個參數的單參數函式，例如 f(a)(b)(c)。這種形式方便部分套用：先固定前面某些參數，得到一個新的函式，之後再補剩下的參數。',
        '本題常見陷阱是看到程式設計名詞就往物件導向、程序式或邏輯式分類猜。Currying 的核心是函式與參數的轉換，屬於函數式程式設計的典型概念。'
      ].join('\n'),
    solvingSteps: [
      '先辨識 Currying 是處理函式與參數的概念，不是在描述物件、類別或流程控制。',
      '判斷選項 A：物件導向重點是物件、類別、封裝與繼承，和 Currying 的核心不同。',
      '判斷選項 B：程序式重點是依序執行步驟與程序呼叫，不是多參數函式轉換。',
      '判斷選項 C：函數式程式設計把函式當成可傳遞、可回傳、可組合的值，Currying 正是其中典型概念。',
      '判斷選項 D：邏輯式程式設計重點是規則、事實與推論，不是 Currying 的分類。',
      '因此選 C。'
    ],
    optionExplanations: {
      A: '物件導向重點是物件、類別、封裝與繼承。',
      B: '程序式重點是依序執行步驟與程序呼叫。',
      C: 'Currying 是函數式程式設計中的典型概念。',
      D: '邏輯式程式設計重點是規則、事實與推論。'
    },
    keyTakeaways: [
      'Currying 屬於函數式程式設計。',
      'Currying 會把多參數函式轉成一連串單參數函式。',
      '它常和高階函式、部分套用一起出現。',
      '常見陷阱是把 Currying 當成物件導向或程序式控制流程概念。'
    ],
    tags: ['currying']
  },
  20: {
    answerVerification: 'verified',
    answerNote: '新節點通常先插入為紅色；若插入的是根節點，修正流程最後會把根節點設為黑色。',
    coreTerms: ['紅黑樹', '黑高度', '紅紅衝突', '旋轉'],
    beginnerExplanation:
      [
        '紅黑樹的前置觀念是它用顏色規則維持近似平衡。常見規則包含：根節點最後必須是黑色、紅節點不能有紅子節點，以及從任一節點到其葉端路徑上的黑節點數，也就是黑高度，要維持一致。',
        '插入新節點時通常先設為紅色，規則來源是「紅色節點不會增加任何路徑的黑高度」。如果新節點直接設黑，某一條插入路徑的黑節點數會多 1，很容易破壞黑高度一致性。',
        '設成紅色仍可能造成父節點也是紅色的紅紅衝突，但這類衝突可透過重新著色與旋轉修正。常見陷阱是以為新節點必須先設黑才能符合根黑規則；其實只有插入根節點或修正結束後，才需要確保根為黑色。'
      ].join('\n'),
    solvingSteps: [
      '先回想紅黑樹規則：根為黑、紅節點不能有紅子節點、各路徑黑高度一致。',
      '判斷新節點若直接設黑，會讓插入那條路徑的黑高度增加，破壞黑高度平衡。',
      '判斷新節點先設紅色，通常不會立刻增加黑高度，因此對整體黑高度影響較小。',
      '如果父節點也是紅色，會出現紅紅衝突，再透過重新著色或旋轉處理。',
      '檢查選項 B：新節點通常先設為紅色，符合插入修正流程。',
      '因此選 B。'
    ],
    optionExplanations: {
      A: '新節點預設為黑色會增加該路徑黑高度，較容易破壞平衡條件。',
      B: '紅黑樹插入節點通常先設為紅色。',
      C: '紅黑樹插入顏色不是隨機決定。',
      D: '若父節點也是紅色，新節點同色會直接違反紅節點不可連紅的規則。'
    },
    keyTakeaways: [
      '紅黑樹新插入節點通常預設紅色，因為紅色不會增加黑高度。',
      '根節點最後必須是黑色，但這不代表每個新節點都先設黑。',
      '插入修正包含重新著色與旋轉，用來處理紅紅衝突或其他規則違反。',
      '常見陷阱是忽略黑高度一致性，只背「根是黑色」。'
    ],
    tags: ['red-black-tree', 'self-balancing-tree']
  },
  21: {
    answerVerification: 'verified',
    answerNote: null,
    coreTerms: ['FCFS', 'FIFO', 'convoy effect'],
    beginnerExplanation:
      [
        'FCFS 是 First-Come, First-Served，也就是先到先服務。它的前置觀念和 FIFO 佇列一樣：誰先進入就緒佇列，誰就先取得 CPU；後來的行程排在後面等。',
        '這個規則的優點是簡單易懂、容易實作，而且從排隊角度看很公平，因為不會讓後到的行程插隊。可是 FCFS 不會根據工作長短、互動需求或剩餘時間調整順序，所以平均等待時間不一定最短，也不一定適合互動式系統。',
        '本題常見陷阱是把「公平」誤解成「效能最佳」。FCFS 的典型缺點是 convoy effect：一個很長的工作排在前面時，後面短工作都要等，造成平均等待與互動回應變差。'
      ].join('\n'),
    solvingSteps: [
      '先確認 FCFS 的規則是 FIFO：依到達順序服務。',
      '題目問的是 FCFS 的優點，不是缺點或最佳化目標。',
      '檢查選項 A：簡單易懂、容易實作且公平，符合 FCFS 的主要優點。',
      '檢查選項 B：平均等待時間最短通常不是 FCFS 的保證，短工作可能被長工作擋住。',
      '檢查選項 C：互動式系統重視快速回應，FCFS 不會搶佔長工作，通常不適合。',
      '檢查選項 D：CPU 使用效率高不是 FCFS 必然優點，convoy effect 反而可能拖慢整體體感。',
      '因此選 A。'
    ],
    optionExplanations: {
      A: 'FCFS 規則簡單直觀，依到達順序服務，實作容易且有先來先服務的公平性。',
      B: '平均等待時間最短通常是 SJF 在特定條件下的優勢，FCFS 可能讓短工作排在長工作後而等待很久。',
      C: '互動式系統重視快速回應，通常較適合 Round Robin 或具搶佔能力的排程。',
      D: 'FCFS 可能造成 convoy effect，讓 I/O-bound 工作被長 CPU-bound 工作阻塞，整體效率不一定高。'
    },
    keyTakeaways: [
      'FCFS 的核心是 FIFO 排隊。',
      'FCFS 優點是簡單與公平，不是平均等待時間最佳。',
      'FCFS 常見缺點是 convoy effect，長工作可能拖住後面的短工作。',
      '常見陷阱是把規則公平誤認成等待時間、互動回應或 CPU 效率最佳。'
    ],
    tags: ['fcfs', 'fifo']
  },
  22: {
    answerVerification: 'verified',
    answerNote: null,
    coreTerms: ['RGB', '加色模型', 'alpha channel'],
    beginnerExplanation:
      [
        'RGB 的前置觀念是加色模型：螢幕用紅、綠、藍三種光相加形成顏色。R、G、B 的數值代表三個通道的亮度，數值越大，該色光越亮。',
        'RGB(0,0,0) 代表紅光亮度 0、綠光亮度 0、藍光亮度 0，也就是三種光都沒有輸出。加色模型中沒有光就是黑色；三通道都很亮時才會趨近白色。',
        '本題常見陷阱是把 RGB(0,0,0) 想成透明。透明度不是 RGB 三個值本身，而是另一個 alpha channel 才會描述；單看 RGB(0,0,0)，答案是黑色。'
      ].join('\n'),
    solvingSteps: [
      '先辨認 RGB 為紅、綠、藍三通道。',
      '套用亮度規則：0 代表該通道沒有亮度。',
      '檢查 RGB(0,0,0)：紅、綠、藍三通道全為 0，代表沒有光輸出。',
      '沒有光在加色模型中呈現黑色。',
      '排除透明，因為透明度需要 alpha channel，不是 RGB 三個數值能單獨表示。',
      '因此選 D 黑色。'
    ],
    optionExplanations: {
      A: '透明度屬於 alpha channel，不是 RGB 三個色彩值本身能表示的結果。',
      B: '白色通常是三通道皆為最大值，例如 RGB(255,255,255)。',
      C: '灰色通常是三通道相等且介於黑白之間，例如 RGB(128,128,128)。',
      D: 'RGB(0,0,0) 沒有紅、綠、藍光輸出，因此為黑色。'
    },
    keyTakeaways: [
      'RGB 是加色模型，數值代表紅、綠、藍三種光的亮度。',
      'RGB(0,0,0) 是黑色，因為三個通道都沒有光。',
      '透明度需 alpha channel，不由 RGB(0,0,0) 表示。',
      '常見陷阱是把黑色與透明混淆。'
    ],
    tags: ['rgb', 'additive-color']
  },
  23: {
    answerVerification: 'verified',
    answerNote: null,
    coreTerms: ['overfitting', '泛化能力', '訓練誤差', '測試誤差'],
    beginnerExplanation:
      [
        'overfitting 過擬合的前置觀念是模型不只要把訓練資料答對，還要能處理沒看過的新資料，這種能力叫泛化能力。訓練誤差衡量模型在訓練資料上的錯誤，測試誤差則衡量它在新資料上的錯誤。',
        '過擬合的規則是：模型把訓練資料的細節甚至雜訊學得太死，所以訓練誤差很低，但遇到測試資料或真實新資料時表現變差，測試誤差變高。這就是「訓練好、測試差」。',
        '本題常見陷阱是只看到訓練誤差低就以為模型很好。真正要判斷模型是否可靠，要看訓練誤差和測試誤差是否出現明顯落差；若只在訓練集漂亮，泛化能力可能很差。'
      ].join('\n'),
    solvingSteps: [
      '先抓住 overfitting 的關鍵：泛化能力差。',
      '檢查訓練誤差是否偏低。',
      '檢查測試誤差是否偏高。',
      '排除訓練與測試誤差都低的情況，因為那代表泛化良好。',
      '排除只說增加資料或忽略噪音的敘述，因為它們不是典型過擬合指標。',
      '選擇同時描述低訓練誤差與高測試誤差的選項。'
    ],
    optionExplanations: {
      A: '訓練與測試誤差都低代表泛化良好，不是典型過擬合。',
      B: '增加訓練資料通常有助於減少過擬合，並非一定導致過擬合。',
      C: '過擬合常見問題正是模型把噪音也學進去，而不是完全忽略噪音。',
      D: '訓練資料誤差低、測試資料誤差高，是過擬合最典型的表現。'
    },
    keyTakeaways: [
      '過擬合的核心是訓練好、測試差。',
      '泛化能力要用未見過的資料評估。',
      '訓練誤差低不代表模型一定好，還要看測試誤差。',
      '常見陷阱是把訓練集表現好誤認成模型已經能處理新資料。'
    ],
    tags: ['overfitting', 'generalization']
  },
  24: {
    answerVerification: 'verified',
    answerNote: '官方答案為 C；此題採典型 SMP 教材觀點，SMP 不以「任一 CPU 故障即整體停擺」作為其必要特性。',
    coreTerms: ['SMP', '共享主記憶體', '對稱多處理器'],
    beginnerExplanation:
      [
        'SMP 是 Symmetric Multiprocessing，前置觀念是多個處理器地位對稱，通常共享同一主記憶體，並由同一作業系統管理工作。對稱的意思是各 CPU 在系統中角色相近，不是主從架構。',
        'SMP 的優點是可以讓多個 CPU 平行處理工作，提高吞吐量；但因為共享主記憶體，多個 CPU 同時存取記憶體時，記憶體匯流排或控制器可能成為瓶頸。',
        '本題問何者有誤，常見陷阱是把「多 CPU 系統」想成任一 CPU 壞掉就必然整個系統停擺。典型 SMP 教材不把這點當成必要特性，反而常說可以降級運作或提升可靠性，因此 C 是錯誤敘述。'
      ].join('\n'),
    solvingSteps: [
      '先確認題目要求找錯誤敘述。',
      '辨認 SMP 的核心：多個 CPU 對稱、共享主記憶體，並由同一作業系統管理。',
      '檢查選項 A：多個 CPU 共享同一主記憶體，是 SMP 的典型特徵。',
      '檢查選項 B：多 CPU 共享記憶體時可能造成記憶體瓶頸，敘述合理。',
      '檢查選項 C：SMP 不要求任一 CPU 故障就必然導致整個系統停擺，這是錯誤敘述。',
      '檢查選項 D：多處理器可平行處理工作，提升處理能力，敘述合理。',
      '因此選 C。'
    ],
    optionExplanations: {
      A: 'SMP 的典型特徵是多個 CPU 共享同一主記憶體空間。',
      B: 'CPU 數增加後，記憶體匯流排或記憶體控制器可能成為競爭瓶頸。',
      C: 'SMP 的概念不要求任一 CPU 故障就使整個系統故障或停擺，常見教材反而會提到可提升可靠性或降級運作。',
      D: '多處理器可平行處理工作，提升吞吐量與處理能力。'
    },
    keyTakeaways: [
      'SMP 是 shared-memory multiprocessing，重點是多 CPU 對稱並共享主記憶體。',
      'SMP 可能受記憶體存取瓶頸限制。',
      '本題要選的是錯誤敘述，所以要找出不屬於 SMP 必要特性的說法。',
      '常見陷阱是以為多 CPU 中任一 CPU 故障就必然讓整個系統停擺。'
    ],
    tags: ['smp', 'shared-memory']
  },
  25: {
    answerVerification: 'verified',
    answerNote: '以基本 CPU 組成題型判斷，ALU、控制單元、暫存器是 CPU 核心組成；SRAM 是記憶體技術，雖可用於快取，但不是此題所問的基本組成元件。',
    coreTerms: ['ALU', '控制單元', 'Register', 'SRAM'],
    beginnerExplanation:
      [
        'CPU 基本組成的前置觀念是把 CPU 看成能取指令、控制流程、運算與暫存資料的核心。入門分類常列 ALU 算術邏輯單元、CU 控制單元，以及 Register 暫存器。',
        'ALU 負責算術與邏輯運算；控制單元負責解讀指令、協調資料流；Register 是 CPU 內部高速暫存位置，用來暫放運算中的資料或位址。',
        'SRAM 是 static random-access memory，屬於記憶體技術，常被用來實作快取 cache。常見陷阱是因為快取可能在 CPU 附近或 CPU 內部，就把 SRAM 當成 CPU 基本組成元件；但本題問的是基本 CPU 組成分類，因此 SRAM 不是答案中的核心元件。'
      ].join('\n'),
    solvingSteps: [
      '先列出 CPU 基本元件：ALU、控制單元、Register。',
      '檢查選項 A：ALU 負責算術與邏輯運算，屬於 CPU 核心元件。',
      '檢查選項 B：Control unit 負責指令控制與協調資料流，屬於 CPU 核心元件。',
      '檢查選項 C：Register 是 CPU 內部高速暫存器，屬於 CPU 核心元件。',
      '檢查選項 D：SRAM 是記憶體技術，可用於快取，但非屬基本 CPU 組成分類。',
      '題目要選非屬 CPU 組成元件者，因此選 D。'
    ],
    optionExplanations: {
      A: 'ALU 負責算術與邏輯運算，是 CPU 的核心元件。',
      B: 'Control unit 負責指令控制與協調資料流，是 CPU 的核心元件。',
      C: 'Register 用來保存 CPU 內部高速暫存資料，是 CPU 的核心元件。',
      D: 'SRAM 是記憶體技術名稱，可用於快取，但不是基本 CPU 組成分類中的 ALU、CU 或暫存器。'
    },
    keyTakeaways: [
      'CPU 基本組成常見為 ALU、控制單元、暫存器。',
      'SRAM 是記憶體技術，可用於快取實作。',
      '快取可能用 SRAM 實作，但題目問的是基本元件分類。',
      '常見陷阱是把實作材料或記憶體技術誤認成 CPU 功能單元。'
    ],
    tags: ['cpu-components']
  },
  26: {
    answerVerification: 'verified',
    answerNote: null,
    coreTerms: ['16-QAM', 'QPSK', 'bits per symbol', 'baud'],
    beginnerExplanation:
      [
        '調變題的前置觀念是 baud rate 符號率和 bit rate 資料率不同。baud 表示每秒送出多少個符號；每個符號能代表幾個 bit，才決定最後資料率。',
        'M-ary 調變的常用規則是 bits per symbol = log2(M)。16-QAM 有 16 種符號狀態，所以每個符號可帶 log2(16)=4 bits/symbol；QPSK 有 4 種符號狀態，所以每個符號可帶 log2(4)=2 bits/symbol。',
        '題目說相同符號率，也就是 baud 一樣，因此只要比較每符號 bit 數：4/2 = 2，所以 16-QAM 資料率是 QPSK 的 2 倍。常見陷阱是直接用星座點數 16/4 得 4 倍，但資料率要先取 log2。'
      ].join('\n'),
    solvingSteps: ['使用公式 bits per symbol = log2(M)。', '16-QAM：log2(16)=4 bits/symbol。', 'QPSK：log2(4)=2 bits/symbol。', '相同 baud 下比較 4/2 得 2 倍。'],
    optionExplanations: {
      A: '0.5 倍代表 16-QAM 較慢，但它每個符號承載 bit 數比 QPSK 多。',
      B: '兩者符號率相同時，每符號 bit 數不同，資料率不會相同。',
      C: '16-QAM 每符號 4 bits，QPSK 每符號 2 bits，比例為 2 倍。',
      D: '4 倍會把 16 與 4 的星座點數比例直接相除，但資料率要比較 log2 後的 bit 數。'
    },
    keyTakeaways: [
      'M-ary 調變每符號 bit 數為 log2(M)。',
      '16-QAM 是 4 bits/symbol，QPSK 是 2 bits/symbol。',
      '相同 baud rate 下，資料率比例可直接比較每符號 bit 數。',
      '常見陷阱是用 16/4 直接比較星座點數，而不是比較 log2(M)。'
    ],
    tags: ['qam', 'qpsk']
  },
  27: {
    answerVerification: 'verified',
    answerNote: null,
    coreTerms: ['CIDR', '/21', '/19', '路由聚合'],
    beginnerExplanation:
      [
        'CIDR 路由聚合的前置觀念是：多個連續網段若能剛好合成一個較大的位址區間，就可以用較短的 prefix 表示，減少路由表項目。',
        '/21 表示前 21 位是網路位址；在 57.6.x.0 這種寫法中，變化落在第三個 octet。/21 在第三個 octet 的區塊大小是 2^(24-21)=8，所以步進為 8：96、104、112、120 正好是連續四段。',
        '四段 /21 合起來大小是 8×4=32，因此要找第三個 octet 邊界為 32 的 prefix，也就是 /19。從 96 開始涵蓋到 127，聚合結果是 57.6.96.0/19。常見陷阱是只看第一個網段就選太小，或選 /18、/17、/16 導致涵蓋多餘網段。'
      ].join('\n'),
    solvingSteps: [
      '先計算 /21 在第三個 octet 的區塊大小：2^(24-21)=8。',
      '確認四個網段起點 96、104、112、120 正好每次增加 8，是連續四個 /21。',
      '四段合併大小為 8×4=32。',
      '第三 octet 的 32 邊界包含 0、32、64、96、128，因此 96 正好是 /19 邊界。',
      '用 /19 從 57.6.96.0 開始，涵蓋第三 octet 96 到 127，剛好包含原本四段。',
      '因此聚合為 57.6.96.0/19。'
    ],
    optionExplanations: {
      A: '57.6.96.0/19 覆蓋第三 octet 96-127，剛好包含四個 /21。',
      B: '/18 覆蓋範圍更大，會多包含 57.6.64.0 到 57.6.95.255。',
      C: '57.6.0.0/17 覆蓋 0-127；雖然也是 /19 以外的較短 prefix，但範圍遠大於原本四個網段。',
      D: '/16 範圍過大，且 57.6.96.0/16 不是標準網路位址表示。'
    },
    keyTakeaways: [
      '/21 在第三 octet 的步進為 8。',
      '四個連續 /21 的總大小是 32，因此可聚合成 /19。',
      '路由聚合要確認起點落在新 prefix 的邊界上。',
      '常見陷阱是選到涵蓋多餘網段的 /18、/17 或 /16。'
    ],
    tags: ['route-aggregation', 'subnetting']
  },
  28: {
    answerVerification: 'verified',
    answerNote: null,
    coreTerms: ['TCP flow control', 'receiver window', '接收端緩衝區'],
    beginnerExplanation:
      [
        'TCP flow control 的前置觀念是資料傳輸有兩端：傳送端負責送資料，接收端要把資料放進接收端緩衝區並交給應用程式處理。如果傳送端送太快，接收端緩衝區可能被塞滿。',
        '流量控制的規則是保護接收端。TCP 透過 receiver window 接收視窗告訴傳送端：「我目前還能收多少資料」。傳送端依這個視窗調整送出量，避免把接收端緩衝區灌爆。',
        '本題常見陷阱是把 flow control 流量控制和 congestion control 壅塞控制混淆。congestion control 保護的是網路中間路徑，避免路由器與鏈路壅塞；flow control 保護的是接收端處理能力與緩衝區。'
      ].join('\n'),
    solvingSteps: [
      '先區分 flow control 與 congestion control。',
      'flow control 看接收端處理能力與接收端緩衝區是否承受得住。',
      'congestion control 看網路中間路徑是否壅塞，不是本題核心。',
      '檢查選項 A：擁塞崩潰屬於壅塞控制議題。',
      '檢查選項 D：傳送端塞爆接收端緩衝區，正是 TCP flow control 要避免的問題。',
      '因此選 D。'
    ],
    optionExplanations: {
      A: '擁塞崩潰屬於網路壅塞控制要處理的問題，不是 TCP 流量控制的主要目標。',
      B: '連線飢餓不是 TCP flow control 的標準目的。',
      C: 'RTT 上升可能與路徑延遲或壅塞相關，不是接收視窗機制直接要避免的核心問題。',
      D: 'TCP 流量控制透過接收視窗避免傳送端塞爆接收端緩衝區。'
    },
    keyTakeaways: [
      'TCP flow control 保護接收端，避免傳送端送超過接收端能處理的量。',
      'receiver window 接收視窗是流量控制的重要機制。',
      'TCP congestion control 保護網路路徑，和 flow control 不是同一件事。',
      '常見陷阱是看到壅塞、RTT 上升就誤選 congestion control 類問題。'
    ],
    tags: ['flow-control', 'receiver-window']
  },
  29: {
    answerVerification: 'verified',
    answerNote: '官方答案為 A；C 可理解為 ARP suppression/offload 類機制減少裝置因廣播封包被喚醒的需求。',
    coreTerms: ['Wi-Fi power saving', 'Beacon/TIM', 'ARP suppression', 'TWT', 'PS-Poll', 'STP BPDU'],
    beginnerExplanation:
      [
        'Wi-Fi power saving 的前置觀念是：無線站台如果一直開著接收器，就會消耗很多電。省電模式會讓睡眠站台在大部分時間關閉接收，只在約定或被通知的時間醒來檢查 AP 是否有資料要交給它。',
        '規則來源來自 802.11 的省電流程：AP 會用 Beacon/TIM 告訴睡眠站台是否有緩衝資料；Legacy PS 可用 PS-Poll 讓站台醒來後向 AP 要資料；TWT 則能預約更明確的醒來時間。ARP suppression、proxy ARP 或 ARP offload 的想法，是減少廣播 ARP 讓裝置不必要醒來。',
        '本題問「未涉及」時，重點不是找看起來像網路名詞的選項，而是判斷它是否屬於 Wi-Fi 用戶端省電。STP BPDU 是橋接器或交換器為了避免 Layer 2 迴圈所交換的生成樹控制訊息，不是讓 Wi-Fi 睡眠站台醒來或少醒來的機制。常見陷阱是看到 BPDU 也是鏈路層控制訊息，就誤以為它和 802.11 省電同類。'
      ].join('\n'),
    solvingSteps: [
      '先讀清楚題目問「未涉及」，所以要找不是 Wi-Fi power saving 的選項。',
      '檢查 B：Beacon/TIM 是 AP 通知睡眠站台是否有緩衝資料的典型機制，屬於 Wi-Fi 省電。',
      '檢查 D：TWT 與 Legacy PS/PS-Poll 都是在安排站台何時醒來或如何取回資料，屬於 Wi-Fi 省電。',
      '檢查 C：ARP suppression/offload 可減少廣播 ARP 造成的喚醒，雖然不是每題都會細分實作名稱，但可歸入省電相關作法。',
      '檢查 A：STP BPDU 是交換器生成樹協定訊息，用來避免橋接迴圈，和睡眠站台、Beacon/TIM、PS-Poll 或 TWT 無關。',
      '因此答案選 A。'
    ],
    optionExplanations: {
      A: 'STP BPDU 屬於橋接器/交換器的生成樹協定控制訊息，目的是避免交換網路迴圈，不是 Wi-Fi power saving 的典型做法。',
      B: 'Beacon/TIM 會通知睡眠站台 AP 是否暫存了待收資料，是 802.11 省電流程的重要提示機制。',
      C: 'ARP suppression、proxy ARP 或 ARP offload 可減少裝置因 ARP 廣播而醒來，與降低無線裝置耗電有關。',
      D: 'TWT 與 Legacy PS/PS-Poll 都和安排醒來時間或醒來後取資料有關，是 Wi-Fi 省電相關機制。'
    },
    keyTakeaways: [
      'Wi-Fi 省電的核心是讓睡眠站台少開接收器，並用 Beacon/TIM、PS-Poll 或 TWT 協調醒來時間。',
      'ARP suppression/offload 的省電價值在於減少廣播封包造成的不必要喚醒。',
      'STP BPDU 是交換網路生成樹控制訊息，目標是避免 Layer 2 迴圈，不是 Wi-Fi 省電。',
      '常見陷阱是把所有鏈路層控制訊息都當成 802.11 power saving；要回到「是否幫睡眠站台少醒來或按時醒來」判斷。'
    ],
    tags: ['power-saving', '802.11']
  },
  30: {
    answerVerification: 'verified',
    answerNote: null,
    coreTerms: ['IPv4 fragmentation', 'MTU', 'IP header', 'payload', '8-byte boundary'],
    beginnerExplanation:
      [
        'IPv4 fragmentation 的前置觀念是：一個封包如果大於下一段鏈路可承載的 MTU，就必須拆成多個 IP 片段。MTU 包含 IP header，不是只算資料本身，所以每片真正能放的 payload 要先用 MTU 扣掉 header。',
        '本題的規則來源是「每個 IP 片段都要有自己的 IP header」。因此 MTU=1500B、IP header=20B 時，單一片段最多可放的資料量是 1500-20=1480B。題目說 2300B 是負載 payload，所以第一片放 1480B，剩下 2300-1480=820B。',
        '剩下的 820B 加上自己的 20B header 會是 840B，沒有超過 MTU 1500B，所以第二片就放得下，總共 2 個片段。常見陷阱是直接用 2300/1500、忘記每片都有 IP header，或沒有注意 IPv4 中除了最後一片外，fragment payload 通常要以 8-byte boundary 對齊；本題的 1480B 可以被 8 整除，所以第一片大小合法。'
      ].join('\n'),
    solvingSteps: [
      '先確認題目給的是 2300B payload，不包含 IP header。',
      '每個片段都需要 IP header，所以每片 payload 上限是 1500-20=1480B。',
      '第一片放滿 1480B，剩餘 payload 為 2300-1480=820B。',
      '檢查 8-byte boundary：1480 可被 8 整除，因此作為非最後片段的 payload 長度合法。',
      '820B 剩餘 payload 加上自己的 20B header 為 840B，小於 MTU 1500B，所以第二片可裝完。',
      '因此總片段數是 2。'
    ],
    optionExplanations: {
      A: '2300B 負載可拆成 1480B 與 820B 兩個 payload 區段，也就是 2 個 IP 片段。',
      B: '需要 3 片代表每片可承載負載小於約 767B，但本題每片可承載 1480B。',
      C: '4 片遠超過實際需要，沒有正確扣除 MTU 可承載量。',
      D: '5 片更不符合 1480B 的單片負載上限。'
    },
    keyTakeaways: [
      'MTU 包含 IP header，所以分片計算要先扣 header 才能得到每片 payload 上限。',
      '每個 IP 片段都有自己的 IP header，不能只在第一片計算 header。',
      '除最後一片外，IPv4 fragment payload 長度需符合 8-byte boundary；本題 1480 可整除 8。',
      '常見陷阱是直接拿 payload 除以 MTU，或忘記最後一片只要剩餘資料能放下即可。'
    ],
    tags: ['fragmentation', 'mtu']
  },
  31: {
    answerVerification: 'verified',
    answerNote: null,
    coreTerms: ['PMTUD', 'DF bit', 'ICMP Fragmentation Needed', 'Path MTU', '瓶頸 MTU'],
    beginnerExplanation:
      [
        'PMTUD(Path MTU Discovery) 的前置觀念是：端到端路徑會經過多段鏈路，每一段可能有不同 MTU；整條路徑能安全通過的最大封包大小，會被其中最小的那段限制，這段限制常稱為瓶頸 MTU 或 Path MTU。',
        'DF bit 的規則是：IPv4 封包若設定 DF=1，代表 Do Not Fragment，路由器不能替這個封包分片。當某台路由器發現下一段鏈路 MTU 小於封包大小時，它既不能轉送原封包，也不能分片，只能丟棄並回報錯誤。',
        'PMTUD 的關鍵回饋就是 ICMP Fragmentation Needed，讓來源端知道「封包太大，而且因 DF=1 不能分片」，接著來源端再降低封包大小或 TCP MSS。常見陷阱是把它和 ICMP Time Exceeded 混在一起；Time Exceeded 是 TTL 歸零常用於 traceroute，不是 MTU 太小的回饋。'
      ].join('\n'),
    solvingSteps: [
      '先看到 DF=1，判斷中途路由器不能分片這個 IP 封包。',
      '再看題目說路徑 MTU 低於封包大小，代表某段鏈路出現瓶頸 MTU。',
      '因為封包太大但又不能分片，路由器必須丟棄封包並回 ICMP Fragmentation Needed 給來源端。',
      '來源端收到回饋後，才會調小後續封包大小或 TCP MSS，這就是 PMTUD 的回饋迴路。',
      '排除 Time Exceeded，因為它處理 TTL 歸零；排除 TCP RST 與 ARP，因為它們不回報路徑 MTU。'
    ],
    optionExplanations: {
      A: 'TCP RST 是 TCP 連線重設，不是路由器通知 MTU 太小的機制。',
      B: 'ICMP Time Exceeded 主要用於 TTL 歸零，例如 traceroute，不是 PMTUD 的核心回饋。',
      C: 'ICMP Fragmentation Needed 表示 DF 封包太大、路由器不能分片，並用來通知來源端路徑上的瓶頸 MTU 問題。',
      D: 'ARP 只在區域網路中解析 IP 對應的 MAC 位址，與路徑 MTU 探測無關。'
    },
    keyTakeaways: [
      'DF=1 代表中途路由器不得分片；封包太大時只能丟棄並回報。',
      'PMTUD 靠 ICMP Fragmentation Needed 或 IPv6 Packet Too Big 得知瓶頸 MTU。',
      '來源端收到回饋後要降低封包大小或 TCP MSS，避免再次超過 Path MTU。',
      '常見陷阱是把 ICMP Time Exceeded、TCP RST 或 ARP 當成 MTU 探測回饋。'
    ],
    tags: ['pmtud', 'mtu']
  },
  32: {
    answerVerification: 'verified',
    answerNote: null,
    coreTerms: ['ping', 'traceroute', 'ICMP Echo', 'TTL', 'RTT'],
    beginnerExplanation:
      [
        'ping 的前置觀念是「我能不能到達目標主機」。典型 ping 會送 ICMP Echo Request，若目標回 ICMP Echo Reply，就表示至少有一條路徑讓封包往返成功，並可計算 RTT(round-trip time) 也就是往返延遲。',
        'traceroute 的前置觀念是 TTL：IP 封包每經過一台路由器，TTL 會減 1；TTL 變 0 時，路由器會回 ICMP Time Exceeded。traceroute 讓 TTL 從 1、2、3 逐步增加，觀察每一跳誰回應，藉此推估沿途節點。',
        '所以本題的規則是：ping 主要測可達性與延遲，traceroute 主要推估路徑節點。常見陷阱是把 ping 說成列路徑，或把 traceroute 簡化成固定只用某一種傳輸層協定；不同系統可用 UDP、ICMP 或 TCP 探測，但目的仍是逐跳觀察。'
      ].join('\n'),
    solvingSteps: [
      '先看 ping：它常用 ICMP Echo Request/Reply，重點是目標是否回應與 RTT。',
      '再看 traceroute：它操控 TTL，讓沿途路由器逐跳回應，藉此推估沿途節點。',
      '檢查 A：把 ping 說成測路徑、traceroute 說成測延遲，剛好相反。',
      '檢查 B：前者測可達性，後者推路徑節點，符合兩個工具的核心目的。',
      '檢查 C：ping 通常用 ICMP，traceroute 在不同系統可用 UDP、ICMP 或 TCP，不能說前者 TCP 後者 UDP。',
      '檢查 D：兩者不能用應用層與傳輸層這種說法區分，因此答案選 B。'
    ],
    optionExplanations: {
      A: '相反了；ping 不是用來列出路徑，traceroute 才是推估路徑節點。',
      B: 'ping 測可達性，traceroute 推估沿途節點。',
      C: 'ping 通常用 ICMP，traceroute 可用 UDP、ICMP 或 TCP，不能簡化成前者 TCP 後者 UDP。',
      D: '兩者不是用應用層與傳輸層這種方式區分。'
    },
    keyTakeaways: [
      'ping 重點是可達性與 RTT，常見基礎機制是 ICMP Echo Request/Reply。',
      'traceroute 重點是用 TTL 逐步增加來觀察路徑上的每一跳。',
      'traceroute 的探測封包型態會依作業系統與參數不同，可能是 UDP、ICMP 或 TCP。',
      '常見陷阱是用「用了哪個協定」取代「工具目的」；考題通常先問目的差異。'
    ],
    tags: ['ping', 'traceroute']
  },
  33: {
    answerVerification: 'verified',
    answerNote: null,
    coreTerms: ['CSMA/CD', 'collision', 'binary exponential backoff', 'half-duplex Ethernet'],
    beginnerExplanation:
      [
        'CSMA/CD 的前置觀念是傳統共享式半雙工 Ethernet：多台設備共用同一條媒介，同一時間若兩台一起送，就可能發生 collision 碰撞。CSMA/CD 代表先聽媒介(Carrier Sense)、多人存取(Multiple Access)、並在傳送時做碰撞偵測(Collision Detection)。',
        '碰撞偵測到之後不能所有設備立刻重送，因為大家同時重送又會再次碰撞。標準做法是二元指數退避(binary exponential backoff)，也就是每次碰撞後用隨機等待時間再嘗試，而且碰撞次數越多，可能等待的時間範圍越大。',
        '本題問「碰撞後避免再次碰撞」時，核心就是找出這個退避規則。常見陷阱是把其他媒體存取方法混進來：Token passing 是令牌網路，TDMA 是時間槽分配，RTS/CTS 是 Wi-Fi 常見的避免碰撞流程，都不是 CSMA/CD 碰撞後的退避機制。'
      ].join('\n'),
    solvingSteps: [
      '先辨識 CSMA/CD 是傳統共享式半雙工 Ethernet 的碰撞偵測機制。',
      '題目問碰撞後如何避免再次碰撞，所以要找「重傳前先等一段時間」的規則。',
      'binary exponential backoff 會在碰撞後擴大隨機等待範圍，讓各站不容易同時再次重傳。',
      '令牌傳遞、TDMA、RTS/CTS 都是不同媒體存取或無線協調方法，不是 CSMA/CD 的碰撞後處理。',
      '因此答案選 A。'
    ],
    optionExplanations: {
      A: '二元指數退避會在碰撞次數增加時擴大隨機等待範圍，降低各站同時重傳造成再次碰撞的機率。',
      B: '令牌傳遞是 Token Ring 類型的媒體存取方式，不是乙太網路 CSMA/CD 的退避機制。',
      C: 'TDMA 以時間槽分配傳輸機會，不是碰撞後的乙太網路退避。',
      D: 'RTS/CTS 常見於 Wi-Fi 緩解隱藏節點，不是 CSMA/CD 碰撞後處理。'
    },
    keyTakeaways: [
      'CSMA/CD 屬於傳統共享式半雙工 Ethernet 情境，現代交換式全雙工乙太網路通常不使用它。',
      '碰撞後用 binary exponential backoff 再重傳，重點是隨機等待且範圍會隨碰撞次數擴大。',
      'Token passing、TDMA、RTS/CTS 分別屬於不同媒體存取或無線協調概念。',
      '常見陷阱是只看到「避免碰撞」就選 RTS/CTS；但本題限定 CSMA/CD 碰撞後機制。'
    ],
    tags: ['csma-cd', 'backoff']
  },
  34: {
    answerVerification: 'needs-review',
    answerNote: 'PDF 與 raw data 均標示答案 B；概念上 B 是最直接答案。不過 C「只在半雙工會」也是一般正確敘述，與 B 有語意重疊，建議人工確認是否接受此選項設計。',
    coreTerms: ['full-duplex Ethernet', 'collision domain', 'switch', 'half-duplex'],
    beginnerExplanation:
      [
        '乙太網路碰撞的前置觀念是 collision domain 碰撞域：如果多台設備共用同一個半雙工媒介，同一時間傳送就可能互相干擾，形成碰撞。傳統 CSMA/CD 就是為這種共享式半雙工環境設計。',
        'switch 交換器上的 full-duplex Ethernet 通常是每台主機和 switch port 形成點對點連線，而且全雙工代表傳送與接收可同時進行，不需要像共享媒介那樣爭用同一條線。因此在題目指定「交換器、全雙工連線」時，標準結論是網卡傳送時不會發生線上碰撞。',
        '本題常見陷阱是沒有分清題目問的是具體情境還是一般規則。B「不會」直接回答全雙工 switch 情境；C「只在半雙工會」在概念上也合理，所以本資料保留 needs-review，提醒此選項設計與 B 有重疊，應以正式答案與人工審查為準。'
      ].join('\n'),
    solvingSteps: [
      '先鎖定題目條件：switch、full-duplex Ethernet、網卡傳送。',
      '套用碰撞域規則：共享式 half-duplex 才需要爭用媒介並可能碰撞。',
      '套用全雙工點對點規則：主機與 switch port 可同時收送，不再形成傳統共享碰撞域。',
      '因此 B「不會」是對本題指定情境最直接的答案。',
      '再檢查 C：只在半雙工會碰撞是一般正確觀念，但它和 B 有語意重疊，所以本題標成 needs-review 而不是完全無疑義。'
    ],
    optionExplanations: {
      A: '全雙工交換式乙太網路不會像共享式半雙工網段那樣產生碰撞。',
      B: '全雙工與點對點交換器連線消除了傳統碰撞域。',
      C: '概念上 half-duplex 才可能有傳統乙太網路碰撞，但題目問的是指定 full-duplex switch 情境是否仍會碰撞，B 較直接；此選項與 B 有重疊疑慮。',
      D: 'VLAN 間是否轉送屬於邏輯分段與路由問題，不是乙太網路碰撞發生條件。'
    },
    keyTakeaways: [
      '全雙工交換式乙太網路不使用碰撞作為正常媒體存取現象。',
      '碰撞域是共享式半雙工乙太網路的核心概念；switch full-duplex point-to-point 會消除傳統碰撞域。',
      'VLAN 分隔廣播域，不是造成碰撞的條件。',
      'needs-review 表示本題 B 與 C 有語意重疊；考試時先依官方答案作答，學習時要記住條件是 full-duplex switch。',
      '常見陷阱是把「半雙工才有碰撞」和「本題指定全雙工是否會碰撞」當成完全不同答案。'
    ],
    tags: ['full-duplex', 'collision-domain']
  },
  35: {
    answerVerification: 'verified',
    answerNote: null,
    coreTerms: ['hidden node', 'RTS', 'CTS', 'ACK', 'CSMA/CA', 'NAV'],
    beginnerExplanation:
      [
        'Wi-Fi hidden node 隱藏節點的前置觀念是：兩個無線站彼此聽不到對方的訊號，但它們都能送到同一個 AP。於是 A 站以為空中媒介是空的、B 站也以為是空的，兩者同時傳給 AP 時，就可能在 AP 端碰撞。',
        'RTS/CTS 的規則是先預約媒介：傳送端送 RTS(Request To Send)，AP 或接收端回 CTS(Clear To Send)，其他聽到 CTS 或相關控制訊框的站台會依 NAV 之類的保留時間暫停傳送。資料送完後，ACK 用來確認接收成功。',
        '本題問常用流程時，答案是 RTS/CTS/ACK。常見陷阱是選 CSMA/CD，因為它是有線乙太網路的碰撞偵測；Wi-Fi 半雙工無線環境很難一邊傳一邊偵測碰撞，所以採 CSMA/CA，也就是盡量避免碰撞，而不是像 CSMA/CD 那樣偵測碰撞。'
      ].join('\n'),
    solvingSteps: [
      '先辨識隱藏節點：兩個站彼此聽不到，但都能影響同一個 AP。',
      '因為彼此聽不到，只靠一般載波感測不一定知道對方要傳，所以需要先預約空中媒介。',
      'RTS 先提出傳送請求，CTS 回覆允許，周邊站台聽到後暫停，降低同時送到 AP 的機率。',
      'ACK 則在資料傳輸後確認接收成功，形成 RTS/CTS/ACK 流程。',
      '排除 CSMA/CD，因為 Wi-Fi 使用 CSMA/CA 避免碰撞，不是像有線半雙工乙太網路那樣做碰撞偵測。',
      '因此答案選 A。'
    ],
    optionExplanations: {
      A: 'RTS/CTS 透過預約媒介降低隱藏節點同時傳送的機率，ACK 用來確認資料成功接收。',
      B: 'CSMA/CD 是有線乙太網路碰撞偵測，Wi-Fi 無法邊傳邊有效偵測碰撞。',
      C: '令牌環是 Token Ring 的媒體存取方式，不是 Wi-Fi 隱藏節點解法。',
      D: 'MIMO 提升無線傳輸容量與可靠性，但不是典型的隱藏節點控制流程。'
    },
    keyTakeaways: [
      '隱藏節點問題發生在無線站彼此聽不到、卻都能傳到同一個 AP 時。',
      'RTS/CTS 透過預約媒介降低碰撞，ACK 則確認資料幀接收成功。',
      'Wi-Fi 使用 CSMA/CA 避免碰撞，而非有線乙太網路的 CSMA/CD 碰撞偵測。',
      '常見陷阱是看到 collision 就套 CSMA/CD；隱藏節點題目要回到無線站彼此聽不到的場景。'
    ],
    tags: ['hidden-node', 'rts-cts']
  },
  36: {
    answerVerification: 'verified',
    answerNote: null,
    coreTerms: ['HTTP stateless', 'Cookies', 'session id', 'request/response'],
    beginnerExplanation:
      [
        'HTTP stateless 無狀態的前置觀念是：HTTP request/response 原本是一來一回的獨立交換。伺服器收到下一個 request 時，協定本身不會自動記得「這就是剛剛登入的那個使用者」。',
        'Cookies 的規則是伺服器可在 response 要瀏覽器保存一小段資料，瀏覽器之後對同一網站發出後續請求時會把 Cookie 帶回去。實務上 Cookie 常放 session id，伺服器再用這個 id 查到使用者登入狀態、購物車或偏好設定。',
        '所以本題問維持使用者狀態，答案是 Cookies。常見陷阱是把底層網路機制當成 Web 狀態管理：ARP cache 只記 IP 對 MAC，NAT 只做位址/連接埠轉換，STP 防止交換網路迴圈，都不能讓 Web 伺服器辨認同一個使用者 session。'
      ].join('\n'),
    solvingSteps: [
      '先理解 HTTP 每個 request 原本彼此獨立，這就是無狀態。',
      '若要維持登入狀態，需要讓瀏覽器在後續請求帶回可識別使用者或 session 的資料。',
      'Cookie 可以由伺服器設定，並在後續 request 自動帶回，常見內容是 session id。',
      '檢查 B：Cookies 正是瀏覽器與伺服器常用的狀態維持機制。',
      '排除 ARP、NAT、STP，因為它們分別是位址解析、位址轉換、交換網路迴圈防止，和 Web 使用者狀態無關。'
    ],
    optionExplanations: {
      A: 'ARP Cache 儲存 IP 與 MAC 對應，不能維持 Web 使用者狀態。',
      B: 'Cookies 可在 HTTP 後續請求中攜帶 session id 或狀態資訊，讓伺服器把多次請求關聯到同一個使用者。',
      C: 'NAT 轉換內外部位址與連接埠，不是 Web 應用的使用者狀態機制。',
      D: 'STP 防止交換網路迴圈，與 HTTP session 無關。'
    },
    keyTakeaways: [
      'HTTP 本身是無狀態協定，每個 request/response 不會自動保存使用者記憶。',
      'Cookies 常用來讓瀏覽器在後續請求帶回 session id，伺服器再查 session 狀態。',
      '狀態管理屬於 Web 應用層設計，不能用 ARP、NAT、STP 取代。',
      '常見陷阱是看到「維持連線或位址」就選 NAT；但題目問的是使用者狀態，不是網路位址轉換。'
    ],
    tags: ['cookies', 'state-management']
  },
  37: {
    answerVerification: 'verified',
    answerNote: null,
    coreTerms: ['DNS iterative query', 'referral', 'recursive query', 'authoritative answer', 'root/TLD/authoritative servers'],
    beginnerExplanation:
      [
        'DNS iterative query 的前置觀念是 DNS 命名空間有層級：root、TLD，例如 .com 或 .tw，以及真正管理某個網域的 authoritative server。查詢端不一定一開始就問到最終答案，因此需要逐層找。',
        'iterative 的規則是：被問到的 DNS server 不替你一路查到底，而是回 referral，也就是「我不知道最終答案，但你下一位詢問誰」。查詢端拿著 referral 再去問下一層，逐步從 root 問到 TLD，再到 authoritative server。',
        'recursive query 則不同：查詢端要求某台 resolver 代查到底，最後把結果交回來。常見陷阱是把 root server 想成會遞迴解到底，或以為 iterative 的每個回應永遠都是 authoritative answer；其實中途多半只是 referral。'
      ].join('\n'),
    solvingSteps: [
      '先看題目問 iterative query，核心是查詢端逐層詢問，而不是伺服器代查到底。',
      '檢查 A：由 root 伺服器遞迴解到底是 recursive query 的想像，不是 iterative。',
      '檢查 B：iterative 過程中的 referral 不一定是 authoritative answer，可能只是下一步該問誰。',
      '檢查 C：DNS 常見查詢多用 UDP 53，TCP 53 用於區域傳送或回應過大等情境，不能拿 TCP 53 定義 iterative。',
      '檢查 D：由客戶端逐層查詢，伺服器回應「下一位詢問誰」資訊，正是 referral 與 iterative query 的特徵。',
      '因此答案選 D。'
    ],
    optionExplanations: {
      A: '根伺服器通常回覆 TLD 伺服器 referral，不會遞迴解到底。',
      B: 'iterative 過程中的 referral 不一定是最終權威答案。',
      C: 'DNS 查詢常用 UDP 53，TCP 53 用於大型回應、區域傳送等情境。',
      D: '查詢端逐層詢問，伺服器提供下一步查詢資訊。'
    },
    keyTakeaways: [
      'Iterative query 的核心是 referral：伺服器告訴查詢端下一步問誰。',
      'Recursive query 是要求 resolver 代為查到底，和 iterative 的責任分工不同。',
      'authoritative answer 通常來自權威伺服器；中途 referral 不等於最終權威答案。',
      '常見陷阱是把 DNS 53 port、TCP/UDP 運輸方式，誤當成 iterative query 的定義。'
    ],
    tags: ['iterative-query', 'dns-resolution']
  },
  38: {
    answerVerification: 'verified',
    answerNote: null,
    coreTerms: ['Open Resolver', 'recursive resolver', 'DNS amplification', 'HTTPS certificate validation'],
    beginnerExplanation:
      [
        'Open Resolver 的前置觀念是 recursive resolver 本來應該只替受信任的客戶端做遞迴查詢。如果它對外開放遞迴，任何網際網路來源都能請它查 DNS，這就形成可被濫用的服務。',
        '常見風險包含 DNS amplification 放大攻擊：攻擊者偽造受害者來源位址，讓 resolver 把較大的 DNS 回應送到受害者；也可能洩漏查詢紀錄、快取線索，或被拿來探測內部名稱。這些都和「對外開放遞迴」直接相關。',
        '但 HTTPS 中間人攻擊自動成功不是 Open Resolver 本身的直接結果。就算 DNS 被錯誤導向，瀏覽器仍會做 HTTPS certificate validation 憑證驗證；要讓 MITM 成功，通常還需要使用者信任錯誤憑證、憑證被盜、CA 信任鏈被破壞等額外條件。常見陷阱是把 DNS 解析風險誇大成 TLS 憑證驗證自動失效。'
      ].join('\n'),
    solvingSteps: [
      '先抓題目關鍵字「非屬」，表示要找不是 DNS Open Resolver 弱點直接造成的風險。',
      '檢查 A：對外開放遞迴可被用於 DNS amplification DDoS，屬於風險。',
      '檢查 B：查詢紀錄、快取或解析行為可能洩漏內部資訊，屬於風險。',
      '檢查 D：攻擊者可能利用 resolver 嘗試偵測內部名稱，屬於風險。',
      '檢查 C：HTTPS MITM 自動成功還會被 HTTPS certificate validation 擋下，除非憑證信任也被破壞，所以不是 Open Resolver 的直接風險。',
      '因此答案選 C。'
    ],
    optionExplanations: {
      A: '開放遞迴 DNS 可被拿來做 DNS amplification DDoS。',
      B: '若解析器暴露內部查詢或快取行為，可能洩漏內部解析資訊。',
      C: 'Open Resolver 不會讓 HTTPS 中間人攻擊自動成功，瀏覽器仍會進行 HTTPS certificate validation 憑證驗證。',
      D: '攻擊者可能透過可查詢的 resolver 嘗試探測內部名稱。'
    },
    keyTakeaways: [
      'Open Resolver 最大風險之一是 DNS amplification DDoS，因為外部攻擊者可濫用遞迴查詢服務。',
      'Open Resolver 也可能造成內部解析紀錄洩漏或內部名稱探測。',
      'DNS 風險不等於 HTTPS certificate validation 自動失效；TLS 憑證驗證仍是另一層防線。',
      '常見陷阱是把 DNS 被導錯和 HTTPS MITM 自動成功畫上等號；安全題要分清楚攻擊前提。'
    ],
    tags: ['open-resolver', 'ddos-amplification']
  },
  39: {
    answerVerification: 'verified',
    answerNote: null,
    coreTerms: ['DDoS', 'blackholing', 'sinkholing', 'traffic diversion'],
    beginnerExplanation:
      [
        'DDoS 的前置觀念是攻擊者用大量流量塞爆目標或網路路徑。防護時常見目標不是「把攻擊者登入擋掉」，而是先處理流量本身，避免核心網路、其他客戶或關鍵服務一起被拖垮。',
        'blackholing 的規則是把特定惡意流量或目的路由導向黑洞，實際效果偏向丟棄流量。sinkholing 則是把惡意流量導到受控位置，讓防護方可以收容、觀察、分析或阻斷。兩者都屬於 traffic diversion 導流/處置策略。',
        '本題問主要目的時，應選「將惡意流量導走/收容解析」。常見陷阱是把所有安全機制都往加密、零信任或多因素驗證套；那些是機密性或存取控制手段，不能直接吸收或導走大量 DDoS 流量。'
      ].join('\n'),
    solvingSteps: [
      '先辨識 blackholing 的重點是把流量導向黑洞或丟棄。',
      '再辨識 sinkholing 的重點是把惡意流量導向受控收容點，方便觀察或分析。',
      '兩者共同點是 traffic diversion：把攻擊流量導走、丟棄或收容，而不是改登入驗證。',
      '檢查 A：加密保護內容機密性，不能直接處理 DDoS 大量流量。',
      '檢查 C：零信任是存取控制架構，不是 blackholing/sinkholing 的目的。',
      '檢查 D：多因素驗證保護帳號登入，不能收容或丟棄攻擊流量，因此答案選 B。'
    ],
    optionExplanations: {
      A: '加密流量不能直接阻止 DDoS 流量淹沒目標。',
      B: 'blackholing/sinkholing 的目的就是將惡意流量導走、丟棄或導到受控環境收容解析。',
      C: '零信任是存取控制架構，不是黑洞或水坑流量處置的主要目的。',
      D: '多因素驗證提升帳號安全，不能處理大量攻擊流量。'
    },
    keyTakeaways: [
      'Blackholing 偏向把攻擊流量導向丟棄路徑，先避免網路被拖垮。',
      'Sinkholing 偏向把惡意流量導向受控環境，用於收容、觀察或分析。',
      'DDoS 防護重點常是流量清洗、導流、丟棄與容量吸收，不只是身分驗證。',
      '常見陷阱是把加密、零信任、MFA 這些安全名詞誤當成 DDoS 流量處置策略。'
    ],
    tags: ['blackholing', 'sinkholing']
  },
  40: {
    answerVerification: 'verified',
    answerNote: null,
    coreTerms: ['Round Robin', 'Weighted Round Robin', 'weight', 'load balancer'],
    beginnerExplanation:
      [
        'load balancer 負載平衡器的前置觀念是：前端收到請求後，要決定把每個請求分給哪一台後端伺服器。分派演算法負責決定「下一個請求給誰」，而不是決定負載平衡器支不支援哪些額外功能。',
        'Round Robin 的規則是輪流分派，像 A、B、C、A、B、C，假設每台後端容量大致相同。Weighted Round Robin 則加入 weight 權重，例如伺服器 A 權重 3、B 權重 1，就讓 A 依比例拿到更多請求，反映硬體容量或可承受負載不同。',
        '因此本題差異是是否考量伺服器權重。常見陷阱是看到 SSL 終結、L7 規則、健康檢查都像負載平衡器功能就選下去；但它們是產品能力或輔助機制，不是 Round Robin 與 Weighted Round Robin 這兩種分派演算法的本質差異。'
      ].join('\n'),
    solvingSteps: [
      '先確認 Round Robin 是不看容量差異的輪流分派。',
      '再確認 Weighted Round Robin 會看 weight 權重，權重高的伺服器分到更多流量。',
      '檢查 A：是否考量伺服器權重，正是 RR 與 WRR 的差異。',
      '檢查 B：SSL 終結是負載平衡器處理 TLS 的功能，不是 RR/WRR 差異。',
      '檢查 C：L7 規則是依 HTTP path、header 等條件路由，和是否加權不同。',
      '檢查 D：健康檢查可搭配多種演算法使用，不是這兩種演算法的本質差異。'
    ],
    optionExplanations: {
      A: '兩者主要差異就是是否考量伺服器權重；Weighted Round Robin 會讓權重較高或容量較大的節點拿到更多請求。',
      B: 'SSL 終結是負載平衡器功能，與 RR/WRR 演算法差異無直接關係。',
      C: 'L7 規則是應用層路由能力，不是 Round Robin 是否加權的差異。',
      D: '健康檢查可搭配多種演算法使用，不是 RR 與 WRR 的本質差異。'
    },
    keyTakeaways: [
      'Round Robin 假設節點容量大致相近，依序輪流分派。',
      'Weighted Round Robin 依 weight 權重比例分派，適合後端容量不同的情境。',
      'SSL 終結、L7 規則、健康檢查是負載平衡器功能或輔助能力，不是 RR/WRR 的差異核心。',
      '常見陷阱是把「負載平衡器能做什麼」和「分派演算法如何選節點」混在一起。'
    ],
    tags: ['round-robin', 'weighted-round-robin']
  },
  41: {
    answerVerification: 'verified',
    answerNote: null,
    coreTerms: ['Session Stickiness', 'session affinity', 'load balancer', 'stateful backend'],
    beginnerExplanation:
      [
        '負載平衡環境的前置觀念是：同一個網站背後可能有多台後端伺服器，load balancer 會把請求分派給其中一台。如果應用是 stateful backend，也就是登入狀態、購物車或暫存資料只存在某一台後端，使用者下一個請求被分到另一台就可能讀不到 session。',
        'Session Stickiness 又稱 session affinity，規則是讓同一使用者在一段時間內持續被導到同一台後端。常見作法包含 load balancer 設定 cookie、用 source IP hash，或其他能辨識同一使用者的黏著策略。',
        '本題問避免會話在多台伺服器間漂移造成異常，答案就是 Session Stickiness。常見陷阱是選 HSTS、HPKP、OCSP Stapling，因為它們都是 HTTPS 或憑證相關安全機制，但不負責決定「這個使用者要被導到哪一台後端」。'
      ].join('\n'),
    solvingSteps: [
      '先抓題幹的「多台伺服器間漂移」與「使用者會話異常」，這是 load balancer 分派造成的 session affinity 問題。',
      '若後端狀態沒有集中存放，同一使用者請求需要盡量維持到同一台後端。',
      'Session Stickiness 可透過 cookie、source IP hash 等方法，把同一使用者黏到同一後端。',
      '排除 HSTS，因為它只要求瀏覽器使用 HTTPS。',
      '排除 HPKP 與 OCSP Stapling，因為它們是憑證釘選或憑證撤銷查詢相關機制，不是流量分派策略。',
      '因此答案選 D。'
    ],
    optionExplanations: {
      A: 'HSTS 會要求瀏覽器之後只能用 HTTPS 連線，不能控制使用者被導到哪一台後端伺服器。',
      B: 'HPKP 是憑證釘選機制，而且實務上已被淘汰；它與 session 保持無關。',
      C: 'OCSP Stapling 是伺服器代為附上憑證撤銷狀態，解決的是憑證驗證效率與隱私問題。',
      D: 'Session Stickiness 會透過 cookie、來源 IP hash 等方式維持同一使用者連到同一後端，正是題目描述的作法。'
    },
    keyTakeaways: [
      'Session Stickiness 又可稱為 sticky session 或 session affinity。',
      '有狀態後端常需要 sticky session，或者改用共用 session store 來避免漂移問題。',
      'cookie 與 source IP hash 都可作為黏著策略，但各有隱私、代理或 NAT 情境下的限制。',
      '常見陷阱是把 TLS/憑證安全機制誤當成負載平衡的會話保持。'
    ],
    tags: ['load-balancing', 'session-stickiness']
  },
  42: {
    answerVerification: 'verified',
    answerNote: null,
    coreTerms: ['SQL Injection', 'Prepared Statements', 'parameterized query', 'code/data separation'],
    beginnerExplanation:
      [
        'SQL Injection 的前置觀念是：如果程式用字串拼接把使用者輸入直接塞進 SQL，例如把帳號欄位拼到 WHERE 後面，攻擊者可能輸入帶有引號、OR 條件或註解符號的內容，讓資料庫把它當成 SQL 指令的一部分。',
        'Prepared Statements 的規則是 code/data separation：先把 SQL 結構固定好，例如 `WHERE name = ?`，再用 parameterized query 把使用者輸入當成參數資料綁定進去。資料庫會把參數視為資料值，而不是新的 SQL 語法片段。',
        '因此關鍵是 SQL 與資料綁定分離、參數化。常見陷阱是以為把輸入轉 16 進位、Base64，或用全局 Try/Catch 就安全；這些不是可靠安全邊界，若解碼後仍字串拼接 SQL，或錯誤已經發生才 catch，Injection 仍可能成立。'
      ].join('\n'),
    solvingSteps: [
      '先辨認題目問的是 SQL Injection 的防護核心，不是錯誤處理或資料編碼。',
      '攻擊成立原因通常是 SQL 字串拼接讓輸入變成可執行 SQL 語法。',
      'Prepared Statements 先固定 SQL 結構，再把輸入以參數綁定，因此達到 code/data separation。',
      '排除 16 進位與 Base64，因為它們只改變資料表示方式，不保證阻止惡意 SQL 語意。',
      '排除 Try/Catch，因為它只處理例外，不能防止惡意 SQL 被組成或執行。',
      '因此答案選 D。'
    ],
    optionExplanations: {
      A: '轉成 16 進位只是資料表示方式改變，若仍用字串拼接 SQL，注入風險仍可能存在。',
      B: 'Try/Catch 只能捕捉執行後的例外，不能阻止惡意輸入成為 SQL 語法。',
      C: 'Base64 是編碼不是安全邊界，解碼後若再拼接 SQL 一樣危險。',
      D: 'SQL 與資料綁定分離、參數化，會讓輸入被當成資料值處理，是 Prepared Statements 的關鍵。'
    },
    keyTakeaways: [
      'SQL Injection 的核心風險通常來自字串拼接 SQL，讓資料變成指令。',
      'Prepared Statements 使用參數化查詢與 code/data separation，讓輸入只被當成資料值。',
      '16 進位、Base64、Try/Catch 都不是 SQL Injection 的主要防線。',
      '常見陷阱是把「看起來有處理輸入」誤認為安全；真正重點是資料庫如何解析 SQL 結構與參數。'
    ],
    tags: ['prepared-statements', 'parameterized-query']
  },
  43: {
    answerVerification: 'verified',
    answerNote: 'PDF 與 raw data 答案為 A。高頻段 5G 在部署上可能有涵蓋半徑較小的限制，但「覆蓋率下降」不是 5G 常見核心特性；本題應以常見 5G 特性分類作答。',
    coreTerms: ['5G', 'URLLC', 'mMTC', 'spectral efficiency', 'deployment challenge'],
    beginnerExplanation:
      [
        '5G 的前置觀念是它不是只代表「手機上網比較快」，而是包含多種通訊能力。常見分類會提到 eMBB 高速寬頻、URLLC 低延遲高可靠、mMTC 大量裝置連結，以及更好的 spectral efficiency 頻譜效率。',
        '題目列出的 B 頻譜效率提升、C 延遲顯著降低、D 大量裝置連結，都能對應到 5G 常見能力。A「覆蓋率下降」則不是 5G 被定義或宣稱的核心特性；某些高頻段部署可能基地台覆蓋半徑較小，但那是部署挑戰，不是 5G 的標準優點或常見特性。',
        '本題問「非屬」時，要選出不屬於常見特性分類的選項。常見陷阱是把高頻毫米波的實務限制，直接當成整個 5G 的核心特性；考試通常要分清「技術目標」和「部署限制」。'
      ].join('\n'),
    solvingSteps: [
      '先讀出題目關鍵字「非屬」，表示要找不屬於 5G 常見特性的選項。',
      '檢查 B：頻譜效率提升對應 spectral efficiency，是 5G 常見目標。',
      '檢查 C：延遲顯著降低對應 URLLC 或低延遲通訊，是常見特性。',
      '檢查 D：大量裝置連結對應 mMTC，是 5G 支援物聯網場景的重要特性。',
      '檢查 A：覆蓋率下降可能是高頻部署挑戰，但不是 5G 常見核心特性。',
      '因此答案選 A。'
    ],
    optionExplanations: {
      A: '覆蓋率下降不是 5G 的標準核心特性；雖然高頻部署可能有涵蓋限制，但那是部署挑戰，不是常見能力。',
      B: '頻譜效率提升是 5G 的重要目標，可在有限頻譜中承載更多資料。',
      C: '延遲顯著降低對應 5G 的低延遲通訊能力，屬於常見特性。',
      D: '大量裝置連結對應 mMTC 場景，是 5G 支援物聯網的重要特性。'
    },
    keyTakeaways: [
      '5G 常見關鍵字包含低延遲、高頻譜效率、大量連線與高速寬頻。',
      'URLLC 對應低延遲高可靠，mMTC 對應大量裝置連結，spectral efficiency 對應頻譜效率。',
      '部署限制不等於技術核心特性；高頻覆蓋挑戰不能直接等同 5G 常見特性。',
      '常見陷阱是看到「覆蓋」也是行動網路議題就選錯；非屬題要找與標準能力不一致者。'
    ],
    tags: ['5g']
  },
  44: {
    answerVerification: 'verified',
    answerNote: null,
    coreTerms: ['IAM', 'RBAC', 'authentication', 'authorization', 'role'],
    beginnerExplanation:
      [
        'IAM(Identity and Access Management) 的前置觀念是「管理誰可以進來、進來後可以做什麼」。它包含身分建立、authentication 驗證、authorization 授權、帳號生命週期、政策與稽核等整體管理範圍。',
        'RBAC(Role-Based Access Control) 則是 authorization 授權的一種模型：先定義 role 角色，例如管理員、審核者、一般使用者，再把權限掛在角色上，使用者取得角色後得到對應權限。',
        '因此包含關係是 RBAC 屬於 IAM 的一種授權方式，而不是 IAM 屬於 RBAC，也不是兩者相等。常見陷阱是看到兩者都和權限有關，就把 RBAC=IAM；但 IAM 還包含驗證、身分生命週期與稽核等 RBAC 不處理的部分。'
      ].join('\n'),
    solvingSteps: [
      '先分清 IAM 是整體管理範圍，RBAC 是其中一種 authorization 授權模型。',
      '檢查 A「IAM ⊂ RBAC」：方向顛倒，因為 RBAC 不包含所有 IAM 能力。',
      '檢查 B「RBAC ⊂ IAM」：RBAC 是 IAM 中的授權方式之一，方向正確。',
      '檢查 C：兩者不是無關，RBAC 常被用在 IAM 的授權設計中。',
      '檢查 D「RBAC=IAM」：錯，因為 IAM 還包含 authentication、身分生命週期、政策與稽核。',
      '因此答案選 B。'
    ],
    optionExplanations: {
      A: 'IAM 是 RBAC 的一部分這個方向顛倒。',
      B: 'RBAC 是 IAM 中常用的授權方式之一，說明了正確的包含關係。',
      C: 'IAM 與 RBAC 有明確關聯，RBAC 常被用於 IAM 的授權設計。',
      D: 'RBAC 不等於 IAM，因為 IAM 還包含驗證、身分管理、政策與稽核等面向。'
    },
    keyTakeaways: [
      'IAM 是身分與存取管理的總稱，涵蓋 authentication、authorization、帳號生命週期與稽核。',
      'RBAC 是以角色為中心的授權模型。',
      '正確包含關係是 RBAC 屬於 IAM 的一種實作方式。',
      '常見陷阱是把 IAM 和 RBAC 都看成權限管理，就誤判成 RBAC=IAM 或方向顛倒。'
    ],
    tags: ['iam', 'rbac']
  },
  45: {
    answerVerification: 'verified',
    answerNote: null,
    coreTerms: ['Two-Step Verification', 'authentication strength', 'second factor', 'confidentiality'],
    beginnerExplanation:
      [
        'Two-Step Verification 兩步驟驗證的前置觀念是：只靠密碼時，只要密碼外洩，攻擊者就可能登入。加入第二步，例如 OTP、推播確認、簡訊碼或安全金鑰，可以要求登入者再通過另一個驗證程序。',
        '這個機制直接提升 authentication strength 認證強度，因為攻擊者不只要知道密碼，還要能完成第二步。當未授權登入變難，帳號內資料被讀取或外洩的機率降低，因此也能保護 confidentiality 機密性。',
        '本題常見陷阱是把兩步驟驗證拿去對應所有資安屬性。它不是以提高可用性為主，甚至可能讓登入多一道步驟；它也不是直接保證資料完整性或不可否認性，這些通常要靠雜湊、簽章、稽核紀錄等機制。'
      ].join('\n'),
    solvingSteps: [
      '先辨認 Two-Step Verification 是登入與身分確認機制。',
      '密碼之外再加第二步，最直接提升的是認證強度。',
      '認證強度提高後，未授權者較難讀取帳號內資料，因此可保護機密性。',
      '排除可用性，因為多一道驗證通常不是讓系統更容易使用。',
      '排除完整性，因為完整性重點是資料未被未授權竄改，不是登入是否多一步。',
      '排除不可否認性，因為不可否認性通常依賴簽章、憑證或稽核證據，因此答案選 D。'
    ],
    optionExplanations: {
      A: '兩步驟驗證通常會讓登入多一道程序，不是以提升可用性為主要目的。',
      B: '完整性是資料不被未授權竄改；兩步驟驗證不是直接驗證資料是否被改動。',
      C: '不可否認性通常依賴簽章、憑證、稽核紀錄等機制，不是兩步驟驗證的主要功能。',
      D: '兩步驟驗證提高帳號登入的認證強度，降低未授權者讀取帳號資料的機會。'
    },
    keyTakeaways: [
      '兩步驟驗證的核心是加強登入身分確認，也就是提升認證強度。',
      '它能降低密碼外洩後帳號立刻被接管的風險。',
      '認證強度提升可間接保護資料機密性，因為未授權讀取更難發生。',
      '常見陷阱是把兩步驟驗證直接對應到完整性或不可否認性；那些通常需要其他安全機制。'
    ],
    tags: ['two-step-verification', 'account-security']
  },
  46: {
    answerVerification: 'verified',
    answerNote: null,
    coreTerms: ['IDPS', 'signature detection', 'anomaly detection', 'baseline', 'false positive'],
    beginnerExplanation:
      [
        'IDPS 的前置觀念是偵測入侵或可疑行為。signature detection 特徵偵測像比對黑名單：如果流量或事件符合已知攻擊特徵，就告警，所以它對已知攻擊很有效。',
        '未知攻擊的問題是還沒有現成 signature。anomaly detection 異常行為偵測會先建立 baseline 正常基準，例如平常的流量、登入時間、指令頻率或協定行為，再找出偏離正常的事件，因此比較有機會抓到未知攻擊或新變種。',
        '但 anomaly 不是完美答案，它常有 false positive 誤報：正常但少見的行為也可能被判成異常。常見陷阱是以為 signature 永遠最好；其實題目問「未知攻擊」時，要選能從未知行為偏差下手的異常偵測。'
      ].join('\n'),
    solvingSteps: [
      '題目問的是對未知攻擊的一般表現最佳，而不是已知攻擊。',
      '檢查 A Signature：signature detection 需要已知攻擊樣式，對未知攻擊較弱。',
      '檢查 B Auto Scanning：自動掃描不是 IDPS 對未知攻擊最具代表性的偵測分類。',
      '檢查 C Stateful Protocol：Stateful Protocol Analysis 能檢查協定狀態是否合理，但仍受限於已知協定規則。',
      '檢查 D Anomaly：anomaly detection 可依 baseline 找偏離正常行為，較適合未知攻擊。',
      '因此答案選 D，同時記得它的代價是 false positive 可能較高。'
    ],
    optionExplanations: {
      A: '特徵偵測需要已知攻擊樣式，對新型或變種攻擊通常較弱。',
      B: '自動掃描偏向掃描或檢查活動，不是 IDPS 對未知攻擊最具代表性的偵測分類。',
      C: '狀態協定分析可檢查協定流程是否異常，但通常仍受限於既定協定規則。',
      D: '異常行為偵測會建立正常行為基準，再抓偏離基準的活動，較適合發現未知攻擊。'
    },
    keyTakeaways: [
      'Signature 適合已知攻擊，Anomaly 較適合未知攻擊。',
      'Anomaly detection 依 baseline 正常基準找偏離行為，但 false positive 誤報率可能較高。',
      'Stateful Protocol Analysis 檢查協定狀態，不等於一定最會抓未知攻擊。',
      '常見陷阱是忽略題目問「未知攻擊」，直接選熟悉的 signature detection。'
    ],
    tags: ['anomaly-detection']
  },
  47: {
    answerVerification: 'verified',
    answerNote: null,
    coreTerms: ['Session Hijacking', 'session token', 'cookie', 'MITM', 'Sniffing', 'XSS'],
    beginnerExplanation:
      [
        'Session Hijacking 的前置觀念是：使用者登入後，網站通常用 session token 或 cookie 代表「這個請求屬於已登入使用者」。攻擊者若取得或濫用這個 token，就可能冒用受害者會話。',
        'MITM 中間人攻擊可能攔截或操弄通訊；Sniffing 可能竊聽未加密或設定不良的封包；XSS 則可能讓惡意腳本在受害者瀏覽器中執行，進而偷 cookie 或代替使用者操作。這些都能和 session token 竊取或濫用連上關係。',
        '本題問「非屬」常見取得會話的手段，UDP 檔案傳輸只是傳輸方式描述，本身不是典型 session hijacking 手法。常見陷阱是看到 UDP 也是網路協定就選錯；要回到「能不能取得或濫用 session token/cookie」判斷。'
      ].join('\n'),
    solvingSteps: [
      '先確認 Session Hijacking 的目標是取得或冒用 session token、cookie 或會話識別資訊。',
      '檢查 A MITM：中間人可能攔截通訊並取得會話資訊，屬於常見手段。',
      '檢查 B Sniffing：竊聽封包在未加密或保護不足時可能取得 token，屬於常見手段。',
      '檢查 D XSS：惡意腳本可能偷 cookie 或直接用受害者 session 操作，屬於常見手段。',
      '檢查 C UDP 檔案傳輸：它不是典型取得會話的攻擊方法，因此是非屬選項。',
      '因此答案選 C。'
    ],
    optionExplanations: {
      A: 'MITM 可攔截或篡改通訊，若保護不足可能取得 session token。',
      B: 'Sniffing 可竊聽網路封包，未加密或設定不良時可能暴露會話資訊。',
      C: 'UDP 檔案傳輸不是典型的 session token 竊取或冒用方法，因此是本題的非屬選項。',
      D: 'XSS 可在使用者瀏覽器中執行惡意腳本，常被用來偷 cookie 或操作既有 session。'
    },
    keyTakeaways: [
      'Session Hijacking 的關鍵是 session token 或 cookie 被取得或濫用。',
      'MITM、Sniffing、XSS 都是常見攻擊路徑，因為它們能攔截、偷取或濫用會話資訊。',
      '傳輸協定名稱本身不等於會話劫持手法。',
      '常見陷阱是只看選項是不是網路名詞；要問它是否能取得或冒用 session。'
    ],
    tags: ['web-security']
  },
  48: {
    answerVerification: 'verified',
    answerNote: null,
    coreTerms: ['WAF', 'packet-filtering firewall', 'application layer', 'HTTP', 'SQLi/XSS'],
    beginnerExplanation:
      [
        'packet-filtering firewall 的前置觀念是它常看比較低層的欄位，例如來源/目的 IP、port、protocol、TCP/UDP 或連線狀態，判斷封包能不能通過。它不一定理解 Web 表單參數或 HTTP request 裡的語意。',
        'WAF(Web Application Firewall) 的重點是 application layer 應用層，特別是 HTTP/HTTPS Web 流量。它會看 URL、header、cookie、body、參數與命令模式，嘗試攔截 SQLi/XSS 等 Web 應用攻擊。',
        '所以主要差異是 WAF 檢視與過濾應用層內容/命令。常見陷阱是把 WAF 說成只看第 2 層、不能做代理或不支援 SSL；這些說法太絕對，WAF 的核心差異不是它有沒有某個部署型態，而是它理解 Web 應用層內容。'
      ].join('\n'),
    solvingSteps: [
      '先辨認 WAF 是 Web Application Firewall，重點在 Web 應用層保護。',
      '比較傳統封包過濾防火牆：多看 IP、port、protocol 等封包欄位。',
      '比較 WAF：多看 HTTP request、參數、cookie、body 與應用層命令模式。',
      '檢查 A：說 WAF 僅看第 2 層錯誤，WAF 主要看應用層。',
      '檢查 C 與 D：WAF 是否做代理、是否支援 SSL 依產品與部署而定，不是主要差異。',
      '因此答案選 B，WAF 檢視與過濾應用層內容/命令。'
    ],
    optionExplanations: {
      A: 'WAF 不是只看第 2 層；它主要工作在應用層，特別是 Web/HTTP 流量。',
      B: 'WAF 會檢視並過濾應用層內容與命令，例如 SQLi、XSS 相關請求特徵。',
      C: '許多 WAF 可以作為反向代理、透明代理或內嵌設備運作，不能說 WAF 不做代理。',
      D: 'WAF 可以支援 SSL/TLS 終止或解密檢查；不支援 SSL 的說法過度絕對。'
    },
    keyTakeaways: [
      'WAF 的重點是 Web 應用層保護，會檢視 HTTP 內容與命令模式。',
      '封包過濾防火牆多看 IP、port、protocol 等欄位。',
      'SQL Injection 與 XSS 通常更適合由 WAF 這類應用層防護處理。',
      '常見陷阱是用部署型態或 SSL 支援與否判斷 WAF；考題通常問的是觀察層級與內容。'
    ],
    tags: ['waf', 'application-layer']
  },
  49: {
    answerVerification: 'needs-review',
    answerNote:
      'PDF 與 raw data 答案為 C。若採傳統 MFA 三因素分類，所知之事、所持之物、所表之徵為標準因素，所在地通常不列入；但現代情境式或風險式驗證有時會把位置視為輔助因素，建議人工確認教材採用的分類。',
    coreTerms: ['MFA', 'knowledge factor', 'possession factor', 'inherence factor', 'risk-based authentication'],
    beginnerExplanation:
      [
        'MFA 多因子認證的前置觀念是：不要只用一種證明方式確認使用者，而是結合不同類型的 factor。傳統三因素通常是 knowledge factor 所知之事，例如密碼；possession factor 所持之物，例如手機、OTP token；inherence factor 所表之徵或所是之事，例如指紋、人臉。',
        '依這個傳統分類，A 所知之事、B 所持之物、D 所表之徵都屬於 MFA 因素。C 所在之處 location 通常不列入傳統三因素，所以題庫答案選 C。',
        '但本題保留 needs-review，因為現代 risk-based authentication 或情境式驗證常把位置、裝置、IP、旅速等當成風險訊號。常見陷阱是把「可輔助判斷風險的情境訊號」和「傳統 MFA 基本因素」混在一起；考試要依教材採用的分類作答。'
      ].join('\n'),
    solvingSteps: [
      '先列出傳統 MFA 三因素：knowledge factor、possession factor、inherence factor。',
      '把所知之事對應 knowledge，例如密碼或 PIN。',
      '把所持之物對應 possession，例如手機、硬體金鑰或 OTP token。',
      '把所表之徵理解為生物特徵或本身特徵，對應 inherence。',
      '所在地不屬於傳統三因素，因此依題庫答案選 C。',
      '同時保留 needs-review，因為現代 risk-based authentication 可能把位置當作情境或風險訊號。'
    ],
    optionExplanations: {
      A: '所知之事包含密碼、PIN、答案等，是傳統 MFA 的知識因素。',
      B: '所持之物包含手機、硬體金鑰、OTP token 等，是傳統 MFA 的持有因素。',
      C: '所在之處在傳統三因素模型中不是基本因素；但部分現代系統會把位置當作情境或風險訊號。',
      D: '所表之徵可對應指紋、人臉、虹膜等生物或本身特徵，是傳統 MFA 的 inherence 因素。'
    },
    keyTakeaways: [
      '傳統 MFA 三因素是所知、所持、所是或所表之徵。',
      '位置常見於情境式或風險式驗證，但不一定被列為傳統 MFA 基本因素。',
      '本題 needs-review 的原因是教材可能採傳統三因素，也可能提到現代風險訊號。',
      '常見陷阱是把 location 這類風險訊號直接等同於傳統認證因素；分類題要先確認模型範圍。'
    ],
    tags: ['mfa', 'auth-factors']
  },
  50: {
    answerVerification: 'verified',
    answerNote: null,
    coreTerms: ['Internet layer', 'transport layer', 'ICMP', 'IGMP', 'OSPF', 'UDP'],
    beginnerExplanation:
      [
        'TCP/IP 分層的前置觀念是：Internet layer 網路層負責跨網路的定址、路由與控制訊息，回答「封包要怎麼從這個網路走到另一個網路」。Transport layer 傳輸層則處理端到端應用資料傳送，例如連接埠、分段、可靠性或無連線傳輸。',
        'ICMP 常用於錯誤回報與診斷控制訊息，例如 ping 相關訊息；IGMP 管理 IPv4 multicast 群組；OSPF 是路由協定，用來交換路由資訊。這些都和 Internet layer 的控制或路由功能有關。',
        'UDP 則和 TCP 同屬 transport layer，提供無連線資料報服務，會使用 port 讓不同應用程式收送資料。本題問「非屬 TCP/IP 網路層」時，答案就是 UDP。常見陷阱是看到 UDP 是網路通訊協定，就忘了它其實在傳輸層。'
      ].join('\n'),
    solvingSteps: [
      '題目要找「非屬」TCP/IP 網路層的協定。',
      '先定位 Internet layer：它處理 IP 定址、路由與控制訊息。',
      '檢查 ICMP：錯誤回報與診斷控制訊息，屬於網路層相關。',
      '檢查 IGMP：IPv4 multicast 群組管理，屬於網路層相關控制。',
      '檢查 OSPF：路由協定，和網路層路由控制相關。',
      '檢查 UDP：UDP 使用 port，與 TCP 同屬 transport layer，因此不是網路層，答案選 D。'
    ],
    optionExplanations: {
      A: 'ICMP 用於錯誤回報與診斷，例如 ping 相關訊息，屬於網路層相關協定。',
      B: 'IGMP 用於 IPv4 multicast 群組管理，屬於網路層相關控制協定。',
      C: 'OSPF 是動態路由協定，負責交換路由資訊，與網路層路由功能相關。',
      D: 'UDP 提供傳輸層的無連線資料傳送服務，與 TCP 同層，不屬於網路層。'
    },
    keyTakeaways: [
      'Internet layer 處理定址、路由與網路控制訊息；Transport layer 處理端到端傳輸與 port。',
      'UDP 和 TCP 都是傳輸層協定。',
      'ICMP、IGMP、OSPF 常被歸在網路層或其控制/路由功能範圍。',
      '常見陷阱是把所有「網路通訊協定」都當網路層；分層題要看協定負責的功能。'
    ],
    tags: ['udp', 'network-layer']
  }
};
