import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super (popupSelector);
    // this._data = data;

  }


  open(link, name) {
    debugger;

    this._imagePopupDataImg = this._popup.querySelector('.popup__image'); //картинка внутри попапа c картинкой
    this._imagePopupTitle = this._popup.querySelector('.popup__title-img'); //заговолок внутри попапа c картинкой
    this._imagePopupDataImg.src = link;
    this._imagePopupDataImg.alt = name;
    this._imagePopupTitle.textContent = name;

    super.open();
  }
}
