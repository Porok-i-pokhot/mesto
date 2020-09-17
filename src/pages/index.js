import FormValidator from '../components/FormValidator.js';
import './index.css';
import initialCards from '../utils/constants.js';
import Api from "../components/Api";
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from "../components/PopupWithConfirmation";


const editProfilePopup = document.querySelector('.popup_edit-profile'); //попап редактирования профиля
const addCardPopup = document.querySelector('.popup_add-card'); //попап добавления карточки
// const changeAvatarPopup = document.querySelector('.popup_edit-avatar'); //попап изменения аватара

const openEditProfile = document.querySelector('.profile__edit-button'); //кнопка открытия попапа редактирования профиля
const openAddCard = document.querySelector('.profile__add-button'); //кнопка добавления новой карточки
const openChangeAvatar = document.querySelector('.profile__avatar-container'); //контейнер с аватаром внутри

const nameInput = document.querySelector('.popup__input_type_name'); //имя профиля в инпуте
const occupationInput = document.querySelector('.popup__input_type_occupation'); //род деятельности в инпуте

// const placeNameInput = document.querySelector('.popup__input_type_place'); //инпут названия места на карточке
// const linkInput = document.querySelector('.popup__input_type_link'); //инпут ссылки на картинку в карточке

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
// const changeAvatarFormValidator = new FormValidator(validationSettings, changeAvatarPopup);

editFormValidator.enableValidation();
addCardFormValidator.enableValidation();
// changeAvatarFormValidator.enableValidation();


const popupWithImage = new PopupWithImage('.popup_show-image');

//открытие попапа просмотра картинки
const handleCardClick = (imageSrc, name) => {
  popupWithImage.open(imageSrc, name);
};

const handlerCardDelete = function() {
  confirmDeleteForm.open();
  confirmDeleteForm.setCallbackSubmit(() => {
    api.deleteCard(this._data._id)
      .then((data) => {
        this._cardElement.remove(data);
        this._cardElement = null;
        confirmDeleteForm.close();
      })
      .catch((err) => {
        console.log(err + ' , нам жаль');
      });
  });
};

//добавление тёмного фона сердцу по клику на него
const handlerCardLike = function () {
  this.toggleCardLike();
  if(this.isLiked()){
    api.putLike(this._data._id)
      .then((data) => {
        this.updateData(data)
      .catch((err) => {
          console.log(err + ' , нам жаль');
        });
    })
  } else {
    api.deleteLike(this._data._id)
      .then((data) => {
        this.updateData(data);
      })
      .catch((err) => {
        console.log(err + ' , нам жаль');
      });
  }
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

const cardList = new Section({
    renderer: (cardItem) => {
      const card = new Card(cardItem, '.elements__template', {
        handleCardClick: handleCardClick,
        handlerCardLike: handlerCardLike,
        handlerCardDelete: handlerCardDelete
      });
      const userId = userInfo.getUserId();
      cardList.addItem(
        card.createCard(userId)
      );
    }
  },
  cards
);

const userInfo = new UserInfo({
  userName: profileName,
  userAbout: profileOccupation,
  userAvatar: profileAvatar
});

//отрисовка первоначальных карточек на странице
getInitialCards
  .then((data) => {
    cardList.renderItems(data);
  })
  .catch((err) => {
    console.log(err + ' , нам очень жаль');
  });




const userInfoPromise = api.getUserInfo();

//получение данных пользователя с сервера и отрисовка на страницу
userInfoPromise
  .then((data) => {
    // debugger;
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

const callbackEditForm = (data) => {
  editProfileForm.setLoadingText();

  api.setEditedUserInfo(data)
      .then((updatedData) => {
        userInfo.setUserInfo(updatedData);
        editProfileForm.close();
      })
      .catch((err) => {
        console.log(err + ' , нам жаль');
      })
      .finally(()=>{
      editProfileForm.setDefaultText();
    })
};


const editProfileForm = new PopupWithForm({
  popupSelector: '.popup_edit-profile',
  callbackFormSubmit: callbackEditForm,
});


const callbackAddCard = (data) => {
  addCardForm.setLoadingText(); //добавление лоадера

  api.addNewCard(data)
    .then((updatedData) => {
      cardList.renderer(updatedData);
    })
    .catch((err) => {
      console.log(err + ' , нам жаль');
    })
    .finally(()=>{
      addCardForm.setDefaultText(); //удаление лоадера
    })
  addCardForm.close();
};

const addCardForm = new PopupWithForm({
  popupSelector: '.popup_add-card',
  callbackFormSubmit: callbackAddCard,
});

//открытие попапа добавления карточки
openAddCard.addEventListener('click', () => {
  addCardForm.open();
});

const callbackChangeAvatar = (data) => {
  changeAvatarForm.setLoadingText();

  api.changeAvatar(data)
    .then((updatedData) => {
      userInfo.setAvatar(updatedData.avatar);
      changeAvatarForm.close();
    })
    .catch((err) => {
      console.log(err + ' , нам жаль');
    })
    .finally(()=> {
      changeAvatarForm.setDefaultText();
    })
};

const changeAvatarForm = new PopupWithForm({
  popupSelector: '.popup_edit-avatar',
  callbackFormSubmit: callbackChangeAvatar,
});

//открытие попапа смены аватара
openChangeAvatar.addEventListener('click', () => {
  changeAvatarForm.open();
});

const confirmDeleteForm = new PopupWithConfirmation('.popup_confirm-delete');

// confirmDeleteForm.addEventListener('click', () => {
//   confirmDeleteForm.open();
// })

changeAvatarForm.setEventListeners();
editProfileForm.setEventListeners();
addCardForm.setEventListeners();
popupWithImage.setEventListeners();
confirmDeleteForm.setEventListeners();


