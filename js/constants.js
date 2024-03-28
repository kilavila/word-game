const DictionaryAPI = 'https://api.dictionaryapi.dev/api/v2/entries/en'; // => /<word>

const Canvas = document.querySelector("body");
const InfoBox = document.querySelector(".info");
const StartButton = document.querySelector(".start-btn");
const Heart1 = document.querySelector(".life-1");
const Heart2 = document.querySelector(".life-2");
const Heart3 = document.querySelector(".life-3");
const InputUI = document.querySelector(".user-input");
const PointsCounter = document.querySelector(".points-count");

export {
  DictionaryAPI,

  Canvas,
  InfoBox,
  StartButton,
  Heart1,
  Heart2,
  Heart3,
  InputUI,
  PointsCounter,
};
