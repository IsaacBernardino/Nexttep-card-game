import Deck from "./scripts/Deck.js";
import Descart from "./scripts/Descart.js";
import Player from "./scripts/Player.js";

import GamePhases from "./scripts/GamePhases.js";

// Recursos de Ambiente
const ev = new Environment();

const PhasesManager = new GamePhases();
const activePlayerName = document.getElementById('activePlayer');
const nextButton = document.getElementById('next');
const stepNameIndicator = document.getElementById('stepName');
let nextStep = false;

const system = document.querySelector('.system');
const phaseIndicatorElement = document.querySelector('#phase-indicator');
const phaseIndicatorImages = {
  drawFaseIndicator: './assets/images/phases/indicator-DrawPhase.png',
  ActionFaseIndicator: './assets/images/phases/indicator-ActionPhase.png',
  effectStepIndicator: './assets/images/phases/indicator-EffectStep.png',
  numberStepIndicator: './assets/images/phases/indicator-NumberStep.png',
  waitFaseIndicator: './assets/images/phases/indicator-WaitPhase',
  endFaseIndicator: './assets/images/phases/indicator-EndPhase.png'
}

var checkHand = true;

let currentActiveLimit = 1;

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
let finishedTurn;
let turnsCount = 0;
let GameOver;

function startMatch() {
  PhasesManager.DRAW_PHASE = false;
  PhasesManager.EFFECT_ACT = false;
  PhasesManager.NUMBER_ACT = false;
  PhasesManager.END_PHASE = false;

  stepNameIndicator.innerText = `PARTIDA INICIADA ${Self.name} vs ${Opponent.name}`;

  CreateLog("SYSTEM > Match started: " + Self.name + " vs " + Opponent.name);
  // Antes de iniciar e escolher, distribui 5 cartas para a mão dos jogadores
  const initialHandTimer = setInterval(() => {
    players.forEach(player => {
      if (player.hand.length < 5) {
        player.DrawOne();
      } else {
        const random = Math.floor(Math.random() * players.length);

        activePlayer = players[0];

        //Initiate with draw Step
        GameOver = false;
        CreateLog("SYSTEM > " + activePlayer.name + " Iniciate turn");
        initMatch = true;
        clearInterval(initialHandTimer);
      }
    });
  }, 300);



  // Aguardar fim da animação
  const whenFinishAnimation = setInterval(() => {
    turn();
    clearInterval(whenFinishAnimation);
  }, 1000);
}


function turn() {
  turnsCount++;

  initMatch = false;
  PhasesManager.DRAW_PHASE = true;
  finishedTurn = false;

  phaseFlow();

}

function phaseFlow() {
  const game = setInterval(() => {
    if (!GameOver) {
      nextButton.addEventListener('click', () => {
        PhasesManager.EFFECT_ACT = false;
        PhasesManager.NUMBER_ACT = true;
      });

      if (activePlayer.numberActiveLimit <= 0) {
        PhasesManager.END_PHASE = true;
      }

      if (PhasesManager.DRAW_PHASE == true) {
        drawStep();
      }

      if (PhasesManager.EFFECT_ACT == true) {
        effectAct();
      }

      if (PhasesManager.NUMBER_ACT == true) {
        numberAct();
      }

      if (PhasesManager.END_PHASE == true) {
        endfase();
      }

      // controle simples do oponente
      BotMovements();
    } else {
      GameOverScreenDetails();
    }
  }, 1000);
}

function drawStep() {
  //phaseIndicatorElement.innerHTML = (`<img src='${phaseIndicatorImages.drawFaseIndicator}';/>`)
  stepNameIndicator.innerText = 'Ato de Saque';
  nextButton.style.opacity = '0';
  activePlayer.playerTurn = true;

  PhasesManager.NUMBER_ACT = false;

  if (!GameOver) {
    if (activePlayer.hand.length <= 0) {
      activePlayer.DrawFive();
      PhasesManager.DRAW_PHASE = false;
    }
    else if (activePlayer.hand.length > 0) {
      activePlayer.DrawOne();
      PhasesManager.DRAW_PHASE = false;
    } else {
      console.error('no one can draw from deck')
    }
  }

  if (!GameOver) {
    const interval = setTimeout(() => {
      clearTimeout(interval);

      PhasesManager.EFFECT_ACT = true;
    }, 600);
  }
}

// nextStep é controlado pelo botão de passada de fase

