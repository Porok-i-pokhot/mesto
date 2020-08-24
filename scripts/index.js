import FormValidator from './FormValidator.js';
import Card from './Card.js';
import {imagePopup, openPopup, closePopup} from './util.js';

const editProfilePopup = document.querySelector('.popup_edit-profile');
const addCardPopup = document.querySelector('.popup_add-card');
const popupList = document.querySelectorAll('.popup');

const openEditProfile = document.querySelector('.profile__edit-button');
const openAddCard = document.querySelector('.profile__add-button');


const closeProfileButton = editProfilePopup.querySelector('.popup__close-icon');
const closeCardButton = addCardPopup.querySelector('.popup__close-icon');
const closeImageButton = imagePopup.querySelector('.popup__close-icon');
const editProfileForm = editProfilePopup.querySelector('.popup__form');
const addCardForm = addCardPopup.querySelector('.popup__form');


const nameInput = document.querySelector('.popup__input_type_name');
const occupationInput = document.querySelector('.popup__input_type_occupation');

const placeNameInput = document.querySelector('.popup__input_type_place');
const linkInput = document.querySelector('.popup__input_type_link');


const profileName = document.querySelector('.profile__name');
const profileOccupation = document.querySelector('.profile__occupation');

const cards = document.querySelector('.elements');


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

function assignInputValue(data) {
  if(data.classList.contains('popup_opened')) {
    nameInput.value = profileName.textContent
    occupationInput.value = profileOccupation.textContent
  };
}

function resetInputValue(data) {
  data.querySelector('form').reset()
}


function formSubmitHandler(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value
  profileOccupation.textContent = occupationInput.value

  closePopup(editProfilePopup);
}

function cardSubmitHandler(evt) {
  evt.preventDefault();

  renderCard({name: placeNameInput.value, link: linkInput.value})

  closePopup(addCardPopup);
}

function renderCard(data) {
  const card = new Card(data, '.elements__template');
  cards.prepend(card.createCard());
}

initialCards.forEach((data) => {
  renderCard(data);
})

editProfileForm.addEventListener('submit', formSubmitHandler);
addCardForm.addEventListener('submit', cardSubmitHandler);

openEditProfile.addEventListener('click', () => {
  openPopup(editProfilePopup);
  assignInputValue(editProfilePopup);
});

closeProfileButton.addEventListener('click', () => {
  closePopup(editProfilePopup);
});

openAddCard.addEventListener('click', () => {
  openPopup(addCardPopup);
  resetInputValue(addCardPopup);
});


closeCardButton.addEventListener('click', () => {
  closePopup(addCardPopup);
});

closeImageButton.addEventListener('click', () => {
  closePopup(imagePopup);
});


popupList.forEach(function(popup){
  popup.addEventListener('click', (evt) => {
    const isPopup = evt.target.classList.contains('popup');
    if(isPopup) {
      closePopup(popup);
    }
  });
})
