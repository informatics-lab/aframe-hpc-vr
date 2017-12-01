'use strict';

module.exports = AFRAME.registerComponent('hud-position', {
    schema: {

    },

    init: function() {
        const self = this;
        self.windowResizeBound = self.windowResize.bind(self);
    },

    update: function() {
        const self = this;
        console.log("hud-position update");
        self.removeEventListeners();
        self.addEventListeners();
    },

    windowResize: function () {
        const self = this;
        self.el.sceneEl.camera.aspect = window.innerWidth / window.innerHeight;
        self.el.sceneEl.camera.updateProjectionMatrix();
        self.el.sceneEl.renderer.setSize( window.innerWidth, window.innerHeight );
    },

    addEventListeners: function() {
        const self = this;
        window.addEventListener('resize', self.windowResizeBound)
    },

    removeEventListeners: function() {
        const self = this;
        window.removeEventListener('resize', self.windowResizeBound)
    }

});
