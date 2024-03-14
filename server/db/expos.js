export const expos = [
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
    //------------------------------------------------------------------------------
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
                        name: 'Add skill',
                        skill: 'nature',
                        increase: 500,
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
                        increase: 500,
                    },

                ]

            }, {
                text: "Your kobolds discussed magic with a mysterious blue kobold.",
                reward: [],
                effect: [
                    {
                        name: 'Add skill',
                        skill: 'arcana',
                        increase: 500,
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
                        increase: 100,
                    }
                ]
            },
            {
                text: "Your party found no other kobolds, but they did find some edibile plants.",
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
    //--------------------------------------------------------------------------------
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
        length: 60000,
        cost:
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
        rewards: [
            "Gaining skills"
        ],
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
        ],
        greatOutcomes: [
            {
                text: "Your kobold practiced understanding natue, and found some seeds.",
                reward: [
                    {
                        name: 'seeds',
                        amount: 3,
                    }
                ],
                effect: [
                    {
                        name: 'Add skill',
                        skill: 'nature',
                        increase: 50,
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
                        amount: 30,
                    },
                ],
                effect: [
                    {
                        name: 'Add skill',
                        skill: 'strength',
                        increase: 50,
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
                        increase: 50,
                    },

                ]

            },
            {
                text: "Your kobold found some berries that they picked.",
                reward: [
                    {
                        name: "food",
                        amount: 30,
                    },
                ],
                effect: [
                    {
                        name: 'Add skill',
                        skill: 'nature',
                        increase: 50,
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
                        increase: 100,
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
                        increase: 100,
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
                        increase: 100,
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
                        increase: 100,
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
                        increase: 100,
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
                        increase: 100,
                    },
                    {
                        name: 'Add skill',
                        skill: 'perception',
                        increase: 100,
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
                        increase: 100,
                    },
                    {
                        name: 'Add skill',
                        skill: 'perception',
                        increase: 100,
                    },
                ],
            },
        ],
        length: 60000,
        cost:
            [
                {
                    name: "food",
                    amount: 200,
                },
            ],
    },
    //----------------------------------------------------------------------------------------------------------------
    {
        name: "Go on a picnic",
        color: "pink",
        partySize: 3,
        rewards: [],
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
                        increase: 100,
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
                        increase: 100,
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
                        increase: 100,
                    },
                ],
            },
        ],
        length: 60000,
        cost:
            [
                {
                    name: "food",
                    amount: 200,
                },
            ],

    },
    //-------------------------------------------------------------------------
    {
        name: "Climb a mountain.",
        color: "gray",
        partySize: 1,
        rewards: [
            "Gaining skills"
        ],
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
                        amount: 1,
                    }
                ],
                effect: [
                    {
                        name: 'Add skill',
                        skill: 'agility',
                        increase: 50,
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
                        increase: 50,
                    },
                    {
                        name: 'Add skill',
                        skill: 'arcana',
                        increase: 50,
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
                        increase: 50,
                    },

                ]

            },
            {
                text: "Your kobold found some edible roots on the way down from the mountain.",
                reward: [
                    {
                        name: "food",
                        amount: 30,
                    },
                ],
                effect: [
                    {
                        name: 'Add skill',
                        skill: 'nature',
                        increase: 50,
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
                        increase: 100,
                    },
                ],
            },
            {
                text: "Your kobold didn't make it all the way up, but they saw some pretty birds'.",
                reward: [],
                effect: [
                    {
                        name: 'Add skill',
                        skill: 'nature',
                        increase: 100,
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
                        increase: 100,
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
                        increase: 100,
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
                        increase: 100,
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
                        increase: 100,
                    },
                    {
                        name: 'Add skill',
                        skill: 'perception',
                        increase: 100,
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
                        increase: 100,
                    },
                    {
                        name: 'Add skill',
                        skill: 'agility',
                        increase: 100,
                    },
                ],
            },
        ],
        length: 60000,
        cost:
            [
                {
                    name: "food",
                    amount: 200,
                },
            ],
    },
];
