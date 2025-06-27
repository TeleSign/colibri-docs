import React from 'react';
import styles from './GridCell.module.css';

export interface GridCellProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'secondary' | 'accent';
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export const GridCell: React.FC<GridCellProps> = ({
  children,
  variant = 'default',
  size = 'medium',
  className = '',
}) => {
  const cellClass = `${styles.cell} ${styles[variant]} ${styles[size]} ${className}`;

  return <div className={cellClass}>{children}</div>;
};
