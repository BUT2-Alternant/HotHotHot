import { HistoryEntity } from "../Entity/HistoryEntity.js";
const S_CACHE_NAME = "cache-hothothot";

export class HistoryModel {
  static #O_singleton = null;

  #O_historyEntity;
  #S_CACHE_URL_HISTORY = "history/data";

  constructor() {
    if (HistoryModel.#O_singleton === null) {
      HistoryModel.#O_singleton = this;
      this.#O_historyEntity = new HistoryEntity();
    }

    return HistoryModel.#O_singleton;
  }

  async getHistory() {
    await this.#loadHistory();
    return this.#O_historyEntity.temperatures;
  }

  addTemperature(O_temperature) {
    this.#O_historyEntity.addTemperature(O_temperature);
    await this.#pushHistoryCache();
  }

  async #pushHistoryCache() {
    const cache = await caches.open(S_CACHE_NAME);

    const response = new Response(JSON.stringify(this.#O_historyEntity));
    await cache.put(this.#S_CACHE_URL_HISTORY, response);

    return response;
  }

  async #loadHistory() {
    this.#O_historyEntity.clearValues();

    const cache = await caches.open(S_CACHE_NAME);
    const response = await cache.match(this.#S_CACHE_URL_HISTORY);

    if (response) {
      const data = await response.json();
      data.map((O_temperature) => {
        this.#O_historyEntity.addTemperature(new TemperatureEntity(O_temperature.temperature, O_temperature.timestamp, O_temperature.location));
      });
    }
  }

  toJSON() {
    const A_json = [];

    Array.from(this.getHistory().values()).map((O_elm) => {
      A_json.push(JSON.stringify(O_elm));
    });

    return A_json;
  }
}
