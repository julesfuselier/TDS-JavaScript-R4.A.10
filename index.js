A_data = {
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
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomArray(size, min, max) {
    const arr = [];
    for (let i = 0; i < size; i++) {
        arr.push(getRandomIntInclusive(min, max));
    }
    return arr;
}

const A_randomArray = generateRandomArray(A_data["random-array-size"], A_data["interval-min"], A_data["interval-max"]);
console.log(A_randomArray);

// QUESTION 3
O_para2 = document.getElementById("tablist-1");
const O_table = document.getElementById("table-1");
const O_row = document.getElementById("row-1");
I_compteur = 0;
const B_IS_TEMPERATURE = true


function changeParagraph() {
    O_row.textContent = "";
    O_para2.textContent = "Temperature";
    O_para2.setAttribute("role", "alert");
    const I_value = A_randomArray[I_compteur];

    const O_NewCell = O_row.insertCell(0);
    O_NewCell.textContent = I_value;
    O_NewCell.ariaLive = "off";
    if (B_IS_TEMPERATURE ) {
        const O_NewCell2 = O_row.insertCell(1);
        O_NewCell2.textContent = A_data["type-of-temperature"];
    }


    const O_NewRow = O_table.insertRow()
    O_NewRow.insertCell(0).textContent = I_compteur;
    O_NewRow.insertCell(1).textContent = I_value;

    if ( I_value <= 0 ) {
        O_row.className = A_data["cold-color"];
        O_para2.textContent += A_data["cold-message"];
        O_NewCell.ariaLive = "assertive";
    }
    else if ( 1 <= I_value && I_value <= 20 ) {
        O_row.className = A_data["mild-color"];
        O_NewCell.ariaLive = "polite";
    }
    else if ( 21 <= I_value && I_value <= 30 ) {
        O_row.className = A_data["warm-color"];
        O_NewCell.ariaLive = "polite";
    }
    else {
        O_row.className = A_data["hot-color"];
        O_para2.textContent += A_data["hot-message"];
        O_NewCell.ariaLive = "assertive";
    }

    I_compteur ++;
    if (I_compteur === A_randomArray.length) {
        I_compteur = 0;
        O_table.innerHTML = "";
    }
}

let intervalId = setInterval(changeParagraph, A_data["interval-time"]);


class TabsManual {
    constructor(groupNode) {
        this.tablistNode = groupNode;

        this.tabs = [];

        this.firstTab = null;
        this.lastTab = null;

        this.tabs = Array.from(this.tablistNode.querySelectorAll('[role=tab]'));
        this.tabpanels = [];

        for (var i = 0; i < this.tabs.length; i += 1) {
            var tab = this.tabs[i];
            var tabpanel = document.getElementById(tab.getAttribute('aria-controls'));

            tab.tabIndex = -1;
            tab.setAttribute('aria-selected', 'false');
            this.tabpanels.push(tabpanel);

            tab.addEventListener('keydown', this.onKeydown.bind(this));
            tab.addEventListener('click', this.onClick.bind(this));

            if (!this.firstTab) {
                this.firstTab = tab;
            }
            this.lastTab = tab;
        }

        this.setSelectedTab(this.firstTab);
    }

    setSelectedTab(currentTab) {
        for (var i = 0; i < this.tabs.length; i += 1) {
            var tab = this.tabs[i];
            if (currentTab === tab) {
                tab.setAttribute('aria-selected', 'true');
                tab.removeAttribute('tabindex');
                this.tabpanels[i].classList.remove('is-hidden');
            } else {
                tab.setAttribute('aria-selected', 'false');
                tab.tabIndex = -1;
                this.tabpanels[i].classList.add('is-hidden');
            }
        }
    }

    moveFocusToTab(currentTab) {
        currentTab.focus();
    }

    moveFocusToPreviousTab(currentTab) {
        var index;

        if (currentTab === this.firstTab) {
            this.moveFocusToTab(this.lastTab);
        } else {
            index = this.tabs.indexOf(currentTab);
            this.moveFocusToTab(this.tabs[index - 1]);
        }
    }

    moveFocusToNextTab(currentTab) {
        var index;

        if (currentTab === this.lastTab) {
            this.moveFocusToTab(this.firstTab);
        } else {
            index = this.tabs.indexOf(currentTab);
            this.moveFocusToTab(this.tabs[index + 1]);
        }
    }

    /* EVENT HANDLERS */

    onKeydown(event) {
        var tgt = event.currentTarget,
            flag = false;

        switch (event.key) {
            case 'ArrowLeft':
                this.moveFocusToPreviousTab(tgt);
                flag = true;
                break;

            case 'ArrowRight':
                this.moveFocusToNextTab(tgt);
                flag = true;
                break;

            case 'Home':
                this.moveFocusToTab(this.firstTab);
                flag = true;
                break;

            case 'End':
                this.moveFocusToTab(this.lastTab);
                flag = true;
                break;

            default:
                break;
        }

        if (flag) {
            event.stopPropagation();
            event.preventDefault();
        }
    }

    // Since this example uses buttons for the tabs, the click onr also is activated
    // with the space and enter keys
    onClick(event) {
        this.setSelectedTab(event.currentTarget);
    }
}

// Initialize tablist

window.addEventListener('load', function () {
    var tablists = document.querySelectorAll('[role=tablist].manual');
    for (var i = 0; i < tablists.length; i++) {
        new TabsManual(tablists[i]);
    }
});

