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
        return instance.currentTown.get()?.kobolds;
    },
    resources() {
        const instance = Template.instance();
        return instance.currentTown.get()?.resources;
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
    isBusy() { 
        const instance = Template.instance();
        return instance.data.busy;
    },
    otherIsBusy(otherKoboldId) {
        const instance = Template.instance();
        const otherKobold = instance.currentTown.get()?.kobolds?.find(k => k.id === otherKoboldId);
        return otherKobold?.busy;
    },
    textColor() {
        const instance = Template.instance();
        const totalColor = instance.data.r + instance.data.g + instance.data.b;
        if (totalColor > 400) {
            return 'black';
        } else {
            return 'white';
        }
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
        Meteor.call("assignJob",localStorage.getItem("userId"), instance.data.id, job, true);
    },
    "click .js-quit-job"(event, instance) {    
        console.log(instance.data.job);
        Meteor.call("assignJob",localStorage.getItem("userId"), instance.data.id,instance.data.job , false);
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

    instance.autorun(function auto_townId() {
        instance.currentTown.set(TownCollection.findOne({ userId: localStorage.getItem("userId") }));
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
        return instance.currentTown.get()?.kobolds?.filter(e => e.job === instance.data.name);
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

    instance.autorun(function auto_townId() {
        instance.currentTown.set(TownCollection.findOne({ userId: localStorage.getItem("userId") }));
    });
    instance.slots = new ReactiveVar([]);
    const newSlots = [];
    for (let i = 1; i <= instance.data.partySize; i++) {
        newSlots.push({
            name: "Kobold " + i,
            id: 0,
            nr: i - 1,
            color: "black",
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
        return instance.currentTown.get()?.kobolds;
    },
    slots() {
        const instance = Template.instance();
        return instance.slots.get();
    },
    expoNotFilled() {
        const instance = Template.instance();
        console.log(instance.slots.get().map(e => e.id).includes(0));
        return instance.slots.get().map(e => e.id).includes(0);
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
                color: "black",
            });
        };
        instance.slots.set(newSlots);
    },
    "change .js-party-select"(event, instance) { 
        const index = event.currentTarget.dataset.index;
        console.log(index);
        const slots = instance.slots.get();
        const slot = slots.find(e => e.nr === +index);
        slot.name = instance.currentTown.get()?.kobolds?.find(e => e.id === event.currentTarget.value)?.name;
        slot.id = event.currentTarget.value;
        slot.color = instance.currentTown.get()?.kobolds?.find(e => e.id === event.currentTarget.value)?.color;
        instance.slots.set(slots);
        event.currentTarget.innerHTML = '';
        event.currentTarget.style = `color: ${slot.color}`;
        const selectedOption = document.createElement("option");
        selectedOption.style = `color: ${slot.color}`;
        selectedOption.value = `${slot.id}`;
        selectedOption.innerText = `${slot.name}`;
        selectedOption.selected = true;
        event.currentTarget.add(selectedOption, null);
        for (const kobold of instance.currentTown.get()?.kobolds) {
            if (!slots.map(e => e.id).includes(kobold.id) && !kobold.busy) {
                const koboldOption = document.createElement("option");
                koboldOption.style = `color: ${kobold.color}`;
                koboldOption.value = `${kobold.id}`;
                koboldOption.innerText = `${kobold.name}`;
                console.log(koboldOption);
                event.currentTarget.add(koboldOption, null);
            }
        }
        console.log(event.currentTarget);
        const selects = document.getElementsByClassName(`js-party-select-${instance.data.name}`);
        console.log(selects);
        for (let i = 0; i < selects.length; i++) {
            if (i != index) {
                selects[i].innerHTML = '';
                const currentSlot = slots.find(e => e.nr === i);
                console.log(currentSlot);
                const selectedOption = document.createElement("option");
                selectedOption.style = `color: ${currentSlot.color}`;
                selectedOption.value = `${currentSlot.id}`;
                selectedOption.innerText = `${currentSlot.name}`;
                selectedOption.selected = true;
                selects[i].add(selectedOption, null);
                for (const kobold of instance.currentTown.get()?.kobolds) {
                    if (!slots.map(e => e.id).includes(kobold.id) && !kobold.busy) {
                        const koboldOption = document.createElement("option");
                        koboldOption.style = `color: ${kobold.color}`;
                        koboldOption.value = `${kobold.id}`;
                        koboldOption.innerText = `${kobold.name}`;
                        console.log(koboldOption);
                        selects[i].add(koboldOption, null);
                    }
                }
            }
        }
    },
    'click .js-launch-expo'(event, instance) {
        const koboldIds = instance.slots.get().map(e => e.id);

        const newSlots = [];
        for (let i = 1; i <= instance.data.partySize; i++) {
            newSlots.push({
                name: "Kobold " + i,
                id: 0,
                nr: i - 1,
                color: "black",
            });
        };
        instance.slots.set(newSlots);
        const slots = instance.slots.get();

        const selects = document.getElementsByClassName(`js-party-select-${instance.data.name}`);
        console.log(selects);
        for (let i = 0; i < selects.length; i++) {
            selects[i].innerHTML = '';
            const currentSlot = slots.find(e => e.nr === i);
            console.log(currentSlot);
            const selectedOption = document.createElement("option");
            selectedOption.style = `color: ${currentSlot.color}`;
            selectedOption.value = `${currentSlot.id}`;
            selectedOption.innerText = `${currentSlot.name}`;
            selectedOption.selected = true;
            selects[i].add(selectedOption, null);
            for (const kobold of instance.currentTown.get()?.kobolds) {
                if (!koboldIds.includes(kobold.id) && !kobold.busy) {
                    const koboldOption = document.createElement("option");
                    koboldOption.style = `color: ${kobold.color}`;
                    koboldOption.value = `${kobold.id}`;
                    koboldOption.innerText = `${kobold.name}`;
                    console.log(koboldOption);
                    selects[i].add(koboldOption, null);
                }
            }
        }

        const koboldBusy = instance.currentTown.get()?.kobolds?.filter(e => e.busy && koboldIds.includes(e.id)).length;
        if (koboldBusy) {
            //insert message about busy kobolds here
            console.log("in heeeeeerrrrrrrrrrrreeeeeeeee");
            console.log(koboldBusy);
            return;
        }
        Meteor.call("addExpedition", localStorage.getItem("userId"), instance.data._id, koboldIds);
    },
})

