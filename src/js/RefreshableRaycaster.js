'use strict';

module.exports = AFRAME.registerComponent('refreshable-raycaster', {
    schema: {
        triggerEvents: {type: 'array'},
        globalListener: {type: 'boolean', default: false},
    },

    init: function () {
        const self = this;
        self.refreshBound = self.refresh.bind(self);
        self.listener = (self.data.globalListener) ? self.el.sceneEl : self.el;
    },

    update: function () {
        const self = this;
        self.raycaster = AFRAME.scenes[0].querySelector('[raycaster]');

        self.removeEventListeners();
        self.addEventListeners();
    },

    refresh: function (event) {
        const self = this;
        console.log("refreshing raycaster");
        console.log(self.raycaster.components.raycaster);
        self.raycaster.components.raycaster.refreshObjects();
    },

    addEventListeners: function () {
        const self = this;
        self.data.triggerEvents.map(function (eventName) {
            self.listener.addEventListener(eventName, self.refreshBound);
        });
    },

    removeEventListeners: function () {
        const self = this;
        self.data.triggerEvents.map(function (eventName) {
            self.listener.removeEventListener(eventName, self.refreshBound);
        });
    }

});
