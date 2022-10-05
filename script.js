"use strict";

const hourFormatDiv = document.querySelector(".time-format--container");
const timeFormatInputDiv = document.querySelector(".first-row--options");
const timeFormatInput = document.querySelector(".form-check-input");
const clockBtn = document.querySelector(".fa-clock");
const timerBtn = document.querySelector(".fa-stopwatch");
const clockDiv = document.querySelector(".clock");
const clockHour = document.getElementById("clock-hour");
const clockMinutes = document.getElementById("clock-minutes");
const clockSeconds = document.getElementById("clock-seconds");
const pacificFormatDiv = document.querySelector(".pacific-format");
const pacificFormat = document.getElementById("time-format");
const clockDayDiv = document.querySelector(".clock--day");
const clockDay = document.getElementById("day");
const inputTimerDiv = document.querySelector(".input-timer-play");
const inputTimer = document.getElementById("input-timer");
const timer = document.querySelector(".timer");
const timerHour = document.getElementById("timer-hour");
const timerMinutes = document.getElementById("timer-minutes");
const timerSeconds = document.getElementById("timer-seconds");
const timerBtnsDiv = document.querySelector(".timer--btns");
const timerBtnReset = document.getElementById("btn-reset");
const playBtn = document.querySelector(".fa-play");
const timerErrorMessage = document.querySelector(".timer-error-message");

// FUNCTIONS

//Time Display
let timeFormat = false;
const timeDisplay = function () {
  const time = new Date();

  hourFormatDiv.style.display = "flex";
  clockDiv.style.display = "flex";
  clockDayDiv.style.display = "flex";

  inputTimerDiv.style.display = "none";
  timer.style.display = "none";
  timerBtnsDiv.style.display = "none";

  clockBtn.style.opacity = "1";
  clockBtn.style.color = "rgb(252, 251, 121)";
  timerBtn.style.opacity = "0.5";
  timerBtn.style.color = "gray";

  if (timeFormat === false) {
    clockHour.textContent = String(time.getHours() % 12 || 12).padStart(2, 0);
    clockMinutes.textContent = String(time.getMinutes()).padStart(2, 0);
    clockSeconds.textContent = String(time.getSeconds()).padStart(2, 0);

    pacificFormat.style.visibility = "visible";
    time.getHours() >= 12
      ? (pacificFormat.textContent = "PM")
      : (pacificFormat.textContent = "AM");

    clockDay.textContent = String(time).slice(0, 10).replace(" ", ", ");
  } else {
    clockHour.textContent = time.getHours();
    clockMinutes.textContent = String(time.getMinutes()).padStart(2, 0);
    clockSeconds.textContent = String(time.getSeconds()).padStart(2, 0);

    pacificFormat.style.visibility = "hidden";
    clockDay.textContent = String(time).slice(0, 10).replace(" ", ", ");
  }
};

//Timer Display
const timerDisplay = function () {
  hourFormatDiv.style.display = "none";
  clockDiv.style.display = "none";
  clockDayDiv.style.display = "none";

  inputTimerDiv.style.display = "flex";
  timer.style.display = "flex";
  timerBtnsDiv.style.display = "flex";

  timerBtn.style.opacity = "1";
  timerBtn.style.color = "rgb(252, 251, 121)";
  clockBtn.style.opacity = "0.5";
  clockBtn.style.color = "gray";
};

//Timer Starter
let myIntervalTimer;
const startTimer = function () {
  const timeUserInput = Number(inputTimer.value);
  if (timeUserInput === 0) {
    timerErrorMessage.style.display = "flex";
    inputTimer.value = "";
  } else {
    timerErrorMessage.style.display = "none";
    inputTimer.value = "";

    let convertedTime = timeUserInput * 60;

    const startTimer = function () {
      timerHour.textContent = String(Math.floor(convertedTime / 3600)).padStart(
        2,
        0
      );
      timerMinutes.textContent = String(
        Math.floor((convertedTime % 3600) / 60)
      ).padStart(2, 0);
      timerSeconds.textContent = String(
        Math.floor((convertedTime % 3600) % 60)
      ).padStart(2, 0);
    };

    startTimer();

    const updatingTimer = function () {
      if (convertedTime > 0) {
        convertedTime--;
        startTimer();
      } else {
        clearInterval(myIntervalTimer);
      }
    };

    const ticking = function () {
      myIntervalTimer = setInterval(updatingTimer, 1000);
    };

    ticking();
  }
};

//Time Stop by Reset Button Click
const timerReset = function () {
  clearInterval(myIntervalTimer);
  timerHour.textContent = "00";
  timerMinutes.textContent = "00";
  timerSeconds.textContent = "00";
};

//Update Clock Each Second
let myInterval;
const updatingTimeDisplay = function () {
  myInterval = setInterval(timeDisplay, 1000);
};

//Stop Interval
const stopUpdatingTimeDisplay = function () {
  clearInterval(myInterval);
};

//Page Load
window.addEventListener("load", function () {
  timeDisplay();
  updatingTimeDisplay();
});

//Event Handlers

clockBtn.addEventListener("click", function () {
  timeDisplay();
  updatingTimeDisplay();
});

timeFormatInput.addEventListener("click", function () {
  timeFormat = !timeFormat;

  stopUpdatingTimeDisplay();
  timeDisplay();
  updatingTimeDisplay();
});

timerBtn.addEventListener("click", function () {
  stopUpdatingTimeDisplay();
  timerDisplay();
});

playBtn.addEventListener("click", function () {
  startTimer();
});

timerBtnReset.addEventListener("click", timerReset);
