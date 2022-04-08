import { useContext } from 'react';

import { ServicosContext } from '../contexts/servicos';

export function useServicos() {
  const context = useContext(ServicosContext);

  if (!context) {
    throw new Error('useServicos must be used within a ServicosProvider');
  }

  return context;
}
