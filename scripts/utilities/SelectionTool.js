// Cria uma representação da carta para que ela possua seleção
class CardRepresentation  {
  constructor (card) {
    this.cardRefId = card;

    this.cardElement;
    this.isMarked;
  }

  init() {
    this.cardElement = document.createElement("img")
    this.isMarked = false;

    this.draw();
  }

  update (){
    if(this.isMarked) {
      this.mark()
    } else{
      this.unmark();
    }
  }

  draw(){
    this.cardElement.src = this.cardRefId.art;
    this.cardElement.style.width = "200px";
    this.cardElement.style.margin = '2px 5px';
  }

  mark () {
    this.cardElement.style.backgroundColor = "red";
    this.cardElement.style.outline = "5px solid red";
    this.cardElement.style.borderRadius = "14px";
  }

  unmark () {
    this.cardElement.style.outline = "0";
    this.cardElement.style.borderRadius = "0";
  }
}

export const SelectionContainer = (placeOfTheCards, count, action) => {

  let selectorCount = count;
  let selections = []
  let complete = false;

  // Elemento container
  const containerEl = document.createElement('div');
  containerEl.classList.add('selection-Tool');

  //cartas para selecionar
  const cards_to_select = document.createElement("div");

  // Estilização
  containerEl.style = `
  color: #123;
  font-size: 14pt;
  display: flex;
  height: 90vh;
  width: 99vw;
  padding: 25px 0;

  position: absolute; left: 50%; top: 50%;
  transform: translate(-50%, -50%);
  flex-direction: column;
  align-items: center;
  justify-content: center;

  border-radius: 5px;
  background-color: #ccc; z-index: 3;
  `;
  //padding: 50px 20px; 
  cards_to_select.style = `
  margin: 10px 0;
  padding: 2px 5px;
  display: flex;
  align-items: center;
  border-radius: 5px;
  background-color: #fff; width: 96%; height: 60%; z-index: 3;
  overflow-x: auto;
  `;

  // preencher 'cards_to_select' com as cartas
  placeOfTheCards.forEach((card) => {
    const newCard = new CardRepresentation( card );
    newCard.init();

    // Somente marcar cartas se o contador estiver maior que 0

    newCard.cardElement.addEventListener("click", (e) => {

      if(!complete){
        newCard.isMarked = !newCard.isMarked;
        newCard.update();
      }

      //Adicionar cartas selecionadas a um array somente se estiver marcada
      if(newCard.isMarked === true && selectorCount >= 1){
        selections.push(newCard);
        --selectorCount;
      }

      // Remover carta do array de seleção caso não esteja marcada
      selections.forEach((card, index) => {
        if(card.isMarked === false){
          selections.splice(index, 1);
          ++selectorCount;
        }
      });
      
      if(selectorCount <= 0) {
        complete = true;
      } else {
        complete = false
      }
      
      if(complete) {
        // Remover o container do HTML quando tudo for escolhido
        document.querySelector('.selection-Tool').remove();
        // ação quando concluido
        action(selections);
      }

    });

    cards_to_select.append(newCard.cardElement);
  });
  
  containerEl.innerText = `Selecione ${selectorCount} ${selectorCount < 1 ? 'CARTA' : 'CARTAS'}`;
  containerEl.insertAdjacentElement("beforeend", cards_to_select);

  document.body.insertAdjacentElement("beforebegin", containerEl);

  return containerEl;

}

function button(sx, sy, innerText) {
  const button = document.createElement('button');
  button.innerText = innerText;
  button.style = `background-color: #339922; color: #eee; width: ${sx}px; height: ${sy}px; z-index: 3; border: none; border-radius: 8px;`;

  return button;
}