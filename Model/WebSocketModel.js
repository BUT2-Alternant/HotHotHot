import {O_WEB_SOCKET_CONSTANTS} from "../Constants/ConnectionConstants.js";

export class WebSocketModel {
    static #O_singleton = null;

    #O_websocket;

    constructor() {
        if (WebSocketModel.#O_singleton === null) {
            WebSocketModel.#O_singleton = this;
            this.#O_websocket = new WebSocket(O_WEB_SOCKET_CONSTANTS.url);
            this.#O_websocket.onopen = () => {
                this.#O_websocket.send("Hello");
            }
        }
        return WebSocketModel.#O_singleton;
    }

    reconnect () {
        this.#O_websocket = new WebSocket(O_WEB_SOCKET_CONSTANTS.url);
        return this.isConnected();
    }

    isConnected () {
        return this.#O_websocket.readyState === WebSocket.OPEN || this.#O_websocket.readyState === WebSocket.CONNECTING;
    }

    onWebSocketMessage (callback) {
        this.#O_websocket.addEventListener("message", callback);
    }

    onWebSocketClose (callback) {
        this.#O_websocket.addEventListener("close", callback);
        this.#O_websocket.addEventListener("error", callback);
    }
}