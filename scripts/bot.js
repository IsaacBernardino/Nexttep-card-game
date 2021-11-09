function Bot (name, deck, isCardShow, GamePhasesManager) {
  const Bot = {}
  Bot.name = name;
  Bot.deck = deck;
  Bot.cardShow = isCardShow || false;

  Bot.GamePhasesManager = GamePhasesManager;

  Bot.amount = [];
  Bot.amountScore = 0;

  Bot.spells = [];
  Bot.activeSpells = [];

  Bot.hand = [];

  Bot.init = init;
  //Bot.addCardOnHand = addCardOnHand;
  
  //Bot.drawBot = drawBot;

 //Bot.drawFive = drawFive;
  Bot.updateHand = updateHand;

  // recuros de ambiente

  Bot.opponentPlaces = {};

  // PLACES
  Bot.opponentPlaces.fieldEl   = document.querySelector('#opponentField');
  Bot.opponentPlaces.amountEl  = document.querySelector('.opponent_amountEl');
  Bot.opponentPlaces.spellsEl  = document.querySelector('.opponent_spellsEl');
  Bot.opponentPlaces.handEl  = document.querySelector('.opponent_handEl');

  function init() {
    Bot.amountScore = 0;
    console.log('BOT: started.');
  }

  function updateHand() {
    // limpar toda a area antes de atualizar
    Bot.opponentPlaces.handEl.innerHTML = '';

    Bot.hand.forEach(card => {
      //Bot.places.handEl.insertAdjacentElement('beforeend', cardFunctions(card, Bot).draw(Bot.cardShow))
      Bot.opponentPlaces.handEl.append(CardFunctions(card, Bot).draw(Bot.cardShow));
    });
  }

  // function addCardOnHand () {
  //   Bot.hand.push(deck.draw());
  //   Bot.updateHand();
  // }

  // function drawBot(enemy){
  //   Bot.hand.forEach(card => {
  //     //handEl.insertAdjacentElement('beforeend', cardFunctions(card, Bot).draw(Bot.cardShow))
  //     Bot.places.handEl.append(cardFunctions(card, Bot).draw(Bot.cardShow));
  //   });
  // }

  return Bot;
}

export default Bot;