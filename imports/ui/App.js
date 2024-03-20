import { Template } from 'meteor/templating';
import { KoboldCollection } from "../api/KoboldCollection";
import { TownCollection } from "../api/TownCollection";
import { Random } from 'meteor/random'
import { ResourceCollection } from "../api/ResourceCollection";
import { ExpeditionCollection } from "../api/ExpeditionCollection";
import './App.html';
import { SkillCollection } from '../api/SkillCollection';
import { JobCollection } from '../api/JobCollection';
import {BuildingCollection } from '../api/BuildingCollection'
function checkReqs(town, items) {
    const validItems = [];
    for (const item of items) {
        const reqs = item.requirements;
        if (!reqs) {
            validItems.push(item);
            continue;
        }
        const buildingReqs = reqs.have?.buildings;
        let valid = true;
        for (const buildingReq of (buildingReqs || [])) {
            const building = town.buildings?.find(e => e.name === buildingReq.name);
            if (!building || !(building.level >= buildingReq.level)) {
                valid = false;
                break;
            }
        }
        const townLevelReq = reqs.have?.['town level'];
        if (townLevelReq && town.level < townLevelReq) { 
            valid = false;
        }
        const notBuildingReqs = reqs.not?.buildings;
        for (const buildingReq of (notBuildingReqs || [])) {
            const building = town.buildings?.find(e => e.name === buildingReq.name);
            if (building && building.level >= buildingReq.level) {
                valid = false;
                break;
            }
        }

        const notTownLevelReq = reqs.not?.['town level'];
        if (notTownLevelReq && town.level >= townLevelReq) {
            valid = false;
        }
        if (valid) {
            validItems.push(item);
        }
    }
    return validItems;
}

Template.mainContainer.onCreated(function () {

    const instance = Template.instance();

    Meteor.subscribe('town');
    Meteor.subscribe("expedition");
    Meteor.subscribe("kobold");
    Meteor.subscribe("job");
    Meteor.subscribe("building");
    instance.currentTown = new ReactiveVar(null);
    instance.kobolds = new ReactiveVar(null);
    //localStorage.setItem("userId", `${Random.id()}`); //uncomment this when you want to reset town
    //Meteor.call('addWanderingKobold', localStorage.getItem("userId")); //test of adding wandering kobold
    instance.autorun(function auto_townId() {
        instance.currentTown.set(TownCollection.findOne({ userId: localStorage.getItem("userId") }));
        if (!instance.currentTown.get()) {
            if (!localStorage.getItem("userId")) {
                localStorage.setItem("userId", `${Random.id()}`);
            }
            Meteor.call("initTown", localStorage.getItem("userId"));
        }
    });
    instance.autorun(function auto_kobolds() {
        instance.kobolds.set(KoboldCollection.find({ userId: localStorage.getItem("userId") }).fetch());
    });

    const checkCompletionInterval = 60000;
    setInterval(function() {
    }, checkCompletionInterval);

    const resourceInterval = 1000;
    setInterval(function () {
        Meteor.call("increaseResource", localStorage.getItem("userId"));
    }, resourceInterval);

    //Meteor.call("handleExpeditions", localStorage.getItem("userId")); (remove this maybe)
});

Template.mainContainer.helpers({
    notReady() {
        const instance = Template.instance();
        return !instance.currentTown.get();
    },
    townName() {
        const instance = Template.instance();
        return instance.currentTown.get()?.townName
    },
    kobolds() {
        const instance = Template.instance();
        return instance.kobolds.get().filter(k => !k.busy);
    },
    resources() {
        const instance = Template.instance();
        return instance.currentTown.get()?.resources?.filter(e => e.visible);
    },
    jobs() {
        const instance = Template.instance();
        const jobs = JobCollection.find().fetch();
        const validJobs = checkReqs(instance.currentTown.get(), jobs);
        return validJobs;
    },
    buildings() {
        const instance = Template.instance();
        const buildings = BuildingCollection.find().fetch();
        const validBuildings = checkReqs(instance.currentTown.get(), buildings);
        return validBuildings;
    },
    expos() {
        const instance = Template.instance();
        const expos = ExpeditionCollection.find({}, { projection: { name: 1, length: 1, skills: 1, color: 1, partySize: 1, costs: 1, description: 1, requirements: 1, } }).fetch();
        const validExpos = checkReqs(instance.currentTown.get(), expos);
        return validExpos;
    },
});

