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
 * 3. Pretty-prints the code with structure-aware indentation based on HTML nesting levels.
 *    - Analyzes opening and closing tags to determine proper indentation depth
 * 4. Removes empty lines and trims whitespace.
 *
 * @param code - The raw code string to transform.
 * @returns The formatted and cleaned code string with proper nested indentation.
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

  let indentLevel = 0;
  const formattedLines = lines.map(line => {
    const trimmedLine = line.trim();

    if (trimmedLine.startsWith('</')) {
      indentLevel = Math.max(0, indentLevel - 1);
    }

    const formattedLine = '  '.repeat(indentLevel) + trimmedLine;

    if (
      trimmedLine.startsWith('<') &&
      !trimmedLine.startsWith('</') &&
      !trimmedLine.endsWith('/>') &&
      !trimmedLine.includes('</' + trimmedLine.substring(1).split(/[\s>]/)[0] + '>')
    ) {
      indentLevel++;
    }

    return formattedLine;
  });

  return formattedLines.join('\n');
}
