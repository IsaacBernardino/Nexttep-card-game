import CARDS from "./CARDS.js";

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
    // cartas temporarias
    CARDS[0], CARDS[0],
    CARDS[3], CARDS[3],
    CARDS[8], CARDS[8],
    CARDS[1],
    CARDS[6]
    //CARDS[10],CARDS[11],CARDS[12], CARDS[13], CARDS[14], CARDS[15], CARDS[16], CARDS[17],
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
    deckEl.classList.add('deckEl');
    deckEl.innerHTML = mainDeck.currentCards;

    deckEl.style.backgroundColor = 'yellow';
    deckEl.style.width = '70px';
    deckEl.style.height = '45px';

    deckEl.style.border = '2px solid black'
    deckEl.style.borderRadius = '5px';
    deckEl.style.margin = '2px';

    deckEl.style.display = 'flex';
    deckEl.style.justifyContent = 'center';
    deckEl.style.alignItems = 'center';

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
    const deckElStyle = document.querySelector('.deckEl');

    if(complete && mainDeck.currentCards > 0){
      console.log('--> Update deck.');
      mainDeck.currentCards = mainDeck.cards.length;
      if(deckElStyle != null)
        deckElStyle.innerHTML = mainDeck.currentCards;
    } else {
      error('The deck has not been initialized yet or is empty');
    }
  }

  function error(error) {
    console.error(error)
  }

  return mainDeck;
}

export default Deck;