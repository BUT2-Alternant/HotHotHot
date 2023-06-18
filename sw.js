const S_CACHE_NAME = "cache-hothothot";

const O_FILES_PATH = {
  S_CONSTANTS_FILE_CACHE_CONSTANTS_PATH: "./Constants/CacheConstants.js",
  S_CONSTANTS_FILE_CONNECTION_CONSTANTS_PATH: "./Constants/ConnectionConstants.js",
  S_CONSTANTS_FILE_TEMPERATURE_CONSTANTS_PATH: "./Constants/TemperatureConstants.js",

  S_CONTROLLER_FILE_HISTORY_CONTROLLER_PATH: "./Controller/HistoryController.js",
  S_CONTROLLER_FILE_REALTIME_CONTROLLER_PATH: "./Controller/RealTimeController.js",

  S_ENTITY_FILE_HISTORY_ENTITY_PATH: "./Entity/HistoryEntity.js",
  S_ENTITY_FILE_NOTIFICATION_ENTITY_PATH: "./Entity/NotificationEntity.js",
  S_ENTITY_FILE_TEMPERATURE_ENTITY_PATH: "./Entity/TemperatureEntity.js",

  S_MODEL_FILE_FETCH_MODEL_PATH: "./Model/FetchModel.js",
  S_MODEL_FILE_HISTORY_MODEL_PATH: "./Model/HistoryModel.js",
  S_MODEL_FILE_NOTIFICATION_MODEL_PATH: "./Model/NotificationModel.js",
  S_MODEL_FILE_WEB_SOCKET_MODEL_PATH: "./Model/WebSocketModel.js",

  S_OBSERVER_FILE_HISTORY_OBSERVER_PATH: "./Observer/HistoryObserver.js",
  S_OBSERVER_FILE_OBSERVABLE_PATH: "./Observer/Observable.js",
  S_OBSERVER_FILE_REALTIME_OBSERVER_PATH: "./Observer/RealtimeObserver.js",

  S_SERVICE_FILE_DATA_SERVICE_PATH: "./Service/DataService.js",
  S_SERVICE_FILE_HISTORY_SERVICE_PATH: "./Service/HistoryService.js",
  S_SERVICE_FILE_RealtimeService_PATH: "./Service/RealtimeService.js",

  S_VIEW_FILE_ASSETS_IMAGES_ALESSIO_PATH: "./Views/assets/images/Alessio.png",
  S_VIEW_FILE_ASSETS_IMAGES_BAR_GRAPH_PATH: "./Views/assets/images/bar-graph.png",
  S_VIEW_FILE_ASSETS_IMAGES_DOCUMENTATION_PATH: "./Views/assets/images/documentation.png",
  S_VIEW_FILE_ASSETS_IMAGES_ECHARPE_PATH: "./Views/assets/images/echarpe.png",
  S_VIEW_FILE_ASSETS_IMAGES_GANTS_PATH: "./Views/assets/images/gants.png",
  S_VIEW_FILE_ASSETS_IMAGES_GARDEN_PATH: "./Views/assets/images/garden.png",
  S_VIEW_FILE_ASSETS_IMAGES_GITHUB_SIGN_PATH: "./Views/assets/images/github-sign.png",
  S_VIEW_FILE_ASSETS_IMAGES_GUILLAUME_PATH: "./Views/assets/images/Guillaume.png",
  S_VIEW_FILE_ASSETS_IMAGES_HOT_PATH: "./Views/assets/images/hot.png",
  S_VIEW_FILE_ASSETS_IMAGES_HOUSE_PATH: "./Views/assets/images/house.png",
  S_VIEW_FILE_ASSETS_IMAGES_HOUSE2_PATH: "./Views/assets/images/house2.png",
  S_VIEW_FILE_ASSETS_IMAGES_HYDRATATION_PATH: "./Views/assets/images/hydratation.png",
  S_VIEW_FILE_ASSETS_IMAGES_ICON_PATH: "./Views/assets/images/icon.png",
  S_VIEW_FILE_ASSETS_IMAGES_ICON_MENU_PATH: "./Views/assets/images/icon_menu.png",
  S_VIEW_FILE_ASSETS_IMAGES_LUKE_PATH: "./Views/assets/images/Luke.png",
  S_VIEW_FILE_ASSETS_IMAGES_MAILLOTS_BAIN_PATH: "./Views/assets/images/maillots-de-bain.png",
  S_VIEW_FILE_ASSETS_IMAGES_MANTEAU_PATH: "./Views/assets/images/manteau.png",
  S_VIEW_FILE_ASSETS_IMAGES_MARION_PATH: "./Views/assets/images/Marion.png",
  S_VIEW_FILE_ASSETS_IMAGES_MARIUS_PATH: "./Views/assets/images/Marius.png",
  S_VIEW_FILE_ASSETS_IMAGES_MATTIAS_PATH: "./Views/assets/images/Mattias.png",
  S_VIEW_FILE_ASSETS_IMAGES_MELANIE_PATH: "./Views/assets/images/Mélanie.png",
  S_VIEW_FILE_ASSETS_IMAGES_PANTALON_PATH: "./Views/assets/images/pantalon.png",
  S_VIEW_FILE_ASSETS_IMAGES_SHORT_PATH: "./Views/assets/images/short.png",
  S_VIEW_FILE_ASSETS_IMAGES_T_SHIRT_PATH: "./Views/assets/images/t-shirt.png",
  S_VIEW_FILE_ASSETS_IMAGES_THIBAUT_PATH: "./Views/assets/images/Thibaut.png",
  S_VIEW_FILE_ASSETS_IMAGES_VESTE_PATH: "./Views/assets/images/veste.png",

  S_VIEW_FILE_ASSETS_SCRIPT_HEAT_PATH: "./Views/assets/script/heat.js",
  S_VIEW_FILE_ASSETS_SCRIPT_PWA_INSTALL_PATH: "./Views/assets/script/pwaInstall.js",
  S_VIEW_FILE_ASSETS_SCRIPT_RECO_PATH: "./Views/assets/script/recommendation.js",
  S_VIEW_FILE_ASSETS_SCRIPT_SIDE_PATH: "./Views/assets/script/sidebarController.js",
  S_VIEW_FILE_ASSETS_SCRIPT_TAB_CONTROLLER_PATH: "./Views/assets/script/tabController.js",

  S_VIEW_FILE_DOCUMENTATION_CSS_PATH: "./Views/assets/style/documentation.css",
  S_VIEW_FILE_DOCUMENTATION_SCSS_PATH: "./Views/assets/style/documentation.scss",
  S_VIEW_FILE_HOMEPAGE_CSS_PATH: "./Views/assets/style/homepage.css",
  S_VIEW_FILE_HOMEPAGE_SCSS_PATH: "./Views/assets/style/homepage.scss",
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
  const cache = await caches.open(S_CACHE_NAME);
  Array.from(S_src).map((S_file) => {
    cache.add(S_file).catch((e) => console.error(`[SW] ${S_file} failed to add to cache`, e));
  });
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
