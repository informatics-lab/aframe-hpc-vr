'use strict';

AFRAME.registerComponent('cursor-listener', {
    init: function () {

        this.el.addEventListener('click', function (evt) {
            console.log('click');
        });

        this.el.addEventListener('fusing', function (evt) {
            console.log('fusing');
        });

        this.el.addEventListener('mouseenter', function (evt) {
            console.log('mouseenter');
        });

        this.el.addEventListener('mouseleave', function (evt) {
            console.log('mouseleave');
        });

        this.el.addEventListener('mousedown', function (evt) {
            console.log('mousedown');
        });

        this.el.addEventListener('mouseup', function (evt) {
            console.log('mouseup');
        });

    }
});