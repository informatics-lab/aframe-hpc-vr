'use strict';

AFRAME.registerComponent('switch-background', {
    schema: {
        triggerEvents:{type:'array'}
    },

    init: function () {
        const self = this;
        self.switchBackgroundBound = self.switchBackground.bind(self);
    },

    update: function() {
        const self = this;
        self.removeEventListeners();
        self.addEventListeners();
    },

    switchBackground: function(evt) {
        const self = this;
        let bgSrc = evt.detail.src;
        const swapSrc = function() {
            AFRAME.utils.entity.setComponentProperty(self.el, 'src', bgSrc);
            self.el.emit('bg-fadein');
        };

        self.el.removeEventListener('bg-fadeoutEnd', swapSrc);
        self.el.addEventListener('bg-fadeoutEnd', swapSrc);

        self.el.emit('bg-fadeout');
    },

    addEventListeners: function() {
        const self = this;
        self.data.triggerEvents.map((eventName) => {
            self.el.sceneEl.addEventListener(eventName, self.switchBackgroundBound)
        });
    },

    removeEventListeners: function() {
        const self = this;
        self.data.triggerEvents.map((eventName) => {
            self.el.sceneEl.removeEventListener(eventName, self.switchBackgroundBound)
        });
    }
});