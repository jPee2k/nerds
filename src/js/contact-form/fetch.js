const url = 'https://jsonplaceholder.typicode.com/comments';

const sendData = (state) => {
  // state.contactUsForm.processState = 'sending';
  // setTimeout(() => state.contactUsForm.processState = 'finished', 2000);
  // setTimeout(() => state.contactUsForm.processState = 'error', 2000);

  fetch(url, {
    method: 'POST',
    body: JSON.stringify(state.contactUsForm.fields),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  }).then((response) => {
    if (response.ok) {
      state.contactUsForm.processState = 'finished';
    }
  }).catch((error) => {
    state.contactUsForm.processState = 'error';
    console.error(error);
  });
};

export default sendData;
