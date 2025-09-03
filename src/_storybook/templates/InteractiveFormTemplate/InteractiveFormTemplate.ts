import { LitElement, html } from 'lit';
import { customElement, property, query, queryAssignedElements } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { InteractiveFormTemplateStyles } from './InteractiveFormTemplate.styles';
import { highlightJsStyles } from '../styles/highlight-js.styles';

@customElement('interactive-form-template')
export class InteractiveFormTemplate extends LitElement {
  static styles = [highlightJsStyles, InteractiveFormTemplateStyles];

  @property({ type: String, attribute: 'form-id' })
  formId = '';

  @property({ type: String, attribute: 'output-id' })
  outputId = '';

  @property({ type: String })
  title = '';

  @property({ type: String, attribute: 'code-snippet' })
  codeSnippet = '';

  @property({ type: Boolean })
  showCodeBlock = true;

  @property({ type: Boolean })
  showOutput = true;

  @property({ type: String, attribute: 'code-theme' })
  codeTheme = 'dark';

  @property({ type: String })
  formDescription = '';

  @queryAssignedElements({ slot: 'form', flatten: true })
  private formElements!: HTMLFormElement[];

  @query(`[id$="-form-output"]`)
  private outputElement!: HTMLPreElement;

  private _handleSlotChange = () => {
    requestAnimationFrame(() => {
      this.setupFormHandlers();
    });
  };

  private setupFormHandlers() {
    const formElement = this.formElements?.[0];

    if (!formElement || !this.outputElement) return;

    formElement.removeEventListener('submit', this._handleSubmit);
    formElement.removeEventListener('reset', this._handleReset);

    formElement.addEventListener('submit', this._handleSubmit);
    formElement.addEventListener('reset', this._handleReset);
  }

  private _handleSubmit = (event: Event) => {
    if (event.defaultPrevented) {
      this.outputElement.textContent = 'Form submission blocked by validation';
      return;
    }

    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    this.outputElement.textContent = JSON.stringify(data, null, 2);
  };

  private _handleReset = () => {
    this.outputElement.textContent = 'Submit the form to see the data here';
  };

  render() {
    const isInDocs = window.location.search.includes('viewMode=docs');
    const codeClass = this.codeTheme === 'dark' ? 'storybook-code' : 'storybook-code light';

    return html`
      <div class="storybook-card">
        ${!isInDocs
          ? html`
              <div class="storybook-flex">
                <div class="storybook-col">
                  <h3>${this.title}</h3>
                  ${this.formDescription ? html`<p>${this.formDescription}</p>` : ''}
                  <div>
                    <slot name="form" @slotchange=${this._handleSlotChange}></slot>
                  </div>
                </div>
                ${this.showOutput
                  ? html`
                      <div class="storybook-col">
                        <h3>Form Output</h3>
                        <pre class="form-output" id="${this.outputId}">
Submit the form to see the data here
                        </pre
                        >
                      </div>
                    `
                  : ''}
              </div>
              ${this.showCodeBlock
                ? html`
                    <h3>Form Data Integration in JavaScript</h3>
                    <div class="${codeClass}">
                      <pre>${unsafeHTML(this.codeSnippet)}</pre>
                    </div>
                  `
                : ''}
            `
          : html`
              <h3>${this.title}</h3>
              ${this.formDescription ? html`<p>${this.formDescription}</p>` : ''}
              <div>
                <slot name="form" @slotchange=${this._handleSlotChange}></slot>
              </div>
            `}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'interactive-form-template': InteractiveFormTemplate;
  }
}
