'use strict';

module.exports = AFRAME.registerComponent('event-emit', {
    schema: {
        triggerEvent: {type: 'string', default: ''},
        emitEvent:{type: 'string', default: ''},
        globalListener:{type: 'boolean', default: false},
        globalEmitter:{type: 'boolean', default: false}
    },

    multiple: true,

    update: function () {
        const self = this;

        self.listener = (self.data.globalListener) ? self.el.sceneEl : self.el;
        self.emitter = (self.data.globalEmitter) ? self.el.sceneEl : self.el;

        self.listener.addEventListener(self.data.triggerEvent, (e) => {
            self.emitter.emit(self.data.emitEvent);
        });
    }

});
