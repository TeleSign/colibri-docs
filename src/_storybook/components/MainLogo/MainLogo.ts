import { html, LitElement, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { styleMap } from 'lit/directives/style-map.js';
import { MainLogoStyles } from './MainLogo.styles';

export type LogoName = 'telesign' | 'massive' | 'bics';
export type LogoColor = 'primary' | 'dark' | 'light';

@customElement('main-logo')
export class MainLogo extends LitElement {
  static styles = MainLogoStyles;

  @property({ type: String })
  name?: LogoName;

  @property({ type: String })
  color?: LogoColor;

  @property({ type: String })
  size?: string;

  @state()
  private _svgContent: string = '';

  @state()
  private _loading: boolean = false;

  @state()
  private _error: boolean = false;

  private static _svgCache = new Map<string, string>();

  connectedCallback(): void {
    super.connectedCallback();
    this._updateLogoBasedOnTheme();
    this._observeThemeChanges();
  }

  updated(changedProperties: Map<string, unknown>): void {
    if (changedProperties.has('name')) {
      this._loadLogo();
    }
  }

  private _getEffectiveLogoName(): LogoName {
    if (this.name) {
      return this.name;
    }

    const theme = this._getThemeFromContext();
    switch (theme) {
      case 'massive':
        return 'massive';
      case 'bics':
        return 'bics';
      case 'default':
      default:
        return 'telesign';
    }
  }

  private _getThemeFromContext(): string {
    const storybook = document.querySelector('[data-theme]');
    if (storybook) {
      return storybook.getAttribute('data-theme') || 'default';
    }

    const body = document.body;
    if (body.classList.contains('theme-massive')) return 'massive';
    if (body.classList.contains('theme-bics')) return 'bics';

    return 'default';
  }

  private async _loadLogo(): Promise<void> {
    const logoName = this._getEffectiveLogoName();
    const cacheKey = logoName;

    if (MainLogo._svgCache.has(cacheKey)) {
      this._svgContent = MainLogo._svgCache.get(cacheKey)!;
      this._error = false;
      return;
    }

    this._loading = true;
    this._error = false;

    try {
      const svgPath = `./${logoName}-logo.svg`;
      const response = await globalThis.fetch(svgPath);

      if (!response.ok) {
        throw new Error(`Failed to load ${logoName} logo: ${response.status}`);
      }

      let svgContent = await response.text();

      svgContent = this._cleanSvg(svgContent);

      MainLogo._svgCache.set(cacheKey, svgContent);

      this._svgContent = svgContent;
      this._error = false;
    } catch (error) {
      globalThis.console?.error('Error loading logo:', error);
      this._error = true;
      this._svgContent = '';
    } finally {
      this._loading = false;
    }
  }

  private _cleanSvg(svgContent: string): string {
    let cleaned = svgContent.replace(/\s*(width|height)="[^"]*"/g, '');

    if (!cleaned.includes('viewBox')) {
      const widthMatch = svgContent.match(/width="([^"]*)"/);
      const heightMatch = svgContent.match(/height="([^"]*)"/);

      if (widthMatch && heightMatch) {
        const width = parseFloat(widthMatch[1]);
        const height = parseFloat(heightMatch[1]);
        if (!isNaN(width) && !isNaN(height)) {
          cleaned = cleaned.replace('<svg', `<svg viewBox="0 0 ${width} ${height}"`);
        }
      }
    }

    return cleaned;
  }

  private _getSizeStyles(): { [key: string]: string } {
    if (!this.size) {
      return {};
    }

    const size = this.size;

    if (/^\d+$/.test(size)) {
      return { width: `${size}px`, height: `${size}px` };
    }

    if (/^\d+(\.\d+)?(px|em|rem|%|vh|vw)$/.test(size)) {
      return { width: size, height: size };
    }

    const dimensionMatch = size.match(
      /^(\d+(?:\.\d+)?(?:px|em|rem|%|vh|vw)?)\s*[x×]\s*(\d+(?:\.\d+)?(?:px|em|rem|%|vh|vw)?)$/i
    );
    if (dimensionMatch) {
      const [, width, height] = dimensionMatch;
      return { width, height };
    }

    return { width: size, height: size };
  }

  private _getCurrentTheme(): string {
    const body = document.querySelector('body.sb-show-main');
    return body?.getAttribute('data-theme') || 'default';
  }

  private _observeThemeChanges(): void {
    const body = document.querySelector('body.sb-show-main');
    if (!body) return;

    const observer = new globalThis.MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
          this._updateLogoBasedOnTheme();
        }
      });
    });

    observer.observe(body, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });
  }

  private _updateLogoBasedOnTheme(): void {
    const currentTheme = this._getCurrentTheme();

    this.setAttribute('data-current-theme', currentTheme);

    if (currentTheme === 'massive') {
      this.name = 'massive';
      this.color = 'primary';
    } else if (currentTheme === 'bics') {
      this.name = 'bics';
      this.color = 'dark';
    } else {
      this.name = 'telesign';
      this.color = 'light';
    }

    this._loadLogo();
  }

  render(): TemplateResult {
    const logoName = this._getEffectiveLogoName();
    const sizeStyles = this._getSizeStyles();

    if (this._loading) {
      return html`
        <div class="logo-container" style=${styleMap(sizeStyles)}>
          <div class="loading">Loading...</div>
        </div>
      `;
    }

    if (this._error || !this._svgContent) {
      return html`
        <div class="logo-container" style=${styleMap(sizeStyles)}>
          <div class="error">Logo not found</div>
        </div>
      `;
    }

    const svgWithClass = this._svgContent.replace('<svg', `<svg class="${logoName}-logo"`);

    return html`
      <div class="logo-container" style=${styleMap(sizeStyles)}>${unsafeHTML(svgWithClass)}</div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'main-logo': MainLogo;
  }
}
