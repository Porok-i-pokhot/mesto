import Popup from "./Popup.js";

export default class PopupWithForm extends Popup{
  constructor ({popupSelector, callbackFormSubmit}) {
    super(popupSelector);
    this.callbackFormSubmit = callbackFormSubmit;
  }

  _getInputValues() {
    const inputList = Array.from(popupSelector.querySelectorAll('.popup__input'));
    const inputsValues =  inputList.map(input => input.value);

    return inputsValues;
  }

  setEventListeners() {
    popupSelector.querySelector('.popup__form')
    .addEventListener('submit', () => {
      this.callbackFormSubmit(this._getInputValues);
    });

    super.setEventListeners();
  }

  close() {
    popupSelector.querySelector('form').reset()

    super.close();
  }

}
