const givenArray = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
let shuffledArray;

function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


const timerWrapper = document.querySelector('.timer-wrapper');
let time;

function startTimer() {
  --i;
  if ((document.querySelectorAll('.is-flipped').length === 16) && (i > 0)) {
    clearInterval(time);
    setTimeout(() => {
      document.querySelector('.container').style.flexDirection = 'column-reverse';
      document.querySelector('.row').style.display = 'none';
      document.querySelector('.success-img').style.display = 'block';
      newGameBtn.style.display = 'block';
      timerWrapper.style.opacity = '0';
      document.querySelectorAll('.card-wrapper').forEach((wrapper) => wrapper.style.opacity = 0);
    }, 1000);
  };
  if (i >= 0) {
    timerWrapper.querySelector('text').textContent = i;
    timerWrapper.querySelector('path').style.strokeDasharray = `${(60 - i) * 4.19}, ${251.2 - (60 - i) * 4.19}`;
  } else {
    cards.forEach((card) => card.classList.remove('is-flipped'));

    setTimeout(() => {
      document.querySelector('.container').style.flexDirection = 'column-reverse';
      document.querySelector('.row').style.display = 'none';
      timerWrapper.style.opacity = '0';
      document.querySelectorAll('.card-wrapper').forEach((wrapper) => wrapper.style.opacity = 0);
      timerWrapper.querySelector('text').textContent = '';
      timerWrapper.querySelector('path').style.strokeDasharray = '0, 251.2';
      newGameBtn.style.display = 'block';
      document.querySelector('.fail-img').style.display = 'block';
      clearInterval(time);
    }, 1000);
  }
};

let show;
function showWithDelay() {
  ++n;
  if (n < 16) {
    document.querySelectorAll('.card-wrapper')[n].style.opacity = 1;
  } else {
    clearInterval(show);
  }
}

const cards = document.querySelectorAll('.card');
let lastTwoCards = [];
const newGameBtn = document.querySelector('.new-game-btn');


window.addEventListener('DOMContentLoaded', () => {

  newGameBtn.addEventListener('click', () => {
    shuffledArray = shuffle(givenArray);
    for (let i = 0; i < cards.length; ++i) {
      cards[i].setAttribute('id', `${i}`);
      cards[i].querySelector('.front').style.backgroundImage = `url(img/${shuffledArray[i]}.png)`;
    };

    cards.forEach((card) => card.classList.remove('is-flipped'));
    lastTwoCards = [];

    document.querySelector('.container').style.flexDirection = 'column';
    document.querySelector('.fail-img').style.display = 'none';
    document.querySelector('.success-img').style.display = 'none';
    newGameBtn.style.display = 'none';
    document.querySelector('.row').style.display = 'flex';

    n = -1;
    show = setInterval(showWithDelay, 200);

    i = 60;
    timerWrapper.querySelector('path').style.strokeDasharray = '0, 251.2';
    timerWrapper.querySelector('text').textContent = '60';
    setTimeout(() => {
      timerWrapper.style.opacity = '1';
      time = setInterval(startTimer, 1000);
    }, 3500);
  });


  cards.forEach((card) => {
    card.addEventListener('click', () => {
      if (!card.classList.contains('is-flipped')) {
        card.classList.add('is-flipped');

        if (lastTwoCards.length === 2) {
          if (document.getElementById(`${lastTwoCards[0]}`).children[0].style.backgroundImage !== document.getElementById(`${lastTwoCards[1]}`).children[0].style.backgroundImage) {
            document.getElementById(`${lastTwoCards[0]}`).classList.remove('is-flipped');
            document.getElementById(`${lastTwoCards[1]}`).classList.remove('is-flipped');
          };
          lastTwoCards = [];
        };

        if (lastTwoCards.length < 2) {
          lastTwoCards.push(card.attributes.id.value);
        };
      }
    })
  })



});
