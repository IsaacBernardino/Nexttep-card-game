class Environment {
  constructor () {
    this.places = {
      battlefield: document.querySelector('.battlefield'),
      playerField: {
        amountZone: document.querySelector('#playerAmount'),
        effectZone: document.querySelector('#playerEffectZone'),
        playerHandCards: document.querySelector('.playerHandZone')
      },
      enemyField: {
        amountZone: document.querySelector('#enemyAmount'),
        effectZone: document.querySelector('#enemyEffectZone'),
        enemyHandCards: document.querySelector('#enemyCards')
      },
      deck_descart: {
        deck: document.querySelector('#deck'),
        descart: document.querySelector('#descart')
      }
    }
  }
}