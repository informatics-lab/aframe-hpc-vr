'use strict';

module.exports = AFRAME.registerComponent('menu-controller', {
    schema: {},

    init: function () {
        const self = this;

        console.log("init menu-controller");

        const click = function (e) {
            if(e instanceof MouseEvent) {
                self.el.emit('toggleMenu');
            }
        };

        self.el.addEventListener("enter-vr", () => {
            console.log("registering");
            self.el.addEventListener('click', click);
        });

        self.el.addEventListener("exit-vr", () => {
            console.log("removing");
            self.el.removeEventListener('click', click);
        });
    },

});