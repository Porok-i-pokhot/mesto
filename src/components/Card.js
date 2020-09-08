// import {imagePopup, openPopup} from './utils.js';
export default class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._data = data;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._itemsSearch();
  }

  //добавление тёмного фона сердцу по клику на него
  _handlerCardLike() {
    this._cardLike.classList.toggle('element__like_active');
  }

  //удаление карточки
  _handlerCardDelete() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  //слушатели лайка, удаления карточки и открытия попапа с картинкой
  _setEventListeners() {

    this._cardLike.addEventListener('click', () => {
      this._handlerCardLike();
    })

    this._CardDelete.addEventListener('click', () => {
      this._handlerCardDelete();
    })

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._data.link, this._data.name);
    })

  }

  //поиск элементов карточки
  _itemsSearch() {
    this._cardTemplate = document.querySelector(this._cardSelector).content.querySelector('.element');
    this._cardElement = this._cardTemplate.cloneNode(true);
    this._cardImage = this._cardElement.querySelector('.element__image'); //картинка
    this._cardTitle = this._cardElement.querySelector('.element__title'); //заголовок

    this._cardLike = this._cardElement.querySelector('.element__like'); //сердечко в карточке
    this._CardDelete = this._cardElement.querySelector('.element__delete') //мусорная корзина в карточке
  }

  //создание карточки
  createCard () {
    this._cardTitle.textContent = this._data.name;
    this._cardImage.style.backgroundImage = `url(${this._data.link})`;

    this._setEventListeners();
    return this._cardElement;
  }
}
