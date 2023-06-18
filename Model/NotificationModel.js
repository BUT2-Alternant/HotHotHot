import { S_CACHE_NAME } from "../Constants/CacheConstants.js";

export class NotificationModel {

    static #O_singleton = null;

    #S_CACHE_URL_NOTIFICATION = "notification/data";

    constructor() {
        if (NotificationModel.#O_singleton === null) {
            NotificationModel.#O_singleton = this;
        }

        return NotificationModel.#O_singleton;
    }

    async pushNotificationCache(message, timestamp) {
        const cache = await caches.open(S_CACHE_NAME);

        const response = new Response(JSON.stringify({ message, timestamp }));
        await cache.put(this.#S_CACHE_URL_NOTIFICATION, response);

        return response;
    }

    async getNotificationCache() {
        const cache = await caches.open(S_CACHE_NAME);
        const response = await cache.match(this.#S_CACHE_URL_NOTIFICATION);

        if (response) {
            const data = await response.json();
            return new NotificationEntity(data.message, data.timestamp);
        }

        return null;
    }

}