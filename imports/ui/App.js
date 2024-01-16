import { Template } from 'meteor/templating';
import { KoboldCollection } from "../api/KoboldCollection";
import { TownCollection } from "../api/TownCollection";
import { Random } from 'meteor/random'
import { ResourceCollection } from "../api/ResourceCollection";
import './App.html';


Template.mainContainer.onCreated(function () {

    const instance = Template.instance();
    instance.currentTown = new ReactiveVar(null);

    instance.autorun(function auto_townId() {
        instance.currentTown.set(TownCollection.findOne({ userId: localStorage.getItem("userId") }));
        Meteor.call("addWanderingKobold", localStorage.getItem("userId"));
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
});

Template.mainContainer.events({
})

Template.showKobold.onCreated(function () {
    const instance = Template.instance();
    instance.showDetails = new ReactiveVar(false);
});

Template.showKobold.helpers({
    isKoboldToShow() {
        const instance = Template.instance();
        return instance.showDetails.get();
    },
});

Template.showKobold.events({
    "click .js-click-name"(event, instance) {
        console.log(instance.data);
        instance.showDetails.set(!instance.showDetails.get());
    }
})