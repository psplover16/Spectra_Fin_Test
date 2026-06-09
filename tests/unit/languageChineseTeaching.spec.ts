import { describe, expect, it } from 'vitest';
import { hasChineseExamTeachingFocus } from '@/modules/examGroups/language/data/years/contentReview';
import { questions as questions107 } from '@/modules/examGroups/language/data/years/107';
import { questions as questions108 } from '@/modules/examGroups/language/data/years/108';
import { questions as questions109 } from '@/modules/examGroups/language/data/years/109';
import { questions as questions110 } from '@/modules/examGroups/language/data/years/110';
import { questions as questions111 } from '@/modules/examGroups/language/data/years/111';
import { questions as questions112 } from '@/modules/examGroups/language/data/years/112';

const allQuestions = [
  ...questions112,
  ...questions111,
  ...questions110,
  ...questions109,
  ...questions108,
  ...questions107
];

describe('language Chinese teaching', () => {
  it('focuses composition teaching on structure, evidence, scoring, and common pitfalls', () => {
    const chineseQuestions = allQuestions.filter((question) => question.subject === 'chinese');

    expect(chineseQuestions).toHaveLength(6);
    chineseQuestions.forEach((question) => {
      expect(hasChineseExamTeachingFocus(question)).toBe(true);
      expect(question.choices).toEqual([]);
      expect(question.acceptedAnswers).toEqual([]);
      expect(question.teachingNotes.join('\n')).toContain('評分');
      expect(question.strategyTips.join('\n')).toMatch(/題目|例子|段/);
    });
  });
});
