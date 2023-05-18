import Card from "./Card.js";

const CARDS = [
  new Card({
    id: '0',
    art: 'cards/zero.png',
    cardName: 'Equilibrio',
    value: 0,
    description: 0,
    type: 'number',
    isSet: {set: false, turns: 0},
  }),

  new Card({
    id: 'p1',
    art: 'cards/positive_one.png',
    cardName: 'POSITIVO nº1',
    value: 1,
    description: '+1',
    type: 'number',
    isSet: {set: false, turns: 0},

    DRAW: true
  }),

  new Card({
    id: 'p5',
    art: 'cards/positive_five.png',
    cardName: 'POSITIVO nº5',
    value: 5,
    description: '+5',
    type: 'number',
    isSet: {set: false, turns: 0},
  }),

  new Card({
    id: 'p10',
    art: 'cards/positive_ten.png',
    cardName: 'POSITIVO nº10',
    value: 10,
    description: '+10',
    type: 'number',
    isSet: {set: false, turns: 0},
  }),

  new Card({
    id: 'p25',
    art: 'cards/positive_twenty_five.png',
    cardName: 'POSITIVO nº25',
    value: 25,
    description: '+25',
    type: 'number',
    isSet: {set: false, turns: 0},
  }),

  new Card({
    id: 'p50',
    art: 'cards/positive_fifty.png',
    cardName: 'POSITIVO nº50',
    value: 50,
    description: '+50',
    type: 'number',
    isSet: {set: false, turns: 0},
  }),

  new Card({
    id: 'n1',
    art: 'cards/negative_one.png',
    cardName: 'NEGATIVO nº1',
    value: -1,
    description: '-1',
    type: 'number',
    isSet: {set: false, turns: 0},

    DESCART: {descart: 1, target: ''}
  }),

  new Card({
    id: 'n5',
    art: 'cards/negative_five.png',
    cardName: 'NEGATIVO nº5',
    value: -5,
    description: '-5',
    type: 'number',
    isSet: {set: false, turns: 0},
  }),

  new Card({
    id: 'n10',
    art: 'cards/negative_ten.png',
    cardName: 'NEGATIVO nº10',
    value: -10,
    description: '-10',
    type: 'number',
    isSet: {set: false, turns: 0},
  }),

  new Card({
    id: 'n25',
    art: 'cards/negative_twenty_five.png',
    cardName: 'NEGATIVO nº25',
    value: -25,
    description: '-25',
    type: 'number',
    isSet: {set: false, turns: 0},
  }),

  // Effects
  new Card({
    id: '0705v1c0',
    art: 'cards/0705v1c0.png',
    cardName: 'MINIMALISTA',
    value: 0,
    description:
      `• REVELE A SUA MÃO A
      TODOS OS JOGADORES.
      Descarte quantas cartas quiser
      da sua mão, mantendo pelo
      menos 2 cartas. Para cada carta
      descartada desta forma, o
      jogador pode escolher uma das
      seguintes opções:
      [1]: Colocar uma carta da sua
      mão na parte inferior do seu
      deck e, em seguida, puxar uma
      carta do topo do seu deck.
      [2]: Puxar uma carta do topo do
      seu deck.
      [4 ou mais]: Escolher uma carta
      do monte de descarte e
      adicioná-la à sua mão.`,
    type: 'effect',
    isSet: {set: false, turns: 0},
  }),

  new Card({
    id: '0705v1c1',
    art: 'cards/0705v1c1.png',
    cardName: 'VANTAGEM',
    value: 0,
    description:
      `O jogador que ativar
      essa carta poderá
      jogar no seu próprio
      [montante] uma carta
      numeral a mais.`,
    type: 'effect',
    isSet: {set: false, turns: 0},
  }),

  new Card({
    id: '0705v1c2',
    art: 'cards/0705v1c2.png',
    cardName: 'O ÚLTIMO DOS NEGATIVOS',
    value: 0,
    description: 
      `Puxe 2 cartas do topo do
      [baralho]: Se você puxar
      algum [Numeral
      Negativo] de valor [-25]
      mantenha as cartas na
      mão e puxe +1 carta, caso
      não conter um [-25]
      devolva as cartas para o
      [baralho] e embaralhe.`,
    type: 'effect',
    isSet: {set: false, turns: 0},
  }),
  
  new Card({
    id: '0705v1c3',
    art: 'cards/0705v1c3.png',
    cardName: 'REVERSÃO DE FATORES',
    value: 0,
    description: 
      `• MANTER VIRADA PARA
      BAIXO NA [ZONA DE
      EFEITOS] POR PELO
      MENOS UM TURNO.
      EFEITO RÁPIDO: Qualquer
      efeito de adicionar cartas
      para a mão é negado até o
      fim desse turno.`,
    type: 'effect',
    isSet: {set: true, turns: 1},
  }),

  new Card({
    id: '0705v1c4',
    art: 'cards/0705v1c4.png',
    cardName: 'AMPLIFICADOR DE SENTIDOS',
    value: 0,
    description: 
      `Se houver 5 cartas ou mais
      na [zona de descarte].
      Retorne todas as cartas
      descartadas para o
      [baralho] e embaralhe.
      Cada jogador puxa [2]
      cartas do topo do
      [baralho].
      • RETIRE ESSA CARTA
      DO JOGO Após
      RESOLVER ESSE
      EFEITO.`,
    type: 'effect',
    isSet: {set: false, turns: 0},
  }),

  new Card({
    id: '0705v1c5',
    art: 'cards/0705v1c5.png',
    cardName: 'MAU CAMINHO',
    value: 0,
    description: 
      `Selecione um jogador com 3
      cartas ou mais na mão,
      selecione e descarte [2]
      cartas aleatórias da mão do
      jogador escolhido.
      Depois de resolver esse
      efeito mantenha essa carta
      na [zona de efeito].
      Enquanto essa carta estiver
      na [zona de efeito] virado
      para cima, você não poderá
      puxar nenhuma carta do
      [baralho].
      • NO FIM DO TURNO
      DESCARTE ESSA CARTA
      PARA ZONA DE
      DESCARTE.`,
    type: 'effect',
    isSet: {set: false, turns: 0},
  }),

  new Card({
    id: '0705v1c6',
    art: 'cards/0705v1c6.png',
    cardName: 'O ÚLTIMO DOS NEGATIVOS',
    value: 0,
    description: 
      `Você e os outros jogadores
      deverão escolher somente [1]
      carta para permanecer na mão,
      o resto é enviado para a [zona
      de descarte].
      Cada jogador embaralha seu
      próprio [montante] e puxa [1]
      carta. Essa carta será o novo
      [montante] de cada jogador, o
      resto é descartado.
      Adicione a [zona de descarte] no
      [baralho] e embaralhe.
      • RETIRE ESSA CARTA DO
      JOGO Após RESOLVER
      ESSE EFEITO.`,
    type: 'effect',
    isSet: {set: false, turns: 0},
  }),

  new Card({
    id: '0705v1c7',
    art: 'cards/0705v1c7.png',
    cardName: 'O ÚLTIMO DOS NEGATIVOS',
    value: 0,
    description: 
      `• ESTA CARTA DEVE SERA
      PRIMEIRA A SER JOGADA
      NO SEU TURNO PARA
      RESOLVER OS EFEITOS.
      Você não poderá realizar
      nenhum movimento ou jogar
      outras cartas neste turno, passe
      a vez para o próximo jogador
      imediatamente.
      No início da sua próxima fase de
      puxar cartas, o jogador pode
      puxar até [3] cartas em vez de
      uma. Descarte essa carta para a
      [zona de descarte].`,
    type: 'effect',
    isSet: {set: false, turns: 0},
    // Effect to apply
  }),

  new Card({
    id: '0705v1c8',
    art: 'cards/0705v1c8.png',
    cardName: 'TÉCNICA DE DUALIDADE',
    value: 0,
    description: 
      `• DEVE CONTER NO
      MíNlMO [1] CARTA
      NOS MONTANTES DOS
      JOGADORES NA MESA.
      Junte seu [montante] de
      cartas com um dos jogadores
      na mesa, embaralhe e puxe
      uma carta para você e para o
      jogador escolhido, esse será
      o novo [montante], todo o
      resto deverá ser descartado
      para a [zona de descarte].`,
    type: 'effect',
    isSet: {set: false, turns: 0},
  }),

  new Card({
    id: '0705v1c9',
    art: 'cards/0705v1c9.png',
    cardName: 'REI DO FUTURO',
    value: 0,
    description: 
      `• Essa carta precisa
      permanecer virada no campo
      por pelo menos [1] turno e
      os requisitos de ativação
      deverão ser atendidos para a
      ativação dessa carta.
      REQUISITO: seu montante deve
      conter [3] cartas ou mais.
      Descarte as [2] primeiras cartas
      de cima e compre até [3] cartas
      do topo do baralho. Passe a vez
      imediatamente para o próximo
      jogador.`,
    type: 'effect',
    isSet: {set: true, turns: 1},
  }),

]

export default CARDS;