/**
 * Removes <style> tags and their content from the provided code string.
 * @param code - The code string to transform.
 * @returns The transformed code string.
 */
export function removeStyleTags(code: string): string {
  return code.replace(/<style>[\s\S]*?<\/style>\s*/, '');
}

/**
 * Cleans up and formats the rendered code string from Storybook.
 * Removes <style> tags and their content
 * Fixes lowercased boolean attributes (e.g. isdisabled="" → isDisabled)
 * Trims empty lines and indents inner lines for readability
 * @param code - The code string to transform.
 * @returns The formatted code string.
 */
export function formatCodeString(code: string): string {
  let transformedCode = code.replace(/<style>[\s\S]*?<\/style>\s*/, '');

  const booleanAttributes = ['isDisabled'];
  transformedCode = booleanAttributes.reduce((result, attr) => {
    const htmlAttr = attr.toLowerCase();
    return result.replace(new RegExp(`\\s${htmlAttr}=""`, 'g'), ` ${attr}`);
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
