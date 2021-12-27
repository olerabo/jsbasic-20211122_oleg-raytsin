import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.segments = steps -1;
    this.render();
    this.addEvents();
    
    this.setSliderValue(value);
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

  addEvents() {
    this.elem.addEventListener('click', event => {
      let segmentWidth = this.elem.offsetWidth / (this.segments);
      let rect = this.elem.getBoundingClientRect();
      let left = event.clientX - rect.left;
      let newValue = Math.round(left / segmentWidth);

      this.setSliderValue(newValue);

      this.elem.dispatchEvent(
        new CustomEvent('slider-change', {
          detail: this.value,
          bubbles: true
        })
      );
    })
  }

  setSliderValue(value) {
    this.elem.querySelector('.slider__value').textContent = value;
    this.elem.querySelector('.slider__step-active').classList.remove('slider__step-active');
    let span = this.elem.querySelector('.slider__steps').children[value];
    span.classList.add("slider__step-active");

    let thumb = this.elem.querySelector('.slider__thumb');
    let progress = this.elem.querySelector('.slider__progress');

    let leftPercents = (value / this.segments) * 100;

    thumb.style.left = `${leftPercents}%`;
    progress.style.width = `${leftPercents}%`;

    this.value = value;
  }
}