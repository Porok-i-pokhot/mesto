export default class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this.formElement = formElement;
  }

  _showInputError(inputElement) {
    const selector = `#${inputElement.name}-error`;
    const errorElement = this.formElement.querySelector(selector);
    inputElement.classList.add(this._settings.inputErrorClass);
    errorElement.classList.add(this._settings.errorClass);
    errorElement.textContent = inputElement.validationMessage;
  }

  _hideInputError(inputElement) {
    const selector = `#${inputElement.name}-error`;

    const errorElement = this.formElement.querySelector(selector);
    inputElement.classList.remove(this._settings.inputErrorClass);
    errorElement.classList.remove(this._settings.errorClass);
    errorElement.textContent = '';
  };

  _hideAllErrors() {
      const foundErrorList = this.formElement
      .querySelectorAll(`.${this._settings.inputErrorClass}`);

      foundErrorList.forEach((item) => {
        item.classList.remove(this._settings.inputErrorClass);
      });

      const errorElement = this.formElement
      .querySelectorAll(`.${this._settings.errorClass}`);

      errorElement.forEach((item) => {
        item.classList.remove(this._settings.errorClass);
        item.textContent = '';
      })
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _isFormValid(inputs) {
    return inputs.every((inputElement) => {
      return inputElement.validity.valid;
    });
  };

  _disabledSubmitButton(){
    const inactiveButton = this.formElement
    .querySelector(this._settings.submitButtonSelector);

    inactiveButton.disabled = true;

    inactiveButton.classList.add(this._settings.inactiveButtonClass);
  }

  _enableSubmitButton(){
    const inactiveButton = this.formElement
    .querySelector(this._settings.submitButtonSelector);

    inactiveButton.disabled = false;

    inactiveButton.classList.remove(this._settings.inactiveButtonClass);
  }

  _setSubmitButtonState(inputs, form) {

    if(this._isFormValid(inputs)) {
      this._enableSubmitButton(form);
    } else {
      this._disabledSubmitButton(form);
    }
  }


  _setEventListeners() {
    const inputs = Array.from(this.formElement
      .querySelectorAll(this._settings.inputSelector));


    inputs.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._setSubmitButtonState(inputs);
      });
    });
  };


  enableValidation() {
    const forms = Array.from(document.querySelectorAll(this._settings.formSelector));
    forms.forEach((formElement) => {
      this._setEventListeners();

      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });


      formElement.addEventListener('reset', () => {
        this._hideAllErrors();
        this._disabledSubmitButton();
      })
    });
  };

}



