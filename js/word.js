import _gs, { SetWordFailed } from './state.js';

class WordEntry extends HTMLElement {

  constructor(word, positionLeft, fontSize, color, difficulty) {
    self = super();

    this.completed = false;
    this.timer = null;
    this.word = word;
    this.positionLeft = positionLeft;
    this.fontSize = fontSize;
    this.color = color;
    this.difficulty = difficulty;
  }

  connectedCallback() {
    this.render();
    this.counter();
  }

  disconnectedCallback() {
    this.completed = true;
    clearTimeout(this.timer);
  }

  render() {
    this.setAttribute('class', `word ${this.color} ${this.difficulty.name}`);
    this.style.left = `${this.positionLeft}%`;
    this.style.fontSize = `${this.fontSize}px`;
    this.innerHTML = `${this.word}`;
  }

  counter() {
    this.timer = setTimeout(() => {
      if (!this.completed) {
        SetWordFailed(self.word);
      }

      self.remove()
    }, 1000 * this.difficulty.time);

    _gs.visibleWords.push({ self, timer: this.timer });
  }

}

export default WordEntry;
