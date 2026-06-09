import {
  ANSWER_OPTIONS,
  type AnswerOption,
  type AnswerVerification,
  type ExamQuestionAnalysis,
  type ExtractionStatus,
  type FourOptionRecord
} from '@/modules/examGroups/aGroup/types/questionAnalysis';
import type { AGroupYear } from '@/modules/examGroups/aGroup/data/yearSummaries';

export interface RawAGroupQuestion {
  number: number;
  answers: AnswerOption[];
  pageNumber: number;
  topic: string;
  stem: string;
  options: FourOptionRecord;
  tags: string[];
  answerNote?: string;
  extractionStatus?: ExtractionStatus;
}

export interface QuestionTeachingReview {
  answerVerification: AnswerVerification;
  answerNote: string | null;
  coreTerms?: string[];
  beginnerExplanation: string;
  solvingSteps: string[];
  optionExplanations: FourOptionRecord;
  keyTakeaways: string[];
  tags?: string[];
  extractionStatus?: ExtractionStatus;
}

export type QuestionTeachingReviewMap = Partial<Record<number, QuestionTeachingReview>>;

function createOptionExplanations(raw: RawAGroupQuestion): FourOptionRecord {
  return ANSWER_OPTIONS.reduce((explanations, option) => {
    explanations[option] = raw.answers.includes(option)
      ? `${option} 是 PDF 題目前方標示的可接受答案；正式解析會再補上「${raw.topic}」的完整判斷依據。`
      : `${option} 不是 PDF 題目前方標示的答案；正式解析會再說明它和「${raw.topic}」的混淆點。`;

    return explanations;
  }, {} as FourOptionRecord);
}

function mergeTags(rawTags: readonly string[], reviewTags: readonly string[] = []): string[] {
  return [...new Set([...rawTags, ...reviewTags])];
}

function getFallbackAnswerVerification(): AnswerVerification {
  return 'needs-review';
}

function getFallbackAnswerNote(raw: RawAGroupQuestion): string {
  if (raw.answerNote) {
    return raw.answerNote;
  }

  if (raw.answers.length > 1) {
    return `PDF 題目前方標示多個可接受答案：${raw.answers.join('、')}；此題保留人工複核狀態，避免誤標為普通單選題。`;
  }

  return `PDF 題目前方標示答案為 ${raw.answers.join('、')}；此題仍需由逐題解析確認答案理由。`;
}

function createFallbackBeginnerExplanation(raw: RawAGroupQuestion): string {
  return [
    `這是「${raw.topic}」的待審查解析骨架，先保留原題、選項與官方答案來源。`,
    `正式解析時要從 A-D 選項逐一比對題幹條件，不能只因 PDF 標示 ${raw.answers.join('、')} 就直接給結論。`,
    '後續內容審查會要求補上前置觀念、適用條件、逐步推導與每個干擾選項的錯誤原因。'
  ].join('\n');
}

function createFallbackSolvingSteps(raw: RawAGroupQuestion): string[] {
  return [
    `先確認本題考點與題幹條件：「${raw.topic}」。`,
    '再逐一閱讀 A-D 四個選項，找出各選項是否符合題幹要求。',
    `最後對照 PDF 題目前方標示的答案 ${raw.answers.join('、')}，並在正式解析中補上理由。`
  ];
}

export function createAGroupYearQuestions(
  year: AGroupYear,
  rawQuestions: readonly RawAGroupQuestion[],
  reviewedQuestionAnalyses: QuestionTeachingReviewMap
): ExamQuestionAnalysis[] {
  return rawQuestions.map((raw) => {
    const review = reviewedQuestionAnalyses[raw.number];

    return {
      year,
      number: raw.number,
      acceptedAnswers: raw.answers,
      answerNote: review ? review.answerNote : getFallbackAnswerNote(raw),
      answerVerification: review?.answerVerification ?? getFallbackAnswerVerification(),
      originalStem: raw.stem,
      options: raw.options,
      coreTerms: review?.coreTerms ?? [raw.topic],
      beginnerExplanation: review?.beginnerExplanation ?? createFallbackBeginnerExplanation(raw),
      solvingSteps: review?.solvingSteps ?? createFallbackSolvingSteps(raw),
      optionExplanations: review?.optionExplanations ?? createOptionExplanations(raw),
      keyTakeaways: review?.keyTakeaways ?? [
        `本題目前只完成「${raw.topic}」的來源基準骨架。`,
        'PDF 答案標記只能作為來源基準，不能取代完整解析。',
        '正式完成前必須補上新手可理解的規則、推導與選項辨析。'
      ],
      tags: mergeTags(raw.tags, review?.tags),
      sourceRef: {
        year,
        fileName: `${year}.pdf`,
        pageNumber: raw.pageNumber,
        extractionStatus: review?.extractionStatus ?? raw.extractionStatus ?? 'needs-review'
      }
    };
  });
}
