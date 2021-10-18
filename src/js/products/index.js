import _ from 'lodash';
import onChange from 'on-change';
import { renderProcess, renderProducts } from './view.js';
import getProducts from './fetch.js';
import unwatchedState from '../state.js';
import { sortProducts } from './mock.js';

const app = () => {
  const filterForm = document.querySelector('#form-filter');

  if (!filterForm) {
    return;
  }

  const state = onChange(unwatchedState.productFilter, (path, value, preV) => {
    switch (path) {
      case 'processState':
        renderProcess(state, value);
        break;
      case 'products':
        renderProducts(state);
        break;
      case 'queryParams':
        if (!_.isEqual(value, preV)) {
          getProducts(state);
        }
        break;
      default:
        break;
    }
  });

  /*
   * Filter
   */
  filterForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const formData = new FormData(evt.target);
    const data = Object.fromEntries(formData.entries());
    data.addons = formData.getAll('addons');
    data.page = state.page;
    data.offset = state.offset;

    state.queryParams = data;
  });

  /*
   *  Order
   */
  const order = document.querySelectorAll('.order input');
  order.forEach((input) => {
    input.addEventListener('change', () => {
      const checkedInputs = document.querySelectorAll('.order input:checked');
      const queryParams = [...checkedInputs].reduce((acc, checkedInput) => {
        acc[checkedInput.name] = checkedInput.value;
        return acc;
      }, {});

      // state.queryParams = { ...state.queryParams, ...queryParams }; // for backend
      state.products = sortProducts(state.products, queryParams);
    });
  });

  state.queryParams = null;
};

export default app;
