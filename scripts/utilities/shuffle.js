function shuffle(arr) {
    //console.log(`SHUFFLE > Shuffling |${arr.cards.length}| cards...`);
    let currentIndex = arr.length,  randomIndex;
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    // And swap it with the current element.
    [arr[currentIndex], arr[randomIndex]] =
    [arr[randomIndex], arr[currentIndex]];
  }
}