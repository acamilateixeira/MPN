import Cookie from 'js-cookie';

import { User } from '../models/user';
import api from '../services/api';

export interface SignInCredentials {
  username: string;
  password: string;
  tipoAuth: 'EMPRESA' | 'CLIENTE';
}

export interface SignInResponse {
  username: User | null;
  codEmpresa: number | null;
  tkey: string | null;
  type: 'EMPRESA' | 'CLIENTE';
  success: boolean;
  message: string;
}

class AuthServices {
  getCodEmpresa(): number | null {
    const codEmpresa = Cookie.get('@MPN:CodEmpresa');

    if (codEmpresa) {
      return JSON.parse(codEmpresa);
    }

    return null;
  }

  getTkey(): string | undefined {
    return Cookie.get('@MPN:Tkey');
  }

  getType(): string | null {
    const type = Cookie.get('@MPN:Type');

    if (type) {
      return JSON.parse(type);
    }

    return null;
  }

  getUsername(): User | null {
    const username = Cookie.get('@MPN:username');

    if (username) {
      return JSON.parse(username);
    }

    return null;
  }

  async signIn(credenciais: SignInCredentials): Promise<SignInResponse> {
    try {
      var link;

      if (credenciais.tipoAuth === 'EMPRESA') {
        link = '/auth/empresa';
      } else {
        link = '/auth';
      }

      const response = await api.post(link, credenciais);

      const { usuario } = response.data;
      const { codEmpresa } = response.data.usuario;
      const { tkey } = response.data;

      Cookie.set('@MPN:username', JSON.stringify(usuario), {
        secure: false,
        sameSite: 'strict',
      });
      Cookie.set('@MPN:CodEmpresa', JSON.stringify(codEmpresa), {
        secure: false,
        sameSite: 'strict',
      });
      Cookie.set('@MPN:Type', JSON.stringify(credenciais.tipoAuth), {
        secure: false,
        sameSite: 'strict',
      });

      Cookie.set('@MPN:Tkey', tkey, {
        secure: false,
        sameSite: 'strict',
      });

      return {
        username: usuario,
        codEmpresa,
        tkey,
        type: credenciais.tipoAuth,
        success: true,
        message: 'Aguarde, você será redirecionado...',
      };
    } catch (error: any) {
      return {
        username: null,
        codEmpresa: null,
        tkey: null,
        type: credenciais.tipoAuth,
        success: false,
        message: error.response ? error.response.data.erro : 'Erro de comunicação',
      };
    }
  }

  async signOut() {
    try {
      await api.delete('/auth');

      Cookie.remove('@MPN:username');
      Cookie.remove('@MPN:CodEmpresa');
      Cookie.remove('@MPN:Tkey');
      Cookie.remove('@MPN:Type');
    } catch (error) {
      console.error(error);
    }
  }
}

export default new AuthServices();
