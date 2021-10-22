import _ from 'lodash';
import onChange from 'on-change';
import unwatchedState from '../state.js';
import getProducts from './fetch.js';
import {
  renderProcess, renderProducts, renderMessage, removeMessage, removeContent, scrollTo,
} from './view.js';
import { sortProducts } from './mock.js';
import renderPagination from './pagination.js';

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
        if (value.length) {
          removeMessage();
          state.paginatedProducts = _.chunk(value, state.offset);
        } else {
          removeContent();
          renderMessage('.content', 'Извините, но по вашему запросу ничего не найдено =(');
        }
        break;
      case 'paginatedProducts':
        if (value[state.page - 1]) {
          renderProducts(value[state.page - 1]);
          renderPagination(state);
        }
        break;
      case 'page':
        renderProducts(state.paginatedProducts[value - 1]);
        scrollTo('.card');
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

    state.page = 1;
    state.queryParams = data;
  });

  /*
   *  Order
   */
  const orderInputs = document.querySelectorAll('.order input');
  orderInputs.forEach((input) => {
    input.addEventListener('change', (evt) => {
      const checkedOrder = document.querySelector('.order input[name="order"]:checked');
      const checkedDirection = document.querySelector('.order input[name="direction"]:checked');

      // auto pick direction / order
      if (evt.target.name === 'order' && !checkedDirection) {
        const direction = document.querySelector('.order input[name="direction"][value="asc"]');
        direction.checked = true;
      } else if (evt.target.name === 'direction' && !checkedOrder) {
        const order = document.querySelector('.order input[name="order"]');
        order.checked = true;
      }

      const checkedInputs = document.querySelectorAll('.order input:checked');
      const queryParams = [...checkedInputs].reduce((acc, checkedInput) => {
        acc[checkedInput.name] = checkedInput.value;
        return acc;
      }, {});

      // for backend
      // state.queryParams = { ...state.queryParams, ...queryParams };
      state.page = 1;
      state.products = sortProducts(state.products, queryParams);
    });
  });

  state.queryParams = null;
};

export default app;
