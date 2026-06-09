import { describe, expect, it } from 'vitest';
import { hasQuestionAnalysisShape } from '@/modules/examGroups/aGroup/types/questionAnalysis';
import { questions } from '@/modules/examGroups/aGroup/data/years/108';
import { sourceBaselineRows } from '@/modules/examGroups/aGroup/data/years/108SourceBaseline';

const temporarySkeletonMarkers = ['待審查解析骨架', '後續內容審查', '來源基準骨架', '仍需由逐題解析', '正式完成前'];

describe('108 A group question content', () => {
  it('contains exactly 50 question analyses with the shared data shape', () => {
    expect(questions).toHaveLength(50);
    expect(questions.every(hasQuestionAnalysisShape)).toBe(true);
  });

  it('preserves official answers and PDF source references from the source baseline', () => {
    for (const question of questions) {
      const sourceRow = sourceBaselineRows.find((row) => row.number === question.number);

      expect(sourceRow).toBeDefined();
      expect(question.acceptedAnswers).toEqual(sourceRow?.officialAnswers);
      expect(question.sourceRef.year).toBe('108');
      expect(question.sourceRef.fileName).toBe('108.pdf');
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

  it('keeps manually reviewed formula, code, table, duplicated text, and fullwidth-answer cases readable', () => {
    const q3 = questions.find((question) => question.number === 3);
    const q9 = questions.find((question) => question.number === 9);
    const q22 = questions.find((question) => question.number === 22);
    const q27 = questions.find((question) => question.number === 27);
    const q31 = questions.find((question) => question.number === 31);

    expect(q3?.originalStem).toContain('H = 0.5 + 0.1 × log2 C');
    expect(q3?.originalStem).toContain('2 ≤ C ≤ 32');
    expect(q9?.originalStem).toContain('procedure P(X,Y,Z:integer)');
    expect(q9?.sourceRef.extractionStatus).toBe('verified');
    expect(q22?.originalStem).toContain('Process | Burst Time');
    expect(q22?.sourceRef.extractionStatus).toBe('verified');
    expect(q27?.originalStem).toBe(
      '如果目的位址為200.45.34.56，子網路遮罩為255.255.240.0，下列子網路位址何者正確？'
    );
    expect(q31?.acceptedAnswers).toEqual(['A']);
    expect(q31?.answerNote).toContain('全形「Ａ」');
  });
});
