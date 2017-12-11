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

        let typingText = document.createElement('span');
        typingText.setAttribute('class','text');
        typingContainer.appendChild(typingText);

        // let textSpan = document.createElement('span');
        // textSpan.setAttribute('class','text');
        // typingText.appendChild(textSpan);

        let typingBg = document.createElement('div');
        typingBg.setAttribute('class','bg');
        typingBg.innerHTML = '&nbsp;';
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
        self.text = '^200 Welcome to the Met Office HPC VR Tour ^1000\n Open the menu to begin';
        if(event) {
            switch(event.detail.src) {
                case '#hq-outside':
                    self.text = '^200 You are now outside Met Office HQ, home to two of our three HPC\'s. ^2000\n Open the menu to continue ';
                    break;
                case '#hq-hpc':
                    self.text = '^200 This is the Cray XC40 HPC, capable of 14 thousand  \n million million (10<sup>5</sup>) floating-point operations per second. ^2000\n Open the menu to continue';
                    break;
                case '#hq-servers':
                    self.text = '^200 There are over 300 Linux servers running at any given moment, \n these package and serve data to and from the HPC. ^2000\n Open the menu to continue';
                    break;
                case '#hq-storage':
                    self.text = '^200 This is the HPC data storage archive, contained within are more numbers \n than there are grains of sand on Earth. ^2000\n Open the menu to continue';
                    break;
                case '#cb-outside':
                    self.text = '^200 You’re now outside of the Met Office collaboration building, \n located at Exeter Science Park and home to our third HPC. ^2000\n Open the menu to continue';
                    break;
                case '#cb-hpc':
                    self.text = '^200 This HPC is used primarily by the research community, \n and also helps to test new versions of the forecasting model. ^2000\n Open the menu to continue';
                    break;
                case '#cb-servers':
                    self.text = '^200 This is the Cray Sonexion scale-out Lustre storage system, \n which acts as the hard-drive of the HPC. ^2000\n Open the menu to continue';
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
