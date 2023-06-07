const CACHE_NAME = `cache-v${Date.now()}`;

// Use the install event to pre-cache all initial resources.
self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    cache.addAll([
      '/',
      './views/html/Documentation.html'
    ]);
  })());
});

// TODO fetch event