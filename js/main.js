var logoutBtn = document.querySelector(".logout-button");
var startExam = document.querySelector(".start-button");
var userNameDisplay = document.getElementById("user-name");
console.log("Logout button found:", logoutBtn);
console.log("Start Exam button found:", startExam);
console.log("User Name Display found:", userNameDisplay);

// Check if user is logged in, redirect to login if not (use correct path from root)
Auth.requireLogin('pages/login.html');

// handle back button navigation
window.addEventListener('pageshow', function() {
    if (!Auth.isLoggedIn()) {
        window.location.replace('pages/login.html');
    }
});

startExam.addEventListener("click", function() {
    window.location.href = "pages/exam.html";
});

logoutBtn.addEventListener("click", function() {
    Auth.logout();
});

var user = Auth.getCurrentUser();
console.log(user);

if (user && user.firstName) {
    userNameDisplay.textContent = user.firstName + " " + user.lastName;
} else {
    userNameDisplay.textContent = "Guest";
}