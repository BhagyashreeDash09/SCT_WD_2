let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let lapCounter = 0;

const display = document.getElementById('display');
const startPauseBtn = document.getElementById('startPauseBtn');
const lapBtn = document.getElementById('lapBtn');
const resetBtn = document.getElementById('resetBtn');
const lapList = document.getElementById('lapList');

startPauseBtn.addEventListener('click', startPause);
lapBtn.addEventListener('click', recordLap);
resetBtn.addEventListener('click', resetStopwatch);

function startPause() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(getShowTime, 1); // Update every millisecond
        startPauseBtn.innerHTML = 'Pause';
        startPauseBtn.classList.remove('start');
        startPauseBtn.classList.add('pause');
        lapBtn.disabled = false;
        resetBtn.disabled = false;
        running = true;
    } else {
        clearInterval(tInterval);
        startPauseBtn.innerHTML = 'Start';
        startPauseBtn.classList.remove('pause');
        startPauseBtn.classList.add('start');
        running = false;
    }
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((difference % 1000) / 10); // Displaying in centiseconds for readability

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    milliseconds = (milliseconds < 10) ? "0" + milliseconds : milliseconds;

    display.innerHTML = `${hours}:${minutes}:${seconds}`; // Displaying without milliseconds in main
}

function recordLap() {
    if (running) {
        lapCounter++;
        const lapTime = document.createElement('li');
        lapTime.innerHTML = `<span>Lap ${lapCounter}:</span> ${display.innerHTML}`; // Use current displayed time
        lapList.prepend(lapTime); // Add to the top of the list
    }
}

function resetStopwatch() {
    clearInterval(tInterval);
    difference = 0;
    running = false;
    display.innerHTML = '00:00:00';
    startPauseBtn.innerHTML = 'Start';
    startPauseBtn.classList.remove('pause');
    startPauseBtn.classList.add('start');
    lapBtn.disabled = true;
    resetBtn.disabled = true;
    lapList.innerHTML = ''; // Clear lap times
    lapCounter = 0;
}


