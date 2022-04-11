import { useEffect } from 'react';

import { Logo } from '../components/logo';
import { useEmpresas } from '../hooks/useEmpresas';
import EmpresasServices from '../services/empresas';

export function Home() {
  const { empresas, setEmpresas } = useEmpresas();

  useEffect(() => {
    async function loadParams() {
      const data = await EmpresasServices.index();

      setEmpresas(data);
    }

    loadParams();
  }, [setEmpresas]);

  return (
    <>
      <Logo />

      <div>
        {empresas.map(empresa => (
          <div key={empresa.id}>
            {empresa.nomeRazaoSocial} - {empresa.idAcesso}
          </div>
        ))}
      </div>
    </>
  );
}
