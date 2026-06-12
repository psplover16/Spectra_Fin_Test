export const YEAR_QUESTION_BOOKMARK_STORAGE_KEY = 'finpub:year-question-bookmarks:v1';
export const YEAR_QUESTION_BOOKMARK_VERSION = 1;

export type YearQuestionBookmarkGroup = 'a-group' | 'b-group' | 'language';

export interface YearQuestionBookmark {
  group: YearQuestionBookmarkGroup;
  year: string;
  questionNumber: number;
  updatedAt: string;
}

export interface YearQuestionBookmarkSnapshot {
  version: typeof YEAR_QUESTION_BOOKMARK_VERSION;
  bookmarks: Record<string, YearQuestionBookmark>;
  updatedAt: string | null;
}

export interface YearQuestionBookmarkStorageOptions {
  storage?: Storage | null;
  now?: () => string;
}

export function createEmptyYearQuestionBookmarkSnapshot(): YearQuestionBookmarkSnapshot {
  return {
    version: YEAR_QUESTION_BOOKMARK_VERSION,
    bookmarks: {},
    updatedAt: null
  };
}

export function createYearQuestionBookmarkPageKey(group: YearQuestionBookmarkGroup, year: string): string {
  return `${group}:${year}`;
}

export function createYearQuestionElementId(
  group: YearQuestionBookmarkGroup,
  year: string,
  questionNumber: number
): string {
  return `year-question-bookmark-${group}-${year}-${questionNumber}`;
}

function getBrowserStorage(): Storage | null {
  return typeof window === 'undefined' ? null : window.localStorage;
}

function resolveStorage(options: YearQuestionBookmarkStorageOptions): Storage | null {
  return options.storage === undefined ? getBrowserStorage() : options.storage;
}

function resolveNow(options: YearQuestionBookmarkStorageOptions): string {
  return options.now ? options.now() : new Date().toISOString();
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isYearQuestionBookmarkGroup(value: unknown): value is YearQuestionBookmarkGroup {
  return value === 'a-group' || value === 'b-group' || value === 'language';
}

function isPositiveInteger(value: unknown): value is number {
  return typeof value === 'number' && Number.isInteger(value) && value > 0;
}

function parseBookmark(value: unknown): YearQuestionBookmark | null {
  if (
    !isRecord(value) ||
    !isYearQuestionBookmarkGroup(value.group) ||
    typeof value.year !== 'string' ||
    !isPositiveInteger(value.questionNumber) ||
    typeof value.updatedAt !== 'string'
  ) {
    return null;
  }

  return {
    group: value.group,
    year: value.year,
    questionNumber: value.questionNumber,
    updatedAt: value.updatedAt
  };
}

function parseSnapshot(value: unknown): YearQuestionBookmarkSnapshot | null {
  if (!isRecord(value) || value.version !== YEAR_QUESTION_BOOKMARK_VERSION || !isRecord(value.bookmarks)) {
    return null;
  }

  const bookmarks: Record<string, YearQuestionBookmark> = {};

  for (const [pageKey, bookmark] of Object.entries(value.bookmarks)) {
    const parsedBookmark = parseBookmark(bookmark);

    if (!parsedBookmark || createYearQuestionBookmarkPageKey(parsedBookmark.group, parsedBookmark.year) !== pageKey) {
      return null;
    }

    bookmarks[pageKey] = parsedBookmark;
  }

  return {
    version: YEAR_QUESTION_BOOKMARK_VERSION,
    bookmarks,
    updatedAt: typeof value.updatedAt === 'string' ? value.updatedAt : null
  };
}

export function readYearQuestionBookmarkSnapshot(
  storage: Storage | null = getBrowserStorage()
): YearQuestionBookmarkSnapshot {
  const rawSnapshot = storage?.getItem(YEAR_QUESTION_BOOKMARK_STORAGE_KEY);

  if (!rawSnapshot) {
    return createEmptyYearQuestionBookmarkSnapshot();
  }

  try {
    return parseSnapshot(JSON.parse(rawSnapshot)) ?? createEmptyYearQuestionBookmarkSnapshot();
  } catch {
    return createEmptyYearQuestionBookmarkSnapshot();
  }
}

export function writeYearQuestionBookmarkSnapshot(
  snapshot: YearQuestionBookmarkSnapshot,
  storage: Storage | null = getBrowserStorage()
): YearQuestionBookmarkSnapshot {
  const persistedSnapshot: YearQuestionBookmarkSnapshot = {
    version: YEAR_QUESTION_BOOKMARK_VERSION,
    bookmarks: { ...snapshot.bookmarks },
    updatedAt: snapshot.updatedAt
  };

  storage?.setItem(YEAR_QUESTION_BOOKMARK_STORAGE_KEY, JSON.stringify(persistedSnapshot));

  return persistedSnapshot;
}

export function readYearQuestionBookmark(
  group: YearQuestionBookmarkGroup,
  year: string,
  storage: Storage | null = getBrowserStorage()
): YearQuestionBookmark | null {
  return readYearQuestionBookmarkSnapshot(storage).bookmarks[createYearQuestionBookmarkPageKey(group, year)] ?? null;
}

export function setYearQuestionBookmark(
  group: YearQuestionBookmarkGroup,
  year: string,
  questionNumber: number,
  options: YearQuestionBookmarkStorageOptions = {}
): YearQuestionBookmarkSnapshot {
  const storage = resolveStorage(options);
  const now = resolveNow(options);
  const pageKey = createYearQuestionBookmarkPageKey(group, year);
  const currentSnapshot = readYearQuestionBookmarkSnapshot(storage);

  return writeYearQuestionBookmarkSnapshot(
    {
      version: YEAR_QUESTION_BOOKMARK_VERSION,
      bookmarks: {
        ...currentSnapshot.bookmarks,
        [pageKey]: {
          group,
          year,
          questionNumber,
          updatedAt: now
        }
      },
      updatedAt: now
    },
    storage
  );
}

export function clearYearQuestionBookmark(
  group: YearQuestionBookmarkGroup,
  year: string,
  options: YearQuestionBookmarkStorageOptions = {}
): YearQuestionBookmarkSnapshot {
  const storage = resolveStorage(options);
  const now = resolveNow(options);
  const pageKey = createYearQuestionBookmarkPageKey(group, year);
  const currentSnapshot = readYearQuestionBookmarkSnapshot(storage);
  const nextBookmarks = { ...currentSnapshot.bookmarks };
  delete nextBookmarks[pageKey];

  return writeYearQuestionBookmarkSnapshot(
    {
      version: YEAR_QUESTION_BOOKMARK_VERSION,
      bookmarks: nextBookmarks,
      updatedAt: now
    },
    storage
  );
}
