import { Cliente } from '../models/cliente';
import api from './api';

class ClientesServices {
  async index() {
    const { data } = await api.get('/clientes');

    return data as Cliente[];
  }

  async store(cliente: Cliente) {
    const { data } = await api.post('/clientes', cliente);

    return data as Cliente;
  }

  async update(cliente: Cliente) {
    const { data } = await api.put(`/clientes/${cliente.id}`, cliente);

    return data as Cliente;
  }

  async delete(id: number) {
    await api.delete(`/clientes/${id}`);
  }
}

export default new ClientesServices();
