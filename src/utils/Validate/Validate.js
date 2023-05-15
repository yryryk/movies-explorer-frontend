export default class FormValidator {

  constructor(validationSettings, formElement) {
    this._validationSettings = validationSettings;
    this._formElement = formElement;
    this._emailValid = true;
    this._emailValidationMessage = 'Введите корректный адрес';
    this.isProfile = false;
  }

  enableValidation () {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._validationSettings.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._validationSettings.submitButtonSelector);
    this._toggleButtonState();

    this._setEventListeners ()
  };

  _setEventListeners () {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        inputElement.getAttribute('type')==='email'&&this._useEmailPattern(inputElement);
        this._toggleInputErrorState(inputElement);
        this._toggleButtonState();
      });
    });
  }

  _useEmailPattern (inputElement) {
    if (!(/[^@\s]+@[^@\s]+\.[^@\s]+/.test(inputElement.value))) {
      this._emailValid = false;
    }else{
      this._emailValid = true;
    }
  };

  _toggleButtonState () {
    if (this._hasInvalidInput()||!this._emailValid) {
      this.disableButton ()
    } else {
      this._enableButton ()
    }
  };

  disableButton () {
    this._buttonElement.classList.add(this._validationSettings.inactiveButtonClass);
    this._buttonElement.setAttribute('disabled', true);
  };

  _enableButton () {
    this._buttonElement.classList.remove(this._validationSettings.inactiveButtonClass);
    this._buttonElement.removeAttribute('disabled');
  };

  _hasInvalidInput () {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };

  _toggleInputErrorState (inputElement) {
    this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    if (!inputElement.validity.valid||!this._emailValid) {
      this._showInputError(inputElement, this._emailValid?inputElement.validationMessage:this._emailValidationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _showInputError (inputElement, errorMessage) {
    inputElement.classList.add(this._validationSettings.inputErrorClass);
    this._errorElement.textContent = errorMessage;
    this._errorElement.classList.add(this._validationSettings.errorClass);
  };

  _hideInputError (inputElement) {
    inputElement.classList.remove(this._validationSettings.inputErrorClass);
    this._errorElement.classList.remove(this._validationSettings.errorClass);
    this._errorElement.textContent = '';
  };

}
