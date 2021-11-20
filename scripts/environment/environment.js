// PLAYER ENVIRONMENT
function environment(){
  places = {}

  places.opponentPlaces = {}

  places.battlefieldEl = document.querySelector('#battlefieldEl');
  // Area principal
  const playerField = document.createElement('div');
  playerField.classList.add('playerField');

  // container onde fica as cartas a mão
  const handEl = document.createElement('div');
  handEl.classList.add('handEl');

  // Container principal do campo
  const fieldEl = document.createElement('div');
  fieldEl.classList.add('fieldEl');
  // Area do montante
  const amountEl = document.createElement('div');
  amountEl.classList.add('amountEl');
  // Area de efeitos
  const spellsEl = document.createElement('div');
  spellsEl.classList.add('spellsEl');

  fieldEl.insertAdjacentElement('beforeend', amountEl);
  fieldEl.insertAdjacentElement('beforeend', spellsEl);

  playerField.insertAdjacentElement('beforeend', fieldEl);
  playerField.insertAdjacentElement('beforeend', handEl);

  // retornando os elementos criados
  places.battlefield = playerField;

  battlefieldEl.insertAdjacentElement('beforeend', playerField);

  places.fieldEl   = fieldEl;
  places.amountEl  = amountEl;
  places.spellsEl  = spellsEl;
  places.handEl    = handEl;

  // elementos do campo do inimigo
  places.opponentPlaces.fieldEl   = document.querySelector('#opponentField');
  places.opponentPlaces.amountEl  = document.querySelector('#opponent_amountEl');
  places.opponentPlaces.spellsEl  = document.querySelector('#opponent_spellsEl');
  places.opponentPlaces.handEl  = document.querySelector('#opponent_handEl');

  return places;
}