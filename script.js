'use strict';

//Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');

const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let currentScore = 0;
// currentScore must be outside the function scope beacuse we will use every time we click on the roll button. If it was inside the function, it would be set to zero each time we click on the roll button.

let activeplayer = 0;
// zero é para player1 e 1 é para player2

let scores = [0, 0];
// estes sáo os TotalScores = player1 é o primeiro elemento do array, que tem indice zero e player2 é o elemento do array com indice 1.

let playing = true;
// criou estado de funcionamento (on / off)

// Starting conditions
const init = function () {
  // cria condição de ESTADO para jogo estar rolando:

  playing = true;
  currentScore = 0;
  activeplayer = 0;
  scores = [0, 0];

  // esconde o dado
  diceEl.classList.add('hidden');

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player1El.classList.remove('player--active');
  player0El.classList.add('player--active');
};

init();

// Rolling dice functionality

//reusable code
const switchPlayer = function () {
  document.getElementById(`current--${activeplayer}`).textContent = 0;
  currentScore = 0;
  activeplayer = activeplayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  //vamos colocar uma condição de estado para deixar o botao funcionando enquanto o jogo estiver sendo jogado.
  if (playing) {
    // nao vamos utilizar varias vezes entáo vamos escrever diretamente aqui.
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // 2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3. Check for rolled 1
    if (dice !== 1) {
      // add the dice to the current score
      currentScore += dice;

      //    current0El.textContent = currentScore;
      // vamos mudar depois, pq está add somente no player 1, mas queremos que seja adicionado no player da vez.

      //vamos colocar os pontos no current somente no player da vez:
      document.getElementById(`current--${activeplayer}`).textContent =
        currentScore;

      //precisamos saber qual é o player da vez.
    } else {
      //switch player function

      switchPlayer();

      // // zero the current score and switch to next player
      // document.getElementById(`current--${activeplayer}`).textContent = 0;
      // currentScore = 0;
      // activeplayer = activeplayer === 0 ? 1 : 0;
      // // é zero? entao vira 1, senão vira 0.

      // //vamos utilizar metodo toggle do classList, que coloca uma classe se náo tiver e retira se tiver. Fazendo isso nos 2 players:
      // player0El.classList.toggle('player--active');
      // player1El.classList.toggle('player--active');
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1.add current score to the active player's
    scores[activeplayer] += currentScore;
    document.getElementById(`score--${activeplayer}`).textContent =
      scores[activeplayer];

    // 2. check if player's score is >= 100, so the game is over.
    if (scores[activeplayer] >= 100) {
      //game over
      playing = false;
      diceEl.classList.add('hidden');

      // diceEl.classList.add('.hidden'); Lembrando que aqui não temos o PONTO.

      document
        .querySelector(`.player--${activeplayer}`)
        .classList.add('player--winner');

      // Lembrando que querySelector tem que colocar o PONTO e getElementById não precisa.

      document
        .querySelector(`.player--${activeplayer}`)
        .classList.remove('player--active');
    } else {
      // 3. switch to the next player -> como estou fazendo a mesma coisa que fiz acima, iremos fazer uma função para náo duplicar o código:

      switchPlayer();
      // document.getElementById(`current--${activeplayer}`).textContent = 0;
      // currentScore = 0;
      // activeplayer = activeplayer === 0 ? 1 : 0;
      // // é zero? entao vira 1, senão vira 0.

      // //vamos utilizar metodo toggle do classList, que coloca uma classe se náo tiver e retira se tiver. Fazendo isso nos 2 players:
      // player0El.classList.toggle('player--active');
      // player1El.classList.toggle('player--active');
    }
  }
});

btnNew.addEventListener('click', init);
