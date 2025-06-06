import React from 'react';
import styles from './Card.module.css';

export interface CardProps {
  title: string;
  children: React.ReactNode;
  variant?: 'default' | 'outlined' | 'elevated';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

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
