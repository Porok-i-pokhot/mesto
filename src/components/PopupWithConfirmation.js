import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
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
