import {imagePopup} from './Utils.js';

export default class Card {
  constructor(data, cardSelector) {
    this._data = data;
    this._cardSelector = cardSelector;
  }

  // присвоение попапу с картинкой ссылки, имени и подписи
  _handleImageClick() {

    this._imagePopupDataImg = imagePopup.querySelector('.popup__image'); //картинка внутри попапа открытия картинки
    this._imagePopupTitle = imagePopup.querySelector('.popup__title-img'); //заголовок внутри попапа открытия картинки
    this._imagePopupDataImg.src = this._data.link;
    this._imagePopupDataImg.alt = this._data.name;
    this._imagePopupTitle.textContent = this._data.name;
  };


  _clickHandlers() {
    this._cardLike = this._cardElement.querySelector('.element__like'); //сердечко в карточке

    //добавление темного фона "сердцу" по клику на него
    this._cardLike.addEventListener('click', (evt) => {
    evt.target.classList.toggle('element__like_active');
  })
  this._cardDelete = this._cardElement.querySelector('.element__delete'); //"мусорная корзина" в карточке

    // удаление карточки
    this._cardDelete.addEventListener('click', (evt) => {
    evt.target.closest('.element').remove();
  })

    // открытие большого фото по клику на фото в карточке с присвоением данных ссылки и имени
    this._cardImage.addEventListener('click', () => {
    openPopup(imagePopup);
    handleImageClick(this._data);
  })
  }

  createCard () {
    this._cardTemplate = document.querySelector(this._cardSelector).content.querySelector('.element'); //темплейт-элемент карточек
    this._cardElement = this._cardTemplate.cloneNode(true); //копия элемента с содержимым
    this._cardImage = this._cardElement.querySelector('.element__image'); // картинка в карточке
    this._cardTitle = this._cardElement.querySelector('.element__title'); //заголовок в карточке
    this._cardTitle.textContent = this._data.name; //присвоение заголовка карточке
    this._cardImage.style.backgroundImage = `url(${this._data.link})`; //присвоение фона по ссылке

    this._clickHandlers();
    return this._cardElement;
  }
}
