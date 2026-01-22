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

const A_randomArray = generateRandomArray(20, -10, 40);
console.log(A_randomArray);

// QUESTION 3

const O_para = document.getElementById("paragraph-1");

I_compteur = 0;

function changeParagraph() {
    O_para.textContent = "";
    O_para.textContent += A_randomArray[I_compteur] + " ";

    if ( A_randomArray[I_compteur] <= 0 ) {
        O_para.className = "blue";
    }
    else if ( 1 <= A_randomArray[I_compteur] && A_randomArray[I_compteur] <= 20 ) {
        O_para.className = "green";
    }
    else if ( 21 <= A_randomArray[I_compteur] && A_randomArray[I_compteur] <= 30 ) {
        O_para.className = "orange";
    }
    else {
        O_para.className = "red";
    }

    I_compteur ++;
    if (I_compteur === A_randomArray.length) {
        I_compteur = 0;
    }
}

let intervalId = setInterval(changeParagraph, 2000);



