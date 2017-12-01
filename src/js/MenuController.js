'use strict';
import Typed from 'typed.js';


module.exports = AFRAME.registerComponent('menu-controller', {
    schema: {},

    init: function () {
        const self = this;

        if(!AFRAME.utils.device.isMobile()) {
            AFRAME.utils.entity.setComponentProperty(self.el,'vr-mode-ui',{enabled:false});
            //init desktop ui

            let menuToggle = document.createElement('div');
            menuToggle.setAttribute('id','menuToggle');

            menuToggle.addEventListener('mouseenter', ()=> {
                self.el.emit('toggleMenuHover');
            });

            menuToggle.addEventListener('click', ()=> {
                self.el.emit('toggleMenu');
                self.el.emit('toggleMenuClick')
            });

            document.body.appendChild(menuToggle);

            let typing = document.createElement('div');
            typing.setAttribute('id','typed');
            document.body.appendChild(typing);

            let typed = new Typed('#typed', {
                strings: ['Welcome to the Met Office HPC VR Tour <br/><span class=\"smaller\">click the menu to begin...</span>'],
                typeSpeed: 30
            });

        } else {
            AFRAME.utils.entity.setComponentProperty(self.el,'vr-mode-ui',{enabled:true});


        }



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


    addEventListeners: function() {
        const self = this;

    },

    removeEventListeners: function () {
        const self = this;
    }

});