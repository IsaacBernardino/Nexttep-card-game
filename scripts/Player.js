import CardFunctions from "./CardFunctions.js";

function Player (name, type, deck, isshowCard, GamePhasesManager) {
  const player = {}

  player.name = name;
  // tipo do jogador: 'SELF', 'ALLY', 'OPPONENT', 'BOT'
  player.type = type || 'BOT';

  player.deck = deck;
  player.showCard;

  player.GamePhasesManager = GamePhasesManager;

  player.amount = [];
  player.amountScore = 0;

  player.spells = [];
  player.activeSpells = [];

  player.hand = [];

  player.init = init;
  player.addCardOnHand = addCardOnHand;
  
  player.drawPlayer = drawPlayer;

  player.drawFive = drawFive;
  player.updateHand = updateHand;

  // recuros de ambiente
  const ev = environment(player.showCard);

  // PLACES
  player.places = {
    battlefield: ev.battlefield,
    fieldEl: ev.fieldEl,
    amountEl: ev.amountEl,
    spellsEl: ev.spellsEl,
    handEl: ev.handEl
  }

  function init() {
    if(player.type === 'bot' || player.type === 'opponent') {
      player.showCard = false;
      player.places.battlefield.style.flexDirection = 'column-reverse';
      player.places.fieldEl.style.flexDirection = 'column-reverse';

      //console.log('Init: ' + player.name)
    } else {
      player.showCard = true;
    }

    player.amountScore = 0;
    console.log(`${Player.name}: started.`)
  }

  function drawFive() {
    for(let i = 0; i < 5; i++){
      player.hand.push(deck.draw());
    }

    updateHand();
  }

  function updateHand() {
    // limpar toda a area antes de atualizar
    player.places.handEl.innerHTML = '';

    player.hand.forEach(card => {
      //player.places.handEl.insertAdjacentElement('beforeend', cardFunctions(card, player).draw(player.showCard))
      player.places.handEl.append(CardFunctions(card, player).draw(player.showCard));
    });
  }

  function addCardOnHand () {
    player.hand.push(deck.draw());
    player.updateHand();
  }

  function drawPlayer(){
    player.hand.forEach(card => {
      //handEl.insertAdjacentElement('beforeend', cardFunctions(card, player).draw(player.showCard))
      player.places.handEl.append(cardFunctions(card, player).draw(player.showCard));
    });
  }

  return player;
}

export default Player;