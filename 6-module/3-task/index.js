import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.carousel = null;

    this.render();
  }

  render() {
    this.carousel = createElement(`<div class="carousel"></div>`);
    let arrowLeft = createElement(`
      <div class="carousel__arrow carousel__arrow_left">
        <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
      </div>
    `)
    let arrowRight = createElement(`
      <div class="carousel__arrow carousel__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </div>
    `)
    let carouselInner = createElement(`<div class="carousel__inner"></div>`)


    for (let slide of this.slides) {
      carouselInner.append(createElement(`
        <div class="carousel__slide" data-id="${slide.id}">
          <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
          <div class="carousel__caption">
            <span class="carousel__price">€${slide.price.toFixed(2)}</span>
            <div class="carousel__title">${slide.name}</div>
            <button type="button" class="carousel__button">
              <img src="/assets/images/icons/plus-icon.svg" alt="icon">
            </button>
          </div>
        </div>
      `)
      );
    }

    this.carousel.append(arrowLeft);
    this.carousel.append(arrowRight);
    this.carousel.append(carouselInner);

    let currentSlideNumber = 1;
    let currentPosition = 0;

    if (currentSlideNumber === 1) arrowLeft.style.display = "none";

    arrowRight.addEventListener("click", function() {
        carouselInner.style.transform = `translateX(-${currentPosition += document.querySelector('.carousel__inner').offsetWidth}px)`;
        currentSlideNumber++;
    })

    arrowLeft.addEventListener("click", function() {
        carouselInner.style.transform = `translateX(-${currentPosition -= document.querySelector('.carousel__inner').offsetWidth}px)`;
        currentSlideNumber--;
    })

    this.carousel.addEventListener("click", function() {
      arrowLeft.style.display = (currentSlideNumber === 1) ? "none" : "";
      arrowRight.style.display = (currentSlideNumber === carouselInner.children.length) ? "none" : "";
    })


    this.carousel.addEventListener('click', function(event) {
      if (event.target.closest('.carousel__button')) {
        const e = new CustomEvent('product-add', {
          detail: event.target.closest('.carousel__slide').dataset.id,
          bubbles: true
        });
        this.dispatchEvent(e);
      }
    });

  }

  get elem() {
    return this.carousel;
  }
}
