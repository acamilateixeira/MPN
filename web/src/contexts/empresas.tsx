import { createContext, useState } from 'react';

import { Empresa } from '../models/empresa';

interface EmpresasContextData {
  empresa: Empresa;
  empresas: Empresa[];
  setEmpresas(Empresas: Empresa[]): void;
  setEmpresa(Empresa: Empresa): void;
}

interface EmpresasContextProps {
  children: React.ReactNode;
}

export const EmpresasContext = createContext({} as EmpresasContextData);

export function EmpresasProvider({ children }: EmpresasContextProps) {
  const [empresa, setEmpresa] = useState({} as Empresa);
  const [empresas, setEmpresas] = useState([] as Empresa[]);

  return (
    <EmpresasContext.Provider value={{ empresa, empresas, setEmpresa, setEmpresas }}>
      {children}
    </EmpresasContext.Provider>
  );
}
