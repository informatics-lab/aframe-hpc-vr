'use strict';

module.exports = AFRAME.registerComponent('sound-controller', {
    schema: {
        triggerEvents: {type: 'array'},
        globalListener: {type: 'boolean', default: false},
    },

    init: function () {
        const self = this;

        self.setVolumeBound = self.setVolume.bind(self);
    },

    update: function () {
        const self = this;

        self.listener = (self.data.globalListener) ? self.el.sceneEl : self.el;
        self.volume = 0;
        self.removeEventListeners();
        self.addEventListeners();
    },

    setVolume: function (event) {
        const self = this;
        
        if(event) {
            switch(event.detail.src) {
                case '#hq-outside':
                case '#cb-outside':
                    self.volume = 0;
                    break;

                case '#hq-hpc':
                case '#hq-servers':
                case '#hq-storage':
                case '#cb-hpc':
                case '#cb-servers':
                    self.volume = 0.5;
                    break;
                default:
                    self.volume = 0;
                    break;
            }
        }

        AFRAME.utils.entity.setComponentProperty(self.el, "volume", self.volume);

    },


    addEventListeners: function () {
        const self = this;
        self.data.triggerEvents.map(function (eventName) {
            self.listener.addEventListener(eventName, self.setVolumeBound);
        });
    },

    removeEventListeners: function () {
        const self = this;
        self.data.triggerEvents.map(function (eventName) {
            self.listener.removeEventListener(eventName, self.setVolumeBound);
        });
    }

});
