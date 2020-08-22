import FormValidator from './FormValidator.js';
import Card from './Card.js';

const editProfilePopup = document.querySelector('.popup_edit-profile');  //попап редактрирования
const addCardPopup = document.querySelector('.popup_add-card'); //попап добавления карточки
// const imagePopup = document.querySelector('.popup_show-image'); //попап открытия картинки
const popupList = document.querySelectorAll('.popup'); //все попапы

// const imagePopupDataImg = imagePopup.querySelector('.popup__image'); //картинка внутри попапа открытия картинки
// const imagePopupTitle = imagePopup.querySelector('.popup__title-img'); //заголовок внутри попапа открытия картинки


const openEditProfile = document.querySelector('.profile__edit-button'); //кнопка редактирования попапа
const openAddCard = document.querySelector('.profile__add-button'); // кнопка открытия попапа добавления карточки


const closeProfileButton = editProfilePopup.querySelector('.popup__close-icon'); //кнопка закрытия попапа внутри редактирования профиля
const closeCardButton = addCardPopup.querySelector('.popup__close-icon'); //кнопка закрытия попапа внутри добавления карточки
const closeImageButton = this._imagePopup.querySelector('.popup__close-icon'); //кнопка закрытия внутри попапа-картинки

const editProfileForm = editProfilePopup.querySelector('.popup__form'); //форма внутри редктирования профиля
const addCardForm = addCardPopup.querySelector('.popup__form'); //форма внутри добавления карточки


const nameInput = document.querySelector('.popup__input_type_name'); //поле "имя" внутри формы редактирования профиля
const occupationInput = document.querySelector('.popup__input_type_occupation'); //поле "занятость" внутри редактирования профиля

const placeNameInput = document.querySelector('.popup__input_type_place'); //поле "место" внутри добавления карточки
const linkInput = document.querySelector('.popup__input_type_link'); //поле "ссылка" внутри добавления карточки


const profileName = document.querySelector('.profile__name'); //строка "имя" в редактировании профиля
const profileOccupation = document.querySelector('.profile__occupation'); //строка "занятость" в редактировании профиля

// const cardTemplate = document.querySelector('.elements__template').content.querySelector('.element'); //темплейт-элемент карточек
const cards = document.querySelector('.elements'); //секция со всеми карточками


const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


let handler; //переменная для слушателя по keydown

const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__form-button',
  inactiveButtonClass: 'popup__form-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error'
};

const editFormValidator = new FormValidator(validationSettings, editProfilePopup);
const addCardFormValidator = new FormValidator(validationSettings, addCardPopup);

editFormValidator.enableValidation();
addCardFormValidator.enableValidation()

//проверка наличия класса popup_opened и присвоение инпутам значений из текста
function assignInputValue(data) {
  if(data.classList.contains('popup_opened')) {
    nameInput.value = profileName.textContent
    occupationInput.value = profileOccupation.textContent
  };
}

//сброс полей формы до исходных значений
function resetInputValue(data) {
  data.querySelector('form').reset()
}

//закрытие попапа по Esc
function handleEsc(data){
  handler = (evt) => {
    if(evt.key === "Escape") {
      closePopup(data);
    };
  };
  document.addEventListener('keydown', handler);
}

//открытие попапа
function openPopup(data) {
  handleEsc(data);
  data.classList.add('popup_opened');
}

//закрытие попапа
function closePopup(data) {
  data.classList.remove('popup_opened');
  document.removeEventListener('keydown', handler);
}

// присвоение значений полей инпутов тексту
function formSubmitHandler(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value
  profileOccupation.textContent = occupationInput.value

  closePopup(editProfilePopup);
}

//создание новой карточки
function cardSubmitHandler(evt) {
  evt.preventDefault();

  renderCard({name: placeNameInput.value, link: linkInput.value})

  closePopup(addCardPopup);
}

// присвоение попапу с картинкой ссылки, имени и подписи
// function handleImageClick(data) {

//   imagePopupDataImg.src = data.link;
//   imagePopupDataImg.alt = data.name;
//   imagePopupTitle.textContent = data.name;

// };

//создание карточки
// function createCard (data) {
//   const cardElement = cardTemplate.cloneNode(true); //копия элемента с содержимым

//   const cardImage = cardElement.querySelector('.element__image'); // картинка в карточке
//   const cardTitle = cardElement.querySelector('.element__title'); //заголовок в карточке
//   const cardLike = cardElement.querySelector('.element__like'); //сердечко в карточке
//   const cardDelete = cardElement.querySelector('.element__delete'); //"мусорная корзина" в карточке

//   //добавление темного фона "сердцу" по клику на него
//   cardLike.addEventListener('click', (evt) => {
//     evt.target.classList.toggle('element__like_active');
//   })

//   // удаление карточки
//   cardDelete.addEventListener('click', (evt) => {
//     evt.target.closest('.element').remove();
//   })

//   // открытие большого фото по клику на фото в карточке с присвоением данных ссылки и имени
//   cardImage.addEventListener('click', () => {
//     openPopup(imagePopup);
//     handleImageClick(data);
//   })

//   cardTitle.textContent = data.name; //присвоение заголовка карточке
//   cardImage.style.backgroundImage = `url(${data.link})`; //присвоение фона по ссылке

//   return cardElement;
// }

//добавление карточки в начало
function renderCard(data) {
  // const card = new Card()
  cards.prepend(new Card(data, '.elements__template'));
}

// перебор массива с карточками и добавление карточке постепенно в начало
initialCards.forEach((data) => {
  renderCard(data);
})

// работа кнопки "сохранить"
editProfileForm.addEventListener('submit', formSubmitHandler);
addCardForm.addEventListener('submit', cardSubmitHandler);

// открытие попапа редактирования профайла
openEditProfile.addEventListener('click', () => {
  openPopup(editProfilePopup);
  assignInputValue(editProfilePopup);
});

//закрытие попапа редактирования
closeProfileButton.addEventListener('click', () => {
  closePopup(editProfilePopup);
});

//открытие попапа добавления карточки
openAddCard.addEventListener('click', () => {
  openPopup(addCardPopup);
  resetInputValue(addCardPopup);
});


//закрытие попапа добавления карточки
closeCardButton.addEventListener('click', () => {
  closePopup(addCardPopup);
});

//закрытие попапа картинки
closeImageButton.addEventListener('click', () => {
  closePopup(this._imagePopup);
});


popupList.forEach(function(popup){
  popup.addEventListener('click', (evt) => {
    const isPopup = evt.target.classList.contains('popup');
    if(isPopup) {
      closePopup(popup);
    }
  });
})
