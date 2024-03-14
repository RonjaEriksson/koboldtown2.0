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
import { resources } from './db/resources'
import { jobs } from './db/jobs'
import { JobCollection } from '../imports/api/JobCollection';

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

Meteor.publish("job", function () {
    return JobCollection.find();
});
function getRandomArrayIndex(arrayLength) {
    return Math.floor(Math.random() * +arrayLength);
};

Meteor.startup(() => {
    //ExpeditionCollection.remove({}); //uncomment this when loading in the expedition collection from plaintext
    for (const expo of expos) {
        ExpeditionCollection.update({ name: expo.name }, { $set: expo }, { upsert: true });
    }

   //SkillCollection.remove({}); //uncomment this when loading in the skill collection from plaintext
    for (const skill of skills) {
        SkillCollection.update({ name: skill.name }, { $set: skill }, { upsert: true });
    }

   // ResourceCollection.remove({}); //uncomment this when loading in the recource collection from plaintext
    for (const resource of resources) {
        ResourceCollection.update({ name: resource.name }, { $set: resource }, { upsert: true });
    }

    for (const job of jobs) {

        JobCollection.update({ name: job.name }, { $set: job }, { upsert: true });
    }
    const townUserIds = TownCollection.find({}, { projection: { userId: 1 } }).fetch().map(e => e.userId);
    for (townUserId of townUserIds) {
        Meteor.call('handleExpeditions', townUserId);
    }
    //KoboldCollection.remove({});
});
