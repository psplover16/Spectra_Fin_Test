const CACHE_NAME = 'finpub-exam-pwa-v1';
const OPTIONAL_PATHS = [
  './manifest.webmanifest',
  './icons/exam-icon.svg',
  './computer-principles',
  './networking',
  './information-management',
  './programming',
  './language'
];

self.addEventListener('install', (event) => {
  event.waitUntil(precacheAppShell().then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        Promise.all(cacheNames.filter((cacheName) => cacheName !== CACHE_NAME).map((cacheName) => caches.delete(cacheName)))
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const requestUrl = new URL(request.url);

  if (request.method !== 'GET' || requestUrl.origin !== self.location.origin) {
    return;
  }

  if (request.mode === 'navigate') {
    event.respondWith(networkFirstNavigation(request));
    return;
  }

  event.respondWith(cacheFirstAsset(request));
});

async function precacheAppShell() {
  const cache = await caches.open(CACHE_NAME);
  const rootUrl = new URL('./', self.registration.scope).toString();
  const rootResponse = await fetch(rootUrl, { cache: 'reload' });

  if (!rootResponse.ok) {
    throw new Error('Unable to cache the app shell.');
  }

  await cache.put(rootUrl, rootResponse.clone());
  const rootHtml = await rootResponse.text();
  const assetUrls = extractSameScopeAssetUrls(rootHtml);

  await Promise.all(assetUrls.map((assetUrl) => fetchAndPutRequired(cache, assetUrl)));
  await Promise.all(OPTIONAL_PATHS.map((path) => fetchAndPutOptional(cache, new URL(path, self.registration.scope).toString())));
}

function extractSameScopeAssetUrls(html) {
  const urls = [];
  const attributePattern = /(?:src|href)="([^"]+)"/g;
  const scopeUrl = new URL(self.registration.scope);
  let match = attributePattern.exec(html);

  while (match) {
    const rawUrl = match[1];

    if (!rawUrl.startsWith('data:') && !rawUrl.startsWith('#')) {
      const url = new URL(rawUrl, self.registration.scope);

      if (url.origin === self.location.origin && url.pathname.startsWith(scopeUrl.pathname)) {
        urls.push(url.toString());
      }
    }

    match = attributePattern.exec(html);
  }

  return [...new Set(urls)];
}

async function fetchAndPutRequired(cache, url) {
  const response = await fetch(url, { cache: 'reload' });

  if (!response.ok) {
    throw new Error(`Unable to cache required asset: ${url}`);
  }

  await cache.put(url, response);
}

async function fetchAndPutOptional(cache, url) {
  try {
    const response = await fetch(url, { cache: 'reload' });

    if (response.ok) {
      await cache.put(url, response);
    }
  } catch {
    // Optional route warmup can fail without blocking the online app.
  }
}

async function networkFirstNavigation(request) {
  const cache = await caches.open(CACHE_NAME);

  try {
    const response = await fetch(request);

    if (response.ok) {
      await cache.put(request, response.clone());
    }

    return response;
  } catch {
    const cachedRoute = await cache.match(request);
    const cachedRoot = await cache.match(new URL('./', self.registration.scope).toString());

    return cachedRoute ?? cachedRoot ?? Response.error();
  }
}

async function cacheFirstAsset(request) {
  const cachedResponse = await caches.match(request);

  if (cachedResponse) {
    return cachedResponse;
  }

  const cache = await caches.open(CACHE_NAME);

  try {
    const response = await fetch(request);

    if (response.ok) {
      await cache.put(request, response.clone());
    }

    return response;
  } catch {
    return Response.error();
  }
}
