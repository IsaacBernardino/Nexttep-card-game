import Deck from "./scripts/Deck.js";
import Descart from "./scripts/Descart.js";
import Player from "./scripts/Player.js";

import GamePhases from "./scripts/GamePhases.js";

const PhasesManager = GamePhases();

// Renderizar area do deck assim que instanciado
const globalDeck = Deck();
//descart
const players = [];
let activePlayer;

// Oponente
const Opponent = new Player({
  name: "BOT",
  type: "OPPONENT",
  deck: globalDeck,
  //descart,
  GamePhasesManager: PhasesManager,
});
// Quando um jogador é criado renderiza o seu lado de jogo automaticamente
const Self = new Player({
  name: "PLAYER",
  type: "SELF",
  deck: globalDeck,
  //descart,
  GamePhasesManager: PhasesManager,
});

function Init() {
  globalDeck.init();

  Self.init();
  Opponent.init();

  startMatch();
}

let initMatch = false;
let turnsCount = 0;
let over = false;

function startMatch() {
  console.log("Match started: " + Self.name + " vs " + Opponent.name);

  // escolher o player para iniciar
  const allPlayer = [Self, Opponent];
  // antes de iniciar e escolher distribui 5 cartas para a mão do jogador
  allPlayer.forEach((player) => {
    player.drawFive();
  });
  const random = Math.floor(Math.random() * allPlayer.length);

  activePlayer = allPlayer[random];
  activePlayer.playerTurn = true;
  activePlayer.places.battlefield.style.outline = '1px solid #00aa00';

  console.log(activePlayer.name + " Iniciate turn");

  turnsCount += 1;
  initMatch = true;

  //Definido fase inicial do player
  PhasesManager.DRAW_PHASE = true;

  if (initMatch) {
    setInterval(() => {
      Match();
    }, 1000 / 2);
  }
}

function changePlayerTurn() {
  activePlayer.places.battlefield.style.outline = '0'
  activePlayer.playerTurn = false;
  activePlayer = activePlayer === Self ? Opponent : Self;

  activePlayer.playerTurn = true;

  PhasesManager.DRAW_PHASE = true;

  console.log("active player after change: ", activePlayer.name);
}

function Match() {
  if (PhasesManager.DRAW_PHASE === true) {
    console.log("DRAW PHASE");
    if (globalDeck.currentCards > 0) {
      if (activePlayer.hand <= 0) {
        activePlayer.drawFive();
      } else {
        activePlayer.drawOne();
      }
    } else {
      console.log('GameOver')
      over = true;
      
      Self.places.battlefield.innerHTML = `${Self.name} || ${Self.amountScore}`
      Opponent.places.battlefield.innerHTML = `${Opponent.name} || ${Opponent.amountScore}`
    }

    PhasesManager.DRAW_PHASE = false;

    // Next Phase automatically
    setTimeout(() => {
      PhasesManager.WAIT_PHASE = true;
    }, 200);
  }
  if (PhasesManager.WAIT_PHASE === true) {
    console.log("WAIT PHASE");

    // Next phase
    setTimeout(() => {
      PhasesManager.WAIT_PHASE = false;
      PhasesManager.ACTION_PHASE = true;
    }, 300);
  }
  if (PhasesManager.ACTION_PHASE === true) {
    console.log("ACTION PHASE");

    activePlayer.places.battlefield.style.outline = '1px solid #00000045';

    if (activePlayer.type === "OPPONENT") {
      const i = Math.floor(Math.random() * activePlayer.hand.length);
      activePlayer.hand[i]
        .Functions(activePlayer.hand[i], activePlayer)
        .applyEffect();

      PhasesManager.ACTION_PHASE = false;
    }
  }
  if (PhasesManager.END_PHASE === true) {
    console.log("END PHASE");
    turnsCount++;

    PhasesManager.END_PHASE = false;

    if(!over)
      changePlayerTurn();
  }
}

Init();
