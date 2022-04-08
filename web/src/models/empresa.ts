import { TipoAcesso } from './tipoAcesso';

export interface Empresa {
  id: number;
  nomeRazaoSocial: string;
  email: string;
  telefone: string;
  idAcesso: TipoAcesso;
  username: string;
}
