import Deck from "./scripts/Deck.js";
import Descart from "./scripts/Descart.js";
import Player from "./scripts/Player.js";

import GamePhases from "./scripts/GamePhases.js";

const PhasesManager = GamePhases();

// Renderizar area do deck assim que instanciado
const deck = Deck();
//descart
const players = [];

// Quando um jogador é criado renderiza o seu lado de jogo automaticamente
const Self = new Player({
  name: "PLAYER",
  type: "SELF",
  deck: deck,
  //descart,
  GamePhasesManager: PhasesManager,
});

// Oponente
const Opponent = new Player({
  name: "BOT",
  type: "OPPONENT",
  deck: deck,
  //descart,
  GamePhasesManager: PhasesManager,
});

let activePlayer;

function Init() {

}