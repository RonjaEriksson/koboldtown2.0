import { check } from 'meteor/check';
import { TownCollection } from '../imports/api/TownCollection';
import {KoboldCollection } from '../imports/api/KoboldCollection'
import {ResourceCollection } from '../imports/api/ResourceCollection'

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

    const statMap = {
        'r': "physical",
        'g': "social",
        'b': "mental",
    };

    const colorValues = Object.keys(color || {});

    colorValues.sort((a,b) => color[b] - color[a]);

    const values = {
        highestValue: { value: colorValues[0], amount: color[colorValues[0]] },
        middleValue: { value: colorValues[1], amount: color[colorValues[1]] },
        lowestValue: { value: colorValues[2], amount: color[colorValues[2]] },
        };

    const totalAmount = values.highestValue.amount + values.middleValue.amount + values.lowestValue.amount;

    const highRatio = values.highestValue.amount/totalAmount;
    const midRatio = values.middleValue.amount/totalAmount;
    const lowRatio = values.lowestValue.amount/totalAmount;

    const stats = {};

    let highestStat = Math.ceil(highRatio*5);
    let middleStat = Math.round(midRatio*5);
    let lowestStat = Math.round(lowRatio*5);

    stats[statMap[values.highestValue.value]] = highestStat;
    stats[statMap[values.middleValue.value]] = middleStat;
    stats[statMap[values.lowestValue.value]] = lowestStat;

    return stats;
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

            const redStats = generateStatsFromColor(
                {
                    r: 255,
                    g: 0,
                    b: 0,
                });
            
            const greenStats = generateStatsFromColor(
                {
                    r: 0,
                    g: 255,
                    b: 0,
                });

            const blueStats = generateStatsFromColor(
                {
                    r: 0,
                    g: 0,
                    b: 255,
                });

            const town = {
                userId: thisUserId,
                userName: "RymdensRegent",
                kobolds: [
                    {
                        name: names[getRandomArrayIndex(names.length)],
                        color: `rgb(${255}, ${0}, ${0})`,
                        r: 255,
                        g: 0,
                        b: 0,
                        physical: redStats.physical,
                        mental: redStats.mental,
                        social: redStats.social,
                    },
                    {
                        name: names[getRandomArrayIndex(names.length)],
                        color: `rgb(${0}, ${255}, ${0})`,
                        r: 0,
                        g: 255,
                        b: 0,
                        physical: greenStats.physical,
                        mental: greenStats.mental,
                        social: greenStats.social,
                    },
                    {
                        name: names[getRandomArrayIndex(names.length)],
                        color: `rgb(${0}, ${0}, ${255})`,
                        r: 0,
                        g: 0,
                        b: 255,
                        physical: blueStats.physical,
                        mental: blueStats.mental,
                        social: blueStats.social,
                    },

                ],
                resources: [
                    {
                        name: "stone",
                        stockpile: 0,
                        visible: true,
                        gain: 0,
                        color: "gray",
                    },
                    {
                        name: "wood",
                        stockpile: 0,
                        visible: true,
                        gain:0,
                        color: "brown",
                    },
                    {
                        name: "food",
                        stockpile: 0,
                        visible: true,
                        gain: 0,
                        color: "green",
                    },
                ],
                jobs : [
                       {
                        name: "scavenge",
                        produces: [
                            "food",
                            "stone",
                            "wood",
                        ],
                        highProduction: {
                            food: 3,
                            stone: 4,
                            wood: 4,
                        },
                        lowProduction: {
                            food: 0,
                            stone: 0,
                            wood: 0,
                        },
                        numberOfJobs: "unlimited",
                        }
                ]
            }
            TownCollection.insert(town);
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
        const stats = generateStatsFromColor(color)
        TownCollection.update(
            {townId: currentTownId},
            {$addToSet: {
                kobolds: {
                    name: names[getRandomArrayIndex(names.length)],
                    color: `rgb(${color.r}, ${color.g}, ${color.b})`,
                    r: color.r,
                    g: color.g,
                    b: color.b,
                    physical: stats.physical,
                    mental: stats.mental,
                    social: stats.social,
                    }
                }
            }
        );     
    },
    'mateKobolds'(thisUserId, motherKoboldId, fatherKoboldId) {
        check(thisUserId, String)
        check(motherKoboldId, String);
        check(fatherKoboldId, String);

        const mutationTreshhold = 15;

        let currentTownId = TownCollection.find({ userId: thisUserId }).fetch()[0]?._id;
        if (!currentTownId) {
            console.error("Found no town to add Kobold to.");
            return;
        }

        let motherKobold = KoboldCollection.find(motherKoboldId).fetch()[0];
        let fatherKobold = KoboldCollection.find(fatherKoboldId).fetch()[0];

        if (!motherKobold || !fatherKobold) {
            console.error("Did not find both parent kobolds.")
            return;
        }

        rGenes = [motherKobold.r, fatherKobold.r, Math.round((motherKobold.r+fatherKobold.r)/2)];
        gGenes = [motherKobold.g, fatherKobold.g,Math.round((motherKobold.g+fatherKobold.g)/2)];
        bGenes = [motherKobold.b, fatherKobold.b, Math.round((motherKobold.b+fatherKobold.b)/2)];

        color = {
            r: rGenes[getRandomArrayIndex(rGenes.length)],
            g: gGenes[getRandomArrayIndex(gGenes.length)],
            b: bGenes[getRandomArrayIndex(bGenes.length)],
        }

        const mutationRoll = Math.ceil(20*Math.random());

        if (mutationRoll >= mutationTreshhold) {
            const mutatingColor = Object.keys(color)[getRandomArrayIndex(Object.keys(color).length)];
            color[mutatingColor] = Math.round((Math.floor(Math.random()*256) + color[mutatingColor])/2);
        }

        const stats = generateStatsFromColor(color);

        TownCollection.update(
            {townId: currentTownId},
            {$addToSet: {
                kobolds: {
                    name: names[getRandomArrayIndex(names.length)],
                    color: `rgb(${color.r}, ${color.g}, ${color.b})`,
                    r: color.r,
                    g: color.g,
                    b: color.b,
                    physical: stats.physical,
                    mental: stats.mental,
                    social: stats.social,
                    }
                }
            }
        );

    },
    'save'(thisUserId) {
        let currentTownId = TownCollection.find({ userId: thisUserId }).fetch()[0]?._id;
        if (!currentTownId) {
            console.error("Found no town to progress time in.");
            return;
        }
        check(thisUserId,String);
        const townResources = ResourceCollection.find({townId: currentTownId}).fetch()[0];
        console.log(townResources);
    },
});