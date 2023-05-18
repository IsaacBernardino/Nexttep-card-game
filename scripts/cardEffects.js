class CardEffect {
  constructor(card) {
    this.effect = {
      FIRST:  true, // primeira carta a ser jogada
      SKIP: true, //  Passa para a end phase
      STAY: true, // Se mantem em campo por x turnos
      DENY_DRAW:true, // passa a fase de sacar carta
      DRAW:  true, // puxa x cartas
      DESCART: true, // descarta x cartas da mão
      SHOW_HAND: true, // mostra as cartas na mão
      HAND_VERIFY: true, // Verifica se na mão tem x quantidade de cartas

      AMOUNT_VERIFY: true, // Verifica se o montate tem x quantidade de cartas
      AMOUNT_SHUFFLE: true, // Mistura os montates no campo e embaralha e puxa x quantidades de cartas para formar um novo motante
      AMOUNT_REMOVE_LAST: true, // remove carta do topo do montante
      AMOUNT_REMOVE_FIRST: true, // remove carta do fundo do montante

      DESCART_VERIFY: true, // Verificar por X cartas no descarte

      BANISH: true, // Retirar a carta do jogo

      QUICK: true, // carta de efeito rapido
      PLAYER_CHOOSE: true, // escolher um jogador na mesa
      REVERSE_WIN_RULE: true, // Ganha quem fizer menos pontos
    }
  }

  apply(effect, target) {
    if(PLAYER_CHOOSE == true) {

    }
  }
}

export default CardEffect;