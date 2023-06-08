import {RealtimeObserver} from "../Observer/RealtimeObserver";

export class RealtimeService {
    #O_realtimeObserver ;

    constructor() {
        if (RealtimeService._instance) {
            return RealtimeService._instance;
        }
        this.#O_realtimeObserver = new RealtimeObserver();
        RealtimeService._instance = this;
        return this;
    }

    listenRealtimeTemperature(callback) {
        this.#O_realtimeObserver.subscribe(callback);
    }
}