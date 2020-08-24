import {imagePopup, openPopup} from './util.js';

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

  _handlerOpenPopup() {
    openPopup(imagePopup);
    this._handleImageClick(this._data);
  }

  _handlerCardLike() {
    this._cardElement.querySelector('.element__like')
    .classList.toggle('element__like_active');
  }

  _handlerCardDelete() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _setEventListeners() {

    this._cardElement.querySelector('.element__like')
    .addEventListener('click', () => {
      this._handlerCardLike();
    })

    this._cardElement.querySelector('.element__delete')
    .addEventListener('click', () => {
      this._handlerCardDelete();
    })

    this._cardImage.addEventListener('click', () => {
      this._handlerOpenPopup();
    })

  }

  createCard () {
    this._cardTemplate = document.querySelector(this._cardSelector).content.querySelector('.element');
    this._cardElement = this._cardTemplate.cloneNode(true);
    this._cardImage = this._cardElement.querySelector('.element__image');
    this._cardTitle = this._cardElement.querySelector('.element__title');
    this._cardTitle.textContent = this._data.name;
    this._cardImage.style.backgroundImage = `url(${this._data.link})`;

    this._setEventListeners();
    return this._cardElement;
  }
}
