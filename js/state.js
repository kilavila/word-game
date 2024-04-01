import {
  InfoBox,
  Heart1,
  Heart2,
  Heart3,
} from './constants.js';

const Difficulties = {
  easy: {
    name: 'easy',
    time: 30,
  },
  medium: {
    name: 'medium',
    time: 25,
  },
  hard: {
    name: 'hard',
    time: 20,
  },
}

let GameState = {
  gameInterval: null,
  selectedDifficulty: Difficulties.easy,
  completedWords: [],
  failedWords: [],
  visibleWords: [],
  activeWord: null,
  userInput: '',
  lives: 3,
  points: 0,
};

const RemoveHeart = () => {
  GameState.lives--;

  switch (GameState.lives) {
    case 2:
      Heart3.classList.remove('nf-fa-heart');
      Heart3.classList.add('nf-fa-heart_o');
      break;

    case 1:
      Heart2.classList.remove('nf-fa-heart');
      Heart2.classList.add('nf-fa-heart_o');
      break;

    case 0:
      Heart1.classList.remove('nf-fa-heart');
      Heart1.classList.add('nf-fa-heart_o');
      GameOver();
      break;

    default:
      break;
  }
}

const GameOver = () => {
  clearInterval(GameState.gameInterval);
  GameState.visibleWords.map((word) => {
    word.self.remove();
  });

  GameState.visibleWords = [];
  GameState.userInput = '';
  GameState.activeWord = null;
  GameState.lives = 3;
  InfoBox.classList.remove('hidden');
}

const GameReset = () => {
  InfoBox.classList.add('hidden');
  Heart1.classList.add('nf-fa-heart');
  Heart1.classList.remove('nf-fa-heart_o');
  Heart2.classList.add('nf-fa-heart');
  Heart2.classList.remove('nf-fa-heart_o');
  Heart3.classList.add('nf-fa-heart');
  Heart3.classList.remove('nf-fa-heart_o');
}

export default GameState;
export {
  RemoveHeart,
  GameOver,
  GameReset,
};
