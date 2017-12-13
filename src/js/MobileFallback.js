'use strict';

module.exports = AFRAME.registerComponent('mobile-fallback', {
    schema: {
        src:{type:'string', default:''}
    },

    update: function() {
        const self = this;
        if(AFRAME.utils.device.isMobile()) {
            AFRAME.utils.entity.setComponentProperty(self.el, "src", self.data.src);
        }
    }

});
