'use strict';


// contains the main app navigation menu, shown/hidden on click/tap event.

module.exports = AFRAME.registerComponent('menu', {
    schema: {},

    init: function () {
        const self = this;
        self.open = false;
        self.camera = document.querySelector('a-camera').object3D;

        self.el.sceneEl.addEventListener('toggleMenu', () => {
            console.log('toggleMenu heard');

            if (self.open) {
                self.el.emit('hideMenu', {}, true);
            } else {

                // get position that is directly infront of the camera at user height (y = 1.6)
                let pos = self.camera.getWorldDirection();
                pos.setZ(pos.negate().z);
                pos.setY(self.camera.position.y);
                pos = {x: pos.x, y: pos.y, z: pos.z};

                // let rot = self.camera.rotation;
                // rot = {x: THREE.Math.radToDeg(rot._x), y: THREE.Math.radToDeg(rot._y), z: THREE.Math.radToDeg(rot._z)};

                // update our animation component
                AFRAME.utils.entity.setComponentProperty(self.el, "animate__showMenu-position", {to: pos});
                AFRAME.utils.entity.setComponentProperty(self.el, "animate__hideMenu-position", {from: pos});


                // trigger animation
                self.el.emit('showMenu', {}, true);
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

