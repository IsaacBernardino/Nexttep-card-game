import { SelectionContainer } from "./utilities/SelectionTool.js";

function CardFunctions(cardId, Player) {
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

  // Aplicação de efeitos
  function applyEffect () {

    //SelectionContainer(Player.hand);

    options = false;
    let effectComplete = false;
    // Verifica se a carta é um numero
    if(cardId.type === 'number') {
      activeOnAmount();
    }
    // Verifica se a carta é um efeito
    if(cardId.type === 'effect'){
      cardSpellField(false);
      console.log('active card');
    }

    // Controle e aplicação dos efeitos 
    if(cardId.effect.QUICK === true) {

    }

    if(cardId.effect.FIRST === true) {

    }

    if(cardId.effect.DRAW === true) {
      Player.addCardOnHand();
    }

    if(cardId.effect.DESCART.descart >= 1 && Player.hand.length > 0) {
      let toDescart = cardId.effect.DESCART.descart;
      SelectionContainer(Player.hand, toDescart, (cardsSelections) => {
        let selection = cardsSelections;
        // Comparar o array com as cartas para deletar e a mão depois descartar
        const cards = [];

        selection.forEach(c => {
          const card = selection.find(element => element === c);
          const cardIndex = Player.hand.indexOf(card);

          if(card != null){
            // Criar função no player para descartar cartas
            Player.hand.splice(cardIndex, 1);
            Player.updateHand();

            console.log(card.cardRefId);
            // criar area de descarte
            // DECK --> descarte
          }else {
            console.error('error to descart');
          }
        });
      });
      // TO-DO Implementar seleção para fazer o descarte
      
      // console.log('target descard ' + cardId.effect.DESCART.descart + ' card');
      // const descartContainerEl = document.createElement('div');

      // const current_cardsEl =  document.createElement('div');

      // const ok_button = document.createElement('button');
      // ok_button.innerText = 'Concluido';
      // ok_button.style = `background-color: #339922; color: #eee; width: 50%; height: 40px; z-index: 3; border: none; border-radius: 8px;`

        //ação
        function action() {
          
      }
        
        
      
      // descartContainerEl.style = `
      // color: #eee;
      // display: flex;
      // flex-direction: column;
      // align-items: center;
      // position: absolute; left: 50%; top: 50%;
      // transform: translate(-50%, -50%);
      // border-radius: 5px;
      // padding: 50px 20px;
      // background-color: #aaa; width: 96%; z-index: 3;
      // `
      // current_cardsEl.style = `
      // margin: 50px 0;
      // display: flex;
      // justify-content: center;
      // align-items: center;
      // border-radius: 5px;
      // background-color: #fff; width: 96%; height: 100px; z-index: 3;
      // `

      // Player.hand.forEach(card => {
      //   //Bot.places.handEl.insertAdjacentElement('beforeend', cardFunctions(card, Bot).draw(Bot.showCard))
      //   const newCard = document.createElement('img');
      //   const cardRefId = card;
      //   let opt = false;
      //   newCard.addEventListener(('click'), (e) => {
      //     if(toDescart > 0){
      //     // Select to descart
      //     opt = !opt;

      //     e.target.style.backgroundColor = 'red';
      //     e.target.style.border = opt ? '2px solid red' : '0';
      //     e.target.style.borderRadius = opt ? '4px' : '0';

      //     selection.push(cardRefId);
      //     console.log(selection)
      //     toDescart --;

      //     descartContainerEl.insertAdjacentElement('beforeend', ok_button);
      //     }
      //   });

      //   newCard.src = card.art;
      //   newCard.style.width = '60px';

      //   current_cardsEl.append(newCard);
      // });

      // descartContainerEl.innerText = `Selecione ${toDescart} ${toDescart <= 1 ? 'CARTA' : 'CARTAS'} para descartar`;
      // descartContainerEl.insertAdjacentElement('beforeend', current_cardsEl);
      
      // document.body.insertAdjacentElement('beforebegin', descartContainerEl);
    }

    Player.updateHand();
  }

  function activeOnAmount() {
    // Jogar a carta no montante
    // retorno visual da carta
    const cardAmount = document.createElement('img');
    cardAmount.src = cardId.art;
    cardAmount.style.width = '40px';
    cardAmount.style.position = 'absolute';

    Player.places.amountEl.insertAdjacentElement('beforeend', cardAmount);

    Player.amount.push(cardId);
    Player.amountScore += cardId.value;

    console.log(`${Player.name}: AmountScore: ${Player.amountScore}, AmountCards:${Player.amount.length}`);

    // Indece da carta ativada
    var index = Player.hand.indexOf(cardId);
    // remoção da carta da mão
    if (index > -1) {
      Player.hand.splice(index, 1);
    }

    Player.updateHand();
    
    // Verificar se na mão contem cartas iguais 
    const sameCards = Player.hand.filter(card => cardId.id == card.id);
    console.log('cartas iguais: ', sameCards.length)
    //Player.GamePhasesManager.ACTION_PHASE = false; // finalizar fase de ação quando todas as ações for concluidas
    //Player.GamePhasesManager.END_PHASE = true; // proximo jogador
  }

  function cardSpellField(isSet) {
    // Jogar a carta na area de efeito
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

    // Indece da carta jogada
    var index = Player.hand.indexOf(cardId);

    // remover carta da mão
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

    background-color: #00000090;
    width: 100%;
    height: 100%;
    border: 1px solid red;
    padding: 3px;
  `
      // Adicionar opcão para as cartas
  const activeCard = document.createElement('button'); // se possivel
  activeCard.style =
  `
    height: 50%;
    background-color: #2a4;
    color: #eee;
    border: none;
    margin: 1px 0;
  `;
  activeCard.innerText = 'Ativar';

  const setCard = document.createElement('button'); // se possivel
  setCard.style =
  `
    height: 50%;    
    background-color: #f23;
    color: #eee;
    border: none;
    margin: 1px 0;
  `;
  setCard.innerText = 'Colocar';

  const info = document.createElement('button');
  info.style =
  `
    height: 50%;  
    background-color: #59c;
    color: #eee;
    border: none;
    margin: 1px 0;
  `;
  info.innerText = 'info';

  function cardOptions(cardEl, cardRef, target){
    // esconde todas as cartas do inimigo
    optionsPanel.style.visibility = options && Player.showCard ? 'visible' : 'hidden';
    
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
      
      const tempImg = document.createElement('img');
      tempImg.src = cardId.art;
      
      tempImg.style.width = '300px';
      tempImg.style.border = '2px solid white';
      tempImg.style.borderRadius = '20px';
      card_vw.insertAdjacentElement('beforeend', tempImg);

      document.body.insertAdjacentElement('beforeend', cardView);
    }

    optionsPanel.append (cardId.isSet.set ? setCard : activeCard);
    optionsPanel.appendChild (info);

    cardEl.insertAdjacentElement('beforebegin', optionsPanel);
  }

  function cardInfo() {
    return `${cardId.cardName} Descrição da carta: ${cardId.description}`;
  }

  // desenha o objeto da carta
  function draw(showCard) {
    const cardEl = document.createElement('div');
    const cardRef = document.createElement('img');
    cardEl.style.position = 'relative';
    cardEl.style.display = 'flex';
    cardEl.style.flexDirection = 'column';
    cardEl.style.alignItems = 'center';
    
    cardRef.src = showCard ? cardId.art : cardId.verse;
    cardRef.style.width = '65px';
    cardRef.style.margin = '1px';

    cardRef.addEventListener('click', (e) => {
      options = !options;

      e.target.style.backgroundColor = 'red';
      e.target.style.border = options ? '2px solid red' : '0';
      e.target.style.borderRadius = options ? '4px' : '0';

      cardOptions(cardRef, cardEl, this); // this = target
    });

    cardEl.insertAdjacentElement('beforeend', cardRef);
      
    return cardEl;
  }

  return card;
}

export default CardFunctions;
