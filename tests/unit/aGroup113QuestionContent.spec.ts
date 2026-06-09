import { describe, expect, it } from 'vitest';
import { hasQuestionAnalysisShape } from '@/modules/examGroups/aGroup/types/questionAnalysis';
import { questions } from '@/modules/examGroups/aGroup/data/years/113';
import { sourceBaselineRows } from '@/modules/examGroups/aGroup/data/years/113SourceBaseline';

const temporarySkeletonMarkers = ['待審查解析骨架', '後續內容審查', '來源基準骨架', '仍需由逐題解析', '正式完成前'];

function getQuestion(number: number) {
  const question = questions.find((candidate) => candidate.number === number);

  if (!question) {
    throw new Error(`Missing 113 question ${number}`);
  }

  return question;
}

describe('113 A group question content', () => {
  it('contains exactly 50 question analyses with the shared data shape', () => {
    expect(questions).toHaveLength(50);
    expect(questions.every(hasQuestionAnalysisShape)).toBe(true);
  });

  it('preserves official answers and PDF source references from the source baseline', () => {
    for (const question of questions) {
      const sourceRow = sourceBaselineRows.find((row) => row.number === question.number);

      expect(sourceRow).toBeDefined();
      expect(question.acceptedAnswers).toEqual(sourceRow?.officialAnswers);
      expect(question.sourceRef.year).toBe('113');
      expect(question.sourceRef.fileName).toBe('113.pdf');
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

  it('preserves known special answer and extraction review states', () => {
    const q17 = getQuestion(17);
    const q41 = getQuestion(41);
    const q42 = getQuestion(42);
    const q43 = getQuestion(43);

    expect(q17.acceptedAnswers).toEqual(['A', 'B', 'C', 'D']);
    expect(q17.answerVerification).not.toBe('verified');
    expect(q17.answerNote).toContain('一律送分');

    expect(q41.sourceRef.extractionStatus).toBe('verified');
    expect(q41.originalStem).toContain("var user = getUrlParameter('user');");
    expect(q41.originalStem).toContain('document.write');

    expect(q42.sourceRef.extractionStatus).toBe('verified');
    expect(q42.options.D).toContain('ChrootDirectory限制可存取');

    expect(q43.acceptedAnswers).toEqual(['B', 'C']);
    expect(q43.answerVerification).not.toBe('verified');
    expect(q43.answerNote).toContain('B、C');
  });
});
