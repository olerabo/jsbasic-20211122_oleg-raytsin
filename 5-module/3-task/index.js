function initCarousel() {

  let carousel = document.querySelector(".carousel");
  let carouselInner = document.querySelector(".carousel__inner");
  let carouselWidth = carouselInner.offsetWidth;

  let carouselArrowLeft = carousel.querySelector(".carousel__arrow_left");
  let carouselArrowRight = carousel.querySelector(".carousel__arrow_right");

  let currentSlideNumber = 1;
  let currentPosition = 0;

  if (currentSlideNumber === 1) carouselArrowLeft.style.display = "none";

  carouselArrowRight.addEventListener("click", function() {
      carouselInner.style.transform = `translateX(-${currentPosition += carouselWidth}px)`;
      currentSlideNumber++;
  })

  carouselArrowLeft.addEventListener("click", function() {
      carouselInner.style.transform = `translateX(-${currentPosition -= carouselWidth}px)`;
      currentSlideNumber--;
  })

  carousel.addEventListener("click", function() {
    carouselArrowLeft.style.display = (currentSlideNumber === 1) ? "none" : "";
    carouselArrowRight.style.display = (currentSlideNumber === carouselInner.children.length) ? "none" : "";
  })
  
}