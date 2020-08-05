const showInputError = (formElement, inputElement, settings) => {
  const selector = `#${inputElement.name}-error`;
  const errorElement = formElement.querySelector(selector);
  inputElement.classList.add(settings.inputErrorClass);
  errorElement.classList.add(settings.errorClass);
  errorElement.textContent = inputElement.validationMessage;
}

const hideInputError = (formElement, inputElement, settings) => {
  const selector = `#${inputElement.name}-error`;

  const errorElement = formElement.querySelector(selector);
  inputElement.classList.remove(settings.inputErrorClass);
  errorElement.classList.remove(settings.errorClass);
  errorElement.textContent = '';
};

function hideAllErrors(formElement, settings) {
    const foundErrorList = formElement.querySelectorAll(settings.inputErrorClass);
    foundErrorList.forEach(function(item){
      item.classList.remove(settings.inputErrorClass);
    });
    const errorElement = formElement.querySelectorAll(settings.errorClass);
    errorElement.forEach(function(item){
      item.classList.remove(settings.errorClass);
      item.textContent = '';
    })
}

const checkInputValidity = (formElement, inputElement, settings) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, settings);
  } else {
    hideInputError(formElement, inputElement, settings);
  }
};

const isFormValid = (inputs) => {
  return inputs.every((inputElement) => {
    return inputElement.validity.valid;
  });
};


function setSubmitButtonState(inputs, settings, form) {
  const buttonElement = form.querySelector(settings.submitButtonSelector);

  if(isFormValid(inputs)) {
    buttonElement.disabled = false;
    buttonElement.classList.remove(settings.inactiveButtonClass);
  } else {
    buttonElement.disabled = true;
    buttonElement.classList.add(settings.inactiveButtonClass);
  }
}


const setEventListeners = (formElement, settings) => {
  const inputs = Array.from(formElement.querySelectorAll(settings.inputSelector));


  inputs.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, settings);
      setSubmitButtonState(inputs, settings, formElement);
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

    formElement.addEventListener('reset', function(){
      hideAllErrors(formElement, settings);
    })
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
