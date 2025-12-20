// Validation functions
function validateName(name) {
    var nameRegex = /^[A-Za-z]{2,}$/;
    return nameRegex.test(name.trim());
}

function validateEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
}

function validatePassword(password) {
    // At least 8 characters, one uppercase, one lowercase, one number
    var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
}

function validateConfirmPassword(confirmPassword, password) {
    return confirmPassword === password && confirmPassword !== '';
}

// Show error message
function showError(input, errorElement, message) {
    input.classList.add('error');
    input.classList.remove('success');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

// Show success state
function showSuccess(input, errorElement) {
    input.classList.remove('error');
    input.classList.add('success');
    errorElement.textContent = '';
    errorElement.style.display = 'none';
}
