import { check } from 'meteor/check';
import { TownCollection } from './TownCollection';
import {KoboldCollection } from './KoboldCollection'

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
    "sienna",
    "brown",
    "white",
    "pink",
    "grey",
    "navy",
    "olive",
    "salmon",
    "tan",
    "teal",
    "cyan",
    "magenta",
    "azure",
    "aqua",
]


Meteor.methods({
    'initTown'(userId) {
        check(userId, String);

        let currentTownId = TownCollection.findOne(userId)?._id;
        if (!currentTownId || true) {
            currentTownId = TownCollection.insert({
                userId,
                userName: "RymdensRegent"
            })
        }
        if (KoboldCollection.find({ townId: currentTownId }).count() === 0) {
            for (let i = 0; i < 8; i++) {
                const name = names[getRandomArrayIndex(names.length)];
                const color = colors[getRandomArrayIndex(colors.length)];
                KoboldCollection.insert({
                    townId: currentTownId,
                    name,
                    color,
                });
            }
        }
    },
});