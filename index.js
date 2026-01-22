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

console.log(generateRandomArray(20, -10, 40));