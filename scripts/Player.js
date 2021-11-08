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

  // PLACES
  player.places = {
    fieldEl: '',
    amountEl: '',
    spellsEl:'',
    handEl:''
  }

  function init() {
    player.amountScore = 0;
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
      player.places.handEl.insertAdjacentElement('beforeend', cardFunctions(card, player).draw(player.cardShow))
    });
  }

  function addCardOnHand () {
    player.hand.push(deck.draw());
    player.updateHand();
  }

  function drawPlayer(enemy){
    const handEl = document.createElement('div');

    //handEl.style.backgroundColor = 'yellow';
    handEl.style.width = '90%';
    handEl.style.height = '130px';
    handEl.style.border = '2px solid black'
    handEl.style.borderRadius = '5px';
    handEl.style.margin = '2px';
    handEl.style.display = 'flex';
    handEl.style.justifyContent = 'center';
    handEl.style.alignItems = 'center';

    player.hand.forEach(card => {
      handEl.insertAdjacentElement('beforeend', cardFunctions(card, player).draw(player.cardShow))
    });

    const fieldEl = document.createElement('div');

    fieldEl.style.backgroundColor = '#00000050';
    fieldEl.style.width = '90%';
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
    spellsEl.style.display = 'flex';
    spellsEl.style.justifyContent = 'center';
    spellsEl.style.alignItems = 'center';
    spellsEl.style.backgroundColor = '#1550ff';
    spellsEl.style.border = '2px solid white';
    spellsEl.style.width = '150px';
    spellsEl.style.height = '70px';
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

    player.places =
    {
      fieldEl   : fieldEl,
      amountEl  : amountEl,
      spellsEl  : spellsEl,
      handEl    : handEl
    }
  }

  return player;
}

export default Player;

function cardFunctions(cardId, Player) {
  const card = {};

  card.draw = draw;
  card.cardInfo = cardInfo;
  card.applyEffect = applyEffect;
  card.setCardField = setCardField;

  let options = false;

  // Colocar carta no campo
  function setCardField(){
    cardSpellField(true);
    console.log('set card');
  }

  // Aplicar efeito
  function applyEffect () {
    // Verifica se a carta e um numero
    if(cardId.type === 'number') {
      activeOnAmount();
    }
    // Verifica se a carta é um efeito
    if(cardId.type === 'effect'){
      cardSpellField(false);
      console.log('active card');
    }

    let effectComplete = false;

    // Controle e aplicação dos efeitos 
    if(cardId.effect.QUICK === true) {

    }

    if(cardId.effect.FIRST === true) {

     }

    if(cardId.effect.DRAW === true) {
      Player.addCardOnHand();
    }

    Player.updateHand();
  }

  function activeOnAmount() {
    // Jogar a carta no campo
    // retorno visual da carta

    const cardAmount = document.createElement('img');
    cardAmount.src = cardId.art;
    cardAmount.style.width = '40px';
    cardAmount.style.position = 'absolute';

    Player.places.amountEl.insertAdjacentElement('beforeend', cardAmount);

    Player.amount.push(cardId);
    Player.amountScore += cardId.value;

    console.log(`${Player.name}: AmountScore: ${Player.amountScore}, AmountCards:${Player.amount.length}`);

    var index = Player.hand.indexOf(cardId);

    if (index > -1) {
      Player.hand.splice(index, 1);
    }

    Player.updateHand();
    
    // Verificar se na mão contem cartas iguais 
    const sameCards = Player.hand.filter(card => cardId.id == card.id);

    Player.GamePhasesManager.ACTION_PHASE = false; // finalizar fase de ação quando todas as ações for cocluidas
    Player.GamePhasesManager.END_PHASE = true; // proximo jogador
  }

  function cardSpellField(isSet) {
    // Jogar a carta no campo
    // retorno visual das cartas de efeito
    const cardSpellField = document.createElement('img');
    cardSpellField.src = isSet ? cardId.verse : cardId.art; 
    cardSpellField.style.width = '40px';
    cardSpellField.style.position = 'relative';
    cardSpellField.style.margin = '0 1px';

    Player.places.spellsEl.insertAdjacentElement('beforeend', cardSpellField);

    Player.spells.push(cardId);
    //Player.activeCard.push ();

    console.log(`${Player.name}: Speels on field: ${Player.spells.length}`);

    var index = Player.hand.indexOf(cardId);

    if (index > -1) {
      Player.hand.splice(index, 1);
    }

    Player.updateHand();
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
  activeCard.innerText = 'Ativar';

  const setCard = document.createElement('button'); // se possivel
  setCard.style =
  `
    height: 15px;
    background-color: #ffffff;
    border: none;
    margin: 1px 0;
    
    font-size: 6pt;
  `;
  setCard.innerText = 'Colocar';

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

  function cardOptions(cardEl, cardRef, target){
    optionsPanel.style.visibility = options && Player.cardShow ? 'visible' : 'hidden';
    
    activeCard.onclick = function() {
      console.log('active card');
      target.applyEffect();

      cardRef.remove();
    }

    setCard.onclick = function() {
      console.log('set card');
      target.setCardField();

      cardRef.remove();
    }

    info.onclick = function() {
      const cardView = document.querySelector('.cardView');
      const card_vw = document.querySelector('#card-vw');

      let visible = true;

      document.querySelector('#ok-btn').addEventListener('click', () => {
        cardView.style.visibility = 'hidden';
        visible = false;
        Player.updateHand()
      });

      cardView.style.visibility = 'visible';

      card_vw.innerHTML = '';

      card_vw.insertAdjacentElement('beforeend', cardEl);

      cardEl.style.width = visible ? '300px' : '70px';
      cardEl.style.borderRadius = visible ? '20px' : '2px';

      document.body.insertAdjacentElement('beforeend', cardView);
    }

    optionsPanel.append (cardId.isSet.set ? setCard : activeCard);
    optionsPanel.appendChild (info);

    cardEl.insertAdjacentElement('beforebegin', optionsPanel);
  }

  function cardInfo() {
    return `${cardId.cardName} Descrição da carta: ${cardId.description}`;
  }

  function draw(cardShow) {
    const cardEl = document.createElement('div');
    const cardRef = document.createElement('img');
    cardEl.style.position = 'relative';
    cardEl.style.display = 'flex';
    cardEl.style.flexDirection = 'column';
    cardEl.style.alignItems = 'center';
    
    cardRef.src = cardShow ? cardId.art : cardId.verse;
    cardRef.style.width = '60px';
    cardRef.style.margin = '1px';

    cardRef.addEventListener('click', (e) => {
      if(Player.GamePhasesManager.ACTION_PHASE){
      options = !options;
      cardOptions(cardRef, cardEl, this); // this = target

      e.target.style.backgroundColor = 'red';
      e.target.style.border = options ? '2px solid red' : '0';
      e.target.style.borderRadius = options ? '4px' : '0';
      } else{
        console.error('Não é sua fase de ação')
      }
    });

    cardEl.insertAdjacentElement('beforeend', cardRef);
      
    return cardEl;
  }

  return card;
}