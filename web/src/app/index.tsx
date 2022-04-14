import '@fontsource/alata';
import '@fontsource/poppins';

import { CssBaseline, Typography } from '@material-ui/core';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';
import { AppRoutes } from './routes/app';
import { AuthRoutes } from './routes/auth';

export function App() {
  const { type } = useTheme();
  const { isLoading, isAuthenticated } = useAuth();

  const theme = createTheme({
    // paletta https://colorhunt.co/palette/f3c5c5c1a3a3886f6f694e4e
    palette: {
      type: type,
      primary: {
        main: '#233DFF',
      },
      secondary: {
        main: '#13A9FF',
      },

      background: {
        default: '#fff',
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

  if (isLoading) {
    return <Typography>Carregando...</Typography>;
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        {isLoading && <Typography>Carregando...</Typography>}

        {isAuthenticated ? <AppRoutes /> : <AuthRoutes />}
      </ThemeProvider>
    </>
  );
}
