import { check } from 'meteor/check';
import { TownCollection } from '../imports/api/TownCollection';
import {KoboldCollection } from '../imports/api/KoboldCollection'

function getRandomArrayIndex(arrayLength) {
    return Math.floor(Math.random() * +arrayLength);
};

function generateRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

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
    "violet",
    "indigo",
    "lavender",
    "plum",
]


Meteor.methods({
    'initTown'(thisUserId) {
        check(thisUserId, String);

        let currentTownId = TownCollection.find({ userId: thisUserId }).fetch()[0]?._id;
        if (!currentTownId) {
            currentTownId = TownCollection.insert({
                userId: thisUserId,
                userName: "RymdensRegent"
            });
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
    'addWanderingKobold'(thisUserId) {
        check(thisUserId, String);

        let currentTownId = TownCollection.find({ userId: thisUserId }).fetch()[0]?._id;
        if (!currentTownId) {
            console.error("Found no town to add Kobold to");
            return;
        }
        KoboldCollection.insert({
            townId: currentTownId,
            name: names[getRandomArrayIndex(names.length)],
            color: generateRandomColor(),
        })
        
    },
});