import Popup from "./Popup.js";

export default class PopupWithForm extends Popup{
  constructor ({popupSelector, callbackFormSubmit}) {
    super(popupSelector);
    this.callbackFormSubmit = callbackFormSubmit;
  }

  _getInputValues() {
    const inputList = Array.from(this._popup.querySelectorAll('.popup__input'));
    const inputsValues =  inputList.map(input => input.value);

    return inputsValues;
  }

  setEventListeners() {
    this._popup.querySelector('.popup__form')
    .addEventListener('submit', (evt) => {
      evt.preventDefault();

      this.callbackFormSubmit(this._getInputValues);
    });

    super.setEventListeners();
  }

  close() {
    this._popup.querySelector('form').reset()

    super.close();
  }

}
