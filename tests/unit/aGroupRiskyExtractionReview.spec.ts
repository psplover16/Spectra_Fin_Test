import { describe, expect, it } from 'vitest';
import {
  getRiskyExtractionsForYear,
  validateRiskyExtractionReview
} from '@/modules/examGroups/aGroup/data/years/riskyExtractionReview';
import { validateAGroupQuestionContent } from '@/modules/examGroups/aGroup/data/years/contentReview';
import { questions as questions108 } from '@/modules/examGroups/aGroup/data/years/108';
import type { ExamQuestionAnalysis } from '@/modules/examGroups/aGroup/types/questionAnalysis';

function replaceQuestion(
  questions: readonly ExamQuestionAnalysis[],
  replacement: ExamQuestionAnalysis
): ExamQuestionAnalysis[] {
  return questions.map((question) => (question.number === replacement.number ? replacement : question));
}

describe('A group risky PDF extraction review', () => {
  it('publishes the known risky extraction entries for a historical year', () => {
    expect(getRiskyExtractionsForYear('108')).toEqual([
      { year: '108', number: 9, risk: 'code layout requires manual format check' },
      { year: '108', number: 22, risk: 'table layout requires manual field check' }
    ]);
  });

  it('allows current manually confirmed 108 risky extractions to be verified through explicit confirmation', () => {
    expect(questions108.find((question) => question.number === 9)?.sourceRef.extractionStatus).toBe('verified');
    expect(questions108.find((question) => question.number === 22)?.sourceRef.extractionStatus).toBe('verified');
    expect(
      validateRiskyExtractionReview(questions108, {
        year: '108',
        confirmedQuestionNumbers: [9, 22]
      })
    ).toEqual([]);
  });

  it('rejects unconfirmed risky extractions that are marked verified', () => {
    const riskyQuestion = questions108.find((question) => question.number === 9);

    if (!riskyQuestion) {
      throw new Error('Missing 108 question 9');
    }

    const verifiedWithoutConfirmation = replaceQuestion(questions108, {
      ...riskyQuestion,
      sourceRef: { ...riskyQuestion.sourceRef, extractionStatus: 'verified' }
    });

    expect(validateRiskyExtractionReview(verifiedWithoutConfirmation, { year: '108' })).toContain(
      '108-Q009 is marked verified before manual extraction confirmation: code layout requires manual format check.'
    );
    expect(
      validateAGroupQuestionContent(verifiedWithoutConfirmation, { year: '108', fileName: '108.pdf' })
    ).toContain('風險 PDF 抽取題保留人工確認狀態');
  });

  it('allows risky extractions to remain needs-review before manual confirmation', () => {
    const q9 = questions108.find((question) => question.number === 9);
    const q22 = questions108.find((question) => question.number === 22);

    if (!q9 || !q22) {
      throw new Error('Missing 108 risky extraction fixture');
    }

    const unconfirmedQuestions = replaceQuestion(
      replaceQuestion(questions108, {
        ...q9,
        sourceRef: { ...q9.sourceRef, extractionStatus: 'needs-review' }
      }),
      {
        ...q22,
        sourceRef: { ...q22.sourceRef, extractionStatus: 'needs-review' }
      }
    );

    expect(validateRiskyExtractionReview(unconfirmedQuestions, { year: '108' })).toEqual([]);
  });
});
