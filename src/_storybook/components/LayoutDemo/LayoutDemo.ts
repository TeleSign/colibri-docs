import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { LayoutDemoStyles } from './LayoutDemo.styles';

/**
 * A Lit-based web component for demonstrating page layouts and content areas in Storybook
 *
 * Note: This is a Lit-based web component for use in story files (.stories.tsx), not a React component.
 * Can be used in: TSX story files (Lit template rendering)
 *
 * @example
 * ```typescript
 * import { html } from 'lit';
 * import '@/_storybook/components/LayoutDemo';
 *
 * export const LayoutExample = () => html`
 *   <layout-demo
 *     title="Dashboard Layout"
 *     show-placeholder
 *     placeholder-text="Your dashboard content goes here"
 *   ></layout-demo>
 *
 *   <layout-demo title="Custom Layout">
 *     <div>Custom content in the layout</div>
 *   </layout-demo>
 * `;
 * ```
 */
@customElement('layout-demo')
export class LayoutDemo extends LitElement {
  static styles = [LayoutDemoStyles];

  @property()
  title = 'Page Title';

  @property({ type: Boolean })
  showPlaceholder = false;

  @property({ type: String, attribute: 'placeholder-text' }) placeholderText =
    'Main page content goes here';

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
          ${this.showPlaceholder
            ? html`<div class="page-content">${this.placeholderText}</div>`
            : html`<slot></slot>`}
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
