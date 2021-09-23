import _ from 'lodash';
import * as yup from 'yup';
import onChange from 'on-change';

const modalHandler = () => {
  const btn = document.querySelector('.address .btn');
  const modal = document.querySelector('.modal.contact-us');
  const closeBtn = modal.querySelector('.modal__close-btn');
  const firstInput = modal.querySelector('input[name="name"]');

  btn.addEventListener('click', (evt) => {
    evt.preventDefault();
    modal.classList.add('shown');
    firstInput.focus();
  });

  closeBtn.addEventListener('click', (evt) => {
    evt.preventDefault();
    modal.classList.remove('shown');
  });
};

const textareaCounter = (state) => {
  const textArea = document.querySelector('[name="message"]');
  const counter = document.createElement('span');
  counter.classList.add('max-count');
  counter.textContent = state.contactUsForm.textarea.count;
  textArea.after(counter);

  textArea.addEventListener('input', (evt) => {
    state.contactUsForm.textarea.count = evt.target.value.length;
  });
};

const formValidate = (state, form) => {
  const schema = yup.object().shape({
    name: yup.string().trim()
      .max(254, 'Длинна поля 255 символов')
      .required('Поле обязательно к заполнению'),
    email: yup.string()
      .max(254, 'Длинна поля 255 символов')
      .required('Поле обязательно к заполнению')
      .email('Не корректный email адрес'),
    message: yup.string()
      .max(state.contactUsForm.textarea.maxCount, 'Превышено количество допустимых символов'),
  });

  const onSubmitHandler = (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);

    try {
      const fields = Object.fromEntries(formData);
      state.contactUsForm.fields = schema.validateSync(fields, { abortEarly: false });

      // TODO fetch
      console.log('todo fetch here');
    } catch (err) {
      state.contactUsForm.errors = _.keyBy(err.inner, 'path');
    }
  };

  form.addEventListener('submit', onSubmitHandler);
};

const removeStyles = (form) => {
  const inputsWithError = form.querySelectorAll('.error');
  inputsWithError.forEach((input) => {
    input.classList.remove('error');
  });

  const existsErrors = form.querySelectorAll('span.text-error');
  existsErrors.forEach((error) => {
    error.remove();
  });
};

let timeoutId = null;
const renderErrors = (form, errors) => {
  removeStyles(form);
  const errorsEntries = Object.entries(errors);
  errorsEntries.forEach(([key, value]) => {
    const element = form.querySelector(`[name="${key}"]`);
    const newError = document.createElement('span');

    newError.classList.add('text-error');
    newError.textContent = value.message;

    element.classList.add('error');
    element.after(newError);

    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => removeStyles(form), 5000);
  });
};

const playAnimation = (selector) => {
  const el = document.querySelector(selector);
  el.classList.add('drag');

  setTimeout(() => {
    el.classList.remove('drag');
  }, 300);
};

const renderSymbsCounter = (state) => {
  const { textarea } = state.contactUsForm;
  const counter = document.querySelector('.max-count');

  if (textarea.count > textarea.maxCount) {
    counter.classList.add('danger');
  } else {
    counter.classList.remove('danger');
  }

  counter.textContent = state.contactUsForm.textarea.count;
};

const app = () => {
  const form = document.querySelector('.contact-us__form');
  const unwatchedState = {
    contactUsForm: {
      fields: {},
      errors: {},
      textarea: {
        count: 0,
        maxCount: 1024,
      },
    },
  };

  const state = onChange(unwatchedState, (path, value) => {
    switch (path) {
      case 'contactUsForm.errors':
        renderErrors(form, value);
        playAnimation('.modal');
        break;
      case 'contactUsForm.textarea.count':
        renderSymbsCounter(state);
        break;
      default:
        break;
    }
  });

  modalHandler();
  textareaCounter(state);
  formValidate(state, form);
};

export default app;
