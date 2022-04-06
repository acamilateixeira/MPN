import { createStyles, makeStyles, useTheme } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';

import { DashboardOption } from './dashboardOption';

interface SidebarProps {
  hiddenSidebarIsVisible: boolean;
  toggleHiddenSidebar: () => void;
  window?: () => Window;
}

export function Sidebar({ hiddenSidebarIsVisible, toggleHiddenSidebar, window }: SidebarProps) {
  const container = window !== undefined ? () => window().document.body : undefined;

  const theme = useTheme();
  const isMobile = theme.breakpoints.down('sm');

  const css = makeStyles(() =>
    createStyles({
      drawer: {
        width: 320,
        flexShrink: 0,
        height: '100%',
      },
      drawerPaper: {
        width: isMobile ? '95%' : 350,
        borderRadius: 30,
        border: 0,
        margin: 5,
        height: isMobile ? '50%' : '100%',
        boxShadow: '0 8px 8px 8px rgba(0, 0, 0, 0.08)',
        paddingBottom: 50,
      },
    })
  )();

  return (
    <nav className={css.drawer}>
      <Drawer
        anchor='bottom'
        container={container}
        open={hiddenSidebarIsVisible}
        onClose={toggleHiddenSidebar}
        classes={{
          paper: css.drawerPaper,
        }}
      >
        <DashboardOption />
      </Drawer>
    </nav>
  );
}
