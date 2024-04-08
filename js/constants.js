const DictionaryAPI = 'https://api.dictionaryapi.dev/api/v2/entries/en'; // => /<word>

const Canvas = document.querySelector("body");
const InfoBoxUI = document.querySelector(".info");
const GameOverUI = document.querySelector(".game-over");
const GameSummaryUI = document.querySelector(".word-summary");
const GameSummaryPoints = document.querySelector(".final-score");
const GameSummaryWords = document.querySelector(".final-words-count");
const PersonalBestUI = document.querySelector(".personal-best");
const StartButton = document.querySelector(".start-btn");
const Popups = document.querySelector('.popups');
const Heart1 = document.querySelector(".life-1");
const Heart2 = document.querySelector(".life-2");
const Heart3 = document.querySelector(".life-3");
const InputUI = document.querySelector(".user-input");
const PointsCounter = document.querySelector(".points-count");
const WordCounter = document.querySelector(".completed-words-count");
const MultiplierProgress = document.querySelector(".progress-text-left");
const MultiplierProgressBar = document.querySelector(".progress-bar-inner");
const CurrentMultiplier = document.querySelector(".current-multiplier");

export {
  DictionaryAPI,

  Canvas,
  InfoBoxUI,
  GameOverUI,
  GameSummaryUI,
  GameSummaryPoints,
  GameSummaryWords,
  PersonalBestUI,
  StartButton,
  Popups,
  Heart1,
  Heart2,
  Heart3,
  InputUI,
  PointsCounter,
  WordCounter,
  MultiplierProgress,
  MultiplierProgressBar,
  CurrentMultiplier,
};
