// const showInputError = (formElement, inputElement) => {
//   const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
//   inputElement.classList.add('poppup__input_type_error');
//   errorElement.textContent = inputElement.validationMessage;
//   errorElement.classList.add('popup__input-error');
// }

function enableValidation(settings) {
  const forms = Array.from(document.querySelectorAll(settings.formSelector));
  forms.forEach((formElement) => {
    formElement.addEventListener('submit', function(evt) {
      evt.preventDefault();
    });


    // отдельная функция поиска всех полей
    const inputs = Array.from(formElement.querySelectorAll(settings.inputSelector));


    const buttonElement = formElement.querySelectorAll(settings.submitButtonSelector);


    // отдельная функция showInputError
    inputs.forEach((inputElement) => {
      inputElement.addEventListener('input', function(evt){

        const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

        if(!inputElement.validity.valid){
          // showInputError
          inputElement.classList.add(inputErrorClass);
          errorElement.textContent = inputElement.validationMessage;
          errorElement.classList.add(errorClass);
        } else {
          inputElement.classList.remove(inputErrorClass);
          errorElement.textContent = '';
          errorElement.classList.remove(errorClass);

        }
        // прописать стили ccs для класса popup__input_type_error (красный input)
        // прописать стили css для класса popup__input-error (span с текстом ошибки)

        const isFormValid = inputs.some((inputElement) => {
          return !inputElement.validity.valid;
        })

        const toggleButtonState
      });
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
