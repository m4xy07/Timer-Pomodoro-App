// app.js

const timerElement = document.querySelector('.countdown-text');
const startButton = document.getElementById('startButton');
const resetButton = document.getElementById('resetButton');
const circleElement = document.querySelector('circle');
const audioElement = document.getElementById('timerAudio');
var playing = false;
var startTime = 25*60;
var timeleft = startTime;
let intervalId;

function formatTime(time){
  return time < 10 ? `0${time}` : time;
}

timerElement.innerText = `${formatTime(Math.floor(startTime / 60))}:${formatTime(startTime % 60)}`;

function countdown(){
  timeleft -= 1;
  let minutes = Math.floor(timeleft / 60);
  let seconds = timeleft % 60;
  timerElement.innerText = `${formatTime(minutes)}:${formatTime(seconds)}`;
  circleElement.style.strokeDashoffset = ((startTime - timeleft) / startTime) * 283;
  if(timeleft < 0){
    clearInterval(intervalId);
     timerElement.innerText = "Nice job!";
    resetTimer();
  }
}

function startTimer(){
  if(intervalId == null){
    intervalId = setInterval(countdown, 1000);
    audioElement.play();
  }
}

function pauseTimer(){
    clearInterval(intervalId);
    intervalId = null;
    audioElement.pause();
}

function resetTimer(){
  pauseTimer();
  playing = false;
  startButton.innerText = "Start";
  timeleft = startTime;
  timerElement.innerText = `${formatTime(Math.floor(startTime / 60))}:${formatTime(startTime % 60)}`;
  circleElement.style.strokeDashoffset = 0;
  audioElement.pause();
}

function onClickFunction(){
  if(!playing){
    startButton.innerText = "Pause";
    playing = true;
    startTimer();
  }else{
    startButton.innerText = "Start";
    playing = false;
    pauseTimer();
  }
}

startButton.addEventListener('click', onClickFunction);
resetButton.addEventListener("click", function(){
  resetTimer();
});