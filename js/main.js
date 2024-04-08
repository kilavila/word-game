import _gs, { GameReset } from './state.js';
import KeysListener from './keys.js';
import { StartButton, Canvas } from './constants.js';
import WordList from './word-list.js';
import WordEntry from './word.js';
import Colors from './color-list.js';
import Multiplier from './multiplier.js';
import MultiplierController from './multiplier-controller.js';

const StartGame = () => {
  GameReset();

  _gs.gameInterval = setInterval(() => {
    // TODO: Make new WordLists for each difficulty..
    // Create new difficulties and additional challenge words
    const randomWord = WordList[Math.floor(Math.random() * WordList.length)];

    const positionLeft = Math.floor(Math.random() * 50) + 25;
    const fontSize = Math.floor(Math.random() * 12) + 24;
    const color = Colors[Math.floor(Math.random() * Colors.length)];

    // FIXME: Create user input for selecting difficulty!
    const difficulty = _gs.currentDifficulty;

    const word = new WordEntry(randomWord, positionLeft, fontSize, color, difficulty);
    Canvas.append(word);
  }, 2500);
}

StartButton.addEventListener('click', () => {
  StartGame();
  KeysListener();
});

customElements.define('word-entry', WordEntry);
customElements.define('game-multiplier', Multiplier);
customElements.define('multiplier-controller', MultiplierController);

// PERFORMANCE: Find a better library for background animations!
particlesJS.load('particles-js', 'assets/particlesjs-config.json', function() {
  console.log('callback - particles.js config loaded');
});
