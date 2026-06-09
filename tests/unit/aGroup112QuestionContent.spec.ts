import { describe, expect, it } from 'vitest';
import { hasQuestionAnalysisShape } from '@/modules/examGroups/aGroup/types/questionAnalysis';
import { questions } from '@/modules/examGroups/aGroup/data/years/112';
import { sourceBaselineRows } from '@/modules/examGroups/aGroup/data/years/112SourceBaseline';

const temporarySkeletonMarkers = ['待審查解析骨架', '後續內容審查', '來源基準骨架', '仍需由逐題解析', '正式完成前'];

function getQuestion(number: number) {
  const question = questions.find((candidate) => candidate.number === number);

  if (!question) {
    throw new Error(`Missing 112 question ${number}`);
  }

  return question;
}

describe('112 A group question content', () => {
  it('contains exactly 50 question analyses with the shared data shape', () => {
    expect(questions).toHaveLength(50);
    expect(questions.every(hasQuestionAnalysisShape)).toBe(true);
  });

  it('preserves official answers and PDF source references from the source baseline', () => {
    for (const question of questions) {
      const sourceRow = sourceBaselineRows.find((row) => row.number === question.number);

      expect(sourceRow).toBeDefined();
      expect(question.acceptedAnswers).toEqual(sourceRow?.officialAnswers);
      expect(question.sourceRef.year).toBe('112');
      expect(question.sourceRef.fileName).toBe('112.pdf');
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

  it('preserves official special answer states without ordinary verified single-answer status', () => {
    expect(getQuestion(10)).toMatchObject({
      acceptedAnswers: ['A', 'D'],
      answerVerification: 'needs-review'
    });
    expect(getQuestion(10).answerNote).toContain('A 或 D');

    expect(getQuestion(21)).toMatchObject({
      acceptedAnswers: ['A', 'B', 'C', 'D'],
      answerVerification: 'needs-review'
    });
    expect(getQuestion(21).answerNote).toContain('一律送分');

    expect(getQuestion(32)).toMatchObject({
      acceptedAnswers: ['A', 'B'],
      answerVerification: 'needs-review'
    });
    expect(getQuestion(32).answerNote).toContain('A 或 B');
  });

  it('keeps the manually confirmed 112-Q033 extraction clean', () => {
    const question = getQuestion(33);

    expect(question.originalStem).toBe('有關物聯網(Internet of Things)網路層主要功能之敘述，下列何者正確？');
    expect(question.originalStem).not.toContain('層主要功能 層主要功能');
    expect(question.options.D).toBe('負責將感測及辨識後的資料進行分類');
    expect(question.options.D).not.toContain('後的資料進行分類 後的資料進行分類');
    expect(question.sourceRef.extractionStatus).toBe('verified');
  });
});
