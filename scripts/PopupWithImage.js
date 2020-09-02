import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(data) {
    this.data = data;
  }

  open() {
    this._imagePopupDataImg = this._popupSelector.querySelector('.popup__image'); //картинка внутри попапа открытия картинки
    this._imagePopupTitle = this._popupSelector.querySelector('.popup__title-img'); //заговолок внутри попапа открытия картинки
    this._imagePopupDataImg.src = this._data.link;
    this._imagePopupDataImg.alt = this._data.name;
    this._imagePopupTitle.textContent = this._data.name;

    super.open();
  }
}
