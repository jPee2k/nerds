import '@popperjs/core';
import '../scss/index.scss';

import runContactFormApp from './contact-form/index.js';
import runSliderApp from './slider/index.js';
import runFilterApp from './filter/index.js';
import runCardApp from './card/index.js';
import runMenuApp from './main-menu/index.js';

const enableJS = () => {
  const elements = document.querySelectorAll('.no-js');

  elements.forEach((element) => {
    element.classList.remove('no-js');
  });
};

document.addEventListener('DOMContentLoaded', () => {
  enableJS();

  runContactFormApp();
  runSliderApp();
  runFilterApp();
  runCardApp();
  runMenuApp();
});
