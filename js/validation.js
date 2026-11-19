const orderForm = document.querySelector('#order-form-page');

if (orderForm) {
  const nameInput = orderForm.querySelector('#order-name-page');
  const emailInput = orderForm.querySelector('#order-email-page');
  const phoneInput = orderForm.querySelector('#order-phone-page');

  function createErrorElement(input) {
    const error = document.createElement('span');
    error.className = 'error-message';
    error.id = input.id + '-error';
    error.style.color = 'red';
    error.style.fontSize = '14px';
    error.style.marginTop = '5px';
    error.style.display = 'block';
    input.parentNode.appendChild(error);
    return error;
  }

  const nameError = createErrorElement(nameInput);
  const emailError = createErrorElement(emailInput);
  const phoneError = createErrorElement(phoneInput);

  const formMessage = document.createElement('p');
  formMessage.className = 'form-message';
  orderForm.appendChild(formMessage);

  function showError(input, errorElement, message) {
    errorElement.textContent = message;
    input.setAttribute('aria-invalid', 'true');
  }

  function clearError(input, errorElement) {
    errorElement.textContent = '';
    input.removeAttribute('aria-invalid');
  }

  function validateName() {
    const value = nameInput.value.trim();
    if (value.length < 2) {
      showError(nameInput, nameError, 'Введите имя не короче 2 символов.');
      return false;
    }
    clearError(nameInput, nameError);
    return true;
  }

  function validateEmail() {
    const value = emailInput.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(value)) {
      showError(emailInput, emailError, 'Введите корректный e-mail.');
      return false;
    }
    clearError(emailInput, emailError);
    return true;
  }

  function validatePhone() {
    const value = phoneInput.value.trim();
    const digits = value.replace(/\D/g, '');
    if (digits.length !== 11 || !['7', '8'].includes(digits[0])) {
      showError(phoneInput, phoneError, 'Введите корректный номер телефона.');
      return false;
    }
    clearError(phoneInput, phoneError);
    return true;
  }

  orderForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPhoneValid = validatePhone();

    const isFormValid = isNameValid && isEmailValid && isPhoneValid;

    if (!isFormValid) {
      formMessage.textContent = 'Проверьте поля формы.';
      formMessage.style.color = 'red';
      return;
    }

    console.log('Форма прошла учебную проверку; данные не отправлены.');
    formMessage.textContent = 'Форма прошла учебную проверку.';
    formMessage.style.color = 'green';
    orderForm.reset();
    
    const successMsg = document.getElementById('success-message-page');
    if (successMsg) {
        successMsg.hidden = false;
    }
  });

  nameInput.addEventListener('input', validateName);
  emailInput.addEventListener('input', validateEmail);
  phoneInput.addEventListener('input', validatePhone);
}