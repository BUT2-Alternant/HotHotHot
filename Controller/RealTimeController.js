export class RealtimeController {
    #O_realtimeService;
    constructor() {
        this.#O_realtimeService = new RealtimeService();
    }

    getTemperature() {
        this.#O_realtimeService.listenRealtimeTemperature(newTemperature => {
            // TODO : update view with newTemperature
        });
    }
}