Template.mainContainer.events({
})

Template.showKobold.onCreated(function () {
    const instance = Template.instance();
    instance.showDetails = new ReactiveVar(false);
    instance.currentTown = new ReactiveVar(null);
    instance.kobolds = new ReactiveVar(null);
    instance.breedTarget = new ReactiveVar(null);
    instance.selectedJob = new ReactiveVar(null);

    instance.autorun(function auto_townId() {
        instance.currentTown.set(TownCollection.findOne({ userId: localStorage.getItem("userId") }, { projection: {jobs:1, buildings: 1,}}));
    });

    instance.autorun(function auto_kobolds() {
        instance.kobolds.set(KoboldCollection.find({ userId: localStorage.getItem("userId") }).fetch());
    });
});

Template.showKobold.helpers({
    showDetails() {
        const instance = Template.instance();
        return instance.showDetails.get();
    },
    kobolds() {
        const instance = Template.instance();
        return instance.kobolds.get();
    },
    isCurrentKobold(otherKoboldId) {
        const instance = Template.instance();
        return otherKoboldId === instance.data._id;
    },
    jobs() {
        const instance = Template.instance();
        const jobs = JobCollection.find({}).fetch();
        const validJobs = checkReqs(instance.currentTown.get(), jobs);
        return validJobs.filter(function (job) {
            const townJob = instance.currentTown.get().jobs.find(e => e.name === job.name);
            return !townJob || townJob.spotsOpen > 0 || townJob.spotsOpen === "unlimited";
        });
    },
    isBusy() { 
        const instance = Template.instance();
        return instance.data.busy;
    },
    breedTarget() {
        const instance = Template.instance();
        return instance.kobolds.get()?.find(k => k._id === instance.breedTarget.get());
    },
    selectedJob() {
        const instance = Template.instance();
        return instance.currentTown.get()?.jobs?.find(e => e.name === instance.selectedJob.get());
    },
    skills() {
        const instance = Template.instance();
        return Object.keys(instance.data.skills || {}).map(function (e) { return { name: e, level: instance.data.skills[e].level, color: instance.data.skills[e].color } });
    }
});

Template.showKobold.events({
    "click .js-click-name"(event, instance) {
        instance.showDetails.set(!instance.showDetails.get());
        instance.breedTarget.set(null);
        instance.selectedJob.set(null);
    },
    "click .js-breed"(event, instance) {
        const fatherId = instance.breedTarget.get();
        const motherId = instance.data._id;
        Meteor.call("mateKobolds",localStorage.getItem("userId"), motherId, fatherId);
    },
    "change .js-breed-select"(event, instance) {
        instance.breedTarget.set(event.currentTarget.value);
    },
    "change .js-select-job"(event, instance) {
        instance.selectedJob.set(event.currentTarget.value);
        console.log(event.currentTarget.value);
    },
    "click .js-chose-job"(event, instance) {
        const job = instance.selectedJob.get();
        if (instance.data.job) {
            Meteor.call("assignJob", localStorage.getItem("userId"), instance.data._id, instance.data.job, false);
        }
        console.log(job);
        Meteor.call("assignJob", localStorage.getItem("userId"), instance.data._id, { name: job, gains: [] }, true);
    },
    "click .js-quit-job"(event, instance) {    
        Meteor.call("assignJob",localStorage.getItem("userId"), instance.data._id,instance.data.job , false);
    },
})

Template.showResource.onCreated(function () {
    const instance = Template.instance();
    instance.showDetails = new ReactiveVar(false);
    instance.currentTown = new ReactiveVar(null);

   
    instance.autorun(function auto_townId() {
        instance.currentTown.set(TownCollection.findOne({ userId: localStorage.getItem("userId") }));
        });
        
});

