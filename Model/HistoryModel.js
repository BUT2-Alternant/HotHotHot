import { HistoryEntity } from "../Entity/HistoryEntity.js";
const S_CACHE_NAME = "cache-hothothot";

export class HistoryModel {
  static #O_singleton = null;

  #O_historyEntity;
  #S_CACHE_URL_HISTORY;

  constructor() {
    if (HistoryModel.#O_singleton === null) {
      HistoryModel.#O_singleton = this;
      this.#O_historyEntity = new HistoryEntity();
      this.#S_CACHE_URL_HISTORY = "history/data";
    }

    return HistoryModel.#O_singleton;
  }

  getHistory() {
    return this.#O_historyEntity.temperatures;
  }

  addTemperature(O_temperature) {
    this.#O_historyEntity.addTemperature(O_temperature);
  }

  async pushHistoryCache() {
    const cache = await caches.open(S_CACHE_NAME);

    const response = new Response(JSON.stringify(this));
    await cache.put(this.#S_CACHE_URL_HISTORY, response);

    return response;
  }

  async getHistoryCache() {
    const cache = await caches.open(S_CACHE_NAME);
    const response = await cache.match(this.#S_CACHE_URL_HISTORY);

    if (response) {
      return response.json();
    }

    return null;
  }

  toJSON() {
    const json = [];

    Array.from(this.getHistory().values()).map((elm) => {
      json.push(JSON.stringify(elm));
    });

    return json;
  }
}
