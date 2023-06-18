import {NotificationService} from "../Service/NotificationService.js";
import {maxTemp,minTemp} from "../Views/assets/script/heat.js";

const service = new NotificationService();
service.listenRealtimeTemperature(notifier);
let firstTime = 1;
let debug = 1;
/**
 * Fonction qui permet d'envoyer une notification
 */
function notifier(temperatures) {
    if (!firstTime ){

            if (document.getElementById('notification') == null ){
                let notification_div = document.createElement('div');
                notification_div.setAttribute('id','notification');
                notification_div.style.position = 'absolute';
                document.getElementsByTagName('body')[0].innerHTML += notification_div.outerHTML;
            }
            const notification_div = document.getElementById('notification');

            let condition = (minTemp[0] > temperatures.exterior.temperature || maxTemp[0] < temperatures.exterior.temperature ) || (minTemp[1] > temperatures.interior.temperature || maxTemp[1] < temperatures.interior.temperature);
            if(  condition  ){
                let titre;
                let desc;
                let class_notif;
                let temperature;
                if ((minTemp[1] > temperatures.interior.temperature || maxTemp[1] < temperatures.interior.temperature)){
                    titre = 'Intérieur - ';
                    temperature = temperatures.interior.temperature;
                    if(minTemp[1] > temperatures.interior.temperature){
                        titre += 'ça se rafraîchie' ;
                        class_notif = 'froid';
                    }
                    if(maxTemp[1] < temperatures.interior.temperature){
                        titre += 'ça se réchauffe' ;
                        class_notif = 'chaud';
                    }
                }
                if ((minTemp[0] > temperatures.exterior.temperature || maxTemp[0] < temperatures.exterior.temperature )){
                    titre = 'Extérieur - ';
                    temperature = temperatures.exterior.temperature;
                    if(minTemp[0] > temperatures.exterior.temperature){
                        titre += 'ça se rafraîchie' ;
                        class_notif = 'froid';
                    }
                    if(maxTemp[0] < temperatures.exterior.temperature){
                        titre += 'ça se réchauffe' ;
                        class_notif = 'chaud';
                    }
                }

                desc = 'Fais attention ! Il fait '+ temperature + 'C°.';

                if (notification_div.classList.length > 0){
                    notification_div.classList.remove(notification_div.classList);
                }
                notification_div.classList.add(class_notif);
                notification_div.innerHTML = '<p class="titre">'+titre+'</p><span class="description">'+desc+'</span>';
                notification_div.addEventListener('click', closeNotification);
                if (debug){
                    debug = 0;
                }else {
                    notification_div.style.display = 'block';
                }
            }
    }else{
        firstTime=0;
    }

}

function closeNotification() {
    document.getElementById('notification').style.display = 'none';
}
