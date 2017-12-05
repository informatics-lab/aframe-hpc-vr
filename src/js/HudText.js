'use strict';

module.exports = AFRAME.registerComponent('hud-text', {
    schema: {
        triggerEvents: {type: 'array'},
        text: {type: 'string', default: ''},
        globalListener: {type: 'boolean', default: false},
    },

    init: function () {
        const self = this;
        self.playSrcBound = self.playSrc.bind(self);
    },

    update: function () {
        const self = this;

        self.listener = (self.data.globalListener) ? self.el.sceneEl : self.el;

        self.removeEventListeners();
        self.addEventListeners();
    },

    playSrc: function (event) {
        const self = this;
        console.log("triggering");
        self.data.src.playbackRate = 4.0;
        self.data.src.play();
    },

    addEventListeners: function () {
        const self = this;
        self.data.triggerEvents.map(function (eventName) {
            self.listener.addEventListener(eventName, self.playSrcBound);
        });
    },

    removeEventListeners: function () {
        const self = this;
        self.data.triggerEvents.map(function (eventName) {
            self.listener.removeEventListener(eventName, self.playSrcBound);
        });
    }

});
