import { useState, useEffect } from 'react';

export const useStorybookTheme = (): string => {
  const [currentTheme, setCurrentTheme] = useState('default');

  useEffect(() => {
    const updateTheme = () => {
      const body = document.querySelector('body');
      const theme = body?.getAttribute('data-theme') || 'default';
      setCurrentTheme(theme);
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);
    const body = document.querySelector('body');

    if (body) {
      observer.observe(body, {
        attributes: true,
        attributeFilter: ['data-theme'],
      });
    }

    return () => observer.disconnect();
  }, []);

  return currentTheme;
};
