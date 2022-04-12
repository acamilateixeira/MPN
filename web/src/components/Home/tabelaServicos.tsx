import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';

import { Servico } from '../../models/servico';

interface TabelaServicosProps {
  servicos: Servico[];
}
export function TabelaServicos({ servicos }: TabelaServicosProps) {
  return (
    <TableContainer component={Paper}>
      <Table size='small'>
        <TableHead>
          <TableRow>
            <TableCell>Descrição</TableCell>
            <TableCell>Detalhes</TableCell>
            <TableCell>Preço</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {servicos.map((servico: Servico) => (
            <TableRow key={servico.id}>
              <TableCell>{servico.descricao}</TableCell>
              <TableCell>{servico.detalhes}</TableCell>
              <TableCell>{servico.valor}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
