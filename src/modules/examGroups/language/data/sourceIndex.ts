export const LANGUAGE_YEARS = ['112', '111', '110', '109', '108', '107'] as const;

export type LanguageYear = (typeof LANGUAGE_YEARS)[number];
export type LanguageSubject = 'chinese' | 'english' | 'mixed';
export type LanguageQuestionKind =
  | 'chinese-reading'
  | 'chinese-composition'
  | 'english-grammar'
  | 'english-vocabulary'
  | 'english-cloze'
  | 'english-reading'
  | 'mixed';
export type LanguageQuestionType = 'choice' | 'open' | 'composition' | 'mixed';
export type LanguageExtractionStatus = 'verified' | 'needs-review';
export type LanguagePageState = number | `${number}-${number}` | 'pending';

export interface LanguageSourceIndexEntry {
  year: LanguageYear;
  number: number;
  subject: LanguageSubject;
  kind: LanguageQuestionKind;
  questionType: LanguageQuestionType;
  fileName: `${LanguageYear}.pdf`;
  pageNumber: LanguagePageState;
  originalExcerpt: string;
  extractionStatus: LanguageExtractionStatus;
  adContentRemoved: boolean;
}

const LANGUAGE_112_SOURCE_INDEX: readonly LanguageSourceIndexEntry[] = [
  {
    year: '112',
    number: 1,
    subject: 'chinese',
    kind: 'chinese-composition',
    questionType: 'composition',
    fileName: '112.pdf',
    pageNumber: 1,
    originalExcerpt:
      '寫作題目：自 2022 年 ChatGPT 問世以來，人工智慧快速發展，AI 的運用與發展改變企業原有的運作方式；請以「國營事業員工如何面對 AI 浪潮之我見」撰寫論文一篇。',
    extractionStatus: 'needs-review',
    adContentRemoved: true
  },
  {
    year: '112',
    number: 2,
    subject: 'english',
    kind: 'english-vocabulary',
    questionType: 'choice',
    fileName: '112.pdf',
    pageNumber: 2,
    originalExcerpt:
      '一、字彙：The famous scientist lost all ______ once his fabricated data came to light. ... This country’s military ______ near the border have raised concerns about a possible invasion. 原卷英文第 1-10 題。',
    extractionStatus: 'verified',
    adContentRemoved: true
  },
  {
    year: '112',
    number: 3,
    subject: 'english',
    kind: 'english-grammar',
    questionType: 'choice',
    fileName: '112.pdf',
    pageNumber: '2-3',
    originalExcerpt:
      '二、文法及慣用語：The doctor ______ the patient’s cancer for several months now. ... “Tyler is no less intelligent than his brother” means the same as “Tyler is ______ his brother.” 原卷英文第 11-25 題。',
    extractionStatus: 'verified',
    adContentRemoved: true
  },
  {
    year: '112',
    number: 4,
    subject: 'english',
    kind: 'english-cloze',
    questionType: 'choice',
    fileName: '112.pdf',
    pageNumber: 4,
    originalExcerpt:
      '三、克漏字：Jane and Philip are in general a happily married couple; however, they do struggle over one point of __(26)__ ... children enjoy the customary __(30)__ that are connected with the holidays.',
    extractionStatus: 'verified',
    adContentRemoved: true
  },
  {
    year: '112',
    number: 5,
    subject: 'english',
    kind: 'english-cloze',
    questionType: 'choice',
    fileName: '112.pdf',
    pageNumber: 4,
    originalExcerpt:
      '三、克漏字：Memorizing information is something we all need to do. There are __(31)__ ways to improve our memory, one of which is known as mind-mapping ... we __(35)__ our knowledge of the information and then memorize it.',
    extractionStatus: 'verified',
    adContentRemoved: true
  },
  {
    year: '112',
    number: 6,
    subject: 'english',
    kind: 'english-reading',
    questionType: 'choice',
    fileName: '112.pdf',
    pageNumber: '4-5',
    originalExcerpt:
      '四、閱讀測驗：Ocean waves represent our planet’s last untapped large-scale renewable energy resource. 題目包含 What are NOT true about ocean waves? 與 Why had the previous ocean wave energy conversion efforts failed? 原卷英文第 36-40 題。',
    extractionStatus: 'needs-review',
    adContentRemoved: true
  }
];

