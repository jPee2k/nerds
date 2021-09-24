import _ from 'lodash';
import * as yup from 'yup';
import onChange from 'on-change';
import textareaCounter from './textarea-counter.js';
import sendData from './fetch.js';
import { saveUserData, getUserData } from './storage.js';
import {
  renderErrors, playAnimation, renderSymbsCounter, renderChanges,
} from './view.js';

const modalHandler = () => {
  const btn = document.querySelector('.address .btn');
  const modal = document.querySelector('.modal.contact-us');
  const closeBtn = modal.querySelector('.modal__close-btn');
  const nameInput = modal.querySelector('[name="name"]');
  const emailInput = modal.querySelector('[name="email"]');
  const messageArea = modal.querySelector('[name="message"]');

  btn.addEventListener('click', (evt) => {
    evt.preventDefault();
    modal.classList.add('shown');

    nameInput.value = getUserData('name');
    emailInput.value = getUserData('email');

    if (emailInput.value && nameInput.value) {
      messageArea.focus();
    } else {
      nameInput.focus();
    }
  });

  closeBtn.addEventListener('click', (evt) => {
    evt.preventDefault();
    modal.classList.remove('shown');
  });

  window.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape' && modal.classList.contains('shown')) {
      evt.preventDefault();
      modal.classList.remove('shown');
    }
  });
};

const formHandler = (state, form) => {
  const schema = yup.object().shape({
    name: yup.string().trim()
      .max(254, 'Длинна поля 255 символов')
      .required('Поле обязательно к заполнению'),
    email: yup.string()
      .max(254, 'Длинна поля 255 символов')
      .required('Поле обязательно к заполнению')
      .email('Не корректный email адрес'),
    message: yup.string()
      .max(state.contactUsForm.textarea.maxCount, 'Превышено количество допустимых символов')
      .required('Поле обязательно к заполнению'),
  });

  const onSubmitHandler = (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);

    try {
      const fields = Object.fromEntries(formData);
      state.contactUsForm.fields = schema.validateSync(fields, { abortEarly: false });
      state.contactUsForm.processState = 'sending';
    } catch (err) {
      state.contactUsForm.errors = _.keyBy(err.inner, 'path');
    }

    if (state.contactUsForm.processState === 'sending') {
      saveUserData({
        name: state.contactUsForm.fields.name,
        email: state.contactUsForm.fields.email,
      });

      sendData(state);
    }
  };

  form.addEventListener('submit', onSubmitHandler);
};

const app = () => {
  const form = document.querySelector('.contact-us__form');
  const unwatchedState = {
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

  const state = onChange(unwatchedState, (path, value) => {
    switch (path) {
      case 'contactUsForm.errors':
        renderErrors(state, form, value);
        playAnimation('.modal');
        break;
      case 'contactUsForm.textarea.count':
        renderSymbsCounter(state);
        break;
      case 'contactUsForm.processState':
        renderChanges(state, form, value);
        break;
      default:
        break;
    }
  });

  modalHandler();
  formHandler(state, form);
  textareaCounter(state);
};

export default app;
