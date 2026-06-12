import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  clearYearQuestionBookmark,
  createYearQuestionBookmarkPageKey,
  readYearQuestionBookmark,
  readYearQuestionBookmarkSnapshot,
  setYearQuestionBookmark,
  YEAR_QUESTION_BOOKMARK_STORAGE_KEY
} from '@/modules/examGroups/shared/storage/yearQuestionBookmarkStorage';

describe('year question bookmark storage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('reads an empty snapshot when no page bookmark is stored', () => {
    expect(readYearQuestionBookmarkSnapshot()).toEqual({
      version: 1,
      bookmarks: {},
      updatedAt: null
    });
  });

  it('stores one bookmark per group-year page and replaces the previous question on that page', () => {
    setYearQuestionBookmark('a-group', '114', 1, {
      now: () => '2026-06-12T08:00:00.000Z'
    });
    setYearQuestionBookmark('a-group', '114', 3, {
      now: () => '2026-06-12T08:05:00.000Z'
    });

    const snapshot = readYearQuestionBookmarkSnapshot();
    const pageKey = createYearQuestionBookmarkPageKey('a-group', '114');

    expect(snapshot.bookmarks[pageKey]).toEqual({
      group: 'a-group',
      year: '114',
      questionNumber: 3,
      updatedAt: '2026-06-12T08:05:00.000Z'
    });
    expect(Object.keys(snapshot.bookmarks)).toEqual([pageKey]);
  });

  it('keeps independent bookmarks for different year pages', () => {
    setYearQuestionBookmark('a-group', '114', 2);
    setYearQuestionBookmark('a-group', '113', 5);
    setYearQuestionBookmark('b-group', '113', 1);

    expect(readYearQuestionBookmark('a-group', '114')?.questionNumber).toBe(2);
    expect(readYearQuestionBookmark('a-group', '113')?.questionNumber).toBe(5);
    expect(readYearQuestionBookmark('b-group', '113')?.questionNumber).toBe(1);
  });

  it('clears only the selected page bookmark', () => {
    setYearQuestionBookmark('a-group', '114', 2);
    setYearQuestionBookmark('a-group', '113', 5);

    clearYearQuestionBookmark('a-group', '114');

    expect(readYearQuestionBookmark('a-group', '114')).toBeNull();
    expect(readYearQuestionBookmark('a-group', '113')?.questionNumber).toBe(5);
  });

  it('fails safe when persisted JSON is corrupt', () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    localStorage.setItem(YEAR_QUESTION_BOOKMARK_STORAGE_KEY, '{not-json');

    expect(readYearQuestionBookmarkSnapshot()).toEqual({
      version: 1,
      bookmarks: {},
      updatedAt: null
    });
    expect(error).not.toHaveBeenCalled();

    error.mockRestore();
  });
});
