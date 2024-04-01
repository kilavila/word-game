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
  userInput: '',
  lives: 3,
  points: 0,
  multiplier: 1,
};

const RemoveHeart = () => {
  GameState.lives--;

  switch (GameState.lives) {
    case 2:
      Heart3.classList.remove('nf-fa-heart');
      Heart3.classList.add('nf-md-heart_broken');
      break;

    case 1:
      Heart2.classList.remove('nf-fa-heart');
      Heart2.classList.add('nf-md-heart_broken');
      break;

    case 0:
      Heart1.classList.remove('nf-fa-heart');
      Heart1.classList.add('nf-md-heart_broken');
      GameOver();
      break;

    default:
      break;
  }
}

const GameOver = () => {
  clearInterval(GameState.gameInterval);
  GameState.visibleWords.map((word) => {
    clearTimeout(word.timer);
    word.self.remove();
  });

  InfoBox.classList.remove('hidden');
}

const GameReset = () => {
  GameState.visibleWords = [];
  GameState.userInput = '';
  GameState.lives = 3;

  InfoBox.classList.add('hidden');
  Heart1.classList.add('nf-fa-heart');
  Heart1.classList.remove('nf-md-heart_broken');
  Heart2.classList.add('nf-fa-heart');
  Heart2.classList.remove('nf-md-heart_broken');
  Heart3.classList.add('nf-fa-heart');
  Heart3.classList.remove('nf-md-heart_broken');
}

export default GameState;
export {
  RemoveHeart,
  GameOver,
  GameReset,
};
