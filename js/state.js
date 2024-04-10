import MultiplierController from './components/multiplier-controller.js';
import Heart from './components/heart.js';

// TODO: Create key listener class

class GameState {

  constructor(difficulty) {
    this.gameInterval = null;
    this.multiplierController = null;
    // NOTE: Create new difficulty controller?
    this.difficulty = difficulty;
    this.visibleWords = [];
    this.completedWords = [];
    this.failedWords = [];
    this.lives = [];
    this.points = 0;
    this.completedWordsCount = 0;
    this.userInput = '';
  }

  start() {
    // TODO: Add lives, init interval etc
    // run interval generating random words based on difficulty
    for (let i = 0; i < 3; i++) {
      this.lives.push(new Heart());
    }
  }

  gameOver() {
    // TODO: Reset game state

    clearInterval(this.gameInterval);
  }

  removeLife() {
    // TODO: Remove heart from array
    // change difficulty?
    // check if game over
    // notify user with animation when 1 heart left?

    let life = this.lives.pop();
    if (life) {
      life.remove();
    }

    if (this.lives.length === 1) {
      // TODO: Add animation for 1 heart left
    } else if (this.lives.length === 0) {
      this.gameOver();
    }
  }

  addLife() {
    this.lives.push(new Heart());
  }

  addPoints(word) {
    // TODO: Find a better point system
    this.points += (word.length * this.multiplier) + this.multiplierController.counter;
  }

  // TODO: Create new word controller file
  wordCompleted(word) {
    // FIX: Move functinality from keys.js to here!
    this.addPoints(word);
    this.multiplierController.incrementCounter();

    this.completedWordsCount++;
    this.completedWords.push(word);
  }

  wordFailed(word) {
    this.multiplierController.decreaseDifficulty();
    this.failedWords.push(word);
  }

  // TODO: Create new user input controller file
  wrongUserInput() {
    this.multiplierController.resetCounter();
  }

  clearUserInput() {
    // TODO: Clear user input in UI
    this.userInput = '';
  }

}

export default GameState;
