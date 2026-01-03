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

window.addEventListener("popstate", function () {
  history.pushState(null, null, location.href);
  window.location.replace("../index.html");
});

backbutton.addEventListener("click", function () {
  window.location.href = "../index.html";
});

// localStorage
const examResults = JSON.parse(localStorage.getItem("examResults"));

if (examResults && examResults.totalQuestions) {
  // right question count
  const totalCorrect =
    examResults.totalQuestions - examResults.wrongAnswers.length;

  // put it in div
  const correctIcon = document.querySelector(".examicon2"); // righticon
  const wrongIcon = document.querySelector(".examicon"); // wrongicon
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

//check if theres results or not
if (examResults) {
  // put it in divs
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

  // put it
  scoreDiv.textContent = `${examResults.score}/${examResults.totalQuestions}`;
  percentageDiv.textContent = `${examResults.percentage}%`;

  // grade calc
  let grade;
  if (examResults.percentage >= 90) grade = "A+";
  else if (examResults.percentage >= 80) grade = "A";
  else if (examResults.percentage >= 70) grade = "B";
  else if (examResults.percentage >= 60) grade = "C";
  else if (examResults.percentage >= 50) grade = "D";
  else grade = "F";

  gradeDiv.textContent = grade;

  //  student status
  statusDiv.textContent = examResults.percentage >= 50 ? "Passed" : "Failed";
}

const correctDiv = document.querySelector(
  ".answers-contianer .correct-answers h3"
);
const wrongDiv = document.querySelector(".answers-contianer .wrong-answers h3");

const correctCount = examResults.correctAnswers.length; // correct ans count
const wrongCount = examResults.wrongAnswers.length; // wrong ans count

correctDiv.textContent = correctCount;
wrongDiv.textContent = wrongCount;

// ================= Review Questions =================
const reviewContainer = document.getElementById("review-questions");

if (examResults && examResults.questions) {
  examResults.questions.forEach((question, qIndex) => {
    const questionDiv = document.createElement("div");
    questionDiv.className = "review-question";

    const questionTitle = document.createElement("p");
    questionTitle.textContent = `${qIndex + 1}. ${question.question}`;
    questionDiv.appendChild(questionTitle);

    const answersDiv = document.createElement("div");
    answersDiv.className = "review-answers";

    question.answers.forEach((answer, aIndex) => {
      const answerDiv = document.createElement("div");
      answerDiv.className = "review-answer";
      answerDiv.textContent = answer.answer;

      // correct answer
      if (answer.isCorrect) {
        answerDiv.classList.add("correct");
      }

      // wrong selected answer
      if (examResults.userAnswers[qIndex] === aIndex && !answer.isCorrect) {
        answerDiv.classList.add("wrong");
      }

      answersDiv.appendChild(answerDiv);
    });

    questionDiv.appendChild(answersDiv);
    reviewContainer.appendChild(questionDiv);
  });
}
