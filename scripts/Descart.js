function Descart() {
  const descart = {}

  descart.cards = [];

  descart.makeDescart = makeDescart;
  descart.updateDescart = updateDescart;

  const ev = document.querySelector('#battlefieldEl');

  function makeDescart(){
    // Area principal
    const deckDescart = document.querySelector('.deck-area');
    // Descarte
    const descartEl = document.createElement('div');
    descartEl.classList.add('descartEl');
    
    deckDescart.insertAdjacentElement('beforeend', descartEl);

    // ev = ambiente
    ev.insertAdjacentElement('beforeend', deckDescart);
  }

  function updateDescart() {
    const descartEl = document.querySelector('.descartEl');
  }

  return descart;
}

export default Descart;