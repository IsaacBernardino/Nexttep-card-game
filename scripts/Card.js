import { SelectionContainer } from "./utilities/SelectionTool.js";

class Card {
  constructor({
    id,
    art,
    cardName,
    value,
    description,
    type,
    isSet,
    FIRST,
    SKIP,
    STAY,
    DENY_DRAW,
    DRAW,
    DESCART,
    DESCART_VERIFY,
    SHOW_HAND,
    HAND_VERIFY,
    AMOUNT_VERIFY,
    AMOUNT_SHUFFLE,
    AMOUNT_REMOVE_LAST,
    AMOUNT_REMOVE_FIRST,
    QUICK,
    PLAYER_CHOOSE,
    BANISH,
    REVERSE_WIN_RULE,
  }) {
    this.id = id;

    this.art = art;
    this.verse = "cards/verso-hq.png";
    this.cardName = cardName;
    this.value = value || 0;
    this.description = description || "";
    this.type = type;

    this.isSet = isSet;

    this.effect = {
      FIRST: FIRST || false, // primeira carta a ser jogada
      SKIP: SKIP || false, //  Passa para a end phase
      STAY: STAY || false, // Se mantem em campo por x turnos
      DENY_DRAW: DENY_DRAW || false, // passa a fase de sacar carta
      DRAW: DRAW || false, // puxa x cartas
      DESCART: DESCART || false, // descarta x cartas da mão
      SHOW_HAND: SHOW_HAND || false, // mostra as cartas na mão
      HAND_VERIFY: HAND_VERIFY || false, // Verifica se na mão tem x quantidade de cartas

      AMOUNT_VERIFY: AMOUNT_VERIFY || false, // Verifica se o montate tem x quantidade de cartas
      AMOUNT_SHUFFLE: AMOUNT_SHUFFLE || false, // Mistura os montates no campo e embaralha e puxa x quantidades de cartas para formar um novo motante
      AMOUNT_REMOVE_LAST: AMOUNT_REMOVE_LAST || false, // remove carta do topo do montante
      AMOUNT_REMOVE_FIRST: AMOUNT_REMOVE_FIRST || false, // remove carta do fundo do montante

      DESCART_VERIFY: DESCART_VERIFY || false, // Verificar por X cartas no descarte

      BANISH: BANISH || false, // Retirar a carta do jogo

      QUICK: QUICK || false, // carta de efeito rapido
      PLAYER_CHOOSE: PLAYER_CHOOSE || false, // escolher um jogador na mesa
      REVERSE_WIN_RULE: REVERSE_WIN_RULE || false, //
    };
  } // Fim do construtor

  Functions(cardId, Player) {
    const card = {};

    card.draw = draw;
    card.cardInfo = cardInfo;
    card.applyEffect = applyEffect;
    card.setCardField = setCardField;

    card.cardOptions = cardOptions;

    let options = false;

    // Colocar carta no campo de efeitos
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
      if (cardId.effect.QUICK === true) {
      }

      if (cardId.effect.FIRST === true) {
      }

      // Permite o jogador ativo puchar uma carta
      // TODO: Se a carta puchada for igual a carta jogada: escolher jogar ou manter na mão
      if (cardId.effect.DRAW === true) {
        Player.drawOne();
      }

      // Efeito de descarte
      if (cardId.effect.DESCART.descart >= 1 && Player.hand.length > 0) {
        new SelectionContainer(
          Player.hand,
          // Action
          (selection) => {
            // Comparar o array com as cartas para deletar e a mão depois descartar
            const cards = [];

            selection.forEach((c) => {
              const card = selection.find((element) => element === c);
              const cardIndex = Player.hand.indexOf(card.cardRefId);

              if (card != null) {
                // Criar função no player para descartar cartas
                Player.descart.addCardToDescart(Player.hand.splice(cardIndex, 1));
                Player.updateHand();

                // criar area de descarte
                // DECK --> descarte
              } else {
                console.error("error to descart");
              }
            });
          }
        );
      }

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
      cardRef.style.width = "50px";
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