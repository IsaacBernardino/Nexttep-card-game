class Player {
  constructor({name, type, deck, descart, GamePhasesManager}){
    this.color = '#000';
    this.name = name;
    this.type = type;   // tipo do jogador: 'SELF', 'OPPONENT'

    // Global e igual para todos os jogadores
    this.deck = deck;
    this.descart = descart;
    this.GamePhasesManager = GamePhasesManager;

    // Variaveis do player
    this.amountCards = [];
    this.amountScore = 0;

    this.effectCards = []
    this.activeCardsEffect = [];

    this.hand = [];

    // recuros de ambiente
    this.ev = new Environment();

    //
    this.numberActiveLimit = 1;
    this.playerTurn = false;
    this.activateControl = {
      canActivateEffect: false,
      canAddToAmount: false
    }
  }

  init () {
    if (this.type == "OPPONENT") {
      this.color = '#aa0000';
    } else {
      this.color = '#0000aa';
    }
    this.amountScore = 0;

    CreateLog(`${this.name}, ${this.type}: started.`);
  }

  // Funções de saque
  // Puxa uma unica carta do deck
  DrawOne() {
    CreateLog(`${this.name} > draw 1 card`, this.color);
    this.hand.push(this.deck.DrawCard());
    this.updateHand();
  }

    // Puxa 5 cartas
   DrawFive() {
    CreateLog(`${this.name} > draw 5 cards`, this.color);
    for (let i = 0; i < 5; i++) {
      this.hand.push(this.deck.DrawCard());
    }
    this.updateHand();
  }


  // Renderiza e atualiza as cartas na mão do jogador
  updateHand() {
    // Limpar toda a area antes de atualizar
    if(this.type == 'SELF'){
      this.ev.places.playerField.playerHandCards.innerHTML = '';
    }
    if(this.type == 'OPPONENT'){
      this.ev.places.enemyField.enemyHandCards.innerHTML = '';
    }

    this.hand.forEach((card) => {
      if(this.type == 'SELF') {
        this.ev.places.playerField.playerHandCards.append(card.init(
          {
            player: this,
            showCard: true
          }));
      }

      if(this.type == 'OPPONENT') {
        this.ev.places.enemyField.enemyHandCards.append(card.init({
          player: this,
          showCard: false
        }));
      }
    });
  }

  clearHand () {
    this.ev.places.playerField.playerHandCards.innerHTML = '';
    this.ev.places.enemyField.enemyHandCards.innerHTML = '';
  }


  PlayCard({card, target}) {

    if(this.activateControl.canActivateEffect) {
      // Verifica se a carta é um efeito
      if (card.type === "effect") {
        // Jogar a carta na area de efeito
        const cardSpellReference = document.createElement("img");
        cardSpellReference.src = card.isSet.set ? card.verse : card.art;
        cardSpellReference.style.width = "40px";
        cardSpellReference.style.position = "relative";
        cardSpellReference.style.margin = "0 1px";
        
        //ev.places.playerField.effectZone.insertAdjacentElement("beforeend", cardSpellReference);
        if(this.type == 'SELF') {
          this.ev.places.playerField.effectZone.insertAdjacentElement('beforeend', cardSpellReference);
        } else {
          this.ev.places.enemyField.effectZone.insertAdjacentElement('beforeend', cardSpellReference);
        }

        this.effectCards.push(card);

        console.log(`${this.name}: Speels on field: ${this.effectCards.length}`);

        // Indece da carta jogada
        var index = this.hand.indexOf(card);

        // remover carta da mão
        if (index > -1) {
          this.hand.splice(index, 1);
        }

        this.updateHand();
      } else {
        console.log('Não é possivel ativar cartas Numeral nessa etapa');
      }
    }

    if(this.activateControl.canAddToAmount && this.numberActiveLimit >= 1) {
      // Verifica se a carta é um numero
      if (card.type === "number") {
        // Jogar a carta no montante e seu retorno visual 
          const cardAmount = document.createElement("img");
          cardAmount.src = card.art;
          cardAmount.style.width = "42px";
          cardAmount.style.position = "absolute";

          if(this.type == 'SELF') {
            this.ev.places.playerField.amountZone.insertAdjacentElement('beforeend', cardAmount);
          } else {
            this.ev.places.enemyField.amountZone.insertAdjacentElement('beforeend', cardAmount);
          }

          this.amountCards.push(card);
          this.amountScore += card.value;

          console.log(
            `${this.name}: AmountScore: ${this.amountScore}, AmountCards:${this.amountCards.length}`
          );

          // Indece da carta ativada
          let index = this.hand.indexOf(card);
          // remoção da carta da mão
          if (index > -1) {
            this.hand.splice(index, 1);
          }

          this.updateHand();
          CreateLog(`${this.name} activated ${this.cardName}`, this.color);
          this.canAddToAmount = false;
          if(this.numberActiveLimit > 0) this.numberActiveLimit--;
      } else {
        console.log('Não é possivel ativar cartas numeral nessa etapa');
      }
    }
  }
}

export default Player;
