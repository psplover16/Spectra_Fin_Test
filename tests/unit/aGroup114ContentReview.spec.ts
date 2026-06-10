import { describe, expect, it } from 'vitest';
import {
  getAGroup114SystematicNoviceTeachingFailures,
  getAGroup114ContentReviewChecklist,
  validateAGroup114QuestionContent
} from '@/modules/examGroups/aGroup/data/years/114ContentReview';
import { questions } from '@/modules/examGroups/aGroup/data/years/114';
import type { ExamQuestionAnalysis } from '@/modules/examGroups/aGroup/types/questionAnalysis';

const systematicNoviceTeachingLabel = '每題皆符合新手系統教學解析標準';

function getQuestion(number: number): ExamQuestionAnalysis {
  const question = questions.find((candidate) => candidate.number === number);

  if (!question) {
    throw new Error(`Missing 114 question ${number}`);
  }

  return question;
}

function replaceQuestion(replacement: ExamQuestionAnalysis): ExamQuestionAnalysis[] {
  return questions.map((question) => (question.number === replacement.number ? replacement : question));
}

function createSystematicTwoComplementQuestion(overrides: Partial<ExamQuestionAnalysis> = {}): ExamQuestionAnalysis {
  return {
    ...getQuestion(1),
    beginnerExplanation: [
      '前置觀念是固定 6 位元二補數只有 2^6 種狀態；範圍公式來源是 -2^(n-1) 到 2^(n-1)-1，所以本題範圍為 -32 到 31。',
      '規則來源是二補數最高位具有負權重：6 位元權重可看成 -32、16、8、4、2、1；最高位為 1 的數也可用無號值減 2^n，或用反相加 1 找出負數大小。',
      '適用條件是加法器固定只保留 6 位元，因此超出位寬的第 7 位進位會被丟掉；常見陷阱是把丟掉進位後的 31 誤當成真實數學和，忽略 -25 + -8 = -33 已經溢位。'
    ].join('\n'),
    solvingSteps: [
      '先用 n 位元二補數範圍公式確認 6 位元可表示 -32 到 31。',
      '把 100111 視為負數：反相加 1 得 011001，也就是大小 25，因此它代表 -25。',
      '把 111000 視為負數：反相加 1 得 001000，也就是大小 8，因此它代表 -8。',
      '檢查真實數學和 -25 + -8 = -33，低於 -32，所以這是 signed overflow。',
      '再看固定 6 位元硬體留下的結果：100111 + 111000 = 1 011111，丟掉第 7 位後得到 011111。',
      '把 011111 轉十進位，因最高位是 0，所以 16+8+4+2+1 = 31。'
    ],
    optionExplanations: {
      A: '0 對應 000000，沒有套用固定 6 位元加法後的 011111 結果。',
      B: '1 對應 000001，通常是只看最後位元或漏算權重造成的錯誤。',
      C: '31 對應固定 6 位元加法留下的 011111，符合題目問的執行後結果。',
      D: '33 不但不是留下的 bit pattern，也超過 6 位元二補數正數上限 31。'
    },
    keyTakeaways: [
      'n 位元二補數範圍是 -2^(n-1) 到 2^(n-1)-1。',
      '負數 bit pattern 可用反相加 1 找大小，也可用無號值減 2^n 直接換算。',
      '固定寬度加法只保留低 n 位，超出的進位會被丟棄。',
      '兩個負數相加卻得到正數，是 signed overflow 的常見陷阱。'
    ],
    ...overrides
  };
}

