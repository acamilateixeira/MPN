import { Grid, Typography } from '@material-ui/core';
import { useEffect } from 'react';

import { TabelaServicos } from '../components/Home/tabelaServicos';
import { Logo } from '../components/logo';
import { useAuth } from '../hooks/useAuth';
import { useServicos } from '../hooks/useServicos';
import ServicosServices from '../services/servicos';

export function Home() {
  const { type, user } = useAuth();
  const { servicos, setServicos } = useServicos();

  useEffect(() => {
    async function loadParams() {
      const servico = await ServicosServices.index();

      setServicos(servico);
    }

    loadParams();
  }, [setServicos]);

  return (
    <>
      <Grid container spacing={3} justifyContent='center'>
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
          <Typography variant='body2'>É teste besta </Typography>
        )}
      </Grid>
    </>
  );
}
