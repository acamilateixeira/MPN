import { TipoAcesso } from '../models/tipoAcesso';
import api from './api';

class TiposTiposAcessoServices {
  async index() {
    const { data } = await api.get('/tiposAcesso');

    return data as TipoAcesso[];
  }

  async store(TipoAcesso: TipoAcesso) {
    const { data } = await api.post('/tiposAcesso', TipoAcesso);

    return data as TipoAcesso;
  }

  async update(TipoAcesso: TipoAcesso) {
    const { data } = await api.put(`/tiposAcesso/${TipoAcesso.id}`, TipoAcesso);

    return data as TipoAcesso;
  }

  async delete(id: number) {
    await api.delete(`/tiposAcesso/${id}`);
  }
}

export default new TiposTiposAcessoServices();
