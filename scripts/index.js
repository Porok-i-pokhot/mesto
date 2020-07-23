const editProfilePopup = document.querySelector('.popup_edit-profile');
const addCardPopup = document.querySelector('.popup_add-card');
// const addImagePopup = document.querySelector(',');


// кнопки открытия попапов
const openEditProfile = document.querySelector('.profile__edit-button');
const openAddCard = document.querySelector('.profile__add-button');

// кнопки закрытия попапов
const closeProfileButton = editProfilePopup.querySelector('.popup__close-icon');
const closeCardButton = addCardPopup.querySelector('.popup__close-icon');

// данные формы Редактирования профиля
const form = editProfilePopup.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_type_name');
const occupationInput = document.querySelector('.popup__input_type_occupation');
const profileName = document.querySelector('.profile__name');
const profileOccupation = document.querySelector('.profile__occupation');



// function togglePopupAddCard() {
//   addCardPopup.classList.toggle('popup_opened');

//   if(popup.classList.contains('popup_opened')) {
//     nameInput.value = profileName.textContent
//     occupationInput.value = profileOccupation.textContent
//   };
// }

function togglePopup(editProfilePopup) {
  editProfilePopup.classList.toggle('popup_opened');

  if(editProfilePopup.classList.contains('popup_opened')) {
    nameInput.value = profileName.textContent
    occupationInput.value = profileOccupation.textContent
  };
}

function formSubmitHandler(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value
  profileOccupation.textContent = occupationInput.value

  togglePopup(editProfilePopup);
}

// обработчики по submit
form.addEventListener('submit', formSubmitHandler);

// обработчики по click
openEditProfile.addEventListener('click', () => {
  togglePopup(editProfilePopup);
});
closeProfileButton.addEventListener('click', () => {
  togglePopup(editProfilePopup);
});

openAddCard.addEventListener('click', () => {
  togglePopup(addCardPopup);
});
closeCardButton.addEventListener('click', () => {
  togglePopup(addCardPopup);
});


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

const cardTemplate = document.querySelector('.elements__template').content.querySelector('.element');

initialCards.forEach((cardData) => {
  const cardElement = cardTemplate.cloneNode(true);

  const cardImage = cardElement.querySelector('.element__image');
  const cardTitle = cardElement.querySelector('.element__title');
  const cardLike = cardElement.querySelector('.element__heart');
  const cardDelete = cardElement.querySelector('.element__delete');

  cardLike.addEventListener('click', () => {
    // buttonLikeClick();
  })

  cardDelete.addEventListener('click', () => {
    // buttonDeleteClick();
  })

  cardImage.addEventListener('click', () => {
    // buttonImageClick();
  })

  cardTitle.textContent = cardData.name;
  cardImage.style.backgroundImage = `url(${cardData.link})`;

  const cards = document.querySelector('.elements');
  cards.prepend(cardElement);

})





