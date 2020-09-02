export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;

    this.handler = (evt) => {
      if(evt.key === "Escape") {
        this.close();
      };
    };
  }


//открытие попапов и добавление слушателя по нажатию на Esc
  open() {
    this._handleEscClose(this._popupSelector);
    this._popupSelector.classList.add('popup_opened');
  }


//закрытие попапов
  close() {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', this.handler);
  }


// закрытие попапа по Esc
  _handleEscClose() {
    document.addEventListener('keydown', this.handler);
  }

  //слушатель клика по крестику
  setEventListeners() {
    this._popupSelector.
    querySelector('.popup__close-icon')
    .addEventListener('click', () => {
      closePopup(this._popupSelector);
    });
  }

}
