import { useContext } from 'react';

import { HorariosContext } from '../contexts/horarios';

export function useHorarios() {
  const context = useContext(HorariosContext);

  if (!context) {
    throw new Error('useHorarios must be used within a HorariosProvider');
  }

  return context;
}
