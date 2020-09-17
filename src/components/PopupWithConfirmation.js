import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    // this.handler = (evt) => {
    //   if(evt.key === 13) {
    //     this.close();
    //   }
    // };
    // document.addEventListener('keypress', this.handler);
  }
  //
  // close() {
  //   const onclickButton = this._popup.querySelector('.popup__form-button');
  //   onclickButton.onclick = super.close();
  // }

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
