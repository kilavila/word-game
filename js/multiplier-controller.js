import _gs from './state.js';

class MultiplierController extends HTMLElement {

  constructor() {
    super();

    this.counter = 0;
    this.multiplier = 1;
  }

  get multiplier() {
    return `<small>x</small>${this._multiplier.toFixed(1)}`;
  }

  connectedCallback() {
    this.render();
  }

  disconnectedCallback() {
  }

  incrementCounter() {
    this.counter++;

    if (this.counter === 20) {
      this.resetCounter();
    }
  }

  resetCounter() {
    this.counter = 0;
  }

  increaseDifficulty() {
  }

  decreaseDifficulty() {
  }

  render() {
  }

}

export default MultiplierController;
