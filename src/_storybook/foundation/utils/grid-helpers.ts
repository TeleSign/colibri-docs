/**
 * Grid token helper functions for extracting grid-specific tokens
 *
 * This file provides utility functions to extract grid token names from the
 * @telesign/colibri tokens object for grid documentation.
 */

import {
  tokens,
  GRID_VALIDATION_ARRAYS,
  GRID_SPAN_ARRAYS,
  LAYOUT_VALIDATION_ARRAYS,
} from '@telesign/colibri';

/**
 * Filters non-numeric keys
 * @param keys - Array of keys to filter
 * @returns Array of non-numeric keys
 */
function getNonNumericKeys(keys: string[]): string[] {
  return keys.filter(key => isNaN(Number(key)));
}

// Grid token extractors - now using constants from main package
export const GRID_COLUMNS = GRID_VALIDATION_ARRAYS.columns;
export const GRID_ROWS = GRID_VALIDATION_ARRAYS.rows;
export const GRID_AREAS = GRID_VALIDATION_ARRAYS.areas;
export const GRID_AREA_ASSIGNMENTS = GRID_VALIDATION_ARRAYS.area;
export const GRID_AUTOFIT = GRID_VALIDATION_ARRAYS.autofit;

// Numeric grid tokens (for spanning) - now using span arrays from constants
export const GRID_COLUMN_SPANS = GRID_SPAN_ARRAYS.colSpan.filter(span => span !== 'full');
export const GRID_ROW_SPANS = GRID_SPAN_ARRAYS.rowSpan.filter(span => span !== 'full');

// Named tokens
export const GRID_COLUMN_NAMED = getNonNumericKeys(GRID_COLUMNS);
export const GRID_ROW_NAMED = getNonNumericKeys(GRID_ROWS);

// Layout tokens for gaps - now using layout validation arrays
export const LAYOUT_SIZES = LAYOUT_VALIDATION_ARRAYS.gaps;

// Breakpoints for responsive utilities
export const BREAKPOINTS = Object.keys(tokens.layout?.breakpoints || {});
export const BREAKPOINT_VALUES = tokens.layout?.breakpoints;

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