const LANGUAGE_111_SOURCE_INDEX: readonly LanguageSourceIndexEntry[] = [
  {
    year: '111',
    number: 1,
    subject: 'chinese',
    kind: 'chinese-composition',
    questionType: 'composition',
    fileName: '111.pdf',
    pageNumber: 1,
    originalExcerpt:
      '寫作題目：近年來對於建立企業韌性日益受到重視；請以「如何建立國營事業企業韌性之我見」為題，寫作論文一篇，並加以闡述。',
    extractionStatus: 'needs-review',
    adContentRemoved: true
  },
  {
    year: '111',
    number: 2,
    subject: 'english',
    kind: 'english-vocabulary',
    questionType: 'choice',
    fileName: '111.pdf',
    pageNumber: '1-2',
    originalExcerpt:
      '一、字彙：Different scientists, analyzing the same data, may arrive at wholly different and sometimes ______ interpretations. ... I did not ______ my high school classmate until she introduced herself to me at the conference. 推估原卷英文第 1-10 題。',
    extractionStatus: 'needs-review',
    adContentRemoved: true
  },
  {
    year: '111',
    number: 3,
    subject: 'english',
    kind: 'english-grammar',
    questionType: 'choice',
    fileName: '111.pdf',
    pageNumber: '2-3',
    originalExcerpt:
      '二、文法及慣用語：The suspect denies ______ into the house, but there is quite enough convincing evidence ______ him guilty. ... You should have avoided ______ her divorce. 推估原卷英文第 11-25 題。',
    extractionStatus: 'needs-review',
    adContentRemoved: true
  },
  {
    year: '111',
    number: 4,
    subject: 'english',
    kind: 'english-cloze',
    questionType: 'choice',
    fileName: '111.pdf',
    pageNumber: '3-4',
    originalExcerpt:
      '三、克漏字：The antismoking lobby succeeded __(26)__ people knew without being told that cigarettes were killing their friends and families ... an ecology as rife with __(30)__ as any befouled river or cloud of smog.',
    extractionStatus: 'needs-review',
    adContentRemoved: true
  },
  {
    year: '111',
    number: 5,
    subject: 'english',
    kind: 'english-cloze',
    questionType: 'choice',
    fileName: '111.pdf',
    pageNumber: 4,
    originalExcerpt:
      '三、克漏字：Insomnia, also known as sleeplessness, is a __(31)__ disorder in which people have trouble sleeping ... many __(35)__ of randomized controlled trials and systematic reviews often underreport.',
    extractionStatus: 'needs-review',
    adContentRemoved: true
  },
  {
    year: '111',
    number: 6,
    subject: 'english',
    kind: 'english-reading',
    questionType: 'choice',
    fileName: '111.pdf',
    pageNumber: '4-6',
    originalExcerpt:
      '四、閱讀測驗：For a long time, many psychologists embraced a victim narrative about trauma. 題目包含 What is this passage mainly about? 與 Which of the following has the least to do with post-traumatic growth? 推估原卷英文第 36-40 題。',
    extractionStatus: 'needs-review',
    adContentRemoved: true
  }
];

