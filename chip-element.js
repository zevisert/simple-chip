import {html, LitElement} from '@polymer/lit-element';

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

        .remove-icon {
          display: flex;
          height: 100%; 
          align-items: center;

          cursor: pointer;
          float: right;
          font-size: 16px;
          line-height: 32px;
          padding-left: 8px;
        }

        .remove-icon svg {
          fill: var(--chip-font-color, white);
          width: 16px;
          height: 16px;
        }

      </style>
      <slot></slot>
      <div class="remove-icon" @click="${this.remove}">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M 5.7070312 4.2929688 L 4.2929688 5.7070312
                   L 10.585938 12 L 4.2929688 18.292969 L 5.7070312 19.707031
                   L 12 13.414062 L 18.292969 19.707031 L 19.707031 18.292969
                   L 13.414062 12 L 19.707031 5.7070312 L 18.292969 4.2929688
                   L 12 10.585938 L 5.7070312 4.2929688 z">
          </path>
        </svg>
      </div>
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
