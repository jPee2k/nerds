import generalState from '../state.js';

const app = () => {
  const slider = document.querySelector('.slider');

  if (!slider) {
    return;
  }

  const state = generalState.slider;

  const sliderList = slider.querySelector('.slider__list');
  const sliderNav = slider.querySelector('.slider__nav');
  const navItems = [...sliderNav.querySelectorAll('.slider__nav-item')];

  const getLinkedSlide = (navItem) => sliderList.querySelector(`#${navItem.dataset.id}`);
  const toggleSlide = (navItem) => {
    const activeNavItem = sliderNav.querySelector('.slider__nav-item.active');
    activeNavItem.classList.remove('active');

    const shownSlide = sliderList.querySelector('.slider__item.shown');
    shownSlide.classList.remove('shown');

    getLinkedSlide(navItem).classList.add('shown');
    navItem.classList.add('active');
  };

  const newInterval = () => {
    if (state.timerId) {
      clearInterval(state.timerId);
    }

    state.timerId = setInterval(() => {
      if (state.slideIndex < navItems.length - 1) {
        state.slideIndex += 1;
      } else {
        state.slideIndex = 0;
      }
      toggleSlide(navItems[state.slideIndex]);
    }, 12000);
  };

  const onButtonClickHandler = (evt) => {
    state.slideIndex = navItems.indexOf(evt.target);

    toggleSlide(evt.target);
    newInterval();
  };

  navItems.forEach((navItem) => {
    navItem.addEventListener('click', (evt) => {
      onButtonClickHandler(evt);
      getLinkedSlide(evt.target).focus();
    });
    navItem.addEventListener('keyup', (evt) => {
      if (evt.code === 'Enter' || evt.code === 'Space') {
        onButtonClickHandler(evt);
      }
    });
  });

  newInterval();
};

export default app;
