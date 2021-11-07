class Card {
  constructor({id, art, cardName, value, description, isSet, FIRST, SKIP, STAY, DENY_DRAW, DRAW, DESCART, DESCART_VERIFY, SHOW_HAND, HAND_VERIFY, AMOUNT_VERIFY, AMOUNT_SHUFFLE, AMOUNT_REMOVE_LAST, AMOUNT_REMOVE_FIRST, QUICK, PLAYER_CHOOSE, BANISH, REVERSE_WIN_RULE} ){
    this.id = id;
    this.art = art;
    this.cardName = cardName;
    this.value = value || 0;
    this.description = description || '';

    this.isSet = isSet;

    this.effect = {
      FIRST: FIRST || false, // primeira carta a ser jogada
      SKIP: SKIP || false, //  Passa para a end phase
      STAY: STAY || false, // Se mantem em campo por x turnos
      DENY_DRAW: DENY_DRAW || false, // passa a fase de sacar carta
      DRAW: DRAW || false, // puxa x cartas
      DESCART: DESCART || false, // descarta x cartas da mão
      SHOW_HAND: SHOW_HAND || false, // mostra as cartas na mão
      HAND_VERIFY: HAND_VERIFY || false, // Verifica se na mão tem x quantidade de cartas

      AMOUNT_VERIFY: AMOUNT_VERIFY || false,// Verifica se o montate tem x quantidade de cartas
      AMOUNT_SHUFFLE: AMOUNT_SHUFFLE || false,// Mistura os montates no campo e embaralha e puxa x quantidades de cartas para formar um novo motante
      AMOUNT_REMOVE_LAST: AMOUNT_REMOVE_LAST || false, // remove carta do topo do montante
      AMOUNT_REMOVE_FIRST: AMOUNT_REMOVE_FIRST || false, // remove carta do fundo do montante

      DESCART_VERIFY: DESCART_VERIFY || false, // Verificar por X cartas no descarte

      BANISH: BANISH || false, // Retirar a carta do jogo
      
      QUICK: QUICK || false, // carta de efeito rapido
      PLAYER_CHOOSE: PLAYER_CHOOSE || false, // escolher um jogador na mesa
      REVERSE_WIN_RULE: REVERSE_WIN_RULE || false //
    }
  }
}

