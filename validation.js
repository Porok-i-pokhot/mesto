const showInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add('inputErrorClass');
  errorElement.classList.add('errorClass');
  errorElement.textContent = inputElement.validationMessage;
}

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove('inputErrorClass');
  errorElement.classList.remove('errorClass');
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const isFormValid = (inputs) => {
  return inputs.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

function setSubmitButtonState(isFormValid, settings, form) {
  if(isFormValid) {
    const buttonElement = form.querySelector(settings.submitButtonSelector);

    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(settings.inactiveButtonClass);
  } else {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add(settings.inactiveButtonClass);
  }
}


const setEventListeners = (formElement, settings) => {
  const inputs = Array.from(document.querySelectorAll(settings.inputSelector));
  const buttonElement = Array.from(document.querySelectorAll(settings.submitButtonSelector));


  inputs.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      setSubmitButtonState(isFormValid, settings, formElement);
    });
  });
};



function enableValidation(settings) {
  const forms = Array.from(document.querySelectorAll(settings.formSelector));
  forms.forEach((formElement) => {
    setEventListeners(formElement, settings);

    formElement.addEventListener('submit', function(evt) {
      evt.preventDefault();
    });


    // отдельная функция поиска всех полей
    // const inputs = Array.from(formElement.querySelectorAll(settings.inputSelector));


    // const buttonElement = formElement.querySelectorAll(settings.submitButtonSelector);



    // inputs.forEach((inputElement) => {
    //   inputElement.addEventListener('input', function(evt){

    //     const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

    //     if(!inputElement.validity.valid){
    //       inputElement.classList.add(settings.inputErrorClass);
    //       errorElement.textContent = inputElement.validationMessage;
    //       errorElement.classList.add(settings.errorClass);
    //     } else {
    //       inputElement.classList.remove(settings.inputErrorClass);
    //       errorElement.textContent = '';
    //       errorElement.classList.remove(settings.errorClass);

    //     }

    //     const isFormValid = inputs.some((inputElement) => {
    //       return !inputElement.validity.valid;
    //     })

    //   });
    // });
  });
};
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__form-button',
  inactiveButtonClass: 'popup__form-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error'
});
