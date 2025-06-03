import React from 'react';
import styles from './Callout.module.css';

export interface CalloutProps {
  variant: 'info' | 'tip' | 'warning' | 'error';
  icon?: string;
  children: React.ReactNode;
}

export const Callout: React.FC<CalloutProps> = ({ variant, icon, children }) => {
  return (
    <div className={`${styles.callout} ${styles[variant]}`}>
      {icon && <div className={styles.icon}>{icon}</div>}
      <div className={styles.content}>{children}</div>
    </div>
  );
};
