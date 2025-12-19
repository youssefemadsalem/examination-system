var logoutBtn = document.querySelector(".logout-button");
var startExam = document.querySelector(".start-button");
console.log("Logout button found:", logoutBtn);
console.log("Start Exam button found:", startExam);

startExam.addEventListener("click", function() {
    window.location.href = "../pages/exam.html";
});

logoutBtn.addEventListener("click", function() {
    window.location.href = "../pages/login.html";
});