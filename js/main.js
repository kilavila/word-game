import _gs, { GameReset } from './state.js';
import KeysListener from './keys.js';
import { StartButton, Canvas } from './constants.js';
import WordList from './word-list.js';
import WordEntry from './word.js';
import Colors from './color-list.js';
import Multiplier from './multiplier.js';

const StartGame = () => {
  GameReset();

  _gs.gameInterval = setInterval(() => {
    const randomWord = WordList[Math.floor(Math.random() * WordList.length)];

    const positionLeft = Math.floor(Math.random() * 50) + 25;
    const fontSize = Math.floor(Math.random() * 12) + 24;
    const color = Colors[Math.floor(Math.random() * Colors.length)];
    const difficulty = _gs.selectedDifficulty;

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

particlesJS.load('particles-js', 'assets/particlesjs-config.json', function() {
  console.log('callback - particles.js config loaded');
});
