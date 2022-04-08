import { createContext, useState } from 'react';

import { Horario } from '../models/horario';

interface HorariosContextData {
  horario: Horario;
  horarios: Horario[];
  setHorarios(horarios: Horario[]): void;
  setHorario(horario: Horario): void;
}

interface HorariosContextProps {
  children: React.ReactNode;
}

export const HorariosContext = createContext({} as HorariosContextData);

export function HorariosProvider({ children }: HorariosContextProps) {
  const [horario, setHorario] = useState({} as Horario);
  const [horarios, setHorarios] = useState([] as Horario[]);

  return (
    <HorariosContext.Provider value={{ horario, horarios, setHorario, setHorarios }}>
      {children}
    </HorariosContext.Provider>
  );
}
