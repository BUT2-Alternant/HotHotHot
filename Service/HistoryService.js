import {HistoryObserver} from "../Observer/HistoryObserver";
import {DataService} from "../Service/DataService";

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

    listenHistoryTemperature(callback) {
        this.#O_historyObserver.subscribe(callback);
    }

    getHistoryTemperature() {
        return this.#O_dataService.getHistoryTemperature();
    }
}