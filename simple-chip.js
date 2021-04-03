import {css, html, LitElement} from 'lit-element';
import ChipElement from './chip-element.js';

function flattenDeep(arr1) {
  return arr1.reduce((acc, val) => Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val), []);
}

/**
 * `simple-chip`
 * Web-component chip input
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class SimpleChip extends LitElement {

  static get properties() { return {
    commitKeycode: {type: String},
    placeholder: {type: String}
  }}

  static get styles() {
    return css`
      :host {
        --chip-input-display: block;
        --chip-input-border-bottom-height: 1px;
        --chip-input-border-bottom-color: lightgray;
        --chip-input-border-bottom-color-focus: darkcyan;
        --chip-input-border-transition: transform 0.25s ease-out;
        --chip-input-font-size: 16px;
        --chip-input-font-color: rgba(0,0,0,0.6);
        --chip-color: #78909c;
        --chip-font-color: white;
        --chip-border: none;
        --chip-shadow: none;

        display: var(--chip-input-display);
      }

      #container {
        display: inline-block;
        position: relative;
        width: 100%;
      }

      #container::before {
        content: '';
        position: absolute;
        width: 100%;
        height: var(--chip-input-border-bottom-height);
        bottom: 0;
        left: 0;
        background-color: var(--chip-input-border-bottom-color);
      }

      #container::after {
        content: '';
        position: absolute;
        width: 100%;
        transform: scaleX(0);
        height: var(--chip-input-border-bottom-height);
        bottom: 0;
        left: 0;
        background-color: var(--chip-input-border-bottom-color-focus);
        transform-origin: bottom right;
        transition: var(--chip-input-border-transition);
      }

      #container.focus::after {
        transform: scaleX(1);
        transform-origin: bottom left;
      }
      
      input {
        background: none;
        border: 0;
        color: var(--chip-input-font-color);
        display: inline-block;
        font-size: var(--chip-input-font-size);
        height: 2rem;
        line-height: 32px;
        vertical-align: middle;
        outline: 0;
        margin: 0;
        padding: 0 !important;
        width: 120px !important;
      }
    `
  }

  constructor() {
    super();
    this.commitKeycode = "Enter";
    this.placeholder = '';
  }

  render() {
    return html`
      <div id="container" @click="${() => this.input.focus()}">
        <input id="input" type="text" placeholder="${this.placeholder}">
      </div>
    `;
  }

  get chips() {
    return Array.from(this.container.children).filter(i => i.tagName === "CHIP-ELEMENT");
  }

  get values() {
    return this.chips.map(chip => chip.value);
  }

  addChips(...chips) {
    chips = flattenDeep(chips);

    for (const text of chips) {
      if (typeof text === "string") {
        this.dispatchEvent(new CustomEvent('chip-added', {
          cancelable: true,
          detail: { text }
        }));
      }
    }
  }
  
  firstUpdated() {
    this.input = this.renderRoot.getElementById('input');
    this.container = this.renderRoot.getElementById('container');
    this.addEventListener('keydown', this.__keydown.bind(this));
    this.input.addEventListener('focus', this.__focusWithin.bind(this));
    this.input.addEventListener('blur', this.__focusWithin.bind(this));

    this.addEventListener('chip-added', this._insert.bind(this));
      
    this.changeObserver = new MutationObserver(this.__change.bind(this));
    this.changeObserver.observe(this.container, { childList: true });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.changeObserver.disconnect();
  }

  removeLast() {
    const last = this.chips.pop();

    if (last) {
      last.remove();
    }
    return last;
  }

  clear() {
    for (const chip of this.chips) {
      chip.remove();
    }
  }

  _insert(e) {
    if (! e.defaultPrevented) {
      const chip = new ChipElement();
      chip.innerText = e.detail.text;
      this.input.insertAdjacentElement('beforeBegin', chip);
      
      this.input.value = "";
    }
  }

  __keydown(e) {
    const commitCodes = this.commitKeycode.split(',').map(k => k.trim());
    
    if (commitCodes.includes(e.key) || commitCodes.includes(e.code)) {
      this.__commit();
    } else if (e.code === "Backspace") {
      if (this.input.value.length === 0) {
        this.removeLast();
      }
    }
  }

  __change(mutationsList) {
    for (const mutation of mutationsList) {
      if (mutation.type == 'childList' && this.chips.length === 0) {
        this.input.placeholder = this.placeholder;
      } else {
        this.input.placeholder = '';
      }
    }
  }
  
  __commit() {
    const text = this.input.value;
    this.dispatchEvent(new CustomEvent('chip-added', {
      cancelable: true,
      detail: { text }
    }));
  }
  
  __focusWithin(e) {
    if (e.type === "blur") {
      this.container.classList.remove('focus');
    } else if (e.type === "focus") {
      this.container.classList.add('focus');
    }
  }
}

window.customElements.define('simple-chip', SimpleChip);
