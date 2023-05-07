import { SelectionContainer } from "./utilities/SelectionTool.js";

class Card {
  constructor({ id, art, cardName, value, description, type, isSet,target, effectType }) {
    this.id = id;

    this.art = art;
    this.verse = "cards/backCard.png";
    this.cardName = cardName;
    this.value = value || 0;
    this.description = description || "";
    this.type = type;

    this.isSet = isSet;

    this.effect = effectType;

    this.player = '';
    this.target = target; // Self, Opponent

    this.options = false;
    this.isShowing = false;
  } // Fim do construtor

  init ({ player, showCard }) {
    this.isShowing = showCard;
    const element = this.draw(showCard);
    this.player = player;

    return element;
  }

  draw (showCard) {
    const cardElement = document.createElement("div");

    const cardImg = document.createElement('img');

    cardElement.classList.add(this.id);
    cardImg.src = showCard ? this.art : this.verse;

    cardElement.insertAdjacentElement('beforeend', cardImg)

    this.cardInfoViewer(cardElement);

    // Adiciona evento de click na carta
    cardElement.addEventListener("click", (e) => {
      if (this.player.playerTurn && this.player.type == 'SELF') {
        this.player.PlayCard(
          {
            card: this,
          }
        );
      } else {
        console.log("Is not your action move or your cards");
      }
    });

    return cardElement;
  }

  cardInfoViewer(element) {
    const cardImgViewer = document.querySelector('#cardFaceplate');
    const cardNameViewer = document.querySelector('#cardName');
    const cardDescriptionViewer = document.querySelector('#description');

    if(this.isShowing) {
      element.addEventListener("mouseenter", e => {
        cardImgViewer.src = this.art;
        cardNameViewer.innerText = this.cardName;
        cardDescriptionViewer.innerText = this.description;
      });
    }
  }

  applyEffect () {
     this.player.PlayCard({card: this, target: ''});

     // Controle e aplicação dos efeitos das cartas
     // if (cardId.effect.QUICK === true) {
     // }

     // if (cardId.effect.FIRST === true) {
     // }

     // Permite o jogador ativo puxar uma carta
     // TODO: Se a carta sacada for igual a carta jogada: escolher jogar ou manter na mão
     // if (cardId.effect.DRAW === true) {
     //   Player.drawOne();
     // }

     // Efeito de descarte
     // if (cardId.effect.DESCART.descart >= 1 && Player.hand.length > 0) {
     //   new SelectionContainer(
     //     Player.hand,
     //     // Action
     //     (selection) => {
     //       // Compara o array de cartas para descartar e as cartas da mão, depois descarte as opções
     //       const cards = [];

     //       selection.forEach((c) => {
     //         const card = selection.find((element) => element === c);
     //         const cardIndex = Player.hand.indexOf(card.cardRefId);

     //         if (card != null) {
     //           //TODO Criar função no player para descartar cartas
     //           Player.descart.addCardToDescart(Player.hand.splice(cardIndex, 1));
     //           Player.updateHand();

     //           // criar area de descarte
     //           // DECK --> descarte
     //         } else {
     //           console.error("error to descart");
     //         }
     //       });
     //     }
     //   );
     // }

     this.player.updateHand();

     return true;
  }

  cardInfo() {
    return `${this.cardName} Descrição da carta: ${this.description}`;
  }



















 // Painel de opções dentro da carta
  //   const optionsPanel = document.createElement("div");
  //  // optionsPanel.classList.add("optionsPanel");
  //   optionsPanel.style = 
  //   `

  //   `
  //   // Adicionar opcão para as cartas
  //   // ATIVAR
  //   const activeCard = document.createElement("button"); // se possivel
  //   activeCard.classList.add("activeCard");
  //   activeCard.innerText = "Ativar";
  //   //COLOCAR
  //   const setCard = document.createElement("button"); // se possivel
  //   setCard.classList.add("setCard");
  //   setCard.innerText = "Colocar";
  //   //INFO
  //   const info = document.createElement("button");
  //   info.classList.add("info");
  //   info.innerText = "info";

  //   // Impede que o player tenha controle das cartas ao averso
  //   optionsPanel.style.visibility =
  //     this.options && this.player.showCard ? "visible" : "hidden";

  //   activeCard.onclick = function () {
  //     console.log("active card");
  //     target.applyEffect();

  //     cardRef.remove();
  //   };

  //   setCard.onclick = function () {
  //     console.log("set card");
  //     target.setCardField();

  //     cardRef.remove();
  //   };

  //   info.onclick = function () {
  //     const cardView = document.querySelector(".cardView");
  //     const card_vw = document.querySelector("#card-vw");

  //     let visible = true;

  //     document.querySelector("#ok-btn").addEventListener("click", () => {
  //       cardView.style.visibility = "hidden";
  //       visible = false;
  //       this.player.updateHand();
  //     });

  //     cardView.style.visibility = "visible";

  //     card_vw.innerHTML = "";

  //     const tempImg = document.createElement("img");
  //     tempImg.src = this.art;
  //     tempImg.style.width = "300px";

  //     card_vw.insertAdjacentElement("beforeend", tempImg);

  //     document.body.insertAdjacentElement("beforeend", cardView);
  //   };