const LANGUAGE_110_SOURCE_INDEX: readonly LanguageSourceIndexEntry[] = [
  {
    year: '110',
    number: 1,
    subject: 'chinese',
    kind: 'chinese-composition',
    questionType: 'composition',
    fileName: '110.pdf',
    pageNumber: 1,
    originalExcerpt:
      '壹、國文：論文寫作：100 分。寫作題目：新型冠狀病毒肺炎疫情促使 ESG 成為全球企業經營管理的關鍵課題；請以「國營事業在 ESG 發展趨勢下的機會與挑戰」為題，寫作論文一篇。',
    extractionStatus: 'needs-review',
    adContentRemoved: true
  },
  {
    year: '110',
    number: 2,
    subject: 'english',
    kind: 'english-vocabulary',
    questionType: 'choice',
    fileName: '110.pdf',
    pageNumber: 2,
    originalExcerpt:
      '一、字彙：In the literary history of the world ... Some critics argue ... Everyone has been talking about the hyper-violent thriller. 原卷英文第 1-10 題。',
    extractionStatus: 'verified',
    adContentRemoved: true
  },
  {
    year: '110',
    number: 3,
    subject: 'english',
    kind: 'english-grammar',
    questionType: 'choice',
    fileName: '110.pdf',
    pageNumber: 3,
    originalExcerpt:
      '二、文法及慣用語：The couples make vows and promises to ____ each other ... Please note that all applications must be received ____ Friday, December 10. 原卷英文第 11-25 題。',
    extractionStatus: 'verified',
    adContentRemoved: true
  },
  {
    year: '110',
    number: 4,
    subject: 'english',
    kind: 'english-cloze',
    questionType: 'choice',
    fileName: '110.pdf',
    pageNumber: 4,
    originalExcerpt:
      '三、克漏字：Numerous opportunities exist for people who want to travel abroad to experience a foreign culture. Passage discusses the Peace Corps and blanks (26)-(30).',
    extractionStatus: 'needs-review',
    adContentRemoved: true
  },
  {
    year: '110',
    number: 5,
    subject: 'english',
    kind: 'english-cloze',
    questionType: 'choice',
    fileName: '110.pdf',
    pageNumber: '4-5',
    originalExcerpt:
      '三、克漏字：The Stanford Marshmallow experiment is a psychological experiment to _(31)_ children’s ability to control their impulses. Passage contains blanks (31)-(35).',
    extractionStatus: 'needs-review',
    adContentRemoved: true
  },
  {
    year: '110',
    number: 6,
    subject: 'english',
    kind: 'english-reading',
    questionType: 'choice',
    fileName: '110.pdf',
    pageNumber: 5,
    originalExcerpt:
      '四、閱讀測驗：Recent biological research indicates that there is a biochemical basis to love. Questions include main idea, chemicals related to being in love, and meaning of attachment.',
    extractionStatus: 'needs-review',
    adContentRemoved: true
  }
];

const LANGUAGE_109_SOURCE_INDEX: readonly LanguageSourceIndexEntry[] = [
  {
    year: '109',
    number: 1,
    subject: 'chinese',
    kind: 'chinese-composition',
    questionType: 'composition',
    fileName: '109.pdf',
    pageNumber: 1,
    originalExcerpt:
      '壹、國文：論文寫作：100 分。寫作題目：企業組織成敗的關鍵取決於員工；請以「如何提升自我在企業組織中的價值」為題，寫作論文一篇。',
    extractionStatus: 'needs-review',
    adContentRemoved: true
  },
  {
    year: '109',
    number: 2,
    subject: 'english',
    kind: 'english-vocabulary',
    questionType: 'choice',
    fileName: '109.pdf',
    pageNumber: 2,
    originalExcerpt:
      '一、字彙：That van is the ideal vehicle for carpooling. ... Fifty nations have banned the use of ____ punishment. ... The new design is a ____ from the norm. 原卷英文第 1-10 題。',
    extractionStatus: 'needs-review',
    adContentRemoved: true
  },
  {
    year: '109',
    number: 3,
    subject: 'english',
    kind: 'english-grammar',
    questionType: 'choice',
    fileName: '109.pdf',
    pageNumber: '3-4',
    originalExcerpt:
      '二、文法及慣用語：Jasmine was originally from Mexico, ______ is a Spanish-speaking country. ... The best way to deal with burns is to prevent them ______ in the first place. ... Little is known about what truly matters in searching for information. 原卷英文第 11-25 題。',
    extractionStatus: 'needs-review',
    adContentRemoved: true
  },
  {
    year: '109',
    number: 4,
    subject: 'english',
    kind: 'english-cloze',
    questionType: 'choice',
    fileName: '109.pdf',
    pageNumber: 4,
    originalExcerpt:
      '三、克漏字：Accreditation does not guarantee that you will be satisfied with a particular college or degree program. Passage contains blanks (26)-(30).',
    extractionStatus: 'needs-review',
    adContentRemoved: true
  },
  {
    year: '109',
    number: 5,
    subject: 'english',
    kind: 'english-cloze',
    questionType: 'choice',
    fileName: '109.pdf',
    pageNumber: '4-5',
    originalExcerpt:
      '三、克漏字：Among all the sciences, psychology is perhaps the most __(31)__ to the general public ... plotting to exercise some form of __(35)__ control.',
    extractionStatus: 'needs-review',
    adContentRemoved: true
  },
  {
    year: '109',
    number: 6,
    subject: 'english',
    kind: 'english-reading',
    questionType: 'choice',
    fileName: '109.pdf',
    pageNumber: '5-6',
    originalExcerpt:
      '四、閱讀測驗：There’s a fun game I like to play in a group of trusted friends called “Controversial Opinion”. Questions include main idea, game rules, holier-than-thou behavior, echo chamber, and being blindsided.',
    extractionStatus: 'needs-review',
    adContentRemoved: true
  }
];

