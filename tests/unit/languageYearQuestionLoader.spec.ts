import { describe, expect, it, vi } from 'vitest';
import { createLanguageYearQuestionLoader } from '@/modules/examGroups/language/composables/useLanguageYearQuestions';

describe('language year question loader', () => {
  it('lazy imports only the requested language year module', async () => {
    const importers = {
      '112': vi.fn().mockResolvedValue({ questions: [{ year: '112', number: 1 }] }),
      '111': vi.fn().mockResolvedValue({ questions: [{ year: '111', number: 1 }] }),
      '110': vi.fn().mockResolvedValue({ questions: [] }),
      '109': vi.fn().mockResolvedValue({ questions: [] }),
      '108': vi.fn().mockResolvedValue({ questions: [] }),
      '107': vi.fn().mockResolvedValue({ questions: [] })
    };
    const loadLanguageYearQuestions = createLanguageYearQuestionLoader(importers);

    await expect(loadLanguageYearQuestions('112')).resolves.toMatchObject({
      status: 'complete',
      year: '112',
      questions: [{ year: '112', number: 1 }]
    });

    expect(importers['112']).toHaveBeenCalledTimes(1);
    expect(importers['111']).not.toHaveBeenCalled();
  });
});
