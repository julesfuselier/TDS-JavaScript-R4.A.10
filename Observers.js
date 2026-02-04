export class CurrentValueObserver {
    constructor() {
        this.rowElement = document.getElementById("row-1");
    }

    update(data) {
        this.rowElement.textContent = "";

        const cellValue = this.rowElement.insertCell(0);
        cellValue.textContent = data.value;
        cellValue.ariaLive = "off";

        const cellUnit = this.rowElement.insertCell(1);
        cellUnit.textContent = data.config["type-of-temperature"];
    }
}

export class HistoryObserver {
    constructor() {
        this.tableElement = document.getElementById("table-1");
    }

    update(data) {
        if (data.index === 0) {
            this.tableElement.innerHTML = "";
        }

        const newRow = this.tableElement.insertRow();
        newRow.insertCell(0).textContent = data.index;
        newRow.insertCell(1).textContent = data.value;
    }
}

export class AlertObserver {
    constructor() {
        this.titleElement = document.getElementById("tablist-1");
        this.rowElement = document.getElementById("row-1");
    }

    update(data) {
        const value = data.value;
        const config = data.config;

        // Reset du titre par défaut
        this.titleElement.textContent = "Temperatures";
        this.titleElement.setAttribute("role", "alert");

        let cssClass = "";

        if (value <= 0) {
            cssClass = config["cold-color"];
            this.titleElement.textContent += " " + config["cold-message"];
            this.setAriaLive("assertive");
        } else if (value <= 20) {
            cssClass = config["mild-color"];
            this.setAriaLive("polite");
        } else if (value <= 30) {
            cssClass = config["warm-color"];
            this.setAriaLive("polite");
        } else {
            cssClass = config["hot-color"];
            this.titleElement.textContent += " " + config["hot-message"];
            this.setAriaLive("assertive");
        }

        this.rowElement.className = cssClass;
    }

    setAriaLive(mode) {
        if(this.rowElement.cells[0]) {
            this.rowElement.cells[0].ariaLive = mode;
        }
    }
}