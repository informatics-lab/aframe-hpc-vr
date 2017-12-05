'use strict';
import anime from 'animejs';

module.exports = AFRAME.registerComponent('animate', {
    schema: {
        delay: {type:'int', default:0},
        duration: {type:'int', default:1000},
        direction: {type:'string', default: 'normal'},
        easing: {type: 'string', default: 'easeOutElastic'},
        from: {default: ''},
        to: {default: ''},
        type: {type: 'string', default: 'vec3'},
        component: {type: 'string', default: ''},
        triggerEvents: {type: 'array'},
        interruptEvents: {type: 'array'}
    },

    multiple: true,

    init:function(){
        const self = this;
    },

    update: function (oldData) {
        const self = this;

        if(self.animation) {
            anime.remove(self.from);
            delete self.animation;
            delete self.to;
            delete self.from;
        }

        let setConfig = null;

        // from / to empty check
        if(!self.data.from || self.data.from === '' || !self.data.to || self.data.to === ''){
            return;
        }

        switch (self.data.type) {
            case 'vec3':
                self.data.from = self.toVec3(self.data.from);
                self.data.to = self.toVec3(self.data.to);
                if(!self.isVec3AnimationValid(self.data.from, self.data.to)) {
                    return;
                }
                setConfig = self.setVec3AnimationConfig;
                break;

            case 'number':
                self.data.from = self.toNumber(self.data.from);
                self.data.to = self.toNumber(self.data.to);

            case 'color':
                if(!self.isAnimationValid(self.data.type, self.data.from, self.data.to)) {
                    return;
                }
                setConfig = self.setAnimationConfig;
                break;
        }

        self.from = self.data.from;
        self.to = self.data.to;

        self.animating = false;
        self.component = self.data.component;
        self.autoplay = (!self.data.triggerEvents || self.data.triggerEvents.length == 0 || self.data.triggerEvents === '') ? true : false;

        self.config = {
            autoplay: self.autoplay,
            delay: self.data.delay,
            duration: self.data.duration,
            direction: self.data.direction,
            easing: self.data.easing,
            begin: function(){self.animationStart.apply(self, arguments)},
            complete: function(){self.animationEnd.apply(self, arguments)}
        };

        self.config = setConfig(self, self.config, self.from, self.to);

        self.animation = new anime(self.config);

        if(!self.autoplay) {

            const triggerAnimation = () => {
              self.animation.restart(); //use restart
            };

            self.data.triggerEvents.map((e) => {
                self.el.removeEventListener(e, triggerAnimation);
            });

            self.data.triggerEvents.map((e) => {
                self.el.addEventListener(e, triggerAnimation);
            });
        }

        const interrupt = () => {
            self.animation.pause();
            self.el.emit(self.id+'Interrupt');
        };

        self.data.interruptEvents.map((e) => {
            self.el.removeEventListener(e, interrupt);
        });

        self.data.interruptEvents.map((e) => {
           self.el.addEventListener(e, interrupt)
        });

    },

    toNumber: function(obj) {
        if(typeof obj === 'string') {
            obj = parseFloat(obj);
        }
        return obj;
    },

    toVec3: function(obj) {
        if(typeof obj === 'string') {
            let split = obj.split(" ");
            obj = {x:parseFloat(split[0].trim()), y:parseFloat(split[1].trim()), z:parseFloat(split[2].trim())};
        }
        if (obj.w) {
            delete obj.w
        }
        return obj;

    },

    isVec3AnimationValid: function(from, to) {
        return !(isNaN(from.x) || isNaN(to.x) ||
            isNaN(from.y) || isNaN(to.y) ||
            isNaN(from.z) || isNaN(to.z) ||
            (JSON.stringify(from) === JSON.stringify(to)));
    },

    setVec3AnimationConfig: function(self, config, from, to) {
        let conf = {
            targets: from,
            x: to.x,
            y: to.y,
            z: to.z,
            update: function(anim) {
                AFRAME.utils.entity.setComponentProperty(self.el, self.component, anim.animatables[0].target);
            }
        };
        return Object.assign(config,conf);
    },

    isAnimationValid: function(type, from, to) {
        let valid = false;
        switch(type) {
            case 'number':
                valid = (isNaN(from) || isNaN(to));
            default :
                valid = (valid) ? valid : (from === to) ;
        }
        return !valid;
    },

    setAnimationConfig: function(self, config, from, to) {
        let variable = {myProp: from};
        let conf = {
            targets: variable,
            myProp:to,
            update: function(anim) {
                AFRAME.utils.entity.setComponentProperty(self.el, self.component, anim.animatables[0].target.myProp);
            }
        };
        let obj = Object.assign(config,conf);
        return obj;
    },

    animationStart: function () {
        let self = this;
        if(!self.animating) {
            self.animating = true;
            self.el.emit('animationStart');
            self.el.emit(self.id + 'Start');
        }
    },

    animationEnd: function () {
        let self = this;
        self.animating = false;
        self.el.emit('animationEnd');
        self.el.emit(self.id + 'End')
    }

});
