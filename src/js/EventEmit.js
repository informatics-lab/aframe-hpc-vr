'use strict';

module.exports = AFRAME.registerComponent('event-emit', {
    schema: {
        triggerEvents: {type: 'array'},
        emitEvent: {type: 'string', default: ''},
        keys:{type:'array'},
        values:{type:'array'},
        globalListener: {type: 'boolean', default: false},
        globalEmitter: {type: 'boolean', default: false}
    },

    multiple: true,

    init: function () {
        const self = this;
        self.emitEventBound = self.emitEvent.bind(self);

        self.listener = (self.data.globalListener) ? self.el.sceneEl : self.el;
        self.emitter = (self.data.globalEmitter) ? self.el.sceneEl : self.el;
    },

    update: function () {
        const self = this;
        self.removeEventListeners();
        self.addEventListeners();

        self.message = {};
        self.data.keys.forEach((key, i) => self.message[key] = self.data.values[i]);
    },

    emitEvent: function (event) {
        const self = this;
        Object.assign(self.message, {triggerEvent:event});
        self.emitter.emit(self.data.emitEvent, self.message)
    },

    addEventListeners: function () {
        const self = this;
        self.data.triggerEvents.map(function (eventName) {
            self.listener.addEventListener(eventName, self.emitEventBound);
        });
    },

    removeEventListeners: function () {
        const self = this;
        self.data.triggerEvents.map(function (eventName) {
            self.listener.removeEventListener(eventName, self.emitEventBound);
        });
    }

});
