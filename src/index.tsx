import { createRoot } from 'react-dom/client';

import { App } from './app';
import { ThemeProvider } from './context/theme';

const container = document.getElementById('app') as HTMLElement;
const root = createRoot(container);
root.render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
);
