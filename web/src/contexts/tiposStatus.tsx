import { createContext, useState } from 'react';

import { TipoStatus } from '../models/tipoStatus';

interface TiposStatusContextData {
  tipoStatus: TipoStatus;
  tiposStatus: TipoStatus[];
  setTiposStatus(TiposStatus: TipoStatus[]): void;
  setTipoStatus(tipoStatus: TipoStatus): void;
}

interface TiposStatusContextProps {
  children: React.ReactNode;
}

export const TiposStatusContext = createContext({} as TiposStatusContextData);

export function TiposStatusProvider({ children }: TiposStatusContextProps) {
  const [tipoStatus, setTipoStatus] = useState({} as TipoStatus);
  const [tiposStatus, setTiposStatus] = useState([] as TipoStatus[]);

  return (
    <TiposStatusContext.Provider value={{ tipoStatus, tiposStatus, setTipoStatus, setTiposStatus }}>
      {children}
    </TiposStatusContext.Provider>
  );
}
