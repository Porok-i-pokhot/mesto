export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeIcon = this._popup.querySelector('.popup__close-icon');
    this.handler = (evt) => {
      if(evt.key === "Escape") {
        this.close();
      };
    };


    this._popup.addEventListener('click', (evt) => {
      const isPopup = evt.target.classList.contains('popup');
      if(isPopup) {
        this.close();
      }
    });
  }


//открытие попапов и добавление слушателя по нажатию на Esc
  open() {
    this._handleEscClose(this._popup);
    this._popup.classList.add('popup_opened');
  }


//закрытие попапов
  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this.handler);
  }


// закрытие попапа по Esc
  _handleEscClose() {
    document.addEventListener('keydown', this.handler);
  }

  //слушатель клика по крестику
  setEventListeners() {
    this._closeIcon.addEventListener('click', () => {
      this.close(this._popup);
    });
  }

}
