import type { Meta, StoryObj } from '@storybook/web-components';
import type { StylesOptions } from '@root/.storybook/preview';

/**
 * Generic type for Colibri component stories meta configuration
 * @template T - The type of the story arguments
 */
export type ColibriStoryMeta<T> = Meta<T> & { parameters: StylesOptions };

/**
 * Generic type for Colibri component stories
 * @template T - The type of the story arguments
 */
export type ColibriStory<T> = StoryObj<T>;
