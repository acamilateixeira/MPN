import { useContext } from 'react';

import { TiposAcessoContext } from '../contexts/tiposAcesso';

export function useAcessos() {
  const context = useContext(TiposAcessoContext);

  if (!context) {
    throw new Error('useAcessos must be used within a AcessosProvider');
  }

  return context;
}
