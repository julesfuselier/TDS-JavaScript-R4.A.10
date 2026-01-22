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
    "hot-message" : "Caliente ! Vamos a la playa, ho hoho hoho !!"
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

I_compteur = 0;

function changeParagraph() {
    O_para1.textContent = "";
    O_para2.textContent = "";
    O_para1.textContent += A_randomArray[I_compteur] + " ";

    if ( A_randomArray[I_compteur] <= 0 ) {
        O_para1.className = A_data["cold-color"];
        O_para2.textContent += A_data["cold-message"];
    }
    else if ( 1 <= A_randomArray[I_compteur] && A_randomArray[I_compteur] <= 20 ) {
        O_para1.className = A_data["mild-color"];
    }
    else if ( 21 <= A_randomArray[I_compteur] && A_randomArray[I_compteur] <= 30 ) {
        O_para1.className = A_data["warm-color"];
    }
    else {
        O_para1.className = A_data["hot-color"];
        O_para2.textContent += A_data["hot-message"];

    }

    I_compteur ++;
    if (I_compteur === A_randomArray.length) {
        I_compteur = 0;
    }
}

let intervalId = setInterval(changeParagraph, A_data["interval-time"]);



