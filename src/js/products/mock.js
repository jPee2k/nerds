import _ from 'lodash';

/*
 * This is a temp file
 * while backend is not ready
 */

const grid = ['adaptive', 'fixed', 'flexible'];
const addons = ['slider', 'advantages', 'news', 'gallery', 'cart'];

const filterProducts = (products, queryParams) => {
  if (!queryParams) {
    return products;
  }

  let filteredProducts = products;

  if (_.has(queryParams, 'price-from')) {
    filteredProducts = filteredProducts.filter((product) => {
      const priceFrom = parseInt(queryParams['price-from'], 10);
      const priceTo = parseInt(queryParams['price-to'], 10);

      return product.price >= priceFrom && product.price <= priceTo;
    });
  }

  if (_.has(queryParams, 'grid') && queryParams?.grid !== 'all') {
    filteredProducts = filteredProducts.filter((product) => product.grid === queryParams.grid);
  }

  if (_.has(queryParams, 'addons')) {
    queryParams.addons.forEach((addon) => {
      filteredProducts = filteredProducts.filter((product) => product.addons.includes(addon));
    });
  }

  return filteredProducts;
};

export const sortProducts = (products, queryParams) => {
  if (!queryParams) {
    return products;
  }

  let sortedBy;
  switch (queryParams.order) {
    case 'price':
      sortedBy = _.sortBy(products, (product) => product.price);
      break;
    case 'name':
      sortedBy = _.sortBy(products, (product) => product.title);
      break;
    case 'type':
      sortedBy = _.sortBy(products, (product) => product.grid);
      break;
    default:
      sortedBy = products;
  }

  if (queryParams.direction === 'desc' && products !== sortedBy) {
    sortedBy = sortedBy.reverse();
  }

  return sortedBy;
};

const prepareProducts = (state, products) => {
  const allProducts = products.map((product) => {
    const price = (product.price * 100.3);
    const priceStr = price.toLocaleString(undefined, { style: 'currency', currency: 'rub' });

    return {
      id: product.id,
      title: product.product_name,
      description: product.department,
      grid: _.sample(grid),
      addons: _.sampleSize(addons, _.random(0, 3)),
      price,
      priceStr,
      imageSrc: `https://loremflickr.com/360/576/website?lock=${product.id}`,
      created_at: Date.now(),
    };
  });

  const filteredProducts = filterProducts(allProducts, state.queryParams);
  return sortProducts(filteredProducts, state.queryParams);
};

export default prepareProducts;
