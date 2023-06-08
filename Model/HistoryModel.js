import { HistoryEntity } from "../entity/HistoryEntity.js";

export class HistoryModel {
  static #O_singleton = null;

  #O_historyEntity;

  constructor() {
    if (HistoryModel.#O_singleton === null) {
      HistoryModel.#O_singleton = this;
      this.#O_historyEntity = new HistoryEntity();
    }

    return HistoryModel.#O_singleton;
  }

  getHistory() {
    return this.#O_historyEntity.temperatures;
  }

  addTemperature(O_temperature) {
    this.#O_historyEntity.addTemperature(O_temperature);
  }

  addTemperatures(O_temperatures) {
    O_temperatures.map((O_temperature) => {
      this.#O_historyEntity.addTemperature(O_temperature);
    });
  }

  pushHistoryCache() {
    //TODO: push history cache
  }

  getHistoryCache() {
    //TODO: get history cache
  }

  toString() {
    const S_string = null;

    this.#O_historyEntity.temperatures.map((O_temperature) => {
        S_string += O_temperature.toString();
    })

    return S_string;
  }
}
