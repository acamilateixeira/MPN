import { createContext, useState } from 'react';

import { Cliente } from '../models/cliente';

interface ClientesContextData {
  cliente: Cliente;
  clientes: Cliente[];
  setClientes(clientes: Cliente[]): void;
  setCliente(cliente: Cliente): void;
}

interface ClientesContextProps {
  children: React.ReactNode;
}

export const ClientesContext = createContext({} as ClientesContextData);

export function ClientesProvider({ children }: ClientesContextProps) {
  const [cliente, setCliente] = useState({} as Cliente);
  const [clientes, setClientes] = useState([] as Cliente[]);

  return (
    <ClientesContext.Provider value={{ cliente, clientes, setCliente, setClientes }}>
      {children}
    </ClientesContext.Provider>
  );
}
