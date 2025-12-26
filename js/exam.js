var userName = document.querySelector(".top h1 span");
var solvedCount = document.getElementById("solved-count");
var totalCount = document.querySelector(".total-questions");
var questionNumber = document.getElementById("question-number");
var timerRemaining = document.getElementById("time-remaining");
var timerBar = document.getElementById("progress-bar");
var questionsNav = document.querySelector(".questions-grid");
var answeredQuestionsStats = document.querySelector(".state-item.answered")
  .children[1];
var unansweredQuestionsStats = document.querySelector(
  ".state-item.not-answered"
).children[1];
var markedQuestionsStats =
  document.querySelector(".state-item.marked").children[1];
var questionText = document.querySelector(".question-text .question h2");
var optionsList = document.querySelectorAll(".options-list .option");
var prevBtn = document.getElementById("prev-btn");
var nextBtn = document.getElementById("next-btn");
var markBtn = document.getElementById("mark-btn");
var submitBtn = document.getElementById("submit-btn");
// Ensure user is logged in, redirect to login page if not
Auth.requireLogin("../pages/login.html");
// Load and use questions
var questions = [];

console.log(solvedCount, totalCount, questionNumber, timerRemaining, timerBar);
console.log(questionsNav);
console.log(answeredQuestionsStats);
console.log(unansweredQuestionsStats);
console.log(markedQuestionsStats);
console.log(questionText);
console.log(optionsList);
console.log(prevBtn, nextBtn, markBtn, submitBtn);

async function loadQuestions() {
  try {
    var response = await fetch("../data/questions.json");
    questions = await response.json();
    console.log("Questions loaded:", questions);
    // Initialize exam after questions are loaded
    initExam();
  } catch (error) {
    console.error("Error loading questions:", error);
  }
}

function initExam() {
  // Now you can use the questions array here
  console.log("Total questions:", questions.length);

  // Example: Display first question
  if (questions.length > 0) {
    console.log("First question:", questions[0].question);
  }
}

// Load questions when page loads
loadQuestions();

var firstName = Auth.getCurrentUser().firstName;
var lastName = Auth.getCurrentUser().lastName;
userName.textContent = firstName + " " + lastName || "Guest";
