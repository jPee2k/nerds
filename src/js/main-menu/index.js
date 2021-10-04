const app = () => {
  const navToggle = document.querySelector('.nav__toggle');
  const navMenu = navToggle.parentElement.querySelector('.nav__wrapper');

  const closeMenu = () => {
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Открыть меню');
    navToggle.classList.remove('nav__toggle--active');
    navMenu.classList.remove('nav__wrapper--shown');
  };

  const openMenu = () => {
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.setAttribute('aria-label', 'Закрыть меню');
    navToggle.classList.add('nav__toggle--active');
    navMenu.classList.add('nav__wrapper--shown');
  };

  const onToggleClick = (evt) => {
    const expanded = evt.currentTarget.getAttribute('aria-expanded');

    if (expanded === 'false') {
      openMenu();
    } else {
      closeMenu();
    }
  };

  navToggle.addEventListener('click', onToggleClick);
  window.addEventListener('resize', closeMenu);
};

export default app;
