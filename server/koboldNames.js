import { get } from "jquery";
function rollD2() {
    return Math.ceil(Math.random() * 2);
};
function rollD4() {
    return Math.ceil(Math.random() * 4);
};
function rollD100() {
    return Math.ceil(Math.random() * 100);
};

function getRandomArrayIndex(arrayLength) {
    return Math.floor(Math.random() * +arrayLength);
};

const consonants = [
    'b',
    'bl',
    'br',
    'c',
    'cl',
    'ch',
    'd',
    'dl',
    'dh',
    'f',
    'g',
    'gh',
    'h',
    'j',
    'jh',
    'k',
    'kh',
    'l',
    'm',
    'n',
    'p',
    'q',
    'r',
    'sl',
    't',
    'v',
    'w',
    'x',
    'y',
    'z',
]

const vowels = [
    'a',
    'e',
    'i',
    'o',
    'u',
    'y',
]

export function koboldName() {
    const nameLength = 1 + Math.ceil(Math.random());
    let name = '';
    for (let i = 0; i < nameLength; i++) {
        if (rollD100() <= 80) {
            name += consonants[getRandomArrayIndex(consonants.length)];
        }
        name += vowels[getRandomArrayIndex(vowels.length)];
    }
    if (rollD100() <= 50) {
        name += consonants[getRandomArrayIndex(consonants.length)];
    }
    name = name[0].toUpperCase() + name.slice(1);
    return name;

}