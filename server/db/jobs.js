export const jobs = [
    {
        name: "scavenge",
        color: "#85744a",
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
        requirements: {},
    },
    {
        name: "farming",
        color: "#4ad970",
        resources: [
            "food",
        ],
        production: {
            food: 3,
        },
        levelScaling: true,
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
        requirements: {
            have: {
                buildings: [{ name: 'farm', level: 1 }],
            },
        }
    },
    {
        name: "mining",
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
        levelScaling: true,
        skillGains: [
            {
                name: "mining",
                gain: 20,
            },
        ],
        requirements: {
            have: {
                buildings: [{ name: 'quarry', level: 1 }],
            },
        }
    },
    {
        name: "sawing",
        color: "brown",
        resources: [
            "wood",
        ],
        production: {
            wood: 3,
        },
        levelscaling: true,
        baseStat: 'physical',
        relevantSkills: [
            "woodworking",
        ],
        skillGains: [
            {
                name: "woodworking",
                gain: 20,
            },
        ],
        requirements: {
            have: {
                buildings: [{ name: 'lumber yard', level: 1 }],
            },
        }
    },
    {
        name: "make paper",
        color: "#948a70",
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
        color: "#14592a",
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
            "navigation",
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
            {
                name: "navigation",
                gain: 10,
            },
        ],
        requirements: {
            have: {
                buildings: [{ name: 'town hall', level: 10 }],
            }
        }
    },
    {
        name: "crush rocks",
        color: "#757166",
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
        requirements: {
            have: {
                buildings: [{ name: 'quarry', level: 3 }],
            }
        }
    },
    {
        name: "mine gems",
        color: "#504463",
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
        requirements: {
            have: {
                buildings: [{ name: 'quarry', level: 30 }],
            }
        }
    },
    {
        name: "smelting",
        color: "#7e7d80",
        resources: [
            "metal",
        ],
        production: {
            metal: 1,
            stone: -3,
        },
        levelscaling: true,
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
        requirements: {
            have: {
                buildings: [{ name: 'smelter', level: 1 }],
            },
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
        requirements: {
            have: {
                buildings: [{ name: 'glassblowing studio', level: 1 }],
            }
        }
    },
    {
        name: "cooking",
        color: "#31948f",
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
        requirements: {
            have: {
                buildings: [{ name: 'kitchen', level: 1 }],
            }
        }
    },
    {
        name: "gourmet cooking",
        color: "#2a6696",
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
        requirements: {
            have: {
                buildings: [{ name: 'kitchen', level: 20 }],
            }
        }
    },
    {
        name: "craft",
        color: "#653eb5",
        resources: [
            "skillgain",
        ],
        production: {
            drawings: 0,
            oregami: 0,
            ink: -1,
            paper: -4,
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
        requirements: {
            have: {
                buildings: [{ name: 'crafting hut', level: 5 }],
            }
        }
    },
    {
        name: "write books",
        color: "#135669",
        resources: [
            "skillgain",
        ],
        production: {
            books: 0,
            ink: -10,
            paper: -10,
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
        requirements: {
            have: {
                buildings: [{ name: 'crafting hut', level: 10 }],
            }
        }
    },
    {
        name: "make jewlery",
        color: "#7445a1",
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
        requirements: {
            have: {
                buildings: [{ name: 'crafting hut', level: 15 }],
            }
        }
    },
    {
        name: "refine food",
        color: "#9c227f",
        resources: [
            "seeds",
        ],
        production: {
            seeds: 1,
            fruits: 1,
            nuts: 1,
            berries: 1,
            ink: 1,
            food: -30,
        },
        baseStat: 'physical',
        relevantSkills: [
            "harvesting",
        ],
        skillGains: [
            {
                name: "harvesting",
                gain: 20,
            },
        ],
        requirements: {
            have: {
                buildings: [{ name: 'farm', level: 10 }],
            }
        }
    },
    {
        name: "read books",
        color: "#314d78",
        resources: [
            "seeds",
        ],
        production: {
            books: -3,
        },
        baseStat: 'mental',
        relevantSkills: [],
        skillGains: [
            {
                name: "history",
                gain: 100,
            },
            {
                name: "navigation",
                gain: 100,
            },
            {
                name: "arcana",
                gain: 100,
            },
            {
                name: "writing",
                gain: 200,
            },
            {
                name: "religion",
                gain: 100,
            },

        ],
        requirements: {
            have: {
                buildings: [{ name: 'library', level: 20 },],
            }
        }
    },
    {
        name: "attend trade school",
        color: "#668c53",
        resources: [
            "seeds",
        ],
        production: {
            books: -3,
        },
        baseStat: 'mental',
        relevantSkills: [],
        skillGains: [
            {
                name: "mining",
                gain: 100,
            },
            {
                name: "farming",
                gain: 100,
            },
            {
                name: "woodworking",
                gain: 100,
            },
        ],
        requirements: {
            have: {
                buildings: [{ name: 'school', level: 1 },],
            }
        }
    },
    {
        name: "worship",
        color: "#875e2b",
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
        requirements: {
            have: {
                buildings: [{ name: 'temple', level: 1 }],
            }
        }
    },
    {
        name: "transform egg rocks",
        color: "#766ca6",
        resources: [
            "seeds",
        ],
        production: {
            eggs: 1,
            'egg rocks': -1,
            divinity: -1000,
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
        requirements: {
            have: {
                buildings: [{ name: 'temple', level: 10 }],
            }
        }
    },
]