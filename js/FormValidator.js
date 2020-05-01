class FormValidator {
  constructor(form, elements, popup) {
    this.form = form;
    this.elements = elements;
    this.popup = popup
    this.setEventListeners();
  }

  checkInputValidity(elem) {
    const errorElement = this.popup.querySelector(`#error-${elem.name}`);
    if (elem.validity.valueMissing) {
      errorElement.textContent = 'Это поле обязательно для заполнения';
      elem.parentNode.classList.add('input-container__invalid');
      return false;
    } if (elem.validity.tooShort) {
      errorElement.textContent = 'Должно быть от 2 до 30 символов';
      elem.parentNode.classList.add('input-container__invalid');
      return false;
    } if (elem.validity.typeMismatch) {
      errorElement.textContent = 'Здесь должна быть ссылка';
      elem.parentNode.classList.add('input-container__invalid');
      return false;
    }
    elem.parentNode.classList.remove('input-container__invalid');
    return true;
  }

  setSubmitButtonState(button, isValidForm) {
    if (isValidForm == true) {
      button.removeAttribute('disabled', true);
      button.classList.remove('popup__button_disabled');
      button.classList.add('popup__button_active');
    } else {
      button.setAttribute('disabled', true);
      button.classList.remove('popup__button_active');
      button.classList.add('popup__button_disabled');
    }
  }

  setEventListeners() {
    this.form.addEventListener('input', () => {
      let isValidForm = true;
      const inputs = Array.from(this.elements);
      inputs.forEach((elem) => {
        const isValidInput = this.checkInputValidity(elem);
        if (!isValidInput) {
          isValidForm = false;
        }
      });
      let button;
      inputs.forEach((elem) => {
        if (elem.tagName === 'BUTTON') {
          return button = elem;
        }
      });
      this.setSubmitButtonState(button, isValidForm);
    });
  }
}

