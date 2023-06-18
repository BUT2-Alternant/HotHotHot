import {RealtimeService} from "../Service/RealtimeService.js";

export class RealtimeController {
    #O_realtimeService;
    constructor() {
        this.#O_realtimeService = new RealtimeService();
    }

    getTemperature(callback) {
        this.#O_realtimeService.listenRealtimeTemperature(callback);
    }
}