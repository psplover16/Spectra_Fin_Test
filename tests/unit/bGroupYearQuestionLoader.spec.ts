import { describe, expect, it, vi } from 'vitest';
import {
  createBGroupYearQuestionLoader,
  loadBGroupYearQuestions
} from '@/modules/examGroups/bGroup/composables/useBGroupYearQuestions';

describe('B group year question loader', () => {
  it('returns an empty complete state when an injected loader is missing', async () => {
    const load114 = vi.fn().mockResolvedValue({ questions: [] });
    const loader = createBGroupYearQuestionLoader({
      '114': load114
    });

    await expect(loader.load('113')).resolves.toEqual({
      status: 'complete',
      year: '113',
      questions: []
    });
    expect(load114).not.toHaveBeenCalled();
  });

  it('loads only the requested injected year module', async () => {
    const load113 = vi.fn().mockResolvedValue({ questions: [] });
    const load114 = vi.fn().mockResolvedValue({ questions: [] });
    const loader = createBGroupYearQuestionLoader({
      '113': load113,
      '114': load114
    });

    await expect(loader.load('113')).resolves.toEqual({
      status: 'complete',
      year: '113',
      questions: []
    });
    expect(load113).toHaveBeenCalledTimes(1);
    expect(load114).not.toHaveBeenCalled();
  });

  it.each(['107', '108', '109', '110', '111', '112', '113', '114'] as const)(
    'loads the B group year %s module',
    async (year) => {
      const state = await loadBGroupYearQuestions(year);

      expect(state.status).toBe('complete');
      expect(state.year).toBe(year);
      expect(state.questions.every((question) => question.year === year)).toBe(true);
    }
  );
});
