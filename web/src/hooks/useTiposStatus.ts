import { useContext } from 'react';

import { TiposStatusContext } from '../contexts/tiposStatus';

export function useStatus() {
  const context = useContext(TiposStatusContext);

  if (!context) {
    throw new Error('useStatus must be used within a StatusProvider');
  }

  return context;
}
