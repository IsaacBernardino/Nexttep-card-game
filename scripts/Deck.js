import CARDS from "./CARDS.js";

function Deck() {
  const mainDeck = {}

  const ev = document.querySelector('#battlefieldEl')

  //Variaveis
  mainDeck.MAX_CARDS = 40;
  mainDeck.currentCards = 0;

  // Cartas no deck
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
    CARDS[6],
    //CARDS[10],CARDS[11],CARDS[12], CARDS[13], CARDS[14], CARDS[15], CARDS[16], CARDS[17],
  ]

  // Variaveis internas
  let complete = false;

  // Funções
  mainDeck.init = init;
  mainDeck.draw = draw;
  mainDeck.RenderDeck = RenderDeck;
  mainDeck.deckShuffle = deckShuffle;
  mainDeck.addCardToDeck = addCardToDeck;
  mainDeck.removeCardFromDeck = removeCardFromDeck;

  function init() {
    //console.log('Deck > Main Deck initializing...');
    mainDeck.currentCards = mainDeck.cards.length;

    complete = true;

    deckShuffle();
    RenderDeck();
    //console.log('Deck > Main Deck initializing complete...');
  }

  function RenderDeck(){
    // Area principal
    const deckDescart = document.createElement('div');
    deckDescart.classList.add('deck-area');

    // DECK
    const deckEl = document.createElement('div');
    deckEl.classList.add('deckEl');
    deckEl.innerHTML = mainDeck.currentCards;
    
    deckDescart.insertAdjacentElement('beforeend', deckEl);

    // ev = ambiente
    ev.insertAdjacentElement('beforeend', deckDescart);
  }

  function deckShuffle() {
    if(complete && mainDeck.currentCards > 0){
      shuffle(mainDeck);
    }else {
      error('The deck has not been initialized yet or is empty');
    }
  }

  function draw () {
    if(complete && mainDeck.currentCards > 0){
      //console.log('Deck > Draw a card');
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
      mainDeck.deckShuffle();
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
      mainDeck.deckShuffle();
    } else {
      error('The deck has not been initialized yet or is empty');
    }
  }

  function updateDeck() {
    const deckElStyle = document.querySelector('.deckEl');

    if(complete && mainDeck.currentCards > 0){
      //console.log('--> Update visual deck.');
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