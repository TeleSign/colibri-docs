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
