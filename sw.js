const O_FILES_PATH = {
  S_VIEW_FILE_HOMEPAGE_PATH: "./Views/html/homepage.html",
  S_VIEW_FILE_DOCUMENTATION_PATH: "./Views/html/Documentation.html",
  S_VIEW_FILE_HOMEPAGE_CSS_PATH: "./Views/assets/style/homepage.css",
  S_VIEW_FILE_HOMEPAGE_SCSS_PATH: "./Views/assets/style/homepage.scss",
  S_VIEW_FILE_MAIN_SCSS_PATH: "./Views/assets/style/main.scss",
  S_VIEW_FILE_VARIABLE_CSS_PATH: "./Views/assets/style/variable.css",
  S_VIEW_FILE_VARIABLE_SCSS_PATH: "./Views/assets/style/variable.scss",
  S_VIEW_FILE_SCRIPT_JS_PATH: "./Views/assets/script/script.js",
  S_VIEW_FILE_TAB_CONTROLLER_JS_PATH: "./Views/assets/script/tabController.js",
  S_VIEW_FILE_ICON_PATH: "./Views/assets/images/icon.png",
  S_VIEW_FILE_ICON_MENU_PATH: "./Views/assets/images/icon_menu.png",
  S_VIEW_FILE_MANIFEST_PATH: "./manifest.json",
};

const S_CACHE_NAME = `cache-hothothot`;

/**
 * @function cacheAddAll - Add all files to cache storage
 * @param {string[]} S_src - Array of files to cache
 * @returns {void}
 */
const cacheAddAll = async (...S_src) => {
  caches
    .open(S_CACHE_NAME)
    .then((cache) => cache.addAll(S_src))
    .catch((err) => console.error(err));
};

const getFromCaches = async (cache, request) => {
  const cachedResponse = await cache.match(request);
  if (cachedResponse && cachedResponse.ok) {
    return cachedResponse;
  }
  // todo : maybe redirect to offline page
  return await cache.match(O_FILES_PATH.S_VIEW_FILE_HOMEPAGE_PATH);
};

self.addEventListener("install", (event) => {
  event.waitUntil(
    cacheAddAll(
      ...Object.values(O_FILES_PATH),
      "https://hothothot.dog/api/capteurs/exterieur"
    )
  );
});

// strategy: network first
self.addEventListener("fetch", (event) => {
  event.respondWith(
    (async () => {
      const cache = await caches.open(S_CACHE_NAME);
      try {
        const fetchResponse = await fetch(event.request);

        if (fetchResponse) {
          cache.put(event.request, fetchResponse.clone());
          return fetchResponse;
        }

        return await getFromCaches(cache, event.request);

      } catch (e) {
        // The network failed, try to get it from the cache.        
        return await getFromCaches(cache, event.request);
      }
    })()
  );
});

