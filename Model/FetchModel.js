import {S_API_URL} from "../constants/UrlConstants";
import {TemperatureEntity} from "../entity/TemperatureEntity";

export class FetchModel {
    constructor() {
        if (!FetchModel._instance) {
            FetchModel._instance = this;
            return this;
        } else {
            return FetchModel._instance;
        }
    }

    getOutsideTemperature() {
        return fetch(S_API_URL + '/exterieur', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                const temperature = data?.capteurs?.[0];
                return temperature ? new TemperatureEntity(temperature.Valeur, temperature.Timestamp, 0) : throw new Error("Unable to fetch temperature from API");
            })
            .catch(error => {
                console.error(error);
                // TODO : handle error if API is unreachable with toast or notification
            });
    }

    getInsideTemperature() {
        return fetch(S_API_URL + '/interieur', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                const temperature = data?.capteurs?.[0];
                return temperature ? new TemperatureEntity(temperature.Valeur, temperature.Timestamp, 1) : throw new Error("Unable to fetch temperature from API");
            })
            .catch(error => {
                console.error(error);
                // TODO : handle error if API is unreachable with toast or notification
            });
    }
}