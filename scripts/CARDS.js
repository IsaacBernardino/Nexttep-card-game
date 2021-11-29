import Card from "./Card.js";

const CARDS = [
  new Card({
    id: '0',
    art: 'cards/0.png',
    cardName: 'Equilibrio',
    value: 0,
    description: 0,
    type: 'number',
    isSet: {set: false, turns: 0},
  }),

  new Card({
    id: 'p1',
    art: 'cards/p1.png',
    cardName: 'POSITIVO nº1',
    value: 1,
    description: '+1',
    type: 'number',
    isSet: {set: false, turns: 0},

    DRAW: true
  }),

  new Card({
    id: 'p5',
    art: 'cards/p5.png',
    cardName: 'POSITIVO nº5',
    value: 5,
    description: '+5',
    type: 'number',
    isSet: {set: false, turns: 0},
  }),

  new Card({
    id: 'p10',
    art: 'cards/p10.png',
    cardName: 'POSITIVO nº10',
    value: 10,
    description: '+10',
    type: 'number',
    isSet: {set: false, turns: 0},
  }),

  new Card({
    id: 'p25',
    art: 'cards/p25.png',
    cardName: 'POSITIVO nº25',
    value: 25,
    description: '+25',
    type: 'number',
    isSet: {set: false, turns: 0},
  }),

  new Card({
    id: 'p50',
    art: 'cards/p50.png',
    cardName: 'POSITIVO nº50',
    value: 50,
    description: '+50',
    type: 'number',
    isSet: {set: false, turns: 0},
  }),

  new Card({
    id: 'n1',
    art: 'cards/n1.png',
    cardName: 'NEGATIVO nº1',
    value: -1,
    description: '-1',
    type: 'number',
    isSet: {set: false, turns: 0},

    DESCART: {descart: 1, target: ''}
  }),

  new Card({
    id: 'n5',
    art: 'cards/n5.png',
    cardName: 'NEGATIVO nº5',
    value: -5,
    description: '-5',
    type: 'number',
    isSet: {set: false, turns: 0},
  }),

  new Card({
    id: 'n10',
    art: 'cards/n10.png',
    cardName: 'NEGATIVO nº10',
    value: -10,
    description: '-10',
    type: 'number',
    isSet: {set: false, turns: 0},
  }),

  new Card({
    id: 'n25',
    art: 'cards/n25.png',
    cardName: 'NEGATIVO nº25',
    value: -25,
    description: '-25',
    type: 'number',
    isSet: {set: false, turns: 0},
  }),

  // Spells
  new Card({
    id: 'ef1',
    art: 'cards/ef1.png',
    cardName: 'REVERSÃO DE FATORES',
    value: 0,
    description: 'VIRE ESSA CARTA COM A FACE PARA BAIXO NA MESA POR PELO MENOS UM TURNO.\n EFEITO RAPIDO: Quando uma carta de efeito for ativado na mesa qualquer outro efeito de puxar cartas é negado até o fim do turno em que essa carta foi ativada.',
    type: 'effect',
    isSet: {set: true, turns: 1},
    
    QUICK: true,
    DENY_DRAW: {deny: true, target: ''}
  }),

  new Card({
    id: 'ef2',
    art: 'cards/ef2.png',
    cardName: 'ULTIMO DOS NEGATIVOS',
    value: 0,
    description: 'Se em 7 turnos depois que essa carta foi jogada qualquer um dos jogadores que obtiver a menor pontuação se o jogo finalizar, será o vencedor.',
    type: 'effect',
    isSet: {set: false, turns: 0},
    
    STAY: 7,
    REVERSE_WIN_RULE: true
  }),

/*
  new Card({id: 'ef3', art: 'cards/ef3.png',cardName: 'MINIMALISTA',value: 0,
    description: 'Revele a sua mão a todos os jogadores.\n Escolha e descarte quantas cartas quanto possível mantendo no mínimo 2 cartas na sua mão, para cada 2 cartas descartadas remova a última carta do montante de um oponente na mesa.',
    type: 'effect',
    isSet: {set: false, turns: 0},
    
    SHOW_HAND: true,
    DESCART: {descart: true, keepCard: 2},
    PLAYER_CHOOSE: {choose: true, target: ''},
    AMOUNT_REMOVE_LAST: {remove: 1, target: ''}
  }),

  new Card({id: 'ef4', art: 'cards/ef4.png', cardName: '', value: 0, description: '', type: 'effect',isSet: {set: false, turns: 0},}),
  */

  new Card({
    id: 'ef5',
    art: 'cards/ef5.png',
    cardName: 'MAU CAMINHO',
    value: 0,
    description: 'Se um dos jogadores estiver com 3 ou mais cartas na mão, selecione um adversário e descarte 2 cartas aleatórias da mão dele, depois disso permaneça com essa carta na mesa. \n Enquanto essa carta estiver na mesa você não poderá puxar nenhuma carta do baralho. \n Na sua próxima fase de sacar, ao envés de puxar carta descarte essa carta para a zona de descarte.',

    type: 'effect',
    isSet: {set: false, turns: 0},

    PLAYER_CHOOSE: {player: ''},
    STAY: 1,
    DENY_DRAW: {deny: true, target: ''}
  }),

  new Card({
    id: 'ef6',
    art: 'cards/ef6.png',

    type: 'effect',
    isSet: {set: false, turns: 0},
  }),

  new Card({
    id: 'ef7',
    art: 'cards/ef7.png',

    type: 'effect',
    isSet: {set: false, turns: 0},
  }),

  new Card({
    id: 'ef8',
    art: 'cards/ef8.png',

    type: 'effect',
    isSet: {set: false, turns: 0},
  }),

  new Card({
    id: 'ef9',
    art: 'cards/ef9.png',

    type: 'effect',
    isSet: {set: false, turns: 0},
  }),

  new Card({
    id: 'ef10',
    art: 'cards/ef10.png',

    type: 'effect',
    isSet: {set: false, turns: 0},
  }),
]

export default CARDS;