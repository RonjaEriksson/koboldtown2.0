import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random'
import { TownCollection } from '../imports/api/TownCollection';
import { KoboldCollection } from '/imports/api/KoboldCollection';
import { ExpeditionCollection } from '/imports/api/ExpeditionCollection';
import { SkillCollection } from '/imports/api/SkillCollection';
import { ResourceCollection } from '/imports/api/ResourceCollection';
import { JobCollection } from '../imports/api/JobCollection';
import { BuildingCollection } from '../imports/api/BuildingCollection';
import './townMethods';
import { skills } from './db/skills'
import { expos } from './db/expos'
import { resources } from './db/resources'
import { jobs } from './db/jobs'
import {buildings } from './db/buildings'


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

Meteor.publish("building", function () {
    return BuildingCollection.find();
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

   //ResourceCollection.remove({}); //uncomment this when loading in the recource collection from plaintext
    for (const resource of resources) {
        ResourceCollection.update({ name: resource.name }, { $set: resource }, { upsert: true });
    }

    for (const job of jobs) {

        JobCollection.update({ name: job.name }, { $set: job }, { upsert: true });
    }

    for (const building of buildings) {

        BuildingCollection.update({ name: building.name }, { $set: building }, { upsert: true });
    }
    //is this what makes startup slow? 
    
    const towns = TownCollection.find({}, { projection: { userId: 1, expeditions: 1 } }).fetch();
    for (town of towns) {
        if (town?.expediditions?.length) {
            Meteor.call('handleExpeditions', town.userId);
        }
    }
    //KoboldCollection.remove({});
});
