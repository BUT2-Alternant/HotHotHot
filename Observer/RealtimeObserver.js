import {Observable} from "./Observable";
import {DataService} from "../Service/DataService";

export class RealtimeObserver extends Observable {
    constructor() {
        if (!RealtimeObserver._instance) {
            super();
            const dataService = new DataService();
            dataService.realtimeObservable.subscribe(data => {
                this.notify(data);
            });
            RealtimeObserver._instance = this;
            return this;
        } else {
            return RealtimeObserver._instance;
        }
    }
}