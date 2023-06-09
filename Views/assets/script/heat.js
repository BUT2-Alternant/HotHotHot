import {RealtimeService} from "../../../Service/RealtimeService.js";
import {FetchService} from "../../../Service/FetchService.js";

const units = {
   Celcius: "°C",
   Fahrenheit: "°F"
};

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
}catch (e){}
const temperatureOutside = document.getElementById("temperatureOutside");
const temperatureInside = document.getElementById("temperatureInside");
const fieldOutside = document.getElementById("fieldOutside");
const fieldInside = document.getElementById("fieldInside");



let fecthtime = new FetchService();

fecthtime.installListenerFetchOutside(function (a){
   const value = a.temperature;
   fieldOutside.innerText = value + "°C";
   temperatureOutside.style.height = (value - config.minTemp) / (config.maxTemp - config.minTemp) * 100 + "%";
   temperatureOutside.dataset.value = value + units[config.unit];


});

fecthtime.installListenerFetchInside(function (a){
   const value = a.temperature;
   fieldInside.innerText = value + "°C";
   temperatureInside.style.height = (value - config.minTemp) / (config.maxTemp - config.minTemp) * 100 + "%";
   temperatureInside.dataset.value = value + units[config.unit];
});


function plotGraph(){
   const tempOutside = fecthtime.getOutsideTemperature();
   const tempInside = fecthtime.getInsideTemperature();
   // 20 dernières
   const lengthOutside = tempOutside.length-20;
   const lengthInside = tempInside.length-20;
   const lastOutside = tempOutside.slice(lengthOutside<0 ? 0 : lengthOutside);
   const lastInside = tempInside.slice(lengthInside<0 ? 0 : lengthInside);

   let xValues = []; //label en x
   let OValues = []; // outside en y
   let IValues = []; // inside en y

   for(let i=0;i<lastInside.length;i++){
      const timestamp = lastInside[i].timestamp;
      const datetime = new Date(timestamp*1000);
      xValues.push(datetime.toLocaleString());
      OValues.push(lastOutside[i].temperature);
      IValues.push(lastInside[i].temperature);
   }

   new Chart("temperatureChart", {
      type: "line",
      data: {
         labels: xValues,
         datasets: [{
            label: "Outside",
            data: OValues,
            borderColor: "red",
            fill: false
         },{
            label: "Inside",
            data: IValues,
            borderColor: "green",
            fill: false
         }]
      },
      options: {
         legend: {display: true}
      }
   });
}

setInterval(plotGraph, 5000);

