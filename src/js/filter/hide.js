const hideFilter = () => {
  const hideButton = document.querySelector('.filter__hide-button');
  const hiddenFilter = document.querySelector('.filter--hidden');

  // TODO -> hide when resize
  hideButton.addEventListener('click', () => {
    hiddenFilter.classList.toggle('filter--hidden');
  });
};

export default hideFilter;
