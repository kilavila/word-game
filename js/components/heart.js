import _gs from '/js/state.js';

class Heart extends HTMLElement {

  constructor() {
    super();

    this.lost = false;
  }

  connectedCallback() {
    render();
  }

  disconnectedCallback() {
    // NOTE: Lower difficulty on heart loss?
  }

  // FIX: Render hearts..
  render() {
    this.innerHTML = `
      <i class="nf ${this.lost ? 'nf-md-heart_broken' : 'nf-fa-heart'}"></i>
    `;
  }

  setLost() {
    this.lost = true;

    setTimeout(() => {
      this.remove();
    }, 1000);
  }

}

export default Heart;
