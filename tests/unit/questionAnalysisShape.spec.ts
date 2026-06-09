import { describe, expect, it } from 'vitest';
import {
  hasQuestionAnalysisShape,
  type ExamQuestionAnalysis
} from '@/modules/examGroups/aGroup/types/questionAnalysis';

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
});
