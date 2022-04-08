import ReactDOM from 'react-dom';

import { App } from './app';
import { AuthProvider } from './contexts/auth';
import { ThemeProvider } from './contexts/theme';

ReactDOM.render(
  <ThemeProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
  </ThemeProvider>,
  document.getElementById('root')
);
