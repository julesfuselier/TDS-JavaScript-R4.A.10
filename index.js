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

const O_para1 = document.getElementById("paragraph-1");
const O_section = document.getElementById("section-1");
const O_para2 = O_section.appendChild(document.createElement("paragraph-2"));
const O_table = document.getElementById("table-1");
const O_row = document.getElementById("row-1");
I_compteur = 0;
const B_IS_TEMPERATURE = true


function changeParagraph() {
    // O_para1.textContent = "";
    O_row.textContent = "";
    O_para2.textContent = "";
    const I_value = A_randomArray[I_compteur];

    const O_NewCell = O_row.insertCell(0);
    O_NewCell.textContent = I_value;
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
    }
    else if ( 1 <= I_value && I_value <= 20 ) {
        O_row.className = A_data["mild-color"];
    }
    else if ( 21 <= I_value && I_value <= 30 ) {
        O_row.className = A_data["warm-color"];
    }
    else {
        O_row.className = A_data["hot-color"];
        O_para2.textContent += A_data["hot-message"];

    }

    I_compteur ++;
    if (I_compteur === A_randomArray.length) {
        I_compteur = 0;
        O_table.innerHTML = "";
    }
}

let intervalId = setInterval(changeParagraph, A_data["interval-time"]);



