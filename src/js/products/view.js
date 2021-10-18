const addPreloader = () => {
  const body = document.querySelector('body');
  const preloader = document.createElement('div');
  const spinner = document.createElement('div');
  spinner.classList.add('preloader__spinner');
  preloader.classList.add('preloader');
  preloader.prepend(spinner);
  body.prepend(preloader);
};

const removePreloader = () => {
  const elements = document.querySelectorAll('.preloader');
  elements.forEach((preloader) => {
    preloader.remove();
  });
};

export const renderProcess = (state, processState) => {
  const filterButton = document.querySelector('.filter__btn');

  switch (processState) {
    case 'success':
      removePreloader();
      filterButton.removeAttribute('disabled');
      break;
    case 'error':
      removePreloader();
      filterButton.removeAttribute('disabled');
      console.error(state.error);
      break;
    case 'sending':
      addPreloader();
      filterButton.setAttribute('disabled', 'true');
      break;
    default:
      throw new Error(`wrong process state: ${processState}`);
  }
};

export const renderProducts = ({ products }) => {
  const contentList = document.querySelector('.content__list');
  const wrapper = document.createElement('div');

  products.forEach((product) => {
    const article = (
      `<article class="content__item card" tabindex="0">
        <svg class="browser-icon" width="360" height="40" viewBox="0 0 360 40">
          <path fill="#4D4D4D" d="M356 0H4C1.8 0 0 1.8 0 4v36h360V4c0-2.2-1.8-4-4-4zM22.991 27a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm23.011 0a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm23.011 0a7 7 0 1 1 0-14 7 7 0 0 1 0 14z"></path>
        </svg>
        <img src="${product.imageSrc}" height="576" width="360" alt="Скриншот страницы сайта ${product.title}">
        <footer class="card__footer">
          <h3 class="card__title">${product.title}</h3>
          <p class="card__description">${product.description}</p>
          <button class="card__btn btn" type="button">${product.priceStr}</button>
        </footer>
      </article>`
    );
    wrapper.insertAdjacentHTML('afterbegin', article);
  });

  contentList.innerHTML = wrapper.innerHTML;
};