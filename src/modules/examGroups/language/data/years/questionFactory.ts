import {
  getLanguageSourceIndex,
  type LanguageQuestionKind,
  type LanguageSourceIndexEntry,
  type LanguageYear
} from '@/modules/examGroups/language/data/sourceIndex';
import type {
  LanguageChoice,
  LanguageDifficulty,
  LanguageQuestionAnalysis
} from '@/modules/examGroups/language/types/languageQuestionAnalysis';

interface LanguageTeachingProfile {
  examPoints: string[];
  difficulty: LanguageDifficulty;
  answerExplanation: string;
  teachingNotes: string[];
  strategyTips: string[];
  diagramInstructions: string;
  diagramAltText: string;
  handoutTopic: string;
}

interface LanguageDiagramSupport {
  diagramInstructions: string;
  diagramAltText: string;
}

const ENGLISH_REVIEW_NOTE =
  '本筆以題組為單位整理；原卷含多題單選，逐題 A-D 選項與答案符號需由人工依 PDF 原文再校對。';

const KIND_PROFILES: Record<LanguageQuestionKind, LanguageTeachingProfile> = {
  'chinese-composition': {
    examPoints: ['國文作文', '論點立意', '例證安排', '段落結構'],
    difficulty: 'advanced',
    answerExplanation:
      '作文題沒有單一標準答案，重點是能不能扣住題目關鍵字，提出清楚立場，再用國營事業情境與具體例子支撐。作答時要避免只喊口號，應把「問題、做法、影響」寫成連貫論證，讓閱卷者看見你的組織能力與公共議題理解。',
    teachingNotes: [
      '開頭先改寫題目並提出明確主張，讓文章一開始就有方向。',
      '主體段可安排二到三個分論點，每段用一個國營事業或職場情境例子支撐。',
      '結尾要回扣題目，收束成可執行的態度、能力或政策建議。',
      '評分重點包含立意切題、結構完整、例證具體、語句通順與錯別字控制。'
    ],
    strategyTips: [
      '先圈出題目中的核心名詞，再決定文章主軸。',
      '每段只處理一個分論點，避免同一段塞入太多想法。',
      '例子要能連回國營事業、員工角色或公共服務，不要只寫抽象感想。'
    ],
    diagramInstructions:
      '不適用：本題為國文作文題，重點在審題、論點架構與評分指引，不需要圖形。',
    diagramAltText:
      '無圖解；以作文題幹、論點架構與評分重點作答。',
    handoutTopic: 'composition-structure'
  },
  'chinese-reading': {
    examPoints: ['國文閱讀', '文意證據', '作者態度'],
    difficulty: 'intermediate',
    answerExplanation:
      '國文閱讀題要先找到題目問的是主旨、態度、修辭還是字詞，再回到原文找可直接支持答案的句子。不要只憑印象選答案；真正可靠的答案必須能指出文中的證據，並說明其他選項為何過度推論、方向相反或沒有根據。',
    teachingNotes: [
      '先判斷題型，再回到段落找主旨句、轉折詞與情緒詞。',
      '若題目問作者態度，要用文中評價詞或反覆出現的語氣來證明。',
      '選項辨析時要特別排除把局部細節誇大成全文主旨的說法。'
    ],
    strategyTips: [
      '看到「最符合」要找全篇一致的答案。',
      '看到「下列何者不正確」要逐項回文定位。',
      '不確定時先刪掉與原文方向相反或沒有證據的選項。'
    ],
    diagramInstructions:
      '文字圖解：建立閱讀證據表，欄位為題目問法、原文證據、可推出的答案、需排除的選項。若文章有多段，按第一段背景、第二段轉折、第三段結論的順序列出證據。',
    diagramAltText:
      '國文閱讀可用題目問法、原文證據、答案推論與排除理由四欄表整理。',
    handoutTopic: 'reading-evidence'
  },
  'english-vocabulary': {
    examPoints: ['英文單字', '語境判斷', '詞性與搭配'],
    difficulty: 'basic',
    answerExplanation:
      '字彙題的核心不是死背中文意思，而是先看空格前後的語境與詞性。用國二程度來想：先問這格需要名詞、動詞、形容詞還是副詞，再用句子的正負語氣刪掉不合的字。例如 credibility 常和 lose、gain 搭配，表示可信度；如果句子提到 fabricated data，就能推知答案要和信任受損有關。',
    teachingNotes: [
      '英文老師會先帶你看詞性，因為詞性錯了通常直接排除。',
      '再看搭配詞，例如 lose credibility、raise concerns、be precise 都是常見用法。',
      '國二程度可先掌握句子情緒：是正面、負面，還是中性描述。',
      '例句：The report lost credibility after people found false data.'
    ],
    strategyTips: [
      '先圈空格旁邊的動詞與介系詞，找固定搭配。',
      '選項若詞根相近，要比較詞性與使用情境，不只看中文翻譯。',
      '遇到長句先抓主詞、動詞與空格所在片語。'
    ],
    diagramInstructions:
      '不適用：本題為英文字彙選擇題，依句意線索與詞義辨析作答，不需要圖形。',
    diagramAltText:
      '無圖解；以句意線索與詞義辨析判斷答案。',
    handoutTopic: 'vocabulary-context'
  },
  'english-grammar': {
    examPoints: ['英文文法', '句型判斷', '慣用語', '選項辨析'],
    difficulty: 'intermediate',
    answerExplanation:
      '文法及慣用語題要把句子骨架先找出來，再判斷考點。國二程度可以用「時間線、主被動、連接詞、介系詞、慣用語」五個方向檢查。例如現在完成式遇到 for several months now，表示動作從過去延續到現在；例句：The doctor has been treating the patient for months.',
    teachingNotes: [
      '先找主詞與動詞，確認空格是否在動詞片語、子句連接或介系詞位置。',
      '看到 now、for、since 這類時間線索，要先判斷現在完成式或完成進行式。',
      '看到引號改寫題，要比較兩句意思是否相同，不要只看單字長得像。',
      '例句：I have studied English since 2020. I studied English yesterday.'
    ],
    strategyTips: [
      '文法題先判斷考點，再看選項；不要一看到熟字就選。',
      '連接詞與關係代名詞要檢查後面句子是否完整。',
      '慣用語題要看整句語意，尤其是 than meets the eye 這類固定說法。'
    ],
    diagramInstructions:
      '不適用：本題為英文文法及慣用語選擇題，依語法規則、句型與句意判斷，不需要圖形。',
    diagramAltText:
      '無圖解；以句型、時態、介系詞或慣用語線索判斷答案。',
    handoutTopic: 'grammar-patterns'
  },
  'english-cloze': {
    examPoints: ['英文克漏字', '上下文線索', '轉折與因果', '搭配詞'],
    difficulty: 'intermediate',
    answerExplanation:
      '克漏字要把空格前後兩句一起讀，因為答案通常藏在對比、因果、舉例或固定搭配裡。教國二學生時，可以先不要急著翻完整段，而是圈出 however、therefore、because、for example 這些關係詞，再判斷空格要接順向還是轉折。例句：It was raining; however, we still went out.',
    teachingNotes: [
      '先讀空格所在句，再讀前一句與後一句，找關係線索。',
      '若選項是連接詞，要判斷兩句是同方向、相反方向還是因果關係。',
      '若選項是名詞或動詞，要看固定搭配與文章主題是否一致。',
      '國二程度可以把每個空格旁邊的 clue word 寫在旁邊再選。'
    ],
    strategyTips: [
      '每個空格至少回看一句，不要只看空格本身。',
      '先刪除詞性不合的選項，再比較語意。',
      '看到重複主題詞時，優先選能延續文章主題的答案。'
    ],
    diagramInstructions:
      '不適用：本題為英文克漏字，依上下文銜接與語意/文法線索作答，不需要圖形。',
    diagramAltText:
      '無圖解；以段落上下文與空格前後線索判斷答案。',
    handoutTopic: 'cloze-context'
  },
  'english-reading': {
    examPoints: ['英文閱讀', '主旨推論', '細節定位', '段落結構'],
    difficulty: 'advanced',
    answerExplanation:
      '閱讀測驗先看題目問 main idea、detail、inference 還是 vocabulary in context，再回文章定位。國二程度的做法是：主旨題看每段第一句與最後一句；細節題找題目關鍵字；推論題只能推一步，不要加太多自己的想像。例句：If a passage repeats ocean energy and failure, the main idea likely connects both topics.',
    teachingNotes: [
      '先快速看題目，把 main idea、detail、inference 分類。',
      '主旨題要看整段重複出現的主題，不要被單一例子帶走。',
      '推論題必須有原文依據，不能選只靠常識也可能成立的答案。',
      '閱讀長文若來源萃取不完整，答案需要人工回 PDF 校對。'
    ],
    strategyTips: [
      '先定位題目關鍵字，再讀關鍵字前後兩句。',
      '遇到 NOT true 要逐項對照原文，不要只憑印象。',
      '主旨題常排除太細、太廣或方向相反的選項。'
    ],
    diagramInstructions:
      '文字圖解：建立段落結構圖。第一列寫文章主題，第二列按段落列背景、問題、例子、轉折、結論，第三列把題目類型對應到段落位置，例如主旨題看整體，細節題看定位句，推論題看證據句加合理一步推論。',
    diagramAltText:
      '英文閱讀可用文章主題、段落功能與題型定位三層結構整理。',
    handoutTopic: 'reading-structure'
  },
  mixed: {
    examPoints: ['混合題型', '題型辨識', '策略整合'],
    difficulty: 'intermediate',
    answerExplanation:
      '混合題型要先分出每一小題在考閱讀、文法、字彙或寫作，再分別套用對應策略。不要用同一種方法處理所有小題；先分類，才能避免把閱讀推論題當成單字題，或把作文題當成只有標準答案的選擇題。',
    teachingNotes: [
      '先替每一小題標上題型。',
      '選擇題看選項與原文證據，開放題看答題結構。',
      '若題目來源抽取有風險，答案要保留人工複核狀態。'
    ],
    strategyTips: [
      '題型分類先於作答。',
      '每個小題都要有自己的證據。',
      '不要把局部技巧硬套到整份題組。'
    ],
    diagramInstructions:
      '文字圖解：建立題型分流圖，從題組開始分到閱讀、文法、字彙、作文或開放題，再接各自的解題策略與檢查點。',
    diagramAltText:
      '混合題型先分流，再依題型使用不同解題策略。',
    handoutTopic: 'mixed-strategy'
  }
};

