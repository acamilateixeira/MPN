import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { ReactNode, useState } from 'react';

import { Navbar } from './navbar';
import { Sidebar } from './sidebar';

interface DashboardProps {
  children: ReactNode;
}

export function Dashboard({ children }: DashboardProps) {
  const css = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        display: 'flex',
      },
      content: {
        flexGrow: 1,
      },
      toolbar: theme.mixins.toolbar,
    })
  )();

  const [hiddenSidebarIsVisible, setHiddenSidebarIsVisible] = useState(false);

  function toggleHiddenSidebar() {
    setHiddenSidebarIsVisible(!hiddenSidebarIsVisible);
  }
  return (
    <>
      <div className={css.root}>
        <CssBaseline />

        <Navbar toggleHiddenSidebar={toggleHiddenSidebar} />

        <main className={css.content}>
          <Container
            maxWidth='xl'
            style={{
              padding: '2rem',
            }}
          >
            <Grid container>
              <Grid item xs={12}>
                {children}
              </Grid>
            </Grid>
          </Container>
        </main>
      </div>

      <Sidebar
        hiddenSidebarIsVisible={hiddenSidebarIsVisible}
        toggleHiddenSidebar={toggleHiddenSidebar}
      />
    </>
  );
}
