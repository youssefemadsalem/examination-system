// DOM Elements
var userName = document.querySelector(".top h1 span");
var solvedCount = document.getElementById("solved-count");
var totalCount = document.getElementById("total-questions");
var totalCount2 = document.getElementById("all-questions");
var questionNumber = document.getElementById("question-number");
var timerRemaining = document.getElementById("time-remaining");
var timerBar = document.getElementById("progress-bar");
var questionsNav = document.querySelector(".questions-grid");
var answeredQuestionsStats = document.querySelector(".state-item.answered").children[1];
var unansweredQuestionsStats = document.querySelector(".state-item.not-answered").children[1];
var markedQuestionsStats = document.querySelector(".state-item.marked").children[1];
var questionText = document.querySelector(".question-text .question h2");
var optionsContainer = document.querySelector(".options-list");
var prevBtn = document.getElementById("prev-btn");
var nextBtn = document.getElementById("next-btn");
var markBtn = document.getElementById("mark-btn");
var submitBtn = document.getElementById("submit-btn");

// Modal Elements
var submitModal = document.getElementById("submit-modal");
var warningModal = document.getElementById("warning-modal");
var cancelSubmitBtn = document.getElementById("cancel-submit");
var confirmSubmitBtn = document.getElementById("confirm-submit");
var closeWarningBtn = document.getElementById("close-warning");
var modalAnswered = document.getElementById("modal-answered");
var modalUnanswered = document.getElementById("modal-unanswered");
var modalMarked = document.getElementById("modal-marked");

// Ensure user is logged in, redirect to login page if not
Auth.requireLogin("../pages/login.html");

// ============== EXAM PROTECTION ==============

// Flag to track if exam is in progress
var examInProgress = false;
var examSubmitted = false;

// Prevent page refresh and back navigation
function setupExamProtection() {
  examInProgress = true;

  // Store exam state in sessionStorage
  sessionStorage.setItem("examInProgress", "true");

  // Prevent browser back button
  history.pushState(null, null, location.href);
  window.addEventListener("popstate", function() {
    if (examInProgress && !examSubmitted) {
      history.pushState(null, null, location.href);
      showWarningModal();
    }
  });

  // Prevent page reload/close
  window.addEventListener("beforeunload", function(e) {
    if (examInProgress && !examSubmitted) {
      e.preventDefault();
      e.returnValue = "Your exam is in progress. Are you sure you want to leave?";
      return e.returnValue;
    }
  });
}

// Show warning modal
function showWarningModal() {
  if (warningModal) {
    warningModal.classList.remove("hidden");
  }
}

// Hide warning modal
function hideWarningModal() {
  if (warningModal) {
    warningModal.classList.add("hidden");
  }
}

// ============== QUESTION MANAGEMENT ==============

// Load and use questions
var questions = [];
var currentQuestionIndex = 0;
var userAnswers = [];
var markedQuestions = [];

async function loadQuestions() {
  try {
    var response = await fetch("../data/questions.json");
    questions = await response.json();
    console.log("Questions loaded:", questions);
    initExam();
  } catch (error) {
    console.error("Error loading questions:", error);
  }
}

