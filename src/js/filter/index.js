import onChange from 'on-change';
import unwatchedState from '../state.js';
import filterHandler from './hide.js';

const renderRange = (state, filter) => {
  const legend = document.querySelector('#form-filter .filter__legend--range');
  const label = document.createElement('label');
  label.classList.add('input__wrapper', 'input__wrapper--range');
  label.setAttribute('for', 'range-from');

  const container = document.createElement('div');
  container.classList.add('input__container');

  const sliderTrack = document.createElement('div');
  sliderTrack.classList.add('slider-track');

  const minInput = document.createElement('input');
  minInput.classList.add('input', 'input__range');
  minInput.setAttribute('type', 'range');
  minInput.setAttribute('id', 'range-from');
  minInput.setAttribute('step', state.step);
  minInput.setAttribute('min', state.min);
  minInput.setAttribute('max', state.max);
  minInput.setAttribute('value', state.currMinValue);

  const maxInput = document.createElement('input');
  maxInput.classList.add('input', 'input__range');
  maxInput.setAttribute('type', 'range');
  maxInput.setAttribute('id', 'range-to');
  maxInput.setAttribute('step', state.step);
  maxInput.setAttribute('min', state.min);
  maxInput.setAttribute('max', state.max);
  maxInput.setAttribute('value', state.currMaxValue);

  container.append(sliderTrack);
  container.append(minInput);
  container.append(maxInput);
  label.append(container);
  legend.after(label);

  return {
    priceFrom: filter.querySelector('#price-from'),
    priceTo: filter.querySelector('#price-to'),
    sliderTrack,
    rangeFrom: minInput,
    rangeTo: maxInput,
  };
};

const setAttributes = (state, elements) => {
  elements.forEach((element) => {
    element.setAttribute('step', state.step);
    element.setAttribute('min', state.min);
    element.setAttribute('max', state.max);

    if (element.name === 'price-from') {
      element.setAttribute('value', state.currMinValue);
    }
    if (element.name === 'price-to') {
      element.setAttribute('value', state.currMaxValue);
    }
  });
};

const syncInputValues = (state, elements) => {
  const sync = (element, changeValue) => {
    element.addEventListener('input', (evt) => {
      const value = evt.target.value ? parseInt(evt.target.value, 10) : 0;

      if (value >= state.max) {
        state[changeValue] = state.max;
      }

      state[changeValue] = value;
    });
  };

  sync(elements.rangeFrom, 'currMinValue');
  sync(elements.priceFrom, 'currMinValue');

  sync(elements.rangeTo, 'currMaxValue');
  sync(elements.priceTo, 'currMaxValue');
};

const trimInput = (state, elements) => {
  const trim = (from, to) => {
    from.addEventListener('input', (evt) => {
      if (parseInt(to.value, 10) - parseInt(evt.target.value, 10) <= state.step) {
        const newFromValue = parseInt(to.value, 10) - state.step;
        evt.target.value = newFromValue;
        state.currMinValue = newFromValue;
      }
    });

    to.addEventListener('input', (evt) => {
      if (parseInt(evt.target.value, 10) - parseInt(from.value, 10) <= state.step) {
        const newToValue = parseInt(from.value, 10) + state.step;
        evt.target.value = newToValue;
        state.currMaxValue = newToValue;
      }
    });
  };

  trim(elements.rangeFrom, elements.rangeTo);
  trim(elements.priceFrom, elements.priceTo);
};

const fillColor = (state, elements) => {
  const percent1 = (state.currMinValue / state.max) * 100;
  const percent2 = (state.currMaxValue / state.max) * 100;
  elements.sliderTrack.style.background = (
    `linear-gradient(to right, #d7dcde ${percent1}%, #00ca74 ${percent1}%, #00ca74 ${percent2}%, #d7dcde ${percent2}%)`
  );
};

const renderChanges = (state, elements) => onChange(state, (path, value) => {
  switch (path) {
    case 'currMinValue':
      elements.rangeFrom.value = value;
      elements.priceFrom.value = value;
      fillColor(state, elements);
      break;
    case 'currMaxValue':
      elements.rangeTo.value = value;
      elements.priceTo.value = value;
      fillColor(state, elements);
      break;
    default:
      break;
  }
});

const app = () => {
  const filter = document.querySelector('#form-filter');
  if (!filter) {
    return;
  }

  const initState = unwatchedState.filterPriceRange;
  const elements = renderRange(initState, filter);
  const state = renderChanges(initState, elements);

  setAttributes(state, [elements.priceFrom, elements.priceTo]);
  trimInput(state, elements);
  syncInputValues(state, elements);
  fillColor(state, elements);

  filterHandler();
};

export default app;
