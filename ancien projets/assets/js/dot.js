const wrapper = document.querySelector('.cards-wrapper');
const cards = document.querySelectorAll('.card-item');
const dotsContainer = document.querySelector('.slider-dots');

// créer les dots
cards.forEach((_, index) => {
  const dot = document.createElement('div');
  dot.classList.add('dot');
  if (index === 0) dot.classList.add('active');

  dot.addEventListener('click', () => {
    wrapper.scrollTo({
      left: cards[index].offsetLeft - 20,
      behavior: 'smooth'
    });
  });

  dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

// gestion du scroll
wrapper.addEventListener('scroll', () => {
  let center = wrapper.scrollLeft + wrapper.offsetWidth / 2;

  cards.forEach((card, index) => {
    const cardCenter = card.offsetLeft + card.offsetWidth / 2;

    if (Math.abs(center - cardCenter) < card.offsetWidth / 2) {
      card.classList.add('active');
      dots.forEach(d => d.classList.remove('active'));
      dots[index].classList.add('active');
    } else {
      card.classList.remove('active');
    }
  });
});