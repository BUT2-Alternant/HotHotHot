export class TemperatureEntity{
    #I_temperature = null;
    #I_timestamp = null;
    #I_temperatureLocation = null;


    constructor(I_temperature, I_timestamp, I_temperatureLocation) {
        this.#I_temperature = I_temperature;
        this.#I_timestamp = I_timestamp;
        this.#I_temperatureLocation = I_temperatureLocation;
    }

    get temperature() {
       return this.#I_temperature;
    }

    get timestamp() {
        return this.#I_timestamp;
    }

    get temperatureLocation() {
        return this.#I_temperatureLocation;
    }

    formattedTime() {
        const O_date = new Date(this.#I_timestamp * 1000);
        return O_date.toLocaleDateString() + " " + O_date.toLocaleTimeString();
    }
}