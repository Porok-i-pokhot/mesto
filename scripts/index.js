const openPopupButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closePopupButton = document.querySelector('.popup__close-icon');

let form = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__input_type_name');
let occupationInput = document.querySelector('.popup__input_type_occupation');
let profileName = document.querySelector('.profile__name');
let profileOccupation = document.querySelector('.profile__occupation');


function togglePopup() {
  popup.classList.toggle('popup_opened');

  if(popup.classList.contains('popup_opened')) {
    nameInput.value = profileName.textContent
    occupationInput.value = profileOccupation.textContent
  };
}

function formSubmitHandler(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value
  profileOccupation.textContent = occupationInput.value

  togglePopup();
}

form.addEventListener('submit', formSubmitHandler);
openPopupButton.addEventListener('click', togglePopup);
closePopupButton.addEventListener('click', togglePopup);
