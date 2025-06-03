import React from 'react';
import styles from './ThemePreview.module.css';

export interface ThemePreviewProps {
  themeName: string;
  themeConfig: Record<string, string>;
  description: string;
  colors: string[];
}

export const ThemePreview: React.FC<ThemePreviewProps> = ({
  themeName,
  themeConfig,
  description,
  colors,
}) => {
  const getBadgeClass = (name: string) => {
    const classMap: Record<string, string> = {
      default: styles.badgeDefault,
      massive: styles.badgeMassive,
    };
    return `${styles.badge} ${classMap[name] || styles.badgeDefault}`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h4 className={styles.title}>
          {themeName.charAt(0).toUpperCase() + themeName.slice(1)} Theme
        </h4>
        <div className={getBadgeClass(themeName)}>{themeName}</div>
      </div>
      <div className={styles.description}>{description}</div>
      <div className={styles.colorsContainer}>
        {colors.map((color, index) => (
          <div
            key={`${themeName}-${color}-${index}`}
            className={styles.colorSwatch}
            style={{ backgroundColor: themeConfig[color] }}
            title={`${color}: ${themeConfig[color]}`}
          />
        ))}
      </div>
    </div>
  );
};
