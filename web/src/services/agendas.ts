import { Agenda } from '../models/agenda';
import api from './api';

class AgendasServices {
  async index() {
    const { data } = await api.get('/agendas');

    return data as Agenda[];
  }

  async store(agenda: Agenda) {
    const { data } = await api.post('/agendas', agenda);

    return data as Agenda;
  }

  async update(agenda: Agenda) {
    const { data } = await api.put(`/agendas/${agenda.id}`, agenda);

    return data as Agenda;
  }

  async delete(id: number) {
    await api.delete(`/agendas/${id}`);
  }
}

export default new AgendasServices();
