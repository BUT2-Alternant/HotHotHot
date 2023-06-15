import {RealtimeObserver} from "../Observer/RealtimeObserver.js";
import {DataService} from "./DataService.js";
import {TemperatureEntity} from "../Entity/TemperatureEntity.js";

export class NotificationService {
    #O_realtimeObserver;
    #O_dataService;

    constructor() {
        if (NotificationService._instance) {
            return NotificationService._instance;
        }
        this.#O_realtimeObserver = new RealtimeObserver();
        NotificationService._instance = this;
        this.#O_dataService = new DataService();
        return this;
    }

    listenRealtimeTemperature(callback) {
        this.#O_realtimeObserver.subscribe(callback);
        this.#O_realtimeObserver.notify({
            "interior": new TemperatureEntity(10, 0, "intérieur"),
            "exterior": new TemperatureEntity(34, 0, "extérieur")
        });
    }

    getNotificationHistory() {
        return this.#O_dataService.getNotificationHistory();
    }
}
