function Player ({name, type, deck, descart, GamePhasesManager}) {
  const player = {}

  // variavel de controle do jogador
  player.playerTurn = false;

  player.name = name;
  // tipo do jogador: 'SELF', 'ALLY', 'OPPONENT', 'BOT'
  player.type = type || 'OPPONENT';

  player.deck = deck;
  player.descart = descart;
  player.showCard;

  player.GamePhasesManager = GamePhasesManager;

  player.amount = [];
  player.amountScore = 0;

  player.spells = [];
  player.activeSpells = [];

  player.hand = [];

  player.init = init;
  player.drawOne = drawOne;
  
  player.RenderHand = RenderHand;

  player.drawFive = drawFive;
  player.updateHand = updateHand;

  // recuros de ambiente
  const ev = environment();

  // PLACES - Elementos HTML fornecidos pelo environment.js
  player.places = {
    battlefield: ev.battlefield,
    fieldEl: ev.fieldEl,
    amountEl: ev.amountEl,
    spellsEl: ev.spellsEl,
    handEl: ev.handEl
  }

  function init() {
    player.places.battlefield.append(player.name);

    if(player.type === 'OPPONENT') {
      //temp
      player.showCard = false;
      player.places.battlefield.style.flexDirection = 'column-reverse';
      player.places.fieldEl.style.flexDirection = 'column-reverse';
    } else {
      player.showCard = true;
    }

    player.amountScore = 0;
    //console.log(`${player.name}, ${player.type}: started.`)
  }
  // Renderiza as cartas na mão do jogador
  // MUITO IMPORTANTE
  function RenderHand(){
    player.hand.forEach(card => {
      player.places.handEl.append(card.Functions(card, player).draw(player.showCard));
    });
  }

  // puxa uma unica carta do deck
  function drawOne () {
    player.hand.push(deck.draw());
    player.updateHand();
  }

  // pucha 5 cartas
  function drawFive() {
    for(let i = 0; i < 5; i++){
      player.hand.push(deck.draw());
    }
    updateHand();
  }

  // Atualiza os elementos na mão do jogador
  function updateHand() {
    // limpar toda a area antes de atualizar
    player.places.handEl.innerHTML = '';

    player.hand.forEach(card => {
      player.places.handEl.append(card.Functions(card, player).draw(player.showCard));
    });
  }

  return player;
}

export default Player;