import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { LayoutDemoStyles } from './LayoutDemo.styles';

@customElement('layout-demo')
export class LayoutDemo extends LitElement {
  static styles = [LayoutDemoStyles];

  @property()
  title = 'Page Title';

  @property({ type: Boolean })
  showPlaceholder = true;

  @property({ type: String, attribute: 'placeholder-text' }) placeholderText =
    'You can add your main content here';

  render() {
    const contentClasses = {
      'content-area': true,
      'content-area--placeholder': this.showPlaceholder,
      'content-area--custom': !this.showPlaceholder,
    };

    return html`
      <div class="layout-wrapper">
        <h3 class="page-title">${this.title}</h3>
        <div class=${classMap(contentClasses)}>
          ${this.showPlaceholder ? html`<!-- ${this.placeholderText} -->` : html`<slot></slot>`}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'layout-demo': LayoutDemo;
  }
}
