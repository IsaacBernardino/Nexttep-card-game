import { button, SelectionContainer } from './utilities/SelectionTool.js'

function Descart() {
  const descart = {};

  descart.cards = [];

  descart.Init = Init;
  descart.addCardToDescart = addCardToDescart;
  descart.updateDescart = updateDescart;

  const ev = document.querySelector("#battlefieldEl");

  function Init() {
    // Area principal
    const deckDescart = document.querySelector(".deck-area");
    // Descarte
    const descartEl = document.createElement("div");
    descartEl.classList.add("descartEl");

    descartEl.addEventListener('click', descartInfo);

    deckDescart.insertAdjacentElement("beforeend", descartEl);

    // ev = ambiente
    ev.insertAdjacentElement("beforeend", deckDescart);
  }

  function descartInfo () {
    const btn = document.createElement('button') 
    btn.innerText = 'OK';
    new SelectionContainer(descart.cards, null,  btn);
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

    const el = document.querySelector(".descartEl");

    descart.cards.forEach((c) => {
      descartCard.src = c.art;
      el.appendChild(descartCard)
    });
  }

  return descart;
}

export default Descart;
