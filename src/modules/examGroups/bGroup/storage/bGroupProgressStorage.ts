export const B_GROUP_YEARS = ['114', '113', '112', '111', '110', '109', '108', '107'] as const;

export type BGroupYear = (typeof B_GROUP_YEARS)[number];

export const B_GROUP_PROGRESS_STORAGE_KEY = 'finpub:b-group-progress:v1';
export const B_GROUP_PROGRESS_VERSION = 1;

export interface BGroupYearBookmark {
  year: BGroupYear;
  updatedAt: string;
}

export interface BGroupProgressSnapshot {
  version: typeof B_GROUP_PROGRESS_VERSION;
  completedYears: BGroupYear[];
  bookmark: BGroupYearBookmark | null;
  updatedAt: string | null;
}

export interface WritableBGroupProgressSnapshot {
  completedYears: BGroupYear[];
  bookmark: BGroupYearBookmark | null;
  updatedAt: string;
}

export interface BGroupProgressStorageOptions {
  storage?: Storage | null;
  now?: () => string;
}

export function createEmptyBGroupProgressSnapshot(): BGroupProgressSnapshot {
  return {
    version: B_GROUP_PROGRESS_VERSION,
    completedYears: [],
    bookmark: null,
    updatedAt: null
  };
}

function getBrowserStorage(): Storage | null {
  return typeof window === 'undefined' ? null : window.localStorage;
}

const B_GROUP_YEAR_SET = new Set<string>(B_GROUP_YEARS);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isBGroupYear(value: unknown): value is BGroupYear {
  return typeof value === 'string' && B_GROUP_YEAR_SET.has(value);
}

function parseCompletedYears(value: unknown): BGroupYear[] | null {
  if (!Array.isArray(value)) {
    return null;
  }

  const completedYears = new Set<BGroupYear>();

  for (const year of value) {
    if (!isBGroupYear(year)) {
      return null;
    }

    completedYears.add(year);
  }

  return [...completedYears];
}

function parseBookmark(value: unknown): BGroupYearBookmark | null | undefined {
  if (value === null) {
    return null;
  }

  if (!isRecord(value) || !isBGroupYear(value.year) || typeof value.updatedAt !== 'string') {
    return undefined;
  }

  return {
    year: value.year,
    updatedAt: value.updatedAt
  };
}

function parseSnapshot(value: unknown): BGroupProgressSnapshot | null {
  if (!isRecord(value) || value.version !== B_GROUP_PROGRESS_VERSION || typeof value.updatedAt !== 'string') {
    return null;
  }

  const completedYears = parseCompletedYears(value.completedYears);
  const bookmark = parseBookmark(value.bookmark);

  if (!completedYears || bookmark === undefined) {
    return null;
  }

  return {
    version: B_GROUP_PROGRESS_VERSION,
    completedYears,
    bookmark,
    updatedAt: value.updatedAt
  };
}

export function readBGroupProgressSnapshot(storage: Storage | null = getBrowserStorage()): BGroupProgressSnapshot {
  const rawSnapshot = storage?.getItem(B_GROUP_PROGRESS_STORAGE_KEY);

  if (!rawSnapshot) {
    return createEmptyBGroupProgressSnapshot();
  }

  try {
    return parseSnapshot(JSON.parse(rawSnapshot)) ?? createEmptyBGroupProgressSnapshot();
  } catch {
    return createEmptyBGroupProgressSnapshot();
  }
}

export function writeBGroupProgressSnapshot(
  snapshot: WritableBGroupProgressSnapshot,
  storage: Storage | null = getBrowserStorage()
): BGroupProgressSnapshot {
  const persistedSnapshot: BGroupProgressSnapshot = {
    version: B_GROUP_PROGRESS_VERSION,
    completedYears: [...snapshot.completedYears],
    bookmark: snapshot.bookmark ? { ...snapshot.bookmark } : null,
    updatedAt: snapshot.updatedAt
  };

  storage?.setItem(B_GROUP_PROGRESS_STORAGE_KEY, JSON.stringify(persistedSnapshot));

  return persistedSnapshot;
}

function resolveStorage(options: BGroupProgressStorageOptions): Storage | null {
  return options.storage === undefined ? getBrowserStorage() : options.storage;
}

function resolveNow(options: BGroupProgressStorageOptions): string {
  return options.now ? options.now() : new Date().toISOString();
}

export function setBGroupYearBookmark(
  year: BGroupYear,
  options: BGroupProgressStorageOptions = {}
): BGroupProgressSnapshot {
  const storage = resolveStorage(options);
  const now = resolveNow(options);
  const currentSnapshot = readBGroupProgressSnapshot(storage);

  return writeBGroupProgressSnapshot(
    {
      completedYears: currentSnapshot.completedYears,
      bookmark: { year, updatedAt: now },
      updatedAt: now
    },
    storage
  );
}

export function setBGroupYearCompletion(
  year: BGroupYear,
  completed: boolean,
  options: BGroupProgressStorageOptions = {}
): BGroupProgressSnapshot {
  const storage = resolveStorage(options);
  const now = resolveNow(options);
  const currentSnapshot = readBGroupProgressSnapshot(storage);
  const completedYears = new Set(currentSnapshot.completedYears);

  if (completed) {
    completedYears.add(year);
  } else {
    completedYears.delete(year);
  }

  const nextBookmark = completed && currentSnapshot.bookmark?.year === year ? null : currentSnapshot.bookmark;

  return writeBGroupProgressSnapshot(
    {
      completedYears: [...completedYears],
      bookmark: nextBookmark,
      updatedAt: now
    },
    storage
  );
}
