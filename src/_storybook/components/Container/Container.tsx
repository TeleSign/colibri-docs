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
