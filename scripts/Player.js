function Player (name, deck, isCardShow, GamePhasesManager) {
  const player = {}
  player.name = name;
  player.deck = deck;
  player.cardShow = isCardShow || false;

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
  const ev = environment(player.cardShow);

  // PLACES
  player.places = {
    battlefield: ev.battlefield,
    fieldEl: ev.fieldEl,
    amountEl: ev.amountEl,
    spellsEl: ev.spellsEl,
    handEl: ev.handEl
  }

  function init() {

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
      //player.places.handEl.insertAdjacentElement('beforeend', cardFunctions(card, player).draw(player.cardShow))
      player.places.handEl.append(CardFunctions(card, player).draw(player.cardShow));
    });
  }

  function addCardOnHand () {
    player.hand.push(deck.draw());
    player.updateHand();
  }

  function drawPlayer(enemy){
    player.hand.forEach(card => {
      //handEl.insertAdjacentElement('beforeend', cardFunctions(card, player).draw(player.cardShow))
      player.places.handEl.append(cardFunctions(card, player).draw(player.cardShow));
    });
  }

  return player;
}

export default Player;