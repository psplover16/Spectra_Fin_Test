import { describe, expect, it, vi } from 'vitest';
import { createAGroupYearQuestionLoader } from '@/modules/examGroups/aGroup/composables/useAGroupYearQuestions';
import { loadAGroupYearQuestions } from '@/modules/examGroups/aGroup/composables/useAGroupYearQuestions';
import { hasQuestionAnalysisShape } from '@/modules/examGroups/aGroup/types/questionAnalysis';

describe('A group year question loader', () => {
  it('returns pending state for unfinished valid years without loading the 114 module', async () => {
    const load114 = vi.fn().mockResolvedValue({ questions: [] });
    const loader = createAGroupYearQuestionLoader({
      '114': load114
    });

    await expect(loader.load('113')).resolves.toEqual({
      status: 'pending',
      year: '113',
      questions: []
    });
    expect(load114).not.toHaveBeenCalled();
  });

  it('loads the requested 114 year module only when year 114 is requested', async () => {
    const load114 = vi.fn().mockResolvedValue({ questions: [] });
    const loader = createAGroupYearQuestionLoader({
      '114': load114
    });

    await expect(loader.load('114')).resolves.toEqual({
      status: 'complete',
      year: '114',
      questions: []
    });
    expect(load114).toHaveBeenCalledTimes(1);
  });

  it('loads exactly 50 year 114 question analysis records', async () => {
    const state = await loadAGroupYearQuestions('114');

    expect(state.status).toBe('complete');
    expect(state.questions).toHaveLength(50);
    expect(state.questions.every(hasQuestionAnalysisShape)).toBe(true);
  });
});
