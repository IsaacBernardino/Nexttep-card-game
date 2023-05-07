import { button, SelectionContainer } from './utilities/SelectionTool.js'

function Descart() {
  const descart = {};

  descart.cards = [];

  descart.Init = Init;
  descart.addCardToDescart = addCardToDescart;
  descart.updateDescart = updateDescart;

  const ev = new Environment();

  function Init() {
    // Adicionar evento de click na area de descarte
    ev.places.deck_descart.descart.addEventListener('click', descartInfo);
  }

  function descartInfo () {
    const button = document.createElement('button') 
    button.innerText = 'OK';
    new SelectionContainer(descart.cards, null,  button);
  }

  function addCardToDescart(card) {
    card.forEach((c) => {
      CreateLog(`${c.cardName} to descart`);
      descart.cards.push(c);
    });

    updateDescart();
  }

  function updateDescart() {
    const descartCard = document.createElement("img");
    //descartCard.src = card.art;
    descartCard.style.width = "40px";
    descartCard.style.position = "absolute";

    descart.cards.forEach((c) => {
      descartCard.src = c.art;
      ev.places.deck_descart.descart.appendChild(descartCard)
    });
  }

  return descart;
}

export default Descart;