const DIAGRAM_SUPPORT_OVERRIDES: Record<string, LanguageDiagramSupport> = {
  '112-5': {
    diagramInstructions:
      '文字圖解：畫心智圖：中心是「要記憶的資訊」，向外分成主題、細節、關聯、複習四個分支；箭頭標示先整理資訊、建立關聯，再用關鍵字回想與記憶。',
    diagramAltText:
      '心智圖以待記憶資訊為中心，分支呈現主題、細節、關聯與複習步驟。'
  },
  '112-6': {
    diagramInstructions:
      '文字圖解：畫三段式文章結構：海浪是尚未充分利用的大型再生能源 -> 海浪能轉換的技術/環境挑戰 -> 過去轉換嘗試失敗原因與未來改良條件；右側對應第 36-40 題的事實判斷、原因與主旨。',
    diagramAltText:
      '海浪能源文章由資源潛力推到轉換挑戰，再說明過去失敗原因與改良方向。'
  },
  '111-6': {
    diagramInstructions:
      '文字圖解：畫對照圖：左欄是 trauma 的 victim narrative，右欄是 post-traumatic growth；中間箭頭表示心理學觀點從受害敘事轉向創傷後成長，底部列主旨、成長因素與 least-to-do-with 的排除線索。',
    diagramAltText:
      '創傷文章比較受害敘事與創傷後成長，重點在心理學觀點轉向與成長相關因素。'
  },
  '110-5': {
    diagramInstructions:
      '文字圖解：畫實驗流程：幼童面前放一顆棉花糖 -> 選擇立即吃或等待 -> 等待者取得較大獎勵 -> 後續追蹤自我控制與衝動控制。旁邊標示空格 31-35 主要依實驗目的、行為與結果銜接判斷。',
    diagramAltText:
      '史丹佛棉花糖實驗圖解呈現孩子等待、延遲滿足與後續衝動控制結果的流程。'
  },
  '110-6': {
    diagramInstructions:
      '文字圖解：畫三層關係圖：生化物質 -> 愛的心理狀態 -> attachment。第一層列相關 chemicals，第二層連到吸引、熱戀或依附，第三層標示主旨、化學物質與 attachment 意義題。',
    diagramAltText:
      '愛的生化基礎文章把化學物質連到吸引、熱戀與依附等狀態。'
  },
  '109-6': {
    diagramInstructions:
      '文字圖解：畫流程圖：可信任朋友群 -> 提出 controversial opinion -> 眾人回應與追問 -> 暴露 echo chamber、holier-than-thou 與 blindsided 的社交盲點；旁邊對應主旨、規則與詞義題。',
    diagramAltText:
      '爭議意見遊戲文章用討論流程說明同溫層、道德優越感與被盲點擊中的概念。'
  },
  '108-5': {
    diagramInstructions:
      '文字圖解：畫因果鏈：加州野火 -> PG&E 供電/瓦斯設備與公共安全爭議 -> 財務與責任壓力 -> 文章空格依事件、原因、後果與公司角色銜接。',
    diagramAltText:
      'PG&E 野火文章以加州野火為起點，連到公用事業設備、責任與後續影響。'
  },
  '108-6': {
    diagramInstructions:
      '文字圖解：畫二欄論證表：支持 organic food 的理由放左欄，opponents 的質疑放右欄；底部用箭頭連到 food safety、public concern、organic farms 與題目中的主旨/推論/敘述判斷。',
    diagramAltText:
      '食品安全與有機食品文章以支持與反對論點對照，並連到有機農場與公共疑慮。'
  },
  '107-6': {
    diagramInstructions:
      '文字圖解：畫概念流程：社會規範 -> manners 的形成 -> Norbert Elias 的 The Civilizing Process -> 題目要求的 social process 與作者解讀；箭頭標示個人禮儀由社會互動逐步塑造。',
    diagramAltText:
      '禮儀文章以 Norbert Elias 的文明化過程說明個人行為如何受社會規範形塑。'
  }
};