function initExam() {
  // Try to restore saved session first
  var savedAnswers = sessionStorage.getItem("userAnswers");
  var savedMarked = sessionStorage.getItem("markedQuestions");
  var savedQuestionIndex = sessionStorage.getItem("currentQuestionIndex");
  var savedTimeLeft = sessionStorage.getItem("timeLeft");

  if (savedAnswers) {
    try {
      userAnswers = JSON.parse(savedAnswers);
      // Ensure array length matches questions
      if (userAnswers.length !== questions.length) {
        userAnswers = new Array(questions.length).fill(null);
      }
    } catch (e) {
      userAnswers = new Array(questions.length).fill(null);
    }
  } else {
    userAnswers = new Array(questions.length).fill(null);
  }

  if (savedMarked) {
    try {
      markedQuestions = JSON.parse(savedMarked);
      // Ensure array length matches questions
      if (markedQuestions.length !== questions.length) {
        markedQuestions = new Array(questions.length).fill(false);
      }
    } catch (e) {
      markedQuestions = new Array(questions.length).fill(false);
    }
  } else {
    markedQuestions = new Array(questions.length).fill(false);
  }

  // Restore current question index
  if (savedQuestionIndex) {
    currentQuestionIndex = parseInt(savedQuestionIndex) || 0;
  }

  // Restore time left
  if (savedTimeLeft) {
    timeLeft = parseInt(savedTimeLeft) || totalTime;
  }

  // Update total question counts
  totalCount.textContent = questions.length.toString();
  totalCount2.textContent = questions.length.toString();

  // Generate question navigator buttons
  generateQuestionNavigator();

  // Display the current question (restored or first)
  displayQuestion(currentQuestionIndex);

  // Update stats
  updateStats();

  // Start the timer
  startTimer();

  // Setup exam protection after everything is loaded
  setupExamProtection();
}

// Generate question navigator grid dynamically
function generateQuestionNavigator() {
  questionsNav.innerHTML = "";
  for (var i = 0; i < questions.length; i++) {
    var questionBtn = document.createElement("div");
    questionBtn.className = "question not-answered";
    questionBtn.textContent = (i + 1).toString();
    questionBtn.dataset.index = i;

    questionBtn.addEventListener("click", function() {
      var index = parseInt(this.dataset.index);
      goToQuestion(index);
    });

    questionsNav.appendChild(questionBtn);
  }
  updateNavigatorStatus();
}

// Display a question by index
function displayQuestion(index) {
  var question = questions[index];

  // Update question number
  questionNumber.textContent = (index + 1).toString();

  // Update question text
  questionText.textContent = question.question;

  // Generate options with improved styling
  optionsContainer.innerHTML = "";
  var optionLabels = ["A", "B", "C", "D"];

  question.answers.forEach(function(answer, answerIndex) {
    var optionDiv = document.createElement("div");
    optionDiv.className = "option";
    if (userAnswers[index] === answerIndex) {
      optionDiv.classList.add("selected");
    }

    var input = document.createElement("input");
    input.type = "radio";
    input.id = "option" + answerIndex;
    input.name = "question" + index;
    input.value = answerIndex;

    if (userAnswers[index] === answerIndex) {
      input.checked = true;
    }

    input.addEventListener("change", function() {
      saveAnswer(index, parseInt(this.value));
      updateOptionStyles();
    });

    var label = document.createElement("label");
    label.htmlFor = "option" + answerIndex;

    var optionLetter = document.createElement("span");
    optionLetter.className = "option-letter";
    optionLetter.textContent = optionLabels[answerIndex];

    var optionText = document.createElement("span");
    optionText.className = "option-text";
    optionText.textContent = answer.answer;

    label.appendChild(optionLetter);
    label.appendChild(optionText);

    optionDiv.appendChild(input);
    optionDiv.appendChild(label);

    // Add click event to entire option div for better UX
    optionDiv.addEventListener("click", function(e) {
      if (e.target.tagName !== "INPUT") {
        input.checked = true;
        input.dispatchEvent(new Event("change"));
      }
    });

    optionsContainer.appendChild(optionDiv);
  });

  updateMarkButton();
  updateNavigatorStatus();
  updateNavigationButtons();
}

// Update option styles when selected
function updateOptionStyles() {
  var options = optionsContainer.querySelectorAll(".option");
  options.forEach(function(option) {
    var input = option.querySelector("input");
    if (input.checked) {
      option.classList.add("selected");
    } else {
      option.classList.remove("selected");
    }
  });
}

// Update navigation button states
function updateNavigationButtons() {
  // Disable prev button on first question
  if (currentQuestionIndex === 0) {
    prevBtn.classList.add("disabled");
  } else {
    prevBtn.classList.remove("disabled");
  }

  // Disable next button on last question
  if (currentQuestionIndex === questions.length - 1) {
    nextBtn.classList.add("disabled");
  } else {
    nextBtn.classList.remove("disabled");
  }
}

