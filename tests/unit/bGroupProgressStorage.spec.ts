import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  B_GROUP_PROGRESS_STORAGE_KEY,
  B_GROUP_YEARS,
  readBGroupProgressSnapshot,
  setBGroupYearBookmark,
  setBGroupYearCompletion,
  writeBGroupProgressSnapshot
} from '@/modules/examGroups/bGroup/storage/bGroupProgressStorage';

describe('B group progress storage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('uses the B group progress storage key', () => {
    expect(B_GROUP_PROGRESS_STORAGE_KEY).toBe('finpub:b-group-progress:v1');
  });

  it('serializes the B group progress snapshot schema', () => {
    const snapshot = writeBGroupProgressSnapshot({
      completedYears: ['114'],
      bookmark: { year: '113', updatedAt: '2026-06-09T08:00:00.000Z' },
      updatedAt: '2026-06-09T09:00:00.000Z'
    });

    const stored = JSON.parse(localStorage.getItem(B_GROUP_PROGRESS_STORAGE_KEY) ?? '{}');

    expect(snapshot).toEqual({
      version: 1,
      completedYears: ['114'],
      bookmark: { year: '113', updatedAt: '2026-06-09T08:00:00.000Z' },
      updatedAt: '2026-06-09T09:00:00.000Z'
    });
    expect(stored).toEqual(snapshot);
  });

  it('reads an empty snapshot when nothing is stored', () => {
    expect(readBGroupProgressSnapshot()).toEqual({
      version: 1,
      completedYears: [],
      bookmark: null,
      updatedAt: null
    });
  });

  it('persists one bookmarked B group year and replaces the previous bookmark', () => {
    setBGroupYearBookmark('114', {
      now: () => '2026-06-09T10:00:00.000Z'
    });
    const replaced = setBGroupYearBookmark('113', {
      now: () => '2026-06-09T10:05:00.000Z'
    });

    expect(replaced.bookmark).toEqual({
      year: '113',
      updatedAt: '2026-06-09T10:05:00.000Z'
    });
    expect(readBGroupProgressSnapshot().bookmark?.year).toBe('113');
  });

  it('persists completed years and removes an uncompleted year', () => {
    setBGroupYearCompletion('114', true, {
      now: () => '2026-06-09T11:00:00.000Z'
    });
    const removed = setBGroupYearCompletion('114', false, {
      now: () => '2026-06-09T11:05:00.000Z'
    });

    expect(removed.completedYears).toEqual([]);
    expect(readBGroupProgressSnapshot().completedYears).toEqual([]);
  });

  it('persists completed status for every B group year from 107 through 114', () => {
    for (const year of B_GROUP_YEARS) {
      setBGroupYearCompletion(year, true, {
        now: () => `2026-06-09T11:${year.slice(1)}:00.000Z`
      });
    }

    expect(readBGroupProgressSnapshot().completedYears).toEqual([...B_GROUP_YEARS]);
  });

  it('bookmarks any legal B group year from 107 through 114', () => {
    setBGroupYearBookmark('107', {
      now: () => '2026-06-09T13:00:00.000Z'
    });
    const replaced = setBGroupYearBookmark('114', {
      now: () => '2026-06-09T13:05:00.000Z'
    });

    expect(replaced.bookmark).toEqual({
      year: '114',
      updatedAt: '2026-06-09T13:05:00.000Z'
    });
    expect(readBGroupProgressSnapshot().bookmark?.year).toBe('114');
  });

  it('clears the bookmark when the bookmarked year is completed', () => {
    setBGroupYearBookmark('114', {
      now: () => '2026-06-09T12:00:00.000Z'
    });
    const completed = setBGroupYearCompletion('114', true, {
      now: () => '2026-06-09T12:05:00.000Z'
    });

    expect(completed.completedYears).toEqual(['114']);
    expect(completed.bookmark).toBeNull();
    expect(readBGroupProgressSnapshot().bookmark).toBeNull();
  });

  it('keeps an unrelated bookmark when another year is completed', () => {
    setBGroupYearBookmark('113', {
      now: () => '2026-06-09T12:00:00.000Z'
    });
    const completed = setBGroupYearCompletion('114', true, {
      now: () => '2026-06-09T12:05:00.000Z'
    });

    expect(completed.completedYears).toEqual(['114']);
    expect(completed.bookmark).toEqual({
      year: '113',
      updatedAt: '2026-06-09T12:00:00.000Z'
    });
  });

  it('fails safe when persisted JSON is corrupt', () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    localStorage.setItem(B_GROUP_PROGRESS_STORAGE_KEY, '{not-json');

    expect(readBGroupProgressSnapshot()).toEqual({
      version: 1,
      completedYears: [],
      bookmark: null,
      updatedAt: null
    });
    expect(error).not.toHaveBeenCalled();

    error.mockRestore();
  });

  it('fails safe when persisted snapshot has required fields missing', () => {
    localStorage.setItem(
      B_GROUP_PROGRESS_STORAGE_KEY,
      JSON.stringify({
        version: 1,
        bookmark: { year: '114', updatedAt: '2026-06-09T12:00:00.000Z' },
        updatedAt: '2026-06-09T12:00:00.000Z'
      })
    );

    expect(readBGroupProgressSnapshot()).toEqual({
      version: 1,
      completedYears: [],
      bookmark: null,
      updatedAt: null
    });
  });

  it('fails safe when persisted snapshot version is unsupported', () => {
    localStorage.setItem(
      B_GROUP_PROGRESS_STORAGE_KEY,
      JSON.stringify({
        version: 2,
        completedYears: ['114'],
        bookmark: { year: '114', updatedAt: '2026-06-09T12:00:00.000Z' },
        updatedAt: '2026-06-09T12:00:00.000Z'
      })
    );

    expect(readBGroupProgressSnapshot()).toEqual({
      version: 1,
      completedYears: [],
      bookmark: null,
      updatedAt: null
    });
  });

  it('fails safe when completed years contain an illegal B group year', () => {
    localStorage.setItem(
      B_GROUP_PROGRESS_STORAGE_KEY,
      JSON.stringify({
        version: 1,
        completedYears: ['114', '106'],
        bookmark: { year: '114', updatedAt: '2026-06-09T12:00:00.000Z' },
        updatedAt: '2026-06-09T12:00:00.000Z'
      })
    );

    expect(readBGroupProgressSnapshot()).toEqual({
      version: 1,
      completedYears: [],
      bookmark: null,
      updatedAt: null
    });
  });

  it('fails safe when bookmark contains an illegal B group year', () => {
    localStorage.setItem(
      B_GROUP_PROGRESS_STORAGE_KEY,
      JSON.stringify({
        version: 1,
        completedYears: ['114'],
        bookmark: { year: '115', updatedAt: '2026-06-09T12:00:00.000Z' },
        updatedAt: '2026-06-09T12:00:00.000Z'
      })
    );

    expect(readBGroupProgressSnapshot()).toEqual({
      version: 1,
      completedYears: [],
      bookmark: null,
      updatedAt: null
    });
  });
});
