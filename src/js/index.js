import '@popperjs/core';
import '../scss/index.scss';
import state from './state';
import runContactFormApp from './contact-us-form/app.js';
import runSliderApp from './slider/app.js';
import runFilterApp from './filter/app.js';
import runHelpers from './card/app.js';

window.onload = () => {
  runContactFormApp(state);
  runSliderApp();
  runFilterApp(state);
  runHelpers();
};
