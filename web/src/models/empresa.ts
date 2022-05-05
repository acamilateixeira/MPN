import { Servico } from './servico';
import { TipoAcesso } from './tipoAcesso';

export interface Empresa {
  id: number;
  nomeRazaoSocial: string;
  email: string;
  telefone: string;
  idAcesso: TipoAcesso;
  username: string;
  codEmpresa: string;
  servicos: Servico[];
}
