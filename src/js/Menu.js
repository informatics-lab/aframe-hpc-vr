'use strict';


// contains the main app navigation menu, shown/hidden on click/tap event.

module.exports = AFRAME.registerComponent('menu', {
    schema: {},

    init: function () {
        const self = this;
        self.open = false;
        self.camera = document.querySelector('a-camera').object3D;
        self.placeholder = document.getElementById('menu-placeholder');

        self.el.sceneEl.addEventListener('toggleMenu', () => {

            if (self.open) {
                //trigger animation
                self.el.emit('hideMenu');
            } else {

                // get position that is directly infront of the camera at user height (y = 1.6)
                let pos = new THREE.Vector3().copy(self.placeholder.object3D.getWorldPosition());
                pos.setY(self.camera.position.y);
                pos = {x: pos.x, y: pos.y, z: pos.z};

                // update our animation component
                AFRAME.utils.entity.setComponentProperty(self.el, "animate__showMenu-position", {to: pos});
                AFRAME.utils.entity.setComponentProperty(self.el, "animate__hideMenu-position", {from: pos});
                // AFRAME.utils.entity.setComponentProperty(self.el, "animation__showMenu-position", {to: pos});
                // AFRAME.utils.entity.setComponentProperty(self.el, "animation__hideMenu-position", {from: pos});

                // trigger animation
                self.el.emit('showMenu');
            }

            self.open = !self.open;
        });

    },

    tick : function() {
        let self = this;
        if(self.open) {
            self.el.object3D.lookAt(self.camera.position);
        }
    }

});

