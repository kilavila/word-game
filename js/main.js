import _gs from './state.js';
import KeysListener from './keys.js';
import { StartButton, InfoBox } from './constants.js';
import WordList from './word-list.js';
import NewWord from './word.js';

const StartGame = () => {
  InfoBox.classList.add('hidden');

  _gs.gameInterval = setInterval(() => {
    const randomWord = WordList[Math.floor(Math.random() * WordList.length)];
    NewWord(randomWord);
  }, 1500);
}

StartButton.addEventListener('click', () => {
  StartGame();
});

KeysListener();
