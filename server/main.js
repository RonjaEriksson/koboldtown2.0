import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random'
import { TownCollection } from '../imports/api/TownCollection';
import { KoboldCollection } from '/imports/api/KoboldCollection';
import { ExpeditionCollection } from '/imports/api/ExpeditionCollection';
import { SkillCollection } from '/imports/api/SkillCollection';
import { ResourceCollection } from '/imports/api/ResourceCollection';
import './townMethods';
import { skills } from './db/skills'
import { expos } from './db/expos'
Meteor.publish("town", function () {
    return TownCollection.find();
});
Meteor.publish("expedition", function () {
    return ExpeditionCollection.find();
});
/*
Meteor.publish("skill", function () {
    return SkillCollection.find();
});
*/
Meteor.publish("kobold", function () {
    return KoboldCollection.find();
});
function getRandomArrayIndex(arrayLength) {
    return Math.floor(Math.random() * +arrayLength);
};



const resources = [
    {
        name: "stone",
        stockpile: 0,
        visible: true,
        gain: 0,
        color: "gray",
    },
    {
        name: "wood",
        stockpile: 0,
        visible: true,
        gain: 0,
        color: "brown",
    },
    {
        name: "food",
        stockpile: 0,
        visible: true,
        gain: 0,
        color: "green",
    },
    {
        name: "seeds",
        stockpile: 0,
        visible: false,
        gain: 0,
        color: "chocolate",
    },
    {
        name: "gems",
        stockpile: 0,
        visible: false,
        gain: 0,
        color: "white",
    },
]


Meteor.startup(() => {
    //ExpeditionCollection.remove({}); //uncomment this when loading in the expedition collection from plaintext
    /*
    if (ExpeditionCollection.find().count() === 0) {
        for (const expo of expos) {
            ExpeditionCollection.insert(expo);
        }
    }
    */
    for (const expo of expos) {
        ExpeditionCollection.update({ name: expo.name }, { $setOnInsert: { expo } }, { upsert: true });
    }

    SkillCollection.remove({}); //uncomment this when loading in the skill collection from plaintext
    if (SkillCollection.find().count() === 0) {
        for (const skill of skills) {
            SkillCollection.insert(skill);
        }
    }

    //ResourceCollection.remove({}); //uncomment this when loading in the recource collection from plaintext
    if (ResourceCollection.find().count() === 0) {
        for (const resource of resources) {
            ResourceCollection.insert(resource);
        }
    }
    const townUserIds = TownCollection.find({}, { projection: { userId: 1 } }).fetch().map(e => e.userId);
    for (townUserId of townUserIds) {
        Meteor.call('handleExpeditions', townUserId);
    }
    //KoboldCollection.remove({});
});