// Save user's answer
function saveAnswer(questionIndex, answerIndex) {
  userAnswers[questionIndex] = answerIndex;
  updateNavigatorStatus();
  updateStats();

  // Save to sessionStorage for recovery
  sessionStorage.setItem("userAnswers", JSON.stringify(userAnswers));
}

// Navigate to a specific question
function goToQuestion(index) {
  if (index >= 0 && index < questions.length) {
    currentQuestionIndex = index;
    displayQuestion(currentQuestionIndex);
    // Save current question index for recovery
    sessionStorage.setItem("currentQuestionIndex", currentQuestionIndex.toString());
  }
}

// Go to previous question
function goToPrevious() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    displayQuestion(currentQuestionIndex);
    sessionStorage.setItem("currentQuestionIndex", currentQuestionIndex.toString());
  }
}

// Go to next question
function goToNext() {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    displayQuestion(currentQuestionIndex);
    sessionStorage.setItem("currentQuestionIndex", currentQuestionIndex.toString());
  }
}

// Toggle mark for current question
function toggleMark() {
  markedQuestions[currentQuestionIndex] = !markedQuestions[currentQuestionIndex];
  updateMarkButton();
  updateNavigatorStatus();
  updateStats();

  // Save to sessionStorage
  sessionStorage.setItem("markedQuestions", JSON.stringify(markedQuestions));
}

// Update mark button appearance
function updateMarkButton() {
  var markIcon = markBtn.querySelector("i");
  if (markedQuestions[currentQuestionIndex]) {
    markBtn.classList.add("marked");
    markIcon.style.color = "#f59e0b";
  } else {
    markBtn.classList.remove("marked");
    markIcon.style.color = "";
  }
}

// Update question navigator status
function updateNavigatorStatus() {
  var navButtons = questionsNav.querySelectorAll(".question");
  navButtons.forEach(function(btn, index) {
    btn.classList.remove("current", "answered", "marked", "not-answered");

    if (index === currentQuestionIndex) {
      btn.classList.add("current");
    } else if (markedQuestions[index]) {
      btn.classList.add("marked");
    } else if (userAnswers[index] !== null) {
      btn.classList.add("answered");
    } else {
      btn.classList.add("not-answered");
    }
  });
}

// Update statistics
function updateStats() {
  var answered = userAnswers.filter(function(answer) {
    return answer !== null;
  }).length;

  var marked = markedQuestions.filter(function(m) {
    return m === true;
  }).length;

  var notAnswered = questions.length - answered;

  solvedCount.textContent = answered.toString();
  answeredQuestionsStats.textContent = answered.toString();
  markedQuestionsStats.textContent = marked.toString();
  unansweredQuestionsStats.textContent = notAnswered.toString();
}

// ============== SUBMIT FUNCTIONALITY ==============

// Show submit confirmation modal
function showSubmitModal() {
  var answered = userAnswers.filter(function(a) { return a !== null; }).length;
  var unanswered = questions.length - answered;
  var marked = markedQuestions.filter(function(m) { return m === true; }).length;

  modalAnswered.textContent = answered;
  modalUnanswered.textContent = unanswered;
  modalMarked.textContent = marked;

  submitModal.classList.remove("hidden");
}

// Hide submit modal
function hideSubmitModal() {
  submitModal.classList.add("hidden");
}

