import {
  AppBar,
  FormHelperText,
  Grid,
  IconButton,
  Toolbar,
  useMediaQuery,
  useTheme as useThemeMaterialUI,
} from '@material-ui/core';
import { MdExitToApp, MdHome, MdMenuOpen, MdOutlineCalendarToday } from 'react-icons/md';

import { useAuth } from '../hooks/useAuth';

interface NavbarProps {
  toggleHiddenSidebar: () => void;
}

export function Navbar({ toggleHiddenSidebar }: NavbarProps) {
  const theme = useThemeMaterialUI();

  const { signOut } = useAuth();

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppBar
      color='inherit'
      position='fixed'
      style={{
        bottom: 0,
        top: 'auto',
        background: 'rgb(35,61,255)',
        boxShadow: '1 0px 8px 5px rgba(0, 0, 0, 0.1)',
        borderRadius: '16px 16px 0px 0px',
        marginTop: 0,
        width: isMobile ? '100%' : '50%',
        transform: isMobile ? 'translateX(0%)' : 'translateX(-50%)',
      }}
    >
      <Toolbar>
        <Grid
          container
          justifyContent='space-between'
          direction='row'
          spacing={3}
          style={{
            padding: 2,
          }}
        >
          <Grid item>
            <IconButton
              onClick={toggleHiddenSidebar}
              style={{
                color: '#fff',
              }}
              aria-label='home'
            >
              <MdHome />
            </IconButton>

            <FormHelperText style={{ color: '#fff', textAlign: 'center' }}>Home</FormHelperText>
          </Grid>

          <Grid item>
            <IconButton
              onClick={toggleHiddenSidebar}
              style={{
                color: '#fff',
              }}
              aria-label='menu'
            >
              <MdMenuOpen />
            </IconButton>

            <FormHelperText style={{ color: '#fff', textAlign: 'center' }}>Menu</FormHelperText>
          </Grid>

          <Grid item>
            <IconButton
              style={{
                color: '#fff',
              }}
              aria-label='calendar'
            >
              <MdOutlineCalendarToday />
            </IconButton>

            <FormHelperText style={{ color: '#fff', textAlign: 'center' }}>
              Calendário
            </FormHelperText>
          </Grid>

          <Grid item>
            <IconButton
              onClick={signOut}
              style={{
                color: '#fff',
              }}
              aria-label='exit'
            >
              <MdExitToApp />
            </IconButton>

            <FormHelperText style={{ color: '#fff', textAlign: 'center' }}>Sair</FormHelperText>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
