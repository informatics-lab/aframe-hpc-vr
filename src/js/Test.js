'use strict';

// shows & hides the MO logo on enter/exit of VR mode.

module.exports = AFRAME.registerComponent('test', {
    init: function () {
        let self = this;
        console.log('testing');

        self.el.addEventListener("showMenu", () => {
            console.log("showMenu!!!!");
        })
    }
});