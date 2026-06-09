import { A_GROUP_YEARS, type AGroupYear } from '@/modules/examGroups/aGroup/data/yearSummaries';

export const A_GROUP_PROGRESS_STORAGE_KEY = 'finpub:a-group-progress:v1';
export const A_GROUP_PROGRESS_VERSION = 1;

export interface AGroupYearBookmark {
  year: AGroupYear;
  updatedAt: string;
}

export interface AGroupProgressSnapshot {
  version: typeof A_GROUP_PROGRESS_VERSION;
  completedYears: AGroupYear[];
  bookmark: AGroupYearBookmark | null;
  updatedAt: string | null;
}

export interface WritableAGroupProgressSnapshot {
  completedYears: AGroupYear[];
  bookmark: AGroupYearBookmark | null;
  updatedAt: string;
}

export interface AGroupProgressStorageOptions {
  storage?: Storage | null;
  now?: () => string;
}

export function createEmptyAGroupProgressSnapshot(): AGroupProgressSnapshot {
  return {
    version: A_GROUP_PROGRESS_VERSION,
    completedYears: [],
    bookmark: null,
    updatedAt: null
  };
}

function getBrowserStorage(): Storage | null {
  return typeof window === 'undefined' ? null : window.localStorage;
}

const A_GROUP_YEAR_SET = new Set<string>(A_GROUP_YEARS);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isAGroupYear(value: unknown): value is AGroupYear {
  return typeof value === 'string' && A_GROUP_YEAR_SET.has(value);
}

function parseCompletedYears(value: unknown): AGroupYear[] | null {
  if (!Array.isArray(value)) {
    return null;
  }

  const completedYears = new Set<AGroupYear>();

  for (const year of value) {
    if (!isAGroupYear(year)) {
      return null;
    }

    completedYears.add(year);
  }

  return [...completedYears];
}

function parseBookmark(value: unknown): AGroupYearBookmark | null | undefined {
  if (value === null) {
    return null;
  }

  if (!isRecord(value) || !isAGroupYear(value.year) || typeof value.updatedAt !== 'string') {
    return undefined;
  }

  return {
    year: value.year,
    updatedAt: value.updatedAt
  };
}

function parseSnapshot(value: unknown): AGroupProgressSnapshot | null {
  if (!isRecord(value) || value.version !== A_GROUP_PROGRESS_VERSION || typeof value.updatedAt !== 'string') {
    return null;
  }

  const completedYears = parseCompletedYears(value.completedYears);
  const bookmark = parseBookmark(value.bookmark);

  if (!completedYears || bookmark === undefined) {
    return null;
  }

  return {
    version: A_GROUP_PROGRESS_VERSION,
    completedYears,
    bookmark,
    updatedAt: value.updatedAt
  };
}

export function readAGroupProgressSnapshot(storage: Storage | null = getBrowserStorage()): AGroupProgressSnapshot {
  const rawSnapshot = storage?.getItem(A_GROUP_PROGRESS_STORAGE_KEY);

  if (!rawSnapshot) {
    return createEmptyAGroupProgressSnapshot();
  }

  try {
    return parseSnapshot(JSON.parse(rawSnapshot)) ?? createEmptyAGroupProgressSnapshot();
  } catch {
    return createEmptyAGroupProgressSnapshot();
  }
}

export function writeAGroupProgressSnapshot(
  snapshot: WritableAGroupProgressSnapshot,
  storage: Storage | null = getBrowserStorage()
): AGroupProgressSnapshot {
  const persistedSnapshot: AGroupProgressSnapshot = {
    version: A_GROUP_PROGRESS_VERSION,
    completedYears: [...snapshot.completedYears],
    bookmark: snapshot.bookmark ? { ...snapshot.bookmark } : null,
    updatedAt: snapshot.updatedAt
  };

  storage?.setItem(A_GROUP_PROGRESS_STORAGE_KEY, JSON.stringify(persistedSnapshot));

  return persistedSnapshot;
}

function resolveStorage(options: AGroupProgressStorageOptions): Storage | null {
  return options.storage === undefined ? getBrowserStorage() : options.storage;
}

function resolveNow(options: AGroupProgressStorageOptions): string {
  return options.now ? options.now() : new Date().toISOString();
}

export function setAGroupYearBookmark(
  year: AGroupYear,
  options: AGroupProgressStorageOptions = {}
): AGroupProgressSnapshot {
  const storage = resolveStorage(options);
  const now = resolveNow(options);
  const currentSnapshot = readAGroupProgressSnapshot(storage);

  return writeAGroupProgressSnapshot(
    {
      completedYears: currentSnapshot.completedYears,
      bookmark: { year, updatedAt: now },
      updatedAt: now
    },
    storage
  );
}

export function setAGroupYearCompletion(
  year: AGroupYear,
  completed: boolean,
  options: AGroupProgressStorageOptions = {}
): AGroupProgressSnapshot {
  const storage = resolveStorage(options);
  const now = resolveNow(options);
  const currentSnapshot = readAGroupProgressSnapshot(storage);
  const completedYears = new Set(currentSnapshot.completedYears);

  if (completed) {
    completedYears.add(year);
  } else {
    completedYears.delete(year);
  }

  const nextBookmark = completed && currentSnapshot.bookmark?.year === year ? null : currentSnapshot.bookmark;

  return writeAGroupProgressSnapshot(
    {
      completedYears: [...completedYears],
      bookmark: nextBookmark,
      updatedAt: now
    },
    storage
  );
}
