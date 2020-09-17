// import {imagePopup, openPopup} from './utils.js';
export default class Card {
  constructor(data, cardSelector, {handleCardClick, handlerCardLike, handlerCardDelete}) {
    this._data = data;
    this._cardSelector = cardSelector;

    this._handleCardClick = handleCardClick;
    this._handlerCardLike = handlerCardLike;
    this._handlerCardDelete = handlerCardDelete;

    this._itemsSearch();
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

    this._CardDelete.addEventListener('click', () => {
      this._handlerCardDelete();
    });

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
    this._CardDelete = this._cardElement.querySelector('.element__delete'); //мусорная корзина в карточке

    this._cardLikeNumber = this._cardElement.querySelector('.element__likes-quantity'); //цифра лайков
  }

  //создание карточки
  createCard (currentUserId) {
    this._cardTitle.textContent = this._data.name;
    this._cardImage.style.backgroundImage = `url(${this._data.link})`;

    if(currentUserId === this._data.owner._id) {
      // console.log('показываем delete', this._data);
      this._CardDelete.classList.add('element__delete_show');
    }

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
