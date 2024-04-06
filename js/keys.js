import _gs, { ChangeMultiplier, SetWordCompleted } from './state.js';
import {
  Canvas,
  InputUI,
} from './constants.js';

const KeysListener = () => {

  Canvas.addEventListener('keydown', (event) => {
    event.preventDefault();

    console.log(event);

    let Key = event.key;
    let ControlPressed = event.ctrlKey;

    if (Key === 'Enter' || Key === ' ') {
      let correctWordsCounter = 0;

      _gs.visibleWords.map(word => {
        if (!word.completed) {
          if (word.self.word === _gs.userInput) {
            correctWordsCounter++;
            WordCompleted(word);
          }
        }
      });

      if (correctWordsCounter === 0) {
        ChangeMultiplier(false);
      }
    } else if (Key === 'Backspace') {
      ControlPressed ? ClearInput() : RemoveChar();
    } else {
      if (Key.length === 1) {
        AddChar(Key);
      }
    }
  });
}

const RemoveChar = () => {
  _gs.userInput = _gs.userInput.slice(0, -1);
  InputUI.innerText = _gs.userInput;

  CheckWords();
}

const ClearInput = () => {
  _gs.userInput = '';
  InputUI.innerText = '';
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
  let activeWordPoints = word.self.word.length * _gs.multiplier;

  SetWordCompleted(word.self.word, activeWordPoints, _gs.multiplier);

  let pointsDiv = document.createElement('div');
  pointsDiv.classList.add('points');
  pointsDiv.innerText = `+ ${activeWordPoints}`;

  word.self.classList.add('correct');
  word.self.appendChild(pointsDiv);

  word.self.completed = true;
  clearTimeout(word.timer);
  setTimeout(() => word.self.remove(), 750);

  _gs.visibleWords = _gs.visibleWords.filter(w => w.self !== word.self);

  ClearInput();
}

export default KeysListener;
