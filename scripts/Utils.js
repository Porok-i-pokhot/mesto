const imagePopup = document.querySelector('.popup_show-image'); //попап открытия картинки

// const closeImageButton = imagePopup.querySelector('.popup__close-icon'); //кнопка закрытия внутри попапа-картинки
let handler; //переменная для слушателя по keydown



//закрытие попапа картинки
// closeImageButton.addEventListener('click', () => {
//   closePopup(imagePopup);
// });

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

export {imagePopup, handler, handleEsc, openPopup, closePopup};
