import {RealtimeService} from "../../../Service/RealtimeService.js";
import {FetchService} from "../../../Service/FetchService.js";
import {RealtimeController} from "../../../Controller/RealTimeController.js";
import RecommandationsManager from "./recommendation.js";
import {HistoryController} from "../../../Controller/HistoryController.js";

let donneeChargee = false;
localStorage.setItem("donneeChargee", donneeChargee);

let realtimecontroller = new RealtimeController();
let historycontroller = new HistoryController();

historycontroller.listenHistory();

function messageWaitData(idSection) {
    let display = document.getElementById(idSection);
    let loadingDisplay = document.getElementById('chargement');

    if (loadingDisplay.style.display !== "none") {
        display.style.display = "block";
        display.ariaDisabled = "false";

        loadingDisplay.style.display = "none";
        loadingDisplay.ariaDisabled = "true";
    }
}

const config = {
    minTemp: -20,
    maxTemp: 50,
    unit: "Celcius"
};

try {
    let realtime = new RealtimeService();
    realtime.listenRealtimeTemperature(function (event) {
        console.log(event);
    });
} catch (e) {
}
const temperatureOutside = document.getElementById("temperatureOutside");
const temperatureInside = document.getElementById("temperatureInside");
const fieldOutside = document.getElementById("fieldOutside");
const fieldInside = document.getElementById("fieldInside");


let fecthtime = new FetchService();

realtimecontroller.getTemperature(function (data) {
    const tempExt = data[0];
    const tempOut = data[1];

    const value = tempExt.temperature;
    fieldOutside.innerText = value + "°C";
    temperatureOutside.style.height = (value - config.minTemp) / (config.maxTemp - config.minTemp) * 100 + "%";
    temperatureOutside.dataset.value = value + "°C";
    donneeChargee = true;
    localStorage.setItem("temperature", value);

    RecommandationsManager.afficherRecommandations(value);
    messageWaitData("donnee");

    const value2 = tempOut.temperature;
    fieldInside.innerText = value2 + "°C";
    temperatureInside.style.height = (value2 - config.minTemp) / (config.maxTemp - config.minTemp) * 100 + "%";
    temperatureInside.dataset.value = value2 + "°C";
});

/*fecthtime.installListenerFetchOutside(function (a) {
    const value = a.temperature;
    fieldOutside.innerText = value + "°C";
    temperatureOutside.style.height = (value - config.minTemp) / (config.maxTemp - config.minTemp) * 100 + "%";
    temperatureOutside.dataset.value = value + "°C";
    donneeChargee = true;
    localStorage.setItem("temperature", value);

    RecommandationsManager.afficherRecommandations(value);
    messageWaitData("donnee");
});

fecthtime.installListenerFetchInside(function (a) {
    const value = a.temperature;
    fieldInside.innerText = value + "°C";
    temperatureInside.style.height = (value - config.minTemp) / (config.maxTemp - config.minTemp) * 100 + "%";
    temperatureInside.dataset.value = value + "°C";
});*/


async function plotGraph() {
    const temps = Array.from(await historycontroller.getHistoryTemperature());
    const lastElement = temps.slice(-40);
    let lastOutside=[];
    let lastInside=[];

    // 20 dernières
    for(let i=0; i<lastElement.length; i++){
        if(lastElement[i].temperatureLocation==0){
            lastOutside.push(lastElement[i]);
        }else{
            lastInside.push(lastElement[i]);
        }
    }

    let xValues = []; //label en x
    let OValues = []; // outside en y
    let IValues = []; // inside en y

    for (let i = 0; i < lastInside.length; i++) {
        const timestamp = lastInside[i].timestamp;
        const datetime = new Date(timestamp * 1000);
        xValues.push(datetime.toLocaleString());
        if(i<lastOutside.length) {
            OValues.push(lastOutside[i].temperature);
        }

        if(i<lastInside.length) {
            IValues.push(lastInside[i].temperature);
        }
    }

    new Chart("temperatureChart", {
        type: "line",
        data: {
            labels: xValues,
            datasets: [{
                label: "Outside",
                data: OValues,
                borderColor: "#FFC277",
                fill: false
            }, {
                label: "Inside",
                data: IValues,
                borderColor: "#509CFF",
                fill: false
            }]
        },
        options: {
            legend: {display: true},
            animation: {duration: 0}
        }
    });
}

setInterval(plotGraph, 5000);



