import type { AnswerOption, AnswerVerification, ExtractionStatus, FourOptionRecord } from '@/modules/examGroups/aGroup/types/questionAnalysis';
import type {
  QuestionTeachingReview,
  QuestionTeachingReviewMap
} from '@/modules/examGroups/aGroup/data/years/yearQuestionFactory';

interface ReviewInput {
  answer: AnswerOption;
  answerVerification?: AnswerVerification;
  answerNote?: string;
  coreTerms: string[];
  concept: string;
  rule: string;
  correctReason: string;
  commonTrap: string;
  solvingSteps: string[];
  optionExplanations: FourOptionRecord;
  keyTakeaways: string[];
  tags: string[];
  extractionStatus?: ExtractionStatus;
}

function makeReview(input: ReviewInput): QuestionTeachingReview {
  return {
    answerVerification: input.answerVerification ?? 'verified',
    answerNote:
      input.answerNote ?? `PDF 題目前方標示答案為 ${input.answer}；本解析已依題幹條件與四個選項逐一驗證。`,
    coreTerms: input.coreTerms,
    beginnerExplanation: [
      `前置觀念：${input.concept}`,
      `判斷規則：${input.rule}`,
      `套回本題：${input.correctReason}所以答案是 ${input.answer}。常見混淆：${input.commonTrap}`
    ].join('\n'),
    solvingSteps: input.solvingSteps,
    optionExplanations: input.optionExplanations,
    keyTakeaways: input.keyTakeaways,
    tags: input.tags,
    ...(input.extractionStatus ? { extractionStatus: input.extractionStatus } : {})
  };
}

