import FormValidator from '../components/FormValidator.js';
import initialCards from '../data/initialCardsData.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';

const editProfilePopup = document.querySelector('.popup_edit-profile'); //попап редактирования профиля
const addCardPopup = document.querySelector('.popup_add-card'); //попап добавления карточки

const openEditProfile = document.querySelector('.profile__edit-button');
const openAddCard = document.querySelector('.profile__add-button');


const nameInput = document.querySelector('.popup__input_type_name');
const occupationInput = document.querySelector('.popup__input_type_occupation');

const placeNameInput = document.querySelector('.popup__input_type_place');
const linkInput = document.querySelector('.popup__input_type_link');


const profileName = document.querySelector('.profile__name');
const profileOccupation = document.querySelector('.profile__occupation');



const cards = document.querySelector('.elements');






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

const cardList = new Section({
  items: initialCards,
  renderer: (cardItem) => {
    const card = new Card(cardItem, '.elements__template', handleCardClick);
    cardList.addItem(card.createCard());
  }
},
  cards
);

cardList.renderItems();


const userInfo = new UserInfo({
  userName: profileName,
  userInfo: profileOccupation
});


//открытие попапа редактирования профайла
openEditProfile.addEventListener('click', () => {
  editProfileForm.open();
  userInfo.getUserInfo(nameInput, occupationInput)
});

const callbackEditForm = () => {
  userInfo.setUserInfo(nameInput, occupationInput);
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


