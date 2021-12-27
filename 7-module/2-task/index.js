import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.render();
    this.addEvents();
  }

  render() {
    this.modal = createElement(`
      <div class="modal">
        <div class="modal__overlay"></div>
        <div class="modal__inner">
          <div class="modal__header">
            <!--Кнопка закрытия модального окна-->
            <button type="button" class="modal__close">
              <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
            </button>

            <h3 class="modal__title"></h3>
            <div class="modal__body"></div>
          </div>
        </div>

      </div>`
    );
  }

  setTitle(modalTitle) {
    this.modal.querySelector('.modal__title').append(modalTitle); 
  }

  setBody(modalBody) {
    this.modal.querySelector('.modal__body').innerHTML = "";
    this.modal.querySelector('.modal__body').append(modalBody);
  }

  open() {
    document.body.classList.add('is-modal-open');
    document.body.append(this.modal);
  }

  close() {
    document.removeEventListener('keydown', this.keydownEvent);
    document.body.classList.remove('is-modal-open');
    this.modal.remove();
  }

  onKeydown(event) {
    if (event.code === 'Escape') {
      event.preventDefault();
      this.close();
    }
  }

  addEvents() {
    let closeBtn = this.modal.querySelector('.modal__close');
    closeBtn.addEventListener('click', () => this.close());

    this.keydownEvent = (event) => this.onKeydown(event);
    document.addEventListener('keydown', this.keydownEvent);
  }
}