import MultiplierController from './components/multiplier-controller.js';
import Heart from './components/heart.js';

class GameState {

  constructor(difficulty) {
    this.gameInterval = null;
    this.multiplierController = null;
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
    for (let i = 0; i < 3; i++) {
      this.lives.push(new Heart());
    }
  }

  removeLife() {
    // TODO: Remove heart from array
    // change difficulty?
    // check if game over
    // notify user with animation when 1 heart left?
  }

  addLife() {
    this.lives.push(new Heart());
  }

  addPoints(word) {
    // TODO: Find a nice point system for a better balance
    this.points += (word.length * this.multiplier) + this.multiplierController.counter;
  }

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

  clearUserInput() {
    this.userInput = '';
  }

}

export default GameState;
