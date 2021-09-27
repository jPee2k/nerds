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
};

export default state;
