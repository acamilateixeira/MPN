import { Grid, TextField, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';

import { ListarEmpresas } from '../components/Home/listarEmpresas';
import { TabelaServicos } from '../components/Home/tabelaServicos';
import { Loading } from '../components/loading';
import { Logo } from '../components/logo';
import { useAuth } from '../hooks/useAuth';
import { useEmpresas } from '../hooks/useEmpresas';
import { useServicos } from '../hooks/useServicos';
import EmpresasServices from '../services/empresas';
import ServicosServices from '../services/servicos';

export function Home() {
  const { type, user } = useAuth();

  const [loading, setLoading] = useState(true);

  const { servicos, setServicos } = useServicos();
  const { empresas, setEmpresas } = useEmpresas();

  useEffect(() => {
    async function loadParams() {
      const servico = await ServicosServices.index();
      const empresa = await EmpresasServices.index();

      setEmpresas(empresa);
      setServicos(servico);
    }

    setLoading(false);
    loadParams();
  }, [setServicos, setEmpresas]);

  return (
    <>
      <Grid container spacing={2} justifyContent='center'>
        <Grid item xs={12} style={{ textAlign: 'center' }}>
          <Logo />
        </Grid>

        <Grid item xs={12}>
          <Typography variant='subtitle1' style={{ textAlign: 'center' }}>
            Bem vindo, {user?.nomeEmpresa} !
          </Typography>
        </Grid>

        {type === 'EMPRESA' ? (
          <>
            {servicos !== undefined ? (
              <Grid item xl={4} lg={4} md={12} sm={12}>
                <TabelaServicos servicos={servicos} />
              </Grid>
            ) : (
              <Grid item xl={4} lg={4} md={12} sm={12}>
                <Typography variant='caption'>Nenhum serviço cadastrado.</Typography>
              </Grid>
            )}
          </>
        ) : (
          <>
            <Grid item xs={12}>
              <TextField fullWidth label='Buscar serviço' variant='outlined' size='small' />
            </Grid>

            {empresas !== undefined && empresas.length > 0 ? (
              <Grid item xl={4} lg={4} md={12} sm={12}>
                <ListarEmpresas empresas={empresas} />
              </Grid>
            ) : (
              <Grid item xl={4} lg={4} md={12} sm={12}>
                <Typography align='center' variant='caption'>
                  Nenhum serviço encontrado.
                </Typography>
              </Grid>
            )}
          </>
        )}
      </Grid>

      <Loading loading={loading} />
    </>
  );
}
