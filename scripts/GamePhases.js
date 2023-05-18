class GamePhases {
  contructor() {
  
    this.DRAW_PHASE = false;
    this.EFFECT_ACT = false;
    this.NUMBER_ACT = false; // set effect and activation, number activation
    this.END_PHASE = false;
  
    this.initGame = initGame;
  }

  initGame() {
    return true;
  }
}

export default GamePhases;