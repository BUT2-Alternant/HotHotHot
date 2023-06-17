import {NotificationService} from "../Service/NotificationService.js";
import {HistoryController} from "./HistoryController.js";

const service = new NotificationService();
service.listenRealtimeTemperature(notifier);
/**
 * Fonction qui permet d'envoyer une notification
 */
function notifier(temperatures) {
    let O_historyController = new HistoryController();
    console.log(O_historyController.#O_historyService.getHistoryTemperature());
    console.log(JSON.parse(temperatures.data));
    if (document.getElementById('notification') == null ){
        let notification_div = document.createElement('div');
        notification_div.setAttribute('id','notification');
        notification_div.style.position = 'absolute';
        document.getElementsByTagName('body')[0].innerHTML += notification_div.outerHTML;
    }
    const notification_div = document.getElementById('notification');
    console.log(temperatures);
    console.log(temperatures.interior.temperature);
    console.log(temperatures.exterior.temperature);
    let diff = temperatures.interior.temperature - temperatures.exterior.temperature;
    if(  true  ){
        let titre;
        let desc;
        let class_notif;

        console.log("ohigfcs");
        let temperature = temperatures.exterior.temperature;
        switch (true) {
            case (-10 <= temperature && temperature <= 0):
                titre = 'On se les pèles' ;
                desc = 'Fais attention ! Il fait '+ temperature + 'C°.';
                class_notif = 'froid';
                break;
            case (0 < temperature && temperature <= 20):
                titre = 'Un peu de fraicheur' ;
                desc = 'Pense à prendre une veste ! Il fait '+ temperature + 'C°.';
                class_notif = 'normal';
                break;
            case (20 < temperature && temperature <= 30):
                titre = 'Juste parfait' ;
                desc = 'Il fait '+ temperature + 'C°. Pas de stress !';
                class_notif = 'chaud';
                break;
            case (30 < temperature && temperature <= 40):
                titre = 'A la plage !' ;
                desc = 'Pense à bien d\'hydrater ! Il fait '+ temperature + 'C°.';
                class_notif = 'tres-chaud';
                break;
        }
        if (notification_div.classList.length > 0){
            notification_div.classList.remove(notification_div.classList);
        }
        notification_div.classList.add(class_notif);
        notification_div.innerHTML = '<p class="titre">'+titre+'</p><span class="description">'+desc+'</span>';
        notification_div.style.display = 'block';
        notification_div.addEventListener('click', closeNotification);
    }
}

function closeNotification() {
    document.getElementById('notification').style.display = 'none';
}

function min(temperatures){
    /*let condition  = History().temperatures.min > ;
    if (){

        return true
    }*/
}
