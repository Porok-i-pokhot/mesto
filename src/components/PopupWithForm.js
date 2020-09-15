import Popup from "./Popup.js";

export default class PopupWithForm extends Popup{
  constructor ({popupSelector, callbackFormSubmit}) {
    super(popupSelector);
    this.callbackFormSubmit = callbackFormSubmit;
    this._loadButton = this._popup.querySelector('.popup__form-button');

  }

  _getInputValues() {
    const inputList = Array.from(this._popup.querySelectorAll('.popup__input'));
    const inputsValues = {};
    inputList.forEach(input => inputsValues[input.name] = input.value);

    return inputsValues;
  }

  setLoadingText() {
      this._loadButton.textContent = 'Сохранение...';
  }

  setDefaultText() {
  this._loadButton.textContent = 'Сохранить';
}

  setEventListeners() {
    this._popup.querySelector('.popup__form')
    .addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.callbackFormSubmit(this._getInputValues());
    });

    super.setEventListeners();
  }

  close() {
    this._popup.querySelector('form').reset()

    super.close();
  }

}
