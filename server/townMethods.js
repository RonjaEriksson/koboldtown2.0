import { check } from 'meteor/check';
import { TownCollection } from '../imports/api/TownCollection';
import {KoboldCollection } from '../imports/api/KoboldCollection'
import {ResourceCollection } from '../imports/api/ResourceCollection'
import { Random } from 'meteor/random'
import { ExpeditionCollection } from '../imports/api/ExpeditionCollection';
import { SkillCollection } from '../imports/api/SkillCollection';
import { koboldName } from './koboldNames';
import { JobCollection } from '../imports/api/JobCollection';
import { BuildingCollection } from '../imports/api/BuildingCollection';

const LEVEL_ONE_STAT_TOTAL = 5;
const UPDATE_INTERVAL = 100;

function expeditionWait(wait) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('resolved');
    }, wait);
  });
}

async function doExpedition(expo, thisUserId) {
    if (!expo) {
        return;
    }

    if (!expo.result) {
        TownCollection.update({ userId: thisUserId }, { $pull: { expeditions: { id: expo.id } } });
        for (koboldId of expo.koboldIds) {
            console.log(koboldId);
            Meteor.call('setKoboldBusy', koboldId, false);
        }
    }
    
    const wait = expo.finishes - +Date.now()
    if (wait > 0) {
        const result = await expeditionWait(wait);
    }
    let infoText = expo.result.text;
    if (expo.result.reward.length) {
        infoText += " (Found ";
    }
    const town = TownCollection.find({ userId: thisUserId }, { projection: { resources: 1, culture: 1, } }).fetch()[0];
    for (reward of expo.result.reward) {
        infoText += reward.amount + " " + reward.name + ", ";
        const resource = town.resources.find(e => e.name === reward.name)
        if (resource) {
            resource.stockpile += reward.amount;
            resource.visible = true;
        } else {
            const sourceResource = ResourceCollection.find({}).fetch().find(e => e.name === reward.name);
            sourceResource.stockpile += reward.amount;
            sourceResource.visible = true;
            town.resources.push(sourceResource);
        }
    }
    
    if (expo.result.reward.length) {
        infoText = infoText.slice(0, -2);
        infoText += ".";
    }
    
    for (effect of expo.result.effect || []) {
        switch (effect.name) {
            case 'Add kobold':
                Meteor.call('addWanderingKobold', thisUserId);
                break;
            case 'Add skill':
                console.log("adding skill");
                console.log(effect.skill);
                for (koboldId of expo.koboldIds) { 
                    Meteor.call('increaseSkill', koboldId, effect.skill, effect.increase);
                }
                break;
            case 'Add friendship':
                console.log("adding friendship");
                console.log(effect.points);
                break;
            case 'Add culture':
                console.log("adding culture");
                console.log(effect.increase);
                town.culture++;
                break;
        }
    }

    if (expo.result.reward.length) {
        infoText += ")";
    }
    const notice = {
        text: infoText,
        dismissed: false,
        time: Date.now(),
        id: Random.id(),
    } 
    let returnText = "(";
    const kobolds = KoboldCollection.find({ _id: { $in: expo.koboldIds } }).fetch();
    returnText += kobolds[0].name;
    for (let i = 1; i < kobolds.length - 1; i++) {
        returnText += ", " + kobolds[i].name;
    }
    if (kobolds.length > 1) {
        returnText += " and " + kobolds[kobolds.length - 1].name;
    }
    returnText += " has returned from the expedition.)"

    const returnNotice = {
        text: infoText + " " + returnText,
        dismissed: false,
        time: Date.now(),
        id: Random.id(),
    }
    
    let notices = [returnNotice];
    TownCollection.update({ userId: thisUserId }, { $set: { resources: town.resources, culture: town.culture, }, $addToSet: { notices: { $each: notices } } });
    TownCollection.update({ userId: thisUserId }, { $pull: { expeditions: { id: expo.id } } });
    for (koboldId of expo.koboldIds) {
        console.log(koboldId);
        Meteor.call('setKoboldBusy', koboldId, false);
    }
}

function getRandomArrayIndex(arrayLength) {
    return Math.floor(Math.random() * +arrayLength);
};

function rollD20() {
    return Math.ceil(Math.random() * 20);
};

function generateRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return {
        r,
        g,
        b,
    };
}

