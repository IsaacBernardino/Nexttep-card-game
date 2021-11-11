import Deck from "./scripts/Deck.js";
import Player from "./scripts/Player.js";
import Bot from "./scripts/bot.js";

import GamePhases from "./scripts/GamePhases.js";

const GamePhasesManager = GamePhases();

const deck = Deck();

const opponents = [];

// GAME ENGINE
// Iniciar primeira instacia do jogo quando a pagina for totalmente carregada
let update = true;
let initGame;

const bot_player = Player('Bot', 'bot', deck, true);

const player = Player('Player', 'self', deck, true);

function GameEngine() {
  const Game = {}

  Game.turns = 0;

  Game.Init = Init;
  Game.SearchForOpponent = SearchForOpponent;
  Game.PlayWithBot = PlayWithBot;

  function Init () {
    Game.turns = 0;

    deck.init()
    deck.makeDeck()

    bot_player.init();
    player.init();

    Game.Actions.drawFive(bot_player);
    Game.Actions.drawFive(player);

    opponents.push(bot_player);
    //console.log('oponents', opponents)

    Game.Actions.startMatch();
  }

  function SearchForOpponent() {
    const opponent = {
      found: false,

      opponent_player: {}
    }

    if(opponent.found) {
      console.log('Play with: ' + opponent.opponent_player);
    }
  }

  function PlayWithBot() {
    console.log('Play with Bot');

    return bot_player;
  }

  function Match() {
    // players.push(player)
    // players.push(SearchForOpponent().found ? SearchForOpponent().opponent_player : PlayWithBot());
    //console.log('Partida iniciada. JOGADORES: ' + player.name, opponents);
  }

  Game.Actions = {
    startMatch() {
      Match();
    },

    matchTurns(){
      
    },

    //Regra de jogo
    drawFive(player) {
      //console.log(`${player.name}: Draw 5 cards from deck`)
      for(let i = 0; i < 5; i++){
        player.hand.push(deck.draw());
      }

      player.updateHand();
    }
  }

  //console.log(Game.Actions);

  return Game;
}

const game = GameEngine();

window.addEventListener('load', game.Init);


// const playerStatsEl = document.querySelector('#player_status');

// if(opponents.length <= 0) {
//   console.log('GENERAL: Nenhum oponente');
//   initGame = false;
// } else {
//   playerStatsEl.style.visibility = 'hidden';
// }

// window.addEventListener('load', InitGame);
// function InitGame () {
//   console.log('General: Initializing Game.');

//   if(GamePhasesManager.initGame) {
    
//     deck.init();
//     deck.makeDeck();

//     player.init();
//     player.drawFive();

//     GamePhasesManager.initGame = false;
//   }

//   Game();
//   console.log('General: Initializing Game complete.');
// }

// const d_phaseEl = document.querySelector('#d_phase');
// const w_phaseEl = document.querySelector('#w_phase');
// const a_phaseEl = document.querySelector('#a_phase');
// const e_phaseEl = document.querySelector('#e_phase');

// function Game() {
//   requestAnimationFrame(Game);

//   d_phaseEl.style.background = GamePhasesManager.DRAW_PHASE ? 'blue' : 'white';
//   w_phaseEl.style.background = GamePhasesManager.WAIT_PHASE ? 'blue' : 'white';
//   a_phaseEl.style.background = GamePhasesManager.ACTION_PHASE ? 'blue' : 'white';
//   e_phaseEl.style.background = GamePhasesManager.END_PHASE ? 'blue' : 'white';

//   if(update) {

//     update = false;
//   }

//   if(GamePhasesManager.DRAW_PHASE) {
//     GamePhasesManager.END_PHASE = false;
//     GamePhasesManager.WAIT_PHASE = false;
//     GamePhasesManager.ACTION_PHASE = false;

//     Player.addCardOnHand(deck.draw());

//     GamePhasesManager.DRAW_PHASE = false;
//   }

//   if(GamePhasesManager.WAIT_PHASE) {
//     GamePhasesManager.END_PHASE = false;
//     GamePhasesManager.DRAW_PHASE = false;
//     GamePhasesManager.ACTION_PHASE = false;

//     //Action

//     GamePhasesManager.WAIT_PHASE = false;
//   }
//   if(GamePhasesManager.WAIT_PHASE) {
//     GamePhasesManager.END_PHASE = false;
//     GamePhasesManager.DRAW_PHASE = false;
//     GamePhasesManager.ACTION_PHASE = false;

//     //Action
//   }

//   if(GamePhasesManager.END_PHASE) {
//     console.log('acabou o turno')
//     player = player == 0 ? 1 : 0;

//     GamePhasesManager.END_PHASE = false;
//     GamePhasesManager.ACTION_PHASE = false;

//     GamePhasesManager.DRAW_PHASE = true;

//     update = true;
//   }
// }

// d_phaseEl.addEventListener('click', () => {
//   //GamePhasesManager.DRAW_PHASE = true;
// });

// w_phaseEl.addEventListener('click', () => {
//   GamePhasesManager.WAIT_PHASE = true;
// });

// a_phaseEl.addEventListener('click', () => {
//   GamePhasesManager.ACTION_PHASE = true;
// });

// e_phaseEl.addEventListener('click', () => {
//   GamePhasesManager.END_PHASE = true;
// });

// IA - Bot