import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random'
import { TownCollection } from '../imports/api/TownCollection';
import { KoboldCollection } from '/imports/api/KoboldCollection';
import { ExpeditionCollection } from '/imports/api/ExpeditionCollection';
import './townMethods';

Meteor.publish("town", function () {
    return TownCollection.find();
});
Meteor.publish("expedition", function () {
    return ExpeditionCollection.find();
});

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
];

expos = [
    {
        name: "Look for seeds.",
        color: "darkGreen",
        skills: [
            "nature", 
            "perception"
        ],
        visibilityCheck: {
        },
        skillchecks: [
            {
                skill: "nature",
                difficulty: 7,
            },
            {
                skill: "perception",
                difficulty: 5,
            },
        ],
        greatOutcomes: [
            {
                text: "Your kobolds found some seeds, and a shiny rock!.",
                reward: [ 
                    {
                        name: "seeds",
                        amount: 3,
                    },
                    {
                        name: "gem",
                        amount: 1,
                    },
                ],
            },
            {
                text: "Your kobolds found a lot of seeds.",
                reward: [
                    {
                        name: "seeds",
                        amount: 5,
                    },
                ]
            },
        ],
        goodOutcomes: [
            {
                text: "Your kobolds found a plant and harvested it's seeds.",
                reward: [ 
                    {
                        name: "seeds",
                        amount: 1
                    },
                ]
            },
            {
                text: "Your kobolds found several plants with seeds.",
                reward: [ 
                    {
                        name: "seeds",
                        amount: 3,
                    }
                ]

            },
        ],
        badOutcomes: [
            {
                text: "Your kobolds return empty handed.",
                reward: [],
            },
            {
                text: "Your kobolds find no seeds, but they find some fish.",
                reward: [ 
                    {
                        name: "food",
                        amount: 30,
                    }
                ],

            },
        ],
        length: 300000,
        cost: 
        [
            {
                name: "food",
                amount: 200,
            },
        ],

    },
];


Meteor.startup(() => {
    if (ExpeditionCollection.find().count() === 0) {
        for (const expo of expos) {
            ExpeditionCollection.insert(expo);
        }
    }
});