const LANGUAGE_108_SOURCE_INDEX: readonly LanguageSourceIndexEntry[] = [
  {
    year: '108',
    number: 1,
    subject: 'chinese',
    kind: 'chinese-composition',
    questionType: 'composition',
    fileName: '108.pdf',
    pageNumber: 1,
    originalExcerpt:
      '壹、國文：論文寫作。寫作題目：為因應美中貿易爭端，臺商回臺投資不斷；請以「國營事業如何營造有利投資臺灣環境之我見」為題，寫作論文一篇，並加以闡述。',
    extractionStatus: 'needs-review',
    adContentRemoved: true
  },
  {
    year: '108',
    number: 2,
    subject: 'english',
    kind: 'english-vocabulary',
    questionType: 'choice',
    fileName: '108.pdf',
    pageNumber: '1-2',
    originalExcerpt:
      '一、字彙：The recently released movie ______ the difficulties people experienced during World War II. ... Blue whales have been hunted nearly to ______ in the 20th century. 原卷英文第 1-10 題。',
    extractionStatus: 'verified',
    adContentRemoved: true
  },
  {
    year: '108',
    number: 3,
    subject: 'english',
    kind: 'english-grammar',
    questionType: 'choice',
    fileName: '108.pdf',
    pageNumber: '2-3',
    originalExcerpt:
      '二、文法及慣用語：______ the financial crisis and illegal music download ... Our new coworker is really ______; he learns fast and can do everything he is asked. 原卷英文第 11-25 題。',
    extractionStatus: 'verified',
    adContentRemoved: true
  },
  {
    year: '108',
    number: 4,
    subject: 'english',
    kind: 'english-cloze',
    questionType: 'choice',
    fileName: '108.pdf',
    pageNumber: 3,
    originalExcerpt:
      '三、克漏字：Nowadays, the everyday piracy of intellectual property has become even more common than the piracy at sea. Passage contains blanks 26-30.',
    extractionStatus: 'needs-review',
    adContentRemoved: true
  },
  {
    year: '108',
    number: 5,
    subject: 'english',
    kind: 'english-cloze',
    questionType: 'choice',
    fileName: '108.pdf',
    pageNumber: 3,
    originalExcerpt:
      '三、克漏字：In 2017 and 2018, terrible wildfires happened in California. The company PG&E provides gas and electricity. Passage contains blanks 31-35.',
    extractionStatus: 'needs-review',
    adContentRemoved: true
  },
  {
    year: '108',
    number: 6,
    subject: 'english',
    kind: 'english-reading',
    questionType: 'choice',
    fileName: '108.pdf',
    pageNumber: '3-4',
    originalExcerpt:
      '四、閱讀測驗：These days, food safety has become a big issue and a major public concern. Passage discusses organic food and questions about main idea, inference, statements, opponents, and organic farms.',
    extractionStatus: 'needs-review',
    adContentRemoved: true
  }
];

