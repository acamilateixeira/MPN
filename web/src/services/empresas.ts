import { Empresa } from '../models/empresa';
import api from './api';

class EmpresasServices {
  async index() {
    const { data } = await api.get('/empresas');

    return data as Empresa[];
  }

  async store(empresa: Empresa) {
    const { data } = await api.post('/empresas', empresa);

    return data as Empresa;
  }

  async update(empresa: Empresa) {
    const { data } = await api.put(`/empresas/${empresa.id}`, empresa);

    return data as Empresa;
  }

  async delete(id: number) {
    await api.delete(`/empresas/${id}`);
  }
}

export default new EmpresasServices();
