import { HTML_BOOLEAN_ATTRIBUTES } from './constants';

/**
 * Removes <style> tags and their content from the provided code string.
 * @param code - The code string to transform.
 * @returns The transformed code string.
 */
export function removeStyleTags(code: string): string {
  return code.replace(/<style>[\s\S]*?<\/style>\s*/, '');
}

/**
 * Formats a code string for display, typically in Storybook source previews.
 *
 * This function:
 * 1. Removes `<style>` tags and their content.
 * 2. Formats HTML boolean attributes (e.g., `disabled=""` becomes `disabled`).
 * 3. Pretty-prints the code: removes empty lines, trims whitespace, and indents multi-line snippets.
 *
 * @param code - The raw code string to transform.
 * @returns The formatted and cleaned code string.
 */
export function formatCodeString(code: string): string {
  let transformedCode = code.replace(/<style>[\s\S]*?<\/style>\s*/, '');

  transformedCode = HTML_BOOLEAN_ATTRIBUTES.reduce((result, attr) => {
    const htmlAttr = attr.toLowerCase();
    return result.replace(new RegExp(`\\s${htmlAttr}=""`, 'g'), ` ${htmlAttr}`);
  }, transformedCode);

  const lines = transformedCode.split('\n').filter(line => line.trim() !== '');

  if (lines.length <= 1) {
    return lines.join('').trim();
  }

  const firstLine = lines[0].trim();
  const lastLine = lines[lines.length - 1].trim();
  const innerLines = lines.slice(1, -1).map(line => '  ' + line.trim());

  return [firstLine, ...innerLines, lastLine].join('\n');
}
