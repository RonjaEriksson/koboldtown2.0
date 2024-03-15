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
                gain: 1,
            },
        ],
        spotsOpen: "unlimited",
        requirements: {}
    },
    {
        name: "farm",
        color: "lightGreen",
        resources: [
            "food",
        ],
        production: {
            food: 3,
        },
        relevantSkills: [
            "nature",
            "farming"
        ],
        skillGains: [
            {
                name: "farming",
                gain: 1,
            },
        ],
        spotsOpen: 1,
        requirements: {
            have: {
                buildings: [{ name: 'farm', level: 1 }],
            }
        }
    },
    {
        name: "mine",
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
                gain: 1,
            },
        ],
        spotsOpen: 1,
        requirements: {
            have: {
                buildings: [{ name: 'quarry', level: 1 }],
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
                gain: 1,
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
        name: "cook",
        color: "gold",
        resources: [
            "metal",
        ],
        production: {
            rations: 1,
            food: -3,
        },
        baseStat: 'mental',
        relevantSkills: [
            "cooking",
        ],
        skillGains: [
            {
                name: "cooking",
                gain: 1,
            },
        ],
        spotsOpen: 1,
        requirements: {
            have: {
                buildings: [{ name: 'kitchen', level: 1 }],
            }
        }
    },
]