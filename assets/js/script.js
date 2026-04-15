document.addEventListener("DOMContentLoaded", function () {

  const carouselElement = document.querySelector('#bannerCarousel');
const carousel = new bootstrap.Carousel(carouselElement, {
    interval: 5000,     // durée entre les slides (5s)
    ride: 'carousel',   // autoplay
    pause: false,       // ne s'arrête pas au hover
    wrap: true,         // boucle infinie
    touch: true       //   swipe mobile
  });

   // Exemple : log quand une slide change
  carouselElement.addEventListener('slide.bs.carousel', function (event) {
    console.log("Slide en cours :", event.to);
  });

});