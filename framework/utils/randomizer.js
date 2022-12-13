const numChars = '0123456789';
const latinChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const cyrillicChars = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ';
const charPool = numChars + latinChars + cyrillicChars;

function nextChar(charPool) {
    return charPool.charAt(Math.floor(Math.random() * charPool.length));
}

function nextString(chars, length) {
    let result = '';

    for (let i = 0; i < length; i++) {
        result += nextChar(chars);
    }

    return result;
}

function nextAlphanumericString(length) {
    return nextString(charPool, length);
}

function nextInt(max) {
    return Math.random() * max;
}
 
module.exports = {nextInt, nextAlphanumericString};