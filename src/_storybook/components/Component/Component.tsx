import React from 'react';
import styles from './Component.module.css';

export interface ComponentProps {
  text: string;
  variant?:
    | 'default'
    | 'custom'
    | 'tokens'
    | 'inline'
    | 'invalid'
    | 'adaptive'
    | 'conditional'
    | 'responsive'
    | 'composite';
  onClick?: () => void;
  disabled?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

/**
 * A flexible React component for displaying component examples and states in Storybook documentation
 *
 * Note: This is a React-based documentation component, not a Lit-based Colibri web component.
 * Can be used in: MDX files only (not compatible with TSX files configured for Lit template rendering)
 *
 * @example
 * ```mdx
 * import { Component } from '@/_storybook/components';
 *
 * <Component text="Default Component" variant="default" />
 *
 * <Component
 *   text="Interactive Component"
 *   variant="custom"
 *   onClick={() => console.log('clicked')}
 * />
 *
 * <Component
 *   text="Disabled Component"
 *   variant="adaptive"
 *   disabled
 * />
 *
 * <Component
 *   text="Responsive Example"
 *   variant="responsive"
 *   onClick={() => alert('Clicked!')}
 * />
 * ```
 */
export const Component: React.FC<ComponentProps> = ({
  text,
  variant = 'default',
  onClick,
  disabled = false,
  style = {},
  className = '',
}) => {
  const componentClass = `${styles.component} ${styles[variant]} ${className}`;

  return (
    <div
      className={componentClass}
      onClick={onClick}
      style={{
        cursor: onClick ? 'pointer' : 'default',
        ...style,
      }}
      data-disabled={disabled}
    >
      {text}
    </div>
  );
};