function effectAct() {
  phaseIndicatorElement.innerHTML = (`<img src='${phaseIndicatorImages.effectStepIndicator}';/>`)

  stepNameIndicator.innerText = 'Ato de Efeitos'
  if (activePlayer.type == 'SELF') {
    nextButton.style.opacity = '1';
  } else {
    nextButton.style.opacity = '0';
  }


  if (PhasesManager.EFFECT_ACT == true) activePlayer.activateControl.canActivateEffect = true;
}

function numberAct() {
  phaseIndicatorElement.innerHTML = (`<img src='${phaseIndicatorImages.numberStepIndicator}';/>`)

  stepNameIndicator.innerText = 'Ato de Numeros';
  nextButton.style.opacity = '0';

  activePlayer.activateControl.canActivateEffect = false;
  activePlayer.activateControl.canAddToAmount = true;
}

function endfase() {
  //phaseIndicatorElement.innerHTML = (`<img src='${phaseIndicatorImages.drawFaseIndicator}';/>`)
  if (PhasesManager.END_PHASE == true) {
    //Verifica se contém cartas no deck, se não tiver GameOver recebe true
    if (globalDeck.currentCards > 0) {
      GameOver = false;
    } else {
      GameOver = true;
    }
    activePlayer.activateControl.canAddToAmount = false;

    stepNameIndicator.innerText = 'Ato Final'
    nextButton.style.opacity = '0';

    finishedTurn = true;
    activePlayer.playerTurn = false;

    PhasesManager.DRAW_PHASE = false;
    PhasesManager.EFFECT_ACT = false;
    PhasesManager.NUMBER_ACT = false;
    PhasesManager.END_PHASE = false;

    activePlayer.numberActiveLimit = currentActiveLimit;

    switchPlayer();
    checkHand = true;
  }
}

function switchPlayer() {
  if (activePlayer.type == 'SELF') {
    activePlayer = players[1];
  } else if (activePlayer.type == 'OPPONENT') {
    activePlayer = players[0];
  }

  const waitForExchange = setTimeout(() => {
    PhasesManager.DRAW_PHASE = true;
    clearTimeout(waitForExchange);
  }, 1000);

}

function BotMovements() {
  if (activePlayer.type == 'OPPONENT') {
    if (PhasesManager.EFFECT_ACT == true) {
      // pular fase de efeitos
      const skipEffectStep = setTimeout(() => {
        PhasesManager.EFFECT_ACT = false;
        PhasesManager.NUMBER_ACT = true;

        clearTimeout(skipEffectStep);

      }, 800);
    }

    if (PhasesManager.NUMBER_ACT == true) {
      if (checkHand && activePlayer.hand.length > 0) {
        var numberCards = [];
        for (let card in activePlayer.hand) {
          if (activePlayer.hand[card].type == 'number') {
            numberCards.push(activePlayer.hand[card]);
          }
        }

        const randomCard = Math.floor(Math.random() * players.length);
        let cardToActive = numberCards[randomCard];

        const waitToPlay = setTimeout(() => {
          activePlayer.PlayCard({
            card: cardToActive,
            target: activePlayer
          });
          checkHand = false;
          PhasesManager.NUMBER_ACT = false;
          PhasesManager.END_PHASE = true;
        }, 500);
      }
    }
  }
}


function update() {
  
  if(activePlayer != null)
    activePlayerName.innerText = activePlayer.name;

  ev.places.deck_descart.deck.innerHTML =
    `
      ${globalDeck.mainDeck.length}
      ${globalDeck.currentCards > 0 ? '<img src="./cards/backCard.png">' : ''}
   `;

  if (GameOver)
    GameOverScreenDetails();

  requestAnimationFrame(update);
}

Init();
update();

function GameOverScreenDetails() {
  stepNameIndicator.innerText = 'Fim de Jogo';

  ev.places.playerField.playerHandCards.innerHTML = '';

  ev.places.battlefield.style =
    `
  background-color: #44556675;
  color: #fff;
  width: 400px;
  height: 500px;
  
  display: flex;
  justify-content: center;
  align-items: center;
  `;

  ev.places.battlefield.innerHTML =
    `
    ${players[0].name}: Amount Power (${players[0].amountScore})
    </br>
    vs
    </br>
    ${players[1].name}: Amount Power (${players[1].amountScore})
    </br>
    </br>
    winner: ${players[0].amountScore > players[1].amountScore ? players[0].name : players[1].name} ${Math.max(players[0].amountScore, players[1].amountScore)}
    `;
}