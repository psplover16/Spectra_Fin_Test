import { LANGUAGE_YEARS, type LanguageYear } from '@/modules/examGroups/language/data/yearSummaries';

export { LANGUAGE_YEARS };

export const LANGUAGE_PROGRESS_STORAGE_KEY = 'finpub:language-progress:v1';
export const LANGUAGE_PROGRESS_VERSION = 1;

export interface LanguageYearBookmark {
  year: LanguageYear;
  updatedAt: string;
}

export interface LanguageProgressSnapshot {
  version: typeof LANGUAGE_PROGRESS_VERSION;
  completedYears: LanguageYear[];
  bookmark: LanguageYearBookmark | null;
  updatedAt: string | null;
}

export interface WritableLanguageProgressSnapshot {
  completedYears: LanguageYear[];
  bookmark: LanguageYearBookmark | null;
  updatedAt: string;
}

export interface LanguageProgressStorageOptions {
  storage?: Storage | null;
  now?: () => string;
}

export function createEmptyLanguageProgressSnapshot(): LanguageProgressSnapshot {
  return {
    version: LANGUAGE_PROGRESS_VERSION,
    completedYears: [],
    bookmark: null,
    updatedAt: null
  };
}

function getBrowserStorage(): Storage | null {
  return typeof window === 'undefined' ? null : window.localStorage;
}

const LANGUAGE_YEAR_SET = new Set<string>(LANGUAGE_YEARS);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isLanguageYear(value: unknown): value is LanguageYear {
  return typeof value === 'string' && LANGUAGE_YEAR_SET.has(value);
}

function parseCompletedYears(value: unknown): LanguageYear[] | null {
  if (!Array.isArray(value)) {
    return null;
  }

  const completedYears = new Set<LanguageYear>();

  for (const year of value) {
    if (!isLanguageYear(year)) {
      return null;
    }

    completedYears.add(year);
  }

  return [...completedYears];
}

function parseBookmark(value: unknown): LanguageYearBookmark | null | undefined {
  if (value === null) {
    return null;
  }

  if (!isRecord(value) || !isLanguageYear(value.year) || typeof value.updatedAt !== 'string') {
    return undefined;
  }

  return {
    year: value.year,
    updatedAt: value.updatedAt
  };
}

function parseSnapshot(value: unknown): LanguageProgressSnapshot | null {
  if (!isRecord(value) || value.version !== LANGUAGE_PROGRESS_VERSION || typeof value.updatedAt !== 'string') {
    return null;
  }

  const completedYears = parseCompletedYears(value.completedYears);
  const bookmark = parseBookmark(value.bookmark);

  if (!completedYears || bookmark === undefined) {
    return null;
  }

  return {
    version: LANGUAGE_PROGRESS_VERSION,
    completedYears,
    bookmark,
    updatedAt: value.updatedAt
  };
}

export function readLanguageProgressSnapshot(storage: Storage | null = getBrowserStorage()): LanguageProgressSnapshot {
  const rawSnapshot = storage?.getItem(LANGUAGE_PROGRESS_STORAGE_KEY);

  if (!rawSnapshot) {
    return createEmptyLanguageProgressSnapshot();
  }

  try {
    return parseSnapshot(JSON.parse(rawSnapshot)) ?? createEmptyLanguageProgressSnapshot();
  } catch {
    return createEmptyLanguageProgressSnapshot();
  }
}

export function writeLanguageProgressSnapshot(
  snapshot: WritableLanguageProgressSnapshot,
  storage: Storage | null = getBrowserStorage()
): LanguageProgressSnapshot {
  const persistedSnapshot: LanguageProgressSnapshot = {
    version: LANGUAGE_PROGRESS_VERSION,
    completedYears: [...snapshot.completedYears],
    bookmark: snapshot.bookmark ? { ...snapshot.bookmark } : null,
    updatedAt: snapshot.updatedAt
  };

  storage?.setItem(LANGUAGE_PROGRESS_STORAGE_KEY, JSON.stringify(persistedSnapshot));

  return persistedSnapshot;
}

function resolveStorage(options: LanguageProgressStorageOptions): Storage | null {
  return options.storage === undefined ? getBrowserStorage() : options.storage;
}

function resolveNow(options: LanguageProgressStorageOptions): string {
  return options.now ? options.now() : new Date().toISOString();
}

export function setLanguageYearBookmark(
  year: LanguageYear,
  options: LanguageProgressStorageOptions = {}
): LanguageProgressSnapshot {
  const storage = resolveStorage(options);
  const now = resolveNow(options);
  const currentSnapshot = readLanguageProgressSnapshot(storage);

  return writeLanguageProgressSnapshot(
    {
      completedYears: currentSnapshot.completedYears,
      bookmark: { year, updatedAt: now },
      updatedAt: now
    },
    storage
  );
}

export function setLanguageYearCompletion(
  year: LanguageYear,
  completed: boolean,
  options: LanguageProgressStorageOptions = {}
): LanguageProgressSnapshot {
  const storage = resolveStorage(options);
  const now = resolveNow(options);
  const currentSnapshot = readLanguageProgressSnapshot(storage);
  const completedYears = new Set(currentSnapshot.completedYears);

  if (completed) {
    completedYears.add(year);
  } else {
    completedYears.delete(year);
  }

  const nextBookmark = completed && currentSnapshot.bookmark?.year === year ? null : currentSnapshot.bookmark;

  return writeLanguageProgressSnapshot(
    {
      completedYears: [...completedYears],
      bookmark: nextBookmark,
      updatedAt: now
    },
    storage
  );
}
