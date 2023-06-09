import {WebSocketModel} from "../Model/WebSocketModel.js";
import {Observable} from "../Observer/Observable.js";
import {O_CONNECTION_STATUS_CONSTANTS} from "../Constants/ConnectionConstants.js";
import {FetchModel} from "../Model/FetchModel";

export class DataService {
    static #O_singleton = null;
    #O_websocketModel;
    #O_realtimeObservable;
    #O_historyObservable;
    #I_connectionStatus;
    #O_fetchModel;

    constructor() {
        if (DataService.#O_singleton === null) {
            DataService.#O_singleton = this;

            this.#O_websocketModel = new WebSocketModel();
            this.#I_connectionStatus = O_CONNECTION_STATUS_CONSTANTS.websocket;
            this.#O_fetchModel = new FetchModel();

            this.#O_realtimeObservable = new Observable();
            this.#O_historyObservable = new Observable();

            this.#listenWebSocket();
        }

        return DataService.#O_singleton;
    }

    #listenWebSocket () {
        this.#O_websocketModel.onWebSocketMessage(this.#onMessageWebSocketCallBack);
        this.#O_websocketModel.onWebSocketClose(this.#onCloseWebSocketCallBack);
    }

    #onMessageWebSocketCallBack (event) {
        console.log(event);
        this.#O_singleton.#O_realtimeObservable.notify(event);
        this.#O_singleton.#O_historyObservable.notify(event);
    }

    #onCloseWebSocketCallBack (event) {
        console.log(event);
        this.#I_connectionStatus = O_CONNECTION_STATUS_CONSTANTS.fetch;
        this.#fetchData();
    }

    #fetchData () {
        if (this.#O_websocketModel.reconnect()) {
            this.#I_connectionStatus = O_CONNECTION_STATUS_CONSTANTS.websocket;
        } else {
            return this.#asyncFetch()
        }
    }

    #asyncFetch(){
        this.exterior = this.#O_fetchModel.getOutsideTemperature();
        this.interior = this.#O_fetchModel.getInsideTemperature();
        const temperatures = {
            "exterior": this.exterior,
            "interior": this.interior
        }

        this.#O_realtimeObservable.notify(temperatures);
        setTimeout(this.#fetchData(), 30000);
        return temperatures;
    }

    get realtimeObservable () {
        return this.#O_realtimeObservable;
    }

    get historyObservable () {
        return this.#O_historyObservable;
    }
}