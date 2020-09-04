import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super (popupSelector);
    // this._data = data;

  }

  open(link, name) {
    this._imagePopupDataImg = this._popup.querySelector('.popup__image'); //картинка внутри попапа открытия картинки
    this._imagePopupTitle = this._popup.querySelector('.popup__title-img'); //заговолок внутри попапа открытия картинки
    this._imagePopupDataImg.src = link;
    this._imagePopupDataImg.alt = name;
    this._imagePopupTitle.textContent = name;

    super.open();
  }
}
