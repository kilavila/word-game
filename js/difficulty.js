class DifficultyController {

  time = {
    min: 10,
    max: 60,
  }
  difficulties = {
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

  constructor(difficulty) {
    this.difficulty = difficulty;
  }

  increaseDifficulty() {
    // TODO: Increase difficulty
  }

  decreaseDifficulty() {
    // TODO: Decrease difficulty
  }

}

export default DifficultyController;
