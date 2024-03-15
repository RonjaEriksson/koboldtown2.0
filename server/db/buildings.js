export const buildings = [
    {
        name: 'farm',
        requirements: {},
        color: 'green',
        costs: [
            {
                name: 'seeds',
                amount: 10,
            },
            {
                name: "wood",
                amount: 500,
            },
            {
                name: "stone",
                amount: 500,
            } 

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
]