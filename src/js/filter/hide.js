const filterHandler = () => {
  const hideButton = document.querySelector('.filter__hide-button');
  const filter = document.querySelector('.filter');

  const hideFilter = () => {
    filter.classList.add('filter--hidden');
    filter.removeAttribute('tabindex');
    hideButton.setAttribute('aria-expanded', 'false');
    hideButton.setAttribute('aria-label', 'Развернуть фильтр товаров');
  };
  const showFilter = () => {
    filter.classList.remove('filter--hidden');
    filter.setAttribute('tabindex', '0');
    hideButton.setAttribute('aria-expanded', 'true');
    hideButton.setAttribute('aria-label', 'Свернуть фильтр товаров');
  };

  hideButton.addEventListener('click', () => {
    if (filter.classList.contains('filter--hidden')) {
      showFilter();
    } else {
      hideFilter();
    }
  });

  window.addEventListener('resize', hideFilter);
  window.addEventListener('focus', (evt) => {
    if (!(evt.target instanceof Node)) {
      return;
    }
    if (!filter.contains(evt.target)) {
      hideFilter();
    }
  }, true);

  hideFilter();
};

export default filterHandler;
