import Cookie from 'js-cookie';

import api from '../services/api';

export interface SignInCredentials {
  username: string;
  password: string;
  tipoAcesso: 'EMPRESA' | 'CLIENTE';
}

export interface SignInResponse {
  username: string | null;
  codEmpresa: number | null;
  tkey: string | null;
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

  getUsername(): string | null {
    const username = Cookie.get('@MPN:username');

    if (username) {
      return JSON.parse(username);
    }

    return null;
  }

  async signIn(credenciais: SignInCredentials): Promise<SignInResponse> {
    try {
      var link;

      if (credenciais.tipoAcesso === 'EMPRESA') {
        link = '/auth/empresa';
      } else {
        link = '/auth';
      }

      const response = await api.post(link, credenciais);

      const { username, codEmpresa } = response.data.usuario;
      const { tkey } = response.data;

      Cookie.set('@MPN:username', JSON.stringify(username), {
        secure: false,
        sameSite: 'strict',
      });
      Cookie.set('@MPN:CodEmpresa', JSON.stringify(codEmpresa), {
        secure: false,
        sameSite: 'strict',
      });
      Cookie.set('@MPN:Tkey', tkey, {
        secure: false,
        sameSite: 'strict',
      });

      return {
        username,
        codEmpresa,
        tkey,
        success: true,
        message: 'Aguarde, você será redirecionado...',
      };
    } catch (error: any) {
      return {
        username: null,
        codEmpresa: null,
        tkey: null,
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
    } catch (error) {
      console.error(error);
    }
  }
}

export default new AuthServices();
