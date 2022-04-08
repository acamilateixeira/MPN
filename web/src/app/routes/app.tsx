import { CssBaseline } from '@material-ui/core';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Dashboard } from '../../components/dashboard';
import { Home } from '../../pages/home';

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Dashboard>
        <CssBaseline />
        <Switch>
          <Route path='/' component={Home} />
        </Switch>
      </Dashboard>
    </BrowserRouter>
  );
}
