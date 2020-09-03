// import {imagePopup, openPopup} from './utils.js';
export default class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._data = data;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  //присвоение попапу с картинкой ссылки, имени и подписи
  // _handleImageClick() {
  //   this._imagePopupDataImg = imagePopup.querySelector('.popup__image'); //картинка внутри попапа открытия картинки
  //   this._imagePopupTitle = imagePopup.querySelector('.popup__title-img'); //заговолок внутри попапа открытия картинки
  //   this._imagePopupDataImg.src = this._data.link;
  //   this._imagePopupDataImg.alt = this._data.name;
  //   this._imagePopupTitle.textContent = this._data.name;
  // };

  //открытие попапа с картинкой
  // _handlerOpenPopup() {
  //   openPopup(imagePopup);
  //   this._handleImageClick(this._data);
  // }

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
      this._handleCardClick();
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
    this._itemsSearch();
    this._cardTitle.textContent = this._data.name;
    this._cardImage.style.backgroundImage = `url(${this._data.link})`;

    this._setEventListeners();
    return this._cardElement;
  }
}
