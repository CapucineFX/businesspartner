document.addEventListener("DOMContentLoaded", function () {

  const carouselElement = document.querySelector('#bannerCarousel');

  const carousel = new bootstrap.Carousel(carouselElement, {

    touch: true         // swipe mobile
  });

  // Exemple : log quand une slide change
  carouselElement.addEventListener('slide.bs.carousel', function (event) {
    console.log("Slide en cours :", event.to);
  });

});