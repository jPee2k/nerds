const showCardData = () => {
  const cardBtns = [...document.querySelectorAll('.card .card__btn')];

  if (cardBtns.length === 0) {
    return;
  }

  cardBtns.forEach((btn) => {
    btn.addEventListener('focus', (evt) => {
      const cardFooter = evt.target.parentElement;
      cardFooter.classList.add('shown');
    });

    btn.addEventListener('blur', (evt) => {
      const cardFooter = evt.target.parentElement;
      cardFooter.classList.remove('shown');
    });
  });
};

const app = () => {
  showCardData();
};

export default app;
