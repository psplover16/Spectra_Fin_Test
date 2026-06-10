import { describe, expect, it } from 'vitest';
import {
  hasQuestionAnalysisShape,
  type ExamQuestionAnalysis
} from '@/modules/examGroups/aGroup/types/questionAnalysis';
import { questions as questions107 } from '@/modules/examGroups/aGroup/data/years/107';
import { questions as questions108 } from '@/modules/examGroups/aGroup/data/years/108';
import { questions as questions109 } from '@/modules/examGroups/aGroup/data/years/109';
import { questions as questions110 } from '@/modules/examGroups/aGroup/data/years/110';
import { questions as questions111 } from '@/modules/examGroups/aGroup/data/years/111';
import { questions as questions112 } from '@/modules/examGroups/aGroup/data/years/112';
import { questions as questions113 } from '@/modules/examGroups/aGroup/data/years/113';
import { questions as questions114 } from '@/modules/examGroups/aGroup/data/years/114';

const completeQuestion = {
  year: '114',
  number: 1,
  acceptedAnswers: ['C'],
  answerNote: null,
  answerVerification: 'verified',
  originalStem: 'Which statement is correct?',
  options: {
    A: 'Option A',
    B: 'Option B',
    C: 'Option C',
    D: 'Option D'
  },
  coreTerms: ['term'],
  beginnerExplanation: 'Beginner explanation',
  solvingSteps: ['Read the question', 'Check each option'],
  optionExplanations: {
    A: 'A is incorrect',
    B: 'B is incorrect',
    C: 'C is correct',
    D: 'D is incorrect'
  },
  keyTakeaways: ['Remember the rule'],
  tags: ['computer-principles'],
  sourceRef: {
    year: '114',
    fileName: '114.pdf',
    pageNumber: 3,
    extractionStatus: 'verified'
  }
} satisfies ExamQuestionAnalysis;

const historicalYearQuestions = [
  ['107', questions107],
  ['108', questions108],
  ['109', questions109],
  ['110', questions110],
  ['111', questions111],
  ['112', questions112],
  ['113', questions113],
  ['114', questions114]
] as const;

describe('question analysis shape', () => {
  it('accepts a complete single-answer question record', () => {
    expect(hasQuestionAnalysisShape(completeQuestion)).toBe(true);
  });

  it('accepts the spec example for multiple accepted answers', () => {
    expect(
      hasQuestionAnalysisShape({
        ...completeQuestion,
        acceptedAnswers: ['B', 'C'],
        answerNote: 'Official material accepts B or C'
      })
    ).toBe(true);
  });

  it('accepts optional teaching tables when each row matches the headers', () => {
    expect(
      hasQuestionAnalysisShape({
        ...completeQuestion,
        teachingTables: [
          {
            title: 'Python 主要型別對照',
            headers: ['類別', '代表型別', '主要特徵'],
            rows: [['序列型別', 'list、tuple', '有順序且可用索引讀取']]
          }
        ]
      })
    ).toBe(true);
  });

  it('rejects malformed teaching tables with missing cells', () => {
    expect(
      hasQuestionAnalysisShape({
        ...completeQuestion,
        teachingTables: [
          {
            title: 'Python 主要型別對照',
            headers: ['類別', '代表型別', '主要特徵'],
            rows: [['序列型別', 'list、tuple']]
          }
        ]
      })
    ).toBe(false);
  });

  it('rejects records without exactly A to D options and explanations', () => {
    expect(
      hasQuestionAnalysisShape({
        ...completeQuestion,
        options: {
          A: 'Option A',
          B: 'Option B',
          C: 'Option C'
        }
      })
    ).toBe(false);
    expect(
      hasQuestionAnalysisShape({
        ...completeQuestion,
        optionExplanations: {
          A: 'A is incorrect',
          B: 'B is incorrect',
          C: 'C is correct'
        }
      })
    ).toBe(false);
  });

  it.each(historicalYearQuestions)('accepts every %s historical question record', (_year, questions) => {
    expect(questions).toHaveLength(50);
    expect(questions.every(hasQuestionAnalysisShape)).toBe(true);
  });
});
