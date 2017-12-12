'use strict';

AFRAME.registerComponent('cursor-listener', {
    init: function () {

        this.el.addEventListener('click', function (evt) {
            console.log('click', evt);
        });

        this.el.addEventListener('fusing', function (evt) {
            console.log('fusing', evt);
        });

        this.el.addEventListener('mouseenter', function (evt) {
            console.log('mouseenter', evt);
        });

        this.el.addEventListener('mouseleave', function (evt) {
            console.log('mouseleave', evt);
        });

        this.el.addEventListener('mousedown', function (evt) {
            console.log('mousedown', evt);
        });

        this.el.addEventListener('mouseup', function (evt) {
            console.log('mouseup', evt);
        });

        this.el.addEventListener('touchstart', function (evt) {
            console.log('touchstart', evt);
        });

        this.el.addEventListener('touchend', function (evt) {
            console.log('touchend', evt);
        });


    }
});