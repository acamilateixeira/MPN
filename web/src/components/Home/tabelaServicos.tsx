import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { FaEdit, FaTrash } from 'react-icons/fa';

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
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {servicos.map((servico: Servico) => (
            <TableRow key={servico.id}>
              <TableCell>{servico.descricao}</TableCell>
              <TableCell>{servico.detalhes}</TableCell>
              <TableCell>{servico.valor}</TableCell>
              <TableCell align='center'>
                <Typography noWrap>
                  <Tooltip title='Editar'>
                    <IconButton size='small'>
                      <FaEdit />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title='Excluir'>
                    <IconButton size='small'>
                      <FaTrash />
                    </IconButton>
                  </Tooltip>
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
