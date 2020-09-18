import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this.handler = (evt) => {
      if(evt.key === "Enter") {
        this.callbackFormSubmit();
        this.close();
      }
    };
  }


  _handleEnterClose() {
    document.addEventListener('keypress', this.handler);
  }

  open() {
    this._handleEnterClose();
    super.open();
  }

  close() {
    document.removeEventListener('keypress', this.handler);
    super.close();
  }

  setCallbackSubmit(submitHandlerAction) {
    this.callbackFormSubmit = submitHandlerAction;
  }

  setEventListeners() {
    this._popup.querySelector('.popup__form')
      .addEventListener('submit', (evt) => {
        evt.preventDefault();
        this.callbackFormSubmit();
      });

    super.setEventListeners();
  }


}
