// import {imagePopup, openPopup} from './utils.js';
export default class Card {
  constructor(data, cardSelector, {handleCardClick, handlerCardLike, handlerCardDelete}) {
    this._data = data;
    this._cardSelector = cardSelector;

    this._handleCardClick = handleCardClick;
    this._handlerCardLike = handlerCardLike;
    this._handlerCardDelete = handlerCardDelete;

  }

  //меняет состояние лайка
  toggleCardLike() {
    this._cardLike.classList.toggle('element__like_active');
  }

  //слушатели лайка, удаления карточки и открытия попапа с картинкой
  _setEventListeners() {

    this._cardLike.addEventListener('click', () => {
      this._handlerCardLike();
    });

    this._cardDelete.addEventListener('click', () => {
      this._handlerCardDelete(this._data._id);
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._data.link, this._data.name);
    })

  }

  _getTemplate() {

    this._cardTemplate = document.querySelector(this._cardSelector).content.querySelector('.element');
    return this._cardTemplate.cloneNode(true);
  }

  //поиск элементов карточки
  _initializeTemplateVariables() {

    this._cardImage = this._cardElement.querySelector('.element__image'); //картинка
    this._cardTitle = this._cardElement.querySelector('.element__title'); //заголовок

    this._cardLike = this._cardElement.querySelector('.element__like'); //сердечко в карточке
    this._cardDelete = this._cardElement.querySelector('.element__delete'); //мусорная корзина в карточке

    this._cardLikeNumber = this._cardElement.querySelector('.element__likes-quantity'); //цифра лайков
  }

  removeCard(data) {
    this._cardElement.remove(data);
    this._cardElement = null;
  }

  //проверка твой ли id
  isOwner(ownerId) {
    return ownerId === this._data.owner._id;
  }

  //создание карточки
  createCard (isOwnCard) {
    this._cardElement = this._getTemplate();
    this._initializeTemplateVariables();

    this._cardTitle.textContent = this._data.name;
    this._cardImage.style.backgroundImage = `url(${this._data.link})`;

    if(!isOwnCard) {
      this._cardDelete.classList.add('element__delete_hide');
    }

    this._data.likes.some((like) => {
      if(like._id === isOwnCard) {
        this._cardLike.classList.add('element__like_active');
      }
    });

    this._renderNumberOfLikes();

    this._setEventListeners();
    return this._cardElement;
  }

  //проверяет активен ли лайк
  isLiked() {
    return this._cardLike.classList.contains('element__like_active');
  }

  _renderNumberOfLikes() {
    this._cardLikeNumber.textContent = this._data.likes.length;
  }

  //меняет количество лайков и меняет данные карточки. которые приходят с сервера
  updateData(data) {
    this._data = data;
    this._renderNumberOfLikes();
  }

}
