import Deck from "./scripts/Deck.js";
import Player from "./scripts/Player.js";

import GamePhases from "./scripts/GamePhases.js";

const GamePhasesManager = GamePhases();

const deck = Deck();


const Players = [
  Player('Player', deck, true, GamePhasesManager),
  Player('Enemy', deck, false, GamePhasesManager)
]

// GAME ENGINE
// Iniciar primeira instacia do jogo quando a pagina for totalmente carregada
let player = 0;
let update = true;

window.addEventListener('load', InitGame);
function InitGame () {
  console.log('General: Initializing Game.');

  if(GamePhasesManager.initGame) {
    deck.init();

    Players[0].init();
    Players[1].init();
  
    Players[1].drawPlayer(true);

    deck.makeDeck();

    Players[0].drawPlayer();
    
    Players[0].drawFive();
    Players[1].drawFive();

    GamePhasesManager.initGame = false;
  }

  Game();
  console.log('General: Initializing Game complete.');
}

const d_phaseEl = document.querySelector('#d_phase');
const w_phaseEl = document.querySelector('#w_phase');
const a_phaseEl = document.querySelector('#a_phase');
const e_phaseEl = document.querySelector('#e_phase');




function Game() {
  requestAnimationFrame(Game);

  d_phaseEl.style.background = GamePhasesManager.DRAW_PHASE ? 'blue' : 'white';
  w_phaseEl.style.background = GamePhasesManager.WAIT_PHASE ? 'blue' : 'white';
  a_phaseEl.style.background = GamePhasesManager.ACTION_PHASE ? 'blue' : 'white';
  e_phaseEl.style.background = GamePhasesManager.END_PHASE ? 'blue' : 'white';

  if(update) {

    update = false;
  }

  if(GamePhasesManager.DRAW_PHASE) {
    GamePhasesManager.END_PHASE = false;
    GamePhasesManager.WAIT_PHASE = false;
    GamePhasesManager.ACTION_PHASE = false;

    Players[player].addCardOnHand(deck.draw());

    GamePhasesManager.DRAW_PHASE = false;
  }

  if(GamePhasesManager.WAIT_PHASE) {
    GamePhasesManager.END_PHASE = false;
    GamePhasesManager.DRAW_PHASE = false;
    GamePhasesManager.ACTION_PHASE = false;

    //Action

    GamePhasesManager.WAIT_PHASE = false;
  }
  if(GamePhasesManager.WAIT_PHASE) {
    GamePhasesManager.END_PHASE = false;
    GamePhasesManager.DRAW_PHASE = false;
    GamePhasesManager.ACTION_PHASE = false;

    //Action
  }

  if(GamePhasesManager.END_PHASE) {
    console.log('acabou o turno')
    player = player == 0 ? 1 : 0;

    GamePhasesManager.END_PHASE = false;
    GamePhasesManager.ACTION_PHASE = false;

    GamePhasesManager.DRAW_PHASE = true;

    update = true;
  }
}

d_phaseEl.addEventListener('click', () => {
  //GamePhasesManager.DRAW_PHASE = true;
});

w_phaseEl.addEventListener('click', () => {
  GamePhasesManager.WAIT_PHASE = true;
});

a_phaseEl.addEventListener('click', () => {
  GamePhasesManager.ACTION_PHASE = true;
});

e_phaseEl.addEventListener('click', () => {
  GamePhasesManager.END_PHASE = true;
});