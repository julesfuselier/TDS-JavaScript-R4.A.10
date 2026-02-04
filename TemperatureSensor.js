import Subject from "./Subject.js";

export default class TemperatureSensor extends Subject {
    constructor(config) {
        super();
        this.config = config;
        this.dataArray = [];
        this.currentIndex = 0;
        this.intervalId = null;
        this.initData();
    }

    initData() {
        const size = this.config["random-array-size"];
        const min = this.config["interval-min"];
        const max = this.config["interval-max"];

        for (let i = 0; i < size; i++) {
            this.dataArray.push(this.getRandomIntInclusive(min, max));
        }
    }

    getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    start() {
        this.intervalId = setInterval(() => this.tick(), this.config["interval-time"]);
    }

    tick() {
        const currentValue = this.dataArray[this.currentIndex];

        this.notify({
            value: currentValue,
            index: this.currentIndex,
            config: this.config
        });

        this.currentIndex++;
        if (this.currentIndex >= this.dataArray.length) {
            this.currentIndex = 0;
        }
    }
}