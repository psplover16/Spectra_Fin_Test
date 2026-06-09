import { beforeEach, describe, expect, it, vi } from 'vitest';
import { A_GROUP_YEARS } from '@/modules/examGroups/aGroup/data/yearSummaries';
import {
  A_GROUP_PROGRESS_STORAGE_KEY,
  readAGroupProgressSnapshot,
  setAGroupYearCompletion,
  setAGroupYearBookmark,
  writeAGroupProgressSnapshot
} from '@/modules/examGroups/aGroup/storage/aGroupProgressStorage';

describe('A group progress storage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('serializes the first-batch progress snapshot schema', () => {
    const snapshot = writeAGroupProgressSnapshot({
      completedYears: ['114'],
      bookmark: { year: '113', updatedAt: '2026-06-09T08:00:00.000Z' },
      updatedAt: '2026-06-09T09:00:00.000Z'
    });

    const stored = JSON.parse(localStorage.getItem(A_GROUP_PROGRESS_STORAGE_KEY) ?? '{}');

    expect(snapshot).toEqual({
      version: 1,
      completedYears: ['114'],
      bookmark: { year: '113', updatedAt: '2026-06-09T08:00:00.000Z' },
      updatedAt: '2026-06-09T09:00:00.000Z'
    });
    expect(stored).toEqual(snapshot);
  });

  it('reads an empty snapshot when nothing is stored', () => {
    expect(readAGroupProgressSnapshot()).toEqual({
      version: 1,
      completedYears: [],
      bookmark: null,
      updatedAt: null
    });
  });

  it('persists one bookmarked A group year and replaces the previous bookmark', () => {
    setAGroupYearBookmark('114', {
      now: () => '2026-06-09T10:00:00.000Z'
    });
    const replaced = setAGroupYearBookmark('113', {
      now: () => '2026-06-09T10:05:00.000Z'
    });

    expect(replaced.bookmark).toEqual({
      year: '113',
      updatedAt: '2026-06-09T10:05:00.000Z'
    });
    expect(readAGroupProgressSnapshot().bookmark?.year).toBe('113');
  });

  it('persists completed years and removes an uncompleted year', () => {
    setAGroupYearCompletion('114', true, {
      now: () => '2026-06-09T11:00:00.000Z'
    });
    const removed = setAGroupYearCompletion('114', false, {
      now: () => '2026-06-09T11:05:00.000Z'
    });

    expect(removed.completedYears).toEqual([]);
    expect(readAGroupProgressSnapshot().completedYears).toEqual([]);
  });

  it('persists completed status for every complete A group year from 107 through 114', () => {
    for (const year of A_GROUP_YEARS) {
      setAGroupYearCompletion(year, true, {
        now: () => `2026-06-09T11:${year.slice(1)}:00.000Z`
      });
    }

    expect(readAGroupProgressSnapshot().completedYears).toEqual([...A_GROUP_YEARS]);
  });

  it('bookmarks historical complete years from 107 through 113', () => {
    setAGroupYearBookmark('107', {
      now: () => '2026-06-09T13:00:00.000Z'
    });
    const replaced = setAGroupYearBookmark('113', {
      now: () => '2026-06-09T13:05:00.000Z'
    });

    expect(replaced.bookmark).toEqual({
      year: '113',
      updatedAt: '2026-06-09T13:05:00.000Z'
    });
    expect(readAGroupProgressSnapshot().bookmark?.year).toBe('113');
  });

  it('clears the bookmark when the bookmarked year is completed', () => {
    setAGroupYearBookmark('114', {
      now: () => '2026-06-09T12:00:00.000Z'
    });
    const completed = setAGroupYearCompletion('114', true, {
      now: () => '2026-06-09T12:05:00.000Z'
    });

    expect(completed.completedYears).toEqual(['114']);
    expect(completed.bookmark).toBeNull();
    expect(readAGroupProgressSnapshot().bookmark).toBeNull();
  });

  it('fails safe when persisted JSON is corrupt', () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    localStorage.setItem(A_GROUP_PROGRESS_STORAGE_KEY, '{not-json');

    expect(readAGroupProgressSnapshot()).toEqual({
      version: 1,
      completedYears: [],
      bookmark: null,
      updatedAt: null
    });
    expect(error).not.toHaveBeenCalled();

    error.mockRestore();
  });

  it('fails safe when persisted snapshot version is unsupported', () => {
    localStorage.setItem(
      A_GROUP_PROGRESS_STORAGE_KEY,
      JSON.stringify({
        version: 2,
        completedYears: ['114'],
        bookmark: { year: '114', updatedAt: '2026-06-09T12:00:00.000Z' },
        updatedAt: '2026-06-09T12:00:00.000Z'
      })
    );

    expect(readAGroupProgressSnapshot()).toEqual({
      version: 1,
      completedYears: [],
      bookmark: null,
      updatedAt: null
    });
  });
});
