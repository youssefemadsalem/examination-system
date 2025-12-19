var firstNameInput = document.getElementById('firstName');
var lastNameInput = document.getElementById('lastName');
var emailInput = document.getElementById('email');
var passwordInput = document.getElementById('password');
var confirmPasswordInput = document.getElementById('confirmPassword');
var registerBtn = document.getElementById('registerBtn');
var firstNameError = document.getElementById('firstNameError');
var lastNameError = document.getElementById('lastNameError');
var emailError = document.getElementById('emailError');
var passwordError = document.getElementById('passwordError');
var confirmPasswordError = document.getElementById('confirmPasswordError');


// validation on input
firstNameInput.addEventListener('input', function() {
    if (this.value.trim() === '') {
        showError(this, firstNameError, 'First name is required');
    } else if (!validateName(this.value)) {
        showError(this, firstNameError, 'Only letters allowed, minimum 2 characters');
    } else {
        showSuccess(this, firstNameError);
    }
});

lastNameInput.addEventListener('input', function() {
    if (this.value.trim() === '') {
        showError(this, lastNameError, 'Last name is required');
    } else if (!validateName(this.value)) {
        showError(this, lastNameError, 'Only letters allowed, minimum 2 characters');
    } else {
        showSuccess(this, lastNameError);
    }
});

emailInput.addEventListener('input', function() {
    if (this.value.trim() === '') {
        showError(this, emailError, 'Email is required');
    } else if (!validateEmail(this.value)) {
        showError(this, emailError, 'Please enter a valid email address');
    } else {
        showSuccess(this, emailError);
    }
});

passwordInput.addEventListener('input', function() {
    if (this.value === '') {
        showError(this, passwordError, 'Password is required');
    } else if (this.value.length < 8) {
        showError(this, passwordError, 'Password must be at least 8 characters');
    } else if (!validatePassword(this.value)) {
        showError(this, passwordError, 'Must include uppercase, lowercase, and number');
    } else {
        showSuccess(this, passwordError);
    }
    // Re-validate confirm password when password changes
    if (confirmPasswordInput.value !== '') {
        confirmPasswordInput.dispatchEvent(new Event('input'));
    }
});

confirmPasswordInput.addEventListener('input', function() {
    if (this.value === '') {
        showError(this, confirmPasswordError, 'Please confirm your password');
    } else if (!validateConfirmPassword(this.value, passwordInput.value)) {
        showError(this, confirmPasswordError, 'Passwords do not match');
    } else {
        showSuccess(this, confirmPasswordError);
    }
});

// Form submission
registerBtn.addEventListener('click', function(e) {
    e.preventDefault();

    var isValid = true;


    // First Name validation
    if (firstNameInput.value.trim() === '') {
        showError(firstNameInput, firstNameError, 'First name is required');
        isValid = false;
    } else if (!validateName(firstNameInput.value)) {
        showError(firstNameInput, firstNameError, 'Please enter a valid first name');
        isValid = false;
    }

    // Last Name validation
    if (lastNameInput.value.trim() === '') {
        showError(lastNameInput, lastNameError, 'Last name is required');
        isValid = false;
    } else if (!validateName(lastNameInput.value)) {
        showError(lastNameInput, lastNameError, 'Please enter a valid last name');
        isValid = false;
    }

    // Email validation
    if (emailInput.value.trim() === '') {
        showError(emailInput, emailError, 'Email is required');
        isValid = false;
    } else if (!validateEmail(emailInput.value)) {
        showError(emailInput, emailError, 'Please enter a valid email');
        isValid = false;
    }

    // Password validation
    if (passwordInput.value === '') {
        showError(passwordInput, passwordError, 'Password is required');
        isValid = false;
    } else if (!validatePassword(passwordInput.value)) {
        showError(passwordInput, passwordError, 'Password does not meet requirements');
        isValid = false;
    }

    // Confirm Password validation
    if (confirmPasswordInput.value === '') {
        showError(confirmPasswordInput, confirmPasswordError, 'Please confirm your password');
        isValid = false;
    } else if (!validateConfirmPassword(confirmPasswordInput.value, passwordInput.value)) {
        showError(confirmPasswordInput, confirmPasswordError, 'Passwords do not match');
        isValid = false;
    }

    if (isValid) {
        var userData = {
            firstName: firstNameInput.value.trim(),
            lastName: lastNameInput.value.trim(),
            email: emailInput.value.trim(),
            password: passwordInput.value
        };
        Storage.saveUser(userData);

        window.location.href = '../pages/login.html';
    }
});



