import 'regenerator-runtime/runtime.js';
import '@popperjs/core';
import '../scss/index.scss';

import runMenuApp from './main-menu/index.js';
import runSliderApp from './slider/index.js';
import runFilterApp from './filter/index.js';
import runContactFormApp from './contact-form/index.js';
import runProductsApp from './products/index.js';
import runCardApp from './products/card/index.js';

const enableJS = () => {
  const elements = document.querySelectorAll('.no-js');

  elements.forEach((element) => {
    element.classList.remove('no-js');
  });
};

document.addEventListener('DOMContentLoaded', () => {
  enableJS();

  runMenuApp();
  runSliderApp();
  runFilterApp();
  runContactFormApp();
  runProductsApp();
  runCardApp();
});
