const state = {
  contactUsForm: {
    processState: 'filling', // 'sending', 'error', 'finished'
    fields: {}, // validated data
    errors: {}, // arr of validation err
    timeoutId: null,
    textarea: {
      count: 0,
      maxCount: 1024,
    },
  },
  productFilter: {
    processState: 'filling', // sending, success, error
    products: [],
    queryParams: [],
    errors: [],
    page: 1,
    offset: 6,
  },
  filterPriceRange: {
    min: 0,
    max: 21500,
    step: 50,

    currMinValue: 0,
    currMaxValue: 15000,
  },
  slider: {
    slideIndex: 0,
    timerId: null,
  },
};

export default state;
