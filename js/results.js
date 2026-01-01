var userNameDisplay = document.getElementById("user-name");
var backbutton = document.querySelector(".back-button");

var user = Auth.getCurrentUser();
console.log(user);

if (user && user.firstName) {
  userNameDisplay.textContent = user.firstName + " " + user.lastName;
} else {
  userNameDisplay.textContent = "Guest";
}

// Clear exam session data to prevent returning to exam
sessionStorage.removeItem("examInProgress");
sessionStorage.removeItem("userAnswers");
sessionStorage.removeItem("markedQuestions");
sessionStorage.removeItem("currentQuestionIndex");
sessionStorage.removeItem("timeLeft");

// Mark that exam was completed
sessionStorage.setItem("examCompleted", "true");

// Prevent going back to exam page
history.pushState(null, null, location.href);
history.pushState(null, null, location.href);

window.addEventListener("popstate", function() {
  history.pushState(null, null, location.href);
  window.location.replace("../index.html");
});

backbutton.addEventListener("click", function () {
  window.location.href = "../index.html";
});

// جلب النتيجة من localStorage
const examResults = JSON.parse(localStorage.getItem("examResults"));

// التأكد إن فيه بيانات
if (examResults && examResults.totalQuestions) {
  // حساب عدد الإجابات الصحيحة
  const totalCorrect =
    examResults.totalQuestions - examResults.wrongAnswers.length;

  // اختيار الديف المناسب للعرض
  const correctIcon = document.querySelector(".examicon2"); // أيقونة الصح
  const wrongIcon = document.querySelector(".examicon"); // أيقونة الغلط
  const tryAgainDiv = document.querySelector(".try-again");

  if (totalCorrect >= 5) {
    correctIcon.style.display = "flex";
    wrongIcon.style.display = "none";
    tryAgainDiv.style.display = "none";
  } else {
    correctIcon.style.display = "none";
    wrongIcon.style.display = "flex";
    tryAgainDiv.style.display = "block";
  }
}

// التأكد إن فيه بيانات
if (examResults) {
  // جلب الـ divs اللي هيتحط فيها النتائج
  const scoreDiv = document.querySelector(
    ".score-container div:nth-child(1) h3"
  );
  const percentageDiv = document.querySelector(
    ".score-container div:nth-child(2) h3"
  );
  const gradeDiv = document.querySelector(
    ".score-container div:nth-child(3) h3"
  );
  const statusDiv = document.querySelector(
    ".score-container div:nth-child(4) h3"
  );

  // حط القيم
  scoreDiv.textContent = `${examResults.score}/${examResults.totalQuestions}`;
  percentageDiv.textContent = `${examResults.percentage}%`;

  // حساب الدرجة
  let grade;
  if (examResults.percentage >= 90) grade = "A+";
  else if (examResults.percentage >= 80) grade = "A";
  else if (examResults.percentage >= 70) grade = "B";
  else if (examResults.percentage >= 60) grade = "C";
  else if (examResults.percentage >= 50) grade = "D";
  else grade = "F";

  gradeDiv.textContent = grade;

  // حالة الطالب
  statusDiv.textContent = examResults.percentage >= 50 ? "Passed" : "Failed";
}

const correctDiv = document.querySelector(
  ".answers-contianer .correct-answers h3"
);
const wrongDiv = document.querySelector(".answers-contianer .wrong-answers h3");

const correctCount = examResults.correctAnswers.length; // عدد الإجابات الصحيحة
const wrongCount = examResults.wrongAnswers.length; // عدد الإجابات الخاطئة

correctDiv.textContent = correctCount;
wrongDiv.textContent = wrongCount;
