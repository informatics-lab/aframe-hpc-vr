'use strict';

module.exports = AFRAME.registerComponent('event-emit', {
    schema: {
        triggerEvent: {type: 'string', default: ''},
        emitEvent:{type: 'string', default: ''}
    },

    multiple: true,

    update: function () {
        const self = this;

        self.el.sceneEl.addEventListener(self.data.triggerEvent, (e) => {
            self.el.emit(emitEvent, null, true);
        });
    }

});
