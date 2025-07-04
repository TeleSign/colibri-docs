import { html } from 'lit';
import { createElement } from 'react';
import type { DecoratorFunction, StoryContext } from '@storybook/types';
import { DocsContainer } from '@storybook/blocks';
import type { Preview, WebComponentsRenderer } from '@storybook/web-components';
import { registerColibriComponents, registerAllComponents } from '@telesign/colibri';
import { ColIcon } from '@telesign/colibri-icons';
import '@telesign/colibri/styles/styles.css';

registerAllComponents();
registerColibriComponents([ColIcon]);

/**
 * Type definitions for style properties.
 * Add new type definitions here when extending the Styles interface.
 */
type Display = 'grid' | 'flex';
type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';
type JustifyContent =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';
type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse';

/**
 * Type defining available style properties for story layouts.
 * This type can be extended with new CSS properties as needed.
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
 * 1. Add new property to this type
 * 2. Add corresponding type definition if needed
 * 3. Update getStyles function to handle the new property
 */
export type Styles = {
  display?: Display;
  gridTemplateColumns?: string;
  gap?: string;
  flexDirection?: FlexDirection;
  justifyContent?: JustifyContent;
  flexWrap?: FlexWrap;
};

export interface StylesOptions {
  /**
   * Custom styles that override the default settings. The current CSS attributes include:
   * 1. display - 'grid' | 'flex'
   * 2. gridTemplateColumns - 'grid-template-columns'
   * 3. gap - 'gap'
   * 4. flexDirection - 'flex-direction'
   * 5. justifyContent - 'justify-content'
   * 6. flexWrap - 'flex-wrap'
   *
   * To incorporate additional CSS attributes, navigate to the '.storybook/preview.tsx' file and append them within the 'Styles' type.
   */
  __sb?: Styles;
}

/**
 * Generates CSS styles string based on provided options.
 * Only applies styles when explicitly provided via options.__sb to avoid conflicts with custom CSS.
 *
 * This function can be extended to handle new style properties:
 *
 * 1. For simple properties:
 *    - Add a condition to check if the property exists
 *    - Push the CSS declaration to the styles array
 *
 * 2. For conditional properties:
 *    - Add nested conditions within display-specific blocks
 *
 * 3. For complex properties:
 *    - Add helper functions to handle the logic
 *
 * Example extension:
 * ```typescript
 * if (newProperty) {
 *   styles.push(`new-property: ${newProperty};`);
 * }
 * ```
 *
 * @param options - StylesOptions containing __sb configuration
 * @returns CSS styles string with space-separated declarations
 */
const getStyles = (options?: StylesOptions): string => {
  const { display, gridTemplateColumns, flexDirection, justifyContent, flexWrap, gap } =
    options?.__sb || {};

  const styles: string[] = [];

  if (display) {
    styles.push(`display: ${display};`);

    if (display === 'grid' && gridTemplateColumns) {
      styles.push(`grid-template-columns: ${gridTemplateColumns};`);
    }

    if (display === 'flex') {
      if (flexDirection) styles.push(`flex-direction: ${flexDirection};`);
      if (justifyContent) styles.push(`justify-content: ${justifyContent};`);
      if (flexWrap) styles.push(`flex-wrap: ${flexWrap};`);
    }
  }

  if (gap) {
    styles.push(`gap: ${gap};`);
  }

  return styles.join(' ');
};

/**
 * Decorator function for Storybook that applies a theme to the story.
 * This function retrieves the theme from the globals context and sets it as a data attribute on the body element.
 *
 * @param {Function} story - The story function to be decorated
 * @param {Object} context - The context object containing globals information, including the theme
 * @returns {TemplateResult} The result of the story function execution
 *
 * @example
 */
export const withThemeProvider: DecoratorFunction<WebComponentsRenderer> = (
  story,
  context: StoryContext<WebComponentsRenderer>
) => {
  const {
    globals: { theme },
  } = context;
  const body = document.querySelector('body.sb-show-main');
  if (!(body instanceof HTMLElement)) return story();

  body.setAttribute('data-theme', theme || 'default');
  return story();
};

/**
 * A decorator function that applies custom styling to a Storybook story.
 *
 * This decorator wraps the story output in a div with styles determined by the
 * context parameters provided by Storybook. It uses the `getStyles` function to
 * convert parameters into CSS style attributes.
 *
 * @param {Function} story - The story function to be decorated
 * @param {Object} context - The Storybook context object containing parameters
 * @returns {TemplateResult} An HTML template result with custom styling applied
 */
export const withCustomStyling: DecoratorFunction<WebComponentsRenderer> = (
  story,
  context: StoryContext<WebComponentsRenderer>
) => {
  return html` <div style=${getStyles(context.parameters)}>${story()}</div> `;
};

const preview: Preview = {
  parameters: {
    controls: { expanded: true, hideNoControlsWarning: true },
    options: {
      storySort: {
        order: ['Welcome', 'Atoms', 'Molecules', 'Organisms', 'Tokens'],
      },
    },
    docs: {
      container: (props: any) => {
        const { theme } = props.context.store.userGlobals.globals;
        const body = document.querySelector('body');
        body!.setAttribute('data-theme', theme.toLowerCase() ?? 'default');

        return createElement(DocsContainer, props);
      },
    },
    backgrounds: {
      values: [
        { name: 'Dark', value: '#333' },
        { name: 'Light', value: '#fff' },
        { name: 'Figma', value: '#e5e5e5' },
      ],
      default: 'Figma',
    },
  },
  decorators: [withThemeProvider, withCustomStyling],
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Theme for Colibri components',
      defaultValue: 'default',
      toolbar: {
        icon: 'globe',
        items: [
          { value: 'default', title: 'Theme: default' },
          { value: 'massive', title: 'Theme: Massive' },
        ],
        dynamicTitle: true,
      },
    },
  },
};

export default preview;
