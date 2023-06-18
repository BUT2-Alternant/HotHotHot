import {HistoryService} from "../Service/HistoryService.js";

export class HistoryController {
    #O_historyService;
    constructor() {
        this.#O_historyService = new HistoryService();
    }

    listenHistory() {
        this.#O_historyService.listenHistoryTemperature();
    }

    async getHistoryTemperature(){
        return await this.#O_historyService.getHistoryTemperature();
    }
}