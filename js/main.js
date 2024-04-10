import GameState from './state.js';
import KeysListener from './keys.js';
import { StartButton, Canvas, Popups } from './static/constants.js';
import WordList from './static/word-list.js';
import Word from './components/word.js';
import Colors from './static/color-list.js';
import Multiplier from './components/multiplier.js';
import MultiplierController from './components/multiplier-controller.js';
import Heart from './components/heart.js';

let _gs;

// TODO: Add music
const StartGame = () => {
  const difficulty = _gs.currentDifficulty;

  _gs = new GameState(difficulty);
  
  _gs.multiplierController = new MultiplierController();
  Popups.append(_gs.multiplierController);

  // FIX: Move interval to game state class!
  _gs.gameInterval = setInterval(() => {
    // TODO: Make new WordLists for each difficulty..
    // Create new difficulties and additional challenge words
    const randomWord = WordList[Math.floor(Math.random() * WordList.length)];

    // TODO: Move to new function!
    const positionLeft = Math.floor(Math.random() * 50) + 25;
    const fontSize = Math.floor(Math.random() * 12) + 24;
    const color = Colors[Math.floor(Math.random() * Colors.length)];

    // TODO: Create user input for selecting difficulty!

    const word = new Word(randomWord, positionLeft, fontSize, color, difficulty);
    Canvas.append(word);
  }, 2500);
}

StartButton.addEventListener('click', () => {
  StartGame();
  KeysListener();
});

customElements.define('word-entry', Word);
customElements.define('game-multiplier', Multiplier);
customElements.define('multiplier-controller', MultiplierController);
customElements.define('game-heart', Heart);

// FIX: Find a better library for background animations!
// particlesJS.load('particles-js', 'assets/particlesjs-config.json', function() {
//   console.log('callback - particles.js config loaded');
// });

export default _gs;
