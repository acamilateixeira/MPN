import { useContext } from 'react';

import { ThemeContext } from '../contexts/theme';

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within an ThemeProvider.');
  }

  return context;
}
