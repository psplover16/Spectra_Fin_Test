import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  LANGUAGE_PROGRESS_STORAGE_KEY,
  LANGUAGE_YEARS,
  readLanguageProgressSnapshot,
  setLanguageYearBookmark,
  setLanguageYearCompletion,
  writeLanguageProgressSnapshot
} from '@/modules/examGroups/language/storage/languageProgressStorage';

describe('language progress storage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('uses the language progress storage key', () => {
    expect(LANGUAGE_PROGRESS_STORAGE_KEY).toBe('finpub:language-progress:v1');
  });

  it('serializes the language progress snapshot schema', () => {
    const snapshot = writeLanguageProgressSnapshot({
      completedYears: ['112'],
      bookmark: { year: '111', updatedAt: '2026-06-09T08:00:00.000Z' },
      updatedAt: '2026-06-09T09:00:00.000Z'
    });

    const stored = JSON.parse(localStorage.getItem(LANGUAGE_PROGRESS_STORAGE_KEY) ?? '{}');

    expect(snapshot).toEqual({
      version: 1,
      completedYears: ['112'],
      bookmark: { year: '111', updatedAt: '2026-06-09T08:00:00.000Z' },
      updatedAt: '2026-06-09T09:00:00.000Z'
    });
    expect(stored).toEqual(snapshot);
  });

  it('reads an empty snapshot when nothing is stored', () => {
    expect(readLanguageProgressSnapshot()).toEqual({
      version: 1,
      completedYears: [],
      bookmark: null,
      updatedAt: null
    });
  });

  it('persists one bookmarked language year and replaces the previous bookmark', () => {
    setLanguageYearBookmark('112', {
      now: () => '2026-06-09T10:00:00.000Z'
    });
    const replaced = setLanguageYearBookmark('111', {
      now: () => '2026-06-09T10:05:00.000Z'
    });

    expect(replaced.bookmark?.year).toBe('111');
    expect(readLanguageProgressSnapshot().bookmark?.year).toBe('111');
  });

  it('persists completed status for every language source year', () => {
    for (const year of LANGUAGE_YEARS) {
      setLanguageYearCompletion(year, true, {
        now: () => `2026-06-09T11:${year.slice(1)}:00.000Z`
      });
    }

    expect(readLanguageProgressSnapshot().completedYears).toEqual([...LANGUAGE_YEARS]);
  });

  it('clears the bookmark when the bookmarked year is completed', () => {
    setLanguageYearBookmark('112', {
      now: () => '2026-06-09T12:00:00.000Z'
    });
    const completed = setLanguageYearCompletion('112', true, {
      now: () => '2026-06-09T12:05:00.000Z'
    });

    expect(completed.completedYears).toEqual(['112']);
    expect(completed.bookmark).toBeNull();
  });

  it('fails safe when persisted JSON is corrupt', () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    localStorage.setItem(LANGUAGE_PROGRESS_STORAGE_KEY, '{not-json');

    expect(readLanguageProgressSnapshot()).toEqual({
      version: 1,
      completedYears: [],
      bookmark: null,
      updatedAt: null
    });
    expect(error).not.toHaveBeenCalled();

    error.mockRestore();
  });

  it('fails safe when completed years contain an illegal language year', () => {
    localStorage.setItem(
      LANGUAGE_PROGRESS_STORAGE_KEY,
      JSON.stringify({
        version: 1,
        completedYears: ['112', '113'],
        bookmark: { year: '112', updatedAt: '2026-06-09T12:00:00.000Z' },
        updatedAt: '2026-06-09T12:00:00.000Z'
      })
    );

    expect(readLanguageProgressSnapshot()).toEqual({
      version: 1,
      completedYears: [],
      bookmark: null,
      updatedAt: null
    });
  });
});
