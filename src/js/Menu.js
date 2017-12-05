'use strict';


// contains the main app navigation menu, shown/hidden on click/tap event.
module.exports = AFRAME.registerComponent('menu', {
    schema: {
        globalListener: {type: 'boolean', default: false},
    },

    init: function () {
        const self = this;
        self.open = false;
        self.camera = document.querySelector('a-camera').object3D;
        self.placeholder = document.getElementById('menu-placeholder');
        self.listener = (self.data.globalListener) ? self.el.sceneEl : self.el;

        self.toggleMenuBound = self.toggleMenu.bind(self);
        self.showDesktopMenuTabBound = self.showDesktopMenuTab.bind(self);
        self.hideDesktopMenuTabBound = self.hideDesktopMenuTab.bind(self);
    },

    update: function() {
        const self = this;

        self.removeEventListeners();
        self.addEventListeners();
    },

    tick: function () {
        let self = this;
        if (self.open) {
            self.el.object3D.lookAt(self.camera.position);
        }
    },

    toggleMenu: function () {
        const self = this;
        if (self.open) {
            //trigger hide animation
            self.el.emit('hideMenu');
        } else {

            // get position that is directly infront of the camera at user height (y = 1.6)
            let pos = new THREE.Vector3().copy(self.placeholder.object3D.getWorldPosition());
            pos.setY(self.camera.position.y);
            pos = {x: pos.x, y: pos.y, z: pos.z};

            // update our animations to/from positions
            AFRAME.utils.entity.setComponentProperty(self.el, "animate__showMenu-position", {to: pos});
            AFRAME.utils.entity.setComponentProperty(self.el, "animate__hideMenu-position", {from: pos});

            // trigger show animation
            self.el.emit('showMenu');
        }

        self.open = !self.open;
    },

    showDesktopMenuTab: function () {
        const self = this;
        document.getElementById('menuToggle').setAttribute('style','display:block;')
    },

    hideDesktopMenuTab: function () {
        const self = this;
        document.getElementById('menuToggle').setAttribute('style','display:none;')
    },

    addEventListeners: function () {
        const self = this;
        self.listener.addEventListener('toggleMenu', self.toggleMenuBound);
        if (!AFRAME.utils.device.isMobile()) {
            self.el.addEventListener('showMenu-positionStart', self.hideDesktopMenuTabBound);
            self.el.addEventListener('hideMenu-positionEnd', self.showDesktopMenuTabBound);
        }
    },

    removeEventListeners: function () {
        const self = this;
        self.listener.removeEventListener('toggleMenu', self.toggleMenuBound);
        if (!AFRAME.utils.device.isMobile()) {
            self.el.removeEventListener('showMenu-positionStart', self.hideDesktopMenuTabBound);
            self.el.removeEventListener('hideMenu-positionEnd', self.showDesktopMenuTabBound);
        }
    }

});

