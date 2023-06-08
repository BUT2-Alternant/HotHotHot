const S_VIEW_FILE_HOMEPAGE_PATH = "./views/html/homepage.html";
const S_VIEW_FILE_DOCUMENTATION_PATH = "./views/html/Documentation.html";

const S_CACHE_NAME = `cache-v${Date.now()}`;

/**
 * @function cacheAddAll - Add all files to cache storage
 * @param {string[]} S_src - Array of files to cache
 * @returns {void}
 */
const cacheAddAll = async (...S_src) => {
  caches.open(S_CACHE_NAME).then((cache) => cache.addAll(S_src)).catch((err) => console.error(err));
};

self.addEventListener("install", (event) => {
  event.waitUntil(
    cacheAddAll(S_VIEW_FILE_HOMEPAGE_PATH, S_VIEW_FILE_DOCUMENTATION_PATH)
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    (async () => {
      const cache = await caches.open(S_CACHE_NAME);

      const cachedResponse = await cache.match(event.request);
      if (cachedResponse) {
        return cachedResponse;
      } else {
        try {
          const fetchResponse = await fetch(event.request);

          if (fetchResponse) {
            cache.put(event.request, fetchResponse.clone());
            return fetchResponse;
          }
        } catch (e) {
          // The network failed.
          console.error(e);
        }
      }
    })()
  );
});
