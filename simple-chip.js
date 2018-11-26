import {html, LitElement} from '@polymer/lit-element';
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
  render() {
    return html`
      <style>
        :host {
          display: block;

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
          height: 3rem;
          line-height: 32px;
          outline: 0;
          margin: 0;
          padding: 0 !important;
          width: 120px !important;
        }
      </style>
      <div id="container" @click="${() => this.input.focus()}">
        <input id="input" type="text">
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
        this._insert(text);
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
  }

  removeLast() {
    const last = this.chips.pop();

    if (last) {
      last.remove();
    }
    return last;
  }

  _insert(e) {
    const chip = new ChipElement();
    chip.innerText = e.detail.text;
    this.input.insertAdjacentElement('beforeBegin', chip);

    this.input.value = "";
  }

  __keydown(e) {
    if (e.key === "Enter") {
      this.__change();
    } else if (e.key === "Backspace") {
      if (this.input.value.length === 0) {
        this.removeLast();
      }
    }
  }

  __change() {
    const text = this.input.value;
    this.dispatchEvent(new CustomEvent('chip-added', {
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
