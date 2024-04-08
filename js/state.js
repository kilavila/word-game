class GameState {

  constructor(difficulty) {
    this.gameInterval = null;
    this.multiplierController = null;
    this.difficulty = difficulty;
    this.visibleWords = [];
    this.completedWords = [];
    this.failedWords = [];
    this.lives = 3;
    this.points = 0;
    this.completedWordsCount = 0;
    this.userInput = '';
  }

  removeLife() {
  }

  addLife() {
  }

  addPoints(word) {
    this.points += (word.length * this.multiplier) + this.multiplierController.counter;
  }

  wordCompleted(word) {
    this.addPoints(word);
    this.multiplierController.incrementCounter();

    this.completedWordsCount++;
    this.completedWords.push(word);
  }

  wordFailed(word) {
    this.multiplierController.decreaseDifficulty();
    this.failedWords.push(word);
  }

  clearUserInput() {
    this.userInput = '';
  }

}

export default GameState;
