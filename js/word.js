import _gs, { RemoveHeart } from './state.js';

class Word extends HTMLElement {

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
        _gs.failedWords.push(self.word);
        RemoveHeart();
      }
      self.remove()
    }, 1000 * this.difficulty.time);

    _gs.visibleWords.push({ self, timer: this.timer });
  }

}

export default Word;
