import { AppBar, Grid, IconButton, Toolbar, useMediaQuery, useTheme as useThemeMaterialUI } from '@material-ui/core';
import { MdExitToApp, MdMenuOpen } from 'react-icons/md';

interface NavbarProps {
  toggleHiddenSidebar: () => void;
}

export function Navbar({ toggleHiddenSidebar }: NavbarProps) {
  const theme = useThemeMaterialUI();

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppBar
      color='inherit'
      position='fixed'
      style={{
        background: 'rgb(243, 197, 197)',
        boxShadow: '1 0px 8px 5px rgba(0, 0, 0, 0.1)',
        borderRadius: '10px 10px 0px 0px',
        top: 'auto',
        bottom: 0,
        width: isMobile ? '100%' : '50%',
        transform: isMobile ? 'translateX(0%)' : 'translateX(-50%)',
      }}
    >
      <Toolbar>
        <Grid container justifyContent={isMobile ? 'flex-end' : 'space-between'} direction='row'>
          <Grid item lg={5}>
            <IconButton onClick={toggleHiddenSidebar}>
              <MdMenuOpen />
            </IconButton>
          </Grid>

          <Grid item>
            <IconButton>
              <MdExitToApp />
            </IconButton>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
