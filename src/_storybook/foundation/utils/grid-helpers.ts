/**
 * Grid token helper functions for extracting grid-specific tokens
 *
 * This file provides utility functions to extract grid token names from the
 * @telesign/colibri tokens object for grid documentation.
 *
 * TODO: Optimize by reusing GRID_VALIDATION_ARRAYS and GRID_SPAN_ARRAYS from
 * packages/colibri/src/config/constants.ts to eliminate redundancy and maintain
 * single source of truth for grid tokens.
 */

import { tokens } from '@telesign/colibri';

/**
 * Extracts keys from an object
 * @param obj - Object to extract keys from
 * @returns Array of keys
 */
function extractKeys(obj: any): string[] {
  return obj ? Object.keys(obj) : [];
}

/**
 * Filters numeric keys and sorts them
 * @param keys - Array of keys to filter
 * @returns Sorted array of numeric keys
 */
function getNumericKeys(keys: string[]): string[] {
  return keys
    .filter(key => !isNaN(Number(key)) && key !== 'none')
    .sort((a, b) => Number(a) - Number(b));
}

/**
 * Filters non-numeric keys
 * @param keys - Array of keys to filter
 * @returns Array of non-numeric keys
 */
function getNonNumericKeys(keys: string[]): string[] {
  return keys.filter(key => isNaN(Number(key)));
}

// Grid token extractors
// TODO: Replace with imports from constants.ts:
// import { GRID_VALIDATION_ARRAYS } from '@telesign/colibri/config/constants';
// export const GRID_COLUMNS = GRID_VALIDATION_ARRAYS.columns;
export const GRID_COLUMNS = extractKeys(tokens.grid?.columns);
export const GRID_ROWS = extractKeys(tokens.grid?.rows);
export const GRID_AREAS = extractKeys(tokens.grid?.areas);
export const GRID_AREA_ASSIGNMENTS = extractKeys(tokens.grid?.area);
export const GRID_AUTOFIT = extractKeys(tokens.grid?.autofit);

// Numeric grid tokens (for spanning)
export const GRID_COLUMN_SPANS = getNumericKeys(GRID_COLUMNS);
export const GRID_ROW_SPANS = getNumericKeys(GRID_ROWS);

// Named tokens
export const GRID_COLUMN_NAMED = getNonNumericKeys(GRID_COLUMNS);
export const GRID_ROW_NAMED = getNonNumericKeys(GRID_ROWS);

// Layout tokens for gaps
export const LAYOUT_SIZES = extractKeys(tokens.layout?.size);

// Breakpoints for responsive utilities
export const BREAKPOINTS = extractKeys(tokens.layout?.breakpoints);

// Token values for display
export const GRID_TOKEN_VALUES = {
  columns: tokens.grid?.columns || {},
  rows: tokens.grid?.rows || {},
  areas: tokens.grid?.areas || {},
  area: tokens.grid?.area || {},
  autofit: tokens.grid?.autofit || {},
  layout: tokens.layout?.size || {},
  breakpoints: tokens.layout?.breakpoints || {},
};

/**
 * Gets the CSS variable name for a grid token
 * @param category - Token category (columns, rows, etc.)
 * @param key - Token key
 * @returns CSS variable name
 */
export function getGridTokenVariable(category: string, key: string): string {
  const categoryMap: Record<string, string> = {
    columns: 'grid-columns',
    rows: 'grid-rows',
    areas: 'grid-areas',
    area: 'grid-area',
    autofit: 'grid-autofit',
    layout: 'layout-size',
    breakpoints: 'layout-breakpoints',
  };

  const mappedCategory = categoryMap[category] || category;
  return `--col-${mappedCategory}-${key}`;
}

/**
 * Gets utility class name for grid tokens
 * @param type - Utility type (grid-cols, grid-gap, etc.)
 * @param key - Token key
 * @returns Utility class name
 */
export function getGridUtilityClass(type: string, key: string): string {
  return `col-${type}-${key}`;
}
