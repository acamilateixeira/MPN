import { createContext, useState } from 'react';

import { Agenda } from '../models/agenda';

interface AgendasContextData {
  agenda: Agenda;
  agendas: Agenda[];
  setAgendas(agendas: Agenda[]): void;
  setAgenda(agenda: Agenda): void;
}

interface AgendasContextProps {
  children: React.ReactNode;
}

export const AgendasContext = createContext({} as AgendasContextData);

export function AgendasProvider({ children }: AgendasContextProps) {
  const [agenda, setAgenda] = useState({} as Agenda);
  const [agendas, setAgendas] = useState([] as Agenda[]);

  return (
    <AgendasContext.Provider value={{ agenda, agendas, setAgenda, setAgendas }}>
      {children}
    </AgendasContext.Provider>
  );
}
