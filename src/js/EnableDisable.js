'use strict';

AFRAME.registerComponent('enable-disable', {

    schema: {
        enableEvents: {type: 'array'},
        disableEvents: {type: 'array'},
        toggleProps: {type: 'array'},
        enabled: {type: 'boolean', default: true}
    },

    init: function () {
        const self = this;

        console.log("enable-disable init");

        self.disableBound = self.disable.bind(self);
        self.enableBound = self.enable.bind(self);
        self.attr = Object.keys(self.el.components)
            .filter((key) => {
                return self.data.toggleProps.includes(key);
            })
            .map((key) => {
                return {
                    name: key,
                    value: self.el.getDOMAttribute(key)
                }
            });

        self.removeEventListeners();
        self.addEventListeners();

        if(!self.data.enabled) {
            self.disableBound();
        }
    },

    disable: function() {
        const self = this;
        console.log("disable");
        self.attr.forEach((attr) => {
            self.el.removeAttribute(attr.name);
        });
    },

    enable: function () {
        const self = this;
        console.log("enable");
        self.attr.forEach((attr) => {
            self.el.setAttribute(attr.name, attr.value);
        });
    },

    addEventListeners: function () {
        const self = this;
        self.data.enableEvents.map(function (eventName) {
            self.el.addEventListener(eventName, self.enableBound);
        });
        self.data.disableEvents.map(function (eventName) {
            self.el.addEventListener(eventName, self.disableBound);
        });
    },

    removeEventListeners: function () {
        const self = this;
        self.data.enableEvents.map(function (eventName) {
            self.el.removeEventListener(eventName, self.enableBound);
        });
        self.data.disableEvents.map(function (eventName) {
            self.el.removeEventListener(eventName, self.disableBound);
        });
    }

});