import { useContext } from 'react';

import { AgendasContext } from '../contexts/agendas';

export function useAgendas() {
  const context = useContext(AgendasContext);

  if (!context) {
    throw new Error('useAgendas must be used within a AgendasProvider');
  }

  return context;
}
