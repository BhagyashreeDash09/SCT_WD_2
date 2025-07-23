let timer;
let running = false;
let startTime;
let elapsedTime = 0;
let lapTimes = [];

const display = document.getElementById('display');
const startButton = document.getElementById('startButton');
const pauseButton = document.getElementById('pauseButton');
const resetButton = document.getElementById('resetButton');
const lapButton = document.getElementById('lapButton');
const lapList = document.getElementById('lapList');

function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor((ms % 1000) / 10); // Get first two digits for ms
return (
        String(hours).padStart(2, '0') + ':' +
        String(minutes).padStart(2, '0') + ':' +
        String(seconds).padStart(2, '0') /* + '.' +
        String(milliseconds).padStart(2, '0') */ // Uncomment for milliseconds
    );
}

function startStopwatch() {
    if (!running) {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateDisplay, 10); // Update every 10ms for smoother milliseconds
  running = true;
        startButton.textContent = 'Running';
        startButton.disabled = true;
        pauseButton.disabled = false;
        resetButton.disabled = false;
        lapButton.disabled = false;
    }
}

function pauseStopwatch() {
    if (running) {
        clearInterval(timer);
        elapsedTime = Date.now() - startTime;
        running = false;
        startButton.textContent = 'Start';
        startButton.disabled = false;
        pauseButton.disabled = true;
    }
}
function resetStopwatch() {
    clearInterval(timer);
    running = false;
    elapsedTime = 0;
    lapTimes = [];
    display.textContent = '00:00:00';
    lapList.innerHTML = ''; // Clear lap list
    startButton.textContent = 'Start';
    startButton.disabled = false;
    pauseButton.disabled = true;
    resetButton.disabled = true;
    lapButton.disabled = true;
}

function updateDisplay() {
    elapsedTime = Date.now() - startTime;
    display.textContent = formatTime(elapsedTime);
}
function recordLap() {
    if (running) {
        const lapTime = elapsedTime;
        lapTimes.push(lapTime);
        const listItem = document.createElement('li');
        listItem.textContent = Lap ${lapTimes.length}: ${formatTime(lapTime)};
        lapList.prepend(listItem); // Add new lap at the top
    }
}

// Event Listeners
startButton.addEventListener('click', startStopwatch);
pauseButton.addEventListener('click', pauseStopwatch);
resetButton.addEventListener('click', resetStopwatch);
lapButton.addEventListener('click', recordLap);

// Initial state
resetStopwatch();

