const app = () => {
  const slider = document.querySelector('.slider');

  if (!slider) {
    return;
  }

  const sliderNav = slider.querySelector('.slider__nav');
  const sliderList = slider.querySelector('.slider__list');

  const navItems = [...sliderNav.querySelectorAll('.slider__nav-item')];
  const sliderItems = sliderList.querySelectorAll('.slider__item');

  const newInterval = (currentInterval = null, index = 0) => {
    clearInterval(currentInterval);

    let i = index;
    return setInterval(() => {
      if (i < sliderItems.length - 1) {
        i += 1;
      } else {
        i = 0;
      }

      navItems[i].click();
    }, 5000);
  };

  let timerId = newInterval();

  navItems.forEach((navItem) => {
    navItem.addEventListener('click', (evt) => {
      timerId = newInterval(timerId, navItems.indexOf(navItem));

      const activeNav = sliderNav.querySelector('.slider__nav-item.active');
      activeNav.classList.remove('active');

      const shownSlide = sliderList.querySelector('.slider__item.shown');
      shownSlide.classList.remove('shown');

      const slide = sliderList.querySelector(`#${evt.target.dataset.id}`);
      slide.classList.add('shown');
      evt.target.classList.add('active');
    });

    navItem.addEventListener('keyup', (evt) => {
      if (evt.key === 'Enter') {
        evt.target.click();
      }
    });
  });
};

export default app;