Template.showResource.helpers({
    showDetails() {
        const instance = Template.instance();
        return instance.showDetails.get();
    },
    visible() {
        const instance = Template.instance();
        return instance.data.visible;
    },
    gain() {
        const instance = Template.instance();
        console.log(instance.currentTown.get()?.resourceGain);
        return instance.currentTown.get()?.resourceGain[instance.data.name] || 0;
    }
});

Template.showResource.events({
    "click .js-click-name"(event, instance) {
        instance.showDetails.set(!instance.showDetails.get());
    },
})

Template.showJob.onCreated(function () {
    const instance = Template.instance();
    instance.showDetails = new ReactiveVar(false);
    instance.currentTown = new ReactiveVar(null);
    instance.kobolds = new ReactiveVar(null);

    /*
    instance.autorun(function auto_townId() {
        instance.currentTown.set(TownCollection.findOne({ userId: localStorage.getItem("userId") }));
    });
    */

    instance.autorun(function auto_kobolds() {
        instance.kobolds.set(KoboldCollection.find({ userId: localStorage.getItem("userId") }).fetch());
    });
});

Template.showJob.helpers({
    showDetails() {
        const instance = Template.instance();
        return instance.showDetails.get();
    },
    resourceProduction(resource) {
        const instance = Template.instance();
        return instance.data.production[resource];      
    },
    resources() {
        const instance = Template.instance();
        return Object.keys(instance.data.production).filter(e => instance.data.production[e] >= 0);
    },
    costs() {
        const instance = Template.instance();
        return Object.keys(instance.data.production).filter(e => instance.data.production[e] < 0);
    },
    koboldsAtJob() {
        const instance = Template.instance();
        return instance.kobolds.get()?.filter(e => e.job?.name === instance.data.name);
    },
});

Template.showJob.events({
    "click .js-click-name"(event, instance) {
        instance.showDetails.set(!instance.showDetails.get());
    },
})

Template.showExpo.onCreated(function () {
    const instance = Template.instance();
    instance.showDetails = new ReactiveVar(false);
    instance.currentTown = new ReactiveVar(null);
    instance.kobolds = new ReactiveVar(null);


    instance.autorun(function auto_townId() {
        instance.currentTown.set(TownCollection.findOne({ userId: localStorage.getItem("userId") }));
    });

    instance.autorun(function auto_kobolds() {
        instance.kobolds.set(KoboldCollection.find({ userId: localStorage.getItem("userId") }).fetch());
    });
    instance.slots = new ReactiveVar([]);
    const newSlots = [];
    for (let i = 1; i <= instance.data.partySize; i++) {
        newSlots.push({
            name: "Kobold " + i,
            id: 0,
            nr: i - 1,
            textColor: "black",
            color: "white",
        });
    };
    instance.slots.set(newSlots);
});

Template.showExpo.helpers({
    showDetails() {
        const instance = Template.instance();
        return instance.showDetails.get();
    },
    resources() {
        const instance = Template.instance();
        return instance.data.rewards;      
    },
    costs() {
        const instance = Template.instance();
        return instance.data.costs;
    },
    kobolds() {
        const instance = Template.instance();
        return instance.kobolds.get();
    },
    slots() {
        const instance = Template.instance();
        return instance.slots.get();
    },
    expoNotPrepared() {
        const instance = Template.instance();
        let resourcesAvailable = true;
        const resources = instance.currentTown.get().resources;
        const costs = instance.data.costs;
        for (cost of costs) {
            if ((resources.find(e => e.name === cost.name)?.stockpile || 0) < cost.amount) {
                resourcesAvailable = false;
                break;
            }

        }
        return instance.slots.get().map(e => e.id).includes(0) || !resourcesAvailable;
    },
    availableKobolds() {
        const instance = Template.instance();
        return instance.kobolds.get()?.filter(k => !instance.slots.get()?.map(e => e.id).includes(k._id) && !k.busy)
    }
});

