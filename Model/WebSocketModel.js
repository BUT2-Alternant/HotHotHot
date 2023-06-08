import {O_WEB_SOCKET_CONSTANTS} from "../constants/ConnectionConstants.js";

export class WebSocketModel {
    static #O_singleton = null;

    #O_websocket;

    constructor() {
        console.log(WebSocketModel.#O_singleton)

        if (WebSocketModel.#O_singleton === null) {
            WebSocketModel.#O_singleton = this;
            this.#O_websocket = new WebSocket(O_WEB_SOCKET_CONSTANTS.url)
        }

        console.log(this.#O_websocket);

        return WebSocketModel.#O_singleton;
    }

    reconnect () {
        //TODO: reconnect
        return true;
    }

    isConnected () {
        return this.#O_websocket.readyState === WebSocket.OPEN;
    }

    set onWebSocketMessage (callback) {
        this.#O_websocket.addEventListener("message", callback);
    }

    set onWebSocketClose (callback) {
        this.#O_websocket.addEventListener("close", callback);
    }
}