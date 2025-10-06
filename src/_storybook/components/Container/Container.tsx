import React from 'react';
import styles from './Container.module.css';

export interface ContainerProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  variant?: 'default' | 'showcase' | 'example';
  className?: string;
  showHeader?: boolean;
}

/**
 * A React container component for wrapping and organizing content sections in Storybook documentation
 *
 * Note: This is a React-based documentation component, not a Lit-based Colibri web component.
 * Can be used in: MDX files only (not compatible with TSX files configured for Lit template rendering)
 *
 * @example
 * ```mdx
 * import { Container } from '@/_storybook/components';
 *
 * <Container title="Example Section" description="This is a description">
 *   <p>Content goes here</p>
 * </Container>
 *
 * <Container variant="showcase" showHeader={false}>
 *   <div>Content without header</div>
 * </Container>
 *
 * <Container
 *   title="Code Example"
 *   variant="example"
 *   description="Demonstrating the component usage"
 * >
 *   <pre><code>const example = true;</code></pre>
 * </Container>
 *
 * <Container title="API Reference" variant="default">
 *   <p>API documentation content</p>
 * </Container>
 * ```
 */
export const Container: React.FC<ContainerProps> = ({
  title,
  description,
  children,
  variant = 'default',
  className = '',
  showHeader = true,
}) => {
  const containerClass = `${styles.container} ${styles[variant]} ${className}`;

  return (
    <div className={containerClass}>
      {showHeader && (title || description) && (
        <div className={styles.header}>
          {title && <h5 className={styles.title}>{title}</h5>}
          {description && <p className={styles.description}>{description}</p>}
        </div>
      )}
      <div className={styles.content}>{children}</div>
    </div>
  );
};
