import {HistoryObserver} from "../Observer/HistoryObserver.js";
import {DataService} from "./DataService.js";
import {HistoryModel} from "../Model/HistoryModel.js";

export class HistoryService {
    #O_historyObserver;
    #O_dataService;

    constructor() {
        if (HistoryService._instance) {
            return this;
        }
        HistoryService._instance = this;
        this.#O_historyObserver = new HistoryObserver();
        this.#O_dataService = new DataService();
        return this;
    }

    listenHistoryTemperature() {
        this.#O_historyObserver.subscribe((data) => {
            this.#O_historyModel.addTemperature(data);
        });
    }

    getHistoryTemperature() {
        return this.#O_dataService.getHistoryTemperature();
    }
}