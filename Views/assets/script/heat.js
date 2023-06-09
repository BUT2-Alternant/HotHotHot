import {RealtimeService} from "../../../Service/RealtimeService.js";
import {RealtimeController} from "../../../Controller/RealTimeController.js";
import RecommandationsManager from "./recommendation.js";
import {HistoryController} from "../../../Controller/HistoryController.js";
import {O_TEMPERATURE_LOCATION} from "../../../Constants/TemperatureConstants.js";
import {DataService} from "../../../Service/DataService.js";
import {O_CONNECTION_STATUS_CONSTANTS} from "../../../Constants/ConnectionConstants.js";

let currentTab = "";
localStorage.setItem("ongletCourant", currentTab);

let minTemp=[99,99];
let maxTemp=[0,0];

let realtimecontroller = new RealtimeController();
let historycontroller = new HistoryController();

historycontroller.listenHistory();

function messageWaitData(idSection) {
    let display = document.getElementById(idSection);
    let loadingDisplay = document.getElementById('chargement');

    if (loadingDisplay.style.display !== "none" && localStorage.getItem("ongletCourant")===idSection) {
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

const temperatureOutside = document.getElementById("temperatureOutside");
const temperatureInside = document.getElementById("temperatureInside");
const fieldOutside = document.getElementById("fieldOutside");
const fieldInside = document.getElementById("fieldInside");


realtimecontroller.getTemperature(function (data) {
    const tempExt = data.exterior;
    const tempOut = data.interior;

    const value = tempExt.temperature;
    fieldOutside.innerText = value + "°C";
    temperatureOutside.style.height = (value - config.minTemp) / (config.maxTemp - config.minTemp) * 100 + "%";
    temperatureOutside.dataset.value = value + "°C";

    RecommandationsManager.afficherRecommandations(value);
    afficherDonnee();
    messageWaitData("donnee");

    const value2 = tempOut.temperature;
    fieldInside.innerText = value2 + "°C";
    temperatureInside.style.height = (value2 - config.minTemp) / (config.maxTemp - config.minTemp) * 100 + "%";
    temperatureInside.dataset.value = value2 + "°C";
});

let dataService = new DataService();
if (dataService.getConnectionStatus() === O_CONNECTION_STATUS_CONSTANTS.offline) {
    document.getElementById("bouton-donnee").style.display = "none";
    let ongletDonnee = document.getElementById('donnee');
    let boutonDonnee = document.getElementById('bouton-donnee');

    let ongletHistorique = document.getElementById('historique');
    let boutonHistorique = document.getElementById('bouton-historique');
    afficherDonnee();
    // ongletDonnee.style.display = "none"
    // ongletDonnee.ariaDisabled = "true"
    // boutonDonnee.style.backgroundColor = "#D3E0EF"
    //
    // ongletHistorique.style.display = "block"
    // ongletHistorique.ariaDisabled = "false"
    // boutonHistorique.style.backgroundColor = "#97B2EC"
    //
    // localStorage.setItem("ongletCourant", "history");
}

function updateMinMax(){
    const minInt = document.getElementById("min_temperature_int_span");
    const maxInt = document.getElementById("max_temperature_int_span");
    const minExt = document.getElementById("min_temperature_ext_span");
    const maxExt = document.getElementById("max_temperature_ext_span");

    minInt.innerText = minTemp[1] + " °C";
    maxInt.innerText = maxTemp[1] + " °C";

    minExt.innerText = minTemp[0] + " °C";
    maxExt.innerText = maxTemp[0] + " °C";
}

async function plotGraph() {
    const temps = Array.from(await historycontroller.getHistoryTemperature());
    const lastElement = temps.slice(-40);
    let lastOutside=[];
    let lastInside=[];

    // 20 dernières
    for(let i=0; i<lastElement.length; i++){
        if(lastElement[i].temperatureLocation===O_TEMPERATURE_LOCATION.O_EXTERIOR){
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
            minTemp[0] = Math.min(minTemp[0],lastOutside[i].temperature);
            maxTemp[0] = Math.max(maxTemp[0],lastOutside[i].temperature);
        }

        if(i<lastInside.length) {
            IValues.push(lastInside[i].temperature);
            minTemp[1] = Math.min(minTemp[1],lastInside[i].temperature);
            maxTemp[1] = Math.max(maxTemp[1],lastInside[i].temperature);
        }
    }

    updateMinMax();

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



