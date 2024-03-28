import _gs, { RemoveHeart } from './state.js';
import { Canvas } from './constants.js';
import Colors from './color-list.js';

const Countdown = {
  easy: 24,
  medium: 22,
  hard: 20,
}

const NewWord = (word) => {
  const posLeft = Math.floor(Math.random() * 80) + 10;
  const fontSize = Math.floor(Math.random() * 32) + 24;
  const color = Colors[Math.floor(Math.random() * Colors.length)];
  const difficulty = _gs.difficulties[Math.floor(Math.random() * _gs.difficulties.length)];

  const div = document.createElement('div');

  div.classList.add('word', difficulty);
  div.style.left = `${posLeft}%`;
  div.style.fontSize = `${fontSize}px`;
  div.style.color = `var(--ctp-${color})`;
  div.style.textShadow = `0 0 12px var(--ctp-${color})`;
  div.textContent = word;
  Canvas.appendChild(div);

  let time = difficulty === 'easy'
    ? Countdown.easy
    : difficulty === 'medium'
      ? Countdown.medium
      : Countdown.hard;

  let timer = setTimeout(() => {
    let word = _gs.visibleWords.find((w) => w.div === div);
    let wordIndex = _gs.visibleWords.indexOf(word);
    _gs.visibleWords.splice(wordIndex, 1);

    _gs.activeWord = _gs.visibleWords.find((w) => w.div !== div && div.innerText.startsWith(_gs.userInput));
    if (!_gs.activeWord) _gs.activeWord = null;

    word.div.remove();
    _gs.failedWords.push(div.innerText);

    RemoveHeart();
  }, time * 1000);

  _gs.visibleWords.push({ div, timer });
}

export default NewWord;