  //   // Insere as opções na carta
  //   optionsPanel.append(this.isSet.set ? setCard : activeCard);
  //   optionsPanel.appendChild(info);
  //   element.insertAdjacentElement("beforebegin", optionsPanel);















  Func(cardId, Player) {
    //Funções q a carta retorna
    const card = {};

    card.draw = draw;
    card.cardInfo = cardInfo;
    card.applyEffect = applyEffect;
    card.setCardField = setCardField;

    card.cardOptions = cardOptions;

    let options = false;

    // Coloca a carta no espaço de efeitos
    function setCardField() {
      // Identificação da carta e se será colocado virado para baixo na mesa
      Player.PlayCard(cardId, true);
    }

    // Aplicação de efeitos
    function applyEffect() {
      // Decide se as opções da carta será mostrado para o jogador no controle
      options = false;

      Player.PlayCard(cardId, false);

      // Controle e aplicação dos efeitos das cartas
      // if (cardId.effect.QUICK === true) {
      // }

      // if (cardId.effect.FIRST === true) {
      // }

      // Permite o jogador ativo puxar uma carta
      // TODO: Se a carta sacada for igual a carta jogada: escolher jogar ou manter na mão
      // if (cardId.effect.DRAW === true) {
      //   Player.drawOne();
      // }

      // Efeito de descarte
      // if (cardId.effect.DESCART.descart >= 1 && Player.hand.length > 0) {
      //   new SelectionContainer(
      //     Player.hand,
      //     // Action
      //     (selection) => {
      //       // Compara o array de cartas para descartar e as cartas da mão, depois descarte as opções
      //       const cards = [];

      //       selection.forEach((c) => {
      //         const card = selection.find((element) => element === c);
      //         const cardIndex = Player.hand.indexOf(card.cardRefId);

      //         if (card != null) {
      //           //TODO Criar função no player para descartar cartas
      //           Player.descart.addCardToDescart(Player.hand.splice(cardIndex, 1));
      //           Player.updateHand();

      //           // criar area de descarte
      //           // DECK --> descarte
      //         } else {
      //           console.error("error to descart");
      //         }
      //       });
      //     }
      //   );
      // }

      Player.updateHand();

      return true;
    }

    // Painel de opções dentro da carta
    const optionsPanel = document.createElement("div");
    optionsPanel.classList.add("optionsPanel");
    // Adicionar opcão para as cartas
    // ATIVAR
    const activeCard = document.createElement("button"); // se possivel
    activeCard.classList.add("activeCard");
    activeCard.innerText = "Ativar";
    //COLOCAR
    const setCard = document.createElement("button"); // se possivel
    setCard.classList.add("setCard");
    setCard.innerText = "Colocar";
    //INFO
    const info = document.createElement("button");
    info.classList.add("info");
    info.innerText = "info";

    // Opções para a carta
    function cardOptions(cardEl, cardRef, target) {
      // Impede que o player tenha controle de cartas ao averso
      optionsPanel.style.visibility =
        options && Player.showCard ? "visible" : "hidden";

      activeCard.onclick = function () {
        console.log("active card");
        target.applyEffect();

        cardRef.remove();
      };

      setCard.onclick = function () {
        console.log("set card");
        target.setCardField();

        cardRef.remove();
      };

      info.onclick = function () {
        const cardView = document.querySelector(".cardView");
        const card_vw = document.querySelector("#card-vw");

        let visible = true;

        document.querySelector("#ok-btn").addEventListener("click", () => {
          cardView.style.visibility = "hidden";
          visible = false;
          Player.updateHand();
        });

        cardView.style.visibility = "visible";

        card_vw.innerHTML = "";

        const tempImg = document.createElement("img");
        tempImg.src = cardId.art;
        tempImg.style.width = "300px";

        card_vw.insertAdjacentElement("beforeend", tempImg);

        document.body.insertAdjacentElement("beforeend", cardView);
      };

      // Insere as opções na carta
      optionsPanel.append(cardId.isSet.set ? setCard : activeCard);
      optionsPanel.appendChild(info);
      cardEl.insertAdjacentElement("beforebegin", optionsPanel);
    }

    function cardInfo() {
      return `${cardId.cardName} Descrição da carta: ${cardId.description}`;
    }

    // Desenha o objeto da carta
    function draw(showCard) {
      const cardEl = document.createElement("div");
      
      // TODO: Criar css para gerenciar isto
      cardEl.style.position = "relative";
      cardEl.style.display = "flex";
      cardEl.style.flexDirection = "column";
      cardEl.style.alignItems = "center";

      const cardRef = document.createElement("img");
      cardRef.src = showCard ? cardId.art : cardId.verse;
      cardRef.style.width = showCard ? "80px" : '30px';
      cardRef.style.margin = "2px";

      // Adiciona evento de click na carta
      cardRef.addEventListener("click", (e) => {
        options = !options;

        if (Player.playerTurn) {
          cardOptions(cardRef, cardEl, this); // this = target
        } else {
          console.log("is not your action move");
        }
      });

      cardEl.insertAdjacentElement("beforeend", cardRef);

      return cardEl;
    }

    return card;
  }
}

export default Card;
