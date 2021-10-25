export const showCardData = (element = document) => {
  const cardButtons = [...element.querySelectorAll('.card .card__btn')];

  if (cardButtons.length === 0) {
    return;
  }

  cardButtons.forEach((btn) => {
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
