const trimPagination = (buttons, activePage, buttonsNearestActiveCount = 1, first = 1) => {
  const count = buttons.length;
  const activeWithNearest = 1 + (buttonsNearestActiveCount * 2);
  const restButtonsCount = 2;

  if (count <= activeWithNearest + restButtonsCount + (first * 2)) {
    return buttons;
  }

  const splicedButtons = [...buttons];
  const restButton = document.createElement('li');
  restButton.innerHTML = '<a class="pagination__link pagination__link--rest">...</a>';

  const lastIndex = count - 1;
  const activeIndex = activePage - 1;
  const beforeActiveIndex = activeIndex - buttonsNearestActiveCount;
  const afterActiveIndex = activeIndex + buttonsNearestActiveCount;

  if (activeIndex + activeWithNearest <= lastIndex) {
    splicedButtons.splice(
      afterActiveIndex + 1,
      lastIndex - afterActiveIndex - first,
      restButton.cloneNode(true)
    );
  }
  if (activeIndex >= activeWithNearest) {
    splicedButtons.splice(
      first,
      beforeActiveIndex - first,
      restButton.cloneNode(true)
    );
  }
  return splicedButtons;
};

const renderPaginationButtons = (state, newPagination) => {
  const paginationList = document.createElement('ul');
  paginationList.classList.add('pagination__list');

  const createButton = (i) => {
    const page = i + 1;
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.classList.add('pagination__link');
    a.setAttribute('href', `?page=${page}`);
    a.textContent = page;
    if (state.page === page) {
      a.classList.add('pagination__link--active');
    }
    li.append(a);
    return li;
  };

  // create all paginate buttons
  let buttons = state.paginatedProducts.map((item, i) => createButton(i));

  // trim buttons
  buttons = trimPagination(buttons, state.page);

  // append buttons
  buttons.forEach((button) => paginationList.append(button));

  // next page button
  if (state.paginatedProducts[state.page]) {
    const button = createButton(state.page);
    button.firstChild.classList.add('pagination__link--next');
    button.firstChild.textContent = 'Следующая';
    paginationList.append(button);
  }

  // prev page button
  if (state.paginatedProducts[state.page - 2]) {
    const button = createButton(state.page - 2);
    button.firstChild.classList.add('pagination__link--prev');
    button.firstChild.textContent = 'Предыдущая';
    paginationList.prepend(button);
  }

  newPagination.replaceChildren(paginationList);
};

const renderPagination = (state) => {
  const content = document.querySelector('.content');
  const pagination = document.querySelector('.pagination');

  if (state.paginatedProducts[0].length <= state.offset && !state.paginatedProducts[1]) {
    pagination?.remove();
    return;
  }

  const newPagination = document.createElement('div');
  newPagination.classList.add('pagination');
  renderPaginationButtons(state, newPagination);
  newPagination.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('pagination__link')) {
      evt.preventDefault();
      if (evt.target.href) {
        const url = new URL(evt.target.href);
        state.page = parseInt(url.searchParams.get('page'), 10);
      }
      renderPaginationButtons(state, newPagination);
    }
  });

  if (pagination) {
    content.replaceChild(newPagination, pagination);
  } else {
    content.append(newPagination);
  }
};

export default renderPagination;
