const textareaCounter = (state) => {
  const textArea = document.querySelector('[name="message"]');
  const counter = document.createElement('span');
  counter.classList.add('max-count');
  counter.setAttribute('hidden', 'true');
  counter.textContent = state.contactUsForm.textarea.count;
  textArea.after(counter);

  textArea.addEventListener('input', (evt) => {
    state.contactUsForm.textarea.count = evt.target.value.length;
  });
};

export default textareaCounter;
