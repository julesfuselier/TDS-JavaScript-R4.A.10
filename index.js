import {Tabs} from "./Tabs.js";
import TemperatureSensor from "./TemperatureSensor.js";
import { CurrentValueObserver, HistoryObserver, AlertObserver } from "./Observers.js";

const A_data = {
    "interval-min" : -10,
    "interval-max" : 40,
    "random-array-size" : 20,
    "interval-time" : 2000,
    "cold-color" : "blue",
    "cold-message" : "Brrrrrrr, un peu froid ce matin, mets ta cagoule !",
    "mild-color" : "green",
    "warm-color" : "orange",
    "hot-color" : "red",
    "hot-message" : "Caliente ! Vamos a la playa, ho hoho hoho !!",
    "type-of-temperature" : "°C"
};

const sensor = new TemperatureSensor(A_data);

const displayObs = new CurrentValueObserver();
const historyObs = new HistoryObserver();
const alertObs = new AlertObserver();

sensor.subscribe(displayObs);
sensor.subscribe(alertObs);
sensor.subscribe(historyObs);

sensor.start();

window.addEventListener('load', function () {
    var tablists = document.querySelectorAll('[role=tablist].manual');
    for (var i = 0; i < tablists.length; i++) {
        new Tabs(tablists[i]);
    }
});