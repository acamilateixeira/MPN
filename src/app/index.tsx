import '@fontsource/alata';

import { CssBaseline } from '@material-ui/core';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

import { useTheme } from '../hooks/useTheme';
import { AppRoutes } from './routes/app';

export function App() {
  const { type } = useTheme();

  const theme = createTheme({
    palette: {
      type: type,
      primary: {
        main: '#C1A3A3',
      },
      secondary: {
        main: '#694E4E',
      },
    },
    typography: {
      fontSize: 14,
      fontFamily: 'Alata',
    },
    shape: {
      borderRadius: 16,
    },

    overrides: {
      MuiPaper: {
        elevation1: {
          boxShadow: '0 1px 8px 5px rgba(0, 0, 0, 0.08)',
        },
      },
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppRoutes />
      </ThemeProvider>
    </>
  );
}
