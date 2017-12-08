'use strict';
import Typed from 'typed.js';

module.exports = AFRAME.registerComponent('hud-text', {
    schema: {
        triggerEvents: {type: 'array'},
        hideEvents:{type:'array'},
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
        typingText.setAttribute('id','typingText');
        typingText.setAttribute('class','text');
        typingContainer.appendChild(typingText);

        let typingBg = document.createElement('div');
        typingBg.setAttribute('class','bg');
        typingContainer.appendChild(typingBg);

        self.typingContainer = typingContainer;
        self.typingText = typingText;

        self.removeEventListeners();
        self.addEventListeners();

        self.typeTextBound();
    },

    //TODO fill out text
    typeText: function (event) {
        const self = this;
        console.log(event);
        self.typingContainer.setAttribute("style", "display:block;");
        self.typingText.innerText = '';
        self.text = '^200 Welcome to the Met Office HPC VR Tour <br/><span class=\"smaller\">open the menu to begin...</span>';
        if(event) {
            switch(event.detail.src) {
                case '#hq-outside':
                    self.text = '^200 You are now outside Met Office HQ, Exeter. Our Headquarters are home to two IT Halls, the energy needed to power these is equivalent to energy needed to power the whole of Exeter.<br/><span class="smaller">open the menu to continue...</span>';
                    break;
                case '#hq-hpc':
                    self.text = '^200 This is the Cray XC40 Supercomputer. Each of these machines were installed in 3 phases and are capable of perfoming 14 petaflops of operations per second.<br/><span class="smaller">open the menu to continue...</span>';
                    break;
                case '#hq-servers':
                    self.text = '^200 The Met Office has 300 servers running Linux at any given time. <br/><span class="smaller">open the menu to continue...</span>';
                    break;
                case '#hq-storage':
                    self.text = '^200 This is the HPC data storage, where we store the results of our weather and climate research. Each unit is capable of storing up to 400 petabytes of data. 1<br/><span class="smaller">open the menu to continue...</span>';
                    break;
                case '#cb-outside':
                    self.text = '^200 You’re now standing outside of our collaboration building, located at Exeter Science Park. This building is home to the latest HPC addition and various Met Office teams.<br/><span class="smaller">open the menu to continue...</span>';
                    break;
                case '#cb-hpc':
                    self.text = '^200 The collaboration building HPC is used primarily for research and collaboration data and <br/><span class="smaller">open the menu to continue...</span>';
                    break;
                case '#cb-servers':
                    self.text = '^200 some text about servers at the collaboration building<br/><span class="smaller">open the menu to continue...</span>';
                    break;
                default:
                    break;
            }
        }

        self.typed = new Typed('#typingContainer .text', {
            strings: [self.text],
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
