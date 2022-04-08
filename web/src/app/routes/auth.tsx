import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Entrar } from '../../pages/login';

export function AuthRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Entrar />} />
      </Routes>
    </BrowserRouter>
  );
}
