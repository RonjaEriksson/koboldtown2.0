import { Template } from 'meteor/templating';
import { KoboldCollection } from "../api/KoboldCollection";
import './App.html';

Template.mainContainer.onCreated(function () {

});

Template.mainContainer.helpers({
    kobolds() {
        console.log(KoboldCollection.find({ townId: 6 }).fetch());
        return KoboldCollection.find({ townId: 6 }).fetch();
    },
});

Template.mainContainer.events({
})

Template.showKobold.onCreated(function () {
    const instance = Template.instance();
    instance.showDetails = new ReactiveVar(false);
});

Template.showKobold.helpers({
    isKoboldToShow(id) {
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