export class HistoryEntity {
    #O_temperatures = new Set();

    constructor(...O_temperatures) {
        O_temperatures.map((O_temperature) => {
            this.#O_temperatures.add(O_temperature)
        })
    }

    get temperatures () {
        return this.#O_temperatures;
    }

    addTemperature (O_temperature) {
        this.#O_temperatures.add(O_temperature);
    }

    toString() {
        let S_temperatures = null;
        Array.from(this.#O_temperatures.values()).map((O_temperature) => {
            S_temperatures += `temperature : ${O_temperature}`;
        })
        return S_temperatures;
    }
}