import '@popperjs/core';
import '../scss/index.scss';

import runContactFormApp from './contact-form/index.js';
import runSliderApp from './slider/index.js';
import runFilterApp from './filter/index.js';
import runCardApp from './card/index.js';

window.onload = () => {
  runContactFormApp();
  runSliderApp();
  runFilterApp();
  runCardApp();
};
