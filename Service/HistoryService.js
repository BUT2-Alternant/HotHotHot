import {HistoryObserver} from "../Observer/HistoryObserver.js";
import {DataService} from "./DataService.js";
import {HistoryModel} from "../Model/HistoryModel.js";

export class HistoryService {
    #O_historyObserver;
    #O_dataService;
    #O_historyModel;

    constructor() {
        if (HistoryService._instance) {
            return this;
        }
        HistoryService._instance = this;
        this.#O_historyObserver = new HistoryObserver();
        this.#O_dataService = new DataService();
        this.#O_historyModel = new HistoryModel();
        return this;
    }

    listenHistoryTemperature() {
        this.#O_historyObserver.subscribe((data) => {
            this.#O_historyModel.addTemperature(data[0]);
            this.#O_historyModel.addTemperature(data[1]);
        });
    }

    async getHistoryTemperature() {
        return await this.#O_dataService.getHistoryTemperature();
    }
}