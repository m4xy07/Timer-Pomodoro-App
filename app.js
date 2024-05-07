// app.js
const startBtn = document.querySelector('.btn-start');
const session = document.querySelector('.minutes');
let myInterval;
let state = true;

const appTimer = () => {
  const sessionAmount = Number.parseInt(session.textContent);

  if (state) {
    state = false;
    let totalSeconds = sessionAmount * 60;

    const updateSeconds = () => {
      totalSeconds--;

      let minutesLeft = Math.floor(totalSeconds / 60);
      let secondsLeft = totalSeconds % 60;

      if (secondsLeft < 10) {
        document.querySelector('.seconds').textContent = '0' + secondsLeft;
      } else {
        document.querySelector('.seconds').textContent = secondsLeft;
      }
      document.querySelector('.minutes').textContent = minutesLeft;

      if (minutesLeft === 0 && secondsLeft === 0) {
        alert('Focus session complete!');
        clearInterval(myInterval);
      }
    }
    myInterval = setInterval(updateSeconds, 1000);
  } else {
    alert('Focus session has already started.');
  }
}

startBtn.addEventListener('click', appTimer);