import { PersonalBestUI } from './static/constants.js';

// NOTE: Add new classes for highlighting new records?
const RenderPersonalBest = (PB) => {
  PersonalBestUI.innerHTML = `
    <h2>Personal Best</h2>
    <ul>
      <li>
        <span class="best-label">Total points:</span>
        <span class="best-value">${PB.points}</span>
      </li>
      <li>
        <span class="best-label">Completed words:</span>
        <span class="best-value">${PB.words}</span>
      </li>
      <li>
        <span class="best-label">Highest multiplier:</span>
        <span class="best-value">x${PB.multiplier.toFixed(1)}</span>
      </li>
      <hr>
      <li>
        <span class="best-label">Best word:</span>
        <span class="best-value">${PB.bestWord.word}</span>
      </li>
      <li>
        <span class="best-label">Best word points:</span>
        <span class="best-value">${PB.bestWord.points}</span>
      </li>
      <li>
        <span class="best-label">Best word multiplier:</span>
        <span class="best-value">x${PB.bestWord.multiplier.toFixed(1)}</span>
      </li>
    </ul>
  `;
}

const GetPersonalBest = () => {
  let PB = localStorage.getItem('word_game_pb');

  if (PB) {
    PB = JSON.parse(PB);
    return PB;
  } else {
    return false;
  }
}

const SetPersonalBest = (PB) => {
  localStorage.setItem('word_game_pb', JSON.stringify(PB));
}

const Comp = (lastGame, PB) => lastGame > PB ? lastGame : PB;

const ComparePersonalBest = (lastGame, PB) => {
  return {
    points: Comp(lastGame.points, PB.points),
    words: Comp(lastGame.words, PB.words),
    multiplier: Comp(lastGame.multiplier, PB.multiplier),
    bestWord: {
      word: lastGame.bestWord.points > PB.bestWord.points ? lastGame.bestWord.word : PB.bestWord.word,
      points: lastGame.bestWord.points > PB.bestWord.points ? lastGame.bestWord.points : PB.bestWord.points,
      multiplier: lastGame.bestWord.points > PB.bestWord.points ? lastGame.bestWord.multiplier : PB.bestWord.multiplier,
    },
  };
}

const GetLastGame = (lastGame) => {
  let lastGameMultiplier = lastGame.wordlist.sort((a, b) => b.multiplier - a.multiplier)[0].multiplier;
  let lastGameBestWord = lastGame.wordlist.sort((a, b) => b.points - a.points)[0];

  return {
    points: lastGame.points,
    words: lastGame.wordlist.length,
    multiplier: lastGameMultiplier,
    bestWord: {
      word: lastGameBestWord.word,
      points: lastGameBestWord.points,
      multiplier: lastGameBestWord.multiplier,
    },
  };
}

const CheckPersonalBest = (lastGame) => {
  let PB = GetPersonalBest();
  let lastGamePB = lastGame ? GetLastGame(lastGame) : false;

  if (PB && !lastGamePB) {
    RenderPersonalBest(PB);
  }

  if (lastGamePB && !PB) {
    SetPersonalBest(lastGamePB);
    RenderPersonalBest(lastGamePB);
  }

  if (lastGamePB && PB) {
    let newPB = ComparePersonalBest(lastGamePB, PB);
    SetPersonalBest(newPB);
    RenderPersonalBest(newPB);
  }
}

export default CheckPersonalBest;
