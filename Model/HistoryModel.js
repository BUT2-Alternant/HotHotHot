import { HistoryEntity } from "../Entity/HistoryEntity.js";
import {TemperatureEntity} from "../Entity/TemperatureEntity.js";
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

  async addTemperature(O_temperature) {
    this.#O_historyEntity.addTemperature(O_temperature);
    await this.#pushHistoryCache();
  }

  async #pushHistoryCache() {
    const cache = await caches.open(S_CACHE_NAME);

    let json = JSON.stringify(this.#O_historyEntity);
    console.log(json);
    const response = new Response(json);
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
        O_temperature=JSON.parse(O_temperature);
        this.#O_historyEntity.addTemperature(new TemperatureEntity(O_temperature.temperature, O_temperature.timestamp, O_temperature.temperatureLocation));
      });
    }
  }
}