function sourceRef(entry: LanguageSourceIndexEntry): LanguageQuestionAnalysis['sourceRef'] {
  return {
    fileName: entry.fileName,
    pageNumber: entry.pageNumber,
    originalExcerpt: entry.originalExcerpt,
    extractionStatus: entry.extractionStatus,
    adContentRemoved: entry.adContentRemoved
  };
}

function choicesFor(entry: LanguageSourceIndexEntry): LanguageChoice[] {
  if (entry.questionType !== 'choice') {
    return [];
  }

  return [
    {
      label: '題組選項',
      text: `${entry.year} 年第 ${entry.number} 筆來源索引為多題單選題組。${ENGLISH_REVIEW_NOTE}`
    }
  ];
}

function acceptedAnswersFor(entry: LanguageSourceIndexEntry): string[] {
  if (entry.questionType !== 'choice') {
    return [];
  }

  return [];
}

function getDiagramSupport(entry: LanguageSourceIndexEntry, profile: LanguageTeachingProfile): LanguageDiagramSupport {
  return (
    DIAGRAM_SUPPORT_OVERRIDES[`${entry.year}-${entry.number}`] ?? {
      diagramInstructions: profile.diagramInstructions,
      diagramAltText: profile.diagramAltText
    }
  );
}

function createLanguageQuestionAnalysis(entry: LanguageSourceIndexEntry): LanguageQuestionAnalysis {
  const profile = KIND_PROFILES[entry.kind];
  const diagramSupport = getDiagramSupport(entry, profile);

  return {
    year: entry.year,
    number: entry.number,
    subject: entry.subject,
    kind: entry.kind,
    sourceBatch: `${entry.year}-language-batch-${entry.number <= 3 ? 1 : 2}`,
    examPoints: profile.examPoints,
    difficulty: profile.difficulty,
    questionType: entry.questionType,
    originalQuestion: entry.originalExcerpt,
    choices: choicesFor(entry),
    acceptedAnswers: acceptedAnswersFor(entry),
    answerExplanation:
      entry.questionType === 'choice'
        ? `${profile.answerExplanation} ${ENGLISH_REVIEW_NOTE}`
        : profile.answerExplanation,
    teachingNotes: profile.teachingNotes,
    strategyTips: profile.strategyTips,
    diagramInstructions: diagramSupport.diagramInstructions,
    diagramAltText: diagramSupport.diagramAltText,
    handoutRefs: [`L-${entry.year}-${profile.handoutTopic}`],
    sourceRef: sourceRef(entry),
    reviewStatus: 'needs-review'
  };
}

export function createLanguageQuestionsForYear(year: LanguageYear): LanguageQuestionAnalysis[] {
  return getLanguageSourceIndex(year).map(createLanguageQuestionAnalysis);
}
