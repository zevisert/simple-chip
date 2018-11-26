import {html, LitElement} from '@polymer/lit-element';


import "@material/mwc-icon";

/**
 * `simple-chip`
 * Web-component chip input
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
export default class ChipElement extends LitElement {
  render() {
    return html`
      <style>
        :host {
          display: inline-block;
          height: 32px;
          font-size: 13px;
          font-weight: 500;
          color: var(--chip-font-color, white);
          line-height: 32px;
          padding: 0 12px;
          border: var(--chip-border, none);
          border-radius: 16px;
          background-color: var(--chip-color, #eee);
          margin-bottom: 5px;
          margin-right: 5px;
          box-shadow: var(--chip-shadow, none);
          user-select: none;
        }

        mwc-icon {
          cursor: pointer;
          float: right;
          font-size: 16px;
          line-height: 32px;
          padding-left: 8px;
        }
      </style>
      <slot></slot>
      <mwc-icon @click="${this.remove}">close</mwc-icon>
    `;
  }

  get value() {
    return this.innerText;
  }

  remove() {
    this.renderRoot.host.parentElement.removeChild(this);
  }
}

window.customElements.define('chip-element', ChipElement);
