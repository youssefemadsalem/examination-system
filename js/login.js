// If user is already logged in, redirect to home page
if (Auth.isLoggedIn()) {
    window.location.href = '../index.html';
}

var emailInput = document.getElementById('email');
var loginBtn = document.getElementById('loginBtn');
var emailError = document.getElementById('emailError');
var passwordError = document.getElementById('passwordError');
var passwordInput = document.getElementById('password');



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
});

loginBtn.addEventListener('click', function (e) {
    e.preventDefault();

    var isValid = true;

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
    }

    if (isValid) {
        var storedUser = Auth.getCurrentUser();
        console.log(storedUser);

        if (!storedUser) {
            showError(emailInput, emailError, 'No account found. Please register first');
            return;
        }

        if (
            emailInput.value.trim() === storedUser.email &&
            passwordInput.value === storedUser.password
        ) {
            // Login success - set session as logged in
            Auth.login();
            window.location.href = '../index.html';
        } else {
            showError(passwordInput, passwordError, 'Email or password is incorrect');
        }
    }
});
