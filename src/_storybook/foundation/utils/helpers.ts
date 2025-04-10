/**
 * Helper functions for the colors documentation
 *
 * This file contains utility functions.
 * These functions help with:
 * 1. Text formatting (capitalize)
 * 2. CSS variable extraction and presentation (getVariableValue)
 *
 * To use these helpers in other documentation files:
 * ```
 * import { capitalize, getVariableValue } from './helper';
 * ```
 *
 * Notes:
 * - getVariableValue requires the DOM to be loaded as it uses getComputedStyle
 * - When adding colors, make sure they're properly defined in the CSS variables
 */

/**
 * Capitalizes the first letter of a string
 * @param text - Text to capitalize
 * @returns Capitalized text
 */
export function capitalize(text: string): string {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * Gets the computed value of a CSS variable
 * @param name - CSS variable name (without any prefix)
 * @param prefix - Optional prefix ('theme' or 'colors')
 * @param element - Element to get the CSS variable from
 * @param globalPrefix - Global prefix (default: 'col')
 * @returns Computed CSS value (e.g., "#FF0000")
 */
export function getVariableValue(
  name: string,
  prefix?: string,
  element: Element = document.body,
  globalPrefix: string = 'col'
): string {
  try {
    const themedElement = document.querySelector('[data-theme]') || element;

    const prefixPart = prefix ? `-${prefix}` : '';
    const fullName = name.startsWith('--') ? name : `--${globalPrefix}${prefixPart}-${name}`;

    const value = getComputedStyle(themedElement).getPropertyValue(fullName).trim();

    return value || 'Not set';
  } catch (error) {
    console.error('Error getting variable value:', error);
    return 'Error';
  }
}
