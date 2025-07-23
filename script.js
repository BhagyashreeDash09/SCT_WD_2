let [hours, minutes, seconds] = [0, 0, 0];
let display = document.getElementById("display");
let timer = null;

function updateDisplay() {
  let h = hours < 10 ? "0" + hours : hours;
  let m = minutes < 10 ? "0" + minutes : minutes;
  let s = seconds < 10 ? "0" + seconds : seconds;
  display.innerText = `${h}:${m}:${s}`;
}

function stopwatch() {
  seconds++;
  if (seconds === 60) {
    seconds = 0;
    minutes++;
  }
  if (minutes === 60) {
    minutes = 0;
    hours++;
  }
  updateDisplay();
}

document.getElementById("startBtn").addEventListener("click", () => {
  if (timer !== null) return;
  timer = setInterval(stopwatch, 1000);
});

document.getElementById("pauseBtn").addEventListener("click", () => {
  clearInterval(timer);
  timer = null;
});

document.getElementById("resetBtn").addEventListener("click", () => {
  clearInterval(timer);
  timer = null;
  [hours, minutes, seconds] = [0, 0, 0];
  updateDisplay();
  document.getElementById("laps").innerHTML = "";
});

document.getElementById("lapBtn").addEventListener("click", () => {
  const lapTime = display.innerText;
  const li = document.createElement("li");
  li.innerText = `Lap: ${lapTime}`;
  document.getElementById("laps").appendChild(li);
});

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

