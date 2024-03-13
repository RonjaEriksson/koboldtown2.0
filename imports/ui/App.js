import { Template } from 'meteor/templating';
import { KoboldCollection } from "../api/KoboldCollection";
import { TownCollection } from "../api/TownCollection";
import { Random } from 'meteor/random'
import { ResourceCollection } from "../api/ResourceCollection";
import { ExpeditionCollection } from "../api/ExpeditionCollection";
import './App.html';


Template.mainContainer.onCreated(function () {

    const instance = Template.instance();

    Meteor.subscribe('town');
    Meteor.subscribe("expedition");
    Meteor.subscribe("kobold");
    instance.currentTown = new ReactiveVar(null);
    instance.kobolds = new ReactiveVar(null);
    //localStorage.setItem("userId", `${Random.id()}`); //uncomment this when you want to reset town
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
        return instance.kobolds.get();
    },
    resources() {
        const instance = Template.instance();
        return instance.currentTown.get()?.resources?.filter(e => e.visible);
    },
    jobs() {
        const instance = Template.instance();
        return jobs = instance.currentTown.get()?.jobs;
    },
    expos() {
        console.log(ExpeditionCollection.find({}).fetch());
        return ExpeditionCollection.find({},{projection: {name:1, length:1, skills: 1, rewards: 1, color: 1, partySize: 1,}}).fetch();
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
        instance.currentTown.set(TownCollection.findOne({ userId: localStorage.getItem("userId") }, { projection: {jobs:1,}}));
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
        return instance.currentTown.get()?.jobs?.filter(e => e.spotsOpen);
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
});

Template.showKobold.events({
    "click .js-click-name"(event, instance) {
        instance.showDetails.set(!instance.showDetails.get());
        instance.breedTarget.set(null);
        instance.selectedJob.set(null);
    },
    "click .js-breed"(event, instance) {
        const fatherId = document.getElementById("breedSelect").value;
        const motherId = instance.data._id;
        Meteor.call("mateKobolds",localStorage.getItem("userId"), motherId, fatherId);
    },
    "change .js-breed-select"(event, instance) {
        instance.breedTarget.set(event.currentTarget.value);
    },
    "change .js-select-job"(event, instance) {
        instance.selectedJob.set(event.currentTarget.value);
    },
    "click .js-chose-job"(event, instance) {
        const job = document.getElementById("jobSelect").value;
        Meteor.call("assignJob",localStorage.getItem("userId"), instance.data._id, job, true);
    },
    "click .js-quit-job"(event, instance) {    
        Meteor.call("assignJob",localStorage.getItem("userId"), instance.data._id,instance.data.job , false);
    },
})

Template.showResource.onCreated(function () {
    const instance = Template.instance();
    instance.showDetails = new ReactiveVar(false);
    instance.currentTown = new ReactiveVar(null);

    /*
    instance.autorun(function auto_townId() {
        instance.currentTown.set(TownCollection.findOne({ userId: localStorage.getItem("userId") }));
        });
        */
});

Template.showResource.helpers({
    showDetails() {
        const instance = Template.instance();
        return instance.showDetails.get();
    },
    visible() {
        const instance = Template.instance();
        return instance.data.visible;
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
    koboldsAtJob() {
        const instance = Template.instance();
        return instance.kobolds.get()?.filter(e => e.job === instance.data.name);
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

    /*
    instance.autorun(function auto_townId() {
        instance.currentTown.set(TownCollection.findOne({ userId: localStorage.getItem("userId") }));
    });
    */
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
    kobolds() {
        const instance = Template.instance();
        return instance.kobolds.get();
    },
    slots() {
        const instance = Template.instance();
        return instance.slots.get();
    },
    expoNotFilled() {
        const instance = Template.instance();
        return instance.slots.get().map(e => e.id).includes(0);
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