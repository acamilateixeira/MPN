import { Horario } from '../models/horario';
import api from './api';

class HorariosServices {
  async index() {
    const { data } = await api.get('/horarios');

    return data as Horario[];
  }

  async store(horario: Horario) {
    const { data } = await api.post('/horarios', horario);

    return data as Horario;
  }

  async update(horario: Horario) {
    const { data } = await api.put(`/horarios/${horario.id}`, horario);

    return data as Horario;
  }

  async delete(id: number) {
    await api.delete(`/horarios/${id}`);
  }
}

export default new HorariosServices();
