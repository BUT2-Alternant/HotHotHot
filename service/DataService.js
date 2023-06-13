import {WebSocketModel} from "../Model/WebSocketModel.js";
import {Observable} from "../Observer/Observable.js";
import {O_CONNECTION_STATUS_CONSTANTS} from "../Constants/ConnectionConstants.js";
import {FetchModel} from "../Model/FetchModel.js";
import {HistoryModel} from "../Model/HistoryModel.js";
import {TemperatureEntity} from "../Entity/TemperatureEntity.js";

export class DataService {
    static #O_singleton = null;
    static #B_fetchIsRunning = false;
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

            this.#listenWebSocket();
        }

        return DataService.#O_singleton;
    }

    setConnectionStatus(I_connectionStatus) {
        this.#I_connectionStatus = I_connectionStatus;
    }

    #listenWebSocket() {
        this.#O_websocketModel.onWebSocketMessage((event) => {
            console.log(event.data);
            const data = TemperatureEntity.fromJSON(JSON.parse(event.data).capteurs[0]);
            const data2 = TemperatureEntity.fromJSON(JSON.parse(event.data).capteurs[1]);

            this.#O_realtimeObservable.notify([data,data2]);
            this.#O_historyObservable.notify([data,data2]);
        });
        this.#O_websocketModel.onWebSocketClose((event) => {
            console.log(" END: "+event);
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
}