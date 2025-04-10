/**
 * Removes <style> tags and their content from the provided code string.
 * @param code - The code string to transform.
 * @returns The transformed code string.
 */
export function removeStyleTags(code: string): string {
  return code.replace(/<style>[\s\S]*?<\/style>\s*/, '');
}

/**
 * Removes <style> tags and their content, and formats the code string by
 * trimming empty lines and indenting inner lines.
 * @param code - The code string to transform.
 * @returns The formatted code string.
 */
export function formatCodeString(code: string): string {
  let transformedCode = code.replace(/<style>[\s\S]*?<\/style>\s*/, '');
  const lines = transformedCode.split('\n').filter(line => line.trim() !== '');
  if (lines.length === 0) {
    return transformedCode;
  }
  const firstLine = lines[0].trim();
  const lastLine = lines[lines.length - 1].trim();
  const innerLines = lines.slice(1, -1).map(line => '  ' + line.trim());
  return [firstLine, ...innerLines, lastLine].join('\n');
}
