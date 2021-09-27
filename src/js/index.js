import '@popperjs/core';
import '../scss/index.scss';
import state from './state';
import runContactFormApp from './contact-us-form/app.js';
import runSliderApp from './slider/app.js';

runContactFormApp(state);
runSliderApp();
