import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random'
import { TownCollection } from '../imports/api/TownCollection';
import { KoboldCollection } from '/imports/api/KoboldCollection';
import { ExpeditionCollection } from '/imports/api/ExpeditionCollection';
import { SkillCollection } from '/imports/api/SkillCollection';
import { ResourceCollection } from '/imports/api/ResourceCollection';
import './townMethods';

Meteor.publish("town", function () {
    return TownCollection.find();
});
Meteor.publish("expedition", function () {
    return ExpeditionCollection.find();
});
Meteor.publish("skill", function () {
    return SkillCollection.find();
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
        partySize: 2,
        rewards: [
            "seeds",
        ],
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
                text: "Your kobolds found some seeds, and a shiny rock!",
                reward: [ 
                    {
                        name: "seeds",
                        amount: 3,
                    },
                    {
                        name: "gems",
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
    {
        name: "Search for kobolds.",
        color: "grey",
        partySize: 2,
        rewards: [
            "new kobold",
        ],
        skills: [
            "perception",
            "persuasion",
        ],
        visibilityCheck: {
        },
        skillchecks: [
            {
                skill: "persuasion",
                difficulty: 20,
            },
            {
                skill: "perception",
                difficulty: 10,
            },
        ],
        greatOutcomes: [
            {
                text: "Your kobolds found a kobold willing to join your tribe!",
                reward: [],
                effect: [
                    {
                        name: 'Add Kobold',
                    }
                ]
                
            },
        ],
        goodOutcomes: [
            {
                text: "Your kobolds found a kobold that gifted them a gem.",
                reward: [
                    {
                        name: "gems",
                        amount: 1
                    },
                ]
            },
            {
                text: "Your kobolds found a kobold that taught your kobolds in the secrets of nature.",
                reward: [],
                effect: [
                    {
                        name: 'Add Skill',
                        skill: 'nature',
                        increase: 50,
                    },

                ]

            },
        ],
        badOutcomes: [
            {
                text: "Your kobolds did not find any other kobolds.",
                reward: [],
            },
            {
                text: "Your found no other kobolds, but they did find some edibile plants.",
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
    {
        name: "Mine for gems.",
        color: "white",
        partySize: 2,
        rewards: [
            "stone",
            "gems",
        ],
        skills: [
            "strength",
        ],
        visibilityCheck: {
        },
        skillchecks: [
            {
                skill: "strength",
                difficulty: 10,
            },
        ],
        greatOutcomes: [
            {
                text: "Your kobolds found a valuable gem!",
                reward: [
                    {
                        name: 'gems',
                        amount: 1,
                    }
                ],
            },
        ],
        goodOutcomes: [
            {
                text: "Your kobolds found some stone.",
                reward: [
                    {
                        name: "stone",
                        amount: 30,
                    },
                ]
            },
            {
                text: "Your kobolds found a lot of stone.",
                reward: [
                    {
                        name: 'stone',
                        amount: 300,
                    }
                ],

            },
        ],
        badOutcomes: [
            {
                text: "Your kobolds did not find a suitable spot to mine.",
                reward: [],
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

const skills = [
    {
        name: 'nature',
        base: 'mental',
        color: 'green',
    },
    {
        name: 'perception',
        base: 'mental',
        color: 'grey',
    },
    {
        name: 'persuasion',
        base: 'social',
        color: 'yellow',
    }
];

const resources = [
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
        gain: 0,
        color: "brown",
    },
    {
        name: "food",
        stockpile: 0,
        visible: true,
        gain: 0,
        color: "green",
    },
    {
        name: "seeds",
        stockpile: 0,
        visible: false,
        gain: 0,
        color: "chocolate",
    },
    {
        name: "gems",
        stockpile: 0,
        visible: false,
        gain: 0,
        color: "white",
    },
]


Meteor.startup(() => {
    //ExpeditionCollection.remove({}); //uncomment this when loading in the expedition collection from plaintext
    if (ExpeditionCollection.find().count() === 0) {
        for (const expo of expos) {
            ExpeditionCollection.insert(expo);
        }
    }

    //SkillCollection.remove({}); //uncomment this when loading in the skill collection from plaintext
    if (SkillCollection.find().count() === 0) {
        for (const skill of skills) {
            SkillCollection.insert(skill);
        }
    }

    //ResourceCollection.remove({}); //uncomment this when loading in the recource collection from plaintext
    if (ResourceCollection.find().count() === 0) {
        for (const resource of resources) {
            ResourceCollection.insert(resource);
        }
    }
    const townUserIds = TownCollection.find({}, { projection: { userId: 1 } }).fetch().map(e => e.userId);
    for (townUserId of townUserIds) {
        Meteor.call('handleExpeditions', townUserId);
    }
});
