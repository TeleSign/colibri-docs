/**
 * Creates an argTypes configuration with disabled controls
 * @param keys - List of control keys to disable
 * @returns An argTypes configuration object with disabled controls
 */
export function disableControls<T extends string>(
  ...keys: T[]
): { [K in T]: { control: { disable: boolean } } } {
  return keys.reduce(
    (acc, key) => ({
      ...acc,
      [key]: { control: { disable: true } },
    }),
    {} as { [K in T]: { control: { disable: boolean } } }
  );
}

/**
 * Returns a list of controls to disable based on typography variant and icon presence
 * @param variant - The typography variant
 * @param hasIcon - Whether the component has an icon
 * @returns Array of control names to disable
 */
export function getDisabledControlsForVariant(variant: string, hasIcon = false): string[] {
  // Controls related to links
  const linkControls = ['href', 'newTab', 'downloadable', 'downloadFilename'];

  // Controls for text truncation
  const truncationControls = ['ellipsis', 'maxLines'];

  // Icon-related controls
  const iconControls = hasIcon ? [] : ['iconVisible'];

  switch (variant) {
    case 'heading':
    case 'subheading':
      return [
        'size',
        'state',
        'required',
        'disabled',
        ...truncationControls,
        ...linkControls,
        ...iconControls,
      ];

    case 'display':
      return ['state', 'required', 'disabled', ...linkControls, ...iconControls];

    case 'label':
      return ['size', ...truncationControls, ...linkControls, ...iconControls];

    case 'helper':
      return ['size', ...truncationControls, ...linkControls, ...iconControls];

    case 'link':
      return ['state', 'required', ...truncationControls, ...iconControls];

    case 'caption':
    case 'code':
      return [
        'size',
        'state',
        'required',
        'disabled',
        ...truncationControls,
        ...linkControls,
        ...iconControls,
      ];

    default:
      return [...linkControls, ...iconControls];
  }
}
