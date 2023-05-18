import Deck from "./scripts/Deck.js";
import Descart from "./scripts/Descart.js";
import Player from "./scripts/Player.js";

import GamePhases from "./scripts/GamePhases.js";

// Recursos de Ambiente
const ev = new Environment ();

const PhasesManager = new GamePhases();
const nextButton = document.getElementById('next');
const stepNameIndicator = document.getElementById('stepName');
let nextStep = false;

const system = document.querySelector('.system');
const phaseIndicatorElement = document.querySelector('#phase-indicator');
const phaseIndicatorImages = {
  drawFaseIndicator : './assets/images/phases/indicator-DrawPhase.png',
  ActionFaseIndicator : './assets/images/phases/indicator-ActionPhase.png',
  effectStepIndicator : './assets/images/phases/indicator-EffectStep.png',
  numberStepIndicator : './assets/images/phases/indicator-NumberStep.png',
  waitFaseIndicator : './assets/images/phases/indicator-WaitPhase',
  endFaseIndicator : './assets/images/phases/indicator-EndPhase.png'
}

let currentActivateLimite = 1;

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
let GameOver;

function startMatch() {
  CreateLog("SYSTEM > Match started: " + Self.name + " vs " + Opponent.name);
  // Antes de iniciar e escolher, distribui 5 cartas para a mão dos jogadores
  players.forEach(player => {
    player.DrawFive();
  });

  const random = Math.floor(Math.random() * players.length);

  activePlayer = players[0];
  activePlayer.playerTurn = true;

  //Initiate with draw Step
  GameOver = false;
  turnsCount ++;
  CreateLog("SYSTEM > " + activePlayer.name + " Iniciate turn");
  initMatch = true;

  //turn()
  PhasesManager.DRAW_PHASE = true;
  drawStep()
  //Definido fase inicial do player
}

function turn() {

  if(PhasesManager.DRAW_PHASE = true) {
    phaseIndicatorElement.innerHTML = (`<img src='${phaseIndicatorImages.drawFaseIndicator}';/>`)

    stepNameIndicator.innerText = 'Ato de Saque';
    nextButton.style.opacity = '0';

    activePlayer.currentActivateLimite = currentActivateLimite;
  }

  if(PhasesManager.EFFECT_ACT) {
    phaseIndicatorElement.innerHTML = (`<img src='${phaseIndicatorImages.effectStepIndicator}';/>`)

    stepNameIndicator.innerText = 'Ato de Efeitos'
    nextButton.style.opacity = '1';
  }

  if(PhasesManager.NUMBER_ACT) {
    phaseIndicatorElement.innerHTML = (`<img src='${phaseIndicatorImages.numberStepIndicator}';/>`)

    stepNameIndicator.innerText = 'Ato de Numeros'
    nextButton.style.opacity = '0';
  }

    nextButton.addEventListener('click', () => {
      if(PhasesManager.EFFECT_ACT == true) nextStep = true;
    });

    effectAct();

    if(activePlayer.numberActiveLimit <= 0) {
      phaseIndicatorElement.innerHTML = (`<img src='${phaseIndicatorImages.endFaseIndicator}';/>`)

      if(PhasesManager.END_PHASE != false) endfase();
    }
  
}

function drawStep() {
  if(activePlayer.type == 'SELF') {
    if(activePlayer.hand.length <= 0 && PhasesManager.DRAW_PHASE) {
      activePlayer.DrawFive();
    } else if (activePlayer.hand.length >= 1 && PhasesManager.DRAW_PHASE){
      activePlayer.DrawOne();
    }

    PhasesManager.DRAW_PHASE = false;

    const interval = setTimeout(() => {
      // console.log('DRAW PHASE', PhasesManager.DRAW_PHASE);
      PhasesManager.EFFECT_ACT = true;
      effectAct();
      clearInterval(interval);
    }, 1500);
  }
}

function effectAct(){
  PhasesManager.DRAW_PHASE = false;
  if(!nextStep && PhasesManager.EFFECT_ACT) activePlayer.activateControl.canActivateEffect = true;

  if (nextStep) {
    PhasesManager.EFFECT_ACT = false;
    PhasesManager.NUMBER_ACT = true;

    if(PhasesManager.NUMBER_ACT == true) {
      activePlayer.activateControl.canActivateEffect = false;
      activePlayer.activateControl.canAddToAmount = true;
    }
    nextStep = false;
  }
}

function numberAct(){
  activePlayer.activateControl.canActivateEffect = false;
  activePlayer.activateControl.canAddToAmount = true;

  PhasesManager.NUMBER_ACT = true;
}

function endfase() {
  PhasesManager.NUMBER_ACT = false;

  activePlayer.activateControl.canAddToAmount = false;

  stepNameIndicator.innerText = 'Ato Final'
  nextButton.style.opacity = '0';

  //PhasesManager.END_PHASE = false;
}

function switchPlayer () {

}

function update () {

  if(initMatch)
    turn();

  if(globalDeck.currentCards > 0){
    GameOver = false;
  } else {
    GameOver = true;
  }

  requestAnimationFrame(update);
}

Init();
update();