export const expos = [
    {
        name: "Forage for food.",
        color: "darkGreen",
        partySize: 1,
        description: "Go outside and look for diffrent kinds of food.",
        skills: [
            "nature",
            "perception",
            "survival"
        ],
        requirements: {},
        startTexts: [
            "Your kobolds discuss what plants they might want to collect seeds from before heading out.",
            "Your kobolds walk away from the den."
        ],
        skillchecks: [
            {
                skill: "nature",
                difficulty: 7,
            },
            {
                skill: "survival",
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
                        amount: 30,
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
                        amount: 50,
                    },
                ]
            },
            {
                text: "Your kobolds found some fruits.",
                reward: [
                    {
                        name: "fruits",
                        amount: 10,
                    },
                ]
            },
            {
                text: "Your kobolds found a lot of tasty nuts.",
                reward: [
                    {
                        name: "nuts",
                        amount: 50,
                    },
                ]
            },
            {
                text: "Your kobolds found a patch of raspberries.",
                reward: [
                    {
                        name: "berries",
                        amount: 50,
                    },
                ]
            },
            {
                text: "Your kobolds found a lot of diffrent kinds of food.",
                reward: [
                    {
                        name: "food",
                        amount: 10000,
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
                        amount: 10
                    },
                ]
            },
            {
                text: "Your kobolds found some blueberries.",
                reward: [
                    {
                        name: "berries",
                        amount: 10
                    },
                ]
            },
            {
                text: "Your kobolds found an apple tree.",
                reward: [
                    {
                        name: "fruits",
                        amount: 10
                    },
                ]
            },
            {
                text: "Your kobolds found hazelnuts on the ground.",
                reward: [
                    {
                        name: "nuts",
                        amount: 10
                    },
                ]
            },
            {
                text: "Your kobolds found wild carrots.",
                reward: [
                    {
                        name: "food",
                        amount: 1000,
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
                text: "Your kobolds find no food, but their foraging skills improve.",
                reward: [],
                effect: [
                    {
                        name: 'Add skill',
                        skill: 'nature',
                        increase: 1000,
                    },
                    {
                        name: 'Add skill',
                        skill: 'survival',
                        increase: 1000,
                    },
                    {
                        name: 'Add skill',
                        skill: 'perception',
                        increase: 1000,
                    },

                ]

            },
        ],
        length: 30000,
        costs:
            [
                {
                    name: "food",
                    amount: 200,
                },
            ],

    },
    //------------------------------------------------------------------------------
    {
        name: "Search for kobolds.",
        color: "grey",
        partySize: 2,
        description: "Try and find other kobolds to interact with.",
        skills: [
            "perception",
            "persuasion",
        ],
        visibilityCheck: {
        },
        startTexts: [
            "Your kobolds start walking, discussing what kobolds they meet out there.",
            "'I hope any kobolds we meet are friendly' one of the kobolds says to the other as they start walking.",
        ],
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
                        name: 'Add kobold',
                    }
                ]

            },
            {
                text: "Your kobolds found a kobold that taught them a lot of things!",
                reward: [],
                effect: [
                    {
                        name: 'Add skill',
                        skill: 'nature',
                        increase: 1000,
                    },
                    {
                        name: 'Add skill',
                        skill: 'arcana',
                        increase: 1000,
                    },
                    {
                        name: 'Add skill',
                        skill: 'healing',
                        increase: 1000,
                    },
                    {
                        name: 'Add skill',
                        skill: 'animal handling',
                        increase: 1000,
                    },

                ]

            },
        ],
        goodOutcomes: [
            {
                text: "Your kobolds found a kobold to trade with.",
                reward: [
                    {
                        name: "gems",
                        amount: 1000,
                    },
                    {
                        name: "metal",
                        amount: 1000,
                    },
                    {
                        name: "ink",
                        amount: 1000,
                    },
                    {
                        name: "books",
                        amount: 100,
                    },
                ]
            },
            {
                text: "Your kobolds happened upon a kobold market and got some deals.",
                reward: [
                    {
                        name: "rations",
                        amount: 1000,
                    },
                    {
                        name: "glass",
                        amount: 1000,
                    },
                    {
                        name: "maps",
                        amount: 100,
                    },
                    {
                        name: "books",
                        amount: 100,
                    },
                ]
            },
            {
                text: "Your kobolds found a kobold that taught your kobolds in the secrets of nature.",
                reward: [],
                effect: [
                    {
                        name: 'Add skill',
                        skill: 'nature',
                        increase: 2000,
                    },

                ]

            },
            {
                text: "Your kobolds found a group of kobolds and had a lively discussion.",
                reward: [],
                effect: [
                    {
                        name: 'Add skill',
                        skill: 'persuasion',
                        increase: 1000,
                    },

                ]

            }, {
                text: "Your kobolds discussed magic with a mysterious blue kobold.",
                reward: [],
                effect: [
                    {
                        name: 'Add skill',
                        skill: 'arcana',
                        increase: 1000,
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
                text: "Your kobolds had a tense meeting with a group of kobolds.",
                reward: [],
                effect: [
                    {
                        name: 'Add skill',
                        skill: 'persuasion',
                        increase: 1000,
                    },
                    {
                        name: 'Add skill',
                        skill: 'intimidation',
                        increase: 1000,
                    }
                ]
            },
            {
                text: "Your kobolds only found a lizard, but they had a great time befriending it.",
                reward: [],
                effect: [
                    {
                        name: 'Add skill',
                        skill: 'animal handling',
                        increase: 1000,
                    },
                ]
            },
            {
                text: "Your party found no other kobolds, but they did find some edibile plants.",
                reward: [
                    {
                        name: "food",
                        amount: 3000,
                    }
                ],

            },
        ],
        length: 300000,
        costs:
            [
                {
                    name: "gourmet rations",
                    amount: 2000,
                },
                {
                    name: "jewlery",
                    amount: 2000,
                },
            ],

    },
    //--------------------------------------------------------------------------------
    {
        name: "Mine outside.",
        color: "white",
        partySize: 1,
        description: "Go outside and mine.",
        skills: [
            "strength",
        ],
        visibilityCheck: {
        },
        startTexts: [
            "Your kobolds set off, carrying pickaxes.",
            "Your kobolds wave goodbye as they walk out of the den."
        ],
        skillchecks: [
            {
                skill: "strength",
                difficulty: 10,
            },
            {
                skill: "mining",
                difficulty: 5,
            }
        ],
        greatOutcomes: [
            {
                text: "Your kobolds found some valueable gems!",
                reward: [
                    {
                        name: 'gems',
                        amount: 1000,
                    }
                ],
                effect: [
                    {
                        name: 'Add skill',
                        skill: 'mining',
                        increase: 1000,
                    },
                ]
            },
            {
                text: "Your kobolds found a vein of pure metal!",
                reward: [
                    {
                        name: 'metal',
                        amount: 1000,
                    }
                ],
                effect: [
                    {
                        name: 'Add skill',
                        skill: 'mining',
                        increase: 1000,
                    },
                ]
            },
            {
                text: "Your kobolds found a lot of sand!",
                reward: [
                    {
                        name: 'sand',
                        amount: 1000,
                    }
                ],
                effect: [
                    {
                        name: 'Add skill',
                        skill: 'mining',
                        increase: 1000,
                    },
                ]
            },
        ],
        goodOutcomes: [
            {
                text: "Your kobolds mined some stone.",
                reward: [
                    {
                        name: "stone",
                        amount: 3000,
                    },
                ],
                effect: [
                    {
                        name: 'Add skill',
                        skill: 'mining',
                        increase: 1000,
                    },
                ]
            },
            {
                text: "Your kobolds mined a lot of stone.",
                reward: [
                    {
                        name: 'stone',
                        amount: 10000,
                    }
                ],
                effect: [
                    {
                        name: 'Add skill',
                        skill: 'mining',
                        increase: 1000,
                    },
                ]

            },
        ],
        badOutcomes: [
            {
                text: "Your kobolds did not find a suitable spot to mine.",
                reward: [],
            },
            {
                text: "Your kobolds only mined a little stone.",
                reward: [
                    {
                        name: 'stone',
                        amount: 1000,
                    }
                ],
                effect: [
                    {
                        name: 'Add skill',
                        skill: 'mining',
                        increase: 1000,
                    },
                ]

            },
        ],
        length: 60000,
        costs:
            [
                {
                    name: "food",
                    amount: 200,
                },
            ],

    },
    //----------------------------------------------------------------------------------------------------
    {
        name: "Go on a walk.",
        color: "lightblue",
        partySize: 1,
        description: "Your kobold takes a nice nature walk.",
        skills: [
            "all",
        ],
        visibilityCheck: {
        },
        startTexts: [
            "Your kobolds sets off, a spring in their step.",
            "Your kobold excitedly hurries off on their walk.",
        ],
        skillchecks: [
            {
                skill: "strength",
                difficulty: 10,
            },
            {
                skill: "swimming",
                difficulty: 10,
            },
            {
                skill: "nature",
                difficulty: 10,
            },
            {
                skill: "animal handling",
                difficulty: 10,
            },
        ],
        greatOutcomes: [
            {
                text: "Your kobold practiced understanding nature, and found some seeds.",
                reward: [
                    {
                        name: 'seeds',
                        amount: 300,
                    }
                ],
                effect: [
                    {
                        name: 'Add skill',
                        skill: 'nature',
                        increase: 1000,
                    },

                ]
            },
            {
                text: "Your kobold watched a very cute lizard",
                reward: [],
                effect: [
                    {
                        name: 'Add skill',
                        skill: 'nature',
                        increase: 1000,
                    },
                    {
                        name: 'Add skill',
                        skill: 'animal handling',
                        increase: 1000,
                    },

                ]
            },
        ],
        goodOutcomes: [
            {
                text: "Your kobold found a heavy rock that they practiced lifting.",
                reward: [
                    {
                        name: "stone",
                        amount: 3000,
                    },
                ],
                effect: [
                    {
                        name: 'Add skill',
                        skill: 'strength',
                        increase: 1000,
                    },

                ]
            },
            {
                text: "Your kobold found a lake that they swam in.",
                reward: [],
                effect: [
                    {
                        name: 'Add skill',
                        skill: 'swimming',
                        increase: 1000,
                    },

                ]

            },
            {
                text: "Your kobold found some berries that they picked.",
                reward: [
                    {
                        name: "berries",
                        amount: 300,
                    },
                ],
                effect: [
                    {
                        name: 'Add skill',
                        skill: 'nature',
                        increase: 1000,
                    },

                ]
            },
        ],
        badOutcomes: [
            {
                text: "Your kobold got stuck in some mud.",
                reward: [],
                effect: [
                    {
                        name: 'Add skill',
                        skill: 'strength',
                        increase: 1000,
                    },
                    {
                        name: 'Add skill',
                        skill: 'agility',
                        increase: 1000,
                    },
                ],
            },
            {
                text: "Your kobold got distracted by a squirrel.",
                reward: [],
                effect: [
                    {
                        name: 'Add skill',
                        skill: 'nature',
                        increase: 1000,
                    },
                ],
            },
            {
                text: "Your kobold splashed in a pond.",
                reward: [],
                effect: [
                    {
                        name: 'Add skill',
                        skill: 'swimming',
                        increase: 1000,
                    },
                ],
            },
            {
                text: "Your kobold lifted a heavy log.",
                reward: [],
                effect: [
                    {
                        name: 'Add skill',
                        skill: 'strength',
                        increase: 1000,
                    },
                ],
            },
            {
                text: "Your kobold cloudgazed.",
                reward: [],
                effect: [
                    {
                        name: 'Add skill',
                        skill: 'arcana',
                        increase: 1000,
                    },
                ],
            },
            {
                text: "Your kobold admired some bugs.",
                reward: [],
                effect: [
                    {
                        name: 'Add skill',
                        skill: 'nature',
                        increase: 1000,
                    },
                    {
                        name: 'Add skill',
                        skill: 'perception',
                        increase: 1000,
                    },
                ],
            },
            {
                text: "Your kobold looked at a very pretty leaf.",
                reward: [],
                effect: [
                    {
                        name: 'Add skill',
                        skill: 'nature',
                        increase: 1000,
                    },
                    {
                        name: 'Add skill',
                        skill: 'perception',
                        increase: 1000,
                    },
                ],
            },
        ],
        length: 60000,
        costs:
            [
                {
                    name: "rations",
                    amount: 200,
                },
            ],
    },
    //----------------------------------------------------------------------------------------------------------------
    {
        name: "Go on a picnic",
        color: "pink",
        partySize: 3,
        description: "Your kobolds have a nice time talking to eachother and eating good food.",
        skills: [
            "social",
        ],
        visibilityCheck: {
        },
        startTexts: [
            "Your kobolds set off carrying baskets of food.",
            "Your kobolds carry a beautiful cake as they leave for their picnic."
        ],
        skillchecks: [
            {
                skill: "persuasion",
                difficulty: 10,
            },
        ],
        greatOutcomes: [
            {
                text: "Your kobolds had a great time",
                reward: [],
                effect: [
                    {
                        name: "Add friendship",
                        points: 10,
                    }
                ],
            },
            {
                text: "Your kobolds confided in eachother.",
                reward: [],
                effect: [
                    {
                        name: "Add friendship",
                        points: 10,
                    }
                ],
            },
        ],
        goodOutcomes: [
            {
                text: "Your kobolds cloudgazed together.",
                reward: [],
                effect: [
                    {
                        name: "Add skill",
                        skill: "arcana",
                        increase: 1000,
                    },
                ],
            },
            {
                text: "Your kobolds came up with some interesting food combinations.",
                reward: [],
                effect: [
                    {
                        name: "Add skill",
                        skill: "cooking",
                        increase: 1000,
                    },
                ],

            },
        ],
        badOutcomes: [
            {
                text: "Your kobolds argued.",
                reward: [],
                effect: [
                    {
                        name: "Add skill",
                        skill: "persuation",
                        increase: 1000,
                    },
                ],
            },
        ],
        length: 60000,
        costs:
            [
                {
                    name: "gourmet rations",
                    amount: 2000,
                },
                {
                    name: "berries",
                    amount: 2000,
                },
                {
                    name: "nuts",
                    amount: 2000,
                },
                {
                    name: "seeds",
                    amount: 2000,
                },
                {
                    name: "fruits",
                    amount: 2000,
                },
            ],

    },
    //-------------------------------------------------------------------------
    {
        name: "Climb a mountain.",
        color: "gray",
        partySize: 1,
        description: "Your kobold goes on a excursion to climb the local mountain.",
        skills: [
            "all",
        ],
        visibilityCheck: {
        },
        startTexts: [
            "Your kobolds sets off, a backpack full of food for the journey.",
            "Your kobold choses a good walking stick before setting off.",
        ],
        skillchecks: [
            {
                skill: "strength",
                difficulty: 10,
            },
            {
                skill: "agility",
                difficulty: 10,
            },
            {
                skill: "nature",
                difficulty: 10,
            },
        ],
        greatOutcomes: [
            {
                text: "Your kobold reached the summit, and found a really pretty rock.",
                reward: [
                    {
                        name: 'gems',
                        amount: 1000,
                    }
                ],
                effect: [
                    {
                        name: 'Add skill',
                        skill: 'agility',
                        increase: 1000,
                    },

                ]
            },
            {
                text: "Your kobold made it to the summit and admired the view.",
                reward: [],
                effect: [
                    {
                        name: 'Add skill',
                        skill: 'nature',
                        increase: 1000,
                    },
                    {
                        name: 'Add skill',
                        skill: 'arcana',
                        increase: 1000,
                    },

                ]
            },
        ],
        goodOutcomes: [
            {
                text: "Your kobold struggled to make it up the mountain, but it was worth it in the end.",
                reward: [],
                effect: [
                    {
                        name: 'Add skill',
                        skill: 'strength',
                        increase: 1000,
                    },

                ]

            },
            {
                text: "Your kobold found some edible roots on the way down from the mountain.",
                reward: [
                    {
                        name: "food",
                        amount: 3000,
                    },
                ],
                effect: [
                    {
                        name: 'Add skill',
                        skill: 'nature',
                        increase: 1000,
                    },

                ]
            },
        ],
        badOutcomes: [
            {
                text: "Your kobold gave up halfway up the mountain.",
                reward: [],
                effect: [
                    {
                        name: 'Add skill',
                        skill: 'strength',
                        increase: 1000,
                    },
                ],
            },
            {
                text: "Your kobold didn't make it all the way up, but they saw some pretty birds.",
                reward: [],
                effect: [
                    {
                        name: 'Add skill',
                        skill: 'nature',
                        increase: 1000,
                    },
                ],
            },
            {
                text: "Your kobold drank from a mountain stream.",
                reward: [],
                effect: [
                    {
                        name: 'Add skill',
                        skill: 'survival',
                        increase: 1000,
                    },
                ],
            },
            {
                text: "Your kobold was stopped by some rubble, they tried removing it but it was too heavy.",
                reward: [],
                effect: [
                    {
                        name: 'Add skill',
                        skill: 'strength',
                        increase: 1000,
                    },
                ],
            },
            {
                text: "Your kobold was interrupted by bad weather.",
                reward: [],
                effect: [
                    {
                        name: 'Add skill',
                        skill: 'survival',
                        increase: 1000,
                    },
                ],
            },
            {
                text: "Your kobold admired the wildlife living on the mountain.",
                reward: [],
                effect: [
                    {
                        name: 'Add skill',
                        skill: 'nature',
                        increase: 1000,
                    },
                    {
                        name: 'Add skill',
                        skill: 'perception',
                        increase: 1000,
                    },
                ],
            },
            {
                text: "Your kobold threw some rocks down the side of the mountain.",
                reward: [],
                effect: [
                    {
                        name: 'Add skill',
                        skill: 'strength',
                        increase: 1000,
                    },
                    {
                        name: 'Add skill',
                        skill: 'agility',
                        increase: 1000,
                    },
                ],
            },
        ],
        length: 60000,
        costs:
            [
                {
                    name: "rations",
                    amount: 200,
                },
            ],
    },
    //------------------------------------------------------------------------------------------
    {
        name: "Find egg rocks.",
        color: "gray",
        partySize: 1,
        description: "Your kobolds go looking for the special rocks that can be imbued with divine energy to create a kobold that is the mix of two kobolds, given that their friendship is high enough.",
        skills: [
            "all",
        ],
        visibilityCheck: {
        },
        startTexts: [
            "Your kobolds look carefully at a map before leaving.",
            "Your say goodbye before they walk away.",
        ],
        skillchecks: [
            {
                skill: "mining",
                difficulty: 20,
            },
            {
                skill: "nature",
                difficulty: 20,
            },
            {
                skill: "perception",
                difficulty: 20,
            },
            {
                skill: "arcana",
                difficulty: 20,
            },
            {
                skill: "survival",
                difficulty: 20,
            },
            {
                skill: "animal handling",
                difficulty: 20,
            },
            {
                skill: "persuasion",
                difficulty: 20,
            },
            {
                skill: "navigation",
                difficulty: 20,
            }
        ],
        greatOutcomes: [
            {
                text: "Your kobolds managed to mine an egg rock.",
                reward: [
                    {
                        name: 'egg rocks',
                        amount: 1,
                    }
                ],
                effect: []
            },
            {
                text: "Your kobolds found an egg rock on an hill.",
                reward: [
                    {
                        name: "egg rocks",
                        amount: 1,
                    },
                ],
                effect: [],
            },
        ],
        goodOutcomes: [
            {
                text: "Your kobold did not find any egg rocks, but their skills increased.",
                reward: [],
                effect: [
                    {
                        name: 'Add skill',
                        skill: 'strength',
                        increase: 1000,
                    },
                    {
                        name: 'Add skill',
                        skill: 'arcana',
                        increase: 1000,
                    },
                    {
                        name: 'Add skill',
                        skill: 'survival',
                        increase: 1000,
                    },

                ]

            },
            {
                text: "Your kobolds did not find any egg rocks, but they observed a lizard with children.",
                reward: [],
                effect: [
                    {
                        name: 'Add skill',
                        skill: 'nature',
                        increase: 1000,
                    },
                    {
                        name: 'Add skill',
                        skill: 'animal handling',
                        increase: 1000,
                    },

                ]
            },
        ],
        badOutcomes: [
            {
                text: "Your kobolds got lost, but they did manage to find their way back to the den.",
                reward: [],
                effect: [
                    {
                        name: 'Add skill',
                        skill: 'survival',
                        increase: 1000,
                    },
                ],
            },
            {
                text: "Your kobolds maps turned out to not lead anywhere'.",
                reward: [],
                effect: [
                    {
                        name: 'Add skill',
                        skill: 'navigation',
                        increase: 1000,
                    },
                ],
            },
            {
                text: "Your kobolds walked in circles and eventually gave up.",
                reward: [],
                effect: [
                    {
                        name: 'Add skill',
                        skill: 'survival',
                        increase: 1000,
                    },
                    {
                        name: 'Add skill',
                        skill: 'navigation',
                        increase: 1000,
                    },
                ],
            },
            {
                text: "Your kobolds did find a source of egg rocks, but it was already mined.",
                reward: [],
                effect: [
                    {
                        name: 'Add skill',
                        skill: 'mining',
                        increase: 1000,
                    },
                ],
            },
            {
                text: "Your kobolds was interrupted by bad weather.",
                reward: [],
                effect: [
                    {
                        name: 'Add skill',
                        skill: 'survival',
                        increase: 1000,
                    },
                ],
            },
            {
                text: "Your kobolds had to turn back because of hostile wildlife.",
                reward: [],
                effect: [
                    {
                        name: 'Add skill',
                        skill: 'nature',
                        increase: 1000,
                    },
                    {
                        name: 'Add skill',
                        skill: 'animal handling',
                        increase: 1000,
                    },
                ],
            },
            {
                text: "Your kobolds found egg rocks, but were robbed by another kobold.",
                reward: [],
                effect: [
                    {
                        name: 'Add skill',
                        skill: 'intimidation',
                        increase: 1000,
                    },
                ],
            },
        ],
        length: 60000,
        costs:
            [
                {
                    name: "gourmet rations",
                    amount: 2000,
                },
                {
                    name: "maps",
                    amount: 2000,
                },
            ],
    },
];