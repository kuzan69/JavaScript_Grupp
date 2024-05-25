// Game state - Salih del 
// let infoClicked;
let clickCount = 0;
let currentScore = 0;
let activePlayer = 0;
let totalScores = [0, 0];
const winningScore = 56;

const victory = document.querySelector('.victory');
const playerWon = document.querySelector('#playerWon');
const playAgain = document.querySelector('#playAgain');
const hideBackground = document.querySelector('.hideBackground');
const x = document.querySelector('#x');
const gameSteps = document.querySelector('#gameSteps');
const prevNext = document.querySelector('.prevNext');
const previous = document.querySelector('#previous');
const nextDummy = document.querySelector('#nextDummy');
const next = document.querySelector('#next');

// Referens till alla element i DOM - Salih
const btnRoll = document.querySelector('.btnRoll');
const btnHold = document.querySelector('.btnHold');
const newGameAll = document.querySelectorAll('.newGame');
const newGameIcon = document.querySelector('.newGameIcon'); // Denna
const info = document.querySelectorAll('.info');
const infoIcon = document.querySelector('#infoIcon');
const gameMenu = document.querySelector('.gameMenu'); // Denna
const diceImage = document.querySelector('#diceImage');
const currentText = document.querySelector('#current');
const firstPoint = document.querySelector('#firstPoint');
const secondPoint = document.querySelector('#secondPoint');

const playerOne = document.querySelector('#playerOne');
const playerTwo = document.querySelector('#playerTwo');

const log = document.querySelector('.log');
const playerText = document.querySelector('#playerText');
const pointText = document.querySelector('#pointText');

const imgOne = document.createElement('img');
imgOne.src = 'assets/4.png';
imgOne.classList.add('diceImage');
imgOne.style.display = 'block';
imgOne.style.margin = '10px auto';

const imgTwo = document.createElement('img');
imgTwo.src = 'assets/1.png';
imgTwo.classList.add('diceImage');
imgTwo.style.display = 'block';
imgTwo.style.margin = '10px auto';

const test = function() {
  const test = window.innerWidth <= 768 ? 'P1' : 'Player 1';
  return test;
};

const steps = [
  `The game starts when ${test()} starts rolling the dice`,
  `Let us say that ${test()} rolled a 4`,
  'Good. Now, do I want to keep on rolling.. Or do I want to keep my points?',
  'Damn, I rolled and got the CURSED Dice, NUMERO UNO!!',
  'Now.. Want to know the limit? It is now your turn to play!',
  'Good luck!'
];

const infoClick = function() {
  clickCount = 1;
  hideBackground.style.display = 'grid';
  hideBackground.style.opacity = '1';
  let gameStyle = gameSteps.style;
  gameStyle.fontSize = '1.25rem';
  gameStyle.fontWeight = '100';
  next.textContent = 'Next';
  window.addEventListener('resize', () => {
    if(window.innerWidth <= 768) {
      gameMenu.style.transform = 'translateY(-60px)';
      newGameIcon.style.transform = 'translateY(-60px)';
      infoIcon.style.transform = 'translateY(-60px)';
    }
  });
  gameMenu.style.transform = 'translateY(-60px)';
  newGameIcon.style.transform = 'translateY(-60px)';
  infoIcon.style.transform = 'translateY(-60px)';
}

info.forEach(item => {
  item.addEventListener('click', () => {
    infoClick();
  });
});

const removeInfo = function() {
  hideBackground.style.opacity = '0';
  setTimeout(() => {
    hideBackground.style.display = 'none';
    next.textContent = 'Next';
  }, 1000);
  if(innerWidth <= 768) {
    gameMenu.style.transform = 'translateY(0)';
  }
  newGameIcon.style.transform = 'translateY(0)';
  infoIcon.style.transform = 'translateY(0)';
  clickCount = 1;
  return clickCount;
}

x.addEventListener('click', () => {
  removeInfo();
});

nextDummy.addEventListener('click', () => {
  gameSteps.textContent = steps[clickCount++];
  prevNext.style.display = 'flex';
});

next.addEventListener('click', () => {
  gameSteps.textContent = steps[clickCount++];
  if(clickCount === steps.length + 1) {
    // hideBackground.style.opacity = '0';
    // setTimeout(()=> {
    //   hideBackground.style.display = 'none';
    // }, 1000)
    removeInfo();
  }
  if(clickCount === 2) {
    gameSteps.append(imgOne);
  }
  if(clickCount === 4) {
    gameSteps.append(imgTwo);
    gameSteps.append('Now it is Player 2s turn.')
  }
  if(clickCount === steps.length) {
    let gameStyle = gameSteps.style;
    gameStyle.fontSize = '2.25rem';
    gameStyle.fontWeight = 'bold';
    next.textContent = 'Finish';
  }
  if(clickCount <= 1) {
    previous.addEventListener('click', () => {
      gameSteps.textContent = steps[clickCount--];
    });
  }
});

previous.addEventListener('click', () => {
  steps[clickCount]
});

