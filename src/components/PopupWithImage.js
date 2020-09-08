import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super (popupSelector);
    this._imagePopupDataImg = this._popup.querySelector('.popup__image'); //картинка внутри попапа c картинкой
    this._imagePopupTitle = this._popup.querySelector('.popup__title-img'); //заговолок внутри попапа c картинкой
  }


  open(imageSrc, name) {

    this._imagePopupDataImg.src = imageSrc;
    this._imagePopupDataImg.alt = name;
    this._imagePopupTitle.textContent = name;

    super.open();
  }
}
