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
    return {
        r,
        g,
        b,
    };
}

function generateStatsFromColor(color) {
    let values = {};
    for (const key of Object.keys(color || {})) {
        values.highestValue = values.highestValue.amount > color[key] ? value.highestValue : { value: key, amount: color[key] };
    }
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
            for (let i = 0; i < 6; i++) {
                const name = names[getRandomArrayIndex(names.length)];
                const color = generateRandomColor();
                KoboldCollection.insert({
                    townId: currentTownId,
                    name,
                    color: `rgb(${color.r}, ${color.g}, ${color.b})`,
                    r: color.r,
                    g: color.g,
                    b: color.b,
                });
            }
        }
    },
    'addWanderingKobold'(thisUserId) {
        check(thisUserId, String);

        let currentTownId = TownCollection.find({ userId: thisUserId }).fetch()[0]?._id;
        if (!currentTownId) {
            console.error("Found no town to add Kobold to.");
            return;
        }
        const color = generateRandomColor();
        KoboldCollection.insert({
            townId: currentTownId,
            name: names[getRandomArrayIndex(names.length)],
            color: `rgb(${color.r}, ${color.g}, ${color.b})`,
            r: color.r,
            g: color.g,
            b: color.b,
        })       
    },
    'mateKobolds'(thisUserId, motherKoboldId, fatherKoboldId) {
        check(thisUserId, String)
        check(motherKoboldId, String);
        check(fatherKoboldId, String);

        let currentTownId = TownCollection.find({ userId: thisUserId }).fetch()[0]?._id;
        if (!currentTownId) {
            console.error("Found no town to add Kobold to.");
            return;
        }

        let motherKobold = KoboldCollection.find(motherKoboldId).fetch()[0];
        let fatherKobold = KoboldCollection.find(fatherKoboldId).fetch()[0];

        if (!motherKobold || !fatherKobold) {
            console.error("Did not find both parent kobolds.")
        }

        rGenes = [motherKobold.r, fatherKobold.r];
        gGenes = [motherKobold.g, fatherKobold.g];
        bGenes = [motherKobold.b, fatherKobold.b];

        color = {
            r: rGenes[getRandomArrayIndex(rGenes.length)],
            g: gGenes[getRandomArrayIndex(gGenes.length)],
            b: bGenes[getRandomArrayIndex(bGenes.length)],
        }

        KoboldCollection.insert({
            townId: currentTownId,
            name: names[getRandomArrayIndex(names.length)],
            color: `rgb(${color.r}, ${color.g}, ${color.b})`,
            r: color.r,
            g: color.g,
            b: color.b,
        });

    },
});