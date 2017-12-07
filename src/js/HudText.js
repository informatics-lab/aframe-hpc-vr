'use strict';

module.exports = AFRAME.registerComponent('hud-text', {
    schema: {
        triggerEvents: {type: 'array'},
        hideEvents:{type:'array'},
        eventTextKey: {type:'string', default:'text'},
        globalListener: {type: 'boolean', default: false},
    },

    init: function () {
        const self = this;

        self.typeTextBound = self.typeText.bind(self);
        self.hideTextBound = self.hideText.bind(self);
    },

    update: function () {
        const self = this;

        self.listener = (self.data.globalListener) ? self.el.sceneEl : self.el;

        let typingContainer = document.createElement('div');
        typingContainer.setAttribute('id','typingContainer');
        document.body.appendChild(typingContainer);

        let typingText = document.createElement('div');
        typingText.setAttribute('class','text');
        typingContainer.appendChild(typingText);

        let typingBg = document.createElement('div');
        typingBg.setAttribute('class','bg');
        typingContainer.appendChild(typingBg);

        self.typingContainer = typingContainer;

        self.removeEventListeners();
        self.addEventListeners();


    },

    typeText: function (event) {
        const self = this;
        self.typingContainer.setAttribute("style", "display:block;");

        let typed = new Typed('#typingContainer .text', {
            strings: ['^1000 Welcome to the Met Office HPC VR Tour <br/><span class=\"smaller\">open the menu to begin...</span>'],
            typeSpeed: 30,
            showCursor:false
        });

    },

    hideText: function(event) {
        const self = this;
        self.typingContainer.setAttribute("style", "display:none;");
    } ,

    addEventListeners: function () {
        const self = this;
        self.data.triggerEvents.map(function (eventName) {
            self.listener.addEventListener(eventName, self.typeTextBound);
        });

        self.data.hideEvents.map(function(eventName) {
           self.listener.addEventListener(eventName, self.hideTextBound)
        });
    },

    removeEventListeners: function () {
        const self = this;
        self.data.triggerEvents.map(function (eventName) {
            self.listener.removeEventListener(eventName, self.typeTextBound);
        });

        self.data.hideEvents.map(function(eventName) {
            self.listener.removeEventListener(eventName, self.hideTextBound);
        });
    }

});
