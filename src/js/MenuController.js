'use strict';

module.exports = AFRAME.registerComponent('menu-controller', {
    schema: {},

    init: function () {
        const self = this;

        const click = function (e) {
            if(e instanceof MouseEvent) {
                self.el.emit('toggleMenu');
            }
        };

        self.el.addEventListener("enter-vr", () => {
            self.el.addEventListener('click', click);
        });

        self.el.addEventListener("exit-vr", () => {
            self.el.removeEventListener('click', click);
        });
    },

});