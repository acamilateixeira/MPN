import '@fontsource/poppins';

import { CssBaseline } from '@material-ui/core';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

import { useTheme } from '../hooks/useTheme';
import { AppRoutes } from './routes/app';

export function App() {
  const { type } = useTheme();

  const theme = createTheme({
    // paletta https://colorhunt.co/palette/f3c5c5c1a3a3886f6f694e4e
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
      fontFamily: 'Poppins',
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
