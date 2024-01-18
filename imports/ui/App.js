import { Template } from 'meteor/templating';
import { KoboldCollection } from "../api/KoboldCollection";
import { TownCollection } from "../api/TownCollection";
import { Random } from 'meteor/random'
import { ResourceCollection } from "../api/ResourceCollection";
import './App.html';


Template.mainContainer.onCreated(function () {

    const instance = Template.instance();

    Meteor.subscribe('town');
    instance.currentTown = new ReactiveVar(null);
    localStorage.setItem("userId", `${Random.id()}`); //uncomment this when you want to reset town
    instance.autorun(function auto_townId() {
        instance.currentTown.set(TownCollection.findOne({ userId: localStorage.getItem("userId") }));
        if (!instance.currentTown.get()) {
            if (!localStorage.getItem("userId")) {
                localStorage.setItem("userId", `${Random.id()}`);
            }
            Meteor.call("initTown", localStorage.getItem("userId"));
        }
    });

    const checkCompletionInterval = 60000;
    setInterval(function() {
    }, checkCompletionInterval);

    const resourceInterval = 1000;
    setInterval(function () {
        Meteor.call("increaseResource", localStorage.getItem("userId"));
    }, resourceInterval);
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
        return instance.currentTown.get()?.kobolds;
    },
    resources() {
        const instance = Template.instance();
        return instance.currentTown.get()?.resources;
    },
    jobs() {
        const instance = Template.instance();
        return jobs = instance.currentTown.get()?.jobs;
    }
});

Template.mainContainer.events({
})

Template.showKobold.onCreated(function () {
    const instance = Template.instance();
    instance.showDetails = new ReactiveVar(false);
    instance.currentTown = new ReactiveVar(null);

    instance.autorun(function auto_townId() {
        instance.currentTown.set(TownCollection.findOne({ userId: localStorage.getItem("userId") }));
        });
});

Template.showKobold.helpers({
    showDetails() {
        const instance = Template.instance();
        return instance.showDetails.get();
    },
    kobolds() {
        const instance = Template.instance();
        return instance.currentTown.get()?.kobolds;
    },
    otherKoboldColor(koboldId) {
        const instance = Template.instance();
        return instance.currentTown.get()?.kobolds?.find(e => e.id === koboldId)?.color;
    },
    isCurrentKobold(otherKoboldId) {
        const instance = Template.instance();
        return otherKoboldId === instance.data.id;
    },
    jobs() {
        const instance = Template.instance();
        return instance.currentTown.get()?.jobs?.filter(e => e.spotsOpen);
    },
});

Template.showKobold.events({
    "click .js-click-name"(event, instance) {
        instance.showDetails.set(!instance.showDetails.get());
    },
    "click .js-breed"(event, instance) {
        const fatherId = document.getElementById("breedSelect").value;
        const motherId = instance.data.id;
        Meteor.call("mateKobolds",localStorage.getItem("userId"), motherId, fatherId);
    },
    "click .js-chose-job"(event, instance) {
        const job = document.getElementById("jobSelect").value;
        console.log(job);
        Meteor.call("assignJob",localStorage.getItem("userId"), instance.data.id, job, true);
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
});

Template.showResource.events({
    "click .js-click-name"(event, instance) {
        instance.showDetails.set(!instance.showDetails.get());
    },
    "click .js-assign"(event, instance) {
        const fatherId = document.getElementById("jobSelect").value;
        const motherId = instance.data._id;
        Meteor.call("assignToJob",localStorage.getItem("userId"), motherId, fatherId);
    },
})

