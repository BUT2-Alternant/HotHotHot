export class HistoryController {
    #O_historyService;
    constructor() {
        this.#O_historyService = new HistoryService();
    }

    listenHistory() {
        this.#O_historyService.listenHistoryTemperature(history => {
            // TODO : update view with the history of temperature
        });
    }
}