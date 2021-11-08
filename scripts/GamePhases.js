function Gamepheses () {
  const phase = {}

  phase.DRAW_PHASE = false;
  phase.WAIT_PHASE = false;
  phase.ACTION_PHASE = false; // set effect and activation, number activation
  phase.END_PHASE = false;

  phase.initGame = initGame;

  function initGame() {
    return true;
  }

  return phase;
}

export default Gamepheses;