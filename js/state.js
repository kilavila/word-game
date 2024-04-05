import {
  InfoBoxUI,
  GameOverUI,
  Heart1,
  Heart2,
  Heart3,
  PointsCounter,
  WordCounter,
  GameSummaryUI,
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
  selectedDifficulty: Difficulties.hard,
  visibleWords: [],
  completedWords: [],
  completedWordsCount: 0,
  failedWords: [],
  userInput: '',
  lives: 3,
  points: 0,
  multiplierController: 0,
  multiplier: 1,
};

const IncreaseDifficulty = () => {
  GameState.multiplier += 0.5;

  if (GameState.selectedDifficulty.name === 'hard') {
    return;
  }

  if (GameState.selectedDifficulty.name === 'easy') {
    GameState.selectedDifficulty = Difficulties.medium;
  } else if (GameState.selectedDifficulty.name === 'medium') {
    GameState.selectedDifficulty = Difficulties.hard;
  }
}

const DecreaseDifficulty = () => {
  if (GameState.selectedDifficulty.name === 'easy') {
    return;
  }

  GameState.multiplier -= 0.5;

  if (GameState.selectedDifficulty.name === 'medium') {
    GameState.selectedDifficulty = Difficulties.easy;
  } else if (GameState.selectedDifficulty.name === 'hard') {
    GameState.selectedDifficulty = Difficulties.medium;
  }
}

const SetWordCompleted = (word, points, multiplier) => {
  GameState.points += points;
  GameState.completedWordsCount++;
  GameState.multiplierController++;

  if (GameState.multiplierController === 20) {
    GameState.multiplierController = 0;
    IncreaseDifficulty();
  }

  PointsCounter.innerText = GameState.points;
  WordCounter.innerText = GameState.completedWordsCount;

  GameState.completedWords.push({ word, points, multiplier });
}

const SetWordFailed = (word) => {
  GameState.multiplierController++;

  RemoveHeart();
  GameState.failedWords.push(word);
} 

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

const GameSummary = () => {
  GameOverUI.classList.remove('hidden');

  GameState.completedWords.map((item) => {
    let tr = document.createElement('tr');
    tr.classList.add('word-summary-tr');
    tr.innerHTML = `
      <td class="text-left">${item.word}</td>
      <td class="text-right">${item.points}</td>
      <td class="text-right">${item.multiplier}</td>
    `;

    GameSummaryUI.append(tr);
  });
}

const GameOver = () => {
  clearInterval(GameState.gameInterval);
  GameState.visibleWords.map((word) => {
    clearTimeout(word.timer);
    word.self.remove();
  });

  GameSummary();
}

const GameReset = () => {
  GameState.visibleWords = [];
  GameState.userInput = '';
  GameState.lives = 3;

  InfoBoxUI.classList.add('hidden');
  Heart1.classList.add('nf-fa-heart');
  Heart1.classList.remove('nf-md-heart_broken');
  Heart2.classList.add('nf-fa-heart');
  Heart2.classList.remove('nf-md-heart_broken');
  Heart3.classList.add('nf-fa-heart');
  Heart3.classList.remove('nf-md-heart_broken');
}

export default GameState;
export {
  IncreaseDifficulty,
  DecreaseDifficulty,
  SetWordCompleted,
  SetWordFailed,
  RemoveHeart,
  GameOver,
  GameReset,
};
