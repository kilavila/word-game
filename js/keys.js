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
      _gs.visibleWords.map(word => {
        if (!word.completed) {
          if (word.self.word === _gs.userInput) {
            WordCompleted(word);
          }
        }
      });
    } else if (event.key === 'Backspace') {
      RemoveChar();
    } else {
      AddChar(event.key);
    }
  });
}

const RemoveChar = () => {
  _gs.userInput = _gs.userInput.slice(0, -1);
  InputUI.innerText = _gs.userInput;

  CheckWords();
}

const AddChar = (key) => {
  _gs.userInput += key;
  InputUI.innerText = _gs.userInput;

  CheckWords();
}

const CheckWords = () => {
  _gs.visibleWords.map(word => {
    if (!word.completed) {
      word.self.word.startsWith(_gs.userInput) && _gs.userInput.length > 0
        ? word.self.classList.add('active')
        : word.self.classList.remove('active');
    }
  });
}

const WordCompleted = (word) => {
  let activeWordPoints = word.self.word.length;
  _gs.points += activeWordPoints;
  PointsCounter.innerText = _gs.points;

  let pointsDiv = document.createElement('div');
  pointsDiv.classList.add('points');
  pointsDiv.innerText = `+ ${activeWordPoints}`;

  word.self.classList.add('correct');
  word.self.appendChild(pointsDiv);

  _gs.completedWords.push(word.self.word);
  word.self.completed = true;
  clearTimeout(word.timer);
  setTimeout(() => word.self.remove(), 750);

  _gs.visibleWords = _gs.visibleWords.filter(w => w.self !== word.self);

  _gs.userInput = '';
  InputUI.innerText = '';
}

export default KeysListener;