// Objekt med bilder, varje bild ska ha en key med nummer, valuen ska vara src - Salihs del igen
const diceImages = {
  1: 'assets/1.png',
  2: 'assets/2.png',
  3: 'assets/3.png',
  4: 'assets/4.png',
  5: 'assets/5.png',
  6: 'assets/6.png'
};

// Visa vems tur det är - Yosef
const updatePlayerHighlight = () => {
  if (activePlayer === 0) {
    playerOne.classList.add('active');
    playerTwo.classList.remove('active');
  } else {
    playerTwo.classList.add('active');
    playerOne.classList.remove('active');
  }
};

// Ändra spelare - Yosefs del
const switchPlayer = () => {
  // Nollställ poäng
  currentScore = 0;
  // aktiv spelare
  activePlayer = 1 - activePlayer;
  // uppdatera spelarens underline och fontwheight
  updatePlayerHighlight(); 
  currentText.textContent = `Player ${activePlayer + 1}'s turn.`;
  playerText.textContent = '';
  pointText.textContent = '';
};

// Roll dice function - Hassan
const rollDice = () => {
  const diceValue = Math.floor(Math.random() * 6) + 1;
  diceImage.src = diceImages[diceValue];
  return diceValue;
};

// Rulla tärning - Yosef och Hassan
btnRoll.addEventListener('click', () => {
  diceImage.style.display = 'block';
  const dice = rollDice();

  if (dice === 1) {
    // När tärningen visar numret 1 då ska man vara så fin och byta - Hassan
    // currentText.textContent = `Player ${activePlayer + 1} rolled a 1! Switching turns.`;
    switchPlayer();
  } else {
    currentScore += dice;
    currentText.textContent = '';
    playerText.textContent = `Player ${activePlayer + 1} rolled ${dice}`
    pointText.textContent = `Current score: ${currentScore}.`;
  }
});

// Hold knappen - Yosef och Hassan
btnHold.addEventListener('click', () => {
  totalScores[activePlayer] += currentScore; 
  currentScore = 0;
  diceImage.style.display = 'none';

  if (activePlayer === 0) {
    firstPoint.textContent = totalScores[0];
  } else {
    secondPoint.textContent = totalScores[1];
  }

  // Se vem som vinner - Hassan
  if (totalScores[activePlayer] >= winningScore) {
    // playerText.textContent = '';
    // pointText.textContent = '';
    // currentText.textContent = `Player ${activePlayer + 1} wins!`;
    playerWon.textContent = `Player ${activePlayer + 1} is THE UDC!`;
    log.style.display = 'none';
    victory.style.display = 'grid';
    victory.style.opacity = '1';
    const victoryMobile = function() {
      if(window.innerWidth <= 768) {
        gameMenu.style.transform = 'translateY(-60px)';
        newGameIcon.style.transform = 'translateY(-60px)';
        infoIcon.style.transform = 'translateY(-60px)';
      } else {
        gameMenu.style.transform = 'translateY(0)';
        newGameIcon.style.transform = 'translateY(0)';
      }
    }
    window.addEventListener('resize', () => {
      victoryMobile();
    });
    victoryMobile();
    btnRoll.disabled = true;
    btnHold.disabled = true;
    playAgain.addEventListener('click', () => {
      location.reload();
    });
  } else {
    switchPlayer();
  }
});

const changePlayerText = function() {
  if(window.innerWidth <= 768) {
    playerOne.textContent = 'P1';
    playerTwo.textContent = 'P2';
  } else {
    playerOne.textContent = 'Player 1';
    playerTwo.textContent = 'Player 2';
  }
}
changePlayerText();

window.addEventListener('resize', () => {
  changePlayerText();
});

console.log(innerWidth);

// När man startar ett nytt spel Salihs del
newGameAll.forEach(game => {
  game.addEventListener('click', () => {
    // hideBackground.style.display = 'grid';
    // clickCount = 0;
    // diceImage.style.display = 'none';
    // totalScores = [0, 0];
    // activePlayer = 0;
    // currentScore = 0;
  
    // firstPoint.textContent = '0';
    // secondPoint.textContent = '0';
    // currentText.textContent = '';
    // playerText.textContent = '';
    // pointText.textContent = '';
    // diceImage.src = '';
  
    // btnRoll.disabled = false;
    // btnHold.disabled = false;

    // updatePlayerHighlight(); 

    location.reload();
  });
});


// // Salihs del
// newGameIcon.addEventListener('click', () => {
//   diceImage.style.display = 'none';
//   totalScores = [0, 0];
//   activePlayer = 0;
//   currentScore = 0;

//   firstPoint.textContent = '0';
//   secondPoint.textContent = '0';
//   currentText.textContent = '';
//   playerText.textContent = '';
//   pointText.textContent = '';
//   diceImage.src = '';

//   btnRoll.disabled = false;
//   btnHold.disabled = false;

//   updatePlayerHighlight(); 
// });

updatePlayerHighlight(); 
