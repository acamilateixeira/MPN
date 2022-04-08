import { useContext } from 'react';

import { ClientesContext } from '../contexts/clientes';

export function useClientes() {
  const context = useContext(ClientesContext);

  if (!context) {
    throw new Error('useClientes must be used within a ClientesProvider');
  }

  return context;
}
