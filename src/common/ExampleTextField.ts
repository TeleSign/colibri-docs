/**
 * This is an example lit-element component for Storybook documentation.
 * It demonstrates the implementation patterns and API structure
 * that should be followed in the actual TextField component.
 *
 * @important
 * This is a temporary implementation for documentation purposes.
 * TODO: Delete this file once the real TextField component implementation begins.
 *
 * Purpose:
 * - Serves as a reference implementation
 * - Demonstrates component API and behavior
 * - Used for documentation and development
 */

import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('example-text-field')
export class ExampleTextField extends LitElement {
  static styles = css`
    .col-input-group {
      position: relative;
      display: flex;
      flex-direction: column;
      width: 100%;
      min-width: 80px;
    }
    .col-input {
      display: flex;
      position: relative;
      width: 100%;
    }
    .input-wrapper {
      position: relative;
      width: 100%;
      display: flex;
      align-items: center;
    }
    input {
      width: 100%;
      padding: 8px 36px;
      border: 1px solid var(--border-color, #ccc);
      border-radius: 4px;
      font-size: 14px;
      line-height: 20px;
      height: 20px;
      background-color: var(--background-color, #fff);
      color: var(--text-color, #333);
    }
    ::slotted([slot='icon-left']) {
      position: absolute;
      left: 12px;
      top: 50%;
      transform: translateY(-50%);
      color: var(--icon-color, #666);
      display: flex;
      align-items: center;
      justify-content: center;
      width: 16px;
      height: 16px;
      pointer-events: none;
    }
    ::slotted([slot='icon-right']) {
      position: absolute;
      right: 12px;
      top: 50%;
      transform: translateY(-50%);
      color: var(--icon-color, #666);
      display: flex;
      align-items: center;
      justify-content: center;
      width: 16px;
      height: 16px;
      pointer-events: none;
    }
    .col-input-hint {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      color: var(--helper-text-color, #666);
      margin-top: 4px;
    }
    label {
      margin-bottom: 4px;
      font-size: 14px;
      color: var(--label-color, #333);
    }
  `;

  @property({ type: String })
  type: string = 'text';

  @property({ type: String })
  label?: string;

  @property({ type: Number })
  chartCount?: number;

  @property({ type: String })
  mode: string = 'light';

  @property({ type: Object })
  tokens?: Record<string, any>;

  @state()
  private countValue = 0;

  private _handleInput(evt: Event) {
    const input = evt.target as HTMLInputElement;
    this.countValue = input.value.length;
  }

  updated(changedProperties: Map<string, any>) {
    if (changedProperties.has('tokens') && this.tokens) {
      // Apply custom tokens as CSS custom properties
      const style = this.style;
      if (this.tokens.colors?.border?.default) {
        style.setProperty('--border-color', this.tokens.colors.border.default);
      }
      if (this.tokens.colors?.background?.default) {
        style.setProperty('--background-color', this.tokens.colors.background.default);
      }
      if (this.tokens.colors?.text?.default) {
        style.setProperty('--text-color', this.tokens.colors.text.default);
      }
      if (this.tokens.colors?.icon?.default) {
        style.setProperty('--icon-color', this.tokens.colors.icon.default);
      }
      if (this.tokens.colors?.helper?.default) {
        style.setProperty('--helper-text-color', this.tokens.colors.helper.default);
      }
      if (this.tokens.colors?.label?.default) {
        style.setProperty('--label-color', this.tokens.colors.label.default);
      }
    }
  }

  render() {
    return html`
      <div class="col-input-group">
        ${this.label ? html`<label>${this.label}</label>` : ''}
        <div class="col-input">
          <div class="input-wrapper">
            <slot name="icon-left"></slot>
            <input type=${this.type} @input=${this._handleInput} />
            <slot name="icon-right"></slot>
          </div>
        </div>
        <div class="col-input-hint">
          <slot name="helper-text"></slot>
          ${this.chartCount ? html`<span>${this.countValue}/${this.chartCount}</span>` : ''}
        </div>
      </div>
    `;
  }
}
