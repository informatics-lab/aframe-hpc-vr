'use strict';
import Typed from 'typed.js';


module.exports = AFRAME.registerComponent('menu-controller', {
    schema: {},

    init: function () {
        const self = this;

        //TODO uncomment here to enable VR mode in mobile
        // if(!AFRAME.utils.device.isMobile()) {
            AFRAME.utils.entity.setComponentProperty(self.el,'vr-mode-ui',{enabled:false});
            //init desktop ui
        // } else {
        //     AFRAME.utils.entity.setComponentProperty(self.el,'vr-mode-ui',{enabled:true});
        // }

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

        // let typingContainer = document.createElement('div');
        // typingContainer.setAttribute('id','typingContainer');
        // document.body.appendChild(typingContainer);
        //
        // let typingText = document.createElement('div');
        // typingText.setAttribute('class','text');
        // typingContainer.appendChild(typingText);
        //
        // let typingBg = document.createElement('div');
        // typingBg.setAttribute('class','bg');
        // typingContainer.appendChild(typingBg);
        //
        // let typed = new Typed('#typingContainer .text', {
        //     strings: ['^1000 Welcome to the Met Office HPC VR Tour <br/><span class=\"smaller\">open the menu to begin...</span>'],
        //     typeSpeed: 30,
        //     showCursor:false
        // });



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