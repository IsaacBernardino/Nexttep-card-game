function Player({ name, type, deck, descart, GamePhasesManager }) {
  const player = {};

  player.color = '#000000'; // azul
  
  // variavel de controle do jogador
  player.playerTurn = false;
  player.played = false; // controla as jogadas do player
  player.numberActiveLimit = 1;

  player.name = name;
  // tipo do jogador: 'SELF', 'OPPONENT'
  player.type = type || "OPPONENT";

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

  player.RenderHand = RenderHand;

  player.drawOne = DrawOne;
  player.DrawFive = DrawFive;

  player.updateHand = updateHand;
  player.PlayCard = PlayCard;

  // recuros de ambiente
  const ev = environment();

  // PLACES - Elementos HTML fornecidos pelo environment.js
  player.places = {
    battlefield: ev.battlefield,
    fieldEl: ev.fieldEl,
    amountEl: ev.amountEl,
    spellsEl: ev.spellsEl,
    handEl: ev.handEl,
  };

  function init() {
    if (player.type === "OPPONENT") {
      player.color = '#aa0000'
      //temp
      player.showCard = false;
      player.places.battlefield.style.flexDirection = "column-reverse";
      player.places.fieldEl.style.flexDirection = "column-reverse";
      player.places.handEl.style.marginBottom = "-35px";
    } else {
      player.color = '#0000aa'
      player.showCard = true;
      player.places.handEl.style.marginTop = "-35px";
    }

    player.amountScore = 0;
    CreateLog(`${player.name}, ${player.type}: started.`);
  }
  // Renderiza as cartas na mão do jogador
  // MUITO IMPORTANTE
  function RenderHand() {
    player.hand.forEach((card) => {
      player.places.handEl.append(
        card.Functions(card, player).draw(player.showCard)
      );
    });
  }

  // puxa uma unica carta do deck
  function DrawOne() {
    CreateLog(`${player.name} > draw 1 card`, player.color);
    player.hand.push(deck.DrawCard());
    player.updateHand();
  }

  // pucha 5 cartas
  function DrawFive() {
    CreateLog(`${player.name} > draw 5 cards`, player.color);
    for (let i = 0; i < 5; i++) {
      player.hand.push(deck.DrawCard());
    }
    updateHand();
  }

  // Atualiza os elementos na mão do jogador
  function updateHand() {
    // limpar toda a area antes de atualizar
    player.places.handEl.innerHTML = "";

    player.hand.forEach((card) => {
      player.places.handEl.append(
        card.Functions(card, player).draw(player.showCard)
      );
    });
  }

  // Recebe a carta clicada para a ativação
  function PlayCard(card, set) {
    // Verifica se a carta é um numero
    if (card.type === "number") {
      activeOnAmount();
    }
    // Verifica se a carta é um efeito
    if (card.type === "effect") {
      cardSpellField(false);
      console.log("active card");
    }

    function activeOnAmount() {
      // Jogar a carta no montante
      // retorno visual da carta
      const cardAmount = document.createElement("img");
      cardAmount.src = card.art;
      cardAmount.style.width = "40px";
      cardAmount.style.position = "absolute";

      player.places.amountEl.insertAdjacentElement("beforeend", cardAmount);

      player.amount.push(card);
      player.amountScore += card.value;

      console.log(
        `${player.name}: AmountScore: ${player.amountScore}, AmountCards:${player.amount.length}`
      );

      // Indece da carta ativada
      var index = player.hand.indexOf(card);
      // remoção da carta da mão
      if (index > -1) {
        player.hand.splice(index, 1);
      }

      player.updateHand();
      CreateLog(`${player.name} activated ${card.cardName}`, player.color);

      if(player.numberActiveLimit > 0) player.numberActiveLimit--;
    }

    // // Verificar se na mão contem cartas iguais
    // const sameCards = Player.hand.filter((card) => card.id == card.id);
    // let playSame = document.createElement('button');

    // if (sameCards.length > 0) {
    //   console.log("cartas iguais: ", sameCards);

    //   new SelectionContainer(sameCards, applyEffect);

    // } else {
    if (player.numberActiveLimit === 0) {
      player.GamePhasesManager.ACTION_PHASE = false; // finalizar fase de ação quando todas as ações for concluidas
      player.GamePhasesManager.END_PHASE = true; // proximo jogador
    }
    // }

    function cardSpellField(isSet) {
      // Jogar a carta na area de efeito
      // retorno visual das cartas de efeito
      const cardSpellField = document.createElement("img");
      cardSpellField.src = isSet ? card.verse : card.art;
      cardSpellField.style.width = "40px";
      cardSpellField.style.position = "relative";
      cardSpellField.style.margin = "0 1px";

      player.places.spellsEl.insertAdjacentElement("beforeend", cardSpellField);

      player.spells.push(card);
      //Player.activeCard.push ();

      console.log(`${player.name}: Speels on field: ${player.spells.length}`);

      // Indece da carta jogada
      var index = player.hand.indexOf(card);

      // remover carta da mão
      if (index > -1) {
        player.hand.splice(index, 1);
      }

      player.updateHand();
    }
  }

  return player;
}

export default Player;