// Cartas
const CARDS = [
  new Card({
    id: '0',
    art: 'cards/0.png',
    cardName: 'Equilibrio',
    value: 0,
    description: 0,
    isSet: {set: false, turns: 0},
  }),

  new Card({
    id: 'p1',
    art: 'cards/p1.png',
    cardName: 'POSITIVO nº1',
    value: 1,
    description: '+1',
    isSet: {set: false, turns: 0},

    DRAW: true
  }),

  new Card({
    id: 'p5',
    art: 'cards/p5.png',
    cardName: 'POSITIVO nº5',
    value: 5,
    description: '+5',
    isSet: {set: false, turns: 0},
  }),

  new Card({
    id: 'p10',
    art: 'cards/p10.png',
    cardName: 'POSITIVO nº10',
    value: 10,
    description: '+10',
    isSet: {set: false, turns: 0},
  }),

  new Card({
    id: 'p25',
    art: 'cards/p25.png',
    cardName: 'POSITIVO nº25',
    value: 25,
    description: '+25',
    isSet: {set: false, turns: 0},
  }),

  new Card({
    id: 'p50',
    art: 'cards/p50.png',
    cardName: 'POSITIVO nº50',
    value: 50,
    description: '+50',
    isSet: {set: false, turns: 0},
  }),

  new Card({
    id: 'n1',
    art: 'cards/n1.png',
    cardName: 'NEGATIVO nº1',
    value: -1,
    description: '-1',
    isSet: {set: false, turns: 0},

    DESCART: true
  }),

  new Card({
    id: 'n5',
    art: 'cards/n5.png',
    cardName: 'NEGATIVO nº5',
    value: -5,
    description: '-5',
    isSet: {set: false, turns: 0},

    DRAW: true
  }),

  new Card({
    id: 'n10',
    art: 'cards/n10.png',
    cardName: 'NEGATIVO nº10',
    value: -10,
    description: '-10',
    isSet: {set: false, turns: 0},
  }),

  new Card({
    id: 'n25',
    art: 'cards/n25.png',
    cardName: 'NEGATIVO nº25',
    value: -25,
    description: '-25',
    isSet: {set: false, turns: 0},
  }),

  // Spells
  new Card({
    id: 'ef1',
    art: 'cards/ef1.png',
    cardName: 'REVERSÃO DE FATORES',
    value: 0,
    description: 'VIRE ESSA CARTA COM A FACE PARA BAIXO NA MESA POR PELO MENOS UM TURNO.\n EFEITO RAPIDO: Quando uma carta de efeito for ativado na mesa qualquer outro efeito de puxar cartas é negado até o fim do turno em que essa carta foi ativada.',
    isSet: {set: true, turns: 1},
    
    QUICK: true,
    DENY_DRAW: true,
  }),

  new Card({
    id: 'ef2',
    art: 'cards/ef2.png',
    cardName: 'ULTIMO DOS NEGATIVOS',
    value: 0,
    description: 'PERMANENTE.\n O jogador com menor pontuação no fim do jogo vence.',
    isSet: {set: false, turns: 0},
    
    STAY: true,
    REVERSE_WIN_RULE: true
  }),

  new Card({
    id: 'ef3',
    art: 'cards/ef3.png',
    cardName: 'MINIMALISTA',
    value: 0,
    description: 'Revele a sua mão a todos os jogadores.\n Escolha e descarte quantas cartas quanto possível mantendo no mínimo 2 cartas na sua mão, para cada 2 cartas descartadas remova a última carta do montante de um oponente na mesa.',
    isSet: {set: false, turns: 0},
    
    SHOW_HAND: true,
    DESCART: true,
    PLAYER_CHOOSE: {choose: true, target: ''},
    AMOUNT_REMOVE_LAST: {remove: true, target: ''}
  }),

  new Card({
    id: 'ef4',
    art: 'cards/ef4.png',
  }),

  new Card({
    id: 'ef5',
    art: 'cards/ef5.png',
  }),

  new Card({
    id: 'ef6',
    art: 'cards/ef6.png',
  }),

  new Card({
    id: 'ef7',
    art: 'cards/ef7.png',
  }),

  new Card({
    id: 'ef8',
    art: 'cards/ef8.png',
  }),

  new Card({
    id: 'ef9',
    art: 'cards/ef9.png',
  }),

  new Card({
    id: 'ef10',
    art: 'cards/ef10.png',
  }),
]

function cardFunctions(cardId, Player) {
  const card = {}

  card.draw = draw;
  card.cardInfo = cardInfo;
  card.applyEffect = applyEffect;

  let options = false;

  function applyEffect () {
    let effectComplete = false;
    //console.log(cardId.effect);
    if(cardId.effect.FIRST === true) { }

    if(cardId.effect.DRAW === true) {
      Player.addCardOnHand();
    }
  }

  const optionsPanel = document.createElement('div');
  optionsPanel.style =
  `
    position: absolute;
    display: flex;
    flex-direction: column;


    background-color: #000000;
    width: 90%;
    padding: 3px;
  `
      // Adicionar opcão para as cartas
  const activeCard = document.createElement('button'); // se possivel
  activeCard.style =
  `
    height: 15px;
    background-color: #ffffff;
    border: none;
    margin: 1px 0;
    
    font-size: 6pt;
  `;
  activeCard.innerText = 'Active Card';

  const setCard = document.createElement('button'); // se possivel
  setCard.style =
  `
    height: 15px;
    background-color: #ffffff;
    border: none;
    margin: 1px 0;
    
    font-size: 6pt;
  `;
  setCard.innerText = 'Set Card';

  const info = document.createElement('button');
  info.style =
  `
    height: 15px;
    background-color: #ffffff;
    border: none;
    margin: 1px 0;
    
    font-size: 6pt;
  `;
  info.innerText = 'info';

  function cardOptions(cardEl, target){
    
    optionsPanel.style.visibility = options ? 'visible' : 'hidden';

    activeCard.onclick = function() {
      console.log('active card');
      
    }

    setCard.onclick = function() {
      console.log('set card')
    }

    info.onclick = function() {
      console.log('info card')
    }

    optionsPanel.appendChild (activeCard);
    optionsPanel.appendChild (setCard);
    optionsPanel.appendChild (info);

    cardEl.insertAdjacentElement('beforebegin', optionsPanel);
  }

  function cardInfo() {
    return console.log(`${cardId.cardName}`);
  }

  function draw() {
    const cardEl = document.createElement('div');
    const cardRef = document.createElement('img');
    cardEl.style.position = 'relative';
    cardEl.style.display = 'flex';
    cardEl.style.flexDirection = 'column';
    cardEl.style.alignItems = 'center';
    
    cardRef.src = cardId.art;
    cardRef.style.width = '70px';
    cardRef.style.margin = '1px';

    cardRef.addEventListener('click', () => {
      options = !options;
      cardOptions(cardRef, target)
    });

    cardEl.insertAdjacentElement('beforeend', cardRef);
    return cardEl;
  }

  return card;
}

