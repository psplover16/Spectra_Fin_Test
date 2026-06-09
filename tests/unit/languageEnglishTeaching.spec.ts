import { describe, expect, it } from 'vitest';
import { hasJuniorHighFriendlyEnglishTeaching } from '@/modules/examGroups/language/data/years/contentReview';
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

describe('language English teaching', () => {
  it('uses Traditional Chinese explanations suitable for junior-high English learners', () => {
    const englishQuestions = allQuestions.filter((question) => question.subject === 'english');

    expect(englishQuestions.length).toBeGreaterThan(0);
    englishQuestions.forEach((question) => {
      expect(hasJuniorHighFriendlyEnglishTeaching(question)).toBe(true);
      expect(question.answerExplanation).toMatch(/國二|英文|文法|字彙|克漏字|閱讀/);
      expect([...question.teachingNotes, ...question.strategyTips].join('\n')).toMatch(/例句|線索|語境|主旨|詞性/);
    });
  });
});
