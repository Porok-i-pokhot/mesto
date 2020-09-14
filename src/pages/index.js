import FormValidator from '../components/FormValidator.js';
import './index.css';
import initialCards from '../utils/constants.js';
import Api from "../components/Api";
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';


const editProfilePopup = document.querySelector('.popup_edit-profile'); //попап редактирования профиля
const addCardPopup = document.querySelector('.popup_add-card'); //попап добавления карточки

const openEditProfile = document.querySelector('.profile__edit-button'); //кнопка открытия попапа редактирования профиля
const openAddCard = document.querySelector('.profile__add-button'); //кнопка добавления новой карточки

const nameInput = document.querySelector('.popup__input_type_name'); //имя профиля в инпуте
const occupationInput = document.querySelector('.popup__input_type_occupation'); //род деятельности в инпуте

const placeNameInput = document.querySelector('.popup__input_type_place'); //инпут названия места на карточке
const linkInput = document.querySelector('.popup__input_type_link'); //инпут ссылки на картинку в карточке

const profileName = document.querySelector('.profile__name'); //имя профиля на странице
const profileOccupation = document.querySelector('.profile__occupation'); //род деятельности на странице
const profileAvatar = document.querySelector('.profile__avatar'); //аватар на странице

const cards = document.querySelector('.elements'); //контейнер куда отрисовываются карточки

//данные для валидации
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
addCardFormValidator.enableValidation();


const popupWithImage = new PopupWithImage('.popup_show-image');
const handleCardClick = (imageSrc, name) => {
  popupWithImage.open(imageSrc, name);
};

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-15',
  headers: {
    authorization: 'dba46c0c-2940-4d7d-b159-f4b22b002c4d',
    'Content-Type': 'application/json'
  }
});

//вызов метода получения данных первоначальных карточек с сервера
const getInitialCards = api.getInitialCards();

getInitialCards
  .then((data) => {
    const cardList = new Section({
      items: data,
      renderer: (cardItem) => {
        const card = new Card(cardItem, '.elements__template', handleCardClick);
        cardList.addItem(card.createCard());
      }
    },
    cards
  );

    cardList.renderItems();
  })
  .catch((err) => {
    console.log(err + ' , нам жаль');
  });



// const cardList = new Section({
//   items: initialCards,
//   renderer: (cardItem) => {
//     const card = new Card(cardItem, '.elements__template', handleCardClick);
//     cardList.addItem(card.createCard());
//   }
// },
//   cards
// );

// cardList.renderItems();


const userInfo = new UserInfo({
  userName: profileName,
  userInfo: profileOccupation,
  userAvatar: profileAvatar
});

const getUserInfo = api.getUserInfo();

getUserInfo
  .then((data) => {
    userInfo.setUserInfo(data);
  })
  .catch((err) => {
    console.log(err + ' , нам жаль');
  });

//открытие попапа редактирования профайла
openEditProfile.addEventListener('click', () => {
  editProfileForm.open();
  userInfo.getUserInfoFromInputs(nameInput, occupationInput)
});

const callbackEditForm = () => {
  userInfo.setUserInfoFromInputs(nameInput, occupationInput);
  editProfileForm.close();
}

const editProfileForm = new PopupWithForm({
  popupSelector: '.popup_edit-profile',
  callbackFormSubmit: callbackEditForm
})


const callbackAddCard = () => {
  cardList.renderer({name: placeNameInput.value, link: linkInput.value});
  addCardForm.close();
}

const addCardForm = new PopupWithForm({
  popupSelector: '.popup_add-card',
  callbackFormSubmit: callbackAddCard
})


//открытие попапа добавления карточки
openAddCard.addEventListener('click', () => {
  addCardForm.open();
});

editProfileForm.setEventListeners();
addCardForm.setEventListeners();
popupWithImage.setEventListeners();


