export const buildings = [
    {
        name: 'farm',
        requirements: {},
        color: 'green',
        costs: [
            {
                name: "food",
                amount: 500,
            },
        ],
    },
    {
        name: 'quarry',
        requirements: {},
        color: 'grey',
        costs: [
            {
                name: 'stone',
                amount: 500,
            }
        ],
    },
    {
        name: 'lumber yard',
        requirements: {},
        color: 'brown',
        costs: [
            {
                name: 'wood',
                amount: 500,
            }
        ],
    },
    {
        name: 'orchard',
        requirements: {
            have: {
                buildings: [{ name: 'farm', level: 20 }],
            }
        },
        color: 'green',
        costs: [
            {
                name: "food",
                amount: 500,
            },
            {
                name: "seeds",
                amount: 100,
            },
        ],
    },
    {
        name: 'paper mill',
        requirements: {
            have: {
                buildings: [{ name: 'lumber yard', level: 10 }],
            }
        },
        color: 'grey',
        costs: [
            {
                name: 'stone',
                amount: 1000,
            },
            {
                name: 'wood',
                amount: 1000,
            },
            {
                name: 'metal',
                amount: 1000,
            }
        ],
    },
    {
        name: 'smelter',
        requirements: {
            have: {
                buildings: [{ name: 'quarry', level: 5 }],
            }
        },
        color: 'gold',
        costs: [
            {
                name: 'stone',
                amount: 1000,
            },
            {
                name: 'wood',
                amount: 1000,
            }
        ],
    },
    {
        name: 'glassblowing studio',
        requirements: {
            have: {
                buildings: [{ name: 'smelter', level: 5 }, { name: 'quarry', level: 15 } ],
            }
        },
        color: 'lightblue',
        costs: [
            {
                name: 'stone',
                amount: 1000,
            },
            {
                name: 'wood',
                amount: 1000,
            },
            {
                name: 'metal',
                amount: 1000,
            }
        ],
    },
    {
        name: 'kitchen',
        requirements: {
            have: {
                buildings: [{ name: 'farm', level: 5 }],
            }
        },
        color: 'yellow',
        costs: [
            {
                name: 'stone',
                amount: 1000,
            },
            {
                name: 'wood',
                amount: 1000,
            },
            {
                name: "food",
                amount: 1000,
            }  
        ],
    },
    {
    name: 'town hall',
    requirements: {
        have: {
            buildings: [
                { name: 'farm', level: 5 },
                { name: 'quarry', level: 5 },
                { name: 'lumber yard', level: 5 },
                { name: 'kitchen', level: 3 },
                {name: 'smelter', level: 3},
            ],
        }
    },
    color: 'white',
    costs: [
        {
            name: 'stone',
            amount: 1000,
        },
        {
            name: 'wood',
            amount: 1000,
        },
        {
            name: "food",
            amount: 1000,
        },
        {
            name: "gems",
            amount: 1,
        },
    ],
    },
    {
    name: 'crafting hut',
    requirements: {
        have: {
            buildings: [
                { name: 'farm', level: 10 },
                { name: 'quarry', level: 10 },
                { name: 'lumber yard', level: 10 },
                { name: 'kitchen', level: 5 },
            ],
        }
    },
    color: 'grey',
    costs: [
        {
            name: 'stone',
            amount: 1000,
        },
        {
            name: 'wood',
            amount: 1000,
        },
        {
            name: 'metal',
            amount: 1000,
        },
        {
            name: 'gems',
            amount: 10,
        },
        {
            name: 'paper',
            amount: 100,
        }
    ],
    },
    {
        name: 'theatre',
        requirements: {
            have: {
                buildings: [
                    { name: 'crafting hut', level: 5 },
                ],
            }
        },
        color: 'grey',
        costs: [
            {
                name: 'stone',
                amount: 2000,
            },
            {
                name: 'wood',
                amount: 1000,
            },
            {
                name: 'metal',
                amount: 1000,
            },
            {
                name: 'gems',
                amount: 50,
            },
            {
                name: 'paper',
                amount: 1000,
            }
        ],
    },
]