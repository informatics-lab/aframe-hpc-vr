'use strict';

module.exports = AFRAME.registerComponent('action-src-on-event', {
    schema: {
        action: {type:'string', default: ''},
        delay:{type:'number', default:0},
        globalListener: {type: 'boolean', default: false},
        src: {type: 'selector', default: ''},
        triggerEvents: {type: 'array'},
    },

    multiple: true,

    init: function () {
        const self = this;
        self.actionSrcBound = self.actionSrc.bind(self);
    },

    update: function () {
        const self = this;

        self.listener = (self.data.globalListener) ? self.el.sceneEl : self.el;

        self.removeEventListeners();
        self.addEventListeners();
    },

    actionSrc: function (event) {
        const self = this;
        self.data.src.playbackRate = 4.0;
        setTimeout(() => {
            switch (self.data.action) {
                case 'play':
                    self.data.src.play();
                    break;
                case 'stop':
                    self.data.src.stop();
                    break;
                case 'load':
                    self.data.src.load();
                    break;
            }
        }, self.data.delay);
    },

    addEventListeners: function () {
        const self = this;
        self.data.triggerEvents.map(function (eventName) {
            self.listener.addEventListener(eventName, self.actionSrcBound);
        });
    },

    removeEventListeners: function () {
        const self = this;
        self.data.triggerEvents.map(function (eventName) {
            self.listener.removeEventListener(eventName, self.actionSrcBound);
        });
    }

});
