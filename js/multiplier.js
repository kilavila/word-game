class Multiplier extends HTMLElement {

  constructor(multiplier) {
    super();

    this.multiplier = multiplier.toFixed(1);
  }
  
  connectedCallback() {
    this.render();
  }

  render() {
    this.setAttribute('class', 'message');
    this.innerHTML = `
      <div class="message-header">
        <small>x</small>${this.multiplier}
      </div>
      <div class="message-body">
        <span class="message-text">
          MULTIPLIER
        </span>
      </div>
    `;

    this.counter();
  }

  counter() {
    this.timer = setTimeout(() => {
      this.remove();
    }, 3000);
  }

}

export default Multiplier;
