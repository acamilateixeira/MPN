import { Empresa } from './empresa';

export interface Servico {
  id: number;
  descricao: string;
  valor: number;
  detalhes: string;
  empresa: Empresa;
}