function generateStatsFromColor(color, statTotal) {

    const statMap = {
        'r': "physical",
        'g': "social",
        'b': "mental",
    };

    const colorValues = Object.keys(color || {});

    colorValues.sort((a,b) => color[b] - color[a]);

    const values = {
        highestValue: { value: colorValues[0], amount: color[colorValues[0]] },
        middleValue: { value: colorValues[1], amount: color[colorValues[1]] },
        lowestValue: { value: colorValues[2], amount: color[colorValues[2]] },
        };

    const totalAmount = values.highestValue.amount + values.middleValue.amount + values.lowestValue.amount;

    let highRatio = 0.33;
    let midRatio = 0.33;
    let lowRatio = 0.33;
    if (!(totalAmount === 0)) {
        highRatio = values.highestValue.amount/totalAmount;
        midRatio = values.middleValue.amount/totalAmount;
        lowRatio = values.lowestValue.amount/totalAmount;
    }

    const stats = {};

    let highestStat = Math.ceil(highRatio * statTotal);
    let middleStat = Math.round(midRatio* statTotal);
    let lowestStat = Math.round(lowRatio*statTotal);

    stats[statMap[values.highestValue.value]] = highestStat;
    stats[statMap[values.middleValue.value]] = middleStat;
    stats[statMap[values.lowestValue.value]] = lowestStat;

    return stats;
}

function koboldTextColor(r, g, b) {
    const totalColor = r + g + b;
    if (totalColor > 400 || g > 200) {
        return 'black';
    } else {
        return 'white';
    }
}

