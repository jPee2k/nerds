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

export const renderErrors = (state, form, errors) => {
  removeStyles(form);
  const errorsEntries = Object.entries(errors);
  errorsEntries.forEach(([key, value]) => {
    const element = form.querySelector(`[name="${key}"]`);
    const newError = document.createElement('span');

    newError.classList.add('text-error');
    newError.textContent = value.message;

    element.classList.add('error');
    element.after(newError);

    if (state.contactUsForm.timeoutId) {
      clearTimeout(state.contactUsForm.timeoutId);
    }
    state.contactUsForm.timeoutId = setTimeout(() => removeStyles(form), 5000);
  });
};

export const playAnimation = (selector, animation) => {
  const el = document.querySelector(selector);
  el.classList.remove(animation);
  el.style.width = el.offsetWidth;
  el.classList.add(animation);
};

export const renderSymbsCounter = (state) => {
  const { textarea } = state.contactUsForm;
  const counter = document.querySelector('.max-count');

  if (textarea.count > textarea.maxCount) {
    counter.classList.add('danger');
  } else {
    counter.classList.remove('danger');
  }

  counter.removeAttribute('hidden');
  counter.textContent = state.contactUsForm.textarea.count;
};

export const renderChanges = (state, form, value) => {
  const modal = document.querySelector('.modal.contact-us');
  const submitBtn = form.querySelector('.contact-us__btn');
  const textareaCounter = form.querySelector('.max-count');

  switch (value) {
    case 'sending':
      submitBtn.classList.add('spinner');
      submitBtn.setAttribute('disabled', 'true');
      break;
    case 'error':
      submitBtn.classList.remove('spinner');
      submitBtn.removeAttribute('disabled');
      // TODO call error message
      break;
    case 'finished':
      form.reset();
      submitBtn.classList.remove('spinner');
      submitBtn.removeAttribute('disabled');
      textareaCounter.setAttribute('hidden', 'true');
      modal.classList.remove('shown', 'drag');
      // TODO call success message
      break;
    default:
      throw new Error(`incorrect state -> ${value}`);
  }
};
