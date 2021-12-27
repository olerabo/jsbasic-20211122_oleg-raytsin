import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.render();
    this.addEvents();
  }

  render() {
    let ribbon = createElement( `<div class="ribbon"></div>`);
    let arrowLeft = createElement(`
      <button class="ribbon__arrow ribbon__arrow_left">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
    `);
    let arrowRight = createElement(`
      <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
    `);
    let ribbonInner = createElement(`<nav class="ribbon__inner"></nav>`);
    for (let item of this.categories) {
      ribbonInner.append(createElement(`
        <a href="#" class="ribbon__item" data-id="${item.id}">${item.name}</a>
      `));
    }

    ribbon.append(arrowLeft);
    ribbon.append(arrowRight);
    ribbon.append(ribbonInner);

    this.elem = ribbon;
  }

  addEvents() {
    let arrowLeft = this.elem.querySelector('.ribbon__arrow_left');
    let arrowRight = this.elem.querySelector('.ribbon__arrow_right');
    let ribbonInner = this.elem.querySelector('.ribbon__inner');
    
    arrowLeft.addEventListener('click', () => {
      ribbonInner.scrollBy(-350, 0);

    });
    arrowRight.addEventListener('click', () => {
      ribbonInner.scrollBy(350, 0);
    });

    ribbonInner.addEventListener('scroll', () => {
      let scrollWidth = ribbonInner.scrollWidth;
      let scrollLeft = ribbonInner.scrollLeft;
      let clientWidth = ribbonInner.clientWidth;
      let scrollRight = scrollWidth - scrollLeft - clientWidth;

      if (scrollLeft == 0) {
        arrowLeft.classList.remove('ribbon__arrow_visible');
      } else arrowLeft.classList.add('ribbon__arrow_visible');

      if (scrollRight < 1) {
        arrowRight.classList.remove('ribbon__arrow_visible');
      } else arrowRight.classList.add('ribbon__arrow_visible');
    });

    ribbonInner.addEventListener('click', event => {
      event.preventDefault();
      if (event.target.tagName === 'A') {
        if (this.elem.querySelector('.ribbon__item_active')) {
          this.elem.querySelector('.ribbon__item_active').classList.remove('ribbon__item_active');
        }
        event.target.classList.add('ribbon__item_active');

        let e = new CustomEvent('ribbon-select', { 
          detail: event.target.closest('.ribbon__item').dataset.id, 
          bubbles: true
        });
        this.elem.dispatchEvent(e);
      }
    });
  }
}