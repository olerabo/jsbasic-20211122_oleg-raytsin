import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.segments = steps - 1;
    this.render();

    this.addEventListeners();
    this.setSliderValue(value);
    this.setSliderProgress(100 / this.segments * this.value);
  }

  render(){
    this.elem = createElement(`
    <div class="slider">
      <div class="slider__thumb">
        <span class="slider__value">${this.value}</span>
      </div>
      <div class="slider__progress"></div>
      <div class="slider__steps"></div>
    </div>
    `);

    for (let i = 0; i < this.steps; i++) {
      let span = document.createElement('span');
      if (i == this.value) {
        span.classList.add('slider__step-active');
      }
      this.elem.querySelector('.slider__steps').append(span);
    }
  }

  addEventListeners() {
    this.elem.addEventListener('click', event => {
      let leftRelative = this.calcThumbLeft(event);

      let approximateValue = leftRelative * this.segments;
      let value = Math.round(approximateValue);

      this.setSliderValue(value);
      this.setSliderProgress(100 / this.segments * this.value);

      this.addSliderChangeEvent();
    })

    this.elem.querySelector('.slider__thumb').ondragstart = () => false;

    this.elem.querySelector('.slider__thumb').addEventListener('pointerdown', event => {
      event.preventDefault();

      this.elem.classList.add('slider_dragging');

      document.addEventListener('pointermove', this.onPointerMove);
      document.addEventListener('pointerup', this.onPointerUp);
    });   
  }

  calcThumbLeft(event) {
    let left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;

    if (leftRelative < 0) {
      leftRelative = 0;
    }

    if (leftRelative > 1) {
      leftRelative = 1;
    }

    return leftRelative;
  }

  onPointerMove = event => {
    let leftRelative = this.calcThumbLeft(event);

    this.setSliderProgress(leftRelative * 100);

    let approximateValue = leftRelative * this.segments;
    let value = Math.round(approximateValue);

    this.setSliderValue(value);
  };

  onPointerUp = () => {
    document.removeEventListener('pointermove', this.onPointerMove);
    document.removeEventListener('pointerup', this.onPointerUp);

    this.elem.classList.remove('slider_dragging');

    this.setSliderProgress(100 / this.segments * this.value);
    
    this.addSliderChangeEvent();
  };

  setSliderProgress(percents) {
    let thumb = this.elem.querySelector('.slider__thumb');
    let progress = this.elem.querySelector('.slider__progress');

    thumb.style.left = `${percents}%`;
    progress.style.width = `${percents}%`;
  }

  setSliderValue(value) {
    this.elem.querySelector('.slider__value').textContent = value;
    this.elem.querySelector('.slider__step-active').classList.remove('slider__step-active');
    let span = this.elem.querySelector('.slider__steps').children[value];
    span.classList.add("slider__step-active");

    this.value = value;
  }

  addSliderChangeEvent() {
    this.elem.dispatchEvent(
      new CustomEvent('slider-change', {
        detail: this.value,
        bubbles: true
      })
    );
  }

}