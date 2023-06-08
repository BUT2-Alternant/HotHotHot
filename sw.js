const O_FILES_PATH = {
  S_VIEW_FILE_HOMEPAGE_PATH: "./views/html/homepage.html",
  S_VIEW_FILE_DOCUMENTATION_PATH: "./views/html/Documentation.html",
  S_VIEW_FILE_HOMEPAGE_CSS_PATH: "./views/assets/style/homepage.css",
  S_VIEW_FILE_HOMEPAGE_SCSS_PATH: "./views/assets/style/homepage.scss",
  S_VIEW_FILE_MAIN_SCSS_PATH: "./views/assets/style/main.scss",
  S_VIEW_FILE_VARIABLE_CSS_PATH: "./views/assets/style/variable.css",
  S_VIEW_FILE_VARIABLE_SCSS_PATH: "./views/assets/style/variable.scss",
  S_VIEW_FILE_SCRIPT_JS_PATH: "./views/assets/script/script.js",
  S_VIEW_FILE_TAB_CONTROLLER_JS_PATH: "./views/assets/script/tabController.js",
  S_VIEW_FILE_ICON_PATH: "./views/assets/images/icon.png",
  S_VIEW_FILE_ICON_MENU_PATH: "./views/assets/images/icon_menu.png",
  S_VIEW_FILE_MANIFEST_PATH: "./manifest.json",
};

const S_CACHE_NAME = `cache-v${Date.now()}`;

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

self.addEventListener("install", (event) => {
  event.waitUntil(cacheAddAll(...Object.values(O_FILES_PATH), 'https://hothothot.dog/api/capteurs/exterieur'));
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    (async () => {
      const cache = await caches.open(S_CACHE_NAME);
      console.log(test);
      try {
        const fetchResponse = await fetch(event.request);

        if (fetchResponse) {
          cache.put(event.request, fetchResponse.clone());
          return fetchResponse;
        }
      } catch (e) {
        // The network failed
        const cachedResponse = await cache.match(event.request);
        if (cachedResponse) {
          return cachedResponse;
        }
      }
    })()
  );
});
