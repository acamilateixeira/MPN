import { Avatar, List, ListItem, ListItemAvatar, ListItemText, ListSubheader } from '@material-ui/core';
import { Link } from 'react-router-dom';

import { Empresa } from '../../models/empresa';

interface ListarEmpresasProps {
  empresas: Empresa[];
}
export function ListarEmpresas({ empresas }: ListarEmpresasProps) {
  return (
    <List>
      <ListSubheader>Empresas</ListSubheader>

      {empresas.map((empresa: Empresa) => (
        <ListItem key={empresa.id} button component={Link} to={`/empresas/${empresa.id}`}>
          <ListItemAvatar>
            <Avatar>{empresa.nomeRazaoSocial.charAt(0)}</Avatar>
          </ListItemAvatar>

          <ListItemText
            primary={empresa.nomeRazaoSocial}
            // listar apenas os dois primeiros serviços no maximo 22 caracteres
            secondary={empresa.servicos
              .slice(0, 2)
              .map((servico: any) => servico.descricao)
              .join(', ')}
          />

          {empresa.servicos.length > 0 && (
            <ListItemText
              style={{ marginLeft: '8px' }}
              primary={`${empresa.servicos.length} serviços`}
              secondary={`${
                empresa.servicos.reduce((acc, servico) => {
                  if (acc.valor < servico.valor) {
                    return acc;
                  }

                  return servico;
                }).valor
              } - ${
                empresa.servicos.reduce((acc, servico) => {
                  if (acc.valor > servico.valor) {
                    return acc;
                  }

                  return servico;
                }).valor
              }`}
            />
          )}
        </ListItem>
      ))}
    </List>
  );
}
