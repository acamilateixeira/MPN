import { AppBar, Grid, IconButton, Toolbar, useMediaQuery, useTheme as useThemeMaterialUI } from '@material-ui/core';
import { MdExitToApp, MdMenuOpen } from 'react-icons/md';

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
        background: 'rgb(35,61,255)',
        boxShadow: '1 0px 8px 5px rgba(0, 0, 0, 0.1)',
        borderRadius: '16px 16px 0px 0px',
        top: 'auto',
        bottom: 0,
        width: isMobile ? '100%' : '50%',
        transform: isMobile ? 'translateX(0%)' : 'translateX(-50%)',
      }}
    >
      <Toolbar>
        <Grid container justifyContent={isMobile ? 'flex-end' : 'space-between'} direction='row'>
          <Grid item>
            <IconButton
              onClick={toggleHiddenSidebar}
              style={{
                color: '#fff',
              }}
            >
              <MdMenuOpen />
            </IconButton>
          </Grid>

          <Grid item>
            <IconButton
              onClick={signOut}
              style={{
                color: '#fff',
              }}
            >
              <MdExitToApp />
            </IconButton>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
