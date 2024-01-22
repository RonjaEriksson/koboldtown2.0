import { check } from 'meteor/check';
import { TownCollection } from '../imports/api/TownCollection';
import {KoboldCollection } from '../imports/api/KoboldCollection'
import {ResourceCollection } from '../imports/api/ResourceCollection'
import { Random } from 'meteor/random'

function expeditionWait(wait) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('resolved');
    }, wait);
  });
}

async function doExpedition(expo) {
    if (!expo) {
        return;
    }
    const result = await expeditionWait(expo.wait);
    console.log(result);
    console.log("doneWaiting");

}

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

    let highRatio = 0.33;
    let midRatio = 0.33;
    let lowRatio = 0.33;
    if (!(totalAmount === 0)) {
        highRatio = values.highestValue.amount/totalAmount;
        midRatio = values.middleValue.amount/totalAmount;
        lowRatio = values.lowestValue.amount/totalAmount;
    }

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
                townName: "Kobold Ville",
                dragonName: "RymdensRegent",
                kobolds: [
                    {
                        name: names[getRandomArrayIndex(names.length)],
                        id: Random.id(),
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
                        id: Random.id(),
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
                        id: Random.id(),
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
                        color: "darkGrey",
                        resources: [
                            "food",
                            "stone",
                            "wood",
                        ],
                        production : {
                            food : 3, 
                            stone: 3,
                            wood: 3,
                        },
                        relevantSkills: [
                        "nature",
                        ],
                        spotsOpen: "unlimited",
                        },
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
                    id: Random.id(),
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

        let kobolds = TownCollection.find({ userId: thisUserId }, {projection: {kobolds: 1}}).fetch()[0]?.kobolds;
        if (!kobolds) {
            console.error("Found no town to add Kobold to.");
            return;
        }

        let motherKobold = kobolds.find( e => e.id === motherKoboldId);
        let fatherKobold = kobolds.find(e => e.id === fatherKoboldId);

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
            {userId: thisUserId},
            {$addToSet: {
                kobolds: {
                    name: names[getRandomArrayIndex(names.length)],
                    id: Random.id(),
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
    'increaseResource'(thisUserId) {
        check(thisUserId, String);

        const townResources = TownCollection.find({userId:thisUserId}, {projection: {resources: 1, jobs: 1}}).fetch()[0]?.resources;
        if(!townResources) {
            console.error("Found no town to update resources for.");
            return;
        }
        for (const resource of townResources) {
            resource.stockpile += resource.gain;
        }

        TownCollection.update({userId: thisUserId}, {$set:{resources: townResources}})
    },

    'assignJob'(thisUserId, koboldId, jobName, starting) {
        check(thisUserId, String);
        check(koboldId, String);
        check(jobName, String);
        check(starting, Boolean);

        const town = TownCollection.find({userId:thisUserId}, {projection: {resources: 1, jobs : 1, kobolds: 1}}).fetch()[0];

        const kobold = town?.kobolds?.find(e => e.id === koboldId);
        if (!kobold) {
            console.error("Did not find selected kobold.");
            return;
        }
        const job = town?.jobs?.find(e => e.name === jobName);
       if(!job) {
           console.error("Did not find chosen job.");
           return;
       }
       if (starting) {
            kobold.job = job.name;
        } else {
            kobold.job = null;
        }
        
        for(const resourceName of job.resources) {
            const resource = town.resources.find(e => e.name === resourceName);
            if(starting) {
                resource.gain += job.production[resourceName];
            } else {
                resource.gain -= job.production[resourceName];
            }
        }
        if(job.spotsOpen != "unlimited") {
            if(starting) {
                job.spotsOpen--;
            } else {
                job.spotsOpen++;
            }
        }

        TownCollection.update({userId: thisUserId}, {$set:{resources: town.resources, kobolds: town.kobolds }})
    },
    'addExpedition'(thisUserId, expeditionId) {
        check(thisUserId, String);
        check(expeditionId, String);
        

    },
    'handleExpeditions'(thisUserId) {
        check(thisUserId, String);
        const town = TownCollection.find({userId:thisUserId}, {projection: {expeditions: 1, kobolds: 1}}).fetch()[0];
        for(const expedition of Object.keys(town.expeditions || {})) {
            const expo = {
                wait: 1000,
            }
            doExpedition(expo);
            console.log("in loop");
        }
    },

});