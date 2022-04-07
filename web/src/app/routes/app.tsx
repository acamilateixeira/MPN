import { CssBaseline } from '@material-ui/core';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Dashboard } from '../../components/dashboard';
import { Home } from '../../pages/home';

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Dashboard>
        <CssBaseline />
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </Dashboard>
    </BrowserRouter>
  );
}