// Submit exam function
function submitExam() {
  examSubmitted = true;
  examInProgress = false;

  // Clear exam session data
  sessionStorage.removeItem("examInProgress");
  sessionStorage.removeItem("userAnswers");
  sessionStorage.removeItem("markedQuestions");
  sessionStorage.removeItem("currentQuestionIndex");
  sessionStorage.removeItem("timeLeft");

  // Stop the timer
  if (timerInterval) {
    clearInterval(timerInterval);
  }

  // Calculate score
  var score = 0;
  var correctAnswers = [];
  var wrongAnswers = [];

  questions.forEach(function(question, index) {
    var isCorrect = false;
    if (userAnswers[index] !== null) {
      var selectedAnswer = question.answers[userAnswers[index]];
      if (selectedAnswer && selectedAnswer.isCorrect) {
        score++;
        isCorrect = true;
      }
    }

    if (isCorrect) {
      correctAnswers.push(index);
    } else {
      wrongAnswers.push(index);
    }
  });

  // Store results in localStorage
  var examResults = {
    score: score,
    totalQuestions: questions.length,
    percentage: Math.round((score / questions.length) * 100),
    userAnswers: userAnswers,
    questions: questions,
    timeTaken: totalTime - timeLeft,
    correctAnswers: correctAnswers,
    wrongAnswers: wrongAnswers,
    submittedAt: new Date().toISOString()
  };
  localStorage.setItem("examResults", JSON.stringify(examResults));

  // Redirect to results page
  window.location.href = "results.html";
}

// ============== TIMER ==============

var totalTime = 5 * 60; // 5 minutes in seconds
var timeLeft = totalTime;
var timerInterval;

function startTimer() {
  timerRemaining.textContent = formatTime(timeLeft);
  var progressPercent = (timeLeft / totalTime) * 100;
  timerBar.style.width = progressPercent + "%";

  // Set initial color if time was restored at a low value
  if (timeLeft <= 60) {
    timerBar.style.backgroundColor = "#ef4444";
    timerRemaining.style.color = "#ef4444";
  } else if (timeLeft <= 120) {
    timerBar.style.backgroundColor = "#f59e0b";
    timerRemaining.style.color = "#f59e0b";
  }

  timerInterval = setInterval(function() {
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      alert("Time's up! Your exam will be submitted automatically.");
      submitExam();
    } else {
      timeLeft--;
      timerRemaining.textContent = formatTime(timeLeft);
      var progressPercent = (timeLeft / totalTime) * 100;
      timerBar.style.width = progressPercent + "%";

      // Save time left for recovery
      sessionStorage.setItem("timeLeft", timeLeft.toString());

      // Change color when time is running low
      if (timeLeft <= 60) {
        timerBar.style.backgroundColor = "#ef4444"; // Red
        timerRemaining.style.color = "#ef4444";
      } else if (timeLeft <= 120) {
        timerBar.style.backgroundColor = "#f59e0b"; // Orange
        timerRemaining.style.color = "#f59e0b";
      }
    }
  }, 1000);
}

function formatTime(seconds) {
  var mins = Math.floor(seconds / 60);
  var secs = seconds % 60;
  return mins.toString().padStart(2, '0') + ":" + secs.toString().padStart(2, '0');
}

// ============== EVENT LISTENERS ==============

// Load questions when page loads
loadQuestions();

// Show welcome message with user's name
var currentUser = Auth.getCurrentUser();
if (currentUser) {
  userName.textContent = currentUser.firstName + " " + currentUser.lastName || "Guest";
}

// Navigation button events
prevBtn.addEventListener("click", goToPrevious);
nextBtn.addEventListener("click", goToNext);
markBtn.addEventListener("click", toggleMark);
submitBtn.addEventListener("click", showSubmitModal);

// Modal events
cancelSubmitBtn.addEventListener("click", hideSubmitModal);
confirmSubmitBtn.addEventListener("click", function() {
  hideSubmitModal();
  submitExam();
});
closeWarningBtn.addEventListener("click", hideWarningModal);

// Close modals when clicking outside
submitModal.addEventListener("click", function(e) {
  if (e.target === submitModal) {
    hideSubmitModal();
  }
});
warningModal.addEventListener("click", function(e) {
  if (e.target === warningModal) {
    hideWarningModal();
  }
});


// Check if there was an interrupted exam session
(function checkExamRecovery() {
  var savedAnswers = sessionStorage.getItem("userAnswers");
  var savedMarked = sessionStorage.getItem("markedQuestions");

  if (savedAnswers) {
    try {
      userAnswers = JSON.parse(savedAnswers);
    } catch (e) {}
  }

  if (savedMarked) {
    try {
      markedQuestions = JSON.parse(savedMarked);
    } catch (e) {}
  }
})();
