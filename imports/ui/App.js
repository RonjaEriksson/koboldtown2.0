import { Template } from 'meteor/templating';
import { KoboldCollection } from "../api/KoboldCollection";
import { TownCollection } from "../api/TownCollection";
import { Random } from 'meteor/random'
import { ResourceCollection } from "../api/ResourceCollection";
import './App.html';


Template.mainContainer.onCreated(function () {

    const instance = Template.instance();
    instance.currentTown = new ReactiveVar(null);
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
});

Template.mainContainer.helpers({
    kobolds() {
        const instance = Template.instance();
        return KoboldCollection.find({ townId: instance.currentTown.get()?._id }).fetch();
    },
    resources() {
        const instance = Template.instance();
        return ResourceCollection.find({ townId: instance.currentTown.get()?._id })
    },
    currentTown() {
        const instance = Template.instance();
        return instance.currentTown;
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
        if (!instance.currentTown.get()) {
            if (!localStorage.getItem("userId")) {
                localStorage.setItem("userId", `${Random.id()}`);
            }
            Meteor.call("initTown", localStorage.getItem("userId"));
        }
    });
});

Template.showKobold.helpers({
    isKoboldToShow() {
        const instance = Template.instance();
        return instance.showDetails.get();
    },
    kobolds() {
        const instance = Template.instance();
        return KoboldCollection.find({ townId: instance.currentTown.get()?._id }).fetch();
    },
    otherKoboldColor(koboldId) {
        return KoboldCollection.find(koboldId).fetch()[0]?.color;
    },
    isCurrentKobold(otherKoboldId) {
        const instance = Template.instance();
        return otherKoboldId === instance.data._id;
    }
});

Template.showKobold.events({
    "click .js-click-name"(event, instance) {
        instance.showDetails.set(!instance.showDetails.get());
    },
    "click .js-breed"(event, instance) {
        const fatherId = document.getElementById("breedSelect").value;
        const motherId = instance.data._id;
        Meteor.call("mateKobolds",localStorage.getItem("userId"), motherId, fatherId);
    },
})