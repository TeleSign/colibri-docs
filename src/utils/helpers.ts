import { html, TemplateResult } from 'lit';

/**
 * Creates an argTypes configuration with disabled controls
 * @param keys - List of control keys to disable
 * @returns An argTypes configuration object with disabled controls
 */
export function disableControls<T extends string>(
  ...keys: T[]
): Record<T, { control: { disable: boolean } }> {
  return keys.reduce(
    (acc, key) => ({
      ...acc,
      [key]: { control: { disable: true } },
    }),
    {} as Record<T, { control: { disable: boolean } }>
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
  const iconControls = hasIcon ? [] : ['iconVisible', 'iconName', 'iconSize'];

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

export interface StoryWrapperConfig {
  containerClass?: string;
  titleClass?: string;
  descriptionClass?: string;
  showContainer?: boolean;
}

/**
 * Wraps content with customizable story presentation elements
 * @param title - The title to display
 * @param content - The content to wrap
 * @param config - Configuration for wrapper classes and structure
 * @returns A TemplateResult with the wrapped content
 */
export function wrapStoryContent(
  title: string,
  content: (() => TemplateResult) | TemplateResult,
  config: StoryWrapperConfig & { description?: string } = {}
): TemplateResult {
  const {
    containerClass = 'story-section',
    titleClass = 'story-title',
    descriptionClass = 'story-description',
    showContainer = true,
    description,
  } = config;

  const renderedContent = typeof content === 'function' ? content() : content;

  if (!showContainer) {
    return html`
      <div class="${titleClass}">${title}</div>
      ${description ? html`<div class="${descriptionClass}">${description}</div>` : ''}
      ${renderedContent}
    `;
  }

  return html`
    <div class="${containerClass}">
      <div class="${titleClass}">${title}</div>
      ${description ? html`<div class="${descriptionClass}">${description}</div>` : ''}
      ${renderedContent}
    </div>
  `;
}

/**
 * Creates multiple story sections with consistent configuration
 * @param configs - Array of story configurations
 * @param globalConfig - Global wrapper configuration applied to all stories
 * @returns A TemplateResult containing all wrapped sections
 */
export function createStoryCollection(
  configs: Array<{
    title: string;
    content: (() => TemplateResult) | TemplateResult;
    description?: string;
    info?: string;
  }>,
  globalConfig: StoryWrapperConfig = {}
): TemplateResult {
  return html`${configs.map(config => {
    const description = [config.description, config.info].filter(Boolean).join(' - ');
    return wrapStoryContent(config.title, config.content, {
      ...globalConfig,
      description,
    });
  })}`;
}
