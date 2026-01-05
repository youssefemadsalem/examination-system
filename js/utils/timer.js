// ============== TIMER ==============

var timerBar = document.getElementById("timer-bar");
var timerRemaining = document.getElementById("timer-remaining");

if (sessionStorage.getItem("examCompleted") === "true") {
  // Exam was completed, redirect to index
  window.location.replace("../index.html");
}

// Check if exam timed out (user reloaded while times up modal was showing)
if (sessionStorage.getItem("examTimedOut") === "true") {
  // Show the modal again on page load
  window.addEventListener("DOMContentLoaded", function () {
    showTimesUpModal();
  });
}

// Try to restore time left from sessionStorage
var savedTimeLeft = sessionStorage.getItem("timeLeft");

var totalTime = 300; // 1 minute in seconds
var timeLeft = totalTime;
var timerInterval;

if (savedTimeLeft !== null) {
  timeLeft = parseInt(savedTimeLeft, 10);
}

function startTimer() {
  // Don't start timer if exam already timed out
  if (sessionStorage.getItem("examTimedOut") === "true") {
    return;
  }

  timerRemaining.textContent = formatTime(timeLeft);
  var progressPercent = (timeLeft / totalTime) * 100;
  timerBar.style.width = progressPercent + "%";

  // Set initial color if time was restored at a low value
  if (timeLeft <= 10) {
    timerBar.style.backgroundColor = "#ef4444";
    timerRemaining.style.color = "#ef4444";
  } else if (timeLeft <= 30) {
    timerBar.style.backgroundColor = "#f59e0b";
    timerRemaining.style.color = "#f59e0b";
  }

  timerInterval = setInterval(function () {
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      sessionStorage.setItem("examTimedOut", "true");
      sessionStorage.removeItem("timeLeft");
      showTimesUpModal();
    } else {
      timeLeft--;
      timerRemaining.textContent = formatTime(timeLeft);
      var progressPercent = (timeLeft / totalTime) * 100;
      timerBar.style.width = progressPercent + "%";

      // Save time left for recovery
      sessionStorage.setItem("timeLeft", timeLeft.toString());

      // Change color when time is running low
      if (timeLeft <= 10) {
        timerBar.style.backgroundColor = "#ef4444"; // Red - critical
        timerRemaining.style.color = "#ef4444";
      } else if (timeLeft <= 30) {
        timerBar.style.backgroundColor = "#f59e0b"; // Orange - warning
        timerRemaining.style.color = "#f59e0b";
      }
    }
  }, 1000);
}

function formatTime(seconds) {
  var mins = Math.floor(seconds / 60);
  var secs = seconds % 60;
  return (
    mins.toString().padStart(2, "0") + ":" + secs.toString().padStart(2, "0")
  );
}

function showTimesUpModal() {
  var modal = document.getElementById("times-up-modal");
  if (modal) {
    modal.classList.remove("hidden");
    modal.style.display = "flex";
  }
}

function hideTimesUpModal() {
  var modal = document.getElementById("times-up-modal");
  if (modal) {
    modal.classList.add("hidden");
    modal.style.display = "none";
  }
}

// Handle close button click
var closeTimesUpBtn = document.getElementById("close-times-up");
if (closeTimesUpBtn) {
  closeTimesUpBtn.addEventListener("click", function () {
    hideTimesUpModal();
    submitExam();
    sessionStorage.removeItem("timeLeft");
    sessionStorage.removeItem("examTimedOut");
    sessionStorage.setItem("examCompleted", "true");
  });
}
