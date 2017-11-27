'use strict';

// shows & hides the MO logo on enter/exit of VR mode.

module.exports = AFRAME.registerComponent('header', {
    init: function () {
        const sceneEl = this.el;

        sceneEl.addEventListener("enter-vr", () => {
            console.log("entering vr");
        });
        sceneEl.addEventListener("exit-vr", () => {
            console.log("exiting vr");
        });
    }
});