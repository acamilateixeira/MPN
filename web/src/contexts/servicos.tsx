import { createContext, useState } from 'react';

import { Servico } from '../models/servico';

interface ServicosContextData {
  servico: Servico;
  servicos: Servico[];
  setServicos(servicos: Servico[]): void;
  setServico(servico: Servico): void;
}

interface ServicosContextProps {
  children: React.ReactNode;
}

export const ServicosContext = createContext({} as ServicosContextData);

export function ServicosProvider({ children }: ServicosContextProps) {
  const [servico, setServico] = useState({} as Servico);
  const [servicos, setServicos] = useState([] as Servico[]);

  return (
    <ServicosContext.Provider value={{ servico, servicos, setServico, setServicos }}>
      {children}
    </ServicosContext.Provider>
  );
}
