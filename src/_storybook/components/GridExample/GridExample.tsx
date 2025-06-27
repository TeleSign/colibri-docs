import React from 'react';
import { GridCell } from '../GridCell';
import { Container } from '../Container';
import styles from './GridExample.module.css';

export interface GridExampleProps {
  title: string;
  description?: string;
  gridClasses: string;
  children?: React.ReactNode;
  cellCount?: number;
  cellVariant?: 'default' | 'primary' | 'secondary' | 'accent';
  cellSize?: 'small' | 'medium' | 'large';
  showCode?: boolean;
  className?: string;
}

export const GridExample: React.FC<GridExampleProps> = ({
  title,
  description,
  gridClasses,
  children,
  cellCount = 6,
  cellVariant = 'default',
  cellSize = 'medium',
  showCode = true,
  className = '',
}) => {
  const defaultCells = React.useMemo(() => {
    return Array.from({ length: cellCount }, (_, index) => (
      <GridCell key={index} variant={cellVariant} size={cellSize}>
        {index + 1}
      </GridCell>
    ));
  }, [cellCount, cellVariant, cellSize]);

  const gridContent = children || defaultCells;

  return (
    <Container title={title} description={description} variant="example" className={className}>
      <div className={`${gridClasses} ${styles.gridContainer}`}>{gridContent}</div>
      {showCode && (
        <div className={styles.codeDisplay}>
          <code className={styles.code}>
            {gridClasses
              .split(' ')
              .map(cls => `.${cls}`)
              .join(' ')}
          </code>
        </div>
      )}
    </Container>
  );
};
