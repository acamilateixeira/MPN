import { TipoStatus } from '../models/tipoStatus';
import api from './api';

class TiposStatusServices {
  async index() {
    const { data } = await api.get('/tiposStatus');

    return data as TipoStatus[];
  }

  async store(TipoStatus: TipoStatus) {
    const { data } = await api.post('/tiposStatus', TipoStatus);

    return data as TipoStatus;
  }

  async update(TipoStatus: TipoStatus) {
    const { data } = await api.put(`/tiposStatus/${TipoStatus.id}`, TipoStatus);

    return data as TipoStatus;
  }

  async delete(id: number) {
    await api.delete(`/tiposStatus/${id}`);
  }
}

export default new TiposStatusServices();
