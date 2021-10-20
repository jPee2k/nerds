import prepareProducts from './mock.js';

const setParams = (url, data) => {
  Object.entries(data).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });
};

const getProducts = (state) => {
  const baseUrl = 'https://random-data-api.com/api/commerce/random_commerce?size=30';
  const url = new URL(baseUrl);

  if (state.queryParams) {
    setParams(url, state.queryParams);
  }

  state.processState = 'sending';
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      state.processState = 'success';
      state.products = prepareProducts(state, data); // temp => while has not backend
    })
    .catch((err) => {
      state.error = err.message;
      state.processState = 'error';
      throw new Error(err.message);
    });
};

export default getProducts;
