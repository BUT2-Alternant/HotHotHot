import {Observable} from "./Observable";
import {DataService} from "../Service/DataService";

export class HistoryObserver extends Observable {
    constructor() {
        if (!HistoryObserver._instance) {
            super();
            const dataService = new DataService();
            dataService.historyObservable.subscribe(data => {
                this.notify(data);
            });
            HistoryObserver._instance = this;
            return this;
        } else {
            return HistoryObserver._instance;
        }
    }
}