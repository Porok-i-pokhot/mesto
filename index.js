const openPopupButton = document.querySelector('.edit-button');
const popup = document.querySelector('.popup');
const closePopupButton = document.querySelector('.close-icon');
const savePopupButton = document.querySelector('.form-button');

let form = document.querySelector('.popup__form');
let nameInput = document.querySelector('.form-input_type_name');
let occupationInput = document.querySelector('.form-input_type_occupation');
let profileName = document.querySelector('.name');
let profileOccupation = document.querySelector('.occupation');


function togglePopup() {
  popup.classList.toggle('popup_opened');
}

openPopupButton.addEventListener('click', () => {
  togglePopup()

  nameInput.value = profileName.textContent
  occupationInput.value = profileOccupation.textContent

});

closePopupButton.addEventListener('click', togglePopup);

savePopupButton.addEventListener('click', togglePopup);


function formSubmitHandler(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value
  profileOccupation.textContent = occupationInput.value

}

form.addEventListener('submit', formSubmitHandler);
