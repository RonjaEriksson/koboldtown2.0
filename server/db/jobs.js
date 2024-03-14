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
        relevantSkills: [
            "nature",
            "survival"
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
        ],
        spotsOpen: 1,
        requirements: {
            have: {
                buildings: [{ name: 'farm', level: 1 }],
            }
        }
    },
]