Meteor.methods({
    'initTown'(thisUserId) {
        check(thisUserId, String);

        let currentTownId = TownCollection.find({ userId: thisUserId }).fetch()[0]?._id;
        if (!currentTownId) {
            const kobolds = [];
            for (let i = 0; i < 3; i++) {
                const color = generateRandomColor();

                let highestValue = 0;
                for (const value of Object.values(color)) {
                    highestValue = value > highestValue ? value : highestValue;
                }
                highestValue = (highestValue + 50) < 255 ? highestValue + 50 : 255;

                if (i === 0) {
                    color.r = highestValue;
                } else if (i === 1) {
                    color.g = highestValue;
                } else if (i === 2) {
                    color.b = highestValue;
                }

                const stats = generateStatsFromColor(color, LEVEL_ONE_STAT_TOTAL);

                const kobold = {
                    name: koboldName(),
                    userId: thisUserId,
                    color: `rgb(${color.r}, ${color.g}, ${color.b})`,
                    level: 1,
                    r: color.r,
                    g: color.g,
                    b: color.b,
                    physical: stats.physical,
                    mental: stats.mental,
                    social: stats.social,
                    textColor: koboldTextColor(color.r, color.g, color.b),
                };
                kobolds.push(kobold);
            }


            const welcomeNotice = {
                text: "Welcome to your brand new kobold town. Under your leadership I am sure that it will flourish.",
                dismissed: false,
                time: Date.now(),
                id: Random.id(),
            }

            const town = {
                userId: thisUserId,
                townName: "Kobold Ville",
                dragonName: "RymdensRegent",
                resources: ResourceCollection.find({}).fetch(),
                level: 0,
                culture: 0,
                notices: [welcomeNotice],
                resourceGain: {
                    wood: 0,
                    stone: 0,
                    food: 0,
                },
                updateInterval: UPDATE_INTERVAL,
            };
            TownCollection.insert(town);
            //KoboldCollection.insertMany(kobolds); //try this
            for (const kobold of kobolds) {
                KoboldCollection.insert(kobold);
            }
        }
        
        
    },
    'addWanderingKobold'(thisUserId) {
        check(thisUserId, String);

        let currentTownId = TownCollection.find({ userId: thisUserId }).fetch()[0]?._id;
        if (!currentTownId) {
            console.error("Found no town to add Kobold to.");
            return;
        }
        const level = 3;
        const color = generateRandomColor();
        const stats = generateStatsFromColor(color, LEVEL_ONE_STAT_TOTAL + level);

        const kobold = {
            name: koboldName(),
            userId: thisUserId,
            color: `rgb(${color.r}, ${color.g}, ${color.b})`,
            level: level,
            r: color.r,
            g: color.g,
            b: color.b,
            physical: stats.physical,
            mental: stats.mental,
            social: stats.social,
            textColor: koboldTextColor(color.r, color.g, color.b),
        };
        console.log("added wandering kobold");
        const arrivalNotice = {
            text: kobold.name + " has joined your town.",
            dismissed: false,
            time: Date.now(),
            id: Random.id(),
        }
        TownCollection.update({ userId:thisUserId }, { $addToSet: {notices: arrivalNotice}})
        KoboldCollection.insert(kobold);
    },
    'mateKobolds'(thisUserId, motherKoboldId, fatherKoboldId) {
        check(thisUserId, String)
        check(motherKoboldId, String);
        check(fatherKoboldId, String);

        const mutationTreshhold = 15;

        let kobolds = KoboldCollection.find({ userId: thisUserId }).fetch();
        if (!kobolds) {
            console.error("Found no kobolds in selected town.");
            return;
        }

        let motherKobold = kobolds.find( e => e._id === motherKoboldId);
        let fatherKobold = kobolds.find(e => e._id === fatherKoboldId);

        if (!motherKobold || !fatherKobold) {
            console.error("Did not find both parent kobolds.")
            return;
        }

        rGenes = [motherKobold.r, fatherKobold.r, Math.round((motherKobold.r + fatherKobold.r) / 2), Math.round((motherKobold.r + motherKobold.r + fatherKobold.r) / 3), Math.round((motherKobold.r + fatherKobold.r + fatherKobold.r) / 3)];
        gGenes = [motherKobold.g, fatherKobold.g, Math.round((motherKobold.g + fatherKobold.g) / 2), Math.round((motherKobold.g + motherKobold.g + fatherKobold.g) / 3), Math.round((motherKobold.g + fatherKobold.g + fatherKobold.g) / 3)];
        bGenes = [motherKobold.b, fatherKobold.b, Math.round((motherKobold.b + fatherKobold.b) / 2), Math.round((motherKobold.b + motherKobold.b + fatherKobold.b) / 3), Math.round((motherKobold.b + fatherKobold.b + fatherKobold.b) / 3)];

        color = {
            r: rGenes[getRandomArrayIndex(rGenes.length)],
            g: gGenes[getRandomArrayIndex(gGenes.length)],
            b: bGenes[getRandomArrayIndex(bGenes.length)],
        }

        const mutationRoll = Math.ceil(20*Math.random());

        if (mutationRoll >= mutationTreshhold) {
            const mutatingColor = Object.keys(color)[getRandomArrayIndex(Object.keys(color).length)];
            color[mutatingColor] = Math.round((Math.floor(Math.random()*256) + color[mutatingColor])/2);
        }

        const stats = generateStatsFromColor(color, LEVEL_ONE_STAT_TOTAL);
        const kobold = {
            name: koboldName(),
            userId: thisUserId,
            color: `rgb(${color.r}, ${color.g}, ${color.b})`,
            level: 1,
            r: color.r,
            g: color.g,
            b: color.b,
            physical: stats.physical,
            mental: stats.mental,
            social: stats.social,
            textColor: koboldTextColor(color.r, color.g, color.b),
        }
        const birthNotice = {
            text: "A new kobold steps out of the egg and says their name is " + kobold.name + ".",
            dismissed: false,
            time: Date.now(),
            id: Random.id(),
        }
        const town = TownCollection.findOne({ userId: thisUserId });
        const eggs = town.resources.find(e => e.name === eggs);
        if (!eggs) {
            console.error("No egg to create kobold from.");
            return;
        }
        eggs.stockpile--;
        TownCollection.update({ userId: thisUserId }, { $addToSet: { notices: birthNotice } }, { $set: { resources: town.resources } });
        KoboldCollection.insert(kobold);
    },
    'increaseSkill'(koboldId, skillName, exp) {
        check(koboldId, String);
        check(skillName, String);
        check(exp, Number);
        const kobold = KoboldCollection.find(koboldId).fetch()[0]; //add projection here
        const sourceSkill = SkillCollection.find({ name: skillName }).fetch()[0];
        let skillText = "";
        let levelText = "";
        if (!kobold) {
            console.error("Did not find kobold");
            return;
        }
        if (!kobold.skills) {
            kobold.skills = {};
        }
        if (!kobold.skills[skillName]) {
            kobold.skills[skillName] = {
                exp: 0,
                level: 0,
                color: sourceSkill.color,
            };
        }
        let leveled = false;
        const skill = kobold.skills[skillName];
        skill.exp += exp;
        while (skill.exp > (skill.level +1) * (skill.level +1) * 1000) {
            skill.level++;
            skillText = kobold.name + " has reached level " + skill.level + " in " + skillName + "."; 
            leveled = true;
        }
        kobold.exp = kobold.exp ? kobold.exp : 0;
        kobold.level = kobold.level ? kobold.level : 0;
        kobold.exp += exp;
        while (kobold.exp > kobold.level * kobold.level * 10000) {
            kobold.level++;
            color = {
                r: kobold.r,
                g: kobold.g,
                b: kobold.b,
            }
            const stats = generateStatsFromColor(color, LEVEL_ONE_STAT_TOTAL+kobold.level -1);
            kobold.physical = stats.physical;
            kobold.mental = stats.mental;
            kobold.social = stats.social;
            leveled = true;
            levelText += kobold.name + " has reached level " + kobold.level + ".";
        }
        noticeText = "";
        if (skillText) {
            noticeText += skillText;
        } if (levelText) {
            if (noticeText) {
                noticeText += " ";
            }
            noticeText += levelText;
        }
        const notice = {
            text: noticeText,
            dismissed: false,
            time: Date.now(),
            id: Random.id(),
        } 
        KoboldCollection.update(koboldId, { $set: { skills: kobold.skills, level: kobold.level, exp: kobold.exp, physical: kobold.physical, mental: kobold.mental, social: kobold.social } });
        if (notice.text) {
            TownCollection.update({ userId: kobold.userId }, { $addToSet: { notices: notice } });
        }
        if (kobold.job && leveled) {
            const job = kobold.job;
            Meteor.call('assignJob', kobold.userId, kobold._id, job, false);
            Meteor.call('assignJob', kobold.userId, kobold._id, job, true);
        }

    },
    'increaseResource'(thisUserId) {
        check(thisUserId, String);

        const town = TownCollection.find({ userId: thisUserId }, { projection: { resources: 1, jobs: 1, updateInterval: 1, } }).fetch()[0];
        const jobs = JobCollection.find({}).fetch();
        if(!town) {
            console.error("Found no town to update resources for.");
            return;
        }
        if (!town.updateInterval) {
            town.updateInterval = UPDATE_INTERVAL;
        }
        const resourceGain = {};
        const kobolds = KoboldCollection.find({ userId: thisUserId }).fetch();
        for (const kobold of kobolds) {
            if (kobold.job) {
                const bases = kobold.job.gains.filter(e => e.gain < 0);
                let baseAvailable = true;
                for (const base of bases) {
                    if (!(town.resources.find(e => e.name === base.name)) || (town.resources.find(e => e.name === base.name).stockpile  + base.gain*town.updateInterval) < 0) {
                        baseAvailable = false;
                    } else {
                        if (resourceGain[base.name] === undefined) {
                            resourceGain[base.name] = 0;
                        }
                        //resourceGain[base.name] += kobold.job.gains.find(e => e.name === base.name).gain* town.updateInterval;
                    }
                }
                if (!bases || baseAvailable) {
                    for (resource of kobold.job.gains) {
                        if (resourceGain[resource.name] === undefined) {
                            resourceGain[resource.name] = 0;
                        }
                        const townResource = town.resources.find(e => resource.name === e.name);
                        townResource.stockpile += resource.gain*town.updateInterval;
                        resourceGain[resource.name] += resource.gain*town.updateInterval;
                        if (townResource.stockpile < 0) {
                            townResource.stockpile = 0;
                        }
                    }
                    const job = jobs.find(e => e.name === kobold.job.name)
                    for (const skill of job.skillGains) {
                        Meteor.call('increaseSkill', kobold._id, skill.name, skill.gain*town.updateInterval);
                    }
                }

            }
        }



        TownCollection.update({ userId: thisUserId }, { $set: { resources: town.resources, resourceGain: resourceGain, updateInterval: town.updateInterval } })
    },
    'assignJob'(thisUserId, koboldId, job, starting) {
        check(thisUserId, String);
        check(koboldId, String);
        check(job, { name: String, gains: Array});
        check(starting, Boolean);

        const town = TownCollection.findOne({ userId: thisUserId }, { projection: {resources: 1, resourceGain: 1, updateInterval: 1}});
        const kobold = KoboldCollection.findOne(koboldId);
        const sourceJob = JobCollection.findOne({ name: job.name });
        if (!kobold) {
            console.error("Did not find selected kobold.");
            return;
        }
       if(!sourceJob) {
           console.error("Did not find chosen job.");
           return;
        }
        if (!town) {
            console.error("Did not find chosen town.")
            return;
        }
        if (!town.updateInterval) {
            town.updateInterval = UPDATE_INTERVAL;
        }

        job = starting ? { name: job.name, gains: [] } : job;

        for(const resourceName of Object.keys(sourceJob.production)) {
            let resource = town.resources.find(e => e.name === resourceName);
            const sourceResource = ResourceCollection.find({}).fetch().find(e => e.name === resourceName);
            if (!resource) {
                sourceResource.visible = true;
                town.resources.push(sourceResource);
                resource = town.resources.find(e => e.name === resourceName);
            }
            if (!resource.visible) {
                resource.visible = true;
            }
            if (!resource.color != sourceResource.color) {
                resource.color = sourceResource.color;
            }
            if (starting) {
                const gain = {
                    name: resourceName,
                    gain: sourceJob.production[resourceName],
                };
                if (gain.gain >= 0) {
                    gain.gain += kobold[sourceJob.baseStat];
                    for (const skill of sourceJob.relevantSkills) {
                        gain.gain += (kobold?.skills?.[skill]?.level || 0);
                        if (sourceJob.levelScaling) {
                            gain.gain += Math.floor((kobold?.skills?.[skill]?.level || 0)**1.1);
                        }
                    }
                }
                if (sourceJob["max production"]?.[resourceName] && gain.gain > sourceJob["max production"][resourceName]) {
                    gain.gain = sourceJob["max production"][resourceName];

                }
                job.gains.push(gain);
            }
        }
        for (const gain of job.gains) {
            if (!town.resourceGain[gain.name]) {
                town.resourceGain[gain.name] = 0;
            }
            if (starting) {
                town.resourceGain[gain.name] += gain.gain * town.updateInterval;
            } else {
                town.resourceGain[gain.name] -= gain.gain * town.updateInterval;
            }

        }

        if (!starting) {
            job = null;
        }

        TownCollection.update({ userId: thisUserId }, { $set: { resources: town.resources, resourceGain: town.resourceGain, updateInterval: town.updateInterval} });
        KoboldCollection.update(koboldId, { $set: { job: job } });
    },
    'addExpedition'(thisUserId, expeditionId, koboldIds) {
        check(thisUserId, String);
        check(expeditionId, String);
        check(koboldIds, [String]);
        const expedition = ExpeditionCollection.findOne(expeditionId);
        if (!expedition) {
            return;
        }
        const expo = {
            finishes: +Date.now() + expedition.length,
            userId: thisUserId,
            id: Random.id(),
            koboldIds: koboldIds,
        }
        const kobolds = KoboldCollection.find({ _id: { $in: koboldIds}}).fetch();
        let checksPassed = 0;
        let checksCritPassed = 0;
        for (const skillcheck of expedition.skillchecks) {
            console.log(skillcheck.skill);
            const baseSkill = SkillCollection.findOne({ name: skillcheck.skill }).base;
            console.log(baseSkill);
            let totalSkill = 0;
            for (const kobold of kobolds) { 
                totalSkill += kobold[baseSkill] || 0;
                totalSkill += kobold?.skills?.[skillcheck.skill]?.level || 0;
            }
            const baseRoll = rollD20();
            console.log(baseRoll);
            const roll = baseRoll + totalSkill;
            console.log(roll);
            if (roll > skillcheck.difficulty) {
                checksPassed++;
            }
            if (roll > skillcheck.difficulty + 10) {
                checksCritPassed++;
            }
        }
        if (checksPassed === expedition.skillchecks.length) {
            if (checksCritPassed >= expedition.skillchecks.length / 2) {
                console.log("generating a great result");
                expo.result = expedition.greatOutcomes[getRandomArrayIndex(expedition.greatOutcomes.length)];
                console.log(expo.result);
            } else {
                console.log("generating a good result");
                expo.result = expedition.goodOutcomes[getRandomArrayIndex(expedition.goodOutcomes.length)];
                console.log(expo.result);
            }
        } else {
            console.log("generating a bad result");
            expo.result = expedition.badOutcomes[getRandomArrayIndex(expedition.badOutcomes.length)];
            console.log(expo.result);
        }
        for (kobold of kobolds) {
            console.log(kobold.job);
            if (kobold.job) {
                Meteor.call('assignJob',thisUserId, kobold._id, kobold.job, false);
            }
            Meteor.call('setKoboldBusy', kobold._id, true);
        }
        doExpedition(expo, thisUserId);

        let infoText = expedition.startTexts[getRandomArrayIndex(expedition.startTexts.length)] + " (";
        infoText += kobolds[0].name;
        for (let i = 1; i < kobolds.length - 1; i++) {
            infoText += ", " + kobolds[i].name;
        }
        if (kobolds.length > 1) {
            infoText += " and " + kobolds[kobolds.length - 1].name;
        } 
        let time = expedition.length / 60000;
        let minutes = " minutes"
        if (time === 1) {
            minutes = " minute";
        }
        infoText += " has left the den. They will be back in " + time + minutes + ".)";
        
        const notice = {
            text: infoText,
            dismissed: false,
            time: Date.now(),
            id: Random.id(),
        }

        const town = TownCollection.find({ userId: thisUserId }, { projection: { resources: 1, } }).fetch()[0];
        for (const cost of expedition.costs) {
            const resource = town.resources.find(e => e.name === cost.name);
            if (!resource) {
                console.error("Expedition cost resource not found");
                return;
            }
            resource.stockpile -= cost.amount;
        }
        console.log(expo);
        TownCollection.update({ userId: thisUserId }, { $addToSet: { expeditions: expo, notices: notice }, $set: { resources: town.resources }});
    },
    'handleExpeditions'(thisUserId) {
        check(thisUserId, String);
        const town = TownCollection.find({ userId: thisUserId }, { projection: { expeditions: 1, kobolds: 1 } }).fetch()[0];
        if (town.expeditions) {
            for (const expo of town.expeditions) {
                console.log(expo);
                doExpedition(expo, thisUserId);
            }
        }
    },
    'setKoboldBusy'(koboldId, busy) {
        check(koboldId, String);
        check(busy, Boolean);
        KoboldCollection.update({ _id: koboldId}, { $set: { busy: busy } });
    },
    'build'(thisUserId, buildingId) {
        check(thisUserId, String);
        check(buildingId, String);
        const town = TownCollection.find({ userId: thisUserId }, { projection: { buildings: 1 , resources: 1, level: 1,} }).fetch()[0];
        const building = BuildingCollection.find(buildingId).fetch()[0];
        let townBuilding = town.buildings?.find(e => e.name === building.name);
        if (!town.buildings) {
            town.buildings = [];
        }
        if (!townBuilding) {
            townBuilding = {
                name: building.name,
                level: 0,
            };
            town.buildings.push(townBuilding);
            townBuilding = town.buildings?.find(e => e.name === building.name);
        }
        
        const costMultiplier = townBuilding.level + 1;
        for (cost of building.costs) {
            const resource = town.resources.find(e => e.name === cost.name);
            const realCost = cost.amount * costMultiplier;
            resource.stockpile -= realCost;
            if (resource.stockpile < 0) {
                console.error("Funds for building not found.")
                return;
            }
        }
        townBuilding.level++; 
        if (!town.level) {
            town.level = 0;
        }
        town.level++;
        TownCollection.update({userId: thisUserId }, { $set: { buildings: town.buildings, resources: town.resources, level: town.level } });
    },
    'dismissNotice'(thisUserId, noticeId) {
        check(thisUserId, String);
        check(noticeId, String);
        const town = TownCollection.find({ userId: thisUserId }, { projection: { notices: 1 } }).fetch()[0];
        const notice = town.notices?.find(e => e.id === noticeId);
        notice.dismissed = true;
        TownCollection.update({ userId: thisUserId }, { $set: { notices: town.notices } });
    },
    'dismissAllNotices'(thisUserId) {
        check(thisUserId, String);
        TownCollection.update({ userId: thisUserId }, { $set: { notices: [] } });
    }

});