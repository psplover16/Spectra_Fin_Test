import { describe, expect, it } from 'vitest';
import { hasQuestionAnalysisShape } from '@/modules/examGroups/aGroup/types/questionAnalysis';
import { questions } from '@/modules/examGroups/aGroup/data/years/111';
import { sourceBaselineRows } from '@/modules/examGroups/aGroup/data/years/111SourceBaseline';

const temporarySkeletonMarkers = ['待審查解析骨架', '後續內容審查', '來源基準骨架', '仍需由逐題解析', '正式完成前'];

function getQuestion(number: number) {
  const question = questions.find((candidate) => candidate.number === number);

  if (!question) {
    throw new Error(`Missing 111 question ${number}`);
  }

  return question;
}

describe('111 A group question content', () => {
  it('contains exactly 50 question analyses with the shared data shape', () => {
    expect(questions).toHaveLength(50);
    expect(questions.every(hasQuestionAnalysisShape)).toBe(true);
  });

  it('preserves official answers and PDF source references from the source baseline', () => {
    for (const question of questions) {
      const sourceRow = sourceBaselineRows.find((row) => row.number === question.number);

      expect(sourceRow).toBeDefined();
      expect(question.acceptedAnswers).toEqual(sourceRow?.officialAnswers);
      expect(question.sourceRef.year).toBe('111');
      expect(question.sourceRef.fileName).toBe('111.pdf');
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

  it('preserves PDF-reviewed code snippets, same-line options, and numbered clauses', () => {
    expect(getQuestion(10).options.D).not.toContain('請翻頁');
    expect(getQuestion(36).options.D).not.toContain('請翻頁');

    expect(getQuestion(11).originalStem).toContain('Class Sub {\n   int add ()');
    expect(getQuestion(13).originalStem).toContain('printf(“%d”,i++);');
    expect(getQuestion(15).originalStem).toContain('byte b=200;');
    expect(getQuestion(21).originalStem).toContain('def calnum (n)\n return 1');

    expect(getQuestion(33).options).toEqual({
      A: 'TLS_DH_ANON',
      B: 'TLS_DHE',
      C: 'TLS_ECDHE',
      D: 'TLS_RSA'
    });
    expect(getQuestion(33).sourceRef.extractionStatus).toBe('verified');

    expect(getQuestion(41).options.C).toBe('可以阻擋外界對內部網路所發動的攻擊');
    expect(getQuestion(41).options.D).toBe('主要分為網路層及應用層防火牆');
    expect(getQuestion(41).sourceRef.extractionStatus).toBe('verified');

    const question50Stem = getQuestion(50).originalStem;

    expect(question50Stem).toContain('○1 對稱性加密法');
    expect(question50Stem).toContain('○2 目前普遍使用的非對稱性加密法為IDEA');
    expect(question50Stem).toContain('○3 非對稱性加密公開金鑰必須由憑證管理中心簽發');
    expect(question50Stem).toContain('○4 數位簽章的運作方式');
    expect(getQuestion(50).sourceRef.extractionStatus).toBe('verified');
  });
});
