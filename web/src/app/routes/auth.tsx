import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Entrar } from '../../pages/login';

export function AuthRoutes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' component={Entrar} />
      </Switch>
    </BrowserRouter>
  );
}