describe('114 A group content review checklist', () => {
  it('passes the full 114 question content review', () => {
    expect(getAGroup114SystematicNoviceTeachingFailures(questions)).toEqual([]);
    expect(validateAGroup114QuestionContent(questions)).toEqual([]);
    expect(getAGroup114ContentReviewChecklist(questions)).toEqual([
      { label: '50 題題號唯一且連續', passed: true },
      { label: '每題皆有 A 至 D 原始選項與四份選項辨析', passed: true },
      { label: '每題皆有非空 tags、PDF sourceRef 與官方答案狀態', passed: true },
      { label: '多答案與送分題皆保留人工複核註記', passed: true },
      { label: '風險 PDF 抽取題保留人工確認狀態', passed: true },
      { label: '每題皆有專業教學解析、解題步驟與重點整理', passed: true },
      { label: systematicNoviceTeachingLabel, passed: true }
    ]);
  });

  it('keeps Q001 through Q004 as canonical novice-teaching examples', () => {
    const twoComplement = getQuestion(1);
    const vonNeumann = getQuestion(2);
    const pythonTypes = getQuestion(3);
    const crc = getQuestion(4);

    expect(twoComplement.beginnerExplanation).toContain('6 位元共有 2^6 = 64 種排列');
    expect(twoComplement.beginnerExplanation).toContain('反相加 1 的原理');
    expect(twoComplement.beginnerExplanation).toContain('signed overflow');
    expect(twoComplement.solvingSteps.join('\n')).toContain('011111');

    expect(vonNeumann.beginnerExplanation).toContain('儲存程式概念');
    expect(vonNeumann.beginnerExplanation).toContain('輸入、輸出、記憶體、運算器、控制器');
    expect(vonNeumann.optionExplanations.D).toContain('CPU 內部');

    expect(pythonTypes.beginnerExplanation).toContain('Python 常見型別');
    expect(pythonTypes.teachingTables?.map((table) => table.title)).toEqual([
      'Python 常見主要型別對照',
      'list、tuple 與 set 核心差異'
    ]);
    expect(pythonTypes.teachingTables?.flatMap((table) => table.rows.flat()).join('\n')).toContain('[1, 2, 3]');
    expect(pythonTypes.teachingTables?.flatMap((table) => table.rows.flat()).join('\n')).toContain('(1, 2, 3)');
    expect(pythonTypes.teachingTables?.flatMap((table) => table.rows.flat()).join('\n')).toContain('set()');

    expect(crc.beginnerExplanation).toContain('CRC');
    expect(crc.beginnerExplanation).toContain('1010');
    expect(crc.solvingSteps.join('\n')).toContain('補 3 個 0');
    expect(crc.solvingSteps.join('\n')).toContain('餘數 100');
  });

  it('rejects shallow teaching content that only states the answer', () => {
    const shallowQuestion: ExamQuestionAnalysis = {
      ...getQuestion(1),
      beginnerExplanation: '答案是 C。把兩個二進位數字加起來後得到 31。',
      solvingSteps: ['看題目。', '把數字加起來。', '選 C。'],
      optionExplanations: {
        A: '不是答案。',
        B: '不是答案。',
        C: '正確答案。',
        D: '不是答案。'
      },
      keyTakeaways: ['答案是 C。', '記住本題結果是 31。']
    };

    expect(validateAGroup114QuestionContent(replaceQuestion(shallowQuestion))).toContain(systematicNoviceTeachingLabel);
  });

  it.each([
    {
      caseName: 'skips prerequisite concepts',
      overrides: {
        beginnerExplanation: '答案 C。答案 C。答案 C。答案 C。答案 C。答案 C。答案 C。答案 C。'
      }
    },
    {
      caseName: 'misses the formula or rule source',
      overrides: {
        beginnerExplanation:
          'Answer C. Add the two bit strings and keep the displayed result. The result is thirty one. This explanation gives no rule source.'
      }
    },
    {
      caseName: 'misses common traps or distractor reasoning',
      overrides: {
        optionExplanations: {
          A: '此選項提供另一個主題描述，需要回到題目脈絡比較。',
          B: '此選項提供另一個主題描述，需要回到題目脈絡比較。',
          C: '此選項提供本題計算結果，需要回到題目脈絡比較。',
          D: '此選項提供另一個主題描述，需要回到題目脈絡比較。'
        },
        keyTakeaways: ['整理題目脈絡與分類關係。', '保留計算過程與答案依據。', '建立往後題目的比較流程。']
      }
    }
  ])('rejects teaching content that $caseName', ({ overrides }) => {
    const incompleteQuestion = createSystematicTwoComplementQuestion(overrides);

    expect(getAGroup114SystematicNoviceTeachingFailures(replaceQuestion(incompleteQuestion))).toEqual(
      expect.arrayContaining([expect.objectContaining({ number: 1 })])
    );
    expect(validateAGroup114QuestionContent(replaceQuestion(incompleteQuestion))).toContain(systematicNoviceTeachingLabel);
  });

  it('accepts a fixture that explains prerequisites, rules, traps, and reusable takeaways', () => {
    const systematicQuestion = createSystematicTwoComplementQuestion();

    expect(validateAGroup114QuestionContent(replaceQuestion(systematicQuestion))).not.toContain(
      systematicNoviceTeachingLabel
    );
  });
});