const LANGUAGE_107_SOURCE_INDEX: readonly LanguageSourceIndexEntry[] = [
  {
    year: '107',
    number: 1,
    subject: 'chinese',
    kind: 'chinese-composition',
    questionType: 'composition',
    fileName: '107.pdf',
    pageNumber: 1,
    originalExcerpt:
      '壹、國文：論文寫作。寫作題目：隨著科技演進與技術進步，人工智慧、區塊鏈、雲端、大數據分析與物聯網等成為新顯學；請以「國營事業如何應用新科技以提升經營績效」為題。',
    extractionStatus: 'needs-review',
    adContentRemoved: true
  },
  {
    year: '107',
    number: 2,
    subject: 'english',
    kind: 'english-vocabulary',
    questionType: 'choice',
    fileName: '107.pdf',
    pageNumber: 2,
    originalExcerpt:
      '一、字彙：Whales make the longest ______ known among mammals. ... Nowadays, most consumers appear less _____ to brands and are more willing to experiment. 原卷英文第 1-10 題。',
    extractionStatus: 'needs-review',
    adContentRemoved: true
  },
  {
    year: '107',
    number: 3,
    subject: 'english',
    kind: 'english-grammar',
    questionType: 'choice',
    fileName: '107.pdf',
    pageNumber: '2-3',
    originalExcerpt:
      '二、文法及慣用語：There are many interesting places to visit in NYC. ... Swinging Lamppost Apartments ______ pet owners. There is even a dog park on the premises. 原卷英文第 11-25 題。',
    extractionStatus: 'needs-review',
    adContentRemoved: true
  },
  {
    year: '107',
    number: 4,
    subject: 'english',
    kind: 'english-cloze',
    questionType: 'choice',
    fileName: '107.pdf',
    pageNumber: 3,
    originalExcerpt:
      '三、克漏字：Archaeologists searching Portugal’s coast have found a 400-year-old ship (26) near Lisbon after returning from India laden with spices. Passage contains blanks 26-30.',
    extractionStatus: 'needs-review',
    adContentRemoved: true
  },
  {
    year: '107',
    number: 5,
    subject: 'english',
    kind: 'english-cloze',
    questionType: 'choice',
    fileName: '107.pdf',
    pageNumber: '3-4',
    originalExcerpt:
      '三、克漏字：Approximately six to eight million adults in the United States eat no meat, fish, or poultry. Passage discusses plant-based eating and blanks 31-35.',
    extractionStatus: 'needs-review',
    adContentRemoved: true
  },
  {
    year: '107',
    number: 6,
    subject: 'english',
    kind: 'english-reading',
    questionType: 'choice',
    fileName: '107.pdf',
    pageNumber: 4,
    originalExcerpt:
      '四、閱讀測驗：Much of the theory of manners was formulated by the sociologist Norbert Elias in his book The Civilizing Process. Passage questions cover manners, social process, and interpretation;原卷英文第 36-40 題。',
    extractionStatus: 'needs-review',
    adContentRemoved: true
  }
];

export const LANGUAGE_SOURCE_INDEXES: Readonly<Record<LanguageYear, readonly LanguageSourceIndexEntry[]>> = {
  '112': LANGUAGE_112_SOURCE_INDEX,
  '111': LANGUAGE_111_SOURCE_INDEX,
  '110': LANGUAGE_110_SOURCE_INDEX,
  '109': LANGUAGE_109_SOURCE_INDEX,
  '108': LANGUAGE_108_SOURCE_INDEX,
  '107': LANGUAGE_107_SOURCE_INDEX
};

export function getLanguageSourceIndex(year: LanguageYear): readonly LanguageSourceIndexEntry[] {
  return LANGUAGE_SOURCE_INDEXES[year];
}
