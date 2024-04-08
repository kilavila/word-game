class MultiplierController extends HTMLElement {

  constructor() {
    super();

    this.counter = 0;
    this.counterMax = 20;
    this.multiplier = 1;
  }

  get currentMultiplier() {
    return this.multiplier;
  }

  get nextMultiplier() {
    return this.counterMax * this.multiplier;
  }

  get progress() {
    return (100 / this.nextMultiplier) * this.counter;
  }

  connectedCallback() {
    this.render();
  }

  disconnectedCallback() {
    // TODO: Reset multiplier on disconnect
  }

  incrementCounter() {
    this.counter++;

    if (this.counter >= this.nextMultiplier) {
      this.increaseDifficulty();
      this.resetCounter();
    }
  }

  resetCounter() {
    this.counter = 0;
  }

  increaseDifficulty() {
    this.multiplier += 0.5;
    // TODO: Set up new difficulty logic!
  }

  decreaseDifficulty() {
    this.multiplier -= 0.5;
    this.resetCounter();
    // TODO: Set up new difficulty logic!
  }

  render() {
    this.innerHTML = `
      <div class="progress">
        <div class="progress-value">
          <span class="progress-text-left">${this.counter}</span> / <span class="progress-text-right">${this.nextMultiplier}</span>
        </div>
        <div class="progress-bar-outer">
          <div class="progress-bar-inner" style="width: ${this.progress}%"></div>
        </div>
        <div class="progress-multiplier">
          <small>x</small><span class="current-multiplier">${this.multiplier.toFixed(1)}</span>
        </div>
      </div>
    `;
  }

}

export default MultiplierController;
