const numChars = '0123456789';
const latinChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const cyrillicChars = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ';

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
    const chars = numChars + latinChars;
    
    return nextString(chars, length);
}
 
function nextValidString(length) {
    const chars = numChars + latinChars + cyrillicChars;

    let result = '';
    result += nextChar(numChars);
    result += nextChar(cyrillicChars);
    result += nextChar(latinChars);

    return result + nextString(chars, length - result.length);
}

function nextInt(max) {
    return Math.random() * max;
}
 
module.exports = {nextInt, nextAlphanumericString, nextValidString};