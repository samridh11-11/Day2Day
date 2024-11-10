let timerInterval;
let elapsedTime = 0; // in seconds
let isRunning = false;

const timerDisplay = document.querySelector('.timer-time');

function updateTimerDisplay() {
    const hours = String(Math.floor(elapsedTime / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((elapsedTime % 3600) / 60)).padStart(2, '0');
    const seconds = String(elapsedTime % 60).padStart(2, '0');
    timerDisplay.textContent = `${hours}:${minutes}:${seconds}`;
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timerInterval = setInterval(() => {
            elapsedTime++;
            updateTimerDisplay();
        }, 1000);
    }
}

function pauseTimer() {
    if (isRunning) {
        clearInterval(timerInterval);
        isRunning = false;
    }
}

function resumeTimer() {
    startTimer();
}

function restartTimer() {
    pauseTimer();
    elapsedTime = 0;
    updateTimerDisplay();
}

function stopTimer() {
    pauseTimer();
    elapsedTime = 0;
    updateTimerDisplay();
    // Additional functionality for stopping can be added here
}

function finishTimer() {
    pauseTimer();
    // Additional functionality for finishing can be added here
}

document.getElementById('pause').addEventListener('click', pauseTimer);
document.getElementById('resume').addEventListener('click', resumeTimer);
document.getElementById('restart').addEventListener('click', restartTimer);
document.getElementById('stop').addEventListener('click', stopTimer);
document.getElementById('finish').addEventListener('click', finishTimer);

// Start the timer when the page loads
startTimer();