import { html } from 'lit';
import type { Preview } from '@storybook/web-components';
import { registerColibriComponents } from '@tls-ds/colibri';
import { ColIcon } from '@tls-ds/colibri-icons';
import '@tls-ds/colibri/styles/global.css';
import '@tls-ds/colibri/styles/theme-default.css';
import '@/styles/globals.css';

registerColibriComponents([ColIcon]);

/**
 * Type definitions for style properties.
 * Add new type definitions here when extending the Styles interface.
 */
type Display = 'grid' | 'flex';
type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';
type JustifyContent = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse';

/**
 * Interface defining available style properties for story layouts.
 * This interface can be extended with new CSS properties as needed.
 *
 * Current supported properties:
 * - display: Controls the layout type (grid or flex)
 * - gridTemplateColumns: Defines grid columns when display is 'grid'
 * - gap: Sets spacing between elements
 * - flexDirection: Controls flex container direction
 * - justifyContent: Defines main axis alignment
 * - flexWrap: Controls wrapping behavior
 *
 * To extend:
 * 1. Add new property to this interface
 * 2. Add corresponding type definition if needed
 * 3. Update getStyles function to handle the new property
 */
interface Styles {
  display?: Display;
  gridTemplateColumns?: string;
  gap?: string;
  flexDirection?: FlexDirection;
  justifyContent?: JustifyContent;
  flexWrap?: FlexWrap;
}

interface StylesOptions {
  __sb?: Styles;
}

/**
 * Generates CSS styles string based on provided options.
 * This function can be extended to handle new style properties:
 *
 * 1. For simple properties:
 *    - Add them directly in the template literal
 *
 * 2. For conditional properties:
 *    - Add a new condition block similar to display === 'grid'
 *
 * 3. For complex properties:
 *    - Add helper functions to handle the logic
 *
 * Example extension:
 * ```typescript
 * return `
 *   ${existingStyles}
 *   ${newProperty ? `new-property: ${newProperty};` : ''}
 * `
 * ```
 */
const getStyles = (options?: StylesOptions): string => {
  const {
    display = 'flex',
    gridTemplateColumns,
    flexDirection,
    justifyContent,
    flexWrap,
    gap,
  } = options?.__sb || {};

  return `
    display: ${display};
    ${display === 'grid' ? `grid-template-columns: ${gridTemplateColumns};` : ''}
    ${display === 'flex' ? `
      flex-direction: ${flexDirection || 'column'};
      justify-content: ${justifyContent || 'flex-start'};
      flex-wrap: ${flexWrap || 'wrap'};
    ` : ''}
    ${gap ? `gap: ${gap};` : ''}
  `.trim();
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: ['Welcome', 'Atoms', 'Molecules', 'Organisms', 'Tokens'],
      },
    },
  },
  decorators: [
    (story, context) => {
      // Skip decorator if disableThemeProvider is true
      if (context.parameters.disableThemeProvider) {
        return html`
          <div style=${getStyles(context.parameters)}>
            ${story()}
          </div>
        `;
      }

      return html`
        <div data-theme=${context.args.mode || 'default'} style=${getStyles(context.parameters)}>
          ${story()}
        </div>
      `;
    },
  ],
};

export default preview;
