'use strict';

// shows & hides the MO logo on enter/exit of VR mode.

module.exports = AFRAME.registerComponent('test', {
    init: function () {
        const self = this;
        console.log('testing');

        self.el.sceneEl.addEventListener("toggleMenu", () => {
            console.log("toggle");
        });


    }
});