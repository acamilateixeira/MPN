import { Servico } from '../models/servico';
import api from './api';

class ServicosServices {
  async index() {
    const { data } = await api.get('/servicos');

    return data as Servico[];
  }

  async store(servico: Servico) {
    const { data } = await api.post('/servicos', servico);

    return data as Servico;
  }

  async update(servico: Servico) {
    const { data } = await api.put(`/servicos/${servico.id}`, servico);

    return data as Servico;
  }

  async delete(id: number) {
    await api.delete(`/servicos/${id}`);
  }
}

export default new ServicosServices();
