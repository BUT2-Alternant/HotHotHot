import {WebSocketModel} from "../Model/WebSocketModel.js";
import {Observable} from "../Observer/Observable.js";
import {O_CONNECTION_STATUS_CONSTANTS} from "../Constants/ConnectionConstants.js";
import {FetchModel} from "../Model/FetchModel.js";
import {HistoryModel} from "../Model/HistoryModel.js";
import {TemperatureEntity} from "../Entity/TemperatureEntity.js";
import {O_TEMPERATURE_LOCATION} from "../Constants/TemperatureConstants.js";

export class DataService {
    static #O_singleton = null;
    static #B_fetchIsRunning = false;
    static #B_firstMessageReceived = false;
    #O_websocketModel;
    #O_realtimeObservable;
    #O_historyObservable;
    #I_connectionStatus;
    #O_fetchModel;
    #O_historyModel;

    constructor() {
        if (DataService.#O_singleton === null) {
            DataService.#O_singleton = this;

            this.#O_websocketModel = new WebSocketModel();
            this.#I_connectionStatus = O_CONNECTION_STATUS_CONSTANTS.websocket;
            this.#O_fetchModel = new FetchModel();
            this.#O_historyModel = new HistoryModel();

            this.#O_realtimeObservable = new Observable();
            this.#O_historyObservable = new Observable();

            if (navigator.onLine) {
                this.#listenWebSocket();
                this.#firstFetchTemperature();
            } else {
                this.setConnectionStatus(O_CONNECTION_STATUS_CONSTANTS.offline)
            }
        }
        return DataService.#O_singleton;
    }

    setConnectionStatus(I_connectionStatus) {
        this.#I_connectionStatus = I_connectionStatus;
    }

    getConnectionStatus() {
        return this.#I_connectionStatus;
    }

    #listenWebSocket() {
        this.#O_websocketModel.onWebSocketMessage((event) => {
            DataService.#B_firstMessageReceived = true;
            const exterior = TemperatureEntity.fromJSON(JSON.parse(event.data).capteurs[0]);
            exterior.location = O_TEMPERATURE_LOCATION.O_EXTERIOR;
            const interior = TemperatureEntity.fromJSON(JSON.parse(event.data).capteurs[1]);
            interior.location = O_TEMPERATURE_LOCATION.O_INTERIOR;

            const temperatures = {
                "exterior": exterior,
                "interior": interior
            }
            this.#O_realtimeObservable.notify(temperatures);
            this.#O_historyObservable.notify(temperatures);
        });
        this.#O_websocketModel.onWebSocketClose((event) => {
            //console.log(" END: "+event);
            this.setConnectionStatus(O_CONNECTION_STATUS_CONSTANTS.fetch);
            const O_interval = setInterval(async () => {
                if (DataService.#B_fetchIsRunning) {
                    clearInterval(O_interval)
                }
                DataService.#B_fetchIsRunning = true;
                if (this.#O_websocketModel.reconnect()) {
                    this.#I_connectionStatus = O_CONNECTION_STATUS_CONSTANTS.websocket;
                    clearInterval(O_interval)
                } else {
                    const exterior = await this.#O_fetchModel.getOutsideTemperature();
                    const interior = await this.#O_fetchModel.getInsideTemperature();
                    const temperatures = {
                        "exterior": exterior,
                        "interior": interior
                    }
                    this.#O_realtimeObservable.notify(temperatures);
                    this.#O_historyObservable.notify(temperatures);
                }
                DataService.#B_fetchIsRunning = false;
            }, 5000);
        });
    }


    get realtimeObservable() {
        return this.#O_realtimeObservable;
    }

    get historyObservable() {
        return this.#O_historyObservable;
    }

    async getHistoryTemperature() {
        return await this.#O_historyModel.getHistory();
    }

    #firstFetchTemperature() {
        const O_interval_first_fetch = setInterval(async () => {
            if (DataService.#B_firstMessageReceived) {
                clearInterval(O_interval_first_fetch)
            } else {
                const exterior = await this.#O_fetchModel.getOutsideTemperature();
                const interior = await this.#O_fetchModel.getInsideTemperature();
                const temperatures = {
                    "exterior": exterior,
                    "interior": interior
                }
                this.#O_realtimeObservable.notify(temperatures);
                this.#O_historyObservable.notify(temperatures);
            }
        }, 2000);
    }
}