export const jobs = [
    {
        name: "scavenge",
        color: "darkGrey",
        resources: [
            "food",
            "stone",
            "wood",
        ],
        production: {
            food: 1,
            stone: 1,
            wood: 1,
        },
        baseStat: 'mental',
        relevantSkills: [
            "nature",
            "survival"
        ],
        skillGains: [
            {
                name: "survival",
                gain: 5,
            },
        ],
        spotsOpen: "unlimited",
        requirements: {}
    },
    {
        name: "basic farming",
        color: "lightGreen",
        resources: [
            "food",
        ],
        production: {
            food: 3,
        },
        baseStat: 'physical',
        relevantSkills: [
            "nature",
            "farming"
        ],
        skillGains: [
            {
                name: "farming",
                gain: 10,
            },
        ],
        spotsOpen: 1,
        requirements: {
            have: {
                buildings: [{ name: 'farm', level: 1 }],
            },
            not: {
                buildings: [{ name: 'farm', level: 10 }],
            }
        }
    },
    {
        name: "skilled farming",
        color: "lightGreen",
        resources: [
            "food",
        ],
        production: {
            food: 30,
        },
        baseStat: 'physical',
        relevantSkills: [
            "nature",
            "farming"
        ],
        skillGains: [
            {
                name: "farming",
                gain: 10,
            },
        ],
        spotsOpen: 1,
        requirements: {
            have: {
                buildings: [{ name: 'farm', level: 10 }],
            },
            not: {
                buildings: [{ name: 'farm', level: 20 }],
            }
        }
    },
    {
        name: "advanced farming",
        color: "lightGreen",
        resources: [
            "food",
        ],
        production: {
            food: 300,
        },
        baseStat: 'physical',
        relevantSkills: [
            "nature",
            "farming"
        ],
        skillGains: [
            {
                name: "farming",
                gain: 10,
            },
        ],
        spotsOpen: 1,
        requirements: {
            have: {
                buildings: [{ name: 'farm', level: 20 }],
            },
            not: {
                buildings: [{ name: 'farm', level: 30 }],
            }
        }
    },
    {
        name: "expert farming",
        color: "lightGreen",
        resources: [
            "food",
        ],
        production: {
            food: 3000,
        },
        baseStat: 'physical',
        relevantSkills: [
            "nature",
            "farming"
        ],
        skillGains: [
            {
                name: "farming",
                gain: 10,
            },
        ],
        spotsOpen: 1,
        requirements: {
            have: {
                buildings: [{ name: 'farm', level: 30 }],
            }
        }
    },
    {
        name: "basic mining",
        color: "grey",
        resources: [
            "stone",
        ],
        production: {
            stone: 3,
        },
        baseStat: 'physical',
        relevantSkills: [
            "mining",
            "strength",
        ],
        skillGains: [
            {
                name: "mining",
                gain: 20,
            },
        ],
        spotsOpen: 1,
        requirements: {
            have: {
                buildings: [{ name: 'quarry', level: 1 }],
            },
            not: {
                buildings: [{ name: 'quarry', level: 10 }],
            }
        }
    },
    {
        name: "skilled mining",
        color: "grey",
        resources: [
            "stone",
        ],
        production: {
            stone: 30,
        },
        baseStat: 'physical',
        relevantSkills: [
            "mining",
            "strength",
        ],
        skillGains: [
            {
                name: "mining",
                gain: 20,
            },
        ],
        spotsOpen: 1,
        requirements: {
            have: {
                buildings: [{ name: 'quarry', level: 10 }],
            },
            not: {
                buildings: [{ name: 'quarry', level: 20 }],
            }
        }
    },
    {
        name: "advanced mining",
        color: "grey",
        resources: [
            "stone",
        ],
        production: {
            stone: 300,
        },
        baseStat: 'physical',
        relevantSkills: [
            "mining",
            "strength",
        ],
        skillGains: [
            {
                name: "mining",
                gain: 20,
            },
        ],
        spotsOpen: 1,
        requirements: {
            have: {
                buildings: [{ name: 'quarry', level: 20 }],
            },
            not: {
                buildings: [{ name: 'quarry', level: 30 }],
            }
        }
    },
    {
        name: "expert mining",
        color: "grey",
        resources: [
            "stone",
        ],
        production: {
            stone: 3000,
        },
        baseStat: 'physical',
        relevantSkills: [
            "mining",
            "strength",
        ],
        skillGains: [
            {
                name: "mining",
                gain: 20,
            },
        ],
        spotsOpen: 1,
        requirements: {
            have: {
                buildings: [{ name: 'quarry', level: 30 }],
            }
        }
    },
    {
        name: "basic sawing",
        color: "brown",
        resources: [
            "wood",
        ],
        production: {
            wood: 3,
        },
        baseStat: 'physical',
        relevantSkills: [
            "agility",
            "strength",
        ],
        skillGains: [
            {
                name: "strength",
                gain: 10,
            },
            {
                name: "agility",
                gain: 10,
            },
        ],
        spotsOpen: 1,
        requirements: {
            have: {
                buildings: [{ name: 'lumber yard', level: 1 }],
            },
            not: {
                buildings: [{ name: 'lumber yard', level: 10 }],
            }
        }
    },
    {
        name: "skilled sawing",
        color: "brown",
        resources: [
            "wood",
        ],
        production: {
            wood: 30,
        },
        baseStat: 'physical',
        relevantSkills: [
            "agility",
            "strength",
        ],
        skillGains: [
            {
                name: "strength",
                gain: 10,
            },
            {
                name: "agility",
                gain: 10,
            },
        ],
        spotsOpen: 1,
        requirements: {
            have: {
                buildings: [{ name: 'lumber yard', level: 10 }],
            },
            not: {
                buildings: [{ name: 'lumber yard', level: 20 }],
            }
        }
    },
    {
        name: "advanced sawing",
        color: "brown",
        resources: [
            "wood",
        ],
        production: {
            wood: 300,
        },
        baseStat: 'physical',
        relevantSkills: [
            "agility",
            "strength",
        ],
        skillGains: [
            {
                name: "strength",
                gain: 10,
            },
            {
                name: "agility",
                gain: 10,
            },
        ],
        spotsOpen: 1,
        requirements: {
            have: {
                buildings: [{ name: 'lumber yard', level: 20 }],
            },
            not: {
                buildings: [{ name: 'lumber yard', level: 30 }],
            }
        }
    },
    {
        name: "expert sawing",
        color: "brown",
        resources: [
            "wood",
        ],
        production: {
            wood: 3000,
        },
        baseStat: 'physical',
        relevantSkills: [
            "agility",
            "strength",
        ],
        skillGains: [
            {
                name: "strength",
                gain: 10,
            },
            {
                name: "agility",
                gain: 10,
            },
        ],
        spotsOpen: 1,
        requirements: {
            have: {
                buildings: [{ name: 'lumber yard', level: 30 }],
            },
        }
    },
    {
        name: "make paper",
        color: "grey",
        resources: [
            "paper",
        ],
        production: {
            paper: 1,
            wood: -5,
        },
        baseStat: 'mental',
        relevantSkills: [
            "crafting",
        ],
        skillGains: [
            {
                name: "crafting",
                gain: 10,
            },
        ],
        spotsOpen: 1,
        requirements: {
            have: {
                buildings: [{ name: 'paper mill', level: 1 }],
            }
        }
    },
    {
        name: "make maps",
        color: "grey",
        resources: [
            "maps",
        ],
        production: {
            maps: 0,
            paper: -5,
            ink: -5,
        },
        baseStat: 'mental',
        relevantSkills: [
            "survival",
            "drawing",
        ],
        skillGains: [
            {
                name: "survival",
                gain: 10,
            },
            {
                name: "drawing",
                gain: 10,
            },
        ],
        spotsOpen: 1,
        requirements: {
            have: {
                buildings: [{ name: 'town hall', level: 10 }],
            }
        }
    },
    {
        name: "crush rocks",
        color: "silver",
        resources: [
            "sand",
        ],
        production: {
            sand: 3,
            stone: -1,
        },
        baseStat: 'physical',
        relevantSkills: [
            "strength",
        ],
        skillGains: [
            {
                name: "strength",
                gain: 20,
            },
        ],
        spotsOpen: 1,
        requirements: {
            have: {
                buildings: [{ name: 'quarry', level: 3 }],
            }
        }
    },
    {
        name: "mine gems",
        color: "silver",
        resources: [
            "gems",
        ],
        production: {
            gems: 1,
            stone: -10,
        },
        baseStat: 'physical',
        relevantSkills: [
            "strength",
            "perception"
        ],
        skillGains: [
            {
                name: "strength",
                gain: 10,
            },
            {
                name: "perception",
                gain: 10,
            },
        ],
        spotsOpen: 1,
        requirements: {
            have: {
                buildings: [{ name: 'quarry', level: 30 }],
            }
        }
    },
    {
        name: "smelt",
        color: "gold",
        resources: [
            "metal",
        ],
        production: {
            metal: 1,
            stone: -3,
        },
        baseStat: 'physical',
        relevantSkills: [
            "mining",
            "smelting",
        ],
        skillGains: [
            {
                name: "smelting",
                gain: 20,
            },
        ],
        spotsOpen: 1,
        requirements: {
            have: {
                buildings: [{ name: 'smelter', level: 1 }],
            }
        }
    },
    {
        name: "blow glass",
        color: "lightblue",
        resources: [
            "glass",
        ],
        production: {
            glass: 1,
            sand: -5,
        },
        baseStat: 'mental',
        relevantSkills: [
            "glass blowing",
        ],
        skillGains: [
            {
                name: "glass blowing",
                gain: 20,
            },
        ],
        spotsOpen: 1,
        requirements: {
            have: {
                buildings: [{ name: 'glassblowing studio', level: 1 }],
            }
        }
    },
    {
        name: "cooking",
        color: "gold",
        resources: [
            "rations",
        ],
        production: {
            rations: 1,
            food: -30,
        },
        baseStat: 'mental',
        relevantSkills: [
            "cooking",
        ],
        skillGains: [
            {
                name: "cooking",
                gain: 20,
            },
        ],
        spotsOpen: 1,
        requirements: {
            have: {
                buildings: [{ name: 'kitchen', level: 1 }],
            }
        }
    },
    {
        name: "gourmet cooking",
        color: "gold",
        resources: [
            "rations",
        ],
        production: {
            'gourmet rations': 1,
            food: -30,
            seeds: -3,
            berries: -3,
            fruits: -3,
            nuts: -1,
        },
        baseStat: 'mental',
        relevantSkills: [
            "cooking",
        ],
        skillGains: [
            {
                name: "cooking",
                gain: 20,
            },
        ],
        spotsOpen: 1,
        requirements: {
            have: {
                buildings: [{ name: 'kitchen', level: 20 }],
            }
        }
    },
    {
        name: "make ink",
        color: "navy",
        resources: [
            "ink",
        ],
        production: {
            ink: 0,
            food: -5,
        },
        baseStat: 'mental',
        relevantSkills: [
            "harvesting",
            "crafting",
        ],
        skillGains: [
            {
                name: "harvesting",
                gain: 10,
            },
            {
                name: "crafting",
                gain: 10,
            },
        ],
        spotsOpen: 1,
        requirements: {
            have: {
                buildings: [{ name: 'crafting hut', level: 1 }],
            }
        }
    },
    {
        name: "paint",
        color: "navy",
        resources: [
            "skillgain",
        ],
        production: {
            drawings: 0,
            ink: -1,
            paper: -1,
        },
        baseStat: 'mental',
        relevantSkills: [
            "drawing",
            "crafting",
        ],
        skillGains: [
            {
                name: "drawing",
                gain: 10,
            },
            {
                name: "crafting",
                gain: 10,
            },
        ],
        spotsOpen: 1,
        requirements: {
            have: {
                buildings: [{ name: 'crafting hut', level: 5 }],
            }
        }
    },
    {
        name: "write a book",
        color: "navy",
        resources: [
            "skillgain",
        ],
        production: {
            books: 0,
            ink: -1,
            paper: -1,
        },
        baseStat: 'social',
        relevantSkills: [
            "writing",
        ],
        skillGains: [
            {
                name: "writing",
                gain: 10,
            },
            {
                name: "persuasion",
                gain: 10,
            },
        ],
        spotsOpen: 1,
        requirements: {
            have: {
                buildings: [{ name: 'crafting hut', level: 10 }],
            }
        }
    },
    {
        name: "make oregami",
        color: "navy",
        resources: [
            "skillgain",
        ],
        production: {
            oregami: 0,
            paper: -2,
        },
        baseStat: 'mental',
        relevantSkills: [
            "crafting",
        ],
        skillGains: [
            {
                name: "crafting",
                gain: 10,
            },
        ],
        spotsOpen: 1,
        requirements: {
            have: {
                buildings: [{ name: 'crafting hut', level: 10 }],
            }
        }
    },
    {
        name: "make jewlery",
        color: "navy",
        resources: [
            "jewlery",
        ],
        production: {
            jewlery: 0,
            metal: -2,
            gems: -1,
        },
        baseStat: 'mental',
        relevantSkills: [
            "crafting",
        ],
        skillGains: [
            {
                name: "crafting",
                gain: 10,
            },
        ],
        spotsOpen: 1,
        requirements: {
            have: {
                buildings: [{ name: 'crafting hut', level: 15 }],
            }
        }
    },
    {
        name: "write a play",
        color: "green",
        resources: [
            "skillgain",
        ],
        production: {},
        baseStat: 'social',
        relevantSkills: [
            "writing",
        ],
        skillGains: [
            {
                name: "writing",
                gain: 10,
            },
            {
                name: "persuasion",
                gain: 10,
            },
        ],
        spotsOpen: 1,
        requirements: {
            have: {
                buildings: [{ name: 'theatre', level: 5 }, { name: 'town hall', level: 5 }],
            }
        }
    },
    {
        name: "harvest seeds",
        color: "chocolate",
        resources: [
            "seeds",
        ],
        production: {
            seeds: 1,
            food: -3,
        },
        baseStat: 'mental',
        relevantSkills: [
            "harvesting",
        ],
        skillGains: [
            {
                name: "harvesting",
                gain: 20,
            },
        ],
        spotsOpen: 1,
        requirements: {
            have: {
                buildings: [{ name: 'farm', level: 3 }],
            }
        }
    },
    {
        name: "harvest fruit",
        color: "chocolate",
        resources: [
            "seeds",
        ],
        production: {
            fruits: 1,
            food: -3,
        },
        baseStat: 'mental',
        relevantSkills: [
            "harvesting",
        ],
        skillGains: [
            {
                name: "harvesting",
                gain: 20,
            },
        ],
        spotsOpen: 1,
        requirements: {
            have: {
                buildings: [{ name: 'orchard', level: 1 }],
            }
        }
    },
    {
        name: "worship",
        color: "chocolate",
        resources: [
            "seeds",
        ],
        production: {
            divinity: 1,
            jewlery: -3,
            fruits: -3,
            berries: -3,
            nuts: -3,
            drawings: -3,
            oregami: -3,
        },
        baseStat: 'social',
        relevantSkills: [
            "religion",
        ],
        skillGains: [
            {
                name: "religion",
                gain: 20,
            },
        ],
        spotsOpen: 1,
        requirements: {
            have: {
                buildings: [{ name: 'temple', level: 1 }],
            }
        }
    },
    {
        name: "transform egg rocks",
        color: "chocolate",
        resources: [
            "seeds",
        ],
        production: {
            eggs: 1,
            'egg rocks': -1,
            divinity: 10000,
        },
        'max production': {
            eggs: 1,
        },
        baseStat: 'mental',
        relevantSkills: [
            "arcana",
        ],
        skillGains: [
            {
                name: "arcana",
                gain: 20,
            },
        ],
        spotsOpen: 1,
        requirements: {
            have: {
                buildings: [{ name: 'temple', level: 30 }],
            }
        }
    },
]