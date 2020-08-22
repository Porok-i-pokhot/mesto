export default class Card {
  constructor(data, cardSelector) {
    this._data = data;
    this._cardSelector = cardSelector;
  }

  // присвоение попапу с картинкой ссылки, имени и подписи
  _handleImageClick() {

    this._imagePopup = document.querySelector('.popup_show-image'); //попап открытия картинки
    this._imagePopupDataImg = this._imagePopup.querySelector('.popup__image'); //картинка внутри попапа открытия картинки
    this._imagePopupTitle = this._imagePopup.querySelector('.popup__title-img'); //заголовок внутри попапа открытия картинки
    this._imagePopupDataImg.src = this._data.link;
    this._imagePopupDataImg.alt = this._data.name;
    this._imagePopupTitle.textContent = this._data.name;
  };


  // поиск данных для карточки
  _attachDataInCard () {
    this._cardImage = this._cardElement.querySelector('.element__image'); // картинка в карточке
    this._cardTitle = this._cardElement.querySelector('.element__title'); //заголовок в карточке
    this._cardLike = this._cardElement.querySelector('.element__like'); //сердечко в карточке
    this._cardDelete = this._cardElement.querySelector('.element__delete'); //"мусорная корзина" в карточке
  }

  _clickHandlers() {
    //добавление темного фона "сердцу" по клику на него
    this._cardLike.addEventListener('click', (evt) => {
    evt.target.classList.toggle('element__like_active');
  })

    // удаление карточки
    this._cardDelete.addEventListener('click', (evt) => {
    evt.target.closest('.element').remove();
  })

    // открытие большого фото по клику на фото в карточке с присвоением данных ссылки и имени
    this._cardImage.addEventListener('click', () => {
    openPopup(this._imagePopup);
    handleImageClick(this._data);
  })
  }


  createCard () {
    this._cardTemplate = document.querySelector(this._cardSelector).content.querySelector('.element'); //темплейт-элемент карточек
    this._cardElement = this._cardTemplate.cloneNode(true); //копия элемента с содержимым

    this._cardTitle.textContent = this._data.name; //присвоение заголовка карточке
    this._cardImage.style.backgroundImage = `url(${this._data.link})`; //присвоение фона по ссылке

    return this._cardElement;
  }
}