function Deck() {
  const mainDeck = {}

  //Variaveis
  mainDeck.MAX_CARDS = 40;
  mainDeck.currentCards = 0;
  mainDeck.cards = 
  [
    CARDS[0], CARDS[0], CARDS[0],
    CARDS[1], CARDS[1], CARDS[1],
    CARDS[2], CARDS[2], CARDS[2],
    CARDS[3], CARDS[3], CARDS[3],
    CARDS[4], CARDS[4], CARDS[4],
    CARDS[5], CARDS[5], CARDS[5],
    CARDS[6], CARDS[6], CARDS[6],
    CARDS[7], CARDS[7], CARDS[7],
    CARDS[8], CARDS[8], CARDS[8],
    CARDS[9], CARDS[9], CARDS[9],
    CARDS[10],CARDS[11],CARDS[12], CARDS[13], CARDS[14], CARDS[15], CARDS[16], CARDS[17], CARDS[18], CARDS[19],
  ]

  // Variaveis internas
  let complete = false;

  // Funções
  mainDeck.init = init;
  mainDeck.draw = draw;
  mainDeck.makeDeck = makeDeck;
  mainDeck.shuffle = shuffle;
  mainDeck.addCardToDeck = addCardToDeck;
  mainDeck.removeCardFromDeck = removeCardFromDeck;

  function init() {
    console.log('==> Main Deck initializing...');
    mainDeck.currentCards = mainDeck.cards.length;

    complete = true;

    shuffle();

    console.log('==> Main Deck initializing complete...');
  }

  function makeDeck(){
    const deckDescart = document.createElement('div');
    deckDescart.classList.add('deck-area');

    const deckEl = document.createElement('div');

    deckEl.style.backgroundColor = 'yellow';
    deckEl.style.width = '70px';
    deckEl.style.height = '45px';

    deckEl.style.border = '2px solid black'
    deckEl.style.borderRadius = '5px';
    deckEl.style.margin = '2px';

    deckEl.style.display = 'flex';
    deckEl.style.justifyContent = 'center';
    deckEl.style.alignItems = 'center';

    deckEl.insertAdjacentText('beforeend', mainDeck.currentCards);

    // Descarte
    const descartEl = document.createElement('div');

    descartEl.style.backgroundColor = 'yellow';
    descartEl.style.width = '70px';
    descartEl.style.height = '45px';

    descartEl.style.border = '2px solid black'
    descartEl.style.borderRadius = '5px';
    descartEl.style.margin = '2px';

    descartEl.style.display = 'flex';
    descartEl.style.justifyContent = 'center';
    descartEl.style.alignItems = 'center';

    deckDescart.insertAdjacentElement('beforeend', deckEl);
    deckDescart.insertAdjacentElement('beforeend', descartEl);

    document.body.insertAdjacentElement('beforeend', deckDescart);
  }

  function shuffle() {
    if(complete && mainDeck.currentCards > 0){
      console.log('==> Shuffling main Deck...');

      let currentIndex = mainDeck.cards.length,  randomIndex;
      // While there remain elements to shuffle...
      while (currentIndex != 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      // And swap it with the current element.
      [mainDeck.cards[currentIndex], mainDeck.cards[randomIndex]] =
      [mainDeck.cards[randomIndex], mainDeck.cards[currentIndex]];
    }
  }else {
      error('The deck has not been initialized yet or is empty');
    }
  }

  function draw () {
    if(complete && mainDeck.currentCards > 0){
      console.log('==> Draw a card...');
      let card = mainDeck.cards.pop();
      updateDeck();
      return card;
    }else {
      error('The deck has not been initialized yet or is empty');
    }
  }

  // FUNÇÕES DE CONTROLE
  function addCardToDeck(card) {
    // Adiciona a carta recebida no parametro e embaralha o deck
    if(complete && mainDeck.currentCards > 0){
      console.log('--> Adding card to the deck.');
      mainDeck.cards.push(card);
      mainDeck.shuffle();
      updateDeck();
    } else {
      error('The deck has not been initialized yet or is empty');
    }
  }

  function removeCardFromDeck(c) {
    if(complete && mainDeck.currentCards > 0){
      console.log('--> removing card from the deck.');
      
      const card = mainDeck.cards.find(element => element === c);
      const cardIndex = mainDeck.cards.indexOf(card);

      // remove a primeira copia no baralho
      if(card != null){
        mainDeck.cards.splice(cardIndex, 1);
      }else {
        error('The deck has not been initialized yet or is empty');
      }
      // Atualiza o estado do deck
      updateDeck();
      shuffle();
    } else {
      error('The deck has not been initialized yet or is empty');
    }
  }

  function updateDeck() {
    if(complete && mainDeck.currentCards > 0){
      console.log('--> Update deck.');
      mainDeck.currentCards = mainDeck.cards.length;
    } else {
      error('The deck has not been initialized yet or is empty');
    }
  }

  function error(error) {
    console.error(error)
  }

  return mainDeck;
}

