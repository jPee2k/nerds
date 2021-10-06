import _ from 'lodash';
import * as yup from 'yup';
import onChange from 'on-change';
import unwatchedState from '../state.js';
import textareaCounter from './textarea-counter.js';
import sendData from './fetch.js';
import { saveUserData, getUserData } from './storage.js';
import {
  renderErrors, playAnimation, renderSymbsCounter, renderChanges, removeStyles,
} from './view.js';

const modalHandler = (form) => {
  const body = document.querySelector('body');
  const btn = document.querySelector('.address .address__btn');
  const modal = document.querySelector('.modal.contact-us');
  const closeBtn = modal.querySelector('.modal__close-btn');
  const nameInput = modal.querySelector('[name="name"]');
  const emailInput = modal.querySelector('[name="email"]');
  const messageArea = modal.querySelector('[name="message"]');

  btn.addEventListener('click', (evt) => {
    evt.preventDefault();
    modal.classList.add('modal--shown');
    body.classList.add('disable-scrolling');

    nameInput.value = getUserData('name');
    emailInput.value = getUserData('email');

    if (emailInput.value && nameInput.value) {
      messageArea.focus();
    } else {
      nameInput.focus();
    }
  });

  const closeModal = (evt) => {
    evt.preventDefault();
    modal.classList.remove('modal--shown', 'modal--drag');
    body.classList.remove('disable-scrolling');
    removeStyles(form);
  };

  closeBtn.addEventListener('click', (evt) => {
    closeModal(evt);
  });

  window.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape' && modal.classList.contains('modal--shown')) {
      closeModal(evt);
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

  if (!form) {
    return;
  }

  const state = onChange(unwatchedState, (path, value) => {
    switch (path) {
      case 'contactUsForm.errors':
        renderErrors(state, form, value);
        playAnimation('.modal', 'modal--drag');
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

  modalHandler(form);
  formHandler(state, form);
  textareaCounter(state);
};

export default app;
