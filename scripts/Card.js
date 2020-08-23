import {imagePopup, openPopup} from './utils.js';

export default class Card {
  constructor(data, cardSelector) {
    this._data = data;
    this._cardSelector = cardSelector;
  }

  _handleImageClick() {
    this._imagePopupDataImg = imagePopup.querySelector('.popup__image');
    this._imagePopupTitle = imagePopup.querySelector('.popup__title-img');
    this._imagePopupDataImg.src = this._data.link;
    this._imagePopupDataImg.alt = this._data.name;
    this._imagePopupTitle.textContent = this._data.name;
  };


  _clickHandlerOpenPopup() {
    this._cardImage.addEventListener('click', () => {
      openPopup(imagePopup);
      this._handleImageClick(this._data);
    })
  }

  _clickHandlerCardLike() {
    this._cardLike = this._cardElement.querySelector('.element__like');

    this._cardLike.addEventListener('click', () => {
      this._cardLike.classList.toggle('element__like_active');
    })
  }

  _clickHandlerCardDelete() {
    this._cardDelete = this._cardElement.querySelector('.element__delete');

    this._cardDelete.addEventListener('click', (evt) => {
      this._cardElement.remove();
      this._cardElement = null;
    })
  }

  createCard () {
    this._cardTemplate = document.querySelector(this._cardSelector).content.querySelector('.element');
    this._cardElement = this._cardTemplate.cloneNode(true);
    this._cardImage = this._cardElement.querySelector('.element__image');
    this._cardTitle = this._cardElement.querySelector('.element__title');
    this._cardTitle.textContent = this._data.name;
    this._cardImage.style.backgroundImage = `url(${this._data.link})`;

    this._clickHandlerCardLike();
    this._clickHandlerCardDelete();
    this._clickHandlerOpenPopup();
    return this._cardElement;
  }
}
