import Deck from "./scripts/Deck.js";
import Descart from "./scripts/Descart.js";
import Player from "./scripts/Player.js";

import GamePhases from "./scripts/GamePhases.js";

// Recursos de Ambiente
const ev = new Environment ();

const PhasesManager = new GamePhases();

// Renderizar area do deck assim que instanciado
const globalDeck = new Deck();
const globalDescart = Descart();

// Descarte
const players = [];
let activePlayer;

// Oponente
const Opponent = new Player({
  name: "BOT",
  type: "OPPONENT",
  deck: globalDeck,
  descart: globalDescart,
  GamePhasesManager: PhasesManager,
});
// Quando um jogador é criado renderiza o seu lado de jogo automaticamente
const Self = new Player({
  name: "PLAYER",
  type: "SELF",
  deck: globalDeck,
  descart: globalDescart,
  GamePhasesManager: PhasesManager,
});

function Init() {

  players.push(Self);
  players.push(Opponent);

  players.forEach(player => {
    player.init();
  });

  startMatch();
}

let initMatch = false;
let turnsCount = 0;
let over = false;

function startMatch() {
  CreateLog("SYSTEM > Match started: " + Self.name + " vs " + Opponent.name);
  // Antes de iniciar e escolher, distribui 5 cartas para a mão dos jogadores
  players.forEach(player => {
    player.DrawFive();
  });

  const random = Math.floor(Math.random() * players.length);

  activePlayer = players[random];
  activePlayer.playerTurn = true;

  CreateLog("SYSTEM > " + activePlayer.name + " Iniciate turn");
  initMatch = true;

  turnsCount ++;

  //Definido fase inicial do player
}

Init();