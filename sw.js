const S_CACHE_NAME = "cache-hothothot";

const O_FILES_PATH = {
  S_CONSTANTS_FILE_CONNECTION_CONSTANTS_PATH: "./Constants/ConnectionConstants.js",
  S_CONSTANTS_FILE_TEMPERATURE_CONSTANTS_PATH: "./Constants/TemperatureConstants.js",
  S_CONSTATNS_FILE_CACHE_CONSTANTS_PATH: "./Constants/CacheConstants.js",
  S_CONTROLLER_FILE_HISTORY_CONTROLLER_PATH: "./Controller/HistoryController.js",
  S_CONTROLLER_FILE_REALTIME_CONTROLLER_PATH: "./Controller/RealtimeController.js",
  S_ENTITY_FILE_HISTORY_ENTITY_PATH: "./Entity/HistoryEntity.js",
  S_ENTITY_FILE_NOTIFICATION_ENTITY_PATH: "./Entity/NotificationEntity.js",
  S_ENTITY_FILE_TEMPERATURE_ENTITY_PATH: "./Entity/TemperatureEntity.js",
  S_MODEL_FILE_HISTORY_MODEL_PATH: "./Model/HistoryModel.js",
  S_MODEL_FILE_NOTIFICATION_MODEL_PATH: "./Model/NotificationModel.js",
  S_MODEL_FILE_WEB_SOCKET_MODEL_PATH: "./Model/WebSocketModel.js",
  S_OBSERVER_FILE_HISTORY_OBSERVER_PATH: "./Observer/HistoryObserver.js",
  S_OBSERVER_FILE_OBSERVABLE_PATH: "./Observer/Observable.js",
  S_OBSERVER_FILE_REALTIME_OBSERVER_PATH: "./Observer/RealtimeObserver.js",
  S_SERVICE_FILE_DATA_SERVICE_PATH: "./Service/DataService.js",
  S_SERVICE_FILE_HISTORY_SERVICE_PATH: "./Service/HistoryService.js",
  S_SERVICE_FILE_RealtimeService_PATH: "./Service/RealtimeService.js",
  S_VIEW_FILE_HOMEPAGE_PATH: "./Views/html/homepage.html",
  S_VIEW_FILE_DOCUMENTATION_PATH: "./Views/html/Documentation.html",
  S_VIEW_FILE_HOMEPAGE_CSS_PATH: "./Views/assets/style/homepage.css",
  S_VIEW_FILE_HOMEPAGE_SCSS_PATH: "./Views/assets/style/homepage.scss",
  S_VIEW_FILE_DOCUMENTATION_CSS_PATH: "./Views/assets/style/documentation.css",
  S_VIEW_FILE_DOCUMENTATION_SCSS_PATH: "./Views/assets/style/documentation.scss",
  S_VIEW_FILE_MAIN_SCSS_PATH: "./Views/assets/style/main.scss",
  S_VIEW_FILE_VARIABLE_CSS_PATH: "./Views/assets/style/variable.css",
  S_VIEW_FILE_VARIABLE_SCSS_PATH: "./Views/assets/style/variable.scss",
  S_VIEW_FILE_TAB_CONTROLLER_JS_PATH: "./Views/assets/script/tabController.js",
  S_VIEW_FILE_ICON_PATH: "./Views/assets/images/icon.png",
  S_VIEW_FILE_ICON_MENU_PATH: "./Views/assets/images/icon_menu.png",
  S_VIEW_FILE_MANIFEST_PATH: "./manifest.json",
};

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
          await cache.put(event.request, fetchResponse.clone());
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
