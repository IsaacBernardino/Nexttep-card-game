import Deck from "./scripts/Deck.js";
import Player from "./scripts/Player.js";

const deck = Deck();

const Players = [
  Player('Player', deck, true),
  Player('Enemy', deck, false)
]

// GAME ENGINE
// Iniciar primeira instacia do jogo quando a pagina for totalmente carregada
window.addEventListener('load', InitGame);

function InitGame () {
  console.log('General: Initializing Game.');

  deck.init();

  Players[0].init();
  Players[1].init();

  Players[1].drawPlayer(true);

  deck.makeDeck();
  Players[0].drawPlayer();

  updateGame();
  console.log('General: Initializing Game complete.');
}

const GamePhases = {
  draw: function () {

  },
  wait: function () {

  },
  action: function () {
    // Magic set
    // Number set
  },
  end: function () {
    
  }
}

function updateGame() {
  requestAnimationFrame(updateGame);
  //console.log('General: Game running');
}