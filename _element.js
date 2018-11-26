import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * `simple-chip`
 * Web-component chip input
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class SimpleChip extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <h2>Hello [[prop1]]!</h2>
    `;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'simple-chip',
      },
    };
  }
}

window.customElements.define('simple-chip', SimpleChip);