Template.showExpo.events({
    "click .js-click-name"(event, instance) {
        instance.showDetails.set(!instance.showDetails.get());
        const newSlots = [];
        for (let i = 1; i <= instance.data.partySize; i++) {
            newSlots.push({
                name: "Kobold " + i,
                id: 0,
                nr: i - 1,
                textColor: "black",
                color: "white",
            });
        };
        instance.slots.set(newSlots);
    },
    "change .js-party-select"(event, instance) { 
        const index = event.currentTarget.dataset.index;
        const slots = instance.slots.get();
        const kobolds = instance.kobolds.get();
        const slot = slots.find(e => e.nr === +index);
        slot.name = kobolds?.find(e => e._id === event.currentTarget.value)?.name;
        slot.id = event.currentTarget.value;
        slot.color = kobolds?.find(e => e._id === event.currentTarget.value)?.color;
        slot.textColor = kobolds?.find(e => e._id === event.currentTarget.value)?.textColor;
        instance.slots.set(slots);
    },
    'click .js-launch-expo'(event, instance) {
        const koboldIds = instance.slots.get().map(e => e.id);

        const newSlots = [];
        for (let i = 1; i <= instance.data.partySize; i++) {
            newSlots.push({
                name: "Kobold " + i,
                id: 0,
                nr: i - 1,
                textColor: "black",
                color: "white",
            });
        };
        instance.slots.set(newSlots);

        const koboldBusy = instance.kobolds.get()?.filter(e => e.busy && koboldIds.includes(e._id)).length;
        if (koboldBusy) {
            //insert message about busy kobolds here
            console.log("Chosen kobolds are busy.");
            return;
        }
        Meteor.call("addExpedition", localStorage.getItem("userId"), instance.data._id, koboldIds);
    },
})

Template.showBuilding.onCreated(function () {
    const instance = Template.instance();
    instance.showDetails = new ReactiveVar(false);
    instance.currentTown = new ReactiveVar(null);

    instance.autorun(function auto_townId() {
        instance.currentTown.set(TownCollection.findOne({ userId: localStorage.getItem("userId") }));
    });
});

Template.showBuilding.helpers({
    showDetails() {
        const instance = Template.instance();
        return instance.showDetails.get();
    },
    level() {
        const instance = Template.instance();
        return instance.currentTown.get()?.buildings?.find(e => e.name === instance.data.name)?.level;
    },
    totalCost(cost) {
        const instance = Template.instance();
        const costMultiplier = (+instance.currentTown.get()?.buildings?.find(e => e.name === instance.data.name)?.level || 0) + 1;
        return cost.amount * costMultiplier;
    },
    cannotAfford() {
        const instance = Template.instance();
        const resources = instance.currentTown.get()?.resources;
        const costMultiplier = (+instance.currentTown.get()?.buildings?.find(e => e.name === instance.data.name)?.level || 0) + 1;
        for (cost of instance.data.costs) {
            if (resources.find(e => e.name === cost.name).stockpile < cost.amount * costMultiplier) {
                return true;
            }
        }
        return false;
    }
});

Template.showBuilding.events({
    "click .js-click-name"(event, instance) {
        instance.showDetails.set(!instance.showDetails.get());
    },
    "click .js-build"(event, instance) {
        Meteor.call('build', localStorage.getItem('userId'), instance.data._id);
    },
});


Template.noticeboard.onCreated(function () {
    const instance = Template.instance();
    instance.currentTown = new ReactiveVar(null);

    instance.autorun(function auto_townId() {
        instance.currentTown.set(TownCollection.findOne({ userId: localStorage.getItem("userId") }, { projection: { notices: 1 }}));
    });
})

Template.noticeboard.helpers({
    notices() {
        const instance = Template.instance();
        return instance.currentTown.get()?.notices?.reverse()?.filter(e => !e.dismissed);
    },
});

Template.noticeboard.events({
    'click .js-dismiss'(event, instance) {
        const noticeId = event.currentTarget.dataset.notice;
        Meteor.call('dismissNotice', localStorage.getItem("userId"), noticeId);
    },
});