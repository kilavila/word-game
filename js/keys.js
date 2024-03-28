import _gs from './state.js';
import {
  Canvas,
  InputUI,
  PointsCounter,
} from './constants.js';

const KeysListener = () => {
  Canvas.addEventListener('keydown', (event) => {
    event.preventDefault();

    if (event.key === 'Enter' || event.key === ' ') {
      ClearInput();
    } else if (event.key === 'Backspace') {
      RemoveChar();
    } else {
      ActiveWordCheck(event.key);

      if (_gs.activeWord) {
        InputCheck(event.key);
        if (_gs.activeWord.div.innerText === _gs.userInput) WordCompleted();
      }
    }
  });
}

const ClearInput = () => {
  _gs.userInput = '';
  InputUI.innerText = '';
  InputUI.classList.remove('correct');
  InputUI.classList.remove('wrong');
  if (_gs.activeWord) {
    _gs.activeWord.div.classList.remove('active');
    _gs.activeWord = null;
  }
}

const RemoveChar = () => {
  _gs.userInput = _gs.userInput.slice(0, -1);
  InputUI.innerText = _gs.userInput;

  if (_gs.activeWord && _gs.activeWord.div.innerText.startsWith(_gs.userInput)) {
    InputUI.classList.remove('wrong');
    InputUI.classList.add('correct');
  } else {
    InputUI.classList.remove('correct');
    InputUI.classList.add('wrong');
  }

  if (_gs.activeWord && _gs.userInput === '') {
    _gs.activeWord.div.classList.remove('active');
    _gs.activeWord = null;
  }
}

const ActiveWordCheck = (key) => {
  if (!_gs.activeWord) {
    _gs.activeWord = _gs.visibleWords.find(word => word.div.innerText.startsWith(key));

    if (_gs.activeWord) {
      _gs.activeWord.div.classList.add('active');
    }
  }
}

const InputCheck = (key) => {
  if (key.length == 1) {
    _gs.userInput += key;
    InputUI.innerText = _gs.userInput;
  }

  if (_gs.activeWord.div.innerText.startsWith(_gs.userInput)) {
    InputUI.classList.remove('wrong');
    InputUI.classList.add('correct');
  } else {
    InputUI.classList.remove('correct');
    InputUI.classList.add('wrong');
  }
}

const WordCompleted = () => {
  let activeWordPoints = _gs.activeWord.div.innerText.length;
  _gs.points += activeWordPoints;
  PointsCounter.innerText = _gs.points;

  let pointsDiv = document.createElement('div');
  pointsDiv.classList.add('points');
  pointsDiv.innerText = `+ ${activeWordPoints}`;

  _gs.activeWord.div.appendChild(pointsDiv);
  _gs.activeWord.div.classList.add('correct');

  _gs.completedWords.push(_gs.activeWord.div.innerText);
  let index = _gs.visibleWords.indexOf(_gs.activeWord);
  _gs.visibleWords.splice(index, 1);

  clearTimeout(_gs.activeWord.timer);
  let previousWord = _gs.activeWord;
  setTimeout(() => previousWord.div.remove(), 1100);

  _gs.activeWord = null;
  _gs.userInput = '';
  InputUI.innerText = '';
}

export default KeysListener;
