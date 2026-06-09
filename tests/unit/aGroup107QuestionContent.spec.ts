import { describe, expect, it } from 'vitest';
import { hasQuestionAnalysisShape } from '@/modules/examGroups/aGroup/types/questionAnalysis';
import { questions } from '@/modules/examGroups/aGroup/data/years/107';
import { sourceBaselineRows } from '@/modules/examGroups/aGroup/data/years/107SourceBaseline';

const temporarySkeletonMarkers = ['待審查解析骨架', '後續內容審查', '來源基準骨架', '仍需由逐題解析', '正式完成前'];

function getQuestion(number: number) {
  const question = questions.find((candidate) => candidate.number === number);

  if (!question) {
    throw new Error(`Missing 107 question ${number}`);
  }

  return question;
}

describe('107 A group question content', () => {
  it('contains exactly 50 question analyses with the shared data shape', () => {
    expect(questions).toHaveLength(50);
    expect(questions.every(hasQuestionAnalysisShape)).toBe(true);
  });

  it('preserves official answers and PDF source references from the source baseline', () => {
    for (const question of questions) {
      const sourceRow = sourceBaselineRows.find((row) => row.number === question.number);

      expect(sourceRow).toBeDefined();
      expect(question.acceptedAnswers).toEqual(sourceRow?.officialAnswers);
      expect(question.sourceRef.year).toBe('107');
      expect(question.sourceRef.fileName).toBe('107.pdf');
      expect(question.sourceRef.pageNumber).toBe(sourceRow?.sourceRef.pageNumber);
    }
  });

  it('does not expose temporary skeleton teaching text', () => {
    const teachingText = questions
      .flatMap((question) => [
        question.beginnerExplanation,
        ...question.solvingSteps,
        ...Object.values(question.optionExplanations),
        ...question.keyTakeaways
      ])
      .join('\n');

    for (const marker of temporarySkeletonMarkers) {
      expect(teachingText).not.toContain(marker);
    }
  });

  it.each([13, 49])('preserves 107-Q%03i as a multi-answer review case', (number) => {
    const question = getQuestion(number);

    expect(question.acceptedAnswers).toEqual(['B', 'C']);
    expect(question.answerVerification).not.toBe('verified');
    expect(question.answerNote).toEqual(expect.stringContaining('B 或 C'));
    expect(question.sourceRef.extractionStatus).toBe('needs-review');
  });
});
