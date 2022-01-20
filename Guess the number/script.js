'use strict';

const againEl = document.querySelector('.again');
const numberEl = document.querySelector('.number');
const checkEl = document.querySelector('.check');
const scoreEl = document.querySelector('.score');
const highscoreEl = document.querySelector('.highscore');
const guessEl = document.querySelector('.guess');

const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;

checkEl.addEventListener('click', function () {
  const guess = Number(guessEl.value);
  if (!guess) {
    displayMessage('Please select a number');
  } else if (guess === secretNumber) {
    displayMessage('You are correct!');
    document.querySelector('body').style.backgroundColor = 'green';
    document.querySelector('.number').style.width = '30rem';
    numberEl.textContent = secretNumber;
    if (score > highscore) {
      highscore = score;
      highscoreEl.textContent = highscore;
    }
  } else if (guess !== secretNumber) {
    if (score > 1) {
      guess > secretNumber
        ? displayMessage('Too high!')
        : displayMessage('Too low!');
      score--;
      scoreEl.textContent = score;
    } else {
      document.querySelector('body').style.backgroundColor = 'red';
      document.querySelector('.number').style.width = '30rem';
      numberEl.textContent = secretNumber;
      scoreEl.textContent = 0;
      displayMessage('You lost the game :(');
    }
  }
});

againEl.addEventListener('click', function () {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  numberEl.textContent = '?';
  guessEl.value = '';
  scoreEl.textContent = score;

  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
});
