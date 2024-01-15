import { Meteor } from 'meteor/meteor';
import { KoboldCollection } from '/imports/api/KoboldCollection';

function getRandomArrayIndex(arrayLength) {
    return Math.floor(Math.random() * +arrayLength);
};

const names = [
    "Duv",
    "Rett",
    "Viks",
    "Surn",
    "Toli",
    "Snilgu",
    "Algu",
    "Rukro",
    "Abli",
    "Ilba",
    "Dom",
    "Ves",
    "Gak",
    "Hiks",
    "Ahru",
    "Modri",
    "Regna",
    "Okle",
    "Ugna",
    "Ehsi",
];

const colors = [
    "blue",
    "red",
    "green",
    "purple",
    "yellow",
    "gold",
    "silver",
    "copper",
    "brown",
    "white",
    "pink",
    "grey",
]


Meteor.startup(() => {
    if (KoboldCollection.find({ townId: 6 }).count() === 0) {
        for (let i = 0; i < 8; i++) {
            const name = names[getRandomArrayIndex(names.length)];
            const color = colors[getRandomArrayIndex(colors.length)];
            console.log(getRandomArrayIndex(names.length));
            console.log(name, color);
            KoboldCollection.insert({
                townId: 6,
                name,
                color,
            });
        }
    }
});
