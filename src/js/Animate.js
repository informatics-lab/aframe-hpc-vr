'use strict';
import anime from 'animejs';


// allows animation of vec3's
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
        triggerEvent: {type: 'string', default: ''},
    },

    multiple: true,

    update: function (oldData) {
        let self = this;

        if(self.animation) {
            anime.remove(self.from);
            delete self.animation;
            delete self.to;
            delete self.from;
        }

        let setConfig = null;

        // from / to empty check
        if(self.data.from === '' || self.data.to === ''){
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
                if(!self.isNumberAnimationValid(self.data.from, self.data.to)) {
                    console.log('exiting');
                    return;
                }
                setConfig = self.setNumberAnimationConfig;
                break;
        }


        self.from = self.data.from;
        self.to = self.data.to;

        self.animating = false;
        self.component = self.data.component;
        self.autoplay = (self.data.triggerEvent === '') ? true : false;

        self.config = {
            autoplay: self.autoplay,
            delay: self.data.delay,
            duration: self.data.duration,
            direction: self.data.direction,
            easing: self.data.easing,
            begin: function(){self.animationStart.apply(self, arguments)},
            update: function(){self.animationUpdate.apply(self, arguments)},
            complete: function(){self.animationEnd.apply(self, arguments);}
        };

        self.config = setConfig(self.config, self.from, self.to);

        self.animation = new anime(self.config);

        if(!self.autoplay) {
            self.el.sceneEl.addEventListener(self.data.triggerEvent, () => {
                self.animation.restart(); //use restart so same animation can happen multiple times
            });
        }

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
        return !(isNaN(from.x) || isNaN(to.x) || (JSON.stringify(from) === JSON.stringify(to)));
    },

    setVec3AnimationConfig: function(config, from, to) {
        let conf = {
            targets: from,
            x: to.x,
            y: to.y,
            z: to.z,
        };
        return Object.assign(config,conf);
    },

    isNumberAnimationValid: function(from, to) {
        return !(isNaN(from) || isNaN(to) || (from === to));
    },

    setNumberAnimationConfig: function(config, from, to) {
        let variable = {x: from};
        let conf = {
            targets: variable,
            x:to,
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

    animationUpdate(anim) {
        let self = this;
        let value = anim.animatables[0].target;
        if(self.data.type === 'number') {
            value = value.x;
        }
        AFRAME.utils.entity.setComponentProperty(self.el, self.component, value);
    },

    animationEnd: function () {
        let self = this;
        self.animating = false;
        self.el.emit('animationEnd');
        self.el.emit(self.id + 'End')
    }

});
