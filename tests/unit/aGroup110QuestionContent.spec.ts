import { describe, expect, it } from 'vitest';
import { ANSWER_OPTIONS, hasQuestionAnalysisShape } from '@/modules/examGroups/aGroup/types/questionAnalysis';
import { questions } from '@/modules/examGroups/aGroup/data/years/110';
import { sourceBaselineRows } from '@/modules/examGroups/aGroup/data/years/110SourceBaseline';

const temporarySkeletonMarkers = ['待審查解析骨架', '後續內容審查', '來源基準骨架', '仍需由逐題解析', '正式完成前'];

function getQuestion(number: number) {
  const question = questions.find((candidate) => candidate.number === number);

  if (!question) {
    throw new Error(`Missing 110 question ${number}`);
  }

  return question;
}

describe('110 A group question content', () => {
  it('contains exactly 50 question analyses with the shared data shape', () => {
    expect(questions).toHaveLength(50);
    expect(questions.every(hasQuestionAnalysisShape)).toBe(true);
  });

  it('preserves official answers and PDF source references from the source baseline', () => {
    for (const question of questions) {
      const sourceRow = sourceBaselineRows.find((row) => row.number === question.number);

      expect(sourceRow).toBeDefined();
      expect(question.acceptedAnswers).toEqual(sourceRow?.officialAnswers);
      expect(question.sourceRef.year).toBe('110');
      expect(question.sourceRef.fileName).toBe('110.pdf');
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

  it('preserves special answers and manually confirmed extraction fixes', () => {
    const q9 = getQuestion(9);
    const q37 = getQuestion(37);
    const q45 = getQuestion(45);

    expect(q9.options.D).toBe('XOR');
    expect(q9.sourceRef.extractionStatus).toBe('verified');
    expect(q37.acceptedAnswers).toEqual([...ANSWER_OPTIONS]);
    expect(q37.answerVerification).not.toBe('verified');
    expect(q37.answerNote).toContain('一律給分');
    expect(q37.options.D).toBe('WPS');
    expect(q45.options.A).toBe('感知層→網路層→應用層');
    expect(Object.values(q45.options).join('\n')).not.toContain('');
    expect(q45.sourceRef.extractionStatus).toBe('verified');
  });
});