function Player (name, deck) {
  const player = {}
  player.name = name;
  player.deck = deck;
  player.amount = 0;

  player.hand = [];

  player.init = init;
  player.addCardOnHand = addCardOnHand;
  player.drawPlayer = drawPlayer;

  function init() {
    player.amount = 0;
    // Remover 5 cartas do deck e adicionar na mão do jogador
    for(let i = 0; i < 5; i++){
      player.hand.push(deck.draw());
    }
  }

  function addCardOnHand () {
    player.hand.push(deck.draw());
  }

  function drawPlayer(enemy){
    const handEl = document.createElement('div');

    //handEl.style.backgroundColor = 'yellow';
    handEl.style.width = '400px';
    handEl.style.height = '130px';
    handEl.style.border = '2px solid black'
    handEl.style.borderRadius = '5px';
    handEl.style.margin = '2px';
    handEl.style.display = 'flex';
    handEl.style.justifyContent = 'center';
    handEl.style.alignItems = 'center';

    player.hand.forEach(card => {
      handEl.insertAdjacentElement('beforeend', cardFunctions(card, player).draw())
    });

    const fieldEl = document.createElement('div');

    fieldEl.style.backgroundColor = '#00000050';
    fieldEl.style.width = '400px';
    fieldEl.style.height = '150px';
    fieldEl.style.border = '2px solid black'
    fieldEl.style.borderRadius = '5px';
    fieldEl.style.margin = '2px';
    fieldEl.style.display = 'flex';
    fieldEl.style.flexDirection = enemy ? 'column-reverse' : 'column';

    fieldEl.style.justifyContent = 'center';
    fieldEl.style.alignItems = 'center';

    const amountEl = document.createElement('div');
    amountEl.style.backgroundColor = 'transparent';
    amountEl.style.border = '2px solid white';
    amountEl.style.width = '40px';
    amountEl.style.height = '60px';
    amountEl.style.margin = '2px 0';
    amountEl.style.borderRadius = '3px';

    const spellsEl = document.createElement('div');
    spellsEl.style.backgroundColor = '#1550ff';
    spellsEl.style.border = '2px solid white';
    spellsEl.style.width = '135px';
    spellsEl.style.height = '60px';
    spellsEl.style.margin = '2px 0';
    spellsEl.style.borderRadius = '3px';

    fieldEl.insertAdjacentElement('beforeend', amountEl);
    fieldEl.insertAdjacentElement('beforeend', spellsEl);

    if(enemy){
      document.body.insertAdjacentElement('beforeend', handEl);
      document.body.insertAdjacentElement('beforeend', fieldEl);
    }else{
      document.body.insertAdjacentElement('beforeend', fieldEl);
      document.body.insertAdjacentElement('beforeend', handEl);
    }

    return {
      fieldEl,
      amountEl,
      spellsEl,
      handEl
    };
  }

  return player;
}

const deck = Deck();

const Players = [
  Player('Player', deck),
  Player('Enemy', deck)
]

// GAME ENGINE
let enemyPlaces;
let playerPlaces;

// Iniciar primeira instacia do jogo quando a pagina for totalmente carregada
window.addEventListener('load', InitGame);

function InitGame () {
  console.log('General: Initializing Game.');

  deck.init();

  Players[0].init();
  Players[1].init();

  enemyPlaces = Players[1].drawPlayer(true);

  deck.makeDeck();
  playerPlaces = Players[0].drawPlayer();

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