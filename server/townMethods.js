import { check } from 'meteor/check';
import { TownCollection } from '../imports/api/TownCollection';
import {KoboldCollection } from '../imports/api/KoboldCollection'
import {ResourceCollection } from '../imports/api/ResourceCollection'
import { Random } from 'meteor/random'
import { ExpeditionCollection } from '../imports/api/ExpeditionCollection';
import { SkillCollection } from '../imports/api/SkillCollection';
import { koboldName } from './koboldNames';
import { JobCollection } from '../imports/api/JobCollection';

const LEVEL_ONE_STAT_TOTAL = 5;

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
    const wait = expo.finishes - +Date.now()
    if (wait > 0) {
        const result = await expeditionWait(wait);
    }
    const town = TownCollection.find({ userId: thisUserId }, { projection: { resources: 1 } }).fetch()[0];
    for (reward of expo.result.reward) {
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
        }
    }
    const notice = {
        text: expo.result.text,
        dismissed: false,
        time: Date.now(),
        id: Random.id(),
    } 
    TownCollection.update({ userId: thisUserId }, { $set: { resources: town.resources }, $addToSet: { notices: notice } });
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

            const redStats = generateStatsFromColor(
                {
                    r: 255,
                    g: 0,
                    b: 0,
                }, LEVEL_ONE_STAT_TOTAL);
            
            const greenStats = generateStatsFromColor(
                {
                    r: 0,
                    g: 255,
                    b: 0,
                }, LEVEL_ONE_STAT_TOTAL);

            const blueStats = generateStatsFromColor(
                {
                    r: 0,
                    g: 0,
                    b: 255,
                },LEVEL_ONE_STAT_TOTAL);

            const kobolds = [
                {
                    name: koboldName(),
                    userId: thisUserId,
                    color: `rgb(${255}, ${0}, ${0})`,
                    r: 255,
                    g: 0,
                    b: 0,
                    physical: redStats.physical,
                    mental: redStats.mental,
                    social: redStats.social,
                    textColor: koboldTextColor(255, 0, 0),
                },
                {
                    name: koboldName(),
                    userId: thisUserId,
                    color: `rgb(${0}, ${255}, ${0})`,
                    r: 0,
                    g: 255,
                    b: 0,
                    physical: greenStats.physical,
                    mental: greenStats.mental,
                    social: greenStats.social,
                    textColor: koboldTextColor(0, 255, 0),
                },
                {
                    name: koboldName(),
                    userId: thisUserId,
                    color: `rgb(${0}, ${0}, ${255})`,
                    r: 0,
                    g: 0,
                    b: 255,
                    physical: blueStats.physical,
                    mental: blueStats.mental,
                    social: blueStats.social,
                    textColor: koboldTextColor(0, 0, 255),
                },

            ];

            const town = {
                userId: thisUserId,
                townName: "Kobold Ville",
                dragonName: "RymdensRegent",
                resources: ResourceCollection.find({}).fetch(),
                jobs: [],
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

        rGenes = [motherKobold.r, fatherKobold.r, Math.round((motherKobold.r+fatherKobold.r)/2)];
        gGenes = [motherKobold.g, fatherKobold.g,Math.round((motherKobold.g+fatherKobold.g)/2)];
        bGenes = [motherKobold.b, fatherKobold.b, Math.round((motherKobold.b+fatherKobold.b)/2)];

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
            r: color.r,
            g: color.g,
            b: color.b,
            physical: stats.physical,
            mental: stats.mental,
            social: stats.social,
            textColor: koboldTextColor(color.r, color.g, color.b),
        }
        KoboldCollection.insert(kobold);
    },
    'increaseSkill'(koboldId, skillName, exp) {
        check(koboldId, String);
        check(skillName, String);
        check(exp, Number);
        const kobold = KoboldCollection.find(koboldId).fetch()[0]; //add projection here
        const sourceSkill = SkillCollection.find({ name: skillName }).fetch()[0];
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
        const skill = kobold.skills[skillName];
        skill.exp += exp;
        if (exp > skill.level* skill.level * 1000) {
            skill.level++;
        }
        kobold.exp = kobold.exp ? kobold.exp : 0;
        kobold.level = kobold.level ? kobold.level : 0;
        kobold.exp += exp;
        if (exp > kobold.level * kobold.level * 10000) {
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
        }
        KoboldCollection.update(koboldId, { $set: { skills: kobold.skills, level: kobold.level, exp: kobold.exp, physical: kobold.physical, mental: kobold.mental, social: kobold.social } });

    },
    'increaseResource'(thisUserId) {
        check(thisUserId, String);

        const townResources = TownCollection.find({userId:thisUserId}, {projection: {resources: 1, jobs: 1}}).fetch()[0]?.resources;
        if(!townResources) {
            console.error("Found no town to update resources for.");
            return;
        }
        for (const resource of townResources) {
            resource.stockpile += resource.gain;
        }

        TownCollection.update({userId: thisUserId}, {$set:{resources: townResources}})
    },

    'assignJob'(thisUserId, koboldId, jobName, starting) {
        check(thisUserId, String);
        check(koboldId, String);
        check(jobName, String);
        check(starting, Boolean);

        const town = TownCollection.findOne({ userId: thisUserId }, { projection: {resources: 1, jobs: 1,}});
        const kobold = KoboldCollection.findOne(koboldId);
        const job = JobCollection.findOne({ name: jobName });
        if (!kobold) {
            console.error("Did not find selected kobold.");
            return;
        }
       if(!job) {
           console.error("Did not find chosen job.");
           return;
        }
        if (!town) {
            console.error("Did not find chosen town.")
            return;
        }
        const townJob = town.jobs.find(e => e.name === jobName);
        if (!townJob) {
            town.jobs.push({
                name: jobName,
                spotsOpen: job.spotsOpen,
            })
        }
        jobName = starting ? jobName : null;

        for(const resourceName of job.resources) {
            const resource = town.resources.find(e => e.name === resourceName);
            if(starting) {
                resource.gain += job.production[resourceName];
            } else {
                resource.gain -= job.production[resourceName];
            }
        }
        if(townJob.spotsOpen != "unlimited") {
            if(starting) {
                townJob.spotsOpen--;
            } else {
                townJob.spotsOpen++;
            }
        }

        TownCollection.update({ userId: thisUserId }, { $set: { resources: town.resources , jobs: town.jobs} });
        KoboldCollection.update(koboldId, { $set: { job: jobName } });
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
        const kobolds = KoboldCollection.find({ _id: { $in: koboldIds}});
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
                expo.result = expedition.greatOutcomes[getRandomArrayIndex(expedition.greatOutcomes.length)];
            } else {
                expo.result = expedition.goodOutcomes[getRandomArrayIndex(expedition.goodOutcomes.length)];
            }
        } else {
            expo.result = expedition.badOutcomes[getRandomArrayIndex(expedition.badOutcomes.length)];
        }
        for (kobold of kobolds) {
            if (kobold.job) {
                Meteor.call('assignJob',thisUserId, kobold._id, kobold.job, false);
            }
            Meteor.call('setKoboldBusy', kobold._id, true);
        }
        doExpedition(expo, thisUserId);
        //add custom text to each expo to show here
        const notice = {
            text: expedition.startTexts[getRandomArrayIndex(expedition.startTexts.length)],
            dismissed: false,
            time: Date.now(),
            id: Random.id(),
        } 
        TownCollection.update({ userId: thisUserId }, { $addToSet: { expeditions: expo, notices: notice}});
    },
    'handleExpeditions'(thisUserId) {
        check(thisUserId, String);
        const town = TownCollection.find({ userId: thisUserId }, { projection: { expeditions: 1, kobolds: 1 } }).fetch()[0];
        if (town.expeditions) {
            for (const expo of town.expeditions) {
                doExpedition(expo, thisUserId);
            }
        }
    },
    'setKoboldBusy'(koboldId, busy) {
        check(koboldId, String);
        check(busy, Boolean);
        KoboldCollection.update({ _id: koboldId}, { $set: { busy: busy } });
    },
    'dismissNotice'(thisUserId, noticeId) {
        check(thisUserId, String);
        check(noticeId, String);
        const town = TownCollection.find({ userId: thisUserId }, { projection: { notices: 1 } }).fetch()[0];
        const notice = town.notices?.find(e => e.id === noticeId);
        notice.dismissed = true;
        TownCollection.update({ userId: thisUserId }, { $set: { notices: town.notices } });
    },

});