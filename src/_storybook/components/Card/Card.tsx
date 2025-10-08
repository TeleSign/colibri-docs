import React from 'react';
import styles from './Card.module.css';

export interface CardProps {
  title: string;
  children: React.ReactNode;
  variant?: 'default' | 'outlined' | 'elevated';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * A React component for organizing and displaying content in card layouts within Storybook documentation
 *
 * Note: This is a React-based documentation component, not a Lit-based Colibri web component.
 * Can be used in: MDX files only (not compatible with TSX files configured for Lit template rendering)
 *
 * @example
 * ```mdx
 * import { Card } from '@/_storybook/components';
 *
 * <Card title="Example Card" variant="outlined" size="md">
 *   <p>This is the card content.</p>
 * </Card>
 *
 * <Card title="Elevated Card" variant="elevated">
 *   <ul>
 *     <li>Item 1</li>
 *     <li>Item 2</li>
 *   </ul>
 * </Card>
 *
 * <Card title="Features" variant="default" size="lg">
 *   <p>Component features and capabilities</p>
 * </Card>
 * ```
 */
export const Card: React.FC<CardProps> = ({
  title,
  children,
  variant = 'default',
  size = 'md',
  className = '',
}) => {
  const cardClasses = [styles.card, styles[variant], styles[size], className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={cardClasses}>
      <p className={styles.title}>{title}</p>
      <div className={styles.content}>{children}</div>
    </div>
  );
};
