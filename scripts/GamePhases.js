class GamePhases {
  contructor() {
  
    this.DRAW_PHASE = false;
    this.WAIT_PHASE = false;
    this.ACTION_PHASE = false; // set effect and activation, number activation
    this.END_PHASE = false;
  
    this.initGame = initGame;

  }

  initGame() {
    return true;
  }
}

export default GamePhases;