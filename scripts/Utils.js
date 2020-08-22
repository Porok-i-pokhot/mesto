const imagePopup = document.querySelector('.popup_show-image');

let handler;


function handleEsc(data){
  handler = (evt) => {
    if(evt.key === "Escape") {
      closePopup(data);
    };
  };
  document.addEventListener('keydown', handler);
}

function openPopup(data) {
  handleEsc(data);
  data.classList.add('popup_opened');
}

function closePopup(data) {
  data.classList.remove('popup_opened');
  document.removeEventListener('keydown', handler);
}

export {imagePopup, handler, handleEsc, openPopup, closePopup};
