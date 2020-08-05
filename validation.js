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

const checkInputValidity = (formElement, inputElement, settings) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, settings);
  } else {
    hideInputError(formElement, inputElement, settings);
  }
};

const isFormValid = (inputs) => {
  return inputs.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

function setSubmitButtonState(isFormValid, settings, form) {
  const buttonElement = form.querySelector(settings.submitButtonSelector);

  if(isFormValid) {
    buttonElement.disabled = false;
    buttonElement.classList.add(settings.inactiveButtonClass);

  } else {
    buttonElement.disabled = true;
    buttonElement.classList.remove(settings.inactiveButtonClass);
  }
}


const setEventListeners = (formElement, settings) => {
  const inputs = Array.from(formElement.querySelectorAll(settings.inputSelector));


  inputs.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, settings);
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
