export class NotificationEntity {
    #S_message = '';
    #I_timestamp = 0;

    constructor(S_message, I_timestamp) {
        this.#S_message = S_message;
        this.#I_timestamp = I_timestamp;
    }

    get message () {
        return this.#S_message;
    }

    get timestamp () {
        return this.#I_timestamp;
    }

    formattedTime() {
        const O_date = new Date(this.#I_timestamp * 1000);
        return O_date.toLocaleDateString() + " " + O_date.toLocaleTimeString();
    }
}