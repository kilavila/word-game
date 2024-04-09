import _gs from '/js/main.js';

class Word extends HTMLElement {

  constructor(word, positionLeft, fontSize, color, difficulty) {
    super();

    this.completed = false;
    this.timer = null;
    this.word = word;
    this.positionLeft = positionLeft;
    this.fontSize = fontSize;
    this.color = color;
    this.difficulty = difficulty;
    // TODO: Add types for different word types(e.g. normal, heart, multiplier, challenge, clear screen etc)? or new class?
    // this.type = type;
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
        _gs.wordFailed(self.word);
      }

      this.remove()
    }, 1000 * this.difficulty.time);

    _gs.visibleWords.push({ element: this, timer: this.timer });
  }

}

export default Word;
