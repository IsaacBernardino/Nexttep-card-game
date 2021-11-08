class Card {
  constructor({id, art, cardName, value, description, type, isSet, FIRST, SKIP, STAY, DENY_DRAW, DRAW, DESCART, DESCART_VERIFY, SHOW_HAND, HAND_VERIFY, AMOUNT_VERIFY, AMOUNT_SHUFFLE, AMOUNT_REMOVE_LAST, AMOUNT_REMOVE_FIRST, QUICK, PLAYER_CHOOSE, BANISH, REVERSE_WIN_RULE} ){
    this.id = id;
    this.art = art;
    this.verse = 'cards/verso.png';
    this.cardName = cardName;
    this.value = value || 0;
    this.description = description || '';
    this.type = type;

    this.isSet = isSet;

    this.faceUp = false;

    this.effect = {
      FIRST: FIRST || false, // primeira carta a ser jogada
      SKIP: SKIP || false, //  Passa para a end phase
      STAY: STAY || false, // Se mantem em campo por x turnos
      DENY_DRAW: DENY_DRAW || false, // passa a fase de sacar carta
      DRAW: DRAW || false, // puxa x cartas
      DESCART: DESCART || false, // descarta x cartas da mão
      SHOW_HAND: SHOW_HAND || false, // mostra as cartas na mão
      HAND_VERIFY: HAND_VERIFY || false, // Verifica se na mão tem x quantidade de cartas

      AMOUNT_VERIFY: AMOUNT_VERIFY || false,// Verifica se o montate tem x quantidade de cartas
      AMOUNT_SHUFFLE: AMOUNT_SHUFFLE || false,// Mistura os montates no campo e embaralha e puxa x quantidades de cartas para formar um novo motante
      AMOUNT_REMOVE_LAST: AMOUNT_REMOVE_LAST || false, // remove carta do topo do montante
      AMOUNT_REMOVE_FIRST: AMOUNT_REMOVE_FIRST || false, // remove carta do fundo do montante

      DESCART_VERIFY: DESCART_VERIFY || false, // Verificar por X cartas no descarte

      BANISH: BANISH || false, // Retirar a carta do jogo
      
      QUICK: QUICK || false, // carta de efeito rapido
      PLAYER_CHOOSE: PLAYER_CHOOSE || false, // escolher um jogador na mesa
      REVERSE_WIN_RULE: REVERSE_WIN_RULE || false //
    }
  }
}

export default Card;