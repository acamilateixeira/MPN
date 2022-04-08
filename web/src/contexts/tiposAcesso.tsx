import { createContext, useState } from 'react';

import { TipoAcesso } from '../models/tipoAcesso';

interface TiposAcessoContextData {
  tipoAcesso: TipoAcesso;
  tiposAcesso: TipoAcesso[];
  setTiposAcesso(tiposAcesso: TipoAcesso[]): void;
  setTipoAcesso(tipoAcesso: TipoAcesso): void;
}

interface TiposAcessoContextProps {
  children: React.ReactNode;
}

export const TiposAcessoContext = createContext({} as TiposAcessoContextData);

export function TiposAcessoProvider({ children }: TiposAcessoContextProps) {
  const [tipoAcesso, setTipoAcesso] = useState({} as TipoAcesso);
  const [tiposAcesso, setTiposAcesso] = useState([] as TipoAcesso[]);

  return (
    <TiposAcessoContext.Provider value={{ tipoAcesso, tiposAcesso, setTipoAcesso, setTiposAcesso }}>
      {children}
    </TiposAcessoContext.Provider>
  );
}