export const reviewedQuestionAnalyses = {
  1: makeReview({
    answer: 'C',
    coreTerms: ['監督式學習', '特徵與標籤', '分類', '迴歸', '分群'],
    concept:
      '監督式學習的資料同時有輸入特徵與正確標籤，模型學的是「從特徵對應到標籤」的規則；常見任務是分類與迴歸。無監督式學習沒有標籤，常見任務才是把資料依相似度分群。',
    rule:
      '只要題目明確說資料含標籤，就要找需要標籤訓練的演算法；若演算法本質是自行找群集或結構，就不屬於監督式學習。',
    correctReason:
      '二元分類、多元分類與迴歸分析都需要已知答案來訓練；分群是依資料相似度自動形成群組，不使用標籤作為標準答案。',
    commonTrap: '「分類」和「分群」字面相近，但分類有已知類別標籤，分群沒有預先標籤。',
    solvingSteps: [
      '先抓題幹關鍵字「含特徵及標籤」，判斷本題問監督式學習。',
      '再列出監督式學習常見任務：分類問題與迴歸問題。',
      '逐一比對選項，A、B 都是分類，D 是迴歸，只有 C 分群不需要標籤。',
      '因此選出「非監督式學習常用演算法」的分群。'
    ],
    optionExplanations: {
      A: '二元分類要用標籤學出兩類的分界，是典型監督式學習，不是本題要找的例外。',
      B: '多元分類同樣要用已標記類別訓練，只是類別數超過兩類，仍屬監督式學習。',
      C: '分群依資料相似度把樣本分成群，不需要事先提供正確標籤，所以不是監督式學習常用演算法。',
      D: '迴歸分析用已知數值標籤學出輸入與連續輸出之間的關係，是監督式學習。'
    },
    keyTakeaways: [
      '監督式學習的判斷核心是「有特徵也有標籤」。',
      '分類與迴歸屬於監督式學習；分群通常屬於無監督式學習。',
      '常見陷阱是把分類與分群混在一起；分類要預先知道正確類別，分群不需要。'
    ],
    tags: ['machine-learning', 'supervised-learning']
  }),
  2: makeReview({
    answer: 'A',
    coreTerms: ['位址線', '可定址空間', '2 的次方', '32M'],
    concept:
      '位址線每多 1 條，就讓可表示的位址數乘以 2。n 條位址線可以形成 2^n 個不同位址，因此記憶體容量若以位址數計，就要找能涵蓋該容量的最小 n。',
    rule:
      '32M 通常視為 32 × 2^20 個位址單位；32 = 2^5，所以 32M = 2^5 × 2^20 = 2^25，最少需要 25 條位址線。',
    correctReason: '題目問「最少」位址線，2^25 正好可表示 32M 個位址，24 條不夠而 25 條足夠。',
    commonTrap: '不要把 32 誤當十進位 32,000,000 後再估算；計算機記憶體題常用 M = 2^20。',
    solvingSteps: [
      '先把 32M 拆成 32 × 2^20。',
      '再把 32 改寫為 2^5。',
      '相乘得到 2^5 × 2^20 = 2^25。',
      '位址線數 n 滿足 2^n 個位址，所以 n = 25。'
    ],
    optionExplanations: {
      A: '25 條位址線可表示 2^25 個位址，剛好對應 32M，是最少需要的數量。',
      B: '26 條可定址 64M，雖然足夠但不是題目要求的最少數量。',
      C: '27 條可定址 128M，超過需求，常見錯誤是把容量多乘一次 2。',
      D: '28 條可定址 256M，遠大於 32M，不符合「最少」條件。'
    },
    keyTakeaways: [
      'n 條位址線可表示 2^n 個位址。',
      '記憶體容量中的 M 常以 2^20 計算。',
      '遇到「最少」要找剛好涵蓋需求的最小次方，不是任一足夠大的選項。'
    ],
    tags: ['memory-addressing']
  }),
  3: makeReview({
    answer: 'C',
    coreTerms: ['Cache hit ratio', '平均存取時間', 'log2', '快取容量'],
    concept:
      '快取平均存取時間會受到命中率影響。命中時只花快取時間，未命中時通常還要付出主記憶體存取成本；命中率越高，平均時間越低。',
    rule:
      '本題採用平均存取時間公式：T = H × 15 + (1-H) × 200。題目要求 T ≤ 35，且 H = 0.5 + 0.1 × log2 C，C 在 2 到 32 之間。',
    correctReason:
      '由 15H + 200(1-H) ≤ 35 得 200 - 185H ≤ 35，所以 H ≥ 165/185 約 0.892。C=16 時 log2C=4，H=0.9，首次達標。',
    commonTrap: '不要只看 Cache 存取時間 15 ns；未命中時主記憶體 200 ns 的成本仍會拉高平均值。',
    solvingSteps: [
      '先寫出平均存取時間：15H + 200(1-H)。',
      '再套入需求：15H + 200(1-H) ≤ 35。',
      '化簡為 200 - 185H ≤ 35，得到 H ≥ 165/185，約為 0.892。',
      '逐一檢查選項容量：C=4 時 H=0.7，C=8 時 H=0.8，C=16 時 H=0.9。',
      'C=16 是第一個讓命中率達到需求的容量，所以是最小值。'
    ],
    optionExplanations: {
      A: 'C=4 時 log2C=2，H=0.7，平均時間仍約 70.5 ns，沒有達到 35 ns。',
      B: 'C=8 時 log2C=3，H=0.8，平均時間約 52 ns，仍不符合條件。',
      C: 'C=16 時 log2C=4，H=0.9，平均時間為 33.5 ns，且是最小符合選項。',
      D: 'C=32 時 H=1.0 也符合，但題目問最小容量，因此不是最佳答案。'
    },
    keyTakeaways: [
      '快取平均存取時間要同時考慮命中與未命中情況。',
      '先由目標時間反推最低命中率，再回推容量，是這類題的穩定解法。',
      '常見陷阱是選一個足夠大的容量；題目問最小值時必須檢查更小選項是否已達標。'
    ],
    tags: ['cache', 'average-access-time']
  }),
  4: makeReview({
    answer: 'D',
    coreTerms: ['雲端運算', 'NIST 五大特徵', '服務模式', '部署模式'],
    concept:
      '雲端運算不是單純把設備放到遠端，而是用網路提供可隨需取得、可彈性擴充、可量測的運算資源。常見教材會區分五大特徵、三種服務模式與多種部署模式。',
    rule:
      '雲端運算的五大特徵通常是隨需自助服務、廣泛網路存取、資源池、快速彈性與可量測服務；SaaS/PaaS/IaaS 是服務模式，不是部署模式。',
    correctReason: '選項 D 完整列出五大特徵；其他選項把雲端與邊緣混同，或把服務模式與部署模式顛倒。',
    commonTrap: 'SaaS、PaaS、IaaS 很常被背成「雲端三種」，但它們是服務模式，不是部署模式。',
    solvingSteps: [
      '先判斷題目問「何者正確」，因此要找和雲端定義一致的敘述。',
      '再用五大特徵檢查 D：隨需、網路存取、資源池、彈性、量測都出現。',
      '排除 A，因為邊緣運算強調靠近資料來源，並不等同雲端運算。',
      '排除 B 與 C，因為它們把服務模式與部署模式的分類名稱互換。'
    ],
    optionExplanations: {
      A: '邊緣運算把運算移近資料來源以降低延遲，雲端運算則集中提供彈性資源，兩者不是等同概念。',
      B: 'SaaS、PaaS、IaaS 是服務模式；部署模式通常是公有雲、私有雲、混合雲等。',
      C: '公有雲、私有雲、混合雲屬部署模式，不是服務模式，因此分類用語錯置。',
      D: '這五項正是雲端運算常見核心特徵，符合題目要求。'
    },
    keyTakeaways: [
      '雲端五大特徵：隨需自助、廣泛網路、資源池、快速彈性、可量測服務。',
      'SaaS/PaaS/IaaS 是服務模式；公有/私有/混合雲是部署模式。',
      '常見陷阱是把雲端與邊緣運算視為同義，或把服務模式與部署模式顛倒。'
    ],
    tags: ['cloud-computing']
  }),
  5: makeReview({
    answer: 'B',
    coreTerms: ['揮發性', '非揮發性', 'DRAM', 'SRAM', 'ROM', 'Flash Memory'],
    concept:
      '揮發性記憶體在斷電後內容會消失，常作為工作記憶體；非揮發性記憶體斷電後仍能保存資料，常用於韌體或儲存。',
    rule:
      'DRAM 與 SRAM 都需要電源維持資料，屬揮發性；ROM 與 Flash Memory 在斷電後仍保留內容，屬非揮發性。',
    correctReason: '四類中只有 ROM 與 Flash Memory 是非揮發性，共 2 類。',
    commonTrap: 'SRAM 名稱中有 static，但 static 指不需週期性 refresh，不代表斷電後可保存資料。',
    solvingSteps: [
      '先依斷電後資料是否保留，把記憶體分成揮發性與非揮發性。',
      '判斷 DRAM：需 refresh 且斷電消失，是揮發性。',
      '判斷 SRAM：不需 refresh 但仍需電源，是揮發性。',
      '判斷 ROM 與 Flash：斷電仍保存資料，是非揮發性。',
      '數出非揮發性類別為 2 類。'
    ],
    optionExplanations: {
      A: '只算到 ROM 或 Flash 其中一種，漏掉另一種非揮發性記憶體。',
      B: 'ROM 與 Flash Memory 都是非揮發性，共 2 類，符合題意。',
      C: '把 SRAM 或 DRAM 也算成非揮發性會得到 3，但它們斷電後資料會消失。',
      D: '四類全算成非揮發性明顯錯誤，DRAM 與 SRAM 都是揮發性。'
    },
    keyTakeaways: [
      '非揮發性的判斷條件是斷電後資料仍保留。',
      'DRAM、SRAM 都是揮發性；ROM、Flash Memory 是非揮發性。',
      '常見陷阱是把 SRAM 的 static 誤會成永久保存。'
    ],
    tags: ['memory']
  }),
  6: makeReview({
    answer: 'D',
    coreTerms: ['高階語言', '機器碼', 'Compiler', 'Assembler', 'Loader'],
    concept:
      '程式從人類較易讀的形式變成 CPU 可執行的形式，會經過翻譯與載入等階段。高階語言通常由編譯器翻成低階程式或機器碼。',
    rule:
      'Compiler 負責把高階語言轉成機器碼或目標碼；Assembler 是把組合語言轉成機器碼；Editor 只編輯文字；Loader 負責載入可執行檔。',
    correctReason: '題目明確說「高階語言轉換成機器碼」，符合編譯器的功能。',
    commonTrap: '組譯器也會產生機器碼，但它的輸入是組合語言，不是高階語言。',
    solvingSteps: [
      '先抓輸入是高階語言，輸出是機器碼。',
      '比對各工具的角色：編譯器做高階語言翻譯，組譯器做組合語言翻譯。',
      '排除編輯器與載入程式，因為它們不負責語言翻譯。',
      '因此選出 Compiler。'
    ],
    optionExplanations: {
      A: '組譯器處理的是組合語言到機器碼，不是一般高階語言到機器碼。',
      B: '編輯器用來撰寫或修改原始碼，不能負責轉換成機器碼。',
      C: '載入程式把程式載入記憶體準備執行，不是翻譯工具。',
      D: '編譯器負責將高階語言翻譯成目標碼或機器碼，符合題意。'
    },
    keyTakeaways: [
      'Compiler 對應高階語言，Assembler 對應組合語言。',
      'Editor 編輯文字，Loader 載入程式，功能和翻譯不同。',
      '常見陷阱是只看到「機器碼」就選組譯器，必須同時看輸入語言種類。'
    ],
    tags: ['compiler']
  }),
  7: makeReview({
    answer: 'B',
    coreTerms: ['布林代數', 'minterm', '吸收律', '卡諾圖'],
    concept:
      '布林函數化簡是在保持真值表不變的前提下，找出較少項、較少變數的等價表示。可用代數合併，也可用卡諾圖看相鄰 minterm。',
    rule:
      '含 x 的四個 minterm 若涵蓋 y、z 的所有組合，就可合併成 x；剩下 x′y′z′ 可和 xy′z′ 合併成 y′z′，最後得到 x + y′z′。',
    correctReason:
      '原式包含 xy′z′、xy′z、xyz、xyz′，表示 x=1 時全為 1，可化成 x；再加上 x=0,y=0,z=0 的情況，需補 y′z′。',
    commonTrap: '不要把 x=1 的所有項只化成 xy 或 xz；只要 y、z 全部組合都出現，就能直接化成 x。',
    solvingSteps: [
      '先列出 x=1 的四項：xy′z′、xy′z、xyz、xyz′。',
      '再確認這四項涵蓋 y、z 的 00、01、10、11，因此合併為 x。',
      '剩下 x′y′z′ 這一項仍需覆蓋。',
      '利用 xy′z′ 已在 x 中，x′y′z′ 與 xy′z′ 可合併為 y′z′。',
      '合併後得到 x + y′z′。'
    ],
    optionExplanations: {
      A: 'xy + z′ 會在 x=0,y=1,z=0 時輸出 1，但原式沒有該 minterm，不符合。',
      B: 'x + y′z′ 同時涵蓋所有 x=1 的情況與 x=0,y=0,z=0，正好等價於原式。',
      C: 'x′y + z′ 會漏掉部分 x=1,z=1 的情況，也會多涵蓋不在原式中的情況。',
      D: 'x + yz′ 只補 y=1,z=0，無法補到原式額外的 x′y′z′。'
    },
    keyTakeaways: [
      '布林化簡可用「涵蓋完整變數組合」來消去變數。',
      '若 x=1 時所有 y、z 組合都為 1，可直接合併成 x。',
      '常見陷阱是只局部配對，沒有檢查化簡式是否多蓋或漏蓋 minterm。'
    ],
    tags: ['boolean-algebra']
  }),
  8: makeReview({
    answer: 'A',
    coreTerms: ['指令執行時間', '每秒指令數', '奈秒', '單位換算'],
    concept:
      '若知道每秒可執行多少指令，單一指令時間就是其倒數。時間單位換算中，1 秒 = 10^9 奈秒，1 微秒 = 10^-6 秒，1 毫秒 = 10^-3 秒。',
    rule:
      '10,000,000,000 = 10^10 個指令/秒，所以每指令時間 = 1 / 10^10 秒 = 10^-10 秒 = 0.1 ns。',
    correctReason: '把 10^-10 秒換成奈秒要乘以 10^9，得到 0.1 奈秒。',
    commonTrap: '奈秒與微秒差 1000 倍；若把 10^9 與 10^6 混淆，就會選到錯誤單位。',
    solvingSteps: [
      '先把每秒指令數寫成 10^10 instructions/sec。',
      '再取倒數：每個指令花 10^-10 秒。',
      '把秒轉成奈秒：10^-10 × 10^9 = 10^-1 = 0.1 ns。',
      '比對選項，只有 A 的數值與單位都正確。'
    ],
    optionExplanations: {
      A: '0.1 奈秒等於 10^-10 秒，正好是 10^10 指令/秒的倒數。',
      B: '0.1 微秒是 10^-7 秒，比正確時間慢 1000 倍。',
      C: '1 毫秒是 10^-3 秒，與本題高速 CPU 差距太大。',
      D: '1 微秒是 10^-6 秒，也比 10^-10 秒大很多。'
    },
    keyTakeaways: [
      '單一事件時間 = 每秒事件數的倒數。',
      '1 ns = 10^-9 秒，1 μs = 10^-6 秒，1 ms = 10^-3 秒。',
      '常見陷阱是倒數算對但時間單位換錯。'
    ],
    tags: ['cpu-performance', 'unit-conversion']
  }),
  9: makeReview({
    answer: 'D',
    answerNote:
      'PDF 題目前方標示答案為 D；本題程式碼版面已人工對照 108.pdf 第 2 頁並保留原題換行語意。',
    coreTerms: ['call by reference', '傳址呼叫', '參數別名', '副作用'],
    concept:
      '傳址呼叫會讓形式參數直接參照呼叫端的變數，因此在副程式中修改參數會改到原變數。若兩個形式參數都指向同一個變數，會產生別名效應。',
    rule:
      '本題 P(A+B,A,A) 中，Y 與 Z 都參照 A；X 由 A+B 得到 6。執行 Y=Y+1 會先把 A 從 3 改成 4，再執行 Z=Z+X+2×Z 會用目前 A 值計算。',
    correctReason: 'Y 與 Z 都是 A 的別名，所以第二句等於 A = A + 6 + 2A = 4 + 6 + 8 = 18。',
    commonTrap: '若誤用傳值呼叫，會以為 A 不被改動；若忘記 Y 和 Z 是同一個 A，也會算錯。',
    extractionStatus: 'verified',
    solvingSteps: [
      '先確認呼叫前 A=3、B=3，因此 A+B 的值為 6，可作為 X 的值。',
      '再確認 P(A+B,A,A) 讓 Y 參照 A，Z 也參照 A。',
      '執行 Y=Y+1 時，實際是 A=A+1，所以 A 從 3 變成 4。',
      '執行 Z=Z+X+2×Z 時，Z 仍是 A，因此 A=4+6+2×4=18。',
      '最後 print A，輸出 18。'
    ],
    optionExplanations: {
      A: '3 是完全忽略副程式對 A 的修改，等同把參數當傳值，和傳址呼叫不符。',
      B: '6 只算到 A+B 或 X 的值，沒有套用 Y、Z 對 A 的更新。',
      C: '17 通常來自更新順序或別名值取錯；本題第二句應用 A=4 計算兩次 Z。',
      D: '18 符合傳址呼叫下 Y、Z 都指向 A 的更新結果。'
    },
    keyTakeaways: [
      '傳址呼叫會讓副程式內的參數修改影響呼叫端變數。',
      '同一變數傳給多個參數時，要小心別名效應與更新順序。',
      '常見陷阱是用傳值呼叫的直覺解傳址題，或把同一個 A 當成兩份獨立資料。'
    ],
    tags: ['parameter-passing', 'programming-language']
  }),
  10: makeReview({
    answer: 'D',
    coreTerms: ['營業秘密', '專利', '著作權', '個人資料'],
    concept:
      '企業的技術、流程、配方、程式設計方法等若具有經濟價值且被合理保密，可用營業秘密保護。它重點在避免未公開資訊被競爭者取得。',
    rule:
      '專利保護公開申請後的發明，著作權保護表達形式，個資法保護個人資料；隱含於產品與技術背後且需避免洩漏的資訊，最貼近營業秘密。',
    correctReason: '題幹強調「隱含」「避免資訊洩漏給競爭對手」，符合營業秘密法的保護目的。',
    commonTrap: '看到程式或設計就直覺選著作權，但著作權主要保護程式碼表達，不一定保護背後技術秘密。',
    solvingSteps: [
      '先找題幹關鍵字：資訊隱含在產品與技術背後，且要防止洩漏給競爭對手。',
      '再判斷這不是公開換取保護的專利，也不是個人資料保護。',
      '比較著作權與營業秘密：著作權保護作品表達，營業秘密保護未公開且有價值的秘密資訊。',
      '因此選營業秘密法。'
    ],
    optionExplanations: {
      A: '專利法通常要求公開發明內容以換取排他權，不符合題幹強調的保密。',
      B: '著作權法保護程式碼或設計文件的表達，不直接涵蓋所有隱含技術資訊。',
      C: '個人資料保護法的對象是可識別個人的資料，和競爭技術秘密不同。',
      D: '營業秘密法正是用來保護具經濟價值且採取保密措施的技術或經營資訊。'
    },
    keyTakeaways: [
      '營業秘密的重點是未公開、有經濟價值、且採合理保密措施。',
      '專利偏公開換保護；著作權偏表達形式；個資法偏個人資料。',
      '常見陷阱是看到程式就選著作權，卻忽略題目問的是背後未公開資訊。'
    ],
    tags: ['trade-secret', 'intellectual-property']
  }),
  11: makeReview({
    answer: 'B',
    coreTerms: ['物聯網', '感知層', '網路層', '應用層'],
    concept:
      '物聯網常用三層架構理解：感知層負責感測與資料取得，網路層負責傳輸，應用層把資料用於服務與管理。',
    rule:
      '標準三層名稱通常是感知層、網路層、應用層；「可視層」不是常見基本層次。',
    correctReason: 'A、C、D 分別對應應用、感知、網路三層；B 可視層不在常見三層架構中。',
    commonTrap: '可視化是應用層可能提供的功能，不代表它是物聯網三層架構的一層。',
    solvingSteps: [
      '先回想物聯網三層：感知層、網路層、應用層。',
      '再逐一對照選項，A、C、D 都在這三層中。',
      '檢查 B，可視層不是基本架構層名。',
      '題目問何者有誤，因此選 B。'
    ],
    optionExplanations: {
      A: '應用層負責智慧家庭、監控、管理等服務，是物聯網常見層次。',
      B: '可視層不是物聯網三層架構的標準層名；可視化通常只是應用功能。',
      C: '感知層負責感測器、RFID、資料採集等，是三層之一。',
      D: '網路層負責資料傳輸與連接，也是常見三層之一。'
    },
    keyTakeaways: [
      '物聯網三層常見為感知層、網路層、應用層。',
      '可視化是應用服務，不是標準基本層次。',
      '遇到「何者有誤」要找不屬於標準分類的選項。'
    ],
    tags: ['iot']
  }),
  12: makeReview({
    answer: 'B',
    coreTerms: ['Apache Spark', 'GraphX', '分散式運算', '大數據'],
    concept:
      'Apache Spark 是用於大數據與叢集運算的開放原始碼框架，常見模組包含 Spark SQL、Streaming、MLlib 與 GraphX。',
    rule:
      'Spark 的圖形處理框架名稱是 GraphX，不是 GraphY；其餘關於速度、雲端平台與多語言支援的描述大致正確。',
    correctReason: '選項 B 把 GraphX 寫成 GraphY，名稱錯誤，因此是有誤的敘述。',
    commonTrap: '這題不是考 Spark 是否有圖形處理，而是考模組名稱；GraphX 的 X 很容易被誤讀。',
    solvingSteps: [
      '先辨認題目問 Apache Spark 的錯誤敘述。',
      '回想 Spark 特色：記憶體運算、叢集運算、多語言 API、可在雲端部署。',
      '再檢查圖形處理模組名稱，正確為 GraphX。',
      '因此 GraphY 這個選項名稱錯誤。'
    ],
    optionExplanations: {
      A: 'Spark 以記憶體運算等設計提升大數據處理速度，敘述可接受。',
      B: 'Spark 的分散式圖形處理框架是 GraphX，不是 GraphY，因此此敘述有誤。',
      C: 'Spark 可在雲端或叢集環境執行，這不是錯誤敘述。',
      D: 'Spark 支援 Python、Java、R 等語言介面，敘述正確。'
    },
    keyTakeaways: [
      'Apache Spark 是大數據叢集運算框架。',
      'Spark 的圖形處理模組名稱是 GraphX。',
      '常見陷阱是模組名稱拼錯但概念看似合理。'
    ],
    tags: ['apache-spark', 'big-data']
  }),
  13: makeReview({
    answer: 'C',
    coreTerms: ['二進位轉換', '整數除 2', '小數乘 2', '位權'],
    concept:
      '十進位轉二進位可分成整數與小數兩部分。整數部分用 2 的位權分解或反覆除 2；小數部分用反覆乘 2 取整數位。',
    rule:
      '678 = 512+128+32+4+2，所以整數部分是 1010100110；0.625 = 1/2 + 1/8，所以小數部分是 .101。',
    correctReason: '合併整數與小數後得到 1010100110.101。',
    commonTrap: '整數 678 的 2^0 位是 0，若最後一位誤放 1，就會變成 679。',
    solvingSteps: [
      '先找小於 678 的最大 2 次方：512，剩 166。',
      '再依序扣 128、32、4、2，對應位元為 1010100110。',
      '處理小數 0.625：乘 2 得 1.25 取 1，餘 0.25；再乘 2 得 0.5 取 0；再乘 2 得 1.0 取 1。',
      '小數部分為 .101，合併為 1010100110.101。'
    ],
    optionExplanations: {
      A: '1010100111 的整數值是 679，不是 678；小數雖為 .101，但整數錯。',
      B: '整數部分是 679，且 .110 代表 0.75，不符合 0.625。',
      C: '1010100110 等於 678，.101 等於 0.625，因此完整正確。',
      D: '整數部分正確，但 .110 等於 0.75，小數部分錯誤。'
    },
    keyTakeaways: [
      '十進位轉二進位可將整數與小數分開處理。',
      '0.625 = 0.5 + 0.125，所以二進位小數是 .101。',
      '常見陷阱是整數最後一位或小數位權看錯。'
    ],
    tags: ['number-system', 'binary']
  }),
  14: makeReview({
    answer: 'A',
    coreTerms: ['前序', '中序', '後序', '二元樹重建'],
    concept:
      '前序走訪順序是根、左、右；中序是左、根、右；後序是左、右、根。已知前序與中序可遞迴重建二元樹。',
    rule:
      '前序第一個節點是根。把根放到中序中，可切出左子樹與右子樹；對每個子樹重複此規則，最後輸出後序。',
    correctReason:
      '前序 A C D F H B E G 的根為 A；中序 F D H C A E G B 切出左子樹 CDFH、右子樹 BEG，遞迴後後序為 FHDCGEBA。',
    commonTrap: '不要直接反轉前序或中序；三種走訪的根節點位置不同，必須先用中序切分左右子樹。',
    solvingSteps: [
      '先由前序第一個 A 判斷根節點為 A。',
      '在中序 FDHCAEGB 中，A 左邊 FDHC 是左子樹，右邊 EGB 是右子樹。',
      '左子樹前序為 CDFH，中序為 FDHC；根 C，左子樹 DFH，後序為 FHDC。',
      '右子樹前序為 BEG，中序為 EGB；根 B，左子樹 EG，後序為 GEB。',
      '整棵樹後序為左 FHDC、右 GEB、根 A，也就是 FHDCGEBA。'
    ],
    optionExplanations: {
      A: 'FHDCGEBA 符合先左子樹、再右子樹、最後根 A 的後序結果。',
      B: 'FHDCGEAB 把右子樹內部或根的位置放錯，最後根應為 A。',
      C: 'FHDCEGAB 右子樹後序少了 G、E、B 的正確順序。',
      D: 'FHDCEGBA 看似接近，但右子樹與根的位置不符合後序規則。'
    },
    keyTakeaways: [
      '前序第一個是根；中序可用根切左右子樹。',
      '後序輸出順序是左、右、根。',
      '常見陷阱是用背誦反轉取代遞迴切分，容易放錯根節點。'
    ],
    tags: ['tree-traversal']
  }),
  15: makeReview({
    answer: 'D',
    coreTerms: ['多元程式', '批次系統', '多處理器', '分時系統', '即時系統'],
    concept:
      '不同作業系統類型有不同目標。分時系統重點是讓多使用者互動時感覺公平且反應合理；即時系統才要求在時間限制內立即或準時回應。',
    rule:
      '分時系統透過時間片輪流服務使用者，不保證隨時對輸入訊號立刻回應；「立刻回應」更接近即時系統特性。',
    correctReason: '選項 D 把分時系統和即時系統混淆，所以是有誤敘述。',
    commonTrap: '分時系統有互動性，但互動性不等於硬性即時回應。',
    solvingSteps: [
      '先確認題目問不同作業系統敘述何者有誤。',
      '檢查多元程式處理：多個程式共享 CPU，提高利用率，敘述合理。',
      '檢查批次系統：早期批次多依序處理工作，互動性低，敘述可接受。',
      '檢查多處理器系統：多 CPU 可共享匯流排、時脈或記憶體，敘述合理。',
      '檢查分時系統：它不是保證立刻回應的即時系統，因此 D 錯。'
    ],
    optionExplanations: {
      A: '多元程式處理強調多個程式共享系統資源，敘述大致符合。',
      B: '早期批次系統互動性低，一次依批次處理工作，作為描述可接受。',
      C: '多處理器系統可共享部分硬體資源，如匯流排、時脈或記憶體。',
      D: '分時系統提供時間片輪流服務，但不保證對輸入訊號立刻回應；這是即時系統的要求。'
    },
    keyTakeaways: [
      '分時系統追求多使用者互動與公平分享 CPU。',
      '即時系統才強調在時間限制內回應。',
      '常見陷阱是把「反應快」與「即時保證」混為一談。'
    ],
    tags: ['operating-system']
  }),
  16: makeReview({
    answer: 'B',
    coreTerms: ['NoSQL', '分散式資料庫', '最終一致性', 'CAP', '彈性 schema'],
    concept:
      'NoSQL 常用於大量資料、分散式架構與彈性資料模型。為了可用性與擴展性，許多 NoSQL 系統採用最終一致性，而不是每一瞬間都強一致。',
    rule:
      'NoSQL 的常見特徵包含分散式、可支援大量資料與運算、欄位或 schema 較彈性；「資料隨時都一致」不是一般 NoSQL 的必然特性。',
    correctReason: '選項 B 把 NoSQL 說成隨時一致，與許多 NoSQL 系統偏最終一致性的設計相衝突。',
    commonTrap: 'NoSQL 不是沒有一致性，而是不一定保證每一刻都強一致。',
    solvingSteps: [
      '先判斷題目問 NoSQL 敘述何者有誤。',
      '保留 A，因為 NoSQL 常見於分散式資料庫。',
      '保留 C 與 D，因為大量運算與彈性欄位是常見特色。',
      '檢查 B，隨時一致是強一致性說法，不能視為 NoSQL 通則。',
      '因此 B 為錯誤敘述。'
    ],
    optionExplanations: {
      A: 'NoSQL 常見於分散式架構，這是合理描述。',
      B: '許多 NoSQL 為了可用性與擴展性採最終一致性，不保證資料隨時都一致。',
      C: 'NoSQL 常用於大量資料與高擴展場景，支援大量運算是合理敘述。',
      D: 'NoSQL 常有較彈性的資料模型或欄位定義，這不是錯誤點。'
    },
    keyTakeaways: [
      'NoSQL 常見特性是分散式、擴展性、彈性 schema。',
      '許多 NoSQL 採最終一致性，不保證每一瞬間強一致。',
      '常見陷阱是把「一致性仍存在」誤讀成「隨時都一致」。'
    ],
    tags: ['nosql', 'database']
  }),
  17: makeReview({
    answer: 'A',
    coreTerms: ['Clock Cycle', 'CPI', '時脈頻率', '指令數'],
    concept:
      'CPI 表示平均每個指令需要多少時脈週期。若知道時脈頻率與總時間，就能算出總週期數，再除以指令數。',
    rule:
      '總週期數 = 時脈頻率 × 執行時間。10 GHz = 10^10 cycles/sec，200 秒共有 2 × 10^12 cycles；除以 10^12 指令得到 2 cycles/instruction。',
    correctReason: '每個指令平均需要 2 個時脈週期。',
    commonTrap: '不要把 GHz 當成每秒指令數；它是每秒時脈週期數，還要除以指令數求 CPI。',
    solvingSteps: [
      '先把 10 GHz 轉成 10^10 個週期/秒。',
      '再乘以總時間 200 秒，得到 2 × 10^12 個週期。',
      '題目給總指令數 10^12。',
      '用總週期數除以總指令數，得到 2 個週期/指令。'
    ],
    optionExplanations: {
      A: '2 是總週期數 2×10^12 除以 10^12 指令的結果。',
      B: '12 沒有正確套用頻率與時間，常見於把 10^12 指令中的 12 誤當答案。',
      C: '20 多乘了一個 10，與單位換算不符。',
      D: '120 更是把時脈、時間或指令數混乘後的錯誤量級。'
    },
    keyTakeaways: [
      'CPI = 總時脈週期數 / 總指令數。',
      '總時脈週期數 = 頻率 × 時間。',
      '常見陷阱是把時脈頻率直接當指令執行率。'
    ],
    tags: ['cpi', 'cpu-performance']
  }),
  18: makeReview({
    answer: 'B',
    coreTerms: ['插入排序', '平均時間複雜度', 'O(N^2)', '部分排序'],
    concept:
      '插入排序會逐一把新元素插入已排序區間。若資料平均情況沒有接近排序好，每次插入可能需要移動許多前面的元素。',
    rule:
      '插入排序平均與最壞時間複雜度為 O(N^2)，最佳情況在資料幾乎已排序時可接近 O(N)。',
    correctReason: '題目問平均執行時間複雜度，所以應選 O(N^2)。',
    commonTrap: '插入排序對幾乎排序好的資料很快，但那是最佳或特定情況，不是平均情況。',
    solvingSteps: [
      '先確認演算法是插入排序。',
      '再回想插入排序每輪可能要和前面多個元素比較並移動。',
      '平均而言，第 i 個元素要移動約 i/2 次，總和仍是平方級。',
      '因此選 O(N^2)。'
    ],
    optionExplanations: {
      A: 'O(N) 是插入排序在幾乎已排序時的最佳情況，不是平均情況。',
      B: 'O(N^2) 是插入排序平均時間複雜度，符合題意。',
      C: 'O(N log N) 常見於合併排序、堆積排序等，不是插入排序平均。',
      D: 'O(Nlog2N2) 不是插入排序的標準平均複雜度表示。'
    },
    keyTakeaways: [
      '插入排序平均與最壞時間複雜度都是 O(N^2)。',
      '插入排序最佳情況可為 O(N)，但只在資料已接近排序時成立。',
      '常見陷阱是把最佳情況誤當平均情況。'
    ],
    tags: ['sorting', 'time-complexity']
  }),
  19: makeReview({
    answer: 'B',
    coreTerms: ['RAID 0', 'RAID 1', 'RAID 5', 'RAID 6', '可用容量'],
    concept:
      '不同 RAID 組態在效能、容錯與可用容量間取捨。鏡像會犧牲容量來保留完整副本；同位元 RAID 則犧牲一到兩顆硬碟容量做容錯。',
    rule:
      '相同硬碟數量下，RAID 1 鏡像通常只留下約一半可用容量；RAID 0 全部可用，RAID 5 少一顆，RAID 6 少兩顆。',
    correctReason: '在常見比較中 RAID 1 因鏡像保留完整副本，可用空間最小。',
    commonTrap: 'RAID 6 容錯強也會犧牲容量，但在多顆硬碟時通常比 RAID 1 保留更多可用空間。',
    solvingSteps: [
      '先確認題目限定相同硬碟數量，比較可用空間大小。',
      '列出 RAID 0：沒有容錯，容量最大。',
      '列出 RAID 5 與 RAID 6：分別扣一顆與兩顆容量作同位元。',
      '列出 RAID 1：鏡像保存副本，常見可用容量約為總容量一半。',
      '因此可用空間最小者為 RAID 1。'
    ],
    optionExplanations: {
      A: 'RAID 0 不做容錯，幾乎全部容量可用，不會是最小。',
      B: 'RAID 1 採鏡像，需保留資料副本，相同硬碟數下可用空間最小。',
      C: 'RAID 5 扣一顆容量作同位元，通常比 RAID 1 可用空間大。',
      D: 'RAID 6 扣兩顆容量作同位元，容錯較強，但不一定比鏡像更小；本題標準答案為 RAID 1。'
    },
    keyTakeaways: [
      'RAID 0 容量最大但無容錯。',
      'RAID 1 用鏡像換可靠性，可用容量通常約一半。',
      '常見陷阱是只看容錯數量，沒有比較同硬碟數下的容量比例。'
    ],
    tags: ['raid']
  }),
  20: makeReview({
    answer: 'D',
    coreTerms: ['費氏搜尋', '二元搜尋', '加減法', '有序資料'],
    concept:
      '搜尋法會用不同方式縮小搜尋範圍。二元搜尋常用中點計算；費氏搜尋利用 Fibonacci 數列切分範圍，適合用加減法更新位置。',
    rule:
      '費氏搜尋法以 Fibonacci 數作為分割距離，搜尋過程主要透過加法與減法更新索引，不需要一般中點除法。',
    correctReason: '題目問搜尋過程中僅運用加減法，對應費氏搜尋法。',
    commonTrap: '二元搜尋很常見，但中點計算通常涉及除以 2，不符合「僅加減法」。',
    solvingSteps: [
      '先辨認題目問的是搜尋過程的運算方式。',
      '排除雜湊搜尋，因為它依賴雜湊函數，不是單純加減。',
      '排除二元搜尋，因為中點位置常要除以 2。',
      '排除循序搜尋，雖然會遞增索引，但不是以加減法切分範圍的典型答案。',
      '費氏搜尋以 Fibonacci 位移加減更新，因此符合。'
    ],
    optionExplanations: {
      A: '雜湊搜尋依雜湊函數定位，題目描述的加減法特性不適用。',
      B: '二元搜尋要計算中點，常涉及除法或位移，不是本題所問。',
      C: '循序搜尋只是逐一掃描，雖有索引遞增，但不是以加減法進行區間搜尋的標準答案。',
      D: '費氏搜尋使用 Fibonacci 數列距離，主要靠加減法調整搜尋位置。'
    },
    keyTakeaways: [
      '費氏搜尋法利用 Fibonacci 數列切分有序資料。',
      '二元搜尋常用中點，費氏搜尋強調加減法更新位置。',
      '常見陷阱是看到搜尋就選二元搜尋，卻忽略題目限定的運算方式。'
    ],
    tags: ['search', 'fibonacci-search']
  }),
  21: makeReview({
    answer: 'A',
    coreTerms: ['阿姆達爾定律', 'speedup', '比例改善', '瓶頸'],
    concept:
      '阿姆達爾定律說明整體加速受限於可被改善的部分。若只有一部分程式變快，其餘部分仍照原速度執行，整體速度不會等於局部速度倍數。',
    rule:
      '整體加速比 = 1 / ((1-P) + P/S)，其中 P 是被改善比例，S 是該部分加速倍數。本題 P=0.2，S=5。',
    correctReason: '代入得到 1 / (0.8 + 0.2/5) = 1 / 0.84 約 1.19，最接近 1.2。',
    commonTrap: '不能直接把 20% 與 5 倍相乘後說整體變 2 倍；未改善的 80% 仍是瓶頸。',
    solvingSteps: [
      '先辨認這是局部模組改善對整體速度的問題。',
      '套用阿姆達爾定律，改善比例 P=20%=0.2。',
      '該部分速度變為 5 倍，因此該部分時間變為 0.2/5=0.04。',
      '未改善部分時間為 0.8，總新時間比例為 0.84。',
      '整體加速比為 1/0.84，約 1.19，選最接近的 1.2。'
    ],
    optionExplanations: {
      A: '1.2 最接近阿姆達爾定律算出的 1.19，是正確選項。',
      B: '1.8 高估改善效果，忽略未改善的 80% 仍佔大部分時間。',
      C: '2 來自把 20%×5 倍做直覺相乘，沒有套用整體時間公式。',
      D: '5 是局部模組加速倍數，不是整體系統加速倍數。'
    },
    keyTakeaways: [
      '阿姆達爾定律用整體時間比例計算，不用直覺相乘。',
      '只有一部分改善時，未改善部分會限制整體加速。',
      '常見陷阱是把局部加速倍數當成整體加速倍數。'
    ],
    tags: ['amdahl-law', 'performance']
  }),
  22: makeReview({
    answer: 'A',
    answerNote:
      'PDF 題目前方標示答案為 A；本題表格欄位已人工對照 108.pdf 第 3 頁並整理為 Process | Burst Time 結構。',
    coreTerms: ['Round-Robin', 'time quantum', 'waiting time', 'completion time'],
    concept:
      'Round-Robin 排程以固定時間片輪流讓 ready queue 中的行程使用 CPU。等待時間可用完成時間扣掉到達時間與 CPU burst time 計算。',
    rule:
      '三個行程同時到達時，平均等待時間 = 各行程等待時間總和 / 行程數；等待時間 = completion time - arrival time - burst time。',
    correctReason:
      '時間片 4 ms，P1 先跑 0-4 後剩 16，P2 4-6 完成，P3 6-8 完成，P1 之後 8-24 完成。等待時間為 P1=4、P2=4、P3=6，平均 14/3。',
    commonTrap: '不要把 P1 後續連跑的時間都算成等待；等待時間只算不在 CPU 上且尚未完成的 ready 時間。',
    extractionStatus: 'verified',
    solvingSteps: [
      '先列出 ready queue 順序：P1、P2、P3，三者到達時間視為 0。',
      '時間片為 4 ms，P1 先跑 0-4，剩 16 ms。',
      'P2 只需 2 ms，於 4-6 完成；P3 也只需 2 ms，於 6-8 完成。',
      '剩下只有 P1，因此 P1 從 8 到 24 分段跑完，完成時間 24。',
      '等待時間：P1=24-0-20=4，P2=6-0-2=4，P3=8-0-2=6。',
      '平均等待時間為 (4+4+6)/3 = 14/3 ms。'
    ],
    optionExplanations: {
      A: '14/3 是依完成時間扣除 burst time 後的平均等待時間，符合 Round-Robin 時序。',
      B: '16/3 多算了部分等待時間，常見於把 P2 或 P3 的完成點放晚。',
      C: '20/3 高估等待時間，通常是把 P1 後續執行時間也錯算為等待。',
      D: '24/3 等於 8，表示把平均等待時間誤當成總完成時間附近的量。'
    },
    keyTakeaways: [
      'Round-Robin 要先畫時間軸，再算完成時間。',
      '等待時間 = 完成時間 - 到達時間 - burst time。',
      '常見陷阱是把正在執行 CPU 的時間也算進等待時間。'
    ],
    tags: ['round-robin', 'scheduling']
  }),
  23: makeReview({
    answer: 'C',
    coreTerms: ['ERP', '資訊系統', '企業流程整合', '財務會計採購'],
    concept:
      '企業資源規劃 ERP 用來整合企業內部不同部門的流程與資料，讓財務、會計、採購、庫存、生產等資訊在同一系統中流通。',
    rule:
      '題幹列出財務、會計、採購等跨部門業務整合，正是 ERP 的典型目的；其他系統各有焦點但不以整合企業資源流程為核心。',
    correctReason: '企業資源規劃的名稱與功能都對應跨部門資源與流程整合。',
    commonTrap: '管理資訊系統名稱很廣，但題目講到跨部門資源整合時，通常要選 ERP。',
    solvingSteps: [
      '先抓關鍵字：財務、會計、採購等業務整合。',
      '判斷這是跨部門流程與資料整合，不只是提供報表或專家建議。',
      '比對 ERP 的定義：整合企業資源與流程。',
      '因此選企業資源規劃。'
    ],
    optionExplanations: {
      A: '管理資訊系統可提供管理報表，但題目強調跨部門流程整合，較精確是 ERP。',
      B: '專家系統模擬專家推論，不是用來整合財務、會計、採購流程。',
      C: '企業資源規劃 ERP 正是整合企業內部多部門資料與流程的系統。',
      D: '決策支援系統協助分析與決策，不是主要負責日常業務流程整合。'
    },
    keyTakeaways: [
      'ERP 的核心是企業資源與跨部門流程整合。',
      'MIS 偏管理資訊與報表，DSS 偏決策分析，專家系統偏知識推論。',
      '常見陷阱是看到「資訊系統」就選泛稱，沒有抓到整合流程的關鍵字。'
    ],
    tags: ['erp', 'information-system']
  }),
  24: makeReview({
    answer: 'D',
    coreTerms: ['SQL', 'GROUP BY', 'aggregate function', 'SUM'],
    concept:
      'GROUP BY 用來把資料列依欄位分組，分組後通常搭配聚合函數計算每組的數量、總和、平均、最大或最小值。',
    rule:
      'SUM 是聚合函數，常和 GROUP BY 一起用來計算每組總和；SET、ALTER、COMMIT 分別屬更新、結構變更或交易控制語意。',
    correctReason: '題目問 GROUP BY 最常與何種功能指令一起使用，SUM 符合分組後聚合計算。',
    commonTrap: 'GROUP BY 是查詢語法，不是交易控制或資料表結構變更語法。',
    solvingSteps: [
      '先確認 GROUP BY 的用途是依欄位分組。',
      '再想分組後通常要做什麼：計算每組統計值。',
      '在選項中找聚合函數，SUM 是計算總和。',
      '因此 GROUP BY 最常與 SUM 這類聚合函數搭配。'
    ],
    optionExplanations: {
      A: 'SET 常用在 UPDATE 指定欄位值，並非分組聚合的主要搭配。',
      B: 'ALTER 用於修改資料庫物件結構，不是 GROUP BY 查詢的常見搭配。',
      C: 'COMMIT 用於提交交易，和分組統計無直接搭配。',
      D: 'SUM 是聚合函數，可對每個 GROUP BY 分組計算總和，符合題意。'
    },
    keyTakeaways: [
      'GROUP BY 的核心是把資料分組。',
      '分組後常搭配 COUNT、SUM、AVG、MAX、MIN 等聚合函數。',
      '常見陷阱是把 SQL 指令類型混在一起，忽略 GROUP BY 是查詢統計用途。'
    ],
    tags: ['sql', 'group-by']
  }),
  25: makeReview({
    answer: 'B',
    coreTerms: ['正規化', '新增異常', '資料重複', '資料不一致', '查詢效能'],
    concept:
      '資料庫正規化把資料拆成較合理的關聯，以降低重複與異常。它主要改善資料一致性與維護性，不是以提升查詢效能為首要目標。',
    rule:
      '正規化可減少新增、更新、刪除異常，也可降低資料重複與不一致；查詢效能有時反而因為表拆多、join 增加而下降。',
    correctReason: '選項 B 查詢效能不是正規化主要改善項目，因此是「不是透過正規化改善」的答案。',
    commonTrap: '資料設計更正確不等於查詢一定更快；效能常需要索引、反正規化或查詢調校。',
    solvingSteps: [
      '先判斷題目問「不是」正規化改善的項目。',
      '檢查資料異常、資料重複、資料不一致，這些都是正規化常見改善目標。',
      '再檢查查詢效能，正規化不保證提升，甚至可能因 join 增加而變慢。',
      '因此選 B。'
    ],
    optionExplanations: {
      A: '新增資料後產生之異常是正規化要降低的典型問題。',
      B: '查詢效能不是正規化的主要改善目標，可能需要另外靠索引或反正規化處理。',
      C: '資料重複是正規化要減少的核心問題。',
      D: '資料不一致常由重複資料造成，正規化能降低此風險。'
    },
    keyTakeaways: [
      '正規化重點是降低重複、異常與不一致。',
      '查詢效能不是正規化的必然改善結果。',
      '常見陷阱是把資料正確性與效能改善混為一談。'
    ],
    tags: ['normalization', 'database']
  }),
  26: makeReview({
    answer: 'A',
    coreTerms: ['數據機', 'modem', '數位信號', '類比信號'],
    concept:
      '數據機 modem 的名稱來自 modulator-demodulator，功能是在數位資料與類比傳輸訊號之間調變與解調。',
    rule:
      '需要把數位信號與類比信號互相轉換時，對應設備是數據機；交換機、路由器、多工器負責的是交換、路由或多路共用。',
    correctReason: '題幹明確說數位與類比信號轉換，這是數據機的定義。',
    commonTrap: '網路設備都可能出現在資料傳輸路徑上，但只有數據機負責數位/類比轉換。',
    solvingSteps: [
      '先抓關鍵字：數位信號與類比信號轉換。',
      '回想 modem = modulation + demodulation。',
      '排除交換機與路由器，因為它們分別處理資料交換與路徑選擇。',
      '排除多工器，因為它負責多路訊號共用媒介。',
      '因此選數據機。'
    ],
    optionExplanations: {
      A: '數據機負責調變與解調，可在數位資料和類比訊號間轉換。',
      B: '交換機主要在區域網路中轉送訊框，不負責數位與類比轉換。',
      C: '多工器把多個訊號合併到同一媒介，不是數位/類比轉換設備。',
      D: '路由器依 IP 路徑轉送封包，不負責調變解調。'
    },
    keyTakeaways: [
      'Modem = modulator-demodulator，即調變與解調。',
      '數位/類比轉換找數據機，不是交換機或路由器。',
      '常見陷阱是把所有網路設備的功能混在一起。'
    ],
    tags: ['modem', 'networking']
  }),
  27: makeReview({
    answer: 'B',
    coreTerms: ['子網路遮罩', 'CIDR', '網路位址', '位元 AND'],
    concept:
      '網路位址是把 IP 位址與子網路遮罩做位元 AND 的結果。遮罩 255.255.240.0 表示第三個八位元組前 4 bits 是網路位元。',
    rule:
      '240 的二進位是 11110000，所以第三個八位元組以 16 為區塊大小。34 落在 32 到 47 的區間，因此網路位址第三段是 32。',
    correctReason: '200.45.34.56/20 的網路位址為 200.45.32.0。',
    commonTrap: '不要把主機位址的第三段 34 直接保留；遮罩會把低 4 bits 歸零。',
    solvingSteps: [
      '先把遮罩 255.255.240.0 轉成重點：第三段區塊大小為 256-240=16。',
      '再找目的位址第三段 34 所在區間：32 到 47。',
      '因此第三段網路值為 32，第四段主機位元歸零為 0。',
      '合併前兩段不變，得到 200.45.32.0。'
    ],
    optionExplanations: {
      A: '200.45.31.0 落在前一個 /20 區塊，不能包含第三段 34。',
      B: '200.45.32.0 是 34 在 16 為區塊大小下的正確網路位址。',
      C: '200.45.33.0 沒有把第三段低 4 bits 歸零，不是網路位址。',
      D: '200.45.34.0 只把第四段歸零，忽略遮罩第三段也有主機位元。'
    },
    keyTakeaways: [
      '網路位址 = IP 位址 AND 子網路遮罩。',
      '遮罩 240 對應第三段區塊大小 16。',
      '常見陷阱是只把最後一段歸零，忘記遮罩可能跨到第三段。'
    ],
    tags: ['subnet', 'cidr']
  }),
  28: makeReview({
    answer: 'C',
    coreTerms: ['機密性', '加密', '防毒', '壓縮', '防火牆'],
    concept:
      '機密性是資訊安全三要素之一，目標是讓未授權者即使取得資料也無法理解內容。傳輸中保護機密性最直接的方法是加密。',
    rule:
      '防止機密資訊外洩，應使用加密讓資料在傳輸途中呈現不可讀狀態；防火牆、防毒與壓縮都不是主要的機密性保護手段。',
    correctReason: '題目問網路傳送時防範機密資訊外洩，資料加密最符合。',
    commonTrap: '防火牆能控制連線，但允許的連線中資料仍可能被竊聽；機密性仍需加密。',
    solvingSteps: [
      '先辨認題目核心是機密資訊在網路傳輸中外洩。',
      '機密性要求未授權者看不懂資料內容。',
      '加密可把明文轉成密文，即使被截取也難以讀取。',
      '因此選將資料加密。'
    ],
    optionExplanations: {
      A: '防毒軟體主要偵測惡意程式，不能保證傳輸內容不被竊聽。',
      B: '壓縮只是減少資料大小，不是安全保護；壓縮後仍可能被還原。',
      C: '加密直接保護傳輸資料的機密性，是本題主要方法。',
      D: '防火牆可控管流量，但對已允許連線中的內容機密性仍需加密。'
    },
    keyTakeaways: [
      '機密性保護的核心方法是加密。',
      '防火牆控制流量，防毒對抗惡意程式，壓縮節省空間。',
      '常見陷阱是把任何安全工具都視為能保護資料內容。'
    ],
    tags: ['confidentiality', 'encryption']
  }),
  29: makeReview({
    answer: 'A',
    coreTerms: ['公鑰加密', 'public key', 'private key', '加密操作'],
    concept:
      '公鑰密碼系統有一對鑰匙：公鑰與私鑰。若只問「以公鑰加密」這個操作，實際加密時使用的是收件者公鑰；解密才用相對應私鑰。',
    rule:
      '題目 wording 是「加密時會使用到幾把鑰匙」，依官方標記採操作面解讀：加密動作用 1 把公鑰。',
    correctReason: '加密階段只用公鑰一把；雖然整個系統有公私鑰兩把，但不是題目問的操作。',
    commonTrap: '看到 public-key encryption 就選 2 把鑰匙是常見直覺，但本題問的是「加密時」而不是「整個金鑰對」。',
    solvingSteps: [
      '先區分整個公鑰系統與單一加密操作。',
      '公鑰系統確實包含公鑰與私鑰。',
      '但加密訊息時，寄件者只需使用收件者公鑰。',
      '解密時才使用私鑰。',
      '題目前方官方答案標示 A，因此依加密操作選 1 把鑰。'
    ],
    optionExplanations: {
      A: '1 把鑰符合「加密動作使用公鑰」的操作面解讀。',
      B: '2 把鑰描述整個公私鑰配對，但加密當下不是兩把都用。',
      C: '3 把鑰沒有對應公鑰密碼的基本模型。',
      D: '4 把鑰更不符合公鑰加密操作或金鑰對概念。'
    },
    keyTakeaways: [
      '公鑰系統有公鑰與私鑰一對。',
      '加密操作使用公鑰；解密操作使用私鑰。',
      '常見陷阱是沒有看清題目問「加密時」還是問整個金鑰系統。'
    ],
    tags: ['public-key-encryption']
  }),
  30: makeReview({
    answer: 'D',
    coreTerms: ['tracert', 'ping', 'ipconfig', 'netstat', '路徑追蹤'],
    concept:
      '網路故障排除時，不同指令用途不同。若要知道封包經過哪些路由節點、在哪一跳可能中斷，需要路徑追蹤工具。',
    rule:
      'Windows 中 tracert 用 TTL 遞增方式顯示到目的地的每一跳路由；ping 只測可達性，ipconfig 看本機設定，netstat 看連線狀態。',
    correctReason: '題目問「想知道網路何處不通」並進行追蹤，tracert 最符合。',
    commonTrap: 'ping 能知道通不通，但通常不能告訴你卡在哪一跳。',
    solvingSteps: [
      '先判斷需求不是只看本機設定，而是追蹤網路路徑。',
      '排除 ipconfig，因為它顯示本機 IP 設定。',
      '排除 ping，因為它只測目的地是否回應。',
      '排除 netstat，因為它顯示本機連線與連接埠狀態。',
      'tracert 可列出每一跳，因此最適合。'
    ],
    optionExplanations: {
      A: 'ipconfig 用來查本機 IP、閘道、DNS 等設定，不會追蹤路由節點。',
      B: 'ping 可測目的地是否可達，但通常不能指出中斷發生在哪一跳。',
      C: 'netstat 顯示連線與連接埠狀態，不是路徑追蹤工具。',
      D: 'tracert 會追蹤封包經過的路由節點，可協助判斷何處不通。'
    },
    keyTakeaways: [
      'tracert 用於路徑追蹤，ping 用於基本連通測試。',
      'ipconfig 查本機網路設定，netstat 查連線狀態。',
      '常見陷阱是把「通不通」和「哪一段不通」混為同一需求。'
    ],
    tags: ['tracert', 'network-diagnostics']
  }),
  31: makeReview({
    answer: 'A',
    answerNote: 'PDF 題目前方以全形「Ａ」標示答案；資料已正規化為 A，並依檢查碼用途完成解析。',
    coreTerms: ['檢查碼', '資料正確性', '錯誤偵測', '校驗'],
    concept:
      '檢查碼是依原始資料經過規則計算出的附加碼，用來檢查輸入或傳輸時是否有常見錯誤，例如打錯位數或數字。',
    rule:
      '檢查碼的主要功能是提升資料正確性與偵測錯誤；它不是用來加密資料、遮蔽隱私或提升處理速度。',
    correctReason: '身分證號碼與銀行帳號設檢查碼，是為了在輸入或處理時檢查資料是否合理，提升正確性。',
    commonTrap: '檢查碼能偵測錯誤，但不代表資料變得隱密；能看出錯誤不等於能保密。',
    solvingSteps: [
      '先辨認檢查碼的用途是校驗資料是否可能輸入錯誤。',
      '檢查身分證號碼與銀行帳號這類資料，重點在避免錯號、漏號或轉置。',
      '排除隱密性、美觀與速度，因為它們不是檢查碼主要目的。',
      '因此選提升資料正確性。'
    ],
    optionExplanations: {
      A: '檢查碼可用規則偵測輸入錯誤，主要目的就是提升資料正確性。',
      B: '增加資料隱密性需要加密或遮蔽；檢查碼本身不保護內容秘密。',
      C: '位數對齊或美觀不是檢查碼的安全與資料品質目的。',
      D: '檢查碼通常還需要額外計算，不是為了加快處理速度。'
    },
    keyTakeaways: [
      '檢查碼用來偵測資料錯誤並提升正確性。',
      '檢查碼不等於加密，也不提供隱密性。',
      '常見陷阱是把錯誤偵測和資料保密混在一起。'
    ],
    tags: ['checksum', 'data-validation']
  }),
  32: makeReview({
    answer: 'C',
    coreTerms: ['Huffman encoding', '可變長度編碼', '頻率', '前綴碼', 'tree'],
    concept:
      'Huffman encoding 依符號出現頻率建立編碼樹，常出現的符號給較短碼，少出現的符號給較長碼，以降低平均碼長。',
    rule:
      'Huffman 是可變長度編碼，不是每個字元都等長；它可用樹表示，且通常能減少資料量。',
    correctReason: '選項 C 說每個字元的代碼長度相同，與 Huffman 的可變長度特性相反。',
    commonTrap: '二進位編碼不代表固定長度；Huffman 的重點正是依頻率調整碼長。',
    solvingSteps: [
      '先回想 Huffman 的用途是壓縮資料。',
      '再確認它以字元頻率建立樹狀編碼。',
      '常見字元短碼、罕見字元長碼，因此碼長不相同。',
      '題目問何者有誤，所以選 C。'
    ],
    optionExplanations: {
      A: 'Huffman 可降低平均碼長，因此可以減少資料量。',
      B: 'Huffman 的建立基礎就是字元出現頻率。',
      C: 'Huffman 是可變長度編碼，不是每個字元代碼長度相同，因此此敘述有誤。',
      D: 'Huffman 編碼可用二元樹表示，從根到葉的路徑就是代碼。'
    },
    keyTakeaways: [
      'Huffman encoding 是依頻率建立的可變長度編碼。',
      '常見符號短碼、少見符號長碼，可降低平均碼長。',
      '常見陷阱是把二進位編碼誤認成固定長度編碼。'
    ],
    tags: ['huffman', 'compression']
  }),
  33: makeReview({
    answer: 'D',
    coreTerms: ['SNMP', 'SMTP', 'OSPF', 'RIP', 'network management'],
    concept:
      '網路管理協定用來監控與管理網路設備狀態，例如查詢介面流量、設備狀態或告警。SNMP 是最典型的網路管理協定。',
    rule:
      'SNMP = Simple Network Management Protocol；SMTP 是郵件傳送，OSPF 與 RIP 是路由協定。',
    correctReason: '四個選項中只有 SNMP 的功能定位是網路管理。',
    commonTrap: 'OSPF、RIP 也管理路由資訊，但它們是路由協定，不是一般網路管理協定。',
    solvingSteps: [
      '先抓題目關鍵字「網路管理」。',
      '比對 SMTP：郵件傳送協定，排除。',
      '比對 OSPF 與 RIP：路由協定，排除。',
      'SNMP 名稱直接包含 Network Management，符合題意。'
    ],
    optionExplanations: {
      A: 'SMTP 用於電子郵件傳送，不是網路設備管理協定。',
      B: 'OSPF 是鏈路狀態路由協定，負責路由選擇，不是 SNMP 式管理。',
      C: 'RIP 是距離向量路由協定，也不是網路管理協定。',
      D: 'SNMP 用於監控與管理網路設備，是正確答案。'
    },
    keyTakeaways: [
      'SNMP 是 Simple Network Management Protocol。',
      'SMTP 管郵件，OSPF/RIP 管路由。',
      '常見陷阱是把路由控制和設備管理混為一談。'
    ],
    tags: ['snmp', 'network-management']
  }),
  34: makeReview({
    answer: 'C',
    coreTerms: ['CRC', '二進位除法', '生成多項式', '錯誤偵測', 'burst error'],
    concept:
      'CRC 透過資料多項式除以生成多項式取得餘數，接收端再重算餘數來偵測傳輸錯誤。它對許多錯誤型態很有效，但不是能偵測所有可能錯誤。',
    rule:
      'CRC 以 GF(2) 二進位除法為基礎，餘數可能全為 0；可保證偵測的錯誤類型取決於生成多項式，不能籠統說能偵測所有偶數位元連串錯誤。',
    correctReason: '選項 C 使用「所有」且限定偶數位元一連串錯誤，過度保證 CRC 能力，因此是非特性。',
    commonTrap: 'CRC 偵測能力很強，但任何「所有錯誤」的絕對語句都要檢查生成多項式條件。',
    solvingSteps: [
      '先辨認題目問 CRC 何者不是特性。',
      '確認 CRC 的基本運算是二進位除法，A 正確。',
      'CRC 餘數可能剛好全為 0，B 可接受。',
      'CRC 對 burst error 有高機率或在特定長度內保證偵測，D 可接受。',
      'C 說能偵測所有偶數位元連串錯誤，保證過度，因此選 C。'
    ],
    optionExplanations: {
      A: 'CRC 的計算確實以 GF(2) 二進位除法為基礎。',
      B: 'CRC 餘數可能是全 0，這不代表資料一定錯或一定沒錯，仍需依流程檢查。',
      C: 'CRC 不能無條件保證偵測所有偶數位元一連串錯誤，敘述過度，是本題答案。',
      D: 'CRC 對長 burst error 通常仍有很高偵測機率，敘述方向符合 CRC 特性。'
    },
    keyTakeaways: [
      'CRC 用生成多項式做 GF(2) 除法取得餘數。',
      'CRC 的保證能力取決於生成多項式，不可無條件宣稱偵測所有錯誤。',
      '常見陷阱是看到 CRC 很強就接受絕對化敘述。'
    ],
    tags: ['crc', 'error-detection']
  }),
  35: makeReview({
    answer: 'B',
    coreTerms: ['頻率', '週期', 'Hz', 'T=1/f'],
    concept:
      '頻率表示每秒振盪幾次，週期表示完成一次振盪需要多少秒。兩者互為倒數。',
    rule:
      '週期 T = 1 / 頻率 f。本題 f=10 Hz，也就是每秒 10 次，所以 T=1/10 秒=0.1 秒。',
    correctReason: '10 Hz 的倒數是 0.1 秒。',
    commonTrap: 'Hz 已經是每秒次數，不要再乘以 10；週期要取倒數。',
    solvingSteps: [
      '先確認頻率 f=10 Hz。',
      '套用公式 T=1/f。',
      '計算 T=1/10=0.1 秒。',
      '比對選項，選 B。'
    ],
    optionExplanations: {
      A: '0.01 秒對應頻率 100 Hz，不是 10 Hz。',
      B: '0.1 秒是 10 Hz 的倒數，正確。',
      C: '1 秒對應頻率 1 Hz，頻率太低。',
      D: '10 秒對應頻率 0.1 Hz，與題目相反。'
    },
    keyTakeaways: [
      '頻率與週期互為倒數：T=1/f。',
      'Hz 的意思是每秒幾次。',
      '常見陷阱是把頻率與週期當成正比；其實頻率越高，週期越短。'
    ],
    tags: ['signal', 'frequency']
  }),
  36: makeReview({
    answer: 'B',
    coreTerms: ['OSI', '資料連接層', '實體定址', '邏輯定址', '訊框'],
    concept:
      'OSI 資料連接層負責相鄰節點間的資料傳送，常見功能包含 framing、MAC 實體位址、錯誤偵測與流量控制等。邏輯定址屬網路層。',
    rule:
      '第二層使用 MAC 位址等實體定址；第三層才使用 IP 等邏輯定址。',
    correctReason: '選項 B 邏輯定址不是資料連接層主要功能，所以是有誤敘述。',
    commonTrap: '實體定址與邏輯定址名稱相近，但分別對應 OSI 第 2 層與第 3 層。',
    solvingSteps: [
      '先確認題目問 OSI 資料連接層何者有誤。',
      '資料連接層會把資料流分封成訊框，並使用 MAC 位址。',
      '資料連接層可做一定的流量控制與錯誤偵測。',
      '邏輯定址是網路層 IP 的工作，因此 B 有誤。'
    ],
    optionExplanations: {
      A: '實體定址或 MAC 位址屬資料連接層功能。',
      B: '邏輯定址屬網路層功能，不是資料連接層主要功能。',
      C: '資料連接層可提供相鄰節點間的流量控制，敘述可接受。',
      D: '將資料封裝成訊框是資料連接層核心功能。'
    },
    keyTakeaways: [
      '資料連接層處理訊框與 MAC 位址。',
      '邏輯定址通常是網路層 IP 位址。',
      '常見陷阱是把第 2 層實體定址和第 3 層邏輯定址混淆。'
    ],
    tags: ['osi', 'data-link-layer']
  }),
  37: makeReview({
    answer: 'D',
    coreTerms: ['TCP', 'checksum', 'ACK', 'timer', 'slow start'],
    concept:
      'TCP 的可靠傳輸靠檢查和偵測錯誤、ACK 回應確認、計時器偵測遺失並重傳。壅塞控制是另一組機制，用來避免網路過載。',
    rule:
      '檢查和、回應與計時都可歸於錯誤偵測與改正相關；緩慢啟動 slow start 屬於 TCP 壅塞控制，不是錯誤偵測與改正。',
    correctReason: '題目問有關 TCP 錯誤偵測與改正何者有誤，D 把壅塞控制機制放進來，因此錯。',
    commonTrap: 'TCP 的可靠性與壅塞控制都屬 TCP，但考點不同；不要看到 TCP 機制就全接受。',
    solvingSteps: [
      '先鎖定題目範圍是錯誤偵測與改正。',
      '檢查和可偵測資料錯誤。',
      'ACK 回應與計時器可配合重傳修正遺失或錯誤。',
      '緩慢啟動是調整壅塞視窗的壅塞控制方法，不屬此範圍。',
      '因此選 D。'
    ],
    optionExplanations: {
      A: '檢查和 checksum 是 TCP 偵測錯誤的基本欄位。',
      B: '回應 ACK 可確認資料是否成功收到，與可靠傳輸相關。',
      C: '計時器 timeout 可觸發重傳，屬錯誤或遺失修正流程。',
      D: '緩慢啟動是壅塞控制機制，不是 TCP 錯誤偵測與改正機制。'
    },
    keyTakeaways: [
      'TCP 可靠傳輸仰賴 checksum、ACK、timeout 與重傳。',
      'Slow start 屬於壅塞控制。',
      '常見陷阱是把 TCP 的所有機制混成同一類。'
    ],
    tags: ['tcp', 'reliable-transport']
  }),
  38: makeReview({
    answer: 'C',
    coreTerms: ['CSMA/CD', 'Ethernet', 'collision domain', 'minimum frame size', 'routing'],
    concept:
      'CSMA/CD 是傳統共享式乙太網路處理碰撞的媒體存取控制方法，重點在載波偵聽、碰撞偵測、訊框長度與碰撞區間。',
    rule:
      'CSMA/CD 屬資料連接層的媒體存取控制；路徑選擇是網路層路由功能，與 CSMA/CD 標準無關。',
    correctReason: '最小訊框長度、資料傳輸率與碰撞區間都和碰撞偵測條件有關；路徑選擇不屬 CSMA/CD。',
    commonTrap: '網路傳輸中的「路徑」聽起來也和通訊有關，但那是路由器與網路層概念。',
    solvingSteps: [
      '先辨認 CSMA/CD 的範圍是乙太網路媒體存取與碰撞處理。',
      '檢查最小訊框長度，這和碰撞偵測時間有關。',
      '檢查資料傳輸率，會影響碰撞偵測與訊框長度設計。',
      '檢查碰撞區間，直接是 CSMA/CD 概念。',
      '路徑選擇屬路由，不屬 CSMA/CD。'
    ],
    optionExplanations: {
      A: '最小訊框長度與碰撞是否能在傳輸期間被偵測有關，屬 CSMA/CD 相關概念。',
      B: '資料傳輸率影響碰撞偵測時間與網路規格，和 CSMA/CD 有關。',
      C: '路徑選擇是網路層路由功能，不屬 CSMA/CD 標準。',
      D: '碰撞區間 collision domain 是 CSMA/CD 的核心概念。'
    },
    keyTakeaways: [
      'CSMA/CD 是乙太網路媒體存取與碰撞處理機制。',
      '路徑選擇是網路層路由，不是資料連接層碰撞控制。',
      '常見陷阱是把所有網路傳輸概念都歸到 CSMA/CD。'
    ],
    tags: ['csma-cd', 'ethernet']
  }),
  39: makeReview({
    answer: 'C',
    coreTerms: ['OSI 傳輸層', '流量控制', '連線控制', '錯誤控制', '邏輯定址'],
    concept:
      'OSI 傳輸層負責端到端傳輸服務，常見功能包含分段、重組、連線控制、流量控制與錯誤控制。邏輯定址是網路層職責。',
    rule:
      '傳輸層使用連接埠等端點資訊；IP 邏輯定址屬第三層網路層。',
    correctReason: '選項 C 邏輯定址不是傳輸層主要功能，所以是有誤敘述。',
    commonTrap: '傳輸層和網路層都負責把資料送到目的地，但位址層級不同：IP 找主機，port 找程序。',
    solvingSteps: [
      '先確認題目範圍是 OSI 傳輸層。',
      '流量控制、連線控制與錯誤控制都可屬傳輸層功能。',
      '邏輯定址通常指 IP 位址，是網路層功能。',
      '因此 C 是有誤敘述。'
    ],
    optionExplanations: {
      A: '流量控制可由傳輸層協調端到端傳送速率，敘述正確。',
      B: '連線控制如建立、維持與終止連線，可屬傳輸層功能。',
      C: '邏輯定址屬網路層 IP 位址功能，不是傳輸層主要功能。',
      D: '錯誤控制與可靠傳輸可由傳輸層提供，敘述可接受。'
    },
    keyTakeaways: [
      '傳輸層負責端到端傳輸，常見功能有流量、連線、錯誤控制。',
      '邏輯定址是網路層 IP 的工作。',
      '常見陷阱是把 IP 位址與傳輸層 port 混淆。'
    ],
    tags: ['osi', 'transport-layer']
  }),
  40: makeReview({
    answer: 'A',
    coreTerms: ['TCP 壅塞控制', 'AIMD', 'slow start', 'additive increase', 'multiplicative decrease'],
    concept:
      'TCP 壅塞控制調整壅塞視窗，避免送太快造成網路過載。常見策略包含慢啟動與 AIMD。',
    rule:
      'AIMD 是 additive increase、multiplicative decrease，也就是添加式增加、乘法式減少；不是乘法式增加。',
    correctReason: '選項 A「乘法式增加」與 TCP 壅塞避免階段的添加式增加相反，因此有誤。',
    commonTrap: 'AIMD 兩個方向不同：增加是加法，減少是乘法，不要把兩者都記成乘法。',
    solvingSteps: [
      '先辨認題目問 TCP 壅塞控制何者有誤。',
      '回想慢啟動是 TCP 壅塞控制的一部分。',
      '回想壅塞避免的核心是 AIMD。',
      'AIMD 代表添加式增加與乘法式減少。',
      '因此「乘法式增加」有誤。'
    ],
    optionExplanations: {
      A: 'TCP 壅塞避免採添加式增加，不是乘法式增加，因此此選項有誤。',
      B: '乘法式減少是 AIMD 中偵測壅塞後降低視窗的規則。',
      C: '緩慢起動 slow start 是 TCP 壅塞控制的重要階段。',
      D: '添加式增加是 AIMD 中穩定提高壅塞視窗的方式。'
    },
    keyTakeaways: [
      'TCP 壅塞控制包含 slow start 與 congestion avoidance 等機制。',
      'AIMD = additive increase, multiplicative decrease。',
      '常見陷阱是把增加與減少方向的規則顛倒。'
    ],
    tags: ['tcp', 'congestion-control']
  }),
  41: makeReview({
    answer: 'A',
    coreTerms: ['ARP', 'IP to MAC', 'broadcast request', 'unicast reply'],
    concept:
      'ARP 用來在同一區域網路中，根據已知 IP 位址查詢對應的 MAC 實體位址。它通常以廣播發問，由目標主機單點回應。',
    rule:
      'ARP request 使用廣播傳送，ARP reply 使用單播回應；不是使用群播作為主要傳送方式。',
    correctReason: '選項 A 說使用群播傳送，與 ARP 的廣播請求機制不符。',
    commonTrap: '廣播、群播、單播都是一對多/一對一傳送概念，但 ARP request 特別是廣播。',
    solvingSteps: [
      '先回想 ARP 目的：取得 IP 對應的實體 MAC 位址。',
      'ARP request 因不知道目標 MAC，會用廣播詢問區域網路。',
      '目標主機知道後，以單點位址回應。',
      '因此群播傳送不是 ARP 的正確敘述。'
    ],
    optionExplanations: {
      A: 'ARP request 使用廣播，不是群播，因此此敘述有誤。',
      B: 'ARP reply 通常由目標主機單播回應查詢者，敘述正確。',
      C: 'ARP request 使用廣播傳送，敘述正確。',
      D: 'ARP 的目的就是取得實體位址 MAC，敘述正確。'
    },
    keyTakeaways: [
      'ARP 將 IP 位址解析成 MAC 位址。',
      'ARP request 是廣播，ARP reply 通常是單播。',
      '常見陷阱是把廣播 broadcast 與群播 multicast 混淆。'
    ],
    tags: ['arp']
  }),
  42: makeReview({
    answer: 'C',
    coreTerms: ['UDP', '不可靠傳輸', 'checksum', 'port number', 'TCP'],
    concept:
      'UDP 是簡單的傳輸層協定，不建立連線，也不提供 TCP 那樣的重傳、排序與流量控制。但 UDP 標頭仍有 checksum 可做錯誤偵測。',
    rule:
      'UDP 可被稱為不可靠傳輸，但不能說完全不提供錯誤偵測；其 checksum 就是錯誤偵測欄位。',
    correctReason: '選項 C「完全不提供錯誤偵測」過度絕對，與 UDP checksum 不符。',
    commonTrap: '不可靠不等於完全沒有檢查；不可靠指不保證送達、排序與重傳。',
    solvingSteps: [
      '先確認題目問 UDP 敘述何者有誤。',
      'UDP 不建立可靠連線，A 可接受。',
      'UDP 適合不需要 TCP 流量與錯誤控制的應用，B 可接受。',
      'UDP 有 checksum，因此 C 的「完全不提供錯誤偵測」錯誤。',
      'TCP 與 UDP 可以使用相同數字的 port，因協定不同，D 可接受。'
    ],
    optionExplanations: {
      A: 'UDP 不保證可靠送達、重傳與排序，稱為不可靠傳輸可接受。',
      B: '若應用可自行處理或不在乎流量與錯誤控制，UDP 可能適合。',
      C: 'UDP 標頭有 checksum，可提供錯誤偵測，因此「完全不提供」有誤。',
      D: 'TCP port 80 與 UDP port 80 是不同傳輸協定命名空間，可同時存在。'
    },
    keyTakeaways: [
      'UDP 不可靠，但仍有 checksum 錯誤偵測。',
      '不可靠代表不保證重傳、排序、流量控制等服務。',
      '常見陷阱是把「沒有 TCP 那麼可靠」誤解成「什麼檢查都沒有」。'
    ],
    tags: ['udp']
  }),
  43: makeReview({
    answer: 'D',
    coreTerms: ['多工', 'multiplexing', '通路', '頻道'],
    concept:
      '多工是讓多個訊號或頻道共用同一條實體通路或傳輸媒介，以提高媒介利用率。接收端再用對應方式分離。',
    rule:
      '多工的核心是「一條通路承載多條頻道」；多條通路各自傳輸不是多工的重點。',
    correctReason: '選項 D 的 1 條通路和多條頻道，正好描述多工。',
    commonTrap: '多工的「多」指多個頻道或訊號，不是多條實體通路。',
    solvingSteps: [
      '先定義多工：多個訊號共用一條媒介。',
      '檢查選項是否有一條通路。',
      '再看是否承載多條頻道。',
      '只有 D 同時符合一條通路與多條頻道。'
    ],
    optionExplanations: {
      A: '多條通路和多條頻道比較像各走各路，沒有突顯共用單一通路。',
      B: '多條通路和 1 條頻道不是多工，反而是媒介數比頻道多。',
      C: '1 條通路和 1 條頻道只是一般單路傳輸，沒有多工。',
      D: '1 條通路承載多條頻道，正是 multiplexing 的概念。'
    },
    keyTakeaways: [
      '多工是多個頻道或訊號共用一條通路。',
      '常見多工包含分時、分頻、分波等方式。',
      '常見陷阱是把多條通路誤認成多工；多工強調共用媒介。'
    ],
    tags: ['multiplexing']
  }),
  44: makeReview({
    answer: 'B',
    coreTerms: ['CIDR', '/27', '網路位址', '區塊大小'],
    concept:
      'CIDR /27 代表前 27 bits 是網路位元。IPv4 最後一個八位元組中有 3 bits 留給主機，因此每個子網路區塊大小為 2^5 = 32 個位址。',
    rule:
      '/27 的遮罩為 255.255.255.224，最後一段區塊邊界為 0、32、64、96、128、160、192、224。82 落在 64 到 95。',
    correctReason: '167.199.170.82/27 的網路位址是 167.199.170.64/27。',
    commonTrap: '不要把 82 直接改成 82 或四捨五入；網路位址要取所在區塊的起始值。',
    solvingSteps: [
      '先由 /27 判斷最後一段有 5 個主機位元。',
      '區塊大小為 2^5=32。',
      '列出最後一段區塊：0、32、64、96、128、160、192、224。',
      '82 位於 64 到 95 的區間。',
      '因此網路位址最後一段為 64。'
    ],
    optionExplanations: {
      A: '32/27 是前一個區塊，範圍為 32 到 63，不包含 82。',
      B: '64/27 的範圍為 64 到 95，包含 82，是正確網路位址。',
      C: '128/27 是後面的區塊，範圍為 128 到 159，不包含 82。',
      D: '196 不是 /27 的合法區塊起點；/27 邊界應每 32 遞增。'
    },
    keyTakeaways: [
      '/27 表示每個子網路有 32 個位址。',
      '網路位址是 IP 所在區塊的起始值。',
      '常見陷阱是忘記用區塊邊界，而用主機位址直接作答。'
    ],
    tags: ['cidr', 'subnet']
  }),
  45: makeReview({
    answer: 'D',
    coreTerms: ['OSPF', 'link-state', 'LSA', 'packet type'],
    concept:
      'OSPF 是 link-state 路由協定，有固定的封包類型，用來建立鄰居、描述資料庫、請求與更新 link-state 資訊並確認。',
    rule:
      'OSPF 常見封包包含 Hello、Database Description、Link State Request、Link State Update、Link State Acknowledgment；沒有 link down packet 這種標準封包類型。',
    correctReason: 'A、B、C 都是 OSPF link-state 相關封包名稱；D 不是 OSPF 使用的封包類型。',
    commonTrap: 'link down 是網路事件或狀態描述，聽起來像 link-state，但不是 OSPF 標準封包名稱。',
    solvingSteps: [
      '先回想 OSPF 封包類型清單。',
      '確認 link state acknowledgement、request、update 都是標準類型。',
      '檢查 link down packet，這不是 OSPF 封包名稱。',
      '題目問非 OSPF 所使用之封包，所以選 D。'
    ],
    optionExplanations: {
      A: 'Link State Acknowledgment 是 OSPF 用來確認收到 LSA 的封包。',
      B: 'Link State Request 是 OSPF 請求缺少 link-state 資訊的封包。',
      C: 'Link State Update 是 OSPF 傳送 LSA 更新的封包。',
      D: 'link down packet 不是 OSPF 標準封包類型，雖然 link down 可是事件。'
    },
    keyTakeaways: [
      'OSPF 是 link-state 路由協定。',
      'OSPF 封包包含 Hello、DB Description、LS Request、LS Update、LS Ack。',
      '常見陷阱是把事件名稱誤當協定封包名稱。'
    ],
    tags: ['ospf']
  }),
  46: makeReview({
    answer: 'A',
    coreTerms: ['漢明距離', 'bit comparison', '二進位字串'],
    concept:
      '漢明距離用來衡量兩個等長字串有多少位置不同。對二進位字串，就是逐 bit 比較，不同的位置數就是距離。',
    rule:
      '兩個字串必須等長後逐位比較；10101010 與 11101010 只有第二個 bit 不同，因此距離為 1。',
    correctReason: '逐位比較後只有一處差異。',
    commonTrap: '不要把兩個二進位數相減；漢明距離看的是位置差異數，不是數值差。',
    solvingSteps: [
      '先確認兩個字串長度都為 8 bits。',
      '逐位寫出比較：1=1，0≠1，後面 101010 都相同。',
      '統計不同位置只有 1 個。',
      '因此漢明距離為 1。'
    ],
    optionExplanations: {
      A: '1 表示只有一個 bit 位置不同，符合逐位比較結果。',
      B: '2 多算了一個差異位置；實際只有第二位不同。',
      C: '3 是把數值或群組差異誤當漢明距離。',
      D: '4 更不符合逐位比較結果。'
    },
    keyTakeaways: [
      '漢明距離是等長字串中不同位置的數量。',
      '二進位漢明距離要逐 bit 比較，不做算術相減。',
      '常見陷阱是用數值差或直覺大小判斷。'
    ],
    tags: ['hamming-distance']
  }),
  47: makeReview({
    answer: 'D',
    coreTerms: ['ICMPv4', '錯誤訊息', 'Source Quench', 'Time Exceeded', 'Parameter Problem'],
    concept:
      'ICMPv4 用來回報網路層錯誤與診斷訊息，常見錯誤包含目的地不可達、時間超過、參數問題等。不同 IP 版本支援的錯誤訊息名稱不完全相同。',
    rule:
      'ICMPv4 常見類型包含來源端放慢 Source Quench、時間超過、參數問題；「Packet Too Big」是 ICMPv6 中與路徑 MTU 相關的重要訊息，不是 ICMPv4 的標準錯誤類型名稱。',
    correctReason: '選項 D 封包太大不屬本題所列 ICMPv4 錯誤訊息報告，因此有誤。',
    commonTrap: 'ICMPv4 有 fragmentation needed 相關訊息，但「Packet Too Big」這個名稱主要對應 ICMPv6。',
    solvingSteps: [
      '先確認題目限定 ICMPv4。',
      '來源端放慢、時間超過、參數問題都是 ICMPv4 常見錯誤或控制訊息名稱。',
      '檢查封包太大，這是 ICMPv6 的 Packet Too Big 名稱。',
      '因此 D 為有誤敘述。'
    ],
    optionExplanations: {
      A: '來源端放慢 Source Quench 屬 ICMPv4 歷史上的控制訊息，選項可接受。',
      B: '時間超過 Time Exceeded 是 ICMPv4 常見錯誤訊息。',
      C: '參數問題 Parameter Problem 也是 ICMPv4 錯誤訊息。',
      D: '封包太大 Packet Too Big 主要是 ICMPv6 訊息名稱，不是 ICMPv4 標準錯誤報告名稱。'
    },
    keyTakeaways: [
      'ICMPv4 與 ICMPv6 的錯誤訊息名稱不完全相同。',
      'ICMPv4 常見錯誤包含 Time Exceeded、Parameter Problem 等。',
      '常見陷阱是把 IPv6 的 Packet Too Big 套到 ICMPv4。'
    ],
    tags: ['icmp', 'icmpv4']
  }),
  48: makeReview({
    answer: 'C',
    coreTerms: ['IPv6', '位址長度', '128 bits', 'IPv4'],
    concept:
      'IP 位址長度決定可表示的位址空間。IPv4 使用 32 位元；IPv6 為了解決位址空間不足並支援新特性，使用 128 位元。',
    rule:
      'IPv6 位址固定長度為 128 bits，通常以 8 組十六進位表示，每組 16 bits。',
    correctReason: 'IPv6 網址長度為 128 位元。',
    commonTrap: '64 位元常出現在 IPv6 子網路介面識別或前綴切分中，但完整 IPv6 位址長度是 128 位元。',
    solvingSteps: [
      '先回想 IPv4 位址長度是 32 bits。',
      '再回想 IPv6 位址長度擴大為 128 bits。',
      '比對選項，128 對應 C。',
      '不要因常見 /64 前綴而把完整位址長度選成 64。'
    ],
    optionExplanations: {
      A: '32 位元是 IPv4 位址長度，不是 IPv6。',
      B: '64 位元常見於 IPv6 子網路前綴或介面識別，不是完整位址長度。',
      C: '128 位元是 IPv6 完整位址長度，正確。',
      D: '256 位元超過 IPv6 標準位址長度。'
    },
    keyTakeaways: [
      'IPv4 位址長度是 32 bits；IPv6 是 128 bits。',
      'IPv6 常以 8 組十六進位表示。',
      '常見陷阱是把 /64 前綴或介面識別長度誤當完整 IPv6 位址長度。'
    ],
    tags: ['ipv6']
  }),
  49: makeReview({
    answer: 'A',
    coreTerms: ['數位簽章', '認證', '完整性', '不可否認性', '隱私性'],
    concept:
      '數位簽章用私鑰對訊息摘要簽署，收件者用公鑰驗證。它能確認來源、檢查內容是否被改、並讓簽署者難以否認。',
    rule:
      '數位簽章提供認證、完整性、不可否認性；隱私性需要加密內容，簽章本身不會把資料變成密文。',
    correctReason: '選項 A 隱私性不是數位簽章可達到的主要目標。',
    commonTrap: '簽章和加密都用密碼學，但簽章重點是驗證，不是保密。',
    solvingSteps: [
      '先確認題目問「非」數位簽章目標。',
      '數位簽章可驗證簽署者，因此提供認證。',
      '訊息被改後驗章會失敗，因此提供完整性。',
      '私鑰簽署可支援不可否認性。',
      '隱私性需要加密，不是簽章本身提供。'
    ],
    optionExplanations: {
      A: '隱私性要求內容不被未授權者閱讀，需加密；數位簽章本身不提供此目標。',
      B: '認證是數位簽章的重要目標，可確認簽署者身分。',
      C: '完整性可由驗章確認資料是否被竄改。',
      D: '不可否認性是數位簽章常見目標，簽署者較難否認簽署行為。'
    },
    keyTakeaways: [
      '數位簽章提供認證、完整性、不可否認性。',
      '資料隱私性需靠加密，不是簽章本身。',
      '常見陷阱是把簽章與加密的目標混淆。'
    ],
    tags: ['digital-signature', 'security']
  }),
  50: makeReview({
    answer: 'D',
    coreTerms: ['100Base-T', 'hub', 'switch', 'collision domain', '網路容量'],
    concept:
      '集線器 hub 是共享媒介，所有設備共同競爭同一個 100 Mbps；交換器 switch 可讓每個連接埠形成獨立的傳輸區段，理論上總容量可隨連接設備數增加。',
    rule:
      '若 N 台設備各自連到交換器且每個埠可提供 100 Mbps，理論整體容量可視為 N × 100 Mbps；集線器則共享 100 Mbps。',
    correctReason: '把集線器改為交換器後，理論上 N 台設備的整體網路容量為 N × 100 Mbps。',
    commonTrap: '不要把交換器視為仍共享單一碰撞區間；交換器切分碰撞區間，讓各埠可並行傳輸。',
    solvingSteps: [
      '先比較 hub 與 switch：hub 共享頻寬，switch 各埠獨立交換。',
      '原本 100Base-T hub 整個網路共享 100 Mbps。',
      '改為交換器後，N 台設備理論上各有 100 Mbps 連線容量。',
      '總容量估為 N × 100 Mbps。'
    ],
    optionExplanations: {
      A: '100 Mbps 是集線器共享時的總容量，沒有反映交換器各埠獨立的效果。',
      B: '0.1N × 100 Mbps 沒有常見網路容量公式依據，低估交換器容量。',
      C: '0.5N × 100 Mbps 也沒有題目條件支持，可能誤以為半雙工要折半。',
      D: 'N × 100 Mbps 符合交換器每台設備理論上各有 100 Mbps 容量的估算。'
    },
    keyTakeaways: [
      'Hub 共享頻寬與碰撞區間；switch 可分割碰撞區間。',
      '交換器理論總容量可隨連接埠數與每埠速率增加。',
      '常見陷阱是把交換器仍當成集線器共享 100 Mbps。'
    ],
    tags: ['ethernet', 'switch']
  })
} satisfies QuestionTeachingReviewMap;
