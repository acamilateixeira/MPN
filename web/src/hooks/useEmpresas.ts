import { useContext } from 'react';

import { EmpresasContext } from '../contexts/empresas';

export function useEmpresas() {
  const context = useContext(EmpresasContext);

  if (!context) {
    throw new Error('useEmpresas must be used within a EmpresasProvider');
  }

  return context;
}
