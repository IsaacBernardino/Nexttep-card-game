// Cria uma representação da carta para que ela possua seleção
class CardRepresentation {
  constructor(card) {
    this.cardRefId = card;

    this.cardElement;
    this.isMarked;
  }

  init() {
    this.cardElement = document.createElement("img");
    this.isMarked = false;

    this.draw();
  }

  update() {
    if (this.isMarked) {
      this.mark();
    } else {
      this.unmark();
    }
  }

  draw() {
    this.cardElement.src = this.cardRefId.art;
    this.cardElement.style.width = "200px";
    this.cardElement.style.margin = "2px 5px";
  }

  mark() {
    this.cardElement.style.backgroundColor = "red";
    this.cardElement.style.outline = "5px solid red";
    this.cardElement.style.borderRadius = "2px";
  }

  unmark() {
    this.cardElement.style.outline = "0";
    this.cardElement.style.borderRadius = "0";
  }
}

export class SelectionContainer {
  constructor(placeOfTheCards, action, ActionButton) {
    this.placeOfTheCards = placeOfTheCards;
    this.count = 1;
    this.action = action;
    this.ActionButton = ActionButton;

    this.init();
  }

  init() {
    let complete = false;
    let selections = [];

    if (this.ActionButton != null) {
      this.ActionButton.addEventListener("click", () => {
        complete = true;
      });
    }

    const voidDiv = document.createElement("div");
    // Elemento container
    const containerEl = document.createElement("div");
    containerEl.classList.add("selection-Tool");

    containerEl.insertAdjacentElement(
      "afterbegin",
      this.ActionButton != null ? this.ActionButton : voidDiv
    );

    //cartas para selecionar
    const cards_to_select = document.createElement("div");

    // Estilização
    containerEl.style = `
      color: #bcd;
      font-size: 14pt;
      display: flex;
      height: 99vh;
      width: 99vw;
      padding: 25px 0;

      position: absolute; left: 50%; top: 50%;
      transform: translate(-50%, -50%);
      flex-direction: column;
      align-items: center;
      justify-content: center;

      border-radius: 5px;
      background-color: #345; z-index: 3;
      `;
    //padding: 50px 20px;
    cards_to_select.style = `
      margin: 10px 0;
      padding: 2px 5px;
      display: flex;
      align-items: center;
      border-radius: 5px;
      background-color: #567; width: 96%; height: 60%; z-index: 3;
      overflow-x: auto;
    `;

    // preencher 'cards_to_select' com as cartas
    this.placeOfTheCards.forEach((card) => {
      const newCard = new CardRepresentation(card);
      newCard.init();

      // Somente marcar cartas se o contador estiver maior que 0

      newCard.cardElement.addEventListener("click", (e) => {
        if (!complete) {
          newCard.isMarked = !newCard.isMarked;
          newCard.update();
        }

        //Adicionar cartas selecionadas a um array somente se estiver marcada
        if (newCard.isMarked === true && this.count >= 1) {
          selections.push(newCard);
          --this.count;
        }

        // Remover carta do array de seleção caso não esteja marcada
        selections.forEach((card, index) => {
          if (card.isMarked === false) {
            selections.splice(index, 1);
            ++this.count;
          }
        });

        if (this.count <= 0) {
          complete = true;
        } else {
          complete = false;
        }

        // ação quando concluido
        if (complete && this.action != null) this.action(selections);
        
      });

      cards_to_select.append(newCard.cardElement);
    });

    const selectionInterval = setInterval(() => {
      if (complete) {
        // Remover o container do HTML quando tudo for escolhido
        document.querySelector(".selection-Tool").remove();
        complete = false;
        clearInterval(selectionInterval);
      }
      console.log('Esperando seleção')

    }, 1000 / 15);

    //containerEl.innerText = `Selecione 1 CARTA`;
    containerEl.insertAdjacentElement("beforeend", cards_to_select);

    document.body.insertAdjacentElement("beforebegin", containerEl);
  }
}

// cria um elemento botão
export const button = (sx, sy, innerText) => {
  const button = document.createElement("button");
  button.innerText = innerText;
  button.style = `background-color: #339922; color: #eee; width: ${sx}px; height: ${sy}px; z-index: 3; border: none; border-radius: 8px;`;

  return button;
};
