import { CssBaseline } from '@material-ui/core';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Dashboard } from '../../components/dashboard';
import { EmpresasProvider } from '../../contexts/empresas';
import { HorariosProvider } from '../../contexts/horarios';
import { ServicosProvider } from '../../contexts/servicos';
import { TiposAcessoProvider } from '../../contexts/tiposAcesso';
import { Home } from '../../pages/home';

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Dashboard>
        <EmpresasProvider>
          <ServicosProvider>
            <HorariosProvider>
              <TiposAcessoProvider>
                <TiposAcessoProvider>
                  <CssBaseline />
                  <Switch>
                    <Route path='/' component={Home} />
                  </Switch>
                </TiposAcessoProvider>
              </TiposAcessoProvider>
            </HorariosProvider>
          </ServicosProvider>
        </EmpresasProvider>
      </Dashboard>
    </BrowserRouter>
  );
}
