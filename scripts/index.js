const editProfilePopup = document.querySelector('.popup_edit-profile');
const addCardPopup = document.querySelector('.popup_add-card');
const imagePopup = document.querySelector('.popup_show-image');


const imagePopupDataImg = imagePopup.querySelector('.popup__image');
const imagePopupTitle = imagePopup.querySelector('.popup__title-img');


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

const cardTemplate = document.querySelector('.elements__template').content.querySelector('.element');
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


function assignInputValue(data) {
  if(data.classList.contains('popup_opened')) {
    nameInput.value = profileName.textContent
    occupationInput.value = profileOccupation.textContent
  };
}

function resetInputValue(data) {
  data.querySelector('form').reset()
}

function togglePopup(data) {
  data.classList.toggle('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value
  profileOccupation.textContent = occupationInput.value

  togglePopup(editProfilePopup);
}

function cardSubmitHandler(evt) {
  evt.preventDefault();

  renderCard({name: placeNameInput.value, link: linkInput.value})

  togglePopup(addCardPopup);
}

function buttonImageClick(data) {

  imagePopupDataImg.src = data.link;
  imagePopupDataImg.alt = data.name;
  imagePopupTitle.textContent = data.name;

};

function createCard (data) {
  const cardElement = cardTemplate.cloneNode(true);

  const cardImage = cardElement.querySelector('.element__image');
  const cardTitle = cardElement.querySelector('.element__title');
  const cardLike = cardElement.querySelector('.element__like');
  const cardDelete = cardElement.querySelector('.element__delete');

  cardLike.addEventListener('click', (evt) => {
    evt.target.classList.toggle('element__like_active');
  })

  cardDelete.addEventListener('click', (evt) => {
    evt.target.closest('.element').remove();
  })

  cardImage.addEventListener('click', () => {
    togglePopup(imagePopup);
    buttonImageClick(data);
  })

  cardTitle.textContent = data.name;
  cardImage.style.backgroundImage = `url(${data.link})`;

  return cardElement;
}

function renderCard(data) {
  cards.prepend(createCard(data));
}

initialCards.forEach((data) => {
  renderCard(data);
})


editProfileForm.addEventListener('submit', formSubmitHandler);
addCardForm.addEventListener('submit', cardSubmitHandler);


openEditProfile.addEventListener('click', () => {
  togglePopup(editProfilePopup);
  assignInputValue(editProfilePopup);
});

closeProfileButton.addEventListener('click', () => {
  togglePopup(editProfilePopup);
});

openAddCard.addEventListener('click', () => {
  togglePopup(addCardPopup);
  resetInputValue(addCardPopup);
});
closeCardButton.addEventListener('click', () => {
  togglePopup(addCardPopup);

});

closeImageButton.addEventListener('click', () => {
  togglePopup(imagePopup);
});
